const express = require('express')
const router = express.Router()

let notes = []
let nextId = 1

function validateDate(date) {
  if (typeof date !== 'string') return { valid: false, error: 'Date must be a string' }
  const trimmed = date.trim()
  const regex = /^\d{4}-\d{2}-\d{2}$/
  if (!regex.test(trimmed)) return { valid: false, error: 'Date must be in YYYY-MM-DD format' }
  const dateObj = new Date(trimmed)
  if (isNaN(dateObj.getTime())) return { valid: false, error: 'Date is invalid' }
  return { valid: true, value: trimmed }
}

function validateContent(content) {
  if (typeof content !== 'string') return { valid: false, error: 'Content must be a string' }
  const trimmed = content.trim()
  if (trimmed.length < 1) return { valid: false, error: 'Content cannot be empty' }
  if (trimmed.length > 2000) return { valid: false, error: 'Content must not exceed 2000 characters' }
  return { valid: true, value: trimmed.replace(/[<>]/g, '') }
}

router.get('/', (req, res) => {
  res.json(notes)
})

router.post('/', (req, res) => {
  const { date, content } = req.body

  const dateValidation = validateDate(date)
  if (!dateValidation.valid) {
    return res.status(400).json({ error: dateValidation.error })
  }

  const contentValidation = validateContent(content)
  if (!contentValidation.valid) {
    return res.status(400).json({ error: contentValidation.error })
  }

  const note = { id: nextId++, date: dateValidation.value, content: contentValidation.value }
  notes.push(note)
  res.status(201).json(note)
})

module.exports = router

