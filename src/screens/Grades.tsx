import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Card, CardHeader } from '../components/ui/Card'
import { Field, Input, Select } from '../components/ui/Field'
import { PageHeader } from '../components/ui/PageHeader'
import { Icon } from '../lib/icons'
import { student } from '../data/student'
import { gradeLegend, periodCounts, periods, shownRecords, totalRecords } from '../data/grades'

/**
 * The current portal lists 71 rows in one run, behind a single unexplained filter
 * icon, with English headers over Spanish data and three different spellings of a
 * period.
 *
 * Miller's law applies here: records are split by period, into groups small enough
 * to take in at a glance, each with its own count.
 *
 * These are not claimed to be the most recent periods: the student enrolled in
 * 2023-2 and is in 2026-2, so the ones visible in the capture are not the latest.
 */
export function Grades() {
  return (
    <div className="mx-auto max-w-[1180px] px-4 py-8 lg:px-8">
      <PageHeader
        breadcrumb="Académico"
        title="Mis notas"
        meta={`${student.program} · ${student.level} · ${student.campus} · ID ${student.maskedId}`}
      />

      <Card>
        <CardHeader
          icon="graduation"
          title="Historia académica"
          aside={
            <>
              <span className="font-bold tabular-nums text-gray-900">{totalRecords}</span> registros
              en total
            </>
          }
        />

        <div className="flex flex-wrap items-end gap-4 px-6 pb-5">
          <div className="min-w-56 flex-1">
            <Field label="Buscar">
              {(id) => <Input id={id} type="search" placeholder="Buscar asignatura o código" />}
            </Field>
          </div>
          <Field label="Periodo">
            {(id) => (
              <Select id={id} defaultValue="Todos">
                <option>Todos</option>
                {periods.map((p) => (
                  <option key={p.id}>{p.name}</option>
                ))}
              </Select>
            )}
          </Field>
          <Field label="Estado">
            {(id) => (
              <Select id={id} defaultValue="Todos">
                <option>Todos</option>
                <option>Cursada · Aprobada</option>
                <option>Homologada</option>
              </Select>
            )}
          </Field>
          <Button variant="secondary" className="ml-auto">
            <Icon name="file" className="size-4" />
            Descargar historia académica
          </Button>
        </div>

        {/* The portal never explains what EX, C or A mean */}
        <div className="mx-6 mb-5 rounded-lg bg-eafit-50 px-5 py-4">
          <p className="flex items-center gap-2 text-sm font-semibold text-gray-900">
            <Icon name="check" className="size-4 text-eafit-500" />
            Cómo leer las notas que no son numéricas
          </p>
          <dl className="mt-3 flex flex-wrap gap-x-8 gap-y-2">
            {gradeLegend.map((item) => (
              <div key={item.symbol} className="flex items-center gap-2.5">
                <dt className="rounded border border-gray-300 bg-white px-2 py-0.5 text-xs font-bold text-gray-900">
                  {item.symbol}
                </dt>
                <dd className="text-sm text-gray-700">{item.meaning}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <caption className="sr-only">Historia académica agrupada por periodo</caption>
            <thead>
              <tr>
                {[
                  ['Código', 'left'],
                  ['Asignatura', 'left'],
                  ['Nota', 'right'],
                  ['Créditos', 'right'],
                  ['Estado', 'left'],
                ].map(([label, align]) => (
                  <th
                    key={label}
                    scope="col"
                    className={`border-b border-gray-200 px-5 py-3 text-[11px] font-semibold tracking-[0.08em] text-gray-600 uppercase ${
                      align === 'right' ? 'text-right' : 'text-left'
                    }`}
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>

            {periods.map((period) => (
              <tbody key={period.id}>
                <tr className="bg-eafit-50">
                  <th colSpan={4} scope="colgroup" className="px-5 py-3 text-left">
                    <span className="font-bold text-eafit-500">{period.name}</span>
                    {period.tag && (
                      <span className="ml-2.5">
                        <Badge intent="brand">{period.tag}</Badge>
                      </span>
                    )}
                  </th>
                  <td className="px-5 py-3 text-right text-sm text-gray-700">
                    <span className="font-bold tabular-nums">
                      {periodCounts.find((p) => p.id === period.id)?.count}
                    </span>{' '}
                    asignaturas
                  </td>
                </tr>

                {period.rows.map((row) => (
                  <tr key={row.code} className="hover:bg-gray-50">
                    <td className="border-b border-gray-200 px-5 py-4 align-top font-semibold tabular-nums text-gray-900">
                      {row.code}
                    </td>
                    <td className="border-b border-gray-200 px-5 py-4 align-top text-gray-900">
                      {row.name}
                      {row.detail && (
                        <span className="mt-0.5 block text-xs text-eafit-500">{row.detail}</span>
                      )}
                    </td>
                    <td className="border-b border-gray-200 px-5 py-4 text-right align-top">
                      <span className="block font-bold tabular-nums text-gray-900">{row.grade}</span>
                      {row.gradeNote && (
                        <span className="block text-xs text-gray-600">{row.gradeNote}</span>
                      )}
                    </td>
                    <td className="border-b border-gray-200 px-5 py-4 text-right align-top tabular-nums text-gray-900">
                      {row.credits ?? <span className="text-gray-500">—</span>}
                    </td>
                    <td className="border-b border-gray-200 px-5 py-4 align-top">
                      <Badge intent={row.status === 'aprobada' ? 'brand' : 'neutral'}>
                        {row.status === 'aprobada' ? 'Cursada · Aprobada' : 'Homologada'}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-6">
          <div>
            <p className="font-semibold text-gray-900">
              Se muestran <span className="tabular-nums">{shownRecords}</span> de{' '}
              <span className="tabular-nums">{totalRecords}</span> registros
            </p>
            <p className="mt-0.5 text-sm text-gray-600">
              Los demás periodos se cargan por grupos, sin listas largas.
            </p>
          </div>
          <Button>
            Ver los demás periodos
            <Icon name="chevronDown" className="size-4" />
          </Button>
        </div>
      </Card>
    </div>
  )
}
