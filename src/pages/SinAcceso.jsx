import { Link } from 'react-router-dom'
export default function SinAcceso(){return <main className="container"><section className="panel access-denied"><h1>Acceso restringido</h1><p>Tu rol no tiene permisos para consultar esta vista.</p><Link className="button" to="/">Volver al inicio</Link></section></main>}
