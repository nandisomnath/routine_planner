const express = require('express')
const router = express.Router()

let events = []
let nextId = 1

router.get('/', (req, res) => {
  res.json(events)
})

router.post('/', (req, res) => {
  const { title, date } = req.body
  if (!title || !date) {
    return res.status(400).json({ error: 'Title and date are required' })
  }
  const event = { id: nextId++, title, date }
  events.push(event)
  res.status(201).json(event)
})

module.exports = router

