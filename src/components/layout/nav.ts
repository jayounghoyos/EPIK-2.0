import type { IconName } from '../../lib/icons'

export type NavItem = { id: string; label: string; icon: IconName; children?: { id: string; label: string }[] }

/**
 * Ley de Hick: cinco destinos de primer nivel, no quince equivalentes.
 * Los atajos son fijos: aparecen igual en todas las pantallas. El portal actual
 * cambia el menú según dónde estés, y por eso conviven "Registro de Materias",
 * "Register Courses" y "Enrollment" como si fueran cosas distintas.
 */
export const navigation: NavItem[] = [
  { id: 'inicio', label: 'Inicio', icon: 'home' },
  {
    id: 'academico',
    label: 'Académico',
    icon: 'graduation',
    children: [
      { id: 'horario', label: 'Mi horario' },
      { id: 'notas', label: 'Mis notas' },
    ],
  },
  { id: 'financiero', label: 'Financiero', icon: 'wallet', children: [{ id: 'pagar', label: 'Pagar' }] },
  { id: 'tramites', label: 'Trámites', icon: 'file', children: [{ id: 'certificados', label: 'Certificados' }] },
  { id: 'inscripciones', label: 'Inscripciones', icon: 'clipboard' },
]

/** Reemplaza el Favorites vacío y el Recent Places roto del portal actual. */
export const quickAccess: { id: string; label: string; icon: IconName }[] = [
  { id: 'documentos', label: 'Adjuntar documentos', icon: 'clip' },
  { id: 'reservas', label: 'Reserva de espacios', icon: 'calendarCheck' },
  { id: 'historia', label: 'Historia académica', icon: 'history' },
  { id: 'pagos', label: 'Centro de pagos', icon: 'bank' },
  { id: 'evaluacion', label: 'Evaluación docente', icon: 'clipboard' },
]
