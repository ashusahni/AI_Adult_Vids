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

// Sign up a new user
export const signUp = async (email: string, password: string): Promise<UserCredential> => {
  try {
    // Create user in auth system
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    try {
      // Create a user document in Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        email: userCredential.user.email,
        isSubscribed: false,
        isAdmin: false,
        createdAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error creating user document in Firestore:', error);
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
    return userCredential;
  } catch (error) {
    console.error('Error signing in:', error);
    throw error;
  }
};

// Sign out the current user
export const signOutUser = async (): Promise<void> => {
  try {
    return await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

// Get user data from Firestore
export const getUserData = async (userId: string) => {
  try {
    // Get user data from Firestore
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      console.error('User document not found');
      return null;
    }
  } catch (error) {
    console.error('Error getting user data:', error);
    throw error;
  }
};

// Update user subscription status
export const updateSubscription = async (userId: string, isSubscribed: boolean) => {
  try {
    await setDoc(doc(db, 'users', userId), { isSubscribed }, { merge: true });
  } catch (error) {
    console.error('Error updating subscription:', error);
    throw error;
  }
};

// Listen to auth state changes
export const onAuthChanged = (callback: (user: FirebaseUser | null) => void) => {
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