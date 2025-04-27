# PornLabAI - AI-Powered Content Platform

This project uses React with Firebase for authentication, database, and storage.

## Firebase Setup

To set up Firebase for this project:

1. Create a Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)

2. Enable the following Firebase services:
   - Authentication (with Email/Password provider)
   - Cloud Firestore
   - Storage

3. Create a web app in your Firebase project and copy the Firebase configuration

4. Update the Firebase configuration in `src/firebase/config.ts` with your own values:

```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

5. Set up Firestore security rules to secure your database:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to all documents for authenticated users
    match /{document=**} {
      allow read: if request.auth != null;
    }
    
    // Users collection
    match /users/{userId} {
      // Only allow users to write to their own document
      allow write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Videos collection
    match /videos/{videoId} {
      // Only allow admin users to write to videos
      allow write: if request.auth != null && 
                     get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true;
    }
    
    // Images collection
    match /images/{imageId} {
      // Only allow admin users to write to images
      allow write: if request.auth != null && 
                     get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true;
    }
  }
}
```

6. Set up Storage security rules to secure your files:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Allow read access to all files for authenticated users
    match /{allPaths=**} {
      allow read: if request.auth != null;
    }
    
    // Only allow admin users to write to storage
    match /videos/{fileName} {
      allow write: if request.auth != null && 
                    firestore.get(/databases/(default)/documents/users/$(request.auth.uid)).data.isAdmin == true;
    }
    
    match /thumbnails/{fileName} {
      allow write: if request.auth != null && 
                    firestore.get(/databases/(default)/documents/users/$(request.auth.uid)).data.isAdmin == true;
    }
    
    match /images/{fileName} {
      allow write: if request.auth != null && 
                    firestore.get(/databases/(default)/documents/users/$(request.auth.uid)).data.isAdmin == true;
    }
  }
}
```

7. Create an admin user: After signing up a user, manually set the `isAdmin` field to `true` in their Firestore document through the Firebase console.

## Development

```bash
# Install dependencies
npm install

# Start development server
npm start
```

## Production Build

```bash
# Create production build
npm run build

# Serve production build locally
npx serve -s build
``` 