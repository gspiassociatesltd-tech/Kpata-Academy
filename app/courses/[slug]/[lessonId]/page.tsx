
'use client'
import { useParams } from 'next/navigation'
import { getCourse, BUILD_STATUS } from '../../../../lib/courses'
import Link from 'next/link'
import { useState } from 'react'

export default function LessonPage(){
  const params = useParams()
  const slug = params.slug as string
  const lessonId = params.lessonId as string
  const course = getCourse(slug)
  const [done,setDone]=useState(false)
  const [reading,setReading]=useState(false)
  const [labSteps,setLabSteps]=useState([false,false,false])
  const [copied,setCopied]=useState(false)

  if(!course) return <div>Course not found</div>
  const lesson = course.lessons.find((l:any)=>l.id===lessonId)
  const idx = course.lessons.findIndex((l:any)=>l.id===lessonId)
  const next = idx>=0 && idx < course.lessons.length-1 ? course.lessons[idx+1] : null
  const prev = idx>0 ? course.lessons[idx-1] : null
  if(!lesson) return <div>Lesson not found <Link href={`/courses/${slug}`}>Back</Link></div>

  // Copy content examples per lesson
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
    return lesson.lab || lesson.content.substring(0,300)
  }

  const copyContent = getCopyContent()

  const handleCopy = async () => {
    try{
      await navigator.clipboard.writeText(copyContent)
      setCopied(true)
      setTimeout(()=>setCopied(false), 2000)
    } catch{
      // fallback
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
      const u = new SpeechSynthesisUtterance(`${lesson.title}. ${lesson.content}. Lab: ${lesson.lab||''}`)
      u.rate=0.9; u.lang='en-US'; u.onend=()=>setReading(false); u.onerror=()=>setReading(false)
      window.speechSynthesis.speak(u); setReading(true)
    }
  }

  const toggle = (i:number)=>{ const n=[...labSteps]; n[i]=!n[i]; setLabSteps(n) }
  const progress = labSteps.filter(Boolean).length
  const allDone = progress===3

  return (
    <div style={{ minHeight: '100vh', background: '#faf9f6', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ background: 'black', color: 'white', padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10 }}>
        <Link href={`/courses/${slug}`} style={{ color: 'white', textDecoration: 'none', fontWeight: 900, fontSize: '13px' }}>← Back</Link>
        <div style={{ display: 'flex', gap: '8px' }}>
          <span style={{ background: '#111', border: '1px solid #444', padding: '4px 10px', borderRadius: '999px', fontSize: '11px' }}>Build {BUILD_STATUS.overall}%</span>
          <span style={{ background: '#fbbf24', color: 'black', padding: '4px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 'bold' }}>Lesson {idx+1}/{course.lessons.length}</span>
        </div>
      </header>

      <div style={{ maxWidth: '850px', margin: '0 auto', padding: '20px' }}>
        <div style={{ background: 'black', color: 'white', padding: '12px 16px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', border: '2px solid #fde047' }}>
          <span style={{ fontSize: '12px', fontWeight: 'bold' }}>📖 Real Training • Copy-Paste Ready • Google Doc Link</span>
          <button onClick={handleRead} style={{ background: reading ? '#ef4444' : '#fde047', color: 'black', padding: '6px 12px', borderRadius: '999px', border: 'none', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>{reading ? '⏹️ Stop' : '🔊 Read Aloud'}</button>
        </div>

        <div style={{ background: 'white', borderRadius: '20px', border: '3px solid black', padding: '28px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 900, margin: '0 0 16px 0' }}>{idx+1}. {lesson.title}</h1>
          <div style={{ fontSize: '16px', lineHeight: '1.8', background: '#faf9f6', padding: '20px', borderRadius: '14px', border: '1px solid #e5e7eb', whiteSpace: 'pre-wrap' }}>{lesson.content}</div>

          <div style={{ marginTop: '24px', background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)', border: '3px solid #3b82f6', padding: '20px', borderRadius: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div><div style={{ fontWeight: 900, fontSize: '16px' }}>🧪 Hands-on Lab: 3 Steps (Dummy-Proof)</div><div style={{ fontSize: '11px', color: '#1e40af' }}>Step 1 example • Step 2 copy exactly • Step 3 screenshot</div></div>
              <div style={{ background: allDone ? '#16a34a' : '#3b82f6', color: 'white', padding: '6px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 'bold' }}>{progress}/3</div>
            </div>

            {/* STEP 1 with example + Google Doc link */}
            <div style={{ background: 'white', padding: '16px', borderRadius: '12px', border: `3px solid ${labSteps[0] ? '#16a34a' : '#bfdbfe'}`, marginBottom: '12px' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={()=>toggle(0)} style={{ width: '32px', height: '32px', borderRadius: '50%', border: `3px solid ${labSteps[0] ? '#16a34a' : '#3b82f6'}`, background: labSteps[0] ? '#16a34a' : 'white', color: labSteps[0] ? 'white' : '#3b82f6', fontWeight: 'bold', cursor: 'pointer', flexShrink: 0 }}>{labSteps[0] ? '✓' : '1'}</button>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 900, fontSize: '14px' }}>Step 1: Open Google Doc + See Example of 5 Repetitive Tasks</div>
                  <div style={{ fontSize: '12px', color: '#374151', marginTop: '6px' }}>We give you example list. Replace with YOUR tasks later.</div>
                  
                  <div style={{ marginTop: '10px', background: '#faf9f6', border: '1px solid #e5e7eb', padding: '12px', borderRadius: '10px', fontSize: '12px', lineHeight: '1.5' }}>
                    <div style={{ fontWeight: 800, marginBottom: '6px' }}>Example - 5 Repetitive Tasks (Copy this format):</div>
                    <div>1. Weekly sales report Monday (1 hour)<br/>2. Replying same emails "Price?" "Delivery?" (30 mins daily)<br/>3. Summarizing meeting notes (45 mins)<br/>4. Creating social posts (1 hour weekly)<br/>5. Copying data emails to Excel (30 mins daily)<br/><br/>Total wasted: ~7 hours/week. With AI save 4 hours!</div>
                  </div>

                  <div style={{ marginTop: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <a href="https://docs.new" target="_blank" style={{ background: '#4285f4', color: 'white', padding: '10px 16px', borderRadius: '8px', textDecoration: 'none', fontSize: '13px', fontWeight: 'bold', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>📄 Open Google Doc - Create New →</a>
                    <a href="https://notebooklm.google.com" target="_blank" style={{ background: 'black', color: 'white', padding: '10px 16px', borderRadius: '8px', textDecoration: 'none', fontSize: '13px', fontWeight: 'bold' }}>📓 Open NotebookLM →</a>
                  </div>
                  <div style={{ fontSize: '10px', color: '#6b7280', marginTop: '6px' }}>docs.new creates new Google Doc instantly. Save as "My AI Opportunities"</div>
                </div>
              </div>
            </div>

            {/* STEP 2 with copy exactly */}
            <div style={{ background: 'white', padding: '16px', borderRadius: '12px', border: `3px solid ${labSteps[1] ? '#16a34a' : '#bfdbfe'}`, marginBottom: '12px' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={()=>toggle(1)} style={{ width: '32px', height: '32px', borderRadius: '50%', border: `3px solid ${labSteps[1] ? '#16a34a' : '#3b82f6'}`, background: labSteps[1] ? '#16a34a' : 'white', color: labSteps[1] ? 'white' : '#3b82f6', fontWeight: 'bold', cursor: 'pointer', flexShrink: 0 }}>{labSteps[1] ? '✓' : '2'}</button>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 900, fontSize: '14px' }}>Step 2: Copy Exactly What To Paste (Click Copy Button)</div>
                  <div style={{ fontSize: '12px', color: '#374151', marginTop: '4px' }}>Don't type. Click Copy, then paste in Google Doc or Gemini/NotebookLM.</div>
                  
                  <div style={{ marginTop: '10px', background: '#111', color: '#fde68a', padding: '14px', borderRadius: '10px', fontSize: '12px', lineHeight: '1.6', fontFamily: 'monospace', whiteSpace: 'pre-wrap', position: 'relative' }}>
                    {copyContent}
                  </div>

                  <div style={{ marginTop: '10px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    <button onClick={handleCopy} style={{ background: copied ? '#16a34a' : '#fde047', color: copied ? 'white' : 'black', padding: '10px 20px', borderRadius: '8px', border: 'none', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>{copied ? '✅ Copied!' : '📋 Copy Exactly This Text'}</button>
                    <a href="https://gemini.google.com" target="_blank" style={{ background: 'black', color: 'white', padding: '10px 16px', borderRadius: '8px', textDecoration: 'none', fontSize: '13px', fontWeight: 'bold' }}>✨ Open Gemini to Paste →</a>
                  </div>
                  <div style={{ fontSize: '10px', color: '#6b7280', marginTop: '6px' }}>After copy, open Gemini or Google Doc and paste (Ctrl+V). Edit with your own tasks.</div>
                </div>
              </div>
            </div>

            {/* STEP 3 */}
            <div style={{ background: 'white', padding: '16px', borderRadius: '12px', border: `3px solid ${labSteps[2] ? '#16a34a' : '#bfdbfe'}` }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={()=>toggle(2)} style={{ width: '32px', height: '32px', borderRadius: '50%', border: `3px solid ${labSteps[2] ? '#16a34a' : '#3b82f6'}`, background: labSteps[2] ? '#16a34a' : 'white', color: labSteps[2] ? 'white' : '#3b82f6', fontWeight: 'bold', cursor: 'pointer', flexShrink: 0 }}>{labSteps[2] ? '✓' : '3'}</button>
                <div>
                  <div style={{ fontWeight: 900, fontSize: '14px' }}>Step 3: Screenshot Proof (For Portfolio)</div>
                  <div style={{ fontSize: '12px', color: '#374151', marginTop: '4px' }}>Take screenshot of your Google Doc or Gemini result. Save in folder "Kpata My Work" on your computer or Drive. This proves you did lab for certificate.</div>
                  <div style={{ marginTop: '8px', fontSize: '11px', background: '#fffbeb', padding: '8px', borderRadius: '8px', border: '1px solid #fde68a' }}>Tip: Press Windows+Shift+S (Windows) or Cmd+Shift+4 (Mac) to screenshot. Save as Lesson1_Proof.png</div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '14px', background: allDone ? '#f0fdf4' : '#fff', border: `2px dashed ${allDone ? '#16a34a' : '#3b82f6'}`, padding: '12px', borderRadius: '10px', textAlign: 'center' }}>
              {allDone ? <div style={{ fontWeight: 900, color: '#16a34a' }}>🎉 All 3 Steps Done! You are now practical, not just theory. This counts for portfolio!</div> : <div style={{ fontWeight: 800, fontSize: '13px' }}>👉 Click Step 1, 2, 3 checkboxes as you finish. Use Copy button, don't type.</div>}
            </div>
          </div>

          {lesson.quiz && (
            <div style={{ marginTop: '16px', background: '#f0fdf4', border: '2px solid #16a34a', padding: '16px', borderRadius: '12px' }}>
              <div style={{ fontWeight: 900, fontSize: '14px' }}>❓ Quick Check</div>
              <div style={{ fontSize: '14px', marginTop: '8px', background: 'white', padding: '12px', borderRadius: '10px' }}>{lesson.quiz}</div>
            </div>
          )}

          <div style={{ marginTop: '20px', background: 'linear-gradient(135deg, #fffbeb 0%, #fde68a 100%)', border: '3px solid #f59e0b', padding: '16px', borderRadius: '14px' }}>
            <div style={{ fontWeight: 900 }}>🚀 Try Tool Now - One Click</div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '10px', flexWrap: 'wrap' }}>
              <a href="https://docs.new" target="_blank" style={{ background: '#4285f4', color: 'white', padding: '12px 18px', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold', fontSize: '13px' }}>📄 Google Doc (docs.new)</a>
              <a href="https://notebooklm.google.com" target="_blank" style={{ background: 'black', color: 'white', padding: '12px 18px', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold', fontSize: '13px' }}>📓 NotebookLM</a>
              <a href="https://gemini.google.com" target="_blank" style={{ background: 'white', border: '2px solid black', color: 'black', padding: '12px 18px', borderRadius: '10px', textDecoration: 'none', fontWeight: 'bold', fontSize: '13px' }}>✨ Gemini</a>
            </div>
          </div>

          <div style={{ marginTop: '20px', padding: '16px', background: done ? '#f0fdf4' : '#fff', border: `3px solid ${done ? '#16a34a' : '#e5e7eb'}`, borderRadius: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
            <div><div style={{ fontWeight: 900, fontSize: '15px' }}>{done ? '🎉 Completed!' : 'Complete lab?'}</div><div style={{ fontSize: '11px', color: '#6b7280' }}>Lab {progress}/3 done • Example + Copy + Doc link provided</div></div>
            <button onClick={()=>setDone(!done)} style={{ background: done ? '#16a34a' : allDone ? '#111' : '#9ca3af', color: 'white', padding: '14px 28px', borderRadius: '12px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>{done ? '✓ Done' : allDone ? 'Mark Done 🎉' : 'Do Labs First'}</button>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', gap: '12px' }}>
          {prev ? <Link href={`/courses/${slug}/${prev.id}`} style={{ background: 'white', border: '2px solid black', padding: '14px 20px', borderRadius: '14px', textDecoration: 'none', color: 'black', fontWeight: 'bold', fontSize: '13px' }}>← {prev.title.substring(0,25)}</Link> : <div></div>}
          {next ? <Link href={`/courses/${slug}/${next.id}`} style={{ background: 'black', color: 'white', padding: '14px 20px', borderRadius: '14px', textDecoration: 'none', fontWeight: 'bold', fontSize: '13px' }}>{next.title.substring(0,25)} →</Link> : <Link href={`/courses/${slug}`} style={{ background: '#16a34a', color: 'white', padding: '14px 24px', borderRadius: '14px', textDecoration: 'none', fontWeight: 'bold' }}>Finish 🎓</Link>}
        </div>
      </div>
    </div>
  )
}
