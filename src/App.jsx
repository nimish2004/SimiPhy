import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState , useEffect } from "react";
import { auth } from "./firebase";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import ProductAIHelper from "./components/ProductAIHelper";
import Checkout from "./pages/Checkout";
import ScrollToTop from "./components/ScrollToTop";
import Cart from "./components/Cart";
import ProductDetail from "./pages/ProductDetail";
import Success from "./pages/Success";
import OrderHistory from "./pages/OrderHistory";
import SignIn from "./pages/SignIn";
import Profile from "./pages/Profile";
import Sidebar from "./components/Sidebar";
import Wishlist from "./pages/Wishlist";
import Footer from "./components/Footer";
import FloatingAIButton from "./components/FloatingAIButton";
import TopBar from "./components/TopBar";
import Navbar from "./components/Navbar";
import WelcomePopup from "./components/WelcomePopup";




const App = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const [userName, setUserName] = useState("");
  const [showWelcome, setShowWelcome] = useState(false);

   useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const name = user.email?.split("@")[0] || "Friend";
        setUserName(name);
        setShowWelcome(true);
        setTimeout(() => setShowWelcome(false), 2000);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
       <div className="flex flex-col min-h-screen bg-gray-50">
        <ScrollToTop />
        
        {/* ✅ GLOBAL UI ELEMENTS */}
        <Navbar onSearchChange={setSearchQuery} />
        {showWelcome && <WelcomePopup userName={userName} />}
        <TopBar />
     {/* ✅ ROUTES */}
        <Routes>
          <Route path="/" element={<Home search={searchQuery} />} />
          <Route path="/ai-helper" element={<ProductAIHelper />} />
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/success" element={<Success />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route
            path="/orders"
            element={
              <ProtectedRoute>
                <OrderHistory />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </div>

      {/* ✅ FOOTER + FLOATING BUTTON */}
      <Footer />
      <FloatingAIButton />
    </Router>
    
  );
};

export default App;
// Test Key ID  rzp_test_LrHYwGpgIOOaN3
// Test Key Secret   JDZV8HOhVOSlSk2d1xDDinsA