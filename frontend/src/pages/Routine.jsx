import { useState, useEffect } from 'react'
import { getRoutines, createRoutine } from '../api/api'

function Routine() {
  const [routines, setRoutines] = useState([])
  const [title, setTitle] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [errors, setErrors] = useState({})

  useEffect(() => {
    setRoutines(getRoutines())
  }, [])

  function validate(titleVal, startVal, endVal) {
    const newErrors = {}
    if (!titleVal || titleVal.trim().length < 2) {
      newErrors.title = 'Title must be at least 2 characters'
    } else if (titleVal.trim().length > 100) {
      newErrors.title = 'Title must not exceed 100 characters'
    }
    if (!startVal) {
      newErrors.startTime = 'Start time is required'
    } else if (!/^\d{2}:\d{2}$/.test(startVal)) {
      newErrors.startTime = 'Start time must be in HH:MM format'
    }
    if (!endVal) {
      newErrors.endTime = 'End time is required'
    } else if (!/^\d{2}:\d{2}$/.test(endVal)) {
      newErrors.endTime = 'End time must be in HH:MM format'
    }
    if (startVal && endVal && startVal >= endVal) {
      newErrors.endTime = 'End time must be after start time'
    }
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate(title, startTime, endTime)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    try {
      const timeRange = `${startTime} - ${endTime}`
      const newRoutine = createRoutine({ title: title.trim(), time: timeRange })
      setRoutines([...routines, newRoutine])
      setTitle('')
      setStartTime('')
      setEndTime('')
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
            name="title"
            placeholder="Task / Subject"
            value={title}
            onChange={(e) => { setTitle(e.target.value); setErrors((prev) => ({ ...prev, title: undefined })) }}
            maxLength={100}
            aria-invalid={!!errors.title}
            aria-describedby={errors.title ? 'title-error' : undefined}
          />
          {errors.title && <span id="title-error" className="error-message">{errors.title}</span>}
        </div>
        <div>
          <input
            name="startTime"
            type="time"
            value={startTime}
            onChange={(e) => { setStartTime(e.target.value); setErrors((prev) => ({ ...prev, startTime: undefined, endTime: undefined })) }}
            aria-invalid={!!errors.startTime}
            aria-describedby={errors.startTime ? 'startTime-error' : undefined}
          />
          {errors.startTime && <span id="startTime-error" className="error-message">{errors.startTime}</span>}
        </div>
        <div>
          <input
            name="endTime"
            type="time"
            value={endTime}
            onChange={(e) => { setEndTime(e.target.value); setErrors((prev) => ({ ...prev, endTime: undefined })) }}
            aria-invalid={!!errors.endTime}
            aria-describedby={errors.endTime ? 'endTime-error' : undefined}
          />
          {errors.endTime && <span id="endTime-error" className="error-message">{errors.endTime}</span>}
        </div>
        <button type="submit">Add to Routine</button>
        {errors.submit && <p className="error-message">{errors.submit}</p>}
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

