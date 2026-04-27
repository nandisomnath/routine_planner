const express = require('express')
const router = express.Router()

let routines = []
let nextId = 1

function validateSubjectName(name) {
  if (typeof name !== 'string') return { valid: false, error: 'Subject name must be a string' }
  const trimmed = name.trim()
  if (trimmed.length < 2) return { valid: false, error: 'Subject name must be at least 2 characters' }
  if (trimmed.length > 100) return { valid: false, error: 'Subject name must not exceed 100 characters' }
  return { valid: true, value: trimmed.replace(/[<>]/g, '') }
}

function validateTime(time) {
  if (typeof time !== 'string') return { valid: false, error: 'Time must be a string' }
  const trimmed = time.trim()
  if (!/^\d{2}:\d{2}$/.test(trimmed)) return { valid: false, error: 'Time must be in HH:MM format' }
  return { valid: true, value: trimmed }
}

function validateDate(date) {
  if (typeof date !== 'string') return { valid: false, error: 'Date must be a string' }
  const trimmed = date.trim()
  if (!/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return { valid: false, error: 'Date must be in YYYY-MM-DD format' }
  const d = new Date(trimmed)
  if (isNaN(d.getTime())) return { valid: false, error: 'Date is invalid' }
  return { valid: true, value: trimmed }
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

router.get('/', (req, res) => {
  const enriched = routines.map(enrichRoutine)
  res.json(enriched)
})

router.post('/', (req, res) => {
  const { subjectName, startTime, endTime, date, isFollowed } = req.body

  const nameValidation = validateSubjectName(subjectName)
  if (!nameValidation.valid) {
    return res.status(400).json({ error: nameValidation.error })
  }

  const startValidation = validateTime(startTime)
  if (!startValidation.valid) {
    return res.status(400).json({ error: startValidation.error })
  }

  const endValidation = validateTime(endTime)
  if (!endValidation.valid) {
    return res.status(400).json({ error: endValidation.error })
  }

  if (startValidation.value >= endValidation.value) {
    return res.status(400).json({ error: 'End time must be after start time' })
  }

  const dateValidation = validateDate(date)
  if (!dateValidation.valid) {
    return res.status(400).json({ error: dateValidation.error })
  }

  const routine = {
    id: nextId++,
    subjectName: nameValidation.value,
    startTime: startValidation.value,
    endTime: endValidation.value,
    date: dateValidation.value,
    isFollowed: typeof isFollowed === 'boolean' ? isFollowed : false,
  }

  routines.push(routine)
  res.status(201).json(enrichRoutine(routine))
})

router.patch('/:id', (req, res) => {
  const id = Number(req.params.id)
  const routine = routines.find((r) => r.id === id)
  if (!routine) {
    return res.status(404).json({ error: 'Routine not found' })
  }

  const { subjectName, startTime, endTime, date, isFollowed } = req.body

  if (subjectName !== undefined) {
    const nameValidation = validateSubjectName(subjectName)
    if (!nameValidation.valid) {
      return res.status(400).json({ error: nameValidation.error })
    }
    routine.subjectName = nameValidation.value
  }

  if (startTime !== undefined) {
    const timeValidation = validateTime(startTime)
    if (!timeValidation.valid) {
      return res.status(400).json({ error: timeValidation.error })
    }
    routine.startTime = timeValidation.value
  }

  if (endTime !== undefined) {
    const timeValidation = validateTime(endTime)
    if (!timeValidation.valid) {
      return res.status(400).json({ error: timeValidation.error })
    }
    routine.endTime = timeValidation.value
  }

  if (date !== undefined) {
    const dateValidation = validateDate(date)
    if (!dateValidation.valid) {
      return res.status(400).json({ error: dateValidation.error })
    }
    routine.date = dateValidation.value
  }

  if (isFollowed !== undefined) {
    routine.isFollowed = typeof isFollowed === 'boolean' ? isFollowed : routine.isFollowed
  }

  res.json(enrichRoutine(routine))
})

module.exports = router

