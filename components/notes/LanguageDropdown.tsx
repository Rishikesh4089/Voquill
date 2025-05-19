import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Platform,
} from 'react-native';
import { ChevronDown, Check } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { spacing, sizes, typography } from '@/constants/Theme';
import { Language } from '@/types';
import useTheme from '@/hooks/useThemeContext';

interface LanguageDropdownProps {
  value: Language;
  onChange: (language: Language) => void;
  languages: Language[];
}

export default function LanguageDropdown({
  value,
  onChange,
  languages,
}: LanguageDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (language: Language) => {
    onChange(language);
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      <Text style={[
        styles.label,
        { color: isDark ? Colors.gray[300] : Colors.gray[700] }
      ]}>
        Language
      </Text>
      
      <TouchableOpacity
        style={[
          styles.dropdown,
          { 
            backgroundColor: isDark ? Colors.dark.background : Colors.light.background,
            borderColor: isDark ? Colors.gray[700] : Colors.gray[300],
          }
        ]}
        onPress={toggleDropdown}
      >
        <View style={styles.selectedContainer}>
          <Text style={[
            styles.selectedText,
            { color: isDark ? Colors.gray[200] : Colors.gray[800] }
          ]}>
            {value.name}
          </Text>
          <Text style={[
            styles.nativeText,
            { color: isDark ? Colors.gray[400] : Colors.gray[600] }
          ]}>
            {value.nativeName}
          </Text>
        </View>
        <ChevronDown
          size={20}
          color={isDark ? Colors.gray[400] : Colors.gray[500]}
        />
      </TouchableOpacity>

      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsOpen(false)}
        >
          <View
            style={[
              styles.modalContent,
              { 
                backgroundColor: isDark ? Colors.dark.card : Colors.light.card,
                ...Platform.select({
                  web: {
                    maxWidth: 400,
                    alignSelf: 'center',
                    marginTop: 100,
                  },
                }),
              }
            ]}
          >
            <Text style={[
              styles.modalTitle,
              { color: isDark ? Colors.light.text : Colors.dark.text }
            ]}>
              Select Language
            </Text>
            <ScrollView style={styles.languageList}>
              {languages.map((language) => (
                <TouchableOpacity
                  key={language.id}
                  style={[
                    styles.languageItem,
                    value.id === language.id && styles.selectedItem,
                    value.id === language.id && 
                      { backgroundColor: isDark ? Colors.primary[900] : Colors.primary[50] }
                  ]}
                  onPress={() => handleSelect(language)}
                >
                  <View style={styles.languageInfo}>
                    <Text style={[
                      styles.languageName,
                      { color: isDark ? Colors.light.text : Colors.dark.text }
                    ]}>
                      {language.name}
                    </Text>
                    <Text style={[
                      styles.languageNative,
                      { color: isDark ? Colors.gray[400] : Colors.gray[600] }
                    ]}>
                      {language.nativeName}
                    </Text>
                  </View>
                  {value.id === language.id && (
                    <Check
                      size={20}
                      color={isDark ? Colors.primary[300] : Colors.primary[600]}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  label: {
    marginBottom: spacing.xs,
    fontSize: typography.fontSizes.sm,
    fontWeight: '500',
  },
  dropdown: {
    height: sizes.inputHeight,
    borderWidth: 1,
    borderRadius: sizes.borderRadius.md,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedContainer: {
    flex: 1,
  },
  selectedText: {
    fontSize: typography.fontSizes.md,
  },
  nativeText: {
    fontSize: typography.fontSizes.sm,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    padding: spacing.md,
  },
  modalContent: {
    borderRadius: sizes.borderRadius.lg,
    padding: spacing.md,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: '600',
    marginBottom: spacing.md,
    paddingHorizontal: spacing.sm,
  },
  languageList: {
    maxHeight: 300,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: sizes.borderRadius.md,
  },
  selectedItem: {
    borderRadius: sizes.borderRadius.md,
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: typography.fontSizes.md,
    fontWeight: '500',
  },
  languageNative: {
    fontSize: typography.fontSizes.sm,
    marginTop: 2,
  },
});