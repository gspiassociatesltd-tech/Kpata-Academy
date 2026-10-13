
'use client'
import { useParams } from 'next/navigation'
import { getCourse } from '../../../lib/courses'
import Link from 'next/link'
export default function CoursePage(){
  const params = useParams()
  const slug = params.slug as string
  const course = getCourse(slug)
  if(!course) return <div>Not found</div>
  return (
    <div style={{ minHeight: '100vh', background: '#faf9f6', fontFamily: 'system-ui' }}>
      <header style={{ background: 'black', color: 'white', padding: '16px 24px', display: 'flex', justifyContent: 'space-between' }}>
        <Link href='/' style={{ color: 'white', textDecoration: 'none', fontWeight: 900 }}>← KPATA Build 82%</Link>
        <span style={{ background: '#fbbf24', color: 'black', padding: '6px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 'bold' }}>{course.phase} • {course.hours}h Real Training</span>
      </header>
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '24px' }}>
        <div style={{ background: 'white', borderRadius: '20px', border: '3px solid black', padding: '24px', marginBottom: '20px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 900, margin: '0 0 8px 0' }}>{course.title}</h1>
          <p style={{ color: '#4b5563', fontWeight: 500 }}>{course.description}</p>
          <div style={{ marginTop: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap', fontSize: '12px' }}>
            <span style={{ background: '#faf9f6', padding: '8px 12px', borderRadius: '10px', border: '1px solid #e5e7eb' }}>Tools: {course.tool}</span>
            <span style={{ background: '#f0fdf4', padding: '8px 12px', borderRadius: '10px', border: '1px solid #bbf7d0' }}>{course.cost}</span>
          </div>
        </div>
        <h2 style={{ fontWeight: 900, fontSize: '18px', marginBottom: '12px' }}>📚 {course.lessons.length} Real Training Modules (600+ words each)</h2>
        {course.lessons.map((l:any,idx:number)=>(
          <div key={l.id} style={{ background: 'white', borderRadius: '16px', border: '2px solid #e5e7eb', padding: '20px', marginBottom: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontWeight: 900, fontSize: '14px' }}>{idx+1}. {l.title}</span>
              <span style={{ background: '#fde68a', padding: '4px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 'bold' }}>{l.duration}</span>
            </div>
            <div style={{ fontSize: '13px', color: '#374151', lineHeight: '1.5', background: '#faf9f6', padding: '12px', borderRadius: '10px', border: '1px solid #e5e7eb', maxHeight: '120px', overflow: 'hidden' }}>{l.content.substring(0,300)}... [Read full in lesson]</div>
            {l.lab && <div style={{ fontSize: '11px', marginTop: '8px', background: '#eff6ff', padding: '8px', borderRadius: '8px' }}><b>Lab:</b> {l.lab.substring(0,100)}...</div>}
            <Link href={`/courses/${course.slug}/${l.id}`} style={{ marginTop: '12px', background: 'black', color: 'white', padding: '10px 16px', borderRadius: '10px', display: 'inline-block', textDecoration: 'none', fontWeight: 'bold', fontSize: '13px' }}>📖 Read Full Training →</Link>
          </div>
        ))}
      </div>
    </div>
  )
}
