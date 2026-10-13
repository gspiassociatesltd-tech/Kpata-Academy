
'use client'
import { BUILD_STATUS } from './courses'
export function BuildGauge(){
  return (
    <div style={{ background: 'black', color: 'white', padding: '20px', borderRadius: '16px', marginBottom: '24px', border: '3px solid #fde047' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '12px' }}>
        <h3 style={{ margin: 0, fontWeight: 900, fontSize: '18px' }}>Build Progress: {BUILD_STATUS.overall}% Real Training LIVE - No Registration Needed!</h3>
        <span style={{ background: '#fde047', color: 'black', padding: '6px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 'bold' }}>{BUILD_STATUS.overall}% Complete • {(BUILD_STATUS.phases || []).filter((p:any)=>p.status==='DONE').length}/{BUILD_STATUS.totalSteps || 5} Phases • No Registration</span>
      </div>
      <div style={{ background: '#222', borderRadius: '999px', height: '22px', overflow: 'hidden', border: '1px solid #333' }}>
        <div style={{ width: `${BUILD_STATUS.overall}%`, background: 'linear-gradient(90deg, #fde047, #22c55e)', height: '100%', borderRadius: '999px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '10px', fontSize: '12px', fontWeight: 'bold', color: 'black' }}>{BUILD_STATUS.overall}%</div>
      </div>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '12px' }}>
        {(BUILD_STATUS.phases || []).map((phase:any, i:number)=>(
          <span key={i} style={{ background: phase.status==='DONE' ? '#22c55e' : '#333', color: phase.status==='DONE' ? 'black' : 'white', padding: '4px 8px', borderRadius: '999px', fontSize: '10px', fontWeight: 'bold' }}>{phase.name}: {phase.status}</span>
        ))}
      </div>
      <div style={{ marginTop: '16px', background: '#111', padding: '12px', borderRadius: '10px', fontSize: '12px', lineHeight: '1.5' }}><b>Next:</b> {BUILD_STATUS.nextSteps ? BUILD_STATUS.nextSteps.join(' → ') : 'Google AI Essentials Certified → Microsoft AI-900 Certified → Google Data Analytics Certified → Job Ready Portfolio'}</div>
      <div style={{ marginTop: '12px', background: '#25D366', padding: '10px', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold', textAlign: 'center' }}>💬 No Registration Needed to Learn - 100% FREE - Optional: Join WhatsApp Channel for FREE Updates & Jobs - Optional: Register to Save Progress Across Devices</div>
    </div>
  )
}
