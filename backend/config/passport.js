// backend/config/passport.js
import passport from 'passport';
import GoogleStrategy from 'passport-google-oauth20';
// import FacebookStrategy from 'passport-facebook';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const createToken = (user) =>
  jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback',
    },
    async (_, __, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });
        if (!user) {
          user = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value,
            authProvider: 'google',
          });
        }
        user.token = createToken(user);
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: process.env.FACEBOOK_APP_ID,
//       clientSecret: process.env.FACEBOOK_APP_SECRET,
//       callbackURL: '/api/auth/facebook/callback',
//       profileFields: ['id', 'emails', 'name', 'displayName', 'photos'],
//     },
//     async (_, __, profile, done) => {
//       try {
//         const email = profile.emails?.[0]?.value;
//         let user = await User.findOne({ email });
//         if (!user) {
//           user = await User.create({
//             name: profile.displayName,
//             email,
//             avatar: profile.photos?.[0]?.value,
//             authProvider: 'facebook',
//           });
//         }
//         user.token = createToken(user);
//         done(null, user);
//       } catch (err) {
//         done(err, null);
//       }
//     }
//   )
// );
