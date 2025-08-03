import React from 'react';

const tasks = [
  { id: 1, title: 'Finish React project', completed: false },
  { id: 2, title: 'Review pull requests', completed: true },
  { id: 3, title: 'Plan next sprint', completed: false },
];

const Homepage = () => {
  const completedCount = tasks.filter(task => task.completed).length;
  const pendingCount = tasks.length - completedCount;

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ textAlign: 'center', marginBottom: 30 }}>
        <h1>Task Manager</h1>
        <p>Stay organized and productive!</p>
      </header>

      <section style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 30 }}>
        <div style={{ background: '#e0f7fa', padding: 20, borderRadius: 8, width: '48%' }}>
          <h2>{pendingCount}</h2>
          <p>Pending Tasks</p>
        </div>
        <div style={{ background: '#c8e6c9', padding: 20, borderRadius: 8, width: '48%' }}>
          <h2>{completedCount}</h2>
          <p>Completed Tasks</p>
        </div>
      </section>

      <section>
        <h3>Today's Tasks</h3>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {tasks.map(task => (
            <li
              key={task.id}
              style={{
                background: task.completed ? '#f1f8e9' : '#fffde7',
                marginBottom: 10,
                padding: 15,
                borderRadius: 6,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                {task.title}
              </span>
              <span>
                {task.completed ? '✅' : '🕒'}
              </span>
            </li>
          ))}
        </ul>
        <button style={{ marginTop: 20, padding: '10px 24px', fontSize: 16, borderRadius: 6, background: '#1976d2', color: '#fff', border: 'none' }}>
          + Add New Task
        </button>
      </section>
    </div>
  );
};

export default Homepage;