import { useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login() {
  const [usuario, setUsuario] = useState('')
  const [clave, setClave] = useState('')
  const [error, setError] = useState('')
  const { iniciarSesion } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const entrar = e => {
    e.preventDefault()
    if (iniciarSesion(usuario, clave)) navigate(location.state?.from?.pathname || '/planificacion', { replace: true })
    else setError('Usuario o contraseña incorrectos. Revisa las credenciales de demostración.')
  }
  return <main className="container auth-page"><section className="panel auth-panel">
    <span className="section-kicker">ACCESO A KRATOS</span><h1>Inicia sesión</h1><p>Ingresa con uno de los usuarios definidos para la demostración.</p>
    <form className="auth-form" onSubmit={entrar}>
      <label>Usuario<input autoComplete="username" value={usuario} onChange={e=>setUsuario(e.target.value)} required /></label>
      <label>Contraseña<input type="password" autoComplete="current-password" value={clave} onChange={e=>setClave(e.target.value)} required /></label>
      {error && <p className="auth-error" role="alert">{error}</p>}<button className="button" type="submit">Ingresar</button>
    </form>
    <div className="demo-credentials"><strong>Credenciales de prueba</strong><p>Administrador: <code>kratosadmin</code> / <code>Admin123</code></p><p>Usuario: <code>kratosuser</code> / <code>User123</code></p></div>
    <Link to="/">Volver al inicio</Link>
  </section></main>
}
