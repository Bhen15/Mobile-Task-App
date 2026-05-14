import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { getTasks, deleteTask } from '../database';

export default function TasksScreen() {
  const [tasks, setTasks] = useState([]);

  useFocusEffect(
    useCallback(() => {
      let active = true;
      getTasks().then((data) => {
        if (active) setTasks(data);
      });
      return () => { active = false; };
    }, [])
  );

  async function handleDelete(id) {
    await deleteTask(id);
    const updated = await getTasks();
    setTasks(updated);
  }

  return (
    <View style={styles.container}>
      {tasks.length === 0 ? (
        <Text style={styles.empty}>No tasks yet. Add one!</Text>
      ) : (
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.itemText}>{item.title}</Text>
              <TouchableOpacity onPress={() => handleDelete(item.id)}>
                <Text style={styles.delete}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  empty: { color: 'gray', textAlign: 'center', marginTop: 40 },
  item: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', padding: 14,
    borderBottomWidth: 1, borderColor: '#eee',
  },
  itemText: { fontSize: 16, flex: 1 },
  delete: { color: 'red', fontSize: 14 },
});