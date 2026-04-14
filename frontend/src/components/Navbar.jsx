import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  // Hide navbar on admin page
  const isAdmin = location.pathname.startsWith('/admin');

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  if (isAdmin) {
    return (
      <header className="navbar navbar--admin">
        <nav className="navbar__inner container" aria-label="Admin navigation">
          <Link to="/" className="navbar__logo" aria-label="Mannat Caterers Home">
            <span className="navbar__logo-mark">M</span>
            <span className="navbar__logo-text">Mannat<br/><small>Caterers</small></span>
          </Link>
        </nav>
      </header>
    );
  }

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

        {/* Mobile Toggle */}
        <button
          className={`navbar__toggle ${mobileOpen ? 'navbar__toggle--open' : ''}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`navbar__mobile ${mobileOpen ? 'navbar__mobile--open' : ''}`}>
        <Link to="/" className={`navbar__mobile-link ${isActive('/') ? 'navbar__mobile-link--active' : ''}`}>
          Home
        </Link>
        <Link to="/menu" className={`navbar__mobile-link ${isActive('/menu') ? 'navbar__mobile-link--active' : ''}`}>
          Menu
        </Link>
        <Link to="/booking" className={`navbar__mobile-link ${isActive('/booking') ? 'navbar__mobile-link--active' : ''}`}>
          Book Now
        </Link>
        <Link to="/booking" className="navbar__mobile-cta">
          Plan Your Event
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
