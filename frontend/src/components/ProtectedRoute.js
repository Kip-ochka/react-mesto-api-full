import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children, loggedIn }) => {
  if (!loggedIn) {
    return <Navigate to="sign-in" replace />
  }

  return children
}

export { ProtectedRoute }
