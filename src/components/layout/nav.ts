import type { IconName } from '../../lib/icons'

export type NavChild = { id: string; label: string; path: string }
export type NavItem = { id: string; label: string; icon: IconName; path?: string; children?: NavChild[] }

/**
 * Ley de Hick: cinco destinos de primer nivel, no quince equivalentes.
 *
 * Un concepto, un destino. El menú decía "Pagar" mientras la pantalla se titula
 * "Estado de cuenta", y "Historia académica" duplicaba "Mis notas". Son la misma
 * clase de inconsistencia que el portal actual comete con "Registro de Materias",
 * "Register Courses" y "Enrollment" juntos en un mismo menú.
 */
export const navigation: NavItem[] = [
  { id: 'inicio', label: 'Inicio', icon: 'home', path: '/' },
  {
    id: 'academico',
    label: 'Académico',
    icon: 'graduation',
    children: [
      { id: 'horario', label: 'Mi horario', path: '/horario' },
      { id: 'notas', label: 'Mis notas', path: '/notas' },
    ],
  },
  {
    id: 'financiero',
    label: 'Financiero',
    icon: 'wallet',
    children: [{ id: 'estado-de-cuenta', label: 'Estado de cuenta', path: '/estado-de-cuenta' }],
  },
  {
    id: 'tramites',
    label: 'Trámites',
    icon: 'file',
    children: [{ id: 'certificados', label: 'Certificados', path: '/certificados' }],
  },
  { id: 'inscripciones', label: 'Inscripciones', icon: 'clipboard', path: '/inscripciones' },
]

/**
 * Reemplaza el Favorites vacío y el Recent Places roto del portal actual.
 * Cuatro destinos que no están ya en los atajos del menú, para no repetir.
 */
export const quickAccess: { id: string; label: string; icon: IconName; path: string }[] = [
  { id: 'documentos', label: 'Adjuntar documentos', icon: 'clip', path: '/documentos' },
  { id: 'reservas', label: 'Reserva de espacios', icon: 'calendarCheck', path: '/reservas' },
  { id: 'pagos', label: 'Centro de pagos', icon: 'bank', path: '/centro-de-pagos' },
  { id: 'evaluacion', label: 'Evaluación docente', icon: 'clipboard', path: '/evaluacion-docente' },
]
