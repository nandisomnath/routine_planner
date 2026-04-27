import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import Routine from './pages/Routine'
import Plans from './pages/Plans'
import PlanDetail from './pages/PlanDetail'
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
          <Route path="/plans" element={<Plans />} />
          <Route path="/progress/:id" element={<PlanDetail />} />
          <Route path="/progress" element={<Navigate to="/plans" replace />} />
          <Route path="/events" element={<Events />} />
          <Route path="/notes" element={<Notes />} />
        </Routes>
      </main>
    </div>
  )
}

export default App

