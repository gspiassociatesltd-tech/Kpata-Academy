
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
  const [labSteps,setLabSteps]=useState([false,false,false])
  if(!course) return <div>Course not found</div>
  const lesson = course.lessons.find((l:any)=>l.id===lessonId)
  const idx = course.lessons.findIndex((l:any)=>l.id===lessonId)
  const next = idx>=0 && idx < course.lessons.length-1 ? course.lessons[idx+1] : null
  const prev = idx>0 ? course.lessons[idx-1] : null
  if(!lesson) return <div>Lesson not found <Link href={`/courses/${slug}`}>Back</Link></div>
  const handleRead = () => {
    if('speechSynthesis' in window){
      if(reading){ window.speechSynthesis.cancel(); setReading(false); return }
      const u = new SpeechSynthesisUtterance(`${lesson.title}. ${lesson.content}. ${lesson.lab||''}`)
      u.rate=0.9; u.lang='en-US'; u.onend=()=>setReading(false); u.onerror=()=>setReading(false)
      window.speechSynthesis.speak(u); setReading(true)
    }
  }
  const toggle = (i:number)=>{ const n=[...labSteps]; n[i]=!n[i]; setLabSteps(n) }
  const progress = labSteps.filter(Boolean).length
  const allDone = progress===3
  return (
    <div style={{ minHeight: '100vh', background: '#faf9f6', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ background: 'black', color: 'white', padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10 }}>
        <Link href={`/courses/${slug}`} style={{ color: 'white', textDecoration: 'none', fontWeight: 900, fontSize: '13px' }}>← Back</Link>
        <div style={{ display: 'flex', gap: '8px' }}>
          <span style={{ background: '#111', border: '1px solid #444', padding: '4px 10px', borderRadius: '999px', fontSize: '11px' }}>Build {BUILD_STATUS.overall}%</span>
          <span style={{ background: '#fbbf24', color: 'black', padding: '4px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 'bold' }}>Lesson {idx+1}/{course.lessons.length}</span>
        </div>
      </header>
      <div style={{ maxWidth: '850px', margin: '0 auto', padding: '20px' }}>
        <div style={{ background: 'linear-gradient(135deg, #111 0%, #333 100%)', color: 'white', padding: '14px 18px', borderRadius: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', border: '2px solid #fde047' }}>
          <div><div style={{ fontSize: '13px', fontWeight: 900 }}>📖 Dummy-Proof Training • Step-by-Step</div><div style={{ fontSize: '11px', opacity: 0.8 }}>Check boxes as you go • No experience needed</div></div>
          <button onClick={handleRead} style={{ background: reading ? '#ef4444' : '#fde047', color: 'black', padding: '8px 16px', borderRadius: '999px', border: 'none', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>{reading ? '⏹️ Stop' : '🔊 Read Aloud'}</button>
        </div>
        <div style={{ background: 'white', borderRadius: '20px', border: '3px solid black', padding: '28px' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
            <span style={{ background: '#fde68a', padding: '6px 12px', borderRadius: '999px', fontSize: '11px', fontWeight: 'bold' }}>⏱️ {lesson.duration}</span>
            <span style={{ background: '#eff6ff', padding: '6px 12px', borderRadius: '999px', fontSize: '11px', fontWeight: 'bold', border: '1px solid #bfdbfe' }}>{course.tool}</span>
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 900, margin: '0 0 16px 0' }}>{idx+1}. {lesson.title}</h1>
          <div style={{ fontSize: '16px', lineHeight: '1.8', background: '#faf9f6', padding: '20px', borderRadius: '14px', border: '1px solid #e5e7eb', whiteSpace: 'pre-wrap' }}>{lesson.content}</div>

          <div style={{ marginTop: '24px', background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)', border: '3px solid #3b82f6', padding: '20px', borderRadius: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div><div style={{ fontWeight: 900, fontSize: '16px' }}>🧪 Hands-on Lab: Dummy-Proof (3 Steps)</div><div style={{ fontSize: '11px', color: '#1e40af' }}>Follow 1-2-3 • Check box when done • 10 mins • No coding</div></div>
              <div style={{ background: allDone ? '#16a34a' : '#3b82f6', color: 'white', padding: '6px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 'bold' }}>{progress}/3 {allDone ? '✅' : ''}</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ background: 'white', padding: '14px', borderRadius: '12px', border: `2px solid ${labSteps[0] ? '#16a34a' : '#bfdbfe'}`, display: 'flex', gap: '12px' }}>
                <button onClick={()=>toggle(0)} style={{ width: '32px', height: '32px', borderRadius: '50%', border: `3px solid ${labSteps[0] ? '#16a34a' : '#3b82f6'}`, background: labSteps[0] ? '#16a34a' : 'white', color: labSteps[0] ? 'white' : '#3b82f6', fontWeight: 'bold', cursor: 'pointer' }}>{labSteps[0] ? '✓' : '1'}</button>
                <div><div style={{ fontWeight: 900, fontSize: '13px' }}>Step 1: Open Tool (One Click)</div><div style={{ fontSize: '12px', color: '#374151', marginTop: '4px' }}>Click big button below - we open exact tool you need. No searching.</div><div style={{ marginTop: '8px', display: 'flex', gap: '8px' }}><a href="https://notebooklm.google.com" target="_blank" style={{ background: 'black', color: 'white', padding: '8px 14px', borderRadius: '8px', textDecoration: 'none', fontSize: '12px', fontWeight: 'bold' }}>📓 Open NotebookLM →</a><a href="https://gemini.google.com" target="_blank" style={{ background: '#fde047', color: 'black', padding: '8px 14px', borderRadius: '8px', textDecoration: 'none', fontSize: '12px', fontWeight: 'bold' }}>✨ Open Gemini →</a></div></div>
              </div>
              <div style={{ background: 'white', padding: '14px', borderRadius: '12px', border: `2px solid ${labSteps[1] ? '#16a34a' : '#bfdbfe'}`, display: 'flex', gap: '12px' }}>
                <button onClick={()=>toggle(1)} style={{ width: '32px', height: '32px', borderRadius: '50%', border: `3px solid ${labSteps[1] ? '#16a34a' : '#3b82f6'}`, background: labSteps[1] ? '#16a34a' : 'white', color: labSteps[1] ? 'white' : '#3b82f6', fontWeight: 'bold', cursor: 'pointer' }}>{labSteps[1] ? '✓' : '2'}</button>
                <div><div style={{ fontWeight: 900, fontSize: '13px' }}>Step 2: Copy-Paste Task</div><div style={{ fontSize: '12px', color: '#374151', marginTop: '4px' }}>{(lesson.lab||'Do the lab task').substring(0,200)}... Just copy exactly.</div></div>
              </div>
              <div style={{ background: 'white', padding: '14px', borderRadius: '12px', border: `2px solid ${labSteps[2] ? '#16a34a' : '#bfdbfe'}`, display: 'flex', gap: '12px' }}>
                <button onClick={()=>toggle(2)} style={{ width: '32px', height: '32px', borderRadius: '50%', border: `3px solid ${labSteps[2] ? '#16a34a' : '#3b82f6'}`, background: labSteps[2] ? '#16a34a' : 'white', color: labSteps[2] ? 'white' : '#3b82f6', fontWeight: 'bold', cursor: 'pointer' }}>{labSteps[2] ? '✓' : '3'}</button>
                <div><div style={{ fontWeight: 900, fontSize: '13px' }}>Step 3: Screenshot Proof</div><div style={{ fontSize: '12px', color: '#374151', marginTop: '4px' }}>Take screenshot of result, save in folder "Kpata My Work". This proves you did it for portfolio.</div></div>
              </div>
            </div>
          </div>

          {lesson.quiz && (
            <div style={{ marginTop: '16px', background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)', border: '3px solid #16a34a', padding: '16px', borderRadius: '14px' }}>
              <div style={{ fontWeight: 900, fontSize: '14px' }}>❓ Quick Check - Practice (Not Exam)</div>
              <div style={{ fontSize: '14px', marginTop: '8px', background: 'white', padding: '12px', borderRadius: '10px', border: '1px solid #bbf7d0' }}>{lesson.quiz}</div>
              <div style={{ fontSize: '11px', color: '#166534', marginTop: '8px' }}>💡 Tip: Answer in head, no pressure. Practice for real cert exam.</div>
            </div>
          )}

          <div style={{ marginTop: '20px', background: 'linear-gradient(135deg, #fffbeb 0%, #fde68a 100%)', border: '3px solid #f59e0b', padding: '20px', borderRadius: '16px' }}>
            <div style={{ fontWeight: 900, fontSize: '16px' }}>🚀 Try Tool Now - One Click Away (Dummy-Proof)</div>
            <div style={{ fontSize: '12px', color: '#92400e', marginTop: '4px' }}>We open exact tool. No install. FREE. Takes 2 mins.</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px', marginTop: '12px' }}>
              <a href="https://notebooklm.google.com" target="_blank" style={{ background: 'black', color: 'white', padding: '14px', borderRadius: '12px', textDecoration: 'none', textAlign: 'center' }}><div style={{ fontSize: '20px' }}>📓</div><div style={{ fontWeight: 900, fontSize: '13px' }}>Open NotebookLM</div><div style={{ fontSize: '10px', opacity: 0.8 }}>Best for YOUR docs</div></a>
              <a href="https://gemini.google.com" target="_blank" style={{ background: 'white', color: 'black', padding: '14px', borderRadius: '12px', textDecoration: 'none', textAlign: 'center', border: '3px solid black' }}><div style={{ fontSize: '20px' }}>✨</div><div style={{ fontWeight: 900, fontSize: '13px' }}>Open Gemini</div><div style={{ fontSize: '10px' }}>Ask anything</div></a>
              <a href="https://learn.microsoft.com" target="_blank" style={{ background: '#0078d4', color: 'white', padding: '14px', borderRadius: '12px', textDecoration: 'none', textAlign: 'center' }}><div style={{ fontSize: '20px' }}>🎓</div><div style={{ fontWeight: 900, fontSize: '13px' }}>Microsoft Learn</div><div style={{ fontSize: '10px' }}>Free official</div></a>
            </div>
          </div>

          <div style={{ marginTop: '20px', padding: '16px', background: done ? '#f0fdf4' : '#fff', border: `3px solid ${done ? '#16a34a' : '#e5e7eb'}`, borderRadius: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div><div style={{ fontWeight: 900, fontSize: '15px' }}>{done ? '🎉 You Did It! Certified Path Progress!' : 'Ready to finish?'}</div><div style={{ fontSize: '11px', color: '#6b7280' }}>Lab {progress}/3 • Full training 600+ words • Dummy-proof for certification</div></div>
            <button onClick={()=>setDone(!done)} style={{ background: done ? '#16a34a' : allDone ? '#111' : '#9ca3af', color: 'white', padding: '14px 28px', borderRadius: '12px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>{done ? '✓ Done ✅' : allDone ? 'Mark Done 🎉' : 'Do Labs First'}</button>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', gap: '12px' }}>
          {prev ? <Link href={`/courses/${slug}/${prev.id}`} style={{ background: 'white', border: '2px solid black', padding: '14px 20px', borderRadius: '14px', textDecoration: 'none', color: 'black', fontWeight: 'bold', fontSize: '13px' }}>← {prev.title.substring(0,30)}</Link> : <div></div>}
          {next ? <Link href={`/courses/${slug}/${next.id}`} style={{ background: 'black', color: 'white', padding: '14px 20px', borderRadius: '14px', textDecoration: 'none', fontWeight: 'bold', fontSize: '13px' }}>{next.title.substring(0,30)} →</Link> : <Link href={`/courses/${slug}`} style={{ background: '#16a34a', color: 'white', padding: '14px 24px', borderRadius: '14px', textDecoration: 'none', fontWeight: 'bold' }}>Finish Course 🎓</Link>}
        </div>
      </div>
    </div>
  )
}
