import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import Cart from "./components/Cart";
import ProductDetail from "./pages/ProductDetail";
import Success from "./pages/Success";

const App = () => {
  return (
    <Router>
     <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/cart" element={<Cart />} />
  <Route path="/checkout" element={<Checkout />} />
  <Route path="/product/:id" element={<ProductDetail />} />
  <Route path="/success" element={<Success />} />
    </Routes>
    </Router>
  );
};

export default App;
// Test Key ID  rzp_test_LrHYwGpgIOOaN3
// Test Key Secret   JDZV8HOhVOSlSk2d1xDDinsA