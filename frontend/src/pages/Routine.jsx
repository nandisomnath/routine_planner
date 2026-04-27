import { useState, useEffect } from 'react'
import { getRoutines, createRoutine, updateRoutine, deleteRoutine } from '../api/api'

function formatTime(time24) {
  if (!time24 || !/^\d{2}:\d{2}$/.test(time24)) return time24
  const [hourStr, minute] = time24.split(':')
  let hour = parseInt(hourStr, 10)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  hour = hour % 12
  hour = hour === 0 ? 12 : hour
  return `${hour}:${minute} ${ampm}`
}

function Routine() {
  const [routines, setRoutines] = useState([])
  const [subjectName, setSubjectName] = useState('')
  const [date, setDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [errors, setErrors] = useState({})

  const [editingBacklogId, setEditingBacklogId] = useState(null)
  const [backlogEdit, setBacklogEdit] = useState({ date: '', startTime: '', endTime: '' })

  useEffect(() => {
    setRoutines(getRoutines())
  }, [])

  function validate(nameVal, dateVal, startVal, endVal) {
    const newErrors = {}
    if (!nameVal || nameVal.trim().length < 2) {
      newErrors.subjectName = 'Subject name must be at least 2 characters'
    } else if (nameVal.trim().length > 100) {
      newErrors.subjectName = 'Subject name must not exceed 100 characters'
    }
    if (!dateVal) {
      newErrors.date = 'Date is required'
    } else if (!/^\d{4}-\d{2}-\d{2}$/.test(dateVal)) {
      newErrors.date = 'Date must be in YYYY-MM-DD format'
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
    const validationErrors = validate(subjectName, date, startTime, endTime)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    try {
      const newRoutine = createRoutine({
        subjectName: subjectName.trim(),
        date,
        startTime,
        endTime,
        isFollowed: false,
      })
      setRoutines([...routines, newRoutine])
      setSubjectName('')
      setDate('')
      setStartTime('')
      setEndTime('')
      setErrors({})
    } catch (err) {
      setErrors({ submit: err.message || 'Failed to add routine' })
    }
  }

  const handleToggleFollowed = (id, currentFollowed) => {
    const updated = updateRoutine(id, { isFollowed: !currentFollowed })
    if (updated) {
      setRoutines(routines.map((r) => (r.id === id ? updated : r)))
    }
  }

  const handleDelete = (id) => {
    deleteRoutine(id)
    setRoutines(routines.filter((r) => r.id !== id))
  }

  const startBacklogEdit = (routine) => {
    setEditingBacklogId(routine.id)
    setBacklogEdit({
      date: routine.date,
      startTime: routine.startTime,
      endTime: routine.endTime,
    })
  }

  const handleBacklogSave = (id) => {
    const validationErrors = validate('Placeholder', backlogEdit.date, backlogEdit.startTime, backlogEdit.endTime)
    if (validationErrors.date || validationErrors.startTime || validationErrors.endTime) {
      setErrors({
        backlog: validationErrors.date || validationErrors.startTime || validationErrors.endTime,
      })
      return
    }

    const updated = updateRoutine(id, {
      date: backlogEdit.date,
      startTime: backlogEdit.startTime,
      endTime: backlogEdit.endTime,
      isFollowed: false,
    })
    if (updated) {
      setRoutines(routines.map((r) => (r.id === id ? updated : r)))
      setEditingBacklogId(null)
      setBacklogEdit({ date: '', startTime: '', endTime: '' })
      setErrors((prev) => ({ ...prev, backlog: undefined }))
    }
  }

  const upcoming = routines.filter((r) => r.status === 'upcoming')
  const completed = routines.filter((r) => r.status === 'completed')
  const backlog = routines.filter((r) => r.status === 'backlog')

  const renderRoutineItem = (routine) => {
    const isBacklogEditing = editingBacklogId === routine.id

    return (
      <li key={routine.id} className={`routine-item routine-${routine.status}`}>
        <div className="routine-header">
          <div className="routine-info">
            <strong>{routine.subjectName}</strong>
            <span className="routine-time">
              {routine.date} · {formatTime(routine.startTime)} – {formatTime(routine.endTime)}
            </span>
            <span className={`status-badge status-${routine.status}`}>{routine.status}</span>
          </div>
          <div className="routine-actions">
            <label className="followed-checkbox">
              <input
                type="checkbox"
                checked={routine.isFollowed}
                onChange={() => handleToggleFollowed(routine.id, routine.isFollowed)}
              />
              <span>Followed</span>
            </label>
            <button
              className="delete-btn"
              onClick={() => handleDelete(routine.id)}
              title="Delete routine"
            >
              ✕
            </button>
          </div>
        </div>

        {routine.status === 'backlog' && !isBacklogEditing && (
          <div className="backlog-actions">
            <button className="reschedule-btn" onClick={() => startBacklogEdit(routine)}>
              Reschedule
            </button>
          </div>
        )}

        {isBacklogEditing && (
          <div className="backlog-edit-form">
            <input
              type="date"
              value={backlogEdit.date}
              onChange={(e) => setBacklogEdit({ ...backlogEdit, date: e.target.value })}
            />
            <input
              type="time"
              value={backlogEdit.startTime}
              onChange={(e) => setBacklogEdit({ ...backlogEdit, startTime: e.target.value })}
            />
            <input
              type="time"
              value={backlogEdit.endTime}
              onChange={(e) => setBacklogEdit({ ...backlogEdit, endTime: e.target.value })}
            />
            <div className="backlog-edit-actions">
              <button onClick={() => handleBacklogSave(routine.id)}>Save</button>
              <button className="cancel-btn" onClick={() => setEditingBacklogId(null)}>
                Cancel
              </button>
            </div>
            {errors.backlog && <span className="error-message">{errors.backlog}</span>}
          </div>
        )}
      </li>
    )
  }

  return (
    <div>
      <h1>Routine Planner</h1>
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <input
            name="subjectName"
            placeholder="Subject name"
            value={subjectName}
            onChange={(e) => {
              setSubjectName(e.target.value)
              setErrors((prev) => ({ ...prev, subjectName: undefined }))
            }}
            maxLength={100}
            aria-invalid={!!errors.subjectName}
            aria-describedby={errors.subjectName ? 'subjectName-error' : undefined}
          />
          {errors.subjectName && (
            <span id="subjectName-error" className="error-message">
              {errors.subjectName}
            </span>
          )}
        </div>
        <div>
          <input
            name="date"
            type="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value)
              setErrors((prev) => ({ ...prev, date: undefined }))
            }}
            aria-invalid={!!errors.date}
            aria-describedby={errors.date ? 'date-error' : undefined}
          />
          {errors.date && <span id="date-error" className="error-message">{errors.date}</span>}
        </div>
        <div className="time-inputs">
          <div>
            <input
              name="startTime"
              type="time"
              value={startTime}
              onChange={(e) => {
                setStartTime(e.target.value)
                setErrors((prev) => ({ ...prev, startTime: undefined, endTime: undefined }))
              }}
              aria-invalid={!!errors.startTime}
              aria-describedby={errors.startTime ? 'startTime-error' : undefined}
            />
            {errors.startTime && (
              <span id="startTime-error" className="error-message">
                {errors.startTime}
              </span>
            )}
          </div>
          <div>
            <input
              name="endTime"
              type="time"
              value={endTime}
              onChange={(e) => {
                setEndTime(e.target.value)
                setErrors((prev) => ({ ...prev, endTime: undefined }))
              }}
              aria-invalid={!!errors.endTime}
              aria-describedby={errors.endTime ? 'endTime-error' : undefined}
            />
            {errors.endTime && (
              <span id="endTime-error" className="error-message">
                {errors.endTime}
              </span>
            )}
          </div>
        </div>
        <button type="submit">Add to Routine</button>
        {errors.submit && <p className="error-message">{errors.submit}</p>}
      </form>

      {upcoming.length > 0 && (
        <section>
          <h2>Upcoming ({upcoming.length})</h2>
          <ul>{upcoming.map(renderRoutineItem)}</ul>
        </section>
      )}

      {completed.length > 0 && (
        <section>
          <h2>Completed ({completed.length})</h2>
          <ul>{completed.map(renderRoutineItem)}</ul>
        </section>
      )}

      {backlog.length > 0 && (
        <section>
          <h2>Backlog ({backlog.length})</h2>
          <ul>{backlog.map(renderRoutineItem)}</ul>
        </section>
      )}

      {routines.length === 0 && (
        <section>
          <p>No routines added yet.</p>
        </section>
      )}
    </div>
  )
}

export default Routine;
