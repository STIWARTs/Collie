import { TagForUserProfile } from 'databases/TagDB';
import {
  instanceOfErrorOverUserProfile,
  instanceOfUserProfileOverError,
} from 'utils/intanceOf';

// Change the API URL to your development environment URL when needed
const FETCH_API =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3000/api/users/profile'
    : 'https://emotionoutfit.vercel.app/api/users/profile';

export async function FetchUserProfile(uid: string | undefined) {
  if (!uid) {
    return {
      userProfile: undefined,
      error: {
        name: 'UID is not available',
        message: 'Failed to fetch user from database.',
      } as IError,
    };
  }

  try {
    const _response = await fetch(`${FETCH_API}/${uid}`, {
      cache: 'no-cache',
      next: {
        tags: [TagForUserProfile],
      },
    });

    if (!_response.ok) {
      return {
        userProfile: undefined,
        error: {
          name: 'API Error',
          message: `Failed to fetch user data. Status: ${_response.status}`,
        } as IError,
      };
    }

    const _data: IUserProfile | IError = await _response.json();
    const userProfile = instanceOfUserProfileOverError(_data)
      ? (_data as IUserProfile)
      : undefined;
    const error = instanceOfErrorOverUserProfile(_data)
      ? (_data as IError)
      : undefined;

    return { userProfile, error };
  } catch (error) {
    console.error('Fetch error:', error);
    return {
      userProfile: undefined,
      error: {
        name: 'Network Error',
        message:
          'Failed to connect to the server. Please check your internet connection.',
      } as IError,
    };
  }
}
