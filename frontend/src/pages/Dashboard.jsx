import { useEffect, useState } from 'react'
import { getEvents, getNotes, getProgress } from '../api/api'

function Dashboard() {
  const [events, setEvents] = useState([])
  const [notes, setNotes] = useState([])
  const [progress, setProgress] = useState([])

  useEffect(() => {
    getEvents().then(setEvents).catch(console.error)
    getNotes().then(setNotes).catch(console.error)
    getProgress().then(setProgress).catch(console.error)
  }, [])

  const totalProgress = progress.length
    ? Math.round(progress.reduce((acc, p) => acc + (p.percent || 0), 0) / progress.length)
    : 0

  return (
    <div>
      <h1>Dashboard</h1>
      <section>
        <h2>Upcoming Events</h2>
        {events.length === 0 ? (
          <p>No events found.</p>
        ) : (
          <ul>
            {events.map((e) => (
              <li key={e.id}>
                <strong>{e.title}</strong> — {e.date}
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2>Recent Notes</h2>
        {notes.length === 0 ? (
          <p>No notes found.</p>
        ) : (
          <ul>
            {notes.slice(-3).map((n) => (
              <li key={n.id}>
                <strong>{n.date}</strong>: {n.content.substring(0, 50)}...
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2>Overall Study Progress</h2>
        <p>{totalProgress}% average completion</p>
        <div style={{ background: '#eee', borderRadius: '4px', width: '100%', maxWidth: '400px' }}>
          <div
            style={{
              width: `${totalProgress}%`,
              background: '#646cff',
              height: '20px',
              borderRadius: '4px',
            }}
          />
        </div>
      </section>
    </div>
  )
}

export default Dashboard

