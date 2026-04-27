const express = require('express')
const router = express.Router()

let notes = []
let nextId = 1

router.get('/', (req, res) => {
  res.json(notes)
})

router.post('/', (req, res) => {
  const { date, content } = req.body
  if (!date || !content) {
    return res.status(400).json({ error: 'Date and content are required' })
  }
  const note = { id: nextId++, date, content }
  notes.push(note)
  res.status(201).json(note)
})

module.exports = router

