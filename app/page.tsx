import { COURSES } from '@/lib/courses'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fcfcf9]">
      {/* HEADER */}
      <header className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b">
        <div className="max-w-[1280px] mx-auto px-6 h-[64px] flex items-center justify-between">
          <div className="flex items-center gap-2"><div className="w-9 h-9 bg-black text-white rounded-full grid place-items-center font-black">K</div><span className="font-black text-[18px]">Kpata Academy</span></div>
          <div className="flex gap-2"><Link href="/courses/google-data-analytics" className="bg-black text-white px-5 py-2.5 rounded-full font-bold text-[13px]">Start Free →</Link></div>
        </div>
      </header>

      {/* HERO - AI TRAINING TO CERTIFICATION */}
      <div className="bg-black text-white">
        <div className="max-w-[1280px] mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-flex bg-[#fde047] text-black text-[11px] font-black px-3 py-1 rounded-full mb-4">100% FREE TO START • NO CARD NEEDED</div>
            <h1 className="text-[36px] md:text-[56px] font-black leading-[0.9] tracking-tight">FREE AI Training<br/>to <span className="text-[#fde047]">Certification</span><br/>in Simple English</h1>
            <p className="text-zinc-400 mt-4 text-[15px] leading-relaxed max-w-[520px]">We take you from zero to certified. Start with free Google, IBM courses in simple Minna English. Every lesson has 2 solved examples + hands-on lab. Kpata Bot scores you. Get certificate.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/courses/google-data-analytics" className="bg-[#fde047] text-black px-7 py-3 rounded-full font-black text-[14px]">Start Learning Free →</Link>
              <a href="https://wa.me/2340000000000" className="border border-white/20 px-7 py-3 rounded-full font-bold text-[14px]">Join WhatsApp</a>
            </div>
            <div className="mt-6 flex gap-4 text-[12px] text-zinc-500"><span>✓ No registration to learn</span><span>✓ 8 Courses</span><span>✓ 120 Lessons</span><span>✓ Simple English</span></div>
          </div>
          <div className="bg-white text-black rounded-[24px] p-6 md:p-8">
            <div className="text-[11px] font-black bg-black text-white inline-block px-3 py-1 rounded-full mb-3">HOW IT WORKS</div>
            <div className="space-y-4">
              <div className="flex gap-3"><div className="w-8 h-8 bg-[#fde047] rounded-full grid place-items-center font-black text-[14px]">1</div><div><h4 className="font-black text-[14px]">Phase 1: FREE Foundation</h4><p className="text-[12px] text-zinc-500">Google Data Analytics, IBM Data Science - 60 lessons free, simplest form, solved examples</p></div></div>
              <div className="flex gap-3"><div className="w-8 h-8 bg-black text-white rounded-full grid place-items-center font-black text-[14px]">2</div><div><h4 className="font-black text-[14px]">Phase 2: AI Core</h4><p className="text-[12px] text-zinc-500">AI Fundamentals, Generative AI, Prompt Engineering, ML Basics - hands-on with free tools</p></div></div>
              <div className="flex gap-3"><div className="w-8 h-8 bg-[#25D366] text-white rounded-full grid place-items-center font-black text-[14px]">3</div><div><h4 className="font-black text-[14px]">Phase 3: Certification</h4><p className="text-[12px] text-zinc-500">Final project + Kpata Certificate + Guide to Google/IBM external certs</p></div></div>
            </div>
          </div>
        </div>
      </div>

      {/* COURSE GRID */}
      <div className="max-w-[1280px] mx-auto px-6 py-12">
        <div className="flex justify-between items-end mb-6"><div><h2 className="text-[28px] font-black">8 Courses • 120 Lessons • All in Simple English</h2><p className="text-[14px] text-zinc-500">Phase 1 free, Phase 2 AI, Phase 3 certificate. Every lesson has 2 solved examples + lab.</p></div></div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {COURSES.map((c:any)=>(
            <Link key={c.slug} href={`/courses/${c.slug}`} className="bg-white border rounded-[20px] p-5 hover:border-black hover:shadow-lg transition group">
              <div className="flex justify-between mb-3"><span className="bg-[#fde047] text-black text-[10px] font-black px-2 py-1 rounded-full">FREE</span><span className="text-[10px] text-zinc-400">{c.lessons.length} lessons</span></div>
              <h3 className="font-black text-[15px] leading-tight group-hover:text-black">{c.title}</h3>
              <p className="text-[12px] text-zinc-500 mt-2 line-clamp-2">{c.description?.slice(0,80)}</p>
              <div className="mt-4 flex gap-2"><span className="text-[10px] border px-2 py-1 rounded-full">Simple English</span><span className="text-[10px] border px-2 py-1 rounded-full">Hands-on</span></div>
              <div className="mt-4 bg-black text-white text-[12px] font-bold py-2 rounded-full text-center group-hover:bg-zinc-800">Start →</div>
            </Link>
          ))}
        </div>
      </div>

      {/* FEATURES */}
      <div className="bg-zinc-50 border-y">
        <div className="max-w-[1280px] mx-auto px-6 py-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white border rounded-[20px] p-6"><div className="text-[24px] mb-2">📖</div><h4 className="font-black">Simplest Form</h4><p className="text-[13px] text-zinc-500 mt-1">No big grammar. Minna shop examples. 12-year-old can understand.</p></div>
          <div className="bg-white border rounded-[20px] p-6"><div className="text-[24px] mb-2">💡</div><h4 className="font-black">2 Solved Examples</h4><p className="text-[13px] text-zinc-500 mt-1">Every lesson has 2 step-by-step solved examples, not just theory.</p></div>
          <div className="bg-white border rounded-[20px] p-6"><div className="text-[24px] mb-2">🧪</div><h4 className="font-black">Hands-on Lab</h4><p className="text-[13px] text-zinc-500 mt-1">Lab + Kpata Bot scores 80% to unlock. Learn by doing.</p></div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 py-8 flex justify-between text-[12px] text-zinc-400"><span>© Kpata Academy - FREE AI Training to Certification</span><span>Built in Minna • Simple English • 100% Free to start</span></div>
    </div>
  )
}
