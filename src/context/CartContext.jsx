import { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
  const existingItem = state.find(item => item.id === action.payload.id);
  if (existingItem) {
    return state.map(item =>
      item.id === action.payload.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  } else {
    return [...state, { ...action.payload, quantity: 1 }];
  }

case "INCREMENT_QUANTITY":
  return state.map(item =>
    item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
  );

case "DECREMENT_QUANTITY":
  return state
    .map(item =>
      item.id === action.payload ? { ...item, quantity: item.quantity - 1 } : item
    )
    .filter(item => item.quantity > 0);

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);