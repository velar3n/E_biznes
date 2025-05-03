import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">🛒 Cart</h1>
  
      {message && <p className="text-green-600 mb-4">{message}</p>}
  
      {cart.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="space-y-4">
          {cart.items.map((item) => (
            <li key={item.ID} className="flex items-center justify-between border p-3 rounded shadow">
              <span>{item.product.name}</span>
              <div className="flex items-center gap-2">
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleRemoveFromCart(item.product)}
                >
                  −
                </button>
                <span>{item.quantity}</span>
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded"
                  onClick={() => handleAddToCart(item.product)}
                >
                  +
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
  
      <div className="text-right mt-4 text-lg font-semibold">
        Total: ${cart.total?.toFixed(2)}
      </div>
  
      <div className="flex justify-between mt-6">
        <button
          onClick={clearCart}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Clear Cart
        </button>
        <button
          onClick={purchaseCart}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Purchase
        </button>
      </div>
    </div>
  );
}