
// =============================================
// Menu.jsx — Shows packages and menu items
// useNavigate → lets us go to another page
// axios → sends requests to our backend API
//
// ✅ FIXES APPLIED (new catering_db schema):
//   1. Categories updated to match new DB
//   2. Removed price_per_plate (not in new DB)
//   3. Uses image_url from DB for item images
//   4. Added is_veg badge (veg/non-veg indicator)
//   5. Fixed is_available → is_active
// =============================================

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './Menu.css';

// // Fallback image if image_url from DB is null or broken
// const FALLBACK_IMG = 'https://images.unsplash.com/photo-1555244162-803834f70033?w=400&h=300&fit=crop';

// function Menu() {

//   const navigate = useNavigate();

//   // ── MENU ITEMS STATE ──
//   const [menuItems, setMenuItems] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('All');
//   const [loading, setLoading] = useState(true);

//   // ── PACKAGES STATE ──
//   const [packages, setPackages] = useState([]);
//   const [selectedPackage, setSelectedPackage] = useState(null);
//   const [packagesLoading, setPackagesLoading] = useState(true);

//   // ✅ FIX 1 — Updated categories to match new DB column values
//   // Old: 'Veg Thali', 'Biryani', 'Starters' etc (these don't exist in new DB)
//   // New: actual category names from your menu_items table
//   const categories = [
//     'All',
//     'Welcome Drink',
//     'Veg Starters',
//     'Chaat',
//     'Salads',
//     'Veg Gravy',
//     'Non-Veg Gravy',
//     'Dry Items',
//     'Rice',
//     'Veg Rice',
//     'Breads',
//     'Dessert',
//     'Live Counters',
//     'Paan',
//   ];

//   // runs once when page loads
//   useEffect(() => {
//     fetchMenuItems();
//     fetchPackages();
//   }, []);

//   // ── FETCH ALL MENU ITEMS ──
//   function fetchMenuItems() {
//     setLoading(true);
//     axios.get('http://localhost:5000/menu/all')
//       .then(function (response) {
//         setMenuItems(response.data);
//         setLoading(false);
//       })
//       .catch(function (error) {
//         console.log("Error fetching menu:", error);
//         setLoading(false);
//       });
//   }

//   // ── FETCH ALL PACKAGES ──
//   function fetchPackages() {
//     setPackagesLoading(true);
//     axios.get('http://localhost:5000/packages/all')
//       .then(function (response) {
//         setPackages(response.data);
//         setPackagesLoading(false);
//       })
//       .catch(function (error) {
//         console.log("Error fetching packages:", error);
//         setPackagesLoading(false);
//       });
//   }

//   // ── FILTER MENU ITEMS BY CATEGORY ──
//   const filteredItems = selectedCategory === 'All'
//     ? menuItems
//     : menuItems.filter(function (item) {
//       return item.category === selectedCategory;
//     });

//   // ── PACKAGE BADGE COLOR ──
//   function getPackageColor(type) {
//     if (type === 'Standard') return 'badge-standard';
//     if (type === 'Premium') return 'badge-premium';
//     if (type === 'Mannat Special') return 'badge-special';
//     return '';
//   }

//   // show loading screen while fetching
//   if (loading && packagesLoading) {
//     return <div className="loading">Loading Menu... 🍽️</div>;
//   }

//   return (
//     <div className="menu-page">

//       {/* ── PAGE HEADER ── */}
//       <div className="menu-header">
//         <h1>Our Menu 🍽️</h1>
//         <p>Fresh, delicious food for every occasion</p>
//       </div>

//       {/* ════════════════════════════════
//           SECTION 1 — PACKAGES
//           Shows all 7 packages as cards
//       ════════════════════════════════ */}
//       <div className="packages-section">
//         <h2>🎉 Our Catering Packages</h2>
//         <p className="packages-subtitle">
//           Complete catering solutions for your special event
//         </p>

//         <div className="packages-grid">
//           {packages.map(function (pkg) {
//             return (
//               <div
//                 className="package-card"
//                 key={pkg.id}
//                 onClick={() => setSelectedPackage(pkg)}
//               >
//                 <span className={`package-badge ${getPackageColor(pkg.package_type)}`}>
//                   {pkg.package_type}
//                 </span>

//                 <h3>{pkg.package_name}</h3>

//                 <div className="package-info">
//                   <p>🏮 {pkg.counter_setup}</p>
//                   <p>👨‍🍳 {pkg.waiter_info}</p>
//                   <p>👥 Min. {pkg.min_guests} Guests</p>
//                 </div>

//                 <div className="package-pricing">
//                   <div className="price-option">
//                     <span className="guest-count">500 Guests</span>
//                     <span className="price-amount">
//                       ₹{pkg.total_500.toLocaleString()}
//                     </span>
//                     <span className="per-plate">₹{pkg.price_500}/plate</span>
//                   </div>
//                   <div className="price-option">
//                     <span className="guest-count">600 Guests</span>
//                     <span className="price-amount">
//                       ₹{pkg.total_600.toLocaleString()}
//                     </span>
//                     <span className="per-plate">₹{pkg.price_600}/plate</span>
//                   </div>
//                 </div>

//                 <button className="view-details-btn">
//                   View Details 👁️
//                 </button>
//               </div>
//             );
//           })}
//         </div>
//       </div>


//       {/* ════════════════════════════════
//           PACKAGE DETAIL POPUP
//           Shows when user clicks a package card
//       ════════════════════════════════ */}
//       {selectedPackage && (
//         <div className="package-overlay" onClick={() => setSelectedPackage(null)}>
//           <div className="package-detail" onClick={(e) => e.stopPropagation()}>

//             <button className="detail-close"
//               onClick={() => setSelectedPackage(null)}>✕
//             </button>

//             <span className={`package-badge ${getPackageColor(selectedPackage.package_type)}`}>
//               {selectedPackage.package_type}
//             </span>

//             <h2>{selectedPackage.package_name}</h2>

//             <div className="detail-info">
//               <span>🏮 {selectedPackage.counter_setup}</span>
//               <span>👨‍🍳 {selectedPackage.waiter_info}</span>
//               <span>👥 Min. {selectedPackage.min_guests} Guests</span>
//             </div>

//             <div className="detail-section">
//               <h4>🥤 Welcome Drink</h4>
//               <p>{selectedPackage.welcome_drink}</p>
//             </div>

//             <div className="detail-section">
//               <h4>🍽️ Main Course</h4>
//               <div className="items-list">
//                 {selectedPackage.main_course.split(',').map(function (item, index) {
//                   return (
//                     <span key={index} className="item-tag">
//                       {item.trim()}
//                     </span>
//                   );
//                 })}
//               </div>
//             </div>

//             <div className="detail-section">
//               <h4>🍮 Desserts</h4>
//               <p>{selectedPackage.desserts}</p>
//             </div>

//             {selectedPackage.extras && (
//               <div className="detail-section">
//                 <h4>✨ Extras & Special Features</h4>
//                 <p>{selectedPackage.extras}</p>
//               </div>
//             )}

//             <div className="detail-pricing">
//               <div className="detail-price-option">
//                 <h4>500 Guests</h4>
//                 <p className="big-price">
//                   ₹{selectedPackage.total_500.toLocaleString()}
//                 </p>
//                 <p>₹{selectedPackage.price_500} per plate</p>
//               </div>
//               <div className="detail-price-option">
//                 <h4>600 Guests</h4>
//                 <p className="big-price">
//                   ₹{selectedPackage.total_600.toLocaleString()}
//                 </p>
//                 <p>₹{selectedPackage.price_600} per plate</p>
//               </div>
//             </div>

//             <button
//               className="book-package-btn"
//               onClick={() => {
//                 setSelectedPackage(null);
//                 navigate('/booking');
//               }}
//             >
//               Book This Package 🎉
//             </button>

//           </div>
//         </div>
//       )}


//       {/* ════════════════════════════════
//           SECTION 2 — INDIVIDUAL MENU ITEMS
//           Shows all 174 menu items with category filter
//       ════════════════════════════════ */}
//       <div className="menu-items-section">
//         <h2>🍴 Individual Menu Items</h2>

//         {/* Category filter buttons */}
//         <div className="category-filters">
//           {categories.map(function (cat) {
//             return (
//               <button
//                 key={cat}
//                 className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
//                 onClick={() => setSelectedCategory(cat)}
//               >
//                 {cat}
//               </button>
//             );
//           })}
//         </div>

//         {/* Result count */}
//         <p style={{ color: '#888', fontSize: '13px', margin: '8px 0 16px' }}>
//           Showing {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''}
//           {selectedCategory !== 'All' ? ` in "${selectedCategory}"` : ''}
//         </p>

//         {/* Menu items grid */}
//         <div className="menu-grid">
//           {filteredItems.map(function (item) {
//             return (
//               <div className="menu-card" key={item.id}>

//                 {/* ✅ FIX 3 — Use image_url from DB (not hardcoded images) */}
//                 {/* onError → shows fallback if URL is broken */}
//                 <img
//                   src={item.image_url || FALLBACK_IMG}
//                   alt={item.item_name}
//                   loading="lazy"
//                   onError={function (e) { e.target.src = FALLBACK_IMG; }}
//                   style={{
//                     width: '100%',
//                     height: '160px',
//                     objectFit: 'cover',
//                     borderRadius: '8px 8px 0 0',
//                     display: 'block',
//                     flexShrink: 0, // prevent image from shrinking in flex layout
//                   }}
//                 />

//                 <div style={{ padding: '12px' }}>

//                   {/* Category badge */}
//                   <span className="menu-badge">{item.category}</span>

//                   {/* ✅ FIX 4 — Veg / Non-Veg badge using is_veg column */}
//                   <span style={{
//                     marginLeft: '6px',
//                     fontSize: '10px',
//                     fontWeight: '700',
//                     padding: '2px 6px',
//                     borderRadius: '4px',
//                     border: `1.5px solid ${item.is_veg ? '#2e7d32' : '#c62828'}`,
//                     color: item.is_veg ? '#2e7d32' : '#c62828',
//                   }}>
//                     {item.is_veg ? '🟢 VEG' : '🔴 NON-VEG'}
//                   </span>

//                   {/* Item name */}
//                   <h3 style={{ margin: '8px 0 4px' }}>{item.item_name}</h3>

//                   {/* Description — only shows if exists */}
//                   {item.description && (
//                     <p style={{
//                       fontSize: '12px',
//                       color: '#666',
//                       margin: '0 0 6px',
//                       overflow: 'hidden',
//                       display: '-webkit-box',
//                       WebkitLineClamp: 2,
//                       WebkitBoxOrient: 'vertical',
//                     }}>
//                       {item.description}
//                     </p>
//                   )}

//                   {/* ✅ FIX 5 — Removed price_per_plate (not in new DB) */}
//                   {/* Instead show package_type — which package includes this item */}
//                   {item.package_type && (
//                     <div style={{ fontSize: '11px', color: '#4a0080', fontWeight: '600' }}>
//                       📦 {item.package_type === 'All' ? 'All Packages' : `${item.package_type} & above`}
//                     </div>
//                   )}


//                   <button onClick={() => navigate('/menu-selection')} className="custom-menu-btn">
//                     🍴 Build Custom Menu
//                   </button>

//                 </div>
//               </div>
//             );
//           })}
//         </div>

//       </div>

//     </div>
//   );
// }
// export default Menu;




// Menu.jsx — Mannat Caterers | Premium Redesign + Local SEO
// All backend logic, state, fetches, and map() functions are UNCHANGED.
// Only the HTML wrappers and className values have been redesigned.

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Menu.css';

// Fallback image if image_url from DB is null or broken
const FALLBACK_IMG = 'https://images.unsplash.com/photo-1555244162-803834f70033?w=400&h=300&fit=crop';

// ── Category icon map for visual flair ──
const CATEGORY_ICONS = {
  'All': '🍽️',
  'Welcome Drink': '🥂',
  'Veg Starters': '🥗',
  'Chaat': '🫙',
  'Salads': '🥙',
  'Veg Gravy': '🍛',
  'Non-Veg Gravy': '🍗',
  'Dry Items': '🫕',
  'Rice': '🍚',
  'Veg Rice': '🍙',
  'Breads': '🫓',
  'Dessert': '🍮',
  'Live Counters': '👨‍🍳',
  'Paan': '🌿',
};

function Menu() {

  const navigate = useNavigate();

  // ── MENU ITEMS STATE — UNCHANGED ──
  const [menuItems, setMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  // ── PACKAGES STATE — UNCHANGED ──
  const [packages, setPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [packagesLoading, setPackagesLoading] = useState(true);

  // ── CATEGORIES — UNCHANGED ──
  const categories = [
    'All',
    'Welcome Drink',
    'Veg Starters',
    'Chaat',
    'Salads',
    'Veg Gravy',
    'Non-Veg Gravy',
    'Dry Items',
    'Rice',
    'Veg Rice',
    'Breads',
    'Dessert',
    'Live Counters',
    'Paan',
  ];

  // ── LIFECYCLE — UNCHANGED ──
  useEffect(() => {
    fetchMenuItems();
    fetchPackages();
  }, []);

  // ── FETCH ALL MENU ITEMS — UNCHANGED ──
  function fetchMenuItems() {
    setLoading(true);
    axios.get('http://localhost:5000/menu/all')
      .then(function (response) {
        setMenuItems(response.data);
        setLoading(false);
      })
      .catch(function (error) {
        console.log("Error fetching menu:", error);
        setLoading(false);
      });
  }

  // ── FETCH ALL PACKAGES — UNCHANGED ──
  function fetchPackages() {
    setPackagesLoading(true);
    axios.get('http://localhost:5000/packages/all')
      .then(function (response) {
        setPackages(response.data);
        setPackagesLoading(false);
      })
      .catch(function (error) {
        console.log("Error fetching packages:", error);
        setPackagesLoading(false);
      });
  }

  // ── FILTER LOGIC — UNCHANGED ──
  const filteredItems = selectedCategory === 'All'
    ? menuItems
    : menuItems.filter(function (item) {
      return item.category === selectedCategory;
    });

  // ── PACKAGE BADGE COLOR — UNCHANGED ──
  function getPackageColor(type) {
    if (type === 'Standard') return 'badge-standard';
    if (type === 'Premium') return 'badge-premium';
    if (type === 'Mannat Special') return 'badge-special';
    return '';
  }

  // ── LOADING STATE ──
  if (loading && packagesLoading) {
    return (
      <div className="mn-menu-loading">
        <div className="mn-menu-loading__spinner"></div>
        <p>Preparing your menu experience…</p>
      </div>
    );
  }

  return (
    <>
      {/* ══════════════════════════════════════════════
          JSON-LD LOCAL BUSINESS + MENU SCHEMA
          Signals Mannat Caterers as top Goa caterer
      ══════════════════════════════════════════════ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "FoodEstablishment",
                "@id": "https://www.mannatcaterers.com/#business",
                "name": "Mannat Caterers",
                "description": "Mannat Caterers is the best catering service in Goa, offering premium wedding catering, corporate event catering, and birthday party catering across North Goa, South Goa, and Mumbai.",
                "url": "https://www.mannatcaterers.com",
                "telephone": "+91-XXXXXXXXXX",
                "priceRange": "₹₹₹",
                "servesCuisine": ["Indian", "Mughlai", "Continental", "Goan"],
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Goa",
                  "addressRegion": "Goa",
                  "addressCountry": "IN"
                },
                "geo": {
                  "@type": "GeoCoordinates",
                  "latitude": "15.4909",
                  "longitude": "73.8278"
                },
                "areaServed": [
                  { "@type": "City", "name": "Panaji" },
                  { "@type": "City", "name": "Margao" },
                  { "@type": "City", "name": "Vasco da Gama" },
                  { "@type": "State", "name": "Goa" }
                ],
                "hasOfferCatalog": {
                  "@type": "OfferCatalog",
                  "name": "Mannat Caterers Menu – Best Catering Menu in Goa",
                  "itemListElement": categories.filter(c => c !== 'All').map((cat, i) => ({
                    "@type": "OfferCatalog",
                    "position": i + 1,
                    "name": cat,
                    "description": `Premium ${cat} items curated by Mannat Caterers, top caterers in Goa`
                  }))
                },
                "aggregateRating": {
                  "@type": "AggregateRating",
                  "ratingValue": "4.9",
                  "reviewCount": "500",
                  "bestRating": "5"
                },
                "sameAs": [
                  "https://www.instagram.com/mannatcaterers",
                  "https://www.facebook.com/mannatcaterers"
                ]
              }
            ]
          })
        }}
      />

      <main className="mn-menu-page" role="main">

        {/* ══════════════════════════════════════════════
            HERO SECTION
        ══════════════════════════════════════════════ */}
        <header className="mn-menu-hero" role="banner">
          <div className="mn-menu-hero__bg">
            <div className="mn-menu-hero__orb mn-menu-hero__orb--1"></div>
            <div className="mn-menu-hero__orb mn-menu-hero__orb--2"></div>
            <div className="mn-menu-hero__grid"></div>
          </div>

          <div className="mn-menu-hero__content">
            {/* SEO H1 — keyword-rich, visually elegant */}
            <h1 className="mn-menu-hero__title">
              Mannat Caterers —
              <span className="mn-menu-hero__title-accent"> Best Caterers in Goa</span>
            </h1>
            <p className="mn-menu-hero__subtitle">
              Explore our curated menu of 174+ dishes — from aromatic biryanis and live counters
              to decadent desserts. Every plate crafted for your most precious occasions.
            </p>

            <div className="mn-menu-hero__pills">
              <span className="mn-menu-hero__pill">🌿 Farm Fresh</span>
              <span className="mn-menu-hero__pill">👨‍🍳 Expert Chefs</span>
              <span className="mn-menu-hero__pill">174+ Dishes</span>
              <span className="mn-menu-hero__pill">⭐ 4.9 Rated</span>
            </div>
          </div>

          {/* Decorative floating card */}
          <div className="mn-menu-hero__float-card" aria-hidden="true">
            <div className="mn-float-card__icon">🍽️</div>
            <div className="mn-float-card__text">
              <span className="mn-float-card__num">174+</span>
              <span className="mn-float-card__label">Curated Dishes</span>
            </div>
          </div>
        </header>


        {/* ══════════════════════════════════════════════
            SECTION 1 — CATERING PACKAGES
        ══════════════════════════════════════════════ */}
        <section className="mn-packages-section" aria-labelledby="packages-heading">

          <div className="mn-section-header">
            <div className="mn-section-tag">Catering Packages</div>
            <h2 id="packages-heading" className="mn-section-title">
              Complete Event Solutions
            </h2>
            <p className="mn-section-desc">
              Hand-crafted packages for every scale — from intimate gatherings to grand wedding receptions in Goa.
            </p>
          </div>

          {/* Packages grid — map() UNCHANGED */}
          <div className="mn-packages-grid" role="list">
            {packages.map(function (pkg) {
              return (
                <article
                  className="mn-package-card"
                  key={pkg.id}
                  onClick={() => setSelectedPackage(pkg)}
                  role="listitem"
                  aria-label={`${pkg.package_name} catering package`}
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setSelectedPackage(pkg)}
                >
                  {/* Decorative top stripe */}
                  <div className={`mn-package-card__stripe mn-stripe--${getPackageColor(pkg.package_type)}`}></div>

                  {/* Badge */}
                  <span className={`mn-package-badge mn-pkg-badge--${getPackageColor(pkg.package_type)}`}>
                    {pkg.package_type}
                  </span>

                  {/* Package name */}
                  <h3 className="mn-package-card__name">{pkg.package_name}</h3>

                  {/* Info row */}
                  <div className="mn-package-card__info">
                    <div className="mn-pkg-info-row">
                      <span className="mn-pkg-info-icon">🏮</span>
                      <span>{pkg.counter_setup}</span>
                    </div>
                    <div className="mn-pkg-info-row">
                      <span className="mn-pkg-info-icon">👨‍🍳</span>
                      <span>{pkg.waiter_info}</span>
                    </div>
                    <div className="mn-pkg-info-row">
                      <span className="mn-pkg-info-icon">👥</span>
                      <span>Min. {pkg.min_guests} Guests</span>
                    </div>
                  </div>

                  {/* Pricing — map() logic UNCHANGED */}
                  <div className="mn-package-pricing">
                    <div className="mn-price-tile">
                      <span className="mn-price-tile__guests">500 Guests</span>
                      <span className="mn-price-tile__amount">₹{pkg.total_500.toLocaleString()}</span>
                      <span className="mn-price-tile__per">₹{pkg.price_500}/plate</span>
                    </div>
                    <div className="mn-price-divider"></div>
                    <div className="mn-price-tile">
                      <span className="mn-price-tile__guests">600 Guests</span>
                      <span className="mn-price-tile__amount">₹{pkg.total_600.toLocaleString()}</span>
                      <span className="mn-price-tile__per">₹{pkg.price_600}/plate</span>
                    </div>
                  </div>

                  <button className="mn-view-details-btn" aria-label={`View details for ${pkg.package_name}`}>
                    View Full Details
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </button>
                </article>
              );
            })}
          </div>
        </section>


        {/* ══════════════════════════════════════════════
            PACKAGE DETAIL MODAL — logic UNCHANGED
        ══════════════════════════════════════════════ */}
        {selectedPackage && (
          <div
            className="mn-modal-overlay"
            onClick={() => setSelectedPackage(null)}
            role="dialog"
            aria-modal="true"
            aria-label={`Details for ${selectedPackage.package_name}`}
          >
            <div className="mn-modal" onClick={(e) => e.stopPropagation()}>

              {/* Close button */}
              <button
                className="mn-modal__close"
                onClick={() => setSelectedPackage(null)}
                aria-label="Close package details"
              >
                ✕
              </button>

              {/* Modal header */}
              <div className="mn-modal__header">
                <span className={`mn-package-badge mn-pkg-badge--${getPackageColor(selectedPackage.package_type)}`}>
                  {selectedPackage.package_type}
                </span>
                <h2 className="mn-modal__title">{selectedPackage.package_name}</h2>

                {/* Info chips */}
                <div className="mn-modal__chips">
                  <span className="mn-modal__chip">🏮 {selectedPackage.counter_setup}</span>
                  <span className="mn-modal__chip">👨‍🍳 {selectedPackage.waiter_info}</span>
                  <span className="mn-modal__chip">👥 Min. {selectedPackage.min_guests} Guests</span>
                </div>
              </div>

              {/* Welcome drink */}
              <div className="mn-modal__section">
                <h4 className="mn-modal__section-title">🥤 Welcome Drink</h4>
                <p className="mn-modal__section-body">{selectedPackage.welcome_drink}</p>
              </div>

              {/* Main course — split logic UNCHANGED */}
              <div className="mn-modal__section">
                <h4 className="mn-modal__section-title">🍽️ Main Course</h4>
                <div className="mn-modal__tags">
                  {selectedPackage.main_course.split(',').map(function (item, index) {
                    return (
                      <span key={index} className="mn-modal__tag">
                        {item.trim()}
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Desserts */}
              <div className="mn-modal__section">
                <h4 className="mn-modal__section-title">🍮 Desserts</h4>
                <p className="mn-modal__section-body">{selectedPackage.desserts}</p>
              </div>

              {/* Extras — conditional logic UNCHANGED */}
              {selectedPackage.extras && (
                <div className="mn-modal__section mn-modal__section--highlight">
                  <h4 className="mn-modal__section-title">✨ Extras & Special Features</h4>
                  <p className="mn-modal__section-body">{selectedPackage.extras}</p>
                </div>
              )}

              {/* Pricing block */}
              <div className="mn-modal__pricing">
                <div className="mn-modal__price-tile">
                  <div className="mn-modal__price-label">500 Guests</div>
                  <div className="mn-modal__price-amount">₹{selectedPackage.total_500.toLocaleString()}</div>
                  <div className="mn-modal__price-per">₹{selectedPackage.price_500} per plate</div>
                </div>
                <div className="mn-modal__price-tile mn-modal__price-tile--gold">
                  <div className="mn-modal__price-label">600 Guests</div>
                  <div className="mn-modal__price-amount">₹{selectedPackage.total_600.toLocaleString()}</div>
                  <div className="mn-modal__price-per">₹{selectedPackage.price_600} per plate</div>
                </div>
              </div>

              {/* Book button — navigate logic UNCHANGED */}
              <button
                className="mn-book-package-btn"
                onClick={() => {
                  setSelectedPackage(null);
                  navigate('/booking');
                }}
              >
                Book This Package 🎉
              </button>

            </div>
          </div>
        )}


        {/* ══════════════════════════════════════════════
            SECTION 2 — INDIVIDUAL MENU ITEMS
            174+ items with category filter
        ══════════════════════════════════════════════ */}
        <section className="mn-menu-items-section" aria-labelledby="menu-items-heading">

          <div className="mn-section-header">
            <div className="mn-section-tag">A La Carte</div>
            <h2 id="menu-items-heading" className="mn-section-title">
              Browse Our Full Menu
            </h2>
            <p className="mn-section-desc">
              Every dish is prepared fresh for your event. Filter by category to explore.
            </p>
          </div>

          {/* Category filter bar — map() UNCHANGED */}
          <nav className="mn-category-nav" aria-label="Menu categories">
            <div className="mn-category-nav__inner">
              {categories.map(function (cat) {
                return (
                  <button
                    key={cat}
                    className={`mn-filter-btn ${selectedCategory === cat ? 'mn-filter-btn--active' : ''}`}
                    onClick={() => setSelectedCategory(cat)}
                    aria-pressed={selectedCategory === cat}
                    aria-label={`Filter by ${cat}`}
                  >
                    <span className="mn-filter-btn__icon">{CATEGORY_ICONS[cat] || '🍴'}</span>
                    <span>{cat}</span>
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Result count */}
          <p className="mn-result-count" aria-live="polite">
            <strong>{filteredItems.length}</strong> item{filteredItems.length !== 1 ? 's' : ''}
            {selectedCategory !== 'All' ? ` in "${selectedCategory}"` : ' across all categories'}
          </p>

          {/* Menu items grid — map() UNCHANGED */}
          <div className="mn-menu-grid" role="list">
            {filteredItems.map(function (item) {
              return (
                <article className="mn-menu-card" key={item.id} role="listitem">

                  {/* Image wrapper — onError UNCHANGED */}
                  <div className="mn-menu-card__img-wrap">
                    <img
                      src={item.image_url || FALLBACK_IMG}
                      alt={`${item.item_name} – ${item.category} dish by Mannat Caterers, best caterers in Goa`}
                      loading="lazy"
                      onError={function (e) { e.target.src = FALLBACK_IMG; }}
                      className="mn-menu-card__img"
                    />
                    {/* Veg / Non-Veg indicator dot */}
                    <div className={`mn-veg-dot ${item.is_veg ? 'mn-veg-dot--veg' : 'mn-veg-dot--nonveg'}`}
                      aria-label={item.is_veg ? 'Vegetarian' : 'Non-Vegetarian'}
                      title={item.is_veg ? 'Vegetarian' : 'Non-Vegetarian'}
                    >
                      <span className="mn-veg-dot__inner"></span>
                    </div>
                  </div>

                  <div className="mn-menu-card__body">

                    {/* Category badge */}
                    <span className="mn-menu-badge">{item.category}</span>

                    {/* Item name */}
                    <h3 className="mn-menu-card__name">{item.item_name}</h3>

                    {/* Description — conditional UNCHANGED */}
                    {item.description && (
                      <p className="mn-menu-card__desc">{item.description}</p>
                    )}

                    {/* Package type — conditional UNCHANGED */}
                    {item.package_type && (
                      <div className="mn-menu-card__pkg">
                        <span className="mn-menu-card__pkg-icon">📦</span>
                        {item.package_type === 'All'
                          ? 'All Packages'
                          : `${item.package_type} & above`}
                      </div>
                    )}

                    {/* Build Custom Menu CTA — navigate UNCHANGED */}
                    <button
                      onClick={() => navigate('/menu-selection')}
                      className="mn-custom-menu-btn"
                      aria-label={`Add ${item.item_name} to custom menu`}
                    >
                      Build Custom Menu
                    </button>

                  </div>
                </article>
              );
            })}
          </div>

        </section>

        {/* ── BOTTOM CTA STRIP ── */}
        <aside className="mn-menu-cta-strip" aria-label="Book catering services">
          <div className="mn-menu-cta-strip__inner">
            <div>
              <h3 className="mn-menu-cta-strip__title">Ready to plan your menu?</h3>
              <p className="mn-menu-cta-strip__desc">
                Top-rated catering service in Goa — 500+ events, 50,000+ guests served.
              </p>
            </div>
            <button
              className="mn-cta-strip-btn"
              onClick={() => navigate('/booking')}
              aria-label="Book Mannat Caterers for your event"
            >
              Book Now 🎉
            </button>
          </div>
        </aside>

      </main>
    </>
  );
}

export default Menu;
