import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Payment() {
  const { id } = useParams(); // payment ID from URL
  const navigate = useNavigate();

  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [message, setMessage] = useState("");

  const handlePayment = async () => {
    try {
      const payload = {
        card_number: cardNumber,
        expiration_date: expirationDate,
        cvc: parseInt(cvc),
      };
  
      await axios.post(`http://localhost:1323/payment/${id}`, payload);
      setMessage("Payment successful!");
      setTimeout(() => {
        navigate("/");
      }, 3000);
      navigate("/");
    } catch (err) {
      console.error("Payment failed:", err);
      setMessage("Payment failed. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-xl font-bold mb-4">💳 Payment</h1>

      {message && <p className="mb-4 text-center text-blue-600">{message}</p>}

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Card Number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          className="w-full border px-4 py-2 rounded"
        />

        <input
          type="text"
          placeholder="Expiration Date (MM/YY)"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
          className="w-full border px-4 py-2 rounded"
        />

        <input
          type="text"
          placeholder="CVC"
          value={cvc}
          onChange={(e) => setCvc(e.target.value)}
          className="w-full border px-4 py-2 rounded"
        />

        <button
          onClick={handlePayment}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}