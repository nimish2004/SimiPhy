// src/context/WishlistContext.jsx
import { createContext, useContext, useReducer, useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const WishlistContext = createContext();

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case "SET_WISHLIST":
      return action.payload;
    case "ADD_TO_WISHLIST":
      if (state.find((item) => item.id === action.payload.id)) return state;
      return [...state, action.payload];
    case "REMOVE_FROM_WISHLIST":
      return state.filter((item) => item.id !== action.payload);
    default:
      return state;
  }
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, dispatch] = useReducer(wishlistReducer, []);
  const [user, setUser] = useState(null);

  // Load user state
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (u) => {
      setUser(u);

      if (u) {
        const userDoc = doc(db, "wishlists", u.uid);
        const docSnap = await getDoc(userDoc);

        if (docSnap.exists()) {
          const items = docSnap.data().items || [];
          dispatch({ type: "SET_WISHLIST", payload: items });
        } else {
          await setDoc(userDoc, { items: [] });
          dispatch({ type: "SET_WISHLIST", payload: [] });
        }
      } else {
        dispatch({ type: "SET_WISHLIST", payload: [] });
      }
    });

    return () => unsubscribe();
  }, []);

  // Save to Firestore whenever wishlist changes
  useEffect(() => {
    const saveToFirestore = async () => {
      if (user) {
        const userDoc = doc(db, "wishlists", user.uid);
        await updateDoc(userDoc, {
          items: wishlist,
        });
      }
    };

    saveToFirestore();
  }, [wishlist, user]);

  return (
    <WishlistContext.Provider value={{ wishlist, dispatch }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
