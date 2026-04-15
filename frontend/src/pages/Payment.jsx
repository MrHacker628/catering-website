// Payment.jsx — Shows payment summary and Razorpay button
// useLocation lets us read data passed from Booking page
// useNavigate lets us redirect after payment

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Payment.css';

function Payment() {

  const location = useLocation();
  const navigate = useNavigate();

  // Read data passed from Booking page
  // when we did navigate('/payment', { state: {...} })
  const {
    orderId,
    customerId,
    amount,
    totalAmount,
    customerName
  } = location.state || {};

  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);

  // If someone opens /payment directly without booking
  // redirect them to booking page
  if (!orderId) {
    return (
      <div className="payment-error">
        <h2>❌ No booking found!</h2>
        <p>Please complete booking first</p>
        <button onClick={() => navigate('/booking')}>
          Go to Booking
        </button>
      </div>
    );
  }

  // ── HANDLE RAZORPAY PAYMENT ──
  async function handlePayment() {
    setLoading(true);

    // get token from localStorage
    const token = localStorage.getItem('token');


    try {
      // Step 1 — Create Razorpay order in backend
      const response = await axios.post(
        'http://localhost:5000/payments/create-order',
        {
          amount: amount,
          order_id: orderId,
          customer_id: customerId
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      const razorpayOrderId = response.data.razorpay_order_id;

      // Step 2 — Open Razorpay payment popup
      // Razorpay script must be loaded in public/index.html
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: amount * 100,        // amount in paise
        currency: 'INR',
        name: 'Mannat Catering',
        description: `Advance payment for Order #${orderId}`,
        order_id: razorpayOrderId,

        // This function runs when payment is SUCCESSFUL
        handler: async function (paymentResponse) {

          // Step 3 — Verify payment in backend
          await axios.post('http://localhost:5000/payments/verify', {
            razorpay_order_id: paymentResponse.razorpay_order_id,
            razorpay_payment_id: paymentResponse.razorpay_payment_id
          });

          // Show success message
          setPaid(true);
          setLoading(false);
        },

        prefill: {
          name: customerName,
        },
        theme: {
          color: '#4a0080'  // purple theme for popup
        }
      };

      // Open the Razorpay popup
      const razorpayPopup = new window.Razorpay(options);
      razorpayPopup.open();
      setLoading(false);

    } catch (error) {
      console.log("Payment error:", error);
      setLoading(false);
      alert('Payment setup failed. Please try again!');
    }
  }

  // ── SHOW SUCCESS PAGE AFTER PAYMENT ──
  if (paid) {
    return (
      <div className="payment-success">
        <div className="success-box">
          <div className="success-icon">🎉</div>
          <h2>Payment Successful!</h2>
          <p>Thank you <strong>{customerName}</strong>!</p>
          <p>Your booking has been confirmed.</p>
          <p>Order ID: <strong>#{orderId}</strong></p>
          <p>Amount Paid: <strong>₹{amount}</strong></p>
          <button
            className="home-btn"
            onClick={() => navigate('/')}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="payment-page">

      {/* ── HEADER ── */}
      <div className="payment-header">
        <h1>Complete Payment 💳</h1>
        <p>Secure advance payment for your event</p>
      </div>

      <div className="payment-content">

        {/* ── ORDER SUMMARY ── */}
        <div className="payment-card">
          <h2>📋 Booking Summary</h2>

          <div className="summary-row">
            <span>Customer Name</span>
            <strong>{customerName}</strong>
          </div>

          <div className="summary-row">
            <span>Order ID</span>
            <strong>#{orderId}</strong>
          </div>

          <div className="summary-row">
            <span>Total Amount</span>
            <strong>₹{totalAmount}</strong>
          </div>

          <div className="summary-row highlight">
            <span>Advance to Pay (30%)</span>
            <strong>₹{amount}</strong>
          </div>

          <div className="summary-row">
            <span>Balance (pay on event day)</span>
            <strong>₹{totalAmount - amount}</strong>
          </div>

          {/* Pay button */}
          <button
            className="pay-btn"
            onClick={handlePayment}
            disabled={loading}
          >
            {loading ? 'Processing...' : `Pay ₹${amount} Now 🔒`}
          </button>

          <p className="secure-text">
            🔒 100% Secure Payment powered by Razorpay
          </p>
        </div>

      </div>
    </div>
  );
}

export default Payment;