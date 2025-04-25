'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';
import Image from 'next/image';

export default function SignIn() {
  const router = useRouter();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signIn('google', {
        redirect: false,
        callbackUrl: '/account/profile',
      });

      if (result?.error) {
        console.error('Sign in error:', result.error);
      } else if (result?.url) {
        router.push(result.url);
      }
    } catch (error) {
      console.error('Sign in error:', error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0f0f0f] p-4">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-[#181818] p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
          <p className="mt-2 text-gray-400">Sign in to your account</p>
        </div>

        <Button
          fullWidth
          variant="contained"
          onClick={handleGoogleSignIn}
          className="flex items-center justify-center space-x-2 bg-white text-black hover:bg-gray-100"
          sx={{ textTransform: 'none', py: 1.5 }}
        >
          <Image
            src="/images/google-logo.png"
            alt="Google"
            width={20}
            height={20}
            className="mr-2"
          />
          Sign in with Google
        </Button>
      </div>
    </div>
  );
}
