'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';

export default function SignIn() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    if (isLoading) return; // Prevent multiple clicks

    setIsLoading(true);
    try {
      // Add a console log to help debug
      console.log('Starting Google sign-in process');

      const result = await signIn('google', {
        redirect: false,
        callbackUrl: '/account/profile',
      });

      console.log('Sign-in result:', result);

      if (result?.error) {
        console.error('Sign in error:', result.error);
        // Show the error to the user
        alert(`Sign-in error: ${result.error}`);
      } else if (result?.url) {
        console.log('Redirecting to:', result.url);
        window.location.href = result.url;
      } else {
        console.log('Sign-in completed but no URL returned');
        // Fallback to direct navigation if no URL is returned
        window.location.href = '/account/profile';
      }
    } catch (error) {
      console.error('Sign in error:', error);
      // Show the error to the user
      alert(
        `Unexpected error during sign-in: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    } finally {
      setIsLoading(false);
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
          disabled={isLoading}
        >
          {isLoading ? (
            'Signing in...'
          ) : (
            <>
              <Image
                src="/images/google-logo.png"
                alt="Google"
                width={20}
                height={20}
                className="mr-2"
              />
              Sign in with Google
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
