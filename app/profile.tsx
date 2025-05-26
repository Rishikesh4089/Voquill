import React from 'react';
import Navbar from '@/components/layout/Navbar';
import { View, Text, StyleSheet } from 'react-native';
import useTheme from '@/hooks/useThemeContext';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function Profile() {
  const {theme} = useTheme();
  const isDark = theme === 'dark';

  return (
   <View style={[
         styles.container,
         { backgroundColor: isDark ? Colors.dark.background : Colors.light.background }
       ]}>
      <Navbar title="Profile" />
      <View style={styles.container}>
        <Text style={styles.heading}>Profile</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
