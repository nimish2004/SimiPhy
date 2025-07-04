import { createContext, useContext, useReducer, useEffect } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc, updateDoc, onSnapshot } from "firebase/firestore";

const WishlistContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_WISHLIST":
      return action.payload;

    case "ADD_TO_WISHLIST":
      return [...state, action.payload];

    case "REMOVE_FROM_WISHLIST":
      return state.filter((item) => item.id !== action.payload);

    default:
      return state;
  }
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, dispatch] = useReducer(reducer, []);

  // 🔁 Fetch and listen to wishlist from Firestore
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) return;

      const userRef = doc(db, "wishlists", user.uid);

      const unsubscribeFirestore = onSnapshot(userRef, (docSnap) => {
        if (docSnap.exists()) {
          dispatch({ type: "SET_WISHLIST", payload: docSnap.data().items || [] });
        } else {
          // Create empty wishlist document if it doesn't exist
          setDoc(userRef, { items: [] });
        }
      });

      return unsubscribeFirestore;
    });
  }, []);

  // 🔁 Sync wishlist changes to Firestore
  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const userRef = doc(db, "wishlists", user.uid);
    updateDoc(userRef, { items: wishlist }).catch((err) => {
      console.error("Failed to update wishlist:", err.message);
    });
  }, [wishlist]);

  return (
    <WishlistContext.Provider value={{ wishlist, dispatch }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
