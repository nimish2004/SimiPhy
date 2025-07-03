import { useLocation, Link } from "react-router-dom";

const Success = () => {
  const location = useLocation();
  const { paymentId, name, total } = location.state || {};

  return (
    <div className="max-w-2xl mx-auto py-16 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">🎉 Order Successful!</h1>

      <p className="text-gray-700 mb-2">
        Thank you <span className="font-semibold">{name}</span> for your purchase.
      </p>

      <p className="text-gray-600 mb-4">
        Payment ID: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{paymentId}</span>
      </p>

      <p className="text-xl font-bold mb-6">Total Paid: ₹{total}</p>

      <Link
        to="/"
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default Success;
