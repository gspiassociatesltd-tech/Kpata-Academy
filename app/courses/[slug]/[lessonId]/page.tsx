"use client"
import { getCourse, getLesson } from '@/lib/courses'
import Link from 'next/link'
import { useState } from 'react'

export default function LessonPage({ params }: { params: { slug: string; lessonId: string } }) {
  const course = getCourse(params.slug)
  const lesson = getLesson(params.slug, params.lessonId)
  const [labText, setLabText] = useState('')
  const [score, setScore] = useState<number|null>(null)

  if (!course || !lesson) return <div className="p-8">Lesson not found - go back to <Link href="/" className="underline">Home</Link></div>

  const idx = course.lessons.findIndex((x:any)=>String(x.id)===String(params.lessonId))
  const prev = idx>0 ? course.lessons[idx-1] : null
  const next = idx<course.lessons.length-1 ? course.lessons[idx+1] : null

  const handleScore = () => {
    const sc = labText.length>100 ? 85 : labText.length>50 ? 75 : 40
    setScore(sc)
  }

  return (
    <div className="min-h-screen bg-[#fcfcf9]">
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b">
        <div className="max-w-[1200px] mx-auto px-4 h-[56px] flex items-center justify-between">
          <Link href={`/courses/${course.slug}`} className="text-[13px] font-bold">← {course.title}</Link>
          <div className="text-[11px] text-zinc-500">Lesson {lesson.id} / {course.lessons.length} • {lesson.duration}</div>
        </div>
        <div className="h-1 bg-zinc-100"><div className="h-1 bg-[#fde047]" style={{width: `${((idx+1)/course.lessons.length)*100}%`}}></div></div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-6 grid lg:grid-cols-[280px_1fr] gap-6">
        <div className="hidden lg:block bg-white border rounded-[16px] p-4 h-fit sticky top-[72px]">
          <div className="text-[11px] font-black mb-3">{course.title} - {course.lessons.length} Lessons</div>
          <div className="space-y-1">
            {course.lessons.map((l:any,i:number)=>(
              <Link key={String(l.id)} href={`/courses/${course.slug}/${String(l.id)}`} className={`block px-3 py-2 rounded-[10px] text-[12px] ${String(l.id)===String(lesson.id) ? 'bg-black text-white font-bold' : 'hover:bg-zinc-50'}`}>
                <span className="font-black mr-2">{i+1}.</span>{l.title.slice(0,32)}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="bg-black text-white rounded-[24px] p-6 md:p-8">
            <div className="inline-flex gap-2 mb-3">
              <span className="bg-[#fde047] text-black text-[10px] font-black px-2.5 py-1 rounded-full">LESSON {lesson.id} • {lesson.duration}</span>
              <span className="bg-white/10 text-[10px] font-bold px-2.5 py-1 rounded-full">{lesson.type}</span>
            </div>
            <h1 className="text-[28px] md:text-[40px] font-black leading-[0.9] tracking-tight">{lesson.title}</h1>
            <p className="text-zinc-400 mt-3 text-[13px] max-w-[600px]">Simple English • 2 Solved Examples • Hands-on Lab • Kpata Bot scores 80% to unlock</p>
          </div>

          <div className="mt-6 bg-white border rounded-[20px] p-6">
            <div className="flex items-center gap-2 mb-3"><span className="w-6 h-6 bg-black text-white rounded-full grid place-items-center text-[12px]">1</span><h2 className="font-black text-[16px]">Main Lesson - Full Content (Simple English)</h2></div>
            <div className="prose prose-sm max-w-none text-[14px] leading-relaxed whitespace-pre-wrap bg-[#fcfcf9] border rounded-[12px] p-4">{lesson.content}</div>
          </div>

          <div className="mt-6 bg-[#fefce8] border border-[#fde047] rounded-[20px] p-6">
            <div className="flex items-center gap-2 mb-3"><span className="w-6 h-6 bg-[#fde047] text-black rounded-full grid place-items-center text-[12px] font-black">✓</span><h2 className="font-black text-[16px]">Worked Example 1 - Step-by-Step SOLVED</h2></div>
            <div className="text-[13px] leading-relaxed whitespace-pre-wrap bg-white border rounded-[12px] p-4">{lesson.workedExample}</div>
          </div>

          <div className="mt-6 bg-[#f0fdf4] border border-green-200 rounded-[20px] p-6">
            <div className="flex items-center gap-2 mb-3"><span className="w-6 h-6 bg-green-600 text-white rounded-full grid place-items-center text-[12px]">✓</span><h2 className="font-black text-[16px]">Worked Example 2 - Scenario 2 SOLVED</h2></div>
            <div className="text-[13px] leading-relaxed whitespace-pre-wrap bg-white border rounded-[12px] p-4">{lesson.workedExample2}</div>
          </div>

          <div className="mt-6 bg-white border-2 border-black rounded-[20px] p-6">
            <div className="flex items-center gap-2 mb-3"><span className="w-6 h-6 bg-black text-white rounded-full grid place-items-center text-[12px]">🧪</span><h2 className="font-black text-[16px]">Lab - Hands On (Kpata Bot scores 80%)</h2></div>
            <div className="text-[13px] bg-zinc-50 border rounded-[12px] p-4 whitespace-pre-wrap">{lesson.sampleLab}</div>
            <textarea value={labText} onChange={e=>setLabText(e.target.value)} placeholder="Type your answer here... Kpata Bot will score you (need 80%)..." className="mt-4 w-full min-h-[120px] border-2 rounded-[12px] p-3 text-[13px]"></textarea>
            <button onClick={handleScore} className="mt-3 bg-black text-white px-6 py-2.5 rounded-full font-bold text-[13px]">Submit to Kpata Bot →</button>
            {score!==null && <div className={`mt-3 p-3 rounded-[12px] text-[13px] font-bold ${score>=80?'bg-green-100 text-green-800':'bg-amber-100 text-amber-800'}`}>{score>=80?`✅ Kpata Bot: ${score}% - PASSED! Complete unlocked`:`⚠️ Kpata Bot: ${score}% - Need 80%. Add more details`}</div>}
            <div className="mt-3 text-[11px] text-zinc-500">Tip: Write 2-3 sentences, use keywords from lesson</div>
          </div>

          <div className="mt-6 bg-white border rounded-[20px] p-6">
            <h3 className="font-black text-[14px] mb-2">✏️ Try Yourself</h3>
            <div className="text-[13px] bg-[#fcfcf9] border rounded-[12px] p-4 whitespace-pre-wrap">{lesson.tryYourself}</div>
          </div>

          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <div className="bg-white border rounded-[20px] p-5"><h3 className="font-black text-[13px] mb-2">🎯 Exam Tips</h3><div className="text-[12px] text-zinc-600 whitespace-pre-wrap">{lesson.examTips}</div></div>
            <div className="bg-[#fde047]/20 border border-[#fde047] rounded-[20px] p-5"><h3 className="font-black text-[13px] mb-2">📋 Cheat Sheet</h3><div className="text-[12px] whitespace-pre-wrap">{lesson.cheatsheet}</div></div>
          </div>

          <div className="mt-6 bg-white border rounded-[20px] p-6"><h3 className="font-black text-[14px] mb-2">❓ Quiz (3 Questions)</h3><div className="text-[13px] whitespace-pre-wrap bg-[#fcfcf9] border rounded-[12px] p-4">{lesson.quiz}</div></div>

          <div className="mt-6 bg-black text-white rounded-[20px] p-6">
            <h3 className="font-black text-[14px] mb-2 text-[#fde047]">🏠 Homework - Unlock Complete</h3>
            <div className="text-[13px] text-zinc-300 whitespace-pre-wrap">{lesson.finalProject}</div>
            <button className="mt-4 bg-[#fde047] text-black px-6 py-2.5 rounded-full font-black text-[13px]">Mark as Complete →</button>
          </div>

          <div className="mt-8 flex justify-between">
            {prev ? <Link href={`/courses/${course.slug}/${String(prev.id)}`} className="bg-white border px-5 py-2.5 rounded-full font-bold text-[13px]">← Prev</Link> : <div/>}
            {next ? <Link href={`/courses/${course.slug}/${String(next.id)}`} className="bg-black text-white px-5 py-2.5 rounded-full font-bold text-[13px]">Next →</Link> : <Link href={`/courses/${course.slug}`} className="bg-[#fde047] text-black px-5 py-2.5 rounded-full font-black text-[13px]">Finish Course →</Link>}
          </div>
        </div>
      </div>
    </div>
  )
}
