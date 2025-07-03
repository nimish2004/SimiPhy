import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProductList from "../components/ProductList";
import ToggleView from "../components/ToggleView";
import productsData from "../data/products.json";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [view, setView] = useState("grid");

  useEffect(() => {
    setProducts(productsData);
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* ✅ Pass the prop here */}
      <Navbar onSearchChange={setSearch} />
      <div className="max-w-6xl mx-auto p-4">
        <ToggleView view={view} setView={setView} />
        {/* ✅ Show filtered products */}
        <ProductList products={filteredProducts} view={view} />
      </div>
    </div>
  );
};

export default Home;
