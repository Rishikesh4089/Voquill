import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, Platform, Dimensions, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Button from '@/components/ui/Button';
import { spacing, typography, sizes } from '@/constants/Theme';
import useAuth from '@/hooks/useAuth';
import Card from '@/components/ui/Card';
import useTheme from '@/hooks/useThemeContext';

export default function LandingPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    // On mobile, redirect to tabs if authenticated
    if (Platform.OS !== 'web' && isAuthenticated) {
      router.replace('/(tabs)');
    }
  }, [isAuthenticated]);

  const navigateToAuth = () => {
    router.push('/(auth)/login');
  };

  const navigateToTabs = () => {
    if (isAuthenticated) {
      router.push('/(tabs)');
    } else {
      router.push('/(auth)/login');
    }
  };

  // Only show landing page on web
  if (Platform.OS !== 'web') {
    return null;
  }

  return (
    <ScrollView 
      style={[
        styles.container,
        { backgroundColor: isDark ? Colors.dark.background : Colors.light.background }
      ]}
    >
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <View style={styles.heroContent}>
          <Text style={[
            styles.appName,
            { color: isDark ? Colors.light.text : Colors.dark.text }
          ]}>
            Voquill
          </Text>
          <Text style={[
            styles.tagline,
            { color: isDark ? Colors.gray[300] : Colors.gray[700] }
          ]}>
            Speak in your language, save in your script
          </Text>
          <Text style={[
            styles.description,
            { color: isDark ? Colors.gray[400] : Colors.gray[600] }
          ]}>
            Record voice notes in multiple Indian languages and convert them to searchable text with transliteration
          </Text>
          <View style={styles.buttonGroup}>
            <Button 
              title="Try Now" 
              size="large" 
              rightIcon={<ArrowRight size={20} color="#fff" />}
              onPress={navigateToTabs}
              style={styles.mainButton}
            />
            <Button 
              title="Sign In" 
              variant="outline" 
              size="large" 
              onPress={navigateToAuth}
              style={styles.secondaryButton}
            />
          </View>
        </View>
        <View style={styles.heroImageContainer}>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/3585088/pexels-photo-3585088.jpeg?auto=compress&cs=tinysrgb&w=800' }} 
            style={styles.heroImage}
            resizeMode="cover"
          />
        </View>
      </View>

      {/* Features Section */}
      <View style={styles.featuresSection}>
        <Text style={[
          styles.sectionTitle,
          { color: isDark ? Colors.light.text : Colors.dark.text }
        ]}>
          Features
        </Text>
        <View style={styles.featuresGrid}>
          <Card style={styles.featureCard}>
            <View style={[
              styles.featureIconContainer,
              { backgroundColor: isDark ? Colors.primary[900] : Colors.primary[100] }
            ]}>
              <Text style={[
                styles.featureIcon,
                { color: isDark ? Colors.primary[300] : Colors.primary[700] }
              ]}>🎤</Text>
            </View>
            <Text style={[
              styles.featureTitle,
              { color: isDark ? Colors.light.text : Colors.dark.text }
            ]}>Voice Input</Text>
            <Text style={[
              styles.featureDesc,
              { color: isDark ? Colors.gray[400] : Colors.gray[600] }
            ]}>Record your thoughts in your native language with our advanced voice recognition</Text>
          </Card>

          <Card style={styles.featureCard}>
            <View style={[
              styles.featureIconContainer,
              { backgroundColor: isDark ? Colors.secondary[900] : Colors.secondary[100] }
            ]}>
              <Text style={[
                styles.featureIcon,
                { color: isDark ? Colors.secondary[300] : Colors.secondary[700] }
              ]}>🔄</Text>
            </View>
            <Text style={[
              styles.featureTitle,
              { color: isDark ? Colors.light.text : Colors.dark.text }
            ]}>Transliteration</Text>
            <Text style={[
              styles.featureDesc,
              { color: isDark ? Colors.gray[400] : Colors.gray[600] }
            ]}>Convert native script to Roman text for easier sharing and reading</Text>
          </Card>

          <Card style={styles.featureCard}>
            <View style={[
              styles.featureIconContainer,
              { backgroundColor: isDark ? Colors.accent[900] : Colors.accent[100] }
            ]}>
              <Text style={[
                styles.featureIcon,
                { color: isDark ? Colors.accent[300] : Colors.accent[700] }
              ]}>🌐</Text>
            </View>
            <Text style={[
              styles.featureTitle,
              { color: isDark ? Colors.light.text : Colors.dark.text }
            ]}>Multilingual</Text>
            <Text style={[
              styles.featureDesc,
              { color: isDark ? Colors.gray[400] : Colors.gray[600] }
            ]}>Support for 9+ Indian languages including Hindi, Tamil, Telugu and more</Text>
          </Card>
        </View>
      </View>

      {/* Footer */}
      <View style={[
        styles.footer,
        { backgroundColor: isDark ? Colors.gray[900] : Colors.gray[100] }
      ]}>
        <Text style={[
          styles.footerText,
          { color: isDark ? Colors.gray[400] : Colors.gray[600] }
        ]}>
          © 2025 Voquill. All rights reserved.
        </Text>
      </View>
    </ScrollView>
  );
}

const { width } = Dimensions.get('window');
const isLargeScreen = width > 1024;
const isMediumScreen = width > 768 && width <= 1024;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heroSection: {
    flexDirection: isLargeScreen ? 'row' : 'column',
    padding: isLargeScreen ? spacing.xxl : spacing.xl,
    paddingTop: isLargeScreen ? 100 : 80,
    paddingBottom: isLargeScreen ? 100 : 60,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heroContent: {
    flex: isLargeScreen ? 1 : undefined,
    maxWidth: isLargeScreen ? 500 : '100%',
    marginRight: isLargeScreen ? spacing.xxl : 0,
    marginBottom: isLargeScreen ? 0 : spacing.xl,
  },
  appName: {
    fontSize: isLargeScreen ? 48 : 40,
    fontWeight: '700',
    marginBottom: spacing.xs,
  },
  tagline: {
    fontSize: isLargeScreen ? typography.fontSizes.xxl : typography.fontSizes.xl,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  description: {
    fontSize: typography.fontSizes.lg,
    lineHeight: 24,
    marginBottom: spacing.xl,
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  mainButton: {
    marginRight: spacing.md,
    marginBottom: spacing.md,
  },
  secondaryButton: {
    marginBottom: spacing.md,
  },
  heroImageContainer: {
    flex: isLargeScreen ? 1 : undefined,
    width: isLargeScreen ? '50%' : '100%',
    height: isLargeScreen ? 400 : 300,
    overflow: 'hidden',
    borderRadius: sizes.borderRadius.lg,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  featuresSection: {
    padding: isLargeScreen ? spacing.xxl : spacing.xl,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xxl,
  },
  sectionTitle: {
    fontSize: typography.fontSizes.xxl,
    fontWeight: '600',
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  featuresGrid: {
    flexDirection: isLargeScreen ? 'row' : isMediumScreen ? 'row' : 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  featureCard: {
    width: isLargeScreen ? '30%' : isMediumScreen ? '45%' : '100%',
    marginBottom: spacing.lg,
    padding: spacing.lg,
    alignItems: 'center',
  },
  featureIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  featureIcon: {
    fontSize: 24,
  },
  featureTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: '600',
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  featureDesc: {
    fontSize: typography.fontSizes.md,
    textAlign: 'center',
    lineHeight: 22,
  },
  footer: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  footerText: {
    fontSize: typography.fontSizes.sm,
  },
});