import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProductList from "../components/ProductList";
import ToggleView from "../components/ToggleView";
import Sidebar from "../components/Sidebar";
import HeroSlider from "../components/HeroSlider";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [view, setView] = useState("grid");
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://dummyjson.com/products?limit=100");
        const data = await res.json();
        setProducts(data.products);
      } catch (err) {
        console.error("Failed to load products:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
  const res = await fetch("https://dummyjson.com/products/categories");
  const data = await res.json();

  const formatted = data.map((cat) => ({
    name: cat,
    slug: cat.toLowerCase().replace(/\s+/g, "-"),
    url: `/category/${cat}`
  }));

  setCategories(formatted);
};

    fetchProducts();
    fetchCategories();
  }, []);

  const filteredProducts = products
    .filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter((product) =>
      selectedCategory ? product.category === selectedCategory : true
    )
    .sort((a, b) => {
      if (sortOrder === "asc") return a.price - b.price;
      if (sortOrder === "desc") return b.price - a.price;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onSearchChange={setSearch} />
       <HeroSlider />

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          <Sidebar
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
          />

          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-800">🛍️ Products</h1>
              <ToggleView view={view} setView={setView} />
            </div>

            {loading ? (
              <p className="text-center text-gray-500 mt-20">Loading products...</p>
            ) : (
              <ProductList products={filteredProducts} view={view} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
