// backend/routes/authRoutes.js
import express from 'express';
import passport from 'passport';
import {
  register,
  login,
  logout
} from '../controllers/authController.js';

const router = express.Router();

// Email auth
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    const token = req.user.token;
    res.redirect(`${process.env.CLIENT_URL}/oauth-success?token=${token}`);
  }
);

// Facebook OAuth
// router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
// router.get(
//   '/facebook/callback',
//   passport.authenticate('facebook', { session: false }),
//   (req, res) => {
//     const token = req.user.token;
//     res.redirect(`${process.env.CLIENT_URL}/oauth-success?token=${token}`);
//   }
// );

export default router;
