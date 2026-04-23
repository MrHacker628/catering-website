// MenuSelection.jsx
// Custom menu builder — select items + enter guests = get total price

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './MenuSelection.css';

// const FALLBACK_IMG = 'https://images.unsplash.com/photo-1555244162-803834f70033?w=400';

// const CATEGORIES = [
//   'All', 'Welcome Drink', 'Veg Starters', 'Dry Items',
//   'Veg Gravy', 'Non-Veg Gravy', 'Rice', 'Veg Rice',
//   'Breads', 'Salads', 'Chaat', 'Dessert', 'Live Counters', 'Paan'
// ];

// function MenuSelection() {

//   const navigate = useNavigate();

//   // ── STATE ──
//   const [menuItems,        setMenuItems]        = useState([]);
//   const [selectedItems,    setSelectedItems]    = useState({});   // { itemId: itemObject }
//   const [numPeople,        setNumPeople]        = useState('');
//   const [activeCategory,   setActiveCategory]   = useState('All');
//   const [vegFilter,        setVegFilter]        = useState('All'); // All / Veg / NonVeg
//   const [loading,          setLoading]          = useState(true);
//   const [peopleError,      setPeopleError]      = useState('');

//   // ── FETCH MENU ──
//   useEffect(function() {
//     axios.get('http://localhost:5000/menu/all')
//       .then(function(res) {
//         setMenuItems(res.data);
//         setLoading(false);
//       })
//       .catch(function(err) {
//         console.log("Error:", err);
//         setLoading(false);
//       });
//   }, []);

//   // ── FILTER ITEMS ──
//   const filteredItems = menuItems.filter(function(item) {
//     const catMatch = activeCategory === 'All' || item.category === activeCategory;
//     const vegMatch = vegFilter === 'All' ||
//       (vegFilter === 'Veg' && item.is_veg === 1) ||
//       (vegFilter === 'NonVeg' && item.is_veg === 0);
//     return catMatch && vegMatch;
//   });

//   // ── TOGGLE ITEM SELECTION ──
//   function toggleItem(item) {
//     setSelectedItems(function(prev) {
//       const updated = { ...prev };
//       if (updated[item.id]) {
//         delete updated[item.id]; // deselect
//       } else {
//         updated[item.id] = item; // select
//       }
//       return updated;
//     });
//   }

//   // ── VALIDATE PEOPLE INPUT ──
//   function handlePeopleChange(e) {
//     const val = e.target.value;
//     setPeopleError('');

//     if (val === '') {
//       setNumPeople('');
//       return;
//     }

//       const num = parseInt(val);
//   if (isNaN(num) || num < 1) {
//     setPeopleError('Please enter a valid number');
//     setNumPeople(val);
//     return;
//   }

//   if (num < 250) {
//     setPeopleError('Minimum 250 guests required for catering service');
//     setNumPeople(val);
//     return;
//   }

//     setNumPeople(num);
//   }

//   // ── BILLING CALCULATION ──
//   const selectedList   = Object.values(selectedItems);
//   const perPersonCost  = selectedList.reduce((sum, item) => sum + parseFloat(item.price_per_person || 50), 0);
//   const totalCost      = numPeople && !peopleError ? Math.round(perPersonCost * parseInt(numPeople)) : 0;

//   // ── PROCEED TO BOOKING ──
//   function handleProceed() {
//     if (selectedList.length === 0) {
//       alert('Please select at least one menu item!');
//       return;
//     }
//     if (!numPeople || peopleError) {
//       alert('Please enter a valid number of people!');
//       return;
//     }

//     // Save to sessionStorage for booking page
//     sessionStorage.setItem('customMenu', JSON.stringify({
//       selectedItems: selectedList,
//       numPeople:     parseInt(numPeople),
//       perPersonCost,
//       totalCost,
//     }));

//     navigate('/booking', {
//       state: {
//         fromCustomMenu: true,
//         numPeople:      parseInt(numPeople),
//         totalCost,
//         selectedItems:  selectedList,
//       }
//     });
//   }

//   if (loading) return (
//     <div className="ms-loading">Loading menu... 🍽️</div>
//   );

//   return (
//     <div className="ms-page">

//       {/* ── HEADER ── */}
//       <div className="ms-header">
//         <h1>Build Your Custom Menu 🍴</h1>
//         <p>Select dishes and get instant pricing</p>
//       </div>

//       <div className="ms-layout">

//         {/* ══════════════════════════════
//             LEFT — MENU ITEMS
//         ══════════════════════════════ */}
//         <div className="ms-left">

//           {/* Filters row */}
//           <div className="ms-filters">

//             {/* Veg / Non-veg toggle */}
//             <div className="veg-toggle">
//               {['All', 'Veg', 'NonVeg'].map(function(v) {
//                 return (
//                   <button
//                     key={v}
//                     className={`veg-btn ${vegFilter === v ? 'active' : ''} veg-btn-${v.toLowerCase()}`}
//                     onClick={() => setVegFilter(v)}
//                   >
//                     {v === 'All' ? '🍽️ All' : v === 'Veg' ? '🟢 Veg' : '🔴 Non-Veg'}
//                   </button>
//                 );
//               })}
//             </div>

//           </div>

//           {/* Category tabs */}
//           <div className="ms-categories">
//             {CATEGORIES.map(function(cat) {
//               return (
//                 <button
//                   key={cat}
//                   className={`ms-cat-btn ${activeCategory === cat ? 'active' : ''}`}
//                   onClick={() => setActiveCategory(cat)}
//                 >
//                   {cat}
//                   {cat !== 'All' && (
//                     <span className="cat-count">
//                       {menuItems.filter(i => i.category === cat).length}
//                     </span>
//                   )}
//                 </button>
//               );
//             })}
//           </div>

//           {/* Item count */}
//           <p className="ms-count">
//             Showing {filteredItems.length} items
//             {activeCategory !== 'All' ? ` in "${activeCategory}"` : ''}
//           </p>

//           {/* Menu grid */}
//           <div className="ms-grid">
//             {filteredItems.map(function(item) {
//               const isSelected = !!selectedItems[item.id];
//               return (
//                 <div
//                   key={item.id}
//                   className={`ms-card ${isSelected ? 'selected' : ''}`}
//                   onClick={() => toggleItem(item)}
//                 >
//                   {/* Checkbox indicator */}
//                   <div className={`ms-check ${isSelected ? 'checked' : ''}`}>
//                     {isSelected ? '✓' : '+'}
//                   </div>

//                   {/* Image */}
//                   <img
//                     src={item.image_url || FALLBACK_IMG}
//                     alt={item.item_name}
//                     loading="lazy"
//                     onError={function(e) { e.target.src = FALLBACK_IMG; }}
//                     className="ms-img"
//                   />

//                   <div className="ms-card-body">
//                     {/* Veg badge */}
//                     <span className={`veg-dot ${item.is_veg ? 'veg' : 'nonveg'}`}>
//                       {item.is_veg ? '🟢' : '🔴'}
//                     </span>

//                     {/* Name */}
//                     <h4 className="ms-name">{item.item_name}</h4>

//                     {/* Description */}
//                     {item.description && (
//                       <p className="ms-desc">{item.description}</p>
//                     )}

//                     {/* Price */}
//                     <div className="ms-price">
//                       ₹{item.price_per_person || 50}
//                       <span>/person</span>
//                     </div>
//                   </div>

//                   {/* Selected overlay */}
//                   {isSelected && (
//                     <div className="ms-selected-overlay">Added ✓</div>
//                   )}
//                 </div>
//               );
//             })}
//           </div>

//         </div>

//         {/* ══════════════════════════════
//             RIGHT — STICKY SUMMARY
//         ══════════════════════════════ */}
//         <div className="ms-right">
//           <div className="ms-summary">

//             <h3>📋 Your Selection</h3>

//             {/* People input */}
//             <div className="ms-people">
//               <label>👥 Number of People</label>
//               <input
//                 type="number"
//                 min="1"
//                 placeholder="Enter guests count"
//                 value={numPeople}
//                 onChange={handlePeopleChange}
//                 className={peopleError ? 'input-error' : ''}
//               />
//               {peopleError && (
//                 <span className="error-text">{peopleError}</span>
//               )}
//             </div>

//             {/* Selected items list */}
//             {selectedList.length === 0 ? (
//               <div className="ms-empty">
//                 <p>No items selected yet</p>
//                 <small>Click on menu items to add them</small>
//               </div>
//             ) : (
//               <div className="ms-selected-list">
//                 {selectedList.map(function(item) {
//                   return (
//                     <div key={item.id} className="ms-selected-item">
//                       <span className={`dot ${item.is_veg ? 'veg' : 'nonveg'}`}></span>
//                       <span className="sel-name">{item.item_name}</span>
//                       <span className="sel-price">₹{item.price_per_person || 50}/person</span>
//                       <button
//                         className="sel-remove"
//                         onClick={function(e) { e.stopPropagation(); toggleItem(item); }}
//                       >✕</button>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}

//             {/* Billing breakdown */}
//             {selectedList.length > 0 && (
//               <div className="ms-billing">
//                 <div className="bill-row">
//                   <span>Items selected</span>
//                   <strong>{selectedList.length}</strong>
//                 </div>
//                 <div className="bill-row">
//                   <span>Cost per person</span>
//                   <strong>₹{Math.round(perPersonCost).toLocaleString()}</strong>
//                 </div>
//                 <div className="bill-row">
//                   <span>Number of people</span>
//                   <strong>{numPeople || '—'}</strong>
//                 </div>
//                 <div className="bill-row bill-total">
//                   <span>Total Amount</span>
//                   <strong>₹{totalCost.toLocaleString()}</strong>
//                 </div>
//                 {totalCost > 0 && (
//                   <div className="bill-advance">
//                     <span>Advance (30%)</span>
//                     <strong>₹{Math.round(totalCost * 0.3).toLocaleString()}</strong>
//                   </div>
//                 )}
//               </div>
//             )}

//             {/* Proceed button */}
//             <button
//               className="ms-proceed-btn"
//               onClick={handleProceed}
//               disabled={selectedList.length === 0 || !numPeople || !!peopleError}
//             >
//               Proceed to Booking →
//             </button>

//             {selectedList.length === 0 && (
//               <p className="ms-hint">Select at least 1 item to proceed</p>
//             )}

//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

// export default MenuSelection;


// MenuSelection.jsx
// Custom menu builder — select items + enter guests = get total price
// Mannat Caterers — Premium Catering in Goa

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './MenuSelection.css';

const FALLBACK_IMG = 'https://images.unsplash.com/photo-1555244162-803834f70033?w=400';

const CATEGORIES = [
  'All', 'Welcome Drink', 'Veg Starters', 'Dry Items',
  'Veg Gravy', 'Non-Veg Gravy', 'Rice', 'Veg Rice',
  'Breads', 'Salads', 'Chaat', 'Dessert', 'Live Counters', 'Paan'
];

/* ── JSON-LD SEO SCHEMA ── */
const JSON_LD_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "OfferCatalog",
  "name": "Custom Catering Menu — Mannat Caterers, Best Caterers in Goa",
  "description": "Build your personalised catering menu from our curated list of starters, mains, desserts, live counters and more. Top-rated catering service in Goa for weddings, corporate events, and social gatherings.",
  "provider": {
    "@type": "LocalBusiness",
    "name": "Mannat Caterers",
    "description": "Premium catering services in Goa for weddings, corporate events, and social gatherings.",
    "areaServed": {
      "@type": "State",
      "name": "Goa",
      "addressCountry": "IN"
    },
    "serviceType": "Catering",
    "priceRange": "₹₹₹",
    "url": "https://www.mannatcaterers.com"
  },
  "itemListElement": CATEGORIES.filter(c => c !== 'All').map((cat, idx) => ({
    "@type": "Offer",
    "position": idx + 1,
    "name": cat,
    "category": "Catering Menu Category",
    "areaServed": "Goa, India"
  }))
};

function MenuSelection() {

  const navigate = useNavigate();

  // ── STATE ── (unchanged)
  const [menuItems,        setMenuItems]        = useState([]);
  const [selectedItems,    setSelectedItems]    = useState({});
  const [numPeople,        setNumPeople]        = useState('');
  const [activeCategory,   setActiveCategory]   = useState('All');
  const [vegFilter,        setVegFilter]        = useState('All');
  const [loading,          setLoading]          = useState(true);
  const [peopleError,      setPeopleError]      = useState('');

  // ── FETCH MENU ── (unchanged)
  useEffect(function() {
    axios.get('http://localhost:5000/menu/all')
      .then(function(res) {
        setMenuItems(res.data);
        setLoading(false);
      })
      .catch(function(err) {
        console.log("Error:", err);
        setLoading(false);
      });
  }, []);

  // ── FILTER ITEMS ── (unchanged)
  const filteredItems = menuItems.filter(function(item) {
    const catMatch = activeCategory === 'All' || item.category === activeCategory;
    const vegMatch = vegFilter === 'All' ||
      (vegFilter === 'Veg' && item.is_veg === 1) ||
      (vegFilter === 'NonVeg' && item.is_veg === 0);
    return catMatch && vegMatch;
  });

  // ── TOGGLE ITEM SELECTION ── (unchanged)
  function toggleItem(item) {
    setSelectedItems(function(prev) {
      const updated = { ...prev };
      if (updated[item.id]) {
        delete updated[item.id];
      } else {
        updated[item.id] = item;
      }
      return updated;
    });
  }

  // ── VALIDATE PEOPLE INPUT ── (unchanged)
  function handlePeopleChange(e) {
    const val = e.target.value;
    setPeopleError('');

    if (val === '') {
      setNumPeople('');
      return;
    }

    const num = parseInt(val);
    if (isNaN(num) || num < 1) {
      setPeopleError('Please enter a valid number');
      setNumPeople(val);
      return;
    }

    if (num < 250) {
      setPeopleError('Minimum 250 guests required for catering service');
      setNumPeople(val);
      return;
    }

    setNumPeople(num);
  }

  // ── BILLING CALCULATION ── (unchanged)
  const selectedList   = Object.values(selectedItems);
  const perPersonCost  = selectedList.reduce((sum, item) => sum + parseFloat(item.price_per_person || 50), 0);
  const totalCost      = numPeople && !peopleError ? Math.round(perPersonCost * parseInt(numPeople)) : 0;

  // ── PROCEED TO BOOKING ── (unchanged)
  function handleProceed() {
    if (selectedList.length === 0) {
      alert('Please select at least one menu item!');
      return;
    }
    if (!numPeople || peopleError) {
      alert('Please enter a valid number of people!');
      return;
    }

    sessionStorage.setItem('customMenu', JSON.stringify({
      selectedItems: selectedList,
      numPeople:     parseInt(numPeople),
      perPersonCost,
      totalCost,
    }));

    navigate('/booking', {
      state: {
        fromCustomMenu: true,
        numPeople:      parseInt(numPeople),
        totalCost,
        selectedItems:  selectedList,
      }
    });
  }

  // ── LOADING ──
  if (loading) return (
    <div className="ms-loading">
      <div className="ms-loading-icon">🍽️</div>
      <p className="ms-loading-text">Loading our menu…</p>
    </div>
  );

  return (
    <>
      {/* ── JSON-LD SEO SCHEMA ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_SCHEMA, null, 2) }}
      />

      <main className="ms-page" role="main">

        {/* ── HEADER ── */}
        <header className="ms-header" role="banner">
          <p className="ms-header-eyebrow">Mannat Caterers · Goa's Premier Catering</p>

          {/* Primary SEO h1 — visible and keyword-rich */}
          <h1>
            Build Your <em>Custom Catering Menu</em>
          </h1>

          {/* SEO-rich subtitle visible to screen readers and crawlers */}
          <p>
            Custom Catering Menu Selection · Top Caterers in Goa for Weddings &amp; Events · Select dishes, set guest count, get instant pricing
          </p>
        </header>

        <div className="ms-layout">

          {/* ══════════════════════════════
              LEFT — MENU ITEMS
          ══════════════════════════════ */}
          <section className="ms-left" aria-label="Menu catalogue">

            {/* Filters */}
            <div className="ms-filters-section">

              {/* Veg / Non-veg toggle */}
              <div className="ms-filters">
                <span className="filter-label">Filter:</span>
                <div className="veg-toggle" role="group" aria-label="Filter by dietary preference">
                  {['All', 'Veg', 'NonVeg'].map(function(v) {
                    return (
                      <button
                        key={v}
                        className={`veg-btn ${vegFilter === v ? 'active' : ''} veg-btn-${v.toLowerCase()}`}
                        onClick={() => setVegFilter(v)}
                        aria-pressed={vegFilter === v}
                      >
                        {v === 'All' ? '🍽️ All' : v === 'Veg' ? '🟢 Veg' : '🔴 Non-Veg'}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Category tabs — wrapped in semantic fieldset */}
              <fieldset className="ms-cat-fieldset">
                <legend className="ms-cat-legend">Browse by Category</legend>
                <div className="ms-categories" role="tablist">
                  {CATEGORIES.map(function(cat) {
                    return (
                      <button
                        key={cat}
                        role="tab"
                        aria-selected={activeCategory === cat}
                        className={`ms-cat-btn ${activeCategory === cat ? 'active' : ''}`}
                        onClick={() => setActiveCategory(cat)}
                      >
                        {cat}
                        {cat !== 'All' && (
                          <span className="cat-count" aria-label={`${menuItems.filter(i => i.category === cat).length} items`}>
                            {menuItems.filter(i => i.category === cat).length}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </fieldset>

            </div>

            {/* Count + heading */}
            <div className="ms-count-bar">
              <p className="ms-count">
                Showing <strong>{filteredItems.length}</strong> items
                {activeCategory !== 'All' ? ` in "${activeCategory}"` : ''}
              </p>
            </div>

            {/* Menu grid — semantic ol for SEO item signals */}
            <section className="ms-menu-section" aria-label={`Menu items${activeCategory !== 'All' ? ` — ${activeCategory}` : ''}`}>
              {activeCategory !== 'All' && (
                <h2 className="ms-section-heading">{activeCategory}</h2>
              )}

              <ol className="ms-grid" aria-label="Available menu items">
                {filteredItems.map(function(item) {
                  const isSelected = !!selectedItems[item.id];
                  return (
                    <li key={item.id} style={{ listStyle: 'none' }}>
                      <article
                        className={`ms-card ${isSelected ? 'selected' : ''}`}
                        onClick={() => toggleItem(item)}
                        role="button"
                        tabIndex={0}
                        aria-pressed={isSelected}
                        aria-label={`${item.item_name}, ₹${item.price_per_person || 50} per person, ${item.is_veg ? 'vegetarian' : 'non-vegetarian'}${isSelected ? ', selected' : ''}`}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleItem(item); } }}
                      >
                        {/* Checkbox indicator */}
                        <div className={`ms-check ${isSelected ? 'checked' : ''}`} aria-hidden="true">
                          {isSelected ? '✓' : '+'}
                        </div>

                        {/* Image */}
                        <div className="ms-img-wrap">
                          <img
                            src={item.image_url || FALLBACK_IMG}
                            alt={item.item_name}
                            loading="lazy"
                            onError={function(e) { e.target.src = FALLBACK_IMG; }}
                            className="ms-img"
                            width="400"
                            height="136"
                          />
                        </div>

                        <div className="ms-card-body">
                          {/* Veg / Non-veg badge */}
                          <div className="ms-card-top">
                            <span className={`ms-tag ${item.is_veg ? 'veg' : 'nonveg'}`} aria-hidden="true">
                              {item.is_veg ? '🟢 Veg' : '🔴 Non-Veg'}
                            </span>
                          </div>

                          {/* Name */}
                          <h3 className="ms-name">{item.item_name}</h3>

                          {/* Description */}
                          {item.description && (
                            <p className="ms-desc">{item.description}</p>
                          )}

                          {/* Price */}
                          <div className="ms-card-footer">
                            <div className="ms-price">
                              ₹{item.price_per_person || 50}
                              <span>/person</span>
                            </div>
                          </div>
                        </div>

                        {/* Selected overlay */}
                        {isSelected && (
                          <div className="ms-selected-overlay" aria-hidden="true">✓ Added to Menu</div>
                        )}
                      </article>
                    </li>
                  );
                })}
              </ol>
            </section>

          </section>

          {/* ══════════════════════════════
              RIGHT — STICKY SUMMARY
          ══════════════════════════════ */}
          <aside className="ms-right" aria-label="Order summary">
            <div className="ms-summary">

              <div className="ms-summary-header">
                <div className="ms-summary-icon" aria-hidden="true">📋</div>
                <div>
                  <h3>Your Menu</h3>
                  <p>Review &amp; proceed to booking</p>
                </div>
              </div>

              {/* People input */}
              <div className="ms-people">
                <label htmlFor="num-people">👥 Number of Guests</label>
                <input
                  id="num-people"
                  type="number"
                  min="1"
                  placeholder="e.g. 300"
                  value={numPeople}
                  onChange={handlePeopleChange}
                  className={peopleError ? 'input-error' : ''}
                  aria-describedby={peopleError ? 'people-error' : undefined}
                />
                {peopleError && (
                  <span id="people-error" className="error-text" role="alert">⚠ {peopleError}</span>
                )}
              </div>

              <div className="ms-divider" aria-hidden="true" />

              {/* Selected items list */}
              {selectedList.length === 0 ? (
                <div className="ms-empty" role="status" aria-live="polite">
                  <div className="ms-empty-icon">🍽️</div>
                  <p>No items selected yet</p>
                  <small>Click menu cards to build your custom menu</small>
                </div>
              ) : (
                <ul className="ms-selected-list" aria-label="Selected menu items" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {selectedList.map(function(item) {
                    return (
                      <li key={item.id} className="ms-selected-item">
                        <span className={`dot ${item.is_veg ? 'veg' : 'nonveg'}`} aria-hidden="true"></span>
                        <span className="sel-name">{item.item_name}</span>
                        <span className="sel-price">₹{item.price_per_person || 50}/person</span>
                        <button
                          className="sel-remove"
                          aria-label={`Remove ${item.item_name}`}
                          onClick={function(e) { e.stopPropagation(); toggleItem(item); }}
                        >✕</button>
                      </li>
                    );
                  })}
                </ul>
              )}

              {/* Billing breakdown */}
              {selectedList.length > 0 && (
                <div className="ms-billing" aria-label="Billing summary">
                  <div className="bill-row">
                    <span>Items selected</span>
                    <strong>{selectedList.length}</strong>
                  </div>
                  <div className="bill-row">
                    <span>Cost per person</span>
                    <strong>₹{Math.round(perPersonCost).toLocaleString()}</strong>
                  </div>
                  <div className="bill-row">
                    <span>No. of guests</span>
                    <strong>{numPeople || '—'}</strong>
                  </div>
                  <div className="bill-row bill-total">
                    <span>Total Amount</span>
                    <strong>₹{totalCost.toLocaleString()}</strong>
                  </div>
                  {totalCost > 0 && (
                    <div className="bill-advance" aria-label={`Advance payment required: ₹${Math.round(totalCost * 0.3).toLocaleString()}`}>
                      <span>Advance (30%)</span>
                      <strong>₹{Math.round(totalCost * 0.3).toLocaleString()}</strong>
                    </div>
                  )}
                </div>
              )}

              {/* Proceed button */}
              <button
                className="ms-proceed-btn"
                onClick={handleProceed}
                disabled={selectedList.length === 0 || !numPeople || !!peopleError}
                aria-disabled={selectedList.length === 0 || !numPeople || !!peopleError}
              >
                Proceed to Booking →
              </button>

              {selectedList.length === 0 && (
                <p className="ms-hint">Select at least 1 item to proceed</p>
              )}

            </div>
          </aside>

        </div>
      </main>
    </>
  );
}

export default MenuSelection;
