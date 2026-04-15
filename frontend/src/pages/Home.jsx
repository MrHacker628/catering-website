import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Heart, Building2, Gift, GlassWater } from 'lucide-react';
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

const reviews = [
  { name: 'Priya & Rajeev', event: 'Wedding', quote: 'Mannat turned our dream wedding into a culinary masterpiece. Every guest was absolutely delighted with the food.', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop' },
  { name: 'Anil Desai', event: 'Corporate', quote: 'Flawless execution for our annual conference. Professional service and outstanding food quality throughout.', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop' },
  { name: 'Sneha Naik', event: 'Birthday', quote: 'They exceeded every expectation. The presentation was stunning and the flavors were absolutely incredible.', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop' },
];

const categories = ['All', 'Wedding', 'Corporate', 'Birthday', 'Private'];

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

        {/* ══════════ TESTIMONIALS ══════════ */}
        <section className="reviews" aria-labelledby="reviews-heading">
          <div className="container">
            <div className="section-label">Testimonials</div>
            <h2 id="reviews-heading">Words from Our Clients</h2>

            <div className="reviews__grid">
              {reviews.map((r, i) => (
                <article key={i} className="review-card">
                  <div className="review-card__stars">
                    {'★★★★★'.split('').map((s, j) => <span key={j} className="star">{s}</span>)}
                  </div>
                  <blockquote>"{r.quote}"</blockquote>
                  <div className="review-card__author">
                    <img src={r.img} alt={`Portrait of ${r.name}`} loading="lazy" />
                    <div>
                      <strong>{r.name}</strong>
                      <span>{r.event}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

      </div>
    </>
  );
}

export default Home;
