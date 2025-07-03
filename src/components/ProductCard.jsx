import { useCart } from "../context/CartContext"; 
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { dispatch } = useCart();

  const addToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-200 p-4">
      
      {/* 👇 Wrap image + title in a Link */}
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-lg"
        />
        <h2 className="mt-2 text-lg font-bold text-gray-800">{product.name}</h2>
      </Link>

      <p className="text-gray-600 mt-1">₹{product.price}</p>

      <button
        onClick={addToCart}
        className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
