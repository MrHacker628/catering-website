import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { Utensils } from 'lucide-react';
import './Menu.css';

const categories = ['All', 'Veg Thali', 'Non-Veg Thali', 'Biryani', 'Starters', 'Desserts', 'Beverages', 'Custom Package'];

/* Placeholder images by category */
const categoryImages = {
  'Veg Thali': 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop',
  'Non-Veg Thali': 'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=400&h=300&fit=crop',
  'Biryani': 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop',
  'Starters': 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop',
  'Desserts': 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop',
  'Beverages': 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop',
  'Custom Package': 'https://images.unsplash.com/photo-1555244162-803834f70033?w=400&h=300&fit=crop',
};

function Menu() {
  const [menuItems, setMenuItems] = useState([]);
  const [packages, setPackages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchMenu();
    fetchPackages();
  }, []);

  function fetchMenu() {
    setLoading(true);
    axios.get('http://localhost:5000/menu/all')
      .then(function (res) {
        setMenuItems(res.data);
        setLoading(false);
      })
      .catch(function (err) {
        console.log("Error fetching menu:", err);
        setLoading(false);
      });
  }

  function fetchPackages() {
    axios.get('http://localhost:5000/packages/all')
      .then(function (res) {
        setPackages(res.data);
      })
      .catch(function (err) {
        console.log("Error fetching packages:", err);
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
            ) : selectedCategory === 'Custom Package' ? (
              packages.length === 0 ? (
                <div className="menu-empty">
                  <span><Utensils size={48} /></span>
                  <p>No packages found.</p>
                </div>
              ) : (
                <div className="package-grid">
                  {packages.map((pkg, i) => (
                    <article
                      key={pkg.id}
                      className="package-card"
                      style={{ animationDelay: `${i * 0.05}s` }}
                      onClick={() => setSelectedItem({
                        isPackage: true,
                        category: 'Custom Package',
                        item_name: pkg.package_name || 'Custom Package',
                        price_per_plate: pkg.price_500 || pkg.price_600 || 0,
                        is_available: pkg.is_available,
                        description: pkg.main_course || 'No items listed.',
                        ...pkg
                      })}
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && setSelectedItem({ isPackage: true, category: 'Custom Package', item_name: pkg.package_name || 'Custom Package', price_per_plate: pkg.price_500 || pkg.price_600 || 0, is_available: pkg.is_available, description: pkg.main_course || 'No items listed.', ...pkg })}
                      role="button"
                    >
                      <div className="package-card__header">
                        <h3>{pkg.package_name || 'Custom Package'}</h3>
                        <span className={`package-tier package-tier--${(pkg.package_type || 'standard').toLowerCase().replace(/\s+/g, '-')}`}>{pkg.package_type || 'Package'}</span>
                      </div>
                      <div className="package-card__body">
                        <p className="package-card__desc">{(pkg.main_course || '').substring(0, 80)}...</p>
                        <div className="package-card__meta">
                          <span>{pkg.waiter_info || 'Waiters Info NA'}</span>
                          <span>{pkg.counter_setup || 'Counter Info NA'}</span>
                        </div>
                        <div className="package-card__price">
                          <span className="package-card__amount">₹{(pkg.price_500 || pkg.price_600 || 0).toLocaleString()}</span>
                          <span className="package-card__unit">per plate</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )
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
                <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>

              <div className="modal__img">
                <img
                  src={categoryImages[selectedItem.category] || categoryImages['Custom Package']}
                  alt={`${selectedItem.item_name} — detailed view`}
                />
              </div>

              <div className="modal__body">
                <span className="modal__category">{selectedItem.category}</span>
                <h2>{selectedItem.item_name}</h2>

                {selectedItem.description && (
                  <div className="modal__section">
                    <h4>{selectedItem.isPackage ? 'Menu Highlights' : 'Description'}</h4>
                    <p>{selectedItem.description}</p>
                  </div>
                )}

                {selectedItem.isPackage && (
                  <div className="modal__section">
                    <h4>Package Details</h4>
                    <ul className="modal__package-details">
                      <li><strong>Tier:</strong> {selectedItem.package_type || 'N/A'}</li>
                      <li><strong>Counter:</strong> {selectedItem.counter_setup || 'N/A'}</li>
                      <li><strong>Staff:</strong> {selectedItem.waiter_info || 'N/A'}</li>
                      {selectedItem.welcome_drink && <li><strong>Welcome Drink:</strong> {selectedItem.welcome_drink}</li>}
                      {selectedItem.desserts && <li><strong>Desserts:</strong> {selectedItem.desserts}</li>}
                    </ul>
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

      </div>
    </>
  );
}

export default Menu;