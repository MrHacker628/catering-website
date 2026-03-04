// Menu.jsx — Shows all menu items fetched from our backend
// useState — stores data (like variables in React)
// useEffect — runs code when page loads (like fetching data)
// axios — sends request to our backend API

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Menu.css';

function Menu() {

  // useState creates a variable that React watches
  // when it changes React automatically updates the page
  // menuItems = current value, setMenuItems = function to update it
  const [menuItems, setMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  // All available categories
  const categories = ['All', 'Veg Thali', 'Non-Veg Thali', 'Biryani', 'Starters', 'Desserts', 'Beverages', 'Custom Package'];

  // useEffect runs when the page first loads
  // empty [] at end means run ONCE only
  useEffect(() => {
    fetchMenuItems();
  }, []);

  // Function to fetch ALL menu items from backend
  function fetchMenuItems() {
    setLoading(true);

    // axios.get sends GET request to our backend
    // our backend is running on port 5000
    axios.get('http://localhost:5000/menu/all')
      .then(function(response) {
        // response.data contains the array of menu items
        setMenuItems(response.data);
        setLoading(false);
      })
      .catch(function(error) {
        console.log("Error fetching menu:", error);
        setLoading(false);
      });
  }

  // Filter items based on selected category
  // if 'All' is selected show everything
  // otherwise show only items matching the category
  const filteredItems = selectedCategory === 'All'
    ? menuItems
    : menuItems.filter(function(item) {
        return item.category === selectedCategory;
      });

  // Show loading message while fetching data
  if (loading) {
    return <div className="loading">Loading Menu... 🍽️</div>;
  }

  return (
    <div className="menu-page">

      {/* ── PAGE HEADER ── */}
      <div className="menu-header">
        <h1>Our Menu 🍽️</h1>
        <p>Fresh, delicious food for every occasion</p>
      </div>

      {/* ── CATEGORY FILTER BUTTONS ── */}
      {/* clicking a button filters the menu items below */}
      <div className="category-filters">
        {categories.map(function(cat) {
          return (
            <button
              key={cat}
              // if this category is selected add 'active' class
              className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* ── MENU ITEMS GRID ── */}
      <div className="menu-grid">
        {filteredItems.map(function(item) {
          return (
            <div className="menu-card" key={item.id}>

              {/* Category badge */}
              <span className="menu-badge">{item.category}</span>

              <h3>{item.item_name}</h3>

              {/* Show description only if it exists */}
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
  );
}

export default Menu;