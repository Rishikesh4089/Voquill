// hooks/useAuth.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/utils/supabase';
import { User } from '@supabase/supabase-js';
import { useRouter, useSegments } from 'expo-router';

type AuthContextType = {
  user: User | null;
  displayName: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  displayName: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  // const router = useRouter();
  // const segments = useSegments();
  // const [hasMounted, setHasMounted] = useState(false);

  const isAuthenticated = !!user;

  // Helper to load display name from `profiles` table
  const loadDisplayName = async (user: User | null) => {
    if (!user) {
      setDisplayName(null);
      return;
    }
    const { data, error } = await supabase
      .from('profiles')
      .select('name')
      .eq('id', user.id)
      .maybeSingle();
    if (error && error.code !== 'PGRST116') {
      console.error('Failed to fetch display name:', error.message);
    }
    setDisplayName(data?.name ?? null);
  };

  // Checking if user has previously logged in
  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      loadDisplayName(session?.user ?? null);
      setIsLoading(false);  
    };

    getUser();
  }, []);

  // login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    const { data: signInData, error } = await supabase.auth.signInWithPassword({ email, password });
    const { user } = signInData;
    if (error) 
      {
        throw error
      }else{
        setIsLoading(false);
      };
    setUser(user);
    await loadDisplayName(user);
  };

  // signup function
  const signup = async (email: string, password: string, name?: string) => {
    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });
    if (signUpError) throw signUpError;
    const { data: signInData, error: signInError } =
      await supabase.auth.signInWithPassword({ email, password });
    if (signInError) throw signInError;
    const { user } = signInData;
    const { error: profileError } = await supabase
      .from('profiles')
      .upsert(
        { id: user.id, email: user.email, name },
        { onConflict: 'id' }
      );
    if (profileError) throw profileError;
    setUser(user);
    await loadDisplayName(user);
    setIsLoading(false);
  };

  // logout function
  const logout = async () => {
    setIsLoading(true);
    try {
      setUser(null);
      setDisplayName(null);
      await supabase.auth.signOut();
    } finally {
      setIsLoading(false);
    }
  };

  // return value for AuthContext
  return (
    <AuthContext.Provider
      value={{
        user,
        displayName,
        isLoading,
        isAuthenticated,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default useAuth;
