import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { useRouter } from 'expo-router';
import useAuth from '@/hooks/useAuth';
import LandingPage from '@/components/landing/LandingPage';

export default function Index() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (Platform.OS !== 'web') {
        if (isAuthenticated) {
          router.replace('/(tabs)');
        } else {
          router.replace('/(auth)/login');
        }
      }
    }, 0); // delay navigation to after mount

    return () => clearTimeout(timeout);
  }, [isAuthenticated]);

  if (Platform.OS !== 'web') {
    return null;
  }

  return <LandingPage />;
}
