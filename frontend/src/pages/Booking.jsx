// Booking.jsx — Customer books a catering package
// STEP 1 — Fill details + select package + select guests
// STEP 2 — See booking summary + confirm + pay

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Booking.css';

function Booking({ currentUser }) {

  const navigate = useNavigate();

  // ── STEP TRACKING ──
  // step 1 = fill details and select package
  // step 2 = booking summary and payment
  const [step, setStep] = useState(1);

  // ── PACKAGES ──
  // stores all 7 packages fetched from backend
  const [packages, setPackages] = useState([]);

  // selectedPackage = the package object customer chose
  const [selectedPackage, setSelectedPackage] = useState(null);

  // ── CUSTOMER DETAILS ──
  const [customerData, setCustomerData] = useState({
    full_name: '',
    email: '',
    phone: '',
    address: ''
  });

  // ── EVENT DETAILS ──
  const [eventData, setEventData] = useState({
    event_type: '',
    event_date: '',
    event_location: '',
    num_of_guests: ''
  });

  // ── ERROR AND LOADING ──
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // ── FETCH PACKAGES WHEN PAGE LOADS ──
  useEffect(() => {
    axios.get('http://localhost:5000/packages/all')
      .then(function (response) {
        setPackages(response.data);
      })
      .catch(function (error) {
        console.log("Error fetching packages:", error);
      });
  }, []);

  // ── AUTO-FILL USER DETAILS IF LOGGED IN ──
  useEffect(function () {
    if (currentUser) {
      setCustomerData({
        full_name: currentUser.full_name || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
        address: currentUser.address || ''
      });
    }
  }, [currentUser]);

  // ── HANDLE INPUT CHANGES ──
  function handleCustomerChange(e) {
    setCustomerData({ ...customerData, [e.target.name]: e.target.value });
  }

  function handleEventChange(e) {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  }

  // ── WHEN PACKAGE IS SELECTED FROM DROPDOWN ──
  function handlePackageChange(e) {
    const packageId = e.target.value;

    if (!packageId) {
      setSelectedPackage(null);
      return;
    }

    // find the full package object from packages array
    const pkg = packages.find(function (p) {
      return p.id === parseInt(packageId);
    });

    setSelectedPackage(pkg);
  }

  // ── CALCULATE PRICE BASED ON GUESTS ──
  // called automatically when package or guests changes
  function getPrice() {
    if (!selectedPackage || !eventData.num_of_guests) return null;

    if (eventData.num_of_guests === '500') {
      return {
        total: selectedPackage.total_500,
        perPlate: selectedPackage.price_500,
        guests: 500
      };
    } else {
      return {
        total: selectedPackage.total_600,
        perPlate: selectedPackage.price_600,
        guests: 600
      };
    }
  }

  // ── VALIDATE STEP 1 ──
  function validateStep1() {
    let newErrors = {};

    if (!customerData.full_name) newErrors.full_name = 'Name is required!';
    if (!customerData.email) newErrors.email = 'Email is required!';
    else if (!customerData.email.includes('@')) newErrors.email = 'Enter valid email!';
    if (!customerData.phone) newErrors.phone = 'Phone is required!';
    else if (customerData.phone.length < 10) newErrors.phone = 'Enter valid phone!';
    if (!eventData.event_type) newErrors.event_type = 'Event type is required!';
    if (!eventData.event_date) {
      newErrors.event_date = 'Event date is required!';
    } else {
      // check if selected date is in the past
      const selectedDate = new Date(eventData.event_date);
      const today = new Date();
      today.setHours(0, 0, 0, 0); // reset time to midnight

      if (selectedDate < today) {
        newErrors.event_date = 'Please select a future date!';
      }
    }
    if (!eventData.event_location) newErrors.event_location = 'Location is required!';
    if (!eventData.num_of_guests) newErrors.num_of_guests = 'Select number of guests!';
    if (!selectedPackage) newErrors.package = 'Please select a package!';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  // ── GO TO STEP 2 ──
  function goToStep2() {
    if (validateStep1()) {
      setStep(2);
    }
  }

  // ── SUBMIT BOOKING ──
  async function submitBooking() {
    setLoading(true);
    const price = getPrice();

    try {
      const token = localStorage.getItem('token');

      // advance = 30% of total
      const advanceAmount = Math.round(price.total * 0.3);
      const balanceAmount = price.total - advanceAmount;

      // STEP 1 — Save customer
      const customerResponse = await axios.post(
        'http://localhost:5000/customers/add',
        {
          full_name: customerData.full_name,
          email: customerData.email,
          phone: customerData.phone,
          address: customerData.address
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const customerId = customerResponse.data.customerId;

      // STEP 2 — Save order
      const orderResponse = await axios.post(
        'http://localhost:5000/orders/add',
        {
          customer_id: customerId,
          event_type: eventData.event_type,
          event_date: eventData.event_date,
          event_location: eventData.event_location,
          num_of_guests: eventData.num_of_guests,
          menu_selected: selectedPackage.package_name,
          total_amount: price.total,
          advance_amount: advanceAmount,
          balance_amount: balanceAmount
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const orderId = orderResponse.data.orderId;

      // STEP 3 — Go to payment page
      navigate('/payment', {
        state: {
          orderId,
          customerId,
          amount: advanceAmount,
          totalAmount: price.total,
          customerName: customerData.full_name
        }
      });

    } catch (error) {
      // 2. Show the real error message on the screen instead of the generic one
      const realErrorMessage = error.response?.data?.message || 'Server error. Check console.';
      setMessage(`❌ ${realErrorMessage}`);
      //old
      // console.log("Error submitting booking:", error);
      // setMessage('Error submitting booking. Please try again!');
      setLoading(false);
    }
  }

  // get current price based on selection
  const price = getPrice();

  return (
    <div className="booking-page">

      {/* ── PAGE HEADER ── */}
      <div className="booking-header">
        <h1>Book Your Event 📅</h1>
        <p>Fill in the details below to place your order</p>

        {/* Step indicator */}
        <div className="step-indicator">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>
            1. Your Details
          </div>
          <div className="step-line"></div>
          <div className={`step ${step >= 2 ? 'active' : ''}`}>
            2. Booking Summary
          </div>
        </div>
      </div>

      <div className="booking-content">

        {/* ════════ STEP 1 ════════ */}
        {step === 1 && (
          <div className="booking-form">

            {/* ── PERSONAL INFORMATION ── */}
            <div className="form-section">
              <h3>📋 Personal Information</h3>

              <div className="form-group">
                <label>Full Name</label>
                <input type="text" name="full_name"
                  placeholder="Enter your full name"
                  value={customerData.full_name}
                  onChange={handleCustomerChange} />
                {errors.full_name &&
                  <span className="error">{errors.full_name}</span>}
              </div>

              <div className="form-group">
                <label>Email</label>
                <input type="text" name="email"
                  placeholder="Enter your email"
                  value={customerData.email}
                  onChange={handleCustomerChange} />
                {errors.email &&
                  <span className="error">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input type="text" name="phone"
                  placeholder="Enter your phone number"
                  value={customerData.phone}
                  onChange={handleCustomerChange} />
                {errors.phone &&
                  <span className="error">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label>Address</label>
                <input type="text" name="address"
                  placeholder="Enter your address"
                  value={customerData.address}
                  onChange={handleCustomerChange} />
              </div>
            </div>

            {/* ── EVENT DETAILS ── */}
            <div className="form-section">
              <h3>🎉 Event Details</h3>

              <div className="form-group">
                <label>Event Type</label>
                <select name="event_type"
                  value={eventData.event_type}
                  onChange={handleEventChange}>
                  <option value="">Select Event Type</option>
                  <option value="Wedding">Wedding 💍</option>
                  <option value="Birthday">Birthday 🎂</option>
                  <option value="Corporate">Corporate Event 🏢</option>
                  <option value="Anniversary">Anniversary 💑</option>
                  <option value="Other">Other 🎊</option>
                </select>
                {errors.event_type &&
                  <span className="error">{errors.event_type}</span>}
              </div>

              <div className="form-group">
                <label>Event Date</label>
                <input type="date" name="event_date"
                  value={eventData.event_date}
                  onChange={handleEventChange}
                  min={new Date().toISOString().split('T')[0]} />
                {errors.event_date &&
                  <span className="error">{errors.event_date}</span>}
              </div>

              <div className="form-group">
                <label>Event Location</label>
                <input type="text" name="event_location"
                  placeholder="Enter event location/venue"
                  value={eventData.event_location}
                  onChange={handleEventChange} />
                {errors.event_location &&
                  <span className="error">{errors.event_location}</span>}
              </div>

              <div className="form-group">
                <label>Number of Guests</label>
                <select name="num_of_guests"
                  value={eventData.num_of_guests}
                  onChange={handleEventChange}>
                  <option value="">Select Number of Guests</option>
                  <option value="500">500 Guests</option>
                  <option value="600">600 Guests</option>
                </select>
                {errors.num_of_guests &&
                  <span className="error">{errors.num_of_guests}</span>}
              </div>
            </div>

            {/* ── PACKAGE SELECTION ── */}
            <div className="form-section">
              <h3>📦 Select Package</h3>

              <div className="form-group">
                <label>Choose Your Package</label>
                <select onChange={handlePackageChange}
                  defaultValue="">
                  <option value="">Select a Package</option>
                  {packages.map(function (pkg) {
                    return (
                      <option key={pkg.id} value={pkg.id}>
                        {pkg.package_name} — {pkg.package_type}
                      </option>
                    );
                  })}
                </select>
                {errors.package &&
                  <span className="error">{errors.package}</span>}
              </div>

              {/* SHOW PACKAGE PREVIEW WHEN SELECTED */}
              {selectedPackage && (
                <div className="package-preview">
                  <h4>📋 {selectedPackage.package_name}</h4>
                  <p>🏮 {selectedPackage.counter_setup}</p>
                  <p>👨‍🍳 {selectedPackage.waiter_info}</p>

                  <div className="preview-section">
                    <strong>🥤 Welcome Drink:</strong>
                    <p>{selectedPackage.welcome_drink}</p>
                  </div>

                  <div className="preview-section">
                    <strong>🍽️ Main Course:</strong>
                    <p>{selectedPackage.main_course}</p>
                  </div>

                  <div className="preview-section">
                    <strong>🍮 Desserts:</strong>
                    <p>{selectedPackage.desserts}</p>
                  </div>

                  {selectedPackage.extras && (
                    <div className="preview-section">
                      <strong>✨ Extras:</strong>
                      <p>{selectedPackage.extras}</p>
                    </div>
                  )}

                  {/* SHOW PRICE IF GUESTS SELECTED */}
                  {price && (
                    <div className="price-preview">
                      <p>👥 {price.guests} Guests
                        × ₹{price.perPlate}/plate</p>
                      <h3>Total: ₹{price.total.toLocaleString()}</h3>
                      <p>Advance (30%):
                        ₹{Math.round(price.total * 0.3).toLocaleString()}
                      </p>
                      <p>Balance (70%):
                        ₹{Math.round(price.total * 0.7).toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <button className="booking-btn" onClick={goToStep2}>
              Next — Review Booking →
            </button>

          </div>
        )}

        {/* ════════ STEP 2 — BOOKING SUMMARY ════════ */}
        {step === 2 && (
          <div className="booking-summary">
            <h2>📋 Booking Summary</h2>

            {/* Customer Details */}
            <div className="summary-section">
              <h3>👤 Customer Details</h3>
              <p><strong>Name:</strong> {customerData.full_name}</p>
              <p><strong>Email:</strong> {customerData.email}</p>
              <p><strong>Phone:</strong> {customerData.phone}</p>
              {customerData.address &&
                <p><strong>Address:</strong> {customerData.address}</p>}
            </div>

            {/* Event Details */}
            <div className="summary-section">
              <h3>🎉 Event Details</h3>
              <p><strong>Event Type:</strong> {eventData.event_type}</p>
              <p><strong>Date:</strong> {eventData.event_date}</p>
              <p><strong>Location:</strong> {eventData.event_location}</p>
              <p><strong>Guests:</strong> {eventData.num_of_guests}</p>
            </div>

            {/* Package Details */}
            <div className="summary-section">
              <h3>📦 Package Details</h3>
              <p><strong>Package:</strong> {selectedPackage.package_name}</p>
              <p><strong>Setup:</strong> {selectedPackage.counter_setup}</p>
              <p><strong>Waiters:</strong> {selectedPackage.waiter_info}</p>

              <div className="summary-menu">
                <p><strong>🥤 Welcome Drink:</strong></p>
                <p>{selectedPackage.welcome_drink}</p>
                <p><strong>🍽️ Main Course:</strong></p>
                <p>{selectedPackage.main_course}</p>
                <p><strong>🍮 Desserts:</strong></p>
                <p>{selectedPackage.desserts}</p>
                {selectedPackage.extras && (
                  <>
                    <p><strong>✨ Extras:</strong></p>
                    <p>{selectedPackage.extras}</p>
                  </>
                )}
              </div>
            </div>

            {/* Price Summary */}
            {price && (
              <div className="summary-price">
                <h3>💰 Price Summary</h3>
                <p>{price.guests} Guests
                  × ₹{price.perPlate}/plate</p>
                <div className="price-total">
                  <h2>Total: ₹{price.total.toLocaleString()}</h2>
                </div>
                <p>✅ Advance to pay now (30%):
                  <strong> ₹{Math.round(price.total * 0.3).toLocaleString()}</strong>
                </p>
                <p>📅 Balance on event day (70%):
                  <strong> ₹{Math.round(price.total * 0.7).toLocaleString()}</strong>
                </p>
              </div>
            )}

            {message &&
              <p className="error-msg">{message}</p>}

            {/* Confirm Button */}
            <button
              className="booking-btn confirm"
              onClick={submitBooking}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Confirm & Pay Advance 💳'}
            </button>

            {/* Back Button */}
            <button className="back-btn" onClick={() => setStep(1)}>
              ← Back to Details
            </button>

          </div>
        )}

      </div>
    </div>
  );
}

export default Booking;