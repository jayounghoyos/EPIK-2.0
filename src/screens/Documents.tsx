import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Card, CardHeader } from '../components/ui/Card'
import { PageHeader } from '../components/ui/PageHeader'
import { Icon } from '../lib/icons'
import { counts, documents, type DocumentStatus } from '../data/documents'

/**
 * El defecto grave que esta pantalla corrige: en el portal actual una fila aparece
 * con la insignia verde "Approved" mientras su propia columna de observaciones dice
 * que el documento no sirve. El estado se contradice a sí mismo.
 *
 * Aquí una observación implica que el estado NO es aprobado, y la fila trae la
 * acción para reemplazar el archivo.
 */

const statusLabel: Record<DocumentStatus, string> = {
  aprobado: 'Aprobado',
  observacion: 'Con observación',
  pendiente: 'Pendiente de adjuntar',
}

const statusIntent: Record<DocumentStatus, 'success' | 'warning' | 'neutral'> = {
  aprobado: 'success',
  observacion: 'warning',
  pendiente: 'neutral',
}

export function Documents() {
  return (
    <div className="mx-auto max-w-[1180px] px-4 py-8 lg:px-8">
      <PageHeader
        breadcrumb="Trámites › Adjuntar documentos"
        title="Adjuntar documentos"
        meta="Revisa el estado de cada documento requerido para tu matrícula. Los documentos con observación deben reemplazarse para continuar."
      />

      <div className="mb-6 flex flex-wrap gap-2.5">
        <Badge>
          <Icon name="file" className="size-3.5" />
          {counts.total} documentos requeridos
        </Badge>
        <Badge intent="success">{counts.aprobados} aprobados</Badge>
        <Badge intent="warning">{counts.observacion} con observación</Badge>
        <Badge intent="neutral">{counts.pendientes} pendiente</Badge>
      </div>

      <Card>
        <CardHeader icon="check" title="Declaración de veracidad de datos" />
        <div className="px-6 pb-6">
          <div className="flex gap-3">
            <span
              aria-hidden="true"
              className="mt-0.5 grid size-5 shrink-0 place-items-center rounded bg-eafit-500"
            >
              <Icon name="check" className="size-3.5 text-white" />
            </span>
            <div className="space-y-3 text-sm text-gray-700">
              <p className="font-bold text-gray-900">
                Declaro que la información y/o documentación aportada es completa, cierta y veraz.
              </p>
              <p>
                En consecuencia, autorizo a la Universidad EAFIT para que consulte o acceda a estos
                con la finalidad de llevar a cabo el proceso de admisión y matrícula. Así mismo, la
                Universidad estará autorizada para que, a través de los controles que esta considere
                pertinentes, verifique su autenticidad o exactitud.
              </p>
              <p>
                Del mismo modo, declaro que conozco que el incumplimiento de lo anterior dará lugar
                a las consecuencias señaladas en las políticas y reglamentos institucionales, sin
                perjuicio de las sanciones y penas previstas en la legislación colombiana. La
                presente declaración hace parte de la autorización otorgada a la Universidad en
                desarrollo de la Ley 1581 de 2012 o la norma que la sustituya, modifique o derogue.
              </p>
              <p className="font-semibold text-exito">
                Aceptaste las condiciones. Ya puedes adjuntar tus documentos.
              </p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="mt-5">
        <CardHeader icon="clip" title="Documentos requeridos" />
        <p className="-mt-2 px-6 pb-4 text-sm text-gray-600">
          Los documentos con observación deben reemplazarse para completar tu matrícula.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <caption className="sr-only">Estado de los documentos requeridos</caption>
            <thead>
              <tr>
                {['Categoría', 'Documento', 'Archivo', 'Estado', 'Observación'].map((h) => (
                  <th
                    key={h}
                    scope="col"
                    className="border-b border-gray-200 bg-gray-50 px-5 py-3 text-left text-[11px] font-semibold tracking-[0.08em] text-gray-600 uppercase"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr
                  key={doc.id}
                  className={doc.status === 'observacion' ? 'bg-amber-50/60' : undefined}
                >
                  <td className="border-b border-gray-200 px-5 py-4 align-top text-gray-600">
                    {doc.category}
                  </td>
                  <td className="border-b border-gray-200 px-5 py-4 align-top font-semibold text-gray-900">
                    {doc.name}
                  </td>
                  <td className="border-b border-gray-200 px-5 py-4 align-top">
                    <span
                      className={`inline-flex max-w-56 items-start gap-2 rounded-md border px-3 py-2 text-xs ${
                        doc.file
                          ? 'border-gray-200 bg-gray-50 text-gray-900'
                          : 'border-gray-200 bg-white text-gray-500 italic'
                      }`}
                    >
                      <Icon name="file" className="mt-0.5 size-3.5 shrink-0" />
                      <span className="break-all">{doc.file ?? 'Sin archivo adjunto'}</span>
                    </span>
                  </td>
                  <td className="border-b border-gray-200 px-5 py-4 align-top">
                    <Badge intent={statusIntent[doc.status]}>{statusLabel[doc.status]}</Badge>
                  </td>
                  <td className="border-b border-gray-200 px-5 py-4 align-top text-gray-700">
                    <p className="max-w-md">{doc.note}</p>
                    {doc.status === 'observacion' && (
                      <div className="mt-3">
                        <Button>
                          <Icon name="history" className="size-4" />
                          Reemplazar archivo
                        </Button>
                      </div>
                    )}
                    {doc.status === 'pendiente' && (
                      <div className="mt-3">
                        <Button variant="secondary">
                          <Icon name="clip" className="size-4" />
                          Adjuntar archivo
                        </Button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
