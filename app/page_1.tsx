
'use client'
import { COURSES, BUILD_STATUS } from '../lib/courses'
import { BuildGauge } from '../lib/BuildGauge'
import { getOverallProgress, getCourseProgress } from '../lib/progress'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Home(){
  const [overall,setOverall]=useState(0)
  const [mounted,setMounted]=useState(false)
  useEffect(()=>{ setMounted(true); setOverall(getOverallProgress()) }, [])

  return (
    <div style={{ minHeight: '100vh', background: '#faf9f6', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ background: 'black', color: 'white', padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10, flexWrap: 'wrap', gap: '8px' }}>
        <h1 style={{ fontWeight: 900, fontSize: '18px', margin: 0 }}>KPATA ACADEMY</h1>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ background: '#111', border: '1px solid #444', padding: '4px 10px', borderRadius: '999px', fontSize: '11px' }}>Build {BUILD_STATUS.overall}%</span>
          <Link href="/dashboard" style={{ background: '#fde047', color: 'black', padding: '6px 12px', borderRadius: '999px', fontSize: '11px', fontWeight: 'bold', textDecoration: 'none' }}>📊 My Progress {mounted ? `(${overall})` : ''}</Link>
        </div>
      </header>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '16px' }}>
        <BuildGauge />
        
        {mounted && overall>0 && (
          <div style={{ background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)', color: 'white', padding: '16px', borderRadius: '16px', marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
            <div><div style={{ fontWeight: 900, fontSize: '14px' }}>🎉 You are learning! {overall} lessons completed</div><div style={{ fontSize: '11px', opacity: 0.9 }}>Keep going - certification is close!</div></div>
            <Link href="/dashboard" style={{ background: 'white', color: '#16a34a', padding: '8px 14px', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold', fontSize: '12px' }}>View Dashboard →</Link>
          </div>
        )}

        <div style={{ background: 'linear-gradient(135deg, #fde047 0%, #fb923c 100%)', padding: '24px', borderRadius: '20px', border: '3px solid black', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 900, lineHeight: '1.1', margin: 0 }}>Learn AI.<br/>Real Training.<br/>Get Certified.</h2>
          <p style={{ marginTop: '8px', fontWeight: 600, fontSize: '14px' }}>Mobile friendly • Text-first • Copy-paste labs • Progress saved</p>
          <div style={{ marginTop: '10px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ background: 'black', color: 'white', padding: '8px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 'bold' }}>✅ Real training • 15 lessons</span>
            <span style={{ background: 'white', color: 'black', border: '2px solid black', padding: '8px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 'bold' }}>📱 Mobile friendly</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '12px' }}>
          {COURSES.map((c:any)=>{
            const prog = mounted ? getCourseProgress(c.slug, c.lessons.length) : { done: 0, total: c.lessons.length, percent: 0 }
            return (
              <Link key={c.slug} href={`/courses/${c.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ background: 'white', borderRadius: '20px', border: `3px solid ${prog.percent>0 ? '#22c55e' : '#e5e7eb'}`, padding: '18px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '6px' }}>
                    <span style={{ background: 'black', color: 'white', padding: '4px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 'bold' }}>{c.phase}</span>
                    <span style={{ background: prog.percent>0 ? '#f0fdf4' : '#faf9f6', padding: '4px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 'bold', border: `1px solid ${prog.percent>0 ? '#bbf7d0' : '#e5e7eb'}` }}>{prog.done}/{prog.total} • {prog.percent}%</span>
                  </div>
                  <h4 style={{ fontWeight: 900, margin: '6px 0 4px 0', fontSize: '16px' }}>{c.title}</h4>
                  <div style={{ fontSize: '11px', color: '#6b7280', marginBottom: '6px' }}>{c.provider} • {c.hours}h • {c.lessons.length} lessons</div>
                  <div style={{ background: '#e5e7eb', height: '6px', borderRadius: '999px', overflow: 'hidden', marginBottom: '8px' }}>
                    <div style={{ width: `${prog.percent}%`, background: '#22c55e', height: '100%', transition: 'width 0.5s' }}></div>
                  </div>
                  <p style={{ fontSize: '12px', color: '#374151', margin: '0 0 8px 0', lineHeight: '1.4' }}>{c.description.substring(0,100)}...</p>
                  <div style={{ background: prog.percent>0 ? '#22c55e' : 'black', color: 'white', padding: '10px', borderRadius: '12px', textAlign: 'center', fontWeight: 'bold', fontSize: '13px' }}>{prog.percent>0 ? `Continue ${prog.percent}% →` : 'Start Reading →'}</div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
