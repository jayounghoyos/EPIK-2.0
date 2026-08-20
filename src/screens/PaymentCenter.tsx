import { Link } from 'react-router'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { EmptyState } from '../components/ui/EmptyState'
import { PageHeader } from '../components/ui/PageHeader'
import { balance } from '../data/finance'

/**
 * Esta pantalla no tiene diseño propio porque el portal actual no la resuelve:
 * es solo una entrada del menú lateral de Financiero.
 *
 * Y hay un dato que decide su contenido: el saldo real es cero. Un centro de
 * pagos sin nada por pagar no es un formulario vacío, es un estado resuelto.
 */
export function PaymentCenter() {
  return (
    <div className="mx-auto max-w-[1180px] px-4 py-8 lg:px-8">
      <PageHeader
        breadcrumb="Financiero › Centro de pagos"
        title="Centro de pagos"
        meta="Punto de pago en línea para los cargos que estén habilitados."
      />

      <Card>
        <EmptyState
          icon="check"
          title="No hay cargos por pagar"
          body={`Tu saldo pendiente es $${balance.amount} ${balance.currency}. Cuando la Universidad genere un cargo, aparecerá aquí con su valor y su fecha límite, y podrás pagarlo sin salir del portal.`}
          action={
            <Link to="/estado-de-cuenta">
              <Button variant="secondary">Ver mi estado de cuenta</Button>
            </Link>
          }
        />
      </Card>
    </div>
  )
}
