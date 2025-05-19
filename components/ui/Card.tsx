import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import Colors from '@/constants/Colors';
import { sizes, shadows } from '@/constants/Theme';
import useTheme from '@/hooks/useThemeContext';

interface CardProps extends ViewProps {
  variant?: 'elevated' | 'outlined' | 'filled';
}

export default function Card({
  children,
  style,
  variant = 'elevated',
  ...props
}: CardProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const getCardStyle = () => {
    const baseStyles = [];

    switch (variant) {
      case 'elevated':
        baseStyles.push(
          styles.card,
          styles.elevatedCard,
          isDark ? styles.elevatedCardDark : null,
          isDark ? shadows.dark.md : shadows.light.md
        );
        break;
      case 'outlined':
        baseStyles.push(
          styles.card,
          styles.outlinedCard,
          isDark ? styles.outlinedCardDark : null
        );
        break;
      case 'filled':
        baseStyles.push(
          styles.card,
          styles.filledCard,
          isDark ? styles.filledCardDark : null
        );
        break;
      default:
        baseStyles.push(styles.card);
        break;
    }

    return baseStyles;
  };

  return (
    <View style={[getCardStyle(), style]} {...props}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: sizes.borderRadius.lg,
    padding: 16,
  },
  elevatedCard: {
    backgroundColor: Colors.light.card,
  },
  elevatedCardDark: {
    backgroundColor: Colors.dark.card,
  },
  outlinedCard: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.gray[200],
  },
  outlinedCardDark: {
    borderColor: Colors.gray[700],
  },
  filledCard: {
    backgroundColor: Colors.gray[100],
  },
  filledCardDark: {
    backgroundColor: Colors.gray[800],
  },
});