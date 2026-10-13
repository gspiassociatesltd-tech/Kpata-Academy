
'use client'
import { useParams } from 'next/navigation'
import { getCourse, BUILD_STATUS } from '../../../../lib/courses'
import { saveProgress, isLessonDone } from '../../../../lib/progress'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function LessonPage(){
  const params = useParams()
  const slug = params.slug as string
  const lessonId = params.lessonId as string
  const course = getCourse(slug)
  const [done,setDone]=useState(false)
  const [reading,setReading]=useState(false)
  const [labSteps,setLabSteps]=useState([false,false,false])
  const [copied,setCopied]=useState(false)
  const [mounted,setMounted]=useState(false)

  useEffect(()=>{
    setMounted(true)
    if(course){
      setDone(isLessonDone(slug, lessonId))
      const saved = localStorage.getItem(`lab_${slug}_${lessonId}`)
      if(saved) setLabSteps(JSON.parse(saved))
    }
  }, [slug, lessonId, course])

  useEffect(()=>{
    if(mounted){
      localStorage.setItem(`lab_${slug}_${lessonId}`, JSON.stringify(labSteps))
    }
  }, [labSteps, slug, lessonId, mounted])

  if(!course) return <div>Course not found</div>
  const lesson = course.lessons.find((l:any)=>l.id===lessonId)
  const idx = course.lessons.findIndex((l:any)=>l.id===lessonId)
  const next = idx>=0 && idx < course.lessons.length-1 ? course.lessons[idx+1] : null
  const prev = idx>0 ? course.lessons[idx-1] : null
  if(!lesson) return <div>Lesson not found <Link href={`/courses/${slug}`}>Back</Link></div>

  const getCopyContent = () => {
    if(lessonId==='1'){
      return `MY 5 REPETITIVE TASKS (Example - Edit with yours):

1. Writing weekly sales report every Monday (takes 1 hour)
2. Replying to same customer emails: "What is price?" "Delivery time?" (30 mins daily)
3. Summarizing long meeting notes into action items (45 mins)
4. Creating social media posts for product (1 hour weekly)
5. Copying data from emails into Excel sheet (30 mins daily)

Total time wasted per week: ~7 hours
With AI, I can save 4 hours!

My AI Opportunity Doc: I will use AI to draft reports, emails, summaries, posts, data entry.`
    }
    if(lessonId==='2'){
      return `PROMPT TO COPY-PASTE IN NOTEBOOKLM:

You are expert summarizer. I uploaded my company policy document. 
Task: Summarize leave policy in 5 bullet points.
Format: Use simple bullets, include number of days for each leave type, mention approval process.
Context: I am new employee, need quick understanding.

Now ask: What is process for sick leave? What is annual leave balance?`
    }
    if(lessonId==='3'){
      return `5 PROMPTS TO COPY FOR YOUR JOB (Prompt Pack):

1. EMAIL DRAFT PROMPT:
You are professional executive assistant. Write concise email (120 words max) to client confirming meeting tomorrow 2pm, include agenda: pricing, delivery. Tone: professional friendly.

2. SUMMARY PROMPT:
Summarize these meeting notes into 3 bullet points: key decisions, action items with owner, next meeting date. Notes: [PASTE YOUR NOTES]

3. BRAINSTORM PROMPT:
Give me 10 ideas for social media posts about our product, focus on benefits, simple language, for small business owners in Nigeria.

4. COMPARISON TABLE PROMPT:
Create table comparing 3 competitors for affordable solar batteries: Columns: Company, Price, Warranty, Battery Type. Use recent data.

5. REWRITE PROMPT:
Rewrite this email to be more professional and concise: [PASTE YOUR EMAIL]`
    }
    return lesson.lab || lesson.content.substring(0,400)
  }

  const copyContent = getCopyContent()

  const handleCopy = async () => {
    try{
      await navigator.clipboard.writeText(copyContent)
      setCopied(true)
      setTimeout(()=>setCopied(false), 2000)
    } catch{
      const ta = document.createElement('textarea')
      ta.value = copyContent
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
      setCopied(true)
      setTimeout(()=>setCopied(false), 2000)
    }
  }

  const handleRead = () => {
    if('speechSynthesis' in window){
      if(reading){ window.speechSynthesis.cancel(); setReading(false); return }
      const u = new SpeechSynthesisUtterance(`${lesson.title}. ${lesson.content}`)
      u.rate=0.9; u.lang='en-US'; u.onend=()=>setReading(false); u.onerror=()=>setReading(false)
      window.speechSynthesis.speak(u); setReading(true)
    }
  }

  const toggle = (i:number)=>{ const n=[...labSteps]; n[i]=!n[i]; setLabSteps(n) }
  const progress = labSteps.filter(Boolean).length
  const allDone = progress===3

  const handleMarkDone = () => {
    const newDone = !done
    setDone(newDone)
    saveProgress(slug, lessonId, newDone)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#faf9f6', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ background: 'black', color: 'white', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10, flexWrap: 'wrap', gap: '8px' }}>
        <Link href={`/courses/${slug}`} style={{ color: 'white', textDecoration: 'none', fontWeight: 900, fontSize: '13px' }}>← Back</Link>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ background: '#111', border: '1px solid #444', padding: '4px 10px', borderRadius: '999px', fontSize: '11px' }}>Build {BUILD_STATUS.overall}%</span>
          <Link href="/dashboard" style={{ background: '#222', border: '1px solid #444', color: 'white', padding: '4px 10px', borderRadius: '999px', fontSize: '11px', textDecoration: 'none' }}>📊 Dashboard</Link>
          <span style={{ background: '#fbbf24', color: 'black', padding: '4px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 'bold' }}>Lesson {idx+1}/{course.lessons.length}</span>
        </div>
      </header>

      <div style={{ maxWidth: '850px', margin: '0 auto', padding: '12px 16px' }}>
        <div style={{ background: 'black', color: 'white', padding: '12px 14px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', border: '2px solid #fde047', flexWrap: 'wrap', gap: '8px' }}>
          <span style={{ fontSize: '11px', fontWeight: 'bold' }}>📖 Mobile Friendly • Copy + Example + Doc Link</span>
          <button onClick={handleRead} style={{ background: reading ? '#ef4444' : '#fde047', color: 'black', padding: '6px 12px', borderRadius: '999px', border: 'none', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>{reading ? '⏹️ Stop' : '🔊 Read'}</button>
        </div>

        <div style={{ background: 'white', borderRadius: '20px', border: '3px solid black', padding: '20px' }}>
          <h1 style={{ fontSize: '20px', fontWeight: 900, margin: '0 0 12px 0', lineHeight: '1.2' }}>{idx+1}. {lesson.title}</h1>
          <div style={{ fontSize: '15px', lineHeight: '1.7', background: '#faf9f6', padding: '16px', borderRadius: '12px', border: '1px solid #e5e7eb', whiteSpace: 'pre-wrap' }}>{lesson.content}</div>

          <div style={{ marginTop: '20px', background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)', border: '3px solid #3b82f6', padding: '16px', borderRadius: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
              <div><div style={{ fontWeight: 900, fontSize: '14px' }}>🧪 Lab: 3 Steps (Dummy-Proof)</div><div style={{ fontSize: '10px', color: '#1e40af' }}>Example + Copy + Doc link</div></div>
              <div style={{ background: allDone ? '#16a34a' : '#3b82f6', color: 'white', padding: '4px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 'bold' }}>{progress}/3</div>
            </div>

            <div style={{ background: 'white', padding: '14px', borderRadius: '12px', border: `2px solid ${labSteps[0] ? '#16a34a' : '#bfdbfe'}`, marginBottom: '10px' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={()=>toggle(0)} style={{ width: '28px', height: '28px', borderRadius: '50%', border: `3px solid ${labSteps[0] ? '#16a34a' : '#3b82f6'}`, background: labSteps[0] ? '#16a34a' : 'white', color: labSteps[0] ? 'white' : '#3b82f6', fontWeight: 'bold', cursor: 'pointer', flexShrink: 0 }}>{labSteps[0] ? '✓' : '1'}</button>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 900, fontSize: '13px' }}>Step 1: Example of 5 Repetitive Tasks + Google Doc</div>
                  <div style={{ fontSize: '11px', background: '#faf9f6', padding: '10px', borderRadius: '8px', marginTop: '6px', lineHeight: '1.4' }}>
                    1. Weekly report Monday (1h)<br/>2. Same emails "Price?" (30m daily)<br/>3. Meeting notes summary (45m)<br/>4. Social posts (1h weekly)<br/>5. Emails to Excel (30m daily)<br/>Total ~7h/week wasted
                  </div>
                  <div style={{ marginTop: '8px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    <a href="https://docs.new" target="_blank" style={{ background: '#4285f4', color: 'white', padding: '8px 12px', borderRadius: '8px', textDecoration: 'none', fontSize: '11px', fontWeight: 'bold' }}>📄 Open Google Doc</a>
                    <a href="https://notebooklm.google.com" target="_blank" style={{ background: 'black', color: 'white', padding: '8px 12px', borderRadius: '8px', textDecoration: 'none', fontSize: '11px', fontWeight: 'bold' }}>📓 NotebookLM</a>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ background: 'white', padding: '14px', borderRadius: '12px', border: `2px solid ${labSteps[1] ? '#16a34a' : '#bfdbfe'}`, marginBottom: '10px' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={()=>toggle(1)} style={{ width: '28px', height: '28px', borderRadius: '50%', border: `3px solid ${labSteps[1] ? '#16a34a' : '#3b82f6'}`, background: labSteps[1] ? '#16a34a' : 'white', color: labSteps[1] ? 'white' : '#3b82f6', fontWeight: 'bold', cursor: 'pointer', flexShrink: 0 }}>{labSteps[1] ? '✓' : '2'}</button>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 900, fontSize: '13px' }}>Step 2: Copy Exactly - What to Paste</div>
                  <div style={{ marginTop: '8px', background: '#111', color: '#fde68a', padding: '12px', borderRadius: '8px', fontSize: '11px', lineHeight: '1.5', fontFamily: 'monospace', whiteSpace: 'pre-wrap', maxHeight: '150px', overflow: 'auto' }}>{copyContent.substring(0,400)}...</div>
                  <div style={{ marginTop: '8px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    <button onClick={handleCopy} style={{ background: copied ? '#16a34a' : '#fde047', color: copied ? 'white' : 'black', padding: '8px 14px', borderRadius: '8px', border: 'none', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>{copied ? '✅ Copied!' : '📋 Copy Exactly'}</button>
                    <a href="https://gemini.google.com" target="_blank" style={{ background: 'black', color: 'white', padding: '8px 12px', borderRadius: '8px', textDecoration: 'none', fontSize: '11px', fontWeight: 'bold' }}>✨ Open Gemini to Paste</a>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ background: 'white', padding: '14px', borderRadius: '12px', border: `2px solid ${labSteps[2] ? '#16a34a' : '#bfdbfe'}` }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={()=>toggle(2)} style={{ width: '28px', height: '28px', borderRadius: '50%', border: `3px solid ${labSteps[2] ? '#16a34a' : '#3b82f6'}`, background: labSteps[2] ? '#16a34a' : 'white', color: labSteps[2] ? 'white' : '#3b82f6', fontWeight: 'bold', cursor: 'pointer', flexShrink: 0 }}>{labSteps[2] ? '✓' : '3'}</button>
                <div><div style={{ fontWeight: 900, fontSize: '13px' }}>Step 3: Screenshot Proof</div><div style={{ fontSize: '11px', color: '#374151', marginTop: '4px' }}>Screenshot result, save as Lesson{idx+1}_Proof.png in folder Kpata My Work</div></div>
              </div>
            </div>
          </div>

          {lesson.quiz && (
            <div style={{ marginTop: '14px', background: '#f0fdf4', border: '2px solid #16a34a', padding: '14px', borderRadius: '12px' }}>
              <div style={{ fontWeight: 900, fontSize: '13px' }}>❓ Quick Check</div>
              <div style={{ fontSize: '13px', marginTop: '6px', background: 'white', padding: '10px', borderRadius: '8px' }}>{lesson.quiz}</div>
            </div>
          )}

          <div style={{ marginTop: '16px', padding: '14px', background: done ? '#f0fdf4' : '#fff', border: `3px solid ${done ? '#16a34a' : '#e5e7eb'}`, borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <div><div style={{ fontWeight: 900, fontSize: '14px' }}>{done ? '🎉 Completed & Saved!' : 'Mark done to save progress?'}</div><div style={{ fontSize: '10px', color: '#6b7280' }}>Progress saved to dashboard • Mobile friendly</div></div>
            <button onClick={handleMarkDone} style={{ background: done ? '#16a34a' : allDone ? '#111' : '#9ca3af', color: 'white', padding: '12px 20px', borderRadius: '10px', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>{done ? '✓ Done ✅' : allDone ? 'Mark Done 🎉' : 'Do Labs First'}</button>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', gap: '10px', flexWrap: 'wrap' }}>
          {prev ? <Link href={`/courses/${slug}/${prev.id}`} style={{ background: 'white', border: '2px solid black', padding: '12px 16px', borderRadius: '12px', textDecoration: 'none', color: 'black', fontWeight: 'bold', fontSize: '12px', flex: 1, textAlign: 'center' }}>← {prev.title.substring(0,20)}</Link> : <div style={{ flex: 1 }}></div>}
          {next ? <Link href={`/courses/${slug}/${next.id}`} onClick={()=>{ if(done) saveProgress(slug, lessonId, true) }} style={{ background: 'black', color: 'white', padding: '12px 16px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold', fontSize: '12px', flex: 1, textAlign: 'center' }}>{next.title.substring(0,20)} →</Link> : <Link href="/dashboard" style={{ background: '#16a34a', color: 'white', padding: '12px 16px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold', fontSize: '12px', flex: 1, textAlign: 'center' }}>Dashboard 🎓</Link>}
        </div>
      </div>
    </div>
  )
}
