import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Share, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { ChevronLeft, Edit2, Trash2, Share2, Calendar } from 'lucide-react-native';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Colors from '@/constants/Colors';
import { spacing, typography } from '@/constants/Theme';
import { NOTES } from '@/utils/mockData';
import { Note } from '@/types';
import useTheme from '@/hooks/useThemeContext';

export default function NoteDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [note, setNote] = useState<Note | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    // Find the note with the matching ID
    const foundNote = NOTES.find(n => n.id === id);
    setNote(foundNote || null);
  }, [id]);

  const handleGoBack = () => {
    router.back();
  };

  const handleEdit = () => {
    router.push(`/note/edit/${id}`);
  };

  const handleDelete = () => {
    setIsDeleting(true);
    
    // Simulate deletion API call
    setTimeout(() => {
      setIsDeleting(false);
      router.replace('/(tabs)');
    }, 1000);
  };

  const handleShare = async () => {
    if (!note) return;
    
    try {
      await Share.share({
        title: note.title,
        message: `${note.romanizedContent}\n\nOriginal text: ${note.content}`,
      });
    } catch (error) {
      console.error('Error sharing note:', error);
    }
  };

  if (!note) {
    return (
      <View style={[
        styles.container,
        { backgroundColor: isDark ? Colors.dark.background : Colors.light.background }
      ]}>
        <Text style={[
          styles.notFoundText,
          { color: isDark ? Colors.gray[400] : Colors.gray[600] }
        ]}>
          Note not found
        </Text>
        <Button
          title="Go Back"
          variant="outline"
          onPress={handleGoBack}
          style={styles.backButton}
        />
      </View>
    );
  }

  const formattedDate = new Date(note.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <View style={[
      styles.container,
      { backgroundColor: isDark ? Colors.dark.background : Colors.light.background }
    ]}>
      <View style={[
        styles.header,
        { backgroundColor: isDark ? Colors.dark.card : Colors.light.card }
      ]}>
        <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
          <ChevronLeft size={24} color={isDark ? Colors.gray[300] : Colors.gray[700]} />
        </TouchableOpacity>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton} onPress={handleEdit}>
            <Edit2 size={20} color={isDark ? Colors.gray[300] : Colors.gray[700]} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
            <Share2 size={20} color={isDark ? Colors.gray[300] : Colors.gray[700]} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton} onPress={handleDelete}>
            <Trash2 size={20} color={Colors.error[500]} />
          </TouchableOpacity>
        </View>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={[
            styles.title,
            { color: isDark ? Colors.light.text : Colors.dark.text }
          ]}>
            {note.title}
          </Text>
          <View style={styles.dateContainer}>
            <Calendar size={16} color={isDark ? Colors.gray[400] : Colors.gray[600]} style={styles.dateIcon} />
            <Text style={[
              styles.dateText,
              { color: isDark ? Colors.gray[400] : Colors.gray[600] }
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
        
        <Card style={styles.card}>
          <Text style={[
            styles.sectionTitle,
            { color: isDark ? Colors.gray[300] : Colors.gray[700] }
          ]}>
            {note.language.name} Text
          </Text>
          <Text style={[
            styles.nativeText,
            { color: isDark ? Colors.light.text : Colors.dark.text }
          ]}>
            {note.content}
          </Text>
        </Card>
        
        <Card style={styles.card}>
          <Text style={[
            styles.sectionTitle,
            { color: isDark ? Colors.gray[300] : Colors.gray[700] }
          ]}>
            Romanized Text
          </Text>
          <Text style={[
            styles.romanizedText,
            { color: isDark ? Colors.gray[400] : Colors.gray[600] }
          ]}>
            {note.romanizedContent}
          </Text>
        </Card>
        
        {isDeleting && (
          <View style={[
            styles.deletingOverlay,
            { backgroundColor: isDark ? 'rgba(0,0,0,0.7)' : 'rgba(255,255,255,0.7)' }
          ]}>
            <Text style={[
              styles.deletingText,
              { color: isDark ? Colors.light.text : Colors.dark.text }
            ]}>
              Deleting note...
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    paddingBottom: 15,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[200],
  },
  backButton: {
    padding: spacing.xs,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: spacing.sm,
    marginLeft: spacing.sm,
  },
  content: {
    flex: 1,
    padding: spacing.md,
  },
  titleContainer: {
    marginBottom: spacing.md,
    paddingHorizontal: spacing.sm,
  },
  title: {
    fontSize: typography.fontSizes.xxl,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  dateIcon: {
    marginRight: spacing.xs,
  },
  dateText: {
    fontSize: typography.fontSizes.sm,
  },
  languageTag: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 999,
    marginBottom: spacing.md,
  },
  languageText: {
    fontSize: typography.fontSizes.xs,
    fontWeight: '500',
  },
  card: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSizes.md,
    fontWeight: '600',
    marginBottom: spacing.sm,
  },
  nativeText: {
    fontSize: typography.fontSizes.lg,
    lineHeight: 28,
  },
  romanizedText: {
    fontSize: typography.fontSizes.md,
    fontStyle: 'italic',
    lineHeight: 24,
  },
  notFoundText: {
    fontSize: typography.fontSizes.lg,
    textAlign: 'center',
    marginTop: 100,
    marginBottom: spacing.md,
  },
  deletingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999,
  },
  deletingText: {
    fontSize: typography.fontSizes.lg,
    fontWeight: '600',
  },
});