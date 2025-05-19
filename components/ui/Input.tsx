import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TextInputProps,
  Platform,
} from 'react-native';
import { Eye, EyeOff } from 'lucide-react-native';
import Colors from '@/constants/Colors';
import { typography, sizes, spacing } from '@/constants/Theme';
import useTheme from '@/hooks/useThemeContext';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isPassword?: boolean;
}

export default function Input({
  label,
  error,
  leftIcon,
  rightIcon,
  isPassword = false,
  style,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const getContainerStyle = () => {
    return [
      styles.container,
      isFocused && styles.containerFocused,
      error && styles.containerError,
      isDark && styles.containerDark,
    ];
  };

  const getInputStyle = () => {
    return [
      styles.input,
      isDark ? styles.inputDark : undefined,
      leftIcon ? styles.inputWithLeftIcon : undefined,
      (rightIcon || isPassword) ? styles.inputWithRightIcon : undefined,
    ];
  };

  const renderPasswordIcon = () => {
    if (!isPassword) return null;

    return (
      <View style={styles.rightIconContainer}>
        {isPasswordVisible ? (
          <Eye 
            size={20} 
            color={isDark ? Colors.gray[400] : Colors.gray[500]} 
            onPress={togglePasswordVisibility} 
          />
        ) : (
          <EyeOff 
            size={20} 
            color={isDark ? Colors.gray[400] : Colors.gray[500]} 
            onPress={togglePasswordVisibility} 
          />
        )}
      </View>
    );
  };

  return (
    <View style={styles.wrapper}>
      {label && (
        <Text style={[styles.label, isDark && styles.labelDark]}>
          {label}
        </Text>
      )}
      <View style={getContainerStyle()}>
        {leftIcon && <View style={styles.leftIconContainer}>{leftIcon}</View>}
        <TextInput
          style={[getInputStyle(), style]}
          placeholderTextColor={isDark ? Colors.gray[600] : Colors.gray[400]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={isPassword && !isPasswordVisible}
          autoCapitalize="none"
          {...props}
        />
        {renderPasswordIcon() || (rightIcon && <View style={styles.rightIconContainer}>{rightIcon}</View>)}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing.md,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.gray[300],
    borderRadius: sizes.borderRadius.md,
    backgroundColor: Colors.light.background,
    height: sizes.inputHeight,
  },
  containerDark: {
    backgroundColor: Colors.dark.background,
    borderColor: Colors.gray[700],
  },
  containerFocused: {
    borderColor: Colors.primary[500],
  },
  containerError: {
    borderColor: Colors.error[500],
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: spacing.md,
    color: Colors.gray[900],
    fontSize: typography.fontSizes.md,
    ...Platform.select({
      web: {
        outlineStyle: 'none',
      },
    }),
  },
  inputDark: {
    color: Colors.gray[100],
  },
  inputWithLeftIcon: {
    paddingLeft: 0,
  },
  inputWithRightIcon: {
    paddingRight: 0,
  },
  label: {
    marginBottom: spacing.xs,
    fontSize: typography.fontSizes.sm,
    fontWeight: '500',
    color: Colors.gray[700],
  },
  labelDark: {
    color: Colors.gray[300],
  },
  leftIconContainer: {
    paddingHorizontal: spacing.md,
  },
  rightIconContainer: {
    paddingHorizontal: spacing.md,
  },
  errorText: {
    color: Colors.error[500],
    fontSize: typography.fontSizes.sm,
    marginTop: spacing.xs,
  },
});