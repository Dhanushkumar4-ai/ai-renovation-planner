import React from 'react'

/**
 * Renov-AI Custom SVG Icon Library
 * Clean, minimal line icons — no emojis
 */

const defaultProps = { width: 18, height: 18, stroke: 'currentColor', fill: 'none', strokeWidth: 1.75, strokeLinecap: 'round', strokeLinejoin: 'round' }

export const IcHome = ({ size = 18, ...p }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...p}>
    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z"/>
    <path d="M9 21V12h6v9"/>
  </svg>
)

export const IcWorker = ({ size = 18, ...p }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...p}>
    <path d="M12 2a4 4 0 100 8 4 4 0 000-8z"/>
    <path d="M3 21v-1a7 7 0 0114 0v1"/>
    <path d="M16 9h4M18 7v4"/>
  </svg>
)

export const IcRobot = ({ size = 18, ...p }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...p}>
    <rect x="3" y="8" width="18" height="12" rx="2"/>
    <path d="M9 8V6a3 3 0 016 0v2"/>
    <circle cx="9" cy="14" r="1.5" fill="currentColor" stroke="none"/>
    <circle cx="15" cy="14" r="1.5" fill="currentColor" stroke="none"/>
    <path d="M8 18h8"/>
    <path d="M12 2v4"/>
  </svg>
)

export const IcClipboard = ({ size = 18, ...p }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...p}>
    <rect x="5" y="4" width="14" height="17" rx="2"/>
    <path d="M9 4V3a1 1 0 011-1h4a1 1 0 011 1v1"/>
    <path d="M9 12h6M9 16h4"/>
  </svg>
)

export const IcUser = ({ size = 18, ...p }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...p}>
    <circle cx="12" cy="8" r="4"/>
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
  </svg>
)

export const IcStar = ({ size = 18, filled = false, ...p }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} {...p}>
    <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
  </svg>
)

export const IcShield = ({ size = 18, ...p }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...p}>
    <path d="M12 2L4 5v6c0 5.25 3.5 10.15 8 11.5C16.5 21.15 20 16.25 20 11V5z"/>
    <path d="M9 12l2 2 4-4"/>
  </svg>
)

export const IcBolt = ({ size = 18, ...p }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...p}>
    <polygon points="13,2 3,14 12,14 11,22 21,10 12,10"/>
  </svg>
)

export const IcMap = ({ size = 18, ...p }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...p}>
    <circle cx="12" cy="10" r="3"/>
    <path d="M12 2a8 8 0 00-8 8c0 5.4 7 13 8 13s8-7.6 8-13a8 8 0 00-8-8z"/>
  </svg>
)

export const IcCalendar = ({ size = 18, ...p }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...p}>
    <rect x="3" y="4" width="18" height="18" rx="2"/>
    <path d="M3 9h18M8 2v3M16 2v3"/>
  </svg>
)

export const IcCheck = ({ size = 18, ...p }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...p}>
    <circle cx="12" cy="12" r="9"/>
    <path d="M8 12l3 3 5-5"/>
  </svg>
)

export const IcCheckBadge = ({ size = 18, ...p }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...p}>
    <path d="M9 12l2 2 4-4"/>
    <path d="M12 2l2.4 1.8 3-.6 1.2 2.8L21 8l-.6 3L22 13.5l-1.8 2.4.6 3-2.8 1.2L16 22l-3-.6L10.5 23l-2.4-1.8-3 .6L3.9 19l-2.4-1.5.6-3L0.5 12l1.8-2.4-.6-3 2.8-1.2L6 3l3 .6z"/>
  </svg>
)

export const IcTool = ({ size = 18, ...p }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...p}>
    <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
  </svg>
)

export const IcPalette = ({ size = 18, ...p }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...p}>
    <circle cx="12" cy="12" r="10"/>
    <circle cx="7.5" cy="9" r="1.5" fill="currentColor" stroke="none"/>
    <circle cx="12" cy="7" r="1.5" fill="currentColor" stroke="none"/>
    <circle cx="16.5" cy="9" r="1.5" fill="currentColor" stroke="none"/>
    <path d="M12 22a4 4 0 000-8h-2a2 2 0 010-4"/>
  </svg>
)

export const IcChat = ({ size = 18, ...p }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...p}>
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
  </svg>
)

export const IcLock = ({ size = 18, ...p }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...p}>
    <rect x="3" y="11" width="18" height="11" rx="2"/>
    <path d="M7 11V7a5 5 0 0110 0v4"/>
  </svg>
)

export const IcLogout = ({ size = 18, ...p }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...p}>
    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
    <polyline points="16,17 21,12 16,7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
)

export const IcMenu = ({ size = 18, ...p }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...p}>
    <line x1="3" y1="6" x2="21" y2="6"/>
    <line x1="3" y1="12" x2="21" y2="12"/>
    <line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
)

export const IcX = ({ size = 18, ...p }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...p}>
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
)

export const IcArrowRight = ({ size = 18, ...p }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...p}>
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12,5 19,12 12,19"/>
  </svg>
)

export const IcArrowLeft = ({ size = 18, ...p }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...p}>
    <line x1="19" y1="12" x2="5" y2="12"/>
    <polyline points="12,19 5,12 12,5"/>
  </svg>
)

export const IcSearch = ({ size = 18, ...p }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...p}>
    <circle cx="10" cy="10" r="7"/>
    <line x1="21" y1="21" x2="15.5" y2="15.5"/>
  </svg>
)

export const IcFilter = ({ size = 18, ...p }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...p}>
    <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46"/>
  </svg>
)

export const IcTrophy = ({ size = 18, ...p }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...p}>
    <path d="M8 21h8M12 17v4"/>
    <path d="M7 4H4v4a3 3 0 003 3M17 4h3v4a3 3 0 01-3 3"/>
    <path d="M7 7a5 5 0 0010 0V3H7v4z"/>
    <line x1="12" y1="12" x2="12" y2="17"/>
  </svg>
)

export const IcChart = ({ size = 18, ...p }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...p}>
    <line x1="18" y1="20" x2="18" y2="10"/>
    <line x1="12" y1="20" x2="12" y2="4"/>
    <line x1="6" y1="20" x2="6" y2="14"/>
    <line x1="2" y1="20" x2="22" y2="20"/>
  </svg>
)

export const IcGrid = ({ size = 18, ...p }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...p}>
    <rect x="3" y="3" width="7" height="7" rx="1"/>
    <rect x="14" y="3" width="7" height="7" rx="1"/>
    <rect x="3" y="14" width="7" height="7" rx="1"/>
    <rect x="14" y="14" width="7" height="7" rx="1"/>
  </svg>
)

export const IcImage = ({ size = 18, ...p }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...p}>
    <rect x="3" y="3" width="18" height="18" rx="2"/>
    <circle cx="8.5" cy="8.5" r="1.5"/>
    <polyline points="21,15 16,10 5,21"/>
  </svg>
)

export const IcPlus = ({ size = 18, ...p }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...p}>
    <line x1="12" y1="5" x2="12" y2="19"/>
    <line x1="5" y1="12" x2="19" y2="12"/>
  </svg>
)

export const IcSave = ({ size = 18, ...p }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...p}>
    <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/>
    <polyline points="17,21 17,13 7,13 7,21"/>
    <polyline points="7,3 7,8 15,8"/>
  </svg>
)

export const IcTrash = ({ size = 18, ...p }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...p}>
    <polyline points="3,6 5,6 21,6"/>
    <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
    <path d="M10 11v6M14 11v6"/>
    <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
  </svg>
)

export const IcEdit = ({ size = 18, ...p }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...p}>
    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
    <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
  </svg>
)

export const IcAlert = ({ size = 18, ...p }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...p}>
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth={2.5}/>
  </svg>
)

export const IcSend = ({ size = 18, ...p }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...p}>
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22,2 15,22 11,13 2,9"/>
  </svg>
)

export const IcPhone = ({ size = 18, ...p }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...p}>
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
  </svg>
)

export const IcCity = ({ size = 18, ...p }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...p}>
    <rect x="1" y="10" width="14" height="12"/>
    <path d="M15 10V4l4 2 4-2v8"/>
    <path d="M5 14h4M5 18h4"/>
  </svg>
)

export const IcSparkle = ({ size = 18, ...p }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...p}>
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
  </svg>
)

export const IcBrain = ({ size = 18, ...p }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...p}>
    <path d="M12 5a3 3 0 00-5.996.142 4 4 0 00-2.8 6.17 3.5 3.5 0 001.43 6.68H12"/>
    <path d="M12 5a3 3 0 015.996.142 4 4 0 012.8 6.17 3.5 3.5 0 01-1.43 6.68H12"/>
    <path d="M12 5v14M9 9h.01M15 9h.01M12 14a2 2 0 100-4 2 2 0 000 4z"/>
  </svg>
)

export const IcLayers = ({ size = 18, ...p }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...p}>
    <polygon points="12,2 2,7 12,12 22,7"/>
    <polyline points="2,17 12,22 22,17"/>
    <polyline points="2,12 12,17 22,12"/>
  </svg>
)

export const IcZap = ({ size = 18, ...p }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...p}>
    <polyline points="13,2 3,14 12,14 11,22 21,10 12,10"/>
  </svg>
)

export const IcDot = ({ size = 8, color = '#10B981', ...p }) => (
  <svg width={size} height={size} viewBox="0 0 8 8" {...p}>
    <circle cx="4" cy="4" r="4" fill={color}/>
  </svg>
)

export const IcBuilding = ({ size = 18, ...p }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...p}>
    <rect x="3" y="3" width="18" height="18" rx="1"/>
    <path d="M3 9h18M9 21V9M3 15h6"/>
  </svg>
)

export const IcStats = ({ size = 18, ...p }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...p}>
    <polyline points="22,12 18,12 15,21 9,3 6,12 2,12"/>
  </svg>
)

export const IcClock = ({ size = 18, ...p }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...p}>
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12,6 12,12 16,14"/>
  </svg>
)

export const IcWand = ({ size = 18, ...p }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...p}>
    <path d="M15 4l5 5L7.5 21.5a2.121 2.121 0 01-3-3L15 4z"/>
    <path d="M19 9l2-2M6 2l1 3M2 6l3 1M20 20l2 2"/>
  </svg>
)

export const IcDashboard = ({ size = 18, ...p }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...p}>
    <rect x="3" y="3" width="8" height="8" rx="1"/>
    <rect x="13" y="3" width="8" height="5" rx="1"/>
    <rect x="13" y="11" width="8" height="10" rx="1"/>
    <rect x="3" y="14" width="8" height="7" rx="1"/>
  </svg>
)

// Category-specific icons
export const IcCarpenter = ({ size = 18, ...p }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...p}>
    <path d="M3 3l7 7M10 3l-7 7"/>
    <rect x="10" y="2" width="12" height="4" rx="1"/>
    <path d="M14 6l-4 16"/>
    <path d="M18 6l-4 16"/>
  </svg>
)

export const IcPainter = ({ size = 18, ...p }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...p}>
    <path d="M19 3H5a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2z"/>
    <path d="M12 11v4a3 3 0 003 3h0a3 3 0 003-3v-1"/>
    <line x1="8" y1="11" x2="8" y2="14"/>
    <line x1="12" y1="11" x2="12" y2="15"/>
  </svg>
)

export const IcElectrician = ({ size = 18, ...p }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...p}>
    <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"/>
  </svg>
)

export const IcPlumber = ({ size = 18, ...p }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...p}>
    <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
  </svg>
)

export const IcMason = ({ size = 18, ...p }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...p}>
    <rect x="2" y="14" width="9" height="5" rx="1"/>
    <rect x="13" y="14" width="9" height="5" rx="1"/>
    <rect x="7" y="8" width="10" height="5" rx="1"/>
    <rect x="2" y="8" width="3" height="5" rx="1"/>
    <rect x="19" y="8" width="3" height="5" rx="1"/>
    <rect x="2" y="3" width="20" height="4" rx="1"/>
  </svg>
)

export const IcDesigner = ({ size = 18, ...p }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...p}>
    <circle cx="12" cy="12" r="3"/>
    <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
  </svg>
)

export const IcContractor = ({ size = 18, ...p }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...p}>
    <path d="M2 20h20M4 20V10l8-7 8 7v10"/>
    <path d="M10 20v-6h4v6"/>
    <path d="M9 10h6"/>
  </svg>
)

export const IcFlooring = ({ size = 18, ...p }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...p}>
    <rect x="2" y="2" width="9" height="9" rx="1"/>
    <rect x="13" y="2" width="9" height="9" rx="1"/>
    <rect x="2" y="13" width="9" height="9" rx="1"/>
    <rect x="13" y="13" width="9" height="9" rx="1"/>
  </svg>
)

export const IcTiling = ({ size = 18, ...p }) => (
  <svg {...defaultProps} width={size} height={size} viewBox="0 0 24 24" {...p}>
    <path d="M2 12h20M12 2v20M2 7h5M7 2v5M17 2v5M19 2h3v5M2 17h5M7 19v3M17 19v3M19 19h3v3"/>
  </svg>
)

// Category icon map
export const CAT_ICON_MAP = {
  Carpenter: IcCarpenter,
  Painter: IcPainter,
  Electrician: IcElectrician,
  Plumber: IcPlumber,
  Mason: IcMason,
  'Interior Designer': IcDesigner,
  'Civil Contractor': IcContractor,
  Flooring: IcFlooring,
  Tiling: IcTiling,
}

export const IcStatus = ({ status, size = 8 }) => {
  const colorMap = { pending: '#F59E0B', accepted: '#10B981', rejected: '#EF4444', completed: '#6C3EE8', busy: '#64748B', available: '#10B981' }
  return <IcDot size={size} color={colorMap[status] || '#64748B'} />
}
