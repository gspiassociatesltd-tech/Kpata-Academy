
'use client'
import { COURSES, BUILD_STATUS } from '../../lib/courses'
import { getProgress, getCourseProgress, getOverallProgress } from '../../lib/progress'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Dashboard(){
  const [progress,setProgress]=useState<any[]>([])
  const [mounted,setMounted]=useState(false)

  useEffect(()=>{
    setMounted(true)
    setProgress(getProgress())
  }, [])

  if(!mounted) return <div style={{ padding: '20px' }}>Loading progress...</div>

  const totalLessons = COURSES.reduce((acc,c)=>acc+c.lessons.length,0)
  const doneLessons = progress.filter((p:any)=>p.done).length
  const overallPercent = totalLessons ? Math.round(doneLessons/totalLessons*100) : 0

  return (
    <div style={{ minHeight: '100vh', background: '#faf9f6', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ background: 'black', color: 'white', padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0 }}>
        <Link href="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 900, fontSize: '14px' }}>← Home</Link>
        <span style={{ background: '#fde047', color: 'black', padding: '6px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 'bold' }}>Build {BUILD_STATUS.overall}%</span>
      </header>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '16px' }}>
        <div style={{ background: 'black', color: 'white', padding: '20px', borderRadius: '20px', marginBottom: '16px', border: '3px solid #fde047' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 900, margin: '0 0 8px 0' }}>📊 My Learning Dashboard</h1>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '12px' }}>
            <div><div style={{ fontSize: '28px', fontWeight: 900 }}>{doneLessons}/{totalLessons}</div><div style={{ fontSize: '11px', opacity: 0.8 }}>Lessons Done</div></div>
            <div><div style={{ fontSize: '28px', fontWeight: 900 }}>{overallPercent}%</div><div style={{ fontSize: '11px', opacity: 0.8 }}>Overall Progress</div></div>
            <div><div style={{ fontSize: '28px', fontWeight: 900 }}>{COURSES.length}</div><div style={{ fontSize: '11px', opacity: 0.8 }}>Courses</div></div>
          </div>
          <div style={{ background: '#222', height: '10px', borderRadius: '999px', overflow: 'hidden', marginTop: '14px' }}>
            <div style={{ width: `${overallPercent}%`, background: 'linear-gradient(90deg, #fde047, #22c55e)', height: '100%' }}></div>
          </div>
          <div style={{ fontSize: '11px', marginTop: '8px', opacity: 0.8 }}>{overallPercent===0 ? 'Start first lesson to see progress!' : overallPercent<100 ? `Keep going! ${totalLessons-doneLessons} lessons left to certified!` : '🎉 All lessons done! Ready for official exams!'}</div>
        </div>

        {COURSES.map((c:any)=>{
          const cp = getCourseProgress(c.slug, c.lessons.length)
          const courseProgress = progress.filter((p:any)=>p.courseSlug===c.slug)
          return (
            <div key={c.slug} style={{ background: 'white', borderRadius: '16px', border: `3px solid ${cp.percent>0 ? '#22c55e' : '#e5e7eb'}`, padding: '18px', marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' }}>
                <div>
                  <div style={{ fontWeight: 900, fontSize: '16px' }}>{c.title}</div>
                  <div style={{ fontSize: '11px', color: '#6b7280' }}>{c.provider} • {c.phase} • {c.hours}h • {c.lessons.length} lessons</div>
                </div>
                <span style={{ background: cp.percent===100 ? '#22c55e' : cp.percent>0 ? '#fde047' : '#f3f4f6', color: cp.percent===100 ? 'white' : 'black', padding: '6px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 'bold' }}>{cp.done}/{cp.total} • {cp.percent}% {cp.percent===100 ? '✅' : ''}</span>
              </div>

              <div style={{ background: '#e5e7eb', height: '8px', borderRadius: '999px', overflow: 'hidden', marginBottom: '12px' }}>
                <div style={{ width: `${cp.percent}%`, background: cp.percent===100 ? '#22c55e' : '#3b82f6', height: '100%' }}></div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px' }}>
                {c.lessons.map((l:any, idx:number)=>{
                  const isDone = courseProgress.some((p:any)=>p.lessonId===l.id && p.done)
                  return (
                    <Link key={l.id} href={`/courses/${c.slug}/${l.id}`} style={{ textDecoration: 'none' }}>
                      <div style={{ background: isDone ? '#f0fdf4' : '#faf9f6', border: `2px solid ${isDone ? '#bbf7d0' : '#e5e7eb'}`, padding: '10px', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '12px', fontWeight: 800, color: '#111' }}>{idx+1}. {l.title.substring(0,35)}{l.title.length>35 ? '...' : ''}</div>
                          <div style={{ fontSize: '10px', color: '#6b7280' }}>{l.duration} • {l.type}</div>
                        </div>
                        <div style={{ background: isDone ? '#22c55e' : '#e5e7eb', color: isDone ? 'white' : '#6b7280', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 'bold' }}>{isDone ? '✓' : idx+1}</div>
                      </div>
                    </Link>
                  )
                })}
              </div>

              <div style={{ marginTop: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <Link href={`/courses/${c.slug}`} style={{ background: 'black', color: 'white', padding: '10px 16px', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold', fontSize: '12px', flex: 1, textAlign: 'center' }}>{cp.percent>0 ? `Continue ${c.title} →` : `Start ${c.title} →`}</Link>
                {cp.percent===100 && <span style={{ background: '#f0fdf4', border: '2px solid #22c55e', color: '#16a34a', padding: '10px 16px', borderRadius: '10px', fontSize: '12px', fontWeight: 'bold', flex: 1, textAlign: 'center' }}>🎉 Course Done! Book Exam →</span>}
              </div>
            </div>
          )
        })}

        <div style={{ background: '#111', color: 'white', padding: '16px', borderRadius: '14px', marginTop: '16px', fontSize: '12px', lineHeight: '1.5' }}>
          <div style={{ fontWeight: 900, marginBottom: '6px' }}>📱 Mobile Friendly Progress:</div>
          <div>• Progress saved automatically on your phone (localStorage)</div>
          <div>• Works offline, no login needed yet</div>
          <div>• Tap any lesson to continue</div>
          <div>• Build {BUILD_STATUS.overall}% - Next: Supabase sync + Video + Quizzes</div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link href="/" style={{ background: 'black', color: 'white', padding: '12px 24px', borderRadius: '999px', textDecoration: 'none', fontWeight: 'bold' }}>← Back to Courses</Link>
        </div>
      </div>
    </div>
  )
}
