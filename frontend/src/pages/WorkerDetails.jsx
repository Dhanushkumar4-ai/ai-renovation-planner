import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth, API } from '../context/AuthContext'

const CAT_COLORS = {
  Carpenter: '#8B5CF6', Painter: '#F59E0B', Electrician: '#3B82F6',
  Plumber: '#10B981', Mason: '#EF4444', 'Interior Designer': '#EC4899',
  'Civil Contractor': '#F97316', Flooring: '#06B6D4', Tiling: '#84CC16'
}

export default function WorkerDetails() {
  const { id } = useParams()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [worker, setWorker] = useState(null)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [hireForm, setHireForm] = useState({ requirement: '', scheduledDate: '' })
  const [reviewForm, setReviewForm] = useState({ rating: 5, reviewText: '' })
  const [hireMsg, setHireMsg] = useState('')
  const [reviewMsg, setReviewMsg] = useState('')
  const [activeTab, setActiveTab] = useState('portfolio')

  useEffect(() => {
    async function load() {
      try {
        const [wRes, rRes] = await Promise.all([API.get(`/workers/${id}`), API.get(`/reviews/${id}`)])
        setWorker(wRes.data)
        setReviews(rRes.data)
      } catch (e) { console.error(e) }
      finally { setLoading(false) }
    }
    load()
  }, [id])

  async function handleHire(e) {
    e.preventDefault()
    if (!user) { navigate('/login'); return }
    try {
      await API.post('/hire', { workerId: id, ...hireForm })
      setHireMsg('✅ Hire request sent successfully!')
      setHireForm({ requirement: '', scheduledDate: '' })
    } catch (err) { setHireMsg('❌ ' + (err.response?.data?.error || 'Failed')) }
  }

  async function handleReview(e) {
    e.preventDefault()
    if (!user) { navigate('/login'); return }
    try {
      await API.post('/reviews', { workerId: id, ...reviewForm })
      setReviewMsg('✅ Review submitted!')
      const { data } = await API.get(`/reviews/${id}`)
      setReviews(data)
    } catch (err) { setReviewMsg('❌ ' + (err.response?.data?.error || 'Failed')) }
  }

  if (loading) return (
    <div className="page-wrapper flex-center" style={{ minHeight: '100vh' }}>
      <div className="spinner" style={{ width: '48px', height: '48px' }} />
    </div>
  )
  if (!worker) return (
    <div className="page-wrapper flex-center" style={{ minHeight: '100vh', flexDirection: 'column', gap: '16px' }}>
      <div style={{ fontSize: '3rem' }}>😕</div>
      <h3>Worker not found</h3>
    </div>
  )

  const color = CAT_COLORS[worker.category] || '#6C3EE8'
  const initials = worker.name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

  return (
    <div className="page-wrapper" style={{ background: 'var(--bg)' }}>
      {/* Hero banner */}
      <div style={{
        background: `linear-gradient(135deg, ${color}20 0%, rgba(108,62,232,0.1) 100%)`,
        borderBottom: '1px solid var(--border)', padding: '40px 0 0'
      }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '24px', paddingBottom: '32px', flexWrap: 'wrap' }}>
            <div style={{
              width: '100px', height: '100px', borderRadius: '24px', flexShrink: 0,
              background: `linear-gradient(135deg, ${color}, ${color}90)`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '2.5rem', fontWeight: '700', color: 'white',
              boxShadow: `0 8px 30px ${color}40`
            }}>{initials}</div>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '8px' }}>
                <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}>{worker.name}</h2>
                <span style={{
                  padding: '4px 14px', borderRadius: '999px', fontSize: '0.78rem', fontWeight: '700',
                  background: color + '20', color: color, border: `1px solid ${color}40`
                }}>{worker.category}</span>
                <span style={{
                  padding: '4px 12px', borderRadius: '999px', fontSize: '0.78rem', fontWeight: '600',
                  background: worker.isAvailable ? 'rgba(16,185,129,0.15)' : 'rgba(100,116,139,0.1)',
                  color: worker.isAvailable ? '#34D399' : '#64748B'
                }}>{worker.isAvailable ? '● Available' : '○ Busy'}</span>
              </div>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '12px', maxWidth: '600px' }}>{worker.bio}</p>
              <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                {[
                  { label: 'Rating', value: `⭐ ${worker.rating?.toFixed(1) || 0}`, sub: `${worker.reviewCount || 0} reviews` },
                  { label: 'Experience', value: `📅 ${worker.experience}yr` },
                  { label: 'Projects', value: `✅ ${worker.completedProjects}` },
                  { label: 'Location', value: `📍 ${worker.location || 'N/A'}` },
                ].map(s => (
                  <div key={s.label}>
                    <div style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--text-primary)' }}>{s.value}</div>
                    {s.sub && <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{s.sub}</div>}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '4px' }}>{worker.priceRange}</div>
            </div>
          </div>

          {/* Skills */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', paddingBottom: '20px' }}>
            {worker.skills?.map(s => <span key={s} className="chip">{s}</span>)}
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: '0', borderBottom: '1px solid var(--border)' }}>
            {['portfolio', 'hire', 'reviews'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)}
                style={{
                  padding: '12px 24px', background: 'none', border: 'none',
                  cursor: 'pointer', fontWeight: '600', fontSize: '0.875rem',
                  color: activeTab === tab ? 'var(--primary-light)' : 'var(--text-muted)',
                  borderBottom: activeTab === tab ? '2px solid var(--primary-light)' : '2px solid transparent',
                  transition: 'all 0.2s', textTransform: 'capitalize'
                }}>
                {tab === 'portfolio' ? '🖼️ Portfolio' : tab === 'hire' ? '🤝 Hire' : '⭐ Reviews'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '32px 24px' }}>
        {/* Portfolio Tab */}
        {activeTab === 'portfolio' && (
          <div>
            {worker.portfolio?.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px' }}>
                <div style={{ fontSize: '3rem', marginBottom: '12px' }}>📂</div>
                <h3>No portfolio yet</h3>
                <p style={{ marginTop: '8px' }}>This worker hasn't added portfolio images.</p>
              </div>
            ) : (
              <div className="grid-2">
                {worker.portfolio.map((item, i) => (
                  <div key={i} className="card" style={{ overflow: 'hidden' }}>
                    <img src={item.url} alt={item.title}
                      style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }}
                      onError={e => e.target.src = `https://placehold.co/800x500/${color.slice(1)}/fff?text=${encodeURIComponent(item.title)}`} />
                    <div style={{ padding: '16px' }}>
                      <h4 style={{ fontSize: '0.95rem', marginBottom: '6px' }}>{item.title}</h4>
                      <p style={{ fontSize: '0.82rem' }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Hire Tab */}
        {activeTab === 'hire' && (
          <div style={{ maxWidth: '560px' }}>
            <h3 style={{ marginBottom: '6px' }}>Send a Hire Request</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '24px', fontSize: '0.875rem' }}>
              Describe your project and pick a date. The worker will confirm availability.
            </p>
            {hireMsg && (
              <div className={`alert ${hireMsg.startsWith('✅') ? 'alert-success' : 'alert-error'}`} style={{ marginBottom: '20px' }}>
                {hireMsg}
              </div>
            )}
            {!user ? (
              <div className="alert alert-info">Please <a href="/login" style={{ color: 'var(--primary-light)' }}>login</a> to hire this worker.</div>
            ) : (
              <form onSubmit={handleHire} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="form-group">
                  <label className="label">Describe your requirement</label>
                  <textarea className="input" value={hireForm.requirement}
                    onChange={e => setHireForm(f => ({ ...f, requirement: e.target.value }))}
                    placeholder="e.g., I need a modular kitchen with wooden cabinets and marble flooring..."
                    rows={4} required />
                </div>
                <div className="form-group">
                  <label className="label">Preferred Date</label>
                  <input type="date" className="input" value={hireForm.scheduledDate}
                    onChange={e => setHireForm(f => ({ ...f, scheduledDate: e.target.value }))}
                    min={new Date().toISOString().split('T')[0]} />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px' }}>
                  🤝 Send Hire Request
                </button>
              </form>
            )}
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div style={{ maxWidth: '640px' }}>
            {/* Leave review */}
            {user && (
              <div className="card" style={{ padding: '24px', marginBottom: '28px' }}>
                <h4 style={{ marginBottom: '16px' }}>Leave a Review</h4>
                {reviewMsg && (
                  <div className={`alert ${reviewMsg.startsWith('✅') ? 'alert-success' : 'alert-error'}`} style={{ marginBottom: '16px' }}>{reviewMsg}</div>
                )}
                <form onSubmit={handleReview} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <div className="form-group">
                    <label className="label">Rating</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {[1,2,3,4,5].map(r => (
                        <button key={r} type="button" onClick={() => setReviewForm(f => ({ ...f, rating: r }))}
                          style={{
                            width: '40px', height: '40px', borderRadius: '10px', border: 'none',
                            background: r <= reviewForm.rating ? '#F59E0B' : 'var(--bg-surface)',
                            fontSize: '1.2rem', cursor: 'pointer', transition: 'all 0.15s'
                          }}>⭐</button>
                      ))}
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="label">Your Review</label>
                    <textarea className="input" value={reviewForm.reviewText}
                      onChange={e => setReviewForm(f => ({ ...f, reviewText: e.target.value }))}
                      placeholder="Share your experience..." rows={3} />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>Post Review</button>
                </form>
              </div>
            )}

            {/* Reviews list */}
            {reviews.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>💬</div>
                <p>No reviews yet. Be the first!</p>
              </div>
            ) : reviews.map(r => (
              <div key={r._id} className="card" style={{ padding: '20px', marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      width: '36px', height: '36px', borderRadius: '50%',
                      background: 'linear-gradient(135deg, #6C3EE8, #A78BFA)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: '700', color: 'white', fontSize: '0.85rem'
                    }}>{r.userName?.charAt(0) || '?'}</div>
                    <div>
                      <div style={{ fontWeight: '600', fontSize: '0.875rem', color: 'var(--text-primary)' }}>{r.userName}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{new Date(r.createdAt).toLocaleDateString()}</div>
                    </div>
                  </div>
                  <div style={{ color: '#F59E0B' }}>{'⭐'.repeat(r.rating)}</div>
                </div>
                {r.reviewText && <p style={{ fontSize: '0.875rem', lineHeight: 1.7 }}>{r.reviewText}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
