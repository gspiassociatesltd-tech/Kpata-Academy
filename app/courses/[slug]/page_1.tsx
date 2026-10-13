
'use client'
import { useParams } from 'next/navigation'
import { getCourse } from '../../../lib/courses'
import { getCourseProgress } from '../../../lib/progress'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function CoursePage(){
  const params = useParams()
  const slug = params.slug as string
  const course = getCourse(slug)
  const [progress,setProgress]=useState({ done: 0, total: 0, percent: 0 })
  const [mounted,setMounted]=useState(false)

  useEffect(()=>{
    if(course){
      setProgress(getCourseProgress(course.slug, course.lessons.length))
      setMounted(true)
    }
  }, [course])

  if(!course) return <div>Not found</div>

  return (
    <div style={{ minHeight: '100vh', background: '#faf9f6', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ background: 'black', color: 'white', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10, flexWrap: 'wrap', gap: '8px' }}>
        <Link href='/' style={{ color: 'white', textDecoration: 'none', fontWeight: 900, fontSize: '14px' }}>← Home</Link>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          {mounted && <span style={{ background: progress.percent>0 ? '#22c55e' : '#333', color: 'white', padding: '4px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 'bold' }}>{progress.done}/{progress.total} • {progress.percent}%</span>}
          <Link href="/dashboard" style={{ background: '#fde047', color: 'black', padding: '4px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 'bold', textDecoration: 'none' }}>Dashboard</Link>
        </div>
      </header>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '16px' }}>
        <div style={{ background: 'white', borderRadius: '20px', border: '3px solid black', padding: '20px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
            <span style={{ background: '#fde68a', padding: '6px 12px', borderRadius: '999px', fontSize: '11px', fontWeight: 'bold' }}>{course.phase} • {course.provider}</span>
            {mounted && <span style={{ background: progress.percent===100 ? '#22c55e' : '#eff6ff', color: progress.percent===100 ? 'white' : 'black', padding: '6px 12px', borderRadius: '999px', fontSize: '11px', fontWeight: 'bold', border: '1px solid #bfdbfe' }}>{progress.percent}% Complete</span>}
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: 900, margin: '8px 0' }}>{course.title}</h1>
          <p style={{ fontSize: '14px', color: '#4b5563' }}>{course.description}</p>
          {mounted && (
            <div style={{ background: '#e5e7eb', height: '8px', borderRadius: '999px', overflow: 'hidden', marginTop: '12px' }}>
              <div style={{ width: `${progress.percent}%`, background: '#22c55e', height: '100%' }}></div>
            </div>
          )}
        </div>

        <h2 style={{ fontWeight: 900, fontSize: '16px', marginBottom: '10px' }}>📚 {course.lessons.length} Lessons • Mobile Friendly</h2>
        {course.lessons.map((l:any,idx:number)=>{
          const isDone = mounted ? progress.done>idx && getCourseProgress(course.slug, course.lessons.length).done>idx : false
          // Better check
          const doneCheck = mounted ? JSON.parse(localStorage.getItem('kpata_progress')||'[]').some((p:any)=>p.courseSlug===course.slug && p.lessonId===l.id && p.done) : false
          return (
            <div key={l.id} style={{ background: 'white', borderRadius: '14px', border: `2px solid ${doneCheck ? '#bbf7d0' : '#e5e7eb'}`, padding: '16px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ flex: 1, minWidth: '200px' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ background: doneCheck ? '#22c55e' : '#111', color: 'white', width: '24px', height: '24px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', fontWeight: 'bold' }}>{doneCheck ? '✓' : idx+1}</span>
                  <span style={{ fontWeight: 900, fontSize: '14px' }}>{l.title}</span>
                </div>
                <div style={{ fontSize: '12px', color: '#6b7280', marginLeft: '32px' }}>{l.duration} • {l.type} {doneCheck ? '• ✅ Done' : ''}</div>
              </div>
              <Link href={`/courses/${course.slug}/${l.id}`} style={{ background: doneCheck ? '#f0fdf4' : 'black', color: doneCheck ? '#16a34a' : 'white', border: `2px solid ${doneCheck ? '#bbf7d0' : 'black'}`, padding: '10px 18px', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold', fontSize: '13px', whiteSpace: 'nowrap' }}>{doneCheck ? '✓ Review' : '📖 Read'}</Link>
            </div>
          )
        })}
      </div>
    </div>
  )
}
