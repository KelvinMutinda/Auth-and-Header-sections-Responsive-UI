import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

function Header() {
  const [open, setOpen] = useState(false)

  const closeMenu = () => setOpen(false)

  return (
    <header className="site-header">
      <div className="header-inner">
        {/* Logo */}
        <Link to="/" className="logo" onClick={closeMenu}>
          <span className="logo-mark">IH</span>
          <span className="logo-text">IdeaHub</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="nav-desktop">
          <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Home
          </NavLink>
          <NavLink to="/projects" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Projects
          </NavLink>
          <NavLink to="/explore" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Explore
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            About
          </NavLink>
        </nav>

        {/* Right side actions */}
        <div className="header-actions">
          <Link to="/login" className="btn-ghost">
            Log in
          </Link>
          <Link to="/register" className="btn-primary">
            Sign up
          </Link>

          {/* Mobile menu button */}
          <button
            className="menu-toggle"
            onClick={() => setOpen(!open)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`nav-mobile ${open ? 'open' : ''}`}>
        <NavLink to="/" end onClick={closeMenu} className={({ isActive }) => (isActive ? 'mobile-link active' : 'mobile-link')}>
          Home
        </NavLink>
        <NavLink to="/projects" onClick={closeMenu} className={({ isActive }) => (isActive ? 'mobile-link active' : 'mobile-link')}>
          Projects
        </NavLink>
        <NavLink to="/explore" onClick={closeMenu} className={({ isActive }) => (isActive ? 'mobile-link active' : 'mobile-link')}>
          Explore
        </NavLink>
        <NavLink to="/about" onClick={closeMenu} className={({ isActive }) => (isActive ? 'mobile-link active' : 'mobile-link')}>
          About
        </NavLink>

        <div className="mobile-actions">
          <Link to="/login" className="btn-ghost" onClick={closeMenu}>
            Log in
          </Link>
          <Link to="/register" className="btn-primary" onClick={closeMenu}>
            Sign up
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header