// AuthModal.jsx — Login/Signup popup modal (Green Theme, No Tabs)

import React, { useState } from 'react';
import axios from 'axios';
import './AuthModal.css';


function AuthModal({ onClose, onLoginSuccess }) {

    // which form to show right now
    const [activeForm, setActiveForm] = useState('login'); // 'login' or 'signup'

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

    // ── ERROR & LOADING ──
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    function handleLoginChange(e) {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    }

    // ── HANDLE LOGIN SUBMIT ──
    async function handleLogin(e) {
        setError('');

        if (!loginData.email || !loginData.password) {
            setError('Please fill all fields!');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(
                'http://localhost:5000/auth/login',
                loginData
            );

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


    // ── HANDLE SIGNUP SUBMIT ──
    async function handleSignup() {

        setError('');

        if (!signupData.fullName || !signupData.email ||
            !signupData.phone || !signupData.password) {
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
            const response = await axios.post(
                'http://localhost:5000/auth/signup',
                signupData
            );

            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            setLoading(false);
            onLoginSuccess(response.data.user);
            onClose();

        } catch (err) {
            setLoading(false);
            setError(err.response?.data?.message || 'Signup failed!');
        }
    }

    function handleSignupChange(e) {
        setSignupData({ ...signupData, [e.target.name]: e.target.value });
    }

    return (
        <div className="auth-overlay" onClick={onClose}>
            <div className="auth-box" onClick={(e) => e.stopPropagation()}>

                {/* CLOSE BUTTON */}
                <button className="auth-close" onClick={onClose}>✕</button>

                {/* ── LOGIN FORM (default view — no tabs) ── */}
                {activeForm === 'login' && (

                    <div className="auth-form">
                        {/* Icon */}
                        <div className="auth-icon">
                            <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                        </div>

                        <h2>Welcome Back</h2>
                        <p>Login to your account to continue</p>

                        {error && <p className="auth-error">❌ {error}</p>}

                        <div className="auth-group">
                            <label htmlFor="login-email">Email</label>
                            <input id="login-email" type="email" name="email" value={loginData.email} onChange={handleLoginChange} placeholder="Enter your email" />
                        </div>

                        <div className="auth-group">
                            <label htmlFor="login-password">Password</label>
                            <input id="login-password" type="password" name="password" value={loginData.password} onChange={handleLoginChange} placeholder="Enter your password"
                                onKeyDown={(e) => e.key === 'Enter' && handleLogin()} />
                        </div>

                        <button className="auth-btn" onClick={handleLogin}
                            disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>

                        <p className="auth-switch">
                            Don't have an account?{' '}
                            <span onClick={() => { setActiveForm('signup'); setError(''); }}>
                                Sign Up here
                            </span>
                        </p>
                    </div>
                )}


                {/* ── SIGNUP FORM ── */}
                {activeForm === 'signup' && (
                    <div className="auth-form">
                        {/* Icon */}
                        <div className="auth-icon auth-icon--signup">
                            <svg width="28" height="28" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/></svg>
                        </div>

                        <h2>Create Account</h2>
                        <p>Join Mannat Caterers today!</p>

                        {error && <p className="auth-error">❌ {error}</p>}

                        <div className="auth-group">
                            <label htmlFor="signup-name">Full Name *</label>
                            <input id="signup-name" type="text" name="fullName" value={signupData.fullName} onChange={handleSignupChange} placeholder="Enter your full name" />
                        </div>

                        <div className="auth-group">
                            <label htmlFor="signup-email">Email *</label>
                            <input id="signup-email" type="email" name="email" value={signupData.email} onChange={handleSignupChange} placeholder="Enter your email" />
                        </div>

                        <div className="auth-group">
                            <label htmlFor="signup-phone">Phone *</label>
                            <input id="signup-phone" type="text" name="phone" value={signupData.phone} onChange={handleSignupChange} placeholder="Enter your phone number" />
                        </div>

                        <div className="auth-group">
                            <label htmlFor="signup-address">Address</label>
                            <input id="signup-address" type="text" name="address" value={signupData.address} onChange={handleSignupChange} placeholder="Enter your address" />
                        </div>

                        <div className="auth-group">
                            <label htmlFor="signup-password">Password *</label>
                            <input id="signup-password" type="password" name="password" value={signupData.password} onChange={handleSignupChange} placeholder="Min 6 characters" />
                        </div>

                        <div className="auth-group">
                            <label htmlFor="signup-confirm">Confirm Password *</label>
                            <input id="signup-confirm" type="password" name="confirmPassword" value={signupData.confirmPassword} onChange={handleSignupChange} placeholder="Repeat your password" />
                        </div>

                        <button className="auth-btn" onClick={handleSignup}
                            disabled={loading}>{loading ? 'Creating account...' : 'Sign Up'}</button>

                        <p className="auth-switch">
                            Already have an account?{' '}
                            <span onClick={() => { setActiveForm('login'); setError(''); }}>
                                Login here
                            </span>
                        </p>
                    </div>
                )}

            </div>
        </div>
    )
};


export default AuthModal;
