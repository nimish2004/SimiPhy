import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { CartProvider } from './context/CartContext.jsx'; 
import { AuthProvider } from "./context/AuthContext";
import { WishlistProvider } from "./context/WishlistContext";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartProvider> {/* ✅ wrap App */}
      <AuthProvider>
        <WishlistProvider>
        <App />
      </WishlistProvider>
      </AuthProvider>
    </CartProvider>
  </React.StrictMode>
);
