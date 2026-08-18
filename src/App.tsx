import { RouterProvider, createBrowserRouter } from 'react-router'
import { routes } from './routes'

// El sitio se publica bajo /EPIK-2.0/ en GitHub Pages.
const router = createBrowserRouter(routes, { basename: '/EPIK-2.0' })

export default function App() {
  return <RouterProvider router={router} />
}
