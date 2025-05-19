import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Colors from '@/constants/Colors';
import { spacing, typography, sizes } from '@/constants/Theme';
import useTheme from '@/hooks/useThemeContext';

interface TransliterationPreviewProps {
  nativeText: string;
  romanizedText: string;
  language: string;
  isLoading?: boolean;
}

export default function TransliterationPreview({
  nativeText,
  romanizedText,
  language,
  isLoading = false,
}: TransliterationPreviewProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[
          styles.label,
          { color: isDark ? Colors.gray[300] : Colors.gray[700] }
        ]}>
          Text in {language}
        </Text>
      </View>
      
      <ScrollView
        style={[
          styles.nativeTextContainer,
          { 
            backgroundColor: isDark ? Colors.gray[800] : Colors.gray[100],
            borderColor: isDark ? Colors.gray[700] : Colors.gray[300],
          }
        ]}
        contentContainerStyle={styles.textContent}
      >
        {isLoading ? (
          <Text style={[
            styles.placeholder,
            { color: isDark ? Colors.gray[500] : Colors.gray[500] }
          ]}>
            Transcribing...
          </Text>
        ) : nativeText ? (
          <Text style={[
            styles.nativeText,
            { color: isDark ? Colors.light.text : Colors.dark.text }
          ]}>
            {nativeText}
          </Text>
        ) : (
          <Text style={[
            styles.placeholder,
            { color: isDark ? Colors.gray[500] : Colors.gray[500] }
          ]}>
            Native text will appear here after recording
          </Text>
        )}
      </ScrollView>

      <View style={styles.divider} />

      <View style={styles.header}>
        <Text style={[
          styles.label,
          { color: isDark ? Colors.gray[300] : Colors.gray[700] }
        ]}>
          Romanized text
        </Text>
      </View>
      
      <ScrollView
        style={[
          styles.romanizedTextContainer,
          { 
            backgroundColor: isDark ? Colors.gray[800] : Colors.gray[100],
            borderColor: isDark ? Colors.gray[700] : Colors.gray[300],
          }
        ]}
        contentContainerStyle={styles.textContent}
      >
        {isLoading ? (
          <Text style={[
            styles.placeholder,
            { color: isDark ? Colors.gray[500] : Colors.gray[500] }
          ]}>
            Transliterating...
          </Text>
        ) : romanizedText ? (
          <Text style={[
            styles.romanizedText,
            { color: isDark ? Colors.gray[300] : Colors.gray[700] }
          ]}>
            {romanizedText}
          </Text>
        ) : (
          <Text style={[
            styles.placeholder,
            { color: isDark ? Colors.gray[500] : Colors.gray[500] }
          ]}>
            Romanized text will appear here after transliteration
          </Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  label: {
    fontSize: typography.fontSizes.sm,
    fontWeight: '500',
  },
  nativeTextContainer: {
    borderWidth: 1,
    borderRadius: sizes.borderRadius.md,
    height: 100,
  },
  romanizedTextContainer: {
    borderWidth: 1,
    borderRadius: sizes.borderRadius.md,
    height: 100,
  },
  textContent: {
    padding: spacing.md,
    minHeight: '100%',
  },
  nativeText: {
    fontSize: typography.fontSizes.lg,
    lineHeight: 24,
  },
  romanizedText: {
    fontSize: typography.fontSizes.md,
    lineHeight: 22,
    fontStyle: 'italic',
  },
  placeholder: {
    fontSize: typography.fontSizes.md,
    fontStyle: 'italic',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.gray[300],
    marginVertical: spacing.md,
  },
});