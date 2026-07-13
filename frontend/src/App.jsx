import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import NavBar from './components/NavBar'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import WorkersList from './pages/WorkersList'
import WorkerDetails from './pages/WorkerDetails'
import WorkerDashboard from './pages/WorkerDashboard'
import RecommendPage from './pages/RecommendPage'
import HireHistory from './pages/HireHistory'
import AdminDashboard from './pages/AdminDashboard'
import Profile from './pages/Profile'

function ProtectedRoute({ children, roles }) {
  const { user, loading } = useAuth()
  if (loading) return <div className="flex-center" style={{ height: '100vh' }}><div className="spinner" /></div>
  if (!user) return <Navigate to="/login" replace />
  if (roles && !roles.includes(user.role)) return <Navigate to="/home" replace />
  return children
}

export default function App() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/workers" element={<WorkersList />} />
        <Route path="/worker/:id" element={<WorkerDetails />} />
        <Route path="/recommend" element={<ProtectedRoute><RecommendPage /></ProtectedRoute>} />
        <Route path="/hire-history" element={<ProtectedRoute roles={['homeowner', 'admin']}><HireHistory /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute roles={['worker']}><WorkerDashboard /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute roles={['admin']}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}
