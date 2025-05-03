import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get("http://localhost:1323/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load products");
      });
  }, []);

  const handleAddToCart = async (product) => {
    try {
      await axios.post("http://localhost:1323/cart/update", {
        product_id: product.ID,
        quantity_change: 1
      });
      setMessage(`Added "${product.name}" to cart.`);
    } catch (err) {
      console.error(err);
      const errorMessage = err.response ? err.response.data : err.message || "An unexpected error occurred";
      setMessage(`Failed to add to cart: ${errorMessage}`);
    } finally {
      setTimeout(() => setMessage(""), 3000);
    }
  };

  if (error) return <div className="text-red-500 p-4">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      {message && <div className="mb-4 text-green-600">{message}</div>}
      {products.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {products.map(product => (
            <li key={product.ID} className="border p-4 rounded-xl shadow">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-500">Category: {product.category}</p>
              <p className="text-lg font-medium mt-1">${product.price.toFixed(2)}</p>
              <p className="mt-1">{product.description}</p>
              <p className="text-sm mt-2">In stock: {product.amount}</p>
              <button
                onClick={() => handleAddToCart(product)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Add to Cart
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}