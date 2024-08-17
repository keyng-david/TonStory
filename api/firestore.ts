import * as admin from 'firebase-admin';

if (!process.env.FIREBASE_PROJECT_ID || !process.env.FIREBASE_PRIVATE_KEY || !process.env.FIREBASE_CLIENT_EMAIL) {
  console.error("Missing Firebase environment variables");
} else {
  console.log("Firebase environment variables loaded successfully");

  // Optional: Print the first few characters of the private key to ensure it's loaded
  console.log("FIREBASE_PRIVATE_KEY starts with:", process.env.FIREBASE_PRIVATE_KEY?.substring(0, 30));
}

try {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
  });

  console.log("Firebase Admin initialized successfully");
} catch (error) {
  console.error("Failed to initialize Firebase Admin:", error);
  throw error;
}

const firestore = admin.firestore();
firestore.settings({ ignoreUndefinedProperties: true });

export default firestore;