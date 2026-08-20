import { Button } from '../components/ui/Button'
import { Card, CardHeader } from '../components/ui/Card'
import { PageHeader } from '../components/ui/PageHeader'
import { Table, Th, Td, Tr } from '../components/ui/Table'
import { Icon } from '../lib/icons'
import { addresses, emails, emailsNote, personal, phones, phonesNote } from '../data/profile'

/**
 * One pattern for adding, everywhere. The original uses three on a single screen:
 * a "+" icon button for Home, and text buttons "Add Mail" and "Add Business" for
 * the other two.
 */
export function Profile() {
  return (
    <div className="mx-auto max-w-[1180px] px-4 py-8 lg:px-8">
      <PageHeader
        breadcrumb="Menú de usuario › Mi perfil"
        title="Mi perfil"
        meta="Consulta tus datos personales, tus datos de contacto y tus direcciones."
      />

      <Card>
        <CardHeader icon="clipboard" title="Datos personales" />
        <div className="px-6 pb-6">
          <dl className="grid gap-6 sm:grid-cols-2">
            <Fact label="Nombre completo" value={personal.fullName} />
            <Fact label="ID" value={personal.maskedId} numeric />
            <Fact label="Fecha de nacimiento" value={personal.maskedBirthDate} numeric />
            <Fact
              label="Documento"
              value={`${personal.documentType} ${personal.maskedDocument}`}
            />
          </dl>
          <Note>{personal.note}</Note>
        </div>
      </Card>

      <Card className="mt-5">
        <CardHeader
          icon="file"
          title="Correos"
          aside={
            <Button variant="secondary">
              <Icon name="clip" className="size-4" />
              Añadir
            </Button>
          }
        />
        <Table caption="Correos registrados">
          <thead>
            <tr>
              <Th>Correo</Th>
              <Th>Tipo</Th>
              <Th>Principal</Th>
            </tr>
          </thead>
          <tbody>
            {emails.map((email) => (
              <Tr key={email.address}>
                <Td>{email.address}</Td>
                <Td>{email.kind}</Td>
                <Td>{email.primary ? <Yes /> : <Dash />}</Td>
              </Tr>
            ))}
          </tbody>
        </Table>
        <div className="px-6 pt-4 pb-6">
          <Note>{emailsNote}</Note>
        </div>
      </Card>

      <Card className="mt-5">
        <CardHeader
          icon="file"
          title="Teléfonos"
          aside={
            <Button variant="secondary">
              <Icon name="clip" className="size-4" />
              Añadir
            </Button>
          }
        />
        <Table caption="Teléfonos registrados">
          <thead>
            <tr>
              <Th>Teléfono</Th>
              <Th>Tipo</Th>
              <Th>Principal</Th>
            </tr>
          </thead>
          <tbody>
            {phones.map((phone) => (
              <Tr key={phone.number}>
                <Td numeric>{phone.number}</Td>
                <Td>{phone.kind}</Td>
                <Td>{phone.primary ? <Yes /> : <Dash />}</Td>
              </Tr>
            ))}
          </tbody>
        </Table>
        <div className="px-6 pt-4 pb-6">
          <Note>{phonesNote}</Note>
        </div>
      </Card>

      <Card className="mt-5">
        <CardHeader icon="pin" title="Direcciones" />
        <div className="space-y-3 px-6 pb-6">
          {addresses.map((address) => (
            <article
              key={address.id}
              className="flex flex-wrap items-center gap-4 rounded-lg border border-gray-200 px-5 py-4"
            >
              <div className="min-w-48 flex-1">
                <p className="text-[11px] font-semibold tracking-[0.1em] text-gray-500 uppercase">
                  {address.label}
                </p>
                {address.city ? (
                  <>
                    <p className="mt-1 font-semibold text-gray-900">{address.city}</p>
                    <p className="text-sm text-gray-600">{address.line}</p>
                  </>
                ) : (
                  <p className="mt-1 text-sm text-gray-500">Sin definir</p>
                )}
              </div>
              {!address.city && (
                <Button variant="secondary">
                  <Icon name="clip" className="size-4" />
                  Añadir
                </Button>
              )}
            </article>
          ))}
        </div>
      </Card>
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

const Note = ({ children }: { children: React.ReactNode }) => (
  <p className="mt-5 flex gap-2.5 rounded-lg bg-eafit-50 px-4 py-3 text-sm text-gray-700">
    <Icon name="check" className="mt-0.5 size-4 shrink-0 text-eafit-500" />
    {children}
  </p>
)

const Yes = () => (
  <span className="inline-flex items-center gap-1.5 font-semibold text-eafit-500">
    <Icon name="check" className="size-4" />
    Sí
  </span>
)

const Dash = () => <span className="text-gray-500">—</span>
