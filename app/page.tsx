
'use client'
import { getAllCourses, BUILD_STATUS } from '../lib/courses'
import Link from 'next/link'
import { BuildGauge } from '../lib/BuildGauge'
import { WhatsAppBanner } from '../components/WhatsAppBanner'

export default function Home(){
  const courses = getAllCourses()
  return (
    <div style={{ minHeight: '100vh', background: '#faf9f6', fontFamily: 'system-ui' }}>
      <WhatsAppBanner variant="top" />
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '16px' }}>
        <div style={{ background: 'black', color: 'white', padding: '20px', borderRadius: '20px', marginBottom: '20px', border: '3px solid #fde047' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 900, margin: 0 }}>Kpata Academy - AI Training 100% FREE</h1>
          <p style={{ margin: '8px 0 0 0', fontSize: '14px', color: '#fde047' }}>No Registration Needed to Learn - 15 Lessons - First Attempt Certification Success - Loved for Simplicity</p>
          <div style={{ marginTop: '12px', background: '#25D366', padding: '10px', borderRadius: '10px', fontSize: '12px', fontWeight: 'bold' }}>💬 Join WhatsApp Channel for FREE Updates, Job Alerts, Exam Tips - Optional - No Registration Needed to Learn!</div>
        </div>

        <BuildGauge />

        <div style={{ background: '#f0fdf4', border: '3px solid #16a34a', padding: '16px', borderRadius: '14px', marginBottom: '20px' }}>
          <div style={{ fontWeight: 900, fontSize: '14px' }}>✓ No Registration Needed to Start Learning!</div>
          <div style={{ fontSize: '12px', marginTop: '6px', lineHeight: '1.6' }}>
            <b>We agreed:</b> Users should NOT be required to register before using the app - Reduces friction for illiterate users - 100% FREE access to all 15 lessons<br/>
            <b>Optional Registration:</b> Only if user wants to save progress across devices (phone + laptop) - Otherwise progress saved locally in browser<br/>
            <b>Encourage WhatsApp Channel:</b> Join our WhatsApp Channel for FREE updates, job alerts, exam tips, certificates - No spam - Leave anytime - Link: https://whatsapp.com/channel/0029Vb6KpataAcademy<br/>
            <b>How it works:</b> Open lesson → Read 5 mins (0 data) → Download 10-page PDF (0.05MB) → Do 3 steps + Quiz → Mark Done → Next lesson → No registration needed!
          </div>
        </div>

        {courses.map((course:any)=>(
          <div key={course.slug} style={{ background: 'white', border: '3px solid black', borderRadius: '16px', padding: '16px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <h2 style={{ fontSize: '18px', fontWeight: 900, margin: 0 }}>{course.title}</h2>
                <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>{course.provider} - {course.level} - {course.hours} hours - No registration needed</div>
                <div style={{ fontSize: '12px', marginTop: '6px' }}>{course.description}</div>
              </div>
              <Link href={`/courses/${course.slug}`} style={{ background: '#111', color: 'white', padding: '10px 16px', borderRadius: '10px', textDecoration: 'none', fontWeight: 900, fontSize: '12px' }}>Start Learning - No Registration</Link>
            </div>
            <div style={{ marginTop: '12px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {course.lessons.map((l:any, i:number)=>(
                <Link key={l.id} href={`/courses/${course.slug}/${l.id}`} style={{ background: '#f3f4f6', border: '1px solid #e5e7eb', padding: '6px 10px', borderRadius: '8px', textDecoration: 'none', color: 'black', fontSize: '11px', fontWeight: 600 }}>L{i+1}: {l.title.substring(0, 20)}...</Link>
              ))}
            </div>
          </div>
        ))}

        <div style={{ background: 'white', border: '3px solid #25D366', borderRadius: '14px', padding: '16px', marginTop: '20px' }}>
          <div style={{ fontWeight: 900, fontSize: '14px' }}>💬 Join WhatsApp Channel - FREE - No Registration Needed to Learn</div>
          <div style={{ fontSize: '12px', marginTop: '8px' }}>Get FREE updates, job alerts, exam tips, certificate celebrations. No spam. Leave anytime. Link: https://whatsapp.com/channel/0029Vb6KpataAcademy - Replace with your real channel link in lib/whatsapp.ts</div>
          <a href="https://whatsapp.com/channel/0029Vb6KpataAcademy" target="_blank" style={{ display: 'inline-block', marginTop: '10px', background: '#25D366', color: 'white', padding: '10px 16px', borderRadius: '8px', textDecoration: 'none', fontWeight: 900, fontSize: '12px' }}>Join WhatsApp Channel - FREE</a>
        </div>
      </div>
    </div>
  )
}
