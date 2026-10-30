"use client";
import React, { useState } from "react";
const QUIZ = [
  { q: "How many duplicates?", a: ["1 duplicate - Musa twice id=1","0","2"], correct: 0 },
  { q: "Which dates invalid?", a: ["2024-13-05 month 13","2024-05-15","All valid"], correct: 0 },
  { q: "What will you do with empty customer?", a: ["Fill Unknown or delete","Leave empty","Ignore"], correct: 0 },
  { q: "Why ␣Musa␣␣ fails grouping?", a: ["Hidden spaces - TRIM","Color wrong","Too big"], correct: 0 },
  { q: "After clean, how many rows?", a: ["4 clean from 5 dirty","5","3"], correct: 0 },
];
export default function Lesson1Combined(){
  const [q1,setQ1]=useState(""); const [q2,setQ2]=useState(""); const [q3,setQ3]=useState(""); const [fellow,setFellow]=useState("");
  const [showQuiz,setShowQuiz]=useState(false); const [cur,setCur]=useState(0); const [score,setScore]=useState(0); const [done,setDone]=useState(false); const [sel,setSel]=useState<number|null>(null);
  const [showLog,setShowLog]=useState(false); const [logType,setLogType]=useState("LAB"); const [name,setName]=useState(""); const [phone,setPhone]=useState(""); const [saving,setSaving]=useState(false); const [saved,setSaved]=useState(false); const [copied,setCopied]=useState(false);
  const [liveStep,setLiveStep]=useState(0);
  const CSV=`id,name,date,amount
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
  const STEPS = [
    { icon:"📄", title:"Step 0: Open Empty Sheet", short:"Open", desc:"Click green button → Google Sheet opens empty. Phone: File → Make a copy to your Drive.", color:"#f0fdf4", border:"#22c55e", detail:"Empty notebook — we write dirty list inside. This is how I taught you." },
    { icon:"📋", title:"Step 1: Paste 5 Dirty Rows", short:"Paste", desc:"Copy CSV below → Click A1 (first box top-left) → Paste (Ctrl+V or long press). You see all data in A column (clothes in one pile).", color:"#fefce8", border:"#f59e0b", detail:"If 1 column only: Don't worry! Next step splits it." },
    { icon:"✂", title:"Step 2: Split to Columns", short:"Split", desc:"Top menu: Data → Split text to columns → Comma. Now splits: A=id, B=name, C=date, D=amount. B2 = ␣Musa␣␣ dirty! Dirty room.", color:"#eff6ff", border:"#3b82f6", detail:"Phone: Tap ... More → Data → Split. Separates clothes by type." },
    { icon:"📍", title:"Step 3: Find B2 — Visual Map", short:"B2 Map", desc:"B2 = Column B meets Row 2 = ␣Musa␣␣ dirty. E2 = Empty box 3 steps right where we type formula. Yellow = dirty, Green = clean box. I show you picture below.", color:"#fdf4ff", border:"#a855f7", detail:"B = Second column, 2 = Second row. Row 1 header, Row 2 first data." },
    { icon:"✨", title:"Step 4: TRIM — Fold Shirt", short:"TRIM", desc:"Click E1 → Type clean name → Enter. Click E2 → Type =TRIM(B2) → Enter. Magic! E2 shows Musa clean — spaces removed like folding shirt.", color:"#f0fdf4", border:"#16a34a", detail:"=TRIM removes spaces left/right. ␣Musa␣␣ → Musa." },
    { icon:"🔵", title:"Step 5: Drag Blue Circle", short:"Drag", desc:"Find small blue circle bottom-right of E2 (phone: tiny blue dot). Press and drag down to E6. All names cleaned instantly! E3 Musa, E4 Amina, E5 N/A, E6 John Doe.", color:"#fffbeb", border:"#f59e0b", detail:"Blue circle = Fill handle. Excel copies formula fast! This is arranging whole room in 2 seconds." },
    { icon:"🛠", title:"Step 6: Fix Date + Duplicate + Empty", short:"Fix 3", desc:"C2 2024-13-05 → 2024-05-05 (month 13 no exist). Data → Remove duplicates → Check id → Remove (id=1 duplicate shirt). B4 empty → Type Unknown (fill empty shoe box). Now 4 clean rows from 5 dirty! Now answer Q1 Q2 Q3 below.", color:"#fef2f2", border:"#ef4444", detail:"You fixed 4 dirts: spaces, duplicate, invalid date, empty. Google Data Analytics skill!" },
  ];
  const answer=(i:number)=>{setSel(i); setTimeout(()=>{ if(i===QUIZ[cur].correct) setScore(s=>s+1); if(cur<4){setCur(c=>c+1); setSel(null);} else setDone(true);},300);}
  const openLog=(t:string)=>{setLogType(t); setShowLog(true); setSaved(false);};
  const save=async()=>{
    if(!name||!phone){alert("Enter name and phone"); return;}
    if(logType==="LAB" && (!q1||!q2||!q3)){alert("Answer 3 questions first: duplicates, dates, empty"); return;}
    if(logType==="FELLOW" && !fellow){alert("Explain duplicate in simple English"); return;}
    setSaving(true);
    const URL="https://script.google.com/macros/s/AKfycbxiWGrdTSguuZdixWtERJgeYCXgQS48ZKTnTdYqOPQn16dij7WFl499URHC3quaCCqZ/exec";
    const p={timestamp:new Date().toISOString(), name, phone, type:logType, q1, q2, q3, fellow, liveStep:STEPS[liveStep].title, details:`${logType} Q1:${q1} Q2:${q2} Q3:${q3} Fellow:${fellow} Live:${STEPS[liveStep].short} Quiz ${score}/5`, score:logType==="QUIZ"?score:"", source:"Kpata_Lesson1_LiveTutor_Combined_v11"};
    try{ const l=JSON.parse(localStorage.getItem("kpata_logs")||"[]"); l.push(p); localStorage.setItem("kpata_logs",JSON.stringify(l)); await fetch(URL,{method:"POST",mode:"no-cors",body:JSON.stringify(p)}); setSaved(true);}catch{setSaved(true);} setSaving(false);
  };
  return (
    <div style={{minHeight:'100vh', background:'#f8fafc', padding:'16px 16px 120px', fontFamily:'system-ui'}}>
      <div style={{maxWidth:780, margin:'0 auto'}}>
        {/* HEADER */}
        <div style={{background:'white', border:'1px solid #e2e8f0', borderRadius:16, padding:20}}>
          <h1 style={{margin:0, fontSize:20, fontWeight:900}}>LESSON 1: What is Dirty Data? • 20 min • FREE</h1>
          <p style={{fontSize:12, color:'#64748b', marginTop:6}}>Phone-friendly • Simple English • Live Tutor Included</p>
          <a href="https://www.coursera.org/professional-certificates/google-data-analytics" target="_blank" style={{display:'flex', height:44, background:'#1a73e8', color:'white', fontWeight:700, fontSize:12, borderRadius:10, alignItems:'center', justifyContent:'center', textDecoration:'none', marginTop:12}}>🔗 Backup: Google Data Analytics Official</a>
        </div>

        {/* PART 1: LESSON */}
        <div style={{marginTop:14, background:'white', borderRadius:16, padding:20, border:'1px solid #e2e8f0'}}>
          <h2 style={{margin:0, fontSize:18, fontWeight:800}}>📖 Part 1: Lesson — Dirty Room Analogy</h2>
          <p style={{fontSize:13, lineHeight:1.8, marginTop:12}}>Dirty data is like a <strong>dirty room with clothes on the ground</strong> — you cannot find your shoes until you arrange the room. Shirts on chair, trousers on floor, socks under bed. You want to go out, you cannot find your belt. Why? Room dirty, not arranged.</p>
          <div style={{marginTop:14, display:'grid', gap:10, fontSize:12, lineHeight:1.7}}>
            <div style={{background:'#fef3c7', border:'1px solid #fde68a', padding:12, borderRadius:10}}><strong>Step 1: Fix duplicates</strong><br/>Before: 2 identical rows for Musa → After: 1 row<br/>How: Data → Remove duplicates → Check id. Same shirt twice, throw one.</div>
            <div style={{background:'#fee2e2', border:'1px solid #fecaca', padding:12, borderRadius:10}}><strong>Step 2: Fix invalid dates</strong><br/>Date that cannot exist. Example: 2024-13-05 (month 13 no exist).<br/>How: Make all dates same format YYYY-MM-DD. Fix month 13 → ask correct month or delete row.<br/><code style={{background:'#f1f5f9', padding:'4px 8px', borderRadius:6, display:'inline-block', marginTop:6}}>2024-13-05 → Invalid → Correct to 2024-05-05</code></div>
            <div style={{background:'#fef2f2', border:'1px solid #fecaca', padding:12, borderRadius:10}}><strong>Step 3: Handle missing data</strong><br/>Cell empty. Example: name = "" (no name).<br/>How: Fill with 0 or "Unknown" or delete row.<br/><code style={{background:'#f1f5f9', padding:'4px 8px', borderRadius:6, display:'inline-block', marginTop:6}}>amount "" → fill with 0 or average 400</code></div>
            <div style={{background:'#f0fdf4', border:'1px solid #bbf7d0', padding:12, borderRadius:10}}><strong>Step 4: Trim extra spaces</strong><br/>Name " Musa " has spaces. Computer sees " Musa " different from "Musa".<br/>How: Use =TRIM() function. =TRIM(" Musa ") → "Musa"<br/><code style={{background:'#f1f5f9', padding:'4px 8px', borderRadius:6, display:'inline-block', marginTop:6}}>" Musa " → TRIM → "Musa"</code></div>
          </div>
        </div>

        {/* PART 2: EXAMPLE TABLE */}
        <div style={{marginTop:14, background:'white', borderRadius:16, padding:20, border:'1px solid #e2e8f0', overflowX:'auto'}}>
          <h2 style={{margin:'0 0 10px', fontSize:16, fontWeight:800}}>📊 Example dirty data (what you will clean) — 5→4</h2>
          <table style={{width:'100%', borderCollapse:'collapse', fontSize:12, minWidth:400}}>
            <thead><tr style={{background:'#f8fafc'}}><th style={{border:'1px solid #e2e8f0', padding:10}}>id</th><th style={{border:'1px solid #e2e8f0', padding:10}}>name</th><th style={{border:'1px solid #e2e8f0', padding:10}}>date</th><th style={{border:'1px solid #e2e8f0', padding:10}}>amount</th></tr></thead>
            <tbody>
              <tr><td style={{border:'1px solid #e2e8f0', padding:10}}>1</td><td style={{border:'1px solid #e2e8f0', padding:10, background:'#fef3c7'}}><span style={{background:'#fef9c3', border:'1px dashed #f59e0b', padding:'4px 8px', borderRadius:6, fontFamily:'monospace', fontWeight:800}}>␣Musa␣␣</span></td><td style={{border:'1px solid #e2e8f0', padding:10, background:'#fee2e2'}}>2024-13-05</td><td style={{border:'1px solid #e2e8f0', padding:10}}>500</td></tr>
              <tr><td style={{border:'1px solid #e2e8f0', padding:10}}>1</td><td style={{border:'1px solid #e2e8f0', padding:10}}>Musa (duplicate)</td><td style={{border:'1px solid #e2e8f0', padding:10}}>2024-13-05</td><td style={{border:'1px solid #e2e8f0', padding:10}}>500</td></tr>
              <tr><td style={{border:'1px solid #e2e8f0', padding:10}}>3</td><td style={{border:'1px solid #e2e8f0', padding:10}}>Amina</td><td style={{border:'1px solid #e2e8f0', padding:10}}>2024-05-15</td><td style={{border:'1px solid #e2e8f0', padding:10}}>600</td></tr>
              <tr><td style={{border:'1px solid #e2e8f0', padding:10}}>4</td><td style={{border:'1px solid #e2e8f0', padding:10, background:'#fee2e2'}}>(empty)</td><td style={{border:'1px solid #e2e8f0', padding:10}}>2024-05-20</td><td style={{border:'1px solid #e2e8f0', padding:10}}>400</td></tr>
              <tr><td style={{border:'1px solid #e2e8f0', padding:10}}>5</td><td style={{border:'1px solid #e2e8f0', padding:10}}>John Doe</td><td style={{border:'1px solid #e2e8f0', padding:10}}>2024-05-18</td><td style={{border:'1px solid #e2e8f0', padding:10}}>300</td></tr>
            </tbody>
          </table>
        </div>

        {/* PART 3: LIVE TUTOR TAKES OVER */}
        <div style={{marginTop:14, background:'white', borderRadius:16, padding:20, border:'2px solid #16a34a'}}>
          <h2 style={{margin:0, fontSize:18, fontWeight:800}}>🎥 Part 2: Live Tutor Takes Over — Step by Step (How I Taught You)</h2>
          <p style={{fontSize:11, color:'#166534', background:'#dcfce7', padding:8, borderRadius:8, marginTop:10}}>After reading lesson above, live tutor now instructs you how to clean data — click steps below, follow exactly. This is how I taught you live.</p>
          <div style={{marginTop:12, display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(110px, 1fr))', gap:8}}>
            {STEPS.map((s,i)=><button key={i} onClick={()=>setLiveStep(i)} style={{minHeight:68, borderRadius:12, border:liveStep===i?`2px solid ${s.border}`:'1px solid #e2e8f0', background:liveStep===i?s.color:'white', fontSize:11, fontWeight:liveStep===i?800:600, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:4}}><span style={{fontSize:20}}>{s.icon}</span>{s.short}<span style={{fontSize:9, opacity:0.7}}>{i}/7</span></button>)}
          </div>
          <div style={{marginTop:14, background:STEPS[liveStep].color, border:`2px solid ${STEPS[liveStep].border}`, borderRadius:12, padding:16}}>
            <h3 style={{margin:0, fontSize:14, fontWeight:800}}>{STEPS[liveStep].icon} {STEPS[liveStep].title}</h3>
            <p style={{fontSize:12, marginTop:10, lineHeight:1.7}}>{STEPS[liveStep].desc}</p>
            <p style={{fontSize:11, marginTop:8, background:'rgba(255,255,255,0.7)', padding:8, borderRadius:8}}><strong>Tip:</strong> {STEPS[liveStep].detail}</p>
            {liveStep===3 && (
              <div style={{marginTop:12, background:'white', borderRadius:10, padding:12, border:'1px solid #e2e8f0', overflowX:'auto'}}>
                <p style={{fontSize:11, fontWeight:800}}>📍 Visual Map: Where is B2? Where is E2?</p>
                <table style={{borderCollapse:'collapse', fontSize:12, width:'100%', minWidth:480, marginTop:8}}>
                  <thead><tr><th style={{border:'1px solid #e2e8f0', padding:8, background:'#f1f5f9'}}></th><th style={{border:'1px solid #e2e8f0', padding:8, background:'#f1f5f9'}}>A</th><th style={{border:'3px solid #f59e0b', padding:8, background:'#fef3c7'}}>B ← Dirty</th><th style={{border:'1px solid #e2e8f0', padding:8, background:'#f1f5f9'}}>C</th><th style={{border:'1px solid #e2e8f0', padding:8, background:'#f1f5f9'}}>D</th><th style={{border:'3px solid #22c55e', padding:8, background:'#dcfce7'}}>E ← Clean</th></tr></thead>
                  <tbody><tr><td style={{border:'1px solid #e2e8f0', padding:8, fontWeight:800, background:'#f1f5f9'}}>2</td><td style={{border:'1px solid #e2e8f0', padding:8}}>1</td><td style={{border:'3px solid #f59e0b', background:'#fef3c7', padding:10, fontFamily:'monospace', fontWeight:900, textAlign:'center'}}>B2 = ␣Musa␣␣<br/><span style={{fontSize:10}}>Dirty shirt</span></td><td style={{border:'1px solid #e2e8f0', padding:8}}>2024-13-05</td><td style={{border:'1px solid #e2e8f0', padding:8}}>500</td><td style={{border:'3px solid #22c55e', background:'#dcfce7', padding:10, fontWeight:900, textAlign:'center'}}>E2 = =TRIM(B2)<br/><span style={{fontSize:10}}>Type here!</span></td></tr></tbody>
                </table>
              </div>
            )}
            <div style={{marginTop:12, display:'flex', gap:8}}>
              <button onClick={()=>setLiveStep(s=>Math.max(0,s-1))} disabled={liveStep===0} style={{flex:1, height:44, borderRadius:10, border:'1px solid #e2e8f0', background:liveStep===0?'#f1f5f9':'white', fontWeight:700, fontSize:12}}>← Prev</button>
              <button onClick={()=>setLiveStep(s=>Math.min(6,s+1))} disabled={liveStep===6} style={{flex:1, height:44, borderRadius:10, border:'none', background:liveStep===6?'#e2e8f0':'#111827', color:liveStep===6?'#64748b':'white', fontWeight:700, fontSize:12}}>{liveStep===6?"Live Done! Answer Qs →":"Next →"}</button>
            </div>
          </div>
          <div style={{marginTop:14, background:'#f0fdf4', borderRadius:10, padding:12}}>
            <a href="https://docs.google.com/spreadsheets/create" target="_blank" style={{display:'flex', height:52, background:'#16a34a', color:'white', fontWeight:800, fontSize:13, borderRadius:12, alignItems:'center', justifyContent:'center', textDecoration:'none'}}>🔗 Open Google Sheet — Free</a>
            <button onClick={()=>{navigator.clipboard.writeText(CSV); setCopied(true); setTimeout(()=>setCopied(false),2000);}} style={{marginTop:10, width:'100%', height:48, background:'white', border:'2px solid #16a34a', borderRadius:12, fontWeight:800, fontSize:12}}>{copied?"✅ Copied! Paste in A1":"📋 Copy Dirty CSV — 5 rows"}</button>
            <div style={{marginTop:8, background:'white', borderRadius:8, padding:8, fontFamily:'monospace', fontSize:11, whiteSpace:'pre-wrap', border:'1px dashed #86efac', maxHeight:100, overflowY:'auto'}}>{CSV}</div>
            <div style={{marginTop:8, background:'white', borderRadius:8, padding:8, fontSize:11, fontFamily:'monospace', border:'2px solid #16a34a'}}><strong>✅ Final 4 rows you should get:</strong><br/>{CSV_CLEAN}</div>
          </div>
        </div>

        {/* PART 4: QUESTIONS + FELLOW */}
        <div style={{background:'white', border:'2px solid #f59e0b', borderRadius:16, padding:20, marginTop:14}}>
          <h2 style={{margin:0, fontSize:16, fontWeight:800}}>❓ Part 3: Answer and Submit LAB — Live Tutor Checks</h2>
          <p style={{fontSize:11, color:'#92400e', background:'#fffbeb', padding:8, borderRadius:8, marginTop:8}}>After live tutor, answer these — LAB submits to Google Sheet as evidence for Google cert.</p>
          <div style={{display:'grid', gap:12, marginTop:12}}>
            <div><label style={{fontSize:12, fontWeight:700}}>1) How many duplicates?</label><input value={q1} onChange={e=>setQ1(e.target.value)} placeholder="e.g. 1 duplicate - Musa twice id=1" style={{width:'100%', height:48, border:'1px solid #f59e0b', borderRadius:10, padding:'0 12px', marginTop:6, fontSize:13}}/></div>
            <div><label style={{fontSize:12, fontWeight:700}}>2) Which dates invalid?</label><input value={q2} onChange={e=>setQ2(e.target.value)} placeholder="e.g. 2024-13-05 - month 13 doesn't exist" style={{width:'100%', height:48, border:'1px solid #f59e0b', borderRadius:10, padding:'0 12px', marginTop:6, fontSize:13}}/></div>
            <div><label style={{fontSize:12, fontWeight:700}}>3) What will you do with empty customer?</label><input value={q3} onChange={e=>setQ3(e.target.value)} placeholder="e.g. Fill Unknown or delete row" style={{width:'100%', height:48, border:'1px solid #f59e0b', borderRadius:10, padding:'0 12px', marginTop:6, fontSize:13}}/></div>
          </div>
          <button onClick={()=>openLog("LAB")} style={{marginTop:14, width:'100%', height:56, background:'#2563eb', color:'white', fontWeight:900, fontSize:15, borderRadius:12, border:'none'}}>🤖 Submit LAB — Live Tutor Done + 3 Answers</button>
        </div>

        <div style={{background:'white', border:'1px solid #8b5cf6', borderRadius:16, padding:20, marginTop:14}}>
          <h2 style={{margin:0, fontSize:16, fontWeight:800}}>👥 Fellow Student Check: Did you understand?</h2>
          <p style={{fontSize:12, background:'#f5f3ff', padding:10, borderRadius:8, marginTop:10}}>Can you explain in simple English: What is duplicate and how to fix? Teach fellow student.</p>
          <textarea value={fellow} onChange={e=>setFellow(e.target.value)} placeholder="e.g. Duplicate means same person appears 2 times like Musa id=1 twice. Fix: Data → Remove duplicates → Check id → Remove. Like same shirt twice in dirty room, throw one..." style={{width:'100%', minHeight:80, border:'2px solid #8b5cf6', borderRadius:12, padding:'12px', marginTop:12, fontSize:13}}/>
          <button onClick={()=>openLog("FELLOW")} style={{marginTop:10, width:'100%', height:48, background:'#7c3aed', color:'white', fontWeight:800, fontSize:14, borderRadius:12, border:'none'}}>📤 Submit Fellow Check</button>
        </div>

        <div style={{background:'white', border:'1px solid #8b5cf6', borderRadius:16, padding:20, marginTop:14}}>
          <h2 style={{margin:0, fontSize:18, fontWeight:800}}>🎯 Part 4: QUIZ — 5 Questions — 80% Pass</h2>
          <button onClick={()=>setShowQuiz(true)} style={{marginTop:12, width:'100%', height:56, background:'#7c3aed', color:'white', fontWeight:900, fontSize:15, borderRadius:12, border:'none'}}>🚀 Take Quiz — Live Tutor + Questions</button>
        </div>

        <div style={{background:'white', border:'1px solid #25D366', borderRadius:16, padding:20, marginTop:14}}>
          <a href="https://whatsapp.com/channel/0029Vb7eUeBGzzKTHPIaoe0b" target="_blank" style={{display:'flex', height:48, background:'#25D366', color:'white', fontWeight:900, borderRadius:12, alignItems:'center', justifyContent:'center', textDecoration:'none'}}>📱 Join WhatsApp Channel</a>
        </div>

        <div style={{marginTop:14, background:'#fefce8', borderRadius:10, padding:12}}><p style={{fontSize:11, margin:0}}><strong>Kpata Academy:</strong> FREE training community, not certifying body. We do NOT issue certificates. We log LAB+HW+Quiz to Google Sheet as evidence for Google/IBM/Microsoft. Training only.</p></div>
      </div>

      {showLog && (
        <div style={{position:'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(0,0,0,0.6)', display:'flex', alignItems:'center', justifyContent:'center', padding:16, zIndex:60}}>
          <div style={{background:'white', borderRadius:16, padding:20, maxWidth:420, width:'100%'}}>
            {!saved ? (
              <><h3 style={{margin:0}}>📤 Submit {logType} — Live + Lesson Combined</h3><input value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" style={{width:'100%', height:48, border:'1px solid #e2e8f0', borderRadius:10, padding:'0 12px', marginTop:12}}/><input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone" style={{width:'100%', height:48, border:'1px solid #e2e8f0', borderRadius:10, padding:'0 12px', marginTop:8}}/><button onClick={save} disabled={saving} style={{marginTop:12, width:'100%', height:52, background:saving?'#94a3b8':'#2563eb', color:'white', fontWeight:800, borderRadius:10, border:'none'}}>{saving?"Saving...":"✅ Save to Google Sheet"}</button><button onClick={()=>setShowLog(false)} style={{marginTop:8, width:'100%', height:44, background:'white', border:'1px solid #e2e8f0', borderRadius:10}}>Cancel</button></>
            ):(<><h3 style={{textAlign:'center'}}>✅ Saved!</h3><p style={{fontSize:12, textAlign:'center'}}>{name} — {logType} — Live Tutor + Lesson</p><button onClick={()=>setShowLog(false)} style={{marginTop:8, width:'100%', height:44, background:'#111827', color:'white', borderRadius:10, border:'none'}}>Close</button></>)}
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
              <><h3 style={{margin:0, textAlign:'center'}}>{score>=4?'✅ Perfect!':'❌ Try Again'}</h3><p style={{textAlign:'center'}}>{score}/5</p>{score>=4 ? (<><button onClick={()=>{setShowQuiz(false); openLog("QUIZ");}} style={{marginTop:12, width:'100%', height:52, background:'#2563eb', color:'white', fontWeight:800, borderRadius:10, border:'none'}}>📤 Save Quiz — Live Tutor Complete</button></>): <button onClick={()=>{setCur(0); setScore(0); setDone(false); setSel(null);}} style={{marginTop:12, width:'100%', height:48, background:'#7c3aed', color:'white', fontWeight:700, borderRadius:10, border:'none'}}>Retake</button>}</>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
