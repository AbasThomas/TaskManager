import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiCheckCircle, FiClock, FiAlertTriangle, FiCalendar,
  FiPlus, FiSearch, FiFilter, FiSun, FiMoon,
  FiEdit2, FiTrash2, FiChevronDown, FiBell, FiUser
} from 'react-icons/fi';
// import { useTheme } from '../contexts/ThemeContext.jsx';
import TaskModal from '../components/TaskModal.jsx';
import PomodoroTimer from '../components/PomodoroTimer.jsx';
// import AuthContext from '../context/Authcontext.jsx'
const Dashboard = () => {
//   const { darkMode, toggleTheme } = useTheme();
//   const [activeTab, setActiveTab] = useState('today');
//   const [showTaskModal, setShowTaskModal] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [tasks, setTasks] = useState([]);
//   const [filter, setFilter] = useState('all');
//   const constraintsRef = useRef(null);

//   // Sample data - replace with real API calls
//   useEffect(() => {
//     const sampleTasks = [
//       { id: 1, title: 'Complete project proposal', due: '2023-06-15', priority: 'high', category: 'work', completed: false },
//       { id: 2, title: 'Team meeting', due: '2023-06-15', priority: 'medium', category: 'work', completed: true },
//       { id: 3, title: 'Buy groceries', due: '2023-06-16', priority: 'low', category: 'personal', completed: false },
//       { id: 4, title: 'Gym session', due: '2023-06-14', priority: 'medium', category: 'health', completed: false },
//     ];
//     setTasks(sampleTasks);
//   }, []);

//   // Filter tasks based on active tab and search
//   const filteredTasks = tasks.filter(task => {
//     const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
//     let matchesTab = true;
    
//     if (activeTab === 'today') {
//       matchesTab = task.due === new Date().toISOString().split('T')[0];
//     } else if (activeTab === 'overdue') {
//       matchesTab = new Date(task.due) < new Date() && !task.completed;
//     } else if (activeTab === 'completed') {
//       matchesTab = task.completed;
//     }
    
//     return matchesSearch && matchesTab && (filter === 'all' || task.category === filter);
//   });

//   // Task summary stats
//   const taskStats = {
//     total: tasks.length,
//     completed: tasks.filter(t => t.completed).length,
//     pending: tasks.filter(t => !t.completed).length,
//     overdue: tasks.filter(t => new Date(t.due) < new Date() && !t.completed).length,
//     today: tasks.filter(t => t.due === new Date().toISOString().split('T')[0]).length,
//   };

//   const handleTaskComplete = (taskId) => {
//     setTasks(tasks.map(task => 
//       task.id === taskId ? { ...task, completed: !task.completed } : task
//     ));
//   };

//   const handleTaskDelete = (taskId) => {
//     setTasks(tasks.filter(task => task.id !== taskId));
//   };

//   return (
//     <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
//       {/* Header */}
//       <header className={`p-6 border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
//         <div className="flex justify-between items-center max-w-7xl mx-auto">
//           <div>
//             <h1 className="text-2xl font-bold">Welcome back, User!</h1>
//             <p className="text-sm opacity-80">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
//           </div>
//           <div className="flex items-center space-x-4">
//             <button 
//               onClick={toggleTheme}
//               className={`p-2 rounded-full ${darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-gray-200 text-gray-700'}`}
//             >
//               {darkMode ? <FiSun /> : <FiMoon />}
//             </button>
//             <button className={`p-2 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
//               <FiBell />
//             </button>
//             <button className={`p-2 rounded-full ${darkMode ? 'bg-gray-800' : 'bg-gray-200'}`}>
//               <FiUser />
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto p-6">
//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <StatCard 
//             icon={<FiCheckCircle />} 
//             value={taskStats.completed} 
//             label="Completed" 
//             color="text-green-500" 
//             darkMode={darkMode}
//           />
//           <StatCard 
//             icon={<FiClock />} 
//             value={taskStats.pending} 
//             label="Pending" 
//             color="text-blue-500" 
//             darkMode={darkMode}
//           />
//           <StatCard 
//             icon={<FiAlertTriangle />} 
//             value={taskStats.overdue} 
//             label="Overdue" 
//             color="text-red-500" 
//             darkMode={darkMode}
//           />
//           <StatCard 
//             icon={<FiCalendar />} 
//             value={taskStats.today} 
//             label="Today" 
//             color="text-purple-500" 
//             darkMode={darkMode}
//           />
//         </div>

//         {/* Task Controls */}
//         <div className={`p-4 rounded-lg mb-8 ${darkMode ? 'bg-gray-800' : 'bg-white shadow'}`}>
//           <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//             <div className="flex space-x-2">
//               <button
//                 onClick={() => setActiveTab('today')}
//                 className={`px-4 py-2 rounded-lg ${activeTab === 'today' ? 
//                   (darkMode ? 'bg-indigo-600' : 'bg-indigo-100 text-indigo-700') : 
//                   (darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100')}`}
//               >
//                 Today
//               </button>
//               <button
//                 onClick={() => setActiveTab('overdue')}
//                 className={`px-4 py-2 rounded-lg ${activeTab === 'overdue' ? 
//                   (darkMode ? 'bg-red-600' : 'bg-red-100 text-red-700') : 
//                   (darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100')}`}
//               >
//                 Overdue
//               </button>
//               <button
//                 onClick={() => setActiveTab('completed')}
//                 className={`px-4 py-2 rounded-lg ${activeTab === 'completed' ? 
//                   (darkMode ? 'bg-green-600' : 'bg-green-100 text-green-700') : 
//                   (darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100')}`}
//               >
//                 Completed
//               </button>
//             </div>
            
//             <div className="flex items-center space-x-2">
//               <div className={`flex items-center px-3 py-2 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
//                 <FiSearch className="mr-2 opacity-70" />
//                 <input
//                   type="text"
//                   placeholder="Search tasks..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className={`bg-transparent outline-none w-40 ${darkMode ? 'placeholder-gray-500' : 'placeholder-gray-400'}`}
//                 />
//               </div>
              
//               <div className={`relative ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} rounded-lg`}>
//                 <select
//                   value={filter}
//                   onChange={(e) => setFilter(e.target.value)}
//                   className={`appearance-none px-3 py-2 pr-8 rounded-lg bg-transparent outline-none ${darkMode ? 'text-white' : 'text-gray-800'}`}
//                 >
//                   <option value="all">All Categories</option>
//                   <option value="work">Work</option>
//                   <option value="personal">Personal</option>
//                   <option value="health">Health</option>
//                 </select>
//                 <FiChevronDown className="absolute right-3 top-2.5 opacity-70 pointer-events-none" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Task List */}
//         <div className={`rounded-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white shadow'}`}>
//           {filteredTasks.length === 0 ? (
//             <div className="p-8 text-center text-gray-500">
//               No tasks found. Create a new task to get started!
//             </div>
//           ) : (
//             <ul className="divide-y divide-gray-700">
//               <AnimatePresence>
//                 {filteredTasks.map((task) => (
//                   <motion.li
//                     key={task.id}
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, x: -10 }}
//                     transition={{ duration: 0.2 }}
//                     className={`p-4 hover:${darkMode ? 'bg-gray-750' : 'bg-gray-50'}`}
//                   >
//                     <div className="flex items-center">
//                       <button
//                         onClick={() => handleTaskComplete(task.id)}
//                         className={`w-6 h-6 rounded-full mr-4 flex items-center justify-center ${task.completed ? 
//                           'bg-green-500 text-white' : 
//                           (darkMode ? 'border-gray-600 border-2' : 'border-gray-300 border-2')}`}
//                       >
//                         {task.completed && <FiCheckCircle size={16} />}
//                       </button>
                      
//                       <div className="flex-1">
//                         <h3 className={`font-medium ${task.completed ? 'line-through opacity-70' : ''}`}>
//                           {task.title}
//                         </h3>
//                         <div className="flex items-center mt-1 text-sm space-x-4">
//                           <span className={`inline-flex items-center ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
//                             <FiCalendar className="mr-1" size={14} />
//                             {new Date(task.due).toLocaleDateString()}
//                           </span>
//                           <span className={`px-2 py-0.5 rounded-full text-xs ${
//                             task.priority === 'high' ? 'bg-red-500/20 text-red-500' :
//                             task.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-500' :
//                             'bg-green-500/20 text-green-500'
//                           }`}>
//                             {task.priority} priority
//                           </span>
//                           <span className={`px-2 py-0.5 rounded-full text-xs ${
//                             darkMode ? 'bg-gray-700' : 'bg-gray-200'
//                           }`}>
//                             {task.category}
//                           </span>
//                         </div>
//                       </div>
                      
//                       <div className="flex space-x-2">
//                         <button className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}>
//                           <FiEdit2 size={18} />
//                         </button>
//                         <button 
//                           onClick={() => handleTaskDelete(task.id)}
//                           className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
//                         >
//                           <FiTrash2 size={18} />
//                         </button>
//                       </div>
//                     </div>
//                   </motion.li>
//                 ))}
//               </AnimatePresence>
//             </ul>
//           )}
//         </div>

//         {/* Pomodoro Timer */}
//         <div className="mt-8">
//           <PomodoroTimer darkMode={darkMode} />
//         </div>
//       </main>

//       {/* Floating Action Button */}
//       <motion.div
//         ref={constraintsRef}
//         className="fixed bottom-8 right-8"
//         drag
//         dragConstraints={constraintsRef}
//       >
//         <button
//           onClick={() => setShowTaskModal(true)}
//           className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg ${darkMode ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-500 hover:bg-indigo-600'} text-white transition-colors`}
//         >
//           <FiPlus size={24} />
//         </button>
//       </motion.div>

//       {/* Task Modal */}
//       <TaskModal 
//         isOpen={showTaskModal} 
//         onClose={() => setShowTaskModal(false)}
//         darkMode={darkMode}
//       />
//     </div>
//   );
// };

// // Stat Card Component
// const StatCard = ({ icon, value, label, color, darkMode }) => (
//   <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white shadow'}`}>
//     <div className="flex items-center justify-between">
//       <div>
//         <p className={`text-3xl font-bold ${color}`}>{value}</p>
//         <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{label}</p>
//       </div>
//       <div className={`p-3 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-100'} ${color}`}>
//         {icon}
//       </div>
//     </div>
//   </div>
// );
}
export default Dashboard;