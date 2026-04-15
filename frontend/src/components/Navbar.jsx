import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar({ currentUser, onLogout, onLoginClick }) {
  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <nav className="navbar__inner container" aria-label="Main navigation">

        {/* Logo */}
        <Link to="/" className="navbar__logo" aria-label="Mannat Caterers Home">
          <span className="navbar__logo-mark">M</span>
          <span className="navbar__logo-text">Mannat<br/><small>Caterers</small></span>
        </Link>

        {/* Desktop Links */}
        <div className="navbar__links">
          <Link to="/" className={`navbar__link ${isActive('/') ? 'navbar__link--active' : ''}`}>
            Home
          </Link>
          <Link to="/menu" className={`navbar__link ${isActive('/menu') ? 'navbar__link--active' : ''}`}>
            Menu
          </Link>
          <Link to="/booking" className={`navbar__link ${isActive('/booking') ? 'navbar__link--active' : ''}`}>
            Book Now
          </Link>
        </div>

        {/* Desktop CTA */}
        <Link to="/booking" className="navbar__cta">
          Plan Your Event
        </Link>

      {/* ── ADD THIS PART HERE ── */}
      {currentUser ? (
        // USER IS LOGGED IN
        <div className="nav-user">
          <span className="nav-username">
            👤 Hi, {currentUser.full_name}!
          </span>
          <button className="nav-logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      ) : (
        // USER IS NOT LOGGED IN
        <button className="nav-login-btn" onClick={onLoginClick}>
          Login / Sign Up
        </button>
      )}

    </nav>
  );
}

export default Navbar;
