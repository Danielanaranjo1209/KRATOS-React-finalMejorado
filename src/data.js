
const activities = [
  {
    id: 'fuerza',
    name: 'Entrenamiento de fuerza',
    level: 'Intermedio',
    minutes: 45,
    description: 'Ejercicios para trabajar los principales grupos musculares.',
    image: '/imagenes/fuerza.png'
  },
  {
    id: 'cardio',
    name: 'Cardio',
    level: 'Principiante',
    minutes: 30,
    description: 'Actividad para mejorar la resistencia física.',
    image: '/imagenes/cardio.png'
  },
  {
    id: 'yoga',
    name: 'Yoga y movilidad',
    level: 'Principiante',
    minutes: 40,
    description: 'Ejercicios de movilidad, equilibrio y flexibilidad.',
    image: '/imagenes/yoga_movilidad.png'
  },
  {
    id: 'hiit',
    name: 'Entrenamiento HIIT',
    level: 'Avanzado',
    minutes: 25,
    description: 'Intervalos de actividad y recuperación.',
    image: '/imagenes/hiit.png'
  },
  {
    id: 'caminata',
    name: 'Caminata activa',
    level: 'Principiante',
    minutes: 35,
    description: 'Una forma sencilla de sumar movimiento a la semana.',
    image: '/imagenes/caminata_activa.png'
  },
  {
    id: 'core',
    name: 'Estabilidad y core',
    level: 'Intermedio',
    minutes: 20,
    description: 'Ejercicios de estabilidad y control del tronco.',
    image: '/imagenes/estabilidad_core.png'
  }
]

export const CUSTOM_ACTIVITIES_KEY = 'kratos-actividades-personalizadas'

export function normalizeActivityName(name) {
  return String(name || '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, ' ')
}

export function getActivities() {
  return [...activities, ...getCustomActivities()]
}

export function saveCustomActivities(items) {
  localStorage.setItem(
    CUSTOM_ACTIVITIES_KEY,
    JSON.stringify(items)
  )
}

export function getCustomActivities() {
  try {
    const items = JSON.parse(
      localStorage.getItem(CUSTOM_ACTIVITIES_KEY) || '[]'
    )

    if (!Array.isArray(items)) return []

    const nombres = new Set()

    const unicas = items.filter(item => {
      const nombre = normalizeActivityName(item.name)

      if (!nombre || nombres.has(nombre)) {
        return false
      }

      nombres.add(nombre)
      return true
    })

    // Guardar la lista limpia si había duplicados
    if (unicas.length !== items.length) {
      saveCustomActivities(unicas)
    }

    return unicas
  } catch {
    return []
  }
}

export default activities
