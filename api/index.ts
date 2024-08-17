import admin from 'firebase-admin';
import express, { Request, Response } from 'express';
import { updateLevel, updatePoints } from './player';
import { getScoreboard } from './scoreboard';
import { auth } from './middleware';
import { loadUserData } from './users';
import telegramBotUpdate from './telegram';

// Initialize Firebase Admin with environment variables
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    // Removed properties not needed by firebase-admin initialization
  }),
});

const app = express();

// Middleware and routes setup
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(require('cors')({ origin: true }));

// Define routes
app.get('/user-data', auth, loadUserData);
app.post('/update-points', auth, updatePoints);
app.post('/update-level', auth, updateLevel);
app.get('/scoreboard', auth, getScoreboard);
app.get('/test', (req: Request, res: Response) => res.send('OK'));

// Telegram bot update route
app.post('/telegram-bot-update', auth, telegramBotUpdate);

// Export the app as a Vercel Serverless Function
export default app;