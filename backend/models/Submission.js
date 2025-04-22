import mongoose from 'mongoose';

const submissionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  competition: { type: mongoose.Schema.Types.ObjectId, ref: 'Competition', required: true },
  ideaTitle: { type: String, required: true },
  ideaDescription: { type: String, required: true },
  paid: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  status: { type: String, enum: ['submitted', 'under review', 'approved', 'rejected'], default: 'submitted' },
  isWinner: {
    type: Boolean,
    default: false,
  },
  feedback: {
    type: String,
  },
  
});

const Submission = mongoose.model('Submission', submissionSchema);
export default Submission;
