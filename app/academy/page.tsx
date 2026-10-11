
'use client'
import { useEffect, useState } from 'react'

type Cert = { id: string; name: string; provider: string; category: string; duration: string; employability_score: number; voucher_info: string; roadmap_phase: string; tool_guidance: any }

const FALLBACK_CERTS: Cert[] = [
  { id: '1', name: 'Google AI Essentials', provider: 'Google', category: 'AI', duration: '10 hours', employability_score: 9, voucher_info: 'Free forever on Coursera', roadmap_phase: 'phase1_0_30', tool_guidance: { recommended_tools: ['Gemini', 'ChatGPT'], why: 'Gold standard for AI literacy' } },
  { id: '2', name: 'IBM AI Fundamentals', provider: 'IBM', category: 'AI', duration: '15 hours', employability_score: 8, voucher_info: 'Free on IBM SkillsBuild', roadmap_phase: 'phase1_0_30', tool_guidance: { recommended_tools: ['Watson', 'ChatGPT'], why: 'Business AI foundation' } },
  { id: '3', name: 'Claude 101 & AI Fluency', provider: 'Anthropic', category: 'AI', duration: '7 hours', employability_score: 9, voucher_info: 'Free', roadmap_phase: 'phase1_0_30', tool_guidance: { recommended_tools: ['Claude 3.5'], why: 'Prompt mastery' } },
  { id: '4', name: 'Microsoft AI-900 Azure AI Fundamentals', provider: 'Microsoft', category: 'AI', duration: '12 hours', employability_score: 10, voucher_info: 'FREE voucher during AI Skills Fest 2026 - Never expires', roadmap_phase: 'phase2_30_90', tool_guidance: { recommended_tools: ['Azure AI', 'Copilot'], why: 'Entry cert with free voucher promo' } },
  { id: '5', name: 'Microsoft AZ-900 Azure Fundamentals', provider: 'Microsoft', category: 'Cloud', duration: '14 hours', employability_score: 9, voucher_info: 'Free voucher via Skills Fest', roadmap_phase: 'phase2_30_90', tool_guidance: { recommended_tools: ['Azure'], why: 'Cloud foundation' } },
  { id: '6', name: 'AWS Certified AI Practitioner (AIF-C01)', provider: 'AWS', category: 'AI', duration: '20 hours', employability_score: 10, voucher_info: 'Pass = FREE Cloud Practitioner voucher until Nov 30 2026', roadmap_phase: 'phase2_30_90', tool_guidance: { recommended_tools: ['Bedrock', 'Q'], why: 'AWS AI + free second voucher' } },
  { id: '7', name: 'Cisco Intro to Cybersecurity', provider: 'Cisco', category: 'Security', duration: '15 hours', employability_score: 8, voucher_info: 'Free on NetAcad', roadmap_phase: 'phase2_30_90', tool_guidance: { recommended_tools: ['Wireshark'], why: 'Remote support jobs' } },
  { id: '8', name: 'Google Data Analytics Certificate', provider: 'Google', category: 'Data', duration: '180 hours', employability_score: 10, voucher_info: 'Financial aid available - Top 12 remote job cert', roadmap_phase: 'phase3_90_180', tool_guidance: { recommended_tools: ['BigQuery', 'Looker'], why: 'Most employable data cert' } },
  { id: '9', name: 'HubSpot Content Marketing & SEO', provider: 'HubSpot', category: 'Marketing', duration: '6 hours', employability_score: 8, voucher_info: 'Free forever', roadmap_phase: 'phase3_90_180', tool_guidance: { recommended_tools: ['ChatGPT', 'Canva'], why: 'WFH marketing skills' } },
  { id: '10', name: 'Meta Digital Marketing Associate', provider: 'Meta', category: 'Marketing', duration: '20 hours', employability_score: 8, voucher_info: 'Free', roadmap_phase: 'phase3_90_180', tool_guidance: { recommended_tools: ['Meta Ads'], why: 'Social marketing' } },
]

export default function AcademyPage() {
  const [certs, setCerts] = useState<Cert[]>(FALLBACK_CERTS)
  const [status, setStatus] = useState('Loading live data...')

  useEffect(() => {
    async function load() {
      try {
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL
        const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
        if (!url || !key) {
          setStatus('Using offline 10 certs - Add env vars in Vercel to see 15 live')
          return
        }
        const { createClient } = await import('@supabase/supabase-js')
        const supabase = createClient(url, key)
        const { data, error } = await supabase.from('external_certifications').select('*').order('employability_score', { ascending: false })
        if (data && data.length > 0) {
          setCerts(data)
          setStatus(`${data.length} Free Certs LIVE from Supabase`)
        } else {
          setStatus('Using offline data - Supabase empty or error')
        }
      } catch (e) {
        setStatus('Using offline data - Supabase not connected yet')
      }
    }
    load()
  }, [])

  const phase1 = certs.filter(c => c.roadmap_phase === 'phase1_0_30')
  const phase2 = certs.filter(c => c.roadmap_phase === 'phase2_30_90')
  const phase3 = certs.filter(c => c.roadmap_phase === 'phase3_90_180')

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <header className="bg-black text-white p-4 flex justify-between items-center">
        <h1 className="font-black text-xl">KPATA ACADEMY - MVP</h1>
        <div className="flex gap-2">
          <span className="bg-amber-400 text-black px-3 py-1 rounded-full text-xs font-bold">Self-Paced</span>
          <span className="bg-white text-black px-3 py-1 rounded-full text-xs font-bold">{status}</span>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <div className="bg-gradient-to-r from-amber-300 to-orange-400 p-8 rounded-[24px] text-black mb-6">
          <h2 className="text-4xl font-black leading-tight">Learn AI.<br/>Choose Right Tool.<br/>Get Real Free Certs.</h2>
          <p className="mt-3 font-medium">We train you. We apply on your behalf. Google, Microsoft, IBM, AWS certify you. All self-paced in EN / HA / YO / IG / PIDGIN.</p>
          <div className="mt-4 grid grid-cols-3 gap-3 text-center">
            <div className="bg-black text-white p-3 rounded-xl"><div className="text-2xl font-black">3</div><div className="text-xs">Self-Paced Courses</div></div>
            <div className="bg-black text-white p-3 rounded-xl"><div className="text-2xl font-black">{certs.length}</div><div className="text-xs">Free Global Certs</div></div>
            <div className="bg-black text-white p-3 rounded-xl"><div className="text-2xl font-black">100%</div><div className="text-xs">Free Training</div></div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border-2 border-amber-200 p-5">
            <h3 className="font-black text-lg">Phase 1: 0-30 Days</h3><p className="text-xs text-gray-500 mb-4">Foundation - AI Assistant Ready</p>
            {phase1.map(c => (
              <div key={c.id} className="border p-3 rounded-xl mb-3 bg-amber-50">
                <div className="font-bold text-sm">{c.name}</div>
                <div className="text-xs text-gray-600">{c.provider} • {c.duration}</div>
                <div className="mt-1 flex justify-between text-xs"><span className="bg-black text-white px-2 py-0.5 rounded">Score {c.employability_score}/10</span><span className="text-green-700 text-[10px]">{c.voucher_info?.slice(0,35)}</span></div>
                <div className="mt-2 text-xs bg-white p-2 rounded"><b>Tool:</b> {c.tool_guidance?.recommended_tools?.join(', ')}<br/><b>Why:</b> {c.tool_guidance?.why}</div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-2xl border-2 border-blue-200 p-5">
            <h3 className="font-black text-lg">Phase 2: 30-90 Days</h3><p className="text-xs text-gray-500 mb-4">Builder - Cloud & AI Junior</p>
            {phase2.map(c => (
              <div key={c.id} className="border p-3 rounded-xl mb-3 bg-blue-50">
                <div className="font-bold text-sm">{c.name}</div>
                <div className="text-xs text-gray-600">{c.provider} • {c.duration}</div>
                <div className="mt-1 flex justify-between text-xs"><span className="bg-blue-600 text-white px-2 py-0.5 rounded">Score {c.employability_score}/10</span><span className="text-green-700 text-[10px]">FREE voucher</span></div>
                <div className="mt-2 text-xs bg-white p-2 rounded"><b>Tool:</b> {c.tool_guidance?.recommended_tools?.join(', ')}<br/><b>Why:</b> {c.tool_guidance?.why}</div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-2xl border-2 border-green-200 p-5">
            <h3 className="font-black text-lg">Phase 3: 90-180 Days</h3><p className="text-xs text-gray-500 mb-4">Specialist - $20-50/hr</p>
            {phase3.map(c => (
              <div key={c.id} className="border p-3 rounded-xl mb-3 bg-green-50">
                <div className="font-bold text-sm">{c.name}</div>
                <div className="text-xs text-gray-600">{c.provider} • {c.duration}</div>
                <div className="mt-1 flex justify-between text-xs"><span className="bg-green-600 text-white px-2 py-0.5 rounded">Score {c.employability_score}/10</span><span className="text-[10px]">Portfolio First</span></div>
                <div className="mt-2 text-xs bg-white p-2 rounded"><b>Tool:</b> {c.tool_guidance?.recommended_tools?.join(', ')}<br/><b>Why:</b> {c.tool_guidance?.why}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
