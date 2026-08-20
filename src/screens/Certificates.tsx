import { Card, CardHeader } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Field, Select } from '../components/ui/Field'
import { PageHeader } from '../components/ui/PageHeader'
import { Icon, type IconName } from '../lib/icons'
import { student, term } from '../data/student'

/**
 * One name for the concept: "Solicitud". The current portal calls it Request,
 * Service Request and Requests Made on the same screen.
 *
 * "Mis solicitudes" is an empty state with the table structure left visible. In the
 * real portal that table is broken: it reports "1 row" whose only row renders the
 * text "Request Number", a header repeated as if it were data. No requests are
 * invented and no count is claimed that cannot be demonstrated.
 */

const availableRequests: { id: string; label: string; icon: IconName; current?: boolean }[] = [
  { id: 'servicios', label: 'Solicitud de servicios', icon: 'clipboard' },
  { id: 'idiomas', label: 'Solicitud de certificado de Idiomas', icon: 'award' },
  { id: 'certificados', label: 'Solicitud de certificados', icon: 'file', current: true },
  { id: 'otros', label: 'Otros servicios', icon: 'clip' },
]

export function Certificates() {
  return (
    <div className="mx-auto max-w-[1180px] px-4 py-8 lg:px-8">
      <PageHeader
        breadcrumb="Trámites"
        title="Certificados"
        meta={`${student.program} · ${student.level} · ${student.campus} · ${term.name}`}
      />

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <Card>
            <CardHeader icon="file" title="Nueva solicitud" />
            <div className="px-6 pb-6">
              <p className="text-sm text-gray-600">
                Confirma el periodo y el programa sobre los que necesitas el certificado; con esos
                datos te mostramos los certificados que puedes solicitar.
              </p>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <Field label="Periodo académico" required hint="Periodo en el que estás matriculado.">
                  {(id) => (
                    <Select id={id} defaultValue={term.name}>
                      <option>{term.name}</option>
                    </Select>
                  )}
                </Field>
                <Field
                  label="Programa académico"
                  required
                  hint="Programa al que quedará asociado el certificado."
                >
                  {(id) => (
                    <Select id={id} defaultValue={`${student.program} · ${student.level}`}>
                      <option>
                        {student.program} · {student.level}
                      </option>
                    </Select>
                  )}
                </Field>
              </div>

              <div className="mt-6">
                <Button>
                  Buscar certificados disponibles
                  <Icon name="search" className="size-4" />
                </Button>
              </div>
            </div>
          </Card>

          <Card>
            <CardHeader icon="clipboard" title="Mis solicitudes" />
            <div className="px-6 pb-6">
              <div className="overflow-hidden rounded-lg border border-gray-200">
                {/* The structure stays visible so it is clear what will appear here */}
                <div className="grid grid-cols-4 gap-4 border-b border-gray-200 bg-gray-50 px-5 py-3 text-[11px] font-semibold tracking-[0.08em] text-gray-600 uppercase">
                  <span>Número</span>
                  <span>Tipo</span>
                  <span>Fecha de solicitud</span>
                  <span>Estado</span>
                </div>

                <div className="flex flex-col items-center px-6 py-14 text-center">
                  <span className="grid size-14 place-items-center rounded-full bg-eafit-50">
                    <Icon name="file" className="size-6 text-eafit-500" />
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-gray-900">
                    Aún no tienes solicitudes registradas
                  </h3>
                  <p className="mt-2 max-w-sm text-sm text-gray-600">
                    Cuando envíes tu primera solicitud, aquí aparecerá con su número, tipo, fecha y
                    estado para que puedas seguirla.
                  </p>
                  <div className="mt-6">
                    <Button variant="secondary">
                      <Icon name="file" className="size-4" />
                      Crear mi primera solicitud
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <Card className="h-fit">
          <CardHeader icon="file" title="Solicitudes disponibles" />
          <div className="px-6 pb-6">
            <p className="text-sm text-gray-600">
              Estas son las solicitudes que puedes iniciar desde el portal.
            </p>
            <ul className="mt-4 space-y-1">
              {availableRequests.map((item) => (
                <li key={item.id}>
                  <button
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-eafit-400 ${
                      item.current
                        ? 'bg-eafit-50 font-semibold text-eafit-500'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon name={item.icon} className="size-5 shrink-0 text-eafit-500" />
                    {item.label}
                    <Icon name="arrowRight" className="ml-auto size-4 shrink-0 text-gray-500" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>
    </div>
  )
}
