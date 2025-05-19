import React from 'react';
import { View, Text, StyleSheet, Platform, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { LogOut, Moon, Sun } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../constants/Colors';
import { spacing, typography } from '../../constants/Theme';
import useAuth from '../../hooks/useAuth';
import useTheme from '../../hooks/useThemeContext';

interface NavbarProps {
  title: string;
}

export default function Navbar({ title }: NavbarProps) {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const handleLogout = async () => {
    await logout();
    router.replace('/(auth)/login');
  };

  return (
    <SafeAreaView edges={['top']} style={{ backgroundColor: isDark ? Colors.dark.background : Colors.light.background }}>
      <View style={[
        styles.container,
        { backgroundColor: isDark ? Colors.dark.background : Colors.light.background }
      ]}>
        <Text style={[
          styles.title,
          { color: isDark ? Colors.light.text : Colors.dark.text }
        ]}>
          {title}
        </Text>
        
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={[
              styles.actionButton,
              { backgroundColor: isDark ? Colors.gray[800] : Colors.gray[200] }
            ]} 
            onPress={toggleTheme}
          >
            {isDark ? (
              <Sun size={20} color={Colors.gray[300]} />
            ) : (
              <Moon size={20} color={Colors.gray[700]} />
            )}
          </TouchableOpacity>
          
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
            <TouchableOpacity style={styles.avatarContainer}>
              <Text style={styles.avatarText}>
                {user.name.charAt(0).toUpperCase()}
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
    color: Colors.light.text,
    fontSize: typography.fontSizes.md,
    fontWeight: '600',
  },
});