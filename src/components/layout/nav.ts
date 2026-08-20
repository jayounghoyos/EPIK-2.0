import type { IconName } from '../../lib/icons'

export type NavChild = { id: string; label: string; path: string }
export type NavItem = { id: string; label: string; icon: IconName; path?: string; children?: NavChild[] }

/**
 * Hick's law: five top-level destinations, not fifteen equivalent ones.
 *
 * One concept, one destination. The menu said "Pagar" while the screen is titled
 * "Estado de cuenta", and "Historia académica" duplicated "Mis notas". Both are the
 * same class of inconsistency the current portal commits by listing "Registro de
 * Materias", "Register Courses" and "Enrollment" together in one menu.
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
