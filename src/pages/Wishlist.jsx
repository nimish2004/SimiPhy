// src/pages/Wishlist.jsx
import { useWishlist } from "../context/WishlistContext";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const { wishlist, dispatch } = useWishlist();

  return (
    <>
    <div className="max-w-5xl mx-auto p-6">
      
      <h2 className="text-2xl font-bold mb-6">💖 My Wishlist</h2>

      {wishlist.length === 0 ? (
        <p className="text-gray-500">No items in wishlist.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {wishlist.map((item) => (
            <div key={item.id} className="bg-white p-4 shadow rounded">
              <img src={item.thumbnail} alt={item.title} className="h-32 w-full object-contain" />
              <p className="mt-2 font-semibold text-sm">{item.title}</p>
              <p className="text-sm">₹{item.price}</p>

              <div className="flex justify-between mt-2">
                <Link to={`/product/${item.id}`} className="text-blue-600 text-sm">View</Link>
                <button
                  onClick={() => dispatch({ type: "REMOVE_FROM_WISHLIST", payload: item.id })}
                  className="text-red-500 text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
};

export default Wishlist;
