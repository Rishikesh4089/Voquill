import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, Alert, Platform } from 'react-native';
import { Moon, Bell, Trash2, Globe } from 'lucide-react-native';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Navbar from '@/components/layout/Navbar';
import Colors from '@/constants/Colors';
import { spacing, typography } from '@/constants/Theme';
import useAuth from '@/hooks/useAuth';
import useTheme from '@/hooks/useThemeContext';
import LANGUAGES from '@/constants/Languages';
import LanguageDropdown from '@/components/notes/LanguageDropdown';

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [defaultLanguage, setDefaultLanguage] = useState(LANGUAGES[0]);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const { logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  const handleDeleteAccount = () => {
    setIsDeleting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsDeleting(false);
      
      if (Platform.OS === 'web') {
        if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
          logout();
        }
      } else {
        Alert.alert(
          'Delete Account',
          'Are you sure you want to delete your account? This action cannot be undone.',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Delete',
              style: 'destructive',
              onPress: () => logout(),
            },
          ]
        );
      }
    }, 500);
  };

  return (
    <View style={[
      styles.container,
      { backgroundColor: isDark ? Colors.dark.background : Colors.light.background }
    ]}>
      <Navbar title="Settings" />
      
      <ScrollView style={styles.content}>
        <Text style={[
          styles.sectionTitle,
          { color: isDark ? Colors.gray[300] : Colors.gray[700] }
        ]}>
          Appearance
        </Text>
        
        <Card style={styles.card}>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Moon 
                size={20} 
                color={isDark ? Colors.gray[300] : Colors.gray[600]} 
                style={styles.settingIcon} 
              />
              <Text style={[
                styles.settingText,
                { color: isDark ? Colors.light.background : Colors.dark.text }
              ]}>
                Dark Mode
              </Text>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ 
                false: Colors.gray[300], 
                true: Colors.primary[400] 
              }}
              thumbColor={isDark ? Colors.primary[200] : Colors.gray[100]}
              ios_backgroundColor={Colors.gray[300]}
            />
          </View>
        </Card>

        <Text style={[
          styles.sectionTitle,
          { color: isDark ? Colors.gray[300] : Colors.gray[700] }
        ]}>
          Language
        </Text>

        <Card style={styles.card}>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Globe 
                size={20} 
                color={isDark ? Colors.gray[300] : Colors.gray[600]} 
                style={styles.settingIcon} 
              />
              <Text style={[
                styles.settingText,
                { color: isDark ? Colors.light.background : Colors.dark.text }
              ]}>
                Default Language
              </Text>
            </View>
          </View>
          <LanguageDropdown
            value={defaultLanguage}
            onChange={setDefaultLanguage}
            languages={LANGUAGES}
          />
        </Card>

        <Text style={[
          styles.sectionTitle,
          { color: isDark ? Colors.gray[300] : Colors.gray[700] }
        ]}>
          Notifications
        </Text>
        
        <Card style={styles.card}>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Bell 
                size={20} 
                color={isDark ? Colors.gray[300] : Colors.gray[600]} 
                style={styles.settingIcon} 
              />
              <Text style={[
                styles.settingText,
                { color: isDark ? Colors.light.background : Colors.dark.text }
              ]}>
                Push Notifications
              </Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ 
                false: Colors.gray[300], 
                true: Colors.primary[400] 
              }}
              thumbColor={notificationsEnabled ? Colors.primary[200] : Colors.gray[100]}
              ios_backgroundColor={Colors.gray[300]}
            />
          </View>
        </Card>

        <Text style={[
          styles.sectionTitle,
          { color: isDark ? Colors.gray[300] : Colors.gray[700] }
        ]}>
          Account
        </Text>
        
        <Card style={styles.card}>
          <View style={styles.dangerZone}>
            <View style={styles.dangerHeader}>
              <Trash2 
                size={20} 
                color={Colors.error[500]} 
                style={styles.settingIcon} 
              />
              <Text style={styles.dangerTitle}>
                Delete Account
              </Text>
            </View>
            <Text style={[
              styles.dangerText,
              { color: isDark ? Colors.gray[400] : Colors.gray[600] }
            ]}>
              This will permanently delete your account and all associated data. This action cannot be undone.
            </Text>
            <Button
              title="Delete Account"
              titleStyle={{ color: isDark ? Colors.light.background : Colors.gray[100]}}
              variant="danger"
              onPress={handleDeleteAccount}
              isLoading={isDeleting}
              style={styles.deleteButton}
            />
          </View>
        </Card>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSizes.md,
    fontWeight: '600',
    marginTop: spacing.md,
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.sm,
  },
  card: {
    marginBottom: spacing.md,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: spacing.sm,
  },
  settingText: {
    fontSize: typography.fontSizes.md,
  },
  dangerZone: {
    padding: spacing.sm,
  },
  dangerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  dangerTitle: {
    fontSize: typography.fontSizes.md,
    fontWeight: '600',
    color: Colors.error[500],
  },
  dangerText: {
    fontSize: typography.fontSizes.sm,
    marginBottom: spacing.md,
  },
  deleteButton: {
    marginTop: spacing.sm,
  },
});