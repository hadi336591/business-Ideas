import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import passport from 'passport';
import './config/passport.js';
import competitionRoutes from './routes/competitionRoutes.js';
// import submissionRoutes from './routes/submissionRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
// import webhookRoutes from './routes/webhookRoutes.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';

dotenv.config();
const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/auth', authRoutes);
app.use('/api/competitions', competitionRoutes);
// app.use('/api/submissions', submissionRoutes);
app.use('/api/payments', paymentRoutes);
// app.use('/webhook', webhookRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error(err));