import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Card, CardHeader } from '../components/ui/Card'
import { PageHeader } from '../components/ui/PageHeader'
import { Table, Th, Td, Tr } from '../components/ui/Table'
import { Icon } from '../lib/icons'
import { enrolmentRoutes, inactivePrograms, requests } from '../data/admissions'

/**
 * The original screen is called "Resumen de Solicitudes", "Registration" and
 * "Summary" at the same time, and renders English column headers over Spanish
 * values. One name and one language here.
 *
 * The "Reanudar" action keeps that word: the portal labels the same action
 * "Reanudar" in its sidebar and "Resume" on the button, on one screen.
 */
export function Admissions() {
  return (
    <div className="mx-auto max-w-[1180px] px-4 py-8 lg:px-8">
      <PageHeader
        breadcrumb="Portal"
        title="Inscripciones"
        meta="Tus solicitudes de admisión y los programas a los que puedes inscribirte."
      />

      <Card>
        <CardHeader
          icon="clipboard"
          title="Mis solicitudes de admisión"
          aside={
            <>
              <span className="font-bold tabular-nums text-gray-900">{requests.length}</span>{' '}
              solicitud
            </>
          }
        />
        <Table caption="Solicitudes de admisión registradas">
          <thead>
            <tr>
              <Th>Formulario</Th>
              <Th>Periodo</Th>
              <Th>Programa</Th>
              <Th>Tipo de admisión</Th>
              <Th>Ciudad</Th>
              <Th>Formulario</Th>
              <Th>Admisión</Th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <Tr key={request.formId}>
                <Td numeric>
                  <span className="font-semibold">{request.formId}</span>
                </Td>
                <Td>{request.term}</Td>
                <Td>
                  <span className="block font-semibold text-gray-900">{request.program}</span>
                  <span className="block text-gray-600">{request.degree}</span>
                </Td>
                <Td>{request.admissionType}</Td>
                <Td>{request.city}</Td>
                <Td>
                  <Badge intent="neutral">{request.formStatus}</Badge>
                </Td>
                <Td>
                  <Badge intent="success">{request.admissionStatus}</Badge>
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </Card>

      <Card className="mt-5">
        <CardHeader icon="languages" title="Programas inactivos" />
        <div className="space-y-3 px-6 pb-6">
          {inactivePrograms.map((program) => (
            <article
              key={program.id}
              className="flex flex-wrap items-center gap-4 rounded-lg bg-gray-50 px-5 py-4"
            >
              <Icon name="languages" className="size-6 shrink-0 text-eafit-500" />
              <div className="min-w-56 flex-1">
                <h3 className="font-semibold text-gray-900">{program.name}</h3>
                <p className="mt-0.5 text-sm text-gray-600">{program.detail}</p>
                <p className="mt-1 text-sm text-gray-600">{program.reason}</p>
              </div>
              <Button withArrow>Reanudar</Button>
            </article>
          ))}
        </div>
      </Card>

      <Card className="mt-5">
        <CardHeader icon="file" title="Inscribirme a un programa" />
        <div className="grid gap-4 px-6 pb-6 sm:grid-cols-3">
          {enrolmentRoutes.map((route) => (
            <button
              key={route.id}
              className="rounded-lg border border-gray-200 bg-white px-5 py-5 text-left transition-colors hover:border-eafit-500 hover:bg-eafit-50 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-eafit-400"
            >
              <Icon name="graduation" className="size-5 text-eafit-500" />
              <h3 className="mt-3 font-bold text-gray-900">{route.name}</h3>
              <p className="mt-1 text-sm text-gray-600">{route.detail}</p>
              <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-eafit-500">
                Iniciar inscripción
                <Icon name="arrowRight" className="size-4" />
              </p>
            </button>
          ))}
        </div>
      </Card>
    </div>
  )
}
