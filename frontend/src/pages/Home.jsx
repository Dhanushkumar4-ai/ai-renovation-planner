import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth, API } from '../context/AuthContext'
import WorkerCard from '../components/WorkerCard'
import { IcRobot, IcWorker, IcClipboard, IcUser, IcPalette, IcArrowRight, IcStar, IcClock } from '../components/Icons'

const STATUS_COLOR = { pending: '#F59E0B', accepted: '#10B981', rejected: '#EF4444', completed: '#6C3EE8' }
const STATUS_BG = { pending: 'rgba(245,158,11,0.12)', accepted: 'rgba(16,185,129,0.12)', rejected: 'rgba(239,68,68,0.12)', completed: 'rgba(108,62,232,0.12)' }

export default function Home() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [designPrompt, setDesignPrompt] = useState('')
  const [designResult, setDesignResult] = useState(null)
  const [designLoading, setDesignLoading] = useState(false)
  const [workers, setWorkers] = useState([])
  const [workersLoading, setWorkersLoading] = useState(true)
  const [hireHistory, setHireHistory] = useState([])

  useEffect(() => {
    async function loadData() {
      try {
        const [wRes, hRes] = await Promise.allSettled([
          API.get('/workers?limit=6&sort=rating'),
          user?.role === 'homeowner' ? API.get('/hire/history') : Promise.resolve({ data: [] })
        ])
        if (wRes.status === 'fulfilled') setWorkers(wRes.value.data.workers || [])
        if (hRes.status === 'fulfilled') setHireHistory(hRes.value.data?.slice(0, 3) || [])
      } catch (e) { console.error(e) }
      finally { setWorkersLoading(false) }
    }
    loadData()
  }, [])

  async function handleDesign(e) {
    e.preventDefault()
    if (!designPrompt.trim()) return
    setDesignLoading(true)
    setDesignResult(null)
    try {
      const { data } = await API.post('/design', { prompt: designPrompt })
      setDesignResult(data)
    } catch {
      setDesignResult({ text: 'Could not generate design suggestions. Please check your connection.', source: 'error' })
    } finally { setDesignLoading(false) }
  }

  const QUICK_ACTIONS = [
    { icon: IcRobot, label: 'AI Worker Match', sub: 'Get AI recommendations', to: '/recommend', color: '#6C3EE8' },
    { icon: IcWorker, label: 'Browse Workers', sub: 'View all professionals', to: '/workers', color: '#F59E0B' },
    { icon: IcClipboard, label: 'Hire History', sub: 'Track your projects', to: '/hire-history', color: '#10B981' },
    { icon: IcUser, label: 'My Profile', sub: 'Manage account', to: '/profile', color: '#EC4899' },
  ]

  return (
    <div className="page-wrapper" style={{ background: 'var(--bg)' }}>
      <div className="container" style={{ padding: '32px 24px' }}>

        {/* Welcome */}
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ marginBottom: '6px' }}>
            Welcome back, <span className="gradient-text">{user?.name?.split(' ')[0]}</span>
          </h2>
          <p style={{ color: 'var(--text-muted)' }}>What would you like to renovate today?</p>
        </div>

        {/* Quick Actions */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '40px' }}>
          {QUICK_ACTIONS.map(({ icon: Icon, label, sub, to, color }) => (
            <Link key={to} to={to} style={{ textDecoration: 'none' }}>
              <div style={{
                background: 'var(--bg-card)', border: '1px solid var(--border)',
                borderRadius: '16px', padding: '18px', display: 'flex', alignItems: 'center', gap: '14px',
                transition: 'all 0.25s', cursor: 'pointer'
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = color + '55'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = `0 8px 24px ${color}18` }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '12px', flexShrink: 0,
                  background: color + '18', border: `1px solid ${color}25`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Icon size={20} stroke={color} />
                </div>
                <div>
                  <div style={{ fontWeight: '600', fontSize: '0.875rem', color: 'var(--text-primary)', marginBottom: '2px' }}>{label}</div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{sub}</div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {/* AI Design Ideas */}
          <div>
            <div className="card" style={{ padding: '26px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '10px', flexShrink: 0,
                  background: 'rgba(236,72,153,0.15)', border: '1px solid rgba(236,72,153,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <IcPalette size={20} stroke="#EC4899" />
                </div>
                <div>
                  <h3 style={{ fontSize: '1rem', marginBottom: '2px' }}>AI Design Ideas</h3>
                  <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', margin: 0 }}>Describe your room, get suggestions</p>
                </div>
              </div>
              <form onSubmit={handleDesign} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <textarea className="input" value={designPrompt} onChange={e => setDesignPrompt(e.target.value)}
                  placeholder='"Modern modular kitchen under ₹5 lakhs with wooden cabinets..."'
                  rows={3} required />
                <button type="submit" className="btn btn-primary" disabled={designLoading} style={{ gap: '8px' }}>
                  {designLoading ? (
                    <><span className="spinner" style={{ width: '15px', height: '15px', borderWidth: '2px' }} /> Generating...</>
                  ) : (
                    <><IcPalette size={15} /> Generate Ideas</>
                  )}
                </button>
              </form>
              {designResult && (
                <div style={{
                  marginTop: '18px', padding: '16px', background: 'var(--bg-surface)',
                  borderRadius: '10px', fontSize: '0.85rem', lineHeight: 1.8,
                  color: 'var(--text-secondary)', whiteSpace: 'pre-wrap',
                  borderLeft: '3px solid #EC4899'
                }}>{designResult.text}</div>
              )}
            </div>
          </div>

          {/* Recent Hires */}
          <div>
            <div className="card" style={{ padding: '26px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '10px', flexShrink: 0,
                    background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <IcClipboard size={20} stroke="#10B981" />
                  </div>
                  <h3 style={{ fontSize: '1rem', margin: 0 }}>Recent Hires</h3>
                </div>
                <Link to="/hire-history" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.78rem', color: 'var(--primary-light)', textDecoration: 'none', fontWeight: '600' }}>
                  View all <IcArrowRight size={12} />
                </Link>
              </div>

              {hireHistory.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '28px 0' }}>
                  <div style={{ width: '52px', height: '52px', borderRadius: '14px', background: 'var(--bg-surface)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                    <IcClipboard size={22} stroke="var(--text-muted)" />
                  </div>
                  <p style={{ fontSize: '0.875rem', margin: '0 0 14px' }}>No hires yet.</p>
                  <Link to="/recommend" className="btn btn-primary btn-sm" style={{ gap: '6px' }}>
                    <IcRobot size={13} /> Find a Worker
                  </Link>
                </div>
              ) : hireHistory.map(h => (
                <div key={h._id} style={{ padding: '13px', background: 'var(--bg-surface)', borderRadius: '10px', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontWeight: '600', fontSize: '0.875rem', color: 'var(--text-primary)', marginBottom: '3px' }}>{h.workerName}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        <IcClock size={10} stroke="var(--text-muted)" />
                        {new Date(h.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <span style={{
                      padding: '3px 10px', borderRadius: '999px', fontSize: '0.68rem', fontWeight: '700',
                      color: STATUS_COLOR[h.status], background: STATUS_BG[h.status], textTransform: 'uppercase', letterSpacing: '0.04em'
                    }}>{h.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Workers */}
        <div style={{ marginTop: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <IcStar size={20} stroke="#F59E0B" />
              <h3 style={{ margin: 0 }}>Top Rated Workers</h3>
            </div>
            <Link to="/workers" style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.82rem', color: 'var(--primary-light)', textDecoration: 'none', fontWeight: '600' }}>
              See all <IcArrowRight size={13} />
            </Link>
          </div>
          {workersLoading ? (
            <div className="grid-3">{[1,2,3].map(i => <div key={i} className="skeleton" style={{ height: '260px' }} />)}</div>
          ) : (
            <div className="grid-3">
              {workers.map(w => <WorkerCard key={w._id} worker={w} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
