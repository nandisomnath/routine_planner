import { useState, useEffect } from 'react'
import { getRoutines, createRoutine } from '../api/api'

function Routine() {
  const [routines, setRoutines] = useState([])
  const [title, setTitle] = useState('')
  const [time, setTime] = useState('')

  useEffect(() => {
    getRoutines().then(setRoutines).catch(console.error)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title || !time) return
    const newRoutine = await createRoutine({ title, time })
    setRoutines([...routines, newRoutine])
    setTitle('')
    setTime('')
  }

  return (
    <div>
      <h1>Routine Planner</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            placeholder="Task / Subject"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <input
            placeholder="Time (e.g., 10:00 AM - 12:00 PM)"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>
        <button type="submit">Add to Routine</button>
      </form>

      <h2>Your Schedule</h2>
      {routines.length === 0 ? (
        <p>No routines added yet.</p>
      ) : (
        <ul>
          {routines.map((r) => (
            <li key={r.id}>
              <strong>{r.title}</strong> — {r.time}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Routine

