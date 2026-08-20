import { Icon } from '../../lib/icons'
import { startTour } from '../../lib/tour'

/**
 * Opens the guided tour.
 *
 * The label is visible, not a tooltip. A lone question mark only reads as help to
 * someone who already knows the convention, and the students who most need the
 * tour are exactly the ones who would not click it.
 *
 * The wording says what happens rather than naming the redesign: "nuevo sistema"
 * is our framing, and in a year nothing here will be new.
 */
export function HelpButton() {
  return (
    <button
      onClick={startTour}
      data-tour="help"
      aria-label="Cómo usar el portal: abre un recorrido guiado por las secciones"
      className="flex shrink-0 items-center gap-2 rounded-lg border border-white/30 px-2.5 py-2 text-sm font-medium text-white transition-colors hover:border-white/60 hover:bg-white/10 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-oro-500"
    >
      <Icon name="help" className="size-5 shrink-0" />
      <span className="whitespace-nowrap">Cómo usar el portal</span>
    </button>
  )
}
