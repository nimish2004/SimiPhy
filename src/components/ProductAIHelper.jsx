import { useEffect, useState } from "react";

const ProductAIHelper = () => {
  const [products, setProducts] = useState([]);
  const [userPrompt, setUserPrompt] = useState("");
  const [loading, setLoading] = useState(true);
  const [thinking, setThinking] = useState(false);
  const [aiResponse, setAiResponse] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products?limit=20");
        const data = await res.json();
        setProducts(data.products);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAskAI = () => {
    if (!userPrompt.trim()) return;
    setThinking(true);

    // Simulate loading delay
    setTimeout(() => {
      setAiResponse("🤖 AI product recommendations are coming soon! Stay tuned...");
      setThinking(false);
    }, 1200);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">🧠 Numa - Your AI Assistant</h2>

      {loading ? (
        <p className="text-gray-500 text-center">Loading products...</p>
      ) : (
        <>
          <label className="block mb-2 font-medium text-gray-700">What are you looking for?</label>
          <input
            type="text"
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            placeholder="e.g., A tech gift under ₹1000 for my brother"
            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none mb-4"
          />

          <button
            onClick={handleAskAI}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition"
          >
            {thinking ? "Thinking..." : "Ask Numa"}
          </button>

          {aiResponse && (
            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-300 rounded text-gray-800">
              <h4 className="font-semibold mb-2">📢 Notice:</h4>
              <p>{aiResponse}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductAIHelper;
