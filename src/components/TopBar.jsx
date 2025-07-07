import { useLocation } from "react-router-dom";

const categories = [
  "Makeup",
  "Skin",
  "Hair",
  "Fragrance",
  "Bath & Body",
  "Appliances",
  "Men",
  "Wellness",
  "Mom & Baby",
  "Natural",
  "Luxury",
];

const TopBar = () => {
  const location = useLocation();
  const showTopBar = location.pathname === "/" || location.pathname.startsWith("/product");

  if (!showTopBar) return null;

  return (
    <div className="w-full overflow-hidden border-b border-pink-300 bg-gradient-to-r from-pink-100 via-blue-200 to-green-200 shadow-sm">
      <div className="marquee whitespace-nowrap py-2">
        {[...categories, ...categories].map((cat, index) => (
          <span
            key={index}
            className="inline-block mx-6 text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-red-500  transition cursor-pointer"
          >
            {cat}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TopBar;
