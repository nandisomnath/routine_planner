import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav>
      <Link to="/">Dashboard</Link>
      <Link to="/routine">Routine</Link>
      <Link to="/progress">Progress</Link>
      <Link to="/events">Events</Link>
      <Link to="/notes">Notes</Link>
    </nav>
  )
}

export default Navbar

