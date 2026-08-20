import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router'
import { Button } from '../components/ui/Button'
import { Icon } from '../lib/icons'
import { campuses, nationalLine, whatsapp } from '../data/campuses'

/**
 * The original reads "Welcome to Epik!" in English at a Colombian university, on a
 * flat #CCCCCC card, with a #0D7EEF button that is not the institutional blue.
 *
 * NOTHING IS AUTHENTICATED HERE. The password never leaves the component, is never
 * stored and is never sent anywhere: this is a prototype on a public URL, and a
 * branded form that appears to accept real credentials would be indistinguishable
 * from a phishing page. Hence the notice above the form.
 */
export function Login() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({})

  function submit(event: FormEvent) {
    event.preventDefault()
    const next: typeof errors = {}
    if (!username.trim()) next.username = 'Escribe tu usuario para continuar.'
    if (!password) next.password = 'Escribe tu contraseña para continuar.'
    setErrors(next)
    if (Object.keys(next).length === 0) navigate('/')
  }

  return (
    <div className="flex min-h-dvh flex-col bg-gray-50">
      <header className="flex h-16 items-center justify-between bg-eafit-500 px-4 lg:px-8">
        <span className="leading-none">
          <span className="block text-[10px] font-medium tracking-[0.22em] text-white/80">
            UNIVERSIDAD
          </span>
          <span className="block text-xl font-extrabold tracking-tight text-white">EAFIT</span>
        </span>
        <button className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm text-white/90 hover:bg-white/10 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-oro-500">
          <Icon name="languages" className="size-4" />
          Español
          <Icon name="chevronDown" className="size-4" />
        </button>
      </header>

      <main className="flex flex-1 items-center justify-center px-4 py-14">
        <div className="w-full max-w-md">
          {/* The prototype must never be mistaken for the real portal */}
          <p className="mb-4 flex gap-2.5 rounded-lg border border-oro-500 bg-oro-300/25 px-4 py-3 text-sm text-gray-800">
            <Icon name="help" className="mt-0.5 size-4 shrink-0 text-oro-900" />
            <span>
              <strong className="font-semibold">Prototipo del curso Interacción Humano–Computador.</strong>{' '}
              No es el portal real de EAFIT: no valida credenciales y no envía ningún dato. Escribe
              cualquier cosa para entrar.
            </span>
          </p>

          <form
            onSubmit={submit}
            noValidate
            className="rounded-xl bg-white px-7 py-8 shadow-[0_12px_40px_rgb(0_26_48_/_0.10)]"
          >
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">Ingresa a EPIK</h1>

            <div className="mt-6 flex flex-col gap-1.5">
              <label htmlFor="usuario" className="text-sm font-semibold text-gray-900">
                Usuario
              </label>
              <input
                id="usuario"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                autoComplete="username"
                aria-invalid={Boolean(errors.username)}
                aria-describedby={errors.username ? 'error-usuario' : undefined}
                className={`rounded-lg border bg-white px-3.5 py-2.5 text-sm text-gray-900 focus:outline-3 focus:outline-offset-1 focus:outline-eafit-100 ${
                  errors.username ? 'border-error' : 'border-gray-500 focus:border-eafit-400'
                }`}
              />
              {errors.username && <FieldError id="error-usuario">{errors.username}</FieldError>}
            </div>

            <div className="mt-5 flex flex-col gap-1.5">
              <label htmlFor="contrasena" className="text-sm font-semibold text-gray-900">
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="contrasena"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={errors.password ? 'error-contrasena' : undefined}
                  className={`w-full rounded-lg border bg-white py-2.5 pr-11 pl-3.5 text-sm text-gray-900 focus:outline-3 focus:outline-offset-1 focus:outline-eafit-100 ${
                    errors.password ? 'border-error' : 'border-gray-500 focus:border-eafit-400'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                  className="absolute top-1/2 right-2 grid size-8 -translate-y-1/2 place-items-center rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-eafit-400"
                >
                  <Icon name="search" className="size-4" />
                </button>
              </div>
              {errors.password && <FieldError id="error-contrasena">{errors.password}</FieldError>}
            </div>

            <p className="mt-3">
              <button
                type="button"
                className="rounded text-sm font-medium text-eafit-500 hover:underline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-eafit-400"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </p>

            <div className="mt-6">
              <Button type="submit" className="w-full">
                Ingresar
              </Button>
            </div>

            <p className="mt-5 text-center text-sm text-gray-600">
              ¿No tienes cuenta?{' '}
              <button
                type="button"
                className="rounded font-semibold text-eafit-500 hover:underline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-eafit-400"
              >
                Crear cuenta
              </button>
            </p>
          </form>
        </div>
      </main>

      <footer className="bg-gray-900 px-4 py-10 text-white lg:px-8">
        <div className="mx-auto max-w-[1180px]">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="text-lg font-bold">Nuestras sedes</h2>
            <p className="text-sm text-white/80">
              <span className="font-semibold text-white">Línea nacional:</span>{' '}
              <span className="tabular-nums">{nationalLine}</span>
              <span className="mx-3 text-white/40">|</span>
              <span className="font-semibold text-white">WhatsApp:</span>{' '}
              <span className="tabular-nums">{whatsapp}</span>
            </p>
          </div>

          <hr className="my-6 border-white/15" />

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {campuses.map((campus) => (
              <section key={campus.id}>
                <h3 className="font-bold">{campus.name}</h3>
                <p className="mt-2 text-sm text-white/75">{campus.address}</p>
                {campus.lines.map((line) => (
                  <p key={line} className="mt-1 text-sm tabular-nums text-white/75">
                    {line}
                  </p>
                ))}
                {campus.email && (
                  <p className="mt-1 text-sm text-white/75">Correo: {campus.email}</p>
                )}
              </section>
            ))}
          </div>

          <hr className="my-6 border-white/15" />

          <div className="flex flex-wrap items-center justify-between gap-4">
            <button className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-4 py-2.5 text-sm font-medium hover:bg-white/10 focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-oro-500">
              <Icon name="arrowRight" className="size-4 rotate-180" />
              Ir al portal principal
            </button>
            <p className="flex flex-wrap gap-x-4 text-sm text-white/75">
              <span>Política de protección de datos</span>
              <span className="text-white/40">|</span>
              <span>Contáctanos</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p id={id} role="alert" className="text-xs font-medium text-error">
      {children}
    </p>
  )
}
