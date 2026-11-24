import { Link } from 'react-router-dom'
import { getActivities } from '../data.js'
import ActivityCarousel from '../components/ActivityCarousel.jsx'

export default function Inicio() {
  const activities = getActivities()

  return (
    <main>
      <section className="hero kratos-hero">
        <p className="eyebrow">ACTIVIDAD · CONSTANCIA · BIENESTAR</p>
        <h1>Entrena con intención.<br /><span>Supera tus límites.</span></h1>
        <p>Descubre actividades, construye hábitos y organiza tu entrenamiento con KRATOS. Tu progreso empieza con una decisión.</p>
        <div className="hero-actions">
          <Link className="button" to="/actividades">Explorar actividades <span aria-hidden="true">→</span></Link>
          <Link className="hero-secondary-link" to="/planificacion">Organizar mi semana</Link>
        </div>
        <div className="hero-trust-row">
          <span><b>01</b> Encuentra tu actividad</span>
          <span><b>02</b> Define tu ritmo</span>
          <span><b>03</b> Mantén la constancia</span>
        </div>
      </section>

      <section className="container home-featured-section">
        <ActivityCarousel activities={activities} />
      </section>

      <section className="kratos-benefits">
        <div className="container">
          <span className="section-kicker">TU ENTRENAMIENTO, TU CAMINO</span>
          <h2>Más que entrenar.<br /><span>Construir bienestar.</span></h2>
          <div className="benefit-grid">
            <article><span className="benefit-number">01</span><h3>Explora</h3><p>Elige entre actividades para distintos niveles y objetivos.</p></article>
            <article><span className="benefit-number">02</span><h3>Planifica</h3><p>Organiza tu semana y convierte tus metas en hábitos.</p></article>
            <article><span className="benefit-number">03</span><h3>Avanza</h3><p>Encuentra un ritmo sostenible y sigue construyendo tu progreso.</p></article>
          </div>
        </div>
      </section>
    </main>
  )
}
