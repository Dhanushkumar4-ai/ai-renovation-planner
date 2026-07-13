import React, { useState, useEffect } from 'react'
import { API } from '../context/AuthContext'
import { IcClipboard, IcClock, IcCalendar, IcCheck } from '../components/Icons'

const STATUS_COLOR = { pending: '#F59E0B', accepted: '#10B981', rejected: '#EF4444', completed: '#6C3EE8' }
const STATUS_BG    = { pending: 'rgba(245,158,11,0.12)', accepted: 'rgba(16,185,129,0.12)', rejected: 'rgba(239,68,68,0.12)', completed: 'rgba(108,62,232,0.12)' }

const StatusDot = ({ status }) => (
  <span style={{
    width: '7px', height: '7px', borderRadius: '50%', display: 'inline-block', flexShrink: 0,
    background: STATUS_COLOR[status] || '#64748B'
  }} />
)

export default function HireHistory() {
  const [hires, setHires] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    API.get('/hire/history').then(({ data }) => setHires(data)).catch(console.error).finally(() => setLoading(false))
  }, [])

  const filtered = filter === 'all' ? hires : hires.filter(h => h.status === filter)

  const TABS = [
    { id: 'all', label: 'All' },
    { id: 'pending', label: 'Pending' },
    { id: 'accepted', label: 'Accepted' },
    { id: 'completed', label: 'Completed' },
    { id: 'rejected', label: 'Rejected' },
  ]

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
            <IcClipboard size={22} stroke="var(--primary-light)" />
          </div>
          <div>
            <h2 style={{ margin: 0 }}>My <span className="gradient-text">Hire History</span></h2>
            <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)' }}>{hires.length} total requests</p>
          </div>
        </div>

        {/* Filter tabs */}
        <div style={{ display: 'flex', gap: '7px', marginBottom: '24px', flexWrap: 'wrap' }}>
          {TABS.map(({ id, label }) => (
            <button key={id} onClick={() => setFilter(id)}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '7px 18px', borderRadius: '999px', border: 'none', cursor: 'pointer',
                background: filter === id ? 'var(--primary)' : 'var(--bg-surface)',
                color: filter === id ? 'white' : 'var(--text-muted)',
                fontWeight: '600', fontSize: '0.82rem', transition: 'all 0.2s'
              }}>
              {id !== 'all' && <StatusDot status={id} />}
              {label}
              <span style={{
                fontSize: '0.68rem', padding: '1px 7px', borderRadius: '999px',
                background: filter === id ? 'rgba(255,255,255,0.2)' : 'var(--bg-elevated)',
                color: filter === id ? 'white' : 'var(--text-muted)'
              }}>
                {id === 'all' ? hires.length : hires.filter(h => h.status === id).length}
              </span>
            </button>
          ))}
        </div>

        {loading ? (
          <div>{[1,2,3].map(i => <div key={i} className="skeleton" style={{ height: '90px', marginBottom: '12px', borderRadius: '12px' }} />)}</div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{
              width: '64px', height: '64px', borderRadius: '18px', margin: '0 auto 18px',
              background: 'var(--bg-surface)', border: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <IcClipboard size={28} stroke="var(--text-muted)" />
            </div>
            <h3>No hire requests</h3>
            <p style={{ marginTop: '8px' }}>Your hiring history will appear here.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filtered.map(h => (
              <div key={h._id} className="card" style={{ padding: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    {/* Avatar */}
                    <div style={{
                      width: '46px', height: '46px', borderRadius: '12px', flexShrink: 0,
                      background: 'linear-gradient(135deg, #6C3EE8, #8B5CF6)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: '700', color: 'white', fontSize: '1rem'
                    }}>{h.workerName?.charAt(0) || '?'}</div>
                    <div>
                      <div style={{ fontWeight: '700', fontSize: '0.925rem', color: 'var(--text-primary)', marginBottom: '4px' }}>{h.workerName}</div>
                      {h.requirement && (
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', maxWidth: '380px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginBottom: '4px' }}>
                          {h.requirement}
                        </div>
                      )}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                        {h.scheduledDate && (
                          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                            <IcCalendar size={11} stroke="var(--text-muted)" />
                            {h.scheduledDate}
                          </span>
                        )}
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                          <IcClock size={11} stroke="var(--text-muted)" />
                          {new Date(h.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                    </div>
                  </div>

                  <span style={{
                    display: 'flex', alignItems: 'center', gap: '6px',
                    padding: '6px 14px', borderRadius: '999px',
                    background: STATUS_BG[h.status], color: STATUS_COLOR[h.status],
                    fontSize: '0.72rem', fontWeight: '700', textTransform: 'uppercase',
                    letterSpacing: '0.05em', flexShrink: 0
                  }}>
                    <StatusDot status={h.status} />
                    {h.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
