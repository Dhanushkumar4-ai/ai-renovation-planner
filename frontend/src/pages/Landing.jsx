import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  IcWorker, IcUser, IcHome, IcCheck, IcMap,
  IcRobot, IcPalette, IcStar, IcClipboard, IcLock,
  IcChat, IcLayers, IcArrowRight, IcZap, IcTrophy,
  IcCarpenter, IcPainter, IcElectrician, IcPlumber,
  IcMason, IcDesigner, IcContractor, IcFlooring, IcTiling,
  IcBrain, IcSparkle
} from '../components/Icons'

const STATS = [
  { label: 'Expert Workers', value: '50+', Icon: IcWorker },
  { label: 'Happy Clients', value: '50+', Icon: IcUser },
  { label: 'Projects Done', value: '2000+', Icon: IcHome },
  { label: 'Cities Covered', value: '10+', Icon: IcMap },
]

const FEATURES = [
  { Icon: IcRobot, title: 'AI-Powered Matching', desc: 'TF-IDF + Cosine Similarity + Random Forest ranks workers based on your exact renovation needs.', color: '#6C3EE8' },
  { Icon: IcPalette, title: 'Design Ideas Generator', desc: 'Get AI-curated color palettes, flooring suggestions, and interior design concepts instantly.', color: '#EC4899' },
  { Icon: IcStar, title: 'Verified Professionals', desc: 'All workers are verified with portfolios, ratings, and real client reviews.', color: '#F59E0B' },
  { Icon: IcClipboard, title: 'Easy Hiring', desc: 'Hire workers directly through the platform and track project status in real-time.', color: '#10B981' },
  { Icon: IcChat, title: 'Smart Recommendations', desc: 'Natural language input — describe your project and get the best matches instantly.', color: '#3B82F6' },
  { Icon: IcLock, title: 'Secure & Reliable', desc: 'JWT authentication, encrypted data, and transparent pricing with no hidden costs.', color: '#8B5CF6' },
]

const CATEGORIES = [
  { name: 'Carpenter', Icon: IcCarpenter, color: '#8B5CF6' },
  { name: 'Painter', Icon: IcPainter, color: '#F59E0B' },
  { name: 'Electrician', Icon: IcElectrician, color: '#3B82F6' },
  { name: 'Plumber', Icon: IcPlumber, color: '#10B981' },
  { name: 'Mason', Icon: IcMason, color: '#EF4444' },
  { name: 'Interior Designer', Icon: IcDesigner, color: '#EC4899' },
  { name: 'Civil Contractor', Icon: IcContractor, color: '#F97316' },
  { name: 'Flooring', Icon: IcFlooring, color: '#06B6D4' },
  { name: 'Tiling', Icon: IcTiling, color: '#84CC16' },
]

const PIPELINE = [
  { Icon: IcChat, label: 'Your Input', color: '#6C3EE8' },
  { Icon: IcSparkle, label: 'NLP Clean', color: '#8B5CF6' },
  { Icon: IcLayers, label: 'TF-IDF', color: '#A78BFA' },
  { Icon: IcBrain, label: 'Cosine', color: '#F59E0B' },
  { Icon: IcZap, label: 'Random Forest', color: '#10B981' },
  { Icon: IcTrophy, label: 'Top Matches', color: '#EF4444' },
]

const TESTIMONIALS = [
  { name: 'Arjun Sharma', city: 'Bengaluru', text: 'Found an amazing kitchen carpenter within minutes! The AI recommendation was spot-on — it matched my exact requirement for modular cabinets.', rating: 5 },
  { name: 'Kavitha Nair', city: 'Mumbai', text: 'The AI design suggestions gave me ideas I never thought of. Hired an interior designer through Renov-AI and my living room looks stunning!', rating: 5 },
  { name: 'Rohit Mehta', city: 'Delhi', text: 'Quick, reliable, and the worker quality exceeded expectations. The hire history feature makes tracking projects super easy.', rating: 5 },
]

const StarRow = ({ count = 5 }) => (
  <div style={{ display: 'flex', gap: '3px' }}>
    {Array.from({ length: count }).map((_, i) => (
      <IcStar key={i} size={14} stroke="#F59E0B" fill="#F59E0B" />
    ))}
  </div>
)

export default function Landing() {
  const [animIdx, setAnimIdx] = useState(0)
  const words = ['Renovate', 'Transform', 'Redesign', 'Upgrade']

  useEffect(() => {
    const t = setInterval(() => setAnimIdx(i => (i + 1) % words.length), 2000)
    return () => clearInterval(t)
  }, [])

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>

      {/* ===== HERO ===== */}
      <section style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center',
        background: 'radial-gradient(ellipse at 20% 50%, rgba(108,62,232,0.15) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(245,158,11,0.08) 0%, transparent 50%), var(--bg)',
        position: 'relative', overflow: 'hidden', paddingTop: '68px'
      }}>
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.025,
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '48px 48px'
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '780px', margin: '0 auto', textAlign: 'center', padding: '70px 0' }}>

            {/* Live badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              padding: '7px 18px', borderRadius: '999px',
              background: 'rgba(108,62,232,0.12)', border: '1px solid rgba(108,62,232,0.28)',
              marginBottom: '32px'
            }}>
              <span style={{
                width: '7px', height: '7px', borderRadius: '50%', background: '#10B981',
                display: 'inline-block', animation: 'pulse 1.5s ease-in-out infinite'
              }} />
              <span style={{ fontSize: '0.82rem', color: '#A78BFA', fontWeight: '600', letterSpacing: '0.02em' }}>
                AI-Powered Platform · Now Live
              </span>
            </div>

            <h1 style={{ marginBottom: '18px', lineHeight: 1.1 }}>
              <span style={{ display: 'block', fontSize: 'clamp(2.4rem, 5.5vw, 3.8rem)', fontWeight: '900', color: 'var(--text-primary)' }}>
                Let AI Help You
              </span>
              <span style={{
                display: 'block', fontSize: 'clamp(2.4rem, 5.5vw, 3.8rem)', fontWeight: '900',
                background: 'linear-gradient(135deg, #6C3EE8, #A78BFA, #F59E0B)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                transition: 'all 0.4s ease'
              }}>{words[animIdx]} Your Home</span>
            </h1>

            <p style={{ fontSize: 'clamp(1rem, 1.8vw, 1.15rem)', color: 'var(--text-secondary)', maxWidth: '580px', margin: '0 auto 40px', lineHeight: 1.75 }}>
              Describe your renovation project in plain English. Our AI matches you with the perfect professionals using TF-IDF, Cosine Similarity, and Random Forest algorithms.
            </p>

            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/register"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '14px 28px', borderRadius: '12px', textDecoration: 'none',
                  background: 'linear-gradient(135deg, #6C3EE8, #8B5CF6)',
                  color: 'white', fontWeight: '700', fontSize: '0.95rem',
                  boxShadow: '0 6px 24px rgba(108,62,232,0.45)', transition: 'all 0.25s'
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 10px 30px rgba(108,62,232,0.6)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(108,62,232,0.45)' }}>
                Get Started Free <IcArrowRight size={16} />
              </Link>
              <Link to="/workers"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  padding: '14px 28px', borderRadius: '12px', textDecoration: 'none',
                  border: '1px solid rgba(108,62,232,0.4)',
                  color: 'var(--primary-light)', fontWeight: '600', fontSize: '0.95rem',
                  transition: 'all 0.25s', background: 'transparent'
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(108,62,232,0.1)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}>
                <IcWorker size={16} /> Browse Workers
              </Link>
            </div>

            {/* Stats row */}
            <div style={{ display: 'flex', gap: '40px', justifyContent: 'center', marginTop: '60px', flexWrap: 'wrap' }}>
              {STATS.map(({ label, value, Icon }) => (
                <div key={label} style={{ textAlign: 'center' }}>
                  <Icon size={18} stroke="var(--primary-light)" style={{ margin: '0 auto 6px', display: 'block' }} />
                  <div style={{ fontFamily: 'Outfit', fontWeight: '800', fontSize: '1.8rem', color: 'var(--text-primary)' }}>{value}</div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== AI PIPELINE ===== */}
      <section style={{ padding: '80px 0', background: 'var(--bg-card)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2>How the <span className="gradient-text">AI Engine</span> Works</h2>
            <p style={{ marginTop: '10px' }}>Industry-grade ML pipeline delivers precision recommendations</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', flexWrap: 'wrap' }}>
            {PIPELINE.map((step, i) => (
              <React.Fragment key={step.label}>
                <div style={{
                  background: 'var(--bg-surface)', border: `1px solid ${step.color}35`,
                  borderRadius: '14px', padding: '18px 20px', textAlign: 'center', minWidth: '100px',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = step.color + '80'; e.currentTarget.style.transform = 'translateY(-4px)' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = step.color + '35'; e.currentTarget.style.transform = 'translateY(0)' }}>
                  <div style={{
                    width: '40px', height: '40px', borderRadius: '10px', margin: '0 auto 10px',
                    background: step.color + '20', border: `1px solid ${step.color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <step.Icon size={20} stroke={step.color} />
                  </div>
                  <div style={{ fontSize: '0.7rem', color: step.color, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{step.label}</div>
                </div>
                {i < PIPELINE.length - 1 && (
                  <IcArrowRight size={16} stroke="var(--text-muted)" style={{ opacity: 0.4, flexShrink: 0 }} />
                )}
              </React.Fragment>
            ))}
          </div>
          <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.83rem', color: 'var(--text-muted)' }}>
            Final Score = <span style={{ color: 'var(--primary-light)' }}>0.6 × RandomForest</span> + <span style={{ color: '#F59E0B' }}>0.3 × Cosine Similarity</span> + <span style={{ color: '#10B981' }}>0.1 × Rating</span>
          </p>
        </div>
      </section>

      {/* ===== CATEGORIES ===== */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2>Find by <span className="gradient-text">Category</span></h2>
            <p style={{ marginTop: '10px' }}>All home renovation trades in one place</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(148px, 1fr))', gap: '14px' }}>
            {CATEGORIES.map(({ name, Icon, color }) => (
              <Link key={name} to={`/workers?category=${name}`}
                style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px',
                  padding: '22px 14px', background: 'var(--bg-card)', border: '1px solid var(--border)',
                  borderRadius: '16px', textDecoration: 'none', transition: 'all 0.25s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = color + '55'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = `0 8px 30px ${color}20` }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}>
                <div style={{
                  width: '50px', height: '50px', borderRadius: '14px',
                  background: color + '18', border: `1px solid ${color}28`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Icon size={22} stroke={color} />
                </div>
                <span style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-secondary)', textAlign: 'center' }}>{name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section style={{ padding: '80px 0', background: 'var(--bg-card)', borderTop: '1px solid var(--border)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2>Why <span className="gradient-text">RenovAI</span>?</h2>
            <p style={{ marginTop: '10px' }}>Built for the modern homeowner who expects intelligence</p>
          </div>
          <div className="grid-3">
            {FEATURES.map(({ Icon, title, desc, color }) => (
              <div key={title} className="card" style={{ padding: '28px' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = color + '40' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)' }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '12px',
                  background: color + '18', border: `1px solid ${color}25`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px'
                }}>
                  <Icon size={22} stroke={color} />
                </div>
                <h3 style={{ fontSize: '1rem', marginBottom: '10px' }}>{title}</h3>
                <p style={{ fontSize: '0.875rem', lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2>What Clients <span className="gradient-text">Say</span></h2>
          </div>
          <div className="grid-3">
            {TESTIMONIALS.map(({ name, city, text, rating }) => (
              <div key={name} className="card" style={{ padding: '28px' }}>
                <StarRow count={rating} />
                <p style={{ fontSize: '0.875rem', fontStyle: 'italic', margin: '14px 0 20px', lineHeight: 1.75 }}>"{text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '16px', borderTop: '1px solid var(--border)' }}>
                  <div style={{
                    width: '38px', height: '38px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #6C3EE8, #A78BFA)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: '700', color: 'white', fontSize: '0.9rem'
                  }}>{name.charAt(0)}</div>
                  <div>
                    <div style={{ fontWeight: '600', fontSize: '0.875rem', color: 'var(--text-primary)' }}>{name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                      <IcMap size={11} stroke="var(--text-muted)" /> {city}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section style={{
        padding: '80px 0', textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(108,62,232,0.12) 0%, rgba(245,158,11,0.06) 100%)',
        borderTop: '1px solid var(--border)'
      }}>
        <div className="container">
          <div style={{
            width: '60px', height: '60px', borderRadius: '16px', margin: '0 auto 24px',
            background: 'linear-gradient(135deg, #6C3EE8, #8B5CF6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 8px 30px rgba(108,62,232,0.4)'
          }}>
            <IcHome size={28} stroke="white" />
          </div>
          <h2 style={{ marginBottom: '14px' }}>Ready to Transform<br /><span className="gradient-text">Your Home?</span></h2>
          <p style={{ maxWidth: '480px', margin: '0 auto 36px' }}>
            Join thousands of homeowners who found their perfect renovation professional through AI.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '14px 28px', borderRadius: '12px', textDecoration: 'none',
                background: 'linear-gradient(135deg, #6C3EE8, #8B5CF6)',
                color: 'white', fontWeight: '700', fontSize: '0.95rem',
                boxShadow: '0 6px 20px rgba(108,62,232,0.4)', transition: 'all 0.25s'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
              Start for Free <IcArrowRight size={16} />
            </Link>
            <Link to="/login"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '14px 28px', borderRadius: '12px', textDecoration: 'none',
                border: '1px solid rgba(108,62,232,0.35)',
                color: 'var(--primary-light)', fontWeight: '600', fontSize: '0.95rem', transition: 'all 0.25s'
              }}>
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={{ padding: '28px 0', borderTop: '1px solid var(--border)', background: 'var(--bg-card)' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
          <span style={{ fontWeight: '800', color: 'var(--text-primary)', fontFamily: 'Outfit', fontSize: '1.05rem' }}>
            Renov<span style={{ color: 'var(--primary-light)' }}>AI</span>
          </span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>© 2024 RenovAI · AI-Powered Renovation Platform</span>
          <div style={{ display: 'flex', gap: '20px' }}>
            {[{ to: '/workers', label: 'Workers' }, { to: '/login', label: 'Login' }].map(l => (
              <Link key={l.to} to={l.to} style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--text-secondary)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}>{l.label}</Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
