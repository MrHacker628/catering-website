import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
// Booking.jsx — Customer books a catering package
// STEP 1 — Fill details + select package + select guests
// STEP 2 — See booking summary + confirm + pay

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Booking.css';

/* Minimum booking date = today + 3 days */
function getMinDate() {
  const d = new Date();
  d.setDate(d.getDate() + 3);
  return d.toISOString().split('T')[0];
}
function Booking({ currentUser }) {

const categoryImages = {
  'Veg Thali':      'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=200&h=150&fit=crop',
  'Non-Veg Thali':  'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=200&h=150&fit=crop',
  'Biryani':        'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=200&h=150&fit=crop',
  'Starters':       'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=200&h=150&fit=crop',
  'Desserts':       'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=200&h=150&fit=crop',
  'Beverages':      'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=200&h=150&fit=crop',
  'Custom Package': 'https://images.unsplash.com/photo-1555244162-803834f70033?w=200&h=150&fit=crop',
};

const menuCategories = ['All', 'Veg Thali', 'Non-Veg Thali', 'Biryani', 'Starters', 'Desserts', 'Beverages'];

function Booking() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  /* ── State ── */
  const [customer, setCustomer] = useState({ full_name: '', email: '', phone: '', address: '' });
  const [event, setEvent] = useState({ event_type: '', event_date: '', event_location: '', num_of_guests: '' });
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState({}); // { itemId: quantity }
  const [menuFilter, setMenuFilter] = useState('All');
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
  const [submitMsg, setSubmitMsg] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  /* ── Fetch menu ── */
  useEffect(() => {
    axios.get('http://localhost:5000/menu/all')
      .then(res => setMenuItems(res.data))
      .catch(err => console.log("Error fetching menu:", err));
  }, []);

  /* ── Handlers ── */
  function handleCustomer(e) {
    setCustomer({ ...customer, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  }

  function handleEvent(e) {
    setEvent({ ...event, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  }

  function toggleItem(id) {
    setSelectedItems(prev => {
      const copy = { ...prev };
      if (copy[id]) { delete copy[id]; }
      else { copy[id] = 1; }
      return copy;
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

  function updateQty(id, qty) {
    if (qty < 1) return;
    setSelectedItems(prev => ({ ...prev, [id]: qty }));
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

  /* ── Price Calculation ── */
  const billing = useMemo(() => {
    const guests = parseInt(event.num_of_guests) || 0;
    let perPlate = 0;
    const items = [];

    Object.entries(selectedItems).forEach(([id, qty]) => {
      const item = menuItems.find(m => m.id === parseInt(id));
      if (item) {
        perPlate += parseFloat(item.price_per_plate) * qty;
        items.push({ ...item, qty });
      }
    });

    const total = perPlate * guests;
    const advance = total * 0.30;
    const balance = total - advance;

    return { items, perPlate, guests, total, advance, balance };
  }, [selectedItems, event.num_of_guests, menuItems]);

  /* ── Validation ── */
  function validateStep1() {
    const e = {};
    if (!customer.full_name.trim()) e.full_name = 'Name is required';
    if (!customer.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) e.email = 'Enter a valid email';
    if (!customer.phone.trim()) e.phone = 'Phone is required';
    else if (!/^\+91[0-9]{10}$/.test(customer.phone)) e.phone = 'Format: +91XXXXXXXXXX';
    if (!customer.address.trim()) e.address = 'Address is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function validateStep2() {
    const e = {};
    if (!event.event_type) e.event_type = 'Select an event type';
    if (!event.event_date) e.event_date = 'Select a date';
    if (!event.event_location.trim()) e.event_location = 'Location is required';
    if (!event.num_of_guests) e.num_of_guests = 'Enter number of guests';
    else if (parseInt(event.num_of_guests) < 10) e.num_of_guests = 'Minimum 10 guests';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function validateStep3() {
    if (Object.keys(selectedItems).length === 0) {
      setSubmitMsg('Please select at least one menu item');
      return false;
    }
    setSubmitMsg('');
    return true;
  }

  function goNext() {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
    else if (step === 3 && validateStep3()) setStep(4);
  }

  function goBack() {
    if (step > 1) setStep(step - 1);
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

  /* ── Submit Booking ── */
  async function submitBooking() {
    if (billing.total <= 0) {
      setSubmitMsg('No items selected');
      return;
    }
    setLoading(true);
    try {
      const custRes = await axios.post('http://localhost:5000/customers/add', customer);
      const customerId = custRes.data.customerId;

      const orderRes = await axios.post('http://localhost:5000/orders/add', {
        customer_id: customerId,
        event_type: event.event_type,
        event_date: event.event_date,
        event_location: event.event_location,
        num_of_guests: event.num_of_guests,
        menu_selected: Object.keys(selectedItems).join(','),
        total_amount: billing.total,
        advance_amount: billing.advance,
      });

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
          orderId: orderRes.data.orderId,
          customerId,
          amount: billing.advance,
          totalAmount: billing.total,
          customerName: customer.full_name,
        },
      });
    } catch (err) {
      console.log("Booking error:", err);
      setSubmitMsg('Something went wrong. Please try again.');
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

  /* ── Filtered menu ── */
  const filteredMenu = menuFilter === 'All'
    ? menuItems
    : menuItems.filter(m => m.category === menuFilter);

  const stepLabels = ['Your Details', 'Event Info', 'Select Menu', 'Review & Pay'];

  return (
    <>
      <Helmet>
        <title>Book Your Event — Mannat Caterers</title>
        <meta name="description" content="Plan and book your next event with Mannat Caterers. Choose from our curated menu, select your date, and get an instant cost estimate." />
      </Helmet>

      <div className="booking-page page-enter">

        {/* ── Header ── */}
        <section className="booking-hero">
          <div className="container booking-hero__inner">
            <h1>Plan Your <em>Perfect</em> Event</h1>
            <p>Complete the steps below to create your personalized catering package.</p>

            {/* Step Indicator */}
            <div className="steps-bar">
              {stepLabels.map((label, i) => (
                <React.Fragment key={i}>
                  <div className={`steps-bar__step ${step > i + 1 ? 'steps-bar__step--done' : ''} ${step === i + 1 ? 'steps-bar__step--active' : ''}`}>
                    <span className="steps-bar__num">{step > i + 1 ? '✓' : i + 1}</span>
                    <span className="steps-bar__label">{label}</span>
                  </div>
                  {i < 3 && <div className={`steps-bar__line ${step > i + 1 ? 'steps-bar__line--done' : ''}`}></div>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* ── Main Content ── */}
        <section className="booking-main">
          <div className="container booking-layout">

            {/* LEFT — Wizard */}
            <div className="booking-wizard">

              {/* STEP 1 — User Data */}
              {step === 1 && (
                <div className="wizard-step" key="step1">
                  <h2>Personal Information</h2>
                  <p className="wizard-step__subtitle">Tell us about yourself so we can reach you.</p>

                  <div className="form-field">
                    <label htmlFor="full_name">Full Name</label>
                    <input id="full_name" name="full_name" type="text" placeholder="Enter your full name" value={customer.full_name} onChange={handleCustomer} />
                    {errors.full_name && <span className="field-error">{errors.full_name}</span>}
                  </div>

                  <div className="form-field">
                    <label htmlFor="email">Email Address</label>
                    <input id="email" name="email" type="email" placeholder="you@example.com" value={customer.email} onChange={handleCustomer} />
                    {errors.email && <span className="field-error">{errors.email}</span>}
                  </div>

                  <div className="form-field">
                    <label htmlFor="phone">Phone Number</label>
                    <input id="phone" name="phone" type="tel" placeholder="+91XXXXXXXXXX" value={customer.phone} onChange={handleCustomer} />
                    {errors.phone && <span className="field-error">{errors.phone}</span>}
                    <span className="field-hint">Indian number with +91 prefix</span>
                  </div>

                  <div className="form-field">
                    <label htmlFor="address">Address</label>
                    <input id="address" name="address" type="text" placeholder="Your address in Goa" value={customer.address} onChange={handleCustomer} />
                    {errors.address && <span className="field-error">{errors.address}</span>}
                  </div>

                  <button className="btn btn--primary btn--lg btn--full" onClick={goNext}>
                    Continue to Event Details
                    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                  </button>
                </div>
              )}

              {/* STEP 2 — Event Details */}
              {step === 2 && (
                <div className="wizard-step" key="step2">
                  <h2>Event Details</h2>
                  <p className="wizard-step__subtitle">Help us understand your event requirements.</p>

                  <div className="form-field">
                    <label htmlFor="event_type">Event Type</label>
                    <select id="event_type" name="event_type" value={event.event_type} onChange={handleEvent}>
                      <option value="">Select event type</option>
                      <option value="Wedding">Wedding</option>
                      <option value="Birthday">Birthday</option>
                      <option value="Corporate">Corporate Event</option>
                      <option value="Anniversary">Anniversary</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.event_type && <span className="field-error">{errors.event_type}</span>}
                  </div>

                  <div className="form-field">
                    <label htmlFor="event_date">Event Date</label>
                    <input id="event_date" name="event_date" type="date" min={getMinDate()} value={event.event_date} onChange={handleEvent} />
                    {errors.event_date && <span className="field-error">{errors.event_date}</span>}
                    <span className="field-hint">Must be at least 3 days from today</span>
                  </div>
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

                  <div className="form-field">
                    <label htmlFor="event_location">Event Location</label>
                    <input id="event_location" name="event_location" type="text" placeholder="Venue name or address" value={event.event_location} onChange={handleEvent} />
                    {errors.event_location && <span className="field-error">{errors.event_location}</span>}
                  </div>

                  <div className="form-field">
                    <label htmlFor="num_of_guests">Number of Guests</label>
                    <input id="num_of_guests" name="num_of_guests" type="number" min="10" placeholder="Minimum 10 guests" value={event.num_of_guests} onChange={handleEvent} />
                    {errors.num_of_guests && <span className="field-error">{errors.num_of_guests}</span>}
                  </div>

                  <div className="wizard-step__actions">
                    <button className="btn btn--ghost" onClick={goBack}>← Back</button>
                    <button className="btn btn--primary btn--lg" onClick={goNext}>
                      Continue to Menu
                      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3 — Menu Selection */}
              {step === 3 && (
                <div className="wizard-step wizard-step--wide" key="step3">
                  <h2>Build Your Menu</h2>
                  <p className="wizard-step__subtitle">Select dishes and quantities for your event.</p>

                  {/* Filter chips */}
                  <div className="menu-chips">
                    {menuCategories.map(cat => (
                      <button key={cat} className={`chip ${menuFilter === cat ? 'chip--active' : ''}`} onClick={() => setMenuFilter(cat)}>
                        {cat}
                      </button>
                    ))}
                  </div>

                  <div className="booking-menu-grid">
                    {filteredMenu.map(item => {
                      const qty = selectedItems[item.id];
                      const isSelected = !!qty;
                      return (
                        <div key={item.id} className={`bm-card ${isSelected ? 'bm-card--selected' : ''}`}>
                          <div className="bm-card__img">
                            <img src={categoryImages[item.category] || categoryImages['Custom Package']} alt={item.item_name} loading="lazy" />
                          </div>
                          <div className="bm-card__body">
                            <span className="bm-card__cat">{item.category}</span>
                            <h4>{item.item_name}</h4>
                            <span className="bm-card__price">₹{item.price_per_plate}/plate</span>

                            {!isSelected ? (
                              <button className="btn btn--sm btn--primary bm-card__add" onClick={() => toggleItem(item.id)}>
                                + Add
                              </button>
                            ) : (
                              <div className="bm-card__qty">
                                <button onClick={() => updateQty(item.id, qty - 1)} aria-label="Decrease quantity">−</button>
                                <span>{qty}</span>
                                <button onClick={() => updateQty(item.id, qty + 1)} aria-label="Increase quantity">+</button>
                                <button className="bm-card__remove" onClick={() => toggleItem(item.id)} aria-label="Remove item">✕</button>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {submitMsg && <p className="field-error" style={{ textAlign: 'center', marginTop: '16px' }}>{submitMsg}</p>}

                  <div className="wizard-step__actions">
                    <button className="btn btn--ghost" onClick={goBack}>← Back</button>
                    <button className="btn btn--primary btn--lg" onClick={goNext}>
                      Review Order
                      <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4 — Invoice & Submit */}
              {step === 4 && (
                <div className="wizard-step" key="step4">
                  <h2>Review Your Booking</h2>
                  <p className="wizard-step__subtitle">Confirm the details below before proceeding to payment.</p>

                  {/* User Summary */}
                  <div className="review-block">
                    <h3>Personal Details</h3>
                    <div className="review-row"><span>Name</span><strong>{customer.full_name}</strong></div>
                    <div className="review-row"><span>Email</span><strong>{customer.email}</strong></div>
                    <div className="review-row"><span>Phone</span><strong>{customer.phone}</strong></div>
                    <div className="review-row"><span>Address</span><strong>{customer.address}</strong></div>
                  </div>

                  {/* Event Summary */}
                  <div className="review-block">
                    <h3>Event Details</h3>
                    <div className="review-row"><span>Type</span><strong>{event.event_type}</strong></div>
                    <div className="review-row"><span>Date</span><strong>{event.event_date}</strong></div>
                    <div className="review-row"><span>Location</span><strong>{event.event_location}</strong></div>
                    <div className="review-row"><span>Guests</span><strong>{event.num_of_guests}</strong></div>
                  </div>

                  {/* Menu Summary */}
                  <div className="review-block">
                    <h3>Selected Menu</h3>
                    {billing.items.map(item => (
                      <div className="review-row" key={item.id}>
                        <span>{item.item_name} × {item.qty}</span>
                        <strong>₹{(item.price_per_plate * item.qty).toLocaleString()}/plate</strong>
                      </div>
                    ))}
                  </div>

                  {/* Final Bill */}
                  <div className="review-block review-block--total">
                    <div className="review-row"><span>Per Plate Total</span><strong>₹{billing.perPlate.toLocaleString()}</strong></div>
                    <div className="review-row"><span>× {billing.guests} guests</span><strong>₹{billing.total.toLocaleString()}</strong></div>
                    <div className="review-row review-row--highlight"><span>Advance (30%)</span><strong>₹{billing.advance.toLocaleString()}</strong></div>
                    <div className="review-row"><span>Balance (on event day)</span><strong>₹{billing.balance.toLocaleString()}</strong></div>
                  </div>

                  {submitMsg && <p className="field-error" style={{ textAlign: 'center' }}>{submitMsg}</p>}

                  <div className="wizard-step__actions">
                    <button className="btn btn--ghost" onClick={goBack}>← Back</button>
                    <button className="btn btn--primary btn--lg" onClick={submitBooking} disabled={loading}>
                      {loading ? 'Processing...' : 'Confirm & Pay Advance'}
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* RIGHT — Billing Sidebar (desktop) */}
            <aside className="billing-sidebar" aria-label="Billing summary">
              <div className="billing-sidebar__inner">
                <h3>Order Summary</h3>

                {billing.items.length === 0 ? (
                  <p className="billing-sidebar__empty">Your menu selections will appear here.</p>
                ) : (
                  <>
                    <div className="billing-sidebar__items">
                      {billing.items.map(item => (
                        <div className="billing-sidebar__item" key={item.id}>
                          <div>
                            <strong>{item.item_name}</strong>
                            <span>× {item.qty} plate{item.qty > 1 ? 's' : ''}</span>
                          </div>
                          <span>₹{(item.price_per_plate * item.qty).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>

                    <div className="billing-sidebar__totals">
                      <div className="billing-sidebar__row">
                        <span>Per Plate</span>
                        <strong>₹{billing.perPlate.toLocaleString()}</strong>
                      </div>
                      {billing.guests > 0 && (
                        <>
                          <div className="billing-sidebar__row">
                            <span>× {billing.guests} guests</span>
                            <strong>₹{billing.total.toLocaleString()}</strong>
                          </div>
                          <div className="billing-sidebar__row billing-sidebar__row--highlight">
                            <span>Advance (30%)</span>
                            <strong>₹{billing.advance.toLocaleString()}</strong>
                          </div>
                          <div className="billing-sidebar__row">
                            <span>Balance</span>
                            <strong>₹{billing.balance.toLocaleString()}</strong>
                          </div>
                        </>
                      )}
                    </div>
                  </>
                )}
              </div>
            </aside>

          </div>
        </section>

        {/* Mobile Billing Bar */}
        {billing.items.length > 0 && (
          <div className={`mobile-billing ${sidebarOpen ? 'mobile-billing--open' : ''}`}>
            <button className="mobile-billing__toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
              <span>{billing.items.length} item{billing.items.length > 1 ? 's' : ''}</span>
              <strong>₹{billing.total > 0 ? billing.total.toLocaleString() : billing.perPlate.toLocaleString()}</strong>
              <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ transform: sidebarOpen ? 'rotate(180deg)' : '' }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"/>
              </svg>
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

            {sidebarOpen && (
              <div className="mobile-billing__body">
                {billing.items.map(item => (
                  <div className="billing-sidebar__item" key={item.id}>
                    <div>
                      <strong>{item.item_name}</strong>
                      <span>× {item.qty}</span>
                    </div>
                    <span>₹{(item.price_per_plate * item.qty).toLocaleString()}</span>
                  </div>
                ))}
                {billing.guests > 0 && (
                  <div className="billing-sidebar__row billing-sidebar__row--highlight" style={{ marginTop: '12px' }}>
                    <span>Advance (30%)</span>
                    <strong>₹{billing.advance.toLocaleString()}</strong>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

      </div>
    </>
  );
}

export default Booking;