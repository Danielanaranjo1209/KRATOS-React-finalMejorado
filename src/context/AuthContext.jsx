import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)
const USUARIOS = [
  { usuario: 'kratosadmin', clave: 'Admin123', nombre: 'Administrador KRATOS', rol: 'administrador' },
  { usuario: 'kratosuser', clave: 'User123', nombre: 'Usuario KRATOS', rol: 'usuario' }
]
const KEY = 'kratos-sesion'

export function AuthProvider({ children }) {
  const [sesion, setSesion] = useState(() => {
    try { return JSON.parse(sessionStorage.getItem(KEY)) } catch { return null }
  })
  useEffect(() => {
    if (sesion) sessionStorage.setItem(KEY, JSON.stringify(sesion))
    else sessionStorage.removeItem(KEY)
  }, [sesion])
  const iniciarSesion = (usuario, clave) => {
    const encontrado = USUARIOS.find(u => u.usuario === usuario.trim() && u.clave === clave)
    if (!encontrado) return false
    setSesion({ nombre: encontrado.nombre, usuario: encontrado.usuario, rol: encontrado.rol })
    return true
  }
  const cerrarSesion = () => setSesion(null)
  return <AuthContext.Provider value={{ sesion, iniciarSesion, cerrarSesion }}>{children}</AuthContext.Provider>
}
export function useAuth() {
  const value = useContext(AuthContext)
  if (!value) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return value
}
