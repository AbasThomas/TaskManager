import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiPlay, FiPause, FiRotateCcw, FiSettings } from 'react-icons/fi';

const PomodoroTimer = ({ darkMode }) => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('work'); // 'work' or 'break'
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    workTime: 25,
    breakTime: 5,
    longBreakTime: 15
  });

  const intervalRef = useRef();
  const cycleCountRef = useRef(0);

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setSeconds(prevSeconds => {
          if (prevSeconds === 0) {
            if (minutes === 0) {
              // Timer completed
              handleTimerComplete();
              return 0;
            }
            setMinutes(prevMinutes => prevMinutes - 1);
            return 59;
          }
          return prevSeconds - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive, minutes]);

  const handleTimerComplete = () => {
    clearInterval(intervalRef.current);
    setIsActive(false);
    
    // Play sound
    const audio = new Audio('/notification.mp3');
    audio.play();
    
    // Switch mode
    if (mode === 'work') {
      cycleCountRef.current += 1;
      if (cycleCountRef.current % 4 === 0) {
        // Long break every 4 work cycles
        setMode('longBreak');
        setMinutes(settings.longBreakTime);
      } else {
        // Regular break
        setMode('break');
        setMinutes(settings.breakTime);
      }
    } else {
      // Back to work
      setMode('work');
      setMinutes(settings.workTime);
    }
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setMode('work');
    setMinutes(settings.workTime);
    setSeconds(0);
    cycleCountRef.current = 0;
  };

  const formatTime = () => {
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSettingsChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: parseInt(value) || 0
    }));
  };

  const saveSettings = () => {
    if (mode === 'work') {
      setMinutes(settings.workTime);
    } else if (mode === 'break') {
      setMinutes(settings.breakTime);
    } else {
      setMinutes(settings.longBreakTime);
    }
    setSeconds(0);
    setShowSettings(false);
  };

  return (
    <div className={`p-6 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white shadow'}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Pomodoro Timer</h3>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
        >
          <FiSettings />
        </button>
      </div>

      {showSettings ? (
        <div className="mb-6">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label className={`block mb-1 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Work (min)</label>
              <input
                type="number"
                name="workTime"
                value={settings.workTime}
                onChange={handleSettingsChange}
                min="1"
                className={`w-full p-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
              />
            </div>
            <div>
              <label className={`block mb-1 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Break (min)</label>
              <input
                type="number"
                name="breakTime"
                value={settings.breakTime}
                onChange={handleSettingsChange}
                min="1"
                className={`w-full p-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
              />
            </div>
            <div>
              <label className={`block mb-1 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Long Break (min)</label>
              <input
                type="number"
                name="longBreakTime"
                value={settings.longBreakTime}
                onChange={handleSettingsChange}
                min="1"
                className={`w-full p-2 rounded-lg border ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'}`}
              />
            </div>
          </div>
          <button
            onClick={saveSettings}
            className={`w-full py-2 rounded-lg ${darkMode ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-500 hover:bg-indigo-600'} text-white`}
          >
            Save Settings
          </button>
        </div>
      ) : (
        <>
          <div className="flex justify-center mb-6">
            <motion.div
              key={mode}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`text-5xl font-mono font-bold ${
                mode === 'work' ? (darkMode ? 'text-red-400' : 'text-red-500') :
                mode === 'break' ? (darkMode ? 'text-green-400' : 'text-green-500') :
                (darkMode ? 'text-blue-400' : 'text-blue-500')
              }`}
            >
              {formatTime()}
            </motion.div>
          </div>

          <div className="flex justify-center mb-4">
            <div className={`px-3 py-1 rounded-full text-sm ${
              mode === 'work' ? (darkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-600') :
              mode === 'break' ? (darkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-600') :
              (darkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600')
            }`}>
              {mode === 'work' ? 'Focus Time' : 
               mode === 'break' ? 'Short Break' : 'Long Break'}
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={toggleTimer}
              className={`p-3 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              {isActive ? <FiPause size={24} /> : <FiPlay size={24} />}
            </button>
            <button
              onClick={resetTimer}
              className={`p-3 rounded-full ${darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'}`}
            >
              <FiRotateCcw size={24} />
            </button>
          </div>

          <div className="mt-4 text-center text-sm opacity-80">
            Cycle #{cycleCountRef.current + 1} • {mode === 'work' ? 'Focus' : 'Break'} session
          </div>
        </>
      )}
    </div>
  );
};

export default PomodoroTimer;