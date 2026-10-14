'use client'
import { useState, useEffect } from 'react'
import { WHATSAPP_CHANNEL } from '../lib/whatsapp'

export function WhatsAppBanner({ variant = 'top' }: { variant?: 'top' | 'lesson' | 'dashboard' | 'resume' }) {
  const [dismissed, setDismissed] = useState(false)
  const [joined, setJoined] = useState(false)

  useEffect(() => {
    try {
      const j = localStorage.getItem('kpata_whatsapp_joined')
      if (j) setJoined(true)
      const d = localStorage.getItem('kpata_whatsapp_dismissed')
      if (d && variant === 'top') {
        const time = parseInt(d)
        if (Date.now() - time < 24 * 60 * 60 * 1000) setDismissed(true)
      }
    } catch {}
  }, [variant])

  const handleJoin = () => {
    try { localStorage.setItem('kpata_whatsapp_joined', 'true') } catch {}
    setJoined(true)
    window.open(WHATSAPP_CHANNEL.link, '_blank')
  }

  const handleDismiss = () => {
    try { localStorage.setItem('kpata_whatsapp_dismissed', Date.now().toString()) } catch {}
    setDismissed(true)
  }

  if (dismissed && variant === 'top') return null

  if (variant === 'top') {
    return (
      <div style={{ background: 'linear-gradient(90deg, #25D366, #128C7E)', color: 'white', padding: '10px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 20, flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
          <span style={{ fontSize: '18px' }}>💬</span>
          <div>
            <div style={{ fontWeight: 900, fontSize: '12px' }}>Join WhatsApp Channel - FREE Industry Updates & Jobs</div>
            <div style={{ fontSize: '10px', opacity: 0.9 }}>Get curriculum upgrades, job alerts & latest AI developments</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <button onClick={handleJoin} style={{ background: 'white', color: '#128C7E', padding: '8px 14px', borderRadius: '999px', border: 'none', fontWeight: 900, fontSize: '11px', cursor: 'pointer' }}>{joined? '✓ Joined - Open' : 'Join Channel - FREE'}</button>
          <button onClick={handleDismiss} style={{ background: 'rgba(0,0,0,0.2)', color: 'white', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer' }}>✕</button>
        </div>
      </div>
    )
  }

  if (variant === 'dashboard') {
    return (
      <div style={{ background: 'white', border: '3px solid #25D366', borderRadius: '14px', padding: '16px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ background: '#25D366', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '20px' }}>💬</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 900, fontSize: '14px' }}>Stay Updated - WhatsApp Channel</div>
            <div style={{ fontSize: '11px', color: '#374151', marginTop: '6px', lineHeight: '1.6' }}>
              {WHATSAPP_CHANNEL.benefits.map((b: any, i: number) => <div key={i}>• {b}</div>)}
            </div>
            <button onClick={handleJoin} style={{ marginTop: '10px', background: '#25D366', color: 'white', padding: '10px 16px', borderRadius: '8px', border: 'none', fontWeight: 900, fontSize: '12px', cursor: 'pointer' }}>{joined? '✓ Joined - Open Channel' : 'Join WhatsApp Channel - FREE'}</button>
          </div>
        </div>
      </div>
    )
  }

  if (variant === 'resume') {
    return (
      <div style={{ background: '#fffbeb', border: '3px solid #f59e0b', borderRadius: '14px', padding: '16px' }}>
        <div style={{ display: 'flex', gap: '10px' }}>
          <div style={{ background: '#f59e0b', borderRadius: '50%', width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'black', fontSize: '18px' }}>📄</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 900, fontSize: '14px' }}>Build Your Professional Resume</div>
            <div style={{ fontSize: '11px', color: '#374151', marginTop: '6px', lineHeight: '1.6' }}>
              - Complete lessons 100% FREE - Progress saved automatically<br/>
              - When ready, add your Name, Email & Phone to generate CV<br/>
              - Resume includes: Completed courses, Certificates, Skills & Projects<br/>
              - Share via WhatsApp Channel for job alerts & templates
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: 'white', border: '3px solid #25D366', borderRadius: '14px', padding: '14px', marginTop: '16px' }}>
      <div style={{ display: 'flex', gap: '10px' }}>
        <div style={{ background: '#25D366', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>💬</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 900, fontSize: '13px' }}>Stay Updated with Latest AI Developments</div>
          <div style={{ fontSize: '11px', marginTop: '4px' }}>Join our WhatsApp Channel for curriculum upgrades, job alerts & industry news.</div>
          <button onClick={handleJoin} style={{ marginTop: '10px', background: '#25D366', color: 'white', padding: '10px 16px', borderRadius: '8px', border: 'none', fontWeight: 900, fontSize: '12px', cursor: 'pointer' }}>{joined? '✓ Joined' : 'Join WhatsApp - FREE'}</button>
        </div>
      </div>
    </div>
  )
}