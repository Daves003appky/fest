import './App.css';
import { useState, useEffect } from 'react';

const tasks = [
  "Zazpívej si s random člověkem",
  "Předveď nadšenou slepici, která očekává, že přijde krmení.",
  "Předveď břišní tanec náhodnému publiku",
  "Stoupni si na vyvýšené místo a řekni vtip náhodným divákům",
  "Objednej si pivo cizím přízvukem",
  "Běž si hrát s kamením a informuj o tom random lidi.",
  "Přiťukni si s random lidma.",
  "Hraj kámen-nůžky-papír s někým neznámým.",
  "Schovej si smaženej sejra do kapsy",
  "Dej si pivo",
  "Dej si pálenku",
  "Zahraj si zem je láva alespoň 5x",
  "Natoč ostatních.",
  "Natoč tiktok.",
  "Udělej rozhovor s někým jako ‘reportér festivalu’. Musíš to natočit",
  "Vypij vodu jako by to bylo luxusní šampaňské.",
  "Přines pivo jako dárek někomu neznámému a nabídni mu, že to může pak udělat také.",
  "Udělej recenzi na jídlo předstíraně jako food kritik, natoč to.",
  "Udělej přehnaně slavnostní přípitek s cizí skupinou.",
  "Zazpívej hymnu smaženého sýra.",
  "Zahraj si na opilého průvodce a veď lidi ‘k toitoice štěstí’.",
  "Vytvoř 3členný pochodový tým a obejdi areál.",
  "Vem si reprák a dokola jeď jede jede mašinka a udělej největšího hada.",
  "Natoč ‘reklamu’ na festivalové WC.",
  "Vyfoť se s co nejvíce slunečními brýlemi naráz.",
  "Vyfoť se s lidmi, kteří mají stejnou barvu trička.",
  "Zaznamenej vtipné hlášky kolemjdoucích a udělej ‘festivalové perličky’.",
  "Předstírej, že jsi z jiného festivalu a ptáš se, kde hrají dechovku",
  "Požádej někoho, ať ti zazpívá ukolébavku.",
  "Založ ‘pivní meditaci’ – pozvi někoho na 1 minutu ticha s pivem.",
  "Křič ‘Bongo bongo bongo’ dokud se někdo nepřidá.",
  "Založ sektu milovníků limonády a rekrutuj členy.",
  "Udělej demonstraci za více okurek ve festivalových burgerech.",
  "Jdi 50 metrů jako krab a vysvětluj, že trénuješ na soutěž.",
  "Prohlaš sebe za ‘hlídače toitoi říše’ a rozdávej pokyny.",
  "Udělej exorcismus nad rozbitým stanem.",
  "Udělej přehnané rozcvičení před stánkem s pivem.",
  "Udělej 5 angličáků mezi dvěma stánky.",
  "Plaz se a řekni, že jsi festivalový šnek.",
  "Stůj čelem opačně než fronta a pozoruj reakce.",
  "Udělej ‘gólovou oslavu’, když se posuneš ve frontě o krok dopředu.",
  "Řekni: ‘Tohle není fronta na pivo, tohle je cesta za osvícením.’",
  "Dám si to celé ještě jednou"
];

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [completed, setCompleted] = useState({});
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('completedTasks');
    if (saved) {
      setCompleted(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('completedTasks', JSON.stringify(completed));
  }, [completed]);

  const toggleTask = (task) => {
    if (task === "Dám si to celé ještě jednou") {
      if (window.confirm("Opravdu jdeš ještě jednou?")) {
        const reset = {};
        tasks.forEach(t => reset[t] = false);
        reset[task] = true;
        setCompleted(reset);
      }
      return;
    }
    const updated = { ...completed, [task]: !completed[task] };
    setCompleted(updated);
  };

  const handleLogin = () => {
    setErrorMsg('');
    if (!username || password.length !== 5 || isNaN(password)) {
      setErrorMsg('Zadej jméno a 5místné číselné heslo.');
      return;
    }
    setLoggedIn(true);
  };

  const completedCount = Object.values(completed).filter(Boolean).length;
  const remainingCount = tasks.length - completedCount;

  if (!loggedIn) {
    return (
      <div className="container">
        <h1>Přihlášení</h1>
        <input
          type="text"
          placeholder="Jméno"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="5 čísel"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          maxLength={5}
        />
        <button onClick={handleLogin}>Přihlásit</button>
        {errorMsg && <p className="error">{errorMsg}</p>}
      </div>
    );
  }

  return (
    <div className="container" style={{ maxHeight: '100vh', overflowY: 'auto' }}>
      <h2>Vítej, {username}!</h2>
      <h3>Úkoly</h3>
      <div className="progress">✅ {completedCount} / {tasks.length} splněno ({remainingCount} zbývá)</div>
      {tasks.map((task, i) => (
        <div
          key={i}
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
