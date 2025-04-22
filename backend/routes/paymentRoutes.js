import express from 'express';
import Stripe from 'stripe';
import { requireAuth } from '../middleware/authMiddleware.js';
import Competition from '../models/Competition.js';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/create-checkout-session', requireAuth, async (req, res) => {
  const { competitionId } = req.body;

  const competition = await Competition.findById(competitionId);
  if (!competition) return res.status(404).json({ message: 'Competition not found' });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/submit-success?competitionId=${competition._id}`,
    cancel_url: `${process.env.CLIENT_URL}/competitions`,
    customer_email: req.user.email,
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: {
          name: competition.title,
        },
        unit_amount: competition.entryFee * 100,
      },
      quantity: 1,
    }],
  });

  res.json({ url: session.url });
});

export default router;
