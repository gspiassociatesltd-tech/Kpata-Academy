
export default function AcademyPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#faf9f6', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ background: 'black', color: 'white', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <h1 style={{ fontWeight: 900, fontSize: '22px', margin: 0, letterSpacing: '-0.5px' }}>KPATA ACADEMY ✓ LIVE</h1>
        <div style={{ display: 'flex', gap: '8px' }}>
          <span style={{ background: '#fbbf24', color: 'black', padding: '6px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 'bold' }}>Self-Paced</span>
          <span style={{ background: '#22c55e', color: 'white', padding: '6px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 'bold' }}>15 Free Certs</span>
          <span style={{ background: 'white', color: 'black', padding: '6px 14px', borderRadius: '999px', fontSize: '12px', fontWeight: 'bold' }}>Fresh Build ✓</span>
        </div>
      </header>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
        <div style={{ background: 'linear-gradient(135deg, #fde047 0%, #fb923c 100%)', padding: '40px', borderRadius: '24px', color: 'black', marginBottom: '24px', border: '3px solid black' }}>
          <h2 style={{ fontSize: '48px', fontWeight: 900, lineHeight: '0.95', margin: 0, letterSpacing: '-2px' }}>Learn AI.<br/>Choose Right Tool.<br/>Get Real Free Certs.</h2>
          <p style={{ marginTop: '16px', fontWeight: 600, fontSize: '18px', maxWidth: '700px' }}>We train you. We apply on your behalf. Google, Microsoft, IBM, AWS certify you. All self-paced in EN / HA / YO / IG / PIDGIN.</p>
          <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', textAlign: 'center' }}>
            <div style={{ background: 'black', color: 'white', padding: '20px', borderRadius: '16px' }}><div style={{ fontSize: '32px', fontWeight: 900 }}>3</div><div style={{ fontSize: '13px', fontWeight: 600 }}>Self-Paced Courses</div></div>
            <div style={{ background: 'black', color: 'white', padding: '20px', borderRadius: '16px' }}><div style={{ fontSize: '32px', fontWeight: 900 }}>15</div><div style={{ fontSize: '13px', fontWeight: 600 }}>Free Global Certs</div></div>
            <div style={{ background: 'black', color: 'white', padding: '20px', borderRadius: '16px' }}><div style={{ fontSize: '32px', fontWeight: 900 }}>100%</div><div style={{ fontSize: '13px', fontWeight: 600 }}>Free Training</div></div>
          </div>
          <div style={{ marginTop: '20px', background: 'white', padding: '16px', borderRadius: '12px', fontSize: '14px', border: '2px solid black' }}>
            ✅ <b>FRESH BUILD SUCCESS!</b> No Application Error. No Auth Crash. No Nested Folders. This is Day 1 — 6 hours of debugging FIXED!
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          <div style={{ background: 'white', borderRadius: '20px', border: '3px solid #fde68a', padding: '24px' }}>
            <h3 style={{ fontWeight: 900, fontSize: '20px', margin: '0 0 4px 0' }}>Phase 1: 0-30 Days</h3><p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 16px 0', fontWeight: 600 }}>Foundation - AI Assistant Ready - Self Paced</p>
            <div style={{ background: '#fffbeb', padding: '14px', borderRadius: '12px', marginBottom: '10px', fontSize: '14px', border: '1px solid #fde68a' }}><b>Google AI Essentials</b> - 10h - 9/10<br/><span style={{ fontSize: '12px' }}>Tool: Gemini + ChatGPT → Gold standard - FREE</span></div>
            <div style={{ background: '#fffbeb', padding: '14px', borderRadius: '12px', marginBottom: '10px', fontSize: '14px', border: '1px solid #fde68a' }}><b>IBM AI Fundamentals</b> - 15h - 8/10<br/><span style={{ fontSize: '12px' }}>Tool: Watson → Business AI</span></div>
            <div style={{ background: '#fffbeb', padding: '14px', borderRadius: '12px', marginBottom: '10px', fontSize: '14px', border: '1px solid #fde68a' }}><b>Claude 101</b> - 7h - 9/10<br/><span style={{ fontSize: '12px' }}>Tool: Claude 3.5 → Prompt mastery</span></div>
            <button style={{ marginTop: '16px', width: '100%', background: 'black', color: 'white', padding: '12px', borderRadius: '12px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>Start Phase 1 - Self Paced</button>
          </div>

          <div style={{ background: 'white', borderRadius: '20px', border: '3px solid #bfdbfe', padding: '24px' }}>
            <h3 style={{ fontWeight: 900, fontSize: '20px', margin: '0 0 4px 0' }}>Phase 2: 30-90 Days</h3><p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 16px 0', fontWeight: 600 }}>Builder - Cloud & AI Junior - Self Paced</p>
            <div style={{ background: '#eff6ff', padding: '14px', borderRadius: '12px', marginBottom: '10px', fontSize: '14px', border: '1px solid #bfdbfe' }}><b>Microsoft AI-900</b> + AZ-900 + DP-900<br/>FREE voucher during AI Skills Fest 2026<br/>Never expires - 10/10</div>
            <div style={{ background: '#eff6ff', padding: '14px', borderRadius: '12px', marginBottom: '10px', fontSize: '14px', border: '1px solid #bfdbfe' }}><b>AWS AI Practitioner</b><br/>Pass = FREE Cloud Practitioner voucher<br/>10/10 - Until Nov 30 2026</div>
            <div style={{ background: '#eff6ff', padding: '14px', borderRadius: '12px', marginBottom: '10px', fontSize: '14px', border: '1px solid #bfdbfe' }}><b>Cisco Cybersecurity</b> - Remote support jobs - FREE</div>
            <button style={{ marginTop: '16px', width: '100%', background: '#2563eb', color: 'white', padding: '12px', borderRadius: '12px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>Start Phase 2 - Self Paced</button>
          </div>

          <div style={{ background: 'white', borderRadius: '20px', border: '3px solid #bbf7d0', padding: '24px' }}>
            <h3 style={{ fontWeight: 900, fontSize: '20px', margin: '0 0 4px 0' }}>Phase 3: 90-180 Days</h3><p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 16px 0', fontWeight: 600 }}>Specialist - $20-50/hr Employable - Self Paced</p>
            <div style={{ background: '#f0fdf4', padding: '14px', borderRadius: '12px', marginBottom: '10px', fontSize: '14px', border: '1px solid #bbf7d0' }}><b>Google Data Analytics</b> - Top 12 remote job cert - 10/10 - FREE</div>
            <div style={{ background: '#f0fdf4', padding: '14px', borderRadius: '12px', marginBottom: '10px', fontSize: '14px', border: '1px solid #bbf7d0' }}><b>HubSpot + Meta Marketing</b> - WFH marketing - FREE</div>
            <div style={{ background: '#f0fdf4', padding: '14px', borderRadius: '12px', marginBottom: '10px', fontSize: '14px', border: '1px solid #bbf7d0' }}><b>freeCodeCamp + HP LIFE</b> - Portfolio proves skills - FREE</div>
            <button style={{ marginTop: '16px', width: '100%', background: '#16a34a', color: 'white', padding: '12px', borderRadius: '12px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>Start Phase 3 - Self Paced</button>
          </div>
        </div>

        <div style={{ marginTop: '24px', background: 'black', color: 'white', padding: '28px', borderRadius: '20px' }}>
          <h3 style={{ fontWeight: '900', fontSize: '20px', margin: 0 }}>Guided Tool Choice Engine — Built Into Every Lesson</h3>
          <div style={{ marginTop: '16px', background: 'white', color: 'black', padding: '20px', borderRadius: '16px', fontSize: '15px', lineHeight: '1.5' }}>
            <b>Example:</b> "I need to write proposal for MOTOMA batteries" → Kpata asks goal → Recommends: <b>Claude for proposal + Gamma for slides</b> → Why in PIDGIN: "Claude sabi write correct English wey client go understand"<br/><br/>
            <b>Self-Paced:</b> Start anytime, pause anytime, resume. All in EN/HA/YO/IG/PID.
          </div>
        </div>

        <div style={{ marginTop: '24px', background: 'white', padding: '24px', borderRadius: '20px', border: '3px solid black', textAlign: 'center' }}>
          <h3 style={{ fontWeight: 900, margin: '0 0 8px 0' }}>After 6 Hours — We Are LIVE! 🚀</h3>
          <p style={{ fontSize: '14px', color: '#4b5563', margin: 0 }}>Next: Add Supabase 15 certs LIVE + Opportunity Engine. No more Application Error!</p>
        </div>
      </div>
    </div>
  )
}
