import { FaTwitter, FaInstagram, FaFacebook, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white pt-10 pb-6 mt-12 border-t border-gray-700">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10 text-sm">
        {/* Left - Brand */}
        <div>
          <h2 className="text-2xl font-bold text-blue-400">SimiPhy</h2>
          <p className="mt-2 text-gray-300 leading-relaxed">
            Quality products. Trusted service. Fast delivery.
          </p>
          <p className="mt-6 text-xs text-gray-500">
            &copy; {new Date().getFullYear()} SimiPhy. All rights reserved.
          </p>
        </div>

        {/* Center - Links */}
        <div>
          <h3 className="text-lg font-semibold text-blue-300 mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li>
              <a href="/" className="hover:text-white transition duration-200">🏠 Home</a>
            </li>
            <li>
              <a href="/orders" className="hover:text-white transition duration-200">📦 My Orders</a>
            </li>
            <li>
              <a href="/wishlist" className="hover:text-white transition duration-200">❤️ Wishlist</a>
            </li>
            <li>
              <a href="/profile" className="hover:text-white transition duration-200">👤 My Profile</a>
            </li>
          </ul>
        </div>

        {/* Right - Contact & Social */}
        <div>
          <h3 className="text-lg font-semibold text-blue-300 mb-4">Contact Us</h3>
          <p className="text-gray-300 mb-1">📧 nimish.berwal@gmail.com</p>
          <p className="text-gray-300 mb-4">📞 +91 97998 989xx</p>

          <div className="flex space-x-5 mt-2 text-2xl">
            <a href="https://x.com/NimishBerw67616" className="hover:text-blue-400 transition"><FaTwitter /></a>
            <a href="https://www.instagram.com/nimish.2003/" className="hover:text-pink-500 transition"><FaInstagram /></a>
            <a href="https://github.com/nimish2004/SimiPhy" className="hover:text-blue-600 transition"><FaGithub /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
