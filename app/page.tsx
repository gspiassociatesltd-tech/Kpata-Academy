
'use client'
import { COURSES, BUILD_STATUS } from '../lib/courses'
import { BuildGauge } from '../lib/BuildGauge'
import Link from 'next/link'
export default function Home(){
  return (
    <div style={{ minHeight: '100vh', background: '#faf9f6', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ background: 'black', color: 'white', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10 }}>
        <h1 style={{ fontWeight: 900, fontSize: '22px', margin: 0 }}>KPATA ACADEMY • Build {BUILD_STATUS.overall}%</h1>
        <span style={{ background: '#22c55e', color: 'white', padding: '6px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 'bold' }}>{COURSES.length} Courses • Real Training</span>
      </header>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        <BuildGauge />
        <div style={{ background: 'linear-gradient(135deg, #fde047 0%, #fb923c 100%)', padding: '40px', borderRadius: '24px', border: '3px solid black', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '42px', fontWeight: 900, lineHeight: '0.95', margin: 0 }}>Real Training.<br/>Not Topics.<br/>Full Content.</h2>
          <p style={{ marginTop: '12px', fontWeight: 600, maxWidth: '700px' }}>Each lesson now has 600+ words, labs, tools, quizzes. Text-first, TTS reads aloud. System handles easily. English first.</p>
          <div style={{ marginTop: '12px', background: 'black', color: 'white', padding: '10px 16px', borderRadius: '999px', display: 'inline-block', fontSize: '13px', fontWeight: 'bold' }}>✅ 15 Real Training Lessons LIVE • Labs • Quizzes • TTS</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '16px' }}>
          {COURSES.map((c:any)=>(
            <Link key={c.slug} href={`/courses/${c.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div style={{ background: 'white', borderRadius: '20px', border: '3px solid #e5e7eb', padding: '22px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ background: 'black', color: 'white', padding: '4px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 'bold' }}>{c.phase}</span>
                  <span style={{ background: '#faf9f6', padding: '4px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 'bold', border: '1px solid #e5e7eb' }}>{c.hours}h • {c.lessons.length} lessons</span>
                </div>
                <h4 style={{ fontWeight: 900, margin: '8px 0 4px 0', fontSize: '18px' }}>{c.title}</h4>
                <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '8px' }}>{c.provider} • {c.tool}</div>
                <p style={{ fontSize: '13px', color: '#374151', margin: '0 0 8px 0', lineHeight: '1.4' }}>{c.description}</p>
                <div style={{ fontSize: '11px', color: '#111', background: '#faf9f6', padding: '8px', borderRadius: '8px', border: '1px solid #e5e7eb' }}><b>Outcomes:</b> {c.outcomes.slice(0,3).join(' • ')}</div>
                <div style={{ background: 'black', color: 'white', padding: '10px', borderRadius: '12px', textAlign: 'center', fontWeight: 'bold', fontSize: '14px', marginTop: '10px' }}>Read Real Training →</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
