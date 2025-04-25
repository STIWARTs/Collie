'use client';

import nookies from 'nookies';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FirebaseAuth, _firebaseAuth } from 'authentication/clientApp';

export default function UseClientAuth() {
  const [FirebaseUser, FirebaseLoading, FirebaseError] =
    useAuthState(FirebaseAuth);

  useEffect(() => {
    if (!FirebaseAuth) {
      nookies.destroy(undefined, 'token');
      return;
    }
    return FirebaseAuth.onIdTokenChanged(async (user) => {
      if (!user) {
        nookies.destroy(undefined, 'token');
        return;
      }
      const token = await user.getIdToken();
      nookies.set(undefined, 'token', token, {
        sameSite: 'None',
        secure: true,
      });
    });
  }, []);

  // useEffect(() => {
  //   const handle = setInterval(async () => {
  //     const user = FirebaseAuth.currentUser;
  //     if (user) await user.getIdToken(true);
  //   }, 10 * 60 * 1000);
  //   return () => clearInterval(handle);
  // }, []);

  return { FirebaseUser, FirebaseLoading, FirebaseError };
}

export type ClientUserType = _firebaseAuth.User | null | undefined;
