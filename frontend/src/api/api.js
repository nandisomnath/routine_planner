const STORAGE_KEYS = {
  routines: 'routine-planner_routines',
  progress: 'routine-planner_progress',
  events: 'routine-planner_events',
  notes: 'routine-planner_notes',
  idCounter: 'routine-planner_idCounter',
}

function getNextId() {
  const current = Number(localStorage.getItem(STORAGE_KEYS.idCounter)) || 0
  const next = current + 1
  localStorage.setItem(STORAGE_KEYS.idCounter, String(next))
  return next
}

function getItems(key) {
  try {
    const data = localStorage.getItem(key)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

function setItems(key, items) {
  localStorage.setItem(key, JSON.stringify(items))
}

function computeStatus(routine) {
  if (routine.isFollowed) return 'completed'
  const now = new Date()
  const endDateTime = new Date(`${routine.date}T${routine.endTime}`)
  if (now > endDateTime) return 'backlog'
  return 'upcoming'
}

function enrichRoutine(routine) {
  return { ...routine, status: computeStatus(routine) }
}

// Routines
export function getRoutines() {
  const routines = getItems(STORAGE_KEYS.routines)
  return routines.map(enrichRoutine)
}

export function createRoutine(data) {
  const routines = getItems(STORAGE_KEYS.routines)
  const newRoutine = { id: getNextId(), ...data }
  routines.push(newRoutine)
  setItems(STORAGE_KEYS.routines, routines)
  return enrichRoutine(newRoutine)
}

export function updateRoutine(id, updates) {
  const routines = getItems(STORAGE_KEYS.routines)
  const index = routines.findIndex((r) => r.id === id)
  if (index === -1) return null
  routines[index] = { ...routines[index], ...updates }
  setItems(STORAGE_KEYS.routines, routines)
  return enrichRoutine(routines[index])
}

export function deleteRoutine(id) {
  const routines = getItems(STORAGE_KEYS.routines)
  const filtered = routines.filter((r) => r.id !== id)
  setItems(STORAGE_KEYS.routines, filtered)
}

// Progress
export function getProgress() {
  return getItems(STORAGE_KEYS.progress)
}

export function updateProgress(data) {
  const progress = getItems(STORAGE_KEYS.progress)
  const newProgress = { id: getNextId(), ...data }
  progress.push(newProgress)
  setItems(STORAGE_KEYS.progress, progress)
  return newProgress
}

// Events
export function getEvents() {
  return getItems(STORAGE_KEYS.events)
}

export function createEvent(data) {
  const events = getItems(STORAGE_KEYS.events)
  const newEvent = { id: getNextId(), ...data }
  events.push(newEvent)
  setItems(STORAGE_KEYS.events, events)
  return newEvent
}

// Notes
export function getNotes() {
  return getItems(STORAGE_KEYS.notes)
}

export function createNote(data) {
  const notes = getItems(STORAGE_KEYS.notes)
  const newNote = { id: getNextId(), ...data }
  notes.push(newNote)
  setItems(STORAGE_KEYS.notes, notes)
  return newNote
}

