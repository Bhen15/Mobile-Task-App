import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useState, useCallback } from 'react';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { getTasks, deleteTask } from '../database';

export default function TasksScreen() {
  const [tasks, setTasks] = useState([]);
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      setTasks(getTasks());
    }, [])
  );

  function handleDelete(id) {
    deleteTask(id);
    setTasks(getTasks());
  }

  const statusColor = (status) => {
    if (status === 'pending') return '#4A6CF7';
    if (status === 'Ongoing') return '#FFA500';
    if (status === 'Finished') return '#4CAF50';
    return '#999';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Task List</Text>
      <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('Add-Task')}>
        <Text style={styles.addBtnText}>Add Task</Text>
      </TouchableOpacity>
      {tasks.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.empty}>No Task Yet</Text>
        </View>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('TaskDetail', { taskId: item.id })}
            >
              <View style={styles.cardInfo}>
                <Text style={styles.taskTitle}>{item.title}</Text>
                {item.description ? <Text style={styles.taskDesc}>{item.description}</Text> : null}
                <Text style={[styles.statusBadge, { color: statusColor(item.status) }]}>
                  ● {item.status}
                </Text>
              </View>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Text style={styles.delete}>🗑️</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f2f2f2' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 14, marginTop: 10 },
  addBtn: {
    backgroundColor: '#1a1a2e', padding: 10, borderRadius: 8,
    alignSelf: 'flex-start', marginBottom: 16, paddingHorizontal: 20,
  },
  addBtnText: { color: 'white', fontWeight: 'bold' },
  emptyBox: { backgroundColor: 'white', borderRadius: 10, padding: 20, alignItems: 'center' },
  empty: { color: '#999', fontSize: 15 },
  card: {
    backgroundColor: 'white', borderRadius: 10, padding: 14,
    marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
  },
  cardInfo: { flex: 1 },
  taskTitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  taskDesc: { fontSize: 13, color: '#666', marginBottom: 4 },
  statusBadge: { fontSize: 13, fontWeight: '600' },
  delete: { fontSize: 20, marginLeft: 10 },
});