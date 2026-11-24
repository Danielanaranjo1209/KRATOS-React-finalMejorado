import { Link } from 'react-router-dom'

export default function ActivityCard({ activity }) {
  return (
    <article className="card activity-list-card">
      <div className="activity-card-image-wrap">
        <img className="activity-image" src={activity.image} alt={`Referencia de ${activity.name}`} loading="lazy" />
      </div>
      <span className="tag">{activity.level}</span>
      <h3>{activity.name}</h3>
      <p>{activity.description}</p>
      <div className="card-footer">
        <span>{activity.minutes} minutos</span>
        <Link to={`/actividades/${activity.id}`}>Ver detalle <span aria-hidden="true">→</span></Link>
      </div>
    </article>
  )
}
