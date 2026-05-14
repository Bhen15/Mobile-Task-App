import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getTaskById } from '../database';

export default function TaskDetailScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const task = getTaskById(route.params.taskId);

  const statusColor = (status) => {
    if (status === 'pending') return '#4A6CF7';
    if (status === 'Ongoing') return '#FFA500';
    if (status === 'Finished') return '#4CAF50';
    return '#999';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Task Detail</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Task ID</Text>
        <Text style={styles.value}>{task.id}</Text>

        <Text style={styles.label}>Title</Text>
        <Text style={styles.value}>{task.title}</Text>

        <Text style={styles.label}>Description</Text>
        <Text style={styles.value}>{task.description || 'No description'}</Text>

        <Text style={styles.label}>Status</Text>
        <Text style={[styles.value, { color: statusColor(task.status) }]}>● {task.status}</Text>
      </View>
      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.backBtnText}>← Go Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f2f2f2' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, marginTop: 10 },
  card: { backgroundColor: 'white', borderRadius: 12, padding: 20, marginBottom: 20 },
  label: { fontSize: 13, color: '#999', marginTop: 12, marginBottom: 4 },
  value: { fontSize: 16, fontWeight: '600', color: '#1a1a2e' },
  backBtn: { backgroundColor: '#1a1a2e', padding: 14, borderRadius: 12, alignItems: 'center' },
  backBtnText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});