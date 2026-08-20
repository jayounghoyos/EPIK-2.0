// Historia académica tomada del pantallazo "Academic Records".
// El portal reporta 71 registros en total; solo 17 son legibles en la captura.
// No se inventan los 54 restantes ni se afirma cuáles son los más recientes:
// el estudiante ingresó en 2023-2 y cursa 2026-2, así que los periodos visibles
// no son los últimos.

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

/** Se explican porque el portal actual nunca dice qué significan. */
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

/** La fila agrupada representa 7 asignaturas, no 1: el conteo lo refleja. */
const rowWeight = (row: GradeRow) => (row.code.includes('–') ? 7 : 1)

export const periodCounts = periods.map((p) => ({
  id: p.id,
  count: p.rows.reduce((sum, r) => sum + rowWeight(r), 0),
}))

export const shownRecords = periodCounts.reduce((sum, p) => sum + p.count, 0)
