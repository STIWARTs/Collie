import * as _firebaseApp from 'firebase/app';
import * as _firebaseAuth from 'firebase/auth';
import * as _firebaseStorage from 'firebase/storage';

const CLIENT_FIREBASE_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const FirebaseApp =
  _firebaseApp.getApps().length === 0
    ? _firebaseApp.initializeApp(CLIENT_FIREBASE_CONFIG)
    : _firebaseApp.getApps()[0];
const FirebaseAuth = _firebaseAuth.getAuth(FirebaseApp);

export {
  FirebaseApp,
  FirebaseAuth,
  _firebaseApp,
  _firebaseAuth,
  _firebaseStorage,
};
