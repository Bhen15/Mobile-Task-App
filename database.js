import AsyncStorage from '@react-native-async-storage/async-storage';

export async function initDB() {
  const tasks = await AsyncStorage.getItem('tasks');
  if (!tasks) await AsyncStorage.setItem('tasks', JSON.stringify([]));
}

export async function getTasks() {
  const tasks = await AsyncStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
}

export async function addTask(title) {
  const tasks = await getTasks();
  const newTask = { id: Date.now(), title };
  tasks.push(newTask);
  await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
}

export async function deleteTask(id) {
  const tasks = await getTasks();
  const updated = tasks.filter((t) => t.id !== id);
  await AsyncStorage.setItem('tasks', JSON.stringify(updated));
}