const express = require('express')
const router = express.Router()

let routines = []
let nextId = 1

function validateTitle(title) {
  if (typeof title !== 'string') return { valid: false, error: 'Title must be a string' }
  const trimmed = title.trim()
  if (trimmed.length < 2) return { valid: false, error: 'Title must be at least 2 characters' }
  if (trimmed.length > 100) return { valid: false, error: 'Title must not exceed 100 characters' }
  return { valid: true, value: trimmed.replace(/[<>]/g, '') }
}

function validateTime(time) {
  if (typeof time !== 'string') return { valid: false, error: 'Time must be a string' }
  const trimmed = time.trim()
  if (trimmed.length < 1) return { valid: false, error: 'Time is required' }
  if (trimmed.length > 50) return { valid: false, error: 'Time must not exceed 50 characters' }
  return { valid: true, value: trimmed }
}

router.get('/', (req, res) => {
  res.json(routines)
})

router.post('/', (req, res) => {
  const { title, time } = req.body

  const titleValidation = validateTitle(title)
  if (!titleValidation.valid) {
    return res.status(400).json({ error: titleValidation.error })
  }

  const timeValidation = validateTime(time)
  if (!timeValidation.valid) {
    return res.status(400).json({ error: timeValidation.error })
  }

  const routine = { id: nextId++, title: titleValidation.value, time: timeValidation.value }
  routines.push(routine)
  res.status(201).json(routine)
})

module.exports = router

