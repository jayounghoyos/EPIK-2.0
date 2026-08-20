import { driver } from 'driver.js'

/**
 * Guided tour of the redesigned portal.
 *
 * The tour exists because the layout changed, not because it is complicated: the
 * old portal put fifteen equal tiles on one page, so a returning student needs to
 * be told where things went. Each step names a destination, never a design idea.
 *
 * Steps anchor to data-tour attributes rather than CSS classes, so restyling a
 * component cannot silently break the tour.
 */
export function startTour() {
  driver({
    popoverClass: 'epik-tour',
    overlayOpacity: 0.6,
    stagePadding: 6,
    stageRadius: 10,
    smoothScroll: true,
    showProgress: true,
    progressText: 'Paso {{current}} de {{total}}',
    nextBtnText: 'Siguiente',
    prevBtnText: 'Atrás',
    doneBtnText: 'Entendido',
    steps: [
      {
        element: '[data-tour="nav"]',
        popover: {
          title: 'Todo está en cinco secciones',
          description:
            'Académico, Financiero, Trámites e Inscripciones agrupan lo que antes eran quince accesos sueltos en la pantalla de inicio. Las tareas que más se usan cuelgan directamente de cada sección.',
          side: 'right',
          align: 'start',
        },
      },
      {
        element: '[data-tour="quick-access"]',
        popover: {
          title: 'Tus accesos rápidos',
          description:
            'Los que ancles con el alfiler se quedan fijos aquí. Los demás espacios se llenan solos con las pantallas que más abres, hasta seis en total. Pulsa Editar para elegirlos.',
          side: 'right',
          align: 'end',
        },
      },
      {
        element: '[data-tour="search"]',
        popover: {
          title: 'Busca sin recorrer el menú',
          description:
            'Escribe el nombre de un trámite, una asignatura o un certificado y llega directo, sin recordar en qué sección estaba.',
          side: 'bottom',
          align: 'center',
        },
      },
      {
        element: '[data-tour="user-menu"]',
        popover: {
          title: 'Tu perfil y tu monitoría',
          description:
            'Aquí están tus datos personales, tus correos y direcciones, y el perfil de monitor. Antes vivían dentro de la misma retícula que los trámites.',
          side: 'bottom',
          align: 'end',
        },
      },
      {
        element: '[data-tour="help"]',
        popover: {
          title: 'Puedes repetir esto cuando quieras',
          description:
            'Este botón vuelve a abrir el recorrido. No hace falta recordarlo todo de una vez.',
          side: 'bottom',
          align: 'end',
        },
      },
    ],
  }).drive()
}
