import {
  dayEnd,
  dayStart,
  sessions,
  toMinutes,
  week,
  weekdays,
  type Session,
  type Weekday,
} from '../../data/schedule'

const HOUR_HEIGHT = 64
const hours = Array.from({ length: dayEnd - dayStart + 1 }, (_, i) => dayStart + i)

/**
 * Cada bloque se posiciona por su hora de inicio y su duración, de modo que la
 * altura comunica cuánto dura la clase.
 *
 * Si dos sesiones de un mismo día se solapan, se reparten en carriles paralelos
 * en lugar de encimarse. El portal actual las dibuja una sobre otra hasta que el
 * texto queda ilegible, y ese es el defecto concreto que esta rejilla corrige.
 */
function assignLanes(daySessions: Session[]) {
  const sorted = [...daySessions].sort((a, b) => toMinutes(a.start) - toMinutes(b.start))
  const laneEnds: number[] = []

  return sorted.map((session) => {
    const start = toMinutes(session.start)
    const end = toMinutes(session.end)
    let lane = laneEnds.findIndex((endsAt) => endsAt <= start)
    if (lane === -1) {
      lane = laneEnds.length
      laneEnds.push(end)
    } else {
      laneEnds[lane] = end
    }
    return { session, lane }
  })
}

export function ScheduleGrid() {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[52rem]">
        {/* Encabezado de días */}
        <div className="grid grid-cols-[4rem_repeat(5,1fr)]">
          <div />
          {weekdays.map((day, index) => {
            const isToday = index === week.todayIndex
            return (
              <div
                key={day}
                className={`flex items-center justify-center gap-2 rounded-t-lg py-2.5 text-sm ${
                  isToday ? 'bg-eafit-50 font-bold text-eafit-500' : 'font-semibold text-gray-700'
                }`}
              >
                {day}
                <span className="tabular-nums text-gray-500">{week.dates[index]}</span>
                {isToday && (
                  <span className="rounded bg-eafit-500 px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-white">
                    HOY
                  </span>
                )}
              </div>
            )
          })}
        </div>

        <div className="grid grid-cols-[4rem_repeat(5,1fr)]">
          {/* Columna de horas */}
          <div className="relative" style={{ height: (hours.length - 1) * HOUR_HEIGHT }}>
            {hours.map((hour, i) => (
              <span
                key={hour}
                className="absolute right-3 -translate-y-1/2 text-xs tabular-nums text-gray-500"
                style={{ top: i * HOUR_HEIGHT }}
              >
                {String(hour).padStart(2, '0')}:00
              </span>
            ))}
          </div>

          {weekdays.map((day, dayIndex) => {
            const daySessions = sessions.filter((s) => s.day === (dayIndex as Weekday))
            const placed = assignLanes(daySessions)
            const laneCount = Math.max(1, ...placed.map((p) => p.lane + 1))
            const isToday = dayIndex === week.todayIndex

            return (
              <div
                key={day}
                className={`relative border-l border-gray-200 ${isToday ? 'bg-eafit-50/40' : ''}`}
                style={{ height: (hours.length - 1) * HOUR_HEIGHT }}
              >
                {hours.slice(0, -1).map((hour, i) => (
                  <div
                    key={hour}
                    className="absolute inset-x-0 border-t border-gray-200"
                    style={{ top: i * HOUR_HEIGHT }}
                  />
                ))}

                {/* Cierre: se ve que el día sigue más allá del último bloque */}
                {daySessions.length === 0 && (
                  <p className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-sm text-gray-500">
                    Sin clases
                  </p>
                )}

                {placed.map(({ session, lane }) => {
                  const top =
                    ((toMinutes(session.start) - dayStart * 60) / 60) * HOUR_HEIGHT
                  const height =
                    ((toMinutes(session.end) - toMinutes(session.start)) / 60) * HOUR_HEIGHT
                  return (
                    <article
                      key={`${session.classNumber}-${session.start}`}
                      className="absolute overflow-hidden rounded-r-md border-l-3 border-eafit-500 bg-eafit-100/70 px-3 py-2"
                      style={{
                        top,
                        height: height - 4,
                        left: `calc(${(lane / laneCount) * 100}% + 3px)`,
                        width: `calc(${100 / laneCount}% - 6px)`,
                      }}
                    >
                      <h3 className="text-sm leading-tight font-semibold text-gray-900">
                        {session.name}
                      </h3>
                      <p className="mt-1 text-xs tabular-nums text-eafit-500">
                        {session.start} – {session.end}
                      </p>
                      <p className="mt-0.5 text-xs tabular-nums text-gray-600">
                        Clase {session.classNumber} · {session.room}
                      </p>
                    </article>
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
