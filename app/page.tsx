"use client";
import Link from 'next/link'
import { courses } from '@/lib/courses'

export default function HomePage() {
  const allCourses = courses || []
  const scrollTop = () => window.scrollTo({top:0, behavior:'smooth'});
  return (
    <div style={{minHeight:'100vh', background:'#fcfcf9', fontFamily:'system-ui', paddingBottom:80}}>
      <div style={{background:'white', borderBottom:'1px solid #e5e7eb', padding:'12px 16px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div style={{fontWeight:800, fontSize:20}}>Kpata Academy</div>
        <Link href="/academy" style={{background:'#111827', color:'white', padding:'0 16px', height:48, borderRadius:10, textDecoration:'none', fontSize:14, fontWeight:700, display:'flex', alignItems:'center'}}>Start Free →</Link>
      </div>

      <div style={{maxWidth:1000, margin:'0 auto', padding:'32px 16px'}}>
        <div style={{background:'#dcfce7', display:'inline-block', padding:'6px 12px', borderRadius:20, fontSize:11, fontWeight:700, marginBottom:12, color:'#166534'}}>Progress: 0% • Live • Self-paced</div>
        <div style={{background:'#fde047', display:'inline-block', padding:'4px 10px', borderRadius:20, fontSize:11, fontWeight:700, marginBottom:12, marginLeft:8}}>FREE • 20 min/lesson</div>
        <h1 style={{fontSize:40, fontWeight:900, lineHeight:1.1, maxWidth:600, margin:0}}>FREE AI Training<br/>to Certification<br/>in Simple English</h1>
        <p style={{fontSize:16, color:'#4b5563', maxWidth:600, marginTop:16, lineHeight:1.6}}>
          Dirty data is like a <strong>dirty room with clothes on the ground</strong> — you cannot find your shoes until you arrange the room. We teach you to arrange data: TRIM spaces (fold clothes), remove duplicates (throw duplicate shirt), fill blanks (fill empty shoe box). Simple English, no degree needed.
        </p>
        <div style={{display:'flex', gap:12, marginTop:20, flexWrap:'wrap'}}>
          <Link href="/academy" style={{background:'#111827', color:'white', height:48, padding:'0 24px', borderRadius:10, textDecoration:'none', fontWeight:700, display:'flex', alignItems:'center'}}>Start Learning Free →</Link>
          <a href="https://whatsapp.com/channel/0029Vb7eUeBGzzKTHPIaoe0b" target="_blank" style={{background:'#25D366', color:'white', height:48, padding:'0 20px', borderRadius:10, textDecoration:'none', fontWeight:700, display:'flex', alignItems:'center'}}>📱 WhatsApp Channel</a>
        </div>
        <a href="https://www.coursera.org/professional-certificates/google-data-analytics" target="_blank" style={{display:'inline-flex', height:44, background:'white', border:'1px solid #1a73e8', color:'#1a73e8', padding:'0 16px', borderRadius:10, textDecoration:'none', fontWeight:700, fontSize:12, marginTop:12, alignItems:'center'}}>🔗 Backup: Google Data Analytics Official</a>
      </div>

      <div style={{maxWidth:1000, margin:'0 auto', padding:'20px 16px'}}>
        <div style={{fontSize:12, fontWeight:700, letterSpacing:1, color:'#6b7280', marginBottom:12}}>HOW IT WORKS - ALL PHASES FREE</div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:12}}>
          <Link href="/academy" style={{background:'white', padding:20, borderRadius:16, boxShadow:'0 1px 3px rgba(0,0,0,0.1)', textDecoration:'none', color:'#111', border:'2px solid #fde047'}}>
            <div style={{width:32, height:32, background:'#fde047', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800}}>1</div>
            <div style={{fontWeight:800, marginTop:12}}>Phase 1: FREE Foundation ✓</div>
            <div style={{fontSize:13, color:'#6b7280', marginTop:6}}>Google Data Analytics, IBM Data Science - 60 lessons FREE, dirty room analogy.</div>
            <div style={{fontSize:12, color:'#fff', background:'#16a34a', display:'inline-block', padding:'2px 8px', borderRadius:4, marginTop:10, fontWeight:700}}>FREE</div>
          </Link>
          <Link href="/academy" style={{background:'white', padding:20, borderRadius:16, boxShadow:'0 1px 3px rgba(0,0,0,0.1)', textDecoration:'none', color:'#111', border:'2px solid #111827'}}>
            <div style={{width:32, height:32, background:'#111827', color:'white', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800}}>2</div>
            <div style={{fontWeight:800, marginTop:12}}>Phase 2: FREE AI Core ✓</div>
            <div style={{fontSize:13, color:'#6b7280', marginTop:6}}>AI Fundamentals, Generative AI, Prompt Engineering - ALSO FREE.</div>
            <div style={{fontSize:12, color:'#fff', background:'#16a34a', display:'inline-block', padding:'2px 8px', borderRadius:4, marginTop:10, fontWeight:700}}>FREE</div>
          </Link>
          <Link href="/academy" style={{background:'white', padding:20, borderRadius:16, boxShadow:'0 1px 3px rgba(0,0,0,0.1)', textDecoration:'none', color:'#111', border:'2px solid #22c55e'}}>
            <div style={{width:32, height:32, background:'#22c55e', color:'white', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800}}>3</div>
            <div style={{fontWeight:800, marginTop:12}}>Phase 3: FREE Certification ✓</div>
            <div style={{fontSize:13, color:'#6b7280', marginTop:6}}>Final projects, mock exams, training log for Google cert - ALSO FREE.</div>
            <div style={{fontSize:12, color:'#fff', background:'#16a34a', display:'inline-block', padding:'2px 8px', borderRadius:4, marginTop:10, fontWeight:700}}>FREE</div>
          </Link>
        </div>
      </div>

      <div style={{maxWidth:1000, margin:'0 auto', padding:'30px 16px'}}>
        <h2 style={{fontSize:22, fontWeight:800}}>8 Free Courses • 120 Deep Lessons • 20 Mins Each</h2>
        <p style={{fontSize:13, color:'#6b7280', marginTop:6}}>Main lesson (dirty room) + 2 Worked Examples + Lab + Quiz — All FREE</p>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(240px, 1fr))', gap:12, marginTop:16}}>
          {allCourses.map((c:any) => (
            <Link key={c.slug} href={`/courses/${c.slug}`} style={{background:'white', padding:16, borderRadius:12, textDecoration:'none', color:'#111', border:'1px solid #e5e7eb', display:'block'}}>
              <div style={{fontSize:11, background:'#f3f4f6', display:'inline-block', padding:'2px 6px', borderRadius:4}}>{c.provider || 'Google'}</div>
              <div style={{fontWeight:700, marginTop:8, fontSize:14}}>{c.title}</div>
              <div style={{fontSize:11, color:'#6b7280', marginTop:4}}>{c.lessonsCount || c.lessons?.length || 15} lessons • 20 min/lesson • FREE</div>
              <div style={{fontSize:11, color:'#2563eb', marginTop:8, fontWeight:700}}>Start free →</div>
            </Link>
          ))}
        </div>
      </div>

      <div style={{maxWidth:1000, margin:'0 auto', padding:'0 16px'}}>
        <div style={{background:'white', border:'1px solid #e5e7eb', borderRadius:12, padding:16}}>
          <h3 style={{margin:0, fontSize:14}}>Bug 4 Fix: Spaces Visible ␣Musa␣␣</h3>
          <p style={{fontSize:11, marginTop:8}}>Yellow dashed = hidden spaces = clothes on floor in dirty room. TRIM fixes it.</p>
        </div>
        <div style={{background:'#fefce8', border:'1px solid #fde68a', borderRadius:10, padding:12, marginTop:12}}>
          <p style={{fontSize:11, margin:0}}><strong>Kpata Academy:</strong> FREE training community, not certifying body. We log to Google Sheet as evidence for Google/IBM/Microsoft. App Bot inside app. WhatsApp Channel only announcements.</p>
        </div>
      </div>

      <div style={{position:'fixed', bottom:0, left:0, right:0, background:'white', borderTop:'1px solid #e5e7eb', padding:'10px', display:'flex', justifyContent:'center', zIndex:40}}>
        <button onClick={scrollTop} style={{width:200, height:48, background:'#111827', color:'white', fontWeight:700, borderRadius:10, border:'none', cursor:'pointer'}}>Top ↑ Back to Lesson</button>
      </div>
    </div>
  )
}
