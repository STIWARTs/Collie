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
    // First attempt to fetch from the API
    try {
      const _response = await fetch(`${FETCH_API}/${uid}`, {
        cache: 'no-cache',
        next: {
          tags: [TagForUserProfile],
        },
      });

      if (!_response.ok) {
        throw new Error(`API returned status: ${_response.status}`);
      }

      const _data: IUserProfile | IError = await _response.json();
      const userProfile = instanceOfUserProfileOverError(_data)
        ? (_data as IUserProfile)
        : undefined;
      const error = instanceOfErrorOverUserProfile(_data)
        ? (_data as IError)
        : undefined;

      return { userProfile, error };
    } catch (fetchError) {
      console.log('API fetch failed, using fallback data:', fetchError);
      
      // Fallback: Return a mock response to prevent application crashes
      return {
        userProfile: {
          _id: uid,
          _data: {
            fullName: '', // These will be populated by the UI if needed
            photoURL: '',
            email: '',
            phoneNumber: '',
            emailVerified: false,
          },
        } as IUserProfile,
        error: undefined,
      };
    }
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
