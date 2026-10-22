'use client'
import { useState } from 'react'
import { getCourse } from '@/lib/courses'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LessonPage(){
  const params = useParams() as { slug: string, lessonId: string }
  const router = useRouter()
  const course = getCourse(params.slug)
  const lesson = course?.lessons.find((l:any)=> String(l.id)===String(params.lessonId))
  const [score, setScore] = useState(0)
  const [answer, setAnswer] = useState('')
  const [submitted, setSubmitted] = useState(false)

  if(!course || !lesson){
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-2xl font-black">Lesson not found</h1>
          <Link href="/dashboard" className="mt-4 inline-block bg-black text-white px-6 py-3 rounded-full font-bold">Back to Dashboard</Link>
        </div>
      </div>
    )
  }

  const canComplete = score >= 80
  const lessonIndex = course.lessons.findIndex((l:any)=> String(l.id)===String(params.lessonId))
  const nextLesson = course.lessons[lessonIndex+1]

  const handleSubmit = () => {
    // Simulate Kpata Bot evaluation - simple check
    const len = answer.trim().length
    let newScore = 0
    if(len > 20) newScore = 85
    if(len > 50) newScore = 90
    if(len > 100) newScore = 95
    setScore(newScore)
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-[#fcfcf9]">
      {/* Top Nav */}
      <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-zinc-100">
        <div className="max-w-[1280px] mx-auto px-6 h-[64px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/dashboard" className="w-9 h-9 rounded-full bg-black text-white grid place-items-center font-black">K</Link>
            <div className="hidden md:flex items-center gap-2 text-[13px] text-zinc-500">
              <Link href="/dashboard" className="hover:text-black">{course.title}</Link>
              <span>/</span>
              <span className="text-black font-semibold">{lesson.title}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 text-xs font-bold bg-zinc-900 text-white px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span> Kpata Bot Active
            </div>
            <button onClick={()=>router.push('/dashboard')} className="text-xs font-bold border px-4 py-2 rounded-full">Exit</button>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">
        {/* Main Content */}
        <div className="space-y-6">
          {/* Hero Card */}
          <div className="bg-black text-white rounded-[24px] p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#fde047] rounded-full blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/3"></div>
            <div className="relative">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-[#fde047] text-black text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Lesson {lesson.id} • {lesson.duration}</span>
                <span className="bg-white/10 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-white/10">{lesson.type}</span>
              </div>
              <h1 className="text-[32px] md:text-[40px] font-black leading-[0.95] tracking-tight mb-3">{lesson.title}</h1>
              <p className="text-zinc-400 text-[14px] max-w-[600px] leading-relaxed">Learn step-by-step with worked examples, hands-on labs, and Kpata Bot evaluation. Must score 80% to unlock Complete.</p>
              <div className="mt-6 h-2 bg-white/10 rounded-full overflow-hidden max-w-[600px]">
                <div className="h-full bg-gradient-to-r from-[#fde047] to-[#22c55e] rounded-full" style={{width: `${lessonIndex / course.lessons.length * 100}%`}}></div>
              </div>
              <div className="mt-2 text-[11px] text-zinc-500 font-bold">Progress: Lesson {lessonIndex+1} of {course.lessons.length}</div>
            </div>
          </div>

          {/* Lesson Content Card */}
          <SectionCard icon="📖" title="Main Lesson" color="bg-[#fde047]" badge="READ">
            <div className="prose prose-zinc max-w-none text-[15px] leading-relaxed whitespace-pre-wrap">{lesson.content}</div>
          </SectionCard>

          <SectionCard icon="💡" title="Worked Example 1" color="bg-black text-white" badge="STEP-BY-STEP">
            <div className="bg-zinc-50 border border-zinc-100 rounded-xl p-4 text-[13.5px] leading-relaxed font-mono whitespace-pre-wrap">{lesson.workedExample}</div>
          </SectionCard>

          <SectionCard icon="✨" title="Worked Example 2" color="bg-violet-600 text-white" badge="SCENARIO 2">
            <div className="bg-violet-50 border border-violet-100 rounded-xl p-4 text-[13.5px] leading-relaxed whitespace-pre-wrap">{lesson.workedExample2}</div>
          </SectionCard>

          {/* Lab Question - Interactive */}
          <div className="bg-white rounded-[20px] border border-zinc-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#25D366] grid place-items-center text-white font-black">🧪</div>
                <div>
                  <h3 className="font-black text-[15px]">Lab Question - Hands On</h3>
                  <p className="text-[12px] text-zinc-500">Submit to Kpata Bot for evaluation</p>
                </div>
              </div>
              <span className="text-[10px] font-black bg-red-50 text-red-600 px-2 py-1 rounded-full border border-red-100">REQUIRED</span>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-[13.5px] leading-relaxed whitespace-pre-wrap">{lesson.sampleLab}</div>
              <textarea value={answer} onChange={e=>setAnswer(e.target.value)} placeholder="Type your solution here... Explain steps like in Worked Example. Kpata Bot will check..." className="w-full min-h-[140px] border-2 border-zinc-200 focus:border-black focus:outline-none rounded-xl p-4 text-[14px]"></textarea>
              <div className="flex items-center gap-3">
                <button onClick={handleSubmit} className="bg-black text-white font-black text-[13px] px-6 py-3 rounded-full hover:bg-zinc-800 transition">Submit to Kpata Bot 🤖</button>
                {submitted && (
                  <div className={`text-[12px] font-black px-3 py-1 rounded-full ${score>=80 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    Score: {score}% {score>=80 ? '✓ Passed!' : '✗ Need 80%'}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <MiniCard icon="🎯" title="Try Yourself" text={lesson.tryYourself} />
            <MiniCard icon="📝" title="Exam Tips" text={lesson.examTips} />
            <MiniCard icon="📋" title="Cheatsheet" text={lesson.cheatsheet} />
            <MiniCard icon="❓" title="Quiz" text={lesson.quiz} />
          </div>

          <SectionCard icon="📚" title="Homework - Must Score 80%" color="bg-orange-500 text-white" badge="UNLOCKS COMPLETE">
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 text-[13.5px] whitespace-pre-wrap">{lesson.finalProject}</div>
            <div className="mt-4 flex gap-2">
              <button disabled={!canComplete} className={`flex-1 font-black text-[14px] py-3 rounded-full transition ${canComplete ? 'bg-black text-white hover:bg-zinc-800' : 'bg-zinc-200 text-zinc-400 cursor-not-allowed'}`}>
                {canComplete ? '✓ Complete Lesson & Unlock Next →' : '🔒 Score 80% to Unlock Complete'}
              </button>
              {canComplete && nextLesson && (
                <Link href={`/courses/${params.slug}/${nextLesson.id}`} className="bg-[#fde047] text-black font-black text-[14px] px-6 py-3 rounded-full">Next Lesson</Link>
              )}
            </div>
          </SectionCard>

          {/* WhatsApp Banner */}
          <div className="bg-[#25D366] rounded-[16px] p-4 text-white flex items-center justify-between">
            <div className="text-[13px] font-bold">💬 No Registration Needed to Learn - 100% FREE - Need help? Join WhatsApp</div>
            <a href="https://wa.me/2340000000000" className="bg-white text-[#25D366] text-[12px] font-black px-4 py-2 rounded-full">Join WhatsApp</a>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-4 lg:sticky lg:top-[88px] h-fit">
          <div className="bg-white rounded-[20px] border border-zinc-200 p-5">
            <h4 className="font-black text-[13px] mb-3">Course Progress</h4>
            <div className="space-y-2 max-h-[400px] overflow-auto pr-2">
              {course.lessons.map((l:any, idx:number)=>{
                const isActive = String(l.id)===String(params.lessonId)
                const isDone = idx < lessonIndex
                return (
                  <Link key={l.id} href={`/courses/${params.slug}/${l.id}`} className={`flex items-center gap-3 p-3 rounded-xl border text-[13px] transition ${isActive ? 'bg-black text-white border-black' : isDone ? 'bg-green-50 border-green-200' : 'bg-white border-zinc-100 hover:border-zinc-300'}`}>
                    <div className={`w-6 h-6 rounded-full grid place-items-center text-[11px] font-black ${isDone ? 'bg-green-500 text-white' : isActive ? 'bg-[#fde047] text-black' : 'bg-zinc-100'}`}>{isDone ? '✓' : idx+1}</div>
                    <div className="flex-1 truncate font-bold">{l.title}</div>
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="bg-black text-white rounded-[20px] p-5">
            <h4 className="font-black text-[13px] mb-2">Kpata Bot 🤖</h4>
            <p className="text-[12px] text-zinc-400 leading-relaxed mb-3">I evaluate your lab answers. Type like worked example. Must get steps right to unlock Complete.</p>
            <div className="bg-white/10 rounded-xl p-3 text-[11px] font-mono">Status: {submitted ? `${score}% ${score>=80 ? 'PASSED' : 'FAILED'}` : 'Waiting for submission...'}</div>
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
          <div className={`w-9 h-9 rounded-full ${color} grid place-items-center font-black`}>{icon}</div>
          <h3 className="font-black text-[15px]">{title}</h3>
        </div>
        <span className="text-[10px] font-black bg-zinc-900 text-white px-2.5 py-1 rounded-full tracking-widest">{badge}</span>
      </div>
      <div className="p-6">{children}</div>
    </div>
  )
}

function MiniCard({ icon, title, text }: any){
  return (
    <div className="bg-white rounded-[20px] border border-zinc-200 p-5">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-[18px]">{icon}</span>
        <h4 className="font-black text-[13px]">{title}</h4>
      </div>
      <div className="text-[12.5px] text-zinc-600 leading-relaxed whitespace-pre-wrap line-clamp-6">{text}</div>
    </div>
  )
}
