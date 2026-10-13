
'use client'
import { BUILD_STATUS } from './courses'
export function BuildGauge(){
  return (
    <div style={{ background: 'black', color: 'white', padding: '20px', borderRadius: '16px', marginBottom: '24px', border: '3px solid #fde047' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginBottom: '12px' }}>
        <h3 style={{ margin: 0, fontWeight: 900, fontSize: '18px' }}>Build {BUILD_STATUS.overall}% - No Registration Needed to Learn!</h3>
        <span style={{ background: '#fde047', color: 'black', padding: '6px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 'bold' }}>{BUILD_STATUS.overall}% Complete • {(BUILD_STATUS.phases || []).filter((p:any)=>p.status==='DONE').length}/{BUILD_STATUS.totalSteps || 5} Phases • No Registration</span>
      </div>
      <div style={{ background: '#222', borderRadius: '999px', height: '22px', overflow: 'hidden', border: '1px solid #333' }}>
        <div style={{ width: `${BUILD_STATUS.overall}%`, background: 'linear-gradient(90deg, #fde047, #22c55e)', height: '100%', borderRadius: '999px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '10px', fontSize: '12px', fontWeight: 'bold', color: 'black' }}>{BUILD_STATUS.overall}%</div>
      </div>
      <div style={{ marginTop: '12px', background: '#25D366', padding: '10px', borderRadius: '8px', fontSize: '11px', fontWeight: 'bold', textAlign: 'center' }}>💬 No Registration Needed to Learn - 100% FREE - Optional: Join WhatsApp for Industry Updates & Jobs - Optional: Register to Build Resume</div>
    </div>
  )
}
