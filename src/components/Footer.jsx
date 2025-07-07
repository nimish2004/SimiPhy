import { FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white py-12 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-sm">
        
        {/* Left - Brand */}
        <div>
          <h2 className="text-3xl font-extrabold text-blue-400 tracking-tight">SimiPhy</h2>
          <p className="mt-3 text-gray-400 leading-relaxed text-sm">
            Elevating everyday essentials with style, speed, and simplicity.
          </p>
          <p className="mt-6 text-xs text-gray-500">
            &copy; {new Date().getFullYear()} SimiPhy. All rights reserved.
          </p>
        </div>

        {/* Center - Quick Links */}
        <div>
          <h3 className="text-xl font-semibold text-blue-300 mb-4">Quick Links</h3>
          <ul className="space-y-3 text-gray-300 font-medium tracking-wide uppercase text-sm">
            {[
              { label: "🏠 Home", href: "/" },
              { label: "📦 My Orders", href: "/orders" },
              { label: "❤️ Wishlist", href: "/wishlist" },
              { label: "👤 My Profile", href: "/profile" },
            ].map((link, i) => (
              <li key={i}>
                <a
                  href={link.href}
                  className="relative group inline-block transition duration-200"
                >
                  <span className="bg-left-bottom bg-gradient-to-r from-pink-500 to-blue-500 bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-300">
                    {link.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right - Contact & Social */}
        <div>
          <h3 className="text-xl font-semibold text-blue-300 mb-4">Contact Us</h3>
          <p className="text-gray-400 mb-1">📧 nimish.berwal@gmail.com</p>
          <p className="text-gray-400 mb-4">📞 +91 97998 989xx</p>

          <div className="flex space-x-5 text-2xl mt-4">
            <a
              href="https://x.com/NimishBerw67616"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition duration-300"
              title="Twitter"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.instagram.com/nimish.2003/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-pink-500 transition duration-300"
              title="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://github.com/nimish2004/SimiPhy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition duration-300"
              title="GitHub"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
