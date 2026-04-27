const API_BASE = '/_/backend'

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  return res.json()
}

export const getRoutines = () => request('/routines')
export const createRoutine = (data) => request('/routines', { method: 'POST', body: JSON.stringify(data) })

export const getProgress = () => request('/progress')
export const updateProgress = (data) => request('/progress', { method: 'POST', body: JSON.stringify(data) })

export const getEvents = () => request('/events')
export const createEvent = (data) => request('/events', { method: 'POST', body: JSON.stringify(data) })

export const getNotes = () => request('/notes')
export const createNote = (data) => request('/notes', { method: 'POST', body: JSON.stringify(data) })

