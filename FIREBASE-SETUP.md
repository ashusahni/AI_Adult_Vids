# Setting Up Firebase for PornLabAI

This guide will walk you through setting up Firebase for the PornLabAI application.

## Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter a project name (e.g., "pornlabai-app")
4. Follow the prompts to create your project

## Enable Authentication

1. In the Firebase Console, select your project
2. Go to "Authentication" from the left sidebar
3. Click "Get started"
4. Enable "Email/Password" provider by clicking on it and then enabling it
5. Save the changes

## Set Up Firestore Database

1. In the Firebase Console, select your project
2. Go to "Firestore Database" from the left sidebar
3. Click "Create database"
4. Choose "Start in production mode" and click "Next"
5. Select a location closest to your users and click "Enable"

## Set Up Storage

1. In the Firebase Console, select your project
2. Go to "Storage" from the left sidebar
3. Click "Get started"
4. Follow the prompts to set up Storage

## Create a Web App

1. In the Firebase Console, select your project
2. Click the web icon (</>) to add a web app
3. Register your app with a nickname
4. Copy the Firebase configuration object that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

## Configure the Application

Option 1: Add to `src/firebase/config.ts`
- Open `src/firebase/config.ts`
- Replace the placeholder values with your Firebase config

Option 2: Use environment variables
- Create a `.env` file in the project root
- Add your Firebase config as environment variables:

```
REACT_APP_FIREBASE_API_KEY=YOUR_API_KEY
REACT_APP_FIREBASE_AUTH_DOMAIN=YOUR_PROJECT_ID.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
REACT_APP_FIREBASE_STORAGE_BUCKET=YOUR_PROJECT_ID.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
REACT_APP_FIREBASE_APP_ID=YOUR_APP_ID
```

## Set Up Security Rules

### Firestore Rules

Go to "Firestore Database" > "Rules" tab and add these rules:

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

### Storage Rules

Go to "Storage" > "Rules" tab and add these rules:

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

## Create Admin User

After setting up Firebase:

1. Register a user with the email "pornlabai@gmail.com" through your application
2. Go to Firestore Database in the Firebase Console
3. Find the user document in the "users" collection
4. Edit the document and set `isAdmin` to `true`
5. Now you can log in with this account to access admin features

## Development Options

For local development, you can:

1. Use the Firebase emulators (Auth, Firestore, Storage)
2. Or use our mock authentication by setting:
   ```
   REACT_APP_USE_MOCK_AUTH=true
   ```

This allows you to develop without needing a real Firebase project configured. With mock auth enabled, you can log in with:
- Email: pornlabai@gmail.com
- Password: pornlabai 