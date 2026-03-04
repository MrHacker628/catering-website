 // Navbar.jsx — Navigation bar shown on ALL pages
// useNavigate lets us move between pages on button click
// Link is like <a> tag but for React pages (no page reload)

import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">

      {/* Logo / Business Name — clicking takes to home */}
      <div className="navbar-logo">
        <Link to="/">🍽️ Mannat Catering</Link>
      </div>

      {/* Navigation Links */}
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/menu">Menu</Link></li>
        <li><Link to="/booking">Book Now</Link></li>
        {/* <li><Link to="/admin">Admin</Link></li> */}
      </ul>

    </nav>
  );
}

export default Navbar;
