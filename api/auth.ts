import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || 'your_secret_key';

export const createJWTToken = (payload: { id: string; [key: string]: any }): string => {
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};

export const verifyJWTToken = (token: string): { id: string; [key: string]: any } => {
  try {
    return jwt.verify(token, secretKey) as { id: string; [key: string]: any };
  } catch (error) {
    throw new Error('Invalid or expired token');
  }
};