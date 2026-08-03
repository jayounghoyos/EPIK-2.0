# EPIK 2.0

Rediseño UI/UX del portal estudiantil de la Universidad EAFIT.
Trabajo del curso **Interacción Humano–Computador**, séptimo semestre.

EPIK es un despliegue de PeopleSoft Fluid. Su pantalla de inicio es una retícula plana de 15
accesos con idéntico peso visual, etiquetas mezcladas en español e inglés, y casi ningún estado
visible. Este repositorio contiene la auditoría, el sistema de diseño y las pantallas nuevas.

---

## El hallazgo que sostiene el proyecto

EPIK está **fuera del manual de identidad de la propia Universidad**, y se puede medir:

| | Manual EAFIT | EPIK actual |
|---|---|---|
| Azul | `#004B85` (Pantone 294C) | `#000863` |
| Amarillo | `#FFB903` (Pantone 123C) | ausente en toda la interfaz |

Los valores se obtuvieron muestreando píxeles de las capturas, no a ojo:

```bash
convert EPIK_screenshots/home.png -format "%[pixel:p{400,30}]" info:
```

El amarillo institucional, la mitad de la bandera de EAFIT, no aparece ni una vez en el producto.
La crítica deja de ser estética y pasa a ser verificable.

---

## Pantallas

Cuatro pantallas en alta fidelidad, en `designs/` (`.pen`, editables; `.png`, exportadas).

| Pantalla | Qué demuestra |
|---|---|
| **Inicio** | Los 15 accesos agrupados en 5 dominios con región común. Estado real en la primera pantalla: próxima clase, saldo pendiente, tareas. |
| **Mi matrícula** | Horario que **detecta el choque, reparte los bloques en carriles paralelos y lo nombra**, en vez de superponerlos hasta volverlos ilegibles como hace EPIK hoy. |
| **Cuenta financiera** | El pago de 6 pasos reducido a 3, sin salir del portal. |
| **Certificados** | Seguimiento con estado visible, contra el "enviar y esperar sin saber nada" actual. |

Para verlas todas juntas en el navegador:

```bash
cd designs && python3 -m http.server 8080
# luego abrir http://localhost:8080
```

Los archivos `.pen` se abren con la extensión o la app de pen.dev.

---

## Documentación

| Documento | Contenido |
|---|---|
| [`docs/01-auditoria-heuristica.md`](docs/01-auditoria-heuristica.md) | Hallazgos por ley de Gestalt y por heurística de Nielsen, con los 9 puntos de dolor sobre la evidencia. |
| [`docs/02-sistema-de-diseno.md`](docs/02-sistema-de-diseno.md) | Tokens, tipografía y la tabla completa de contraste WCAG. |
| [`docs/03-arquitectura-informacion.md`](docs/03-arquitectura-informacion.md) | Mapa de migración de los 15 tiles a los 5 dominios, y los flujos de tarea. |

**Tablero de brainstorm en FigJam** (auditoría, clustering y flujos):
<https://www.figma.com/board/xVcZd6aLwGJdhOwRp5x3OK>

---

## Dos correcciones que salieron de verificar, no de diseñar

**Bordes de controles.** La tabla de contraste reveló que `border/subtle` (1.30:1) y
`border/default` (1.65:1) incumplen el mínimo de 3:1 que exige WCAG 1.4.11 para el límite de un
componente interactivo. Se añadió `border/control` = `#6B7480` (4.74:1) como el único token
legal en el contorno de un campo, un select o un checkbox. Los otros dos quedan solo para
divisores decorativos, que la norma sí exime.

**El amarillo nunca es texto sobre blanco.** `#FFB903` sobre `#FFFFFF` da **1.72:1**. Eso
explica por qué el manual lo prohíbe: no es una regla de gusto. En el sistema el amarillo es
color de superficie y de acento; el texto sobre amarillo usa `neutral/900` (10.30:1).

---

## Estado

- Tablero FigJam: completo.
- Cuatro pantallas: completas.
- Documentación: completa.
- Sistema de diseño en Figma: **bloqueado**. El plan Starter del servidor MCP de Figma permite
  **6 llamadas al mes**, no al día, y las herramientas de escritura no están exentas. Alcanzaron
  a crearse las 3 páginas, las 5 colecciones de variables y las 31 primitivas. Lo que falta está
  como scripts listos para reejecutar en `figma/scripts/`, con el inventario de IDs en
  `figma/state-ledger.json`.

---

## Nota sobre tipografía

El manual autoriza **Arial** y **Trebuchet MS** para medios digitales. Ninguna está disponible en
Figma: `listAvailableFontsAsync()` sobre 8.927 familias devolvió cero coincidencias para ambas.
Se usa **Inter** y se declara como sustitución documentada. En el prototipo web Arial queda en la
cadena de respaldo, así que en equipos sin Inter la interfaz cae exactamente en la tipografía que
el manual autoriza.

---

## Datos de muestra

Las materias, códigos y salones son los reales del estudiante, tomados de las capturas. Los
montos, fechas de vencimiento y números de solicitud son verosímiles pero **inventados** como
contenido de demostración.
