import React, { useState } from 'react'
import { API } from '../context/AuthContext'
import WorkerCard from '../components/WorkerCard'
import {
  IcChat, IcSparkle, IcLayers, IcBrain, IcZap, IcTrophy,
  IcRobot, IcSearch, IcFilter, IcArrowRight
} from '../components/Icons'

const PIPELINE_STEPS = [
  { Icon: IcChat, label: 'Input', color: '#6C3EE8' },
  { Icon: IcSparkle, label: 'NLP Clean', color: '#8B5CF6' },
  { Icon: IcLayers, label: 'TF-IDF', color: '#A78BFA' },
  { Icon: IcBrain, label: 'Cosine Sim', color: '#F59E0B' },
  { Icon: IcZap, label: 'Random Forest', color: '#10B981' },
  { Icon: IcTrophy, label: 'Top Matches', color: '#EF4444' },
]

const EXAMPLES = [
  'Modern modular kitchen with wooden cabinets and marble flooring',
  'Complete bathroom renovation with rain shower and Italian tiles',
  'Full house painting with texture finish in premium colors',
  'Electrical wiring for new 3BHK with home automation setup',
  'False ceiling with cove lighting in living room',
]

export default function RecommendPage() {
  const [requirement, setRequirement] = useState('')
  const [category, setCategory] = useState('')
  const [location, setLocation] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [stage, setStage] = useState(-1)
  const [searched, setSearched] = useState(false)

  async function handleSearch(e) {
    e.preventDefault()
    if (!requirement.trim()) return
    setLoading(true)
    setResults([])
    setSearched(true)
    setStage(0)
    for (let i = 0; i <= 5; i++) {
      await new Promise(r => setTimeout(r, 320))
      setStage(i)
    }
    try {
      const { data } = await API.post('/recommend', { requirement, category: category || undefined, location: location || undefined })
      setResults(data.recommendations || [])
    } catch (err) { console.error(err) }
    finally { setLoading(false) }
  }

  return (
    <div className="page-wrapper" style={{ background: 'var(--bg)' }}>
      <div className="container" style={{ padding: '32px 24px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '6px 16px', borderRadius: '999px',
            background: 'rgba(108,62,232,0.12)', border: '1px solid rgba(108,62,232,0.28)', marginBottom: '16px'
          }}>
            <IcRobot size={14} stroke="#A78BFA" />
            <span style={{ fontSize: '0.8rem', color: '#A78BFA', fontWeight: '600' }}>AI-Powered Matching Engine</span>
          </div>
          <h2>Find Your Perfect <span className="gradient-text">Renovation Expert</span></h2>
          <p style={{ marginTop: '10px', color: 'var(--text-muted)', maxWidth: '520px', margin: '10px auto 0' }}>
            Describe your project in natural language — our ML pipeline matches you with the best professionals
          </p>
        </div>

        {/* Search Form */}
        <div className="card" style={{ padding: '32px', maxWidth: '740px', margin: '0 auto 40px' }}>
          <form onSubmit={handleSearch} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="form-group">
              <label className="label">Describe Your Renovation Requirement</label>
              <textarea className="input" value={requirement} onChange={e => setRequirement(e.target.value)}
                placeholder='e.g., "I need a modern modular kitchen with wooden cabinets and white marble flooring under ₹5 lakhs..."'
                rows={4} required style={{ fontSize: '0.95rem', lineHeight: 1.6 }} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="label">Category <span style={{ color: 'var(--text-muted)', fontWeight: '400', textTransform: 'none' }}>(optional)</span></label>
                <select className="input" value={category} onChange={e => setCategory(e.target.value)}>
                  <option value="">All Categories</option>
                  {['Carpenter', 'Painter', 'Electrician', 'Plumber', 'Mason', 'Interior Designer', 'Civil Contractor', 'Flooring', 'Tiling'].map(c =>
                    <option key={c}>{c}</option>
                  )}
                </select>
              </div>
              <div className="form-group">
                <label className="label">City <span style={{ color: 'var(--text-muted)', fontWeight: '400', textTransform: 'none' }}>(optional)</span></label>
                <input className="input" value={location} onChange={e => setLocation(e.target.value)} placeholder="e.g., Bengaluru" />
              </div>
            </div>
            <button type="submit" className="btn btn-primary btn-lg" disabled={loading} style={{ width: '100%', gap: '10px' }}>
              {loading ? (
                <><span className="spinner" style={{ width: '17px', height: '17px', borderWidth: '2px' }} /> Running ML Pipeline...</>
              ) : (
                <><IcRobot size={18} /> Find My Expert</>
              )}
            </button>
          </form>

          {/* Example queries */}
          <div style={{ marginTop: '22px', paddingTop: '22px', borderTop: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
              <IcSearch size={12} stroke="var(--text-muted)" />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Try these examples</span>
            </div>
            <div style={{ display: 'flex', gap: '7px', flexWrap: 'wrap' }}>
              {EXAMPLES.map(ex => (
                <button key={ex} onClick={() => setRequirement(ex)}
                  style={{
                    padding: '5px 13px', background: 'var(--bg-surface)', border: '1px solid var(--border)',
                    borderRadius: '999px', cursor: 'pointer', color: 'var(--text-secondary)',
                    fontSize: '0.74rem', fontWeight: '500', transition: 'all 0.2s',
                    maxWidth: '240px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'
                  }}
                  title={ex}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--primary-light)'; e.currentTarget.style.color = 'var(--primary-light)' }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text-secondary)' }}>
                  {ex}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ML Pipeline Visualization */}
        {(loading || searched) && (
          <div style={{ maxWidth: '740px', margin: '0 auto 40px' }}>
            <p style={{ textAlign: 'center', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '18px' }}>
              {loading ? 'Processing through AI pipeline...' : 'Pipeline complete'}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', flexWrap: 'wrap' }}>
              {PIPELINE_STEPS.map(({ Icon, label, color }, i) => (
                <React.Fragment key={label}>
                  <div style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
                    opacity: stage >= i ? 1 : 0.25, transition: 'opacity 0.4s ease, transform 0.3s ease',
                    transform: stage >= i ? 'scale(1)' : 'scale(0.9)'
                  }}>
                    <div style={{
                      width: '44px', height: '44px', borderRadius: '12px',
                      background: stage >= i ? color + '25' : 'var(--bg-surface)',
                      border: `2px solid ${stage >= i ? color : 'var(--border)'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.3s',
                      boxShadow: stage >= i ? `0 0 16px ${color}35` : 'none'
                    }}>
                      <Icon size={20} stroke={stage >= i ? color : 'var(--text-muted)'} />
                    </div>
                    <div style={{ fontSize: '0.62rem', color: stage >= i ? color : 'var(--text-muted)', fontWeight: '700', textTransform: 'uppercase', textAlign: 'center', maxWidth: '58px' }}>{label}</div>
                  </div>
                  {i < PIPELINE_STEPS.length - 1 && (
                    <IcArrowRight size={14} stroke={stage > i ? 'var(--primary-light)' : 'var(--text-muted)'}
                      style={{ opacity: stage > i ? 0.8 : 0.2, transition: 'all 0.3s', flexShrink: 0 }} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {results.length > 0 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <IcTrophy size={22} stroke="var(--primary-light)" />
                <h3 style={{ margin: 0 }}>{results.length} Matched Professionals</h3>
              </div>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '5px',
                padding: '4px 12px', borderRadius: '999px', fontSize: '0.75rem', fontWeight: '700',
                background: 'rgba(108,62,232,0.15)', color: 'var(--primary-light)',
                border: '1px solid rgba(108,62,232,0.25)'
              }}>
                <IcRobot size={12} /> Ranked by AI
              </span>
            </div>

            {/* Score formula banner */}
            <div style={{
              marginBottom: '20px', padding: '12px 18px',
              background: 'rgba(108,62,232,0.07)', border: '1px solid rgba(108,62,232,0.18)',
              borderRadius: '10px', fontSize: '0.8rem', color: 'var(--text-muted)',
              display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap'
            }}>
              <IcBrain size={14} stroke="var(--primary-light)" />
              <strong style={{ color: 'var(--primary-light)' }}>Ranking Formula:</strong>
              Final Score = 0.6 × Random Forest + 0.3 × Cosine Similarity + 0.1 × Normalized Rating
            </div>

            <div className="grid-3">
              {results.map(w => <WorkerCard key={w._id} worker={w} showScore={true} />)}
            </div>
          </div>
        )}

        {searched && !loading && results.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{
              width: '64px', height: '64px', borderRadius: '18px', margin: '0 auto 20px',
              background: 'var(--bg-surface)', border: '1px solid var(--border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <IcSearch size={28} stroke="var(--text-muted)" />
            </div>
            <h3>No matches found</h3>
            <p style={{ marginTop: '8px' }}>Try a different requirement or remove the category filter</p>
          </div>
        )}
      </div>
    </div>
  )
}
