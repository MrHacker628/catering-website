import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import './Payment.css';

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId, customerId, amount, totalAmount, customerName } = location.state || {};

  const [loading, setLoading] = useState(false);
  const [paid, setPaid] = useState(false);

  if (!orderId) {
    return (
      <div className="payment-empty page-enter">
        <div className="payment-empty__box">
          <span className="payment-empty__icon">📋</span>
          <h2>No Booking Found</h2>
          <p>Please complete a booking first to proceed to payment.</p>
          <button className="btn btn--primary btn--lg" onClick={() => navigate('/booking')}>
            Go to Booking
          </button>
        </div>
      </div>
    );
  }

  async function handlePayment() {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/payments/create-order', {
        amount, order_id: orderId, customer_id: customerId,
      });

      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID,
        amount: amount * 100,
        currency: 'INR',
        name: 'Mannat Caterers',
        description: `Advance payment for Order #${orderId}`,
        order_id: res.data.razorpay_order_id,
        handler: async function(paymentRes) {
          await axios.post('http://localhost:5000/payments/verify', {
            razorpay_order_id: paymentRes.razorpay_order_id,
            razorpay_payment_id: paymentRes.razorpay_payment_id,
          });
          setPaid(true);
          setLoading(false);
        },
        prefill: { name: customerName },
        theme: { color: '#16a34a' },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
      setLoading(false);
    } catch (err) {
      console.log("Payment error:", err);
      setLoading(false);
      alert('Payment setup failed. Please try again.');
    }
  }

  if (paid) {
    return (
      <>
        <Helmet><title>Payment Successful — Mannat Caterers</title></Helmet>
        <div className="payment-success page-enter">
          <div className="payment-success__box">
            <div className="payment-success__check">
              <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
            </div>
            <h2>Payment Successful!</h2>
            <p>Thank you, <strong>{customerName}</strong>. Your event booking has been confirmed.</p>
            <div className="payment-success__details">
              <div className="payment-success__row"><span>Order ID</span><strong>#{orderId}</strong></div>
              <div className="payment-success__row"><span>Amount Paid</span><strong>₹{amount.toLocaleString()}</strong></div>
            </div>
            <button className="btn btn--primary btn--lg" onClick={() => navigate('/')}>
              Back to Home
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Complete Payment — Mannat Caterers</title>
        <meta name="description" content="Securely pay your advance payment for your Mannat Caterers event booking." />
      </Helmet>

      <div className="payment-page page-enter">

        <section className="payment-hero">
          <div className="container">
            <h1>Complete Your Payment</h1>
            <p>Secure advance payment powered by Razorpay</p>
          </div>
        </section>

        <section className="payment-content">
          <div className="container">
            <div className="payment-card">
              <div className="payment-card__header">
                <svg width="32" height="32" fill="none" stroke="var(--green-600)" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                <h2>Booking Summary</h2>
              </div>

              <div className="payment-card__row">
                <span>Customer</span>
                <strong>{customerName}</strong>
              </div>
              <div className="payment-card__row">
                <span>Order ID</span>
                <strong>#{orderId}</strong>
              </div>
              <div className="payment-card__row">
                <span>Total Amount</span>
                <strong>₹{totalAmount.toLocaleString()}</strong>
              </div>
              <div className="payment-card__row payment-card__row--highlight">
                <span>Advance to Pay (30%)</span>
                <strong>₹{amount.toLocaleString()}</strong>
              </div>
              <div className="payment-card__row">
                <span>Balance (on event day)</span>
                <strong>₹{(totalAmount - amount).toLocaleString()}</strong>
              </div>

              <button className="btn btn--primary btn--lg btn--full payment-card__btn" onClick={handlePayment} disabled={loading}>
                {loading ? 'Processing...' : `Pay ₹${amount.toLocaleString()} Now`}
              </button>

              <p className="payment-card__secure">
                <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                100% Secure Payment · SSL Encrypted
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Payment;