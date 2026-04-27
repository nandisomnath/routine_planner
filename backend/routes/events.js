const express = require('express')
const router = express.Router()

let events = []
let nextId = 1

function validateTitle(title) {
  if (typeof title !== 'string') return { valid: false, error: 'Title must be a string' }
  const trimmed = title.trim()
  if (trimmed.length < 2) return { valid: false, error: 'Title must be at least 2 characters' }
  if (trimmed.length > 100) return { valid: false, error: 'Title must not exceed 100 characters' }
  return { valid: true, value: trimmed.replace(/[<>]/g, '') }
}

function validateDate(date) {
  if (typeof date !== 'string') return { valid: false, error: 'Date must be a string' }
  const trimmed = date.trim()
  const regex = /^\d{4}-\d{2}-\d{2}$/
  if (!regex.test(trimmed)) return { valid: false, error: 'Date must be in YYYY-MM-DD format' }
  const dateObj = new Date(trimmed)
  if (isNaN(dateObj.getTime())) return { valid: false, error: 'Date is invalid' }
  return { valid: true, value: trimmed }
}

router.get('/', (req, res) => {
  res.json(events)
})

router.post('/', (req, res) => {
  const { title, date } = req.body

  const titleValidation = validateTitle(title)
  if (!titleValidation.valid) {
    return res.status(400).json({ error: titleValidation.error })
  }

  const dateValidation = validateDate(date)
  if (!dateValidation.valid) {
    return res.status(400).json({ error: dateValidation.error })
  }

  const event = { id: nextId++, title: titleValidation.value, date: dateValidation.value }
  events.push(event)
  res.status(201).json(event)
})

module.exports = router
