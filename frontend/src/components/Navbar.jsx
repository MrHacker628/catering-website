// Navbar.jsx — Navigation bar shown on ALL pages
// useNavigate lets us move between pages on button click
// Link is like <a> tag but for React pages (no page reload)

// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Navbar.css';

// function Navbar({ currentUser, onLogout, onLoginClick }) {
//   return (
//     <nav className="navbar">

//       {/* Logo / Business Name — clicking takes to home */}
//       <div className="navbar-logo">
//         <Link to="/">🍽️ Mannat Catering</Link>
//       </div>

//       {/* Navigation Links */}
//       <ul className="navbar-links">
//         <li><Link to="/">Home</Link></li>
//         <li><Link to="/menu">Menu</Link></li>
//         <li><Link to="/booking">Book Now</Link></li>
//         {/* <li><Link to="/admin">Admin</Link></li> */}
//       </ul>

//       {/* ── ADD THIS PART HERE ── */}
//       {currentUser ? (
//         // USER IS LOGGED IN
//         <div className="nav-user">
//           <span className="nav-username">
//             👤 Hi, {currentUser.full_name}!
//           </span>
//           <button className="nav-logout-btn" onClick={onLogout}>
//             Logout
//           </button>
//         </div>
//       ) : (
//         // USER IS NOT LOGGED IN
//         <button className="nav-login-btn" onClick={onLoginClick}>
//           Login / Sign Up
//         </button>
//       )}

//     </nav>
//   );
// }
// export default Navbar;


// Navbar.jsx — Navigation bar shown on ALL pages
// useNavigate lets us move between pages on button click
// Link is like <a> tag but for React pages (no page reload)

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from "./mannatcatererslogo.png";

function Navbar({ currentUser, onLogout, onLoginClick }) {

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">

        {/* ── LOGO ── */}
        <div className="navbar__logo">
          {/* <Link to="/"> */}
          <img
            src={logo}
            alt="Mannat Caterers"
            className="navbar__logo-img"
          />
          {/* </Link> */}
        </div>

        {/* ── DESKTOP LINKS ── */}
        <ul className="navbar__links">
          <li><Link to="/" className="navbar__link">Home</Link></li>
          <li><Link to="/menu" className="navbar__link">Menu</Link></li>
          <li><Link to="/booking" className="navbar__link navbar__link--cta">Book Now</Link></li>
        </ul>

        {/* ── USER AREA ── */}
        <div className="navbar__user">
          {currentUser ? (
            <div className="nav-user">
              <span className="nav-username">
                👤 Hi, {currentUser.full_name}!
              </span>
              <button className="nav-logout-btn" onClick={onLogout}>
                Logout
              </button>
            </div>
          ) : (
            <button className="nav-login-btn" onClick={onLoginClick}>
              Login / Sign Up
            </button>
          )}
        </div>

        {/* ── MOBILE HAMBURGER ── */}
        <button
          className={`navbar__hamburger ${menuOpen ? 'open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

      </div>

      {/* ── MOBILE MENU ── */}
      <div className={`navbar__mobile ${menuOpen ? 'navbar__mobile--open' : ''}`}>
        <Link to="/" className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/menu" className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>Menu</Link>
        <Link to="/booking" className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>Book Now</Link>
        {currentUser ? (
          <>
            <span className="navbar__mobile-user"> {currentUser.full_name}</span>
            <button className="navbar__mobile-logout" onClick={() => { onLogout(); setMenuOpen(false); }}>Logout</button>
          </>
        ) : (
          <button className="navbar__mobile-login" onClick={() => { onLoginClick(); setMenuOpen(false); }}>Login / Sign Up</button>
        )}
      </div>

    </nav>
  );
}

export default Navbar;
