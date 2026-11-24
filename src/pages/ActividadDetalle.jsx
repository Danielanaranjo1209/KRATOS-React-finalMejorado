import { Link, useParams } from 'react-router-dom'
import { getActivities } from '../data.js'
import PageTitle from '../components/PageTitle.jsx'

export default function ActividadDetalle() {
  const { id } = useParams()
  const activity = getActivities().find(item => item.id === id)

  if (!activity) return <main className="container"><PageTitle title="Actividad no encontrada" /><Link to="/actividades">Volver</Link></main>

  return (
    <main className="container narrow activity-detail-page">
      <Link className="back-link" to="/actividades">← Volver a actividades</Link>
      <PageTitle title={activity.name} description={activity.description} />
      <section className="activity-detail-panel">
        <div className="activity-detail-image"><img src={activity.image} alt={`Referencia de ${activity.name}`} /></div>
        <div className="activity-detail-info">
          <span className="tag">{activity.level}</span>
          <p><strong>Duración:</strong> {activity.minutes} minutos</p>
          <p className="muted">Ajusta la intensidad a tu condición física y realiza un calentamiento antes de comenzar.</p>
          <Link className="button" to="/planificacion">Añadir a mi planificación</Link>
        </div>
      </section>
    </main>
  )
}
