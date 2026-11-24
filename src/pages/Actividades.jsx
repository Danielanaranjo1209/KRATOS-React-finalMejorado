import { useMemo, useState } from 'react'
import { getActivities } from '../data.js'
import ActivityCard from '../components/ActivityCard.jsx'
import PageTitle from '../components/PageTitle.jsx'

export default function Actividades() {
  const [level, setLevel] = useState('Todas')
  const activities = useMemo(() => getActivities(), [])
  const filtered = level === 'Todas' ? activities : activities.filter(item => item.level === level)

  return (
    <main className="container activities-page">
      <PageTitle title="Actividades" description="Encuentra una actividad adecuada para tu nivel y consulta sus detalles." />
      <div className="activities-toolbar">
        <label className="filter">Nivel:
          <select value={level} onChange={event => setLevel(event.target.value)}>
            <option>Todas</option><option>Principiante</option><option>Intermedio</option><option>Avanzado</option>
          </select>
        </label>
        <span className="activities-count">{filtered.length} actividades disponibles</span>
      </div>
      <div className="grid activities-grid">
        {filtered.map(item => <ActivityCard key={item.id} activity={item} />)}
      </div>
      {!filtered.length && <p className="muted">No hay actividades para este nivel.</p>}
    </main>
  )
}
