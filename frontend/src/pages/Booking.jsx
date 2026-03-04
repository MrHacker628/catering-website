// Booking.jsx — Customer fills this form to place an order
// This page has 2 steps:
// Step 1 — Customer fills their personal details
// Step 2 — Customer selects menu items and sees price

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Booking.css';

function Booking() {

  const navigate = useNavigate();

  // ── STEP tracking ──
  // step 1 = customer details form
  // step 2 = menu selection
  const [step, setStep] = useState(1);

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

  // ── MENU SELECTION ──
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [priceDetails, setPriceDetails] = useState(null);

  // ── ERROR MESSAGES ──
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch menu items when page loads
  useEffect(() => {
    axios.get('http://localhost:5000/menu/all')
      .then(function(response) {
        setMenuItems(response.data);
      })
      .catch(function(error) {
        console.log("Error fetching menu:", error);
      });
  }, []);

  // ── HANDLE INPUT CHANGE ──
  // this one function handles ALL input changes
  // e.target.name tells us WHICH input changed
  // e.target.value tells us the NEW value
  function handleCustomerChange(e) {
    setCustomerData({
      ...customerData,           // keep all existing values
      [e.target.name]: e.target.value  // update only the changed field
    });
  }

  function handleEventChange(e) {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value
    });
  }

  // ── TOGGLE MENU ITEM SELECTION ──
  function toggleMenuItem(itemId) {
    if (selectedItems.includes(itemId)) {
      // item already selected — remove it
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    } else {
      // item not selected — add it
      setSelectedItems([...selectedItems, itemId]);
    }
  }

  // ── VALIDATE STEP 1 ──
  function validateStep1() {
    let newErrors = {};

    if (!customerData.full_name) newErrors.full_name = 'Name is required!';
    if (!customerData.email) newErrors.email = 'Email is required!';
    else if (!customerData.email.includes('@')) newErrors.email = 'Enter valid email!';
    if (!customerData.phone) newErrors.phone = 'Phone is required!';
    else if (customerData.phone.length < 10) newErrors.phone = 'Enter valid phone number!';
    if (!eventData.event_type) newErrors.event_type = 'Event type is required!';
    if (!eventData.event_date) newErrors.event_date = 'Event date is required!';
    if (!eventData.event_location) newErrors.event_location = 'Location is required!';
    if (!eventData.num_of_guests) newErrors.num_of_guests = 'Number of guests is required!';
    else if (eventData.num_of_guests < 10) newErrors.num_of_guests = 'Minimum 10 guests!';

    setErrors(newErrors);

    // if no errors object is empty — return true
    return Object.keys(newErrors).length === 0;
  }

  // ── GO TO STEP 2 ──
  function goToStep2() {
    if (validateStep1()) {
      setStep(2);  // move to menu selection
    }
  }

  // ── CALCULATE PRICE ──
  function calculatePrice() {
    if (selectedItems.length === 0) {
      setMessage('Please select at least one menu item!');
      return;
    }

    setLoading(true);
    // send selected items and guests to backend
    // backend calculates total, advance and balance
    axios.post('http://localhost:5000/menu/calculate', {
      selected_items: selectedItems,
      num_of_guests: parseInt(eventData.num_of_guests)
    })
    .then(function(response) {
      setPriceDetails(response.data);
      setLoading(false);
      setMessage('');
    })
    .catch(function(error) {
      console.log("Error calculating price:", error);
      setLoading(false);
    });
  }

  // ── SUBMIT BOOKING ──
  async function submitBooking() {
    if (!priceDetails) {
      setMessage('Please calculate price first!');
      return;
    }

    setLoading(true);

    try {
      // Step 1 — Save customer to database
      const customerResponse = await axios.post(
        'http://localhost:5000/customers/add',
        customerData
      );

      const customerId = customerResponse.data.customerId;

      // Step 2 — Save order to database
      const orderResponse = await axios.post(
        'http://localhost:5000/orders/add',
        {
          customer_id: customerId,
          event_type: eventData.event_type,
          event_date: eventData.event_date,
          event_location: eventData.event_location,
          num_of_guests: eventData.num_of_guests,
          menu_selected: selectedItems.join(','),
          total_amount: priceDetails.total_amount,
          advance_amount: priceDetails.advance_amount
        }
      );

      const orderId = orderResponse.data.orderId;

      // Step 3 — Go to payment page with details
      // we pass order details via navigation state
      navigate('/payment', {
        state: {
          orderId,
          customerId,
          amount: priceDetails.advance_amount,
          totalAmount: priceDetails.total_amount,
          customerName: customerData.full_name
        }
      });

    } catch (error) {
      console.log("Error submitting booking:", error);
      setMessage('Error submitting booking. Please try again!');
      setLoading(false);
    }
  }

  return (
    <div className="booking-page">

      {/* ── PAGE HEADER ── */}
      <div className="booking-header">
        <h1>Book Your Event 📅</h1>
        <p>Fill in the details below to place your order</p>

        {/* Step indicator */}
        <div className="step-indicator">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>1. Your Details</div>
          <div className="step-line"></div>
          <div className={`step ${step >= 2 ? 'active' : ''}`}>2. Select Menu</div>
        </div>
      </div>

      <div className="booking-content">

        {/* ════════ STEP 1 — Customer & Event Details ════════ */}
        {step === 1 && (
          <div className="booking-form">
            <h2>Your Details</h2>

            {/* Customer Info */}
            <div className="form-section">
              <h3>📋 Personal Information</h3>

              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="full_name"
                  placeholder="Enter your full name"
                  value={customerData.full_name}
                  onChange={handleCustomerChange}
                />
                {errors.full_name && 
                  <span className="error">{errors.full_name}</span>}
              </div>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  placeholder="Enter your email"
                  value={customerData.email}
                  onChange={handleCustomerChange}
                />
                {errors.email && 
                  <span className="error">{errors.email}</span>}
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={customerData.phone}
                  onChange={handleCustomerChange}
                />
                {errors.phone && 
                  <span className="error">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  placeholder="Enter your address"
                  value={customerData.address}
                  onChange={handleCustomerChange}
                />
              </div>
            </div>

            {/* Event Info */}
            <div className="form-section">
              <h3>🎉 Event Details</h3>

              <div className="form-group">
                <label>Event Type</label>
                <select
                  name="event_type"
                  value={eventData.event_type}
                  onChange={handleEventChange}
                >
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
                <input
                  type="date"
                  name="event_date"
                  value={eventData.event_date}
                  onChange={handleEventChange}
                />
                {errors.event_date && 
                  <span className="error">{errors.event_date}</span>}
              </div>

              <div className="form-group">
                <label>Event Location</label>
                <input
                  type="text"
                  name="event_location"
                  placeholder="Enter event location/venue"
                  value={eventData.event_location}
                  onChange={handleEventChange}
                />
                {errors.event_location && 
                  <span className="error">{errors.event_location}</span>}
              </div>

              <div className="form-group">
                <label>Number of Guests</label>
                <input
                  type="number"
                  name="num_of_guests"
                  placeholder="Minimum 10 guests"
                  value={eventData.num_of_guests}
                  onChange={handleEventChange}
                />
                {errors.num_of_guests && 
                  <span className="error">{errors.num_of_guests}</span>}
              </div>
            </div>

            <button className="booking-btn" onClick={goToStep2}>
              Next — Select Menu →
            </button>

          </div>
        )}

        {/* ════════ STEP 2 — Menu Selection ════════ */}
        {step === 2 && (
          <div className="menu-selection">
            <h2>Select Your Menu Items</h2>
            <p>Click items to select/deselect them</p>

            {/* Menu Items Grid */}
            <div className="selection-grid">
              {menuItems.map(function(item) {
                const isSelected = selectedItems.includes(item.id);
                return (
                  <div
                    key={item.id}
                    className={`selection-card ${isSelected ? 'selected' : ''}`}
                    onClick={() => toggleMenuItem(item.id)}
                  >
                    <span className="sel-badge">{item.category}</span>
                    <h4>{item.item_name}</h4>
                    <p>₹{item.price_per_plate} per plate</p>
                    {/* show checkmark if selected */}
                    {isSelected && <span className="checkmark">✅</span>}
                  </div>
                );
              })}
            </div>

            {/* Calculate Price Button */}
            <button className="booking-btn" onClick={calculatePrice}>
              Calculate Price 🧮
            </button>

            {/* Price Details — shown after calculation */}
            {priceDetails && (
              <div className="price-summary">
                <h3>💰 Price Summary</h3>
                <p>Guests: <strong>{priceDetails.num_of_guests}</strong></p>
                <p>Price per plate: <strong>₹{priceDetails.price_per_plate}</strong></p>
                <p>Total Amount: <strong>₹{priceDetails.total_amount}</strong></p>
                <p>Advance (30%): <strong>₹{priceDetails.advance_amount}</strong></p>
                <p>Balance (70%): <strong>₹{priceDetails.balance_amount}</strong></p>

                <button className="booking-btn confirm" onClick={submitBooking}>
                  {loading ? 'Processing...' : 'Confirm & Pay Advance 💳'}
                </button>
              </div>
            )}

            {message && <p className="error-msg">{message}</p>}

            {/* Back button */}
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