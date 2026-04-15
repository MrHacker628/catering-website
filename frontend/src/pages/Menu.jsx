// Menu.jsx — Shows packages and menu items
// useNavigate → lets us go to another page on button click
// axios → sends requests to our backend API

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Menu.css';

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
      .catch(function(error) {
        console.log("Error fetching menu:", error);
        setLoading(false);
      });
  }

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
  );
}

export default Menu;