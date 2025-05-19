import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Plus } from 'lucide-react-native';
import SearchBar from '@/components/ui/SearchBar';
import NoteCard from '@/components/notes/NoteCard';
import Button from '@/components/ui/Button';
import Colors from '@/constants/Colors';
import { spacing, typography } from '@/constants/Theme';
import { NOTES } from '@/utils/mockData';
import { Note } from '@/types';
import useTheme from '@/hooks/useThemeContext';
import Navbar from '@/components/layout/Navbar';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredNotes, setFilteredNotes] = useState<Note[]>(NOTES);
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    if (text.trim() === '') {
      setFilteredNotes(NOTES);
    } else {
      const lowercasedText = text.toLowerCase();
      const filtered = NOTES.filter(
        note =>
          note.title.toLowerCase().includes(lowercasedText) ||
          note.content.toLowerCase().includes(lowercasedText) ||
          note.romanizedContent.toLowerCase().includes(lowercasedText) ||
          note.language.name.toLowerCase().includes(lowercasedText)
      );
      setFilteredNotes(filtered);
    }
  };

  const navigateToRecording = () => {
    router.push('/(tabs)/record');
  };

  const navigateToNoteDetails = (noteId: string) => {
    router.push(`/note/${noteId}`);
  };

  return (
    <View style={[
      styles.container,
      { backgroundColor: isDark ? Colors.dark.background : Colors.light.background }
    ]}>
      <Navbar title="My Notes" />
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[
            styles.headerTitle,
            { color: isDark ? Colors.light.text : Colors.dark.text }
          ]}>
            {filteredNotes.length} Notes
          </Text>
          <Button
            title="New Note"
            leftIcon={<Plus size={18} color="#fff" />}
            size="small"
            onPress={navigateToRecording}
          />
        </View>

        <SearchBar 
          value={searchQuery} 
          onChangeText={handleSearch} 
          placeholder="Search by title, content, or language..."
        />

        {filteredNotes.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={[
              styles.emptyText,
              { color: isDark ? Colors.gray[400] : Colors.gray[600] }
            ]}>
              No notes found. Try a different search or create a new note.
            </Text>
            <Button
              title="Create New Note"
              variant="outline"
              onPress={navigateToRecording}
              style={styles.emptyButton}
            />
          </View>
        ) : (
          <FlatList
            data={filteredNotes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <NoteCard 
                note={item} 
                onPress={() => navigateToNoteDetails(item.id)}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.notesList}
          />
        )}
      </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Platform.OS === 'web' ? spacing.md : 0,
  },
  headerTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: '600',
  },
  notesList: {
    paddingBottom: spacing.xl,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyText: {
    fontSize: typography.fontSizes.md,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  emptyButton: {
    marginTop: spacing.md,
  },
});