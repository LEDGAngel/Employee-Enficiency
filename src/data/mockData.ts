import { Employee } from "@/components/EmployeeTable";

export const mockEmployees: Employee[] = [
  {
    id: "1",
    name: "María García",
    tasksCompleted: 156,
    avgTime: 32,
    errors: 2,
    efficiency: 94,
    shift: "Matutino"
  },
  {
    id: "2",
    name: "Juan Rodríguez",
    tasksCompleted: 142,
    avgTime: 38,
    errors: 5,
    efficiency: 87,
    shift: "Matutino"
  },
  {
    id: "3",
    name: "Ana Martínez",
    tasksCompleted: 168,
    avgTime: 28,
    errors: 1,
    efficiency: 96,
    shift: "Vespertino"
  },
  {
    id: "4",
    name: "Carlos López",
    tasksCompleted: 134,
    avgTime: 42,
    errors: 8,
    efficiency: 78,
    shift: "Vespertino"
  },
  {
    id: "5",
    name: "Laura Hernández",
    tasksCompleted: 151,
    avgTime: 35,
    errors: 3,
    efficiency: 91,
    shift: "Nocturno"
  },
  {
    id: "6",
    name: "Pedro Sánchez",
    tasksCompleted: 128,
    avgTime: 45,
    errors: 12,
    efficiency: 72,
    shift: "Nocturno"
  }
];

export const mockChartData = [
  { name: "Lun", eficiencia: 82, tareas: 145 },
  { name: "Mar", eficiencia: 85, tareas: 152 },
  { name: "Mié", eficiencia: 88, tareas: 158 },
  { name: "Jue", eficiencia: 84, tareas: 148 },
  { name: "Vie", eficiencia: 90, tareas: 165 },
  { name: "Sáb", eficiencia: 87, tareas: 156 },
  { name: "Dom", eficiencia: 89, tareas: 162 }
];

export const mockInsights = [
  {
    id: "1",
    type: "success" as const,
    title: "Excelente desempeño matutino",
    description: "El turno matutino ha incrementado su eficiencia en 12% esta semana. Ana Martínez lidera con 96% de eficiencia.",
    priority: "high" as const
  },
  {
    id: "2",
    type: "warning" as const,
    title: "Atención: Errores en turno nocturno",
    description: "Pedro Sánchez muestra 12 errores hoy. Considerar microentrenamiento en técnicas de empaque delicado.",
    priority: "high" as const
  },
  {
    id: "3",
    type: "tip" as const,
    title: "Sugerencia: Pausas activas",
    description: "Los empleados con pausas de 5 min cada 2 horas muestran 8% más eficiencia en la segunda mitad del turno.",
    priority: "medium" as const
  },
  {
    id: "4",
    type: "info" as const,
    title: "Patrón detectado",
    description: "Los miércoles muestran pico de eficiencia (88%). Analizar factores para replicar en otros días.",
    priority: "low" as const
  }
];

export const mockLeaderboard = [
  { rank: 1, name: "Ana Martínez", score: 960, badge: "🔥 Racha 7 días" },
  { rank: 2, name: "María García", score: 940, badge: "⚡ Velocidad Pro" },
  { rank: 3, name: "Laura Hernández", score: 910, badge: "🎯 Precisión" },
  { rank: 4, name: "Juan Rodríguez", score: 870 },
  { rank: 5, name: "Carlos López", score: 780 },
  { rank: 6, name: "Pedro Sánchez", score: 720 }
];
