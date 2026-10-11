
export default function AcademyPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#faf9f6' }}>
      <header style={{ background: 'black', color: 'white', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontWeight: 900, fontSize: '20px', margin: 0 }}>KPATA ACADEMY - MVP LIVE</h1>
        <div style={{ display: 'flex', gap: '8px' }}>
          <span style={{ background: '#fbbf24', color: 'black', padding: '6px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 'bold' }}>Self-Paced ✓</span>
          <span style={{ background: '#22c55e', color: 'white', padding: '6px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 'bold' }}>No Crash - Fixed!</span>
        </div>
      </header>

      <div style={{ maxWidth: '1120px', margin: '0 auto', padding: '24px' }}>
        <div style={{ background: 'linear-gradient(90deg, #fcd34d, #fb923c)', padding: '32px', borderRadius: '24px', color: 'black', marginBottom: '24px' }}>
          <h2 style={{ fontSize: '40px', fontWeight: 900, lineHeight: '1.1', margin: 0 }}>Learn AI.<br/>Choose Right Tool.<br/>Get Real Free Certs.</h2>
          <p style={{ marginTop: '12px', fontWeight: 500, fontSize: '16px' }}>We train you. We apply on your behalf. Google, Microsoft, IBM, AWS certify you. All self-paced in EN / HA / YO / IG / PIDGIN. Build SUCCESS!</p>
          <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', textAlign: 'center' }}>
            <div style={{ background: 'black', color: 'white', padding: '16px', borderRadius: '12px' }}><div style={{ fontSize: '28px', fontWeight: 900 }}>3</div><div style={{ fontSize: '13px' }}>Self-Paced Courses</div></div>
            <div style={{ background: 'black', color: 'white', padding: '16px', borderRadius: '12px' }}><div style={{ fontSize: '28px', fontWeight: 900 }}>15</div><div style={{ fontSize: '13px' }}>Free Global Certs</div></div>
            <div style={{ background: 'black', color: 'white', padding: '16px', borderRadius: '12px' }}><div style={{ fontSize: '28px', fontWeight: 900 }}>100%</div><div style={{ fontSize: '13px' }}>Free Training</div></div>
          </div>
          <div style={{ marginTop: '16px', background: 'white', padding: '12px', borderRadius: '8px', fontSize: '13px' }}>
            ✅ <b>Application Error FIXED!</b> This build has NO auth, NO Supabase crash, NO server exception. If you see this, your Vercel is LIVE!
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <div style={{ background: 'white', borderRadius: '16px', border: '2px solid #fde68a', padding: '20px' }}>
            <h3 style={{ fontWeight: 900, fontSize: '18px', margin: '0 0 4px 0' }}>Phase 1: 0-30 Days</h3><p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 12px 0' }}>Foundation - AI Assistant Ready - Self Paced</p>
            <div style={{ background: '#fffbeb', padding: '12px', borderRadius: '12px', marginBottom: '8px', fontSize: '14px' }}><b>Google AI Essentials</b> - 10h - 9/10<br/><span style={{ fontSize: '12px' }}>Tool: Gemini + ChatGPT → Gold standard</span></div>
            <div style={{ background: '#fffbeb', padding: '12px', borderRadius: '12px', marginBottom: '8px', fontSize: '14px' }}><b>IBM AI Fundamentals</b> - 15h - 8/10<br/><span style={{ fontSize: '12px' }}>Tool: Watson → Business AI</span></div>
            <div style={{ background: '#fffbeb', padding: '12px', borderRadius: '12px', marginBottom: '8px', fontSize: '14px' }}><b>Claude 101</b> - 7h - 9/10<br/><span style={{ fontSize: '12px' }}>Tool: Claude 3.5 → Prompt mastery</span></div>
          </div>

          <div style={{ background: 'white', borderRadius: '16px', border: '2px solid #bfdbfe', padding: '20px' }}>
            <h3 style={{ fontWeight: 900, fontSize: '18px', margin: '0 0 4px 0' }}>Phase 2: 30-90 Days</h3><p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 12px 0' }}>Builder - Cloud & AI Junior - Self Paced</p>
            <div style={{ background: '#eff6ff', padding: '12px', borderRadius: '12px', marginBottom: '8px', fontSize: '14px' }}><b>Microsoft AI-900</b> + AZ-900 + DP-900<br/>FREE voucher during AI Skills Fest 2026<br/>Never expires - 10/10</div>
            <div style={{ background: '#eff6ff', padding: '12px', borderRadius: '12px', marginBottom: '8px', fontSize: '14px' }}><b>AWS AI Practitioner</b><br/>Pass = FREE Cloud Practitioner voucher<br/>10/10 - Until Nov 30 2026</div>
            <div style={{ background: '#eff6ff', padding: '12px', borderRadius: '12px', marginBottom: '8px', fontSize: '14px' }}><b>Cisco Cybersecurity</b> - Remote support jobs</div>
          </div>

          <div style={{ background: 'white', borderRadius: '16px', border: '2px solid #bbf7d0', padding: '20px' }}>
            <h3 style={{ fontWeight: 900, fontSize: '18px', margin: '0 0 4px 0' }}>Phase 3: 90-180 Days</h3><p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 12px 0' }}>Specialist - $20-50/hr Employable - Self Paced</p>
            <div style={{ background: '#f0fdf4', padding: '12px', borderRadius: '12px', marginBottom: '8px', fontSize: '14px' }}><b>Google Data Analytics</b> - Top 12 remote job cert - 10/10</div>
            <div style={{ background: '#f0fdf4', padding: '12px', borderRadius: '12px', marginBottom: '8px', fontSize: '14px' }}><b>HubSpot + Meta Marketing</b> - WFH marketing</div>
            <div style={{ background: '#f0fdf4', padding: '12px', borderRadius: '12px', marginBottom: '8px', fontSize: '14px' }}><b>freeCodeCamp + HP LIFE</b> - Portfolio proves skills</div>
          </div>
        </div>

        <div style={{ marginTop: '24px', background: 'black', color: 'white', padding: '24px', borderRadius: '16px' }}>
          <h3 style={{ fontWeight: 'bold', fontSize: '18px', margin: 0 }}>Guided Tool Choice Engine</h3>
          <div style={{ marginTop: '12px', background: 'white', color: 'black', padding: '16px', borderRadius: '12px', fontSize: '14px' }}>
            "I need proposal for MOTOMA batteries" → Kpata asks goal → Recommends: Claude + Gamma → PIDGIN: "Claude sabi write correct English"
          </div>
        </div>
      </div>
    </div>
  )
}
