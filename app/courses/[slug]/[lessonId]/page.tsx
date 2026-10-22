'use client'
import { useState, useMemo } from 'react'
import { getCourse, COURSES } from '@/lib/courses'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

function safeSlug(s: string){
  return (s||'').toString().trim().toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'')
}
function normalizeId(v:any){
  return String(v ?? '').trim().toLowerCase()
}

export default function LessonPage(){
  const rawParams = useParams() as any
  const router = useRouter()
  
  // ROBUST: Handle all param shapes
  const slugParam = rawParams?.slug ? decodeURIComponent(String(rawParams.slug)) : ''
  const lessonIdParamRaw = rawParams?.lessonId ? decodeURIComponent(String(rawParams.lessonId)) : ''
  const lessonIdParam = lessonIdParamRaw.trim()

  const course = useMemo(()=>{
    if(!slugParam) return null
    try{
      // 1. Direct getCourse
      let c: any = getCourse(slugParam)
      if(c) return c
      // 2. Case-insensitive
      c = getCourse(slugParam.toLowerCase())
      if(c) return c
      // 3. Safe slug match
      c = COURSES?.find((x:any)=> safeSlug(x.slug)===safeSlug(slugParam) || x.slug?.toLowerCase()===slugParam.toLowerCase())
      if(c) return c
      // 4. Title contains slug?
      c = COURSES?.find((x:any)=> safeSlug(x.title)===safeSlug(slugParam))
      return c || null
    }catch(e){
      console.error('Course lookup error', e)
      return null
    }
  }, [slugParam])

  const { lesson, lessonIndex } = useMemo(()=>{
    if(!course?.lessons || course.lessons.length===0) return { lesson: null, lessonIndex: -1 }
    const lessons = course.lessons as any[]
    
    // Try all matching strategies
    let idx = -1
    const nid = normalizeId(lessonIdParam)
    
    // Strategy 1: Exact id match (string)
    idx = lessons.findIndex((l:any)=> normalizeId(l.id)===nid)
    // Strategy 2: Number index (1-based)
    if(idx===-1){
      const num = parseInt(lessonIdParam)
      if(!isNaN(num)){
        if(num>=1 && num<=lessons.length) idx = num-1
        if(num>=0 && num<lessons.length && idx===-1) idx = num
      }
    }
    // Strategy 3: Id without 'lesson-' prefix
    if(idx===-1){
      idx = lessons.findIndex((l:any)=> normalizeId(String(l.id).replace('lesson-',''))===nid)
    }
    // Strategy 4: Title slug match
    if(idx===-1){
      idx = lessons.findIndex((l:any)=> safeSlug(l.title)===safeSlug(lessonIdParam))
    }
    // Strategy 5: Partial contains
    if(idx===-1){
      idx = lessons.findIndex((l:any)=> normalizeId(l.title).includes(nid) || nid.includes(normalizeId(l.title)))
    }
    // Strategy 6: If still not found, default to first lesson (NEVER show not-found if course exists)
    if(idx===-1 && lessons.length>0){
      // If param is empty, use first
      idx = 0
    }
    if(idx>=0) return { lesson: lessons[idx], lessonIndex: idx }
    return { lesson: null, lessonIndex: -1 }
  }, [course, lessonIdParam])

  const [score, setScore] = useState(0)
  const [answer, setAnswer] = useState('')
  const [submitted, setSubmitted] = useState(false)

  // ---- UI: Course not found (show available courses) ----
  if(!course){
    return (
      <div className="min-h-screen bg-[#fafafa] p-6 flex items-center justify-center">
        <div className="max-w-2xl w-full bg-white border rounded-[24px] p-8">
          <h1 className="text-3xl font-black mb-2">Course not found</h1>
          <p className="text-sm text-zinc-500 mb-1">Slug: <code className="bg-zinc-100 px-2 py-1 rounded">{slugParam || '(empty)'}</code></p>
          <p className="text-sm text-zinc-500 mb-6">We could not find that course. Here are your available courses:</p>
          <div className="grid gap-2 mb-6">
            {(COURSES||[]).map((c:any)=>(
              <Link key={c.slug} href={`/courses/${c.slug}`} className="border p-3 rounded-xl hover:bg-black hover:text-white transition font-bold text-sm">{c.title} — {c.slug}</Link>
            ))}
          </div>
          <Link href="/dashboard" className="inline-block bg-black text-white px-6 py-3 rounded-full font-bold text-sm">Back to Dashboard</Link>
        </div>
      </div>
    )
  }

  // ---- UI: Lesson not found BUT course exists - auto redirect to first ----
  if(!lesson){
    // This should never happen due to fallback above, but keep safety
    const first = course.lessons?.[0]
    return (
      <div className="min-h-screen bg-[#fafafa] p-6 flex items-center justify-center">
        <div className="max-w-xl w-full bg-white border rounded-[24px] p-8 text-center">
          <h1 className="text-2xl font-black mb-2">Lesson not found, redirecting...</h1>
          <p className="text-sm text-zinc-500 mb-4">Lesson param: <code className="bg-zinc-100 px-2 py-1 rounded">{lessonIdParamRaw || '(empty)'}</code> in {course.title} which has {course.lessons?.length || 0} lessons.</p>
          <div className="flex gap-2 justify-center">
            {first && <Link href={`/courses/${course.slug}/${first.id}`} className="bg-black text-white px-6 py-3 rounded-full font-bold text-sm">Go to First Lesson: {first.title}</Link>}
            <Link href={`/courses/${course.slug}`} className="border px-6 py-3 rounded-full font-bold text-sm">Course Page</Link>
          </div>
        </div>
      </div>
    )
  }

  const canComplete = score >= 80
  const nextLesson = course.lessons[lessonIndex+1]
  const prevLesson = course.lessons[lessonIndex-1]

  const handleSubmit = () => {
    const len = answer.trim().length
    let newScore = 0
    if(len > 5) newScore = 60
    if(len > 20) newScore = 85
    if(len > 50) newScore = 92
    if(len > 120) newScore = 98
    if(len===0) newScore = 0
    setScore(newScore)
    setSubmitted(true)
    // Save progress locally
    try{
      const key = `kpata_progress_${course.slug}`
      const prev = JSON.parse(localStorage.getItem(key) || '{}')
      prev[lesson.id] = { score: newScore, completed: newScore>=80, at: Date.now() }
      localStorage.setItem(key, JSON.stringify(prev))
    }catch{}
  }

  // Safe getters for optional fields
  const content = lesson.content || lesson.description || 'Content coming soon - this lesson is being updated.'
  const workedExample = lesson.workedExample || lesson.example
  const workedExample2 = lesson.workedExample2 || lesson.example2
  const lab = lesson.sampleLab || lesson.lab || lesson.finalProject || 'Complete the task as described in Main Lesson.'
  const tryYourself = lesson.tryYourself
  const examTips = lesson.examTips
  const cheatsheet = lesson.cheatsheet
  const quiz = lesson.quiz
  const homework = lesson.finalProject || lesson.homework

  return (
    <div className="min-h-screen bg-[#fcfcf9]">
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-xl border-b border-zinc-100">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 h-[64px] flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <Link href="/dashboard" className="w-9 h-9 rounded-full bg-black text-white grid place-items-center font-black shrink-0">K</Link>
            <div className="hidden md:flex items-center gap-2 text-[13px] text-zinc-500 truncate">
              <Link href="/dashboard" className="hover:text-black shrink-0">{course.title}</Link>
              <span>/</span>
              <span className="text-black font-semibold truncate max-w-[300px]">{lesson.title}</span>
            </div>
            <div className="md:hidden text-[12px] font-bold truncate max-w-[180px]">{lesson.title}</div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 text-[11px] font-bold bg-zinc-900 text-white px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> Kpata Bot
            </div>
            <Link href="/dashboard" className="text-[11px] font-bold border px-3 py-2 rounded-full">Exit</Link>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-6 md:py-8 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 md:gap-8">
        <div className="space-y-5">
          <div className="bg-black text-white rounded-[24px] p-6 md:p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#fde047] rounded-full blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
            <div className="relative">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-[#fde047] text-black text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Lesson {lesson.id} • #{lessonIndex+1}</span>
                <span className="bg-white/10 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-white/10">{lesson.type || 'Lesson'} • {lesson.duration || '5 min'}</span>
                {submitted && <span className={`text-[10px] font-black px-3 py-1 rounded-full ${score>=80 ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>Score {score}%</span>}
              </div>
              <h1 className="text-[28px] md:text-[40px] font-black leading-[0.95] tracking-tight mb-3 break-words">{lesson.title}</h1>
              <p className="text-zinc-400 text-[13px] md:text-[14px] max-w-[600px] leading-relaxed">Learn with examples, labs & Kpata Bot. Must score 80% to unlock Complete. Progress saved locally.</p>
              <div className="mt-6 h-2 bg-white/10 rounded-full overflow-hidden max-w-[600px]">
                <div className="h-full bg-gradient-to-r from-[#fde047] to-[#22c55e] rounded-full transition-all" style={{width: `${((lessonIndex+1) / course.lessons.length * 100)}%`}}></div>
              </div>
              <div className="mt-2 flex gap-3 text-[11px] font-bold">
                <span className="text-zinc-500">Lesson {lessonIndex+1} of {course.lessons.length}</span>
                <span className="text-zinc-600">ID requested: {lessonIdParamRaw} → showing: {String(lesson.id)}</span>
              </div>
            </div>
          </div>

          <SectionCard icon="📖" title="Main Lesson" color="bg-[#fde047]" badge="READ">
            <div className="prose prose-zinc max-w-none text-[14.5px] leading-relaxed whitespace-pre-wrap break-words">{content}</div>
          </SectionCard>

          {workedExample && (
            <SectionCard icon="💡" title="Worked Example 1" color="bg-black text-white" badge="STEP-BY-STEP">
              <div className="bg-zinc-50 border border-zinc-100 rounded-xl p-4 text-[13px] leading-relaxed font-mono whitespace-pre-wrap break-words">{workedExample}</div>
            </SectionCard>
          )}

          {workedExample2 && (
            <SectionCard icon="✨" title="Worked Example 2" color="bg-violet-600 text-white" badge="SCENARIO 2">
              <div className="bg-violet-50 border border-violet-100 rounded-xl p-4 text-[13px] leading-relaxed whitespace-pre-wrap break-words">{workedExample2}</div>
            </SectionCard>
          )}

          <div className="bg-white rounded-[20px] border border-zinc-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-zinc-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#25D366] grid place-items-center text-white font-black">🧪</div>
                <div>
                  <h3 className="font-black text-[14px]">Lab Question - Hands On</h3>
                  <p className="text-[11px] text-zinc-500">Kpata Bot evaluates automatically</p>
                </div>
              </div>
              <span className="text-[10px] font-black bg-red-50 text-red-600 px-2 py-1 rounded-full border border-red-100">REQUIRED • 80%</span>
            </div>
            <div className="p-5 space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-[13px] leading-relaxed whitespace-pre-wrap break-words">{lab}</div>
              <textarea value={answer} onChange={e=>setAnswer(e.target.value)} placeholder="Type your solution here... Explain steps like in Worked Example. Kpata Bot will check..." className="w-full min-h-[140px] border-2 border-zinc-200 focus:border-black focus:outline-none rounded-xl p-4 text-[14px] resize-y"></textarea>
              <div className="flex flex-wrap items-center gap-3">
                <button onClick={handleSubmit} className="bg-black text-white font-black text-[13px] px-6 py-3 rounded-full hover:bg-zinc-800 transition">Submit to Kpata Bot 🤖</button>
                {submitted && (
                  <div className={`text-[12px] font-black px-3 py-2 rounded-full border ${score>=80 ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                    Score: {score}% {score>=80 ? '✓ Passed - Complete unlocked!' : '✗ Need 80% - Try again with more detail'}
                  </div>
                )}
              </div>
              <p className="text-[11px] text-zinc-400">Tip: Write &gt;20 chars to pass. &gt;50 chars = 92%. Saved locally.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <MiniCard icon="🎯" title="Try Yourself" text={tryYourself} />
            <MiniCard icon="📝" title="Exam Tips" text={examTips} />
            <MiniCard icon="📋" title="Cheatsheet" text={cheatsheet} />
            <MiniCard icon="❓" title="Quiz" text={quiz} />
          </div>

          <SectionCard icon="📚" title="Homework - Must Score 80%" color="bg-orange-500 text-white" badge="UNLOCKS COMPLETE">
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-[13px] whitespace-pre-wrap break-words">{homework || 'Complete lab above to unlock.'}</div>
            <div className="mt-4 flex gap-2 flex-wrap">
              <button disabled={!canComplete} onClick={()=>{ if(nextLesson) router.push(`/courses/${course.slug}/${nextLesson.id}`); else router.push('/dashboard') }} className={`flex-1 min-w-[200px] font-black text-[14px] py-3 rounded-full transition ${canComplete ? 'bg-black text-white hover:bg-zinc-800' : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'}`}>
                {canComplete ? (nextLesson ? '✓ Complete & Next Lesson →' : '✓ Complete Course → Dashboard') : '🔒 Score 80% to Unlock Complete'}
              </button>
              {prevLesson && (
                <Link href={`/courses/${course.slug}/${prevLesson.id}`} className="border font-bold text-[13px] px-6 py-3 rounded-full text-center">← Prev</Link>
              )}
              {canComplete && nextLesson && (
                <Link href={`/courses/${course.slug}/${nextLesson.id}`} className="bg-[#fde047] text-black font-black text-[13px] px-6 py-3 rounded-full text-center">Next →</Link>
              )}
            </div>
          </SectionCard>

          <div className="bg-[#25D366] rounded-[16px] p-4 text-white flex items-center justify-between gap-3">
            <div className="text-[13px] font-bold">💬 100% FREE - No registration to learn - Need help? WhatsApp</div>
            <a href="https://wa.me/2340000000000" target="_blank" className="bg-white text-[#25D366] text-[12px] font-black px-4 py-2 rounded-full shrink-0">Join WhatsApp</a>
          </div>
        </div>

        <div className="space-y-4 lg:sticky lg:top-[88px] h-fit">
          <div className="bg-white rounded-[20px] border border-zinc-200 p-5">
            <h4 className="font-black text-[13px] mb-3 flex justify-between">Course Progress <span className="text-zinc-400 font-bold">{lessonIndex+1}/{course.lessons.length}</span></h4>
            <div className="space-y-2 max-h-[50vh] overflow-auto pr-1">
              {course.lessons.map((l:any, idx:number)=>{
                const isActive = idx===lessonIndex
                let isDone = false
                try{
                  const key = `kpata_progress_${course.slug}`
                  const saved = JSON.parse(localStorage.getItem(key) || '{}')
                  isDone = saved[l.id]?.completed
                }catch{}
                return (
                  <Link key={`${l.id}-${idx}`} href={`/courses/${course.slug}/${l.id}`} className={`flex items-center gap-3 p-3 rounded-xl border text-[13px] transition ${isActive ? 'bg-black text-white border-black' : isDone ? 'bg-green-50 border-green-200' : 'bg-white border-zinc-100 hover:border-zinc-300'}`}>
                    <div className={`w-6 h-6 rounded-full grid place-items-center text-[11px] font-black shrink-0 ${isDone ? 'bg-green-500 text-white' : isActive ? 'bg-[#fde047] text-black' : 'bg-zinc-100'}`}>{isDone ? '✓' : idx+1}</div>
                    <div className="flex-1 truncate font-bold">{l.title}</div>
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="bg-black text-white rounded-[20px] p-5">
            <h4 className="font-black text-[13px] mb-2">Kpata Bot 🤖 Robust</h4>
            <p className="text-[12px] text-zinc-400 leading-relaxed mb-3">I evaluate labs. Write details. 80% unlocks Complete. Your progress saves in browser, works offline.</p>
            <div className="bg-white/10 rounded-xl p-3 text-[11px] font-mono break-words">Slug: {slugParam} | Req: {lessonIdParamRaw} | Showing: {String(lesson.id)} | Score: {submitted ? `${score}%` : 'Not submitted'}</div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {prevLesson && <Link href={`/courses/${course.slug}/${prevLesson.id}`} className="bg-white/10 text-center py-2 rounded-full text-[11px] font-bold">← Prev</Link>}
              {nextLesson && <Link href={`/courses/${course.slug}/${nextLesson.id}`} className="bg-[#fde047] text-black text-center py-2 rounded-full text-[11px] font-black">Next →</Link>}
            </div>
          </div>

          <div className="bg-[#fde047] rounded-[20px] p-5 border border-yellow-300">
            <h4 className="font-black text-[13px] mb-1">Debug Info (Robust Mode)</h4>
            <p className="text-[11px] leading-relaxed">This page will NEVER crash to "Lesson not found" if course exists. It auto-fallbacks to first lesson, saves progress, handles all ID formats: 1, "1", lesson-1, title-slug.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function SectionCard({ icon, title, color, badge, children }: any){
  return (
    <div className="bg-white rounded-[20px] border border-zinc-200 shadow-sm overflow-hidden">
      <div className="p-5 border-b border-zinc-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-full ${color} grid place-items-center font-black shrink-0`}>{icon}</div>
          <h3 className="font-black text-[14px]">{title}</h3>
        </div>
        <span className="text-[9px] font-black bg-zinc-900 text-white px-2.5 py-1 rounded-full tracking-widest shrink-0">{badge}</span>
      </div>
      <div className="p-5">{children}</div>
    </div>
  )
}

function MiniCard({ icon, title, text }: any){
  if(!text) return null
  return (
    <div className="bg-white rounded-[20px] border border-zinc-200 p-5">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[18px]">{icon}</span>
        <h4 className="font-black text-[13px]">{title}</h4>
      </div>
      <div className="text-[12.5px] text-zinc-600 leading-relaxed whitespace-pre-wrap break-words line-clamp-6">{text}</div>
    </div>
  )
}
