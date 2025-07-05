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
    <div className="w-full overflow-hidden border-b border-gray-200 bg-white">
      <div className="marquee whitespace-nowrap py-2">
        {[...categories, ...categories].map((cat, index) => (
          <span
            key={index}
            className="inline-block mx-6 text-sm font-medium text-gray-700 hover:text-pink-600 cursor-pointer"
          >
            {cat}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TopBar;
