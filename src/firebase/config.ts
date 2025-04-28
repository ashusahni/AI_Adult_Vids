import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

// Initialize Firebase with development fallbacks
let app, auth, db, storage;

// Initialize with mock implementations for development
const useMockServices = process.env.NODE_ENV === 'development';

// For development, just use mock implementations
if (useMockServices) {
  console.log('Using mock Firebase implementations for development');
  
  // Mock auth
  auth = {
    onAuthStateChanged: (callback: (user: any | null) => void) => {
      callback(null);
      return () => {};
    },
    signInWithEmailAndPassword: () => Promise.resolve({
      user: {
        uid: 'mock-admin-uid',
        email: 'pornlabai@gmail.com',
        displayName: 'Admin User'
      }
    }),
    createUserWithEmailAndPassword: () => Promise.resolve({
      user: {
        uid: 'mock-admin-uid',
        email: 'pornlabai@gmail.com',
        displayName: 'Admin User'
      }
    }),
    signOut: () => Promise.resolve(),
  } as any;
  
  // Mock Firestore
  db = {
    collection: () => ({
      doc: () => ({
        get: () => Promise.resolve({ 
          exists: () => true, 
          data: () => ({
            email: 'pornlabai@gmail.com',
            isAdmin: true,
            isSubscribed: true
          }) 
        }),
        set: () => Promise.resolve(),
      }),
    }),
  } as any;
  
  // Mock Storage
  storage = {
    ref: () => ({
      put: () => Promise.resolve({
        ref: { getDownloadURL: () => Promise.resolve('https://example.com/mock-url') }
      }),
      getDownloadURL: () => Promise.resolve('https://example.com/mock-url'),
    }),
  } as any;
  
  app = {} as any;
} else {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
  };

  try {
    console.log('Initializing Firebase with config:', {
      apiKey: firebaseConfig.apiKey ? "CONFIGURED" : "MISSING",
      authDomain: firebaseConfig.authDomain ? "CONFIGURED" : "MISSING",
      projectId: firebaseConfig.projectId ? "CONFIGURED" : "MISSING",
      storageBucket: firebaseConfig.storageBucket ? "CONFIGURED" : "MISSING",
      messagingSenderId: firebaseConfig.messagingSenderId ? "CONFIGURED" : "MISSING",
      appId: firebaseConfig.appId ? "CONFIGURED" : "MISSING"
    });
    
    app = initializeApp(firebaseConfig);
    
    // Initialize Firebase services
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
    
    console.log('Firebase initialized successfully');
  } catch (error) {
    console.error('Error initializing Firebase:', error);
    
    // Fallback to mock implementations
    auth = {
      onAuthStateChanged: (callback: (user: any | null) => void) => {
        callback(null);
        return () => {};
      },
      signInWithEmailAndPassword: () => Promise.reject(new Error('Firebase not initialized')),
      createUserWithEmailAndPassword: () => Promise.reject(new Error('Firebase not initialized')),
      signOut: () => Promise.reject(new Error('Firebase not initialized')),
    } as any;
    
    db = {
      collection: () => ({
        doc: () => ({
          get: () => Promise.resolve({ exists: false, data: () => ({}) }),
          set: () => Promise.resolve(),
        }),
      }),
    } as any;
    
    storage = {
      ref: () => ({
        put: () => Promise.reject(new Error('Firebase not initialized')),
        getDownloadURL: () => Promise.reject(new Error('Firebase not initialized')),
      }),
    } as any;
  }
}

export { auth, db, storage };
export default app; 