// =============================================
// Payment.jsx — handles Razorpay payment
// and sends invoice email on success
// =============================================

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Payment.css';

// Auth header helper
function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return { headers: { Authorization: `Bearer ${token}` } };
}

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  // Get booking details passed from Booking.jsx via navigate()
  const {
    orderId,
    customerId,
    amount,          // 30% advance amount
    totalAmount,
    customerName,
  } = location.state || {};

  const [paymentStatus, setPaymentStatus] = useState('pending'); // pending | success | failed
  const [invoiceStatus, setInvoiceStatus] = useState('');        // shows email send status
  const [loading, setLoading] = useState(false);

  // Get extra details needed for invoice from localStorage
  // These were saved during the booking flow
  const savedUser = JSON.parse(localStorage.getItem('user') || '{}');


  // =============================================
  // FUNCTION — Send Invoice Email
  // Called automatically after payment success
  // =============================================
  async function sendInvoiceEmail(paymentId, bookingDetails) {

    setInvoiceStatus('sending');
    console.log("📧 Sending invoice email...");

    try {
      await axios.post(
        'http://localhost:5000/invoices/send',
        {
          orderId,
          customerId,
          customerName: bookingDetails.customerName || savedUser.full_name,
          customerEmail: bookingDetails.customerEmail || savedUser.email,
          customerPhone: bookingDetails.customerPhone || savedUser.phone,
          eventType: bookingDetails.eventType,
          eventDate: bookingDetails.eventDate,
          eventLocation: bookingDetails.eventLocation,
          numGuests: bookingDetails.numGuests,
          menuSelected: bookingDetails.menuSelected,
          totalAmount,
          advanceAmount: amount,
          balanceAmount: totalAmount - amount,
          paymentId,      // Razorpay payment ID
        },
        getAuthHeaders()
      );

      setInvoiceStatus('sent');
      console.log("✅ Invoice email sent!");

    } catch (err) {
      console.error("❌ Invoice email failed:", err);
      setInvoiceStatus('failed');
    }
  }


  // =============================================
  // FUNCTION — Initiate Razorpay Payment
  // =============================================
  async function handlePayment() {

    setLoading(true);

    try {
      // Step 1 — Create Razorpay order on backend
      const orderRes = await axios.post(
        'http://localhost:5000/payments/create-order',
        {
          amount: amount * 100,  // paise
          order_id: orderId,       // ← add this
          customer_id: customerId     // ← add this
        },
        // Razorpay uses paise (multiply by 100)

        getAuthHeaders()
      );

      const razorpayOrderId = orderRes.data.orderId;

      // Step 2 — Get event details from sessionStorage
      // (saved there during Booking.jsx flow)
      const bookingDetails = JSON.parse(sessionStorage.getItem('bookingDetails') || '{}');

      // Step 3 — Open Razorpay popup
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID, // from .env
        amount: amount * 100,
        currency: 'INR',
        name: 'Mannat Caterers',
        description: `Advance for Order #${orderId}`,
        order_id: razorpayOrderId,

        // ─── Called when payment is SUCCESSFUL ───
        handler: async function (response) {

          console.log("✅ Razorpay payment success:", response);

          // Mark payment as success in UI
          setPaymentStatus('success');
          setLoading(false);

          // Verify payment on backend
          try {
            await axios.post(
              'http://localhost:5000/payments/verify',
              {
                orderId: orderId,
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
                amount,
                customerId,
              },
              getAuthHeaders()
            );
          } catch (verifyErr) {
            console.error("⚠️ Payment verify error (non-critical):", verifyErr);
          }

          // ✅ Send invoice email after payment success!
          await sendInvoiceEmail(response.razorpay_payment_id, bookingDetails);
        },

        // ─── Called when user closes Razorpay popup ───
        modal: {
          ondismiss: function () {
            setPaymentStatus('failed');
            setLoading(false);
          }
        },

        // Pre-fill customer info in Razorpay popup
        prefill: {
          name: customerName || savedUser.full_name,
          email: savedUser.email,
          contact: savedUser.phone,
        },

        theme: { color: '#4a0080' } // your purple brand color
      };

      // Open the Razorpay payment window
      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error("❌ Payment initiation error:", err);
      setPaymentStatus('failed');
      setLoading(false);
    }
  }


  // =============================================
  // RENDER
  // =============================================

  // ── SUCCESS STATE ──
  if (paymentStatus === 'success') {
    return (
      <div className="payment-page">
        <div className="payment-success">
          <div className="success-icon">✅</div>
          <h1>Booking Confirmed!</h1>
          <p>Your event has been booked successfully.</p>

          <div className="success-details">
            <div className="success-row">
              <span>Order ID</span>
              <strong>#{orderId}</strong>
            </div>
            <div className="success-row">
              <span>Advance Paid</span>
              <strong>₹{Number(amount).toLocaleString()}</strong>
            </div>
            <div className="success-row">
              <span>Balance Due</span>
              <strong>₹{Number(totalAmount - amount).toLocaleString()}</strong>
            </div>
          </div>

          {/* Invoice email status */}
          <div className="invoice-status">
            {invoiceStatus === 'sending' && (
              <p className="invoice-status--sending">
                📧 Sending your invoice to {savedUser.email}...
              </p>
            )}
            {invoiceStatus === 'sent' && (
              <p className="invoice-status--sent">
                ✅ Invoice emailed to <strong>{savedUser.email}</strong>!<br />
                <small>Please check your inbox (and spam folder).</small>
              </p>
            )}
            {invoiceStatus === 'failed' && (
              <p className="invoice-status--failed">
                ⚠️ Could not send invoice email. Please contact us at 8329570966.
              </p>
            )}
          </div>

          <button className="btn btn--primary btn--lg" onClick={() => navigate('/')}>
            Back to Home
          </button>
        </div>
      </div>
    );
  }


  // ── DEFAULT / PAYMENT PENDING STATE ──
  return (
    <div className="payment-page">
      <div className="payment-card">
        <h1>Complete Your Booking</h1>
        <p>You're one step away from confirming your event!</p>

        <div className="payment-summary">
          <div className="payment-row">
            <span>Order ID</span>
            <strong>#{orderId}</strong>
          </div>
          <div className="payment-row">
            <span>Customer</span>
            <strong>{customerName}</strong>
          </div>
          <div className="payment-row">
            <span>Total Bill</span>
            <strong>₹{Number(totalAmount).toLocaleString()}</strong>
          </div>
          <div className="payment-row payment-row--highlight">
            <span>Advance to Pay Now (30%)</span>
            <strong>₹{Number(amount).toLocaleString()}</strong>
          </div>
          <div className="payment-row">
            <span>Balance (on event day)</span>
            <strong>₹{Number(totalAmount - amount).toLocaleString()}</strong>
          </div>
        </div>

        <p className="payment-note">
          📧 A PDF invoice will be sent to <strong>{savedUser.email}</strong> after payment.
        </p>

        {paymentStatus === 'failed' && (
          <p className="field-error" style={{ textAlign: 'center' }}>
            Payment was cancelled or failed. Please try again.
          </p>
        )}

        <button
          className="btn btn--primary btn--lg btn--full"
          onClick={handlePayment}
          disabled={loading}
        >
          {loading ? 'Opening Payment...' : `Pay Advance ₹${Number(amount).toLocaleString()}`}
        </button>
      </div>
    </div>
  );
}

export default Payment;
