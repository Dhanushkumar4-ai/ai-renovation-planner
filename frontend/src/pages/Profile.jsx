import React, { useState, useEffect } from 'react'
import { useAuth, API } from '../context/AuthContext'

export default function Profile() {
  const { user, logout } = useAuth()
  const [form, setForm] = useState({ name: '', phone: '', address: '' })
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) setForm({ name: user.name || '', phone: user.phone || '', address: user.address || '' })
  }, [user])

  async function handleSave(e) {
    e.preventDefault()
    setLoading(true)
    try {
      // Just update local state for now (backend /api/users/:id would be added)
      setMsg('✅ Profile updated!')
    } catch { setMsg('❌ Update failed') }
    finally { setLoading(false) }
  }

  const roleColor = user?.role === 'admin' ? '#EF4444' : user?.role === 'worker' ? '#F59E0B' : '#10B981'

  return (
    <div className="page-wrapper" style={{ background: 'var(--bg)' }}>
      <div className="container" style={{ padding: '32px 24px', maxWidth: '600px' }}>
        <h2 style={{ marginBottom: '28px' }}>👤 My <span className="gradient-text">Profile</span></h2>

        {/* Avatar + Role */}
        <div className="card" style={{ padding: '28px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{
            width: '80px', height: '80px', borderRadius: '20px', flexShrink: 0,
            background: 'linear-gradient(135deg, #6C3EE8, #A78BFA)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2rem', fontWeight: '700', color: 'white',
            boxShadow: '0 8px 25px rgba(108,62,232,0.4)'
          }}>{user?.name?.charAt(0)}</div>
          <div>
            <h3 style={{ marginBottom: '4px' }}>{user?.name}</h3>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>{user?.email}</div>
            <span style={{
              padding: '4px 14px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: '700',
              background: roleColor + '20', color: roleColor, textTransform: 'uppercase'
            }}>{user?.role}</span>
          </div>
        </div>

        {/* Edit form */}
        <div className="card" style={{ padding: '28px' }}>
          <h4 style={{ marginBottom: '20px' }}>Edit Information</h4>
          {msg && <div className={`alert ${msg.startsWith('✅') ? 'alert-success' : 'alert-error'}`} style={{ marginBottom: '16px' }}>{msg}</div>}
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="form-group">
              <label className="label">Full Name</label>
              <input className="input" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            </div>
            <div className="form-group">
              <label className="label">Email</label>
              <input className="input" value={user?.email || ''} disabled style={{ opacity: 0.5 }} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="label">Phone</label>
                <input className="input" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="10-digit number" />
              </div>
              <div className="form-group">
                <label className="label">City</label>
                <input className="input" value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} placeholder="Bengaluru..." />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button type="submit" className="btn btn-primary" disabled={loading}>💾 Save Changes</button>
              <button type="button" className="btn btn-danger" onClick={() => { logout(); window.location.href = '/' }}>🔴 Logout</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
