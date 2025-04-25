// backend/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const requireAuth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Not authenticated' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(401).json({ message: 'User not found' });

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && (req.user.role === 'admin' || req.user.isAdmin === true)) {
    return next();
  }
  res.status(403).json({ error: 'Access denied. Admins only.' });
};

