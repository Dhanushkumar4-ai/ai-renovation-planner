import React, { useState, useEffect } from 'react'
import { API } from '../context/AuthContext'
import {
  IcShield, IcUser, IcWorker, IcClipboard, IcStar,
  IcChart, IcTrash, IcCheck, IcAlert, IcGrid
} from '../components/Icons'

export default function AdminDashboard() {
  const [stats, setStats] = useState({})
  const [users, setUsers] = useState([])
  const [workers, setWorkers] = useState([])
  const [hires, setHires] = useState([])
  const [tab, setTab] = useState('overview')
  const [loading, setLoading] = useState(true)

  useEffect(() => { loadAll() }, [])

  async function loadAll() {
    setLoading(true)
    try {
      const [sRes, uRes, wRes, hRes] = await Promise.all([
        API.get('/admin/stats'), API.get('/admin/users'), API.get('/admin/workers'), API.get('/admin/hires')
      ])
      setStats(sRes.data)
      setUsers(uRes.data)
      setWorkers(wRes.data)
      setHires(hRes.data)
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  async function deleteUser(id) {
    if (!confirm('Delete this user?')) return
    await API.delete(`/admin/users/${id}`)
    setUsers(u => u.filter(x => x._id !== id))
  }
  async function deleteWorker(id) {
    if (!confirm('Delete this worker?')) return
    await API.delete(`/admin/workers/${id}`)
    setWorkers(w => w.filter(x => x._id !== id))
  }
  async function toggleApprove(id, current) {
    const { data } = await API.put(`/admin/workers/${id}/approve`, { isApproved: !current })
    setWorkers(prev => prev.map(w => w._id === id ? { ...w, isApproved: data.isApproved } : w))
  }

  const STAT_CARDS = [
    { label: 'Total Users', value: stats.users, Icon: IcUser, color: '#6C3EE8' },
    { label: 'Total Workers', value: stats.workers, Icon: IcWorker, color: '#F59E0B' },
    { label: 'Hire Requests', value: stats.hires, Icon: IcClipboard, color: '#10B981' },
    { label: 'Reviews', value: stats.reviews, Icon: IcStar, color: '#EF4444' },
  ]

  const TABS = [
    { id: 'overview', label: 'Overview', Icon: IcGrid },
    { id: 'users', label: `Users (${users.length})`, Icon: IcUser },
    { id: 'workers', label: `Workers (${workers.length})`, Icon: IcWorker },
    { id: 'hires', label: `Hires (${hires.length})`, Icon: IcClipboard },
  ]

  return (
    <div className="page-wrapper" style={{ background: 'var(--bg)' }}>
      <div className="container" style={{ padding: '32px 24px' }}>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '28px' }}>
          <div style={{
            width: '46px', height: '46px', borderRadius: '12px',
            background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <IcShield size={22} stroke="#EF4444" />
          </div>
          <div>
            <h2 style={{ margin: 0 }}>Admin <span className="gradient-text">Dashboard</span></h2>
            <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)' }}>Platform management & monitoring</p>
          </div>
        </div>

        {/* Stat Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          {STAT_CARDS.map(({ label, value, Icon, color }) => (
            <div key={label} style={{
              background: 'var(--bg-card)', border: `1px solid ${color}28`,
              borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', gap: '16px'
            }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '12px', flexShrink: 0,
                background: color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                <Icon size={22} stroke={color} />
              </div>
              <div>
                <div style={{ fontFamily: 'Outfit', fontSize: '2rem', fontWeight: '800', color: color, lineHeight: 1 }}>{value ?? '—'}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.04em', marginTop: '4px' }}>{label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '4px', background: 'var(--bg-surface)', borderRadius: '12px', padding: '4px', marginBottom: '28px', width: 'fit-content', flexWrap: 'wrap' }}>
          {TABS.map(({ id, label, Icon }) => (
            <button key={id} onClick={() => setTab(id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '7px',
                padding: '9px 18px', borderRadius: '9px', border: 'none', cursor: 'pointer',
                background: tab === id ? 'var(--primary)' : 'transparent',
                color: tab === id ? 'white' : 'var(--text-muted)',
                fontWeight: '600', fontSize: '0.83rem', transition: 'all 0.2s',
                boxShadow: tab === id ? '0 4px 12px rgba(108,62,232,0.4)' : 'none'
              }}>
              <Icon size={14} stroke="currentColor" /> {label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex-center" style={{ padding: '60px' }}><div className="spinner" /></div>
        ) : (
          <>
            {/* Overview */}
            {tab === 'overview' && (
              <div className="grid-2">
                <div className="card" style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
                    <IcClipboard size={17} stroke="var(--primary-light)" />
                    <h4 style={{ margin: 0, fontSize: '0.95rem' }}>Recent Hire Requests</h4>
                  </div>
                  {hires.slice(0, 5).map(h => (
                    <div key={h._id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                      <div>
                        <div style={{ fontWeight: '600', fontSize: '0.85rem' }}>{h.userName} → {h.workerName}</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>{new Date(h.createdAt).toLocaleDateString()}</div>
                      </div>
                      <span style={{ fontSize: '0.7rem', padding: '3px 10px', borderRadius: '999px', background: 'rgba(108,62,232,0.14)', color: 'var(--primary-light)', fontWeight: '700', alignSelf: 'flex-start' }}>{h.status}</span>
                    </div>
                  ))}
                </div>
                <div className="card" style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '18px' }}>
                    <IcChart size={17} stroke="var(--primary-light)" />
                    <h4 style={{ margin: 0, fontSize: '0.95rem' }}>Workers by Category</h4>
                  </div>
                  {['Carpenter', 'Painter', 'Electrician', 'Plumber', 'Interior Designer'].map(cat => {
                    const count = workers.filter(w => w.category === cat).length
                    const pct = workers.length ? (count / workers.length) * 100 : 0
                    return (
                      <div key={cat} style={{ marginBottom: '12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                          <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{cat}</span>
                          <span style={{ fontWeight: '700', color: 'var(--primary-light)', fontSize: '0.82rem' }}>{count}</span>
                        </div>
                        <div style={{ height: '4px', background: 'var(--bg-elevated)', borderRadius: '999px', overflow: 'hidden' }}>
                          <div style={{ height: '100%', width: `${pct}%`, background: 'var(--gradient-primary)', borderRadius: '999px', transition: 'width 0.6s ease' }} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Users Table */}
            {tab === 'users' && (
              <div className="card" style={{ overflow: 'hidden' }}>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th><th>Email</th><th>Role</th><th>Phone</th><th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(u => (
                      <tr key={u._id}>
                        <td><div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{u.name}</div></td>
                        <td style={{ fontSize: '0.82rem' }}>{u.email}</td>
                        <td>
                          <span className={`badge badge-${u.role === 'admin' ? 'danger' : u.role === 'worker' ? 'warning' : 'primary'}`}
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                            {u.role === 'admin' ? <IcShield size={11} /> : u.role === 'worker' ? <IcWorker size={11} /> : <IcUser size={11} />}
                            {u.role}
                          </span>
                        </td>
                        <td style={{ fontSize: '0.82rem' }}>{u.phone || '—'}</td>
                        <td>
                          {u.role !== 'admin' && (
                            <button className="btn btn-danger btn-sm" onClick={() => deleteUser(u._id)} style={{ gap: '5px' }}>
                              <IcTrash size={13} /> Delete
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Workers Table */}
            {tab === 'workers' && (
              <div className="card" style={{ overflow: 'hidden' }}>
                <table className="table">
                  <thead>
                    <tr><th>Name</th><th>Category</th><th>Rating</th><th>Location</th><th>Status</th><th>Actions</th></tr>
                  </thead>
                  <tbody>
                    {workers.map(w => (
                      <tr key={w._id}>
                        <td><div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{w.name}</div></td>
                        <td style={{ fontSize: '0.82rem' }}>{w.category}</td>
                        <td>
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.82rem' }}>
                            <IcStar size={12} stroke="#F59E0B" /> {w.rating?.toFixed(1) || 0}
                          </span>
                        </td>
                        <td style={{ fontSize: '0.82rem' }}>{w.location || '—'}</td>
                        <td>
                          <span className={`badge badge-${w.isApproved ? 'success' : 'warning'}`}
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                            {w.isApproved ? <IcCheck size={11} /> : <IcAlert size={11} />}
                            {w.isApproved ? 'Approved' : 'Pending'}
                          </span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '6px' }}>
                            <button className={`btn btn-sm ${w.isApproved ? 'btn-ghost' : 'btn-success'}`} onClick={() => toggleApprove(w._id, w.isApproved)}>
                              {w.isApproved ? 'Suspend' : 'Approve'}
                            </button>
                            <button className="btn btn-danger btn-sm" onClick={() => deleteWorker(w._id)} style={{ gap: '4px' }}>
                              <IcTrash size={12} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Hires Table */}
            {tab === 'hires' && (
              <div className="card" style={{ overflow: 'hidden' }}>
                <table className="table">
                  <thead>
                    <tr><th>User</th><th>Worker</th><th>Requirement</th><th>Date</th><th>Status</th></tr>
                  </thead>
                  <tbody>
                    {hires.slice(0, 50).map(h => (
                      <tr key={h._id}>
                        <td>{h.userName}</td>
                        <td>{h.workerName}</td>
                        <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: '0.82rem' }}>{h.requirement || '—'}</td>
                        <td style={{ fontSize: '0.82rem' }}>{new Date(h.createdAt).toLocaleDateString()}</td>
                        <td><span className="badge badge-primary">{h.status}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
