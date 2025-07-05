const Sidebar = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  sortOrder,
  setSortOrder,
  selectedRating,
  setSelectedRating,
}) => {
  return (
    <aside className="w-full md:w-64 bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-bold mb-4">Filters</h3>

      {/* Categories */}
      <div className="mb-4">
        <label className="font-medium text-gray-700">Category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full mt-1 border border-gray-300 rounded-md px-2 py-1"
        >
          <option value="">All</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Sort by Price */}
      <div className="mb-4">
        <label className="font-medium text-gray-700">Sort by Price:</label>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="w-full mt-1 border border-gray-300 rounded-md px-2 py-1"
        >
          <option value="">None</option>
          <option value="asc">Low → High</option>
          <option value="desc">High → Low</option>
        </select>
      </div>

      {/* Rating Filter */}
      <div className="mb-4">
        <label className="font-medium text-gray-700">Minimum Rating:</label>
        <select
          value={selectedRating}
          onChange={(e) => setSelectedRating(Number(e.target.value))}
          className="w-full mt-1 border border-gray-300 rounded-md px-2 py-1"
        >
          <option value={0}>All</option>
          <option value={1}>1★ & above</option>
          <option value={2}>2★ & above</option>
          <option value={3}>3★ & above</option>
          <option value={4}>4★ & above</option>
        </select>
      </div>
    </aside>
  );
};

export default Sidebar;
