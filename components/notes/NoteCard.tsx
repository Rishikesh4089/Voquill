import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Calendar, MoreVertical } from 'lucide-react-native';
import { router } from 'expo-router';
import Card from '@/components/ui/Card';
import Colors from '@/constants/Colors';
import { sizes, typography, spacing } from '@/constants/Theme';
import { Note } from '@/types';
import useTheme from '@/hooks/useThemeContext';

interface NoteCardProps {
  note: Note;
  onPress?: () => void;
  onOptionsPress?: () => void;
}

export default function NoteCard({ note, onPress, onOptionsPress }: NoteCardProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const formattedDate = new Date(note.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push(`/note/${note.id}`);
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
      <Card style={styles.container}>
        <View style={styles.header}>
          <Text 
            style={[
              styles.title,
              isDark ? styles.titleDark : null,
            ]}
            numberOfLines={1}
          >
            {note.title}
          </Text>
          <TouchableOpacity 
            onPress={onOptionsPress} 
            style={styles.optionsButton}
            hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
          >
            <MoreVertical 
              size={20} 
              color={isDark ? Colors.gray[400] : Colors.gray[600]} 
            />
          </TouchableOpacity>
        </View>
        
        <Text 
          style={[
            styles.nativeText,
            isDark ? styles.nativeTextDark : null,
          ]}
          numberOfLines={2}
        >
          {note.content}
        </Text>
        
        <Text 
          style={[
            styles.romanizedText,
            isDark ? styles.romanizedTextDark : null,
          ]}
          numberOfLines={1}
        >
          {note.romanizedContent}
        </Text>
        
        <View style={styles.footer}>
          <View style={styles.dateContainer}>
            <Calendar 
              size={14} 
              color={isDark ? Colors.gray[500] : Colors.gray[600]} 
              style={styles.dateIcon} 
            />
            <Text style={[
              styles.dateText,
              isDark ? styles.dateTextDark : null,
            ]}>
              {formattedDate}
            </Text>
          </View>
          
          <View style={[
            styles.languageTag,
            { backgroundColor: isDark ? Colors.accent[900] : Colors.accent[100] }
          ]}>
            <Text style={[
              styles.languageText,
              { color: isDark ? Colors.accent[300] : Colors.accent[700] }
            ]}>
              {note.language.name}
            </Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  title: {
    fontSize: typography.fontSizes.lg,
    fontWeight: '600',
    color: Colors.gray[900],
    flex: 1,
  },
  titleDark: {
    color: Colors.gray[100],
  },
  optionsButton: {
    padding: 4,
  },
  nativeText: {
    fontSize: typography.fontSizes.md,
    color: Colors.gray[800],
    marginBottom: spacing.xs,
  },
  nativeTextDark: {
    color: Colors.gray[300],
  },
  romanizedText: {
    fontSize: typography.fontSizes.sm,
    color: Colors.gray[600],
    marginBottom: spacing.md,
    fontStyle: 'italic',
  },
  romanizedTextDark: {
    color: Colors.gray[400],
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateIcon: {
    marginRight: 4,
  },
  dateText: {
    fontSize: typography.fontSizes.xs,
    color: Colors.gray[600],
  },
  dateTextDark: {
    color: Colors.gray[500],
  },
  languageTag: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: sizes.borderRadius.full,
  },
  languageText: {
    fontSize: typography.fontSizes.xs,
    fontWeight: '500',
  },
});