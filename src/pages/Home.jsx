// src/pages/Home.jsx
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProductList from "../components/ProductList";
import ToggleView from "../components/ToggleView";
import productsData from "../data/products.json";

const Home = () => {
  const [view, setView] = useState("grid");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(productsData);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto p-4">
        <ToggleView view={view} setView={setView} />
        <ProductList products={products} view={view} />
      </div>
    </div>
  );
};

export default Home;
