import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { API } from '../context/AuthContext'
import WorkerCard from '../components/WorkerCard'
import { IcWorker, IcSearch, IcFilter } from '../components/Icons'

const CATEGORIES = ['All', 'Carpenter', 'Painter', 'Electrician', 'Plumber', 'Mason', 'Interior Designer', 'Civil Contractor', 'Flooring', 'Tiling']
const CITIES = ['All Cities', 'Bengaluru', 'Mumbai', 'Delhi', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Kochi']

export default function WorkersList() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [workers, setWorkers] = useState([])
  const [loading, setLoading] = useState(true)
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState(searchParams.get('category') || 'All')
  const [location, setLocation] = useState('All Cities')
  const [minRating, setMinRating] = useState('')
  const [available, setAvailable] = useState(false)
  const [sort, setSort] = useState('rating')

  useEffect(() => { loadWorkers() }, [category, location, minRating, available, sort, page, search])

  async function loadWorkers() {
    setLoading(true)
    try {
      const params = new URLSearchParams({ page, limit: 12, sort })
      if (category !== 'All') params.set('category', category)
      if (location !== 'All Cities') params.set('location', location)
      if (minRating) params.set('minRating', minRating)
      if (available) params.set('available', 'true')
      if (search) params.set('search', search)
      const { data } = await API.get(`/workers?${params}`)
      setWorkers(data.workers || [])
      setTotal(data.total || 0)
      setPages(data.pages || 1)
    } catch (e) { console.error(e) }
    finally { setLoading(false) }
  }

  return (
    <div className="page-wrapper" style={{ background: 'var(--bg)' }}>
      <div className="container" style={{ padding: '32px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '28px' }}>
          <div style={{
            width: '46px', height: '46px', borderRadius: '12px',
            background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
          }}>
            <IcWorker size={22} stroke="#F59E0B" />
          </div>
          <div>
            <h2 style={{ margin: 0 }}>Browse <span className="gradient-text">Workers</span></h2>
            <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '2px' }}>{total} professionals found</p>
          </div>
        </div>

        {/* Filters */}
        <div className="card" style={{ padding: '20px', marginBottom: '28px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', alignItems: 'end' }}>
            <div className="form-group">
              <label className="label">Search</label>
              <input className="input" value={search}
                onChange={e => { setSearch(e.target.value); setPage(1) }}
                placeholder="Name or skill..." />
            </div>
            <div className="form-group">
              <label className="label">Category</label>
              <select className="input" value={category} onChange={e => { setCategory(e.target.value); setPage(1) }}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="label">City</label>
              <select className="input" value={location} onChange={e => { setLocation(e.target.value); setPage(1) }}>
                {CITIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="label">Min Rating</label>
              <select className="input" value={minRating} onChange={e => { setMinRating(e.target.value); setPage(1) }}>
                <option value="">Any</option>
                {[3, 3.5, 4, 4.5].map(r => <option key={r} value={r}>⭐ {r}+</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="label">Sort By</label>
              <select className="input" value={sort} onChange={e => setSort(e.target.value)}>
                <option value="rating">Rating</option>
                <option value="experience">Experience</option>
                <option value="projects">Projects</option>
              </select>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingBottom: '2px' }}>
              <input type="checkbox" id="avail" checked={available} onChange={e => { setAvailable(e.target.checked); setPage(1) }}
                style={{ width: '16px', height: '16px', accentColor: 'var(--primary)' }} />
              <label htmlFor="avail" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: '500', cursor: 'pointer' }}>
                Available Only
              </label>
            </div>
          </div>

          {/* Category chips */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => { setCategory(c); setPage(1) }}
                className={`chip ${category === c ? 'active' : ''}`}
                style={{ cursor: 'pointer', border: 'none', background: 'none', padding: '0' }}>
                <span className={`chip ${category === c ? 'active' : ''}`}>{c}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid-3">{[1,2,3,4,5,6].map(i => <div key={i} className="skeleton" style={{ height: '280px' }} />)}</div>
        ) : workers.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔍</div>
            <h3>No workers found</h3>
            <p style={{ marginTop: '8px' }}>Try adjusting your filters</p>
          </div>
        ) : (
          <div className="grid-3">
            {workers.map(w => <WorkerCard key={w._id} worker={w} />)}
          </div>
        )}

        {/* Pagination */}
        {pages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '40px' }}>
            <button className="btn btn-ghost btn-sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}>← Prev</button>
            {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
              <button key={p} className={`btn btn-sm ${page === p ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setPage(p)}>{p}</button>
            ))}
            <button className="btn btn-ghost btn-sm" disabled={page === pages} onClick={() => setPage(p => p + 1)}>Next →</button>
          </div>
        )}
      </div>
    </div>
  )
}
