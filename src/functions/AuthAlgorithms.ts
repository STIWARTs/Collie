import AuthErrorMessage from 'authentication/AuthErrorMessage';
import { Home_Link } from 'routers/RouterLinks';
import {
  FirebaseAuth,
  _firebaseAuth,
  _firebaseStorage,
} from 'authentication/clientApp';

declare global {
  interface Window {
    recaptchaVerifier: _firebaseAuth.RecaptchaVerifier;
    confirmationResult: _firebaseAuth.ConfirmationResult;
  }
}

// Captcha

function configureCaptcha({
  ShowToast,
  ResetCaptcha,
  Loading,
}: RecaptchaProps) {
  if (typeof window === 'object') {
    if (ResetCaptcha) {
      window.recaptchaVerifier.render().then(function (widgetId: number) {
        window.grecaptcha.reset(widgetId);
      });
    } else {
      window.recaptchaVerifier = new _firebaseAuth.RecaptchaVerifier(
        FirebaseAuth,
        'verify-sign-in-recaptcha',
        {
          size: 'invisible',
          onClose: () => {
            Loading(false);
          },
          callback: () => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
          },
          'expired-callback': () => {
            Loading(false);
            ShowToast(
              'Recaptcha token expired',
              'Your recaptcha token has been expired, please refresh the page.',
              'Error',
              true,
            );
          },
          theme: 'dark',
          defaultCountry: 'IN',
        },
      );
    }
  }
}

// OTP

export async function ResentOTP({
  PhoneNumber,
  Loading,
  ShowToast,
}: ResendOTPProps) {
  Loading(true);
  window.recaptchaVerifier.render().then(function (widgetId: number) {
    window.grecaptcha.reset(widgetId);
  });
  const number = '+91' + PhoneNumber;
  const appVerifier = window.recaptchaVerifier;
  _firebaseAuth
    .signInWithPhoneNumber(FirebaseAuth, number, appVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      Loading(false);
      ShowToast(
        'OTP sent successfully',
        'An OTP has been sent to your phone number.',
        'Success',
        true,
      );
    })
    .catch((error) => {
      Loading(false);
      const message = AuthErrorMessage(error.code);
      ShowToast(
        'Something went wrong',
        message
          ? message
          : 'There is an error from server side of authentication.',
        'Error',
        true,
      );
    });
}

export async function VerifyOTP({
  OTP,
  Redirect,
  Loading,
  EmptyOTPBox,
  ShowToast,
  CreateDateBase,
}: VerifyOTPProps) {
  Loading(true);
  const code = OTP.toString();
  const credential = _firebaseAuth.PhoneAuthProvider.credential(
    window.confirmationResult.verificationId,
    code,
  );
  _firebaseAuth
    .signInWithCredential(FirebaseAuth, credential)
    .then((result) => {
      const getAdditionalUserInfo = _firebaseAuth.getAdditionalUserInfo(result);
      if (getAdditionalUserInfo) {
        const IsNewUser = getAdditionalUserInfo.isNewUser;
        const user = FirebaseAuth.currentUser;
        if (user) {
          if (IsNewUser) CreateDateBase(user.uid);
          else {
            Loading(false);
            ShowToast(
              'Authentication Successful !',
              'You have successfully login into your emotion account.',
              'Success',
              true,
            );
            Redirect(Home_Link);
          }
        }
      }
    })
    .catch((error) => {
      Loading(false);
      const message = AuthErrorMessage(error.code);
      if (message == 'Invalid verification code') EmptyOTPBox();
      ShowToast(
        'Something went wrong',
        message ? message : error.message, // 'There is an error from server side of authentication.',
        'Error',
        true,
      );
    });
}

export async function PasswordReset({
  EmailAddress,
  Loading,
  ShowToast,
  Next,
}: PasswordResentProps) {
  Loading(true);
  _firebaseAuth
    .sendPasswordResetEmail(FirebaseAuth, EmailAddress)
    .then(() => {
      Loading(false);
      ShowToast(
        'Password reset link sent successfully',
        'A link to reset your password has been sent to your email address.',
        'Success',
        true,
      );
      Next();
    })
    .catch((error) => {
      Loading(false);
      const message = AuthErrorMessage(error.code);
      ShowToast(
        'Something went wrong',
        message
          ? message
          : 'There is an error from server side of authentication.',
        'Error',
        true,
      );
    });
}

export async function ConfirmPasswordReset({
  oobCode,
  Password,
  EmptyPassword,
  Loading,
  ShowToast,
  Next,
}: ConfirmPasswordResetProps) {
  Loading(true);
  _firebaseAuth
    .verifyPasswordResetCode(FirebaseAuth, oobCode)
    .then((email) =>
      _firebaseAuth
        .confirmPasswordReset(FirebaseAuth, oobCode, Password)
        .then(() =>
          _firebaseAuth
            .signInWithEmailAndPassword(FirebaseAuth, email, Password)
            .then(() => {
              Loading(false);
              Next();
            })
            .catch((error) => {
              Loading(false);
              EmptyPassword();
              const message = AuthErrorMessage(error.code);
              ShowToast(
                'Something went wrong',
                message
                  ? message
                  : 'There is an error from server side of authentication.',
                'Error',
                true,
              );
            }),
        )
        .catch((error) => {
          Loading(false);
          EmptyPassword();
          const message = AuthErrorMessage(error.code);
          ShowToast(
            'Something went wrong',
            message
              ? message
              : 'There is an error from server side of authentication.',
            'Error',
            true,
          );
        }),
    )
    .catch((error) => {
      Loading(false);
      EmptyPassword();
      const message = AuthErrorMessage(error.code);
      ShowToast(
        'Something went wrong',
        message
          ? message
          : 'There is an error from server side of authentication.',
        'Error',
        true,
      );
    });
}

export async function ConfirmVerifyEmailAddress({
  oobCode,
  Screen,
  Loading,
  ShowToast,
  Updatedatabase,
}: ConfirmVerifyEmailAddressProps) {
  Loading(true);
  Screen(null);
  const user = FirebaseAuth.currentUser;
  if (user) {
    _firebaseAuth
      .applyActionCode(FirebaseAuth, oobCode)
      .then(() =>
        user
          .reload()
          .then(() => user.getIdToken(true).then(() => Updatedatabase())),
      )
      .catch((error) => {
        Loading(false);
        Screen('Error');
        const message = AuthErrorMessage(error.code);
        ShowToast(
          'Something went wrong',
          message
            ? message
            : 'There is an error from server side of authentication.',
          'Error',
          true,
        );
      });
  }
}

// SignIn

export async function SignInWithPhoneNumber({
  PhoneNumber,
  EmptyPhoneNumber,
  ResetCaptcha,
  setResetCaptcha,
  Loading,
  MoveToOTPScreen,
  ShowToast,
}: SignInWithPhoneNumberProps) {
  Loading(true);
  configureCaptcha({
    ShowToast: ShowToast,
    ResetCaptcha: ResetCaptcha,
    Loading: Loading,
  });
  const number = '+91' + PhoneNumber;
  const appVerifier = window.recaptchaVerifier;
  _firebaseAuth
    .signInWithPhoneNumber(FirebaseAuth, number, appVerifier)
    .then((confirmationResult) => {
      window.confirmationResult = confirmationResult;
      // ShowToast(
      //   'OTP sent successfully',
      //   'An OTP has been sent to your phone number.',
      //   'Success',
      //   true
      // );
      MoveToOTPScreen();
      Loading(false);
    })
    .catch((error) => {
      Loading(false);
      const message = AuthErrorMessage(error.code);
      ShowToast(
        'Something went wrong',
        message
          ? message
          : 'There is an error from server side of authentication.',
        'Error',
        true,
      );
      EmptyPhoneNumber();
      setResetCaptcha(true);
    });
}

export async function SignInWithEmailAndPassword({
  EmailAddress,
  Password,
  EmptyPasswordTextField,
  Loading,
  Redirect,
  BackToEmailScreen,
  ShowToast,
}: SignInWithEmailAndPasswordProps) {
  Loading(true);
  _firebaseAuth
    .signInWithEmailAndPassword(FirebaseAuth, EmailAddress, Password)
    .then(() => {
      Loading(false);
      Redirect(Home_Link);
    })
    .catch((error) => {
      BackToEmailScreen();
      Loading(false);
      const message = AuthErrorMessage(error.code);
      ShowToast(
        'Something went wrong',
        message
          ? message
          : 'There is an error from server side of authentication.',
        'Error',
        true,
      );
      EmptyPasswordTextField();
    });
}

// other account

export async function SignInWithFacebook({
  Loading,
  ShowToast,
  CreateDateBase,
  Checkdatabase,
}: SignInWithOtherAccountsProps) {
  const facebookProvider = new _firebaseAuth.FacebookAuthProvider();
  Loading(true);
  _firebaseAuth
    .signInWithPopup(FirebaseAuth, facebookProvider)
    .then((result) => {
      const getAdditionalUserInfo = _firebaseAuth.getAdditionalUserInfo(result);
      if (getAdditionalUserInfo) {
        const IsNewUser = getAdditionalUserInfo.isNewUser;
        const user = FirebaseAuth.currentUser;
        if (user) {
          if (IsNewUser) {
            CreateDateBase({
              Uid: user.uid,
              displayName: user.displayName,
              email: user.email,
              phoneNumber: user.phoneNumber,
              photoURL: user.photoURL,
              emailVerified: user.emailVerified,
            });
          } else {
            Checkdatabase({
              Uid: user.uid,
              displayName: user.displayName,
              email: user.email,
              phoneNumber: user.phoneNumber,
              photoURL: user.photoURL,
              emailVerified: user.emailVerified,
            });
          }
          // LoadingScreen(true);
          // Loading(false);
          // Router.push(Home_Link);
        }
      }
    })
    .catch((error) => {
      Loading(false);
      const message = AuthErrorMessage(error.code);
      ShowToast(
        'Something went wrong',
        message
          ? message
          : 'There is an error from server side of authentication.',
        'Error',
        true,
      );
    });
}

export async function SignInWithGoogle({
  Loading,
  ShowToast,
  CreateDateBase,
  Checkdatabase,
}: SignInWithOtherAccountsProps) {
  const googleProvider = new _firebaseAuth.GoogleAuthProvider();
  Loading(true);
  _firebaseAuth
    .signInWithPopup(FirebaseAuth, googleProvider)
    .then((result) => {
      const getAdditionalUserInfo = _firebaseAuth.getAdditionalUserInfo(result);
      if (getAdditionalUserInfo) {
        const IsNewUser = getAdditionalUserInfo.isNewUser;
        const user = FirebaseAuth.currentUser;
        if (user) {
          if (IsNewUser) {
            CreateDateBase({
              Uid: user.uid,
              displayName: user.displayName,
              email: user.email,
              phoneNumber: user.phoneNumber,
              photoURL: user.photoURL,
              emailVerified: user.emailVerified,
            });
          } else {
            Checkdatabase({
              Uid: user.uid,
              displayName: user.displayName,
              email: user.email,
              phoneNumber: user.phoneNumber,
              photoURL: user.photoURL,
              emailVerified: user.emailVerified,
            });
          }
          // LoadingScreen(true);
          // Loading(false);
          // Router.push(Home_Link);
        }
      }
    })
    .catch((error) => {
      Loading(false);
      const message = AuthErrorMessage(error.code);
      ShowToast(
        'Something went wrong',
        message
          ? message
          : 'There is an error from server side of authentication.',
        'Error',
        true,
      );
    });
}

export async function SignInWithApple({
  Loading,
  ShowToast,
  CreateDateBase,
  Checkdatabase,
}: SignInWithOtherAccountsProps) {
  const appleProvider = new _firebaseAuth.OAuthProvider('apple.com');
  Loading(true);
  _firebaseAuth
    .signInWithPopup(FirebaseAuth, appleProvider)
    .then((result) => {
      const getAdditionalUserInfo = _firebaseAuth.getAdditionalUserInfo(result);
      if (getAdditionalUserInfo) {
        const IsNewUser = getAdditionalUserInfo.isNewUser;
        const user = FirebaseAuth.currentUser;
        if (user) {
          if (IsNewUser) {
            CreateDateBase({
              Uid: user.uid,
              displayName: user.displayName,
              email: user.email,
              phoneNumber: user.phoneNumber,
              photoURL: user.photoURL,
              emailVerified: user.emailVerified,
            });
          } else {
            Checkdatabase({
              Uid: user.uid,
              displayName: user.displayName,
              email: user.email,
              phoneNumber: user.phoneNumber,
              photoURL: user.photoURL,
              emailVerified: user.emailVerified,
            });
          }
          // LoadingScreen(true);
          // Loading(false);
          // Router.push(Home_Link);
        }
      }
    })
    .catch((error) => {
      Loading(false);
      const message = AuthErrorMessage(error.code);
      ShowToast(
        'Something went wrong',
        message
          ? message
          : 'There is an error from server side of authentication.',
        'Error',
        true,
      );
    });
}

export async function SignInWithMicrosoft({
  Loading,
  ShowToast,
  CreateDateBase,
  Checkdatabase,
}: SignInWithOtherAccountsProps) {
  const microsoftProvider = new _firebaseAuth.OAuthProvider('microsoft.com');
  Loading(true);
  _firebaseAuth
    .signInWithPopup(FirebaseAuth, microsoftProvider)
    .then((result) => {
      const getAdditionalUserInfo = _firebaseAuth.getAdditionalUserInfo(result);
      if (getAdditionalUserInfo) {
        const IsNewUser = getAdditionalUserInfo.isNewUser;
        const user = FirebaseAuth.currentUser;
        if (user) {
          if (IsNewUser) {
            CreateDateBase({
              Uid: user.uid,
              displayName: user.displayName,
              email: user.email,
              phoneNumber: user.phoneNumber,
              photoURL: user.photoURL,
              emailVerified: user.emailVerified,
            });
          } else {
            Checkdatabase({
              Uid: user.uid,
              displayName: user.displayName,
              email: user.email,
              phoneNumber: user.phoneNumber,
              photoURL: user.photoURL,
              emailVerified: user.emailVerified,
            });
          }
          // LoadingScreen(true);
          // Loading(false);
          // Router.push(Home_Link);
        }
      }
    })
    .catch((error) => {
      Loading(false);
      const message = AuthErrorMessage(error.code);
      ShowToast(
        'Something went wrong',
        message
          ? message
          : 'There is an error from server side of authentication.',
        'Error',
        true,
      );
    });
}

// Sign Up

export async function AddFullName({
  FullName,
  Loading,
  ShowToast,
  Updatedatabase,
}: AddFullNameProps) {
  Loading(true);
  const user = FirebaseAuth.currentUser;
  if (user) {
    _firebaseAuth
      .updateProfile(user, {
        displayName: FullName,
      })
      .then(() => Updatedatabase())
      .catch((error) => {
        Loading(false);
        const message = AuthErrorMessage(error.code);
        ShowToast(
          'Something went wrong',
          message
            ? message
            : 'There is an error from server side of authentication.',
          'Error',
          true,
        );
      });
  }
}

export async function VerifyEmailAddress({
  Loading,
  ShowToast,
  Next,
}: VerifyEmailProps) {
  Loading(true);
  const user = FirebaseAuth.currentUser;
  if (user) {
    _firebaseAuth
      .sendEmailVerification(user)
      .then(() => {
        Loading(false);
        ShowToast(
          'Email verification link sent successfully',
          'A link to verify your email has been sent to your email address.',
          'Success',
          true,
        );
        Next();
      })
      .catch((error) => {
        Loading(false);
        const message = AuthErrorMessage(error.code);
        ShowToast(
          'Something went wrong',
          message
            ? message
            : 'There is an error from server side of authentication.',
          'Error',
          true,
        );
      });
  }
}

export async function LinkWithEmailAndPassword({
  EmailAddress,
  Password,
  ShowToast,
  Loading,
  EmptyPasswordTextField,
  BackToEmailScreen,
  Next,
}: LinkWithEmailAndPasswordProps) {
  Loading(true);
  const user = FirebaseAuth.currentUser;
  const credential = _firebaseAuth.EmailAuthProvider.credential(
    EmailAddress,
    Password,
  );
  if (user) {
    _firebaseAuth
      .linkWithCredential(user, credential)
      .then(() => Next())
      .catch((error) => {
        Loading(false);
        BackToEmailScreen();
        EmptyPasswordTextField();
        const message = AuthErrorMessage(error.code);
        ShowToast(
          'Something went wrong',
          message
            ? message
            : 'There is an error from server side of authentication.',
          'Error',
          true,
        );
      });
  }
}

export async function LinkWithPhoneNumber({
  PhoneNumber,
  EmptyPhoneNumber,
  ResetCaptcha,
  setResetCaptcha,
  Updatedatabase, // MoveToOTPScreen
  ShowToast,
  Loading,
}: LinkWithPhoneNumberProps) {
  Loading(true);
  configureCaptcha({
    ShowToast: ShowToast,
    ResetCaptcha: ResetCaptcha,
    Loading: Loading,
  });
  const number = '+91' + PhoneNumber;
  const appVerifier = window.recaptchaVerifier;
  const user = FirebaseAuth.currentUser;
  if (user) {
    _firebaseAuth
      .linkWithPhoneNumber(user, number, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        // ShowToast(
        //   'OTP sent successfully',
        //   'An OTP has been sent to your phone number.',
        //   'Success',
        //   true
        // );
        Updatedatabase();
      })
      .catch((error) => {
        Loading(false);
        const message = AuthErrorMessage(error.code);
        ShowToast(
          'Something went wrong',
          message
            ? message
            : 'There is an error from server side of authentication.',
          'Error',
          true,
        );
        EmptyPhoneNumber();
        setResetCaptcha(true);
      });
  }
}

export async function VerifyOTPForLinkWithPhone({
  OTP,
  EmptyOTPBox,
  Loading,
  ShowToast,
  Updatedatabase,
}: VerifyOTPForLinkWithPhoneProps) {
  Loading(true);
  const code = OTP.toString();
  const user = FirebaseAuth.currentUser;
  const credential = _firebaseAuth.PhoneAuthProvider.credential(
    window.confirmationResult.verificationId,
    code,
  );
  if (user) {
    _firebaseAuth
      .linkWithCredential(user, credential)
      .then(() => Updatedatabase())
      .catch((error) => {
        Loading(false);
        const message = AuthErrorMessage(error.code);
        if (message == 'Invalid verification code') EmptyOTPBox();
        ShowToast(
          'Something went wrong',
          message
            ? message
            : 'There is an error from server side of authentication.',
          'Error',
          true,
        );
      });
  }
}

export async function ResentOTPForLinkWithPhone({
  PhoneNumber,
  Loading,
  ShowToast,
}: ResendOTPProps) {
  Loading(true);
  window.recaptchaVerifier.render().then(function (widgetId: number) {
    window.grecaptcha.reset(widgetId);
  });
  const number = '+91' + PhoneNumber;
  const appVerifier = window.recaptchaVerifier;
  const user = FirebaseAuth.currentUser;
  if (user) {
    _firebaseAuth
      .linkWithPhoneNumber(user, number, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        Loading(false);
        ShowToast(
          'OTP sent successfully',
          'An OTP has been sent to your phone number.',
          'Success',
          true,
        );
      })
      .catch((error) => {
        Loading(false);
        const message = AuthErrorMessage(error.code);
        ShowToast(
          'Something went wrong',
          message
            ? message
            : 'There is an error from server side of authentication.',
          'Error',
          true,
        );
      });
  }
}

// Avatar

export async function UploadAvatar({
  Progress,
  File,
  Loading,
  ShowToast,
  UpdatedatabaseWithURL,
}: UploadAvatarProps) {
  if (File) {
    Loading(true);
    const user = FirebaseAuth.currentUser;
    if (user) {
      const metadata = {
        contentType: 'image/png',
      };
      const extension = File.type.split('/')[1];
      const storage = _firebaseStorage.getStorage();
      const storageRef = _firebaseStorage.ref(
        storage,
        `userAvatar/${user.uid}/profilePhoto.${extension}`,
      );
      const uploadTask = _firebaseStorage.uploadBytesResumable(
        storageRef,
        File,
        metadata,
      );
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const pct = (
            (snapshot.bytesTransferred / snapshot.totalBytes) *
            100
          ).toFixed(0);
          Progress(pct);
        },
        (error) => {
          Loading(false);
          const message = AuthErrorMessage(error.code);
          ShowToast(
            'Something went wrong',
            message
              ? message
              : 'There is an error from server side of authentication.',
            'Error',
            true,
          );
        },
        () => {
          _firebaseStorage
            .getDownloadURL(uploadTask.snapshot.ref)
            .then((url) => {
              _firebaseAuth
                .updateProfile(user, {
                  photoURL: url,
                })
                .then(() => UpdatedatabaseWithURL(url))
                .catch((error) => {
                  Loading(false);
                  const message = AuthErrorMessage(error.code);
                  ShowToast(
                    'Something went wrong',
                    message
                      ? message
                      : 'There is an error from server side of authentication.',
                    'Error',
                    true,
                  );
                });
            });
        },
      );
    } else {
      Loading(false);
      ShowToast(
        'Something went wrong',
        'The user is currently not signed in.',
        'Error',
        true,
      );
    }
  } else {
    Loading(false);
    ShowToast('Check file', 'File not found.', 'Error', true);
  }
}

export async function DeleteAvatar({
  AvatarURL,
  DeletePhotoURLFromdatabase,
  Loading,
  ShowToast,
}: DeleteAvatarProps) {
  if (AvatarURL) {
    Loading(true);
    const user = FirebaseAuth.currentUser;
    if (user) {
      const storage = _firebaseStorage.getStorage();
      const avatarRef = _firebaseStorage.ref(storage, AvatarURL);
      _firebaseStorage
        .deleteObject(avatarRef)
        .then(() => {
          _firebaseAuth
            .updateProfile(user, {
              photoURL: '',
            })
            .then(() => DeletePhotoURLFromdatabase())
            .catch((error) => {
              Loading(false);
              const message = AuthErrorMessage(error.code);
              ShowToast(
                'Something went wrong',
                message
                  ? message
                  : 'There is an error from server side of authentication.',
                'Error',
                true,
              );
            });
        })
        .catch((error) => {
          Loading(false);
          const message = AuthErrorMessage(error.code);
          ShowToast(
            'Something went wrong',
            message
              ? message
              : 'There is an error from server side of authentication.',
            'Error',
            true,
          );
        });
    } else {
      Loading(false);
      ShowToast(
        'Something went wrong',
        'The user is currently not signed in.',
        'Error',
        true,
      );
    }
  } else {
    Loading(false);
    ShowToast('Check avatar', 'Avatar not found.', 'Error', true);
  }
}

export async function SignOut({ Next }: SignOutProps) {
  const user = FirebaseAuth.currentUser;
  if (user) _firebaseAuth.signOut(FirebaseAuth).then(() => Next());
}

export async function DeleteAccount({
  Deletedatabase,
  ShowToast,
  Loading,
}: DeleteAccountProps) {
  const user = FirebaseAuth.currentUser;
  if (user) {
    Loading(true);
    const _uid = user.uid;
    _firebaseAuth
      .deleteUser(user)
      .then(() => Deletedatabase(_uid))
      .catch((error) => {
        Loading(false);
        const message = AuthErrorMessage(error.code);
        ShowToast(
          'Something went wrong',
          message
            ? message
            : 'There is an error from server side of authentication.',
          'Error',
          true,
        );
      });
  } else {
    Loading(false);
    ShowToast('User not found', 'User is not signed it.', 'Error', true);
  }
}
