import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Checkout = () => {
  const { cart, dispatch } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleOrder = () => {
    if (!form.name || !form.address || !form.phone) {
      alert("Please fill all fields");
      return;
    }

    // Placeholder for real payment
    alert("Order placed successfully!");

    // Clear cart
    dispatch({ type: "CLEAR_CART" });

    // Redirect to home
    navigate("/");
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">🧾 Checkout</h2>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="border border-gray-300 px-4 py-2 rounded-md w-full"
        />
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="border border-gray-300 px-4 py-2 rounded-md w-full"
        />
        <textarea
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Shipping Address"
          className="border border-gray-300 px-4 py-2 rounded-md col-span-full w-full"
          rows="3"
        ></textarea>
      </div>

      {/* Order Summary */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">🛒 Order Summary</h3>
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between py-2 border-b">
            <div>{item.name} x {item.quantity}</div>
            <div>₹{item.price * item.quantity}</div>
          </div>
        ))}
        <div className="flex justify-between font-bold mt-4 text-lg">
          <span>Total:</span>
          <span>₹{total}</span>
        </div>

        <button
          onClick={handleOrder}
          className="mt-6 w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Checkout;
