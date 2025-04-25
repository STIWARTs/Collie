'use server';

import * as _firebaseAdminUsingServer from 'firebase-admin';
import { applicationDefault } from 'firebase-admin/app';

export async function FirebaseAuthUsingServer() {
  if (!_firebaseAdminUsingServer.apps.length) {
    _firebaseAdminUsingServer.initializeApp({
      credential: applicationDefault(),
      databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    });
  }
  return _firebaseAdminUsingServer.auth();
}

// export  { _firebaseAdminUsingServer };
