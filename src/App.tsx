import { RouterProvider, createBrowserRouter } from 'react-router'
import { routes } from './routes'

// The site is published under /EPIK-2.0/ on GitHub Pages.
const router = createBrowserRouter(routes, { basename: '/EPIK-2.0' })

export default function App() {
  return <RouterProvider router={router} />
}
