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
import { Mail, Lock, User } from 'lucide-react-native';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Colors from '@/constants/Colors';
import { spacing, typography, sizes } from '@/constants/Theme';
import useAuth from '@/hooks/useAuth';
import useTheme from '@/hooks/useThemeContext';

export default function SignupScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();
  const { signup } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleSignup = async () => {
    if (!name || !email || !password) {
      setError('Please fill all fields');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    try {
      setError(null);
      setIsLoading(true);
      await signup(email, password, name);
      router.replace('/(tabs)');
    } catch (err) {
      setError('Could not create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToLogin = () => {
    router.push('/login');
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
            Create Account
          </Text>
          <Text style={[
            styles.subtitle,
            { color: isDark ? Colors.gray[400] : Colors.gray[600] }
          ]}>
            Sign up to start using Voquill
          </Text>

          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          <Input
            label="Name"
            placeholder="Your Name"
            leftIcon={<User size={20} color={isDark ? Colors.gray[400] : Colors.gray[500]} />}
            value={name}
            onChangeText={setName}
          />

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
            title="Create Account"
            onPress={handleSignup}
            isLoading={isLoading}
            style={styles.signupButton}
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

          <View style={styles.loginContainer}>
            <Text style={[
              styles.loginText,
              { color: isDark ? Colors.gray[400] : Colors.gray[600] }
            ]}>
              Already have an account?
            </Text>
            <TouchableOpacity onPress={navigateToLogin}>
              <Text style={styles.loginLink}>Sign In</Text>
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
  signupButton: {
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
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  loginText: {
    fontSize: typography.fontSizes.md,
    marginRight: spacing.xs,
  },
  loginLink: {
    fontSize: typography.fontSizes.md,
    color: Colors.primary[500],
    fontWeight: '600',
  },
});