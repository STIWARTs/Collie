import * as _firebaseApp from 'firebase/app';
import * as _firebaseAuth from 'firebase/auth';
import * as _firebaseStorage from 'firebase/storage';

// Direct Firebase configuration - no more environment variable checks
const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyCxCqMtf3KmUYj37GOohCq8Fdry64jB5M4',
  authDomain: 'collie-4f281.firebaseapp.com',
  projectId: 'collie-4f281',
  storageBucket: 'collie-4f281.firebasestorage.app',
  messagingSenderId: '1077504263993',
  appId: '1:1077504263993:web:3c0a62af4b98fe3f930ae8',
  databaseURL: 'https://collie-4f281-default-rtdb.firebaseio.com',
};

// Remove environment variable validation completely for development
let FirebaseApp;
let FirebaseAuth;

try {
  FirebaseApp =
    _firebaseApp.getApps().length === 0
      ? _firebaseApp.initializeApp(FIREBASE_CONFIG)
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
