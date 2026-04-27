import { useState, useEffect } from 'react'
import { getNotes, createNote } from '../api/api'

function Notes() {
  const [notes, setNotes] = useState([])
  const [date, setDate] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    getNotes().then(setNotes).catch(console.error)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!date || !content) return
    const newNote = await createNote({ date, content })
    setNotes([...notes, newNote])
    setDate('')
    setContent('')
  }

  return (
    <div>
      <h1>Notes</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <textarea
            placeholder="Write your note here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button type="submit">Save Note</button>
      </form>

      <h2>Saved Notes</h2>
      {notes.length === 0 ? (
        <p>No notes found.</p>
      ) : (
        <ul>
          {notes.map((n) => (
            <li key={n.id}>
              <strong>{n.date}</strong>
              <p>{n.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Notes

