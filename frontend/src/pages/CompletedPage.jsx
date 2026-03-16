import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { CheckCircle, Calendar, User, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { subscribeToTasks } from '../services/taskService';
import { useTaskActions } from '../hooks/useTaskActions';
import DeleteConfirmModal from '../components/DeleteConfirmModal';

export const CompletedPage = () => {
  const [tasks, setTasks] = useState([]);
  const { deleteTask, deleteConfirmOpen, taskToDelete, confirmDelete, cancelDelete } = useTaskActions();

  useEffect(() => {
    const unsubscribe = subscribeToTasks((allTasks) => {
      const completed = allTasks.filter((t) => t.status === 'completed');
      setTasks(completed);
    });
    return unsubscribe;
  }, []);

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <CheckCircle className="text-green-400" size={32} />
        <h1 className="text-3xl font-bold glow-text">Completed Tasks</h1>
        <span className="ml-auto text-gray-400">{tasks.length} tasks</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel p-5 rounded-lg border-2 border-green-500/50 bg-green-500/10"
          >
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-semibold text-lg line-through text-gray-400">{task.title}</h3>
              <button 
                onClick={() => deleteTask(task)} 
                className="text-red-400 hover:text-red-600 transition-colors flex-shrink-0 ml-2"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <p className="text-sm text-gray-400 mb-3">{task.description}</p>

            <div className="flex flex-wrap gap-2 mb-3">
              <span className="px-2 py-1 rounded text-xs bg-green-500 text-white flex items-center gap-1">
                <CheckCircle size={12} />
                Completed
              </span>
              <span className="px-2 py-1 rounded text-xs bg-lol-purple/30 text-lol-purple capitalize">
                {task.priority}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <User size={14} />
                <span className="capitalize">
                  {Array.isArray(task.assignedTo) 
                    ? task.assignedTo.join(', ') 
                    : task.assignedTo}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>{format(new Date(task.deadline), 'MMM dd')}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {tasks.length === 0 && (
        <div className="text-center py-12 text-gray-400">
          <CheckCircle size={64} className="mx-auto mb-4 opacity-50" />
          <p>No completed tasks yet</p>
        </div>
      )}

      <DeleteConfirmModal
        isOpen={deleteConfirmOpen}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        taskTitle={taskToDelete?.title}
      />
    </div>
  );
};
