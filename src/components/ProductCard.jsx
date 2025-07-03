import { useCart } from "../context/CartContext"; // ✅ import

const ProductCard = ({ product }) => {
  const { dispatch } = useCart(); // ✅ use context

  const addToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-200 p-4">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover rounded-lg"
      />
      <div className="mt-4 space-y-1">
        <h2 className="text-lg font-bold text-gray-800">{product.name}</h2>
        <p className="text-gray-600">₹{product.price}</p>
        <button
          onClick={addToCart}
          className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
