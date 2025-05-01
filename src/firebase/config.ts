import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDSOJqag5b21qQGyOEhFxLWhOUFcSlvAsQ",
  authDomain: "pornlabai-8b992.firebaseapp.com",
  projectId: "pornlabai-8b992",
  storageBucket: "pornlabai-8b992.firebasestorage.app",
  messagingSenderId: "310958941915",
  appId: "1:310958941915:web:b76062ce841af5c0908efe",
  measurementId: "G-1DGM2TDKJ7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Check if Firebase is initialized properly
if (!app) {
  throw new Error('Firebase app not initialized properly');
}

// Export app instance
export default app; 