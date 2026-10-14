"use client"
import { useState, useEffect } from 'react'
import { getAll, getPending, approveAction, rejectAction, PendingAction } from '@/lib/adminApprovalGate'

export default function AdminConsole() {
  const [actions, setActions] = useState<PendingAction[]>([])
  const [filter, setFilter] = useState<'PENDING' | 'ALL'>('PENDING')
  const [password, setPassword] = useState('')
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    // Load queue - in real app this would come from API/DB
    // For now using in-memory from lib
    setActions(getAll())
    // Auto refresh every 5 sec
    const interval = setInterval(() => setActions([...getAll()]), 5000)
    return () => clearInterval(interval)
  }, [])

  const handleLogin = () => {
    if (password === 'Godwin2026' || password === 'admin') {
      setIsAuth(true)
    } else {
      alert('Wrong password! Hint: Godwin2026')
    }
  }

  const handleApprove = (id: string) => {
    approveAction(id, 'Godwin Abaniwo - Admin')
    setActions([...getAll()])
    alert(`Approved! ${id} -> EXECUTED`)
  }

  const handleReject = (id: string) => {
    rejectAction(id)
    setActions([...getAll()])
    alert(`Rejected! ${id}`)
  }

  if (!isAuth) {
    return (
      <div style={{ background: '#000', color: '#fff', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ background: '#111', border: '2px solid #FFD700', padding: '40px', borderRadius: '12px', width: '100%', maxWidth: '400px' }}>
          <h1 style={{ color: '#FFD700', marginBottom: '20px' }}>🔒 Kpata Academy Admin</h1>
          <p style={{ marginBottom: '20px', color: '#aaa' }}>Governance & Policy Council - Approval Gate</p>
          <input 
            type="password" 
            placeholder="Enter Admin Password" 
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: '100%', padding: '12px', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '8px', marginBottom: '15px' }}
          />
          <button onClick={handleLogin} style={{ width: '100%', padding: '12px', background: '#FFD700', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
            UNLOCK ADMIN CONSOLE
          </button>
          <p style={{ marginTop: '15px', fontSize: '12px', color: '#666' }}>Default: Godwin2026</p>
        </div>
      </div>
    )
  }

  const displayActions = filter === 'PENDING' ? actions.filter(a => a.status === 'PENDING') : actions

  return (
    <div style={{ background: '#000', color: '#fff', minHeight: '100vh', padding: '20px', fontFamily: 'system-ui' }}>
      <header style={{ borderBottom: '2px solid #FFD700', paddingBottom: '15px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ color: '#FFD700', margin: 0 }}>Kpata Academy Admin</h1>
          <p style={{ margin: 0, color: '#aaa' }}>Approval Gate - c11430a - Chief Godwin</p>
        </div>
        <div>
          <span style={{ background: '#FF0000', color: '#fff', padding: '5px 12px', borderRadius: '20px', fontWeight: 'bold' }}>
            {getPending().length} PENDING
          </span>
        </div>
      </header>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button onClick={() => setFilter('PENDING')} style={{ padding: '8px 16px', background: filter==='PENDING' ? '#FFD700' : '#222', color: filter==='PENDING' ? '#000' : '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>PENDING ({getPending().length})</button>
        <button onClick={() => setFilter('ALL')} style={{ padding: '8px 16px', background: filter==='ALL' ? '#FFD700' : '#222', color: filter==='ALL' ? '#000' : '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>ALL ({actions.length})</button>
        <button onClick={() => {
          // Demo: Create sample pending actions for testing
          const { createPendingAction } = require('@/lib/adminApprovalGate')
          createPendingAction({ type: 'SELF_IMPROVEMENT', title: 'AB-900 Copilot NEW 2026', description: '【entity-Microsoft¦canonical_name=Microsoft】 new cert', proposedAction: 'ADD Module 16', data: {} })
          createPendingAction({ type: 'MARKETING', title: 'Post to facebook', description: 'Kpata is LIVE 100% FREE', proposedAction: 'POST to facebook', data: {}, platform: 'facebook' })
          setActions([...getAll()])
        }} style={{ padding: '8px 16px', background: '#222', color: '#FFD700', border: '1px solid #FFD700', borderRadius: '6px', cursor: 'pointer' }}>+ CREATE DEMO PENDING</button>
      </div>

      <div style={{ display: 'grid', gap: '15px' }}>
        {displayActions.length === 0 && <p style={{ color: '#666', textAlign: 'center', padding: '40px' }}>No actions. Click CREATE DEMO to test.</p>}
        {displayActions.map(action => (
          <div key={action.id} style={{ background: '#111', border: `1px solid ${action.status==='PENDING' ? '#FFD700' : '#333'}`, padding: '15px', borderRadius: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ background: action.type==='SELF_IMPROVEMENT' ? '#0066FF' : '#FF00AA', padding: '3px 8px', borderRadius: '4px', fontSize: '11px' }}>{action.type}</span>
              <span style={{ background: action.status==='PENDING' ? '#FFD700' : '#00AA00', color: action.status==='PENDING' ? '#000' : '#fff', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>{action.status}</span>
            </div>
            <h3 style={{ margin: '8px 0', color: '#fff' }}>{action.title}</h3>
            <p style={{ margin: '5px 0', color: '#aaa', fontSize: '14px' }}>{action.description}</p>
            <p style={{ margin: '5px 0', color: '#FFD700', fontSize: '13px' }}>Proposed: {action.proposedAction} {action.platform && `| Platform: ${action.platform}`}</p>
            <p style={{ margin: '5px 0', color: '#666', fontSize: '11px' }}>Created: {new Date(action.createdAt).toLocaleString()} | ID: {action.id}</p>
            {action.status === 'PENDING' && (
              <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                <button onClick={() => handleApprove(action.id)} style={{ flex: 1, padding: '10px', background: '#00AA00', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>✅ APPROVE & EXECUTE</button>
                <button onClick={() => handleReject(action.id)} style={{ flex: 1, padding: '10px', background: '#FF0000', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>❌ REJECT</button>
              </div>
            )}
            {action.approvedBy && <p style={{ marginTop: '8px', color: '#00AA00', fontSize: '12px' }}>Approved by {action.approvedBy} at {action.approvedAt && new Date(action.approvedAt).toLocaleString()}</p>}
          </div>
        ))}
      </div>

      <footer style={{ marginTop: '40px', borderTop: '1px solid #333', paddingTop: '15px', color: '#666', fontSize: '12px' }}>
        <p>Location: C:\Users\Admin\Downloads\Kpata-Academy\app\admin\page.tsx | Live: /admin | Commit: c11430a | Chief: Godwin Abaniwo</p>
        <p>Rule: All Self-Improvement + Marketing must be approved by Admin. QUEUE is in-memory (resets on reload) - Next: Add DB persistence.</p>
      </footer>
    </div>
  )
}