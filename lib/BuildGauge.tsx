
'use client'
import { BUILD_STATUS } from './courses'
export function BuildGauge(){
  return (
    <div style={{ background: 'black', color: 'white', padding: '20px', borderRadius: '16px', marginBottom: '24px', border: '3px solid #fde047' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '12px' }}>
        <h3 style={{ margin: 0, fontWeight: 900, fontSize: '18px' }}>Build Progress: {BUILD_STATUS.overall}% Real Training LIVE</h3>
        <span style={{ background: '#fde047', color: 'black', padding: '6px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 'bold' }}>{BUILD_STATUS.overall}% Complete • {BUILD_STATUS.phases.filter((p:any)=>p.status==='DONE').length}/{BUILD_STATUS.totalSteps} Phases</span>
      </div>
      <div style={{ background: '#222', borderRadius: '999px', height: '22px', overflow: 'hidden', border: '1px solid #333' }}>
        <div style={{ width: `${BUILD_STATUS.overall}%`, background: 'linear-gradient(90deg, #fde047, #22c55e)', height: '100%', borderRadius: '999px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '10px', fontSize: '12px', fontWeight: 'bold', color: 'black' }}>{BUILD_STATUS.overall}%</div>
      </div>
      <div style={{ marginTop: '16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
        {BUILD_STATUS.phases.map((p:any)=>(
          <div key={p.name} style={{ background: '#111', padding: '12px', borderRadius: '12px', border: `1px solid ${p.status==='DONE' ? '#22c55e' : p.status==='LIVE' ? '#fde047' : '#333'}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontWeight: 800, fontSize: '13px' }}>{p.name}</span>
              <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '999px', background: p.status==='DONE' ? '#22c55e' : p.status==='LIVE' ? '#fde047' : p.status==='BUILDING' ? '#3b82f6' : '#444', color: p.status==='LIVE' ? 'black' : 'white', fontWeight: 'bold' }}>{p.status} {p.percent}%</span>
            </div>
            <div style={{ background: '#222', height: '6px', borderRadius: '999px', overflow: 'hidden' }}><div style={{ width: `${p.percent}%`, background: p.status==='DONE' ? '#22c55e' : p.status==='LIVE' ? '#fde047' : '#3b82f6', height: '100%' }}></div></div>
            <div style={{ fontSize: '11px', color: '#aaa', marginTop: '6px', lineHeight: '1.3' }}>{p.desc}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '16px', background: '#111', padding: '12px', borderRadius: '10px', fontSize: '12px', lineHeight: '1.5' }}><b>Next:</b> {BUILD_STATUS.nextSteps.join(' → ')}</div>
    </div>
  )
}
