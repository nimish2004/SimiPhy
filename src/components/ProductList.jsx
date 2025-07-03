// src/components/ProductList.jsx
import ProductCard from "./ProductCard";

const ProductList = ({ products, view }) => {
  return (
    <div className={view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" : "flex flex-col gap-6"}>
      {products.map((product) => (
        <div key={product.id} className={view === "list" ? "bg-white p-4 rounded-xl shadow-sm flex gap-4" : ""}>
          {view === "list" ? (
            <>
              <img src={product.image} alt={product.name} className="w-32 h-32 object-cover rounded" />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-800">{product.name}</h2>
                  <p className="text-gray-600">₹{product.price}</p>
                </div>
                <button className="mt-2 self-start bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
                  Add to Cart
                </button>
              </div>
            </>
          ) : (
            <ProductCard product={product} />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductList;
