// import React, { useState, useEffect, useRef } from 'react';


// import axios from 'axios';
// import './GoogleReviews.css';

// function StarRow(props) {
//   return (
//     <div className="gr-stars">
//       {[1, 2, 3, 4, 5].map(function(n) {
//         return (
//           <span key={n} className={n <= props.rating ? 'star on' : 'star'}>
//             &#9733;
//           </span>
//         );
//       })}
//     </div>
//   );
// }

// function GoogleReviews() {

//   var dataState = useState(null);
//   var data = dataState[0];
//   var setData = dataState[1];
//   var scrollRef = useRef(null);

//   useEffect(function() {
//     axios.get('http://localhost:5000/reviews/google')
//       .then(function(res) {
//         setData(res.data);
//       })
//       .catch(function(err) {
//         console.log('Reviews error:', err);
//       });
//   }, []);

//   useEffect(function() {
//     if (!data) return;
//     var interval = setInterval(function() {
//       if (!scrollRef.current) return;
//       var el = scrollRef.current;
//       el.scrollLeft += 320;
//       if (el.scrollLeft >= el.scrollWidth - el.clientWidth) {
//         el.scrollLeft = 0;
//       }
//     }, 3000);
//     return function() {
//       clearInterval(interval);
//     };
//   }, [data]);

//   if (!data) {
//     return null;
//   }

//   var reviews = data.reviews || [];

//   return (
//     <div className="gr-wrap">

//       <h2 className="gr-title">What Our Customers Say</h2>
//       <p className="gr-sub">Real reviews from Google</p>

//       <div className="gr-overall">
//         <div className="gr-big">{data.rating}</div>
//         <div className="gr-overall-right">
//           <StarRow rating={Math.round(data.rating)} />
//           <p className="gr-count">Based on {data.user_ratings_total} Google reviews</p>
//           <p
//             className="gr-maplink"
//             onClick={function() {
//               window.open('https://www.google.com/maps/place/Mannat+Caterers', '_blank');
//             }}
//           >
//             View on Google Maps
//           </p>
//         </div>
//       </div>

//       <div className="gr-carousel-wrap">

//         <button
//           className="gr-btn left"
//           onClick={function() {
//             scrollRef.current.scrollLeft -= 320;
//           }}
//         >
//           &lt;
//         </button>

//         <div className="gr-carousel" ref={scrollRef}>
//           {reviews.map(function(review, i) {
//             return (
//               <div key={i} className="gr-card">

//                 <div className="gr-top">
//                   <img
//                     src={review.profile_photo_url}
//                     alt={review.author_name}
//                     className="gr-avatar"
//                     onError={function(e) {
//                       e.target.src = 'https://ui-avatars.com/api/?name='
//                         + encodeURIComponent(review.author_name)
//                         + '&background=4a0080&color=fff&size=42';
//                     }}
//                   />
//                   <div className="gr-reviewer-info">
//                     <div className="gr-name">{review.author_name}</div>
//                     <div className="gr-time">{review.relative_time_description}</div>
//                   </div>
//                 </div>

//                 <StarRow rating={review.rating} />

//                 <p className="gr-text">{review.text}</p>

//                 <div className="gr-badge">
//                   <span className="gr-g">G</span>
//                   <span>Google Review</span>
//                 </div>

//               </div>
//             );
//           })}
//         </div>

//         <button
//           className="gr-btn right"
//           onClick={function() {
//             scrollRef.current.scrollLeft += 320;
//           }}
//         >
//           &gt;
//         </button>

//       </div>

//     </div>
//   );
// }

// export default GoogleReviews;



import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './GoogleReviews.css';

// ── JSON-LD Schema Block ──────────────────────────────────────────────────────
function ReviewSchema({ data }) {
  if (!data) return null;
  const reviews = data.reviews || [];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FoodEstablishment',
    name: 'Mannat Caterers',
    url: 'https://www.mannatcaterers.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Goa',
      addressRegion: 'GA',
      addressCountry: 'IN',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: String(data.rating),
      reviewCount: String(data.user_ratings_total),
      bestRating: '5',
      worstRating: '1',
    },
    review: reviews.slice(0, 5).map(function (r) {
      return {
        '@type': 'Review',
        author: { '@type': 'Person', name: r.author_name },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: String(r.rating),
          bestRating: '5',
          worstRating: '1',
        },
        reviewBody: r.text,
        datePublished: r.relative_time_description,
      };
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ── Star Row ──────────────────────────────────────────────────────────────────
function StarRow(props) {
  return (
    <div className="gr-stars" aria-label={props.rating + ' out of 5 stars'}>
      {[1, 2, 3, 4, 5].map(function (n) {
        return (
          <span key={n} className={n <= props.rating ? 'star on' : 'star'} aria-hidden="true">
            &#9733;
          </span>
        );
      })}
    </div>
  );
}

// ── Google "G" SVG Logo ───────────────────────────────────────────────────────
function GoogleLogo() {
  return (
    <svg className="gr-google-logo" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" aria-label="Google">
      <path fill="#EA4335" d="M24 9.5c3.2 0 6 1.1 8.2 2.9l6.1-6.1C34.5 3.1 29.6 1 24 1 14.9 1 7.1 6.5 3.7 14.3l7.1 5.5C12.5 13.2 17.8 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h12.7c-.6 3-2.3 5.5-4.8 7.2l7.3 5.7c4.3-4 6.3-9.8 6.3-16.9z"/>
      <path fill="#FBBC05" d="M10.8 28.8A14.6 14.6 0 0 1 9.5 24c0-1.7.3-3.3.8-4.8L3.2 13.7A23 23 0 0 0 1 24c0 3.7.9 7.2 2.5 10.3l7.3-5.5z"/>
      <path fill="#34A853" d="M24 47c5.4 0 10-1.8 13.3-4.8l-7.3-5.7c-1.8 1.2-4.2 2-6 2-6.2 0-11.5-4.2-13.4-9.8l-7.1 5.5C7.1 41.5 14.9 47 24 47z"/>
    </svg>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
function GoogleReviews() {

  var dataState = useState(null);
  var data = dataState[0];
  var setData = dataState[1];
  var scrollRef = useRef(null);

  useEffect(function() {
    axios.get('http://localhost:5000/reviews/google')
      .then(function(res) {
        setData(res.data);
      })
      .catch(function(err) {
        console.log('Reviews error:', err);
      });
  }, []);

  useEffect(function() {
    if (!data) return;
    var interval = setInterval(function() {
      if (!scrollRef.current) return;
      var el = scrollRef.current;
      el.scrollLeft += 320;
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth) {
        el.scrollLeft = 0;
      }
    }, 3000);
    return function() {
      clearInterval(interval);
    };
  }, [data]);

  if (!data) {
    return null;
  }

  var reviews = data.reviews || [];

  return (
    <>
      <ReviewSchema data={data} />

      <section className="gr-wrap" aria-label="Customer Reviews for Mannat Caterers">

        {/* Decorative Background Elements */}
        <div className="gr-bg-leaf gr-bg-leaf--1" aria-hidden="true" />
        <div className="gr-bg-leaf gr-bg-leaf--2" aria-hidden="true" />
        <div className="gr-bg-dot-grid" aria-hidden="true" />

        {/* Section Header */}
        <header className="gr-header">
          <span className="gr-eyebrow">Trusted by Thousands in Goa</span>
          <h1 className="gr-title">
            Why We're Ranked Among the<br />
            <em>Top 10 Caterers in Goa</em>
          </h1>
          <p className="gr-sub">Real reviews from verified Google customers</p>
        </header>

        {/* Overall Rating Panel */}
        <div className="gr-overall" itemScope itemType="https://schema.org/AggregateRating">
          <div className="gr-overall-left">
            <div className="gr-big" itemProp="ratingValue">{data.rating}</div>
            <div className="gr-out-of">out of <span itemProp="bestRating">5</span></div>
          </div>
          <div className="gr-divider" aria-hidden="true" />
          <div className="gr-overall-right">
            <StarRow rating={Math.round(data.rating)} />
            <p className="gr-count">
              Based on{' '}
              <strong itemProp="reviewCount">{data.user_ratings_total}</strong>{' '}
              Google reviews
            </p>
            <div className="gr-overall-actions">
              <button
                className="gr-maplink"
                onClick={function() {
                  window.open('https://www.google.com/maps/place/Mannat+Caterers', '_blank');
                }}
                aria-label="View Mannat Caterers on Google Maps"
              >
                <GoogleLogo />
                View on Google Maps
              </button>
              <a
                className="gr-write-review"
                href="https://search.google.com/local/writereview?placeid=ChIJMannatCaterers"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Write a review for Mannat Caterers on Google"
              >
                ✍ Write a Review
              </a>
            </div>
          </div>
        </div>

        {/* Review Carousel */}
        <div className="gr-carousel-wrap">
          <button
            className="gr-btn left"
            aria-label="Scroll reviews left"
            onClick={function() {
              scrollRef.current.scrollLeft -= 320;
            }}
          >
            &#8592;
          </button>

          <div className="gr-carousel" ref={scrollRef} role="list" aria-label="Customer reviews">
            {reviews.map(function(review, i) {
              return (
                <article key={i} className="gr-card" role="listitem" style={{ '--delay': i * 0.08 + 's' }}>

                  <div className="gr-top">
                    <img
                      src={review.profile_photo_url}
                      alt={'Profile photo of ' + review.author_name}
                      className="gr-avatar"
                      loading="lazy"
                      onError={function(e) {
                        e.target.src = 'https://ui-avatars.com/api/?name='
                          + encodeURIComponent(review.author_name)
                          + '&background=1a5c38&color=fff&size=42';
                      }}
                    />
                    <div className="gr-reviewer-info">
                      <div className="gr-name">{review.author_name}</div>
                      <div className="gr-time">{review.relative_time_description}</div>
                    </div>
                    <div className="gr-google-badge" aria-label="Verified Google Review">
                      <GoogleLogo />
                    </div>
                  </div>

                  <StarRow rating={review.rating} />

                  <blockquote className="gr-text">
                    <p>{review.text}</p>
                  </blockquote>

                  <div className="gr-verified-badge" aria-label="Verified Review">
                    <span className="gr-verified-dot" aria-hidden="true">✓</span>
                    Verified Google Review
                  </div>

                </article>
              );
            })}
          </div>

          <button
            className="gr-btn right"
            aria-label="Scroll reviews right"
            onClick={function() {
              scrollRef.current.scrollLeft += 320;
            }}
          >
            &#8594;
          </button>
        </div>

        {/* Bottom CTA */}
        <div className="gr-bottom-cta">
          <p className="gr-cta-text">
            Loved your experience with <strong>Mannat Caterers</strong>?
          </p>
          <a
            className="gr-cta-btn"
            href="https://search.google.com/local/writereview?placeid=ChIJMannatCaterers"
            target="_blank"
            rel="noopener noreferrer"
          >
            ✍&nbsp; Share Your Review on Google
          </a>
        </div>

      </section>
    </>
  );
}

export default GoogleReviews;
