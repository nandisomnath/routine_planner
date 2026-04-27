import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Navbar() {
  const location = useLocation()
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  const navItems = [
    { path: '/', label: 'Dashboard', icon: '📊' },
    { path: '/routine', label: 'Routine', icon: '📅' },
    { path: '/progress', label: 'Progress', icon: '📈' },
    { path: '/events', label: 'Events', icon: '🎓' },
    { path: '/notes', label: 'Notes', icon: '📝' },
  ]

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="navbar-logo">📚</span>
        <span className="navbar-title">Routine Planner</span>
      </div>
      <div className="navbar-links">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`navbar-link ${location.pathname === item.path ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </Link>
        ))}
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </nav>
  )
}

export default Navbar

