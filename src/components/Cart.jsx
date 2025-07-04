import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Cart = () => {
  const { cart, dispatch } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

const formattedTotal = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 2,
}).format(total);

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
            <div className="space-y-6 mb-8">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-1 sm:grid-cols-3 items-center gap-4 p-4 bg-white rounded-lg shadow-md"
                >
                  {/* Optional image space */}
                  <div className="col-span-2">
                    <h3 className="text-xl font-semibold text-gray-800">
                      {item.title || item.name}
                    </h3>
                    <div className="flex items-center mt-3 gap-3">
                      <button
                        onClick={() => dispatch({ type: "DECREMENT_QUANTITY", payload: item.id })}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-4 rounded-md shadow hover:from-blue-700 hover:to-indigo-700"
                      >
                        −
                      </button>
                      <span className="text-lg font-medium">{item.quantity}</span>
                      <button
                        onClick={() => dispatch({ type: "INCREMENT_QUANTITY", payload: item.id })}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-4 rounded-md shadow hover:from-blue-700 hover:to-indigo-700"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col items-end justify-between h-full">
                    <p className="text-lg font-semibold text-blue-600">
                      ₹{item.price * item.quantity}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 text-sm hover:underline mt-2"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Sticky bottom total + checkout */}
            <div className="sticky bottom-4 bg-white border-t pt-4 pb-6 px-4 shadow-lg rounded-lg flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="text-xl font-bold w-full sm:w-auto text-center sm:text-left">
                <span>Total: {formattedTotal}</span>
              </div>
              <Link
                to="/checkout"
                className="w-full sm:w-auto text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md transition"
              >
                Proceed to Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
