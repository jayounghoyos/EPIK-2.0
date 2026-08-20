import { Icon } from '../lib/icons'
import { Button } from '../components/ui/Button'
import { Card, CardHeader } from '../components/ui/Card'
import { student, term, today, finances, admissions } from '../data/student'

export function Home() {
  const progress = Math.round((term.currentWeek / term.totalWeeks) * 100)

  return (
    <div className="mx-auto max-w-[1180px] px-4 py-8 lg:px-8">
      <p className="text-sm text-gray-600">{today.label}</p>
      <h1 className="mt-1 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        Hola, {student.firstName}
      </h1>
      <p className="mt-2 text-sm text-gray-600">
        {student.program} <Dot /> {student.level} <Dot /> {student.campus} <Dot /> ID{' '}
        <span className="tabular-nums">{student.maskedId}</span>
      </p>

      <div className="mt-7 grid gap-5 lg:grid-cols-3">
        {/* Visibility of system status: what is happening today, on the first screen */}
        <Card className="lg:col-span-2">
          <CardHeader
            icon="book"
            title="Clases de hoy"
            aside={`${today.classes.length} clases`}
          />
          <div className="space-y-2.5 px-6">
            {today.classes.map((c) => (
              <article
                key={c.name}
                className="flex gap-4 rounded-lg border-l-3 border-oro-500 bg-gray-50 px-4 py-3.5"
              >
                <p className="w-16 shrink-0 leading-tight">
                  <span className="block text-lg font-bold tabular-nums text-eafit-500">
                    {c.start}
                  </span>
                  <span className="block text-sm tabular-nums text-gray-500">{c.end}</span>
                </p>
                <div className="border-l border-gray-200 pl-4">
                  <h3 className="font-semibold text-gray-900">{c.name}</h3>
                  <p className="mt-0.5 flex items-center gap-1.5 text-sm text-gray-600">
                    <Icon name="pin" className="size-4 text-gray-500" />
                    Salón <span className="tabular-nums">{c.room}</span>
                  </p>
                </div>
              </article>
            ))}
          </div>
          <div className="px-6 pt-5 pb-6">
            <Button withArrow>Ver mi horario completo</Button>
          </div>
        </Card>

        <Card className="h-fit">
          <CardHeader icon="calendar" title="Periodo académico" />
          <div className="px-6 pb-6">
            <p className="font-bold text-gray-900">{term.name}</p>
            <p className="mt-0.5 text-sm tabular-nums text-gray-600">
              {term.startsAt} — {term.endsAt}
            </p>

            <div
              className="mt-4 h-1.5 overflow-hidden rounded-full bg-gray-200"
              role="progressbar"
              aria-valuenow={term.currentWeek}
              aria-valuemin={1}
              aria-valuemax={term.totalWeeks}
              aria-label="Avance del semestre"
            >
              <div className="h-full rounded-full bg-eafit-500" style={{ width: `${progress}%` }} />
            </div>
            <p className="mt-2 text-sm text-gray-600">
              Semana <span className="tabular-nums">{term.currentWeek}</span> de{' '}
              <span className="tabular-nums">{term.totalWeeks}</span>
            </p>

            <hr className="my-5 border-gray-200" />
            <p className="flex items-baseline gap-2">
              <span className="text-2xl font-extrabold tabular-nums text-eafit-500">
                {term.enrolledCourses}
              </span>
              <span className="text-sm text-gray-600">asignaturas inscritas</span>
            </p>
          </div>
        </Card>
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <Card>
          <CardHeader icon="wallet" title="Financiero" />
          <div className="px-6 pb-6">
            {/* The real portal reports no charges, so this reads as a settled state */}
            <div className="flex items-start gap-3 rounded-lg bg-eafit-50 px-4 py-4">
              <Icon name="check" className="size-6 shrink-0 text-eafit-500" />
              <div>
                <p className="font-semibold text-gray-900">{finances.emptyTitle}</p>
                <p className="mt-0.5 text-sm text-gray-600">{finances.emptyBody}</p>
              </div>
            </div>
            <div className="pt-5">
              <Button withArrow>Ver mi estado de cuenta</Button>
            </div>
          </div>
        </Card>

        <Card>
          <CardHeader icon="file" title="Trámites" />
          <div className="px-6 pb-6">
            <div className="flex items-center gap-3 rounded-lg bg-gray-50 px-4 py-4">
              <Icon name="award" className="size-6 shrink-0 text-eafit-500" />
              <p className="font-semibold text-gray-900">Certificados</p>
            </div>
            <div className="pt-5">
              <Button withArrow>Solicitar un certificado</Button>
            </div>
          </div>
        </Card>
      </div>

      <Card className="mt-5">
        <CardHeader icon="clipboard" title="Inscripciones" />
        <div className="grid gap-4 px-6 pb-6 md:grid-cols-2">
          {admissions.map((item) => (
            <article
              key={item.id}
              className="flex items-center gap-3 rounded-lg bg-eafit-50 px-4 py-4"
            >
              <Icon
                name={item.action ? 'languages' : 'graduation'}
                className="size-6 shrink-0 text-eafit-500"
              />
              <div className="min-w-0">
                <h3 className="truncate font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-0.5 truncate text-sm text-gray-600">{item.detail}</p>
              </div>
              <div className="ml-auto shrink-0">
                {item.status && (
                  <span className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-eafit-500">
                    {item.status}
                  </span>
                )}
                {item.action && (
                  <Button withArrow className="px-4 text-xs">
                    {item.action}
                  </Button>
                )}
              </div>
            </article>
          ))}
        </div>
      </Card>
    </div>
  )
}

const Dot = () => <span className="mx-1 text-gray-400">·</span>
