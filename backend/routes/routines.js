const express = require('express')
const router = express.Router()

let routines = []
let nextId = 1

router.get('/', (req, res) => {
  res.json(routines)
})

router.post('/', (req, res) => {
  const { title, time } = req.body
  if (!title || !time) {
    return res.status(400).json({ error: 'Title and time are required' })
  }
  const routine = { id: nextId++, title, time }
  routines.push(routine)
  res.status(201).json(routine)
})

module.exports = router

