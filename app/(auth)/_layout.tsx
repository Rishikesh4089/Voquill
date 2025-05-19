import { Stack } from 'expo-router';
import useTheme from '@/hooks/useThemeContext';
import Colors from '@/constants/Colors';

export default function AuthLayout() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: isDark ? Colors.dark.background : Colors.light.background,
        },
        headerTintColor: isDark ? Colors.light.text : Colors.dark.text,
        headerShadowVisible: false,
        headerBackTitle: 'Back',
      }}
    >
      <Stack.Screen 
        name="login" 
        options={{ 
          title: 'Sign In',
          headerShown: true,
        }} 
      />
      <Stack.Screen 
        name="signup" 
        options={{ 
          title: 'Create Account',
          headerShown: true,
        }} 
      />
    </Stack>
  );
}