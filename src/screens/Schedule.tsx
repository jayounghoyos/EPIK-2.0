import { Card, CardHeader } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Table, Th, Td, Tr } from '../components/ui/Table'
import { ScheduleGrid } from '../components/schedule/ScheduleGrid'
import { Icon } from '../lib/icons'
import { student, term } from '../data/student'
import { courses, dayEnd, dayStart, sessionCount, week, weeklyHours } from '../data/schedule'

export function Schedule() {
  return (
    <div className="mx-auto max-w-[1180px] px-4 py-8 lg:px-8">
      {/* Un solo nombre para la acción: nunca CHANGE, Cambiar y CAMBIAR a la vez */}
      <Card className="mb-7 flex flex-wrap items-center justify-between gap-4 px-6 py-5">
        <div>
          <p className="text-[11px] font-semibold tracking-[0.1em] text-gray-500 uppercase">
            Periodo académico
          </p>
          <p className="mt-1 font-bold text-gray-900">
            {term.name} · {student.level} · {term.enrolledCourses} asignaturas
          </p>
        </div>
        <Button variant="secondary">
          Cambiar periodo
          <Icon name="chevronDown" className="size-4" />
        </Button>
      </Card>

      <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Mi horario</h1>
      <p className="mt-1 text-sm text-gray-600">{week.label}</p>

      <Card className="mt-6">
        <CardHeader
          icon="calendar"
          title="Horario semanal"
          aside={
            <span className="tabular-nums">
              {String(dayStart).padStart(2, '0')}:00 – {dayEnd}:00
            </span>
          }
        />
        <p className="-mt-2 px-6 pb-4 text-sm text-gray-600">
          <span className="tabular-nums">{sessionCount}</span> sesiones ·{' '}
          <span className="tabular-nums">{weeklyHours}</span> horas de clase a la semana
        </p>
        <div className="px-6 pb-6">
          <ScheduleGrid />
        </div>
      </Card>

      <Card className="mt-5">
        <CardHeader icon="book" title="Asignaturas inscritas" />
        <p className="-mt-2 px-6 pb-4 text-sm text-gray-600">
          {term.enrolledCourses} asignaturas · todas presenciales, en español, sede Poblado · del{' '}
          <span className="tabular-nums">{term.startsAt}</span> al{' '}
          <span className="tabular-nums">{term.endsAt}</span>
        </p>

        <Table caption="Asignaturas inscritas en el periodo actual">
          <thead>
            <tr>
              <Th>Asignatura</Th>
              <Th>Código</Th>
              <Th>Clase</Th>
              <Th align="right">Créditos</Th>
              <Th>Docente</Th>
              <Th>Salón</Th>
              <Th>Horario</Th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <Tr key={course.code}>
                <Td>
                  <span className="font-semibold">{course.name}</span>
                </Td>
                <Td numeric>{course.code}</Td>
                <Td numeric>{course.classNumber}</Td>
                <Td align="right" numeric>
                  {course.credits ?? <span className="text-gray-500">—</span>}
                </Td>
                <Td>{course.teacher ?? <span className="text-gray-500">—</span>}</Td>
                <Td numeric>{course.rooms}</Td>
                <Td>
                  <span className="block">{course.days}</span>
                  <span className="block tabular-nums text-gray-600">{course.time}</span>
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>

        {/* Se explica el vacío en vez de rellenarlo con un número inventado */}
        <div className="m-6 space-y-2 rounded-lg bg-gray-50 px-4 py-4 text-sm text-gray-700">
          <p className="flex gap-2.5">
            <Icon name="check" className="mt-0.5 size-4 shrink-0 text-gray-500" />
            Los créditos de SI4005 y SI4006 no están disponibles en el sistema. Por eso esas celdas
            aparecen con un guion y no se muestra un total de créditos.
          </p>
          <p className="flex gap-2.5">
            <Icon name="file" className="mt-0.5 size-4 shrink-0 text-gray-500" />
            ¿Falta una asignatura o hay un dato incorrecto? Escribe a Registro Académico desde
            Trámites.
          </p>
        </div>
      </Card>
    </div>
  )
}
