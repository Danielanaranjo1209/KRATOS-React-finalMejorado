import { useState } from 'react'
import PageTitle from '../components/PageTitle.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { getActivities, getCustomActivities, saveCustomActivities } from '../data.js'

const MAX_IMAGE_BYTES = 8 * 1024 * 1024
const MAX_STORED_IMAGE_BYTES = 650 * 1024

function compressImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('No se pudo leer la imagen.'))
    reader.onload = () => {
      const image = new Image()
      image.onerror = () => reject(new Error('El archivo no es una imagen válida.'))
      image.onload = () => {
        const maxSide = 1200
        const scale = Math.min(1, maxSide / Math.max(image.width, image.height))
        const canvas = document.createElement('canvas')
        canvas.width = Math.round(image.width * scale)
        canvas.height = Math.round(image.height * scale)
        const context = canvas.getContext('2d')
        context.drawImage(image, 0, 0, canvas.width, canvas.height)
        let quality = 0.82
        let dataUrl = canvas.toDataURL('image/jpeg', quality)
        while (dataUrl.length * 0.75 > MAX_STORED_IMAGE_BYTES && quality > 0.48) {
          quality -= 0.08
          dataUrl = canvas.toDataURL('image/jpeg', quality)
        }
        if (dataUrl.length * 0.75 > MAX_STORED_IMAGE_BYTES) {
          reject(new Error('La imagen sigue siendo demasiado pesada. Selecciona una imagen más pequeña.'))
          return
        }
        resolve(dataUrl)
      }
      image.src = reader.result
    }
    reader.readAsDataURL(file)
  })
}

function slugify(value) {
  return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export default function Administracion() {
  const { sesion } = useAuth()
  const [customActivities, setCustomActivities] = useState(() => getCustomActivities())
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [level, setLevel] = useState('Principiante')
  const [minutes, setMinutes] = useState('30')
  const [imageFile, setImageFile] = useState(null)
  const [preview, setPreview] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const allActivities = getActivities()

  async function handleImageChange(event) {
    const file = event.target.files?.[0]
    setError('')
    setMessage('')
    if (!file) return
    if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) {
      setError('Selecciona un archivo de imagen (JPG, PNG o WEBP).')
      event.target.value = ''
      return
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setError('La imagen original debe pesar menos de 8 MB.')
      event.target.value = ''
      return
    }
    try {
      const compressed = await compressImage(file)
      setImageFile(file)
      setPreview(compressed)
    } catch (problem) {
      setError(problem.message || 'No se pudo preparar la imagen.')
      event.target.value = ''
    }
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setMessage('')
    const cleanName = name.trim()
    const cleanDescription = description.trim()
    const duration = Number(minutes)
    if (!cleanName || !cleanDescription || !imageFile || !preview) {
      setError('Completa todos los campos y selecciona una imagen de referencia.')
      return
    }
    if (!Number.isInteger(duration) || duration < 5 || duration > 240) {
      setError('La duración debe estar entre 5 y 240 minutos.')
      return
    }
    const baseId = slugify(cleanName) || 'actividad'
    let id = baseId
    let suffix = 2
    while (allActivities.some(item => item.id === id)) {
      id = `${baseId}-${suffix++}`
    }
    const newActivity = {
      id,
      name: cleanName,
      level,
      minutes: duration,
      description: cleanDescription,
      image: preview,
      custom: true
    }
    const updated = [...customActivities, newActivity]
    try {
      saveCustomActivities(updated)
      setCustomActivities(updated)
      window.dispatchEvent(new Event('kratos-activities-updated'))
      setName('')
      setDescription('')
      setLevel('Principiante')
      setMinutes('30')
      setImageFile(null)
      setPreview('')
      const input = document.getElementById('activity-image-upload')
      if (input) input.value = ''
      setMessage('¡Actividad creada! Ya aparece en la página de actividades y en la presentación principal.')
    } catch {
      setError('No se pudo guardar. El almacenamiento del navegador está lleno; prueba con una imagen más pequeña.')
    }
  }

  function removeActivity(id) {
    const updated = customActivities.filter(item => item.id !== id)
    try {
      saveCustomActivities(updated)
      setCustomActivities(updated)
      window.dispatchEvent(new Event('kratos-activities-updated'))
      setMessage('Actividad eliminada correctamente.')
      setError('')
    } catch {
      setError('No se pudo actualizar el almacenamiento local.')
    }
  }

  return (
    <main className="container admin-page">
      <PageTitle title="Panel de administración" description={`Bienvenida/o, ${sesion?.nombre}. Gestiona las actividades que se muestran en KRATOS.`} />

      <section className="admin-welcome panel">
        <div>
          <span className="section-kicker">ADMINISTRACIÓN DE CONTENIDO</span>
          <h2>Haz crecer tu catálogo de entrenamiento.</h2>
          <p>Registra una actividad con su imagen de referencia. Se guardará en este navegador y se mostrará en el carrusel de inicio y en el catálogo.</p>
        </div>
        <div className="admin-total"><strong>{allActivities.length}</strong><span>actividades<br />en catálogo</span></div>
      </section>

      <section className="panel admin-create-panel">
        <div className="section-heading">
          <span className="section-kicker">NUEVA ACTIVIDAD</span>
          <h2>Agregar ejercicio o entrenamiento</h2>
          <p>Completa la información y carga una imagen clara del ejercicio.</p>
        </div>

        <form className="admin-activity-form" onSubmit={handleSubmit}>
          <div className="admin-form-fields">
            <label>Nombre de la actividad
              <input value={name} onChange={event => setName(event.target.value)} maxLength={70} placeholder="Ej. Sentadillas con peso" required />
            </label>
            <label>Nivel
              <select value={level} onChange={event => setLevel(event.target.value)}>
                <option>Principiante</option><option>Intermedio</option><option>Avanzado</option>
              </select>
            </label>
            <label>Duración (minutos)
              <input type="number" min="5" max="240" step="1" value={minutes} onChange={event => setMinutes(event.target.value)} required />
            </label>
            <label className="admin-description-field">Descripción
              <textarea value={description} onChange={event => setDescription(event.target.value)} maxLength={240} rows="4" placeholder="Describe brevemente qué se trabaja en esta actividad." required />
            </label>
            <label className="admin-upload-field">Imagen de referencia
              <input id="activity-image-upload" type="file" accept="image/png,image/jpeg,image/webp" onChange={handleImageChange} required />
              <small>PNG, JPG o WEBP · Máximo 8 MB original. Se optimiza para guardarse localmente.</small>
            </label>
          </div>

          <div className="admin-image-preview">
            {preview ? <img src={preview} alt="Vista previa de la imagen de la actividad" /> : <div className="admin-image-placeholder"><span>＋</span><strong>Vista previa</strong><small>La imagen aparecerá aquí</small></div>}
          </div>

          {error && <p className="admin-feedback error" role="alert">{error}</p>}
          {message && <p className="admin-feedback success" role="status">{message}</p>}
          <button className="button admin-submit-button" type="submit">＋ Guardar actividad</button>
        </form>
      </section>

      <section className="admin-custom-list">
        <div className="section-heading">
          <span className="section-kicker">CATÁLOGO PERSONALIZADO</span>
          <h2>Actividades agregadas</h2>
          <p>Estas actividades se almacenan en localStorage de este navegador.</p>
        </div>
        {customActivities.length ? (
          <div className="admin-activity-list">
            {customActivities.map(item => (
              <article className="admin-activity-row" key={item.id}>
                <img src={item.image} alt="" />
                <div className="admin-activity-row-info">
                  <strong>{item.name}</strong>
                  <span>{item.level} · {item.minutes} min</span>
                </div>
                <button type="button" className="button button-outline admin-delete-button" onClick={() => removeActivity(item.id)}>Eliminar</button>
              </article>
            ))}
          </div>
        ) : <div className="admin-empty">Todavía no has agregado actividades personalizadas.</div>}
      </section>
    </main>
  )
}
