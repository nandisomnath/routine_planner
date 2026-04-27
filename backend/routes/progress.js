const express = require('express')
const router = express.Router()

let progressList = []
let nextId = 1

router.get('/', (req, res) => {
  res.json(progressList)
})

router.post('/', (req, res) => {
  const { subject, percent } = req.body
  if (!subject || percent === undefined) {
    return res.status(400).json({ error: 'Subject and percent are required' })
  }
  const progress = { id: nextId++, subject, percent }
  progressList.push(progress)
  res.status(201).json(progress)
})

module.exports = router

