import { useEffect, useState } from "react";

const Sidebar = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  sortOrder,
  setSortOrder,
  selectedRating,
  setSelectedRating,
  stockFilter,
  setStockFilter
}) => {
  const ratings = [5, 4, 3, 2, 1];

  return (
    <aside className="w-full md:w-64 bg-white rounded-lg shadow-md p-5 space-y-8">
      {/* Categories */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-800">📦 Categories</h3>
        <ul className="space-y-2">
          <li
            className={`cursor-pointer px-2 py-1 rounded transition ${
              !selectedCategory ? "bg-blue-100 text-blue-700 font-semibold" : "hover:bg-gray-100"
            }`}
            onClick={() => setSelectedCategory("")}
          >
            All
          </li>
        {categories.map((cat) => (
  <li
  className={`cursor-pointer px-3 py-1 rounded-md transition-all duration-200 ${
    selectedCategory === cat
      ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
      : "hover:bg-yellow-100"
  }`}
  onClick={() => setSelectedCategory(cat)}
>
  {cat}
</li>

))}


        </ul>
      </div>

      {/* Sort by Price */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-800">💰 Sort by Price</h3>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Default</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>

      {/* Filter by Rating */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-800">⭐ Minimum Rating</h3>
        <select
          value={selectedRating}
          onChange={(e) => setSelectedRating(Number(e.target.value))}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        >
          <option value={0}>All Ratings</option>
          {ratings.map((rate) => (
            <option key={rate} value={rate}>
              {rate} Stars & up
            </option>
          ))}
        </select>
      </div>

      {/* Stock Filter */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-800">📦 Stock Status</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="stock"
              checked={stockFilter === "all"}
              onChange={() => setStockFilter("all")}
              className="accent-blue-600"
            />
            All
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="stock"
              checked={stockFilter === "in"}
              onChange={() => setStockFilter("in")}
              className="accent-green-600"
            />
            In Stock
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="stock"
              checked={stockFilter === "out"}
              onChange={() => setStockFilter("out")}
              className="accent-red-600"
            />
            Out of Stock
          </label>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
