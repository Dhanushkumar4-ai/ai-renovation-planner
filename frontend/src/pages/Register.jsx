import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'homeowner', phone: '', address: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const user = await register(form.name, form.email, form.password, form.role, form.phone, form.address)
      if (user.role === 'worker') navigate('/dashboard')
      else navigate('/home')
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'radial-gradient(ellipse at 70% 50%, rgba(108,62,232,0.12) 0%, transparent 60%), var(--bg)',
      padding: '80px 24px 24px'
    }}>
      <div style={{ width: '100%', maxWidth: '480px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '60px', height: '60px', borderRadius: '16px',
            background: 'linear-gradient(135deg, #6C3EE8, #8B5CF6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.8rem', fontWeight: '800', color: 'white',
            margin: '0 auto 16px', boxShadow: '0 8px 25px rgba(108,62,232,0.4)'
          }}>R</div>
          <h2 style={{ marginBottom: '8px' }}>Create Account</h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Join the AI renovation platform</p>
        </div>

        <div className="card" style={{ padding: '32px' }}>
          {error && <div className="alert alert-error" style={{ marginBottom: '20px' }}>⚠️ {error}</div>}

          {/* Role Selection */}
          <div style={{ marginBottom: '24px' }}>
            <label className="label">I am a...</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {['homeowner', 'worker'].map(role => (
                <button key={role} type="button"
                  onClick={() => setForm(f => ({ ...f, role }))}
                  style={{
                    padding: '14px', borderRadius: '10px', cursor: 'pointer',
                    border: form.role === role ? '2px solid var(--primary-light)' : '1px solid var(--border)',
                    background: form.role === role ? 'rgba(108,62,232,0.15)' : 'var(--bg-surface)',
                    color: form.role === role ? 'var(--primary-light)' : 'var(--text-secondary)',
                    fontWeight: '600', fontSize: '0.9rem', transition: 'all 0.2s'
                  }}>
                  {role === 'homeowner' ? '🏠 Homeowner' : '👷 Worker'}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="form-group">
              <label className="label">Full Name</label>
              <input className="input" value={form.name} onChange={set('name')} placeholder="Your full name" required />
            </div>
            <div className="form-group">
              <label className="label">Email</label>
              <input className="input" type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" required />
            </div>
            <div className="form-group">
              <label className="label">Password</label>
              <input className="input" type="password" value={form.password} onChange={set('password')} placeholder="Min. 6 characters" required minLength={6} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="label">Phone</label>
                <input className="input" value={form.phone} onChange={set('phone')} placeholder="10-digit number" />
              </div>
              <div className="form-group">
                <label className="label">City</label>
                <input className="input" value={form.address} onChange={set('address')} placeholder="Bengaluru, Mumbai..." />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', padding: '14px', marginTop: '8px' }}>
              {loading ? <><span className="spinner" style={{ width: '18px', height: '18px', borderWidth: '2px' }} /> Creating account...</> : '✨ Create Account'}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: '24px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--primary-light)', fontWeight: '600', textDecoration: 'none' }}>Sign in →</Link>
        </p>
      </div>
    </div>
  )
}
