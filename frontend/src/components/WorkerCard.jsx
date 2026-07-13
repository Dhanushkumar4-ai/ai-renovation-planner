import React from 'react'
import { Link } from 'react-router-dom'
import { CAT_ICON_MAP, IcStar, IcCalendar, IcCheck, IcMap, IcArrowRight, IcDot } from './Icons'

const CAT_COLORS = {
  Carpenter: '#8B5CF6', Painter: '#F59E0B', Electrician: '#3B82F6',
  Plumber: '#10B981', Mason: '#EF4444', 'Interior Designer': '#EC4899',
  'Civil Contractor': '#F97316', Flooring: '#06B6D4', Tiling: '#84CC16'
}

export default function WorkerCard({ worker, showScore }) {
  const color = CAT_COLORS[worker.category] || '#6C3EE8'
  const CatIcon = CAT_ICON_MAP[worker.category]
  const initials = worker.name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

  return (
    <Link to={`/worker/${worker._id}`} style={{ textDecoration: 'none' }}>
      <div className="worker-card">
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
          {/* Avatar */}
          <div style={{
            width: '52px', height: '52px', borderRadius: '14px', flexShrink: 0,
            background: `linear-gradient(135deg, ${color}35, ${color}18)`,
            border: `1px solid ${color}35`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'Outfit, sans-serif', fontWeight: '800', fontSize: '1.1rem', color: color
          }}>{initials}</div>

          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '6px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {worker.name}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '7px', flexWrap: 'wrap' }}>
              {/* Category badge */}
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '5px',
                fontSize: '0.7rem', padding: '3px 9px', borderRadius: '999px',
                background: color + '18', color: color, fontWeight: '700', border: `1px solid ${color}28`
              }}>
                {CatIcon && <CatIcon size={11} stroke={color} />}
                {worker.category}
              </span>
              {/* Availability */}
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: '5px',
                fontSize: '0.7rem', padding: '3px 9px', borderRadius: '999px',
                background: worker.isAvailable ? 'rgba(16,185,129,0.12)' : 'rgba(100,116,139,0.12)',
                color: worker.isAvailable ? '#34D399' : '#64748B', fontWeight: '600'
              }}>
                <IcDot size={6} color={worker.isAvailable ? '#10B981' : '#64748B'} />
                {worker.isAvailable ? 'Available' : 'Busy'}
              </span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
          {[
            { label: 'Rating', value: worker.rating?.toFixed(1) || 'N/A', Icon: IcStar },
            { label: 'Exp', value: `${worker.experience}yr`, Icon: IcCalendar },
            { label: 'Jobs', value: worker.completedProjects || 0, Icon: IcCheck },
          ].map(({ label, value, Icon }) => (
            <div key={label} style={{
              background: 'var(--bg-surface)', borderRadius: '10px', padding: '10px 8px',
              textAlign: 'center', border: '1px solid var(--border)'
            }}>
              <Icon size={13} stroke="var(--text-muted)" style={{ margin: '0 auto 3px', display: 'block' }} />
              <div style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--text-primary)', lineHeight: 1.2 }}>{value}</div>
              <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '1px' }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
          {worker.skills?.slice(0, 3).map(s => (
            <span key={s} style={{
              padding: '3px 10px', background: 'var(--bg-elevated)',
              border: '1px solid var(--border-light)', borderRadius: '999px',
              fontSize: '0.7rem', fontWeight: '500', color: 'var(--text-secondary)'
            }}>{s}</span>
          ))}
          {worker.skills?.length > 3 && (
            <span style={{
              padding: '3px 10px', background: 'var(--bg-elevated)',
              border: '1px solid var(--border-light)', borderRadius: '999px',
              fontSize: '0.7rem', fontWeight: '500', color: 'var(--text-muted)'
            }}>+{worker.skills.length - 3}</span>
          )}
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid var(--border)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.76rem', color: 'var(--text-muted)' }}>
            <IcMap size={12} stroke="var(--text-muted)" />
            {worker.location || 'N/A'}
          </span>
          <span style={{
            display: 'flex', alignItems: 'center', gap: '4px',
            fontSize: '0.76rem', color: 'var(--primary-light)', fontWeight: '600'
          }}>
            {worker.priceRange || 'Contact'} <IcArrowRight size={12} />
          </span>
        </div>

        {/* AI Score Bar */}
        {showScore && worker.finalScore !== undefined && (
          <div style={{ paddingTop: '10px', borderTop: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '7px' }}>
              <span style={{ fontSize: '0.7rem', color: 'var(--primary-light)', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--primary-light)" strokeWidth="2" strokeLinecap="round">
                  <rect x="3" y="8" width="18" height="12" rx="2"/>
                  <path d="M9 8V6a3 3 0 016 0v2"/>
                  <circle cx="9" cy="14" r="1.5" fill="var(--primary-light)" stroke="none"/>
                  <circle cx="15" cy="14" r="1.5" fill="var(--primary-light)" stroke="none"/>
                </svg>
                AI Match Score
              </span>
              <span style={{ fontSize: '0.72rem', color: 'var(--primary-light)', fontWeight: '800' }}>{Math.round(worker.finalScore * 100)}%</span>
            </div>
            <div style={{ height: '5px', background: 'var(--bg-elevated)', borderRadius: '999px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${worker.finalScore * 100}%`, background: 'linear-gradient(90deg, #6C3EE8, #A78BFA)', borderRadius: '999px', transition: 'width 0.8s ease' }} />
            </div>
          </div>
        )}
      </div>
    </Link>
  )
}
