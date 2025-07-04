import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // optional loader state

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

    return () => unsubscribe(); // cleanup listener on unmount
  }, []);

  if (loading) {
    return <p className="text-center mt-8 text-gray-500">Loading orders...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">📜 Order History</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">No past orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order, index) => (
            <div key={index} className="p-4 bg-white shadow rounded-md">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">Order ID: <span className="text-sm text-blue-600">{order.id}</span></p>
                  <p className="text-sm text-gray-500">Date: {new Date(order.date).toLocaleString()}</p>
                  <p className="text-sm">Name: {order.name}</p>
                </div>
                <p className="font-bold text-lg">₹{order.total}</p>
              </div>
              <hr className="my-2" />
              <div className="text-sm">
                {order.items.map((item) => (
                  <p key={item.id}>• {item.name} × {item.quantity}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
