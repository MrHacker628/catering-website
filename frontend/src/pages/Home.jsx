import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Heart, Building2, Gift, GlassWater,
  ShieldCheck, UtensilsCrossed, CalendarCheck,
  CreditCard, Package, LayoutDashboard, BarChart3,
} from 'lucide-react';
import './Home.css';

/* ── Static Data ── */
const services = [
  {
    id: 1, icon: <Heart size={28} />, name: 'Wedding Catering',
    desc: 'Curate a bespoke culinary journey for your most cherished day, from intimate ceremonies to grand receptions.',
    price: 'From ₹50,000'
  },
  {
    id: 2, icon: <Building2 size={28} />, name: 'Corporate Events',
    desc: 'Professional catering solutions for conferences, seminars, and team celebrations that leave a lasting impression.',
    price: 'From ₹25,000'
  },
  {
    id: 3, icon: <Gift size={28} />, name: 'Birthday Celebrations',
    desc: 'From milestone birthdays to surprise parties — we craft menus that make every age feel celebrated.',
    price: 'From ₹12,000'
  },
  {
    id: 4, icon: <GlassWater size={28} />, name: 'Private Dining',
    desc: 'Intimate gatherings deserve exceptional flavors. Custom menus for anniversaries, reunions, and special occasions.',
    price: 'From ₹18,000'
  },
];

const portfolio = [
  { id: 1, title: 'Sunset Beach Wedding', category: 'Wedding', img: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop', alt: 'Elegant sunset beach wedding ceremony with white floral arrangements in Goa' },
  { id: 2, title: 'Corporate Gala Dinner', category: 'Corporate', img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=600&fit=crop', alt: 'Professional corporate gala dinner event with round tables and ambient lighting' },
  { id: 3, title: 'Grand Birthday Feast', category: 'Birthday', img: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=600&fit=crop', alt: 'Colorful birthday celebration with balloons and decorated dessert table' },
  { id: 4, title: 'Garden Reception', category: 'Wedding', img: 'https://images.unsplash.com/photo-1546032996-6dfacbacbf3f?w=800&h=600&fit=crop', alt: 'Beautiful garden wedding reception with fairy lights and floral centerpieces' },
  { id: 5, title: 'Executive Summit', category: 'Corporate', img: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=600&fit=crop', alt: 'Modern corporate summit event with stage presentation and audience seating' },
  { id: 6, title: 'Rustic Anniversary', category: 'Private', img: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop', alt: 'Rustic anniversary dinner setup with candles and elegant table decorations' },
];

const categories = ['All', 'Wedding', 'Corporate', 'Birthday', 'Private'];

const features = [
  {
    id: 1,
    icon: <ShieldCheck size={30} />,
    title: 'Secure Authentication',
    desc: 'Sign up or log in with JWT-protected sessions. Your profile auto-fills booking forms so you never repeat yourself.',
    color: '#16a34a',
  },
  {
    id: 2,
    icon: <UtensilsCrossed size={30} />,
    title: 'Interactive Menu',
    desc: 'Browse our full menu by category — Thalis, Biryani, Starters, Desserts & more — with live pricing and availability.',
    color: '#0ea5e9',
  },
  {
    id: 3,
    icon: <CalendarCheck size={30} />,
    title: 'Smart Booking Wizard',
    desc: 'A guided 4-step booking flow: personal details → event info → menu selection → review. Live billing updates as you pick items.',
    color: '#8b5cf6',
  },
  {
    id: 4,
    icon: <CreditCard size={30} />,
    title: 'Razorpay Payments',
    desc: 'Pay a 30% advance securely via Razorpay. Order status updates instantly on payment success — no manual follow-up needed.',
    color: '#f59e0b',
  },
  {
    id: 5,
    icon: <Package size={30} />,
    title: 'Catering Packages',
    desc: 'Choose from Standard, Premium, or Mannat Special packages — pre-built for 500–600 guests with complete inclusions.',
    color: '#ef4444',
  },
  {
    id: 6,
    icon: <LayoutDashboard size={30} />,
    title: 'Admin Dashboard',
    desc: 'Password-protected panel to manage bookings, update order statuses, track inventory with low-stock alerts, and view all payments.',
    color: '#06b6d4',
  },
  {
    id: 7,
    icon: <BarChart3 size={30} />,
    title: 'Live Analytics',
    desc: 'Real-time revenue charts, total bookings, average order value, and a live activity feed — all in one clean dashboard.',
    color: '#10b981',
  },
];

/* ── Trustindex Review Widget Component ── */
function TrustindexWidget() {
  const containerRef = useRef(null);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    // Check if script is already injected
    const existingScript = node.querySelector('script[src*="trustindex.io"]');
    if (existingScript) return;

    const script = document.createElement('script');
    script.src = 'https://cdn.trustindex.io/loader.js?090fbdd69ee47322f99693a00d1';
    script.async = true;
    script.defer = true;
    node.appendChild(script);

    return () => {
      // Cleanup on unmount
      const s = node.querySelector('script[src*="trustindex.io"]');
      if (s) node.removeChild(s);
    };
  }, []);

  return <div ref={containerRef} className="trustindex-container"></div>;
}

/* ── Features Slider Component ── */
function FeaturesSlider() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);
  const total = features.length;

  const next = useCallback(() => setCurrent(c => (c + 1) % total), [total]);
  const prev = () => setCurrent(c => (c - 1 + total) % total);

  // Auto-advance every 3.5 s; reset timer on manual nav
  useEffect(() => {
    timerRef.current = setInterval(next, 3500);
    return () => clearInterval(timerRef.current);
  }, [next]);

  const resetTimer = (fn) => {
    clearInterval(timerRef.current);
    fn();
    timerRef.current = setInterval(next, 3500);
  };

  return (
    <div className="fslider">
      <div className="fslider__track-wrap">
        <div
          className="fslider__track"
          style={{ transform: `translateX(calc(-${current} * (var(--fslider-card-w) + var(--fslider-gap))))` }}
        >
          {features.map((f, i) => (
            <div
              key={f.id}
              className={`fslider__card ${i === current ? 'fslider__card--active' : ''}`}
            >
              <span className="fslider__icon" style={{ background: `${f.color}18`, color: f.color }}>
                {f.icon}
              </span>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Prev / Next */}
      <button className="fslider__arrow fslider__arrow--prev" onClick={() => resetTimer(prev)} aria-label="Previous feature">
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
      </button>
      <button className="fslider__arrow fslider__arrow--next" onClick={() => resetTimer(next)} aria-label="Next feature">
        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
      </button>

      {/* Dots */}
      <div className="fslider__dots">
        {features.map((_, i) => (
          <button
            key={i}
            className={`fslider__dot ${i === current ? 'fslider__dot--active' : ''}`}
            onClick={() => resetTimer(() => setCurrent(i))}
            aria-label={`Go to feature ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function Home() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? portfolio
    : portfolio.filter(p => p.category === activeFilter);

  return (
    <>
      <Helmet>
        <title>Mannat Caterers — Premium Event Catering in Goa</title>
        <meta name="description" content="Mannat Caterers delivers exquisite culinary experiences for weddings, corporate events, and celebrations across Goa. Book your dream event today." />
        <meta property="og:title" content="Mannat Caterers — Premium Event Catering in Goa" />
        <meta property="og:description" content="Creating unforgettable culinary experiences for life's most memorable moments." />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Caterer",
            "name": "Mannat Caterers",
            "description": "Premium event catering services in Goa",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Cuncolim",
              "addressLocality": "South Goa",
              "addressRegion": "Goa",
              "postalCode": "403703",
              "addressCountry": "IN"
            },
            "telephone": "+919699791068",
            "priceRange": "₹₹₹",
            "servesCuisine": ["Indian", "Multi-Cuisine"],
            "areaServed": "Goa"
          }
        `}</script>
      </Helmet>

      <div className="home page-enter">

        {/* ══════════ HERO ══════════ */}
        <section className="hero" aria-label="Welcome banner">
          <div className="hero__overlay"></div>
          <div className="hero__content container">
            <span className="hero__badge">Premium Catering in Goa</span>
            <h1>Exquisite Flavors for<br /><em>Unforgettable</em> Moments</h1>
            <p>From intimate gatherings to grand celebrations — we create culinary experiences that your guests will cherish forever.</p>
            <div className="hero__actions">
              <button className="btn btn--primary btn--lg" onClick={() => navigate('/booking')}>
                Book Your Event
                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
              </button>
              <button className="btn btn--outline btn--lg" onClick={() => navigate('/menu')}>
                Explore Menu
              </button>
            </div>
            <div className="hero__stats">
              <div className="hero__stat">
                <span className="hero__stat-num">500+</span>
                <span className="hero__stat-label">Events Catered</span>
              </div>
              <div className="hero__stat-divider"></div>
              <div className="hero__stat">
                <span className="hero__stat-num">15+</span>
                <span className="hero__stat-label">Years of Excellence</span>
              </div>
              <div className="hero__stat-divider"></div>
              <div className="hero__stat">
                <span className="hero__stat-num">98%</span>
                <span className="hero__stat-label">Happy Clients</span>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════ SERVICES ══════════ */}
        <section className="services" aria-labelledby="services-heading">
          <div className="container">
            <div className="section-label">What We Do</div>
            <h2 id="services-heading">Catering for Every Occasion</h2>
            <p className="section-subtitle">Whether it's an intimate dinner or a grand celebration, our team crafts menus tailored to your vision and taste.</p>

            <div className="services__grid">
              {services.map((s, i) => (
                <article key={s.id} className="service-card" style={{ animationDelay: `${i * 0.1}s` }}>
                  <span className="service-card__icon">{s.icon}</span>
                  <h3>{s.name}</h3>
                  <p>{s.desc}</p>
                  <div className="service-card__footer">
                    <span className="service-card__price">{s.price}</span>
                    <button className="btn btn--sm btn--dark" onClick={() => navigate('/booking')}>Book Now</button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ FEATURES SLIDER ══════════ */}
        <section className="features-section" aria-labelledby="features-heading">
          <div className="container">
            <div className="section-label">Platform Features</div>
            <h2 id="features-heading">Everything You Need in One Place</h2>
            <p className="section-subtitle">From browsing the menu to paying the advance — here's what powers your Mannat Caterers experience.</p>
            <FeaturesSlider />
          </div>
        </section>

        {/* ══════════ PORTFOLIO ══════════ */}
        <section className="portfolio" id="portfolio" aria-labelledby="portfolio-heading">
          <div className="container">
            <div className="section-label">Our Work</div>
            <h2 id="portfolio-heading">A Gallery of Celebrations</h2>
            <p className="section-subtitle">Every event tells a story. Here's a glimpse into the moments we've helped create.</p>

            <div className="portfolio__filters">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={`chip ${activeFilter === cat ? 'chip--active' : ''}`}
                  onClick={() => setActiveFilter(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="portfolio__grid">
              {filtered.map((item, i) => (
                <figure key={item.id} className="portfolio__item" style={{ animationDelay: `${i * 0.08}s` }}>
                  <img src={item.img} alt={item.alt} loading="lazy" />
                  <figcaption className="portfolio__caption">
                    <span className="portfolio__tag">{item.category}</span>
                    <h3>{item.title}</h3>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ CTA BANNER ══════════ */}
        <section className="cta-banner" aria-label="Call to action">
          <div className="container cta-banner__inner">
            <h2>Ready to Create Something <em>Extraordinary?</em></h2>
            <p>Let's craft a menu that your guests will talk about long after the last course is served.</p>
            <button className="btn btn--white btn--lg" onClick={() => navigate('/booking')}>
              Start Planning Today
            </button>
          </div>
        </section>

        {/* ══════════ TESTIMONIALS — Trustindex Widget ══════════ */}
        <section className="reviews" aria-labelledby="reviews-heading">
          <div className="container">
            <div className="section-label">Testimonials</div>
            <h2 id="reviews-heading">Words from Our Clients</h2>

            <TrustindexWidget />
          </div>
        </section>

      </div>
    </>
  );
}

export default Home;
