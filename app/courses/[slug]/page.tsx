
'use client'
import { useParams } from 'next/navigation'
import { getCourse } from '../../../lib/courses'
import Link from 'next/link'
import { WhatsAppBanner } from '../../../components/WhatsAppBanner'
export default function CoursePage(){
  const params = useParams()
  const slug = params.slug as string
  const course = getCourse(slug)
  if(!course) return <div>Course not found</div>
  return (
    <div style={{ minHeight: '100vh', background: '#faf9f6' }}>
      <WhatsAppBanner variant="top" />
      <div style={{ maxWidth: '850px', margin: '0 auto', padding: '16px' }}>
        <Link href="/" style={{ fontWeight: 900, fontSize: '13px', textDecoration: 'none', color: 'black' }}>← Back - No Registration Needed</Link>
        <div style={{ background: 'white', border: '3px solid black', borderRadius: '20px', padding: '20px', marginTop: '16px' }}>
          <h1 style={{ fontSize: '22px', fontWeight: 900, margin: 0 }}>{course.title} - No Registration Needed</h1>
          {course.lessons.map((l:any, i:number)=>(
            <Link key={l.id} href={`/courses/${slug}/${l.id}`} style={{ display: 'block', background: '#faf9f6', border: '2px solid #e5e7eb', padding: '14px', borderRadius: '12px', marginBottom: '10px', textDecoration: 'none', color: 'black', marginTop: '10px' }}>
              <div style={{ fontWeight: 900 }}>{i+1}. {l.title}</div>
              <div style={{ fontSize: '11px', color: '#6b7280' }}>{l.duration}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
