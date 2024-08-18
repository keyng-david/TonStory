import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET || 'your_secret_key';

export const auth = (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("Request to: ", req.url);
    console.log('Running JWT auth middleware');

    if (req.url === '/telegram-bot-update') {
      return next();
    }

    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Authorization token missing' });
    }

    try {
      const decoded = jwt.verify(token, secretKey);
      res.locals.user = decoded;  // Store the decoded token data for later use
      console.log('Successfully verified JWT token');
      next();
    } catch (error) {
      console.error('Invalid or expired JWT token:', error);
      return res.status(401).json({ error: 'Unauthorized' });
    }
  } catch (error) {
    console.error('Error in JWT authentication middleware:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};