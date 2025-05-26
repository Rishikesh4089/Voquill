import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacityProps,
  Platform,
  ColorValue,
  StyleProp,
  TextStyle,
} from 'react-native';
import Colors from '@/constants/Colors';
import { typography, sizes, spacing } from '@/constants/Theme';
import useTheme from '@/hooks/useThemeContext';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  titleStyle?: StyleProp<TextStyle>;
  size?: 'small' | 'medium' | 'large';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export default function Button({
  title,
  variant = 'primary',
  titleStyle,
  size = 'medium',
  isLoading = false,
  leftIcon,
  rightIcon,
  style,
  disabled,
  ...props
}: ButtonProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Get styles based on variant, size, and disabled state
  const getContainerStyle = () => {
    const baseStyle = [styles.container, sizeStyles[size]];
    
    // Add variant-specific styles
    switch (variant) {
      case 'primary':
        baseStyle.push(
          styles.primaryContainer,
          isDark && styles.primaryContainerDark,
          disabled && styles.disabledContainer
        );
        break;
      case 'secondary':
        baseStyle.push(
          styles.secondaryContainer,
          isDark && styles.secondaryContainerDark,
          disabled && styles.disabledContainer
        );
        break;
      case 'outline':
        baseStyle.push(
          styles.outlineContainer,
          isDark && styles.outlineContainerDark,
          disabled && styles.disabledOutlineContainer
        );
        break;
      case 'ghost':
        baseStyle.push(
          styles.ghostContainer,
          disabled && styles.disabledGhostContainer
        );
        break;
      case 'danger':
        baseStyle.push(
          styles.dangerContainer,
          disabled && styles.disabledContainer
        );
        break;
    }
    
    return baseStyle;
  };

  const getTextStyle = () => {
    const baseStyle = [styles.text, sizeStyles[`${size}Text`]];
    
    // Add variant-specific text styles
    switch (variant) {
      case 'primary':
        baseStyle.push(styles.primaryText);
        break;
      case 'secondary':
        baseStyle.push(styles.secondaryText);
        break;
      case 'outline':
        baseStyle.push(
          styles.outlineText,
          isDark && styles.outlineTextDark,
          disabled && styles.disabledText
        );
        break;
      case 'ghost':
        baseStyle.push(
          styles.ghostText,
          isDark && styles.ghostTextDark,
          disabled && styles.disabledText
        );
        break;
      case 'danger':
        baseStyle.push(styles.dangerText);
        break;
    }
    
    return baseStyle;
  };

  return (
    <TouchableOpacity
      style={[getContainerStyle(), style]}
      disabled={disabled || isLoading}
      {...props}
    >
      <View style={styles.contentContainer}>
        {isLoading ? (
          <ActivityIndicator 
            color={
              variant === 'outline' || variant === 'ghost'
                ? (isDark ? Colors.light.text : Colors.primary[500])
                : Colors.light.text
            }
            size="small"
          />
        ) : (
          <>
            {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
            <Text style={[getTextStyle(), titleStyle]}>{title}</Text>
            {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
          </>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: sizes.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: typography.fontSizes.md,
    fontWeight: '600',
  },
  // Variant: Primary
  primaryContainer: {
    backgroundColor: Colors.primary[500],
  },
  primaryContainerDark: {
    backgroundColor: Colors.primary[600],
  },
  primaryText: {
    color: Colors.light.text,
  },
  // Variant: Secondary
  secondaryContainer: {
    backgroundColor: Colors.secondary[500],
  },
  secondaryContainerDark: {
    backgroundColor: Colors.secondary[600],
  },
  secondaryText: {
    color: Colors.light.text,
    fontSize: typography.fontSizes.md,
  },
  // Variant: Outline
  outlineContainer: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.primary[500],
  },
  outlineContainerDark: {
    borderColor: Colors.primary[400],
  },
  outlineText: {
    color: Colors.primary[500],
  },
  outlineTextDark: {
    color: Colors.primary[400],
  },
  // Variant: Ghost
  ghostContainer: {
    backgroundColor: 'transparent',
  },
  ghostText: {
    color: Colors.primary[500],
  },
  ghostTextDark: {
    color: Colors.primary[400],
  },
  // Variant: Danger
  dangerContainer: {
    backgroundColor: Colors.error[500],
  },
  dangerText: {
    color: Colors.light.text,
  },
  // Disabled State
  disabledContainer: {
    backgroundColor: Colors.gray[300],
  },
  disabledOutlineContainer: {
    borderColor: Colors.gray[400],
  },
  disabledGhostContainer: {
    opacity: 0.6,
  },
  disabledText: {
    color: Colors.gray[500],
  },
  // Size: Small
  small: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    height: 32,
  },
  smallText: {
    fontSize: typography.fontSizes.sm,
  },
  // Size: Medium
  medium: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    height: 44,
  },
  mediumText: {
    fontSize: typography.fontSizes.md,
  },
  // Size: Large
  large: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    height: 52,
  },
  largeText: {
    fontSize: typography.fontSizes.lg,
  },
  // Icon positioning
  iconLeft: {
    marginRight: spacing.xs,
  },
  iconRight: {
    marginLeft: spacing.xs,
  },
});

const sizeStyles: Record<string, any> = {
  small: styles.small,
  medium: styles.medium,
  large: styles.large,
  smallText: styles.smallText,
  mediumText: styles.mediumText,
  largeText: styles.largeText,
};