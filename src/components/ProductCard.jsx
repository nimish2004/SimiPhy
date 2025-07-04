import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { cart, dispatch } = useCart();
  const cartItem = cart.find(item => item.id === product.id);

  const handleAdd = () => {
    if (cartItem) {
      dispatch({ type: "INCREMENT_QUANTITY", payload: product.id });
    } else {
      dispatch({ type: "ADD_TO_CART", payload: product });
    }
  };

  const handleRemove = () => {
    dispatch({ type: "DECREMENT_QUANTITY", payload: product.id });
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-200 p-4">
      <Link to={`/product/${product.id}`}>
        <img
          src={product.images?.[0]}
          alt={product.title}
          className="w-full h-48 object-cover rounded-lg"
        />
        <h2 className="mt-2 text-lg font-bold text-gray-800">{product.title}</h2>
      </Link>

      <p className="text-gray-600 mt-1">₹{product.price}</p>

      {cartItem ? (
        <div className="flex items-center justify-between mt-2">
          <button
            onClick={handleRemove}
            className="bg-red-500 text-white px-3 py-1 rounded-md"
          >
            −
          </button>
          <span className="font-medium">{cartItem.quantity}</span>
          <button
            onClick={handleAdd}
            className="bg-green-500 text-white px-3 py-1 rounded-md"
          >
            +
          </button>
        </div>
      ) : (
        <button
          onClick={handleAdd}
          className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
        >
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default ProductCard;
