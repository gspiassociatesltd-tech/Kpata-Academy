
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
            <div style={{ fontWeight: 900, fontSize: '12px' }}>Join WhatsApp Channel - FREE Industry Updates & Jobs - No Registration Needed to Learn!</div>
            <div style={{ fontSize: '10px', opacity: 0.9 }}>Learn 100% FREE without registration - Join channel for curriculum upgrades & latest developments</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <button onClick={handleJoin} style={{ background: 'white', color: '#128C7E', padding: '8px 14px', borderRadius: '999px', border: 'none', fontWeight: 900, fontSize: '11px', cursor: 'pointer' }}>{joined ? '✓ Joined - Open' : 'Join Channel - FREE'}</button>
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
            <div style={{ fontWeight: 900, fontSize: '14px' }}>How You Will Know Latest Developments & Curriculum Upgrades Without WhatsApp?</div>
            <div style={{ fontSize: '11px', color: '#374151', marginTop: '6px', lineHeight: '1.6' }}>
              <b>Problem you raised:</b> If no WhatsApp channel, how would users know latest industry developments & curriculum upgrades?<br/>
              <b>Solution we built:</b> WhatsApp Channel = FREE push notifications for:<br/>
              {WHATSAPP_CHANNEL.benefits.map((b: any, i: number) => <div key={i}>• {b}</div>)}
            </div>
            <button onClick={handleJoin} style={{ marginTop: '10px', background: '#25D366', color: 'white', padding: '10px 16px', borderRadius: '8px', border: 'none', fontWeight: 900, fontSize: '12px', cursor: 'pointer' }}>{joined ? '✓ Joined - Open Channel' : 'Join WhatsApp Channel - FREE - Get Latest Industry Updates'}</button>
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
            <div style={{ fontWeight: 900, fontSize: '14px' }}>How We Build Resume If No Registration? We Save Locally + Optional Registration!</div>
            <div style={{ fontSize: '11px', color: '#374151', marginTop: '6px', lineHeight: '1.6' }}>
              <b>Problem you raised:</b> If no registration, how will app know user to build resume?<br/>
              <b>Solution we agreed & built:</b><br/>
              • <b>Phase 1 - No Registration Needed to Learn:</b> All 15 lessons 100% FREE, no email, progress saved in browser (localStorage). User can learn completely without registering - Reduces friction for illiterate users.<br/>
              • <b>Phase 2 - Optional Registration for Resume:</b> When user wants resume/CV, we ask for optional registration (Name, Email, Phone) - Then we build resume from their local progress + certificates + skills.<br/>
              • <b>Resume includes:</b> Name, Completed courses, Certificates (Google AI Essentials, Microsoft AI-900, Google Data Analytics), Skills (NotebookLM, Document Intelligence, BigQuery SQL, Looker Studio), Projects (10-page PDF analysis, Invoice extraction, Sales dashboard), Time saved, Portfolio links.<br/>
              • <b>WhatsApp Channel also helps:</b> Share resume template, job alerts, how to apply with Kpata certificate.
            </div>
          </div>
        </div>
      </div>
    )
  }

  // lesson variant
  return (
    <div style={{ background: 'white', border: '3px solid #25D366', borderRadius: '14px', padding: '14px', marginTop: '16px' }}>
      <div style={{ display: 'flex', gap: '10px' }}>
        <div style={{ background: '#25D366', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>💬</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 900, fontSize: '13px' }}>No Registration Needed to Learn! But Join WhatsApp for Latest Developments?</div>
          <div style={{ fontSize: '11px', marginTop: '4px' }}>Learn 100% FREE without registration. Join WhatsApp for curriculum upgrades & industry updates.</div>
          <div style={{ fontSize: '11px', marginTop: '8px' }}>{WHATSAPP_CHANNEL.benefits.map((b: any, i: number) => <div key={i}>{b}</div>)}</div>
          <button onClick={handleJoin} style={{ marginTop: '10px', background: '#25D366', color: 'white', padding: '10px 16px', borderRadius: '8px', border: 'none', fontWeight: 900, fontSize: '12px', cursor: 'pointer' }}>{joined ? '✓ Joined' : 'Join WhatsApp - FREE'}</button>
        </div>
      </div>
    </div>
  )
}
