import { Card } from '../components/ui/Card'
import { EmptyState } from '../components/ui/EmptyState'
import { PageHeader } from '../components/ui/PageHeader'

/**
 * In the current portal this screen literally prints:
 *
 *     "(CLOB) En este momento no tiene información."
 *
 * CLOB is an Oracle datatype. It is database jargon leaked into the interface, in
 * quotation marks, and the worst "match between system and the real world" failure
 * in the whole product.
 *
 * The actual content is the same: there is no information. The difference is saying
 * so in the student's language and explaining when there will be.
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
