import React, { useState, useEffect } from 'react'
import { API } from '../context/AuthContext'
import {
  IcChart, IcStar, IcCalendar, IcCheck, IcClipboard,
  IcImage, IcUser, IcSave, IcPlus, IcEdit, IcTool
} from '../components/Icons'

const CATEGORIES = ['Carpenter', 'Painter', 'Electrician', 'Plumber', 'Mason', 'Interior Designer', 'Civil Contractor', 'Flooring', 'Tiling']
const STATUS_COLOR = { pending: '#F59E0B', accepted: '#10B981', rejected: '#EF4444', completed: '#6C3EE8' }

export default function WorkerDashboard() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [hireRequests, setHireRequests] = useState([])
  const [activeTab, setActiveTab] = useState('profile')
  const [msg, setMsg] = useState('')
  const [newWork, setNewWork] = useState({ title: '', desc: '', url: '' })

  useEffect(() => {
    async function load() {
      try {
        const [pRes, hRes] = await Promise.all([API.get('/workers/my/profile'), API.get('/hire/worker-requests')])
        setProfile(pRes.data)
        setHireRequests(hRes.data)
      } catch (e) { console.error(e) }
      finally { setLoading(false) }
    }
    load()
  }, [])

  async function handleSaveProfile(e) {
    e.preventDefault()
    setSaving(true)
    try {
      const { data } = await API.put(`/workers/${profile._id}`, profile)
      setProfile(data)
      setMsg('Profile saved successfully.')
    } catch { setMsg('Save failed.') }
    finally { setSaving(false) }
  }

  async function handleAddPortfolio(e) {
    e.preventDefault()
    if (!newWork.title || !newWork.url) return
    const updated = { ...profile, portfolio: [...(profile.portfolio || []), newWork] }
    try {
      const { data } = await API.put(`/workers/${profile._id}`, updated)
      setProfile(data)
      setNewWork({ title: '', desc: '', url: '' })
      setMsg('Portfolio item added.')
    } catch { setMsg('Failed to add.') }
  }

  async function handleHireStatus(hireId, status) {
    try {
      await API.put(`/hire/${hireId}/status`, { status })
      setHireRequests(prev => prev.map(h => h._id === hireId ? { ...h, status } : h))
    } catch (e) { console.error(e) }
  }

  if (loading) return (
    <div className="page-wrapper flex-center" style={{ minHeight: '100vh' }}>
      <div className="spinner" style={{ width: '48px', height: '48px' }} />
    </div>
  )

  const TABS = [
    { id: 'profile', label: 'Profile', Icon: IcUser },
    { id: 'portfolio', label: 'Portfolio', Icon: IcImage },
    { id: 'requests', label: `Requests (${hireRequests.filter(h => h.status === 'pending').length})`, Icon: IcClipboard },
  ]

  const STATS = profile ? [
    { label: 'Rating', value: profile.rating?.toFixed(1) || '0', Icon: IcStar },
    { label: 'Experience', value: `${profile.experience}yr`, Icon: IcCalendar },
    { label: 'Projects', value: profile.completedProjects || 0, Icon: IcCheck },
    { label: 'Requests', value: hireRequests.length, Icon: IcClipboard },
    { label: 'Portfolio', value: profile.portfolio?.length || 0, Icon: IcImage },
  ] : []

  return (
    <div className="page-wrapper" style={{ background: 'var(--bg)' }}>
      <div className="container" style={{ padding: '32px 24px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '28px' }}>
          <div style={{
            width: '46px', height: '46px', borderRadius: '12px',
            background: 'rgba(108,62,232,0.15)', border: '1px solid rgba(108,62,232,0.25)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <IcChart size={22} stroke="var(--primary-light)" />
          </div>
          <div>
            <h2 style={{ margin: 0 }}>Worker <span className="gradient-text">Dashboard</span></h2>
            <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)' }}>Manage your profile and hire requests</p>
          </div>
        </div>

        {/* Stats */}
        {profile && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '14px', marginBottom: '28px' }}>
            {STATS.map(({ label, value, Icon }) => (
              <div key={label} style={{
                background: 'var(--bg-card)', border: '1px solid var(--border)',
                borderRadius: '14px', padding: '18px', display: 'flex', alignItems: 'center', gap: '12px'
              }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '9px', flexShrink: 0,
                  background: 'rgba(108,62,232,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Icon size={17} stroke="var(--primary-light)" />
                </div>
                <div>
                  <div style={{ fontFamily: 'Outfit', fontSize: '1.4rem', fontWeight: '800', color: 'var(--primary-light)', lineHeight: 1 }}>{value}</div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: '3px' }}>{label}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '4px', background: 'var(--bg-surface)', borderRadius: '12px', padding: '4px', marginBottom: '28px', width: 'fit-content' }}>
          {TABS.map(({ id, label, Icon }) => (
            <button key={id} onClick={() => setActiveTab(id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '7px',
                padding: '9px 18px', borderRadius: '9px', border: 'none', cursor: 'pointer',
                background: activeTab === id ? 'var(--primary)' : 'transparent',
                color: activeTab === id ? 'white' : 'var(--text-muted)',
                fontWeight: '600', fontSize: '0.85rem', transition: 'all 0.2s',
                boxShadow: activeTab === id ? '0 4px 12px rgba(108,62,232,0.4)' : 'none'
              }}>
              <Icon size={15} stroke="currentColor" />
              {label}
            </button>
          ))}
        </div>

        {msg && (
          <div className="alert alert-success" style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <IcCheck size={16} /> {msg}
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && profile && (
          <div style={{ maxWidth: '600px' }}>
            <div className="card" style={{ padding: '28px' }}>
              <form onSubmit={handleSaveProfile} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="label">Full Name</label>
                    <input className="input" value={profile.name || ''} onChange={e => setProfile(p => ({ ...p, name: e.target.value }))} />
                  </div>
                  <div className="form-group">
                    <label className="label">Category</label>
                    <select className="input" value={profile.category || ''} onChange={e => setProfile(p => ({ ...p, category: e.target.value }))}>
                      {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div className="form-group">
                  <label className="label">Bio</label>
                  <textarea className="input" rows={3} value={profile.bio || ''} onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))} placeholder="Describe your expertise..." />
                </div>
                <div className="form-group">
                  <label className="label">Skills (comma-separated)</label>
                  <input className="input" value={(profile.skills || []).join(', ')}
                    onChange={e => setProfile(p => ({ ...p, skills: e.target.value.split(',').map(s => s.trim()).filter(Boolean) }))}
                    placeholder="modular kitchen, wooden cabinets, flooring..." />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="label">Experience (years)</label>
                    <input className="input" type="number" min={0} value={profile.experience || 0}
                      onChange={e => setProfile(p => ({ ...p, experience: parseInt(e.target.value) }))} />
                  </div>
                  <div className="form-group">
                    <label className="label">Location</label>
                    <input className="input" value={profile.location || ''} onChange={e => setProfile(p => ({ ...p, location: e.target.value }))} />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="label">Price Range</label>
                    <input className="input" value={profile.priceRange || ''} onChange={e => setProfile(p => ({ ...p, priceRange: e.target.value }))} placeholder="₹800-₹1500/day" />
                  </div>
                  <div className="form-group">
                    <label className="label">Availability</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', height: '46px' }}>
                      <input type="checkbox" checked={profile.isAvailable} onChange={e => setProfile(p => ({ ...p, isAvailable: e.target.checked }))}
                        style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }} />
                      <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Available for work</span>
                    </div>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary" disabled={saving} style={{ alignSelf: 'flex-start', gap: '8px' }}>
                  <IcSave size={16} />
                  {saving ? 'Saving...' : 'Save Profile'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Portfolio Tab */}
        {activeTab === 'portfolio' && (
          <div>
            <div className="card" style={{ padding: '24px', maxWidth: '560px', marginBottom: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <IcPlus size={16} stroke="var(--primary-light)" />
                <h4 style={{ margin: 0 }}>Add Portfolio Item</h4>
              </div>
              <form onSubmit={handleAddPortfolio} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div className="form-group">
                  <label className="label">Title</label>
                  <input className="input" value={newWork.title} onChange={e => setNewWork(w => ({ ...w, title: e.target.value }))} placeholder="e.g., Modern Kitchen Renovation" required />
                </div>
                <div className="form-group">
                  <label className="label">Image URL</label>
                  <input className="input" value={newWork.url} onChange={e => setNewWork(w => ({ ...w, url: e.target.value }))} placeholder="https://..." required />
                </div>
                <div className="form-group">
                  <label className="label">Description</label>
                  <input className="input" value={newWork.desc} onChange={e => setNewWork(w => ({ ...w, desc: e.target.value }))} placeholder="Brief description..." />
                </div>
                <button type="submit" className="btn btn-primary btn-sm" style={{ alignSelf: 'flex-start', gap: '6px' }}>
                  <IcPlus size={14} /> Add Item
                </button>
              </form>
            </div>
            <div className="grid-3">
              {profile?.portfolio?.map((item, i) => (
                <div key={i} className="card" style={{ overflow: 'hidden' }}>
                  <img src={item.url} alt={item.title} style={{ width: '100%', height: '160px', objectFit: 'cover' }}
                    onError={e => e.target.src = 'https://placehold.co/400x300/6C3EE8/fff?text=Portfolio'} />
                  <div style={{ padding: '14px' }}>
                    <div style={{ fontWeight: '600', fontSize: '0.875rem', color: 'var(--text-primary)' }}>{item.title}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>{item.desc}</div>
                  </div>
                </div>
              ))}
              {(!profile?.portfolio || profile.portfolio.length === 0) && (
                <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '14px', background: 'var(--bg-surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
                    <IcImage size={24} stroke="var(--text-muted)" />
                  </div>
                  <p>No portfolio items yet. Add your best work above!</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Requests Tab */}
        {activeTab === 'requests' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {hireRequests.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '18px', background: 'var(--bg-surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <IcClipboard size={28} stroke="var(--text-muted)" />
                </div>
                <h3>No hire requests yet</h3>
              </div>
            ) : hireRequests.map(h => (
              <div key={h._id} className="card" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
                  <div>
                    <div style={{ fontWeight: '700', color: 'var(--text-primary)', marginBottom: '6px' }}>{h.userName}</div>
                    {h.requirement && <p style={{ fontSize: '0.875rem', marginBottom: '8px', maxWidth: '500px' }}>{h.requirement}</p>}
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      {h.scheduledDate && `Scheduled: ${h.scheduledDate} · `}
                      {new Date(h.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                    <span style={{
                      padding: '4px 12px', borderRadius: '999px',
                      background: STATUS_COLOR[h.status] + '18', color: STATUS_COLOR[h.status],
                      fontSize: '0.7rem', fontWeight: '700', textTransform: 'uppercase'
                    }}>{h.status}</span>
                    {h.status === 'pending' && (
                      <>
                        <button className="btn btn-success btn-sm" onClick={() => handleHireStatus(h._id, 'accepted')} style={{ gap: '5px' }}>
                          <IcCheck size={13} /> Accept
                        </button>
                        <button className="btn btn-danger btn-sm" onClick={() => handleHireStatus(h._id, 'rejected')}>Decline</button>
                      </>
                    )}
                    {h.status === 'accepted' && (
                      <button className="btn btn-primary btn-sm" onClick={() => handleHireStatus(h._id, 'completed')} style={{ gap: '5px' }}>
                        <IcCheck size={13} /> Mark Done
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
