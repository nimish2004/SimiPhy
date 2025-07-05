import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState, useEffect, useRef } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { FaUserCircle } from "react-icons/fa"; // or any other icon


const Navbar = ({ onSearchChange }) => {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  

  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  const [pincode, setPincode] = useState(localStorage.getItem("userPincode") || "302017");
  const [isEditingPincode, setIsEditingPincode] = useState(false);
  const pincodeInputRef = useRef(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => setUser(user));
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const close = (e) =>
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target) &&
      setShowDropdown(false);

    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  useEffect(() => {
    if (isEditingPincode && pincodeInputRef.current) {
      pincodeInputRef.current.focus();
    }
  }, [isEditingPincode]);

  const handleLogout = async () => {
    await signOut(auth);
    setShowDropdown(false);
  };

  const savePincode = (newPin) => {
    if (newPin.trim() === "") return;
    setPincode(newPin);
    localStorage.setItem("userPincode", newPin);
    setIsEditingPincode(false);
  };

  return (
    <nav className="bg-white/70 backdrop-blur-lg shadow-md px-4 py-3 sticky top-0 z-50 border-b border-blue-200">
      {/* Top Row */}
      <div className="flex items-center justify-between flex-wrap gap-y-2">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500"
        >
          SimiPhy
        </Link>

        {/* Search */}
        <div className="flex-1 mx-4 max-w-md">
          <input
            type="text"
            placeholder="Search products..."
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 py-2 rounded-md transition"
          />
        </div>

        {/* Account + Cart */}
        <div className="flex items-center gap-4 text-sm">
          {/* Account Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
  onClick={() => setShowDropdown((prev) => !prev)}
  className="text-gray-700 hover:text-blue-600 transition text-left flex items-center gap-1"
>
  <FaUserCircle className="text-2xl" />
</button>


            {showDropdown && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-md shadow-lg border z-50">
                <ul className="py-2 text-sm">
                  <li>
                    <Link
                      to="/profile"
                      onClick={() => setShowDropdown(false)}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      👤 My Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/orders"
                      onClick={() => setShowDropdown(false)}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      📦 My Orders
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/wishlist"
                      onClick={() => setShowDropdown(false)}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      💖 Wishlist
                    </Link>
                  </li>
                  <li>
                    {user ? (
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                      >
                        🔓 Logout
                      </button>
                    ) : (
                      <Link
                        to="/signin"
                        onClick={() => setShowDropdown(false)}
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        🔐 Sign In
                      </Link>
                    )}
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Cart */}
          <Link
            to="/cart"
            className="relative text-gray-700 text-2xl hover:text-blue-600 transition"
          >
            🛒
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Bottom Row: Pincode */}
      {/* <div className="mt-2 flex justify-start">
        <div className="text-xs text-gray-600 cursor-pointer">
          <p className="leading-none font-medium">Deliver to</p>
          {isEditingPincode ? (
            <input
              ref={pincodeInputRef}
              type="text"
              maxLength={6}
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              onBlur={() => savePincode(pincode)}
              onKeyDown={(e) => {
                if (e.key === "Enter") savePincode(pincode);
                if (e.key === "Escape") {
                  setIsEditingPincode(false);
                  setPincode(localStorage.getItem("userPincode") || "302017");
                }
              }}
              className="border border-gray-300 rounded px-2 py-0.5 text-sm w-20"
            />
          ) : (
            <p
              onClick={() => setIsEditingPincode(true)}
              className="text-sm hover:underline"
            >
              📍 {pincode}
            </p>
          )}
        </div>
      </div> */}
    </nav>
  );
};

export default Navbar;
