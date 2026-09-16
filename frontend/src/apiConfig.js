// Central place for the backend's base URL.
//
// Locally this defaults to the dev backend on localhost:5000. When deploying
// (Render, Netlify, Hostinger, etc.), set REACT_APP_API_URL in that
// platform's environment variables to your deployed backend's public URL —
// e.g. https://your-backend.onrender.com — and every API call in the app
// picks it up automatically, no code changes needed per-environment.
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
