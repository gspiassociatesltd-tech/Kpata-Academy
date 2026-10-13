
'use client'
import { useState, useEffect } from 'react'
import { WHATSAPP_CHANNEL } from '../lib/whatsapp'

export function WhatsAppBanner({ variant = 'top' }: { variant?: 'top' | 'bottom' | 'inline' | 'lesson' }) {
  const [dismissed, setDismissed] = useState(false)
  const [joined, setJoined] = useState(false)

  useEffect(() => {
    try {
      const j = localStorage.getItem('kpata_whatsapp_joined')
      if (j) setJoined(true)
      const d = localStorage.getItem('kpata_whatsapp_dismissed')
      if (d && variant === 'top') {
        const time = parseInt(d)
        if (Date.now() - time < 24 * 60 * 60 * 1000) {
          setDismissed(true)
        }
      }
    } catch {}
  }, [variant])

  const handleJoin = () => {
    try {
      localStorage.setItem('kpata_whatsapp_joined', 'true')
    } catch {}
    setJoined(true)
    window.open(WHATSAPP_CHANNEL.link, '_blank')
  }

  const handleDismiss = () => {
    try {
      localStorage.setItem('kpata_whatsapp_dismissed', Date.now().toString())
    } catch {}
    setDismissed(true)
  }

  if (dismissed && variant === 'top') return null

  if (variant === 'top') {
    return (
      <div style={{ background: 'linear-gradient(90deg, #25D366, #128C7E)', color: 'white', padding: '10px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 20, flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1 }}>
          <span style={{ fontSize: '18px' }}>💬</span>
          <div>
            <div style={{ fontWeight: 900, fontSize: '12px' }}>Join WhatsApp Channel - FREE Updates & Jobs - No Registration Needed to Learn!</div>
            <div style={{ fontSize: '10px', opacity: 0.9 }}>Learn 100% FREE without registration - Join channel for updates, jobs, exam tips</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <button onClick={handleJoin} style={{ background: 'white', color: '#128C7E', padding: '8px 14px', borderRadius: '999px', border: 'none', fontWeight: 900, fontSize: '11px', cursor: 'pointer' }}>
            {joined ? '✓ Joined - Open' : 'Join Channel - FREE'}
          </button>
          <button onClick={handleDismiss} style={{ background: 'rgba(0,0,0,0.2)', color: 'white', border: 'none', borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer', fontSize: '12px' }}>✕</button>
        </div>
      </div>
    )
  }

  if (variant === 'lesson') {
    return (
      <div style={{ background: 'white', border: '3px solid #25D366', borderRadius: '14px', padding: '14px', marginTop: '16px' }}>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
          <div style={{ background: '#25D366', color: 'white', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', flexShrink: 0 }}>💬</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 900, fontSize: '13px' }}>No Registration Needed to Learn! But Join WhatsApp Channel?</div>
            <div style={{ fontSize: '11px', color: '#374151', marginTop: '4px' }}>You can learn all 15 lessons WITHOUT registering - 100% FREE - No email needed. Join WhatsApp Channel to get:</div>
            <div style={{ fontSize: '11px', marginTop: '8px', lineHeight: '1.6' }}>
              {WHATSAPP_CHANNEL.benefits.map((b: any, i: number) => <div key={i}>{b}</div>)}
            </div>
            <div style={{ marginTop: '10px' }}>
              <button onClick={handleJoin} style={{ background: '#25D366', color: 'white', padding: '10px 16px', borderRadius: '8px', border: 'none', fontWeight: 900, fontSize: '12px', cursor: 'pointer' }}>
                {joined ? '✓ Joined - Open WhatsApp Channel' : 'Join WhatsApp Channel - FREE'}
              </button>
              <div style={{ fontSize: '10px', color: '#6b7280', marginTop: '6px' }}>✓ No spam - Only training updates, jobs, exam tips - Leave anytime - 100% FREE - No registration needed to learn</div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
}
