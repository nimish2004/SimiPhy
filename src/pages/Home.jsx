import { useEffect, useState } from "react";
import ProductList from "../components/ProductList";
import ToggleView from "../components/ToggleView";
import Sidebar from "../components/Sidebar";
import HeroSlider from "../components/HeroSlider";

const Home = ({ search }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [view, setView] = useState("grid");
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://fakestoreapi.com/products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to load products:", err);
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products/categories");
        const data = await res.json();
        setCategories(data); // Already in lowercase format
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
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
    .filter((product) =>
      selectedRating > 0 ? product.rating?.rate >= selectedRating : true
    )
    .sort((a, b) => {
      if (sortOrder === "asc") return a.price - b.price;
      if (sortOrder === "desc") return b.price - a.price;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroSlider />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          <Sidebar
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            selectedRating={selectedRating}
            setSelectedRating={setSelectedRating}
          />
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-800">🛍️ Products</h1>
              <ToggleView view={view} setView={setView} />
            </div>

            {loading ? (
  <p className="text-center text-gray-500 mt-20">Loading products...</p>
) : filteredProducts.length === 0 ? (
  <p className="text-center text-gray-500 mt-20 text-lg">Well, this is awkward… We couldn’t find anything 😬</p>
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
