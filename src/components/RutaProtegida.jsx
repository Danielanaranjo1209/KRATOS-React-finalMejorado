import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function RutaProtegida({ children, roles }) {
  const { sesion } = useAuth()
  const location = useLocation()
  if (!sesion) return <Navigate to="/login" replace state={{ from: location }} />
  if (roles && !roles.includes(sesion.rol)) return <Navigate to="/sin-acceso" replace />
  return children
}
