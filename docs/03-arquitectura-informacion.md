# Arquitectura de información EPIK 2.0

## 1. El problema estructural

Quince accesos de peso idéntico obligan a un escaneo serial: para encontrar un trámite hay que
leer las quince opciones. No hay forma de descartar un grupo entero de un vistazo, porque no
hay grupos.

La solución aplica **región común**, **proximidad** y **similitud** de forma deliberada: cinco
dominios con nombre propio, cada uno delimitado visualmente. Una barra lateral persistente
reemplaza el micro-desplegable `▾Student` como navegación global.

---

## 2. Mapa de migración

Cada tile heredado tiene un destino explícito. Ninguno se pierde.

| Tile actual | Dominio nuevo |
|---|---|
| My Enrollment | **Académico** › Mi matrícula |
| Registro de Materias / Register Courses | **Académico** › Registro de materias |
| Progreso académico | **Académico** › Progreso académico |
| Academic records | **Académico** › Historia académica |
| Teacher Evaluation | **Académico** › Evaluación docente |
| Financial account | **Financiero** › Estado de cuenta · Pagos · Facturas · Financiación |
| Servicios y Certificados | **Trámites y servicios** › Certificados |
| Attach Documents | **Trámites y servicios** › Adjuntar documentos |
| Reserva de espacios | **Trámites y servicios** › Reserva de espacios |
| Registration in Continuing Edu | **Inscripciones** › Educación continua |
| Inscrip. Pregrado y Posgrado | **Inscripciones** › Pregrado y posgrado |
| Start New IdiomasEAFIT Program | **Inscripciones** › Idiomas EAFIT |
| Profile | **Mi perfil** › Datos personales |
| Mi Perfil Monitor | **Mi perfil** › Perfil monitor |
| Administrative tasks | *deja de ser tile* → campana de notificaciones + sección del panel |
| Useful Information | *deja de ser tile* → ayuda contextual en el pie |

### Los dos que dejan de ser tile

**Administrative tasks** nunca tuvo contenido propio: su única información era el estado
"No current tasks". Un tile cuyo contenido es un estado no es un destino, es una notificación.
Pasa a la campana del encabezado y a una sección del panel de inicio.

**Useful Information** es documentación de apoyo. Ponerla al mismo nivel jerárquico que
"Mi matrícula" es exactamente el error que produce la retícula plana. Baja al pie.

---

## 3. Estructura de navegación

```
Barra lateral persistente
├── Inicio
├── Académico
│   ├── Mi matrícula
│   ├── Registro de materias
│   ├── Progreso académico
│   ├── Historia académica
│   └── Evaluación docente
├── Financiero
│   ├── Estado de cuenta
│   ├── Pagos
│   ├── Facturas
│   └── Financiación
├── Trámites y servicios
│   ├── Certificados
│   ├── Adjuntar documentos
│   ├── Mis solicitudes
│   └── Reserva de espacios
└── Inscripciones
    ├── Pregrado y posgrado
    ├── Educación continua
    └── Idiomas EAFIT

Encabezado (arriba a la derecha)
├── Buscador global
├── Notificaciones  ← absorbe Administrative tasks
└── Mi perfil
    ├── Datos personales
    ├── Perfil monitor
    └── Configuración de la cuenta

Pie
└── Información útil  ← absorbe Useful Information
```

Cinco elementos de primer nivel más el menú de usuario. Frente a quince destinos planos, el
número de decisiones en el primer vistazo baja de 15 a 5.

---

## 4. Flujos de tarea

| Tarea | Hoy | Propuesto |
|---|---|---|
| Inscribir una materia | **7 pasos** — Inicio → My Enrollment → elegir semestre → Registro de Materias → buscar → agregar → confirmar | **4 pasos** — Inicio (con "matrícula abierta" ya visible) → Registro de materias → buscar y agregar → confirmar |
| Pagar la matrícula | **6 pasos** — Inicio → Financial account → PeopleSoft heredado → localizar el cargo → generar recibo → pagar en portal externo | **3 pasos** — Inicio (con el saldo ya visible) → Pagar → confirmación con comprobante |
| Solicitar un certificado | **6 pasos** — Inicio → Servicios y Certificados → elegir tipo → diligenciar → enviar → esperar sin seguimiento | **4 pasos** — Inicio → Certificados → solicitar → seguimiento con estado y descarga |

El ahorro no viene de esconder pasos, viene de subir estado al panel de inicio. Cuando el saldo
pendiente y el estado de matrícula son visibles desde la primera pantalla, dejan de existir los
pasos cuyo único propósito era averiguar en qué situación está el estudiante.

---

## 5. Criterio de validación

La prueba real del rediseño no es estética. Alguien que no conozca EPIK debería poder nombrar
los cinco dominios mirando solo la pantalla de inicio, sin explicación previa. Si no puede, la
agrupación falló y los nombres de los dominios hay que revisarlos.

Pendiente de validar con estudiantes:

- Los nombres de los cinco dominios, en particular si "Trámites y servicios" se entiende sin contexto.
- Qué ocurre con el rol "Prospective Student" del desplegable actual.
- El horario semanal, con estudiantes de primer semestre.
