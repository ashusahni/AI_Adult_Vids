import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  UserCredential,
  updateProfile,
  onAuthStateChanged,
  User as FirebaseUser,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from './config';

// Hardcoded admin credentials for development/testing
const ADMIN_EMAIL = 'pornlabai@gmail.com';
const ADMIN_PASSWORD = 'pornlabai';

// Sign up a new user
export const signUp = async (email: string, password: string): Promise<UserCredential> => {
  try {
    // Handle admin signup
    const isAdmin = email.toLowerCase() === ADMIN_EMAIL;
    
    // Create user in auth system
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    try {
      // Create a user document in Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email: userCredential.user.email,
        isSubscribed: isAdmin, // Admin is automatically subscribed
        isAdmin: isAdmin,
        createdAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error creating user document in Firestore:', error);
      // Continue anyway since we're in development mode with mock auth
    }
    
    return userCredential;
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

// Sign in an existing user
export const signIn = async (email: string, password: string): Promise<UserCredential> => {
  try {
    // Sign in user
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // Special case for admin account - ensure it has admin privileges
    if (email.toLowerCase() === ADMIN_EMAIL) {
      try {
        // Update or create admin user document
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          email: userCredential.user.email,
          isSubscribed: true,
          isAdmin: true,
          lastLogin: new Date().toISOString()
        }, { merge: true });
      } catch (error) {
        console.error('Error updating admin document in Firestore:', error);
        // Continue anyway since we're in development mode with mock auth
      }
    }
    
    return userCredential;
  } catch (error) {
    console.error('Error signing in:', error);
    
    // Special case for development with mock auth
    if (process.env.NODE_ENV === 'development' && email.toLowerCase() === ADMIN_EMAIL) {
      console.log('Using mock authentication for admin user');
      return {
        user: {
          uid: 'mock-admin-uid',
          email: ADMIN_EMAIL,
          displayName: 'Admin User',
          emailVerified: true
        }
      } as unknown as UserCredential;
    }
    
    throw error;
  }
};

// Sign out the current user
export const signOutUser = async (): Promise<void> => {
  try {
    return await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    // In development, just simulate successful signout
    if (process.env.NODE_ENV === 'development') {
      return;
    }
    throw error;
  }
};

// Get user data from Firestore including custom claims like isAdmin
export const getUserData = async (userId: string) => {
  try {
    // For admin in mock/development environment
    if (process.env.NODE_ENV === 'development' && 
        (userId === 'mock-admin-uid' || 
         userId.includes('pornlabai'))) {
      return {
        email: ADMIN_EMAIL,
        isSubscribed: true,
        isAdmin: true,
        createdAt: new Date().toISOString()
      };
    }
    
    // Get user data from Firestore
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      console.error('User document not found');
      
      // For development, provide fallback data
      if (process.env.NODE_ENV === 'development') {
        return {
          email: userId.includes('@') ? userId : `user-${userId}@example.com`,
          isSubscribed: false,
          isAdmin: false,
          createdAt: new Date().toISOString()
        };
      }
      
      return null;
    }
  } catch (error) {
    console.error('Error getting user data:', error);
    
    // For development, provide fallback data
    if (process.env.NODE_ENV === 'development') {
      return {
        email: userId.includes('@') ? userId : `user-${userId}@example.com`,
        isSubscribed: false,
        isAdmin: false,
        createdAt: new Date().toISOString()
      };
    }
    
    throw error;
  }
};

// Update user subscription status
export const updateSubscription = async (userId: string, isSubscribed: boolean) => {
  try {
    await setDoc(doc(db, 'users', userId), { isSubscribed }, { merge: true });
  } catch (error) {
    console.error('Error updating subscription:', error);
    // For development, just continue
    if (process.env.NODE_ENV !== 'development') {
      throw error;
    }
  }
};

// Listen to auth state changes
export const onAuthChanged = (callback: (user: FirebaseUser | null) => void) => {
  // For development environment, simulate a logged-in admin user
  if (process.env.NODE_ENV === 'development') {
    // Simulate a small delay to make it feel more realistic
    setTimeout(() => {
      callback({
        uid: 'mock-admin-uid',
        email: ADMIN_EMAIL,
        displayName: 'Admin User',
        emailVerified: true,
      } as unknown as FirebaseUser);
    }, 500);
    
    // Return a no-op unsubscribe function
    return () => {};
  }
  
  return onAuthStateChanged(auth, callback);
};

// Google sign-in
export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;

  // Check if user document exists, if not, create it
  const userDoc = await getDoc(doc(db, 'users', user.uid));
  if (!userDoc.exists()) {
    await setDoc(doc(db, 'users', user.uid), {
      email: user.email,
      isSubscribed: false,
      isAdmin: false,
      createdAt: new Date().toISOString(),
    });
  }
  return result;
}; 