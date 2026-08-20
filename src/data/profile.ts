// Profile data from the Personal Details, Contact Details and Addresses captures.
//
// Identifiers are masked because this is coursework on a public repository.
//
// Two defects of the original are corrected in the data itself:
//  - the full name appeared twice, as identical "Primary" and "Preferred" rows
//  - the same phone was stored twice, as "573054507294" and "305/450-7294"

export type ContactEmail = { address: string; kind: string; primary: boolean }
export type ContactPhone = { number: string; kind: string; primary: boolean }
export type Address = { id: string; label: string; city: string | null; line: string | null }

export const personal = {
  fullName: 'JUAN ANDRÉS YOUNG HOYOS',
  maskedId: '1000••••97',
  maskedBirthDate: '••/••/2005',
  documentType: 'Cédula de ciudadanía',
  maskedDocument: '••••••3097',
  note: 'Datos enmascarados por tratarse de un ejercicio de curso. El nombre se muestra una sola vez.',
}

export const emails: ContactEmail[] = [
  { address: 'jayoungh@eafit.edu.co', kind: 'Institucional', primary: true },
  { address: 'juanandresyounghoyos@gmail.com', kind: 'Personal', primary: false },
]

export const emailsNote =
  'Unificado: este correo personal estaba registrado dos veces con tipos distintos. Ahora aparece una sola vez, como Personal.'

export const phones: ContactPhone[] = [
  { number: '+57 305 ••• ••94', kind: 'Móvil', primary: true },
]

export const phonesNote =
  'Unificado: el mismo número estaba registrado dos veces con formatos distintos. Ahora aparece una sola vez, con un formato consistente para Colombia.'

export const addresses: Address[] = [
  { id: 'residencia', label: 'Residencia', city: 'Envigado, Antioquia', line: 'Calle •• # ••–••' },
  { id: 'correspondencia', label: 'Correspondencia', city: null, line: null },
  { id: 'laboral', label: 'Laboral', city: null, line: null },
]
