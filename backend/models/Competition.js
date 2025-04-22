import mongoose from 'mongoose';

const competitionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  rules: String,
  entryFee: { type: Number, required: true },
  prize: { type: Number, required: true },
  deadline: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Competition = mongoose.model('Competition', competitionSchema);
export default Competition;
