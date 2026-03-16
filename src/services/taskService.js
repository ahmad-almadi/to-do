const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

const mapTaskFromAPI = (task) => ({
  id: task.id.toString(),
  title: task.title,
  description: task.description,
  assignedTo: task.assigned_to || [],
  priority: task.priority,
  status: task.status,
  deadline: task.deadline,
  createdAt: task.created_at,
});

const mapTaskToAPI = (task) => ({
  title: task.title,
  description: task.description,
  assigned_to: task.assignedTo,
  priority: task.priority,
  status: task.status,
  deadline: task.deadline,
});

export const getTasks = async () => {
  try {
    const response = await fetch(`${API_URL}/tasks`);
    if (!response.ok) throw new Error('Failed to fetch tasks');
    const tasks = await response.json();
    return tasks.map(mapTaskFromAPI);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return [];
  }
};

export const addTask = async (task) => {
  try {
    const response = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mapTaskToAPI(task)),
    });
    if (!response.ok) throw new Error('Failed to create task');
    const newTask = await response.json();
    return mapTaskFromAPI(newTask);
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
};

export const updateTask = async (taskId, updates) => {
  try {
    const response = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mapTaskToAPI(updates)),
    });
    if (!response.ok) throw new Error('Failed to update task');
    const updatedTask = await response.json();
    return mapTaskFromAPI(updatedTask);
  } catch (error) {
    console.error('Error updating task:', error);
    throw error;
  }
};

export const deleteTask = async (taskId) => {
  try {
    const response = await fetch(`${API_URL}/tasks/${taskId}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete task');
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
};

export const subscribeToTasks = (callback) => {
  const fetchTasks = async () => {
    const tasks = await getTasks();
    callback(tasks);
  };

  fetchTasks();
  const interval = setInterval(fetchTasks, 5000);

  return () => clearInterval(interval);
};
