import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion } from "framer-motion";
import { Dumbbell, Timer, HeartPulse, Footprints, CheckCircle2, Flame, CalendarDays } from "lucide-react";
import "./style.css";

const weekPlan = [
  {
    day: "Lunes",
    title: "Fuerza pierna + intermitentes",
    focus: "Pierna, fuerza base y resistencia específica",
    intensity: "Media-alta",
    icon: Dumbbell,
    blocks: [
      { name: "Preventivos antes de calentar", items: ["3 rondas", "Copenhagen plank — 20s por lado", "Single leg RDL — 10 por pierna", "Monster walks — 15 pasos", "Pogos — 20 reps", "Nordic asistido — 5 reps"] },
      { name: "Zona media dinámica", items: ["12 minutos", "3 vueltas", "30s plancha", "20 mountain climbers", "15 russian twists", "15 dead bugs", "20 toe touches"] },
      { name: "Fuerza pierna", items: ["4x10 back squat", "4x10 hip thrust", "4x10 Bulgarian split squat", "4x10 peso muerto rumano", "Descanso: 60-90s"] },
      { name: "Intermitentes 10x10", items: ["6 minutos total", "10s fuerte + 10s suave", "Intensidad: 80%"] },
      { name: "Finalizador", items: ["3 rounds", "15 jump squats", "12 burpees", "20 walking lunges", "200m run"] }
    ]
  },
  {
    day: "Martes",
    title: "Upper + functional",
    focus: "Tren superior, core y acondicionamiento",
    intensity: "Media",
    icon: HeartPulse,
    blocks: [
      { name: "Preventivos ligeros", items: ["2 rondas suaves", "Control y técnica, sin fatigar pierna"] },
      { name: "Zona media", items: ["10 minutos", "Core dinámico y estabilidad"] },
      { name: "Fuerza upper", items: ["4x10 push press", "4x10 remo mancuerna", "4x10 push ups", "4x10 jalón o pull ups asistidas", "Shoulder taps"] },
      { name: "Functional 20x10", items: ["4 vueltas", "Bike", "KB swings", "Battle ropes", "Box jumps", "Dumbbell snatch", "Descanso: 90s entre vueltas"] },
      { name: "Cardio suave final", items: ["10 minutos caminadora inclinada o bicicleta"] }
    ]
  },
  {
    day: "Miércoles",
    title: "Carrera aeróbica + recovery",
    focus: "Quemar grasa sin destruir músculo",
    intensity: "Baja-media",
    icon: Footprints,
    blocks: [
      { name: "Movilidad completa", items: ["10 minutos", "Cadera, tobillo, isquios, espalda baja"] },
      { name: "Carrera continua", items: ["30-40 minutos suave", "Ritmo cómodo: debes poder hablar"] },
      { name: "Core ligero", items: ["3 vueltas", "Plancha lateral", "Bird dogs", "Hollow hold", "Glute bridge"] },
      { name: "Recovery", items: ["Foam roller", "Estiramientos", "Descarga de piernas"] }
    ]
  },
  {
    day: "Jueves",
    title: "Potencia + HIIT fútbol",
    focus: "Explosividad, cambios de dirección y alta intensidad",
    intensity: "Alta",
    icon: Flame,
    blocks: [
      { name: "Preventivos", items: ["3 rondas", "Rodilla, aductor, glúteo medio y tobillo"] },
      { name: "Zona media dinámica", items: ["12 minutos", "Core activo antes del bloque fuerte"] },
      { name: "Potencia", items: ["4 rounds", "8 squat jumps", "8 bounds", "10 saltos laterales", "Sprint 20m"] },
      { name: "Circuito fútbol", items: ["5 rounds", "Sprint 20m", "Shuffle lateral", "Backpedal", "Sprint 20m", "10 burpees", "10 swings", "Descanso: 1 min"] },
      { name: "Intermitentes 10x10", items: ["6 minutos", "10s fuerte + 10s suave", "Intensidad: 90%"] }
    ]
  },
  {
    day: "Viernes",
    title: "Full body functional",
    focus: "Fuerza total + gasto calórico",
    intensity: "Media-alta",
    icon: Dumbbell,
    blocks: [
      { name: "Preventivos", items: ["2 rondas", "Activación ligera"] },
      { name: "Fuerza full body", items: ["4x8-10 deadlift", "4x8-10 thrusters", "4x8-10 pull ups asistidas", "4x8-10 step ups pesados", "4x8-10 push press"] },
      { name: "Conditioning 20x10", items: ["4 vueltas", "Bike", "Jump lunges", "KB clean", "Burpees", "Plank shoulder taps"] },
      { name: "Core", items: ["3 vueltas", "V-ups", "Russian twists", "Dead bug", "Plancha"] }
    ]
  },
  {
    day: "Sábado",
    title: "Running específico fútbol",
    focus: "Cambios de ritmo, técnica y resistencia de partido",
    intensity: "Media-alta",
    icon: Timer,
    blocks: [
      { name: "Activación", items: ["10 minutos", "Skipping", "Movilidad", "Técnica de carrera"] },
      { name: "Running específico", items: ["2 bloques", "6 reps por bloque", "30s fuerte + 30s suave", "Descanso: 2 mins entre bloques"] },
      { name: "Técnica con balón", items: ["6 rounds", "Conducción rápida", "Cambio de dirección", "Sprint 15m", "Pase largo o finalización"] },
      { name: "Final físico", items: ["3 rounds", "300m run", "15 burpees", "20 lunges", "20 sit ups"] }
    ]
  },
  {
    day: "Domingo",
    title: "Descanso total",
    focus: "Recuperación para construir músculo y bajar grasa mejor",
    intensity: "Baja",
    icon: CheckCircle2,
    blocks: [
      { name: "Recovery", items: ["Caminar suave", "Movilidad si lo necesitas", "Hidratación", "Dormir bien"] }
    ]
  }
];

function App() {
  const [selectedDay, setSelectedDay] = useState("Lunes");
  const [checked, setChecked] = useState({});
  const [roundsDone, setRoundsDone] = useState({});
  const [completedBlocks, setCompletedBlocks] = useState({});
  const current = useMemo(() => weekPlan.find((d) => d.day === selectedDay), [selectedDay]);

  const isPreventiveBlock = (block) => block.name.toLowerCase().includes("preventiv");
  const usesBlockCompletion = (block) => /zona media|core|carrera|cardio|running/i.test(block.name);
  const roundText = (block) => block.items.find((item) => /\d+\s*rondas?/i.test(item));
  const roundTarget = (block) => Number(roundText(block)?.match(/(\d+)/)?.[1] ?? 3);
  const isInstructionItem = (item) => {
    const text = item.toLowerCase();
    return (
      /^descanso:/.test(text) ||
      /^intensidad:/.test(text) ||
      /^ritmo cómodo:/.test(text) ||
      /^\d+\s*(rondas?|rounds?|vueltas?|bloques?)\b/.test(text) ||
      /^\d+\s*reps?\s+por\s+bloque/.test(text) ||
      /^\d+(-\d+)?\s*minutos?(\s|$)/.test(text) ||
      /^\d+s\s+fuerte\s+\+\s+\d+s\s+suave/.test(text) ||
      /^core dinámico/.test(text) ||
      /^core activo/.test(text)
    );
  };
  const instructionItems = (block) => {
    if (isPreventiveBlock(block)) return [];
    return block.items.filter(isInstructionItem);
  };
  const blockInstructions = (block) => {
    const instructions = instructionItems(block);
    if (!instructions.length) return "";

    return instructions
      .map((item) => (/minutos?/i.test(item) ? `Aprox. ${item}` : item))
      .join(" | ");
  };
  const exerciseItems = (block) => {
    if (isPreventiveBlock(block)) return block.items.filter((item) => item !== roundText(block));
    return block.items.filter((item) => !instructionItems(block).includes(item));
  };
  const blockKey = (day, block) => `${day}-${block.name}`;
  const areAllItemsChecked = (day, block) => exerciseItems(block).every((item) => checked[`${day}-${block.name}-${item}`]);
  const isPreventiveComplete = (day, block) => Number(roundsDone[blockKey(day, block)] ?? 0) >= roundTarget(block) || areAllItemsChecked(day, block);
  const isBlockComplete = (day, block) => Boolean(completedBlocks[blockKey(day, block)]);

  const total = weekPlan.reduce((acc, day) => {
    return acc + day.blocks.reduce((sum, block) => {
      if (isPreventiveBlock(block) || usesBlockCompletion(block)) return sum + 1;
      return sum + exerciseItems(block).length;
    }, 0);
  }, 0);
  const completed = weekPlan.reduce((acc, day) => {
    return acc + day.blocks.reduce((sum, block) => {
      if (isPreventiveBlock(block)) {
        return sum + (isPreventiveComplete(day.day, block) ? 1 : 0);
      }
      if (usesBlockCompletion(block)) {
        return sum + (isBlockComplete(day.day, block) ? 1 : 0);
      }

      return sum + exerciseItems(block).filter((item) => checked[`${day.day}-${block.name}-${item}`]).length;
    }, 0);
  }, 0);
  const progress = Math.round((completed / total) * 100);
  const Icon = current.icon;

  const toggleItem = (day, block, item) => {
    const key = `${day}-${block}-${item}`;
    setChecked((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const updateRounds = (day, block, value) => {
    setRoundsDone((prev) => ({ ...prev, [blockKey(day, block)]: value }));
  };

  const toggleBlock = (day, block) => {
    const key = blockKey(day, block);
    setCompletedBlocks((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <main className="app">
      <section className="hero">
        <div className="heroCopy">
          <div className="eyebrow"><CalendarDays size={18} /> Semana de regreso</div>
          <h1>Rutina fútbol femenino</h1>
          <p>Objetivo: bajar % de grasa, aumentar músculo funcional, recuperar condición y llegar fuerte a pretemporada.</p>
        </div>
        <div className="progress">
          <span>Progreso</span>
          <strong>{progress}%</strong>
          <div className="progressTrack">
            <div style={{ width: `${progress}%` }} />
          </div>
        </div>
      </section>

      <nav className="days">
        {weekPlan.map((day) => (
          <button key={day.day} onClick={() => setSelectedDay(day.day)} className={selectedDay === day.day ? "active" : ""}>
            {day.day}
          </button>
        ))}
      </nav>

      <motion.section key={current.day} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="card">
        <header className="dayHeader">
          <div className="icon"><Icon size={28} /></div>
          <div>
            <span>{current.day}</span>
            <h2>{current.title}</h2>
            <p>{current.focus}</p>
          </div>
        </header>

        <div className="intensity">Intensidad: <b>{current.intensity}</b></div>

        <div className="blocks">
          {current.blocks.map((block, index) => {
            const preventive = isPreventiveBlock(block);
            const preventiveDone = preventive && isPreventiveComplete(current.day, block);
            const blockCompletion = usesBlockCompletion(block);
            const blockDone = blockCompletion && isBlockComplete(current.day, block);
            const selectedRounds = roundsDone[blockKey(current.day, block)] ?? "";
            const instructions = blockInstructions(block);

            return (
              <article className={preventiveDone || blockDone ? "block blockComplete" : "block"} key={block.name}>
                <div className="blockHeader">
                  <div>
                    <h3>{index + 1}. {block.name}</h3>
                    {instructions && <p className="blockInstructions">{instructions}</p>}
                  </div>
                  <div className="blockActions">
                    {preventive && (
                      <label className="roundSelector">
                        <span>Rondas hechas</span>
                        <select value={selectedRounds} onChange={(event) => updateRounds(current.day, block, event.target.value)}>
                          <option value="">0</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                        </select>
                      </label>
                    )}
                    {blockCompletion && (
                      <button
                        className={blockDone ? "completeBlockButton done" : "completeBlockButton"}
                        onClick={() => toggleBlock(current.day, block)}
                        type="button"
                      >
                        <CheckCircle2 size={18} />
                        {blockDone ? "Completado" : "Completar"}
                      </button>
                    )}
                  </div>
                </div>

                <div className="items">
                  {exerciseItems(block).map((item) => {
                    const key = `${current.day}-${block.name}-${item}`;
                    const done = preventiveDone || blockDone || checked[key];
                    return (
                      <button
                        key={item}
                        onClick={() => toggleItem(current.day, block.name, item)}
                        className={done ? "item done" : "item"}
                        type="button"
                      >
                        <CheckCircle2 size={20} />
                        <span>{item}</span>
                      </button>
                    );
                  })}
                </div>
              </article>
            );
          })}
        </div>
      </motion.section>

      <footer>
        <b>Regla de esta semana:</b> no busques destruirte. Busca consistencia, técnica, intensidad progresiva y buena recuperación.
      </footer>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
