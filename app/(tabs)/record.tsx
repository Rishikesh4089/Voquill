import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Navbar from '@/components/layout/Navbar';
import LanguageDropdown from '@/components/notes/LanguageDropdown';
import VoiceRecorder from '@/components/notes/VoiceRecorder';
import TransliterationPreview from '@/components/notes/TransliterationPreview';
import Colors from '@/constants/Colors';
import { spacing, typography, sizes } from '@/constants/Theme';
import { Language, RecordingStatus } from '@/types';
import LANGUAGES from '@/constants/Languages';
import useTheme from '@/hooks/useThemeContext';

export default function RecordScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(LANGUAGES[0]);
  const [recordingStatus, setRecordingStatus] = useState<RecordingStatus>(RecordingStatus.IDLE);
  const [recordingUri, setRecordingUri] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [nativeText, setNativeText] = useState('');
  const [romanizedText, setRomanizedText] = useState('');
  const [isTransliterating, setIsTransliterating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const router = useRouter();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleRecordingStatusChange = (status: RecordingStatus) => {
    setRecordingStatus(status);
  };

  const handleRecordingComplete = (uri: string) => {
    setRecordingUri(uri);
    // Simulate speech-to-text conversion
    setTimeout(() => {
      if (selectedLanguage.code === 'hi') {
        setNativeText('नमस्ते, यह एक परीक्षण संदेश है। आशा है आपका दिन अच्छा जा रहा है।');
      } else if (selectedLanguage.code === 'ta') {
        setNativeText('வணக்கம், இது ஒரு சோதனை செய்தி. உங்கள் நாள் நன்றாக இருக்கிறது என நம்புகிறேன்.');
      } else if (selectedLanguage.code === 'mr') {
        setNativeText('नमस्कार, हा एक चाचणी संदेश आहे. आशा आहे की तुमचा दिवस छान जात आहे.');
      } else {
        setNativeText('यह एक परीक्षण संदेश है। कृपया अनुवाद के लिए अगला बटन दबाएं।');
      }
    }, 1500);
  };

  const handleTransliterate = () => {
    if (!nativeText) return;
    
    setIsTransliterating(true);
    
    // Simulate API call for transliteration
    setTimeout(() => {
      if (selectedLanguage.code === 'hi') {
        setRomanizedText('Namaste, yeh ek parikshan sandesh hai. Asha hai aapka din achcha ja raha hai.');
      } else if (selectedLanguage.code === 'ta') {
        setRomanizedText('Vanakkam, ithu oru sothanai seythi. Ungal naal nandraga irukkivathu ena nambugiren.');
      } else if (selectedLanguage.code === 'mr') {
        setRomanizedText('Namaskar, ha ek chachani sandesh aahe. Asha aahe ki tumcha divas chhan jat aahe.');
      } else {
        setRomanizedText('Yeh ek parikshan sandesh hai. Kripaya anuvad ke liye agla button dabayen.');
      }
      setIsTransliterating(false);
    }, 2000);
  };

  const handleSave = () => {
    if (!title || !nativeText || !romanizedText) return;
    
    setIsSaving(true);
    
    // Simulate saving to API
    setTimeout(() => {
      setIsSaving(false);
      router.replace('/(tabs)');
    }, 1500);
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <View style={[
      styles.container,
      { backgroundColor: isDark ? Colors.dark.background : Colors.light.background }
    ]}>
      <Navbar title="Record Note" />
      
      <ScrollView style={styles.content}>
        <Card style={styles.card}>
          <Text style={[
            styles.sectionTitle,
            { color: isDark ? Colors.light.text : Colors.dark.text }
          ]}>
            Create New Note
          </Text>
          
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

          <VoiceRecorder
            onRecordingStatusChange={handleRecordingStatusChange}
            onRecordingComplete={handleRecordingComplete}
          />

          <TransliterationPreview
            nativeText={nativeText}
            romanizedText={romanizedText}
            language={selectedLanguage.name}
            isLoading={isTransliterating}
          />

          <View style={styles.buttonContainer}>
            {nativeText && !romanizedText && (
              <Button
                title="Transliterate"
                onPress={handleTransliterate}
                isLoading={isTransliterating}
                style={styles.actionButton}
              />
            )}
            
            {nativeText && romanizedText && (
              <Button
                title="Save Note"
                onPress={handleSave}
                isLoading={isSaving}
                style={styles.actionButton}
              />
            )}
            
            <Button
              title="Cancel"
              variant="outline"
              onPress={handleCancel}
              style={styles.cancelButton}
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
  card: {
    padding: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.fontSizes.xl,
    fontWeight: '600',
    marginBottom: spacing.lg,
    textAlign: 'center',
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
  buttonContainer: {
    marginTop: spacing.lg,
  },
  actionButton: {
    marginBottom: spacing.md,
  },
  cancelButton: {
    marginBottom: spacing.md,
  },
});