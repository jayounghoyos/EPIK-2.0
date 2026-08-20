import type { IconName } from '../lib/icons'

export type Destination = { id: string; label: string; icon: IconName; path: string }

/**
 * Every destination a student can pin to their shortcuts.
 *
 * This is what makes the block worth calling "Accesos rápidos": in the current
 * portal, My Favorites is empty and Edit Favorites was reported as too complex to
 * understand, so the feature exists without ever being usable.
 */
export const destinationCatalogue: Destination[] = [
  { id: 'horario', label: 'Mi horario', icon: 'calendar', path: '/horario' },
  { id: 'notas', label: 'Mis notas', icon: 'graduation', path: '/notas' },
  { id: 'estado-de-cuenta', label: 'Estado de cuenta', icon: 'wallet', path: '/estado-de-cuenta' },
  { id: 'certificados', label: 'Certificados', icon: 'award', path: '/certificados' },
  { id: 'documentos', label: 'Adjuntar documentos', icon: 'clip', path: '/documentos' },
  { id: 'reservas', label: 'Reserva de espacios', icon: 'calendarCheck', path: '/reservas' },
  { id: 'pagos', label: 'Centro de pagos', icon: 'bank', path: '/centro-de-pagos' },
  { id: 'evaluacion', label: 'Evaluación docente', icon: 'clipboard', path: '/evaluacion-docente' },
  { id: 'inscripciones', label: 'Inscripciones', icon: 'clipboard', path: '/inscripciones' },
  { id: 'perfil', label: 'Mi perfil', icon: 'clipboard', path: '/perfil' },
]

/** Pinned by default: destinations that are not already menu shortcuts, to avoid repetition. */
export const defaultShortcuts = ['documentos', 'reservas']

/**
 * Six in total, pinned and automatic together.
 *
 * Miller's law: a list longer than this stops being scannable at a glance, and the
 * block would start competing with the main menu instead of complementing it.
 */
export const maxShortcuts = 6
