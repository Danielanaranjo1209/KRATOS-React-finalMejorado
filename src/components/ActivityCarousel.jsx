import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function ActivityCarousel({ activities = [] }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (paused || activities.length < 2) return undefined
    const interval = window.setInterval(() => {
      setIndex(current => (current + 1) % activities.length)
    }, 5000)
    return () => window.clearInterval(interval)
  }, [paused, activities.length])

  useEffect(() => {
    setIndex(current => Math.min(current, Math.max(activities.length - 1, 0)))
  }, [activities.length])

  if (!activities.length) {
    return <div className="featured-empty">Todavía no hay actividades para destacar.</div>
  }

  const activity = activities[index]
  const previous = () => setIndex(current => (current - 1 + activities.length) % activities.length)
  const next = () => setIndex(current => (current + 1) % activities.length)

  return (
    <section className="kratos-featured" aria-label="Actividades destacadas">
      <div className="kratos-featured-heading">
        <div>
          <span className="section-kicker">ENTRENA CON PROPÓSITO</span>
          <h2>Encuentra tu próximo reto.</h2>
          <p>Explora entrenamientos para cada nivel y avanza a tu ritmo.</p>
        </div>
        <span className="featured-counter" aria-live="polite">
          {String(index + 1).padStart(2, '0')} <span>/ {String(activities.length).padStart(2, '0')}</span>
        </span>
      </div>

      <div className="kratos-featured-stage" aria-live="polite" aria-atomic="true">
        <article className="kratos-featured-slide" key={activity.id}>
          <div className="kratos-featured-visual">
            <img src={activity.image} alt={`Imagen de referencia: ${activity.name}`} />
            <span className="featured-level">{activity.level}</span>
            <span className="featured-visual-label">KRATOS <b>TRAINING</b></span>
          </div>
          <div className="kratos-featured-info">
            <span className="featured-category">ACTIVIDAD DESTACADA</span>
            <h3>{activity.name}</h3>
            <p>{activity.description}</p>
            <div className="featured-meta">
              <span><strong>{activity.minutes}</strong> min</span>
              <span>Plan de entrenamiento</span>
            </div>
            <Link className="button" to={`/actividades/${activity.id}`}>Conocer actividad <span aria-hidden="true">→</span></Link>
          </div>
        </article>
      </div>

      <div className="kratos-featured-controls">
        <button type="button" className="button button-outline" onClick={previous} aria-label="Actividad anterior">← Anterior</button>
        <div className="kratos-featured-dots" aria-label="Seleccionar actividad">
          {activities.map((item, dotIndex) => (
            <button
              key={item.id}
              type="button"
              className={`featured-dot ${dotIndex === index ? 'is-active' : ''}`}
              onClick={() => setIndex(dotIndex)}
              aria-label={`Mostrar ${item.name}`}
              aria-current={dotIndex === index ? 'true' : undefined}
            />
          ))}
        </div>
        <button type="button" className="button button-outline" onClick={next} aria-label="Actividad siguiente">Siguiente →</button>
      </div>
      <div className="kratos-featured-autoplay">
        <button type="button" className="link-button" onClick={() => setPaused(value => !value)} aria-pressed={paused}>
          {paused ? '▶ Reanudar presentación automática' : 'Ⅱ Pausar presentación automática'}
        </button>
        <span>{paused ? 'Presentación pausada' : 'Cambio automático cada 5 segundos'}</span>
      </div>
    </section>
  )
}
