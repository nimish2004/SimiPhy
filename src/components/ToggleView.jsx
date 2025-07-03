// src/components/ToggleView.jsx
const ToggleView = ({ view, setView }) => {
  return (
    <div className="flex justify-end mb-4">
      <div className="inline-flex border rounded-md overflow-hidden">
        <button
          onClick={() => setView("grid")}
          className={`px-4 py-2 text-sm ${view === "grid" ? "bg-blue-600 text-white" : "bg-white text-gray-700"}`}
        >
          Grid
        </button>
        <button
          onClick={() => setView("list")}
          className={`px-4 py-2 text-sm ${view === "list" ? "bg-blue-600 text-white" : "bg-white text-gray-700"}`}
        >
          List
        </button>
      </div>
    </div>
  );
};

export default ToggleView;
