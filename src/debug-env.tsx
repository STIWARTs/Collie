'use client';

import { useEffect } from 'react';

export default function DebugEnv() {
  useEffect(() => {
    console.log('Environment variables debug:');
    console.log(
      'NEXT_PUBLIC_FIREBASE_API_KEY:',
      process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    );
    console.log(
      'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN:',
      process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    );
    console.log(
      'NEXT_PUBLIC_FIREBASE_PROJECT_ID:',
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    );
    console.log(
      'NEXT_PUBLIC_FIREBASE_APP_ID:',
      process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    );
  }, []);

  return null;
}
