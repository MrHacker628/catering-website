import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User, Mail, MapPin } from 'lucide-react';
import './Navbar.css';

function Navbar({ currentUser, onLogout, onLoginClick }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const hoverTimeout = useRef(null);
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
    setProfileOpen(false);
  }, [location]);

  // Close profile card when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleProfileEnter() {
    clearTimeout(hoverTimeout.current);
    setProfileOpen(true);
  }

  function handleProfileLeave() {
    hoverTimeout.current = setTimeout(() => setProfileOpen(false), 200);
  }

  if (isAdmin) {
    return (
      <header className="navbar navbar--admin">
        <nav className="navbar__inner container" aria-label="Admin navigation">
          <Link to="/" className="navbar__logo" aria-label="Mannat Caterers Home">
            <img src="/mannat catererslogo.png" alt="Mannat Caterers logo" className="navbar__logo-img" />
            <span className="navbar__logo-text">Mannat<br /><small>Caterers</small></span>
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
          <img src="/mannat catererslogo.png" alt="Mannat Caterers logo" className="navbar__logo-img" />
          <span className="navbar__logo-text">Mannat<br /><small>Caterers</small></span>
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

        {/* Desktop Right: CTA + Auth */}
        <div className="navbar__right">
          <Link to="/booking" className="navbar__cta">
            Plan Your Event
          </Link>

          {currentUser ? (
            <div
              className="navbar__user"
              ref={profileRef}
              onMouseEnter={handleProfileEnter}
              onMouseLeave={handleProfileLeave}
            >
              <div className="navbar__user-avatar" aria-label="User profile">
                {currentUser.full_name ? currentUser.full_name.charAt(0).toUpperCase() : 'U'}
              </div>
              <span className="navbar__user-name">{currentUser.full_name}</span>
              <button className="navbar__auth-btn navbar__auth-btn--logout" onClick={onLogout}>
                Logout
              </button>

              {/* ── Profile Hover Card ── */}
              {profileOpen && (
                <div className="profile-card" role="tooltip" aria-label="User profile details">
                  <div className="profile-card__arrow"></div>
                  <div className="profile-card__header">
                    <div className="profile-card__avatar">
                      {currentUser.full_name ? currentUser.full_name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div className="profile-card__greeting">
                      <span className="profile-card__hello">Welcome back</span>
                      <strong className="profile-card__name">{currentUser.full_name || 'User'}</strong>
                    </div>
                  </div>
                  <div className="profile-card__divider"></div>
                  <ul className="profile-card__details">
                    <li>
                      <User size={15} />
                      <div>
                        <span className="profile-card__label">Name</span>
                        <span className="profile-card__value">{currentUser.full_name || '—'}</span>
                      </div>
                    </li>
                    <li>
                      <Mail size={15} />
                      <div>
                        <span className="profile-card__label">Email</span>
                        <span className="profile-card__value">{currentUser.email || '—'}</span>
                      </div>
                    </li>
                    <li>
                      <MapPin size={15} />
                      <div>
                        <span className="profile-card__label">Address</span>
                        <span className="profile-card__value">{currentUser.address || 'Not set'}</span>
                      </div>
                    </li>
                  </ul>
                  <button className="profile-card__logout" onClick={onLogout}>
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button className="navbar__auth-btn navbar__auth-btn--login" onClick={onLoginClick}>
              Login
            </button>
          )}
        </div>

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

        {/* Mobile Auth */}
        <div className="navbar__mobile-auth">
          {currentUser ? (
            <button onClick={onLogout}>Logout ({currentUser.full_name})</button>
          ) : (
            <button onClick={onLoginClick}>Login / Sign Up</button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
