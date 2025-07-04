import { useState, useRef, useEffect } from "react";
import ProductAIHelper from "./ProductAIHelper";

const FloatingAIButton = () => {
  const [showAI, setShowAI] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const ref = useRef();

  // Auto hide tooltip after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Close chatbox if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowAI(false);
      }
    }
    if (showAI) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showAI]);

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setShowAI((prev) => !prev)}
        className="
          fixed bottom-8 right-8 z-50
          bg-blue-600 hover:bg-blue-700
          text-white font-bold
          rounded-full
          w-14 h-14
          flex items-center justify-center
          shadow-lg
          glow-button
          transition
          group
        "
        title="Gemini AI Shopping Assistant"
      >
        🧠
        <span
          className={`
            absolute right-16 bg-blue-700 text-white text-xs font-semibold rounded px-2 py-1
            select-none whitespace-nowrap
            transition-opacity
            ${showTooltip ? "opacity-100" : "opacity-0"} 
            group-hover:opacity-100
          `}
        >
          Ask AI what to buy
        </span>
      </button>

      {/* Chatbox popup */}
      {showAI && (
        <div
          ref={ref}
          className="
            fixed bottom-24 right-8 z-50
            w-[320px] max-h-[480px]
            bg-white
            rounded-lg
            shadow-xl
            flex flex-col
            overflow-hidden
            ring-1 ring-black ring-opacity-5
          "
        >
          <div className="flex justify-between items-center p-3 border-b">
            <h3 className="text-lg font-semibold">🧠 AI Assistant </h3>
            <button
              onClick={() => setShowAI(false)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-4 rounded-md shadow hover:from-blue-700 hover:to-indigo-700"

              aria-label="Close chatbox"
            >
              &times;
            </button>
          </div>
          <div className="flex-1 overflow-auto">
            <ProductAIHelper />
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingAIButton;
