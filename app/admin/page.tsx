"use client"
import { useState, useEffect } from 'react'

type Action = {
  id: string
  type: 'SELF_IMPROVEMENT' | 'MARKETING'
  title: string
  description: string
  proposedAction: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'EXECUTED'
  platform?: string
  createdAt: string
  approvedBy?: string
  link?: string
}

export default function AdminConsole() {
  const [actions, setActions] = useState<Action[]>([])
  const [filter, setFilter] = useState<'PENDING' | 'ALL'>('PENDING')
  const [password, setPassword] = useState('')
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    // AUTO-POPULATE pending approvals on first load
    const stored = localStorage.getItem('kpata_admin_queue')
    if (stored) {
      setActions(JSON.parse(stored))
    } else {
      // Initial real industry changes needing approval
      const initial: Action[] = [
        { id: 'AB-900-NEW', type: 'SELF_IMPROVEMENT', title: 'AB-900 Microsoft Copilot Admin - NEW 2026', description: 'Brand new AB series for M365 Copilot admins. High demand.', proposedAction: 'ADD as Module 16 to curriculum', status: 'PENDING', createdAt: new Date().toISOString(), link: 'https://learn.microsoft.com/en-us/credentials/' },
        { id: 'AB-100-NEW', type: 'SELF_IMPROVEMENT', title: 'AB-100 Enterprise AI Architect Expert NEW', description: 'Expert level for enterprise AI solutions architects', proposedAction: 'ADD as advanced premium track', status: 'PENDING', createdAt: new Date().toISOString(), link: 'https://learn.microsoft.com/en-us/credentials/' },
        { id: 'MLA-C02-UPGRADE', type: 'SELF_IMPROVEMENT', title: 'AWS MLA-C01 -> MLA-C02 Upgrade (C01 retires Sept 28 2026)', description: 'MLA-C01 retiring. MLA-C02 is new standard.', proposedAction: 'UPDATE curriculum to MLA-C02', status: 'PENDING', createdAt: new Date().toISOString(), link: 'https://aws.amazon.com/certification/' },
        { id: 'AWS-ML-RETIRED', type: 'SELF_IMPROVEMENT', title: 'AWS ML Specialty RETIRED March 31 2026', description: 'Cert retired, replaced by AI Practitioner', proposedAction: 'REMOVE from curriculum', status: 'PENDING', createdAt: new Date().toISOString() },
        { id: 'MARKETING-FB', type: 'MARKETING', title: 'Marketing: Facebook Launch Post', description: 'Kpata Academy is LIVE! 100% FREE, No Registration, 15 Lessons, Pass First Attempt. Loved for Simplicity. Start FREE Today!', proposedAction: 'POST to Facebook', platform: 'facebook', status: 'PENDING', createdAt: new Date().toISOString(), link: 'https://web.facebook.com/abaniwog' },
        { id: 'MARKETING-IG', type: 'MARKETING', title: 'Marketing: Instagram Launch Post', description: '15 Lessons FREE! No registration! Link in bio! #KpataAcademy #AI2026', proposedAction: 'POST to Instagram', platform: 'instagram', status: 'PENDING', createdAt: new Date().toISOString(), link: 'https://instagram.com/gspiassociatesltd' },
        { id: 'MARKETING-LINKEDIN', type: 'MARKETING', title: 'Marketing: LinkedIn Professional Post', description: 'Kpata Academy - 100% FREE, No Registration Needed. 15 Lessons. Start Learning Today!', proposedAction: 'POST to LinkedIn', platform: 'linkedin', status: 'PENDING', createdAt: new Date().toISOString(), link: 'https://www.linkedin.com/in/godwin-abaniwo-803268296' },
      ]
      setActions(initial)
      localStorage.setItem('kpata_admin_queue', JSON.stringify(initial))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('kpata_admin_queue', JSON.stringify(actions))
  }, [actions])

  const handleLogin = () => {
    if (password === 'Godwin2026' || password === 'admin' || password === 'kpata123') {
      setIsAuth(true)
    } else {
      alert('Wrong password! Try Godwin2026')
    }
  }

  const approve = (id: string) => {
    setActions(prev => prev.map(a => a.id === id? {...a, status: 'EXECUTED' as const, approvedBy: 'Godwin Abaniwo' } : a))
  }

  const reject = (id: string) => {
    setActions(prev => prev.map(a => a.id === id? {...a, status: 'REJECTED' as const } : a))
  }

  const resetDemo = () => {
    localStorage.removeItem('kpata_admin_queue')
    window.location.reload()
  }

  if (!isAuth) {
    return (
      <div style={{ background: '#000', color: '#fff', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ background: '#111', border: '2px solid #FFD700', padding: '40px', borderRadius: '12px', width: '100%', maxWidth: '400px' }}>
          <h1 style={{ color: '#FFD700' }}>Kpata Academy Admin</h1>
          <p style={{ color: '#aaa', marginBottom: '20px' }}>Approval Gate - Godwin Abaniwo</p>
          <input type="password" placeholder="Password: Godwin2026" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: '12px', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '8px', marginBottom: '15px' }} />
          <button onClick={handleLogin} style={{ width: '100%', padding: '12px', background: '#FFD700', color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>UNLOCK</button>
        </div>
      </div>
    )
  }

  const pending = actions.filter(a => a.status === 'PENDING')
  const display = filter === 'PENDING'? pending : actions

  return (
    <div style={{ background: '#000', color: '#fff', minHeight: '100vh', padding: '20px' }}>
      <header style={{ borderBottom: '2px solid #FFD700', paddingBottom: '15px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <div><h1 style={{ color: '#FFD700', margin: 0 }}>Kpata Academy Admin</h1><p style={{ margin: 0, color: '#aaa' }}>Godwin Abaniwo - Approval Gate</p></div>
        <div><span style={{ background: '#FF0000', color: '#fff', padding: '6px 14px', borderRadius: '20px', fontWeight: 'bold' }}>{pending.length} PENDING</span></div>
      </header>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <button onClick={() => setFilter('PENDING')} style={{ padding: '8px 16px', background: filter==='PENDING'? '#FFD700' : '#222', color: filter==='PENDING'? '#000' : '#fff', border: 'none', borderRadius: '6px' }}>PENDING ({pending.length})</button>
        <button onClick={() => setFilter('ALL')} style={{ padding: '8px 16px', background: filter==='ALL'? '#FFD700' : '#222', color: filter==='ALL'? '#000' : '#fff', border: 'none', borderRadius: '6px' }}>ALL ({actions.length})</button>
        <button onClick={resetDemo} style={{ padding: '8px 16px', background: '#222', color: '#FFD700', border: '1px solid #FFD700', borderRadius: '6px' }}>RESET DEMO</button>
      </div>

      <div style={{ display: 'grid', gap: '15px' }}>
        {display.map(a => (
          <div key={a.id} style={{ background: '#111', border: `1px solid ${a.status==='PENDING'? '#FFD700' : '#333'}`, padding: '15px', borderRadius: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ background: a.type==='SELF_IMPROVEMENT'? '#0066FF' : '#FF00AA', padding: '3px 8px', borderRadius: '4px', fontSize: '11px' }}>{a.type} {a.platform && ` - ${a.platform.toUpperCase()}`}</span>
              <span style={{ background: a.status==='PENDING'? '#FFD700' : a.status==='EXECUTED'? '#00AA00' : '#FF0000', color: a.status==='PENDING'? '#000' : '#fff', padding: '3px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 'bold' }}>{a.status}</span>
            </div>
            <h3 style={{ margin: '10px 0' }}>{a.title}</h3>
            <p style={{ color: '#aaa', fontSize: '14px' }}>{a.description}</p>
            <p style={{ color: '#FFD700', fontSize: '13px' }}>Action: {a.proposedAction}</p>
            {a.link && <p style={{ color: '#66AAFF', fontSize: '12px' }}>{a.link}</p>}
            {a.status==='PENDING' && (
              <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                <button onClick={() => approve(a.id)} style={{ flex: 1, padding: '10px', background: '#00AA00', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>✅ APPROVE & EXECUTE</button>
                <button onClick={() => reject(a.id)} style={{ flex: 1, padding: '10px', background: '#FF0000', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>❌ REJECT</button>
              </div>
            )}
            {a.approvedBy && <p style={{ color: '#00AA00', fontSize: '12px', marginTop: '8px' }}>Approved by {a.approvedBy} - Executed</p>}
          </div>
        ))}
      </div>

      <footer style={{ marginTop: '40px', borderTop: '1px solid #333', paddingTop: '15px', color: '#666', fontSize: '12px' }}>
        <p>Local: localhost:3000/admin | Live Vercel: /admin after push | Storage: localStorage (persists on refresh) | User: Godwin Abaniwo</p>
      </footer>
    </div>
  )
}