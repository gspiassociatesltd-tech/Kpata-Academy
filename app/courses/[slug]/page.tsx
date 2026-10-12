
'use client'
import { useParams } from 'next/navigation'
import { getCourse } from '../../lib/courses'
import Link from 'next/link'

export default function CoursePage() {
  const params = useParams()
  const slug = params.slug as string
  const course = getCourse(slug)

  if (!course) return <div style={{ padding: '40px' }}>Course not found - Go back to <Link href="/">Home</Link></div>

  return (
    <div style={{ minHeight: '100vh', background: '#faf9f6', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ background: 'black', color: 'white', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 900 }}>← KPATA ACADEMY</Link>
        <span style={{ background: '#fbbf24', color: 'black', padding: '6px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 'bold' }}>{course.phase} • {course.hours}h</span>
      </header>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '24px' }}>
        <div style={{ background: 'white', borderRadius: '20px', border: '3px solid black', padding: '28px', marginBottom: '20px' }}>
          <span style={{ background: '#fde68a', padding: '6px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 'bold' }}>{course.provider} • {course.level}</span>
          <h1 style={{ fontSize: '36px', fontWeight: 900, margin: '12px 0 8px 0', lineHeight: '1.1' }}>{course.title}</h1>
          <p style={{ color: '#4b5563', fontWeight: 600 }}>{course.description}</p>
          <div style={{ marginTop: '16px', display: 'flex', gap: '12px', flexWrap: 'wrap', fontSize: '13px' }}>
            <span style={{ background: '#faf9f6', padding: '8px 12px', borderRadius: '10px', border: '1px solid #e5e7eb' }}>🛠️ Tool: {course.tool}</span>
            <span style={{ background: '#f0fdf4', padding: '8px 12px', borderRadius: '10px', border: '1px solid #bbf7d0' }}>💰 {course.cost}</span>
            <span style={{ background: '#eff6ff', padding: '8px 12px', borderRadius: '10px', border: '1px solid #bfdbfe' }}>⏱️ {course.hours}h self-paced</span>
          </div>
          <div style={{ marginTop: '16px' }}>
            <b>What you get:</b>
            <ul style={{ margin: '8px 0 0 0', paddingLeft: '20px', fontSize: '14px', lineHeight: '1.6' }}>
              {course.outcomes.map(o => <li key={o}>{o}</li>)}
            </ul>
          </div>
        </div>

        <h2 style={{ fontWeight: 900, fontSize: '20px', marginBottom: '12px' }}>📚 {course.lessons.length} Lessons - Self Paced (Start anytime)</h2>
        {course.lessons.map((lesson, idx) => (
          <div key={lesson.id} style={{ background: 'white', borderRadius: '16px', border: '2px solid #e5e7eb', padding: '20px', marginBottom: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontWeight: 900, fontSize: '14px' }}>Lesson {idx+1}: {lesson.title}</span>
              <span style={{ background: lesson.type === 'video' ? '#fde68a' : lesson.type === 'task' ? '#bbf7d0' : '#bfdbfe', padding: '4px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 'bold' }}>{lesson.duration} • {lesson.type.toUpperCase()}</span>
            </div>
            <p style={{ fontSize: '14px', lineHeight: '1.5', color: '#374151', margin: '8px 0' }}>{lesson.content}</p>
            {lesson.toolTip && <div style={{ background: '#faf9f6', border: '1px dashed #d1d5db', padding: '10px 12px', borderRadius: '10px', fontSize: '12px', marginTop: '8px' }}>💡 <b>{lesson.toolTip}</b></div>}
            {lesson.pidgin && <div style={{ background: '#fffbeb', padding: '8px 12px', borderRadius: '10px', fontSize: '12px', marginTop: '8px', border: '1px solid #fde68a' }}>🇳🇬 PIDGIN: {lesson.pidgin}</div>}
            <Link href={`/courses/${course.slug}/${lesson.id}`} style={{ marginTop: '12px', background: 'black', color: 'white', padding: '8px 16px', borderRadius: '10px', border: 'none', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer', display: 'inline-block', textDecoration: 'none' }}>{lesson.type === 'task' ? '✓ Do Task' : '▶ Start Lesson'}</Link>
          </div>
        ))}

        <div style={{ background: 'black', color: 'white', padding: '20px', borderRadius: '16px', textAlign: 'center', marginTop: '20px' }}>
          <div style={{ fontWeight: 900, marginBottom: '8px' }}>Finish all lessons → Get Certificate + Portfolio</div>
          <Link href="/" style={{ background: 'white', color: 'black', padding: '10px 20px', borderRadius: '999px', textDecoration: 'none', fontWeight: 'bold', display: 'inline-block' }}>← Back to All Courses</Link>
        </div>
      </div>
    </div>
  )
}
