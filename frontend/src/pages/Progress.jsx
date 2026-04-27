import { useState, useEffect } from 'react'
import { getProgress, updateProgress } from '../api/api'

function Progress() {
  const [progressList, setProgressList] = useState([])
  const [subject, setSubject] = useState('')
  const [percent, setPercent] = useState('')
  const [errors, setErrors] = useState({})

  useEffect(() => {
    setProgressList(getProgress())
  }, [])

  function validate(subjectVal, percentVal) {
    const newErrors = {}
    if (!subjectVal || subjectVal.trim().length < 2) {
      newErrors.subject = 'Subject must be at least 2 characters'
    } else if (subjectVal.trim().length > 100) {
      newErrors.subject = 'Subject must not exceed 100 characters'
    }
    const num = Number(percentVal)
    if (percentVal === '' || isNaN(num)) {
      newErrors.percent = 'Percent must be a number'
    } else if (num < 0) {
      newErrors.percent = 'Percent cannot be less than 0'
    } else if (num > 100) {
      newErrors.percent = 'Percent cannot exceed 100'
    }
    return newErrors
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate(subject, percent)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    try {
      const newProgress = updateProgress({ subject: subject.trim(), percent: Number(percent) })
      setProgressList([...progressList, newProgress])
      setSubject('')
      setPercent('')
      setErrors({})
    } catch (err) {
      setErrors({ submit: err.message || 'Failed to update progress' })
    }
  }

  return (
    <div>
      <h1>Study Progress</h1>
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <input
            placeholder="Subject / Topic"
            value={subject}
            onChange={(e) => { setSubject(e.target.value); setErrors((prev) => ({ ...prev, subject: undefined })) }}
            maxLength={100}
            aria-invalid={!!errors.subject}
            aria-describedby={errors.subject ? 'subject-error' : undefined}
          />
          {errors.subject && <span id="subject-error" className="error-message">{errors.subject}</span>}
        </div>
        <div>
          <input
            type="number"
            min="0"
            max="100"
            placeholder="Completion %"
            value={percent}
            onChange={(e) => { setPercent(e.target.value); setErrors((prev) => ({ ...prev, percent: undefined })) }}
            aria-invalid={!!errors.percent}
            aria-describedby={errors.percent ? 'percent-error' : undefined}
          />
          {errors.percent && <span id="percent-error" className="error-message">{errors.percent}</span>}
        </div>
        <button type="submit">Update Progress</button>
        {errors.submit && <p className="error-message">{errors.submit}</p>}
      </form>

      <h2>Progress Tracker</h2>
      {progressList.length === 0 ? (
        <p>No progress tracked yet.</p>
      ) : (
        <ul>
          {progressList.map((p) => (
            <li key={p.id}>
              <strong>{p.subject}</strong>: {p.percent}%
              <div className="progress-bar-bg" style={{ maxWidth: '300px', marginTop: '0.5rem', height: '18px' }}>
                <div
                  className="progress-bar-fill"
                  style={{ width: `${p.percent}%` }}
                >
                  {p.percent > 15 && `${p.percent}%`}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Progress

