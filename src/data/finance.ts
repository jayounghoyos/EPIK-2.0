// El portal real responde "You have no outstanding charges at this time."
// Es decir: el saldo es cero. No se inventa ningún monto, cuota ni vencimiento.

export const balance = {
  amount: 0,
  currency: 'COP',
  title: 'No tienes pagos pendientes',
  body: 'A la fecha no hay cargos por pagar en tu estado de cuenta. Si se genera un cargo nuevo, aparecerá en esta pantalla.',
} as const

/** Las cinco secciones que el portal actual lista en su menú lateral, en español. */
export const sections = [
  {
    id: 'estado-de-cuenta',
    name: 'Estado de cuenta',
    description: 'Detalle de los cargos del periodo y el saldo asociado.',
    current: true,
  },
  {
    id: 'centro-de-pagos',
    name: 'Centro de pagos',
    description: 'Punto de pago en línea para los cargos que estén habilitados.',
    current: false,
  },
  {
    id: 'historial',
    name: 'Historial de pagos',
    description: 'Consulta de los pagos ya registrados en tu cuenta.',
    current: false,
  },
  {
    id: 'log',
    name: 'Log de pagos en línea',
    description: 'Registro de las transacciones en línea hechas desde el portal.',
    current: false,
  },
  {
    id: 'financiacion',
    name: 'Extracto de financiación',
    description: 'Detalle del plan de financiación, cuando exista uno vigente.',
    current: false,
  },
] as const
