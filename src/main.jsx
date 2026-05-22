import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion } from "framer-motion";
import { Dumbbell, Timer, HeartPulse, Footprints, CheckCircle2, Flame, CalendarDays, ExternalLink, House, Image, Maximize2, X, Star, Lock } from "lucide-react";
import "./style.css";

const weekOneHomePlan = [
  {
    day: "Lunes",
    title: "Pierna técnica + base aeróbica",
    focus: "Activación, estabilidad y resistencia suave",
    intensity: "Baja-media",
    icon: Dumbbell,
    blocks: [
      { name: "Calentamiento", items: ["Movilidad de cadera 2 min", "Activación de glúteos 2 x 15", "Sentadillas sin peso 2 x 12", "Caminata lateral con banda 2 x 12 por lado"] },
      { name: "Fuerza base", items: ["Sentadilla controlada 3 x 12", "Puente de glúteo 3 x 15", "Zancadas atrás 3 x 10 por pierna", "Peso muerto a una pierna sin peso 3 x 10 por pierna"] },
      { name: "Cardio base", items: ["Trote suave o caminata rápida 18-20 min", "Ritmo cómodo, sin exigirse al máximo"] },
      { name: "Core", items: ["Plancha frontal 3 x 25 seg", "V-ups 3 x 10 por lado", "Crunch controlado 3 x 12"] }
    ]
  },
  {
    day: "Martes",
    title: "Upper body + core",
    focus: "Tren superior, postura y estabilidad",
    intensity: "Baja-media",
    icon: HeartPulse,
    blocks: [
      { name: "Calentamiento", items: ["Movilidad de hombros 2 min", "Círculos de brazos 2 x 15", "Plancha alta con toque de hombros 2 x 10"] },
      { name: "Tren superior", items: ["Push ups inclinadas o normales 3 x 8-10", "Remo con banda o mochila 3 x 12", "Fondos en silla 3 x 10", "Shoulder taps 3 x 16"] },
      { name: "Core", items: ["V-ups 3 x 12", "Hollow hold 3 x 20 seg", "Russian twists 3 x 20", "Plancha lateral 2 x 20 seg por lado"] }
    ]
  },
  {
    day: "Miércoles",
    title: "Cardio suave + movilidad",
    focus: "Recuperación activa y capacidad aeróbica",
    intensity: "Baja",
    icon: Footprints,
    blocks: [
      { name: "Cardio", items: ["Caminata rápida o trote suave 25-30 min"] },
      { name: "Movilidad", items: ["Cadera 3 min", "Isquios 3 min", "Cuádriceps 3 min", "Tobillos 2 min", "Espalda baja 2 min"] }
    ]
  },
  {
    day: "Jueves",
    title: "Pierna unilateral + estabilidad",
    focus: "Control corporal y prevención de lesiones",
    intensity: "Media",
    icon: Flame,
    blocks: [
      { name: "Activación", items: ["Monster walks 2 x 12", "Puente de glúteo 2 x 15", "Sentadilla pausada 2 x 10"] },
      { name: "Fuerza unilateral", items: ["Bulgarian split squat 3 x 8 por pierna", "Step ups 3 x 10 por pierna", "Peso muerto a una pierna 3 x 10", "Wall sit 3 x 30 seg"] },
      { name: "Core + estabilidad", items: ["Plancha frontal 3 x 30 seg", "Bird dog 3 x 10 por lado", "Balance a una pierna 3 x 25 seg por pierna"] }
    ]
  },
  {
    day: "Viernes",
    title: "Full body funcional",
    focus: "Fuerza general y coordinación",
    intensity: "Media",
    icon: Dumbbell,
    blocks: [
      { name: "Circuito funcional", items: ["3 rondas", "Sentadilla 12 reps", "Push ups 8-10 reps", "Zancadas alternas 10 por pierna", "Mountain climbers 30 seg", "Plancha 30 seg"] }
    ]
  },
  {
    day: "Sábado",
    title: "Técnica de carrera + fútbol",
    focus: "Coordinación, ritmo y toque de balón",
    intensity: "Baja-media",
    icon: Timer,
    blocks: [
      { name: "Técnica de carrera", items: ["Skipping bajo 3 x 20 seg", "Talones al glúteo 3 x 20 seg", "Desplazamientos laterales 3 x 20 seg", "Cambios de dirección suaves 4 x 10 m"] },
      { name: "Balón", items: ["Conducción libre 8 min", "Pases contra pared 4 x 1 min", "Control orientado 4 x 1 min", "Finalizaciones suaves o golpeo técnico 10 min"] }
    ]
  },
  {
    day: "Domingo",
    title: "Descanso activo",
    focus: "Recuperación, movilidad y bienestar",
    intensity: "Baja",
    icon: CheckCircle2,
    blocks: [
      { name: "Recuperación", items: ["Caminata suave 15-20 min", "Movilidad general 10 min", "Respiración / estiramiento suave 5 min"] }
    ]
  }
];

const weekOneGymPlan = [
  {
    day: "Lunes",
    title: "Pierna técnica + base aeróbica",
    focus: "Activación, estabilidad y resistencia suave",
    intensity: "Baja-media",
    icon: Dumbbell,
    blocks: [
      { name: "Calentamiento", items: ["Movilidad de cadera 2 min", "Activación de glúteos 2 x 15", "Sentadillas sin peso 2 x 12", "Caminata lateral con banda 2 x 12 por lado"] },
      { name: "Fuerza base", items: ["Sentadilla goblet 3 x 12", "Hip thrust ligero 3 x 12", "Prensa ligera 3 x 12", "Peso muerto rumano ligero 3 x 10"] },
      { name: "Cardio base", items: ["Trote suave o caminata rápida 18-20 min", "Ritmo cómodo, sin exigirse al máximo"] },
      { name: "Core", items: ["Plancha frontal 3 x 25 seg", "V-ups 3 x 10 por lado", "Crunch controlado 3 x 12"] }
    ]
  },
  {
    day: "Martes",
    title: "Upper body + core",
    focus: "Tren superior, postura y estabilidad",
    intensity: "Baja-media",
    icon: HeartPulse,
    blocks: [
      { name: "Calentamiento", items: ["Movilidad de hombros 2 min", "Círculos de brazos 2 x 15", "Plancha alta con toque de hombros 2 x 10"] },
      { name: "Tren superior", items: ["Press pecho con mancuernas 3 x 10", "Jalón al pecho 3 x 12", "Remo sentado 3 x 12", "Press hombro con mancuernas 3 x 10"] },
      { name: "Core", items: ["V-ups 3 x 12", "Hollow hold 3 x 20 seg", "Russian twists 3 x 20", "Plancha lateral 2 x 20 seg por lado"] }
    ]
  },
  {
    day: "Miércoles",
    title: "Cardio suave + movilidad",
    focus: "Recuperación activa y capacidad aeróbica",
    intensity: "Baja",
    icon: Footprints,
    blocks: [
      { name: "Cardio", items: ["Caminadora, bicicleta o elíptica 25-30 min"] },
      { name: "Movilidad", items: ["Cadera 3 min", "Isquios 3 min", "Cuádriceps 3 min", "Tobillos 2 min", "Espalda baja 2 min"] }
    ]
  },
  {
    day: "Jueves",
    title: "Pierna unilateral + estabilidad",
    focus: "Control corporal y prevención de lesiones",
    intensity: "Media",
    icon: Flame,
    blocks: [
      { name: "Activación", items: ["Monster walks 2 x 12", "Puente de glúteo 2 x 15", "Sentadilla pausada 2 x 10"] },
      { name: "Fuerza unilateral", items: ["Bulgarian split squat con mancuernas 3 x 8 por pierna", "Step ups con mancuernas 3 x 10 por pierna", "Curl femoral 3 x 12", "Extensión de cuádriceps 3 x 12"] },
      { name: "Core + estabilidad", items: ["Plancha frontal 3 x 30 seg", "Bird dog 3 x 10 por lado", "Balance a una pierna 3 x 25 seg por pierna"] }
    ]
  },
  {
    day: "Viernes",
    title: "Full body funcional",
    focus: "Fuerza general y coordinación",
    intensity: "Media",
    icon: Dumbbell,
    blocks: [
      { name: "Circuito funcional", items: ["3 rondas", "Goblet squat 12 reps", "Press pecho 10 reps", "Remo con mancuerna 10 por lado", "Peso muerto rumano 10 reps", "Plancha 30 seg"] }
    ]
  },
  {
    day: "Sábado",
    title: "Técnica de carrera + fútbol",
    focus: "Coordinación, ritmo y toque de balón",
    intensity: "Baja-media",
    icon: Timer,
    blocks: [
      { name: "Técnica de carrera", items: ["Skipping bajo 3 x 20 seg", "Talones al glúteo 3 x 20 seg", "Desplazamientos laterales 3 x 20 seg", "Cambios de dirección suaves 4 x 10 m"] },
      { name: "Balón", items: ["Conducción libre 8 min", "Pases contra pared 4 x 1 min", "Control orientado 4 x 1 min", "Finalizaciones suaves o golpeo técnico 10 min"] }
    ]
  },
  {
    day: "Domingo",
    title: "Descanso activo",
    focus: "Recuperación, movilidad y bienestar",
    intensity: "Baja",
    icon: CheckCircle2,
    blocks: [
      { name: "Recuperación", items: ["Caminata suave 15-20 min", "Movilidad general 10 min", "Respiración / estiramiento suave 5 min"] }
    ]
  }
];

const weekTwoHomePlan = [
  {
    day: "Lunes",
    title: "Pierna fuerza base + intermitentes suaves",
    focus: "Tren inferior y capacidad aeróbica inicial",
    intensity: "Media",
    icon: Dumbbell,
    blocks: [
      { name: "Calentamiento", items: ["Movilidad de cadera 2 min", "Activación de glúteos 2 x 15", "Sentadilla sin peso 2 x 12", "Skipping suave 3 x 20 seg"] },
      { name: "Fuerza pierna", items: ["Sentadilla pausada 4 x 10", "Puente de glúteo a una pierna 3 x 10 por pierna", "Zancadas caminando o alternas 3 x 12 por pierna", "Peso muerto rumano con mochila/mancuernas 3 x 12"] },
      { name: "Intermitentes de correr", items: ["2 series x 6 min", "10” rápido / 10” suave", "descanso 2 min caminando o trote suave entre series"] },
      { name: "Core", items: ["Plancha frontal 3 x 35 seg", "V-ups 3 x 12 por lado", "Russian twists 3 x 20"] }
    ]
  },
  {
    day: "Martes",
    title: "Upper body + conditioning",
    focus: "Tren superior y acondicionamiento metabólico",
    intensity: "Media",
    icon: HeartPulse,
    blocks: [
      { name: "Core", items: ["V-ups 3 x 15", "Plank shoulder taps 3 x 20", "Hollow hold 3 x 25 seg", "Russian twists 3 x 24"] },
      { name: "Tren superior", items: ["Push ups 4 x 8-10", "Remo con mochila/banda 4 x 12", "Fondos en silla 3 x 12", "Pike push ups 3 x 8"] },
      { name: "Conditioning", items: ["3 rondas", "Jumping jacks 30 seg", "Mountain climbers 30 seg", "Sentadilla rápida controlada 30 seg", "descanso 45 seg"] }
    ]
  },
  {
    day: "Miércoles",
    title: "Cardio base + movilidad",
    focus: "Resistencia aeróbica y recuperación",
    intensity: "Baja-media",
    icon: Footprints,
    blocks: [
      { name: "Cardio", items: ["Trote suave o caminata rápida 30-35 min"] },
      { name: "Movilidad", items: ["Cadera 3 min", "Isquios 3 min", "Cuádriceps 3 min", "Tobillos 2 min", "Espalda baja 2 min"] }
    ]
  },
  {
    day: "Jueves",
    title: "Pierna unilateral + potencia controlada",
    focus: "Estabilidad, fuerza funcional y control",
    intensity: "Media",
    icon: Flame,
    blocks: [
      { name: "Activación", items: ["Caminata lateral con banda 3 x 12 por lado", "Puente de glúteo 3 x 15", "Sentadilla pausada 2 x 10"] },
      { name: "Fuerza unilateral", items: ["Bulgarian split squat 4 x 8 por pierna", "Step ups 3 x 12 por pierna", "Peso muerto a una pierna 3 x 10 por pierna", "Wall sit 3 x 40 seg"] },
      { name: "Potencia controlada", items: ["Saltos verticales suaves 3 x 6", "Skater jumps controlados 3 x 8 por lado", "Aceleraciones cortas 4 x 10 m"] }
    ]
  },
  {
    day: "Viernes",
    title: "Full body fuerza funcional",
    focus: "Fuerza general, coordinación y resistencia",
    intensity: "Media",
    icon: Dumbbell,
    blocks: [
      { name: "Circuito principal", items: ["4 rondas", "Sentadilla 12 reps", "Push ups 10 reps", "Zancadas alternas 10 por pierna", "Remo con mochila 12 reps", "Plancha 35 seg"] },
      { name: "Finisher", items: ["4 rondas", "30 seg trabajo", "30 seg descanso", "Mountain climbers 30 seg", "Sentadilla rápida controlada 30 seg", "Skipping suave 30 seg", "Plancha 30 seg"] }
    ]
  },
  {
    day: "Sábado",
    title: "Fútbol + intermitentes técnicos",
    focus: "Ritmo, balón y aceleraciones controladas",
    intensity: "Media",
    icon: Timer,
    blocks: [
      { name: "Técnica de carrera", items: ["Skipping 3 x 20 seg", "Talones al glúteo 3 x 20 seg", "Desplazamientos laterales 3 x 20 seg", "Cambios de dirección 5 x 10 m"] },
      { name: "Balón", items: ["Conducción con cambios de ritmo 10 min", "Pases contra pared 5 x 1 min", "Control orientado 5 x 1 min", "Finalización técnica 10 min"] },
      { name: "Intermitentes de correr", items: ["2 series x 6 min", "10” rápido / 10” suave", "descanso 2 min caminando o trote suave entre series"] }
    ]
  },
  {
    day: "Domingo",
    title: "Descanso activo",
    focus: "Recuperación y movilidad",
    intensity: "Baja",
    icon: CheckCircle2,
    blocks: [
      { name: "Recuperación", items: ["Caminata suave 20-25 min", "Movilidad general 10 min", "Estiramiento suave 5 min"] }
    ]
  }
];

const weekTwoGymPlan = [
  {
    day: "Lunes",
    title: "Pierna fuerza base + intermitentes suaves",
    focus: "Tren inferior y capacidad aeróbica inicial",
    intensity: "Media",
    icon: Dumbbell,
    blocks: [
      { name: "Calentamiento", items: ["Movilidad de cadera 2 min", "Activación de glúteos 2 x 15", "Sentadilla sin peso 2 x 12", "Skipping suave 3 x 20 seg"] },
      { name: "Fuerza pierna", items: ["Sentadilla goblet o barra ligera 4 x 10", "Hip thrust 4 x 10", "Prensa 3 x 12", "Peso muerto rumano 3 x 10"] },
      { name: "Intermitentes de correr", items: ["2 series x 6 min", "10” rápido / 10” suave", "descanso 2 min caminando o trote suave entre series"] },
      { name: "Core", items: ["Plancha frontal 3 x 35 seg", "V-ups 3 x 12 por lado", "Russian twists 3 x 20"] }
    ]
  },
  {
    day: "Martes",
    title: "Upper body + conditioning",
    focus: "Tren superior y acondicionamiento metabólico",
    intensity: "Media",
    icon: HeartPulse,
    blocks: [
      { name: "Core", items: ["V-ups 3 x 15", "Plank shoulder taps 3 x 20", "Hollow hold 3 x 25 seg", "Russian twists 3 x 24"] },
      { name: "Tren superior", items: ["Press pecho con mancuernas 4 x 10", "Jalón al pecho 4 x 10", "Remo sentado 3 x 12", "Press hombro 3 x 10"] },
      { name: "Conditioning", items: ["3 rondas", "Jumping jacks 30 seg", "Mountain climbers 30 seg", "Sentadilla rápida controlada 30 seg", "descanso 45 seg"] }
    ]
  },
  {
    day: "Miércoles",
    title: "Cardio base + movilidad",
    focus: "Resistencia aeróbica y recuperación",
    intensity: "Baja-media",
    icon: Footprints,
    blocks: [
      { name: "Cardio", items: ["Caminadora, bicicleta o elíptica 30-35 min"] },
      { name: "Movilidad", items: ["Cadera 3 min", "Isquios 3 min", "Cuádriceps 3 min", "Tobillos 2 min", "Espalda baja 2 min"] }
    ]
  },
  {
    day: "Jueves",
    title: "Pierna unilateral + potencia controlada",
    focus: "Estabilidad, fuerza funcional y control",
    intensity: "Media",
    icon: Flame,
    blocks: [
      { name: "Activación", items: ["Caminata lateral con banda 3 x 12 por lado", "Puente de glúteo 3 x 15", "Sentadilla pausada 2 x 10"] },
      { name: "Fuerza unilateral", items: ["Bulgarian split squat con mancuernas 4 x 8 por pierna", "Step ups con mancuernas 3 x 12 por pierna", "Curl femoral 3 x 12", "Extensión de cuádriceps 3 x 12"] },
      { name: "Potencia controlada", items: ["Saltos verticales suaves 3 x 6", "Skater jumps controlados 3 x 8 por lado", "Aceleraciones cortas 4 x 10 m"] }
    ]
  },
  {
    day: "Viernes",
    title: "Full body fuerza funcional",
    focus: "Fuerza general, coordinación y resistencia",
    intensity: "Media",
    icon: Dumbbell,
    blocks: [
      { name: "Circuito principal", items: ["4 rondas", "Goblet squat 12 reps", "Press pecho 10 reps", "Remo con mancuerna 10 por lado", "Peso muerto rumano 10 reps", "Plancha 35 seg"] },
      { name: "Finisher", items: ["4 rondas", "30 seg trabajo", "30 seg descanso", "Mountain climbers 30 seg", "Sentadilla rápida controlada 30 seg", "Skipping suave 30 seg", "Plancha 30 seg"] }
    ]
  },
  {
    day: "Sábado",
    title: "Fútbol + intermitentes técnicos",
    focus: "Ritmo, balón y aceleraciones controladas",
    intensity: "Media",
    icon: Timer,
    blocks: [
      { name: "Técnica de carrera", items: ["Skipping 3 x 20 seg", "Talones al glúteo 3 x 20 seg", "Desplazamientos laterales 3 x 20 seg", "Cambios de dirección 5 x 10 m"] },
      { name: "Balón", items: ["Conducción con cambios de ritmo 10 min", "Pases contra pared 5 x 1 min", "Control orientado 5 x 1 min", "Finalización técnica 10 min"] },
      { name: "Intermitentes de correr", items: ["2 series x 6 min", "10” rápido / 10” suave", "descanso 2 min caminando o trote suave entre series"] }
    ]
  },
  {
    day: "Domingo",
    title: "Descanso activo",
    focus: "Recuperación y movilidad",
    intensity: "Baja",
    icon: CheckCircle2,
    blocks: [
      { name: "Recuperación", items: ["Caminata suave 20-25 min", "Movilidad general 10 min", "Estiramiento suave 5 min"] }
    ]
  }
];

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
      { name: "Intermitentes de correr", items: ["2 series x 6 min", "10” rápido / 10” suave", "descanso 2 min caminando o trote suave entre series"] },
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
      { name: "Intermitentes de correr", items: ["2 series x 6 min", "10” rápido / 10” suave", "descanso 2 min caminando o trote suave entre series"] }
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
      { name: "Intermitentes de correr", items: ["2 series x 6 min", "10” rápido / 10” suave", "descanso 2 min caminando o trote suave entre series"] },
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
      { name: "Intermitentes de correr", items: ["2 series x 6 min", "10” rápido / 10” suave", "descanso 2 min caminando o trote suave entre series"] },
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
      { name: "Intermitentes de correr", items: ["2 series x 6 min", "10” rápido / 10” suave", "descanso 2 min caminando o trote suave entre series"] }
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
      { name: "Intermitentes de correr", items: ["2 series x 6 min", "10” rápido / 10” suave", "descanso 2 min caminando o trote suave entre series"] },
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
      { name: "Intermitentes de correr", items: ["2 series x 6 min", "10” rápido / 10” suave", "descanso 2 min caminando o trote suave entre series"] },
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
      { name: "Intermitentes de correr", items: ["2 series x 6 min", "10” rápido / 10” suave", "descanso 2 min caminando o trote suave entre series"] }
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
      { name: "Intermitentes de correr", items: ["2 series x 6 min", "10” rápido / 10” suave", "descanso 2 min caminando o trote suave entre series"] },
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
      { name: "Intermitentes de correr", items: ["2 series x 6 min", "10” rápido / 10” suave", "descanso 2 min caminando o trote suave entre series"] },
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
      { name: "Intermitentes de correr", items: ["2 series x 6 min", "10” rápido / 10” suave", "descanso 2 min caminando o trote suave entre series"] }
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
      { name: "Intermitentes de correr", items: ["2 series x 6 min", "10” rápido / 10” suave", "descanso 2 min caminando o trote suave entre series"] },
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
  const itemDetails = {
    "walking lunges pesados": "Walking lunges pesados 20 pasos",
    "farmer carry pesado": "Farmer carry pesado 30m",
    "v-ups": "20 V-ups",
    "weighted v-ups": "20 weighted V-ups",
    "plank shoulder taps": "20 plank shoulder taps",
    "plank taps": "20 plank taps",
    "plank": "plancha 45s",
    "hollow hold": "hollow hold 30s",
    "russian twists": "20 russian twists",
    "push press mancuerna": "Push press mancuerna 4x10",
    "dumbbell rows": "Dumbbell rows 4x10",
    "push ups": "Push ups 4x12",
    "shoulder press": "Shoulder press 4x10",
    "renegade rows": "Renegade rows 4x10",
    "bike sprint": "bike sprint 20s",
    "kb swings": "15 KB swings",
    "dumbbell snatch": "Dumbbell snatch 10 por lado",
    "skaters": "20 skaters",
    "jump squats": "15 jump squats",
    "cadera": "movilidad de cadera 10 mins",
    "tobillo": "movilidad de tobillo 8 mins",
    "aductores": "movilidad de aductores 8 mins",
    "aductor": "adductor side plank 25s por lado",
    "espalda baja": "movilidad espalda baja 8 mins",
    "movilidad dinámica": "movilidad dinámica 10 mins",
    "foam roller": "foam roller 8 mins",
    "movilidad": "movilidad 10 mins",
    "descarga piernas": "descarga piernas 8 mins",
    "respiración": "respiración 5 mins",
    "copenhagen": "Copenhagen plank 30s por lado",
    "copenhagen plank": "Copenhagen plank 30s por lado",
    "pogos": "Pogos 30 reps",
    "glute bridge unilateral": "Glute bridge unilateral 15 por lado",
    "lateral hops": "Lateral hops 20 reps",
    "squat jumps": "10 squat jumps",
    "bounds": "Bounds 20m",
    "lateral jumps": "Lateral jumps 20 reps",
    "broad jumps": "Broad jumps 8 reps",
    "sprint": "sprint 20m",
    "shuffle": "shuffle lateral 20m",
    "backpedal": "backpedal 20m",
    "burpees": "12 burpees",
    "walking lunges con carga": "Walking lunges con carga 20 pasos",
    "dumbbell thrusters": "Dumbbell thrusters 4x10",
    "bulgarian split squat": "Bulgarian split squat 4x10 por pierna",
    "dumbbell rdl": "Dumbbell RDL 4x10",
    "push press": "Push press 4x10",
    "jump lunges": "20 jump lunges",
    "kb clean": "KB clean 10 por lado",
    "skipping": "skipping 3 mins",
    "técnica carrera": "técnica carrera 6 mins",
    "conducción": "conducción 5 mins",
    "cambio dirección": "cambio dirección 6 reps por lado",
    "finalización": "finalización 10 tiros",
    "pase largo": "pase largo 12 reps",
    "caminar": "caminar 30 mins",
    "hidratación": "hidratación 2-3 litros",
    "dormir bien": "dormir 8 horas",
    "heavy farmer carry": "Heavy farmer carry 30m",
    "sled push": "sled push 20m",
    "box jumps": "8 box jumps",
    "weighted v-ups": "20 weighted V-ups",
    "cable rotations": "Cable rotations 12 por lado",
    "cable rotation": "Cable rotation 12 por lado",
    "barbell push press": "Barbell push press 4x8",
    "bent over rows": "Bent over rows 4x10",
    "bench press": "Bench press 4x8",
    "landmine press": "Landmine press 4x10 por lado",
    "assault bike": "Assault bike sprint 20s",
    "heavy kb swings": "15 heavy KB swings",
    "landmine snatch": "Landmine snatch 10 por lado",
    "battle stance shuffle": "battle stance shuffle 20m",
    "hip mobility": "hip mobility 10 mins",
    "ankle mobility": "ankle mobility 8 mins",
    "thoracic rotation": "thoracic rotation 10 por lado",
    "stretching": "stretching 10 mins",
    "breathing work": "breathing work 5 mins",
    "glúteo medio": "glúteo medio con banda 15 por lado",
    "hamstring walkouts": "Hamstring walkouts 15 reps",
    "trap bar jumps": "Trap bar jumps 5x5",
    "heavy kb clean": "Heavy KB clean 10 por lado",
    "skips": "skips 3 mins",
    "monster walks": "Monster walks 20 pasos",
    "caminar suave o caminadora inclinada": "caminar suave o caminadora inclinada 30 mins",
    "single leg glute bridge": "Single leg glute bridge 15 por lado",
    "goblet squat explosivo": "Goblet squat explosivo 4x8",
    "dumbbell jump squat": "Dumbbell jump squat 4x8",
    "mountain climbers": "25 mountain climbers",
    "aceleraciones": "aceleraciones 6x20m",
    "acceleration drills": "acceleration drills 6x20m",
    "barbell thrusters": "Barbell thrusters 4x8",
    "bulgarian split squat pesado": "Bulgarian split squat pesado 4x8 por pierna",
    "barbell rdl": "Barbell RDL 4x8",
    "push press barra": "Push press barra 4x8",
    "medball throws": "Medball throws 10 reps",
    "adductor work": "adductor side plank 25s por lado",
    "glute bridge unilateral": "Glute bridge unilateral 15 por lado"
  };

  const hasExerciseDetails = /\d|mins?|minutos?|reps?|rounds?|rondas?|vueltas?|bloques?|por lado|por pierna|pasos|pesad|suave|intensidad|descanso|ritmo|fc|tempo|estable|horas|litros/i.test(text);

  if (lower === "dead bug" || lower === "dead bugs" || /\bdead bugs\b/i.test(text)) {
    return text.replace(/dead bugs?/i, "20 V-ups");
  }

  if (lower === "battle ropes" || lower === "ropes") {
    if (/functional|conditioning|cardio/i.test(block)) return "bike sprint 20s";
    return "high knees 30s";
  }

  if (/\bpull ups asistidas\b/i.test(text)) {
    return text.replace(/pull ups asistidas/i, "Dumbbell rows 4x10");
  }

  if (/\bpull ups\b/i.test(text)) {
    return text.replace(/pull ups/i, /fuerza|strength|upper/i.test(block) ? "Bent over rows 4x10" : "Renegade rows 4x10");
  }

  if (!hasExerciseDetails && itemDetails[lower]) {
    return itemDetails[lower];
  }

  if (!hasExerciseDetails && /mobility|movilidad/i.test(text)) {
    return `${text} 10 mins`;
  }

  return item;
};

const runningIntervalItems = [
  "2 series x 6 min",
  "10” rápido / 10” suave",
  "descanso 2 min caminando o trote suave entre series"
];

const isRunningIntervalBlock = (block) => {
  const name = block.name.toLowerCase();
  const content = `${block.name} ${block.items.join(" ")}`.toLowerCase();

  if (/intermitentes|carrera intermitente|hiit|repeated runs|progresivos/.test(name)) return true;
  return (
    /10x10|10 minutos|10 min|10 mins/.test(content) &&
    /intermitentes|correr|carrera|running|hiit|rápido|fuerte/.test(content)
  );
};

const normalizeRunningIntervalBlock = (block) => {
  if (!isRunningIntervalBlock(block)) return block;

  return {
    ...block,
    name: "Intermitentes de correr",
    items: runningIntervalItems
  };
};

const normalizePlan = (plan) => {
  return plan.map((day) => ({
    ...day,
    blocks: day.blocks.map((block) => {
      const normalizedBlock = normalizeRunningIntervalBlock(block);

      return {
        ...normalizedBlock,
        items: normalizedBlock.items.map((item) => normalizeExerciseItem(item, normalizedBlock.name))
      };
    })
  }));
};

const routineWeeks = [
  {
    week: 1,
    label: "Adaptación + técnica base",
    objective: "Objetivo: activar el cuerpo, mejorar técnica de movimiento, preparar articulaciones y crear base cardiovascular sin cargar demasiado.",
    homePlan: normalizePlan(weekOneHomePlan),
    gymPlan: normalizePlan(weekOneGymPlan)
  },
  {
    week: 2,
    label: "Base de fuerza + acondicionamiento",
    objective: "Objetivo: aumentar ligeramente la carga, mejorar fuerza funcional, trabajar estabilidad y empezar con intermitentes suaves en formato controlado.",
    homePlan: normalizePlan(weekTwoHomePlan),
    gymPlan: normalizePlan(weekTwoGymPlan)
  },
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
const weekDayNames = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const dayLetters = ["L", "M", "M", "J", "V", "S", "D"];
const dayShortNames = ["LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB", "DOM"];
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
const currentTrainingWeekOfMonth = (date) => {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  const firstMondayOffset = (8 - firstDay.getDay()) % 7;
  const firstMondayDate = 1 + firstMondayOffset;
  const dayOfMonth = date.getDate();

  if (dayOfMonth < firstMondayDate) return 1;
  return Math.min(5, Math.floor((dayOfMonth - firstMondayDate) / 7) + 1);
};
const currentCalendarWeek = currentTrainingWeekOfMonth(today);
const initialDay = weekDayNames[today.getDay()];
const availableMonths = [{ index: initialMonth, name: months[initialMonth] }];
const availableWeeks = routineWeeks.map((routine) => routine.week);
const initialWeek = availableWeeks.includes(currentCalendarWeek) ? currentCalendarWeek : routineWeeks[routineWeeks.length - 1].week;
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
      completedBlocks: { ...(merged.completedBlocks ?? {}), ...(progress.completedBlocks ?? {}) },
      workoutTimes: { ...(merged.workoutTimes ?? {}), ...(progress.workoutTimes ?? {}) },
      missedDays: { ...(merged.missedDays ?? {}), ...(progress.missedDays ?? {}) }
    };
  }, {});
};

const hasProgress = (progress) => Boolean(
  Object.keys(progress.checked ?? {}).length ||
  Object.keys(progress.roundsDone ?? {}).length ||
  Object.keys(progress.completedBlocks ?? {}).length ||
  Object.keys(progress.workoutTimes ?? {}).length ||
  Object.keys(progress.missedDays ?? {}).length
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

const googleImageSearchUrl = (exercise) => {
  const cleanExercise = exercise.replace(/^\d+x?(\d+)?\s*/i, "").replace(/\s+—\s+.*/, "");
  return `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(`${cleanExercise} exercise technique`)}`;
};

const formatDuration = (totalSeconds = 0) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
};

function App() {
  const [allProgress, setAllProgress] = useState(loadAllProgress);
  const [selectedMonth, setSelectedMonth] = useState(initialMonth);
  const [selectedWeek, setSelectedWeek] = useState(initialWeek);
  const [selectedMode, setSelectedMode] = useState("gym");
  const [selectedDay, setSelectedDay] = useState(initialDay);
  const [expandedExercise, setExpandedExercise] = useState(null);
  const [openPicker, setOpenPicker] = useState(null);
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const currentRoutine = useMemo(() => routineWeeks.find((routine) => routine.week === selectedWeek) ?? routineWeeks[0], [selectedWeek]);
  const planForMode = (mode) => mode === "home" ? currentRoutine.homePlan : currentRoutine.gymPlan;
  const weekPlan = planForMode(selectedMode);
  const periodKey = getPeriodKey(selectedMonth, selectedWeek);
  const currentProgress = allProgress[periodKey] ?? {};
  const checked = currentProgress.checked ?? {};
  const roundsDone = currentProgress.roundsDone ?? {};
  const completedBlocks = currentProgress.completedBlocks ?? {};
  const workoutTimes = currentProgress.workoutTimes ?? {};
  const missedDays = currentProgress.missedDays ?? {};
  const current = useMemo(() => weekPlan.find((d) => d.day === selectedDay) ?? weekPlan[0], [selectedDay, weekPlan]);
  const workoutTimeKey = `${selectedMode}-${current.day}`;
  const missedDayKey = `${selectedMode}-${current.day}`;
  const savedWorkoutTime = workoutTimes[workoutTimeKey];

  useEffect(() => {
    window.localStorage.setItem(progressStorageKey, JSON.stringify(allProgress));
  }, [allProgress]);

  useEffect(() => {
    if (!timerRunning) return undefined;

    const intervalId = window.setInterval(() => {
      setTimerSeconds((seconds) => seconds + 1);
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [timerRunning]);

  useEffect(() => {
    setTimerRunning(false);
    setTimerSeconds(0);
  }, [periodKey, selectedMode, selectedDay]);

  const updatePeriodProgress = (updates) => {
    setAllProgress((prev) => {
      const periodProgress = prev[periodKey] ?? {};
      return {
        ...prev,
        [periodKey]: {
          checked: periodProgress.checked ?? {},
          roundsDone: periodProgress.roundsDone ?? {},
          completedBlocks: periodProgress.completedBlocks ?? {},
          workoutTimes: periodProgress.workoutTimes ?? {},
          missedDays: periodProgress.missedDays ?? {},
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
      /^2\s*series\s*x\s*6\s*min/.test(text) ||
      /^10["”]\s*rápido\s*\/\s*10["”]\s*suave/.test(text) ||
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
      .map((item) => (/^\d+(-\d+)?\s*(minutos?|mins?)/i.test(item) ? `Aprox. ${item}` : item))
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
  const isDayMissed = (day) => !isDayComplete(day) && trainingModes.some((mode) => missedDays[`${mode.id}-${day.day}`]);
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
  const completedDays = weekPlan.filter((day) => isDayComplete(day)).length;
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

  const toggleMissedDay = () => {
    updatePeriodProgress({
      missedDays: {
        ...missedDays,
        [missedDayKey]: !missedDays[missedDayKey]
      }
    });
  };

  const finishWorkoutTimer = () => {
    if (!timerSeconds) return;

    setTimerRunning(false);
    updatePeriodProgress({
      workoutTimes: {
        ...workoutTimes,
        [workoutTimeKey]: {
          seconds: timerSeconds,
          finishedAt: new Date().toISOString()
        }
      }
    });
  };

  return (
    <main className="app">
      <section className="hero">
        <div className="heroCopy">
          <div className="eyebrow">
            <span className="eyebrowWeek"><CalendarDays size={16} /> SEMANA {currentRoutine.week}</span>
            <span className="eyebrowLabel">{currentRoutine.label}</span>
          </div>
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
              const dayMissed = isDayMissed(day);

              return (
                <motion.button
                  key={day.day}
                  className={`${selectedDay === day.day ? "current" : ""} ${dayComplete ? "complete" : ""} ${dayMissed ? "missed" : ""}`}
                  onClick={() => setSelectedDay(day.day)}
                  type="button"
                  aria-label={`${day.day}${dayComplete ? " completo" : dayMissed ? " no realizado" : ""}`}
                  animate={dayComplete ? { scale: [1, 1.16, 1] } : { scale: 1 }}
                  transition={{ duration: .35 }}
                >
                  <span className="weekDayLabel">{dayShortNames[index] ?? dayLetters[index]}</span>
                  <span className={dayComplete || dayMissed ? "weekDayStatus completeStatus" : "weekDayStatus"}>
                    {dayComplete ? <Star className="weekStarIcon" size={30} /> : dayMissed ? <Lock className="weekLockIcon" size={28} /> : ""}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
        <div className="progress">
          <span>Progreso semanal</span>
          <div className="progressRing" style={{ "--progress": `${progress * 3.6}deg` }}>
            <div>
              <strong>{progress}%</strong>
              <small>Completado</small>
            </div>
          </div>
          <p>{completedDays} / {weekPlan.length} días completados</p>
          <div className="progressTrack">
            <div style={{ width: `${progress}%` }} />
          </div>
        </div>
      </section>

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
        <div className="dayStats" aria-label="Resumen del entrenamiento">
          <div><Timer size={22} /><span>Duración</span><b>60-75 min</b></div>
          <div><Flame size={22} /><span>Intensidad</span><b>{current.intensity}</b></div>
          <div><Footprints size={22} /><span>Enfoque</span><b>{current.focus.split(" y ")[0]}</b></div>
          <div><Dumbbell size={22} /><span>Modalidad</span><b>{selectedMode === "home" ? "Casa" : "Gym"}</b></div>
        </div>

        <div className="workoutTimer" aria-label="Cronómetro del entrenamiento">
          <div>
            <span>Cronómetro</span>
            <strong>{formatDuration(timerSeconds)}</strong>
            <small>
              {savedWorkoutTime ? `Último registro: ${formatDuration(savedWorkoutTime.seconds)}` : "Sin registro todavía"}
            </small>
          </div>
          {savedWorkoutTime && (
            <div className="savedWorkoutTime">
              <span>Tiempo final</span>
              <strong>{formatDuration(savedWorkoutTime.seconds)}</strong>
            </div>
          )}
          <div className="timerActions">
            <button className="timerPrimary" onClick={() => setTimerRunning((running) => !running)} type="button">
              {timerRunning ? "Pausar" : timerSeconds ? "Continuar" : "Iniciar"}
            </button>
            <button onClick={finishWorkoutTimer} type="button" disabled={!timerSeconds}>
              Finalizar
            </button>
            <button onClick={() => {
              setTimerRunning(false);
              setTimerSeconds(0);
            }} type="button" disabled={!timerSeconds}>
              Reiniciar
            </button>
            <button className={missedDays[missedDayKey] ? "missedRoutineButton active" : "missedRoutineButton"} onClick={toggleMissedDay} type="button">
              <Lock size={16} />
              {missedDays[missedDayKey] ? "Marcada como no hecha" : "No la hice"}
            </button>
          </div>
        </div>

        <div className="blocksHeading">
          <span>Bloques del entrenamiento</span>
        </div>

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
