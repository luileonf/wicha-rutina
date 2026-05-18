import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion } from "framer-motion";
import { Dumbbell, Timer, HeartPulse, Footprints, CheckCircle2, Flame, CalendarDays, ExternalLink, Image, Maximize2, X } from "lucide-react";
import "./style.css";

const weekOnePlan = [
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

const weekTwoPlan = [
  {
    day: "Lunes",
    title: "Pierna fuerza + intermitentes progresivos",
    focus: "Fuerza base y capacidad anaeróbica",
    intensity: "Media-alta",
    icon: Dumbbell,
    blocks: [
      { name: "Preventivos", items: ["3 rondas", "Copenhagen plank 25s por lado", "Single leg RDL 12 por pierna", "Monster walks 20 pasos", "Nordic asistido 6 reps", "Pogos 25 reps"] },
      { name: "Zona media dinámica", items: ["4 vueltas", "40s plancha", "25 mountain climbers", "20 russian twists", "20 toe touches"] },
      { name: "Fuerza pierna", items: ["5x8 back squat", "4x10 hip thrust pesado", "4x10 Bulgarian split squat", "4x12 RDL", "Farmer carry pesado"] },
      { name: "Intermitentes", items: ["8 mins", "10s fuerte", "10s suave", "intensidad 85%"] },
      { name: "Finisher", items: ["3 rounds", "12 burpees", "15 jump squats", "20 lunges", "250m run"] }
    ]
  },
  {
    day: "Martes",
    title: "Upper body + conditioning",
    focus: "Tren superior y gasto calórico",
    intensity: "Media",
    icon: HeartPulse,
    blocks: [
      { name: "Core", items: ["10 mins", "dead bug", "plank shoulder taps", "hollow hold"] },
      { name: "Fuerza upper", items: ["5x8 push press", "4x10 remo mancuerna", "4x12 push ups", "4x10 pull ups asistidas", "battle ropes"] },
      { name: "Functional", items: ["20x10", "bike", "KB swings", "dumbbell snatch", "jump box", "ropes", "5 vueltas"] }
    ]
  },
  {
    day: "Miércoles",
    title: "Aeróbico + recovery",
    focus: "Recuperación y base cardiovascular",
    intensity: "Baja-media",
    icon: Footprints,
    blocks: [
      { name: "Movilidad", items: ["12 mins", "tobillo", "cadera", "aductores", "espalda baja"] },
      { name: "Running aeróbico", items: ["40 mins suaves", "ritmo conversacional", "mantener FC estable"] },
      { name: "Recovery", items: ["foam roller", "movilidad", "descarga piernas", "estiramientos"] }
    ]
  },
  {
    day: "Jueves",
    title: "Potencia + repeated sprint ability",
    focus: "Explosividad fútbol",
    intensity: "Alta",
    icon: Flame,
    blocks: [
      { name: "Preventivos", items: ["3 rondas", "nordic", "pogos", "aductor", "glúteo medio"] },
      { name: "Potencia", items: ["5 rounds", "squat jumps", "bounds", "sprint 20m", "lateral hops", "sled push opcional"] },
      { name: "Circuito fútbol", items: ["sprint", "shuffle", "backpedal", "sprint", "burpees", "swings", "6 rounds"] },
      { name: "Intermitentes", items: ["8 mins", "intensidad 90%", "10x10"] }
    ]
  },
  {
    day: "Viernes",
    title: "Full body strength",
    focus: "Fuerza funcional completa",
    intensity: "Media-alta",
    icon: Dumbbell,
    blocks: [
      { name: "Fuerza", items: ["deadlift", "thrusters", "step ups", "push press", "pull ups", "5x8"] },
      { name: "Conditioning", items: ["20x10", "bike", "jump lunges", "KB clean", "burpees", "plank taps", "5 vueltas"] },
      { name: "Core", items: ["V-ups", "russian twists", "plancha", "dead bug"] }
    ]
  },
  {
    day: "Sábado",
    title: "Running específico fútbol",
    focus: "Capacidad específica de partido",
    intensity: "Media-alta",
    icon: Timer,
    blocks: [
      { name: "Activación", items: ["movilidad", "skipping", "técnica carrera"] },
      { name: "Repeated runs", items: ["3 bloques", "6 reps", "30s fuerte", "30s suave", "descanso 2 mins"] },
      { name: "Técnica fútbol", items: ["conducción", "cambio dirección", "sprint", "pase largo", "finalización"] },
      { name: "Final físico", items: ["4 rounds", "300m run", "15 burpees", "20 lunges", "20 sit ups"] }
    ]
  },
  {
    day: "Domingo",
    title: "Recovery",
    focus: "Recuperación total",
    intensity: "Baja",
    icon: CheckCircle2,
    blocks: [
      { name: "Recovery", items: ["caminar", "movilidad", "hidratación", "dormir bien"] }
    ]
  }
];

const routineWeeks = [
  {
    week: 3,
    label: "El regreso",
    objective: "Objetivo: bajar % de grasa, aumentar músculo funcional, recuperar condición y llegar fuerte a pretemporada.",
    plan: weekOnePlan
  },
  {
    week: 4,
    label: "Base + adaptación de carga",
    objective: "Objetivo: subir intensidad, mejorar tolerancia física, aumentar fuerza funcional, seguir bajando % grasa y aumentar capacidad aeróbica específica.",
    plan: weekTwoPlan
  }
];
const dayLetters = ["L", "M", "M", "J", "V", "S", "D"];
const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre"
];
const today = new Date();
const initialMonth = today.getMonth();
const currentCalendarWeek = Math.min(5, Math.ceil(today.getDate() / 7));
const initialWeek = routineWeeks[routineWeeks.length - 1].week;
const availableMonths = [{ index: initialMonth, name: months[initialMonth] }];
const availableWeeks = routineWeeks.map((routine) => routine.week);
const progressStorageKey = "wicha-fut-progress-v2";
const previousProgressStorageKey = "wicha-fut-progress-v1";
const getPeriodKey = (month, week) => `${month}-week-${week}`;

const loadAllProgress = () => {
  try {
    const saved = window.localStorage.getItem(progressStorageKey);
    if (saved) {
      const parsed = JSON.parse(saved);
      const oldCalendarKey = getPeriodKey(initialMonth, currentCalendarWeek);
      const weekThreeKey = getPeriodKey(initialMonth, 3);

      if (parsed[oldCalendarKey] && !parsed[weekThreeKey]) {
        return { ...parsed, [weekThreeKey]: parsed[oldCalendarKey] };
      }

      return parsed;
    }

    const previousSaved = window.localStorage.getItem(previousProgressStorageKey);
    return previousSaved ? { [getPeriodKey(initialMonth, 3)]: JSON.parse(previousSaved) } : {};
  } catch {
    return {};
  }
};

function SoccerBallIcon() {
  return (
    <svg className="soccerBallIcon" viewBox="0 0 64 64" aria-hidden="true">
      <circle cx="32" cy="32" r="27" />
      <path d="M32 17 43 25 39 38H25L21 25 32 17Z" />
      <path d="M32 17V8M21 25 11 21M43 25 53 21M25 38 18 49M39 38 46 49" />
      <path d="M18 49A27 27 0 0 0 46 49M11 21A27 27 0 0 1 32 8A27 27 0 0 1 53 21" />
    </svg>
  );
}

const googleImageSearchUrl = (exercise) => {
  const cleanExercise = exercise.replace(/^\d+x?(\d+)?\s*/i, "").replace(/\s+—\s+.*/, "");
  return `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(`${cleanExercise} exercise technique`)}`;
};

function App() {
  const [allProgress, setAllProgress] = useState(loadAllProgress);
  const [selectedMonth, setSelectedMonth] = useState(initialMonth);
  const [selectedWeek, setSelectedWeek] = useState(initialWeek);
  const [selectedDay, setSelectedDay] = useState("Lunes");
  const [expandedExercise, setExpandedExercise] = useState(null);
  const [openPicker, setOpenPicker] = useState(null);
  const currentRoutine = useMemo(() => routineWeeks.find((routine) => routine.week === selectedWeek) ?? routineWeeks[0], [selectedWeek]);
  const weekPlan = currentRoutine.plan;
  const periodKey = getPeriodKey(selectedMonth, selectedWeek);
  const currentProgress = allProgress[periodKey] ?? {};
  const checked = currentProgress.checked ?? {};
  const roundsDone = currentProgress.roundsDone ?? {};
  const completedBlocks = currentProgress.completedBlocks ?? {};
  const current = useMemo(() => weekPlan.find((d) => d.day === selectedDay) ?? weekPlan[0], [selectedDay, weekPlan]);

  useEffect(() => {
    window.localStorage.setItem(progressStorageKey, JSON.stringify(allProgress));
  }, [allProgress]);

  const updatePeriodProgress = (updates) => {
    setAllProgress((prev) => {
      const periodProgress = prev[periodKey] ?? {};
      return {
        ...prev,
        [periodKey]: {
          checked: periodProgress.checked ?? {},
          roundsDone: periodProgress.roundsDone ?? {},
          completedBlocks: periodProgress.completedBlocks ?? {},
          ...updates
        }
      };
    });
  };

  const isPreventiveBlock = (block) => block.name.toLowerCase().includes("preventiv");
  const roundText = (block) => block.items.find((item) => /\d+\s*rondas?/i.test(item));
  const roundTarget = (block) => Number(roundText(block)?.match(/(\d+)/)?.[1] ?? 3);
  const isInstructionItem = (item) => {
    const text = item.toLowerCase();
    return (
      /^descanso:/.test(text) ||
      /^descanso\b/.test(text) ||
      /^intensidad:?/.test(text) ||
      /^ritmo cómodo:/.test(text) ||
      /^ritmo conversacional/.test(text) ||
      /^mantener fc/.test(text) ||
      /^\d+\s*(rondas?|rounds?|vueltas?|bloques?)\b/.test(text) ||
      /^\d+\s*reps?(\s+por\s+bloque)?/.test(text) ||
      /^\d+x\d+$/.test(text) ||
      /^\d+(-\d+)?\s*(minutos?|mins?)(\s|$)/.test(text) ||
      /^\d+s\s+fuerte\s+\+\s+\d+s\s+suave/.test(text) ||
      /^\d+s\s+(fuerte|suave)$/.test(text) ||
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
      .map((item) => (/(minutos?|mins?)/i.test(item) ? `Aprox. ${item}` : item))
      .join(" | ");
  };
  const exerciseItems = (block) => {
    if (isPreventiveBlock(block)) return block.items.filter((item) => item !== roundText(block));
    return block.items.filter((item) => !instructionItems(block).includes(item));
  };
  const usesBlockCompletion = (block) => {
    const hasRoundStructure = instructionItems(block).some((item) => /\b(rondas?|rounds?|vueltas?|bloques?)\b/i.test(item));
    const isSingleEffort = exerciseItems(block).length === 0;
    return hasRoundStructure || isSingleEffort || /zona media|core|carrera|cardio|running|intermitentes/i.test(block.name);
  };
  const blockKey = (day, block) => `${day}-${block.name}`;
  const areAllItemsChecked = (day, block) => exerciseItems(block).every((item) => checked[`${day}-${block.name}-${item}`]);
  const isPreventiveComplete = (day, block) => Number(roundsDone[blockKey(day, block)] ?? 0) >= roundTarget(block) || areAllItemsChecked(day, block);
  const isBlockComplete = (day, block) => Boolean(completedBlocks[blockKey(day, block)]);
  const blockTotal = (block) => isPreventiveBlock(block) || usesBlockCompletion(block) ? 1 : exerciseItems(block).length;
  const blockCompleted = (day, block) => {
    if (isPreventiveBlock(block)) return isPreventiveComplete(day, block) ? 1 : 0;
    if (usesBlockCompletion(block)) return isBlockComplete(day, block) ? 1 : 0;
    return exerciseItems(block).filter((item) => checked[`${day}-${block.name}-${item}`]).length;
  };
  const isDayComplete = (day) => day.blocks.every((block) => blockCompleted(day.day, block) >= blockTotal(block));

  const total = weekPlan.reduce((acc, day) => acc + day.blocks.reduce((sum, block) => sum + blockTotal(block), 0), 0);
  const completed = weekPlan.reduce((acc, day) => acc + day.blocks.reduce((sum, block) => sum + blockCompleted(day.day, block), 0), 0);
  const progress = Math.round((completed / total) * 100);
  const Icon = current.icon;

  const toggleItem = (day, block, item) => {
    const key = `${day}-${block}-${item}`;
    updatePeriodProgress({ checked: { ...checked, [key]: !checked[key] } });
  };

  const updateRounds = (day, block, value) => {
    updatePeriodProgress({ roundsDone: { ...roundsDone, [blockKey(day, block)]: value } });
  };

  const toggleBlock = (day, block) => {
    const key = blockKey(day, block);
    updatePeriodProgress({ completedBlocks: { ...completedBlocks, [key]: !completedBlocks[key] } });
  };

  return (
    <main className="app">
      <section className="hero">
        <div className="heroCopy">
          <div className="eyebrow"><CalendarDays size={18} /> SEMANA {currentRoutine.week}: {currentRoutine.label}</div>
          <h1>Rutina fútbol femenino</h1>
          <p>{currentRoutine.objective}</p>
          <div className="periodPicker">
            <label>
              <span>Mes</span>
              <div className="customSelect">
                <button className="selectButton" onClick={() => setOpenPicker(openPicker === "month" ? null : "month")} type="button">
                  {months[selectedMonth]}
                </button>
                {openPicker === "month" && (
                  <div className="selectMenu">
                    {availableMonths.map((month) => (
                      <button
                        className={selectedMonth === month.index ? "selected" : ""}
                        key={month.name}
                        onClick={() => {
                          setSelectedMonth(month.index);
                          setOpenPicker(null);
                        }}
                        type="button"
                      >
                        {month.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </label>
            <label>
              <span>Semana</span>
              <div className="customSelect">
                <button className="selectButton" onClick={() => setOpenPicker(openPicker === "week" ? null : "week")} type="button">
                  Semana {selectedWeek}
                </button>
                {openPicker === "week" && (
                  <div className="selectMenu">
                    {availableWeeks.map((week) => (
                      <button
                        className={selectedWeek === week ? "selected" : ""}
                        key={week}
                        onClick={() => {
                          setSelectedWeek(week);
                          setOpenPicker(null);
                        }}
                        type="button"
                      >
                        Semana {week}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </label>
          </div>
          <div className="weekChecks" aria-label="Progreso por día">
            {weekPlan.map((day, index) => {
              const dayComplete = isDayComplete(day);

              return (
                <motion.button
                  key={day.day}
                  className={`${selectedDay === day.day ? "current" : ""} ${dayComplete ? "complete" : ""}`}
                  onClick={() => setSelectedDay(day.day)}
                  type="button"
                  aria-label={`${day.day}${dayComplete ? " completo" : ""}`}
                  animate={dayComplete ? { scale: [1, 1.16, 1] } : { scale: 1 }}
                  transition={{ duration: .35 }}
                >
                  {dayComplete ? <SoccerBallIcon /> : dayLetters[index]}
                </motion.button>
              );
            })}
          </div>
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
                        Listo
                      </button>
                    )}
                  </div>
                </div>

                <div className="items">
                  {exerciseItems(block).map((item) => {
                    const key = `${current.day}-${block.name}-${item}`;
                    const done = preventiveDone || blockDone || checked[key];
                    return (
                      <div className="exerciseRow" key={item}>
                        <button
                          onClick={() => toggleItem(current.day, block.name, item)}
                          className={done ? "item done" : "item"}
                          type="button"
                        >
                          <CheckCircle2 size={20} />
                          <span>{item}</span>
                        </button>
                        <button
                          className="expandExercise"
                          onClick={() => setExpandedExercise({ day: current.day, block: block.name, item })}
                          type="button"
                          aria-label={`Ver imagen de ${item}`}
                        >
                          <Maximize2 size={18} />
                        </button>
                      </div>
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

      {expandedExercise && (
        <div className="exerciseModal" role="dialog" aria-modal="true" aria-label={`Imagen de ${expandedExercise.item}`}>
          <div className="modalBackdrop" onClick={() => setExpandedExercise(null)} />
          <motion.div className="modalPanel" initial={{ opacity: 0, scale: .96, y: 12 }} animate={{ opacity: 1, scale: 1, y: 0 }}>
            <button className="closeModal" onClick={() => setExpandedExercise(null)} type="button" aria-label="Cerrar imagen">
              <X size={22} />
            </button>
            <div className="exerciseImagePlaceholder">
              <Image size={34} />
              <span>Referencia visual desde Google Imágenes</span>
            </div>
            <div className="modalCopy">
              <span>{expandedExercise.day} | {expandedExercise.block}</span>
              <h3>{expandedExercise.item}</h3>
              <a className="googleImageLink" href={googleImageSearchUrl(expandedExercise.item)} target="_blank" rel="noreferrer">
                <ExternalLink size={18} />
                Abrir imágenes en Google
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
