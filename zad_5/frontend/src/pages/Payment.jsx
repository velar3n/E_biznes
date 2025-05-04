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
    <div className="payment-container">
      <h1>Your Payment</h1>
      {message && <p className="mb-4 text-center text-blue-600">{message}</p>}
      <div className="payment-form">
        <input
          type="text"
          placeholder="Card Number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Expiration Date (MM/YY)"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
          className="input-field"
        />
        <input
          type="text"
          placeholder="CVC"
          value={cvc}
          onChange={(e) => setCvc(e.target.value)}
          className="input-field"
        />

        <button
          onClick={handlePayment}
          className="confirm-button"
        >
          Confirm
        </button>
      </div>
    </div>
  );
}