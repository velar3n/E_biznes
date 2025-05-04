import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";

export default function Cart() {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [message, setMessage] = useState("");

  const fetchCart = async () => {
    try {
      const res = await axios.get("http://localhost:1323/cart/1");
      setCart(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleAddToCart = async (product) => {
    try {
      await axios.post("http://localhost:1323/cart/update", {
        product_id: product.ID,
        quantity_change: 1
      });
      setMessage(`Added "${product.name}" to cart.`);
      await fetchCart();
    } catch (err) {
      console.error(err);
      setMessage("Failed to add to cart.");
    } finally {
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleRemoveFromCart = async (product) => {
    try {
      await axios.post("http://localhost:1323/cart/update", {
        product_id: product.ID,
        quantity_change: -1
      });
      setMessage(`Removed "${product.name}" from cart.`);
      await fetchCart();
    } catch (err) {
      console.error(err);
      setMessage("Failed to remove from.");
    } finally {
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete("http://localhost:1323/cart");
      setMessage("Cart cleared.");
      await fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  const navigate = useNavigate();

  const purchaseCart = async () => {
    try {
      const res = await axios.post("http://localhost:1323/payment");
      const paymentId = res.data.payment_id;
      navigate(`/payment/${paymentId}`);
    } catch (err) {
      console.error("Failed to create payment:", err);
      setMessage("Purchase failed.");
    }
  };

  return (
    <div className="cart-container">
      <h1>Your Cart</h1>
      {message && <p className="text-green-600 mb-4">{message}</p>}
      {cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-container">
          {cart.items.map((item) => (
            <div
            key={item.ID}
            className="product-card"
            >
              <div className="product-icon">
                <FontAwesomeIcon icon={faImage} style={{ fontSize: "2.5rem", color: "#4b92df" }} />
              </div>
              <div className="product-details">
                <h2>{item.product.name}</h2>
                <p>Category: {item.product.category}</p>
                <p>{item.product.price.toFixed(2)} zł</p>
              </div>
              <div className="cart-button-container">
                <button
                  className="cart-button-small"
                  onClick={() => handleRemoveFromCart(item.product)}
                >
                  −
                </button>
                <span>{item.quantity}</span>
                <button
                  className="cart-button-small"
                  onClick={() => handleAddToCart(item.product)}
                >
                  +
                </button>
              </div>
          </div>
          ))}
        </div>
      )}
      <h2>Total: {cart.total.toFixed(2)} zł</h2>
      <div className="cart-buttons">
        <button
          onClick={clearCart}
        >
          Clear Cart
        </button>
        <button
          onClick={purchaseCart}
        >
          Purchase
        </button>
      </div>
    </div>
  );
}