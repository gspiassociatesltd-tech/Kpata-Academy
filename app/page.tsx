'use client'
import { getAllCourses } from '../lib/courses'
import Link from 'next/link'
import { WhatsAppBanner } from '../components/WhatsAppBanner'

export default function Home(){
  const courses = getAllCourses()
  return (
    <div style={{ minHeight: '100vh', background: '#faf9f6' }}>
      <WhatsAppBanner variant="top" />
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '16px' }}>
        <div style={{ background: 'black', color: 'white', padding: '20px', borderRadius: '20px', marginBottom: '20px', border: '3px solid #fde047' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 900, margin: 0 }}>Kpata Academy - 100% FREE - No Registration Needed</h1>
          <p style={{ fontSize: '14px', color: '#fde047', margin: '8px 0 0 0' }}>15 Lessons - Pass First Attempt - Loved for Simplicity - Build Resume When Ready</p>
        </div>
        {courses.map((course:any)=>(
          <div key={course.slug} style={{ background: 'white', border: '3px solid black', borderRadius: '16px', padding: '16px', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 900, margin: 0 }}>{course.title}</h2>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>{course.provider}</div>
            <Link href={`/courses/${course.slug}`} style={{ display: 'inline-block', marginTop: '10px', background: '#111', color: 'white', padding: '10px 16px', borderRadius: '10px', textDecoration: 'none', fontWeight: 900, fontSize: '12px' }}>Start Learning - FREE</Link>
          </div>
        ))}
        <Link href="/dashboard" style={{ display: 'block', background: '#111', color: 'white', padding: '16px', borderRadius: '12px', textDecoration: 'none', fontWeight: 900, textAlign: 'center', marginTop: '20px' }}>Go to Dashboard - See Progress & Build Resume</Link>
      </div>
    </div>
  )
}