import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Mail, Lock } from 'lucide-react-native';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Colors from '@/constants/Colors';
import { spacing, typography, sizes } from '@/constants/Theme';
import useAuth from '@/hooks/useAuth';
import useTheme from '@/hooks/useThemeContext';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      setError(null);
      setIsLoading(true);
      await login(email, password);
      router.replace('/(tabs)');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToSignup = () => {
    router.push('/signup');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[
        styles.container,
        { backgroundColor: isDark ? Colors.dark.background : Colors.light.background }
      ]}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.formContainer}>
          <Text style={[
            styles.title,
            { color: isDark ? Colors.light.text : Colors.dark.text }
          ]}>
            Welcome Back
          </Text>
          <Text style={[
            styles.subtitle,
            { color: isDark ? Colors.gray[400] : Colors.gray[600] }
          ]}>
            Sign in to continue recording and managing your notes
          </Text>

          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          <Input
            label="Email"
            placeholder="your@email.com"
            leftIcon={<Mail size={20} color={isDark ? Colors.gray[400] : Colors.gray[500]} />}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input
            label="Password"
            placeholder="••••••••"
            leftIcon={<Lock size={20} color={isDark ? Colors.gray[400] : Colors.gray[500]} />}
            value={password}
            onChangeText={setPassword}
            isPassword
          />

          <Button
            title="Sign In"
            onPress={handleLogin}
            isLoading={isLoading}
            style={styles.loginButton}
          />

          <View style={styles.divider}>
            <View style={[
              styles.dividerLine,
              { backgroundColor: isDark ? Colors.gray[700] : Colors.gray[300] }
            ]} />
            <Text style={[
              styles.dividerText,
              { color: isDark ? Colors.gray[500] : Colors.gray[500] }
            ]}>OR</Text>
            <View style={[
              styles.dividerLine,
              { backgroundColor: isDark ? Colors.gray[700] : Colors.gray[300] }
            ]} />
          </View>

          <View style={styles.signupContainer}>
            <Text style={[
              styles.signupText,
              { color: isDark ? Colors.gray[400] : Colors.gray[600] }
            ]}>
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={navigateToSignup}>
              <Text style={styles.signupLink}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: spacing.xl,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  title: {
    fontSize: typography.fontSizes.xxl,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.fontSizes.md,
    marginBottom: spacing.xl,
  },
  errorContainer: {
    backgroundColor: Colors.error[100],
    padding: spacing.md,
    borderRadius: sizes.borderRadius.md,
    marginBottom: spacing.md,
  },
  errorText: {
    color: Colors.error[700],
    fontSize: typography.fontSizes.sm,
  },
  loginButton: {
    marginTop: spacing.md,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: spacing.xl,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    paddingHorizontal: spacing.md,
    fontSize: typography.fontSizes.sm,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  signupText: {
    fontSize: typography.fontSizes.md,
    marginRight: spacing.xs,
  },
  signupLink: {
    fontSize: typography.fontSizes.md,
    color: Colors.primary[500],
    fontWeight: '600',
  },
});