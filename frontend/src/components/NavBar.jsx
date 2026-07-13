import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  IcHome, IcWorker, IcRobot, IcClipboard, IcBolt,
  IcShield, IcUser, IcMenu, IcX, IcLogout, IcArrowRight
} from './Icons'

const LOGO_SVG = (
  <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
    <rect width="34" height="34" rx="10" fill="url(#logoGrad)"/>
    <path d="M7 22L17 9l10 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M11 22h12" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <path d="M17 9v13" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5"/>
    <defs>
      <linearGradient id="logoGrad" x1="0" y1="0" x2="34" y2="34" gradientUnits="userSpaceOnUse">
        <stop stopColor="#6C3EE8"/>
        <stop offset="1" stopColor="#A78BFA"/>
      </linearGradient>
    </defs>
  </svg>
)

export default function NavBar() {
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isActive = (path) => location.pathname === path

  const handleLogout = () => {
    logout()
    navigate('/')
    setMenuOpen(false)
  }

  const roleColor = user?.role === 'admin' ? '#EF4444' : user?.role === 'worker' ? '#F59E0B' : '#10B981'

  const navItems = [
    { to: '/home', label: 'Home', icon: IcHome, show: !!user },
    { to: '/workers', label: 'Workers', icon: IcWorker, show: true },
    { to: '/recommend', label: 'AI Match', icon: IcRobot, show: !!user },
    { to: '/hire-history', label: 'My Hires', icon: IcClipboard, show: user?.role === 'homeowner' },
    { to: '/dashboard', label: 'Dashboard', icon: IcBolt, show: user?.role === 'worker' },
    { to: '/admin', label: 'Admin', icon: IcShield, show: user?.role === 'admin' },
  ].filter(n => n.show)

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      padding: '0 28px', height: '68px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: scrolled ? 'rgba(11,15,26,0.97)' : 'rgba(11,15,26,0.75)',
      backdropFilter: 'blur(24px)',
      borderBottom: `1px solid ${scrolled ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.05)'}`,
      transition: 'all 0.3s ease'
    }}>
      {/* Logo */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
        {LOGO_SVG}
        <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '800', fontSize: '1.2rem', color: 'var(--text-primary)', letterSpacing: '-0.01em' }}>
          Renov<span style={{ color: 'var(--primary-light)' }}>AI</span>
        </span>
      </Link>

      {/* Desktop Nav */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '2px' }} className="hidden-mobile">
        {navItems.map(({ to, label, icon: Icon }) => (
          <Link key={to} to={to}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '7px 14px', borderRadius: '8px', textDecoration: 'none',
              fontSize: '0.875rem', fontWeight: '500', transition: 'all 0.2s',
              color: isActive(to) ? 'var(--primary-light)' : 'var(--text-secondary)',
              background: isActive(to) ? 'rgba(108,62,232,0.12)' : 'transparent',
            }}
            onMouseEnter={e => { if (!isActive(to)) { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}}
            onMouseLeave={e => { if (!isActive(to)) { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.background = 'transparent' }}}
          >
            <Icon size={15} stroke={isActive(to) ? 'var(--primary-light)' : 'currentColor'} />
            {label}
          </Link>
        ))}
      </nav>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {user ? (
          <>
            <button onClick={() => navigate('/profile')}
              style={{ display: 'flex', alignItems: 'center', gap: '9px', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}>
              <div style={{
                width: '34px', height: '34px', borderRadius: '50%',
                background: 'linear-gradient(135deg, #6C3EE8, #A78BFA)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: '700', fontSize: '0.85rem', color: 'white', flexShrink: 0,
                boxShadow: '0 2px 10px rgba(108,62,232,0.4)'
              }}>{user.name?.charAt(0).toUpperCase()}</div>
              <div className="hidden-mobile" style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--text-primary)', lineHeight: 1.2 }}>{user.name?.split(' ')[0]}</div>
                <div style={{ fontSize: '0.65rem', color: roleColor, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{user.role}</div>
              </div>
            </button>

            <button onClick={handleLogout}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '7px 13px', borderRadius: '8px', border: '1px solid var(--border)',
                background: 'transparent', color: 'var(--text-muted)', cursor: 'pointer',
                fontSize: '0.8rem', fontWeight: '500', transition: 'all 0.2s'
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(239,68,68,0.4)'; e.currentTarget.style.color = '#FCA5A5' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-muted)' }}>
              <IcLogout size={14} />
              <span className="hidden-mobile">Logout</span>
            </button>
          </>
        ) : (
          <>
            <Link to="/login"
              style={{
                padding: '7px 16px', borderRadius: '8px', textDecoration: 'none',
                fontSize: '0.875rem', fontWeight: '500', color: 'var(--text-secondary)',
                border: '1px solid var(--border)', transition: 'all 0.2s'
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--text-primary)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)' }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border)' }}>
              Sign In
            </Link>
            <Link to="/register"
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '7px 16px', borderRadius: '8px', textDecoration: 'none',
                fontSize: '0.875rem', fontWeight: '600', color: 'white',
                background: 'linear-gradient(135deg, #6C3EE8, #8B5CF6)',
                boxShadow: '0 3px 12px rgba(108,62,232,0.4)', transition: 'all 0.2s'
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(108,62,232,0.5)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 3px 12px rgba(108,62,232,0.4)' }}>
              Get Started <IcArrowRight size={14} />
            </Link>
          </>
        )}

        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: 'none', background: 'none', border: '1px solid var(--border)',
            color: 'var(--text-secondary)', cursor: 'pointer', padding: '6px',
            borderRadius: '8px', alignItems: 'center', justifyContent: 'center'
          }}
          className="mobile-menu-btn">
          {menuOpen ? <IcX size={18} /> : <IcMenu size={18} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          position: 'absolute', top: '68px', left: 0, right: 0,
          background: 'rgba(13,20,40,0.99)', backdropFilter: 'blur(24px)',
          borderBottom: '1px solid var(--border)',
          padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '4px'
        }}>
          {navItems.map(({ to, label, icon: Icon }) => (
            <Link key={to} to={to} onClick={() => setMenuOpen(false)}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '11px 14px', borderRadius: '8px', textDecoration: 'none',
                color: isActive(to) ? 'var(--primary-light)' : 'var(--text-secondary)',
                background: isActive(to) ? 'rgba(108,62,232,0.1)' : 'transparent',
                fontSize: '0.9rem', fontWeight: '500'
              }}>
              <Icon size={16} />
              {label}
            </Link>
          ))}
          {user ? (
            <button onClick={handleLogout}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px', padding: '11px 14px',
                borderRadius: '8px', border: 'none', background: 'rgba(239,68,68,0.1)',
                color: '#FCA5A5', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '500', marginTop: '8px'
              }}>
              <IcLogout size={16} />
              Sign Out
            </button>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px', padding: '11px 14px',
                borderRadius: '8px', textDecoration: 'none', color: 'var(--text-secondary)', fontSize: '0.9rem'
              }}>
              <IcUser size={16} />
              Sign In
            </Link>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </header>
  )
}
