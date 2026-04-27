const express = require('express')
const router = express.Router()

let progressList = []
let nextId = 1

function validateSubject(subject) {
  if (typeof subject !== 'string') return { valid: false, error: 'Subject must be a string' }
  const trimmed = subject.trim()
  if (trimmed.length < 2) return { valid: false, error: 'Subject must be at least 2 characters' }
  if (trimmed.length > 100) return { valid: false, error: 'Subject must not exceed 100 characters' }
  return { valid: true, value: trimmed.replace(/[<>]/g, '') }
}

function validatePercent(percent) {
  const num = Number(percent)
  if (isNaN(num)) return { valid: false, error: 'Percent must be a number' }
  if (num < 0) return { valid: false, error: 'Percent cannot be less than 0' }
  if (num > 100) return { valid: false, error: 'Percent cannot exceed 100' }
  return { valid: true, value: Math.round(num) }
}

router.get('/', (req, res) => {
  res.json(progressList)
})

router.post('/', (req, res) => {
  const { subject, percent } = req.body

  const subjectValidation = validateSubject(subject)
  if (!subjectValidation.valid) {
    return res.status(400).json({ error: subjectValidation.error })
  }

  const percentValidation = validatePercent(percent)
  if (!percentValidation.valid) {
    return res.status(400).json({ error: percentValidation.error })
  }

  const progress = { id: nextId++, subject: subjectValidation.value, percent: percentValidation.value }
  progressList.push(progress)
  res.status(201).json(progress)
})

module.exports = router
