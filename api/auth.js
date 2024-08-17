import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || 'your_secret_key'; // Store secret key in environment variables

export const createJWTToken = (payload) => {
  return jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Token expires in 1 hour
};

export const verifyJWTToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};