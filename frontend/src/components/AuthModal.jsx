// AuthModal.jsx — Login/Signup popup modal

// import React, { useState } from 'react';
// import axios from 'axios';
// import './AuthModal.css'; // Import CSS for styling


// function AuthModal({ onClose, onLoginSuccess }) {

//     // ── STEP 1: Variables (useState) ──
//     // which form to show right now
//     const [activeForm, setActiveForm] = useState('login'); // 'login' or 'signup'

//     // ── LOGIN FORM DATA ──
//     // stores what user types in login form
//     const [loginData, setLoginData] = useState({
//         email: '',
//         password: ''
//     });

//     // ── SIGNUP FORM DATA ──
//     // stores what user types in signup form
//     const [signupData, setSignupData] = useState({
//         fullName: '',
//         email: '',
//         phone: '',
//         address: '',
//         password: '',
//         confirmPassword: ''
//     });


//     // updates loginData when user types
//     // e.target.name  = which input changed
//     // e.target.value = what was typed
//     function handleLoginChange(e) {
//         setLoginData({ ...loginData, [e.target.name]: e.target.value });

//         console.log("Login data:", loginData);
//     }

//     // ── HANDLE LOGIN SUBMIT ──
//     // runs when Login button is clicked
//     async function handleLogin(e) {
//         // STEP 1 — Clear any old error messages
//         setError('');

//         // STEP 2 — Check if fields are empty
//         if (!loginData.email || !loginData.password) {
//             setError('Please fill all fields!');
//             return; // stop here — don't continue
//         }

//         // STEP 3 — Show loading
//         setLoading(true);


//         try {
//             // STEP 4 — Send login request to backend
//             const response = await axios.post(
//                 'http://localhost:5000/auth/login',
//                 loginData
//             );

//             // STEP 5 — Save token in localStorage
//             // localStorage keeps data even after browser closes!
//             localStorage.setItem('token', response.data.token);
//             localStorage.setItem('user', JSON.stringify(response.data.user));

//             setLoading(false);

//             // STEP 6 — Tell parent component login worked
//             onLoginSuccess(response.data.user);

//             // STEP 7 — Close the popup
//             onClose();

//         } catch (err) {
//             setLoading(false);
//             // show error message from backend
//             setError(err.response?.data?.message || 'Login failed!');
//         }
//     }


//     // ── HANDLE SIGNUP SUBMIT ──
//     // runs when Sign Up button is clicked
//     async function handleSignup() {

//         // STEP 1 — Clear old errors
//         setError('');

//         // STEP 2 — Check if required fields are empty
//         // ! means NOT — so !signupData.fullName means "if name is empty"
//         if (!signupData.fullName || !signupData.email ||
//             !signupData.phone || !signupData.password) {
//             setError('Please fill all required fields!');
//             return;
//         }

//         // STEP 3 — Check if passwords match
//         if (signupData.password !== signupData.confirmPassword) {
//             setError('Passwords do not match!');
//             return;
//         }

//         // STEP 4 — Check password length
//         if (signupData.password.length < 6) {
//             setError('Password must be at least 6 characters!');
//             return;
//         }

//         // STEP 5 — Show loading
//         setLoading(true);

//         try {
//             // STEP 6 — Send signup request to backend
//             const response = await axios.post(
//                 'http://localhost:5000/auth/signup',
//                 signupData
//             );

//             // STEP 7 — Save token and user in localStorage
//             localStorage.setItem('token', response.data.token);
//             localStorage.setItem('user', JSON.stringify(response.data.user));

//             setLoading(false);

//             // STEP 8 — Tell parent login was successful
//             onLoginSuccess(response.data.user);

//             // STEP 9 — Close popup
//             onClose();

//         } catch (err) {
//             setLoading(false);
//             setError(err.response?.data?.message || 'Signup failed!');
//         }

//         console.log("Signup data:", signupData);
//     }

//     // updates signupData when user types
//     function handleSignupChange(e) {
//         setSignupData({ ...signupData, [e.target.name]: e.target.value });
//     }

//     // ── ERROR MESSAGE ──
//     const [error, setError] = useState('');

//     // ── LOADING STATE ──
//     const [loading, setLoading] = useState(false);

//     return (
//         <div className="modal-overlay" onClick={onClose}>
//             {/* MODAL BOX — white box in center */}
//             {/* stopPropagation stops click from reaching overlay */}
//             <div className="modal-box" onClick={(e) => e.stopPropagation()}>

//                 {/* CLOSE BUTTON — top right X */}
//                 <button className="modal-close" onClick={onClose}>✕</button>

//                 {/* TAB SWITCHER — Login / Sign Up buttons */}
//                 <div className="modal-tabs">
//                     {/* 
//                         when clicked → setActiveForm changes to 'login' or 'signup'
//                         activeForm === 'login' ? 'active' : ''
//                         means IF activeForm is login → add active class (purple)
//                         IF not → no class (grey)
//                     */}

//                     <button className={activeForm === 'login' ? 'active' : ''} onClick={() => setActiveForm('login')}>Login</button>
//                     <button className={activeForm === 'signup' ? 'active' : ''} onClick={() => setActiveForm('signup')}>Sign Up</button>
//                 </div>

//                 {/* only show login form when activeForm === 'login' */}
//                 {activeForm === 'login' && (

//                     < div className="modal-form">
//                         {/* LOGIN FORM — shown by default */}
//                         <h2>Welcome Back</h2>
//                         <p>Login to your account to continue</p>

//                         {/* show error if any */}
//                         {error && <p className="modal-error">❌ {error}</p>}

//                         <div className="modal-group">
//                             <label>Email</label>
//                             <input type="email" name="email" value={loginData.email} onChange={handleLoginChange} placeholder="Enter your email" />
//                         </div>

//                         <div className="modal-group">
//                             <label>Password</label>
//                             <input type="password" name="password" value={loginData.password} onChange={handleLoginChange} placeholder="Enter your password" />
//                         </div>

//                         <button className="modal-btn" onClick={handleLogin}
//                             disabled={loading}>{loading ? 'Logging in...' : 'Login 🔓'}</button>

//                         <p className="modal-switch">
//                             Don't have an account? <span>Sign Up here</span>
//                         </p>
//                     </div>
//                 )}


//                 {/* only show signup form when activeForm === 'signup' */}
//                 {activeForm === 'signup' && (
//                     <div className="modal-form">
//                         <h2>Create Account 🎉</h2>
//                         <p>Join Mannat Catering today!</p>

//                         {/* show error if any */}
//                         {error && <p className="modal-error">❌ {error}</p>}

//                         <div className="modal-group">
//                             <label>Full Name *</label>
//                             <input type="text" name="fullName" value={signupData.fullName} onChange={handleSignupChange} placeholder="Enter your full name" />
//                         </div>

//                         <div className="modal-group">
//                             <label>Email *</label>
//                             <input type="email" name="email" value={signupData.email} onChange={handleSignupChange} placeholder="Enter your email" />
//                         </div>

//                         <div className="modal-group">
//                             <label>Phone *</label>
//                             <input type="text" name="phone" value={signupData.phone} onChange={handleSignupChange} placeholder="Enter your phone number" />
//                         </div>

//                         <div className="modal-group">
//                             <label>Address</label>
//                             <input type="text" name="address" value={signupData.address} onChange={handleSignupChange} placeholder="Enter your address" />
//                         </div>

//                         <div className="modal-group">
//                             <label>Password *</label>
//                             <input type="password" name="password" value={signupData.password} onChange={handleSignupChange} placeholder="Min 6 characters" />
//                         </div>

//                         <div className="modal-group">
//                             <label>Confirm Password *</label>
//                             <input type="password" name="confirmPassword" value={signupData.confirmPassword} onChange={handleSignupChange} placeholder="Repeat your password" />
//                         </div>

//                         <button className="modal-btn" onClick={handleSignup}
//                             disabled={loading}>{loading ? 'Creating account...' : 'Sign Up 🎉'}</button>

//                         <p className="modal-switch">
//                             Already have an account?{' '}
//                             <span onClick={() => setActiveForm('login')}>
//                                 Login here
//                             </span>
//                         </p>
//                     </div>
//                 )}

//             </div>
//         </div >


//     )
// };


// export default AuthModal;


// AuthModal.jsx — Mannat Caterers — Premium Redesign
// UI shell only — all logic, state, handlers, and API calls are untouched

import React, { useState } from 'react';
import axios from 'axios';
import './AuthModal.css';

function AuthModal({ onClose, onLoginSuccess }) {

  // ── STEP 1: Variables (useState) ──
  const [activeForm, setActiveForm] = useState('login');

  // ── LOGIN FORM DATA ──
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  // ── SIGNUP FORM DATA ──
  const [signupData, setSignupData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: ''
  });

  function handleLoginChange(e) {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    console.log("Login data:", loginData);
  }

  async function handleLogin(e) {
    setError('');
    if (!loginData.email || !loginData.password) {
      setError('Please fill all fields!');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/auth/login', loginData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setLoading(false);
      onLoginSuccess(response.data.user);
      onClose();
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Login failed!');
    }
  }

  async function handleSignup() {
    setError('');
    if (!signupData.fullName || !signupData.email || !signupData.phone || !signupData.password) {
      setError('Please fill all required fields!');
      return;
    }
    if (signupData.password !== signupData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    if (signupData.password.length < 6) {
      setError('Password must be at least 6 characters!');
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/auth/signup', signupData);
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setLoading(false);
      onLoginSuccess(response.data.user);
      onClose();
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || 'Signup failed!');
    }
    console.log("Signup data:", signupData);
  }

  function handleSignupChange(e) {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  }

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // ── UI ────────────────────────────────────────────────────
  return (
    <div className="am-overlay" onClick={onClose}>
      <div className="am-modal" onClick={(e) => e.stopPropagation()}>

        {/* ── LEFT PANEL — Brand Visual ── */}
        <div className="am-panel am-panel--left" aria-hidden="true">
          <div className="am-panel__bg">
            <div className="am-panel__orb am-panel__orb--1"></div>
            <div className="am-panel__orb am-panel__orb--2"></div>
          </div>
          <div className="am-panel__content">
            <div className="am-panel__logo">🍽️</div>
            <div className="am-panel__brand">Mannat <span>Caterers</span></div>
            <p className="am-panel__tagline">
              Goa's most trusted catering service — crafting unforgettable moments, one feast at a time.
            </p>
            <div className="am-panel__stats">
              <div className="am-stat">
                <div className="am-stat__num">500+</div>
                <div className="am-stat__label">Events</div>
              </div>
              <div className="am-stat__divider"></div>
              <div className="am-stat">
                <div className="am-stat__num">4.9★</div>
                <div className="am-stat__label">Rating</div>
              </div>
              <div className="am-stat__divider"></div>
              <div className="am-stat">
                <div className="am-stat__num">10+</div>
                <div className="am-stat__label">Years</div>
              </div>
            </div>
            {/* Decorative food emoji cluster */}
            <div className="am-panel__food-grid">
              {['🥗','🍛','🎂','🍲','🥤','💍'].map((e, i) => (
                <span key={i} className="am-food-icon" style={{'--di': i}}>{e}</span>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL — Form ── */}
        <div className="am-panel am-panel--right">

          {/* Close button */}
          <button className="am-close" onClick={onClose} aria-label="Close modal">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M1 1l12 12M13 1L1 13"/>
            </svg>
          </button>

          {/* Tab Toggle */}
          <div className="am-tabs" role="tablist">
            <button
              role="tab"
              aria-selected={activeForm === 'login'}
              className={`am-tab ${activeForm === 'login' ? 'am-tab--active' : ''}`}
              onClick={() => { setActiveForm('login'); setError(''); }}
            >
              Login
            </button>
            <button
              role="tab"
              aria-selected={activeForm === 'signup'}
              className={`am-tab ${activeForm === 'signup' ? 'am-tab--active' : ''}`}
              onClick={() => { setActiveForm('signup'); setError(''); }}
            >
              Sign Up
            </button>
            <div className="am-tab__slider" style={{ transform: activeForm === 'signup' ? 'translateX(100%)' : 'translateX(0)' }}></div>
          </div>

          {/* Error Banner */}
          {error && (
            <div className="am-error" role="alert">
              <span className="am-error__icon">!</span>
              {error}
            </div>
          )}

          {/* ── LOGIN FORM ── */}
          {activeForm === 'login' && (
            <div className="am-form" key="login">
              <div className="am-form__header">
                <h2 className="am-form__title">Welcome back</h2>
                <p className="am-form__sub">Sign in to manage your bookings</p>
              </div>

              <div className="am-field">
                <input
                  className="am-input"
                  type="email"
                  name="email"
                  id="login-email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  placeholder=" "
                  autoComplete="email"
                />
                <label className="am-label" htmlFor="login-email">Email address</label>
                <span className="am-field__icon">✉</span>
              </div>

              <div className="am-field">
                <input
                  className="am-input"
                  type="password"
                  name="password"
                  id="login-password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  placeholder=" "
                  autoComplete="current-password"
                />
                <label className="am-label" htmlFor="login-password">Password</label>
                <span className="am-field__icon">🔒</span>
              </div>

              <button
                className="am-btn am-btn--primary"
                onClick={handleLogin}
                disabled={loading}
                aria-busy={loading}
              >
                {loading ? (
                  <><span className="am-spinner"></span> Logging in…</>
                ) : (
                  <><span>Login</span> <span className="am-btn__arrow">→</span></>
                )}
              </button>

              <p className="am-switch">
                New here?{' '}
                <button className="am-switch__link" onClick={() => { setActiveForm('signup'); setError(''); }}>
                  Create an account
                </button>
              </p>
            </div>
          )}

          {/* ── SIGNUP FORM ── */}
          {activeForm === 'signup' && (
            <div className="am-form" key="signup">
              <div className="am-form__header">
                <h2 className="am-form__title">Join Mannat</h2>
                <p className="am-form__sub">Create your account in seconds</p>
              </div>

              <div className="am-fields-row">
                <div className="am-field">
                  <input
                    className="am-input"
                    type="text"
                    name="fullName"
                    id="signup-name"
                    value={signupData.fullName}
                    onChange={handleSignupChange}
                    placeholder=" "
                    autoComplete="name"
                  />
                  <label className="am-label" htmlFor="signup-name">Full name *</label>
                  <span className="am-field__icon">👤</span>
                </div>

                <div className="am-field">
                  <input
                    className="am-input"
                    type="text"
                    name="phone"
                    id="signup-phone"
                    value={signupData.phone}
                    onChange={handleSignupChange}
                    placeholder=" "
                    autoComplete="tel"
                  />
                  <label className="am-label" htmlFor="signup-phone">Phone *</label>
                  <span className="am-field__icon">📱</span>
                </div>
              </div>

              <div className="am-field">
                <input
                  className="am-input"
                  type="email"
                  name="email"
                  id="signup-email"
                  value={signupData.email}
                  onChange={handleSignupChange}
                  placeholder=" "
                  autoComplete="email"
                />
                <label className="am-label" htmlFor="signup-email">Email address *</label>
                <span className="am-field__icon">✉</span>
              </div>

              <div className="am-field">
                <input
                  className="am-input"
                  type="text"
                  name="address"
                  id="signup-address"
                  value={signupData.address}
                  onChange={handleSignupChange}
                  placeholder=" "
                  autoComplete="street-address"
                />
                <label className="am-label" htmlFor="signup-address">Address</label>
                <span className="am-field__icon">📍</span>
              </div>

              <div className="am-fields-row">
                <div className="am-field">
                  <input
                    className="am-input"
                    type="password"
                    name="password"
                    id="signup-password"
                    value={signupData.password}
                    onChange={handleSignupChange}
                    placeholder=" "
                    autoComplete="new-password"
                  />
                  <label className="am-label" htmlFor="signup-password">Password *</label>
                  <span className="am-field__icon">🔒</span>
                </div>

                <div className="am-field">
                  <input
                    className="am-input"
                    type="password"
                    name="confirmPassword"
                    id="signup-confirm"
                    value={signupData.confirmPassword}
                    onChange={handleSignupChange}
                    placeholder=" "
                    autoComplete="new-password"
                  />
                  <label className="am-label" htmlFor="signup-confirm">Confirm *</label>
                  <span className="am-field__icon">✅</span>
                </div>
              </div>

              <button
                className="am-btn am-btn--primary"
                onClick={handleSignup}
                disabled={loading}
                aria-busy={loading}
              >
                {loading ? (
                  <><span className="am-spinner"></span> Creating account…</>
                ) : (
                  <><span>Create Account</span> <span className="am-btn__arrow">🎉</span></>
                )}
              </button>

              <p className="am-switch">
                Already have an account?{' '}
                <button className="am-switch__link" onClick={() => { setActiveForm('login'); setError(''); }}>
                  Login here
                </button>
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default AuthModal;
