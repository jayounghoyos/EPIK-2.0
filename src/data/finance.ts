// The real portal answers "You have no outstanding charges at this time."
// The balance is therefore zero. No amount, instalment or due date is invented.

export const balance = {
  amount: 0,
  currency: 'COP',
  title: 'No tienes pagos pendientes',
  body: 'A la fecha no hay cargos por pagar en tu estado de cuenta. Si se genera un cargo nuevo, aparecerá en esta pantalla.',
} as const

/** The five sections the current portal lists in its sidebar, in Spanish. */
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
