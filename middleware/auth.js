const jwt = require('jsonwebtoken');
const { secretKey } = require('../config/auth');
const User = require('../models/User');

// Middleware untuk authentication
exports.authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.userId = decoded.userId;

    // Check if user still exists
    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(401).json({ msg: 'Invalid token' });
    }

    next();
  } catch (err) {
    res.status(401).json({ msg: 'Invalid token' });
  }
};

// Middleware untuk authorization berdasarkan role
exports.authRole = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role) {
      return res.status(403).json({ msg: 'Forbidden' });
    }

    next();
  };
};
