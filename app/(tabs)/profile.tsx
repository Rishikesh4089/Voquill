import Navbar from '@/components/layout/Navbar';
import { View, Text, StyleSheet } from 'react-native';

export default function Profile() {
  return (
    <View style={styles.container}>
        <Navbar title='Profile' />
      <Text style={styles.heading}>This is the profile page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    marginTop: 20,
    marginLeft: 20,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
