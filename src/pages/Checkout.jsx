import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { db, auth } from "../firebase";
import { doc, updateDoc, arrayUnion, setDoc, getDoc } from "firebase/firestore";

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

  // ✅ Format INR
  const formatINR = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
    }).format(amount);

  // ✅ Fix total precision
  const total = parseFloat(
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)
  );

  const handleOrder = async () => {
    if (!form.name || !form.address || !form.phone) {
      alert("Please fill all fields");
      return;
    }

    const options = {
      key: "rzp_test_LrHYwGpgIOOaN3",
      amount: total * 100,
      currency: "INR",
      name: "SimiPhy Store",
      description: "Order Payment",
      handler: async function (response) {
        const uid = auth.currentUser.uid;

        const newOrder = {
          id: Date.now(),
          paymentId: response.razorpay_payment_id,
          name: form.name,
          phone: form.phone,
          address: form.address,
          date: new Date().toISOString(),
          items: cart,
          total,
        };

        const existingOrders = JSON.parse(localStorage.getItem(`orders_${uid}`)) || [];
        const updatedOrders = [...existingOrders, newOrder];
        localStorage.setItem(`orders_${uid}`, JSON.stringify(updatedOrders));

        const userDocRef = doc(db, "orders", uid);
        const docSnap = await getDoc(userDocRef);

        if (!docSnap.exists()) {
          await setDoc(userDocRef, { orders: [newOrder] });
        } else {
          await updateDoc(userDocRef, {
            orders: arrayUnion(newOrder),
          });
        }

        dispatch({ type: "CLEAR_CART" });
        navigate("/success", {
          state: {
            paymentId: response.razorpay_payment_id,
            name: form.name,
            total,
          },
        });
      },
      prefill: {
        name: form.name,
        email: "test@example.com",
        contact: form.phone,
      },
      notes: {
        address: form.address,
      },
      theme: {
        color: "#0d6efd",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
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
            <div>{item.name || item.title} × {item.quantity}</div>
            <div>{formatINR(item.price * item.quantity)}</div>
          </div>
        ))}
        <div className="flex justify-between font-bold mt-4 text-lg">
          <span>Total:</span>
          <span>{formatINR(total)}</span>
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
