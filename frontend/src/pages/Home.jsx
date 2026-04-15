// import React from 'react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthModal from '../components/AuthModal';
import './Home.css';



function Home({ currentUser, onLoginSuccess, showAuthModal, setShowAuthModal }) {
  // controls if modal is visible or not
  const [showModal, setShowModal] = useState(false);
  



  // useNavigate lets us go to another page on button click
  const navigate = useNavigate();

  return (
    <div className="home">

      {/* ── HERO SECTION ── big banner at the top */}
      <div className="hero">
        <div className="hero-content">
          <h1>Welcome to Mannat Catering 🍽️</h1>
          <p>Premium catering services for Weddings, Birthdays,
            Corporate Events and all special occasions</p>

          {/* Clicking this button goes to /booking page */}
          <button className="hero-btn" onClick={() => navigate('/booking')}>
            Book Now
          </button>

          {/* temporary button to test modal */}
          <button className="hero-btn" onClick={() => setShowAuthModal(true)}>
            Login / Sign Up
          </button>

          {/* Clicking this button goes to /menu page */}
          <button className="hero-btn outline" onClick={() => navigate('/menu')}>
            View Menu
          </button>
        </div>
      </div>


      {/* ── SERVICES SECTION ── 3 cards showing what we offer */}
      <div className="services">
        <h2>Our Services</h2>

        <div className="services-grid">

          {/* Service Card 1 */}
          <div className="service-card">
            <span className="service-icon">💍</span>
            <h3>Wedding Catering</h3>
            <p>Make your special day unforgettable with our premium wedding menu</p>
          </div>

          {/* Service Card 2 */}
          <div className="service-card">
            <span className="service-icon">🎂</span>
            <h3>Birthday Parties</h3>
            <p>Celebrate birthdays with delicious food and amazing service</p>
          </div>

          {/* Service Card 3 */}
          <div className="service-card">
            <span className="service-icon">🏢</span>
            <h3>Corporate Events</h3>
            <p>Professional catering for corporate meetings and events</p>
          </div>

        </div>
      </div>


      {/* ── WHY CHOOSE US SECTION ── */}
      <div className="why-us">
        <h2>Why Choose Us?</h2>

        <div className="why-grid">
          <div className="why-card">✅ Fresh Ingredients Daily</div>
          <div className="why-card">✅ 10+ Years Experience</div>
          <div className="why-card">✅ 500+ Events Catered</div>
          <div className="why-card">✅ Customized Menus</div>
          <div className="why-card">✅ On Time Delivery</div>
          <div className="why-card">✅ Affordable Prices</div>
        </div>
      </div>


      {/* ── CALL TO ACTION ── bottom banner */}
      <div className="cta">
        <h2>Ready to plan your event?</h2>
        <p>Contact us today and get a free quote!</p>
        <button className="hero-btn" onClick={() => navigate('/booking')}>
          Book Now 🎉
        </button>
      </div>

      {/* only show modal if showModal is true */}
      {showAuthModal && (
        <AuthModal
          onClose={() => setShowAuthModal(false)}
          onLoginSuccess={(user) => { 
            onLoginSuccess(user); // update App.js state
            setShowAuthModal(false); // close modal
          }}
        />
      )}
    </div>
  );
}

export default Home;
