// Campus contact details as printed in the footer of the real login page.

export type Campus = {
  id: string
  name: string
  address: string
  lines: string[]
  email?: string
}

export const nationalLine = '01 8000 515 900'
export const whatsapp = '(57) 310 899 2908'

export const campuses: Campus[] = [
  {
    id: 'medellin',
    name: 'EAFIT Medellín',
    address: 'Carrera 49 N° 7 Sur-50',
    lines: [`Línea nacional: ${nationalLine}`, 'Conmutador: (57) 604 2619500'],
  },
  {
    id: 'pereira',
    name: 'EAFIT Pereira',
    address: 'Carrera 19 #12-70 Megacentro Pinares',
    lines: ['Conmutador: (57) 606 3214115, (57) 606 3214119'],
    email: 'eafit.pereira@eafit.edu.co',
  },
  {
    id: 'bogota',
    name: 'EAFIT Bogotá',
    address: 'Carrera 15 #88-64 oficina 401',
    lines: ['Conmutador: (57) 601 6114618'],
    email: 'eafit.bogota@eafit.edu.co',
  },
  {
    id: 'llanogrande',
    name: 'EAFIT Llanogrande',
    address: 'Km 3.5 vía Don Diego – Rionegro',
    lines: ['Conmutador: (57) 604 2619500, ext. 9188'],
    email: 'llanogrande@eafit.edu.co',
  },
]
