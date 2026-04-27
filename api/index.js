const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

// Routes are mounted without /api prefix because Vercel rewrite handles it
app.use('/routines', require('../backend/routes/routines'))
app.use('/progress', require('../backend/routes/progress'))
app.use('/events', require('../backend/routes/events'))
app.use('/notes', require('../backend/routes/notes'))

app.get('/', (req, res) => {
  res.send('Routine Planner API is running.')
})

module.exports = app

