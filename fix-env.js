// Fix environment variables script
const fs = require('fs');
const path = require('path');

const envContent = `NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCxCqMtf3KmUYj37GOohCq8Fdry64jB5M4
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=collie-4f281.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=collie-4f281
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=collie-4f281.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1077504263993
NEXT_PUBLIC_FIREBASE_APP_ID=1:1077504263993:web:3c0a62af4b98fe3f930ae8
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-BCHGDLV5TM
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://collie-4f281-default-rtdb.firebaseio.com
NEXT_PUBLIC_GROQ_API_KEY=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
NEXT_PUBLIC_EMOTION_CLOUD_CLUSTER_MONGO_USERDB_URI=mongodb+srv://maymewoski:O5CPl4uuckdkxADb@collie.cgrqfe3.mongodb.net/?retryWrites=true&w=majority&appName=Collie
MONGODB_URI=mongodb+srv://maymewoski:O5CPl4uuckdkxADb@collie.cgrqfe3.mongodb.net/?retryWrites=true&w=majority&appName=Collie`;

console.log('Creating new .env.local file...');
fs.writeFileSync(path.join(__dirname, '.env.local'), envContent, 'utf8');
console.log('Done creating .env.local file!');

// Also create another environment file for verification
fs.writeFileSync(
  path.join(__dirname, '.env.development.local'),
  envContent,
  'utf8',
);
console.log('Created .env.development.local as backup!');

// Output for manual check
console.log('\nEnvironment variables:');
console.log(
  'NEXT_PUBLIC_FIREBASE_API_KEY:',
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
);
console.log(
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN:',
  process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
);
console.log(
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID:',
  process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
);
console.log(
  'NEXT_PUBLIC_FIREBASE_APP_ID:',
  process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
);
