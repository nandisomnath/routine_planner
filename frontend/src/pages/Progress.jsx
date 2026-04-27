import { useState, useEffect } from 'react'
import { getProgress, updateProgress } from '../api/api'

function Progress() {
  const [progressList, setProgressList] = useState([])
  const [subject, setSubject] = useState('')
  const [percent, setPercent] = useState('')

  useEffect(() => {
    getProgress().then(setProgressList).catch(console.error)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!subject || percent === '') return
    const newProgress = await updateProgress({ subject, percent: Number(percent) })
    setProgressList([...progressList, newProgress])
    setSubject('')
    setPercent('')
  }

  return (
    <div>
      <h1>Study Progress</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            placeholder="Subject / Topic"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div>
          <input
            type="number"
            min="0"
            max="100"
            placeholder="Completion %"
            value={percent}
            onChange={(e) => setPercent(e.target.value)}
          />
        </div>
        <button type="submit">Update Progress</button>
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

