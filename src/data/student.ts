// Data taken from real EPIK screenshots.
// Anything absent from every capture is left empty rather than invented.
// Personal identifiers are masked because this is coursework.

export const student = {
  fullName: 'Juan Andrés Young Hoyos',
  firstName: 'Juan Andrés',
  initials: 'JY',
  username: 'jayoungh',
  maskedId: '1000••••97',
  program: 'Computer Science',
  level: 'Pregrado',
  campus: 'Medellín',
} as const

export const term = {
  name: 'Segundo semestre 2026',
  startsAt: '13/07/2026',
  endsAt: '07/11/2026',
  currentWeek: 6,
  totalWeeks: 17,
  enrolledCourses: 6,
} as const

/** Monday 17 August 2026, week 6 of 17. */
export const today = {
  label: 'Lunes, 17 de agosto de 2026',
  classes: [
    { start: '09:00', end: '10:30', name: 'Métodos Cuantitativos', room: '35-203' },
    { start: '15:00', end: '18:00', name: 'Internet, Arquitectura y Protocolos', room: '18-417' },
  ],
} as const

/** The real portal reports no outstanding charges. */
export const finances = {
  hasOutstandingCharges: false,
  emptyTitle: 'Sin cargos pendientes',
  emptyBody: 'No tienes pagos por realizar en este momento.',
} as const

export const admissions = [
  {
    id: '34905',
    title: 'Solicitud de admisión 34905',
    detail: 'Computer Science · Pregrado · Medellín',
    status: 'Activo en el programa',
    action: null,
  },
  {
    id: 'idiomas',
    title: 'Inglés adultos Medellín',
    detail: 'Programa de Idiomas · Inactivo',
    status: null,
    action: 'Reanudar',
  },
] as const
