import { useState } from 'react'
import { Button } from '../components/ui/Button'
import { Card, CardHeader } from '../components/ui/Card'
import { EmptyState } from '../components/ui/EmptyState'
import { PageHeader } from '../components/ui/PageHeader'
import { Icon } from '../lib/icons'
import { student } from '../data/student'

/**
 * The original screen concentrates four defects in very little content:
 *
 *  - the save button is literally labelled "Save Button", a placeholder shipped
 *    to production
 *  - the table headers read "COD. DEPENDENCIA" and "DESCRIPTION", one in each
 *    language, side by side
 *  - that table is empty with no empty state, so it is unclear whether the data
 *    is missing or still loading
 *  - adding is an unlabelled "+" icon, while the profile screens use text buttons
 *
 * The content really is empty: no dependencies and no competencies are recorded.
 * Nothing is invented here, only said properly.
 */
export function MonitorProfile() {
  const [allDependencies, setAllDependencies] = useState(false)

  return (
    <div className="mx-auto max-w-[1180px] px-4 py-8 lg:px-8">
      <PageHeader
        breadcrumb="Menú de usuario › Perfil de monitor"
        title="Perfil de monitor"
        meta={`${student.fullName} · ID ${student.maskedId}`}
      />

      <Card>
        <CardHeader icon="graduation" title="Dependencias" />
        <div className="px-6 pb-6">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-lg bg-gray-50 px-5 py-4">
            <div>
              <p className="font-semibold text-gray-900">Aplica a todas las dependencias</p>
              <p className="mt-0.5 text-sm text-gray-600">
                Actívalo si tu monitoría puede ejercerse en cualquier dependencia, en lugar de
                elegirlas una por una.
              </p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={allDependencies}
              onClick={() => setAllDependencies((value) => !value)}
              className={`relative h-7 w-13 shrink-0 rounded-full transition-colors focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-eafit-400 ${
                allDependencies ? 'bg-eafit-500' : 'bg-gray-300'
              }`}
            >
              <span className="sr-only">Aplica a todas las dependencias</span>
              <span
                aria-hidden="true"
                className={`absolute top-1 size-5 rounded-full bg-white transition-transform ${
                  allDependencies ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {allDependencies ? (
            <p className="mt-5 flex gap-2.5 rounded-lg bg-eafit-50 px-4 py-3 text-sm text-gray-700">
              <Icon name="check" className="mt-0.5 size-4 shrink-0 text-eafit-500" />
              Tu monitoría aplica a todas las dependencias, así que no hace falta elegirlas.
            </p>
          ) : (
            <div className="mt-5 overflow-hidden rounded-lg border border-gray-200">
              <div className="grid grid-cols-2 gap-4 border-b border-gray-200 bg-gray-50 px-5 py-3 text-[11px] font-semibold tracking-[0.08em] text-gray-600 uppercase">
                <span>Código</span>
                <span>Descripción</span>
              </div>
              <EmptyState
                icon="clipboard"
                title="No has añadido dependencias"
                body="Añade las dependencias en las que puedes ejercer tu monitoría. Cada una aparecerá aquí con su código y su descripción."
                action={
                  <Button variant="secondary">
                    <Icon name="clip" className="size-4" />
                    Añadir dependencia
                  </Button>
                }
              />
            </div>
          )}
        </div>
      </Card>

      <Card className="mt-5">
        <CardHeader icon="file" title="Competencias" />
        <div className="px-6 pb-6">
          <label htmlFor="competencias" className="flex items-center gap-2 text-sm font-semibold text-gray-900">
            Competencias
            <span className="rounded bg-eafit-50 px-1.5 py-0.5 text-[11px] font-medium text-eafit-500">
              Obligatorio
            </span>
          </label>
          <p className="mt-1 text-sm text-gray-600">
            Describe qué puedes apoyar como monitor: asignaturas, herramientas o áreas.
          </p>
          <textarea
            id="competencias"
            rows={6}
            placeholder="Por ejemplo: apoyo en Métodos Cuantitativos, manejo de Python y acompañamiento en laboratorio."
            className="mt-3 w-full rounded-lg border border-gray-500 bg-white px-3.5 py-2.5 text-sm text-gray-900 placeholder:text-gray-500 focus:border-eafit-400 focus:outline-3 focus:outline-offset-1 focus:outline-eafit-100"
          />
        </div>
      </Card>

      {/* One action bar, one verb: "Guardar", never "Save Button" */}
      <div className="mt-6 flex flex-wrap justify-end gap-3">
        <Button variant="secondary">Cancelar</Button>
        <Button>Guardar</Button>
      </div>
    </div>
  )
}
