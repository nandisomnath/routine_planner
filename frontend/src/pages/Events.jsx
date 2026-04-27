import { useState, useEffect } from 'react'
import { getEvents, createEvent } from '../api/api'

function Events() {
  const [events, setEvents] = useState([])
  const [title, setTitle] = useState('')
  const [date, setDate] = useState('')

  useEffect(() => {
    getEvents().then(setEvents).catch(console.error)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title || !date) return
    const newEvent = await createEvent({ title, date })
    setEvents([...events, newEvent])
    setTitle('')
    setDate('')
  }

  return (
    <div>
      <h1>Academic Events</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            placeholder="Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <button type="submit">Add Event</button>
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

