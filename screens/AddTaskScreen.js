import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useState } from 'react';
import { addTask } from '../database';

export default function AddTaskScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');

  function handleSave() {
    if (!title.trim()) {
      Alert.alert('Please enter a task title.');
      return;
    }
    addTask(title.trim(), description.trim(), status);
    setTitle('');
    setDescription('');
    setStatus('pending');
    Alert.alert('Saved!', `Task "${title}" added Successfully`);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Task</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Task title:"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Enter Task Description:"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <Text style={styles.label}>Select Status</Text>
      <View style={styles.statusRow}>
        {['pending', 'Ongoing', 'Finished'].map((s) => (
          <TouchableOpacity
            key={s}
            style={[styles.statusBtn, status === s && styles.statusActive]}
            onPress={() => setStatus(s)}
          >
            <Text style={[styles.statusText, status === s && styles.statusTextActive]}>{s}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveBtnText}>Save Task</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f2f2f2' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, marginTop: 10 },
  input: {
    backgroundColor: 'white', borderRadius: 8, padding: 12,
    marginBottom: 12, fontSize: 15, borderWidth: 1, borderColor: '#ddd',
  },
  textArea: { height: 100, textAlignVertical: 'top' },
  label: { fontSize: 15, fontWeight: '600', marginBottom: 10 },
  statusRow: { flexDirection: 'row', gap: 10, marginBottom: 24 },
  statusBtn: {
    paddingVertical: 8, paddingHorizontal: 18, borderRadius: 20,
    borderWidth: 1, borderColor: '#ccc', backgroundColor: 'white',
  },
  statusActive: { backgroundColor: '#4A6CF7', borderColor: '#4A6CF7' },
  statusText: { color: '#333', fontSize: 14 },
  statusTextActive: { color: 'white' },
  saveBtn: { backgroundColor: '#1a1a2e', padding: 16, borderRadius: 12, alignItems: 'center' },
  saveBtnText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});