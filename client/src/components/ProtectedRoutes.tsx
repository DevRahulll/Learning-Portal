import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((store) => store.auth)

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />
  }

  return children
}

export const AuthenticatedUser = ({ children }) => {
  const { isAuthenticatedUser } = useSelector((store) => store.auth)

  if (!isAuthenticatedUser) {
    return <Navigate to={"/"} />
  }

  return children
}
