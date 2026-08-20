// The five real documents from the portal's "Anexo documentos" screen.
//
// A status and its note can never contradict each other. The current portal marks
// the first row green "Approved" while its own note says the file does not match
// what was requested. Here that row reads "Con observación".

export type DocumentStatus = 'aprobado' | 'observacion' | 'pendiente'

export type RequiredDocument = {
  id: string
  category: string
  name: string
  file: string | null
  status: DocumentStatus
  note: string
}

export const documents: RequiredDocument[] = [
  {
    id: 'identidad',
    category: 'Documentos Transversales',
    name: 'Documento de identidad',
    file: 'Copia_del_Documento_de_identidad_TI.pdf',
    status: 'observacion',
    note: 'El documento adjunto no corresponde al solicitado. Debe adjuntarse un certificado con membrete y firmas.',
  },
  {
    id: 'notas-bachiller',
    category: 'Documentos Admisión Pregrado',
    name: 'Certificado de notas bachiller',
    file: 'Notas_11.pdf',
    status: 'aprobado',
    note: 'Sin observaciones.',
  },
  {
    id: 'saber-11',
    category: 'Documentos Matrícula Pregrado',
    name: 'Certificado Saber 11',
    file: 'Resultados_ICFES_AC202243235470.pdf',
    status: 'aprobado',
    note: 'Sin observaciones.',
  },
  {
    id: 'acta-grado',
    category: 'Documentos Matrícula Pregrado',
    name: 'Acta de grado bachillerato',
    file: 'Acta_de_grado.pdf',
    status: 'aprobado',
    note: 'Sin observaciones.',
  },
  {
    id: 'cedula',
    category: 'Documentos Transversales',
    name: 'Cédula de ciudadanía',
    file: null,
    status: 'pendiente',
    note: 'Aún no has adjuntado este documento. Es obligatorio para completar tu matrícula.',
  },
]

/** Counts are derived from the data, so they cannot drift out of sync. */
export const counts = {
  total: documents.length,
  aprobados: documents.filter((d) => d.status === 'aprobado').length,
  observacion: documents.filter((d) => d.status === 'observacion').length,
  pendientes: documents.filter((d) => d.status === 'pendiente').length,
}
