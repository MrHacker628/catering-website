import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) return null;

  return (
    <footer className="footer">
      <div className="footer__top">
        <div className="container footer__grid">

          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__logo">
              <img src="/mannat catererslogo.png" alt="Mannat Caterers logo" className="footer__logo-img" />
              <span className="footer__logo-text">Mannat Caterers</span>
            </div>
            <p>Creating exquisite culinary experiences for life's most memorable celebrations since 1995. Based in the heart of Goa.</p>
            <div className="footer__social">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" fill="none" strokeWidth="2"/><circle cx="12" cy="12" r="4" stroke="currentColor" fill="none" strokeWidth="2"/><circle cx="17.5" cy="6.5" r="1.5"/></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer__section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/menu">Our Menu</Link></li>
              <li><Link to="/booking">Book an Event</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer__section">
            <h4>Our Services</h4>
            <ul>
              <li><Link to="/booking">Wedding Catering</Link></li>
              <li><Link to="/booking">Corporate Events</Link></li>
              <li><Link to="/booking">Birthday Celebrations</Link></li>
              <li><Link to="/booking">Private Dining</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer__section">
            <h4>Get in Touch</h4>
            <ul className="footer__contact">
              <li>
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                Cuncolim, South Goa, Goa 403703
              </li>
              <li>
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                +91 96997 91068
              </li>
              <li>
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                info@mannatcaterers.com
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>&copy; {new Date().getFullYear()} Mannat Caterers. All rights reserved.</p>
          <div className="footer__bottom-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
