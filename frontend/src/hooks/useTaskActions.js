import { useState } from 'react';
import * as taskService from '../services/taskService';

export const useTaskActions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const createTask = (taskData) => {
    taskService.addTask(taskData);
  };

  const updateTaskData = (taskId, updates) => {
    taskService.updateTask(taskId, updates);
  };

  const deleteTask = (task) => {
    setTaskToDelete(task);
    setDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    if (taskToDelete) {
      taskService.deleteTask(taskToDelete.id);
      setTaskToDelete(null);
      setDeleteConfirmOpen(false);
    }
  };

  const cancelDelete = () => {
    setTaskToDelete(null);
    setDeleteConfirmOpen(false);
  };

  const toggleComplete = (taskId) => {
    taskService.updateTask(taskId, { status: 'completed' });
  };

  const editTask = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const saveTask = (taskData) => {
    if (editingTask) {
      updateTaskData(editingTask.id, taskData);
    } else {
      createTask(taskData);
    }
    setEditingTask(null);
  };

  return {
    isModalOpen,
    setIsModalOpen,
    editingTask,
    setEditingTask,
    deleteConfirmOpen,
    taskToDelete,
    createTask,
    updateTask: updateTaskData,
    deleteTask,
    confirmDelete,
    cancelDelete,
    toggleComplete,
    editTask,
    saveTask,
  };
};
