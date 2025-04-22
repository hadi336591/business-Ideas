// backend/models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String },
    authProvider: { type: String, default: 'local' }, // 'local', 'google', 'facebook'
    avatar: String,
    competitions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Competition' }],
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    }    
  },
  { timestamps: true }
);

export default mongoose.model('User', userSchema);
