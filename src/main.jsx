import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion } from "framer-motion";
import { Dumbbell, Timer, HeartPulse, Footprints, CheckCircle2, Flame, CalendarDays, ExternalLink, House, Image, Maximize2, X } from "lucide-react";
import "./style.css";

const weekThreeHomePlan = [
  {
    day: "Lunes",
    title: "Lower body strength + intermitentes",
    focus: "Fuerza pierna, estabilidad y capacidad anaeróbica",
    intensity: "Media-alta",
    icon: Dumbbell,
    blocks: [
      { name: "Preventivos", items: ["3 rondas", "Copenhagen plank 30s por lado", "Hamstring walkouts 15 reps", "Monster walks 20 pasos", "Single leg glute bridge 15 por lado", "Pogos 30 reps"] },
      { name: "Zona media dinámica", items: ["4 vueltas", "45s plancha", "25 mountain climbers", "20 V-ups", "20 russian twists"] },
      { name: "Lower body strength", items: ["Goblet squat tempo 5x10", "Bulgarian split squat 4x12", "Dumbbell RDL 4x12", "Walking lunges pesados", "Farmer carry pesado"] },
      { name: "Intermitentes", items: ["10 mins", "10x10", "intensidad 85-90%"] },
      { name: "Finisher", items: ["4 rounds", "15 burpees", "20 jump squats", "20 lunges", "300m run"] }
    ]
  },
  {
    day: "Martes",
    title: "Upper body + conditioning",
    focus: "Tren superior y acondicionamiento metabólico",
    intensity: "Media",
    icon: HeartPulse,
    blocks: [
      { name: "Core", items: ["V-ups", "plank shoulder taps", "hollow hold", "russian twists"] },
      { name: "Upper strength", items: ["Push press mancuerna", "Dumbbell rows", "Push ups", "Shoulder press", "Renegade rows"] },
      { name: "Conditioning", items: ["20x10", "bike sprint", "KB swings", "dumbbell snatch", "skaters", "jump squats", "5 vueltas"] }
    ]
  },
  {
    day: "Miércoles",
    title: "Aeróbico + recovery",
    focus: "Recuperación activa y capacidad aeróbica",
    intensity: "Baja-media",
    icon: Footprints,
    blocks: [
      { name: "Movilidad", items: ["cadera", "tobillo", "aductores", "espalda baja", "movilidad dinámica"] },
      { name: "Running", items: ["45 mins suaves", "ritmo conversacional", "mantener FC estable"] },
      { name: "Recovery", items: ["foam roller", "movilidad", "descarga piernas", "respiración"] }
    ]
  },
  {
    day: "Jueves",
    title: "Power + repeated sprint ability",
    focus: "Explosividad específica fútbol",
    intensity: "Alta",
    icon: Flame,
    blocks: [
      { name: "Preventivos", items: ["Copenhagen", "pogos", "glute bridge unilateral", "aductor", "lateral hops"] },
      { name: "Potencia", items: ["squat jumps", "bounds", "lateral jumps", "sprint 20m", "broad jumps"] },
      { name: "Circuito fútbol", items: ["sprint", "shuffle", "backpedal", "sprint", "burpees", "KB swings", "6 rounds"] },
      { name: "Intermitentes", items: ["10 mins", "10x10", "intensidad 90%"] }
    ]
  },
  {
    day: "Viernes",
    title: "Full body strength",
    focus: "Fuerza funcional total",
    intensity: "Media-alta",
    icon: Dumbbell,
    blocks: [
      { name: "Strength", items: ["Dumbbell thrusters", "Bulgarian split squat", "Dumbbell RDL", "Push press", "Renegade rows"] },
      { name: "Conditioning", items: ["bike sprint", "jump lunges", "KB clean", "burpees", "plank taps", "5 vueltas"] },
      { name: "Core", items: ["V-ups", "russian twists", "hollow hold", "plank"] }
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
      { name: "Técnica fútbol", items: ["conducción", "sprint", "cambio dirección", "finalización", "pase largo"] },
      { name: "Final físico", items: ["4 rounds", "300m run", "15 burpees", "20 lunges", "20 V-ups"] }
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

const weekThreeGymPlan = [
  {
    day: "Lunes",
    title: "Lower body strength + intermitentes",
    focus: "Fuerza pierna, estabilidad y capacidad anaeróbica",
    intensity: "Media-alta",
    icon: Dumbbell,
    blocks: [
      { name: "Preventivos", items: ["3 rondas", "Copenhagen plank 30s por lado", "Hamstring walkouts 15 reps", "Monster walks 20 pasos", "Single leg glute bridge 15 por lado", "Pogos 30 reps"] },
      { name: "Zona media dinámica", items: ["4 vueltas", "45s plancha", "20 V-ups", "25 mountain climbers", "20 russian twists"] },
      { name: "Lower body strength", items: ["Back squat 5x6 pesado", "Bulgarian split squat con mancuerna 4x10", "Romanian deadlift barra 5x8", "Walking lunges con carga", "Heavy farmer carry"] },
      { name: "Intermitentes", items: ["10 mins", "10x10", "intensidad 85-90%"] },
      { name: "Finisher", items: ["4 rounds", "sled push", "box jumps", "jump lunges", "sprint 20m"] }
    ]
  },
  {
    day: "Martes",
    title: "Upper body + conditioning",
    focus: "Tren superior y acondicionamiento metabólico",
    intensity: "Media",
    icon: HeartPulse,
    blocks: [
      { name: "Core", items: ["weighted V-ups", "plank shoulder taps", "hollow hold", "cable rotations"] },
      { name: "Upper strength", items: ["Barbell push press", "Bent over rows", "Bench press", "Landmine press", "Renegade rows"] },
      { name: "Conditioning", items: ["20x10", "Assault bike", "heavy KB swings", "landmine snatch", "battle stance shuffle", "box jumps", "5 vueltas"] }
    ]
  },
  {
    day: "Miércoles",
    title: "Aeróbico + recovery",
    focus: "Recuperación activa y capacidad aeróbica",
    intensity: "Baja-media",
    icon: Footprints,
    blocks: [
      { name: "Movilidad", items: ["hip mobility", "ankle mobility", "aductores", "espalda baja", "movilidad dinámica"] },
      { name: "Running", items: ["45 mins suaves", "running suave o caminadora inclinada", "mantener FC estable"] },
      { name: "Recovery", items: ["foam roller", "stretching", "breathing work", "descarga piernas"] }
    ]
  },
  {
    day: "Jueves",
    title: "Power + repeated sprint ability",
    focus: "Explosividad específica fútbol",
    intensity: "Alta",
    icon: Flame,
    blocks: [
      { name: "Preventivos", items: ["Copenhagen", "pogos", "aductor", "glúteo medio", "hamstring walkouts"] },
      { name: "Potencia", items: ["Box jumps", "trap bar jumps", "lateral jumps", "sprint 20m", "broad jumps"] },
      { name: "Circuito fútbol", items: ["sled push", "shuffle", "backpedal", "sprint", "burpees", "heavy KB swings", "6 rounds"] },
      { name: "Intermitentes", items: ["10 mins", "10x10", "intensidad 90%"] }
    ]
  },
  {
    day: "Viernes",
    title: "Full body strength",
    focus: "Fuerza funcional total",
    intensity: "Media-alta",
    icon: Dumbbell,
    blocks: [
      { name: "Strength", items: ["Barbell thrusters", "Bulgarian split squat pesado", "Barbell RDL", "Push press barra", "Renegade rows"] },
      { name: "Conditioning", items: ["Assault bike", "jump lunges", "heavy KB clean", "sled push", "plank taps", "5 vueltas"] },
      { name: "Core", items: ["weighted V-ups", "cable rotation", "plank", "russian twists"] }
    ]
  },
  {
    day: "Sábado",
    title: "Running específico fútbol",
    focus: "Capacidad específica de partido",
    intensity: "Media-alta",
    icon: Timer,
    blocks: [
      { name: "Activación", items: ["movilidad", "skips", "técnica carrera"] },
      { name: "Repeated runs", items: ["3 bloques", "6 reps", "30s fuerte", "30s suave", "descanso 2 mins"] },
      { name: "Técnica fútbol", items: ["conducción", "sprint", "cambio dirección", "finalización", "pase largo"] },
      { name: "Final físico", items: ["4 rounds", "300m run o assault runner", "15 burpees", "20 lunges", "20 weighted V-ups"] }
    ]
  },
  {
    day: "Domingo",
    title: "Recovery",
    focus: "Recuperación total",
    intensity: "Baja",
    icon: CheckCircle2,
    blocks: [
      { name: "Recovery", items: ["caminar suave o caminadora inclinada", "movilidad", "hidratación", "dormir bien"] }
    ]
  }
];

const weekFourHomePlan = [
  {
    day: "Lunes",
    title: "Lower body power + intermitentes elite",
    focus: "Potencia pierna y explosividad",
    intensity: "Alta",
    icon: Dumbbell,
    blocks: [
      { name: "Preventivos", items: ["Copenhagen plank 30s", "Hamstring walkouts 15", "Pogos 35 reps", "Monster walks 20 pasos", "Single leg glute bridge"] },
      { name: "Zona media atlética", items: ["V-ups", "hollow hold", "mountain climbers", "russian twists", "plank shoulder taps"] },
      { name: "Power lower body", items: ["Goblet squat explosivo", "Bulgarian split squat", "Dumbbell jump squat", "Dumbbell RDL", "Broad jumps"] },
      { name: "Intermitentes elite", items: ["12 mins", "10x10", "intensidad 90%"] },
      { name: "Finisher", items: ["sprint 20m", "burpees", "jump lunges", "skaters", "4 rounds"] }
    ]
  },
  {
    day: "Martes",
    title: "Upper body athletic conditioning",
    focus: "Upper body y resistencia metabólica",
    intensity: "Media-alta",
    icon: HeartPulse,
    blocks: [
      { name: "Core", items: ["V-ups", "plank", "russian twists", "hollow hold"] },
      { name: "Upper athletic", items: ["Push press mancuerna", "Renegade rows", "Push ups", "Shoulder press", "Bent over rows"] },
      { name: "Conditioning", items: ["bike sprint", "KB swings", "dumbbell snatch", "mountain climbers", "jump squats", "6 vueltas"] }
    ]
  },
  {
    day: "Miércoles",
    title: "Recovery aerobic day",
    focus: "Recuperación activa",
    intensity: "Baja",
    icon: Footprints,
    blocks: [
      { name: "Mobility", items: ["cadera", "tobillo", "espalda baja", "aductores", "movilidad dinámica"] },
      { name: "Aerobic run", items: ["45 mins suaves", "ritmo conversacional", "mantener FC estable"] },
      { name: "Recovery", items: ["foam roller", "stretching", "respiración", "descarga piernas"] }
    ]
  },
  {
    day: "Jueves",
    title: "Repeated sprint ability + football power",
    focus: "Velocidad y capacidad específica fútbol",
    intensity: "Muy alta",
    icon: Flame,
    blocks: [
      { name: "Preventivos", items: ["Copenhagen", "pogos", "lateral hops", "hamstring walkouts", "monster walks"] },
      { name: "Power", items: ["squat jumps", "broad jumps", "sprint 20m", "lateral jumps", "bounds"] },
      { name: "Football conditioning", items: ["sprint", "shuffle", "backpedal", "sprint", "burpees", "KB swings", "7 rounds"] },
      { name: "Intermitentes elite", items: ["12 mins", "intensidad 95%", "10x10"] }
    ]
  },
  {
    day: "Viernes",
    title: "Full body athletic strength",
    focus: "Fuerza funcional y potencia",
    intensity: "Alta",
    icon: Dumbbell,
    blocks: [
      { name: "Strength", items: ["Dumbbell thrusters", "Bulgarian split squat", "Dumbbell RDL", "Push press", "Renegade rows"] },
      { name: "Conditioning", items: ["bike sprint", "jump lunges", "burpees", "KB swings", "mountain climbers", "6 vueltas"] },
      { name: "Core", items: ["V-ups", "hollow hold", "russian twists", "plank"] }
    ]
  },
  {
    day: "Sábado",
    title: "Football running + conditioning",
    focus: "Capacidad específica de partido",
    intensity: "Alta",
    icon: Timer,
    blocks: [
      { name: "Athletic warmup", items: ["movilidad", "skipping", "técnica carrera", "aceleraciones"] },
      { name: "Repeated runs", items: ["4 bloques", "6 reps", "30s fuerte", "30s suave", "descanso 90s"] },
      { name: "Football conditioning", items: ["conducción", "sprint", "cambio dirección", "finalización", "pase largo"] },
      { name: "Finisher", items: ["400m run", "burpees", "jump squats", "V-ups", "4 rounds"] }
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

const weekFourGymPlan = [
  {
    day: "Lunes",
    title: "Lower body power + intermitentes elite",
    focus: "Potencia pierna y explosividad",
    intensity: "Alta",
    icon: Dumbbell,
    blocks: [
      { name: "Preventivos", items: ["Copenhagen plank", "Hamstring walkouts", "Pogos", "Glute bridge unilateral", "Adductor work"] },
      { name: "Zona media atlética", items: ["weighted V-ups", "cable rotations", "hollow hold", "plank shoulder taps"] },
      { name: "Power lower body", items: ["Back squat explosivo 6x4", "Bulgarian split squat pesado", "Trap bar jumps", "Barbell RDL", "Broad jumps"] },
      { name: "Intermitentes elite", items: ["12 mins", "10x10", "intensidad 90%"] },
      { name: "Finisher", items: ["sprint 20m", "sled push", "jump lunges", "box jumps", "4 rounds"] }
    ]
  },
  {
    day: "Martes",
    title: "Upper body athletic conditioning",
    focus: "Upper body y resistencia metabólica",
    intensity: "Media-alta",
    icon: HeartPulse,
    blocks: [
      { name: "Core", items: ["weighted V-ups", "plank", "cable rotations", "hollow hold"] },
      { name: "Upper athletic", items: ["Barbell push press", "Bench press", "Bent over rows", "Landmine press", "Renegade rows"] },
      { name: "Conditioning", items: ["Assault bike", "heavy KB swings", "landmine snatch", "sled push", "box jumps", "6 vueltas"] }
    ]
  },
  {
    day: "Miércoles",
    title: "Recovery aerobic day",
    focus: "Recuperación activa",
    intensity: "Baja",
    icon: Footprints,
    blocks: [
      { name: "Mobility", items: ["hip mobility", "ankle mobility", "espalda baja", "aductor", "movilidad dinámica"] },
      { name: "Aerobic run", items: ["45 mins suaves", "running suave o caminadora inclinada", "mantener FC estable"] },
      { name: "Recovery", items: ["foam roller", "stretching", "breathing work", "descarga piernas"] }
    ]
  },
  {
    day: "Jueves",
    title: "Repeated sprint ability + football power",
    focus: "Velocidad y capacidad específica fútbol",
    intensity: "Muy alta",
    icon: Flame,
    blocks: [
      { name: "Preventivos", items: ["Copenhagen", "pogos", "glúteo medio", "hamstring walkouts", "aductor"] },
      { name: "Power", items: ["Box jumps", "Broad jumps", "Sprint 20m", "lateral jumps", "Trap bar jumps"] },
      { name: "Football conditioning", items: ["sled push", "shuffle", "backpedal", "sprint", "burpees", "heavy KB swings", "7 rounds"] },
      { name: "Intermitentes elite", items: ["12 mins", "intensidad 95%", "10x10"] }
    ]
  },
  {
    day: "Viernes",
    title: "Full body athletic strength",
    focus: "Fuerza funcional y potencia",
    intensity: "Alta",
    icon: Dumbbell,
    blocks: [
      { name: "Strength", items: ["Barbell thrusters", "Bulgarian split squat pesado", "Barbell RDL", "Push press barra", "Renegade rows"] },
      { name: "Conditioning", items: ["Assault bike", "jump lunges", "sled push", "heavy KB swings", "mountain climbers", "6 vueltas"] },
      { name: "Core", items: ["weighted V-ups", "cable rotations", "plank", "hollow hold"] }
    ]
  },
  {
    day: "Sábado",
    title: "Football running + conditioning",
    focus: "Capacidad específica partido",
    intensity: "Alta",
    icon: Timer,
    blocks: [
      { name: "Athletic warmup", items: ["movilidad", "skips", "técnica carrera", "acceleration drills"] },
      { name: "Repeated runs", items: ["4 bloques", "6 reps", "30s fuerte", "30s suave", "descanso 90s"] },
      { name: "Football conditioning", items: ["conducción", "sprint", "cambio dirección", "finalización", "pase largo"] },
      { name: "Finisher", items: ["400m run o assault runner", "burpees", "box jumps", "weighted V-ups", "4 rounds"] }
    ]
  },
  {
    day: "Domingo",
    title: "Recovery",
    focus: "Recuperación total",
    intensity: "Baja",
    icon: CheckCircle2,
    blocks: [
      { name: "Recovery", items: ["caminar suave o caminadora inclinada", "movilidad", "stretching", "foam roller", "hidratación"] }
    ]
  }
];

const normalizeExerciseItem = (item, blockName = "") => {
  const text = item.trim();
  const lower = text.toLowerCase();
  const block = blockName.toLowerCase();

  if (lower === "dead bug" || lower === "dead bugs" || /\bdead bugs\b/i.test(text)) {
    return text.replace(/dead bugs?/i, "V-ups");
  }

  if (lower === "battle ropes" || lower === "ropes") {
    if (/functional|conditioning|cardio/i.test(block)) return "bike sprint";
    return "high knees";
  }

  if (/\bpull ups asistidas\b/i.test(text)) {
    return text.replace(/pull ups asistidas/i, "dumbbell rows");
  }

  if (/\bpull ups\b/i.test(text)) {
    return text.replace(/pull ups/i, /fuerza|strength|upper/i.test(block) ? "bent over rows" : "renegade rows");
  }

  return item;
};

const normalizePlan = (plan) => {
  return plan.map((day) => ({
    ...day,
    blocks: day.blocks.map((block) => ({
      ...block,
      items: block.items.map((item) => normalizeExerciseItem(item, block.name))
    }))
  }));
};

const routineWeeks = [
  {
    week: 3,
    label: "Volumen + fuerza funcional",
    objective: "Objetivo: aumentar fuerza funcional, volumen tolerable, resistencia específica fútbol, potencia, recomposición corporal y estabilidad unilateral.",
    homePlan: normalizePlan(weekThreeHomePlan),
    gymPlan: normalizePlan(weekThreeGymPlan)
  },
  {
    week: 4,
    label: "Power + anaeróbico",
    objective: "Objetivo: aumentar explosividad, mejorar repeated sprint ability, potencia específica fútbol, tolerancia alta intensidad y recomposición corporal.",
    homePlan: normalizePlan(weekFourHomePlan),
    gymPlan: normalizePlan(weekFourGymPlan)
  }
];
const trainingModes = [
  { id: "home", label: "Casa", icon: House },
  { id: "gym", label: "Gym", icon: Dumbbell }
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
const getModePeriodKey = (month, week, mode) => `${month}-week-${week}-${mode}`;
const getLegacyPeriodKey = (month, week) => `${month}-week-${week}`;

const mergePeriodProgress = (...progressItems) => {
  return progressItems.reduce((merged, progress) => {
    if (!progress) return merged;
    return {
      checked: { ...(merged.checked ?? {}), ...(progress.checked ?? {}) },
      roundsDone: { ...(merged.roundsDone ?? {}), ...(progress.roundsDone ?? {}) },
      completedBlocks: { ...(merged.completedBlocks ?? {}), ...(progress.completedBlocks ?? {}) }
    };
  }, {});
};

const hasProgress = (progress) => Boolean(
  Object.keys(progress.checked ?? {}).length ||
  Object.keys(progress.roundsDone ?? {}).length ||
  Object.keys(progress.completedBlocks ?? {}).length
);

const loadAllProgress = () => {
  try {
    const saved = window.localStorage.getItem(progressStorageKey);
    if (saved) {
      const parsed = JSON.parse(saved);
      const oldCalendarKey = getLegacyPeriodKey(initialMonth, currentCalendarWeek);
      const oldCalendarGymKey = getModePeriodKey(initialMonth, currentCalendarWeek, "gym");
      const oldCalendarHomeKey = getModePeriodKey(initialMonth, currentCalendarWeek, "home");
      let migrated = { ...parsed };

      routineWeeks.forEach((routine) => {
        const baseKey = getPeriodKey(initialMonth, routine.week);
        const merged = mergePeriodProgress(
          parsed[baseKey],
          parsed[getModePeriodKey(initialMonth, routine.week, "home")],
          parsed[getModePeriodKey(initialMonth, routine.week, "gym")],
          routine.week === 3 ? parsed[oldCalendarKey] : null,
          routine.week === 3 ? parsed[oldCalendarHomeKey] : null,
          routine.week === 3 ? parsed[oldCalendarGymKey] : null
        );

        if (hasProgress(merged)) {
          migrated[baseKey] = merged;
        }
      });

      return migrated;
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
  const [selectedMode, setSelectedMode] = useState("gym");
  const [selectedDay, setSelectedDay] = useState("Lunes");
  const [expandedExercise, setExpandedExercise] = useState(null);
  const [openPicker, setOpenPicker] = useState(null);
  const currentRoutine = useMemo(() => routineWeeks.find((routine) => routine.week === selectedWeek) ?? routineWeeks[0], [selectedWeek]);
  const planForMode = (mode) => mode === "home" ? currentRoutine.homePlan : currentRoutine.gymPlan;
  const weekPlan = planForMode(selectedMode);
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
  const dayForMode = (dayName, mode) => planForMode(mode).find((day) => day.day === dayName);
  const blockKey = (day, block, mode = selectedMode) => `${mode}-${day}-${block.name}`;
  const legacyBlockKey = (day, block) => `${day}-${block.name}`;
  const itemKey = (day, block, item, mode = selectedMode) => `${mode}-${day}-${block}-${item}`;
  const legacyItemKey = (day, block, item) => `${day}-${block}-${item}`;
  const itemDone = (day, block, item, mode = selectedMode) => Boolean(checked[itemKey(day, block, item, mode)] || checked[legacyItemKey(day, block, item)]);
  const areAllItemsChecked = (day, block, mode = selectedMode) => exerciseItems(block).every((item) => itemDone(day, block.name, item, mode));
  const roundsValue = (day, block, mode = selectedMode) => roundsDone[blockKey(day, block, mode)] ?? roundsDone[legacyBlockKey(day, block)] ?? 0;
  const isPreventiveComplete = (day, block, mode = selectedMode) => Number(roundsValue(day, block, mode)) >= roundTarget(block) || areAllItemsChecked(day, block, mode);
  const isBlockComplete = (day, block, mode = selectedMode) => Boolean(completedBlocks[blockKey(day, block, mode)] || completedBlocks[legacyBlockKey(day, block)]);
  const blockTotal = (block) => isPreventiveBlock(block) || usesBlockCompletion(block) ? 1 : exerciseItems(block).length;
  const blockCompleted = (day, block, mode = selectedMode) => {
    if (isPreventiveBlock(block)) return isPreventiveComplete(day, block, mode) ? 1 : 0;
    if (usesBlockCompletion(block)) return isBlockComplete(day, block, mode) ? 1 : 0;
    return exerciseItems(block).filter((item) => itemDone(day, block.name, item, mode)).length;
  };
  const isDayCompleteForMode = (dayName, mode) => {
    const day = dayForMode(dayName, mode);
    return day ? day.blocks.every((block) => blockCompleted(day.day, block, mode) >= blockTotal(block)) : false;
  };
  const isDayComplete = (day) => trainingModes.some((mode) => isDayCompleteForMode(day.day, mode.id));
  const dayProgress = (dayName) => {
    const modeProgress = trainingModes
      .map((mode) => {
        const day = dayForMode(dayName, mode.id);
        if (!day) return null;

        const dayTotal = day.blocks.reduce((sum, block) => sum + blockTotal(block), 0);
        const dayCompleted = day.blocks.reduce((sum, block) => sum + blockCompleted(day.day, block, mode.id), 0);

        return {
          mode: mode.id,
          total: dayTotal,
          completed: dayCompleted,
          ratio: dayTotal ? dayCompleted / dayTotal : 0
        };
      })
      .filter(Boolean);

    return modeProgress.reduce((best, currentMode) => {
      if (!best) return currentMode;
      if (currentMode.ratio > best.ratio) return currentMode;
      if (currentMode.ratio === best.ratio && currentMode.mode === selectedMode) return currentMode;
      return best;
    }, null);
  };

  const total = weekPlan.reduce((acc, day) => acc + (dayProgress(day.day)?.total ?? 0), 0);
  const completed = weekPlan.reduce((acc, day) => acc + (dayProgress(day.day)?.completed ?? 0), 0);
  const progress = Math.round((completed / total) * 100);
  const Icon = current.icon;

  const toggleItem = (day, block, item) => {
    const key = itemKey(day, block, item);
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
            <div className="modePicker" aria-label="Tipo de rutina">
              {trainingModes.map((mode) => {
                const ModeIcon = mode.icon;
                return (
                  <button
                    aria-label={`Rutina de ${mode.label}`}
                    className={selectedMode === mode.id ? "active" : ""}
                    key={mode.id}
                    onClick={() => setSelectedMode(mode.id)}
                    title={mode.label}
                    type="button"
                  >
                    <ModeIcon size={22} />
                  </button>
                );
              })}
            </div>
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
            const selectedRounds = roundsValue(current.day, block) || "";
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
                      <div className="roundSelector" aria-label="Rondas">
                        <span>Rondas</span>
                        <div className="roundBoxes">
                          {[1, 2, 3].map((round) => (
                            <button
                              className={Number(selectedRounds) >= round ? "active" : ""}
                              key={round}
                              onClick={() => updateRounds(current.day, block, Number(selectedRounds) === round ? "" : String(round))}
                              type="button"
                              aria-label={`${round} ronda${round > 1 ? "s" : ""}`}
                            >
                              {round}
                            </button>
                          ))}
                        </div>
                      </div>
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
                    const done = preventiveDone || blockDone || itemDone(current.day, block.name, item);
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
              <span>Referencia visual del ejercicio</span>
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
