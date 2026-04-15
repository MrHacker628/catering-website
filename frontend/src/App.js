// App.js — main component that handles all page routing
// react-router-dom lets us switch between pages
// without reloading the browser
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import Booking from './pages/Booking';
import Payment from './pages/Payment';
import Admin from './pages/Admin';

import './App.css';

function App() {

  // stores logged in user data
  // null means no one is logged in
  const [currentUser, setCurrentUser] = useState(null);

  // controls modal visibility from anywhere
const [showAuthModal, setShowAuthModal] = useState(false);

  // runs once when app loads
  // checks if user was already logged in before
  useEffect(function(){
     // check localStorage for saved user
     const savedUser = localStorage.getItem('user');

     if(savedUser) {
      // user was logged in before!
      // parse converts string back to object
      setCurrentUser(JSON.parse(savedUser));
      console.log("User already logged in:", JSON.parse(savedUser));
    }
  }, []); // [] means run only once on page load

  // called when login/signup is successful
  function handleLoginSuccess(user) {
    setCurrentUser(user);
    console.log("Logged in as user:", user);
  }


  // called when user clicks logout
  function handleLogout() {
    // remove from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // clear from state
    setCurrentUser(null);
    console.log("👋 Logged out!");
  }


  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        <Footer />
      </div>

      {/* Navbar shows on ALL pages because it's outside Routes */}
      <Navbar currentUser={currentUser}
  onLogout={handleLogout}
  onLoginClick={() => setShowAuthModal(true)}/>

      <Routes>
        {/* Each Route connects a URL path to a page component */}
        {/* "/" means home page — loads when you open the website */}
        <Route path="/" element={<Home currentUser={currentUser} 
            onLoginSuccess={handleLoginSuccess} showAuthModal={showAuthModal}
    setShowAuthModal={setShowAuthModal}/>}  /> {/* pass handlers to Home so modal can update App.js */}

        {/* "/menu" loads Menu page */}
        <Route path="/menu" element={<Menu />} />

        {/* "/booking" loads Booking page */}
        <Route path="/booking" element={<Booking currentUser={currentUser} />} />

        {/* "/payment" loads Payment page */}
        <Route path="/payment" element={<Payment />} />

        {/* "/admin" loads Admin dashboard — protected later */}
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
