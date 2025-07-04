import { useEffect, useState } from "react";

const ProductAIHelper = () => {
  const [products, setProducts] = useState([]);
  const [userPrompt, setUserPrompt] = useState("");
  const [loading, setLoading] = useState(true);
  const [aiResponse, setAiResponse] = useState("");
  const [thinking, setThinking] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products?limit=20");
        const data = await res.json();
        setProducts(data.products);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };

    fetchProducts();
  }, []);

  const handleAskAI = async () => {
    if (!userPrompt) return;

    setThinking(true);

    const productText = products
  .map((p) => `• ${p.title} (₹${p.price}): ${p.description}`)
  .join("\n");


    const prompt = `
You are an expert shopping assistant.

Here's a list of products:

${productText}

The user says: "${userPrompt}"

Based on this, suggest 2-3 suitable products by name. 
Be friendly and explain briefly why they match the user's needs.
`;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: prompt }],
              },
            ],
          }),
        }
      );

      const data = await response.json();
      console.log("📦 Numa Response:", data);

      const content = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      setAiResponse(content || "🤖 No relevant suggestions found.");
    } catch (error) {
      console.error("Gemini API Error:", error);
      setAiResponse("❌ Failed to get AI response. Try again later.");
    } finally {
      setThinking(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">🧠 Numa</h2>

      {loading ? (
        <p className="text-gray-500 text-center">Loading products...</p>
      ) : (
        <>
          <label className="block mb-2 font-medium text-gray-700">
            What are you looking for?
          </label>
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
            <div className="mt-6 p-4 bg-green-50 border border-green-300 rounded">
              <h4 className="font-semibold mb-2">🤖 Numa Suggests:</h4>
              <pre className="whitespace-pre-wrap">{aiResponse}</pre>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductAIHelper;
