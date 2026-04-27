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

// Routines
export function getRoutines() {
  return getItems(STORAGE_KEYS.routines)
}

export function createRoutine(data) {
  const routines = getItems(STORAGE_KEYS.routines)
  const newRoutine = { id: getNextId(), ...data }
  routines.push(newRoutine)
  setItems(STORAGE_KEYS.routines, routines)
  return newRoutine
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

