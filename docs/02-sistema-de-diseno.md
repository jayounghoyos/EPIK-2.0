# Sistema de diseño EPIK 2.0

Tokens, tipografía y reglas de accesibilidad. Todo valor de color de la interfaz sale de esta
tabla: ninguna pantalla debe escribir un hex a mano.

---

## 1. Origen de la paleta

El manual de identidad visual de EAFIT define exactamente dos colores institucionales:

| Color | Pantone | CMYK | RGB | Hex |
|---|---|---|---|---|
| Azul EAFIT | 294C (brillante) / 294U (mate) | 100 / 56 / 0 / 18 | 0, 75, 133 | `#004B85` |
| Amarillo EAFIT | 123C (brillante) / 109U (mate) | 0 / 30 / 94 / 0 | 255, 185, 3 | `#FFB903` |

Una paleta de dos tintas pensada para impresión no alcanza para una interfaz: no tiene neutros,
no tiene estados de éxito o error, y no tiene suficientes pasos para construir jerarquía. El
sistema **ancla** en esos dos valores exactos y **deriva** el resto. Nada se inventa: `blue/500`
y `yellow/500` son los valores del manual, sin modificar.

### La regla del amarillo

El manual prohíbe amarillo sobre blanco. La medición explica por qué: `#FFB903` sobre `#FFFFFF`
da **1.72:1**, muy por debajo del 4.5:1 que exige WCAG AA. El amarillo es por tanto un color de
**superficie y énfasis**, nunca de texto sobre blanco. Texto *sobre* amarillo usa
`neutral/900` (10.30:1).

---

## 2. Primitivas

Colección `Primitives`, modo único `Value`. Todas con `scopes = []`: quedan ocultas en los
selectores de Figma para que nadie las use directamente.

**Rampa Azul EAFIT**

| Token | Hex | | Token | Hex |
|---|---|---|---|---|
| `blue/50` | `#EAF2F8` | | `blue/500` | `#004B85` ← Pantone 294C |
| `blue/100` | `#CCE0EE` | | `blue/600` | `#003F70` |
| `blue/200` | `#99C1DD` | | `blue/700` | `#00325A` |
| `blue/300` | `#5C9CC7` | | `blue/800` | `#002544` |
| `blue/400` | `#2A76AC` | | `blue/900` | `#001A30` |

**Amarillo EAFIT**

| Token | Hex |
|---|---|
| `yellow/300` | `#FFD666` |
| `yellow/500` | `#FFB903` ← Pantone 123C |
| `yellow/700` | `#C98F00` |
| `yellow/900` | `#7A5700` |

**Neutros**

| Token | Hex | | Token | Hex |
|---|---|---|---|---|
| `neutral/0` | `#FFFFFF` | | `neutral/500` | `#6B7480` |
| `neutral/50` | `#F7F8FA` | | `neutral/600` | `#4B5563` |
| `neutral/100` | `#EEF1F4` | | `neutral/700` | `#374151` |
| `neutral/200` | `#DDE2E8` | | `neutral/800` | `#1F2937` |
| `neutral/300` | `#C3CAD3` | | `neutral/900` | `#111827` |
| `neutral/400` | `#98A2AE` | | | |

**Semánticas crudas**

| Token | Hex | | Token | Hex |
|---|---|---|---|---|
| `green/50` | `#E6F4EE` | | `green/500` | `#0F7B4F` |
| `amber/50` | `#FEF3E2` | | `amber/500` | `#B45309` |
| `red/50` | `#FCEAE8` | | `red/500` | `#B3261E` |

---

## 3. Tokens semánticos

Colección `Color`, modo único `Light`. Cada uno es un **alias** a una primitiva, nunca un valor
crudo repetido. Los componentes se enlazan a esta capa, no a la anterior.

| Token | Alias a | Scopes |
|---|---|---|
| `color/surface/page` | `neutral/50` | FRAME_FILL, SHAPE_FILL |
| `color/surface/card` | `neutral/0` | FRAME_FILL, SHAPE_FILL |
| `color/surface/sunken` | `neutral/100` | FRAME_FILL, SHAPE_FILL |
| `color/surface/brand` | `blue/500` | FRAME_FILL, SHAPE_FILL |
| `color/surface/brand-soft` | `blue/50` | FRAME_FILL, SHAPE_FILL |
| `color/surface/accent` | `yellow/500` | FRAME_FILL, SHAPE_FILL |
| `color/surface/success-soft` | `green/50` | FRAME_FILL, SHAPE_FILL |
| `color/surface/warning-soft` | `amber/50` | FRAME_FILL, SHAPE_FILL |
| `color/surface/danger-soft` | `red/50` | FRAME_FILL, SHAPE_FILL |
| `color/text/primary` | `neutral/900` | TEXT_FILL |
| `color/text/secondary` | `neutral/600` | TEXT_FILL |
| `color/text/muted` | `neutral/500` | TEXT_FILL |
| `color/text/on-brand` | `neutral/0` | TEXT_FILL |
| `color/text/on-accent` | `neutral/900` | TEXT_FILL |
| `color/text/brand` | `blue/500` | TEXT_FILL |
| `color/text/success` | `green/500` | TEXT_FILL |
| `color/text/warning` | `amber/500` | TEXT_FILL |
| `color/text/danger` | `red/500` | TEXT_FILL |
| `color/border/subtle` | `neutral/200` | STROKE_COLOR |
| `color/border/default` | `neutral/300` | STROKE_COLOR |
| **`color/border/control`** | **`neutral/500`** | STROKE_COLOR |
| `color/border/brand` | `blue/500` | STROKE_COLOR |
| `color/border/focus` | `blue/400` | STROKE_COLOR |
| `color/icon/default` | `neutral/600` | SHAPE_FILL, STROKE_COLOR |
| `color/icon/brand` | `blue/500` | SHAPE_FILL, STROKE_COLOR |
| `color/icon/on-brand` | `neutral/0` | SHAPE_FILL, STROKE_COLOR |

### Por qué existe `border/control`

Corrección hecha durante la verificación de contraste, no en el diseño inicial. WCAG 1.4.11
exige **3:1** para el límite visual de un componente de interfaz. Los bordes suaves miden:

- `border/subtle` `#DDE2E8` → **1.30:1**
- `border/default` `#C3CAD3` → **1.65:1**

Ambos fallan. Son válidos solo como separadores decorativos (divisores, cantos de tarjeta), que
la norma exime porque no delimitan un control. Pero un campo de texto, un select o un checkbox
sí necesitan borde perceptible, y usar `border/default` ahí habría sido un incumplimiento real.

`border/control` = `neutral/500` `#6B7480` → **4.74:1**. Ese es el token obligatorio para el
contorno de cualquier control interactivo.

**Regla:** `subtle` y `default` para adornos. `control` para todo lo que el usuario puede tocar.

---

## 4. Espaciado, radio y tipografía

`Spacing` (scope `GAP`): `2xs` 4 · `xs` 8 · `sm` 12 · `md` 16 · `lg` 24 · `xl` 32 · `2xl` 48 · `3xl` 64

`Radius` (scope `CORNER_RADIUS`): `sm` 4 · `md` 8 · `lg` 12 · `xl` 16 · `full` 999

`Typography` (modo `Value`):

| Token | Valor | Scope |
|---|---|---|
| `family/sans` | `Inter` | FONT_FAMILY |
| `weight/regular` | `Regular` | FONT_STYLE |
| `weight/medium` | `Medium` | FONT_STYLE |
| `weight/semibold` | `Semi Bold` | FONT_STYLE |
| `weight/bold` | `Bold` | FONT_STYLE |
| `size/display` | 32 | FONT_SIZE |
| `size/h1` | 24 | FONT_SIZE |
| `size/h2` | 20 | FONT_SIZE |
| `size/h3` | 16 | FONT_SIZE |
| `size/body` | 15 | FONT_SIZE |
| `size/small` | 13 | FONT_SIZE |
| `size/caption` | 12 | FONT_SIZE |

Interlineado: 1.4 para texto corrido, 1.25 para titulares.

### Sustitución tipográfica documentada

El manual autoriza **Arial** y **Trebuchet MS** para medios digitales. Ninguna de las dos está
disponible en Figma: no son Google Fonts, y `listAvailableFontsAsync()` sobre las 8.927 familias
del entorno devolvió cero coincidencias para ambas. Solo apareció **Inter**, con sus 18 estilos.

El sistema usa **Inter** y lo declara como sustitución de la cláusula de medios digitales del
manual. Inter es una grotesca neutra de proporciones equivalentes a Arial, diseñada
específicamente para pantalla, así que la sustitución respeta la intención de la norma aunque
no su letra. Si el proyecto llegara a producción, Arial se instalaría vía el font helper de
Figma y el token `family/sans` cambiaría en un solo lugar.

Cuidado con la API: en Figma los estilos de Inter se llaman `"Semi Bold"` y `"Extra Bold"`, con
espacio. `"SemiBold"` falla.

---

## 5. Tabla de contraste WCAG

Medido con la fórmula de luminancia relativa de WCAG 2.1. AA exige 4.5:1 para texto normal,
3:1 para texto grande y para límites de componentes de interfaz.

| Primer plano | Fondo | Ratio | AA texto | AA grande / UI |
|---|---|---|---|---|
| `text/primary` `#111827` | `surface/card` `#FFFFFF` | 17.74:1 | PASA | PASA |
| `text/primary` `#111827` | `surface/page` `#F7F8FA` | 16.69:1 | PASA | PASA |
| `text/secondary` `#4B5563` | `surface/card` `#FFFFFF` | 7.56:1 | PASA | PASA |
| `text/secondary` `#4B5563` | `surface/page` `#F7F8FA` | 7.11:1 | PASA | PASA |
| `text/muted` `#6B7480` | `surface/card` `#FFFFFF` | 4.74:1 | PASA | PASA |
| `text/brand` `#004B85` | `surface/card` `#FFFFFF` | 8.95:1 | PASA | PASA |
| `text/brand` `#004B85` | `surface/page` `#F7F8FA` | 8.43:1 | PASA | PASA |
| `text/on-brand` `#FFFFFF` | `surface/brand` `#004B85` | 8.95:1 | PASA | PASA |
| `text/on-accent` `#111827` | `surface/accent` `#FFB903` | 10.30:1 | PASA | PASA |
| `text/success` `#0F7B4F` | `surface/card` `#FFFFFF` | 5.29:1 | PASA | PASA |
| `text/success` `#0F7B4F` | `success-soft` `#E6F4EE` | 4.67:1 | PASA | PASA |
| `text/warning` `#B45309` | `surface/card` `#FFFFFF` | 5.02:1 | PASA | PASA |
| `text/warning` `#B45309` | `warning-soft` `#FEF3E2` | 4.58:1 | PASA | PASA |
| `text/danger` `#B3261E` | `surface/card` `#FFFFFF` | 6.54:1 | PASA | PASA |
| `text/danger` `#B3261E` | `danger-soft` `#FCEAE8` | 5.63:1 | PASA | PASA |
| `border/control` `#6B7480` | `surface/card` `#FFFFFF` | 4.74:1 | — | PASA |
| `border/focus` `#2A76AC` | `surface/card` `#FFFFFF` | 4.90:1 | — | PASA |
| `border/default` `#C3CAD3` | `surface/card` `#FFFFFF` | 1.65:1 | — | **FALLA — solo decorativo** |
| `border/subtle` `#DDE2E8` | `surface/card` `#FFFFFF` | 1.30:1 | — | **FALLA — solo decorativo** |
| `yellow/500` `#FFB903` | `surface/card` `#FFFFFF` | 1.72:1 | **PROHIBIDO** | **FALLA** |

Reproducible con `scripts/contrast.py`.

---

## 6. Inventario de componentes

Todos locales en la página `01 Foundations` (el plan Starter no permite publicar una librería
de equipo). Enlazados a tokens, sin hex escritos a mano.

| Componente | Ejes de variante |
|---|---|
| Button | Style (primary / secondary / ghost / danger) × State (default / hover / focus / disabled) × Size (sm / md) |
| Input | State (default / focus / error / disabled) — borde `border/control` |
| Select | State (default / focus / disabled) |
| SearchField | State (default / focus) |
| Checkbox · Radio | State (unchecked / checked / disabled) |
| Card | Variant (elevated / outlined) |
| **ActionTile** | El reemplazo del tile: icono + etiqueta + ranura de estado opcional |
| StatusBadge | Intent (info / success / warning / danger) |
| Tabs | State (active / inactive) |
| TableRow | State (default / hover / selected) |
| SidebarNavItem | State (default / hover / active) |
| TopBar | — |
| Breadcrumb | — |
| Alert | Intent (info / success / warning / danger) |
| Modal | — |
| Stepper | State (done / current / pending) |
| **ScheduleBlock** | Variant (normal / overlap) — resuelve el choque de 3–6pm |
| Pagination | — |

Iconos: trazados de **Lucide** (licencia ISC) insertados con `figma.createNodeFromSvg()`, 24px,
grosor 1.5px. Se cita la licencia en la página de foundations.
