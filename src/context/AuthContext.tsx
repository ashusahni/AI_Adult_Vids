import React, { createContext, useContext, useState, useEffect } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import { AuthState, User } from '../types';
import { 
  signIn, 
  signUp, 
  signOutUser, 
  getUserData,
  onAuthChanged,
  updateSubscription,
  signInWithGoogle
} from '../firebase/auth';

// Initial auth state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isSubscribed: false,
  isAgeVerified: localStorage.getItem('isAgeVerified') === 'true',
  isAdmin: false,
};

// Create context
const AuthContext = createContext<{
  authState: AuthState;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  verifyAge: () => void;
  subscribe: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
}>({
  authState: initialState,
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
  verifyAge: () => {},
  subscribe: async () => {},
  loginWithGoogle: async () => {},
});

// Context provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(initialState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthChanged(async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userData = await getUserData(firebaseUser.uid);
          if (userData) {
            const user: User = {
              id: firebaseUser.uid,
              email: firebaseUser.email || '',
              isSubscribed: userData.isSubscribed || false,
              isAgeVerified: true,
              isAdmin: userData.isAdmin || false,
            };

            setAuthState({
              user,
              isAuthenticated: true,
              isSubscribed: user.isSubscribed,
              isAgeVerified: localStorage.getItem('isAgeVerified') === 'true',
              isAdmin: user.isAdmin,
            });
          }
        } catch (error) {
          console.error('Error getting user data:', error);
        }
      } else {
        setAuthState({
          ...initialState,
          isAgeVerified: localStorage.getItem('isAgeVerified') === 'true',
        });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signIn(email, password);
      const userData = await getUserData(userCredential.user.uid);
      
      if (userData) {
        const user: User = {
          id: userCredential.user.uid,
          email: userCredential.user.email || '',
          isSubscribed: userData.isSubscribed || false,
          isAgeVerified: true,
          isAdmin: userData.isAdmin || false,
        };
        
        setAuthState({
          user,
          isAuthenticated: true,
          isSubscribed: user.isSubscribed,
          isAgeVerified: localStorage.getItem('isAgeVerified') === 'true',
          isAdmin: user.isAdmin,
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      const userCredential = await signUp(email, password);
      
      const user: User = {
        id: userCredential.user.uid,
        email: userCredential.user.email || '',
        isSubscribed: false,
        isAgeVerified: true,
        isAdmin: false,
      };
      
      setAuthState({
        user,
        isAuthenticated: true,
        isSubscribed: false,
        isAgeVerified: localStorage.getItem('isAgeVerified') === 'true',
        isAdmin: false,
      });
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOutUser();
      setAuthState({
        ...initialState,
        isAgeVerified: authState.isAgeVerified,
      });
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const verifyAge = () => {
    localStorage.setItem('isAgeVerified', 'true');
    setAuthState({
      ...authState,
      isAgeVerified: true,
    });
  };

  const subscribe = async () => {
    if (authState.user) {
      try {
        await updateSubscription(authState.user.id, true);
        
        const updatedUser = {
          ...authState.user,
          isSubscribed: true,
        };
        
        setAuthState({
          ...authState,
          user: updatedUser,
          isSubscribed: true,
        });
      } catch (error) {
        console.error('Subscription error:', error);
        throw error;
      }
    }
  };

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithGoogle();
      const user = result.user;
      const userData = await getUserData(user.uid);
      if (userData) {
        setAuthState({
          user: {
            id: user.uid,
            email: user.email || '',
            isSubscribed: userData.isSubscribed || false,
            isAgeVerified: true,
            isAdmin: userData.isAdmin || false,
          },
          isAuthenticated: true,
          isSubscribed: userData.isSubscribed || false,
          isAgeVerified: localStorage.getItem('isAgeVerified') === 'true',
          isAdmin: userData.isAdmin || false,
        });
      }
    } catch (error) {
      console.error('Google login error:', error);
      throw error;
    }
  };

  if (loading) {
    return <div>Loading authentication...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        authState,
        login,
        signup,
        logout,
        verifyAge,
        subscribe,
        loginWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => useContext(AuthContext);