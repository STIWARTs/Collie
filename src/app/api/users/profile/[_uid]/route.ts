import { NextResponse } from 'next/server';

// GET (get a user) : https://collie.vercel.app/api/users/profile/[_uid]
export async function GET(
  request: Request,
  { params }: { params: { _uid: string } },
) {
  try {
    // Temporary mock response since user profile module is missing
    const mockUserProfile = {
      id: params._uid,
      name: 'User Name',
      email: 'user@example.com',
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json({ data: mockUserProfile });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch user profile' },
      { status: 500 },
    );
  }
}
