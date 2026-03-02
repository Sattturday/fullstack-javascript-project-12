import { Navigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import routes from '../routes'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return null
  }

  if (!isAuthenticated) {
    return <Navigate to={routes.login} replace />
  }

  return children
}

export default ProtectedRoute
