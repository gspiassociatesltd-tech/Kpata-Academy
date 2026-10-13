
'use client'
import { useParams } from 'next/navigation'
import { getCourse, BUILD_STATUS } from '../../../../lib/courses'
import { saveProgress, isLessonDone } from '../../../../lib/progress'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { WhatsAppBanner } from '../../../../components/WhatsAppBanner'

export default function LessonPage(){
  const params = useParams()
  const slug = params.slug as string
  const lessonId = params.lessonId as string
  const course = getCourse(slug)
  const [done,setDone]=useState(false)
  const [mounted,setMounted]=useState(false)
  const [showVideo,setShowVideo]=useState(false)

  useEffect(()=>{
    setMounted(true)
    if(course) setDone(isLessonDone(slug, lessonId))
  }, [slug, lessonId, course])

  if(!course) return <div>Course not found</div>
  const lesson = course.lessons.find((l:any)=>l.id===lessonId)
  const idx = course.lessons.findIndex((l:any)=>l.id===lessonId)
  const next = idx>=0 && idx < course.lessons.length-1 ? course.lessons[idx+1] : null
  const prev = idx>0 ? course.lessons[idx-1] : null
  if(!lesson) return <div>Lesson not found</div>

  return (
    <div style={{ minHeight: '100vh', background: '#faf9f6' }}>
      <WhatsAppBanner variant="top" />
      <header style={{ background: 'black', color: 'white', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href={`/courses/${slug}`} style={{ color: 'white', textDecoration: 'none', fontWeight: 900, fontSize: '13px' }}>← Back</Link>
        <div style={{ display: 'flex', gap: '6px' }}>
          <span style={{ background: '#16a34a', padding: '4px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 'bold' }}>Build {BUILD_STATUS.overall}%</span>
          <span style={{ background: '#25D366', padding: '4px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 'bold' }}>No Registration</span>
        </div>
      </header>
      <div style={{ maxWidth: '850px', margin: '0 auto', padding: '12px 16px' }}>
        <div style={{ background: 'white', borderRadius: '20px', border: '3px solid black', padding: '20px' }}>
          <h1 style={{ fontSize: '20px', fontWeight: 900, margin: '0 0 12px 0' }}>{idx+1}. {lesson.title}</h1>
          <div style={{ background: '#f0fdf4', border: '2px solid #bbf7d0', padding: '8px 12px', borderRadius: '8px', marginBottom: '12px', fontSize: '11px', fontWeight: 700 }}>✓ No Registration Needed to Learn - 100% FREE - Join WhatsApp for Updates & Jobs Optional</div>
          
          <div style={{ background: 'white', border: '2px dashed #f59e0b', padding: '12px', marginBottom: '16px', borderRadius: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div><div style={{ fontWeight: 900, fontSize: '13px' }}>Video: Optional - Uses Data - Written Lesson is Enough</div><div style={{ fontSize: '11px', color: '#92400e' }}>Data Warning: 2h 18m = ~1GB. Written lesson enough for certification. No registration needed.</div></div>
              <button onClick={()=>setShowVideo(!showVideo)} style={{ background: showVideo ? '#ef4444' : '#f59e0b', color: showVideo ? 'white' : 'black', padding: '10px 16px', borderRadius: '8px', border: 'none', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>{showVideo ? 'Hide Video' : 'Show Video (Optional)'}</button>
            </div>
            {showVideo && <div style={{ marginTop: '12px', background: 'black', borderRadius: '14px', padding: '40px', color: 'white', textAlign: 'center' }}>Video: Optional - Uses data - Written lesson enough - Saves 1GB - No registration needed</div>}
          </div>

          <div style={{ fontSize: '15px', lineHeight: '1.8', background: '#faf9f6', padding: '20px', borderRadius: '12px', border: '2px solid #e5e7eb', whiteSpace: 'pre-wrap' }}>{lesson.content}<div style={{ marginTop: '16px', background: 'white', border: '2px solid #16a34a', padding: '12px', borderRadius: '10px' }}><div style={{ fontWeight: 900, fontSize: '13px', color: '#16a34a' }}>📚 Simple Summary - First Attempt Success - No Registration Needed:</div><div style={{ fontSize: '13px', marginTop: '6px', lineHeight: '1.6' }}><b>What You Must Know:</b><br/>• {(lesson as any).examTips || 'Read carefully'}<br/>• <b>Cheatsheet:</b> {(lesson as any).cheatsheet || 'See guide'}<br/>• <b>Lab:</b> Do 3 steps - We give you files - No registration<br/>• <b>Video:</b> Optional - Written enough - Saves 1GB - No registration<br/>• <b>Registration:</b> NOT required to learn - Optional only for resume - Join WhatsApp for latest industry developments</div></div></div>

          <WhatsAppBanner variant="lesson" />

          <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
            {prev ? <Link href={`/courses/${slug}/${prev.id}`} style={{ flex: 1, background: 'white', border: '3px solid black', padding: '14px', borderRadius: '12px', textDecoration: 'none', color: 'black', fontWeight: 900, textAlign: 'center' }}>← Previous</Link> : <div style={{ flex: 1 }}></div>}
            {next ? <Link href={`/courses/${slug}/${next.id}`} style={{ flex: 1, background: '#111', border: '3px solid black', padding: '14px', borderRadius: '12px', textDecoration: 'none', color: 'white', fontWeight: 900, textAlign: 'center' }}>Next →<br/><span style={{ fontSize: '11px' }}>{next.title.substring(0, 20)}...</span></Link> : <Link href={`/courses/${slug}`} style={{ flex: 1, background: '#16a34a', border: '3px solid black', padding: '14px', borderRadius: '12px', textDecoration: 'none', color: 'white', fontWeight: 900, textAlign: 'center' }}>✓ Complete Course →</Link>}
          </div>

          <div style={{ marginTop: '16px', padding: '14px', background: done ? '#f0fdf4' : '#fff', border: `3px solid ${done ? '#16a34a' : '#e5e7eb'}`, borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div><div style={{ fontWeight: 900, fontSize: '14px' }}>{done ? 'Saved! - No registration needed' : 'Finish? - No registration needed'}</div><div style={{ fontSize: '10px', color: '#6b7280' }}>Written lesson enough - No registration - Join WhatsApp optional for latest developments</div></div>
            <button onClick={()=>{ const nd=!done; setDone(nd); saveProgress(slug, lessonId, nd) }} style={{ background: done ? '#16a34a' : '#111', color: 'white', padding: '12px 20px', borderRadius: '10px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>{done ? 'Done' : 'Mark Done'}</button>
          </div>
        </div>
      </div>
    </div>
  )
}
