import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  competition: { type: mongoose.Schema.Types.ObjectId, ref: 'Competition', required: true },
  amount: { type: Number, required: true },
  paymentIntentId: { type: String, required: true },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Payment', paymentSchema);
