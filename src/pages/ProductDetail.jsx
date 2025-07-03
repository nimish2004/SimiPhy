import { useParams, useNavigate } from "react-router-dom";
import products from "../data/products.json";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id.toString() === id);
  const { dispatch } = useCart();

  if (!product) {
    return <div className="p-6 text-center text-red-500">Product not found.</div>;
  }

  const addToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* 🔙 Go Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-blue-600 hover:underline flex items-center gap-1"
      >
        ← Go Back
      </button>

      <div className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row gap-6">
        <img
          src={product.image}
          alt={product.name}
          className="w-full md:w-1/2 h-64 object-cover rounded-lg"
        />
        <div className="flex-1 space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">{product.name}</h2>
          <p className="text-gray-700 text-lg font-semibold">₹{product.price}</p>
          <p className="text-gray-600 text-sm">Category: {product.category}</p>
          <p className="text-sm text-gray-500">
            This is a great product. You can enhance this by adding dynamic long descriptions.
          </p>
          <button
            onClick={addToCart}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
