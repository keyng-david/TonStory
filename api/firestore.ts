import * as admin from 'firebase-admin';

// Initialize Firebase Admin with environment variables
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    // Removed properties not needed by firebase-admin initialization
  }),
});

const firestore = admin.firestore();
firestore.settings({ ignoreUndefinedProperties: true });

export default firestore;