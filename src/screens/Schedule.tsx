import { Card } from '../components/ui/Card'
import { EmptyState } from '../components/ui/EmptyState'
import { PageHeader } from '../components/ui/PageHeader'

export function Schedule() {
  return (
    <div className="mx-auto max-w-[1180px] px-4 py-8 lg:px-8">
      <PageHeader breadcrumb="Académico" title="Mi horario" />
      <Card>
        <EmptyState
          icon="calendar"
          title="Esta pantalla todavía no está construida"
          body="El diseño ya existe y se implementa en su propia rama. Por ahora solo Inicio está terminado."
        />
      </Card>
    </div>
  )
}
