import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mini Task Application</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Tasks')}>
        <Text style={styles.buttonText}>Open Task</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f2f2f2' },
  title: { fontSize: 26, fontWeight: 'bold', marginBottom: 30 },
  button: { backgroundColor: '#4A6CF7', paddingVertical: 12, paddingHorizontal: 30, borderRadius: 25 },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});