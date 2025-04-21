import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthState, User } from '../types';

// Initial auth state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isSubscribed: false,
  isAgeVerified: localStorage.getItem('isAgeVerified') === 'true',
};

// Create context
const AuthContext = createContext<{
  authState: AuthState;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => void;
  verifyAge: () => void;
  subscribe: () => Promise<void>;
}>({
  authState: initialState,
  login: async () => {},
  signup: async () => {},
  logout: () => {},
  verifyAge: () => {},
  subscribe: async () => {},
});

// Context provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>(initialState);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser) as User;
      setAuthState({
        user,
        isAuthenticated: true,
        isSubscribed: user.isSubscribed,
        isAgeVerified: localStorage.getItem('isAgeVerified') === 'true',
      });
    }
  }, []);

  // Mock login function
  const login = async (email: string, password: string) => {
    // This would be an API call in a real app
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      isSubscribed: false,
      isAgeVerified: true,
    };

    localStorage.setItem('user', JSON.stringify(user));
    
    setAuthState({
      user,
      isAuthenticated: true,
      isSubscribed: user.isSubscribed,
      isAgeVerified: true,
    });
  };

  // Mock signup function
  const signup = async (email: string, password: string) => {
    // This would create a new user through an API in a real app
    const user: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      isSubscribed: false,
      isAgeVerified: true,
    };

    localStorage.setItem('user', JSON.stringify(user));
    
    setAuthState({
      user,
      isAuthenticated: true,
      isSubscribed: false,
      isAgeVerified: true,
    });
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    setAuthState({
      ...initialState,
      isAgeVerified: authState.isAgeVerified,
    });
  };

  // Age verification function
  const verifyAge = () => {
    localStorage.setItem('isAgeVerified', 'true');
    setAuthState({
      ...authState,
      isAgeVerified: true,
    });
  };

  // Subscribe function
  const subscribe = async () => {
    if (authState.user) {
      const updatedUser = {
        ...authState.user,
        isSubscribed: true,
      };
      
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      setAuthState({
        ...authState,
        user: updatedUser,
        isSubscribed: true,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        login,
        signup,
        logout,
        verifyAge,
        subscribe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using auth context
export const useAuth = () => useContext(AuthContext);