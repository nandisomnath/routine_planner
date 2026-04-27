const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 3000

app.use(cors())
app.use(express.json())

app.use('/api/routines', require('./routes/routines'))
app.use('/api/progress', require('./routes/progress'))
app.use('/api/events', require('./routes/events'))
app.use('/api/notes', require('./routes/notes'))

app.get('/', (req, res) => {
  res.send('Routine Planner API is running.')
})

// Start server only when running locally (not on Vercel)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
  })
}

// Export for Vercel serverless deployment
module.exports = app

