import React from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Platform } from 'react-native';
import { Search, X } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { spacing, typography } from '@/constants/Theme';
import useTheme from '@/hooks/useThemeContext';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear?: () => void;
  placeholder?: string;
}

export default function SearchBar({ 
  value, 
  onChangeText, 
  onClear,
  placeholder = 'Search notes...' 
}: SearchBarProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleClear = () => {
    onChangeText('');
    if (onClear) {
      onClear();
    }
  };

  return (
    <View style={[
      styles.container,
      isDark ? styles.containerDark : null,
    ]}>
      <Search 
        size={20} 
        color={isDark ? Colors.gray[400] : Colors.gray[500]} 
        style={styles.icon} 
      />
      <TextInput
        style={[
          styles.input,
          isDark ? styles.inputDark : null,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={isDark ? Colors.gray[500] : Colors.gray[400]}
        autoCapitalize="none"
        clearButtonMode="never"
      />
      {value.length > 0 && (
        <TouchableOpacity onPress={handleClear} style={styles.clearButton}>
          <X size={18} color={isDark ? Colors.gray[400] : Colors.gray[500]} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.gray[100],
    borderRadius: 9999,
    paddingHorizontal: spacing.md,
    height: 44,
    marginVertical: spacing.md,
  },
  containerDark: {
    backgroundColor: Colors.gray[800],
  },
  icon: {
    marginRight: spacing.xs,
  },
  input: {
    flex: 1,
    fontSize: typography.fontSizes.md,
    color: Colors.gray[900],
    height: '100%',
    ...Platform.select({
      web: {
        outlineStyle: 'none',
      },
    }),
  },
  inputDark: {
    color: Colors.gray[100],
  },
  clearButton: {
    padding: spacing.xs,
  },
});