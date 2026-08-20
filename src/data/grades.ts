// Academic history taken from the "Academic Records" screenshot.
// The portal reports 71 records in total; only 17 are legible in the capture.
// The remaining 54 are neither invented nor claimed to be the most recent: the
// student enrolled in 2023-2 and is in 2026-2, so the visible periods are not
// the latest ones.

export type GradeStatus = 'aprobada' | 'homologada'

export type GradeRow = {
  code: string
  name: string
  detail?: string
  grade: string
  gradeNote?: string
  credits: string | null
  status: GradeStatus
}

export type GradePeriod = {
  id: string
  name: string
  tag?: string
  rows: GradeRow[]
}

/** Spelled out because the current portal never explains what they mean. */
export const gradeLegend = [
  { symbol: 'EX', meaning: 'Exento — aprobada por prueba de suficiencia' },
  { symbol: 'C', meaning: 'Cumplió — homologada, no promedia' },
  { symbol: 'A', meaning: 'Escala alfabética del Centro de Idiomas' },
]

export const periods: GradePeriod[] = [
  {
    id: '2025-1',
    name: 'Primer semestre 2025',
    rows: [
      { code: '14 LE0001', name: 'Prueba de Lectura 1', grade: 'EX', gradeNote: 'Exento', credits: null, status: 'aprobada' },
      { code: '14 LE0002', name: 'Prueba de Escritura 1', grade: 'EX', gradeNote: 'Exento', credits: null, status: 'aprobada' },
      { code: '14 LE0003', name: 'Prueba de Lectura 2', grade: 'EX', gradeNote: 'Exento', credits: null, status: 'aprobada' },
      { code: '14 LE0004', name: 'Prueba de Escritura 2', grade: 'EX', gradeNote: 'Exento', credits: null, status: 'aprobada' },
      { code: 'C_21 FH1003', name: 'Arte y Ciudadanía', grade: '5.0', credits: '3.00', status: 'aprobada' },
      { code: 'C_3 TA2003', name: 'Talento I - Esc Ccias e Ingeni', grade: 'EX', gradeNote: 'Exento', credits: null, status: 'aprobada' },
    ],
  },
  {
    id: '2025-idiomas',
    name: 'Primer período académico 2025',
    tag: 'Idiomas',
    rows: [
      { code: '20 IAD000', name: 'Preparatory course English', grade: 'C', gradeNote: 'Cumplió', credits: null, status: 'homologada' },
      {
        code: '20 IAD001 – 20 IAD007',
        name: 'Course 1 a Course 7 English for adults',
        detail: '7 asignaturas con el mismo resultado',
        grade: 'C',
        gradeNote: 'Cumplió',
        credits: null,
        status: 'homologada',
      },
      { code: '20 IADP08', name: 'Curso 8 Inglés adultos', grade: 'A', gradeNote: 'Alfabética', credits: '1.00', status: 'aprobada' },
    ],
  },
  {
    id: '2023-2',
    name: 'Segundo semestre 2023',
    rows: [
      { code: '14 BU0600', name: 'Taller de Salud', grade: '5.0', credits: null, status: 'aprobada' },
      { code: '14 DE0520', name: 'Ciudadanía y Democracia', grade: '4.7', credits: '3.00', status: 'aprobada' },
    ],
  },
]

export const totalRecords = 71

/** The collapsed row stands for 7 courses, not 1: the count reflects that. */
const rowWeight = (row: GradeRow) => (row.code.includes('–') ? 7 : 1)

export const periodCounts = periods.map((p) => ({
  id: p.id,
  count: p.rows.reduce((sum, r) => sum + rowWeight(r), 0),
}))

export const shownRecords = periodCounts.reduce((sum, p) => sum + p.count, 0)
