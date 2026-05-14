import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('tasks.db');

export function initDB() {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      status TEXT DEFAULT 'pending'
    );
  `);
}

export function getTasks() {
  return db.getAllSync('SELECT * FROM tasks;');
}

export function getTaskById(id) {
  return db.getFirstSync('SELECT * FROM tasks WHERE id = ?;', [id]);
}

export function addTask(title, description, status) {
  db.runSync(
    'INSERT INTO tasks (title, description, status) VALUES (?, ?, ?);',
    [title, description, status]
  );
}

export function deleteTask(id) {
  db.runSync('DELETE FROM tasks WHERE id = ?;', [id]);
}