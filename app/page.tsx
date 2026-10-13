
'use client'
import { getAllCourses, BUILD_STATUS } from '../lib/courses'
import Link from 'next/link'
import { BuildGauge } from '../lib/BuildGauge'
import { WhatsAppBanner } from '../components/WhatsAppBanner'

export default function Home(){
  const courses = getAllCourses()
  return (
    <div style={{ minHeight: '100vh', background: '#faf9f6' }}>
      <WhatsAppBanner variant="top" />
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '16px' }}>
        <div style={{ background: 'black', color: 'white', padding: '20px', borderRadius: '20px', marginBottom: '20px', border: '3px solid #fde047' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 900, margin: 0 }}>Kpata Academy - 100% FREE - No Registration Needed</h1>
          <p style={{ fontSize: '14px', color: '#fde047', margin: '8px 0 0 0' }}>15 Lessons - First Attempt Pass - Loved for Simplicity - Build Resume Optional - WhatsApp for Latest Industry Developments</p>
        </div>
        <BuildGauge />
        <div style={{ background: '#f0fdf4', border: '3px solid #16a34a', padding: '16px', borderRadius: '14px', marginBottom: '20px', fontSize: '12px', lineHeight: '1.6' }}>
          <b>Architecture You Asked:</b><br/>
          <b>No Registration Needed to Learn:</b> All 15 lessons 100% FREE, no email, progress saved locally (localStorage). Reduces friction for illiterate users.<br/>
          <b>Optional Registration for Resume:</b> When user wants resume/CV, we ask for Name, Email, Phone (optional) - Then build resume from local progress + certificates.<br/>
          <b>WhatsApp Channel for Latest Developments:</b> Join WhatsApp Channel for curriculum upgrades, industry updates, new AI tools, job alerts. Without WhatsApp, how would users know Google launched Gemini 2.0 or Microsoft updated AI-900? WhatsApp = FREE push notifications.
        </div>
        {courses.map((course:any)=>(
          <div key={course.slug} style={{ background: 'white', border: '3px solid black', borderRadius: '16px', padding: '16px', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 900, margin: 0 }}>{course.title}</h2>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>{course.provider} - No registration needed</div>
            <Link href={`/courses/${course.slug}`} style={{ display: 'inline-block', marginTop: '10px', background: '#111', color: 'white', padding: '10px 16px', borderRadius: '10px', textDecoration: 'none', fontWeight: 900, fontSize: '12px' }}>Start Learning - No Registration</Link>
          </div>
        ))}
        <Link href="/dashboard" style={{ display: 'block', background: '#111', color: 'white', padding: '16px', borderRadius: '12px', textDecoration: 'none', fontWeight: 900, textAlign: 'center', marginTop: '20px' }}>Go to Dashboard - Build Resume - See Progress - WhatsApp Updates</Link>
      </div>
    </div>
  )
}
