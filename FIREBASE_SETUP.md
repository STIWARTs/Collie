# Firebase Setup Guide

## Environment Variables

You need to set up the following environment variables for Firebase authentication to work properly:

```env
# Firebase Configuration (required)
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://your-project-id.firebaseio.com
```

## How to Get Firebase Configuration

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Select your project (or create a new one if needed)
3. Click on the gear icon ⚙️ (Project settings) in the top left sidebar
4. Scroll down to the "Your apps" section
5. If you don't have a web app, click "Add app" and select the web platform (</>)
6. After registering the app, you'll see the Firebase configuration object
7. Copy these values to your environment variables

## Adding Environment Variables to Vercel

1. Go to your project on the [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Click on "Settings" tab
4. Go to "Environment Variables" section
5. Add each of the variables above with their corresponding values
6. Click "Save" and redeploy your application

## Setting Up Authentication

1. In the Firebase Console, go to "Authentication" in the left sidebar
2. Click on the "Sign-in method" tab
3. Enable the authentication methods you want to use (Google, Email/Password, etc.)
4. For Google authentication, make sure you've configured OAuth properly
5. Add your deployed domain (e.g., `collie.vercel.app`) to the authorized domains list

## Testing Locally

1. Create a `.env.local` file in the root of your project
2. Add the environment variables with your Firebase configuration
3. Run `npm run dev` to start the development server
4. Test authentication in the local environment

## Common Issues

- **"Domain not authorized"**: Make sure your domain is added to the authorized domains list in Firebase Console
- **"Sign-in provider is disabled"**: Enable the sign-in method in Firebase Authentication settings
- **"Missing environment variables"**: Ensure all required variables are set correctly in Vercel
