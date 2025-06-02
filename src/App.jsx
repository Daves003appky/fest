import './App.css';
import { useState, useEffect } from 'react';

const tasks = [
  "Zazpívej si s random člověkem",
  "Zatanči si s random člověkem na ulici",
  "Vyfoť se s Pokáčem",
  "Objednej si víno v rýmech",
  "Objednej si víno písní",
  "Vyfoť se jak objímáš sud",
  "Dej si pálenku",
  "Zahraj si zem je láva alespoň 5x"
];

function App() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [completed, setCompleted] = useState({});

  // Načti splněné úkoly při přihlášení
  useEffect(() => {
    if (name) {
      const saved = localStorage.getItem(`tasks_${name}`);
      setCompleted(saved ? JSON.parse(saved) : {});
    }
  }, [name]);

  // Ulož splněné úkoly při změně
  useEffect(() => {
    if (name) {
      localStorage.setItem(`tasks_${name}`, JSON.stringify(completed));
    }
  }, [completed, name]);

  const handleLogin = () => {
    if (!name.trim() || !/^\d{5}$/.test(password)) {
      alert('Zadej jméno a 5místné číselné heslo.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '{}');

    if (users[name]) {
      // uživatel existuje, ověříme heslo
      if (users[name] === password) {
        setIsLoggedIn(true);
      } else {
        alert('Špatné heslo.');
      }
    } else {
      // registrace nového uživatele
      users[name] = password;
      localStorage.setItem('users', JSON.stringify(users));
      setIsLoggedIn(true);
    }
  };

  const toggleTask = (task) => {
    setCompleted((prev) => ({
      ...prev,
      [task]: !prev[task]
    }));
  };

  if (!isLoggedIn) {
    return (
      <div className="container">
        <h1>Přihlášení</h1>
        <input
          type="text"
          placeholder="Zadej své jméno"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Heslo (5 číslic)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Přihlásit se</button>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Vítej, {name}!</h2>
      <h3>Úkoly</h3>
      {tasks.map((task, index) => (
        <div
          key={index}
          className={`card ${completed[task] ? 'done' : ''}`}
          onClick={() => toggleTask(task)}
        >
          {task} {completed[task] && <span className="check">✓</span>}
        </div>
      ))}
    </div>
  );
}

export default App;
