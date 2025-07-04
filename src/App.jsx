import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Checkout from "./pages/Checkout";
import Cart from "./components/Cart";
import ProductDetail from "./pages/ProductDetail";
import Success from "./pages/Success";
import OrderHistory from "./pages/OrderHistory";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import Sidebar from "./components/Sidebar";
import Wishlist from "./pages/Wishlist";
import Footer from "./components/Footer";

const App = () => {
  return (
    <Router>
       <div className="flex flex-col min-h-screen bg-gray-50">
     <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/sidebar" element={<Sidebar />} />
  
  <Route path="/cart" element={<Cart />} />
  <Route
  path="/checkout"
  element={
    <ProtectedRoute>
      <Checkout />
    </ProtectedRoute>
  }
/>
  <Route path="/product/:id" element={<ProductDetail />} />
  <Route path="/success" element={<Success />} />
    <Route
  path="/orders"
  element={
    <ProtectedRoute>
      <OrderHistory />
    </ProtectedRoute>
  }
/>  

<Route path="/wishlist" element={<Wishlist />} />
<Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/signin" element={<SignIn />} />
        
    </Routes>
    </div>
    <div>
      <Footer />
      </div>
    </Router>
    
  );
};

export default App;
// Test Key ID  rzp_test_LrHYwGpgIOOaN3
// Test Key Secret   JDZV8HOhVOSlSk2d1xDDinsA