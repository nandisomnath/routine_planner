import { useState, useEffect } from 'react'
import { getNotes, createNote } from '../api/api'

function Notes() {
  const [notes, setNotes] = useState([])
  const [date, setDate] = useState('')
  const [content, setContent] = useState('')
  const [errors, setErrors] = useState({})

  useEffect(() => {
    getNotes().then(setNotes).catch(console.error)
  }, [])

  function validate(dateVal, contentVal) {
    const newErrors = {}
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
    if (!contentVal || contentVal.trim().length < 1) {
      newErrors.content = 'Content cannot be empty'
    } else if (contentVal.trim().length > 2000) {
      newErrors.content = 'Content must not exceed 2000 characters'
    }
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate(date, content)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    try {
      const newNote = await createNote({ date, content: content.trim() })
      setNotes([...notes, newNote])
      setDate('')
      setContent('')
      setErrors({})
    } catch (err) {
      setErrors({ submit: err.message || 'Failed to save note' })
    }
  }

  return (
    <div>
      <h1>Notes</h1>
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <input
            type="date"
            value={date}
            onChange={(e) => { setDate(e.target.value); setErrors((prev) => ({ ...prev, date: undefined })) }}
            aria-invalid={!!errors.date}
            aria-describedby={errors.date ? 'date-error' : undefined}
          />
          {errors.date && <span id="date-error" style={{ color: '#e53e3e', fontSize: '0.85rem' }}>{errors.date}</span>}
        </div>
        <div>
          <textarea
            placeholder="Write your note here..."
            value={content}
            onChange={(e) => { setContent(e.target.value); setErrors((prev) => ({ ...prev, content: undefined })) }}
            maxLength={2000}
            aria-invalid={!!errors.content}
            aria-describedby={errors.content ? 'content-error' : undefined}
          />
          {errors.content && <span id="content-error" style={{ color: '#e53e3e', fontSize: '0.85rem' }}>{errors.content}</span>}
        </div>
        <button type="submit">Save Note</button>
        {errors.submit && <p style={{ color: '#e53e3e', fontSize: '0.9rem' }}>{errors.submit}</p>}
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

