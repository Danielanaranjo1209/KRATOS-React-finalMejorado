import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import RutaProtegida from './components/RutaProtegida.jsx'
import Inicio from './pages/Inicio.jsx'
import Actividades from './pages/Actividades.jsx'
import ActividadDetalle from './pages/ActividadDetalle.jsx'
import Planificacion from './pages/Planificacion.jsx'
import Contacto from './pages/Contacto.jsx'
import Login from './pages/Login.jsx'
import Administracion from './pages/Administracion.jsx'
import SinAcceso from './pages/SinAcceso.jsx'
import NoEncontrado from './pages/NoEncontrado.jsx'
export default function App(){return <><Navbar/><Routes>
<Route path="/" element={<Inicio/>}/>
<Route path="/actividades" element={<Actividades/>}/>
<Route path="/actividades/:id" element={<ActividadDetalle/>}/>
<Route path="/login" element={<Login/>}/>
<Route path="/sin-acceso" element={<SinAcceso/>}/>
<Route path="/planificacion" element={<RutaProtegida><Planificacion/></RutaProtegida>}/>
<Route path="/contacto" element={<RutaProtegida><Contacto/></RutaProtegida>}/>
<Route path="/admin" element={<RutaProtegida roles={['administrador']}><Administracion/></RutaProtegida>}/>
<Route path="*" element={<NoEncontrado/>}/>
</Routes><footer className="footer">KRATOS · Proyecto académico</footer></>}

