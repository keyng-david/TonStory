import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || 'your_secret_key'; // Store secret key in environment variables

/**
 * Creates a JWT token.
 * @param {{ id: string; [key: string]: any }} payload - The payload to encode in the JWT.
 * @returns {string} The generated JWT token.
 */
export const createJWTToken = (payload) => {
  return jwt.sign(payload, secretKey, { expiresIn: '1h' }); // Token expires in 1 hour
};

/**
 * Verifies a JWT token.
 * @param {string} token - The JWT token to verify.
 * @returns {{ id: string; [key: string]: any }} The decoded payload.
 * @throws Will throw an error if the token is invalid or expired.
 */
export const verifyJWTToken = (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};