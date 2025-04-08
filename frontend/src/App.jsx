import { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await axios.get('http://localhost:8000/tasks/');
    setTasks(response.data);
  };

  const addTask = async () => {
    if (newTask.trim()) {
      await axios.post('http://localhost:8000/tasks/', {
        title: newTask,
        completed: false
      });
      setNewTask('');
      fetchTasks();
    }
  };

  const toggleTask = async (id) => {
    const task = tasks.find(t => t.id === id);
    await axios.put(`http://localhost:8000/tasks/${id}`, {
      title: task.title,
      completed: !task.completed
    });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:8000/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div className="app">
      <h1>Lista de Tarefas</h1>
      <div className="task-form">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Nova tarefa"
        />
        <button onClick={addTask}>Adicionar</button>
      </div>
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <span onClick={() => toggleTask(task.id)}>{task.title}</span>
            <button onClick={() => deleteTask(task.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;