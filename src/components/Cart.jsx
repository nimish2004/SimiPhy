import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Cart = () => {
  const { cart, dispatch } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">🛒 Your Cart</h2>

        {cart.length === 0 ? (
          <p className="text-gray-500 text-lg">Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-4 mb-8">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
                  <div>
                    <h3 className="text-lg font-semibold">{item.title || item.name}</h3>
                    <div className="flex items-center mt-2 gap-2">
                      <button
                        onClick={() => dispatch({ type: "DECREMENT_QUANTITY", payload: item.id })}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        −
                      </button>
                      <span className="font-medium">{item.quantity}</span>
                      <button
                        onClick={() => dispatch({ type: "INCREMENT_QUANTITY", payload: item.id })}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <p className="text-lg font-semibold text-blue-600">
                      ₹{item.price * item.quantity}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:underline text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center text-xl font-bold mb-6">
              <span>Total:</span>
              <span>₹{total}</span>
            </div>

            <Link
              to="/checkout"
              className="block text-center w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md transition"
            >
              Proceed to Checkout
            </Link>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
