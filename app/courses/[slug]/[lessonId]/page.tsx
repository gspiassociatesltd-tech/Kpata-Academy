
'use client'
import { useParams } from 'next/navigation'
import { getCourse } from '../../../../lib/courses'
import Link from 'next/link'
import { useState } from 'react'

export default function LessonPage() {
  const params = useParams()
  const slug = params.slug as string
  const lessonId = params.lessonId as string
  const course = getCourse(slug)
  const [done, setDone] = useState(false)

  if (!course) return <div style={{ padding: '40px' }}>Course not found</div>
  const lesson = course.lessons.find(l => l.id === lessonId)
  const idx = course.lessons.findIndex(l => l.id === lessonId)
  const nextLesson = idx >=0 && idx < course.lessons.length-1 ? course.lessons[idx+1] : null
  const prevLesson = idx >0 ? course.lessons[idx-1] : null

  if (!lesson) return <div style={{ padding: '40px' }}>Lesson not found - <Link href={`/courses/${slug}`}>Back to course</Link></div>

  return (
    <div style={{ minHeight: '100vh', background: '#faf9f6', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ background: 'black', color: 'white', padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10 }}>
        <Link href={`/courses/${slug}`} style={{ color: 'white', textDecoration: 'none', fontWeight: 900, fontSize: '14px' }}>← Back to {course.title}</Link>
        <span style={{ background: '#fbbf24', color: 'black', padding: '4px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 'bold' }}>Lesson {idx+1} of {course.lessons.length}</span>
      </header>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '24px' }}>
        <div style={{ background: 'black', borderRadius: '16px', aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexDirection: 'column', padding: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '48px' }}>▶️</div>
          <div style={{ fontWeight: 900, fontSize: '20px', marginTop: '12px' }}>{lesson.title}</div>
          <div style={{ fontSize: '13px', marginTop: '8px', opacity: 0.8 }}>{lesson.duration} • {lesson.type.toUpperCase()} • {course.tool}</div>
          <div style={{ marginTop: '16px', background: '#222', padding: '10px 16px', borderRadius: '999px', fontSize: '12px' }}>Video placeholder - Add YouTube / Loom embed here</div>
        </div>

        <div style={{ background: 'white', borderRadius: '16px', border: '2px solid #e5e7eb', padding: '24px', marginTop: '20px' }}>
          <h1 style={{ fontWeight: 900, fontSize: '24px', margin: '0 0 8px 0' }}>{lesson.title}</h1>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            <span style={{ background: '#fde68a', padding: '4px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 'bold' }}>{lesson.duration}</span>
            <span style={{ background: '#eff6ff', padding: '4px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 'bold' }}>{course.tool}</span>
          </div>

          <div style={{ fontSize: '15px', lineHeight: '1.7', color: '#111827', whiteSpace: 'pre-wrap' }}>{lesson.content}</div>

          {lesson.toolTip && (
            <div style={{ marginTop: '20px', background: '#faf9f6', border: '2px dashed #d1d5db', padding: '16px', borderRadius: '12px' }}>
              <div style={{ fontWeight: 900, fontSize: '13px', marginBottom: '6px' }}>🛠️ Tool To Use:</div>
              <div style={{ fontSize: '14px', fontWeight: 600 }}>{lesson.toolTip}</div>
              <div style={{ marginTop: '10px', display: 'flex', gap: '8px' }}>
                <a href="https://gemini.google.com" target="_blank" style={{ background: 'black', color: 'white', padding: '8px 14px', borderRadius: '8px', textDecoration: 'none', fontSize: '12px', fontWeight: 'bold' }}>Open Gemini →</a>
                <a href="https://chat.openai.com" target="_blank" style={{ background: 'white', color: 'black', border: '2px solid black', padding: '8px 14px', borderRadius: '8px', textDecoration: 'none', fontSize: '12px', fontWeight: 'bold' }}>Open ChatGPT →</a>
              </div>
            </div>
          )}

          {lesson.pidgin && (
            <div style={{ marginTop: '16px', background: '#fffbeb', border: '2px solid #fde68a', padding: '12px 16px', borderRadius: '12px', fontSize: '14px' }}>
              <b>🇳🇬 PIDGIN:</b> {lesson.pidgin}
            </div>
          )}

          <div style={{ marginTop: '24px', padding: '16px', background: done ? '#f0fdf4' : '#fff', border: `2px solid ${done ? '#bbf7d0' : '#e5e7eb'}`, borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <div style={{ fontWeight: 900, fontSize: '14px' }}>{done ? '✅ Lesson Completed!' : 'Ready to complete?'}</div>
              <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>Mark done to track progress. Self-paced - no deadline.</div>
            </div>
            <button onClick={() => setDone(!done)} style={{ background: done ? '#16a34a' : 'black', color: 'white', padding: '10px 20px', borderRadius: '10px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>{done ? '✓ Completed - Undo' : '✓ Mark as Done'}</button>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', gap: '12px' }}>
          {prevLesson ? <Link href={`/courses/${slug}/${prevLesson.id}`} style={{ background: 'white', border: '2px solid black', padding: '12px 20px', borderRadius: '12px', textDecoration: 'none', color: 'black', fontWeight: 'bold', fontSize: '14px' }}>← {prevLesson.title}</Link> : <div></div>}
          {nextLesson ? <Link href={`/courses/${slug}/${nextLesson.id}`} style={{ background: 'black', color: 'white', padding: '12px 20px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>{nextLesson.title} →</Link> : <Link href={`/courses/${slug}`} style={{ background: '#16a34a', color: 'white', padding: '12px 20px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>Finish Course → Certificate 🎓</Link>}
        </div>

        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <Link href={`/courses/${slug}`} style={{ color: '#6b7280', fontSize: '13px', textDecoration: 'none' }}>← Back to all {course.lessons.length} lessons</Link>
        </div>
      </div>
    </div>
  )
}
