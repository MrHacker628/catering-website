// App.js — main component that handles all page routing
// react-router-dom lets us switch between pages
// without reloading the browser
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import all our pages
import Home from './pages/Home';
import Menu from './pages/Menu';
import Booking from './pages/Booking';
import Payment from './pages/Payment';
import Admin from './pages/Admin';

import Navbar from './components/Navbar';

// Import main CSS
import './App.css';

function App() {
  return (
    // BrowserRouter enables routing in our app
    <BrowserRouter>

      {/* Navbar shows on ALL pages because it's outside Routes */}
      <Navbar />

      <Routes>
        {/* Each Route connects a URL path to a page component */}
        {/* "/" means home page — loads when you open the website */}
        <Route path="/" element={<Home />} />

        {/* "/menu" loads Menu page */}
        <Route path="/menu" element={<Menu />} />

        {/* "/booking" loads Booking page */}
        <Route path="/booking" element={<Booking />} />

        {/* "/payment" loads Payment page */}
        <Route path="/payment" element={<Payment />} />

        {/* "/admin" loads Admin dashboard — protected later */}
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
