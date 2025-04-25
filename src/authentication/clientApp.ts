import * as _firebaseApp from 'firebase/app';
import * as _firebaseAuth from 'firebase/auth';
import * as _firebaseStorage from 'firebase/storage';

// Validate that required environment variables are set
const validateEnvVars = () => {
  const requiredVars = [
    'NEXT_PUBLIC_FIREBASE_API_KEY',
    'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
    'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
    'NEXT_PUBLIC_FIREBASE_APP_ID',
  ];

  const missingVars = requiredVars.filter((varName) => !process.env[varName]);

  if (missingVars.length > 0) {
    console.error(
      `Missing required Firebase environment variables: ${missingVars.join(
        ', ',
      )}`,
    );
    // In development, throw an error. In production, log the error but continue
    if (process.env.NODE_ENV !== 'production') {
      throw new Error(
        `Missing required Firebase environment variables: ${missingVars.join(
          ', ',
        )}`,
      );
    }
  }
};

// Call validation in client code
if (typeof window !== 'undefined') {
  validateEnvVars();
}

const CLIENT_FIREBASE_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Only initialize Firebase if we have the required configuration
let FirebaseApp;
let FirebaseAuth;

try {
  FirebaseApp =
    _firebaseApp.getApps().length === 0
      ? _firebaseApp.initializeApp(CLIENT_FIREBASE_CONFIG)
      : _firebaseApp.getApps()[0];
  FirebaseAuth = _firebaseAuth.getAuth(FirebaseApp);
} catch (error) {
  console.error('Failed to initialize Firebase:', error);
  // Create placeholder objects to prevent app crashes
  FirebaseApp = null;
  FirebaseAuth = null;
}

export {
  FirebaseApp,
  FirebaseAuth,
  _firebaseApp,
  _firebaseAuth,
  _firebaseStorage,
};
