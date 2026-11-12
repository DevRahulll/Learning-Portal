import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Login from "./pages/Login"
import MainLayout from "./components/layout/MainLayout"
import { AuthenticatedUser, ProtectedRoute } from "./components/ProtectedRoutes"
import Profile from "./pages/student/Profile"
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <>{/* Hero section and courses */}</>,
      },
      {
        path: "login",
        element: (
          <AuthenticatedUser>
            <Login />
          </AuthenticatedUser>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
    ],
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
