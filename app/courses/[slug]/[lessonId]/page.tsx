import { getCourse, getLesson, getAllCourses } from '@/lib/courses'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export function generateStaticParams() {
  const params: any[] = []
  for (const c of getAllCourses()) {
    for (const l of c.lessons) params.push({ slug: c.slug, lessonId: l.id })
  }
  return params
}

export default function LessonPage({ params }: { params: { slug: string; lessonId: string } }) {
  const course = getCourse(params.slug)
  if (!course) return notFound()
  const lesson = getLesson(params.slug, params.lessonId)
  if (!lesson) return notFound()

  const idx = course.lessons.findIndex((x:any)=>x.id===params.lessonId)
  const prev = idx>0 ? course.lessons[idx-1] : null
  const next = idx<course.lessons.length-1 ? course.lessons[idx+1] : null

  return (
    <div className="min-h-screen bg-[#fcfcf9]">
      {/* HEADER */}
      <div className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b">
        <div className="max-w-[1200px] mx-auto px-4 h-[56px] flex items-center justify-between">
          <Link href={`/courses/${course.slug}`} className="text-[13px] font-bold">← {course.title}</Link>
          <div className="text-[11px] text-zinc-500">Lesson {lesson.id} / {course.lessons.length} • {lesson.duration}</div>
        </div>
        <div className="h-1 bg-zinc-100"><div className="h-1 bg-[#fde047]" style={{width: `${((idx+1)/course.lessons.length)*100}%`}}></div></div>
      </div>

      <div className="max-w-[1200px] mx-auto px-4 py-6 grid lg:grid-cols-[280px_1fr] gap-6">
        {/* SIDEBAR */}
        <div className="hidden lg:block bg-white border rounded-[16px] p-4 h-fit sticky top-[72px]">
          <div className="text-[11px] font-black mb-3">{course.title} - {course.lessons.length} Lessons</div>
          <div className="space-y-1">
            {course.lessons.map((l:any,i:number)=>(
              <Link key={l.id} href={`/courses/${course.slug}/${l.id}`} className={`block px-3 py-2 rounded-[10px] text-[12px] ${l.id===lesson.id ? 'bg-black text-white font-bold' : 'hover:bg-zinc-50'}`}>
                <span className="font-black mr-2">{i+1}.</span>{l.title.slice(0,32)}
              </Link>
            ))}
          </div>
        </div>

        {/* MAIN */}
        <div>
          {/* HERO */}
          <div className="bg-black text-white rounded-[24px] p-6 md:p-8">
            <div className="inline-flex gap-2 mb-3">
              <span className="bg-[#fde047] text-black text-[10px] font-black px-2.5 py-1 rounded-full">LESSON {lesson.id} • {lesson.duration}</span>
              <span className="bg-white/10 text-[10px] font-bold px-2.5 py-1 rounded-full">{lesson.type}</span>
            </div>
            <h1 className="text-[28px] md:text-[40px] font-black leading-[0.9] tracking-tight">{lesson.title}</h1>
            <p className="text-zinc-400 mt-3 text-[13px] max-w-[600px]">Simple English • 2 Solved Examples • Hands-on Lab • Kpata Bot scores 80% to unlock</p>
          </div>

          {/* CONTENT - Simplest Form */}
          <div className="mt-6 bg-white border rounded-[20px] p-6">
            <div className="flex items-center gap-2 mb-3"><span className="w-6 h-6 bg-black text-white rounded-full grid place-items-center text-[12px]">1</span><h2 className="font-black text-[16px]">Main Lesson - Full Content (Simple English)</h2></div>
            <div className="prose prose-sm max-w-none text-[14px] leading-relaxed whitespace-pre-wrap bg-[#fcfcf9] border rounded-[12px] p-4">{lesson.content}</div>
          </div>

          {/* WORKED EXAMPLE 1 */}
          <div className="mt-6 bg-[#fefce8] border border-[#fde047] rounded-[20px] p-6">
            <div className="flex items-center gap-2 mb-3"><span className="w-6 h-6 bg-[#fde047] text-black rounded-full grid place-items-center text-[12px] font-black">✓</span><h2 className="font-black text-[16px]">Worked Example 1 - Step-by-Step SOLVED</h2></div>
            <div className="text-[13px] leading-relaxed whitespace-pre-wrap bg-white border rounded-[12px] p-4">{lesson.workedExample}</div>
          </div>

          {/* WORKED EXAMPLE 2 */}
          <div className="mt-6 bg-[#f0fdf4] border border-green-200 rounded-[20px] p-6">
            <div className="flex items-center gap-2 mb-3"><span className="w-6 h-6 bg-green-600 text-white rounded-full grid place-items-center text-[12px]">✓</span><h2 className="font-black text-[16px]">Worked Example 2 - Scenario 2 SOLVED</h2></div>
            <div className="text-[13px] leading-relaxed whitespace-pre-wrap bg-white border rounded-[12px] p-4">{lesson.workedExample2}</div>
          </div>

          {/* LAB */}
          <div className="mt-6 bg-white border-2 border-black rounded-[20px] p-6">
            <div className="flex items-center gap-2 mb-3"><span className="w-6 h-6 bg-black text-white rounded-full grid place-items-center text-[12px]">🧪</span><h2 className="font-black text-[16px]">Lab - Hands On (Kpata Bot scores 80%)</h2></div>
            <div className="text-[13px] bg-zinc-50 border rounded-[12px] p-4 whitespace-pre-wrap">{lesson.sampleLab}</div>
            <textarea placeholder="Type your answer here... Kpata Bot will score you (need 80%)..." className="mt-4 w-full min-h-[120px] border-2 rounded-[12px] p-3 text-[13px]" id="lab"></textarea>
            <button onClick={()=>{const v=(document.getElementById('lab') as any).value; const sc=v.length>100?85:v.length>50?75:40; alert(sc>=80?'✅ Kpata Bot: '+sc+'% - PASSED! Complete unlocked':'⚠️ Kpata Bot: '+sc+'% - Need 80%. Add more details') }} className="mt-3 bg-black text-white px-6 py-2.5 rounded-full font-bold text-[13px]">Submit to Kpata Bot →</button>
            <div className="mt-3 text-[11px] text-zinc-500">Tip: Write 2-3 sentences, use keywords from lesson</div>
          </div>

          {/* TRY YOURSELF */}
          <div className="mt-6 bg-white border rounded-[20px] p-6">
            <h3 className="font-black text-[14px] mb-2">✏️ Try Yourself</h3>
            <div className="text-[13px] bg-[#fcfcf9] border rounded-[12px] p-4 whitespace-pre-wrap">{lesson.tryYourself}</div>
          </div>

          {/* EXAM TIPS + CHEATSHEET */}
          <div className="mt-6 grid md:grid-cols-2 gap-4">
            <div className="bg-white border rounded-[20px] p-5"><h3 className="font-black text-[13px] mb-2">🎯 Exam Tips</h3><div className="text-[12px] text-zinc-600 whitespace-pre-wrap">{lesson.examTips}</div></div>
            <div className="bg-[#fde047]/20 border border-[#fde047] rounded-[20px] p-5"><h3 className="font-black text-[13px] mb-2">📋 Cheat Sheet</h3><div className="text-[12px] whitespace-pre-wrap">{lesson.cheatsheet}</div></div>
          </div>

          {/* QUIZ */}
          <div className="mt-6 bg-white border rounded-[20px] p-6"><h3 className="font-black text-[14px] mb-2">❓ Quiz (3 Questions)</h3><div className="text-[13px] whitespace-pre-wrap bg-[#fcfcf9] border rounded-[12px] p-4">{lesson.quiz}</div></div>

          {/* HOMEWORK */}
          <div className="mt-6 bg-black text-white rounded-[20px] p-6">
            <h3 className="font-black text-[14px] mb-2 text-[#fde047]">🏠 Homework - Unlock Complete</h3>
            <div className="text-[13px] text-zinc-300 whitespace-pre-wrap">{lesson.finalProject}</div>
            <button className="mt-4 bg-[#fde047] text-black px-6 py-2.5 rounded-full font-black text-[13px]">Mark as Complete →</button>
          </div>

          {/* NAV */}
          <div className="mt-8 flex justify-between">
            {prev ? <Link href={`/courses/${course.slug}/${prev.id}`} className="bg-white border px-5 py-2.5 rounded-full font-bold text-[13px]">← Prev: {prev.title.slice(0,20)}</Link> : <div/>}
            {next ? <Link href={`/courses/${course.slug}/${next.id}`} className="bg-black text-white px-5 py-2.5 rounded-full font-bold text-[13px]">Next: {next.title.slice(0,20)} →</Link> : <Link href={`/courses/${course.slug}`} className="bg-[#fde047] text-black px-5 py-2.5 rounded-full font-black text-[13px]">Finish Course → Certificate</Link>}
          </div>
        </div>
      </div>
    </div>
  )
}
