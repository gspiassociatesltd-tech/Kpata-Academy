
'use client'
import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type Cert = { id: string; name: string; provider: string; category: string; duration: string; employability_score: number; voucher_info: string; roadmap_phase: string; tool_guidance: any }

export default function AcademyPage() {
  const [certs, setCerts] = useState<Cert[]>([])
  const [courses, setCourses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const { data: certData } = await supabase.from('external_certifications').select('*').order('roadmap_phase').order('employability_score', { ascending: false })
      const { data: courseData } = await supabase.from('courses').select('*').order('phase')
      if (certData) setCerts(certData)
      if (courseData) setCourses(courseData)
      setLoading(false)
    }
    load()
  }, [])

  const phase1 = certs.filter(c => c.roadmap_phase === 'phase1_0_30')
  const phase2 = certs.filter(c => c.roadmap_phase === 'phase2_30_90')
  const phase3 = certs.filter(c => c.roadmap_phase === 'phase3_90_180')

  if (loading) return <div className="p-10 text-center">Loading 15 Free Certs from Supabase... Self-Paced...</div>

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <header className="bg-black text-white p-4 flex justify-between items-center">
        <h1 className="font-black text-xl">KPATA ACADEMY - MVP</h1>
        <div className="flex gap-2">
          <span className="bg-amber-400 text-black px-3 py-1 rounded-full text-xs font-bold">Self-Paced</span>
          <span className="bg-white text-black px-3 py-1 rounded-full text-xs font-bold">{certs.length} Free Certs Live from Supabase</span>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-gradient-to-r from-amber-300 to-orange-400 p-8 rounded-[24px] text-black mb-6">
          <h2 className="text-4xl font-black leading-tight">Learn AI.<br/>Choose Right Tool.<br/>Get Real Free Certs.</h2>
          <p className="mt-3 font-medium">We train you. We apply on your behalf. Google, Microsoft, IBM, AWS certify you. All self-paced in EN / HA / YO / IG / PIDGIN.</p>
          <div className="mt-4 grid grid-cols-3 gap-3 text-center">
            <div className="bg-black text-white p-3 rounded-xl"><div className="text-2xl font-black">{courses.length}</div><div className="text-xs">Self-Paced Courses</div></div>
            <div className="bg-black text-white p-3 rounded-xl"><div className="text-2xl font-black">{certs.length}</div><div className="text-xs">Free Global Certs Live</div></div>
            <div className="bg-black text-white p-3 rounded-xl"><div className="text-2xl font-black">100%</div><div className="text-xs">Free Training</div></div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border-2 border-amber-200 p-5">
            <h3 className="font-black text-lg">Phase 1: 0-30 Days</h3><p className="text-xs text-gray-500 mb-4">Foundation - AI Assistant Ready - Self Paced</p>
            {phase1.map(c => (
              <div key={c.id} className="border p-3 rounded-xl mb-3 bg-amber-50">
                <div className="font-bold text-sm">{c.name}</div>
                <div className="text-xs text-gray-600">{c.provider} • {c.duration}</div>
                <div className="mt-1 flex justify-between text-xs"><span className="bg-black text-white px-2 py-0.5 rounded">Score {c.employability_score}/10</span><span className="text-green-700 text-[10px]">{c.voucher_info?.slice(0,35)}</span></div>
                <div className="mt-2 text-xs bg-white p-2 rounded"><b>Tool:</b> {c.tool_guidance?.recommended_tools?.join(', ')}<br/><b>Why:</b> {c.tool_guidance?.why}</div>
              </div>
            ))}
            <button className="mt-4 w-full bg-black text-white py-2 rounded font-bold">Start Phase 1 - Self Paced</button>
          </div>

          <div className="bg-white rounded-2xl border-2 border-blue-200 p-5">
            <h3 className="font-black text-lg">Phase 2: 30-90 Days</h3><p className="text-xs text-gray-500 mb-4">Builder - Cloud & AI Junior - Self Paced</p>
            {phase2.map(c => (
              <div key={c.id} className="border p-3 rounded-xl mb-3 bg-blue-50">
                <div className="font-bold text-sm">{c.name}</div>
                <div className="text-xs text-gray-600">{c.provider} • {c.duration}</div>
                <div className="mt-1 flex justify-between text-xs"><span className="bg-blue-600 text-white px-2 py-0.5 rounded">Score {c.employability_score}/10</span><span className="text-green-700 text-[10px]">FREE voucher</span></div>
                <div className="mt-2 text-xs bg-white p-2 rounded"><b>Tool:</b> {c.tool_guidance?.recommended_tools?.join(', ')}<br/><b>Why:</b> {c.tool_guidance?.why}</div>
              </div>
            ))}
            <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded font-bold">Start Phase 2 - Self Paced</button>
          </div>

          <div className="bg-white rounded-2xl border-2 border-green-200 p-5">
            <h3 className="font-black text-lg">Phase 3: 90-180 Days</h3><p className="text-xs text-gray-500 mb-4">Specialist - $20-50/hr - Self Paced</p>
            {phase3.map(c => (
              <div key={c.id} className="border p-3 rounded-xl mb-3 bg-green-50">
                <div className="font-bold text-sm">{c.name}</div>
                <div className="text-xs text-gray-600">{c.provider} • {c.duration}</div>
                <div className="mt-1 flex justify-between text-xs"><span className="bg-green-600 text-white px-2 py-0.5 rounded">Score {c.employability_score}/10</span><span className="text-[10px]">Portfolio First</span></div>
                <div className="mt-2 text-xs bg-white p-2 rounded"><b>Tool:</b> {c.tool_guidance?.recommended_tools?.join(', ')}<br/><b>Why:</b> {c.tool_guidance?.why}</div>
              </div>
            ))}
            <button className="mt-4 w-full bg-green-600 text-white py-2 rounded font-bold">Start Phase 3 - Self Paced</button>
          </div>
        </div>

        <div className="mt-6 bg-black text-white p-6 rounded-2xl">
          <h3 className="font-bold text-lg">Guided Tool Choice Engine - Built Into Every Lesson</h3>
          <div className="mt-3 bg-white text-black p-4 rounded-xl text-sm">
            <b>Example:</b> "I need to write proposal for MOTOMA batteries" → Kpata asks goal → Recommends: Claude for proposal + Gamma for slides → Why in PIDGIN: "Claude sabi write correct English wey client go understand"<br/>
            <b>Self-Paced:</b> Start anytime, pause anytime, resume. All in EN/HA/YO/IG/PID.
          </div>
        </div>

        <div className="mt-6 bg-white p-5 rounded-xl border">
          <h3 className="font-bold">Opportunity Engine - Always Finding For You</h3>
          <p className="text-sm text-gray-600">Scans daily: Microsoft AI Skills Fest free vouchers, AWS free exam promo (pass AI = free Cloud voucher until Nov 30 2026), Upwork jobs listing "Google AI Essentials", IBM fellowships.</p>
        </div>
      </div>
    </div>
  )
}
