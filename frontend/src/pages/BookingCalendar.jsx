// BookingCalendar.jsx
// Shows a calendar with booked dates highlighted
// Drop this anywhere in your Home page

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './BookingCalendar.css';


// function BookingCalendar() {

//     const [bookedDates, setBookedDates]   = useState([]);
//     const [currentDate, setCurrentDate]   = useState(new Date());
//     const [loading, setLoading]           = useState(true);

//     // ── FETCH BOOKED DATES ──
//     useEffect(function() {
//         axios.get('http://localhost:5000/orders/booked-dates')
//             .then(function(res) {
//                 console.log("📅 Booked dates from API:", res.data); 
//                 setBookedDates(res.data.bookedDates);
//                 setLoading(false);
//             })
//             .catch(function(err) {
//                 console.log("Error fetching booked dates:", err);
//                 setLoading(false);
//             });
//     }, []);

//     // ── CALENDAR HELPERS ──
//     const year  = currentDate.getFullYear();
//     const month = currentDate.getMonth(); // 0-indexed

//     const monthNames = [
//         'January','February','March','April','May','June',
//         'July','August','September','October','November','December'
//     ];

//     const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

//     // First day of month (0=Sun, 6=Sat)
//     const firstDayOfMonth = new Date(year, month, 1).getDay();

//     // Total days in month
//     const daysInMonth = new Date(year, month + 1, 0).getDate();

//     // ── CHECK IF DATE IS BOOKED ──
//     function isBooked(day) {
//         const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
//         return bookedDates.includes(dateStr);
//     }

//     // ── CHECK IF DATE IS TODAY ──
//     function isToday(day) {
//         const today = new Date();
//         return today.getDate() === day &&
//                today.getMonth() === month &&
//                today.getFullYear() === year;
//     }

//     // ── CHECK IF DATE IS IN THE PAST ──
//     function isPast(day) {
//         const today = new Date();
//         today.setHours(0, 0, 0, 0);
//         const cellDate = new Date(year, month, day);
//         return cellDate < today;
//     }

//     // ── NAVIGATION ──
//     function prevMonth() {
//         setCurrentDate(new Date(year, month - 1, 1));
//     }

//     function nextMonth() {
//         setCurrentDate(new Date(year, month + 1, 1));
//     }

//     // ── BUILD CALENDAR CELLS ──
//     // Empty cells before first day + actual days
//     const cells = [];

//     // Empty cells for days before month starts
//     for (let i = 0; i < firstDayOfMonth; i++) {
//         cells.push(null);
//     }

//     // Actual days
//     for (let d = 1; d <= daysInMonth; d++) {
//         cells.push(d);
//     }

//     return (
//         <div className="calendar-wrapper">
//             <div className="calendar-header-top">
//                 <h2>📅 Event Availability</h2>
//                 <p>Check available dates before booking your event</p>
//             </div>

//             <div className="calendar-container">

//                 {/* ── MONTH NAVIGATION ── */}
//                 <div className="calendar-nav">
//                     <button className="cal-nav-btn" onClick={prevMonth}>‹</button>
//                     <h3>{monthNames[month]} {year}</h3>
//                     <button className="cal-nav-btn" onClick={nextMonth}>›</button>
//                 </div>

//                 {/* ── DAY NAMES ── */}
//                 <div className="calendar-grid">
//                     {dayNames.map(function(day) {
//                         return (
//                             <div key={day} className="cal-day-name">
//                                 {day}
//                             </div>
//                         );
//                     })}

//                     {/* ── CALENDAR CELLS ── */}
//                     {cells.map(function(day, index) {
//                         if (day === null) {
//                             return <div key={`empty-${index}`} className="cal-cell empty" />;
//                         }

//                         const booked = isBooked(day);
//                         const today  = isToday(day);
//                         const past   = isPast(day);

//                         let cellClass = 'cal-cell';
//                         if (past)        cellClass += ' past';
//                         else if (booked) cellClass += ' booked';
//                         else             cellClass += ' available';
//                         if (today)       cellClass += ' today';

//                         return (
//                             <div key={day} className={cellClass}>
//                                 <span>{day}</span>
//                                 {booked && !past && (
//                                     <div className="booked-label">Booked</div>
//                                 )}
//                             </div>
//                         );
//                     })}
//                 </div>

//                 {/* ── LEGEND ── */}
//                 <div className="cal-legend">
//                     <div className="legend-item">
//                         <div className="legend-dot available-dot"></div>
//                         <span>Available</span>
//                     </div>
//                     <div className="legend-item">
//                         <div className="legend-dot booked-dot"></div>
//                         <span>Booked</span>
//                     </div>
//                     <div className="legend-item">
//                         <div className="legend-dot today-dot"></div>
//                         <span>Today</span>
//                     </div>
//                     <div className="legend-item">
//                         <div className="legend-dot past-dot"></div>
//                         <span>Past</span>
//                     </div>
//                 </div>

//             </div>
//         </div>
//     );
// }

// export default BookingCalendar;


// BookingCalendar.jsx
// Shows a calendar with booked dates highlighted — Mannat Caterers, Goa
// Drop this anywhere in your Home page

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookingCalendar.css';

/* ── JSON-LD SEO SCHEMA ── */
const JSON_LD_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Mannat Caterers",
  "description": "Premium catering service in Goa for weddings, corporate events, and social gatherings. Check live availability and book your date online.",
  "areaServed": {
    "@type": "State",
    "name": "Goa",
    "addressCountry": "IN"
  },
  "serviceType": "Catering",
  "url": "https://www.mannatcaterers.com",
  "potentialAction": {
    "@type": "ReserveAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://www.mannatcaterers.com/booking",
      "actionPlatform": [
        "http://schema.org/DesktopWebPlatform",
        "http://schema.org/MobileWebPlatform"
      ]
    },
    "result": {
      "@type": "Reservation",
      "name": "Catering Service Booking — Mannat Caterers, Goa"
    }
  }
};

function BookingCalendar() {

  // ── STATE (unchanged) ──
  const [bookedDates, setBookedDates] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [loading,     setLoading]     = useState(true);
  const [selectedDay, setSelectedDay] = useState(null);

  // ── FETCH BOOKED DATES (unchanged) ──
  useEffect(function() {
    axios.get('http://localhost:5000/orders/booked-dates')
      .then(function(res) {
        console.log("📅 Booked dates from API:", res.data);
        setBookedDates(res.data.bookedDates);
        setLoading(false);
      })
      .catch(function(err) {
        console.log("Error fetching booked dates:", err);
        setLoading(false);
      });
  }, []);

  // ── CALENDAR HELPERS (unchanged) ──
  const year  = currentDate.getFullYear();
  const month = currentDate.getMonth(); // 0-indexed

  const monthNames = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December'
  ];

  const dayNames = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth     = new Date(year, month + 1, 0).getDate();

  // ── CHECK IF DATE IS BOOKED (unchanged) ──
  function isBooked(day) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return bookedDates.includes(dateStr);
  }

  // ── CHECK IF TODAY (unchanged) ──
  function isToday(day) {
    const today = new Date();
    return today.getDate() === day &&
           today.getMonth() === month &&
           today.getFullYear() === year;
  }

  // ── CHECK IF PAST (unchanged) ──
  function isPast(day) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const cellDate = new Date(year, month, day);
    return cellDate < today;
  }

  // ── NAVIGATION (unchanged) ──
  function prevMonth() {
    setCurrentDate(new Date(year, month - 1, 1));
    setSelectedDay(null);
  }

  function nextMonth() {
    setCurrentDate(new Date(year, month + 1, 1));
    setSelectedDay(null);
  }

  // ── BUILD CELLS (unchanged) ──
  const cells = [];
  for (let i = 0; i < firstDayOfMonth; i++) { cells.push(null); }
  for (let d = 1; d <= daysInMonth; d++)     { cells.push(d); }

  // ── SELECTED DATE STRING ──
  const selectedDateStr = selectedDay
    ? new Date(year, month, selectedDay).toLocaleDateString('en-IN', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
      })
    : null;

  // ── ISO DATE for <time> tags ──
  function isoDate(day) {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  }

  return (
    <>
      {/* ── JSON-LD SEO SCHEMA ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD_SCHEMA, null, 2) }}
      />

      <section className="calendar-wrapper" aria-label="Event availability calendar — Mannat Caterers Goa">

        {/* ── SEO HEADING ── */}
        <header className="calendar-header-top">
          <p className="calendar-eyebrow">Mannat Caterers · Goa</p>
          <h2>
            Check <em>Availability</em> &amp; Book Your Date
          </h2>
          <p>
            Mannat Caterers — Top Caterers in Goa for Weddings &amp; Events.
            Browse live availability and secure your date below.
          </p>
        </header>

        {/* ── CALENDAR CARD ── */}
        <div
          className="calendar-container"
          role="application"
          aria-label={`Calendar for ${monthNames[month]} ${year}`}
        >

          {loading ? (
            <div className="cal-loading" role="status" aria-live="polite">
              <div className="cal-loading-spinner" aria-hidden="true"></div>
              Loading availability…
            </div>
          ) : (
            <>
              {/* Month navigation */}
              <nav className="calendar-nav" aria-label="Month navigation">
                <button
                  className="cal-nav-btn"
                  onClick={prevMonth}
                  aria-label={`Go to ${monthNames[month === 0 ? 11 : month - 1]} ${month === 0 ? year - 1 : year}`}
                >
                  ‹
                </button>

                <h3 aria-live="polite" aria-atomic="true">
                  <time dateTime={`${year}-${String(month + 1).padStart(2, '0')}`}>
                    {monthNames[month]} {year}
                  </time>
                </h3>

                <button
                  className="cal-nav-btn"
                  onClick={nextMonth}
                  aria-label={`Go to ${monthNames[month === 11 ? 0 : month + 1]} ${month === 11 ? year + 1 : year}`}
                >
                  ›
                </button>
              </nav>

              {/* Grid */}
              <div
                className="calendar-grid"
                role="grid"
                aria-label={`Dates for ${monthNames[month]} ${year}`}
              >
                {/* Day name headers */}
                {dayNames.map(function(day) {
                  return (
                    <div
                      key={day}
                      className="cal-day-name"
                      role="columnheader"
                      aria-label={day}
                    >
                      {day}
                    </div>
                  );
                })}

                {/* Calendar cells */}
                {cells.map(function(day, index) {
                  if (day === null) {
                    return (
                      <div
                        key={`empty-${index}`}
                        className="cal-cell empty"
                        role="gridcell"
                        aria-hidden="true"
                      />
                    );
                  }

                  const booked   = isBooked(day);
                  const today    = isToday(day);
                  const past     = isPast(day);
                  const selected = selectedDay === day;

                  let cellClass = 'cal-cell';
                  if (past)          cellClass += ' past';
                  else if (booked)   cellClass += ' booked';
                  else               cellClass += ' available';
                  if (today)         cellClass += ' today';
                  if (selected)      cellClass += ' selected';

                  const isClickable = !past && !booked;

                  return (
                    <div
                      key={day}
                      className={cellClass}
                      role="gridcell"
                      aria-label={`${day} ${monthNames[month]} ${year}${booked ? ', booked' : past ? ', past' : ', available'}${today ? ', today' : ''}${selected ? ', selected' : ''}`}
                      aria-selected={selected}
                      aria-disabled={!isClickable}
                      onClick={isClickable ? () => setSelectedDay(selected ? null : day) : undefined}
                      style={isClickable ? { cursor: 'pointer' } : {}}
                      tabIndex={isClickable ? 0 : -1}
                      onKeyDown={isClickable ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedDay(selected ? null : day); } } : undefined}
                    >
                      <time dateTime={isoDate(day)} className="cal-day-num">
                        {day}
                      </time>
                      {booked && !past && (
                        <div className="booked-label" aria-hidden="true">Booked</div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Selected date display */}
              {selectedDateStr && (
                <div className="selected-date-display" role="status" aria-live="polite">
                  <span aria-hidden="true">✦</span>
                  {selectedDateStr} — Available
                </div>
              )}

              {/* Divider */}
              <div className="cal-divider" aria-hidden="true" />

              {/* Legend */}
              <div className="cal-legend" role="list" aria-label="Calendar legend">
                <div className="legend-item" role="listitem">
                  <div className="legend-dot available-dot" aria-hidden="true"></div>
                  <span>Available</span>
                </div>
                <div className="legend-item" role="listitem">
                  <div className="legend-dot selected-dot" aria-hidden="true"></div>
                  <span>Selected</span>
                </div>
                <div className="legend-item" role="listitem">
                  <div className="legend-dot booked-dot" aria-hidden="true"></div>
                  <span>Booked</span>
                </div>
                <div className="legend-item" role="listitem">
                  <div className="legend-dot today-dot" aria-hidden="true"></div>
                  <span>Today</span>
                </div>
                <div className="legend-item" role="listitem">
                  <div className="legend-dot past-dot" aria-hidden="true"></div>
                  <span>Past</span>
                </div>
              </div>
            </>
          )}

        </div>
      </section>
    </>
  );
}

export default BookingCalendar;
