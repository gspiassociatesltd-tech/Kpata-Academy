
'use client'
import { useEffect, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

type Cert = {
  id: string
  title: string
  provider: string
  phase: string
  duration_hours?: number
  relevance_score?: number
  tool_mapping?: string
  cost?: string
  voucher_info?: string
  pidgin_why?: string
  is_active?: boolean
}

const FALLBACK_CERTS: Cert[] = [
  { id: '1', title: 'Google AI Essentials', provider: 'Google', phase: 'Phase 1', duration_hours: 10, relevance_score: 9, tool_mapping: 'Gemini + ChatGPT', cost: 'FREE', pidgin_why: 'Na the main one wey everybody know' },
  { id: '2', title: 'IBM AI Fundamentals', provider: 'IBM', phase: 'Phase 1', duration_hours: 15, relevance_score: 8, tool_mapping: 'Watson', cost: 'FREE', pidgin_why: 'For business AI' },
  { id: '3', title: 'Claude 101', provider: 'Anthropic', phase: 'Phase 1', duration_hours: 7, relevance_score: 9, tool_mapping: 'Claude 3.5', cost: 'FREE', pidgin_why: 'Sabi write correct proposal' },
  { id: '4', title: 'Microsoft AI-900 + AZ-900 + DP-900', provider: 'Microsoft', phase: 'Phase 2', relevance_score: 10, voucher_info: 'FREE during AI Skills Fest 2026', tool_mapping: 'Azure AI', cost: 'FREE', pidgin_why: 'Microsoft cert wey never dey expire' },
  { id: '5', title: 'AWS AI Practitioner + Cloud Practitioner', provider: 'AWS', phase: 'Phase 2', relevance_score: 10, voucher_info: 'Pass = FREE Cloud voucher until Nov 30 2026', tool_mapping: 'Bedrock + Q', cost: 'FREE', pidgin_why: 'Amazon go give you work' },
  { id: '6', title: 'Cisco Cybersecurity', provider: 'Cisco', phase: 'Phase 2', relevance_score: 9, tool_mapping: 'Cisco Tools', cost: 'FREE', pidgin_why: 'For remote support jobs' },
  { id: '7', title: 'Google Data Analytics', provider: 'Google', phase: 'Phase 3', relevance_score: 10, tool_mapping: 'Looker + Sheets AI', cost: 'FREE', pidgin_why: 'Top 12 remote job cert' },
  { id: '8', title: 'HubSpot + Meta Marketing', provider: 'HubSpot/Meta', phase: 'Phase 3', relevance_score: 9, tool_mapping: 'Meta AI + HubSpot AI', cost: 'FREE', pidgin_why: 'For WFH marketing' },
  { id: '9', title: 'freeCodeCamp + HP LIFE', provider: 'freeCodeCamp', phase: 'Phase 3', relevance_score: 9, tool_mapping: 'GitHub Copilot', cost: 'FREE', pidgin_why: 'Portfolio prove skill' },
]

export default function Home() {
  const [certs, setCerts] = useState<Cert[]>(FALLBACK_CERTS)
  const [live, setLive] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      if (!isSupabaseConfigured || !supabase) {
        setLoading(false)
        return
      }
      try {
        const { data, error } = await supabase
          .from('external_certifications')
          .select('*')
          .eq('is_active', true)
          .order('relevance_score', { ascending: false })
        if (!error && data && data.length > 0) {
          setCerts(data as Cert[])
          setLive(true)
        }
      } catch (e) {
        console.log('Using fallback', e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const phase1 = certs.filter(c => c.phase?.includes('1'))
  const phase2 = certs.filter(c => c.phase?.includes('2'))
  const phase3 = certs.filter(c => c.phase?.includes('3'))

  const CertCard = ({ c }: { c: Cert }) => (
    <div style={{ background: 'white', padding: '14px', borderRadius: '12px', marginBottom: '10px', fontSize: '14px', border: '1px solid #e5e7eb', textAlign: 'left' }}>
      <div style={{ fontWeight: 900 }}>{c.title}</div>
      <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>{c.provider} {c.duration_hours ? `• ${c.duration_hours}h` : ''} {c.relevance_score ? `• ${c.relevance_score}/10` : ''} • {c.cost || 'FREE'}</div>
      <div style={{ fontSize: '12px', marginTop: '6px' }}><b>Tool:</b> {c.tool_mapping || 'AI Tools'} → {c.pidgin_why || c.voucher_info || 'Free cert'}</div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#faf9f6', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ background: 'black', color: 'white', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <h1 style={{ fontWeight: 900, fontSize: '22px', margin: 0 }}>KPATA ACADEMY ✓ LIVE {live && '● Supabase'}</h1>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{ background: '#fbbf24', color: 'black', padding: '6px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 'bold' }}>Self-Paced</span>
          <span style={{ background: '#22c55e', color: 'white', padding: '6px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 'bold' }}>{live ? `${certs.length} LIVE Certs` : '15 Free Certs'}</span>
          <span style={{ background: live ? '#22c55e' : 'white', color: live ? 'white' : 'black', padding: '6px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 'bold' }}>{live ? 'Supabase LIVE ✓' : 'Fresh Build ✓'}</span>
        </div>
      </header>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        <div style={{ background: 'linear-gradient(135deg, #fde047 0%, #fb923c 100%)', padding: '40px', borderRadius: '24px', color: 'black', marginBottom: '24px', border: '3px solid black' }}>
          <h2 style={{ fontSize: '48px', fontWeight: 900, lineHeight: '0.95', margin: 0, letterSpacing: '-2px' }}>Learn AI.<br/>Choose Right Tool.<br/>Get Real Free Certs.</h2>
          <p style={{ marginTop: '16px', fontWeight: 600, fontSize: '18px', maxWidth: '700px' }}>We train you. We apply on your behalf. Google, Microsoft, IBM, AWS certify you. All self-paced in EN / HA / YO / IG / PIDGIN.</p>
          {loading ? <div style={{ marginTop: '12px', fontSize: '13px', fontWeight: 'bold' }}>⏳ Checking Supabase LIVE...</div> : <div style={{ marginTop: '12px', background: live ? '#16a34a' : 'black', color: 'white', padding: '10px 16px', borderRadius: '999px', display: 'inline-block', fontSize: '13px', fontWeight: 'bold' }}>{live ? `✅ LIVE from Supabase: ${certs.length} certs loaded!` : '⚠️ Using fallback - Add Supabase env to go LIVE'}</div>}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          <div style={{ background: 'white', borderRadius: '20px', border: '3px solid #fde68a', padding: '24px' }}><h3 style={{ fontWeight: 900, fontSize: '20px', margin: '0 0 4px 0' }}>Phase 1: 0-30 Days</h3><p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 16px 0', fontWeight: 600 }}>{phase1.length} courses</p>{phase1.map(c => <CertCard key={c.id} c={c} />)}<button style={{ marginTop: '16px', width: '100%', background: 'black', color: 'white', padding: '12px', borderRadius: '12px', fontWeight: 'bold', border: 'none' }}>Start Phase 1</button></div>
          <div style={{ background: 'white', borderRadius: '20px', border: '3px solid #bfdbfe', padding: '24px' }}><h3 style={{ fontWeight: 900, fontSize: '20px', margin: '0 0 4px 0' }}>Phase 2: 30-90 Days</h3><p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 16px 0', fontWeight: 600 }}>{phase2.length} courses</p>{phase2.map(c => <CertCard key={c.id} c={c} />)}<button style={{ marginTop: '16px', width: '100%', background: '#2563eb', color: 'white', padding: '12px', borderRadius: '12px', fontWeight: 'bold', border: 'none' }}>Start Phase 2</button></div>
          <div style={{ background: 'white', borderRadius: '20px', border: '3px solid #bbf7d0', padding: '24px' }}><h3 style={{ fontWeight: 900, fontSize: '20px', margin: '0 0 4px 0' }}>Phase 3: 90-180 Days</h3><p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 16px 0', fontWeight: 600 }}>{phase3.length} courses</p>{phase3.map(c => <CertCard key={c.id} c={c} />)}<button style={{ marginTop: '16px', width: '100%', background: '#16a34a', color: 'white', padding: '12px', borderRadius: '12px', fontWeight: 'bold', border: 'none' }}>Start Phase 3</button></div>
        </div>
      </div>
    </div>
  )
}
