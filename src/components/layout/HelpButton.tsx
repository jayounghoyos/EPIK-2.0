import { Icon } from '../../lib/icons'
import { startTour } from '../../lib/tour'

/**
 * Opens the guided tour.
 *
 * The label says what happens rather than what the thing is called: a student
 * wants to know how to use the portal, and "nuevo sistema" is our framing, not
 * theirs. In a year nothing here will be new, and the label would age badly.
 */
export function HelpButton() {
  return (
    <button
      onClick={startTour}
      data-tour="help"
      title="Cómo usar el portal"
      aria-label="Cómo usar el portal: abre un recorrido guiado por las secciones"
      className="grid size-9 shrink-0 place-items-center rounded-lg text-white/90 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-oro-500"
    >
      <Icon name="help" className="size-5" />
    </button>
  )
}
