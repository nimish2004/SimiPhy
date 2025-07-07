import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

const ProductList = ({ products, view }) => {
  const { wishlist, dispatch: wishlistDispatch } = useWishlist();
  const { cart, dispatch: cartDispatch } = useCart();

  const toggleWishlist = (e, product) => {
    e.preventDefault();
    e.stopPropagation();

    const isWishlisted = wishlist.some((item) => item.id === product.id);
    if (isWishlisted) {
      wishlistDispatch({ type: "REMOVE_FROM_WISHLIST", payload: product.id });
    } else {
      wishlistDispatch({ type: "ADD_TO_WISHLIST", payload: product });
    }
  };

  const isWishlisted = (product) =>
    wishlist.some((item) => item.id === product.id);

  const getQuantity = (id) => {
    const found = cart.find((item) => item.id === id);
    return found ? found.quantity : 0;
  };

  return (
    <div
      className={
        view === "grid"
          ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          : "flex flex-col gap-6"
      }
    >
      {products.map((product) =>
        view === "list" ? (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            className="bg-white p-4 rounded-xl shadow-sm flex gap-4 items-start hover:shadow-md transition relative"
          >
            {/* 💖 Wishlist Button */}
            <button
              onClick={(e) => toggleWishlist(e, product)}
              className={`absolute top-3 right-3 text-2xl z-10 transition-transform duration-200 ${
                isWishlisted(product)
                  ? "text-pink-600 scale-110"
                  : "text-gray-300 hover:text-pink-500"
              } hover:scale-125`}
              title={
                isWishlisted(product)
                  ? "Remove from Wishlist"
                  : "Add to Wishlist"
              }
            >
              {isWishlisted(product) ? "❤️" : "🤍"}
            </button>

            <img
              src={product.image}
              alt={product.title}
              className="w-32 h-32 object-cover rounded"
            />

            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  {product.title}
                </h2>
                <p className="text-gray-600">₹{product.price}</p>
              </div>

              {getQuantity(product.id) === 0 ? (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    cartDispatch({ type: "ADD_TO_CART", payload: product });
                  }}
                  className="mt-2 self-start bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                >
                  Add to Cart
                </button>
              ) : (
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      cartDispatch({
                        type: "DECREMENT_QUANTITY",
                        payload: product.id,
                      });
                    }}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    −
                  </button>
                  <span className="font-semibold">
                    {getQuantity(product.id)}
                  </span>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      cartDispatch({
                        type: "INCREMENT_QUANTITY",
                        payload: product.id,
                      });
                    }}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    +
                  </button>
                </div>
              )}
            </div>
          </Link>
        ) : (
          <ProductCard key={product.id} product={product} />
        )
      )}
    </div>
  );
};

export default ProductList;
