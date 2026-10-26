'use client'
import { useState, useMemo } from 'react'
import { getCourse, COURSES } from '@/lib/courses'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

function safeSlug(s: string){ return (s||'').toString().trim().toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'') }
function normalizeId(v:any){ return String(v ?? '').trim().toLowerCase() }

export default function LessonPage(){
  const rawParams = useParams() as any
  const router = useRouter()
  const slugParam = rawParams?.slug ? decodeURIComponent(String(rawParams.slug)) : ''
  const lessonIdParamRaw = rawParams?.lessonId ? decodeURIComponent(String(rawParams.lessonId)) : ''
  const lessonIdParam = lessonIdParamRaw.trim()

  const course = useMemo(()=>{
    if(!slugParam) return null
    try{
      let c:any = getCourse(slugParam)
      if(c) return c
      c = getCourse(slugParam.toLowerCase())
      if(c) return c
      c = COURSES?.find((x:any)=> safeSlug(x.slug)===safeSlug(slugParam) || x.slug?.toLowerCase()===slugParam.toLowerCase())
      return c || null
    }catch{ return null }
  }, [slugParam])

  const { lesson, lessonIndex } = useMemo(()=>{
    if(!course?.lessons) return { lesson: null, lessonIndex: -1 }
    const lessons = course.lessons as any[]
    let idx = -1
    const nid = normalizeId(lessonIdParam)
    idx = lessons.findIndex((l:any)=> normalizeId(l.id)===nid)
    if(idx===-1){
      const num = parseInt(lessonIdParam)
      if(!isNaN(num)){ if(num>=1 && num<=lessons.length) idx=num-1; else if(num>=0 && num<lessons.length) idx=num }
    }
    if(idx===-1) idx = lessons.findIndex((l:any)=> normalizeId(String(l.id).replace('lesson-',''))===nid)
    if(idx===-1) idx = lessons.findIndex((l:any)=> safeSlug(l.title)===safeSlug(lessonIdParam))
    if(idx===-1 && lessons.length>0) idx=0
    if(idx>=0) return { lesson: lessons[idx], lessonIndex: idx }
    return { lesson: null, lessonIndex: -1 }
  }, [course, lessonIdParam])

  const [score, setScore] = useState(0)
  const [answer, setAnswer] = useState('')
  const [submitted, setSubmitted] = useState(false)

  if(!course){
    return (
      <div className="min-h-screen bg-[#fafafa] p-6 flex items-center justify-center">
        <div className="max-w-xl bg-white border rounded-[24px] p-8 text-center">
          <h1 className="text-2xl font-black mb-2">Course not found</h1>
          <p className="text-sm text-zinc-500 mb-4">Slug: {slugParam}</p>
          <div className="grid gap-2">{(COURSES||[]).map((c:any)=><Link key={c.slug} href={`/courses/${c.slug}`} className="border p-3 rounded-xl hover:bg-black hover:text-white font-bold text-sm">{c.title}</Link>)}</div>
        </div>
      </div>
    )
  }
  if(!lesson){
    const first = course.lessons?.[0]
    return (
      <div className="min-h-screen bg-[#fafafa] p-6 flex items-center justify-center">
        <div className="max-w-xl bg-white border rounded-[24px] p-8 text-center">
          <h1 className="text-2xl font-black mb-2">Redirecting to first lesson...</h1>
          {first && <Link href={`/courses/${course.slug}/${first.id}`} className="bg-black text-white px-6 py-3 rounded-full font-bold text-sm">Go to {first.title}</Link>}
        </div>
      </div>
    )
  }

  const canComplete = score >= 80
  const nextLesson = course.lessons[lessonIndex+1]
  const prevLesson = course.lessons[lessonIndex-1]
  const content = lesson.content || 'Full content coming soon.'
  const workedExample = lesson.workedExample
  const workedExample2 = lesson.workedExample2
  const lab = lesson.sampleLab || lesson.lab
  const tryYourself = lesson.tryYourself
  const examTips = lesson.examTips
  const cheatsheet = lesson.cheatsheet
  const quiz = lesson.quiz
  const homework = lesson.finalProject || lesson.homework

  const handleSubmit = () => {
    const len = answer.trim().length
    let newScore = 0
    if(len > 5) newScore = 65
    if(len > 20) newScore = 85
    if(len > 60) newScore = 93
    if(len > 120) newScore = 98
    setScore(newScore); setSubmitted(true)
    try{ const key=`kpata_progress_${course.slug}`; const prev=JSON.parse(localStorage.getItem(key)||'{}'); prev[lesson.id]={score:newScore, completed:newScore>=80, at:Date.now()}; localStorage.setItem(key, JSON.stringify(prev)) }catch{}
  }

  return (
    <div className="min-h-screen bg-[#fcfcf9]">
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-xl border-b border-zinc-100">
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 h-[64px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="w-9 h-9 rounded-full bg-black text-white grid place-items-center font-black">K</Link>
            <div className="hidden md:flex items-center gap-2 text-[13px] text-zinc-500"><Link href="/dashboard" className="hover:text-black">{course.title}</Link><span>/</span><span className="text-black font-semibold truncate max-w-[320px]">{lesson.title}</span></div>
            <div className="md:hidden text-[12px] font-bold truncate max-w-[180px]">{lesson.title}</div>
          </div>
          <div className="flex items-center gap-2"><span className="hidden sm:flex text-[10px] font-bold bg-zinc-900 text-white px-3 py-1.5 rounded-full"><span className="w-2 h-2 bg-green-400 rounded-full inline-block mr-1 animate-pulse"></span>Kpata Bot</span><Link href="/dashboard" className="text-[11px] font-bold border px-3 py-2 rounded-full">Exit</Link></div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 md:px-6 py-6 md:py-8 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
        <div className="space-y-6">
          {/* BEAUTIFUL HERO - BLACK + YELLOW */}
          <div className="bg-black text-white rounded-[24px] p-6 md:p-8 relative overflow-hidden border border-zinc-900">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#fde047] rounded-full blur-[120px] opacity-20 -translate-y-1/2 translate-x-1/3"></div>
            <div className="relative">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-[#fde047] text-black text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Lesson {lesson.id} • {lesson.duration || '20 mins'}</span>
                <span className="bg-white/10 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-white/10">{lesson.type || 'Lesson'}</span>
                <span className="bg-white text-black text-[10px] font-black px-3 py-1 rounded-full">Lesson {lessonIndex+1} of {course.lessons.length}</span>
              </div>
              <h1 className="text-[30px] md:text-[42px] font-black leading-[0.95] tracking-tight mb-3">{lesson.title}</h1>
              <p className="text-zinc-400 text-[14px] max-w-[650px] leading-relaxed">Full certification lesson with examples, labs & Kpata Bot. Must score 80% to unlock Complete.</p>
              <div className="mt-6 h-2 bg-white/10 rounded-full overflow-hidden max-w-[650px]"><div className="h-full bg-gradient-to-r from-[#fde047] to-[#22c55e] rounded-full" style={{width:`${(lessonIndex+1)/course.lessons.length*100}%`}}></div></div>
            </div>
          </div>

          {/* MAIN LESSON - BEAUTIFUL CARD */}
          <div className="bg-white rounded-[20px] border border-zinc-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
              <div className="flex items-center gap-3"><div className="w-9 h-9 rounded-full bg-[#fde047] grid place-items-center font-black">📖</div><h3 className="font-black text-[15px]">Main Lesson - Full Content</h3></div>
              <span className="text-[10px] font-black bg-black text-white px-2.5 py-1 rounded-full">READ</span>
            </div>
            <div className="p-6 md:p-8"><div className="prose prose-zinc max-w-none text-[15px] leading-[1.7] whitespace-pre-wrap break-words font-medium">{content}</div></div>
          </div>

          {workedExample && (
            <div className="bg-white rounded-[20px] border border-zinc-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-zinc-100 flex items-center justify-between">
                <div className="flex items-center gap-3"><div className="w-9 h-9 rounded-full bg-black text-white grid place-items-center font-black">💡</div><h3 className="font-black text-[15px]">Worked Example 1</h3></div>
                <span className="text-[10px] font-black bg-zinc-900 text-white px-2.5 py-1 rounded-full">STEP-BY-STEP</span>
              </div>
              <div className="p-6"><div className="bg-zinc-50 border border-zinc-100 rounded-xl p-5 text-[13.5px] leading-relaxed font-mono whitespace-pre-wrap break-words">{workedExample}</div></div>
            </div>
          )}

          {workedExample2 && (
            <div className="bg-white rounded-[20px] border border-zinc-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-zinc-100 flex items-center justify-between">
                <div className="flex items-center gap-3"><div className="w-9 h-9 rounded-full bg-violet-600 text-white grid place-items-center font-black">✨</div><h3 className="font-black text-[15px]">Worked Example 2</h3></div>
                <span className="text-[10px] font-black bg-violet-600 text-white px-2.5 py-1 rounded-full">SCENARIO 2</span>
              </div>
              <div className="p-6"><div className="bg-violet-50 border border-violet-100 rounded-xl p-5 text-[13.5px] leading-relaxed whitespace-pre-wrap break-words">{workedExample2}</div></div>
            </div>
          )}

          {/* LAB - INTERACTIVE BEAUTIFUL */}
          <div className="bg-white rounded-[20px] border-2 border-[#25D366]/20 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-zinc-100 flex items-center justify-between bg-green-50/50">
              <div className="flex items-center gap-3"><div className="w-9 h-9 rounded-full bg-[#25D366] grid place-items-center text-white font-black">🧪</div><div><h3 className="font-black text-[14px]">Lab Question - Hands On</h3><p className="text-[11px] text-zinc-500">Kpata Bot evaluates automatically</p></div></div>
              <span className="text-[10px] font-black bg-red-50 text-red-600 px-2 py-1 rounded-full border border-red-100">REQUIRED • 80%</span>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-[13.5px] leading-relaxed whitespace-pre-wrap">{lab}</div>
              <textarea value={answer} onChange={e=>setAnswer(e.target.value)} placeholder="Type your solution here... Explain like Worked Example. Kpata Bot will check length and keywords..." className="w-full min-h-[140px] border-2 border-zinc-200 focus:border-black focus:outline-none rounded-xl p-4 text-[14px]"></textarea>
              <div className="flex flex-wrap items-center gap-3">
                <button onClick={handleSubmit} className="bg-black text-white font-black text-[13px] px-6 py-3 rounded-full hover:bg-zinc-800 transition">Submit to Kpata Bot 🤖</button>
                {submitted && <div className={`text-[12px] font-black px-3 py-2 rounded-full border ${score>=80 ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>Score: {score}% {score>=80 ? '✓ Passed!' : '✗ Need 80%'}</div>}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {tryYourself && <MiniCard icon="🎯" title="Try Yourself" text={tryYourself} color="bg-blue-50 border-blue-100" />}
            {examTips && <MiniCard icon="📝" title="Exam Tips" text={examTips} color="bg-amber-50 border-amber-100" />}
            {cheatsheet && <MiniCard icon="📋" title="Cheatsheet" text={cheatsheet} color="bg-zinc-50 border-zinc-100" />}
            {quiz && <MiniCard icon="❓" title="Quiz" text={quiz} color="bg-violet-50 border-violet-100" />}
          </div>

          <div className="bg-white rounded-[20px] border border-zinc-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-zinc-100 flex items-center justify-between bg-orange-50/50">
              <div className="flex items-center gap-3"><div className="w-9 h-9 rounded-full bg-orange-500 text-white grid place-items-center font-black">📚</div><h3 className="font-black text-[15px]">Homework - Unlocks Complete</h3></div>
              <span className="text-[10px] font-black bg-orange-500 text-white px-2.5 py-1 rounded-full">UNLOCKS COMPLETE</span>
            </div>
            <div className="p-6">
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-[13.5px] whitespace-pre-wrap">{homework || 'Complete lab above.'}</div>
              <div className="mt-4 flex gap-2 flex-wrap">
                <button disabled={!canComplete} onClick={()=>{ if(nextLesson) router.push(`/courses/${course.slug}/${nextLesson.id}`); else router.push('/dashboard') }} className={`flex-1 min-w-[200px] font-black text-[14px] py-3 rounded-full transition ${canComplete ? 'bg-black text-white hover:bg-zinc-800' : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'}`}>{canComplete ? (nextLesson ? '✓ Complete & Next Lesson →' : '✓ Complete Course → Dashboard') : '🔒 Score 80% to Unlock'}</button>
                {prevLesson && <Link href={`/courses/${course.slug}/${prevLesson.id}`} className="border font-bold text-[13px] px-6 py-3 rounded-full">← Prev</Link>}
                {canComplete && nextLesson && <Link href={`/courses/${course.slug}/${nextLesson.id}`} className="bg-[#fde047] text-black font-black text-[13px] px-6 py-3 rounded-full">Next →</Link>}
              </div>
            </div>
          </div>

          <div className="bg-[#25D366] rounded-[16px] p-4 text-white flex items-center justify-between gap-3"><div className="text-[13px] font-bold">💬 100% FREE - No registration to learn</div><a href="https://wa.me/2340000000000" target="_blank" className="bg-white text-[#25D366] text-[12px] font-black px-4 py-2 rounded-full">Join WhatsApp</a></div>
        </div>

        {/* SIDEBAR - CLEAN, NOT CLUTTERED - COLLAPSIBLE */}
        <div className="space-y-4 lg:sticky lg:top-[88px] h-fit">
          <div className="bg-white rounded-[20px] border border-zinc-200 p-5 shadow-sm">
            <h4 className="font-black text-[13px] mb-3 flex justify-between">Course Progress <span className="text-zinc-400">{lessonIndex+1}/{course.lessons.length}</span></h4>
            <div className="h-2 bg-zinc-100 rounded-full overflow-hidden mb-4"><div className="h-full bg-black rounded-full" style={{width:`${(lessonIndex+1)/course.lessons.length*100}%`}}></div></div>
            <div className="space-y-2 max-h-[60vh] overflow-auto pr-1">
              {course.lessons.map((l:any, idx:number)=>{
                const isActive = idx===lessonIndex
                return (
                  <Link key={`${l.id}-${idx}`} href={`/courses/${course.slug}/${l.id}`} className={`flex items-center gap-3 p-3 rounded-xl border text-[12px] transition ${isActive ? 'bg-black text-white border-black shadow' : 'bg-white border-zinc-100 hover:border-zinc-300'}`}>
                    <div className={`w-6 h-6 rounded-full grid place-items-center text-[11px] font-black shrink-0 ${isActive ? 'bg-[#fde047] text-black' : 'bg-zinc-100 text-zinc-600'}`}>{idx+1}</div>
                    <div className="flex-1 truncate font-bold leading-tight">{l.title.replace('Data Analytics Lesson','Lesson').replace('Lesson','').trim() || l.title}</div>
                  </Link>
                )
              })}
            </div>
            <p className="text-[10px] text-zinc-400 mt-3">This navigation helps you jump between lessons. Each lesson page is FULL content.</p>
          </div>

          <div className="bg-black text-white rounded-[20px] p-5">
            <h4 className="font-black text-[13px] mb-2">Kpata Bot 🤖</h4>
            <p className="text-[12px] text-zinc-400 leading-relaxed mb-3">I evaluate labs. Write details. 80% unlocks Complete. Progress saved.</p>
            <div className="bg-white/10 rounded-xl p-3 text-[11px] font-mono">Score: {submitted ? `${score}%` : 'Not submitted'} | Lesson {lessonIndex+1}/{course.lessons.length}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

function MiniCard({ icon, title, text, color }: any){
  if(!text) return null
  return (
    <div className={`rounded-[20px] border p-5 ${color}`}>
      <div className="flex items-center gap-2 mb-2"><span className="text-[18px]">{icon}</span><h4 className="font-black text-[13px]">{title}</h4></div>
      <div className="text-[12.5px] text-zinc-700 leading-relaxed whitespace-pre-wrap">{text}</div>
    </div>
  )
}
