import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Navbar = ({ onSearchChange }) => {
  const { cart } = useCart();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-white shadow-md p-4 px-8 flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="text-2xl font-bold text-blue-600">SimiPhy</Link>

      <input
        type="text"
        placeholder="Search for products..."
        onChange={(e) => onSearchChange(e.target.value)}
        className="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 px-4 py-2 rounded-md w-1/2"
      />

      <Link to="/cart" className="relative text-2xl">
        🛒
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-1.5 rounded-full">
            {totalItems}
          </span>
        )}
      </Link>
    </nav>
  );
};

export default Navbar;
