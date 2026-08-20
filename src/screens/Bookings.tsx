import { useState } from 'react'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Field, Input, Select } from '../components/ui/Field'
import { PageHeader } from '../components/ui/PageHeader'
import { EmptyState } from '../components/ui/EmptyState'
import { Icon } from '../lib/icons'
import { student } from '../data/student'

/**
 * The original form stacks fourteen fields in a flat list, mixes "Guardar" with
 * "Clear" and "Continue" on the same screen, and exposes "Class Nbr", abbreviated
 * internal jargon, among Spanish labels.
 *
 * Here the fields are grouped into blocks of four or fewer (Miller's law), with a
 * wider gap between blocks than within them (proximity), and a single action bar,
 * all in Spanish.
 */
export function Bookings() {
  const [tab, setTab] = useState<'nueva' | 'mias'>('nueva')

  return (
    <div className="mx-auto max-w-[1180px] px-4 py-8 lg:px-8">
      <PageHeader breadcrumb="Trámites › Reserva de espacios" title="Nueva reserva" />

      <div className="-mt-4 mb-6 flex gap-1 border-b border-gray-200">
        {(
          [
            ['nueva', 'Nueva reserva'],
            ['mias', 'Mis reservas'],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            aria-current={tab === id ? 'page' : undefined}
            className={`-mb-px border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-eafit-400 ${
              tab === id
                ? 'border-eafit-500 text-eafit-500'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 'mias' ? (
        <Card>
          <EmptyState
            icon="calendarCheck"
            title="Aún no tienes reservas"
            body="Cuando confirmes una reserva, aquí aparecerá con su espacio, fecha y hora para que puedas consultarla o cancelarla."
            action={<Button onClick={() => setTab('nueva')}>Crear una reserva</Button>}
          />
        </Card>
      ) : (
        <>
          <Card className="space-y-8 px-6 py-7 sm:px-8">
            <Group title="Qué necesitas">
              <Field label="Tipo de instalación" required>
                {(id) => (
                  <Select id={id} defaultValue="">
                    <option value="" disabled>
                      Selecciona una opción
                    </option>
                  </Select>
                )}
              </Field>
              <Field label="Tipo de reserva" required>
                {(id) => (
                  <Select id={id} defaultValue="Reserva">
                    <option>Reserva</option>
                  </Select>
                )}
              </Field>
              <Field label="Descripción" required>
                {(id) => <Input id={id} placeholder="Describe brevemente el uso del espacio" />}
              </Field>
              <Field label="Característica">
                {(id) => <Input id={id} placeholder="Buscar característica" />}
              </Field>
            </Group>

            <Group title="Cuándo">
              <Field label="Fecha de la reserva" required>
                {(id) => <Input id={id} type="date" />}
              </Field>
              <Field label="Hora de inicio" required>
                {(id) => <Input id={id} type="time" />}
              </Field>
              <Field label="Hora de fin" required>
                {(id) => <Input id={id} type="time" />}
              </Field>
              <label className="flex items-center gap-2.5 self-end pb-2.5 text-sm text-gray-900">
                <input
                  type="checkbox"
                  className="size-4 rounded border-gray-500 accent-eafit-500"
                />
                Es una reserva recurrente
              </label>
            </Group>

            <Group title="Dónde y para cuántos">
              <Field label="Ubicación" required>
                {(id) => <Input id={id} placeholder="Buscar ubicación" />}
              </Field>
              <Field label="Capacidad" required>
                {(id) => <Input id={id} type="number" min={1} placeholder="Número de personas" />}
              </Field>
            </Group>

            <Group title="A nombre de quién">
              <Field label="Tipo de responsable" required>
                {(id) => (
                  <Select id={id} defaultValue="A nombre propio">
                    <option>A nombre propio</option>
                  </Select>
                )}
              </Field>
              <div className="flex flex-col gap-1.5">
                <span className="text-sm font-semibold text-gray-900">Responsable</span>
                <p className="rounded-lg bg-gray-50 px-3.5 py-2.5 text-sm text-gray-900">
                  {student.fullName.toUpperCase()}
                </p>
              </div>
              <Field label="Grado académico">
                {(id) => (
                  <Select id={id} defaultValue="">
                    <option value="" disabled>
                      Selecciona una opción
                    </option>
                    <option>{student.level}</option>
                  </Select>
                )}
              </Field>
            </Group>
          </Card>

          {/* A single action bar, all in Spanish */}
          <div className="mt-6 flex flex-wrap justify-end gap-3">
            <Button variant="secondary">Cancelar</Button>
            <Button variant="secondary">Guardar</Button>
            <Button>
              Consultar disponibilidad
              <Icon name="search" className="size-4" />
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-4 border-b border-gray-200 pb-2 text-base font-bold text-eafit-500">
        {title}
      </h2>
      <div className="grid gap-5 sm:grid-cols-2">{children}</div>
    </section>
  )
}
