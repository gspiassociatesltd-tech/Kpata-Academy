
'use client'
import { useState } from 'react'
import { COURSES } from '../lib/courses'
import Link from 'next/link'

export default function Home() {
  const phase1 = COURSES.filter(c => c.phase === 'Phase 1')
  const phase2 = COURSES.filter(c => c.phase === 'Phase 2')
  const phase3 = COURSES.filter(c => c.phase === 'Phase 3')

  return (
    <div style={{ minHeight: '100vh', background: '#faf9f6', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ background: 'black', color: 'white', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', position: 'sticky', top: 0, zIndex: 10 }}>
        <Link href="/" style={{ textDecoration: 'none', color: 'white' }}><h1 style={{ fontWeight: 900, fontSize: '22px', margin: 0 }}>KPATA ACADEMY ✓ LIVE</h1></Link>
        <div style={{ display: 'flex', gap: '8px' }}>
          <span style={{ background: '#fbbf24', color: 'black', padding: '6px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 'bold' }}>Self-Paced</span>
          <span style={{ background: '#22c55e', color: 'white', padding: '6px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 'bold' }}>{COURSES.length} Courses LIVE</span>
          <Link href="/academy" style={{ background: 'white', color: 'black', padding: '6px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 'bold', textDecoration: 'none' }}>Academy →</Link>
        </div>
      </header>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        <div style={{ background: 'linear-gradient(135deg, #fde047 0%, #fb923c 100%)', padding: '40px', borderRadius: '24px', border: '3px solid black', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '48px', fontWeight: 900, lineHeight: '0.95', margin: 0, letterSpacing: '-2px' }}>Learn AI.<br/>Build Real Projects.<br/>Get Free Certs.</h2>
          <p style={{ marginTop: '16px', fontWeight: 600, fontSize: '18px', maxWidth: '700px' }}>No theory. MOTOMA battery examples. Self-paced in EN / HA / YO / IG / PIDGIN. 3 phases = $20-50/hr remote job ready.</p>
          <div style={{ marginTop: '16px', background: 'black', color: 'white', padding: '12px 16px', borderRadius: '999px', display: 'inline-block', fontSize: '13px', fontWeight: 'bold' }}>✅ COURSES ARE NOW LIVE! Click any course to start learning!</div>
        </div>

        {[
          { title: 'Phase 1: 0-30 Days - Foundation', color: '#fde68a', data: phase1, bg: '#fffbeb' },
          { title: 'Phase 2: 30-90 Days - Builder - $30/hr', color: '#bfdbfe', data: phase2, bg: '#eff6ff' },
          { title: 'Phase 3: 90-180 Days - Specialist - $50/hr', color: '#bbf7d0', data: phase3, bg: '#f0fdf4' },
        ].map(section => (
          <div key={section.title} style={{ marginBottom: '24px' }}>
            <h3 style={{ fontWeight: 900, fontSize: '20px', margin: '0 0 12px 0' }}>{section.title}</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '16px' }}>
              {section.data.map(course => (
                <Link key={course.slug} href={`/courses/${course.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ background: 'white', borderRadius: '20px', border: `3px solid ${section.color}`, padding: '20px', cursor: 'pointer', transition: 'transform 0.1s' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                      <span style={{ background: 'black', color: 'white', padding: '4px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 'bold' }}>{course.phase}</span>
                      <span style={{ background: section.bg, padding: '4px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 'bold', border: `1px solid ${section.color}` }}>{course.hours}h • {course.score}/10</span>
                    </div>
                    <h4 style={{ fontWeight: 900, margin: '8px 0 4px 0', fontSize: '18px' }}>{course.title}</h4>
                    <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '8px' }}>{course.provider} • {course.tool} • {course.cost}</div>
                    <p style={{ fontSize: '13px', lineHeight: '1.4', color: '#374151', margin: '0 0 12px 0' }}>{course.description}</p>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px' }}>
                      {course.outcomes.slice(0,2).map(o => <span key={o} style={{ background: section.bg, padding: '4px 8px', borderRadius: '8px', fontSize: '11px', fontWeight: 600 }}>{o}</span>)}
                    </div>
                    <div style={{ background: 'black', color: 'white', padding: '10px', borderRadius: '12px', textAlign: 'center', fontWeight: 'bold', fontSize: '14px' }}>▶ Start Learning - {course.lessons.length} Lessons</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
