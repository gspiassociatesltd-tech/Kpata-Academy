'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { courses, COURSES } from '@/lib/courses'

export default function LessonPage({ params }: { params: { slug: string, lessonId: string } }) {
  const [progress, setProgress] = useState(56)
  const [timeSpent, setTimeSpent] = useState(12)
  const [showLab, setShowLab] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setTimeSpent(t => t + 1), 60000)
    return () => clearInterval(timer)
  }, [])

  const allCourses = (courses as any) || (COURSES as any) || []
  const course = allCourses.find((c:any) => c.slug === params.slug)
  if (!course) return <div style={{padding:24}}>Course not found - {params.slug}</div>
  
  const lesson = course.lessons?.find((l:any) => String(l.id) === String(params.lessonId))
  if (!lesson) return <div style={{padding:24}}>Lesson {params.lessonId} not found in {course.title}</div>

  const lessonIdNum = parseInt(params.lessonId)
  const paragraphs = lesson.content ? lesson.content.split(/[\n]+/).filter((p:string)=>p.trim().length>10) : ['Content coming soon']
  // Split long paragraphs further by sentences for readability
  const chunks: string[] = []
  paragraphs.forEach((p:string) => {
    if (p.length > 400) {
      const sentences = p.split(/\.\s+/)
      let current = ''
      sentences.forEach((s:string) => {
        if ((current + s).length > 350) { chunks.push(current); current = s }
        else current += (current ? '. ' : '') + s
      })
      if (current) chunks.push(current)
    } else chunks.push(p)
  })

  return (
    <div style={{minHeight:'100vh', background:'#fcfcf9', paddingBottom:40}}>
      {/* Header */}
      <div style={{background:'white', borderBottom:'1px solid #e5e7eb', position:'sticky', top:0, zIndex:10}}>
        <div style={{maxWidth:900, margin:'0 auto', padding:'12px 20px'}}>
          <Link href={`/courses/${course.slug}`} style={{color:'#2563eb', fontSize:14}}>← {course.title}</Link>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:8, flexWrap:'wrap', gap:8}}>
            <div style={{fontSize:13, color:'#6b7280'}}>Lesson {lessonIdNum} / {course.lessonsCount || course.lessons?.length} • {lesson.duration || '20 mins'} • {lesson.type}</div>
            <div style={{display:'flex', gap:12, alignItems:'center'}}>
              <div style={{fontSize:12, background:'#fef3c7', padding:'4px 8px', borderRadius:12}}>⏱ {timeSpent} mins spent</div>
              <div style={{fontSize:12, background:'#dcfce7', padding:'4px 8px', borderRadius:12}}>📊 {progress}% complete</div>
            </div>
          </div>
          <div style={{marginTop:10, height:8, background:'#f3f4f6', borderRadius:8, overflow:'hidden'}}>
            <div style={{height:'100%', width:`${progress}%`, background:'linear-gradient(90deg,#fde047,#22c55e)', borderRadius:8, transition:'width 0.5s'}}></div>
          </div>
          <div style={{fontSize:11, color:'#6b7280', marginTop:4}}>Lesson {lessonIdNum} - {progress}% complete - You're doing great! Take a break if needed</div>
        </div>
      </div>

      {/* Lesson Navigation - Clean Cards not jammed */}
      <div style={{maxWidth:900, margin:'0 auto', padding:'16px 20px'}}>
        <div style={{fontSize:12, color:'#6b7280', marginBottom:8}}>All Lessons in {course.title}:</div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(140px, 1fr))', gap:8}}>
          {course.lessons?.map((l:any) => (
            <Link key={l.id} href={`/courses/${course.slug}/${l.id}`} 
              style={{
                padding:'8px 10px', borderRadius:8, fontSize:12, textDecoration:'none',
                background: String(l.id)===String(params.lessonId) ? '#fde047' : 'white',
                border: String(l.id)===String(params.lessonId) ? '2px solid #eab308' : '1px solid #e5e7eb',
                color: '#111827', display:'block', lineHeight:'1.3'
              }}>
              <div style={{fontWeight: String(l.id)===String(params.lessonId) ? 700 : 500}}>{l.id}. {l.title?.substring(0,32)}{l.title?.length>32?'...':''}</div>
              <div style={{fontSize:10, color:'#6b7280', marginTop:2}}>{l.duration}</div>
            </Link>
          ))}
        </div>
      </div>

      <div style={{maxWidth:800, margin:'0 auto', padding:'0 20px'}}>
        {/* Title */}
        <div style={{background:'white', padding:'20px', borderRadius:16, marginBottom:16, boxShadow:'0 1px 3px rgba(0,0,0,0.1)'}}>
          <h1 style={{fontSize:26, fontWeight:800, lineHeight:1.2, margin:0}}>{lesson.title}</h1>
          <div style={{fontSize:14, color:'#6b7280', marginTop:8}}>Simple English • 2 Solved Examples • Hands-on Lab • Kpata Bot scores 80% to unlock</div>
          <div style={{marginTop:12, display:'flex', gap:8, flexWrap:'wrap'}}>
            <span style={{fontSize:12, background:'#f3f4f6', padding:'4px 8px', borderRadius:6}}>👵🏾 Mama Nkechi 68 & 👨🏾‍💻 Musa 22 learning together</span>
            <span style={{fontSize:12, background:'#fef3c7', padding:'4px 8px', borderRadius:6}}>Whether you're 18 or 68, Your experience + AI = New opportunity</span>
          </div>
        </div>

        {/* Visual 1 - Messy Data */}
        <div style={{background:'white', borderRadius:16, padding:16, marginBottom:16, border:'2px dashed #f59e0b'}}>
          <div style={{fontSize:13, fontWeight:700, marginBottom:8}}>📊 Visual 1: Messy Data = Messy Room</div>
          <div style={{background:'#fef3c7', padding:12, borderRadius:8, fontSize:14, lineHeight:1.6}}>
            Imagine your room with clothes on floor (duplicates), wrong date on wall calendar (invalid dates), empty cup (missing data). Same as dirty spreadsheet! 
            <br/><br/>
            <strong>Our illustration:</strong> Grandpa (68) and granddaughter looking at spreadsheet with yellow warning signs, crumpled papers — cleaning together. <em>Picture: / illustrations/messy-data.png</em>
          </div>
        </div>

        {/* Main Lesson Chunks */}
        {chunks.map((chunk, idx) => (
          <div key={idx}>
            <div style={{background:'white', padding:'18px', borderRadius:12, marginBottom:12, boxShadow:'0 1px 2px rgba(0,0,0,0.05)', fontSize:18, lineHeight:1.8, color:'#1f2937'}}>
              {chunk}
            </div>
            {/* Fellow Student Checkpoint every 2 chunks */}
            {(idx+1) % 2 === 0 && (
              <div style={{background:'#fef9c3', borderLeft:'4px solid #eab308', padding:'12px 16px', borderRadius:8, marginBottom:16}}>
                <div style={{fontSize:14, fontWeight:700}}>🤔 Fellow Student Check: Did you understand this part?</div>
                <div style={{fontSize:14, marginTop:6, lineHeight:1.6}}>
                  {idx===1 ? "This part confused me at first — I thought 'John' with space is different person. But TRIM makes ' John ' become 'John'. Same person! Did you get it? Extra space trick appears in Google exam." : 
                   idx===3 ? "I had to read twice — why does duplicate make sales double? If John appears twice with N500 each, you think N1000 but real N500. That was my confusion. Did you understand?" :
                   "Mama Nkechi asked: 'Why month 13 invalid?' Because calendar has only 12 months! Like writing February 31st. Did this part make sense to you?"}
                </div>
                <div style={{marginTop:8, display:'flex', gap:8}}>
                  <button onClick={()=>setProgress(p=>Math.min(100,p+5))} style={{fontSize:12, background:'#22c55e', color:'white', border:'none', padding:'6px 12px', borderRadius:6, cursor:'pointer'}}>Yes, I got it ✓</button>
                  <button style={{fontSize:12, background:'white', border:'1px solid #e5e7eb', padding:'6px 12px', borderRadius:6}}>Explain again</button>
                </div>
              </div>
            )}
            {/* Visual 2 after chunk 3 */}
            {idx===2 && (
              <div style={{background:'white', borderRadius:16, padding:16, marginBottom:16, border:'2px dashed #22c55e'}}>
                <div style={{fontSize:13, fontWeight:700, marginBottom:8}}>🧹 Visual 2: 4 Simple Steps to Clean Data</div>
                <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, fontSize:13}}>
                  <div style={{background:'#dbeafe', padding:8, borderRadius:6}}><strong>1. FIND DUPLICATES</strong><br/>Look for repeated entries</div>
                  <div style={{background:'#dcfce7', padding:8, borderRadius:6}}><strong>2. FIX DATES</strong><br/>Check YYYY-MM-DD format</div>
                  <div style={{background:'#ffedd5', padding:8, borderRadius:6}}><strong>3. FILL BLANKS</strong><br/>Fill missing with Unknown</div>
                  <div style={{background:'#e9d5ff', padding:8, borderRadius:6}}><strong>4. TRIM SPACES</strong><br/>Remove extra spaces</div>
                </div>
                <div style={{marginTop:8, fontSize:12, color:'#6b7280'}}>Tip: Always save backup copy before cleaning!</div>
              </div>
            )}
            {idx===4 && (
              <div style={{background:'white', borderRadius:16, padding:16, marginBottom:16, border:'2px dashed #3b82f6'}}>
                <div style={{fontSize:13, fontWeight:700, marginBottom:8}}>✨ Visual 3: Before Messy → After Clean</div>
                <div style={{display:'grid', gridTemplateColumns:'1fr auto 1fr', gap:8, alignItems:'center', fontSize:12}}>
                  <div style={{background:'#fee2e2', padding:8, borderRadius:6}}>BEFORE: Messy<br/>• john / John duplicates<br/>• 2024-13-01 invalid<br/>• Missing email<br/>• Extra spaces</div>
                  <div style={{fontSize:20}}>→</div>
                  <div style={{background:'#dcfce7', padding:8, borderRadius:6}}>AFTER: Clean<br/>• John ✓<br/>• 2024-12-01 ✓<br/>• All filled ✓<br/>• No spaces ✓</div>
                </div>
                <div style={{marginTop:8, fontSize:12, background:'#eff6ff', padding:6, borderRadius:6}}>Great teamwork! Data is now clean, organized, ready to use. Mama Nkechi & Musa celebrating!</div>
              </div>
            )}
          </div>
        ))}

        {/* Worked Examples */}
        <div style={{background:'#eff6ff', border:'2px solid #3b82f6', borderRadius:16, padding:16, marginBottom:16, marginTop:20}}>
          <div style={{fontSize:14, fontWeight:800, color:'#1e40af'}}>📝 WORKED EXAMPLE 1 - PAST GOOGLE CERTIFICATION EXAM QUESTION (2024) SOLVED</div>
          <div style={{fontSize:14, marginTop:10, lineHeight:1.7, whiteSpace:'pre-wrap'}}>{lesson.workedExample || 'Worked Example 1 - Past exam question: What is dirty data? Solved step-by-step...'}</div>
        </div>

        <div style={{background:'#eff6ff', border:'2px solid #3b82f6', borderRadius:16, padding:16, marginBottom:16}}>
          <div style={{fontSize:14, fontWeight:800, color:'#1e40af'}}>📝 WORKED EXAMPLE 2 - PAST EXAM SCENARIO 2 SOLVED</div>
          <div style={{fontSize:14, marginTop:10, lineHeight:1.7, whiteSpace:'pre-wrap'}}>{lesson.workedExample2 || 'Scenario: Minna shop sales data with 5 rows containing duplicates, invalid dates, missing phones. List issues and fix...'}</div>
        </div>

        {/* Lab */}
        <div style={{background:'#f0fdf4', border:'2px solid #22c55e', borderRadius:16, padding:16, marginBottom:16}}>
          <div style={{fontSize:15, fontWeight:800}}>🧪 Sample Lab - Hands-on (Kpata Bot scores 80% to unlock)</div>
          <div style={{fontSize:14, marginTop:8, lineHeight:1.6, whiteSpace:'pre-wrap'}}>{lesson.sampleLab}</div>
          <button onClick={()=>setShowLab(!showLab)} style={{marginTop:10, background:'#22c55e', color:'white', border:'none', padding:'8px 16px', borderRadius:8, cursor:'pointer'}}>Start Lab →</button>
          {showLab && <div style={{marginTop:10, background:'white', padding:10, borderRadius:8, fontSize:13}}>Lab interface: Upload cleaned sheet, Kpata Bot checks duplicates removed, dates fixed, blanks filled, spaces trimmed. Need 80% to pass. You are doing great!</div>}
        </div>

        {/* Collapsibles */}
        <details style={{background:'white', padding:12, borderRadius:8, marginBottom:8}}><summary style={{fontWeight:700, cursor:'pointer'}}>✅ Try Yourself</summary><div style={{marginTop:8, fontSize:14, whiteSpace:'pre-wrap'}}>{lesson.tryYourself}</div></details>
        <details style={{background:'white', padding:12, borderRadius:8, marginBottom:8}}><summary style={{fontWeight:700, cursor:'pointer'}}>💡 Exam Tips (Past Questions)</summary><div style={{marginTop:8, fontSize:14, whiteSpace:'pre-wrap'}}>{lesson.examTips}</div></details>
        <details style={{background:'white', padding:12, borderRadius:8, marginBottom:8}}><summary style={{fontWeight:700, cursor:'pointer'}}>📋 Cheat Sheet</summary><div style={{marginTop:8, fontSize:14, whiteSpace:'pre-wrap'}}>{lesson.cheatsheet}</div></details>
        <details style={{background:'white', padding:12, borderRadius:8, marginBottom:8}}><summary style={{fontWeight:700, cursor:'pointer'}}>❓ Quiz (Past Exam Qs)</summary><div style={{marginTop:8, fontSize:14, whiteSpace:'pre-wrap'}}>{lesson.quiz}</div></details>
        <details style={{background:'white', padding:12, borderRadius:8, marginBottom:16}}><summary style={{fontWeight:700, cursor:'pointer'}}>🏁 Final Project / Homework</summary><div style={{marginTop:8, fontSize:14, whiteSpace:'pre-wrap'}}>{lesson.finalProject}</div></details>

        {/* Next */}
        <div style={{display:'flex', justifyContent:'space-between', marginBottom:30}}>
          <Link href={`/courses/${course.slug}`} style={{padding:'10px 16px', background:'white', borderRadius:8, textDecoration:'none', color:'#111', border:'1px solid #e5e7eb'}}>← All Lessons</Link>
          <Link href={`/courses/${course.slug}/${lessonIdNum < (course.lessons?.length||15) ? lessonIdNum+1 : 1}`} style={{padding:'10px 16px', background:'#111827', color:'white', borderRadius:8, textDecoration:'none'}}>Next Lesson →</Link>
        </div>

        <div style={{textAlign:'center', fontSize:12, color:'#9ca3af', padding:20}}>Whether you're 18 or 68, Kpata Academy makes AI simple. Retirees can learn spreadsheets, cybersecurity, data analytics to start small online businesses or work remotely. Your experience + AI = New opportunity. | Time tracking: {timeSpent} mins • Progress {progress}% • Self-paced, take breaks!</div>
      </div>
    </div>
  )
}
