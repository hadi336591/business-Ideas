// backend/controllers/authController.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const createToken = (user) =>
  jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already in use' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    const token = createToken(user);
    res
      .cookie('token', token, { httpOnly: true })
      .status(201)
      .json({ user, token });
  } catch (err) {
    res.status(500).json({ message: 'Error registering user' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.authProvider !== 'local')
      return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = createToken(user);
    res
      .cookie('token', token, { httpOnly: true })
      .json({ user, token });
  } catch (err) {
    res.status(500).json({ message: 'Login error' });
  }
};

export const logout = (req, res) => {
  res.clearCookie('token').json({ message: 'Logged out' });
};
