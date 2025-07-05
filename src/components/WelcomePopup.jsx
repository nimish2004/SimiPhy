import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

const WelcomePopup = ({ userName }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-md flex items-center justify-center transition-opacity duration-500">
      {/* Close Button */}
      <button
        onClick={() => setVisible(false)}
        className="absolute top-4 right-4 text-white text-2xl hover:scale-110 transition"
      >
        <FaTimes />
      </button>

      {/* Welcome Box */}
      <div className="relative bg-gradient-to-br from-purple-600/40 via-pink-500/40 to-yellow-400/40 border-2 border-white/30 backdrop-blur-lg text-white rounded-xl px-8 py-10 shadow-2xl animate-fade-in">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2 animate-pulse drop-shadow-lg">
          👋 Welcome back to SimiPhy, {userName || "Friend"}!
        </h1>
        <p className="text-sm md:text-base text-white/80 drop-shadow-sm">
          Let’s find something amazing today 🛍️✨
        </p>
      </div>
    </div>
  );
};
export default WelcomePopup;
