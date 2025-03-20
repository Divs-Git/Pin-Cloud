import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

export const getUser = async (req, res) => {
  const { username } = req.params;

  const user = await User.findOne({ username });

  const { hashedPassword, ...detailsWithPassword } = user.toObject();

  res.status(200).json(detailsWithPassword);
};

export const registerUser = async (req, res) => {
  const { username, displayName, email, password } = req.body;
  if (!username || !email || !password || !displayName) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  const newHashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    displayName,
    email,
    hashedPassword: newHashedPassword,
  });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  const { hashedPassword, ...detailsWithPassword } = user.toObject();

  res.status(201).json(detailsWithPassword);
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
  }

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  const isPasswordSame = await bcrypt.compare(password, user.hashedPassword);

  if (!isPasswordSame) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });

  const { hashedPassword, ...detailsWithPassword } = user.toObject();

  res.status(201).json(detailsWithPassword);
};

export const logoutUser = async (req, res) => {
  res.clearCookie('token');
  return res.status(200).json({ message: 'Logout successfully' });
};
