'use client';

import { useSearchParams } from 'next/navigation';
import { Button } from '@mui/material';
import { useRouter } from 'next/navigation';

// Dynamic config
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0f0f0f] p-4">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-[#181818] p-8 text-center">
        <h2 className="text-3xl font-bold text-white">Authentication Error</h2>
        <p className="mt-2 text-gray-400">
          {error === 'AccessDenied'
            ? 'You do not have permission to sign in.'
            : 'There was an error signing in. Please try again.'}
        </p>
        <Button
          variant="contained"
          onClick={() => router.push('/auth/signin')}
          className="mt-4 bg-blue-600 text-white hover:bg-blue-700"
          sx={{ textTransform: 'none' }}
        >
          Back to Sign In
        </Button>
      </div>
    </div>
  );
}
