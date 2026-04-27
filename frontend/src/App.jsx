import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Routine from './pages/Routine'
import Progress from './pages/Progress'
import Events from './pages/Events'
import Notes from './pages/Notes'

function App() {
  return (
    <div>
      <Navbar />
      <main style={{ padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/routine" element={<Routine />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/events" element={<Events />} />
          <Route path="/notes" element={<Notes />} />
        </Routes>
      </main>
    </div>
  )
}

export default App

