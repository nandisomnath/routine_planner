import { useState, useEffect } from 'react'
import { getEvents, createEvent } from '../api/api'

function Events() {
  const [events, setEvents] = useState([])
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')
  const [errors, setErrors] = useState({})

  useEffect(() => {
    setEvents(getEvents())
  }, [])

  function validate(titleVal, dateVal) {
    const newErrors = {}
    if (!titleVal || titleVal.trim().length < 2) {
      newErrors.title = 'Title must be at least 2 characters'
    } else if (titleVal.trim().length > 100) {
      newErrors.title = 'Title must not exceed 100 characters'
    }
    if (!dateVal) {
      newErrors.date = 'Date is required'
    } else {
      const regex = /^\d{4}-\d{2}-\d{2}$/
      if (!regex.test(dateVal)) {
        newErrors.date = 'Date must be in YYYY-MM-DD format'
      } else {
        const dateObj = new Date(dateVal)
        if (isNaN(dateObj.getTime())) {
          newErrors.date = 'Date is invalid'
        }
      }
    }
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate(title, date)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    try {
      const newEvent = createEvent({ title: title.trim(), date })
      setEvents([...events, newEvent])
      setTitle('')
      setDate('')
      setErrors({})
    } catch (err) {
      setErrors({ submit: err.message || 'Failed to add event' })
    }
  }

  return (
    <div>
      <h1>Academic Events</h1>
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <input
            name="title"
            placeholder="Event Title"
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
            name="date"
            type="date"
            value={date}
            onChange={(e) => { setDate(e.target.value); setErrors((prev) => ({ ...prev, date: undefined })) }}
            aria-invalid={!!errors.date}
            aria-describedby={errors.date ? 'date-error' : undefined}
          />
          {errors.date && <span id="date-error" className="error-message">{errors.date}</span>}
        </div>
        <button type="submit">Add Event</button>
        {errors.submit && <p className="error-message">{errors.submit}</p>}
      </form>

      <h2>Upcoming / Saved Events</h2>
      {events.length === 0 ? (
        <p>No events added yet.</p>
      ) : (
        <ul>
          {events.map((ev) => (
            <li key={ev.id}>
              <strong>{ev.title}</strong> — {ev.date}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Events

