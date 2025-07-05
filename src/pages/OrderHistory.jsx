import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { generateInvoice } from "../utils/generateInvoice";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setOrders([]);
        setLoading(false);
        return;
      }

      const uid = user.uid;
      const stored = localStorage.getItem(`orders_${uid}`);
      const parsedOrders = stored ? JSON.parse(stored) : [];
      setOrders(parsedOrders.sort((a, b) => new Date(b.date) - new Date(a.date)));
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading your orders...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 md:p-8">
      <h2 className="text-3xl font-bold text-blue-700 mb-6">📦 My Orders</h2>

      {orders.length === 0 ? (
        <div className="text-center text-gray-500 text-lg mt-8">
          No past orders yet. Start shopping!
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order, index) => (
            <div
              key={index}
              className="bg-white border rounded-xl shadow-md p-6 transition hover:shadow-lg"
            >
              {/* Top Info */}
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-2 mb-4">
                <div>
                  <p className="font-semibold text-gray-700">
                    Order ID: <span className="text-blue-600 text-sm">{order.id}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    📅 {new Date(order.date).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">👤 {order.name}</p>
                </div>
                <p className="text-xl font-bold text-green-600">₹{order.total}</p>
              </div>

              <hr className="my-3" />

              {/* Products */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 border rounded p-2"
                  >
                    <img
                      src={item.thumbnail || item.image || item.images?.[0]}
                      alt={item.name || item.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div>
                      <p className="font-medium text-gray-800">{item.name || item.title}</p>
                      <p className="text-gray-600">Qty: {item.quantity}</p>
                      <p className="text-gray-500">Price: ₹{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* 🧾 Invoice Download Button */}
              <button
                onClick={() => generateInvoice(order)}
                className="mt-4 inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                🧾 Download Invoice
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
