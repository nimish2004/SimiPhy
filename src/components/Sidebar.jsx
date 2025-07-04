import { useEffect, useState } from "react";

const Sidebar = ({ categories, selectedCategory, setSelectedCategory, sortOrder, setSortOrder }) => {
  return (
    <aside className="w-full md:w-64 bg-white rounded-lg shadow p-4 space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Filter by Category</h3>
        <ul className="space-y-1">
          <li
            className={`cursor-pointer ${!selectedCategory ? "font-bold text-blue-600" : ""}`}
            onClick={() => setSelectedCategory("")}
          >
            All
          </li>

          {categories.map((catObj) => (
            <li
              key={catObj.slug} // Use slug or name for key
              className={`cursor-pointer ${selectedCategory === catObj.name ? "font-bold text-blue-600" : ""}`}
              onClick={() => setSelectedCategory(catObj.name)}
            >
              {catObj.name}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Sort by Price</h3>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="w-full border rounded px-3 py-2"
        >
          <option value="">Default</option>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>
    </aside>
  );
};


export default Sidebar;
