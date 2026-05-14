import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import { addTask } from '../database';

export default function AddTaskScreen() {
  const [title, setTitle] = useState('');

  async function handleAdd() {
    if (!title.trim()) {
      Alert.alert('Please enter a task name.');
      return;
    }
    await addTask(title.trim());
    setTitle('');
    Alert.alert('Task added!');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>New Task:</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Buy groceries"
        value={title}
        onChangeText={setTitle}
      />
      <Button title="Add Task" onPress={handleAdd} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 40 },
  label: { fontSize: 16, marginBottom: 8 },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8,
    padding: 10, marginBottom: 16, fontSize: 16,
  },
});