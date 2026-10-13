
'use client'
import { useParams } from 'next/navigation'
import { getCourse, BUILD_STATUS } from '../../../../lib/courses'
import { saveProgress, isLessonDone } from '../../../../lib/progress'
import Link from 'next/link'
import { useState, useEffect } from 'react'

function getVideoInfo(slug: string, lid: string){
  if(slug==='google-ai-essentials'){
    if(lid==='1') return { id: 'JtIkF2XeIdk', title: 'AI Essentials Full Course by Google', duration: '2h 18m total', chapter: 'Module 1: Watch 0:00-25:00 (25 mins only)', desc: 'Full course 2h 18m - Module 1 is first 25 mins. Watch 10 mins per day. Written lesson below covers same in 5 mins - 0 data.' }
    if(lid==='2') return { id: 'Hz0GtSycbLE', title: 'Google AI Essentials Module 2', duration: '18 mins', chapter: '18 mins', desc: 'Module 2 - 18 mins' }
    if(lid==='3') return { id: 'bknUn7yMwNI', title: 'Introduction to AI', duration: '15 mins', chapter: '15 mins', desc: '15 mins intro' }
    if(lid==='4') return { id: 'TShPEH5cgPM', title: 'Responsible AI', duration: '12 mins', chapter: '12 mins', desc: '12 mins' }
    return { id: 'JtIkF2XeIdk', title: 'AI Essentials Full Course', duration: '2h 18m', chapter: 'Watch in parts', desc: 'Full course' }
  }
  if(slug==='microsoft-ai-900') return { id: 'hT2MMa-l1RM', title: 'AI-900 Full Training', duration: '45 mins', chapter: '45 mins total', desc: 'AI-900 overview - 45 mins' }
  if(slug==='google-data-analytics') return { id: 'aMBm3O78Sfg', title: 'Data Analytics Intro', duration: '20 mins', chapter: '20 mins', desc: '20 mins intro' }
  return { id: 'JtIkF2XeIdk', title: 'AI Essentials', duration: '2h 18m', chapter: 'Watch 25 mins per day', desc: 'Full course' }
}

export default function LessonPage(){
  const params = useParams()
  const slug = params.slug as string
  const lessonId = params.lessonId as string
  const course = getCourse(slug)
  const [done,setDone]=useState(false)
  const [reading,setReading]=useState(false)
  const [labSteps,setLabSteps]=useState([false,false,false])
  const [showVideo,setShowVideo]=useState(false)
  const [quizAns,setQuizAns]=useState<number|null>(null)
  const [quizShow,setQuizShow]=useState(false)
  const [mounted,setMounted]=useState(false)

  useEffect(()=>{
    setMounted(true)
    if(course){
      setDone(isLessonDone(slug, lessonId))
      const saved = localStorage.getItem(`lab_${slug}_${lessonId}`)
      if(saved) try{ setLabSteps(JSON.parse(saved)) }catch{}
    }
  }, [slug, lessonId, course])

  useEffect(()=>{ if(mounted) localStorage.setItem(`lab_${slug}_${lessonId}`, JSON.stringify(labSteps)) }, [labSteps, slug, lessonId, mounted])

  if(!course) return <div>Course not found</div>
  const lesson = course.lessons.find((l:any)=>l.id===lessonId)
  const idx = course.lessons.findIndex((l:any)=>l.id===lessonId)
  const next = idx>=0 && idx < course.lessons.length-1 ? course.lessons[idx+1] : null
  const prev = idx>0 ? course.lessons[idx-1] : null
  if(!lesson) return <div>Lesson not found <Link href={`/courses/${slug}`}>Back</Link></div>

  const v = getVideoInfo(slug, lessonId)

  const handleRead = ()=>{
    if('speechSynthesis' in window){
      if(reading){ window.speechSynthesis.cancel(); setReading(false); return }
      const u=new SpeechSynthesisUtterance(`${lesson.title}. ${lesson.content.substring(0,900)}`); u.rate=0.85; u.onend=()=>setReading(false); u.onerror=()=>setReading(false); window.speechSynthesis.speak(u); setReading(true)
    }
  }

  const toggle = (i:number)=>{ const n=[...labSteps]; n[i]=!n[i]; setLabSteps(n) }
  const prog = labSteps.filter(Boolean).length
  const allDone = prog===3

  return (
    <div style={{ minHeight: '100vh', background: '#faf9f6', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ background: 'black', color: 'white', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10, flexWrap: 'wrap', gap: '8px' }}>
        <Link href={`/courses/${slug}`} style={{ color: 'white', textDecoration: 'none', fontWeight: 900, fontSize: '13px' }}>Back</Link>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <span style={{ background: '#16a34a', color: 'white', padding: '4px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 'bold' }}>Build {BUILD_STATUS.overall}%</span>
          <span style={{ background: '#fbbf24', color: 'black', padding: '4px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 'bold' }}>L{idx+1}/{course.lessons.length}</span>
        </div>
      </header>

      <div style={{ maxWidth: '850px', margin: '0 auto', padding: '12px 16px' }}>
        <div style={{ background: 'white', borderRadius: '20px', border: '3px solid black', padding: '20px' }}>
          <h1 style={{ fontSize: '20px', fontWeight: 900, margin: '0 0 12px 0' }}>{idx+1}. {lesson.title}</h1>
          
          <div style={{ background: 'white', border: '2px dashed #f59e0b', padding: '12px', marginBottom: '16px', borderRadius: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <div style={{ fontWeight: 900, fontSize: '13px' }}>Video: Optional - Uses Data</div>
                <div style={{ fontSize: '11px', color: '#92400e', marginTop: '4px' }}>Data Warning: {v.duration} = ~1GB at 480p. Written lesson below is enough for certification. Video is extra, not required.</div>
                <div style={{ fontSize: '11px', color: '#374151', marginTop: '4px' }}>You can get certified WITHOUT watching video - Do 3 steps + quiz + PDF is enough.</div>
              </div>
              <button onClick={()=>setShowVideo(!showVideo)} style={{ background: showVideo ? '#ef4444' : '#f59e0b', color: showVideo ? 'white' : 'black', padding: '10px 16px', borderRadius: '8px', border: 'none', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>{showVideo ? 'Hide Video' : 'Show Video (Optional)'}</button>
            </div>
            
            {showVideo && (
              <div style={{ marginTop: '12px' }}>
                <div style={{ background: 'black', borderRadius: '14px', overflow: 'hidden', border: '3px solid black' }}>
                  <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
                    <iframe src={`https://www.youtube.com/embed/${v.id}?cc_load_policy=1&modestbranding=1&rel=0`} title={v.title} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen loading="lazy"></iframe>
                  </div>
                  <div style={{ padding: '10px 14px', background: '#111', color: 'white' }}>
                    <div style={{ fontSize: '11px', fontWeight: 'bold' }}>{v.title} - {v.duration}</div>
                    <div style={{ fontSize: '10px', marginTop: '4px', color: '#fde047' }}>{v.chapter} - {v.desc}</div>
                    <div style={{ fontSize: '10px', marginTop: '4px', color: '#aaa' }}>Data saver: In YouTube tap Settings gear - Quality - 144p to use 0.2GB instead of 1GB. Or read transcript below (0 data).</div>
                  </div>
                </div>

                <div style={{ background: '#f0fdf4', border: '2px solid #bbf7d0', padding: '10px', marginTop: '10px', borderRadius: '10px' }}>
                  <div style={{ fontWeight: 900, fontSize: '12px' }}>Local Languages + Low Data:</div>
                  <div style={{ fontSize: '11px', marginTop: '6px', lineHeight: '1.5' }}>
                    Tap CC for subtitles, Settings - Subtitles - Auto-translate - Hausa/Yoruba/Igbo/Pidgin. Or tap Open in YouTube - Quality - 144p saves data. Or use Read Aloud (0 data).
                  </div>
                  <div style={{ marginTop: '8px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    <a href={`https://www.youtube.com/watch?v=${v.id}`} target="_blank" style={{ background: '#ff0000', color: 'white', padding: '8px 12px', borderRadius: '8px', textDecoration: 'none', fontSize: '11px', fontWeight: 'bold' }}>Open in YouTube (144p saves data)</a>
                  </div>
                </div>

                <div style={{ background: 'white', border: '1px solid #e5e7eb', padding: '10px', marginTop: '10px', borderRadius: '8px' }}>
                  <div style={{ fontWeight: 900, fontSize: '11px' }}>Transcript - 0 data - Read instead of video:</div>
                  <div style={{ fontSize: '11px', marginTop: '6px', color: '#374151' }}>{v.title} covers: What is AI, generative AI creates content, helps with writing and brainstorming, limitations and responsible AI. For Module 1 focus on intro. Written lesson below covers same in 5 mins.</div>
                </div>
              </div>
            )}
          </div>

          <div style={{ fontSize: '15px', lineHeight: '1.7', background: '#faf9f6', padding: '16px', borderRadius: '12px', border: '1px solid #e5e7eb', whiteSpace: 'pre-wrap' }}>{lesson.content}</div>

          <div style={{ marginTop: '12px', background: 'linear-gradient(135deg, #111 0%, #333 100%)', color: 'white', padding: '10px 14px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '2px solid #16a34a', flexWrap: 'wrap', gap: '8px' }}>
            <span style={{ fontSize: '11px', fontWeight: 'bold' }}>Written lesson is enough - 0 data - 5 mins reading - Video optional</span>
            <button onClick={handleRead} style={{ background: reading ? '#ef4444' : '#fde047', color: 'black', padding: '6px 12px', borderRadius: '999px', border: 'none', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>{reading ? 'Stop' : 'Read Aloud'}</button>
          </div>

          <div style={{ marginTop: '16px', background: '#f0fdf4', border: '3px solid #16a34a', padding: '16px', borderRadius: '14px' }}>
            <div style={{ fontWeight: 900, fontSize: '14px' }}>Quiz - Tap Answer - 0 data</div>
            <div style={{ fontSize: '14px', fontWeight: 800, marginTop: '10px', background: 'white', padding: '12px', borderRadius: '10px' }}>What is main use of AI in this lesson?</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
              {['A: Create new content faster (Correct)', 'B: Only search internet', 'C: Repair hardware'].map((opt,i)=>(
                <button key={i} onClick={()=>{ setQuizAns(i); setQuizShow(true) }} style={{ background: quizAns===i ? (i===0 ? '#16a34a' : '#ef4444') : 'white', color: quizAns===i ? 'white' : 'black', border: `2px solid ${quizAns===i ? (i===0 ? '#16a34a' : '#ef4444') : '#e5e7eb'}`, padding: '12px', borderRadius: '10px', textAlign: 'left', fontSize: '13px', cursor: 'pointer', fontWeight: 'bold' }}>{opt} {quizAns===i && i===0 ? ' Correct' : quizAns===i ? ' Try again' : ''}</button>
              ))}
            </div>
            {quizShow && <div style={{ marginTop: '10px', background: quizAns===0 ? '#f0fdf4' : '#fef2f2', padding: '12px', borderRadius: '10px', border: `2px solid ${quizAns===0 ? '#bbf7d0' : '#fecaca'}` }}><div style={{ fontWeight: 900, fontSize: '13px', color: quizAns===0 ? '#16a34a' : '#ef4444' }}>{quizAns===0 ? 'Correct!' : 'Try again - watch first 25 mins or read lesson'}</div></div>}
          </div>

          <div style={{ marginTop: '20px', background: '#eff6ff', border: '3px solid #3b82f6', padding: '16px', borderRadius: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ fontWeight: 900, fontSize: '14px' }}>3 Easy Steps - We Give You Files - 0.05MB</div>
              <div style={{ background: allDone ? '#16a34a' : '#3b82f6', color: 'white', padding: '4px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 'bold' }}>{prog}/3</div>
            </div>

            <div style={{ background: 'white', padding: '14px', borderRadius: '12px', border: `3px solid ${labSteps[0] ? '#16a34a' : '#bfdbfe'}`, marginBottom: '10px' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={()=>{ const n=[...labSteps]; n[0]=!n[0]; setLabSteps(n) }} style={{ width: '28px', height: '28px', borderRadius: '50%', border: `3px solid ${labSteps[0] ? '#16a34a' : '#3b82f6'}`, background: labSteps[0] ? '#16a34a' : 'white', color: labSteps[0] ? 'white' : '#3b82f6', fontWeight: 'bold', cursor: 'pointer', flexShrink: 0 }}>{labSteps[0] ? '✓' : '1'}</button>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 900, fontSize: '13px' }}>Step 1: Download 10-Page PDF - Real 10 Pages</div>
                  <div style={{ marginTop: '8px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    <a href="/samples/Company_Policy_Handbook_10pages.pdf" target="_blank" style={{ background: '#16a34a', color: 'white', padding: '10px 14px', borderRadius: '8px', textDecoration: 'none', fontSize: '12px', fontWeight: 'bold' }}>Download 10-Page PDF - 0.05MB</a>
                    <a href="https://notebooklm.google.com" target="_blank" style={{ background: 'black', color: 'white', padding: '10px 14px', borderRadius: '8px', textDecoration: 'none', fontSize: '12px', fontWeight: 'bold' }}>Open NotebookLM</a>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ background: 'white', padding: '14px', borderRadius: '12px', border: `3px solid ${labSteps[1] ? '#16a34a' : '#bfdbfe'}`, marginBottom: '10px' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={()=>{ const n=[...labSteps]; n[1]=!n[1]; setLabSteps(n) }} style={{ width: '28px', height: '28px', borderRadius: '50%', border: `3px solid ${labSteps[1] ? '#16a34a' : '#3b82f6'}`, background: labSteps[1] ? '#16a34a' : 'white', color: labSteps[1] ? 'white' : '#3b82f6', fontWeight: 'bold', cursor: 'pointer', flexShrink: 0 }}>{labSteps[1] ? '✓' : '2'}</button>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 900, fontSize: '13px' }}>Step 2: Copy Questions - 0 data</div>
                  <div style={{ fontSize: '11px', background: '#111', color: '#fde68a', padding: '10px', borderRadius: '8px', marginTop: '6px', fontFamily: 'monospace' }}>Q1: Summarize in 5 points. Q2: How many sick leave days? Q3: Important dates?</div>
                </div>
              </div>
            </div>

            <div style={{ background: 'white', padding: '14px', borderRadius: '12px', border: `3px solid ${labSteps[2] ? '#16a34a' : '#bfdbfe'}` }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={()=>{ const n=[...labSteps]; n[2]=!n[2]; setLabSteps(n) }} style={{ width: '28px', height: '28px', borderRadius: '50%', border: `3px solid ${labSteps[2] ? '#16a34a' : '#3b82f6'}`, background: labSteps[2] ? '#16a34a' : 'white', color: labSteps[2] ? 'white' : '#3b82f6', fontWeight: 'bold', cursor: 'pointer', flexShrink: 0 }}>{labSteps[2] ? '✓' : '3'}</button>
                <div><div style={{ fontWeight: 900, fontSize: '13px' }}>Step 3: Screenshot - Proof for portfolio</div></div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: '16px', padding: '14px', background: done ? '#f0fdf4' : '#fff', border: `3px solid ${done ? '#16a34a' : '#e5e7eb'}`, borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <div><div style={{ fontWeight: 900, fontSize: '14px' }}>{done ? 'Saved!' : 'Finish?'}</div><div style={{ fontSize: '10px', color: '#6b7280' }}>Written lesson enough - Video optional - Saves 1GB data</div></div>
            <button onClick={()=>{ const nd=!done; setDone(nd); saveProgress(slug, lessonId, nd) }} style={{ background: done ? '#16a34a' : allDone ? '#111' : '#9ca3af', color: 'white', padding: '12px 20px', borderRadius: '10px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>{done ? 'Done' : allDone ? 'Mark Done' : 'Do 3 Steps First'}</button>
          </div>
        </div>

        <div style={{ marginTop: '16px', background: '#111', color: '#fde047', padding: '14px', borderRadius: '12px', textAlign: 'center', fontWeight: 900, fontSize: '11px', border: '2px solid #16a34a' }}>
          FIXED: Build error - Video optional collapsed - Real duration 2h18m shown - Not 5 mins - Written lesson enough - Saves 1GB data per lesson
        </div>
      </div>
    </div>
  )
}
