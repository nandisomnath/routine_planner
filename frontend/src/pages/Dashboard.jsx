import { useEffect, useState } from 'react'
import { getEvents, getNotes, getProgress } from '../api/api'

function Dashboard() {
  const [events, setEvents] = useState([])
  const [notes, setNotes] = useState([])
  const [progress, setProgress] = useState([])

  useEffect(() => {
    setEvents(getEvents())
    setNotes(getNotes())
    setProgress(getProgress())
  }, [])

  const totalProgress = progress.length
    ? Math.round(progress.reduce((acc, p) => acc + (p.percent || 0), 0) / progress.length)
    : 0

  return (
    <div>
      <h1>Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">🎓</div>
          <div className="stat-info">
            <h3>Total Events</h3>
            <p>{events.length}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📝</div>
          <div className="stat-info">
            <h3>Notes Saved</h3>
            <p>{notes.length}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <div className="stat-info">
            <h3>Avg Progress</h3>
            <p>{totalProgress}%</p>
          </div>
        </div>
      </div>

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
        <div className="progress-bar-bg">
          <div
            className="progress-bar-fill"
            style={{ width: `${totalProgress}%` }}
          >
            {totalProgress > 10 && `${totalProgress}%`}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard

