import type { RouteObject } from 'react-router'
import { Layout } from './components/layout/Layout'
import { Home } from './screens/Home'
import { Schedule } from './screens/Schedule'
import { Grades } from './screens/Grades'
import { Account } from './screens/Account'
import { Certificates } from './screens/Certificates'
import { Admissions } from './screens/Admissions'
import { Profile } from './screens/Profile'
import { MonitorProfile } from './screens/MonitorProfile'
import { Documents } from './screens/Documents'
import { Bookings } from './screens/Bookings'
import { PaymentCenter } from './screens/PaymentCenter'
import { TeacherEvaluation } from './screens/TeacherEvaluation'
import { NotFound } from './screens/NotFound'
import { Login } from './screens/Login'

/**
 * Single route table. Each screen lives in its own file so a branch per screen
 * touches nothing shared and merges never collide.
 */
export const routes: RouteObject[] = [
  { path: '/ingreso', element: <Login /> },
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'horario', element: <Schedule /> },
      { path: 'notas', element: <Grades /> },
      { path: 'estado-de-cuenta', element: <Account /> },
      { path: 'certificados', element: <Certificates /> },
      { path: 'inscripciones', element: <Admissions /> },
      { path: 'perfil', element: <Profile /> },
      { path: 'perfil-monitor', element: <MonitorProfile /> },
      { path: 'documentos', element: <Documents /> },
      { path: 'reservas', element: <Bookings /> },
      { path: 'centro-de-pagos', element: <PaymentCenter /> },
      { path: 'evaluacion-docente', element: <TeacherEvaluation /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]
