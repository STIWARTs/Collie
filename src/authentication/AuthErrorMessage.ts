const AuthErrorMessage = (Code: string) => {
  switch (Code) {
    case 'auth/wrong-password':
      return 'Invalid password';

    case 'auth/claims-too-large':
      return 'The claims payload provided to setCustomUserClaims() exceeds the maximum allowed size of 1000 bytes';

    case 'auth/email-already-exists':
      return 'Email is already in use';

    case 'auth/id-token-expired':
      return 'ID token is expired';

    case 'auth/id-token-revoked':
      return 'ID token has been revoked';

    case 'auth/insufficient-permission':
      return 'The credential used to initialize the Admin SDK has insufficient permission to access the requested Authentication resource. Refer to Set up a Firebase project for documentation on how to generate a credential with appropriate permissions and use it to authenticate the Admin SDKs.';

    case 'auth/invalid-argument':
      return 'An invalid argument was provided to an Authentication method. The error message should contain additional information.';

    case 'auth/invalid-claims':
      return 'The custom claim attributes provided to setCustomUserClaims() are invalid.';

    case 'auth/invalid-creation-time':
      return 'The creation time must be a valid UTC date string.';

    case 'auth/invalid-disabled-field':
      return 'The provided value for the disabled user property is invalid. It must be a boolean.';

    case 'auth/invalid-display-name':
      return 'The provided value for the displayName user property is invalid. It must be a non-empty string.';

    case 'auth/invalid-email-verified':
      return 'The provided value for the emailVerified user property is invalid. It must be a boolean.';

    case 'auth/invalid-hash-algorithm':
      return 'The hash algorithm must match one of the strings in the list of supported functions.';

    case 'auth/invalid-hash-block-size':
      return 'The hash block size must be a valid number.';

    case 'auth/invalid-hash-derived-key-length':
      return 'The hash derived key length must be a valid number.';

    case 'auth/invalid-hash-key':
      return 'The hash key must a valid byte buffer.';

    case 'auth/invalid-hash-memory-cost':
      return 'The hash memory cost must be a valid number.';

    case 'auth/invalid-hash-parallelization':
      return 'The hash parallelization must be a valid number.';

    case 'auth/invalid-hash-rounds':
      return 'The hash rounds must be a valid number.';

    case 'auth/invalid-hash-salt-separator':
      return 'The hashing algorithm salt separator field must be a valid byte buffer.';

    case 'auth/invalid-id-token':
      return 'The provided ID token is not a valid Firebase ID token.';

    case 'auth/invalid-last-sign-in-time':
      return 'The last sign-in time must be a valid UTC date string.';

    case 'auth/invalid-page-token':
      return 'The provided next page token in listUsers() is invalid. It must be a valid non-empty string.';

    case 'auth/invalid-password':
      return 'Invalid password';

    case 'auth/invalid-password-hash':
      return 'The password hash must be a valid byte buffer.';

    case 'auth/invalid-password-salt':
      return 'The password salt must be a valid byte buffer';

    case 'auth/invalid-photo-url':
      return 'Invalid photo URL';

    case 'auth/invalid-provider-data':
      return 'The providerData must be a valid array of UserInfo objects.';

    case 'auth/invalid-oauth-responsetype':
      return 'Only exactly one OAuth responseType should be set to true.';

    case 'auth/invalid-session-cookie-duration':
      return 'The session cookie duration must be a valid number in milliseconds between 5 minutes and 2 weeks.';

    case 'auth/invalid-uid':
      return 'The provided uid must be a non-empty string with at most 128 characters.';

    case 'auth/invalid-user-import':
      return 'The user record to import is invalid.';

    case 'auth/maximum-user-count-exceeded':
      return 'The maximum allowed number of users to import has been exceeded.';

    case 'auth/missing-hash-algorithm':
      return 'Importing users with password hashes requires that the hashing algorithm and its parameters be provided.';

    case 'auth/missing-uid':
      return 'A uid identifier is required for the current operation.';

    case 'auth/missing-oauth-client-secret':
      return 'The OAuth configuration client secret is required to enable OIDC code flow.';

    case 'auth/phone-number-already-exists':
      return 'The provided phoneNumber is already in use by an existing user. Each user must have a unique phoneNumber.';

    case 'auth/project-not-found':
      return 'No Firebase project was found for the credential used to initialize the Admin SDKs. Refer to Set up a Firebase project for documentation on how to generate a credential for your project and use it to authenticate the Admin SDKs.';

    case 'auth/reserved-claims':
      return 'One or more custom user claims provided to setCustomUserClaims() are reserved. For example, OIDC specific claims such as (sub, iat, iss, exp, aud, auth_time, etc) should not be used as keys for custom claims.';

    case 'auth/session-cookie-expired':
      return 'The provided Firebase session cookie is expired.';

    case 'auth/session-cookie-revoked':
      return 'The Firebase session cookie has been revoked.';

    case 'auth/uid-already-exists':
      return 'UID is already in use';

    case 'auth/admin-restricted-operation':
      return 'This operation is restricted to administrators only.';

    case 'auth/app-not-authorized':
      return "This app, identified by the domain where it's hosted, is not authorized to use Firebase Authentication with the provided API key. Review your key configuration in the Google API console.";

    case 'auth/app-not-installed':
      return 'The requested mobile application corresponding to the identifier (Android package name or iOS bundle ID) provided is not installed on this device.';

    case 'auth/captcha-check-failed':
      return 'reCAPTCHA response token is invalid';

    case 'auth/code-expired':
      return 'Code has expired';

    case 'auth/cordova-not-ready':
      return 'Cordova framework is not ready.';

    case 'auth/cors-unsupported':
      return 'Browser is not supported.';

    case 'auth/credential-already-in-use':
      return 'Credential is already in use';

    case 'auth/custom-token-mismatch':
      return 'The custom token corresponds to a different audience.';

    case 'auth/requires-recent-login':
      return 'This action requires recent authentication. Please log in again and try again.';

    case 'auth/dependent-sdk-initialized-before-auth':
      return 'Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK.';

    case 'auth/dynamic-link-not-activated':
      return 'Please activate Dynamic Links in the Firebase Console and agree to the terms and conditions.';

    case 'auth/email-change-needs-verification':
      return 'Multi-factor users must always have a verified email.';

    case 'auth/email-already-in-use':
      return 'Email is already in use';

    case 'auth/emulator-config-failed':
      return "Auth instance has already been used to make a network call. Auth can no longer be configured to use the emulator. Try calling 'connectAuthEmulator()' sooner.";

    case 'auth/expired-action-code':
      return 'Action code has expired.';

    case 'auth/cancelled-popup-request':
      return 'This operation has been cancelled due to another conflicting popup being opened.';

    case 'auth/internal-error':
      return 'An internal AuthErrorMessage has occurred.';

    case 'auth/invalid-app-credential':
      return 'Phone verification request contains an invalid application verifier. The reCAPTCHA token response is either invalid or expired.';

    case 'auth/invalid-app-id':
      return 'The mobile app identifier is not registed for the current project.';

    case 'auth/invalid-user-token':
      return "This user's credential isn't valid for this project. This can happen if the user's token has been tampered with, or if the user isn't for the project associated with this API key.";

    case 'auth/invalid-auth-event':
      return 'Internal AuthErrorMessage has occurred.';

    case 'auth/invalid-verification-code':
      return 'Invalid verification code';

    case 'auth/invalid-continue-uri':
      return 'Continue URL provided is invalid.';

    case 'auth/invalid-cordova-configuration':
      return 'Cordova plugins must be installed to enable OAuth sign-in: cordova-plugin-buildinfo, cordova-universal-links-plugin, cordova-plugin-browsertab, cordova-plugin-inappbrowser and cordova-plugin-customurlscheme.';

    case 'auth/invalid-custom-token':
      return 'Custom token format is incorrect';

    case 'auth/invalid-dynamic-link-domain':
      return 'Dynamic link domain is not configured or authorized for the current project.';

    case 'auth/invalid-email':
      return 'Email is invalid';

    case 'auth/invalid-emulator-scheme':
      return 'Emulator URL must start with a valid scheme (http:// or https://).';

    case 'auth/invalid-api-key':
      return 'API key is invalid, please check you have copied it correctly.';

    case 'auth/invalid-cert-hash':
      return 'SHA-1 certificate hash provided is invalid.';

    case 'auth/invalid-credential':
      return 'Supplied auth credential is malformed or has expired.';

    case 'auth/invalid-message-payload':
      return 'Email template corresponding to this action contains invalid characters in its message. Please fix by going to the Auth email templates section in the Firebase Console.';

    case 'auth/invalid-multi-factor-session':
      return 'Request does not contain a valid proof of first factor successful sign-in.';

    case 'auth/invalid-oauth-provider':
      return 'EmailAuthProvider is not supported for this operation. This operation only supports OAuth providers.';

    case 'auth/invalid-oauth-client-id':
      return 'OAuth client ID provided is either invalid or does not match the specified API key.';

    case 'auth/unauthorized-domain':
      return 'Domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console.';

    case 'auth/invalid-action-code':
      return 'Action code is invalid. This can happen if the code is malformed, expired, or has already been used.';

    case 'auth/invalid-persistence-type':
      return 'Specified persistence type is invalid. It can only be local, session or none.';

    case 'auth/invalid-phone-number':
      return 'Format of the phone number provided is incorrect. Please enter the phone number in a format that can be parsed into E.164 format. E.164 phone numbers are written in the format [+][country code][subscriber number including area code].';

    case 'auth/invalid-provider-id':
      return 'Specified provider ID is invalid.';

    case 'auth/invalid-recipient-email':
      return 'Email corresponding to this action failed to send as the provided recipient email address is invalid.';

    case 'auth/invalid-sender':
      return 'Email template corresponding to this action contains an invalid sender email or name. Please fix by going to the Auth email templates section in the Firebase Console.';

    case 'auth/invalid-verification-id':
      return 'Verification ID used to create the phone auth credential is invalid.';

    case 'auth/invalid-tenant-id':
      return "Auth instance's tenant ID is invalid.";

    case 'auth/missing-android-pkg-name':
      return 'Android Package Name must be provided if the Android App is required to be installed.';

    case 'auth/auth-domain-config-required':
      return 'Be sure to include authDomain when calling firebase.initializeApp(), by following the instructions in the Firebase console.';

    case 'auth/missing-app-credential':
      return 'Phone verification request is missing an application verifier assertion. A reCAPTCHA response token needs to be provided.';

    case 'auth/missing-verification-code':
      return 'Phone auth require SMS verification code.';

    case 'auth/missing-continue-uri':
      return 'Continue URL must be provided in the request.';

    case 'auth/missing-iframe-start':
      return 'Internal AuthErrorMessage has occurred.';

    case 'auth/missing-ios-bundle-id':
      return 'IOS Bundle ID must be provided if an App Store ID is provided.';

    case 'auth/missing-or-invalid-nonce':
      return 'Request does not contain a valid nonce. This can occur if the SHA-256 hash of the provided raw nonce does not match the hashed nonce in the ID token payload.';

    case 'auth/missing-multi-factor-info':
      return 'No second factor identifier is provided.';

    case 'auth/missing-multi-factor-session':
      return 'Missing proof of first factor successful sign-in.';

    case 'auth/missing-phone-number':
      return 'Phone number not provided';

    case 'auth/missing-verification-id':
      return 'Phone auth credential was created with an empty verification ID.';

    case 'auth/app-deleted':
      return 'FirebaseApp has been deleted.';

    case 'auth/multi-factor-info-not-found':
      return 'User does not have a second factor matching the identifier provided.';

    case 'auth/multi-factor-auth-required':
      return 'Proof of ownership of a second factor is required to complete sign-in.';

    case 'auth/account-exists-with-different-credential':
      return 'Account already exists with the different user';

    case 'auth/network-request-failed':
      return 'Network AuthErrorMessage (such as timeout, interrupted connection or unreachable host) has occurred.';

    case 'auth/no-auth-event':
      return 'Internal AuthErrorMessage has occurred.';

    case 'auth/no-such-provider':
      return 'User was not linked to an account with the given provider.';

    case 'auth/null-user':
      return 'Null user object was provided as the argument for an operation which requires a non-null user object.';

    case 'auth/operation-not-allowed':
      return 'Sign-in provider is disabled for this Firebase project. Enable it in the Firebase console, under the sign-in method tab of the Auth section.';

    case 'auth/operation-not-supported-in-this-environment':
      return "Operation is not supported in the environment this application is running on. 'location.protocol' must be http, https or chrome-extension and web storage must be enabled.";

    case 'auth/popup-blocked':
      return 'Unable to establish a connection with the popup. It may have been blocked by the browser.';

    case 'auth/popup-closed-by-user':
      return 'Popup has been closed by the user before finalizing the operation.';

    case 'auth/provider-already-linked':
      return 'User can only be linked to one identity for the given provider.';

    case 'auth/quota-exceeded':
      return "Project's quota for this operation has been exceeded.";

    case 'auth/redirect-cancelled-by-user':
      return 'Redirect operation has been cancelled by the user before finalizing.';

    case 'auth/redirect-operation-pending':
      return 'Redirect sign-in operation is already pending.';

    case 'auth/rejected-credential':
      return 'Request contains malformed or mismatching credentials.';

    case 'auth/second-factor-already-in-use':
      return 'Second factor is already enrolled on this account.';

    case 'auth/maximum-second-factor-count-exceeded':
      return 'Maximum allowed number of second factors on a user has been exceeded.';

    case 'auth/tenant-id-mismatch':
      return "Tenant ID does not match the Auth instance's tenant ID";

    case 'auth/timeout':
      return 'Operation has timed out.';

    case 'auth/user-token-expired':
      return "User's credential is no longer valid. The user must sign in again.";

    case 'auth/too-many-requests':
      return 'We have blocked all requests from this device due to unusual activity. Try again later.';

    case 'auth/unauthorized-continue-uri':
      return 'Domain of the continue URL is not whitelisted.  Please whitelist the domain in the Firebase console.';

    case 'auth/unsupported-first-factor':
      return 'Enrolling a second factor or signing in with a multi-factor account requires sign-in with a supported first factor.';

    case 'auth/unsupported-persistence-type':
      return 'Current environment does not support the specified persistence type.';

    case 'auth/unsupported-tenant-operation':
      return 'Operation is not supported in a multi-tenant context.';

    case 'auth/unverified-email':
      return 'Email is not verified';

    case 'auth/user-cancelled':
      return 'The user did not grant your application the permissions it requested.';

    case 'auth/user-not-found':
      return 'User not found';

    case 'auth/user-disabled':
      return 'User account has been disabled by an administrator.';

    case 'auth/user-mismatch':
      return 'Credentials do not correspond to the previously signed in user.';

    case 'auth/weak-password':
      return 'Password must be 8 characters long or more.';

    case 'auth/web-storage-unsupported':
      return 'Browser is not supported or 3rd party cookies and data may be disabled.';

    case 'auth/already-initialized':
      return 'initializeAuth() has already been called with different options. To avoid this error, call initializeAuth() with the same options as when it was originally called, or call getAuth() to return the already initialized instance.';
  }
};

export default AuthErrorMessage;
