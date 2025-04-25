/* eslint-disable @next/next/no-async-client-component */
'use client';

import { ClientUserType } from 'authentication/UseClientAuth';
import { FetchUserProfile } from 'databases/helpers/Helper.FetchUserProfile';

interface IProps {
  Screen: ICheckInfoScreen;
  FirebaseUser: ClientUserType;
  FirebaseLoading: boolean;
  FirebaseError?: Error;
  setErrorType: Dispatch<AuthErrorType>;
  setScreen: Dispatch<AuthScreenType>;
  setMainScreen: Dispatch<AuthMainScreenType>;
  setToast: Dispatch<ToastSettingType>;
  setLoading: Dispatch<boolean>;
}

function determineNextScreen(
  userData: IUserProfileData,
  currentScreen: ICheckInfoScreen,
): AuthScreenType | null {
  const {
    fullName,
    phoneNumber,
    emailAddress,
    isVerified,
    photoURL,
    dateOfBirth,
    gender,
  } = userData;

  if (currentScreen === 'initial-login-load') {
    if (!fullName) return 'register-name';
    if (!phoneNumber) return 'register-phone';
    if (!emailAddress) return 'register-email';
    if (emailAddress && !isVerified?.emailAddress)
      return 'register-verify-email';
    if (!photoURL) return 'register-profile-picture';
    if (!dateOfBirth) return 'register-date-of-birth';
    if (!gender) return 'register-gender';
  } else {
    const firstSequence: string[] = [
      'register-name',
      'register-phone',
      'register-otp',
      'register-email',
      'register-password',
      'register-verify-email',
      'register-profile-picture',
      'register-date-of-birth',
      'register-gender',
    ];

    const secondSequenceMapping: { [key: string]: string } = {
      'after-name': 'register-name',
      'after-phone': 'register-phone',
      'after-email': 'register-email',
      'after-verify-email': 'register-verify-email',
      'after-profile-picture': 'register-profile-picture',
      'after-date-of-birth': 'register-date-of-birth',
      'after-gender': 'register-gender',
    };

    const fieldMissingChecks: { [key: string]: boolean } = {
      'register-name': !fullName,
      'register-phone': !phoneNumber,
      'register-email': !emailAddress,
      'register-profile-picture': !photoURL,
      'register-date-of-birth': !dateOfBirth,
      'register-gender': !gender,
    };

    const startingScreen = secondSequenceMapping[currentScreen];
    if (!startingScreen) {
      return null;
    }

    const startIndex = firstSequence.indexOf(startingScreen);

    for (let i = startIndex + 1; i < firstSequence.length; i++) {
      const screen = firstSequence[i];
      if (fieldMissingChecks[screen]) {
        return screen as AuthScreenType;
      }
    }
  }
  return null;
}

export default async function CheckInfoHandler({
  Screen,
  FirebaseUser,
  FirebaseLoading,
  FirebaseError,
  setErrorType,
  setScreen,
  setMainScreen,
  setToast,
  setLoading,
}: IProps) {
  try {
    if (FirebaseError) {
      setMainScreen('Error');
      setToast({
        Title: 'Something went wrong',
        Description: FirebaseError.message,
        Type: 'Error',
        Show: true,
      });
      return;
    }

    if (FirebaseLoading || !FirebaseUser) {
      setMainScreen('Error');
      setErrorType('get-user-failed');
      setToast({
        Title: 'Something went wrong',
        Description: 'User may be signed out or not exist.',
        Type: 'Error',
        Show: true,
      });
      return;
    }

    const result = await FetchUserProfile(FirebaseUser.uid);
    const userProfile = result?.userProfile?._data;

    if (!userProfile) {
      setMainScreen('Error');
      setErrorType('get-user-failed');
      setToast({
        Title: 'Something went wrong',
        Description:
          result.error?.message ||
          'Failed to fetch user profile from database.',
        Type: 'Error',
        Show: true,
      });
      return;
    }

    const nextScreen = determineNextScreen(userProfile, Screen);
    if (nextScreen) {
      setMainScreen('Setup');
      setScreen(nextScreen);
    } else {
      setMainScreen('Finish');
    }
  } catch (error) {
    setMainScreen('Error');
    setErrorType('get-user-failed');
    setToast({
      Title: 'Something went wrong',
      Description: error instanceof Error ? error.message : 'Unknown error',
      Type: 'Error',
      Show: true,
    });
  } finally {
    setLoading(false);
  }
}
