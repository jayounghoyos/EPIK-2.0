import { Link } from 'react-router'
import { Card } from '../components/ui/Card'
import { EmptyState } from '../components/ui/EmptyState'

export function NotFound() {
  return (
    <div className="mx-auto max-w-[1180px] px-4 py-8 lg:px-8">
      <Card>
        <EmptyState
          icon="search"
          title="No encontramos esa página"
          body="La dirección que abriste no corresponde a ninguna sección del portal."
          action={
            <Link
              to="/"
              className="inline-flex min-h-11 items-center rounded-lg bg-eafit-500 px-5 text-sm font-semibold text-white hover:bg-eafit-600"
            >
              Volver al inicio
            </Link>
          }
        />
      </Card>
    </div>
  )
}
