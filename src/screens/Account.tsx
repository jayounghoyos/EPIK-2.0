import { Link } from 'react-router'
import { Card } from '../components/ui/Card'
import { PageHeader } from '../components/ui/PageHeader'
import { Icon } from '../lib/icons'
import { student, term } from '../data/student'
import { balance, sections } from '../data/finance'

/**
 * El portal actual resuelve esta pantalla con una sola frase en inglés centrada
 * en 1920x1080: "You have no outstanding charges at this time."
 *
 * Un estado vacío bien resuelto responde tres cosas: qué pasa, por qué está bien,
 * y qué puedes hacer ahora. Eso es lo que construye esta pantalla. No hay montos,
 * cuotas ni vencimientos porque el saldo real es cero.
 */
export function Account() {
  return (
    <div className="mx-auto max-w-[1180px] px-4 py-8 lg:px-8">
      <PageHeader
        breadcrumb="Financiero"
        title="Estado de cuenta"
        meta="Cargos, pagos y financiación."
      />

      <Card className="px-6 py-8 sm:px-8">
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="flex items-start gap-4">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-eafit-500">
              <Icon name="check" className="size-7 text-white" />
            </span>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{balance.title}</h2>
              <p className="mt-1.5 max-w-xl text-sm text-gray-600">{balance.body}</p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-[11px] font-semibold tracking-[0.1em] text-gray-500 uppercase">
              Saldo pendiente
            </p>
            <p className="mt-1 text-4xl font-extrabold tabular-nums text-gray-900">
              ${balance.amount}
            </p>
            <p className="text-xs tracking-wide text-gray-500">{balance.currency}</p>
          </div>
        </div>

        <hr className="my-7 border-gray-200" />

        <dl className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Fact label="Periodo académico" value={term.name} />
          <Fact label="Vigencia" value={`${term.startsAt} – ${term.endsAt}`} numeric />
          <Fact label="Programa" value={student.program} />
          <Fact label="Nivel" value={student.level} />
        </dl>
      </Card>

      <section className="mt-8">
        <h2 className="text-xl font-bold text-gray-900">Secciones de Financiero</h2>
        <p className="mt-1 text-sm text-gray-600">Destinos disponibles en este dominio.</p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sections.map((section) =>
            section.current ? (
              <div
                key={section.id}
                className="rounded-xl border border-eafit-200 bg-eafit-50 px-5 py-5"
              >
                <Icon name="file" className="size-5 text-eafit-500" />
                <h3 className="mt-3 font-bold text-gray-900">{section.name}</h3>
                <p className="mt-1 text-sm text-gray-600">{section.description}</p>
                <p className="mt-4 text-sm font-semibold text-gray-500">Sección actual</p>
              </div>
            ) : (
              <Link
                key={section.id}
                to={section.id === 'centro-de-pagos' ? '/centro-de-pagos' : '/estado-de-cuenta'}
                className="rounded-xl border border-gray-200 bg-white px-5 py-5 transition-colors hover:border-eafit-500 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-eafit-400"
              >
                <Icon name="wallet" className="size-5 text-eafit-500" />
                <h3 className="mt-3 font-bold text-gray-900">{section.name}</h3>
                <p className="mt-1 text-sm text-gray-600">{section.description}</p>
                <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-eafit-500">
                  Abrir
                  <Icon name="arrowRight" className="size-4" />
                </p>
              </Link>
            ),
          )}
        </div>
      </section>
    </div>
  )
}

function Fact({ label, value, numeric = false }: { label: string; value: string; numeric?: boolean }) {
  return (
    <div>
      <dt className="text-[11px] font-semibold tracking-[0.1em] text-gray-500 uppercase">
        {label}
      </dt>
      <dd className={`mt-1 font-semibold text-gray-900 ${numeric ? 'tabular-nums' : ''}`}>
        {value}
      </dd>
    </div>
  )
}
