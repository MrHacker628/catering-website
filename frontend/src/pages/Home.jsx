// import React from 'react';
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import AuthModal from '../components/AuthModal';
// import './Home.css';
// import BookingCalendar from './BookingCalendar';
// import GoogleReviews from './GoogleReviews';


// function Home({ currentUser, onLoginSuccess, showAuthModal, setShowAuthModal }) {
//   // controls if modal is visible or not
//   const [showModal, setShowModal] = useState(false);
  



//   // useNavigate lets us go to another page on button click
//   const navigate = useNavigate();

//   return (
//     <div className="home">

//       {/* ── HERO SECTION ── big banner at the top */}
//       <div className="hero">
//         <div className="hero-content">
//           <h1>Welcome to Mannat Catering 🍽️</h1>
//           <p>Premium catering services for Weddings, Birthdays,
//             Corporate Events and all special occasions</p>

//           {/* Clicking this button goes to /booking page */}
//           <button className="hero-btn" onClick={() => navigate('/booking')}>
//             Book Now
//           </button>

//           {/* temporary button to test modal */}
//           <button className="hero-btn" onClick={() => setShowAuthModal(true)}>
//             Login / Sign Up
//           </button>

//           {/* Clicking this button goes to /menu page */}
//           <button className="hero-btn outline" onClick={() => navigate('/menu')}>
//             View Menu
//           </button>
//         </div>
//       </div>


//       {/* ── SERVICES SECTION ── 3 cards showing what we offer */}
//       <div className="services">
//         <h2>Our Services</h2>

//         <div className="services-grid">

//           {/* Service Card 1 */}
//           <div className="service-card">
//             <span className="service-icon">💍</span>
//             <h3>Wedding Catering</h3>
//             <p>Make your special day unforgettable with our premium wedding menu</p>
//           </div>

//           {/* Service Card 2 */}
//           <div className="service-card">
//             <span className="service-icon">🎂</span>
//             <h3>Birthday Parties</h3>
//             <p>Celebrate birthdays with delicious food and amazing service</p>
//           </div>

//           {/* Service Card 3 */}
//           <div className="service-card">
//             <span className="service-icon">🏢</span>
//             <h3>Corporate Events</h3>
//             <p>Professional catering for corporate meetings and events</p>
//           </div>

//         </div>
//       </div>


//       {/* ── WHY CHOOSE US SECTION ── */}
//       <div className="why-us">
//         <h2>Why Choose Us?</h2>

//         <div className="why-grid">
//           <div className="why-card">✅ Fresh Ingredients Daily</div>
//           <div className="why-card">✅ 10+ Years Experience</div>
//           <div className="why-card">✅ 500+ Events Catered</div>
//           <div className="why-card">✅ Customized Menus</div>
//           <div className="why-card">✅ On Time Delivery</div>
//           <div className="why-card">✅ Affordable Prices</div>
//         </div>
//       </div>


//       {/* ── CALL TO ACTION ── bottom banner */}
//       <div className="cta">
//         <h2>Ready to plan your event?</h2>
//         <p>Contact us today and get a free quote!</p>
//         <button className="hero-btn" onClick={() => navigate('/booking')}>
//           Book Now 🎉
//         </button>
//       </div>

//       {/* only show modal if showModal is true */}
//       {showAuthModal && (
//         <AuthModal
//           onClose={() => setShowAuthModal(false)}
//           onLoginSuccess={(user) => { 
//             onLoginSuccess(user); // update App.js state
//             setShowAuthModal(false); // close modal
//           }}
//         />
//       )}
//          <GoogleReviews />
//       <BookingCalendar />
   
//     </div>
//   );
// }
// export default Home;



// Home.jsx — Mannat Caterers — Premium Redesign
// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import AuthModal from '../components/AuthModal';
// import './Home.css';
// import BookingCalendar from './BookingCalendar';
// import GoogleReviews from './GoogleReviews';

// function Home({ currentUser, onLoginSuccess, showAuthModal, setShowAuthModal }) {
//   const [showModal, setShowModal] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [counters, setCounters] = useState({ events: 0, years: 0, guests: 0, rating: 0 });
//   const statsRef = useRef(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 50);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Animate counters when stats section comes into view
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           animateCounters();
//           observer.disconnect();
//         }
//       },
//       { threshold: 0.3 }
//     );
//     if (statsRef.current) observer.observe(statsRef.current);
//     return () => observer.disconnect();
//   }, []);

//   function animateCounters() {
//     const targets = { events: 500, years: 10, guests: 50000, rating: 48 };
//     const duration = 2000;
//     const steps = 60;
//     let step = 0;
//     const interval = setInterval(() => {
//       step++;
//       const progress = step / steps;
//       const ease = 1 - Math.pow(1 - progress, 3);
//       setCounters({
//         events: Math.round(targets.events * ease),
//         years: Math.round(targets.years * ease),
//         guests: Math.round(targets.guests * ease),
//         rating: Math.round(targets.rating * ease),
//       });
//       if (step >= steps) clearInterval(interval);
//     }, duration / steps);
//   }

//   const services = [
//     {
//       icon: '💍',
//       title: 'Wedding Catering',
//       desc: 'Make your forever moment unforgettable. Curated menus crafted for your perfect day.',
//       tag: 'Most Popular'
//     },
//     {
//       icon: '🎂',
//       title: 'Birthday Celebrations',
//       desc: 'Every age deserves a feast. Let us create edible memories for your milestone.',
//       tag: null
//     },
//     {
//       icon: '🏢',
//       title: 'Corporate Events',
//       desc: 'Professional service that impresses clients and energizes your team.',
//       tag: null
//     },
//     {
//       icon: '🎊',
//       title: 'Social Gatherings',
//       desc: 'From intimate dinners to grand receptions — we bring flavor to every occasion.',
//       tag: null
//     },
//     {
//       icon: '🪔',
//       title: 'Festival Catering',
//       desc: 'Celebrate traditions with authentic recipes passed down through generations.',
//       tag: null
//     },
//     {
//       icon: '🍽️',
//       title: 'Custom Menus',
//       desc: 'Choose every dish. Build your dream menu from our 174+ curated items.',
//       tag: 'New'
//     },
//   ];

//   const whyUs = [
//     { icon: '🌿', title: 'Farm Fresh', desc: 'Ingredients sourced fresh daily from trusted local farms' },
//     { icon: '👨‍🍳', title: 'Expert Chefs', desc: 'Award-winning culinary team with 10+ years of expertise' },
//     { icon: '⏱️', title: 'Always On Time', desc: 'Punctual setup and service — every single event' },
//     { icon: '💎', title: 'Premium Quality', desc: 'Restaurant-grade presentation at every occasion' },
//     { icon: '📋', title: 'Custom Menus', desc: 'Fully tailored to your taste, culture, and budget' },
//     { icon: '🤝', title: 'Dedicated Support', desc: 'Personal event coordinator assigned to you' },
//   ];

//   const testimonials = [
//     {
//       name: 'Priya Sharma',
//       event: 'Wedding Reception',
//       text: 'Mannat Catering made our wedding day absolutely magical. The food was exceptional and the service was flawless.',
//       rating: 5,
//       avatar: 'PS'
//     },
//     {
//       name: 'Rahul Mehta',
//       event: 'Corporate Dinner',
//       text: 'Impressed our 200 guests completely. Professional, punctual, and the presentation was world-class.',
//       rating: 5,
//       avatar: 'RM'
//     },
//     {
//       name: 'Sunita Patel',
//       event: 'Birthday Party',
//       text: 'The custom menu feature is incredible! Every dish was exactly as we wanted. Will book again!',
//       rating: 5,
//       avatar: 'SP'
//     },
//   ];

//   return (
//     <div className="home-v2">

//       {/* ── FLOATING NAV ── */}
      
//       {/* ── HERO ── */}
//       <header className="mn-hero">
//         <div className="mn-hero__bg">
//           <div className="mn-hero__orb mn-hero__orb--1"></div>
//           <div className="mn-hero__orb mn-hero__orb--2"></div>
//           <div className="mn-hero__orb mn-hero__orb--3"></div>
//           <div className="mn-hero__grid"></div>
//         </div>

//         <div className="mn-hero__content">
//           <div className="mn-hero__badge">
//             <span className="mn-badge__dot"></span>
//             Premium Catering Services · Goa
//           </div>

//           <h1 className="mn-hero__title">
//             Every Occasion
//             <span className="mn-hero__title-accent"> Deserves</span>
//             <br />
//             <span className="mn-hero__title-sub">Extraordinary Food</span>
//           </h1>

//           <p className="mn-hero__desc">
//             Mannat Caterers brings culinary excellence to weddings, celebrations,
//             and corporate events. 500+ events. 50,000+ guests served.
//           </p>

//           <div className="mn-hero__actions">
//             <button className="mn-btn mn-btn--primary" onClick={() => navigate('/booking')}>
//               <span>Book Your Event</span>
//               <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
//             </button>
//             <button className="mn-btn mn-btn--ghost" onClick={() => navigate('/menu')}>
//               Explore Menu
//             </button>
//           </div>

//           <div className="mn-hero__trust">
//             <div className="mn-trust__avatars">
//               {['A','B','C','D'].map((l,i) => (
//                 <div key={i} className="mn-trust__avatar" style={{'--i': i}}>{l}</div>
//               ))}
//             </div>
//             <div className="mn-trust__text">
//               <div className="mn-trust__stars">{'★'.repeat(5)}</div>
//               <span>Trusted by 500+ families</span>
//             </div>
//           </div>
//         </div>

//         <div className="mn-hero__visual">
//           <div className="mn-hero__card mn-hero__card--main">
//             <div className="mn-card__header">
//               <span className="mn-card__dot mn-card__dot--green"></span>
//               <span className="mn-card__dot mn-card__dot--yellow"></span>
//               <span className="mn-card__dot mn-card__dot--red"></span>
//             </div>
//             <div className="mn-card__menu">
//               <div className="mn-card__title">Today's Special Menu</div>
//               {['🥗 Garden Fresh Salads', '🍲 Authentic Dal Makhani', '🍛 Biryani Station', '🍮 Live Dessert Counter', '🥤 Welcome Drinks'].map((item, i) => (
//                 <div key={i} className="mn-card__item" style={{'--delay': `${i * 0.1}s`}}>
//                   <span>{item}</span>
//                   <span className="mn-card__check">✓</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="mn-hero__card mn-hero__card--badge mn-hero__card--badge-1">
//             <div className="mn-badge-card__icon">🎉</div>
//             <div>
//               <div className="mn-badge-card__num">500+</div>
//               <div className="mn-badge-card__label">Events Done</div>
//             </div>
//           </div>

//           <div className="mn-hero__card mn-hero__card--badge mn-hero__card--badge-2">
//             <div className="mn-badge-card__icon">⭐</div>
//             <div>
//               <div className="mn-badge-card__num">4.9/5</div>
//               <div className="mn-badge-card__label">Rating</div>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* ── STATS STRIP ── */}
//       <section className="mn-stats" ref={statsRef}>
//         <div className="mn-stats__inner">
//           {[
//             { num: counters.events, suffix: '+', label: 'Events Catered' },
//             { num: counters.years, suffix: '+', label: 'Years Experience' },
//             { num: counters.guests, suffix: '+', label: 'Guests Served', format: true },
//             { num: (counters.rating / 10).toFixed(1), suffix: '/5', label: 'Average Rating' },
//           ].map((s, i) => (
//             <div key={i} className="mn-stats__item">
//               <div className="mn-stats__num">
//                 {s.format ? (s.num >= 1000 ? Math.floor(s.num/1000) + 'K' : s.num) : s.num}
//                 <span>{s.suffix}</span>
//               </div>
//               <div className="mn-stats__label">{s.label}</div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ── SERVICES ── */}
//       <main>
//         <section className="mn-services">
//           <div className="mn-section__header">
//             <div className="mn-section__tag">What We Offer</div>
//             <h2 className="mn-section__title">Catering for Every Occasion</h2>
//             <p className="mn-section__desc">From intimate gatherings to grand celebrations, we bring culinary excellence to every table.</p>
//           </div>

//           <div className="mn-services__grid">
//             {services.map((s, i) => (
//               <div key={i} className="mn-service-card" style={{'--i': i}}>
//                 {s.tag && <div className={`mn-service-card__tag ${s.tag === 'New' ? 'mn-service-card__tag--new' : ''}`}>{s.tag}</div>}
//                 <div className="mn-service-card__icon">{s.icon}</div>
//                 <h3 className="mn-service-card__title">{s.title}</h3>
//                 <p className="mn-service-card__desc">{s.desc}</p>
//                 <div className="mn-service-card__arrow">→</div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* ── WHY US ── */}
//         <section className="mn-why">
//           <div className="mn-why__inner">
//             <div className="mn-why__left">
//               <div className="mn-section__tag">Why Mannat</div>
//               <h2 className="mn-why__title">The Standard <br /><span>Others Aspire To</span></h2>
//               <p className="mn-why__desc">
//                 We don't just serve food — we craft experiences. Every detail, from the first consultation to the last bite, is handled with care.
//               </p>
//               <button className="mn-btn mn-btn--primary" onClick={() => navigate('/booking')}>
//                 Start Planning
//                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
//               </button>
//             </div>

//             <div className="mn-why__right">
//               {whyUs.map((w, i) => (
//                 <div key={i} className="mn-why-card" style={{'--i': i}}>
//                   <div className="mn-why-card__icon">{w.icon}</div>
//                   <div>
//                     <div className="mn-why-card__title">{w.title}</div>
//                     <div className="mn-why-card__desc">{w.desc}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* ── TESTIMONIALS ── */}
//         <section className="mn-testimonials">
//           <div className="mn-section__header">
//             <div className="mn-section__tag">Testimonials</div>
//             <h2 className="mn-section__title">What Our Clients Say</h2>
//           </div>

//           <div className="mn-testimonials__grid">
//             {testimonials.map((t, i) => (
//               <div key={i} className="mn-testi-card" style={{'--i': i}}>
//                 <div className="mn-testi-card__stars">{'★'.repeat(t.rating)}</div>
//                 <p className="mn-testi-card__text">"{t.text}"</p>
//                 <div className="mn-testi-card__author">
//                   <div className="mn-testi-card__avatar">{t.avatar}</div>
//                   <div>
//                     <div className="mn-testi-card__name">{t.name}</div>
//                     <div className="mn-testi-card__event">{t.event}</div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* ── GOOGLE REVIEWS ── */}
//         <section className="mn-google-reviews">
//           <div className="mn-section__header">
//             <div className="mn-section__tag">Google Reviews</div>
//             <h2 className="mn-section__title">Verified by Our Guests</h2>
//           </div>
//           <GoogleReviews />
//         </section>

//         {/* ── BOOKING CALENDAR ── */}
//         <section className="mn-calendar-section">
//           <div className="mn-section__header">
//             <div className="mn-section__tag">Availability</div>
//             <h2 className="mn-section__title">Check Your Date</h2>
//             <p className="mn-section__desc">See which dates are available and plan your event ahead of time.</p>
//           </div>
//           <BookingCalendar />
//         </section>

//         {/* ── CTA BANNER ── */}
//         <section className="mn-cta">
//           <div className="mn-cta__bg">
//             <div className="mn-cta__orb mn-cta__orb--1"></div>
//             <div className="mn-cta__orb mn-cta__orb--2"></div>
//           </div>
//           <div className="mn-cta__content">
//             <div className="mn-section__tag mn-section__tag--light">Limited Slots Available</div>
//             <h2 className="mn-cta__title">Ready to Create <br />Something Extraordinary?</h2>
//             <p className="mn-cta__desc">Join hundreds of families who trusted Mannat Caterers for their most special moments.</p>
//             <div className="mn-cta__actions">
//               <button className="mn-btn mn-btn--white" onClick={() => navigate('/booking')}>
//                 Book Your Event 🎉
//               </button>
//               <button className="mn-btn mn-btn--ghost-white" onClick={() => navigate('/menu')}>
//                 View Full Menu
//               </button>
//             </div>
//           </div>
//         </section>
//       </main>

//       {/* ── FOOTER ── */}
//       <footer className="mn-footer">
//         <div className="mn-footer__inner">
//           <div className="mn-footer__brand">
//             <span className="mn-nav__logo-icon"><img src="C:\Users\DEXsh\Desktop\DBMS\catering-website2\frontend\src\components\mannatcatererslogo.png" alt="" /></span>
//             <span className="mn-nav__brand-name">Mannat <span>Caterers</span></span>
//             <p>Premium catering for life's most precious moments.</p>
//           </div>
//           <div className="mn-footer__links">
//             <button onClick={() => navigate('/menu')}>Menu</button>
//             <button onClick={() => navigate('/booking')}>Book Now</button>
//             <button onClick={() => setShowAuthModal(true)}>Login</button>
//           </div>
//           <div className="mn-footer__copy">© 2026 Mannat Caterers. All rights reserved.</div>
//         </div>
//       </footer>

//       {showAuthModal && (
//         <AuthModal
//           onClose={() => setShowAuthModal(false)}
//           onLoginSuccess={(user) => {
//             onLoginSuccess(user);
//             setShowAuthModal(false);
//           }}
//         />
//       )}
//     </div>
//   );
// }

// export default Home;


// Home.jsx — Mannat Caterers — Premium Redesign v2 (SEO + UI Overhaul)
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthModal from '../components/AuthModal';
import './Home.css';
import BookingCalendar from './BookingCalendar';
import GoogleReviews from './GoogleReviews';

// ── JSON-LD LocalBusiness / FoodEstablishment Schema ─────────────────────────
function HomeSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': ['FoodEstablishment', 'LocalBusiness'],
    name: 'Mannat Caterers',
    description:
      'Mannat Caterers is the top-rated premium catering service in Goa, specializing in weddings, corporate events, birthday parties, and social gatherings. Serving Goa for 10+ years.',
    url: 'https://www.mannatcaterers.com',
    telephone: '+91-XXXXXXXXXX',
    priceRange: '₹₹–₹₹₹',
    image: 'https://www.mannatcaterers.com/og-image.jpg',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Goa',
      addressLocality: 'Panaji',
      addressRegion: 'Goa',
      postalCode: '403001',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '15.4909',
      longitude: '73.8278',
    },
    areaServed: {
      '@type': 'State',
      name: 'Goa',
    },
    servesCuisine: ['Indian', 'Continental', 'Goan'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Catering Services in Goa',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Wedding Catering in Goa' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Corporate Event Catering in Goa' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Birthday Party Catering in Goa' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Festival Catering in Goa' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom Menu Catering in Goa' } },
      ],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '500',
      bestRating: '5',
      worstRating: '1',
    },
    sameAs: [
      'https://www.google.com/maps/place/Mannat+Caterers',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
function Home({ currentUser, onLoginSuccess, showAuthModal, setShowAuthModal }) {
  const [showModal, setShowModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [counters, setCounters] = useState({ events: 0, years: 0, guests: 0, rating: 0 });
  const statsRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate counters when stats section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  function animateCounters() {
    const targets = { events: 500, years: 10, guests: 50000, rating: 48 };
    const duration = 2000;
    const steps = 60;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      const progress = step / steps;
      const ease = 1 - Math.pow(1 - progress, 3);
      setCounters({
        events: Math.round(targets.events * ease),
        years: Math.round(targets.years * ease),
        guests: Math.round(targets.guests * ease),
        rating: Math.round(targets.rating * ease),
      });
      if (step >= steps) clearInterval(interval);
    }, duration / steps);
  }

  const services = [
    {
      icon: '💍',
      title: 'Wedding Catering',
      desc: 'Make your forever moment unforgettable. Curated menus crafted for your perfect day.',
      tag: 'Most Popular'
    },
    {
      icon: '🎂',
      title: 'Birthday Celebrations',
      desc: 'Every age deserves a feast. Let us create edible memories for your milestone.',
      tag: null
    },
    {
      icon: '🏢',
      title: 'Corporate Events',
      desc: 'Professional service that impresses clients and energizes your team.',
      tag: null
    },
    {
      icon: '🎊',
      title: 'Social Gatherings',
      desc: 'From intimate dinners to grand receptions — we bring flavor to every occasion.',
      tag: null
    },
    {
      icon: '🪔',
      title: 'Festival Catering',
      desc: 'Celebrate traditions with authentic recipes passed down through generations.',
      tag: null
    },
    {
      icon: '🍽️',
      title: 'Custom Menus',
      desc: 'Choose every dish. Build your dream menu from our 174+ curated items.',
      tag: 'New'
    },
  ];

  const whyUs = [
    { icon: '🌿', title: 'Farm Fresh', desc: 'Ingredients sourced fresh daily from trusted local farms' },
    { icon: '👨‍🍳', title: 'Expert Chefs', desc: 'Award-winning culinary team with 10+ years of expertise' },
    { icon: '⏱️', title: 'Always On Time', desc: 'Punctual setup and service — every single event' },
    { icon: '💎', title: 'Premium Quality', desc: 'Restaurant-grade presentation at every occasion' },
    { icon: '📋', title: 'Custom Menus', desc: 'Fully tailored to your taste, culture, and budget' },
    { icon: '🤝', title: 'Dedicated Support', desc: 'Personal event coordinator assigned to you' },
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      event: 'Wedding Reception',
      text: 'Mannat Catering made our wedding day absolutely magical. The food was exceptional and the service was flawless.',
      rating: 5,
      avatar: 'PS'
    },
    {
      name: 'Rahul Mehta',
      event: 'Corporate Dinner',
      text: 'Impressed our 200 guests completely. Professional, punctual, and the presentation was world-class.',
      rating: 5,
      avatar: 'RM'
    },
    {
      name: 'Sunita Patel',
      event: 'Birthday Party',
      text: 'The custom menu feature is incredible! Every dish was exactly as we wanted. Will book again!',
      rating: 5,
      avatar: 'SP'
    },
  ];

  return (
    <>
      {/* ── JSON-LD Schema ── injected in <head> equivalent */}
      <HomeSchema />

      <div className="home-v2">

        {/* ── FLOATING NAV ── */}
        {/* <nav className={`mn-nav${scrolled ? ' mn-nav--scrolled' : ''}`} aria-label="Main navigation">
          <div className="mn-nav__inner">
            <div className="mn-nav__brand">
              <span className="mn-nav__logo-icon" aria-hidden="true">🍽️</span>
              <span className="mn-nav__brand-name">Mannat <span>Caterers</span></span>
            </div>
            <div className="mn-nav__links">
              <button onClick={() => navigate('/menu')} aria-label="View our catering menu">Menu</button>
              <button onClick={() => navigate('/booking')} aria-label="Book a catering event">Booking</button>
              {currentUser ? (
                <span className="mn-nav__user">Hi, {currentUser.name?.split(' ')[0]} 👋</span>
              ) : (
                <button className="mn-nav__cta" onClick={() => setShowAuthModal(true)} aria-label="Login or sign up">
                  Login / Sign Up
                </button>
              )}
            </div>
          </div>
        </nav> */}

        {/* ── HERO ── */}
        <header className="mn-hero" role="banner">
          <div className="mn-hero__bg" aria-hidden="true">
            <div className="mn-hero__orb mn-hero__orb--1"></div>
            <div className="mn-hero__orb mn-hero__orb--2"></div>
            <div className="mn-hero__orb mn-hero__orb--3"></div>
            <div className="mn-hero__grid"></div>
          </div>

          <div className="mn-hero__content">
            <div className="mn-hero__badge" aria-label="Service location">
              <span className="mn-badge__dot" aria-hidden="true"></span>
              Premium Catering Services · Goa
            </div>

            {/* SEO-optimised H1 — keyword-rich, naturally phrased */}
            <h1 className="mn-hero__title">
              Mannat Caterers —
              <span className="mn-hero__title-accent"> Top Rated</span>
              <br />
              <span className="mn-hero__title-sub">Caterers in Goa</span>
            </h1>

            <p className="mn-hero__desc">
              Goa's most trusted catering service for weddings, corporate events &amp; celebrations.
              500+ events. 50,000+ guests. Unforgettable every time.
            </p>

            <div className="mn-hero__actions">
              {/* Primary CTA — Gold */}
              <button className="mn-btn mn-btn--gold" onClick={() => navigate('/booking')} aria-label="Book your catering event in Goa">
                <span>Book Your Event</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
              <button className="mn-btn mn-btn--ghost" onClick={() => navigate('/menu')} aria-label="Explore our catering menu">
                Explore Menu
              </button>
            </div>

            <div className="mn-hero__trust" aria-label="Social proof — trusted by 500+ families">
              <div className="mn-trust__avatars" aria-hidden="true">
                {['A','B','C','D'].map((l,i) => (
                  <div key={i} className="mn-trust__avatar" style={{'--i': i}}>{l}</div>
                ))}
              </div>
              <div className="mn-trust__text">
                <div className="mn-trust__stars" aria-label="5 star rating" role="img">{'★'.repeat(5)}</div>
                <span>Trusted by 500+ families across Goa</span>
              </div>
            </div>
          </div>

          <div className="mn-hero__visual" aria-hidden="true">
            <div className="mn-hero__card mn-hero__card--main">
              <div className="mn-card__header">
                <span className="mn-card__dot mn-card__dot--green"></span>
                <span className="mn-card__dot mn-card__dot--yellow"></span>
                <span className="mn-card__dot mn-card__dot--red"></span>
              </div>
              <div className="mn-card__menu">
                <div className="mn-card__title">Today's Special Menu</div>
                {['🥗 Garden Fresh Salads', '🍲 Authentic Dal Makhani', '🍛 Biryani Station', '🍮 Live Dessert Counter', '🥤 Welcome Drinks'].map((item, i) => (
                  <div key={i} className="mn-card__item" style={{'--delay': `${i * 0.1}s`}}>
                    <span>{item}</span>
                    <span className="mn-card__check">✓</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mn-hero__card mn-hero__card--badge mn-hero__card--badge-1">
              <div className="mn-badge-card__icon">🎉</div>
              <div>
                <div className="mn-badge-card__num">500+</div>
                <div className="mn-badge-card__label">Events Done</div>
              </div>
            </div>

            <div className="mn-hero__card mn-hero__card--badge mn-hero__card--badge-2">
              <div className="mn-badge-card__icon">⭐</div>
              <div>
                <div className="mn-badge-card__num">4.9/5</div>
                <div className="mn-badge-card__label">Rating</div>
              </div>
            </div>
          </div>
        </header>

        {/* ── STATS STRIP ── */}
        <section className="mn-stats" ref={statsRef} aria-label="Mannat Caterers achievements">
          <div className="mn-stats__inner">
            {[
              { num: counters.events, suffix: '+', label: 'Events Catered' },
              { num: counters.years, suffix: '+', label: 'Years Experience' },
              { num: counters.guests, suffix: '+', label: 'Guests Served', format: true },
              { num: (counters.rating / 10).toFixed(1), suffix: '/5', label: 'Average Rating' },
            ].map((s, i) => (
              <div key={i} className="mn-stats__item">
                <div className="mn-stats__num">
                  {s.format ? (s.num >= 1000 ? Math.floor(s.num/1000) + 'K' : s.num) : s.num}
                  <span>{s.suffix}</span>
                </div>
                <div className="mn-stats__label">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        <main>
          {/* ── SERVICES ── */}
          <section className="mn-services" aria-labelledby="services-heading">
            <div className="mn-section__header">
              <div className="mn-section__tag">What We Offer</div>
              <h2 id="services-heading" className="mn-section__title">
                Premium Catering Services in Goa
              </h2>
              <p className="mn-section__desc">
                From intimate gatherings to grand celebrations, Mannat Caterers brings culinary excellence to every table in Goa.
              </p>
            </div>

            <div className="mn-services__grid">
              {services.map((s, i) => (
                <article key={i} className="mn-service-card" style={{'--i': i}} aria-label={`${s.title} — catering service in Goa`}>
                  {s.tag && <div className={`mn-service-card__tag ${s.tag === 'New' ? 'mn-service-card__tag--new' : ''}`}>{s.tag}</div>}
                  <div className="mn-service-card__icon" aria-hidden="true">{s.icon}</div>
                  <h3 className="mn-service-card__title">{s.title}</h3>
                  <p className="mn-service-card__desc">{s.desc}</p>
                  <div className="mn-service-card__arrow" aria-hidden="true">→</div>
                </article>
              ))}
            </div>
          </section>

          {/* ── WHY US ── */}
          <section className="mn-why" aria-labelledby="why-heading">
            <div className="mn-why__inner">
              <div className="mn-why__left">
                <div className="mn-section__tag">Why Mannat</div>
                <h2 id="why-heading" className="mn-why__title">
                  The Standard <br /><span>Others Aspire To</span>
                </h2>
                <p className="mn-why__desc">
                  We don't just serve food — we craft experiences. Every detail, from the first consultation to the last bite, is handled with care.
                  That's why we're ranked among the <strong>top 10 caterers in Goa</strong>.
                </p>
                <button className="mn-btn mn-btn--gold" onClick={() => navigate('/booking')} aria-label="Start planning your catered event in Goa">
                  Start Planning
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </div>

              <div className="mn-why__right">
                {whyUs.map((w, i) => (
                  <article key={i} className="mn-why-card" style={{'--i': i}}>
                    <div className="mn-why-card__icon" aria-hidden="true">{w.icon}</div>
                    <div>
                      <div className="mn-why-card__title">{w.title}</div>
                      <div className="mn-why-card__desc">{w.desc}</div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* ── TESTIMONIALS ── */}
          <section className="mn-testimonials" aria-labelledby="testi-heading">
            <div className="mn-section__header">
              <div className="mn-section__tag">Testimonials</div>
              <h2 id="testi-heading" className="mn-section__title">
                What Our Clients Say
              </h2>
            </div>

            <div className="mn-testimonials__grid">
              {testimonials.map((t, i) => (
                <article key={i} className="mn-testi-card" style={{'--i': i}}>
                  <div className="mn-testi-card__stars" aria-label={`${t.rating} out of 5 stars`} role="img">{'★'.repeat(t.rating)}</div>
                  <blockquote className="mn-testi-card__text">"{t.text}"</blockquote>
                  <footer className="mn-testi-card__author">
                    <div className="mn-testi-card__avatar" aria-hidden="true">{t.avatar}</div>
                    <div>
                      <div className="mn-testi-card__name">{t.name}</div>
                      <div className="mn-testi-card__event">{t.event}</div>
                    </div>
                  </footer>
                </article>
              ))}
            </div>
          </section>

          {/* ── GOOGLE REVIEWS ── */}
          <section className="mn-google-reviews" aria-labelledby="gr-heading">
            <div className="mn-section__header">
              <div className="mn-section__tag">Google Reviews</div>
              <h2 id="gr-heading" className="mn-section__title">Verified by Our Guests</h2>
            </div>
            <GoogleReviews />
          </section>

          {/* ── BOOKING CALENDAR ── */}
          <section className="mn-calendar-section" aria-labelledby="cal-heading">
            <div className="mn-section__header">
              <div className="mn-section__tag">Availability</div>
              <h2 id="cal-heading" className="mn-section__title">Check Your Date</h2>
              <p className="mn-section__desc">See which dates are available and plan your event ahead of time.</p>
            </div>
            <BookingCalendar />
          </section>

          {/* ── CTA BANNER ── */}
          <section className="mn-cta" aria-labelledby="cta-heading">
            <div className="mn-cta__bg" aria-hidden="true">
              <div className="mn-cta__orb mn-cta__orb--1"></div>
              <div className="mn-cta__orb mn-cta__orb--2"></div>
            </div>
            <div className="mn-cta__content">
              <div className="mn-section__tag mn-section__tag--light">Limited Slots Available</div>
              <h2 id="cta-heading" className="mn-cta__title">
                Ready to Create <br />Something Extraordinary?
              </h2>
              <p className="mn-cta__desc">
                Join hundreds of families who trusted Mannat Caterers — the best caterers in Goa — for their most special moments.
              </p>
              <div className="mn-cta__actions">
                <button className="mn-btn mn-btn--gold" onClick={() => navigate('/booking')} aria-label="Book your catering event">
                  Book Your Event 🎉
                </button>
                <button className="mn-btn mn-btn--ghost-white" onClick={() => navigate('/menu')} aria-label="View full catering menu">
                  View Full Menu
                </button>
              </div>
            </div>
          </section>
        </main>

        {/* ── FOOTER ── */}
        <footer className="mn-footer" role="contentinfo">
          <div className="mn-footer__inner">
            <div className="mn-footer__brand">
              <span className="mn-nav__logo-icon" aria-hidden="true">🍽️</span>
              <span className="mn-nav__brand-name">Mannat <span>Caterers</span></span>
              <p>Premium catering for life's most precious moments in Goa.</p>
            </div>
            <nav className="mn-footer__links" aria-label="Footer navigation">
              <button onClick={() => navigate('/menu')} aria-label="View menu">Menu</button>
              <button onClick={() => navigate('/booking')} aria-label="Book now">Book Now</button>
              <button onClick={() => setShowAuthModal(true)} aria-label="Login to your account">Login</button>
            </nav>
            <div className="mn-footer__copy">© 2026 Mannat Caterers, Goa. All rights reserved.</div>
          </div>
        </footer>

        {showAuthModal && (
          <AuthModal
            onClose={() => setShowAuthModal(false)}
            onLoginSuccess={(user) => {
              onLoginSuccess(user);
              setShowAuthModal(false);
            }}
          />
        )}
      </div>
    </>
  );
}

export default Home;
