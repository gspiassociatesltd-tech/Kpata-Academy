// FIX 1: Remove months, replace with 20 min/lesson - FIX 2: All phases FREE
import Link from 'next/link'
import { courses } from '@/lib/courses'

export default function HomePage() {
  const allCourses = courses || []
  return (
    <div style={{minHeight:'100vh', background:'#fcfcf9', fontFamily:'system-ui'}}>
      <div style={{background:'white', borderBottom:'1px solid #e5e7eb', padding:'12px 20px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <div style={{fontWeight:800, fontSize:20}}>K Kpata Academy</div>
        <Link href="/academy" style={{background:'#111827', color:'white', padding:'8px 16px', borderRadius:8, textDecoration:'none', fontSize:14}}>Start Free →</Link>
      </div>

      <div style={{maxWidth:1000, margin:'0 auto', padding:'40px 20px'}}>
        <div style={{background:'#fde047', display:'inline-block', padding:'4px 10px', borderRadius:20, fontSize:12, fontWeight:700, marginBottom:12}}>100% FREE TO LEARN • ALL PHASES FREE • NO CARD NEEDED</div>
        <h1 style={{fontSize:48, fontWeight:900, lineHeight:1.1, maxWidth:600, margin:0}}>
          FREE AI Training<br/>to Certification<br/>in Simple English
        </h1>
        <p style={{fontSize:18, color:'#4b5563', maxWidth:600, marginTop:16, lineHeight:1.6}}>
          We take you from zero to certified. Start with free Google, IBM courses in simple Minna English. 
          Every lesson has 2 solved examples + hands-on lab. Kpata Bot scores you. Get certificate.
        </p>
        <div style={{display:'flex', gap:12, marginTop:20, flexWrap:'wrap'}}>
          <Link href="/academy" style={{background:'#111827', color:'white', padding:'14px 24px', borderRadius:10, textDecoration:'none', fontWeight:700}}>Start Learning Free →</Link>
          <a href="https://whatsapp.com" style={{background:'white', border:'1px solid #e5e7eb', padding:'14px 24px', borderRadius:10, textDecoration:'none', color:'#111'}}>Join WhatsApp</a>
        </div>
      </div>

      {/* FIXED HOW IT WORKS - ALL FREE, ACTIVE CLICKABLE */}
      <div style={{maxWidth:1000, margin:'0 auto', padding:'20px'}}>
        <div style={{fontSize:13, fontWeight:700, letterSpacing:1, color:'#6b7280', marginBottom:16}}>HOW IT WORKS - ALL FREE TO LEARN</div>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))', gap:16}}>
          <Link href="/academy" style={{background:'white', padding:20, borderRadius:16, boxShadow:'0 1px 3px rgba(0,0,0,0.1)', textDecoration:'none', color:'#111', border:'2px solid #fde047'}}>
            <div style={{width:32, height:32, background:'#fde047', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800}}>1</div>
            <div style={{fontWeight:800, marginTop:12}}>Phase 1: FREE Foundation ✓</div>
            <div style={{fontSize:14, color:'#6b7280', marginTop:6, lineHeight:1.5}}>Google Data Analytics, IBM Data Science - 60 lessons FREE, simplest form, solved examples. Mama Nkechi & Musa story.</div>
            <div style={{fontSize:12, color:'#2563eb', marginTop:10, fontWeight:700}}>Start Phase 1 Free →</div>
          </Link>
          <Link href="/academy" style={{background:'white', padding:20, borderRadius:16, boxShadow:'0 1px 3px rgba(0,0,0,0.1)', textDecoration:'none', color:'#111', border:'2px solid #111827'}}>
            <div style={{width:32, height:32, background:'#111827', color:'white', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800}}>2</div>
            <div style={{fontWeight:800, marginTop:12}}>Phase 2: FREE AI Core ✓</div>
            <div style={{fontSize:14, color:'#6b7280', marginTop:6, lineHeight:1.5}}>AI Fundamentals, Generative AI, Prompt Engineering - ALSO FREE to learn, hands-on with free tools, enjoyable chunks.</div>
            <div style={{fontSize:12, color:'#2563eb', marginTop:10, fontWeight:700}}>Start Phase 2 Free →</div>
          </Link>
          <Link href="/academy" style={{background:'white', padding:20, borderRadius:16, boxShadow:'0 1px 3px rgba(0,0,0,0.1)', textDecoration:'none', color:'#111', border:'2px solid #22c55e'}}>
            <div style={{width:32, height:32, background:'#22c55e', color:'white', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800}}>3</div>
            <div style={{fontWeight:800, marginTop:12}}>Phase 3: FREE Certification ✓</div>
            <div style={{fontSize:14, color:'#6b7280', marginTop:6, lineHeight:1.5}}>Final projects, mock exams with past questions, certificate + remote job prep - ALSO FREE to learn on Kpata.</div>
            <div style={{fontSize:12, color:'#2563eb', marginTop:10, fontWeight:700}}>Start Phase 3 Free →</div>
          </Link>
        </div>
      </div>

      {/* FIXED COURSES - NO MONTHS, SHOW 20 MIN/LESSON */}
      <div style={{maxWidth:1000, margin:'0 auto', padding:'30px 20px'}}>
        <h2 style={{fontSize:24, fontWeight:800}}>8 Free Courses • 120 Deep Lessons • 20 Mins Each</h2>
        <p style={{fontSize:14, color:'#6b7280', marginTop:6}}>Each lesson: Main lesson (Mama Nkechi story) + 2 Past Exam Worked Examples + Lab (Kpata Bot 80%) + Quiz — All FREE</p>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(240px, 1fr))', gap:12, marginTop:16}}>
          {allCourses.map((c:any) => (
            <Link key={c.slug} href={`/courses/${c.slug}`} style={{background:'white', padding:16, borderRadius:12, textDecoration:'none', color:'#111', border:'1px solid #e5e7eb', display:'block'}}>
              <div style={{fontSize:12, background:'#f3f4f6', display:'inline-block', padding:'2px 6px', borderRadius:4}}>{c.provider}</div>
              <div style={{fontWeight:700, marginTop:8, fontSize:15}}>{c.title}</div>
              {/* FIXED: NO MONTHS */}
              <div style={{fontSize:12, color:'#6b7280', marginTop:4}}>{c.lessonsCount} lessons • 20 min/lesson • {c.level} • FREE</div>
              <div style={{fontSize:12, color:'#2563eb', marginTop:8}}>Start free →</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
