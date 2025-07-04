import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState, useEffect, useRef } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";


const Navbar = ({ onSearchChange }) => {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => setUser(user));
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const close = (e) =>
      dropdownRef.current && !dropdownRef.current.contains(e.target) &&
      setShowDropdown(false);

    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    setShowDropdown(false);
  };

  return (
    <nav className="bg-white shadow-md px-6 py-3 flex items-center justify-between sticky top-0 z-50">
      {/* Left: Logo + Location */}
      <div className="flex items-center space-x-8">
        <Link to="/" className="text-2xl font-bold text-blue-600">SimiPhy</Link>
        <div className="hidden sm:block text-xs text-gray-600">
          <p className="font-semibold">Deliver to</p>
          <p className="text-sm">📍 {localStorage.getItem("userPincode") || "302001"}</p>
        </div>
      </div>

      {/* Center: Search */}
      <input
        type="text"
        placeholder="Search for products..."
        onChange={(e) => onSearchChange(e.target.value)}
        className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 py-2 rounded-md w-1/2 transition"
      />

      {/* Right: Profile + Cart */}
      <div className="flex items-center space-x-6 text-sm relative">
        {/* Profile */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setShowDropdown((prev) => !prev)}
            className="text-gray-700 hover:text-blue-600 transition"
          >
            <p className="text-xs">Hello, {user?.email?.split("@")[0] || "Guest"}</p>
            <p className="font-semibold flex items-center gap-1">
              Account <span className="text-xs">▼</span>
            </p>
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
<Link to="/wishlist" className="text-xl text-pink-600 hover:text-pink-700">
  💖
</Link>

        {/* Cart */}
        <Link to="/cart" className="relative text-gray-700 text-2xl hover:text-blue-600 transition">
          🛒
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
