import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { ArrowRight } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import Button from '@/components/ui/Button';
import { spacing, typography, sizes } from '@/constants/Theme';
import useTheme from '@/hooks/useThemeContext';
import Card from '@/components/ui/Card';

export default function LandingPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const { width } = Dimensions.get('window');
  const isLargeScreen = width > 1024;
  const isMediumScreen = width > 768 && width <= 1024;

  const heroImageContainerStyle = {
    flex: isLargeScreen ? 1 : undefined,
    width: isLargeScreen ? width * 0.5 : width,
    height: isLargeScreen ? 400 : 300,
  };

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: isDark ? Colors.dark.background : Colors.light.background },
      ]}
    >
      {/* ... your existing JSX here ... */}
      {/* (copy everything from your existing LandingPage's return except hooks/redirects) */}

      {/* Hero Section */}
      <View style={styles.heroSection}>
        <View style={styles.heroContent}>
          <Text style={[styles.appName, { color: isDark ? Colors.light.text : Colors.dark.text }]}>
            Voquill
          </Text>
          <Text style={[styles.tagline, { color: isDark ? Colors.gray[300] : Colors.gray[700] }]}>
            Speak in your language, save in your script
          </Text>
          <Text style={[styles.description, { color: isDark ? Colors.gray[400] : Colors.gray[600] }]}>
            Record voice notes in multiple Indian languages and convert them to searchable text with
            transliteration
          </Text>
          {/* Note: The buttons need navigation handlers, so we will pass them as props */}
        </View>
        <View style={[styles.heroImageContainer, heroImageContainerStyle]}>
          <Image
            source={{
              uri: 'https://images.pexels.com/photos/3585088/pexels-photo-3585088.jpeg?auto=compress&cs=tinysrgb&w=800',
            }}
            style={styles.heroImage}
            resizeMode="cover"
          />
        </View>
      </View>

      {/* Features Section */}
      <View style={styles.featuresSection}>
        <Text style={[styles.sectionTitle, { color: isDark ? Colors.light.text : Colors.dark.text }]}>
          Features
        </Text>
        <View style={styles.featuresGrid}>
          <Card style={styles.featureCard}>
            <View
              style={[
                styles.featureIconContainer,
                { backgroundColor: isDark ? Colors.primary[900] : Colors.primary[100] },
              ]}
            >
              <Text style={[styles.featureIcon, { color: isDark ? Colors.primary[300] : Colors.primary[700] }]}>
                🎤
              </Text>
            </View>
            <Text style={[styles.featureTitle, { color: isDark ? Colors.light.text : Colors.dark.text }]}>
              Voice Input
            </Text>
            <Text style={[styles.featureDesc, { color: isDark ? Colors.gray[400] : Colors.gray[600] }]}>
              Record your thoughts in your native language with our advanced voice recognition
            </Text>
          </Card>

          <Card style={styles.featureCard}>
            <View
              style={[
                styles.featureIconContainer,
                { backgroundColor: isDark ? Colors.secondary[900] : Colors.secondary[100] },
              ]}
            >
              <Text style={[styles.featureIcon, { color: isDark ? Colors.secondary[300] : Colors.secondary[700] }]}>
                🔄
              </Text>
            </View>
            <Text style={[styles.featureTitle, { color: isDark ? Colors.light.text : Colors.dark.text }]}>
              Transliteration
            </Text>
            <Text style={[styles.featureDesc, { color: isDark ? Colors.gray[400] : Colors.gray[600] }]}>
              Convert native script to Roman text for easier sharing and reading
            </Text>
          </Card>

          <Card style={styles.featureCard}>
            <View
              style={[
                styles.featureIconContainer,
                { backgroundColor: isDark ? Colors.accent[900] : Colors.accent[100] },
              ]}
            >
              <Text style={[styles.featureIcon, { color: isDark ? Colors.accent[300] : Colors.accent[700] }]}>
                🌐
              </Text>
            </View>
            <Text style={[styles.featureTitle, { color: isDark ? Colors.light.text : Colors.dark.text }]}>
              Multilingual
            </Text>
            <Text style={[styles.featureDesc, { color: isDark ? Colors.gray[400] : Colors.gray[600] }]}>
              Support for 9+ Indian languages including Hindi, Tamil, Telugu and more
            </Text>
          </Card>
        </View>
      </View>

      {/* Footer */}
      <View style={[styles.footer, { backgroundColor: isDark ? Colors.gray[900] : Colors.gray[100] }]}>
        <Text style={[styles.footerText, { color: isDark ? Colors.gray[400] : Colors.gray[600] }]}>
          © 2025 Voquill. All rights reserved.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    
  // ... your styles here exactly as they are in the original component ...
  container: {
    flex: 1,
  },
  heroSection: {
    flexDirection: 'column', // Will adjust on window width in index.tsx if needed
    padding: 24,
    paddingTop: 80,
    paddingBottom: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heroContent: {
    maxWidth: 500,
    marginBottom: 24,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroImageContainer: {
    overflow: 'hidden',
    borderRadius: sizes.borderRadius.lg,
  },
  appName: {
    fontSize: 40,
    fontWeight: '700',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
  },
  description: {
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 32,
  },
  featuresSection: {
    padding: 24,
    paddingTop: 48,
    paddingBottom: 48,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 24,
    textAlign: 'center',
  },
  featuresGrid: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  featureCard: {
    width: '100%',
    marginBottom: 16,
    padding: 16,
    alignItems: 'center',
  },
  featureIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureIcon: {
    fontSize: 24,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  featureDesc: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  footer: {
    padding: 24,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
  },
});
