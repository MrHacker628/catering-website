// middleware/requireAdmin.js
// Must run AFTER verifyToken — it needs req.user already set by that.
// Blocks any valid, logged-in-customer token from reaching admin-only
// routes; only a token issued by /auth/admin-login (role: 'admin') passes.

function requireAdmin(req, res, next) {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).json({
            message: "❌ Admin access required."
        });
    }
    next();
}

module.exports = requireAdmin;
