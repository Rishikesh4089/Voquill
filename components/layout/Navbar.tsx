import React from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { Redirect, useRouter } from 'expo-router';
import { LogOut, Moon, Sun } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../constants/Colors';
import { spacing, typography } from '../../constants/Theme';
import useAuth from '../../hooks/useAuth';
import useTheme from '../../hooks/useThemeContext';
import LoginScreen from '@/app/(auth)/login';

interface NavbarProps {
  title: string;
}

export default function Navbar({ title }: NavbarProps) {
  const router = useRouter();
  const { user, displayName, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const handleLogout = async () => {
    router.replace('/(auth)/login');
    await logout();
    console.log('logout pressed');
  };

  return (
    <SafeAreaView edges={['top']} style={{ backgroundColor: isDark ? Colors.dark.background : Colors.light.background }}>
      <View style={[
        styles.container,
        { backgroundColor: isDark ? Colors.dark.background : Colors.light.background }
      ]}>
        <Text style={[
          styles.title,
          { color: isDark ? Colors.light.background : Colors.dark.text }
        ]}>
          {title}
        </Text>
        
        <View style={styles.actionsContainer}>
          {user && (
            <TouchableOpacity 
              style={[
                styles.actionButton,
                { backgroundColor: isDark ? Colors.gray[800] : Colors.gray[200] }
              ]} 
              onPress={handleLogout}
            >
              <LogOut size={20} color={isDark ? Colors.gray[300] : Colors.gray[700]} />
            </TouchableOpacity>
          )}
          
          {user && (
            <TouchableOpacity  style={styles.avatarContainer}
               onPress={() => router.push('/(tabs)/profile')}>
              <Text style={styles.avatarText}>
                {displayName?.charAt(0).toUpperCase()}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
    height: Platform.OS === 'web' ? 80 : 'auto',
  },
  title: {
    fontSize: typography.fontSizes.xl,
    fontWeight: '600',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.sm,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.sm,
  },
  avatarText: {
    color: Colors.light.background,
    fontSize: typography.fontSizes.md,
    fontWeight: '600',
  },
});