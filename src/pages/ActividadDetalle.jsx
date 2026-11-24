
import { Link, useParams } from 'react-router-dom'
import { getActivities } from '../data.js'
import PageTitle from '../components/PageTitle.jsx'
import Tabs from "../components/Tabs";
import Accordion from "../components/Accordion";

export default function ActividadDetalle() {
  const { id } = useParams()
  const activity = getActivities().find(item => item.id === id)

  if (!activity) {
    return (
      <main className="container">
        <PageTitle title="Actividad no encontrada" />
        <Link to="/actividades">Volver</Link>
      </main>
    )
  }

  return (
    <main className="container narrow activity-detail-page">
      <Link className="back-link" to="/actividades">
        ← Volver a actividades
      </Link>

      <PageTitle
        title={activity.name}
        description={activity.description}
      />

      <section className="activity-detail-panel">
        <div className="activity-detail-image">
          <img
            src={activity.image}
            alt={`Referencia de ${activity.name}`}
          />
        </div>

        <div className="activity-detail-info">
          <span className="tag">{activity.level}</span>
          <p><strong>Duración:</strong> {activity.minutes} minutos</p>
          <p className="muted">
            Ajusta la intensidad a tu condición física y realiza un
            calentamiento antes de comenzar.
          </p>
          <Link className="button" to="/planificacion">
            Añadir a mi planificación
          </Link>
        </div>
      </section>

      {/* Aquí integramos las pestañas */}
      <Tabs
        items={[
          {
            titulo: "Descripción",
            contenido: <p>{activity.description}</p>,
          },
          {
            titulo: "Beneficios",
            contenido: (
              <p>
                Esta actividad contribuye a mejorar tu condición física.
              </p>
            ),
          },
          {
            titulo: "Recomendaciones",
            contenido: (
              <p>
                Realiza un calentamiento previo y ajusta la intensidad
                a tu nivel físico.
              </p>
            ),
          },
        ]}
      />
      <section className="panel" style={{ marginTop: '24px', padding: '24px' }}>
  <h2>Preguntas frecuentes</h2>

  <Accordion
    items={[
      {
        pregunta: "¿Cómo debo comenzar?",
        respuesta: "Realiza un calentamiento antes de iniciar la actividad y comienza con una intensidad adecuada a tu nivel."
      },
      {
        pregunta: "¿Cuánto tiempo debo entrenar?",
        respuesta: `La duración sugerida para esta actividad es de ${activity.minutes} minutos. Puedes ajustar la intensidad según tu condición física.`
      },
      {
        pregunta: "¿Qué debo tener en cuenta?",
        respuesta: "Mantén una buena técnica, hidrátate y detén el ejercicio si sientes alguna molestia."
      }
    ]}
  />
</section>
    </main>
  )
}
