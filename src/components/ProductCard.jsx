import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { cart, dispatch: cartDispatch } = useCart();
  const { wishlist, dispatch: wishlistDispatch } = useWishlist();

  const cartItem = cart.find((item) => item.id === product.id);
  const inWishlist = wishlist.some((item) => item.id === product.id);

  const handleAddToCart = () => {
    if (cartItem) {
      cartDispatch({ type: "INCREMENT_QUANTITY", payload: product.id });
    } else {
      cartDispatch({ type: "ADD_TO_CART", payload: product });
    }
  };

  const handleRemoveFromCart = () => {
    cartDispatch({ type: "DECREMENT_QUANTITY", payload: product.id });
  };

  const toggleWishlist = () => {
    if (inWishlist) {
      wishlistDispatch({ type: "REMOVE_FROM_WISHLIST", payload: product.id });
    } else {
      wishlistDispatch({ type: "ADD_TO_WISHLIST", payload: product });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transform transition duration-300 hover:scale-105 hover:rotate-1 p-4">

      <Link to={`/product/${product.id}`}>
        <img
          src={product.images?.[0]}
          alt={product.title}
          className="w-full h-48 object-cover rounded-lg"
        />
        <h2 className="mt-2 text-lg font-bold text-gray-800">{product.title}</h2>
      </Link>

      <p className="text-gray-600 mt-1">₹{product.price}</p>

      {/* Wishlist button */}
      <button
        onClick={toggleWishlist}
        aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        className={`absolute top-3 right-3 text-2xl transition-colors ${
          inWishlist ? "text-pink-600" : "text-gray-300 hover:text-pink-600"
        }`}
        title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
      >
        {inWishlist ? "❤️" : "🤍"}
      </button>

      {cartItem ? (
        <div className="flex items-center justify-between mt-2">
          <button
            onClick={handleRemoveFromCart}
            className="bg-red-500 text-white px-3 py-1 rounded-md"
          >
            −
          </button>
          <span className="font-medium">{cartItem.quantity}</span>
          <button
            onClick={handleAddToCart}
            className="bg-green-500 text-white px-3 py-1 rounded-md"
          >
            +
          </button>
        </div>
      ) : (
        <button
          onClick={handleAddToCart}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:rotate-1"
        >
          Add to Cart
        </button>
      )}
    </div>
  );
};

export default ProductCard;
