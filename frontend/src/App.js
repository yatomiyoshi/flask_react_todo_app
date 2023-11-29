// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';

const App = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/tasks');
      const data = await response.json();
      setTasks(data.tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);  // 初回レンダリング時にのみ実行

  const handleAddTask = async (text) => {
    try {
      const response = await fetch('http://localhost:5000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        throw new Error('Task could not be added.');
      }

      await response.json();
      fetchTasks();  // タスク追加後に再度タスクを取得
    } catch (error) {
      console.error('Error adding task:', error.message);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Task could not be deleted.');
      }

      await response.json();
      fetchTasks();  // タスク削除後に再度タスクを取得
    } catch (error) {
      console.error('Error deleting task:', error.message);
    }
  };

  return (
    <div>
      <TaskList tasks={tasks} onDelete={handleDeleteTask} />
      <TaskForm onAdd={handleAddTask} />
    </div>
  );
};

export default App;
