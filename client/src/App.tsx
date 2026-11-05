import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./pages/Login"

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
])

const App = () => {
  return (
    <main>
      <RouterProvider router={appRouter} />
    </main>
  )
}

export default App
