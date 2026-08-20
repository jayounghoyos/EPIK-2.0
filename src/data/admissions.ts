// Admission data from the "Resumen de Solicitudes" screenshot.
// Every field below is legible in that capture; nothing is inferred.
//
// The original renders English column headers over Spanish values, and titles the
// same screen "Resumen de Solicitudes", "Registration" and "Summary" at once.

export type AdmissionRequest = {
  formId: string
  term: string
  degree: string
  program: string
  admissionType: string
  city: string
  formStatus: string
  admissionStatus: string
}

export const requests: AdmissionRequest[] = [
  {
    formId: '34905',
    term: 'Segundo semestre 2023',
    degree: 'Pregrado',
    program: 'Computer Science',
    admissionType: 'Estudios por primera vez',
    city: 'Medellín',
    formStatus: 'Cerrado',
    admissionStatus: 'Activo en el programa',
  },
]

/** Inactive Idiomas programme; the portal offers "Reanudar" to pick it back up. */
export const inactivePrograms = [
  {
    id: 'ingles-adultos',
    name: 'Inglés adultos Medellín',
    detail: 'Programa de Idiomas · Inactivo',
    reason: 'El programa quedó inactivo porque superó la fecha límite de matrícula.',
  },
]

/** The three enrolment routes the portal exposes, in Spanish and untruncated. */
export const enrolmentRoutes = [
  { id: 'pregrado', name: 'Pregrado y posgrado', detail: 'Inscripción a un programa académico formal.' },
  { id: 'continua', name: 'Educación continua', detail: 'Cursos, diplomados y programas cortos.' },
  { id: 'idiomas', name: 'Idiomas EAFIT', detail: 'Programas del Centro de Idiomas.' },
]
