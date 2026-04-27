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
              <div style={{ background: '#eee', borderRadius: '4px', width: '200px', marginTop: '4px' }}>
                <div
                  style={{
                    width: `${p.percent}%`,
                    background: '#646cff',
                    height: '10px',
                    borderRadius: '4px',
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Progress

