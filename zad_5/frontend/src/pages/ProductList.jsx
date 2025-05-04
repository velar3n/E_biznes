import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

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
    <div className="product-list-container">
      {message && <div className="mb-4 text-green-600">{message}</div>}
      {products.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <div className="product-list">
          {products.map(product => (
            <div
              key={product.ID}
              className="product-card"
            >
              <div className="product-icon">
                <FontAwesomeIcon icon={faImage} style={{ fontSize: "2.5rem", color: "#4b92df" }} />
              </div>
              <div className="product-details">
                <h2>{product.name}</h2>
                <p>Category: {product.category}</p>
                <p>{product.description}</p>
                <p>In stock: {product.amount}</p>
              </div>
              <div className="product-add-cart">
                <h2>{product.price.toFixed(2)} zł</h2>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="cart-button"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );  
}