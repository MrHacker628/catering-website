// App.js — Project B's layout + Project A's auth state management
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Booking from './pages/Booking';
import Payment from './pages/Payment';
import Admin from './pages/Admin';

import './App.css';

function App() {

  // ── Auth State (from Project A) ──
  // stores logged in user data — null means no one is logged in
  const [currentUser, setCurrentUser] = useState(null);

  // controls modal visibility from anywhere
  const [showAuthModal, setShowAuthModal] = useState(false);

  // runs once when app loads — checks if user was already logged in before
  useEffect(function(){
     const savedUser = localStorage.getItem('user');
     if(savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      console.log("User already logged in:", JSON.parse(savedUser));
    }
  }, []);

  // called when login/signup is successful
  function handleLoginSuccess(user) {
    setCurrentUser(user);
    console.log("Logged in as user:", user);
  }

  // called when user clicks logout
  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentUser(null);
    console.log("👋 Logged out!");
  }

  return (
    <BrowserRouter>
      <div className="app">
        {/* Navbar with auth props — shows login/logout/user info */}
        <Navbar
          currentUser={currentUser}
          onLogout={handleLogout}
          onLoginClick={() => setShowAuthModal(true)}
        />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/booking" element={<Booking currentUser={currentUser} />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>

        <Footer />

        {/* Auth Modal from Project A — shown when showAuthModal is true */}
        {showAuthModal && (
          <AuthModal
            onClose={() => setShowAuthModal(false)}
            onLoginSuccess={handleLoginSuccess}
          />
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
