import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, dispatch } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">🛒 Your Cart</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center bg-white p-4 rounded shadow">
                <div>
                  <h3 className="font-semibold">{item.name}</h3>
                  <p>Quantity: {item.quantity}</p>
                </div>
                <div className="flex items-center gap-4">
                  <p className="font-semibold">₹{item.price * item.quantity}</p>
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

          <div className="flex justify-between items-center font-bold text-lg mb-4">
            <span>Total:</span>
            <span>₹{total}</span>
          </div>

          <Link
            to="/checkout"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-md transition"
          >
            Proceed to Checkout
          </Link>
        </>
      )}
    </div>
  );
};

export default Cart;
