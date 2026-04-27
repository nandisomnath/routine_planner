import { useState, useEffect } from 'react'
import { getRoutines, createRoutine } from '../api/api'

function Routine() {
  const [routines, setRoutines] = useState([])
  const [title, setTitle] = useState('')
  const [time, setTime] = useState('')
  const [errors, setErrors] = useState({})

  useEffect(() => {
    getRoutines().then(setRoutines).catch(console.error)
  }, [])

  function validate(titleVal, timeVal) {
    const newErrors = {}
    if (!titleVal || titleVal.trim().length < 2) {
      newErrors.title = 'Title must be at least 2 characters'
    } else if (titleVal.trim().length > 100) {
      newErrors.title = 'Title must not exceed 100 characters'
    }
    if (!timeVal || timeVal.trim().length < 1) {
      newErrors.time = 'Time is required'
    } else if (timeVal.trim().length > 50) {
      newErrors.time = 'Time must not exceed 50 characters'
    }
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate(title, time)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    try {
      const newRoutine = await createRoutine({ title: title.trim(), time: time.trim() })
      setRoutines([...routines, newRoutine])
      setTitle('')
      setTime('')
      setErrors({})
    } catch (err) {
      setErrors({ submit: err.message || 'Failed to add routine' })
    }
  }

  return (
    <div>
      <h1>Routine Planner</h1>
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <input
            placeholder="Task / Subject"
            value={title}
            onChange={(e) => { setTitle(e.target.value); setErrors((prev) => ({ ...prev, title: undefined })) }}
            maxLength={100}
            aria-invalid={!!errors.title}
            aria-describedby={errors.title ? 'title-error' : undefined}
          />
          {errors.title && <span id="title-error" style={{ color: '#e53e3e', fontSize: '0.85rem' }}>{errors.title}</span>}
        </div>
        <div>
          <input
            placeholder="Time (e.g., 10:00 AM - 12:00 PM)"
            value={time}
            onChange={(e) => { setTime(e.target.value); setErrors((prev) => ({ ...prev, time: undefined })) }}
            maxLength={50}
            aria-invalid={!!errors.time}
            aria-describedby={errors.time ? 'time-error' : undefined}
          />
          {errors.time && <span id="time-error" style={{ color: '#e53e3e', fontSize: '0.85rem' }}>{errors.time}</span>}
        </div>
        <button type="submit">Add to Routine</button>
        {errors.submit && <p style={{ color: '#e53e3e', fontSize: '0.9rem' }}>{errors.submit}</p>}
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
