// Menu.jsx — Shows packages and menu items
// useNavigate → lets us go to another page on button click
// axios → sends requests to our backend API

import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { Utensils } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Menu.css';

const categories = ['All', 'Veg Thali', 'Non-Veg Thali', 'Biryani', 'Starters', 'Desserts', 'Beverages', 'Custom Package'];

/* Placeholder images by category */
const categoryImages = {
  'Veg Thali':      'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop',
  'Non-Veg Thali':  'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=400&h=300&fit=crop',
  'Biryani':        'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop',
  'Starters':       'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop',
  'Desserts':       'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop',
  'Beverages':      'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop',
  'Custom Package': 'https://images.unsplash.com/photo-1555244162-803834f70033?w=400&h=300&fit=crop',
};

function Menu() {
  // useNavigate hook — lets us navigate to /booking on button click
  const navigate = useNavigate();

  // ── MENU ITEMS STATE ──
  // menuItems → stores all menu items fetched from MySQL
  const [menuItems, setMenuItems] = useState([]);

  // selectedCategory → which category button is clicked (All, Biryani etc)
  const [selectedCategory, setSelectedCategory] = useState('All');

  // loading → true while fetching menu, false when done
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchMenu();
  }, []);

  function fetchMenu() {
    setLoading(true);
    axios.get('http://localhost:5000/menu/all')
      .then(function(res) {
        setMenuItems(res.data);
  // ── PACKAGES STATE ──
  // packages → stores all 7 packages fetched from MySQL
  const [packages, setPackages] = useState([]);

  // selectedPackage → which package card was clicked
  // null means no popup showing
  // if a package is clicked → stores that package → popup opens!
  const [selectedPackage, setSelectedPackage] = useState(null);

  // packagesLoading → true while fetching packages
  const [packagesLoading, setPackagesLoading] = useState(true);

  // all category names for filter buttons
  const categories = [
    'All', 'Veg Thali', 'Non-Veg Thali', 'Biryani',
    'Starters', 'Desserts', 'Beverages', 'Custom Package'
  ];

  // useEffect runs ONCE when page loads
  // fetches both menu items and packages at same time
  useEffect(() => {
    fetchMenuItems();
    fetchPackages();
  }, []); // [] = run only once

  // ── FETCH ALL MENU ITEMS FROM BACKEND ──
  function fetchMenuItems() {
    setLoading(true);
    axios.get('http://localhost:5000/menu/all')
      .then(function(response) {
        // response.data = array of menu items from MySQL
        setMenuItems(response.data);
        setLoading(false);
      })
      .catch(function(err) {
        console.log("Error fetching menu:", err);
        setLoading(false);
      });
  }

  const filtered = selectedCategory === 'All'
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <>
      <Helmet>
        <title>Our Menu — Mannat Caterers | Premium Catering in Goa</title>
        <meta name="description" content="Explore our curated catering menu featuring authentic Indian cuisine — from rich biryanis and thalis to delectable desserts and refreshing beverages." />
        <meta property="og:title" content="Menu — Mannat Caterers" />
        <meta property="og:description" content="Discover our curated selection of dishes for your next event." />
      </Helmet>

      <div className="menu-page page-enter">

        {/* ── Hero Banner ── */}
        <section className="menu-hero" aria-label="Menu page banner">
          <div className="menu-hero__overlay"></div>
          <div className="container menu-hero__content">
            <span className="hero__badge">Curated with Care</span>
            <h1>Our Menu</h1>
            <p>Authentic flavors crafted with the freshest ingredients. Every dish tells a story of tradition and passion.</p>
          </div>
        </section>

        {/* ── Sticky Filter ── */}
        <div className="menu-filter" role="tablist" aria-label="Menu category filters">
          <div className="container menu-filter__inner">
            {categories.map(cat => (
              <button
                key={cat}
                role="tab"
                aria-selected={selectedCategory === cat}
                className={`chip ${selectedCategory === cat ? 'chip--active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ── Menu Grid ── */}
        <section className="menu-grid-section" aria-label="Menu items">
          <div className="container">
            {loading ? (
              <div className="menu-loading">
                <div className="menu-loading__spinner"></div>
                <p>Loading menu...</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="menu-empty">
                <span><Utensils size={48} /></span>
                <p>No items found in this category.</p>
              </div>
            ) : (
              <div className="menu-grid">
                {filtered.map((item, i) => (
                  <article
                    key={item.id}
                    className="menu-card"
                    style={{ animationDelay: `${i * 0.05}s` }}
                    onClick={() => setSelectedItem(item)}
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && setSelectedItem(item)}
                    role="button"
                    aria-label={`View details of ${item.item_name}`}
                  >
                    <div className="menu-card__img">
                      <img
                        src={categoryImages[item.category] || categoryImages['Custom Package']}
                        alt={`${item.item_name} — ${item.category} dish`}
                        loading="lazy"
                      />
                      <span className="menu-card__badge">{item.category}</span>
                      {!item.is_available && <span className="menu-card__unavailable">Unavailable</span>}
                    </div>
                    <div className="menu-card__body">
                      <h3>{item.item_name}</h3>
                      {item.description && <p>{item.description}</p>}
                      <div className="menu-card__price">
                        <span className="menu-card__amount">₹{item.price_per_plate}</span>
                        <span className="menu-card__unit">per plate</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── Item Details Modal ── */}
        {selectedItem && (
          <div className="modal-overlay" onClick={() => setSelectedItem(null)} role="dialog" aria-modal="true" aria-label={`Details for ${selectedItem.item_name}`}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <button className="modal__close" onClick={() => setSelectedItem(null)} aria-label="Close modal">
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
              </button>

              <div className="modal__img">
                <img
                  src={categoryImages[selectedItem.category] || categoryImages['Custom Package']}
                  alt={`${selectedItem.item_name} — detailed view`}
                />
  // ── FETCH ALL PACKAGES FROM BACKEND ──
  function fetchPackages() {
    setPackagesLoading(true);
    axios.get('http://localhost:5000/packages/all')
      .then(function(response) {
        // response.data = array of 7 packages from MySQL
        setPackages(response.data);
        setPackagesLoading(false);
      })
      .catch(function(error) {
        console.log("Error fetching packages:", error);
        setPackagesLoading(false);
      });
  }

  // ── FILTER MENU ITEMS BY CATEGORY ──
  // if 'All' selected → show all items
  // otherwise → show only items matching selected category
  const filteredItems = selectedCategory === 'All'
    ? menuItems
    : menuItems.filter(function(item) {
        return item.category === selectedCategory;
      });

  // ── GET BADGE COLOR BASED ON PACKAGE TYPE ──
  // Standard → green badge
  // Premium → orange badge
  // Mannat Special → purple badge
  function getPackageColor(type) {
    if (type === 'Standard') return 'badge-standard';
    if (type === 'Premium') return 'badge-premium';
    if (type === 'Mannat Special') return 'badge-special';
    return '';
  }

  // show loading screen while both are fetching
  if (loading && packagesLoading) {
    return <div className="loading">Loading Menu... 🍽️</div>;
  }

  return (
    <div className="menu-page">

      {/* ── PAGE HEADER ── */}
      <div className="menu-header">
        <h1>Our Menu 🍽️</h1>
        <p>Fresh, delicious food for every occasion</p>
      </div>

      {/* ════════════════════════════════
          SECTION 1 — PACKAGES
          Shows all 7 packages as cards
          Clicking a card opens popup with full details
      ════════════════════════════════ */}
      <div className="packages-section">
        <h2>🎉 Our Catering Packages</h2>
        <p className="packages-subtitle">
          Complete catering solutions for your special event
        </p>

        {/* Loop through all 7 packages and show as cards */}
        <div className="packages-grid">
          {packages.map(function(pkg) {
            return (
              // clicking card → setSelectedPackage saves this package
              // → popup opens showing full details!
              <div
                className="package-card"
                key={pkg.id}
                onClick={() => setSelectedPackage(pkg)}
              >
                {/* Package Type Badge — Standard / Premium / Mannat Special */}
                <span className={`package-badge ${getPackageColor(pkg.package_type)}`}>
                  {pkg.package_type}
                </span>

                {/* Package Name — eg: Standard Package No-01 */}
                <h3>{pkg.package_name}</h3>

                {/* Setup and waiter information */}
                <div className="package-info">
                  <p>🏮 {pkg.counter_setup}</p>
                  <p>👨‍🍳 {pkg.waiter_info}</p>
                  <p>👥 Min. {pkg.min_guests} Guests</p>
                </div>

                {/* Pricing for 500 and 600 guests */}
                {/* toLocaleString() adds commas → 115000 becomes 1,15,000 */}
                <div className="package-pricing">
                  <div className="price-option">
                    <span className="guest-count">500 Guests</span>
                    <span className="price-amount">
                      ₹{pkg.total_500.toLocaleString()}
                    </span>
                    <span className="per-plate">₹{pkg.price_500}/plate</span>
                  </div>
                  <div className="price-option">
                    <span className="guest-count">600 Guests</span>
                    <span className="price-amount">
                      ₹{pkg.total_600.toLocaleString()}
                    </span>
                    <span className="per-plate">₹{pkg.price_600}/plate</span>
                  </div>
                </div>

                <button className="view-details-btn">
                  View Details 👁️
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* ════════════════════════════════
          PACKAGE DETAIL POPUP
          Shows when user clicks a package card
          selectedPackage = the clicked package data
          null = popup is closed
      ════════════════════════════════ */}
      {selectedPackage && (
        // clicking dark overlay → closes popup
        <div className="package-overlay" onClick={() => setSelectedPackage(null)}>

          {/* stopPropagation → clicking inside popup doesn't close it */}
          <div className="package-detail" onClick={(e) => e.stopPropagation()}>

            {/* X button — closes popup */}
            <button className="detail-close"
              onClick={() => setSelectedPackage(null)}>✕
            </button>

            {/* Package type badge */}
            <span className={`package-badge ${getPackageColor(selectedPackage.package_type)}`}>
              {selectedPackage.package_type}
            </span>

            {/* Package name */}
            <h2>{selectedPackage.package_name}</h2>

            {/* Setup info badges */}
            <div className="detail-info">
              <span>🏮 {selectedPackage.counter_setup}</span>
              <span>👨‍🍳 {selectedPackage.waiter_info}</span>
              <span>👥 Min. {selectedPackage.min_guests} Guests</span>
            </div>

            {/* Welcome Drink section */}
            <div className="detail-section">
              <h4>🥤 Welcome Drink</h4>
              <p>{selectedPackage.welcome_drink}</p>
            </div>

            {/* Main Course section */}
            {/* split(',') breaks the string into array by comma */}
            {/* each item shown as a tag */}
            <div className="detail-section">
              <h4>🍽️ Main Course</h4>
              <div className="items-list">
                {selectedPackage.main_course.split(',').map(function(item, index) {
                  return (
                    <span key={index} className="item-tag">
                      {item.trim()} {/* trim() removes extra spaces */}
                    </span>
                  );
                })}
              </div>
            </div>

              <div className="modal__body">
                <span className="modal__category">{selectedItem.category}</span>
                <h2>{selectedItem.item_name}</h2>

                {selectedItem.description && (
                  <div className="modal__section">
                    <h4>Description</h4>
                    <p>{selectedItem.description}</p>
                  </div>
                )}

                <div className="modal__section">
                  <h4>Pricing</h4>
                  <div className="modal__price-row">
                    <span>Per Plate</span>
                    <strong>₹{selectedItem.price_per_plate}</strong>
                  </div>
                </div>

                <div className="modal__section">
                  <h4>Availability</h4>
                  <span className={`modal__avail ${selectedItem.is_available ? 'modal__avail--yes' : 'modal__avail--no'}`}>
                    {selectedItem.is_available ? '✓ Available' : '✕ Currently Unavailable'}
                  </span>
                </div>

                <div className="modal__section">
                  <h4>Nutritional Info</h4>
                  <p className="modal__calories">~350–500 kcal per plate (varies by preparation)</p>
                </div>
              </div>
            </div>
          </div>
        )}
            {/* Desserts section */}
            <div className="detail-section">
              <h4>🍮 Desserts</h4>
              <p>{selectedPackage.desserts}</p>
            </div>

            {/* Extras section — only shows if extras exist */}
            {/* selectedPackage.extras && means "show only if extras is not null" */}
            {selectedPackage.extras && (
              <div className="detail-section">
                <h4>✨ Extras & Special Features</h4>
                <p>{selectedPackage.extras}</p>
              </div>
            )}

            {/* Pricing for 500 and 600 guests */}
            <div className="detail-pricing">
              <div className="detail-price-option">
                <h4>500 Guests</h4>
                <p className="big-price">
                  ₹{selectedPackage.total_500.toLocaleString()}
                </p>
                <p>₹{selectedPackage.price_500} per plate</p>
              </div>
              <div className="detail-price-option">
                <h4>600 Guests</h4>
                <p className="big-price">
                  ₹{selectedPackage.total_600.toLocaleString()}
                </p>
                <p>₹{selectedPackage.price_600} per plate</p>
              </div>
            </div>

            {/* Book Now button → closes popup and goes to /booking */}
            <button
              className="book-package-btn"
              onClick={() => {
                setSelectedPackage(null); // close popup
                navigate('/booking');     // go to booking page
              }}
            >
              Book This Package 🎉
            </button>

          </div>
        </div>
      )}

      {/* ════════════════════════════════
          SECTION 2 — INDIVIDUAL MENU ITEMS
          Shows menu items with category filter
      ════════════════════════════════ */}
      <div className="menu-items-section">
        <h2>🍴 Individual Menu Items</h2>

        {/* Category filter buttons — clicking filters the grid below */}
        <div className="category-filters">
          {categories.map(function(cat) {
            return (
              <button
                key={cat}
                // active class → purple color for selected category
                className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Menu items grid — shows filtered items */}
        <div className="menu-grid">
          {filteredItems.map(function(item) {
            return (
              <div className="menu-card" key={item.id}>
                {/* Category badge */}
                <span className="menu-badge">{item.category}</span>
                {/* Item name */}
                <h3>{item.item_name}</h3>
                {/* Description — only shows if exists */}
                {item.description && <p>{item.description}</p>}
                {/* Price */}
                <div className="menu-price">
                  ₹{item.price_per_plate} <span>per plate</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      </div>
    </>
  );
}

export default Menu;