import { Card } from '../components/ui/Card'
import { EmptyState } from '../components/ui/EmptyState'
import { PageHeader } from '../components/ui/PageHeader'

/**
 * En el portal actual esta pantalla imprime literalmente:
 *
 *     "(CLOB) En este momento no tiene información."
 *
 * CLOB es un tipo de dato de Oracle. Es jerga de base de datos filtrada a la
 * interfaz, entre comillas, y es el peor caso de "match between system and the
 * real world" de todo el producto.
 *
 * El contenido real es el mismo: no hay información. La diferencia es decirlo
 * en el idioma del estudiante y explicar cuándo sí la habrá.
 */
export function TeacherEvaluation() {
  return (
    <div className="mx-auto max-w-[1180px] px-4 py-8 lg:px-8">
      <PageHeader
        breadcrumb="Académico › Evaluación docente"
        title="Evaluación docente"
        meta="Valoración de las asignaturas y sus docentes al cierre del periodo."
      />

      <Card>
        <EmptyState
          icon="clipboard"
          title="No hay evaluaciones abiertas"
          body="La evaluación docente se habilita hacia el final del periodo académico. Cuando abra, aquí aparecerán tus asignaturas inscritas con el formulario de cada una."
        />
      </Card>
    </div>
  )
}
