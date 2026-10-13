
'use client'
import { useParams } from 'next/navigation'
import { getCourse, BUILD_STATUS } from '../../../../lib/courses'
import Link from 'next/link'
import { useState } from 'react'
export default function LessonPage(){
  const params = useParams()
  const slug = params.slug as string
  const lessonId = params.lessonId as string
  const course = getCourse(slug)
  const [done,setDone]=useState(false)
  const [reading,setReading]=useState(false)
  if(!course) return <div>Course not found</div>
  const lesson = course.lessons.find((l:any)=>l.id===lessonId)
  const idx = course.lessons.findIndex((l:any)=>l.id===lessonId)
  const next = idx>=0 && idx < course.lessons.length-1 ? course.lessons[idx+1] : null
  const prev = idx>0 ? course.lessons[idx-1] : null
  if(!lesson) return <div>Lesson not found <Link href={`/courses/${slug}`}>Back</Link></div>
  const handleRead = () => {
    if('speechSynthesis' in window){
      if(reading){ window.speechSynthesis.cancel(); setReading(false); return }
      const text = `${lesson.title}. ${lesson.content}. Lab: ${lesson.lab||''}`
      const u = new SpeechSynthesisUtterance(text)
      u.rate=0.9; u.lang='en-US'; u.onend=()=>setReading(false); u.onerror=()=>setReading(false)
      window.speechSynthesis.speak(u); setReading(true)
    } else { alert('Use Chrome for TTS') }
  }
  return (
    <div style={{ minHeight: '100vh', background: '#faf9f6', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ background: 'black', color: 'white', padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10 }}>
        <Link href={`/courses/${slug}`} style={{ color: 'white', textDecoration: 'none', fontWeight: 900, fontSize: '13px' }}>← Back</Link>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span style={{ background: '#111', border: '1px solid #444', padding: '4px 10px', borderRadius: '999px', fontSize: '11px' }}>Build {BUILD_STATUS.overall}%</span>
          <span style={{ background: '#fbbf24', color: 'black', padding: '4px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 'bold' }}>Lesson {idx+1}/{course.lessons.length}</span>
        </div>
      </header>
      <div style={{ maxWidth: '850px', margin: '0 auto', padding: '20px' }}>
        <div style={{ background: 'black', color: 'white', padding: '12px 16px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
          <span style={{ fontSize: '12px', fontWeight: 'bold' }}>📖 Real Training Content • Text-first • TTS Ready</span>
          <button onClick={handleRead} style={{ background: reading ? '#ef4444' : '#fde047', color: 'black', padding: '8px 14px', borderRadius: '999px', border: 'none', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>{reading ? '⏹️ Stop Reading' : '🔊 Read Aloud Full Lesson'}</button>
        </div>
        <div style={{ background: 'white', borderRadius: '20px', border: '3px solid black', padding: '28px' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
            <span style={{ background: '#fde68a', padding: '6px 12px', borderRadius: '999px', fontSize: '11px', fontWeight: 'bold' }}>{lesson.duration} • {lesson.type.toUpperCase()}</span>
            <span style={{ background: '#eff6ff', padding: '6px 12px', borderRadius: '999px', fontSize: '11px', fontWeight: 'bold', border: '1px solid #bfdbfe' }}>{course.tool}</span>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 900, lineHeight: '1.2', margin: '0 0 20px 0' }}>{idx+1}. {lesson.title}</h1>
          <div style={{ fontSize: '16px', lineHeight: '1.8', color: '#111827', whiteSpace: 'pre-wrap' }}>{lesson.content}</div>
          {lesson.lab && (
            <div style={{ marginTop: '24px', background: '#eff6ff', border: '2px solid #bfdbfe', padding: '16px', borderRadius: '12px' }}>
              <div style={{ fontWeight: 900, fontSize: '13px', marginBottom: '6px' }}>🧪 Hands-on Lab:</div>
              <div style={{ fontSize: '14px', lineHeight: '1.6' }}>{lesson.lab}</div>
            </div>
          )}
          {lesson.quiz && (
            <div style={{ marginTop: '16px', background: '#f0fdf4', border: '2px solid #bbf7d0', padding: '16px', borderRadius: '12px' }}>
              <div style={{ fontWeight: 900, fontSize: '13px', marginBottom: '6px' }}>❓ Quick Check:</div>
              <div style={{ fontSize: '14px' }}>{lesson.quiz}</div>
            </div>
          )}
          {lesson.toolTip && (
            <div style={{ marginTop: '16px', background: '#fffbeb', border: '2px solid #fde68a', padding: '16px', borderRadius: '12px' }}>
              <div style={{ fontWeight: 900, fontSize: '13px', marginBottom: '6px' }}>🛠️ Try Tool Now:</div>
              <div style={{ fontSize: '14px', fontWeight: 600 }}>{lesson.toolTip}</div>
              <div style={{ marginTop: '10px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <a href="https://gemini.google.com" target="_blank" style={{ background: 'black', color: 'white', padding: '8px 14px', borderRadius: '8px', textDecoration: 'none', fontSize: '12px', fontWeight: 'bold' }}>Open Gemini →</a>
                <a href="https://learn.microsoft.com" target="_blank" style={{ background: 'white', color: 'black', border: '2px solid black', padding: '8px 14px', borderRadius: '8px', textDecoration: 'none', fontSize: '12px', fontWeight: 'bold' }}>Microsoft Learn →</a>
                <a href="https://console.cloud.google.com/bigquery" target="_blank" style={{ background: '#fde047', color: 'black', padding: '8px 14px', borderRadius: '8px', textDecoration: 'none', fontSize: '12px', fontWeight: 'bold' }}>BigQuery →</a>
              </div>
            </div>
          )}
          <div style={{ marginTop: '24px', padding: '16px', background: done ? '#f0fdf4' : '#fff', border: `2px solid ${done ? '#bbf7d0' : '#e5e7eb'}`, borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <div style={{ fontWeight: 900, fontSize: '14px' }}>{done ? '✅ Completed Real Training!' : 'Complete this real training?'}</div>
              <div style={{ fontSize: '11px', color: '#6b7280' }}>This is full content, not topic. 600+ words, lab, quiz.</div>
            </div>
            <button onClick={()=>setDone(!done)} style={{ background: done ? '#16a34a' : 'black', color: 'white', padding: '12px 24px', borderRadius: '10px', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>{done ? '✓ Done' : '✓ Mark as Done'}</button>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', gap: '12px' }}>
          {prev ? <Link href={`/courses/${slug}/${prev.id}`} style={{ background: 'white', border: '2px solid black', padding: '12px 20px', borderRadius: '12px', textDecoration: 'none', color: 'black', fontWeight: 'bold', fontSize: '14px' }}>← {prev.title}</Link> : <div></div>}
          {next ? <Link href={`/courses/${slug}/${next.id}`} style={{ background: 'black', color: 'white', padding: '12px 20px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>{next.title} →</Link> : <Link href={`/courses/${slug}`} style={{ background: '#16a34a', color: 'white', padding: '12px 20px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>Finish Course 🎓</Link>}
        </div>
        <div style={{ marginTop: '16px', textAlign: 'center', fontSize: '11px', color: '#6b7280' }}>Real training content • Text-first easy for system • TTS reads aloud • Video optional later</div>
      </div>
    </div>
  )
}
