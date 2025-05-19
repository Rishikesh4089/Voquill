import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextType, User } from '../types';
import { useRouter, useSegments } from 'expo-router';

// Create an authentication context
const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => {},
  logout: async () => {},
  signup: async () => {},
});

// Mock user data for demo
const MOCK_USER: User = {
  id: '1',
  email: 'user@example.com',
  name: 'Demo User',
  avatar: 'https://i.pravatar.cc/150?img=1',
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const segments = useSegments();

  // Check if the user is authenticated
  const isAuthenticated = !!user;

  // Effect for handling route protection
  useEffect(() => {
    if (!isLoading) {
      const inAuthGroup = segments[0] === '(auth)';
      
      if (!isAuthenticated && !inAuthGroup) {
        // Redirect to the login page if not authenticated
        router.replace('/(auth)/login');
      } else if (isAuthenticated && inAuthGroup) {
        // Redirect to the home page if authenticated
        router.replace('/(tabs)');
      }
    }
  }, [isAuthenticated, segments, isLoading]);

  // Check for existing session on app start
  useEffect(() => {
    // Simulate checking for existing session
    const checkSession = async () => {
      try {
        // In a real app, check for valid session in AsyncStorage or elsewhere
        const hasSession = false; // Would be determined by checking storage
        
        if (hasSession) {
          // Simulate fetching user data
          setUser(MOCK_USER);
        }
      } catch (error) {
        console.error('Failed to check session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, make an API call to authenticate
      if (email && password) {
        setUser(MOCK_USER);
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // In a real app, make an API call to logout
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Signup function
  const signup = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, make an API call to create a new account
      if (email && password && name) {
        setUser({
          ...MOCK_USER,
          email,
          name,
        });
      } else {
        throw new Error('Invalid signup information');
      }
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

export default useAuth;