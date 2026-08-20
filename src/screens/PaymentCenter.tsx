import { Link } from 'react-router'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { EmptyState } from '../components/ui/EmptyState'
import { PageHeader } from '../components/ui/PageHeader'
import { balance } from '../data/finance'

/**
 * This screen has no design of its own because the current portal never resolves it:
 * it is only an entry in the Financiero sidebar.
 *
 * And one fact decides its content: the real balance is zero. A payment centre with
 * nothing to pay is not an empty form, it is a settled state.
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
