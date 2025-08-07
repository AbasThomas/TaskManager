import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCalendar, FiClock, FiFlag, FiTag } from 'react-icons/fi';

const TaskModal = ({ isOpen, onClose, darkMode }) => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    category: 'work',
    reminders: []
  });

  const [showReminder, setShowReminder] = useState(false);
  const [newReminder, setNewReminder] = useState('');

  useEffect(() => {
    if (!isOpen) {
      // Reset form when modal closes
      setTask({
        title: '',
        description: '',
        dueDate: '',
        priority: 'medium',
        category: 'work',
        reminders: []
      });
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the task to your API
    console.log('Submitting task:', task);
    onClose();
  };

  const addReminder = () => {
    if (newReminder) {
      setTask(prev => ({
        ...prev,
        reminders: [...prev.reminders, newReminder]
      }));
      setNewReminder('');
      setShowReminder(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className={`relative w-full max-w-md rounded-xl shadow-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
          >
            <button
              onClick={onClose}
              className={`absolute top-4 right-4 p-1 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
            >
              <FiX size={24} />
            </button>

            <div className="p-6">
              <h2 className="text-xl font-bold mb-6">Add New Task</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className={`block mb-1 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Task Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={task.title}
                    onChange={handleChange}
                    required
                    className={`w-full p-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                  />
                </div>

                <div className="mb-4">
                  <label className={`block mb-1 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={task.description}
                    onChange={handleChange}
                    rows={3}
                    className={`w-full p-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className={`block mb-1 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <FiCalendar className="inline mr-1" /> Due Date
                    </label>
                    <input
                      type="date"
                      name="dueDate"
                      value={task.dueDate}
                      onChange={handleChange}
                      className={`w-full p-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                    />
                  </div>

                  <div>
                    <label className={`block mb-1 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <FiFlag className="inline mr-1" /> Priority
                    </label>
                    <select
                      name="priority"
                      value={task.priority}
                      onChange={handleChange}
                      className={`w-full p-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <label className={`block mb-1 text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <FiTag className="inline mr-1" /> Category
                  </label>
                  <select
                    name="category"
                    value={task.category}
                    onChange={handleChange}
                    className={`w-full p-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                  >
                    <option value="work">Work</option>
                    <option value="personal">Personal</option>
                    <option value="health">Health</option>
                    <option value="education">Education</option>
                  </select>
                </div>

                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <label className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      <FiClock className="inline mr-1" /> Reminders
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowReminder(!showReminder)}
                      className={`text-sm ${darkMode ? 'text-indigo-400' : 'text-indigo-600'} hover:underline`}
                    >
                      + Add Reminder
                    </button>
                  </div>

                  {showReminder && (
                    <div className="flex mb-2">
                      <input
                        type="datetime-local"
                        value={newReminder}
                        onChange={(e) => setNewReminder(e.target.value)}
                        className={`flex-1 p-2 rounded-l-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
                      />
                      <button
                        type="button"
                        onClick={addReminder}
                        className={`px-3 rounded-r-lg ${darkMode ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-500 hover:bg-indigo-600'} text-white`}
                      >
                        Add
                      </button>
                    </div>
                  )}

                  {task.reminders.length > 0 && (
                    <ul className={`mt-2 space-y-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                      {task.reminders.map((reminder, index) => (
                        <li key={index} className="flex items-center text-sm">
                          {new Date(reminder).toLocaleString()}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-500 hover:bg-indigo-600'} text-white`}
                  >
                    Save Task
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TaskModal;