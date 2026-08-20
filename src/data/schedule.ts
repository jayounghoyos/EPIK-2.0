// Schedule and courses taken from the My Enrollment screenshots.
// SI4005 and SI4006 report no credits in any capture, so they stay null and the
// screen computes no total: what is unknown cannot be summed.

export type Weekday = 0 | 1 | 2 | 3 | 4

export type Session = {
  day: Weekday
  start: string
  end: string
  name: string
  classNumber: string
  room: string
}

export type Course = {
  name: string
  code: string
  classNumber: string
  credits: number | null
  teacher: string | null
  rooms: string
  days: string
  time: string
}

export const weekdays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'] as const

/** Week of Monday 17 to Friday 21 August 2026. */
export const week = {
  label: 'Semana del lunes 17 al viernes 21 de agosto de 2026',
  dates: [17, 18, 19, 20, 21],
  todayIndex: 0 as Weekday,
}

export const dayStart = 6
export const dayEnd = 19

export const sessions: Session[] = [
  { day: 0, start: '09:00', end: '10:30', name: 'Métodos Cuantitativos', classNumber: '3831', room: '35-203' },
  { day: 0, start: '15:00', end: '18:00', name: 'Internet, Arquitectura y Protocolos', classNumber: '4595', room: '18-417' },
  { day: 2, start: '09:00', end: '10:30', name: 'Métodos Cuantitativos', classNumber: '3831', room: '17-304' },
  { day: 2, start: '15:00', end: '18:00', name: 'Proyecto 2', classNumber: '4617', room: '34-501' },
  { day: 3, start: '15:00', end: '18:00', name: 'Proyecto en Desarrollo de Software', classNumber: '7150', room: '07-103' },
  { day: 4, start: '06:00', end: '09:00', name: 'Tópicos Especiales y Aplicaciones en Inteligencia Artificial', classNumber: '7079', room: '17-302' },
  { day: 4, start: '15:00', end: '18:00', name: 'Interacción Humano Computador', classNumber: '7025', room: '34-502' },
]

export const courses: Course[] = [
  {
    name: 'Métodos Cuantitativos',
    code: 'CM0245',
    classNumber: '3831',
    credits: 3,
    teacher: 'Juan Carlos Rivera Agudelo',
    rooms: '35-203 (Lun) · 17-304 (Mié)',
    days: 'Lunes y miércoles',
    time: '09:00 – 10:30',
  },
  {
    name: 'Internet, Arquitectura y Protocolos',
    code: 'SI3002',
    classNumber: '4595',
    credits: 3,
    teacher: 'Alber Oswaldo Montoya Benitez',
    rooms: '18-417',
    days: 'Lunes',
    time: '15:00 – 18:00',
  },
  {
    name: 'Proyecto 2',
    code: 'SI3004',
    classNumber: '4617',
    credits: 3,
    teacher: 'Wilmer Alberto Gil Moreno',
    rooms: '34-501',
    days: 'Miércoles',
    time: '15:00 – 18:00',
  },
  {
    name: 'Proyecto en Desarrollo de Software',
    code: 'SI4005',
    classNumber: '7150',
    credits: null,
    teacher: null,
    rooms: '07-103',
    days: 'Jueves',
    time: '15:00 – 18:00',
  },
  {
    name: 'Interacción Humano Computador',
    code: 'SI4004',
    classNumber: '7025',
    credits: 3,
    teacher: 'Juan Camilo Lopez Cuartas',
    rooms: '34-502',
    days: 'Viernes',
    time: '15:00 – 18:00',
  },
  {
    name: 'Tópicos Especiales y Aplicaciones en Inteligencia Artificial',
    code: 'SI4006',
    classNumber: '7079',
    credits: null,
    teacher: null,
    rooms: '17-302',
    days: 'Viernes',
    time: '06:00 – 09:00',
  },
]

export const toMinutes = (t: string) => {
  const [h, m] = t.split(':').map(Number)
  return h * 60 + m
}

/** Derived, never hardcoded: if a session changes, the summary stays true. */
export const sessionCount = sessions.length
export const weeklyHours =
  sessions.reduce((total, s) => total + (toMinutes(s.end) - toMinutes(s.start)), 0) / 60
