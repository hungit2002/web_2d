const bcrypt = require('bcryptjs');
const { generateToken } = require('../config/jwt');
const { sendVerificationEmail } = require('../config/email');
const { saveVerificationCode, verifyCode } = require('./redis.service');
const db = require('../models');
const { Op } = require('sequelize');

const generateRandomCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const login = async (email, password) => {
  const user = await db.User.findOne({
    where: { email },
  });

  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  const token = generateToken({ id: user.id, email: user.email });

  return {
    user: {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      phone: user.phone,
    },
    token,
  };
};

const register = async (userData) => {
  const { email, phone } = userData;

  // Check if email or phone already exists
  const existingUser = await db.User.findOne({
    where: {
      [Op.or]: [{ email }, { phone }],
    },
  });

  if (existingUser) {
    throw new Error('Email or phone number already exists');
  }

  // Generate verification code
  const code = generateRandomCode();

  // Save code to Redis
  await saveVerificationCode(email, code);

  // Send verification email
  await sendVerificationEmail(email, code);

  return { message: 'Verification code sent successfully' };
};

const verifyAndCompleteRegistration = async (email, code, userData) => {
  // Verify code
  const isValid = await verifyCode(email, code);
  if (!isValid) {
    throw new Error('Invalid or expired verification code');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  // Create user
  const user = await db.User.create({
    ...userData,
    password: hashedPassword,
  });

  // Generate token
  const token = generateToken({ id: user.id, email: user.email });

  return {
    user: {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      phone: user.phone,
    },
    token,
  };
};

module.exports = {
  login,
  register,
  verifyAndCompleteRegistration,
}; 