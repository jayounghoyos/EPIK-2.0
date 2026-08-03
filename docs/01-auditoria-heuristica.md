# Auditoría heurística de EPIK

Evidencia: tres capturas del portal en `EPIK_screenshots/` (`home.png` 1919×889,
`student_dropdown.png` 1919×894, `my_enrollment.png` 1920×1080).

EPIK es un despliegue de PeopleSoft Fluid. Su pantalla de inicio es una retícula plana de 15
accesos con idéntico peso visual, etiquetas mezcladas en dos idiomas y prácticamente ningún
estado.

---

## 1. Evidencia medida: el producto está fuera de marca

Los colores se extrajeron muestreando píxeles de las capturas con ImageMagick, no a ojo.

| | Manual de identidad EAFIT | EPIK actual |
|---|---|---|
| Azul | `#004B85` (Pantone 294C) | `#000863` en la cabecera |
| Amarillo | `#FFB903` (Pantone 123C) | **ausente en toda la interfaz** |
| Acento | no definido | `#00A6D6` barra inferior, `#0051E4` bloques de horario |
| Superficie | — | `#ECECEC` fondo, `#FFFFFF` tarjetas |
| Tipografía digital | Arial / Trebuchet MS | por defecto de PeopleSoft |

El azul de la cabecera no es el Azul EAFIT: `#000863` es un navy casi puro, mientras que
`#004B85` tiene un componente verde y azul mucho más alto. No es una variación de tono, es otro
color. Y el amarillo institucional, la mitad de la bandera de la Universidad, no aparece ni una
vez en el producto.

Esto convierte la crítica en un hecho verificable: no es que EPIK se vea anticuado, es que
incumple el manual de identidad de la propia institución.

Reproducible:

```bash
convert EPIK_screenshots/home.png -format "%[pixel:p{400,30}]" info:   # cabecera
convert EPIK_screenshots/home.png -format "%[pixel:p{400,868}]" info:  # barra inferior
```

---

## 2. Hallazgos por ley de Gestalt

| Ley | Hallazgo |
|---|---|
| **Proximidad** | Las separaciones entre los 15 tiles son idénticas en toda la retícula. Sin variación de distancia, el ojo no tiene forma de inferir qué opciones pertenecen al mismo tema. |
| **Similitud** | Los 15 tiles comparten tamaño, fondo, tipografía y tratamiento de icono. La similitud total elimina la jerarquía: "Reserva de espacios" pesa exactamente lo mismo que "Mi matrícula". |
| **Región común** | Ningún contenedor encierra grupos de tiles. Es el recurso más fuerte de Gestalt para agrupar, y EPIK no lo usa en ningún punto de la pantalla. |
| **Figura y fondo** | Tarjetas blancas sobre `#ECECEC`. El contraste de superficie es tan débil que el borde del área activa se pierde. |
| **Continuidad** | En el horario semanal, los bloques de 3:00pm a 6:00pm se solapan entre sí y rompen la lectura vertical de cada día. |
| **Cierre** | El carrusel de dos páginas, señalado solo por dos puntos en el pie, oculta contenido sin indicar qué queda fuera de la vista. |

---

## 3. Hallazgos por heurística de Nielsen

| Heurística | Hallazgo |
|---|---|
| **1 · Visibilidad del estado** | Solo un tile de quince muestra estado ("No current tasks"). El estudiante no sabe si debe dinero, si tiene documentos pendientes o si su matrícula quedó completa hasta entrar módulo por módulo. |
| **2 · Correspondencia con el mundo real** | Mezcla de idiomas en una universidad colombiana: "My Enrollment", "Attach Documents" y "Servicios y Certificados" conviven en la misma pantalla. |
| **4 · Consistencia y estándares** | Tres formas de nombrar lo mismo. "Registro de Materias", "Register Courses" y "Enrollment" aparecen juntas en el menú lateral de matrícula. |
| **6 · Reconocer antes que recordar** | Sin navegación persistente, el usuario debe recordar en qué tile vivía cada trámite y volver al inicio cada vez que cambia de tarea. |
| **8 · Diseño estético y minimalista** | Quince opciones equivalentes compiten por la atención. Nada guía la mirada hacia la tarea más probable del momento. |

---

## 4. Puntos de dolor sobre la evidencia

Numerados igual que los marcadores del muro de auditoría en FigJam.

| # | Captura | Problema |
|---|---|---|
| 1 | `home.png` | El selector `▾Student` es la única navegación global de todo el portal. |
| 2 | `home.png` | Etiquetas en inglés y español dentro de la misma retícula. |
| 3 | `home.png` | "No current tasks" es el único tile con estado; los otros 14 no informan nada. |
| 4 | `home.png` | Separaciones idénticas entre los 15 tiles: no existe agrupación por tema. |
| 5 | `home.png` | Cabecera `#000863`, no el Azul EAFIT `#004B85` del manual. |
| 6 | `student_dropdown.png` | El cambio de rol se esconde en un desplegable de solo dos opciones. |
| 7 | `my_enrollment.png` | Ítems de menú en gris claro que aparentan estar deshabilitados sin estarlo. |
| 8 | `my_enrollment.png` | Bloques de 3:00pm a 6:00pm superpuestos; el horario se vuelve ilegible. |
| 9 | `my_enrollment.png` | El texto de cada clase queda por debajo del tamaño mínimo legible. |

---

## 5. Otro detalle: el idioma no es cosmético

La mezcla ES/EN no es solo inconsistencia visual. "My Enrollment" y "Registro de Materias"
apuntan a funciones distintas pero relacionadas, y un estudiante que busca "inscribir materias"
tiene que decidir cuál de las dos es la correcta antes de hacer clic. El costo es un error de
navegación, no una molestia estética. Por eso el rediseño unifica en español, y por eso el
idioma aparece como hallazgo de la heurística 4 y no como una preferencia.
