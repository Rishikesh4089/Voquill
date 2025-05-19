import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Platform, KeyboardAvoidingView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Colors from '@/constants/Colors';
import { spacing, typography, sizes } from '@/constants/Theme';
import Button from '@/components/ui/Button';
import Navbar from '@/components/layout/Navbar';
import LanguageDropdown from '@/components/notes/LanguageDropdown';
import { NOTES } from '@/utils/mockData';
import { Note } from '@/types';
import LANGUAGES from '@/constants/Languages';
import useTheme from '@/hooks/useThemeContext';

export default function EditNoteScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [note, setNote] = useState<Note | null>(null);
  const [title, setTitle] = useState('');
  const [nativeText, setNativeText] = useState('');
  const [romanizedText, setRomanizedText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0]);
  const [isSaving, setIsSaving] = useState(false);
  
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    // Find the note with the matching ID
    const foundNote = NOTES.find(n => n.id === id);
    if (foundNote) {
      setNote(foundNote);
      setTitle(foundNote.title);
      setNativeText(foundNote.content);
      setRomanizedText(foundNote.romanizedContent);
      setSelectedLanguage(foundNote.language);
    }
  }, [id]);

  const handleSave = () => {
    if (!title || !nativeText || !romanizedText) return;
    
    setIsSaving(true);
    
    // Simulate API call to update the note
    setTimeout(() => {
      setIsSaving(false);
      router.push(`/note/${id}`);
    }, 1000);
  };

  const handleCancel = () => {
    router.back();
  };

  if (!note) {
    return (
      <View style={[
        styles.container,
        { backgroundColor: isDark ? Colors.dark.background : Colors.light.background }
      ]}>
        <Navbar title="Edit Note" />
        <Text style={[
          styles.notFoundText,
          { color: isDark ? Colors.gray[400] : Colors.gray[600] }
        ]}>
          Note not found
        </Text>
        <Button
          title="Go Back"
          variant="outline"
          onPress={handleCancel}
          style={styles.backButton}
        />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[
        styles.container,
        { backgroundColor: isDark ? Colors.dark.background : Colors.light.background }
      ]}
    >
      <Navbar title="Edit Note" />
      
      <ScrollView style={styles.content}>
        <View style={styles.formField}>
          <Text style={[
            styles.label,
            { color: isDark ? Colors.gray[300] : Colors.gray[700] }
          ]}>
            Title
          </Text>
          <TextInput
            style={[
              styles.titleInput,
              { 
                backgroundColor: isDark ? Colors.gray[800] : Colors.gray[100],
                borderColor: isDark ? Colors.gray[700] : Colors.gray[300],
                color: isDark ? Colors.light.text : Colors.dark.text,
              }
            ]}
            placeholder="Enter note title"
            placeholderTextColor={isDark ? Colors.gray[500] : Colors.gray[500]}
            value={title}
            onChangeText={setTitle}
          />
        </View>

        <LanguageDropdown
          value={selectedLanguage}
          onChange={setSelectedLanguage}
          languages={LANGUAGES}
        />

        <View style={styles.formField}>
          <Text style={[
            styles.label,
            { color: isDark ? Colors.gray[300] : Colors.gray[700] }
          ]}>
            {selectedLanguage.name} Text
          </Text>
          <TextInput
            style={[
              styles.textArea,
              { 
                backgroundColor: isDark ? Colors.gray[800] : Colors.gray[100],
                borderColor: isDark ? Colors.gray[700] : Colors.gray[300],
                color: isDark ? Colors.light.text : Colors.dark.text,
              }
            ]}
            placeholder={`Enter text in ${selectedLanguage.name}`}
            placeholderTextColor={isDark ? Colors.gray[500] : Colors.gray[500]}
            value={nativeText}
            onChangeText={setNativeText}
            multiline
          />
        </View>

        <View style={styles.formField}>
          <Text style={[
            styles.label,
            { color: isDark ? Colors.gray[300] : Colors.gray[700] }
          ]}>
            Romanized Text
          </Text>
          <TextInput
            style={[
              styles.textArea,
              { 
                backgroundColor: isDark ? Colors.gray[800] : Colors.gray[100],
                borderColor: isDark ? Colors.gray[700] : Colors.gray[300],
                color: isDark ? Colors.light.text : Colors.dark.text,
              }
            ]}
            placeholder="Enter romanized text"
            placeholderTextColor={isDark ? Colors.gray[500] : Colors.gray[500]}
            value={romanizedText}
            onChangeText={setRomanizedText}
            multiline
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Save Changes"
            onPress={handleSave}
            isLoading={isSaving}
            style={styles.saveButton}
          />
          <Button
            title="Cancel"
            variant="outline"
            onPress={handleCancel}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  formField: {
    marginBottom: spacing.md,
  },
  label: {
    marginBottom: spacing.xs,
    fontSize: typography.fontSizes.sm,
    fontWeight: '500',
  },
  titleInput: {
    borderWidth: 1,
    borderRadius: sizes.borderRadius.md,
    padding: spacing.md,
    fontSize: typography.fontSizes.md,
    // Removed outlineStyle as it's not supported in React Native
  },
  textArea: {
    borderWidth: 1,
    borderRadius: sizes.borderRadius.md,
    padding: spacing.md,
    fontSize: typography.fontSizes.md,
    minHeight: 120,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    marginTop: spacing.lg,
    marginBottom: spacing.xxl,
  },
  saveButton: {
    marginBottom: spacing.md,
  },
  notFoundText: {
    fontSize: typography.fontSizes.lg,
    textAlign: 'center',
    marginTop: 100,
    marginBottom: spacing.md,
  },
  backButton: {
    alignSelf: 'center',
    width: 200,
  },
});