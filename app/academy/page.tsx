"use client";
import React, { useState } from "react";
const QUIZ = [
  { q: "Why does ␣Musa␣␣ fail grouping?", a: ["Spaces make it different - ␣Musa␣␣ ≠ Musa","Color wrong","Too big"], correct: 0 },
  { q: "Where is B2? Beginner", a: ["Column B Row 2 - dirty ␣Musa␣␣","A1","Sheet name"], correct: 0 },
  { q: "Where type =TRIM(B2)?", a: ["E2 empty box","B2 itself","A1"], correct: 0 },
  { q: "2024-13-05 invalid why?", a: ["Month 13 doesn't exist","Year high","Sunday"], correct: 0 },
  { q: "After clean, how many rows?", a: ["4 clean - 5→4 arranged","10","0"], correct: 0 },
];
export default function Page(){
  const [showQuiz,setShowQuiz]=useState(false);
  const [cur,setCur]=useState(0);
  const [score,setScore]=useState(0);
  const [done,setDone]=useState(false);
  const [sel,setSel]=useState<number|null>(null);
  const [showLog,setShowLog]=useState(false);
  const [logType,setLogType]=useState("LAB");
  const [name,setName]=useState("");
  const [phone,setPhone]=useState("");
  const [hwText,setHwText]=useState("");
  const [saving,setSaving]=useState(false);
  const [saved,setSaved]=useState(false);
  const [copied,setCopied]=useState(false);
  const [liveStep,setLiveStep]=useState(0);
  const CSV_DIRTY=`id,name,date,amount
1, Musa  ,2024-13-05,500
1, Musa  ,2024-13-05,500
3,Amina,2024-05-15,600
4,,2024-05-20,400
5,John Doe,2024-05-18,300`;
  const CSV_CLEAN=`id,name,date,amount
1,Musa,2024-05-05,500
3,Amina,2024-05-15,600
4,Unknown,2024-05-20,400
5,John Doe,2024-05-18,300`;
  const answer=(i:number)=>{setSel(i); setTimeout(()=>{ if(i===QUIZ[cur].correct) setScore(s=>s+1); if(cur<4){setCur(c=>c+1); setSel(null);} else setDone(true);},350);}
  const openLog=(t:string)=>{setLogType(t); setShowLog(true); setSaved(false);};
  const save=async()=>{
    if(!name||!phone){alert("Enter name and phone"); return;}
    setSaving(true);
    const URL="https://script.google.com/macros/s/AKfycbxiWGrdTSguuZdixWtERJgeYCXgQS48ZKTnTdYqOPQn16dij7WFl499URHC3quaCCqZ/exec";
    const p={timestamp:new Date().toISOString(), name, phone, type:logType, details:logType==="HW"?hwText:logType==="QUIZ"?`Quiz ${score}/5 v9 Perfect`:`${logType} 5→4 v9 Perfect`, score:logType==="QUIZ"?score:"", source:"Kpata_v9_Perfect"};
    try{ const l=JSON.parse(localStorage.getItem("kpata_logs")||"[]"); l.push(p); localStorage.setItem("kpata_logs",JSON.stringify(l)); await fetch(URL,{method:"POST",mode:"no-cors",body:JSON.stringify(p)}); setSaved(true);}catch{setSaved(true);} setSaving(false);
  };
  const STEPS = [
    { icon:"📄", title:"Step 0: Open Empty Sheet", short:"Open", desc:"Click green button below → Google Sheet opens empty. We add dirty data. Phone: File → Make a copy to your Drive.", color:"#f0fdf4", border:"#22c55e", detail:"Empty notebook — we write dirty list inside." },
    { icon:"📋", title:"Step 1: Paste 5 Dirty Rows", short:"Paste", desc:"Copy CSV below → Click A1 (first box) → Ctrl+V (or long press Paste). You see data in A column (clothes in one pile).", color:"#fefce8", border:"#f59e0b", detail:"If 1 column only: Don't worry! Next step splits it." },
    { icon:"✂", title:"Step 2: Split to Columns", short:"Split", desc:"Top menu: Data → Split text to columns → Comma. Now splits: A=id, B=name, C=date, D=amount. B2 = ␣Musa␣␣ dirty! Dirty room.", color:"#eff6ff", border:"#3b82f6", detail:"Phone: Tap ... More → Data → Split. Separates clothes by type." },
    { icon:"📍", title:"Step 3: Find B2 — Picture Guide", short:"B2 Map", desc:"B2 = Column B meets Row 2 = ␣Musa␣␣ dirty. E2 = Empty box 3 steps right where we type formula. Yellow = dirty, Green = clean box.", color:"#fdf4ff", border:"#a855f7", detail:"B = Second column, 2 = Second row. Row 1 header, Row 2 first data." },
    { icon:"✨", title:"Step 4: TRIM — Fold Shirt", short:"TRIM", desc:"Click E1 → Type clean name → Enter. Click E2 → Type =TRIM(B2) → Enter. Magic! E2 shows Musa clean — spaces removed like folding shirt.", color:"#f0fdf4", border:"#16a34a", detail:"=TRIM removes spaces left/right. ␣Musa␣␣ → Musa." },
    { icon:"🔵", title:"Step 5: Drag Blue Circle", short:"Drag", desc:"Find small blue circle bottom-right of E2 (phone: tiny blue dot). Press and drag down to E6. All names cleaned instantly! E3 Musa, E4 Amina, E5 N/A, E6 John Doe.", color:"#fffbeb", border:"#f59e0b", detail:"Blue circle = Fill handle. Excel copies formula fast!" },
    { icon:"🛠", title:"Step 6: Fix Date + Duplicate + Empty", short:"Fix 3", desc:"C2 2024-13-05 → 2024-05-05. Data → Remove duplicates → Check id → Remove. B4 empty → Type Unknown. Now 4 clean rows from 5 dirty!", color:"#fef2f2", border:"#ef4444", detail:"You fixed 4 dirts: spaces, duplicate, invalid date, empty. Google Data Analytics skill!" },
  ];
  return (
    <div style={{minHeight:'100vh', background:'#f8fafc', padding:'16px 16px 120px', fontFamily:'system-ui'}}>
      <div style={{maxWidth:760, margin:'0 auto'}}>
        <div style={{background:'white', border:'1px solid #e2e8f0', borderRadius:16, padding:20}}>
          <div style={{display:'flex', justifyContent:'space-between'}}><div><h1 style={{margin:0, fontSize:22, fontWeight:900}}>Kpata Academy</h1><p style={{fontSize:12, color:'#64748b', marginTop:6}}>LESSON 1: What is Dirty Data? • 20 min • FREE • Phone-friendly • Simple English</p></div><span style={{background:'#dcfce7', color:'#166534', padding:'6px 12px', borderRadius:20, fontSize:11, fontWeight:800}}>✓ LIVE</span></div>
          <div style={{marginTop:10, display:'flex', gap:8}}><span style={{background:'#dcfce7', color:'#166534', padding:'4px 10px', borderRadius:20, fontSize:11, fontWeight:700}}>Progress: 0% • Live</span><span style={{background:'#f1f5f9', padding:'4px 10px', borderRadius:20, fontSize:11}}>Self-paced • 2G • Tecno OK</span></div>
          <a href="https://www.coursera.org/professional-certificates/google-data-analytics" target="_blank" style={{display:'flex', height:44, background:'#1a73e8', color:'white', fontWeight:700, fontSize:12, borderRadius:10, alignItems:'center', justifyContent:'center', textDecoration:'none', marginTop:12}}>🔗 Backup: Google Data Analytics Official</a>
        </div>

        <div style={{marginTop:14, background:'white', borderRadius:16, padding:20, border:'2px solid #16a34a'}}>
          <h2 style={{margin:0, fontSize:18, fontWeight:800}}>🎥 Live Tutoring — How I Taught You Step-by-Step</h2>
          <p style={{fontSize:11, color:'#166534', background:'#dcfce7', padding:8, borderRadius:8, marginTop:10}}>This is how I taught you — every beginner can follow alone, no teacher. Bigger steps, icons, colors, B2 picture, phone 48px. Same as Google but in Simple English.</p>
          <div style={{marginTop:14, display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(110px, 1fr))', gap:8}}>
            {STEPS.map((s,i)=><button key={i} onClick={()=>setLiveStep(i)} style={{minHeight:68, borderRadius:12, border:liveStep===i?`2px solid ${s.border}`:'1px solid #e2e8f0', background:liveStep===i?s.color:'white', fontSize:11, fontWeight:liveStep===i?800:600, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:4, cursor:'pointer'}}><span style={{fontSize:20}}>{s.icon}</span>{s.short}<span style={{fontSize:9, opacity:0.7}}>{i}/7</span></button>)}
          </div>
          <div style={{marginTop:14, background:STEPS[liveStep].color, border:`2px solid ${STEPS[liveStep].border}`, borderRadius:12, padding:16}}>
            <div style={{display:'flex', alignItems:'center', gap:8}}><span style={{fontSize:22}}>{STEPS[liveStep].icon}</span><h3 style={{margin:0, fontSize:14, fontWeight:800}}>{STEPS[liveStep].title}</h3></div>
            <p style={{fontSize:12, marginTop:10, lineHeight:1.7, fontWeight:500}}>{STEPS[liveStep].desc}</p>
            <p style={{fontSize:11, marginTop:8, color:'#475569', background:'rgba(255,255,255,0.7)', padding:8, borderRadius:8}}><strong>Beginner:</strong> {STEPS[liveStep].detail}</p>
            {liveStep===3 && (
              <div style={{marginTop:14, overflowX:'auto', background:'white', borderRadius:10, padding:12, border:'1px solid #e2e8f0'}}>
                <p style={{fontSize:11, fontWeight:800, marginBottom:8}}>📍 Visual Map: Where is B2? Where is E2?</p>
                <table style={{borderCollapse:'collapse', fontSize:12, width:'100%', minWidth:480}}>
                  <thead><tr><th style={{border:'1px solid #e2e8f0', padding:8, background:'#f1f5f9'}}></th><th style={{border:'1px solid #e2e8f0', padding:8, background:'#f1f5f9'}}>A</th><th style={{border:'3px solid #f59e0b', padding:8, background:'#fef3c7'}}>B ← Dirty</th><th style={{border:'1px solid #e2e8f0', padding:8, background:'#f1f5f9'}}>C</th><th style={{border:'1px solid #e2e8f0', padding:8, background:'#f1f5f9'}}>D</th><th style={{border:'3px solid #22c55e', padding:8, background:'#dcfce7'}}>E ← Clean</th></tr></thead>
                  <tbody><tr><td style={{border:'1px solid #e2e8f0', padding:8, fontWeight:800, background:'#f1f5f9'}}>2</td><td style={{border:'1px solid #e2e8f0', padding:8}}>1</td><td style={{border:'3px solid #f59e0b', background:'#fef3c7', padding:10, fontFamily:'monospace', fontWeight:900, textAlign:'center'}}>B2 = ␣Musa␣␣<br/><span style={{fontSize:10}}>Dirty shirt on floor</span></td><td style={{border:'1px solid #e2e8f0', padding:8}}>2024-13-05</td><td style={{border:'1px solid #e2e8f0', padding:8}}>500</td><td style={{border:'3px solid #22c55e', background:'#dcfce7', padding:10, fontWeight:900, textAlign:'center'}}>E2 = =TRIM(B2)<br/><span style={{fontSize:10}}>Type here!</span></td></tr></tbody>
                </table>
              </div>
            )}
            <div style={{marginTop:12, display:'flex', gap:8}}>
              <button onClick={()=>setLiveStep(s=>Math.max(0,s-1))} disabled={liveStep===0} style={{flex:1, height:44, borderRadius:10, border:'1px solid #e2e8f0', background:liveStep===0?'#f1f5f9':'white', fontWeight:700, fontSize:12}}>← Prev</button>
              <button onClick={()=>setLiveStep(s=>Math.min(6,s+1))} disabled={liveStep===6} style={{flex:1, height:44, borderRadius:10, border:'none', background:liveStep===6?'#e2e8f0':'#111827', color:liveStep===6?'#64748b':'white', fontWeight:700, fontSize:12}}>{liveStep===6?"Done! 🎉":"Next →"}</button>
            </div>
          </div>
        </div>

        <div style={{marginTop:14, background:'white', borderRadius:16, padding:20, border:'1px solid #e2e8f0'}}>
          <h2 style={{margin:0, fontSize:16, fontWeight:800}}>📖 Lesson: Dirty Room Analogy</h2>
          <p style={{fontSize:13, lineHeight:1.8, marginTop:12}}>Dirty data is like a <strong>dirty room with clothes on the ground</strong> — you cannot find your shoes until you arrange the room. Shirts on chair, trousers on floor, socks under bed. You want to go out, you cannot find your belt. Why? Room dirty, not arranged.</p>
          <p style={{fontSize:12, lineHeight:1.7, marginTop:8, color:'#334155'}}>Same with data. You write "Musa" 2 times, you leave name empty, you type month 13 (no month 13). Excel counts " Musa  " and "Musa" as different. Sales report says 5 customers, real is 4. Wrong decision because data dirty.</p>
          <div style={{marginTop:12, display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(140px, 1fr))', gap:10}}>
            <div style={{background:'#fef3c7', border:'1px solid #fde68a', padding:10, borderRadius:10, fontSize:11, textAlign:'center'}}>👕<br/><strong>Clothes on ground</strong><br/>= duplicate<br/>id=1 twice</div>
            <div style={{background:'#fee2e2', border:'1px solid #fecaca', padding:10, borderRadius:10, fontSize:11, textAlign:'center'}}>📦<br/><strong>Empty shoe box</strong><br/>= blank<br/>name empty</div>
            <div style={{background:'#fee2e2', border:'1px solid #fecaca', padding:10, borderRadius:10, fontSize:11, textAlign:'center'}}>🏷<br/><strong>Wrong tag</strong><br/>= invalid date<br/>2024-13-05</div>
            <div style={{background:'#dcfce7', border:'1px solid #bbf7d0', padding:10, borderRadius:10, fontSize:11, textAlign:'center'}}>✨<br/><strong>Arrange room</strong><br/>= clean first<br/>TRIM + fix</div>
          </div>
        </div>

        <div style={{marginTop:14, background:'white', borderRadius:16, padding:20, border:'1px solid #e2e8f0', overflowX:'auto'}}>
          <h2 style={{margin:'0 0 10px', fontSize:16, fontWeight:800}}>📊 Dirty Table — 5→4</h2>
          <table style={{width:'100%', borderCollapse:'collapse', fontSize:13, minWidth:360}}>
            <thead><tr style={{background:'#f8fafc'}}><th style={{border:'1px solid #e2e8f0', padding:10}}>id</th><th style={{border:'1px solid #e2e8f0', padding:10}}>name</th><th style={{border:'1px solid #e2e8f0', padding:10}}>date</th><th style={{border:'1px solid #e2e8f0', padding:10}}>amount</th></tr></thead>
            <tbody>
              <tr><td style={{border:'1px solid #e2e8f0', padding:10}}>1</td><td style={{border:'1px solid #e2e8f0', padding:10, background:'#fef3c7'}}><span style={{background:'#fef9c3', border:'1px dashed #f59e0b', padding:'4px 10px', borderRadius:6, fontFamily:'monospace', fontWeight:800}}>␣Musa␣␣</span></td><td style={{border:'1px solid #e2e8f0', padding:10, background:'#fee2e2'}}>2024-13-05</td><td style={{border:'1px solid #e2e8f0', padding:10}}>500</td></tr>
              <tr><td style={{border:'1px solid #e2e8f0', padding:10}}>1</td><td style={{border:'1px solid #e2e8f0', padding:10}}>Musa (dup)</td><td style={{border:'1px solid #e2e8f0', padding:10}}>2024-13-05</td><td style={{border:'1px solid #e2e8f0', padding:10}}>500</td></tr>
              <tr><td style={{border:'1px solid #e2e8f0', padding:10}}>3</td><td style={{border:'1px solid #e2e8f0', padding:10}}>Amina</td><td style={{border:'1px solid #e2e8f0', padding:10}}>2024-05-15</td><td style={{border:'1px solid #e2e8f0', padding:10}}>600</td></tr>
              <tr><td style={{border:'1px solid #e2e8f0', padding:10}}>4</td><td style={{border:'1px solid #e2e8f0', padding:10, background:'#fee2e2'}}>(empty)</td><td style={{border:'1px solid #e2e8f0', padding:10}}>2024-05-20</td><td style={{border:'1px solid #e2e8f0', padding:10}}>400</td></tr>
              <tr><td style={{border:'1px solid #e2e8f0', padding:10}}>5</td><td style={{border:'1px solid #e2e8f0', padding:10}}>John Doe</td><td style={{border:'1px solid #e2e8f0', padding:10}}>2024-05-18</td><td style={{border:'1px solid #e2e8f0', padding:10}}>300</td></tr>
            </tbody>
          </table>
        </div>

        <div style={{background:'white', border:'2px solid #22c55e', borderRadius:16, padding:20, marginTop:14}}>
          <h2 style={{margin:0, fontSize:18, fontWeight:800}}>🧪 LAB: Arrange Room — 5→4</h2>
          <div style={{marginTop:14, background:'#f0fdf4', border:'1px solid #22c55e', borderRadius:12, padding:14}}>
            <a href="https://docs.google.com/spreadsheets/create" target="_blank" style={{display:'flex', height:52, background:'#16a34a', color:'white', fontWeight:800, fontSize:13, borderRadius:12, alignItems:'center', justifyContent:'center', textDecoration:'none'}}>🔗 Open Google Sheet — Free</a>
            <button onClick={()=>{navigator.clipboard.writeText(CSV_DIRTY); setCopied(true); setTimeout(()=>setCopied(false),2000);}} style={{marginTop:10, width:'100%', height:48, background:'white', border:'2px solid #16a34a', borderRadius:12, fontWeight:800, fontSize:12}}>{copied?"✅ Copied! Paste in A1":"📋 Copy Dirty CSV — 5 rows"}</button>
            <div style={{marginTop:10, background:'white', borderRadius:8, padding:10, fontFamily:'monospace', fontSize:11, whiteSpace:'pre-wrap', border:'1px dashed #86efac'}}>{CSV_DIRTY}</div>
          </div>
          <div style={{marginTop:14, display:'grid', gap:10}}>
            <div style={{border:'1px solid #bbf7d0', borderRadius:12, padding:14, background:'#f0fdf4', fontSize:12}}><strong>Steps 1-5:</strong> A1:A6 → Data → Split to Comma → E1=clean name → E2==TRIM(B2) → Drag blue circle E2→E6.</div>
            <div style={{border:'1px solid #fecaca', borderRadius:12, padding:14, background:'#fef2f2', fontSize:12}}><strong>Step 6:</strong> C2 2024-13-05→2024-05-05, Remove duplicates, Fill empty with Unknown. 4 rows!</div>
            <div style={{border:'2px solid #16a34a', borderRadius:12, padding:14, background:'#f0fdf4', fontSize:12, fontFamily:'monospace'}}><strong>✅ Final 4 rows:</strong><br/>{CSV_CLEAN}</div>
          </div>
          <button onClick={()=>openLog("LAB")} style={{marginTop:14, width:'100%', height:56, background:'#2563eb', color:'white', fontWeight:900, fontSize:15, borderRadius:12, border:'none'}}>🤖 Submit LAB — I Arranged 5→4</button>
        </div>

        <div style={{background:'white', border:'1px solid #f59e0b', borderRadius:16, padding:20, marginTop:14}}>
          <h2 style={{margin:0, fontSize:18, fontWeight:800}}>📝 HOMEWORK: Your Room</h2>
          <input value={hwText} onChange={e=>setHwText(e.target.value)} placeholder="e.g. ␣Amina␣, Musa, John..." style={{width:'100%', height:56, border:'2px solid #f59e0b', borderRadius:12, padding:'0 14px', marginTop:12, fontSize:14}}/>
          <button onClick={()=>openLog("HW")} style={{marginTop:10, width:'100%', height:56, background:'#ea580c', color:'white', fontWeight:900, fontSize:15, borderRadius:12, border:'none'}}>📤 Submit Homework — My Room Arranged</button>
        </div>

        <div style={{background:'white', border:'1px solid #8b5cf6', borderRadius:16, padding:20, marginTop:14}}>
          <h2 style={{margin:0, fontSize:18, fontWeight:800}}>🎯 QUIZ: B2 + TRIM + 5→4</h2>
          <button onClick={()=>setShowQuiz(true)} style={{marginTop:12, width:'100%', height:56, background:'#7c3aed', color:'white', fontWeight:900, fontSize:15, borderRadius:12, border:'none'}}>🚀 Take Quiz — 80% to Pass</button>
        </div>

        <div style={{background:'white', border:'1px solid #25D366', borderRadius:16, padding:20, marginTop:14}}>
          <a href="https://whatsapp.com/channel/0029Vb7eUeBGzzKTHPIaoe0b" target="_blank" style={{display:'flex', height:48, background:'#25D366', color:'white', fontWeight:900, borderRadius:12, alignItems:'center', justifyContent:'center', textDecoration:'none'}}>📱 Join WhatsApp Channel — Gigs + News</a>
        </div>

        <div style={{marginTop:14, background:'#fefce8', borderRadius:10, padding:12}}>
          <p style={{fontSize:11, margin:0, lineHeight:1.5}}><strong>Kpata Academy:</strong> FREE training community, not certifying body. We do NOT issue certificates. We log LAB+HW+Quiz to Google Sheet as evidence for Google/IBM/Microsoft. App Bot inside app. WhatsApp Channel only announcements.</p>
        </div>
      </div>

      {showLog && (
        <div style={{position:'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(0,0,0,0.6)', display:'flex', alignItems:'center', justifyContent:'center', padding:16, zIndex:60}}>
          <div style={{background:'white', borderRadius:16, padding:20, maxWidth:400, width:'100%'}}>
            {!saved ? (
              <><h3 style={{margin:0}}>📤 Submit {logType}</h3><input value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" style={{width:'100%', height:48, border:'1px solid #e2e8f0', borderRadius:10, padding:'0 12px', marginTop:12}}/><input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone" style={{width:'100%', height:48, border:'1px solid #e2e8f0', borderRadius:10, padding:'0 12px', marginTop:8}}/><button onClick={save} disabled={saving} style={{marginTop:12, width:'100%', height:52, background:saving?'#94a3b8':'#2563eb', color:'white', fontWeight:800, borderRadius:10, border:'none'}}>{saving?"Saving...":"✅ Save to Google Sheet"}</button><button onClick={()=>setShowLog(false)} style={{marginTop:8, width:'100%', height:44, background:'white', border:'1px solid #e2e8f0', borderRadius:10}}>Cancel</button></>
            ):(<><h3 style={{textAlign:'center'}}>✅ Saved!</h3><p style={{fontSize:12, textAlign:'center'}}>{name} — {logType} 5→4</p><a href="https://www.coursera.org/professional-certificates/google-data-analytics" target="_blank" style={{display:'block', background:'white', border:'1px solid #2563eb', borderRadius:8, padding:'10px', textAlign:'center', textDecoration:'none', fontWeight:700, fontSize:12, marginTop:8}}>🔗 Google Certificate Path</a><button onClick={()=>setShowLog(false)} style={{marginTop:8, width:'100%', height:44, background:'#111827', color:'white', borderRadius:10, border:'none'}}>Close</button></>)}
          </div>
        </div>
      )}

      <div style={{position:'fixed', bottom:0, left:0, right:0, background:'white', borderTop:'1px solid #e2e8f0', padding:'10px', display:'flex', justifyContent:'center', zIndex:40}}>
        <button onClick={()=>window.scrollTo({top:0, behavior:'smooth'})} style={{width:200, height:48, background:'#111827', color:'white', fontWeight:700, borderRadius:10, border:'none'}}>Top ↑ Back to Lesson</button>
      </div>

      {showQuiz && (
        <div style={{position:'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(0,0,0,0.6)', display:'flex', alignItems:'center', justifyContent:'center', padding:16, zIndex:50}}>
          <div style={{background:'white', borderRadius:16, padding:20, maxWidth:500, width:'100%'}}>
            {!done ? (
              <><div style={{display:'flex', justifyContent:'space-between'}}><h3 style={{margin:0}}>Q {cur+1}/5</h3><button onClick={()=>setShowQuiz(false)} style={{border:'none', background:'#f1f5f9', borderRadius:8, padding:'6px 12px'}}>✕</button></div><p style={{fontWeight:700, marginTop:16}}>{QUIZ[cur].q}</p><div style={{display:'grid', gap:10, marginTop:12}}>{QUIZ[cur].a.map((o,i)=><button key={i} onClick={()=>answer(i)} style={{textAlign:'left', padding:14, borderRadius:10, border:sel===i?'2px solid #7c3aed':'1px solid #e2e8f0', background:sel===i?'#f5f3ff':'white', minHeight:52}}>{o}</button>)}</div></>
            ):(
              <><h3 style={{margin:0, textAlign:'center'}}>{score>=4?'✅ Room Arranged!':'❌ Try Again'}</h3><p style={{textAlign:'center'}}>{score}/5</p>{score>=4 ? (<><button onClick={()=>{setShowQuiz(false); openLog("QUIZ");}} style={{marginTop:12, width:'100%', height:52, background:'#2563eb', color:'white', fontWeight:800, borderRadius:10, border:'none'}}>📤 Save Quiz</button></>): <button onClick={()=>{setCur(0); setScore(0); setDone(false); setSel(null);}} style={{marginTop:12, width:'100%', height:48, background:'#7c3aed', color:'white', fontWeight:700, borderRadius:10, border:'none'}}>Retake</button>}</>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
