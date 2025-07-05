import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const { cart, dispatch } = useCart();
  const [product, setProduct] = useState(null);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ name: "", rating: 5, comment: "", hover: 0 });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await res.json();
        setProduct(data);

        const recRes = await fetch(`https://fakestoreapi.com/products/category/${data.category}`);
        const recData = await recRes.json();
        setRecommended(recData.filter((p) => p.id !== data.id).slice(0, 4));

        const localReviews = JSON.parse(localStorage.getItem(`reviews_${id}`)) || [];
        setReviews(localReviews);
      } catch (err) {
        console.error("Error loading product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;

    const updated = [...reviews, { ...newReview, date: new Date().toISOString() }];
    setReviews(updated);
    localStorage.setItem(`reviews_${id}`, JSON.stringify(updated));
    setNewReview({ name: "", rating: 5, comment: "", hover: 0 });
  };

  if (loading || !product) {
    return <p className="text-center mt-12 text-gray-500">Loading product...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Link to="/" className="text-blue-600 hover:underline text-sm">← Back to Home</Link>

      {/* Product Info */}
      <div className="grid md:grid-cols-2 gap-10 mt-6">
        <img src={product.image} alt={product.title} className="w-full h-96 object-contain rounded-lg" />
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-lg text-gray-600">₹{product.price}</p>
          <p className="text-gray-700">{product.description}</p>

          {cart.find((item) => item.id === product.id) ? (
            <div className="flex items-center space-x-4 mt-4">
              <button
                onClick={() => dispatch({ type: "DECREMENT_QUANTITY", payload: product.id })}
                className="bg-red-500 text-white px-3 py-1 rounded-md"
              >
                −
              </button>
              <span className="font-medium">
                {cart.find((item) => item.id === product.id)?.quantity}
              </span>
              <button
                onClick={() => dispatch({ type: "INCREMENT_QUANTITY", payload: product.id })}
                className="bg-green-500 text-white px-3 py-1 rounded-md"
              >
                +
              </button>
            </div>
          ) : (
            <button
              onClick={addToCart}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>

      {/* Recommended Products */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">You May Also Like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {recommended.map((item) => (
            <Link
              to={`/product/${item.id}`}
              key={item.id}
              className="bg-white p-4 rounded-md shadow hover:shadow-md transition"
            >
              <img src={item.image} alt={item.title} className="h-40 object-contain w-full rounded" />
              <p className="mt-2 font-medium text-sm text-gray-800">{item.title}</p>
              <p className="text-gray-600 text-sm">₹{item.price}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>

        <form onSubmit={handleReviewSubmit} className="bg-white p-4 rounded-md shadow mb-6 space-y-3">
          <input
            type="text"
            placeholder="Your Name"
            value={newReview.name}
            onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
            className="w-full border px-3 py-2 rounded"
          />
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setNewReview({ ...newReview, rating: star })}
                onMouseEnter={() => setNewReview({ ...newReview, hover: star })}
                onMouseLeave={() => setNewReview({ ...newReview, hover: 0 })}
                className={`text-2xl cursor-pointer transition-all ${
                  (newReview.hover || newReview.rating) >= star ? "text-yellow-400 scale-110" : "text-gray-300"
                }`}
              >
                ★
              </span>
            ))}
          </div>
          <textarea
            placeholder="Your Review"
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            className="w-full border px-3 py-2 rounded"
            rows={3}
          />
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
            Submit Review
          </button>
        </form>

        <div className="space-y-4">
          {reviews.length === 0 ? (
            <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
          ) : (
            reviews.map((r, i) => (
              <div key={i} className="border p-4 rounded-md shadow-sm bg-white">
                <p className="font-semibold">{r.name}</p>
                <p className="text-yellow-500">{"⭐".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</p>
                <p className="text-sm mt-1 text-gray-700">{r.comment}</p>
                <p className="text-xs text-gray-400">{new Date(r.date).toLocaleString()}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
