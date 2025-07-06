import { useLocation, Link } from "react-router-dom";

const Success = () => {
  const location = useLocation();
  const { paymentId, name, total } = location.state || {};

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-green-50 via-purple-50 to-pink-50 px-4">
      <div className="max-w-xl w-full bg-white/80 backdrop-blur-md p-8 rounded-xl shadow-lg text-center animate-fade-in">
        <div className="text-green-600 text-5xl mb-4">✅</div>

        <h1 className="text-3xl font-bold text-green-700 mb-3">Order Successful!</h1>

        <p className="text-gray-700 mb-2">
          Thank you <span className="font-semibold">{name}</span> for your purchase!
        </p>

        {paymentId && (
          <p className="text-gray-600 mb-2">
            Payment ID:
            <span className="ml-2 font-mono bg-gray-100 px-2 py-1 rounded text-sm inline-block">
              {paymentId}
            </span>
          </p>
        )}

        <p className="text-lg font-semibold text-gray-800 mt-2 mb-6">
          Total Paid: <span className="text-blue-700 font-bold">₹{total}</span>
        </p>

        <Link
          to="/"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition shadow-md"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default Success;
