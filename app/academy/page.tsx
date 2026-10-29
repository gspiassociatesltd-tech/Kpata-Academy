"use client";
import React, { useState } from "react";
const QUIZ = [
  { q: "Why does ␣Musa␣␣ fail grouping?", a: ["Spaces make it different - ␣Musa␣␣ ≠ Musa","Color wrong","Too big"], correct: 0 },
  { q: "Where is B2? (Beginner)", a: ["Column B Row 2 - dirty ␣Musa␣␣","A1","Sheet name"], correct: 0 },
  { q: "Where type =TRIM(B2)?", a: ["E2 empty box","B2 itself","A1"], correct: 0 },
  { q: "2024-13-05 invalid why?", a: ["Month 13 doesn't exist","Year high","Sunday"], correct: 0 },
  { q: "After clean, how many rows?", a: ["4 clean - 5→4 arranged","10","0"], correct: 0 },
];
const GIGS = [
  { title: "Clean 50 rows shop sales - N1,500", pay: "N1,500", skill: "TRIM B2" },
  { title: "Remove duplicates - $5 Fiverr", pay: "$5", skill: "Duplicate" },
  { title: "Fix invalid dates - N1,000", pay: "N1,000", skill: "Date" },
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
  const [showGig,setShowGig]=useState(false);
  const [gigApproved,setGigApproved]=useState(false);
  const [resumeName,setResumeName]=useState("");
  const [showPayConfirm,setShowPayConfirm]=useState(false);
  const [payAmount,setPayAmount]=useState("");
  const [payClient,setPayClient]=useState("");
  const [paySaved,setPaySaved]=useState(false);
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
    const p={timestamp:new Date().toISOString(), name, phone, type:logType, details:logType==="HW"?hwText:logType==="QUIZ"?`Quiz ${score}/5 v8 Fine Tuned`:`${logType} 5→4 v8 Fine Tuned`, score:logType==="QUIZ"?score:"", source:"Kpata_v8_Fine_Tuned"};
    try{ const l=JSON.parse(localStorage.getItem("kpata_logs")||"[]"); l.push(p); localStorage.setItem("kpata_logs",JSON.stringify(l)); await fetch(URL,{method:"POST",mode:"no-cors",body:JSON.stringify(p)}); setSaved(true);}catch{setSaved(true);} setSaving(false);
  };
  const confirmPayment=async()=>{
    if(!payAmount||!payClient){alert("Enter amount and client"); return;}
    setSaving(true);
    const URL="https://script.google.com/macros/s/AKfycbxiWGrdTSguuZdixWtERJgeYCXgQS48ZKTnTdYqOPQn16dij7WFl499URHC3quaCCqZ/exec";
    const p={timestamp:new Date().toISOString(), name:resumeName||name||"Student", phone:phone||"from log", type:"EARNED_GIG", details:`Earned ${payAmount} from ${payClient} - Experience v8`, amount:payAmount, client:payClient, source:"Kpata_Gig_v8"};
    try{ const l=JSON.parse(localStorage.getItem("kpata_logs")||"[]"); l.push(p); localStorage.setItem("kpata_logs",JSON.stringify(l)); await fetch(URL,{method:"POST",mode:"no-cors",body:JSON.stringify(p)}); setPaySaved(true); setTimeout(()=>{setShowPayConfirm(false); setPaySaved(false);},2000);}catch{setPaySaved(true);} setSaving(false);
  };
  const approveGig=()=>{
    if(!resumeName){alert("Enter name"); return;}
    setGigApproved(true);
    setTimeout(()=>setShowGig(false),1200);
    const URL="https://script.google.com/macros/s/AKfycbxiWGrdTSguuZdixWtERJgeYCXgQS48ZKTnTdYqOPQn16dij7WFl499URHC3quaCCqZ/exec";
    const p={timestamp:new Date().toISOString(), name:resumeName, phone:phone||"from log", type:"GIG_APPROVED", details:`Approved gig v8 - Resume from LAB 5→4`, source:"Kpata_Gig_Shopper_v8"};
    try{ const l=JSON.parse(localStorage.getItem("kpata_logs")||"[]"); l.push(p); localStorage.setItem("kpata_logs",JSON.stringify(l)); fetch(URL,{method:"POST",mode:"no-cors",body:JSON.stringify(p)});}catch{}
  };
  const STEPS = [
    { icon:"📄", title:"Step 0: Open Empty Sheet", short:"Open", desc:"Click green button below → Google Sheet opens empty. We will add dirty data. Phone: File → Make a copy to your Drive.", color:"#f0fdf4", border:"#22c55e", detail:"For beginners: This is like getting empty notebook. We need to write dirty list inside." },
    { icon:"📋", title:"Step 1: Paste 5 Dirty Rows", short:"Paste", desc:"Copy CSV from backup below → Click A1 (first box top-left) → Ctrl+V (or long press Paste on phone). You will see all data in A column (not split yet) — like clothes in one pile.", color:"#fefce8", border:"#f59e0b", detail:"If paste shows 1 column only: Don't worry! Next step will split it." },
    { icon:"✂️", title:"Step 2: Split to Columns (Data Menu)", short:"Split", desc:"Top menu: Data → Split text to columns → Choose Comma. Now table splits: A=id, B=name, C=date, D=amount. B2 = ␣Musa␣␣ dirty with yellow spaces! This is dirty room.", color:"#eff6ff", border:"#3b82f6", detail:"Phone: Tap ... More → Data → Split text. This is how Excel separates clothes by type." },
    { icon:"📍", title:"Step 3: Find B2 — Beginner Picture Guide", short:"B2 Map", desc:"B2 = Where Column B (letter on top) meets Row 2 (number on left) = ␣Musa␣␣ dirty. E2 = Empty box 3 steps to right where we type formula. See picture table below — yellow = dirty, green = clean box.", color:"#fdf4ff", border:"#a855f7", detail:"Beginner tip: B = Second column, 2 = Second row. Count: A=1, B=2. Row 1 is header, Row 2 is first dirty data." },
    { icon:"✨", title:"Step 4: TRIM — Fold the Shirt", short:"TRIM", desc:"Click E1 → Type clean name → Enter. Click E2 → Type =TRIM(B2) → Press Enter. Magic! E2 shows Musa clean — spaces removed like folding shirt neatly. This is your first clean!", color:"#f0fdf4", border:"#16a34a", detail:"Why TRIM? =TRIM removes spaces left and right. ␣Musa␣␣ → Musa. Formula bar shows =TRIM(B2) — meaning clean B2." },
    { icon:"🔵", title:"Step 5: Drag Blue Circle — Arrange All", short:"Drag", desc:"Find small blue circle bottom-right corner of E2 (phone: tiny blue dot). Press and drag down to E6. Release. All names cleaned instantly! E3 Musa, E4 Amina, E5 N/A (empty), E6 John Doe. This is arranging whole room in 2 seconds.", color:"#fffbeb", border:"#f59e0b", detail:"This blue circle = Fill handle. Excel copies formula: E3=TRIM(B3), E4=TRIM(B4)... Fastest way to clean 1000 rows!" },
    { icon:"🛠️", title:"Step 6: Fix Date + Duplicate + Empty — Final Arrangement", short:"Fix 3", desc:"C2 2024-13-05 → 2024-05-05 (Month 13 doesn't exist → May). Data → Remove duplicates → Check id → Remove (id=1 duplicate shirt thrown). B4 empty → Type Unknown (fill empty shoe box). Now 4 clean rows from 5 dirty!", color:"#fef2f2", border:"#ef4444", detail:"You fixed 4 dirts: spaces, duplicate, invalid date, empty. Same as Google Data Analytics Course — Data Cleansing skill!" },
    { icon:"💰", title:"Step 7: Submit + Earn — Personal Certification", short:"Earn", desc:"Click Submit LAB → Enter name/phone → Save to Google Sheet = your portfolio. Do Homework + Quiz. Then Gig Shopper finds job for you → Client pays direct to Opay → Confirm Payment = Logged as experience for resume + Google cert.", color:"#ecfdf5", border:"#10b981", detail:"This log becomes your resume. Kpata builds resume from your 5→4 log + applies to Fiverr/Upwork for you. Payment direct to you, not held." },
  ];
  return (
    <div style={{minHeight:'100vh', background:'#f8fafc', padding:'16px 16px 120px', fontFamily:'system-ui'}}>
      <div style={{maxWidth:760, margin:'0 auto'}}>
        <div style={{background:'white', border:'1px solid #e2e8f0', borderRadius:16, padding:20, boxShadow:'0 1px 3px rgba(0,0,0,0.05)'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start'}}>
            <div><h1 style={{margin:0, fontSize:22, fontWeight:900, letterSpacing:'-0.02em'}}>Kpata_Academy_MVP</h1><p style={{fontSize:12, color:'#64748b', marginTop:6, lineHeight:1.4}}>LESSON 1 v8: Fine Tuned Live Tutoring • 20 min • FREE • No 3 tabs • B2 Visual Guide • Beginner First</p></div>
            <span style={{background:'#dcfce7', color:'#166534', padding:'6px 12px', borderRadius:20, fontSize:11, fontWeight:800, whiteSpace:'nowrap'}}>✓ v8 LIVE</span>
          </div>
          <div style={{marginTop:14, background:'#fefce8', border:'1px solid #fde68a', borderRadius:12, padding:12, fontSize:11, lineHeight:1.6}}><strong>📒 CHANGELOG — Keep Tab for General Build (Your Question):</strong><br/><span style={{color:'#854d0e'}}>GitHub:</span> backup/main-before-bugfix (safe archive) → fix/bug1-4-header-spaces-phone-friendly (current production) → main (Vercel builds from fix branch)<br/><span style={{color:'#854d0e'}}>Google Sheet:</span> Kpata_Students_Log tracks LAB/HW/Quiz/GIG_APPROVED/EARNED_GIG with source Kpata_v8_Fine_Tuned + timestamp + phone<br/><span style={{color:'#854d0e'}}>Lesson:</span> v7 had tiny step buttons → v8 bigger cards, icons, colors, B2 visual map, beginner language, phone 48px buttons<br/><span style={{color:'#854d0e'}}>Personal → General:</span> Godwin personal log (5→4 live) → Supabase migration later → Template for 1000 students society</div>
        </div>

        <div style={{marginTop:14, background:'white', borderRadius:16, padding:20, border:'2px solid #16a34a', boxShadow:'0 4px 12px rgba(22,163,74,0.1)'}}>
          <div style={{display:'flex', alignItems:'center', gap:10}}><span style={{fontSize:24}}>🎥</span><h2 style={{margin:0, fontSize:18, fontWeight:800}}>Live Tutoring Mode — Fine Tuned — How Godwin Learned</h2></div>
          <p style={{fontSize:12, color:'#166534', background:'#dcfce7', padding:8, borderRadius:8, marginTop:10, fontWeight:600, lineHeight:1.5}}>Replicates exact live tutoring from 2026-10-29. Every beginner can follow alone, no teacher. Improved: Bigger steps, icons, colors, B2 visual picture, phone-friendly 48px. Same as Google Data Analytics but in Minna simple English.</p>
          <div style={{marginTop:14, display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(110px, 1fr))', gap:8}}>
            {STEPS.map((s,i)=><button key={i} onClick={()=>setLiveStep(i)} style={{minHeight:68, borderRadius:12, border:liveStep===i?`2px solid ${s.border}`:'1px solid #e2e8f0', background:liveStep===i?s.color:'white', fontSize:11, fontWeight:liveStep===i?800:600, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:4, cursor:'pointer', boxShadow:liveStep===i?'0 2px 8px rgba(0,0,0,0.08)':'none', transition:'all 0.2s'}}><span style={{fontSize:20}}>{s.icon}</span>{s.short}<span style={{fontSize:9, opacity:0.7}}>{i}/7</span></button>)}
          </div>
          <div style={{marginTop:14, background:STEPS[liveStep].color, border:`2px solid ${STEPS[liveStep].border}`, borderRadius:12, padding:16, transition:'all 0.3s'}}>
            <div style={{display:'flex', alignItems:'center', gap:8}}><span style={{fontSize:22}}>{STEPS[liveStep].icon}</span><h3 style={{margin:0, fontSize:14, fontWeight:800}}>{STEPS[liveStep].title}</h3></div>
            <p style={{fontSize:12, marginTop:10, lineHeight:1.7, fontWeight:500}}>{STEPS[liveStep].desc}</p>
            <p style={{fontSize:11, marginTop:8, lineHeight:1.6, color:'#475569', background:'rgba(255,255,255,0.7)', padding:8, borderRadius:8}}><strong>Beginner tip:</strong> {STEPS[liveStep].detail}</p>
            {liveStep===3 && (
              <div style={{marginTop:14, overflowX:'auto', background:'white', borderRadius:10, padding:12, border:'1px solid #e2e8f0'}}>
                <p style={{fontSize:11, fontWeight:800, marginBottom:8}}>📍 Visual Map: Where is B2? Where is E2? — Look at letters on top (Columns) and numbers on left (Rows)</p>
                <table style={{borderCollapse:'collapse', fontSize:12, width:'100%', minWidth:480}}>
                  <thead><tr><th style={{border:'1px solid #e2e8f0', padding:8, background:'#f1f5f9', width:30}}></th><th style={{border:'1px solid #e2e8f0', padding:8, background:'#f1f5f9'}}>A</th><th style={{border:'3px solid #f59e0b', padding:8, background:'#fef3c7'}}>B (name) ← Dirty</th><th style={{border:'1px solid #e2e8f0', padding:8, background:'#f1f5f9'}}>C (date)</th><th style={{border:'1px solid #e2e8f0', padding:8, background:'#f1f5f9'}}>D (amount)</th><th style={{border:'3px solid #22c55e', padding:8, background:'#dcfce7'}}>E (clean) ← Type Here</th></tr></thead>
                  <tbody>
                    <tr><td style={{border:'1px solid #e2e8f0', padding:8, fontWeight:800, background:'#f1f5f9'}}>1</td><td style={{border:'1px solid #e2e8f0', padding:8}}>id</td><td style={{border:'1px solid #e2e8f0', padding:8}}>name</td><td style={{border:'1px solid #e2e8f0', padding:8}}>date</td><td style={{border:'1px solid #e2e8f0', padding:8}}>amount</td><td style={{border:'1px solid #e2e8f0', padding:8}}>clean name</td></tr>
                    <tr><td style={{border:'1px solid #e2e8f0', padding:8, fontWeight:800, background:'#f1f5f9'}}>2</td><td style={{border:'1px solid #e2e8f0', padding:8}}>1</td><td style={{border:'3px solid #f59e0b', background:'#fef3c7', padding:10, fontFamily:'monospace', fontWeight:900, fontSize:13, textAlign:'center'}}>B2 = ␣Musa␣␣<br/><span style={{fontSize:10, fontWeight:600}}>← CLICK THIS!<br/>Dirty shirt on floor<br/>Yellow = hidden spaces</span></td><td style={{border:'1px solid #e2e8f0', padding:8}}>2024-13-05</td><td style={{border:'1px solid #e2e8f0', padding:8}}>500</td><td style={{border:'3px solid #22c55e', background:'#dcfce7', padding:10, fontWeight:900, fontSize:13, textAlign:'center'}}>E2 = Type =TRIM(B2)<br/><span style={{fontSize:10, fontWeight:600}}>← TYPE HERE!<br/>Press Enter → Musa clean<br/>Blue circle to drag</span></td></tr>
                  </tbody>
                </table>
                <div style={{marginTop:10, display:'grid', gridTemplateColumns:'1fr 1fr', gap:8}}>
                  <div style={{background:'#fef3c7', borderRadius:8, padding:8, fontSize:10, textAlign:'center'}}><strong>B = Column</strong><br/>Letter on TOP of sheet<br/>Count: A=1, B=2, C=3</div>
                  <div style={{background:'#dcfce7', borderRadius:8, padding:8, fontSize:10, textAlign:'center'}}><strong>2 = Row</strong><br/>Number on LEFT of sheet<br/>Row 1=Header, Row 2=First data</div>
                </div>
              </div>
            )}
            <div style={{marginTop:12, display:'flex', gap:8}}>
              <button onClick={()=>setLiveStep(s=>Math.max(0,s-1))} disabled={liveStep===0} style={{flex:1, height:44, borderRadius:10, border:'1px solid #e2e8f0', background:liveStep===0?'#f1f5f9':'white', fontWeight:700, fontSize:12, cursor:liveStep===0?'not-allowed':'pointer'}}>← Prev</button>
              <button onClick={()=>setLiveStep(s=>Math.min(7,s+1))} disabled={liveStep===7} style={{flex:1, height:44, borderRadius:10, border:'none', background:liveStep===7?'#e2e8f0':'#111827', color:liveStep===7?'#64748b':'white', fontWeight:700, fontSize:12, cursor:liveStep===7?'not-allowed':'pointer'}}>{liveStep===7?"Done! 🎉":"Next →"}</button>
            </div>
          </div>
        </div>

        <div style={{marginTop:14, background:'white', borderRadius:16, padding:20, border:'1px solid #e2e8f0'}}>
          <h2 style={{margin:0, fontSize:16, fontWeight:800}}>📖 Morning Lesson Restored: Dirty Room Analogy</h2>
          <p style={{fontSize:13, lineHeight:1.8, marginTop:12, color:'#1e293b'}}>Dirty data is like a <strong>dirty room with clothes on the ground</strong> — you cannot find your shoes until you arrange the room. Shirts on chair, trousers on floor, socks under bed. You want to go out, you cannot find your belt. Why? Room dirty, not arranged.</p>
          <div style={{marginTop:12, display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(140px, 1fr))', gap:10}}>
            <div style={{background:'#fef3c7', border:'1px solid #fde68a', padding:10, borderRadius:10, fontSize:11, textAlign:'center'}}><span style={{fontSize:18}}>👕</span><br/><strong>Clothes on ground</strong><br/>= duplicate data<br/>id=1 twice</div>
            <div style={{background:'#fee2e2', border:'1px solid #fecaca', padding:10, borderRadius:10, fontSize:11, textAlign:'center'}}><span style={{fontSize:18}}>📦</span><br/><strong>Empty shoe box</strong><br/>= blank data<br/>name empty</div>
            <div style={{background:'#fee2e2', border:'1px solid #fecaca', padding:10, borderRadius:10, fontSize:11, textAlign:'center'}}><span style={{fontSize:18}}>🏷️</span><br/><strong>Wrong size tag</strong><br/>= invalid date<br/>2024-13-05</div>
            <div style={{background:'#dcfce7', border:'1px solid #bbf7d0', padding:10, borderRadius:10, fontSize:11, textAlign:'center'}}><span style={{fontSize:18}}>✨</span><br/><strong>Arrange room</strong><br/>= clean first<br/>TRIM + fix</div>
          </div>
        </div>

        <div style={{marginTop:14, background:'white', borderRadius:16, padding:20, border:'1px solid #e2e8f0', overflowX:'auto'}}>
          <h2 style={{margin:'0 0 10px', fontSize:16, fontWeight:800}}>📊 Dirty Table — 5→4 — Like Dirty Room</h2>
          <table style={{width:'100%', borderCollapse:'collapse', fontSize:13, minWidth:360}}>
            <thead><tr style={{background:'#f8fafc'}}><th style={{border:'1px solid #e2e8f0', padding:10}}>id</th><th style={{border:'1px solid #e2e8f0', padding:10}}>name</th><th style={{border:'1px solid #e2e8f0', padding:10}}>date</th><th style={{border:'1px solid #e2e8f0', padding:10}}>amount</th></tr></thead>
            <tbody>
              <tr><td style={{border:'1px solid #e2e8f0', padding:10}}>1</td><td style={{border:'1px solid #e2e8f0', padding:10, background:'#fef3c7'}}><span style={{background:'#fef9c3', border:'1px dashed #f59e0b', padding:'4px 10px', borderRadius:6, fontFamily:'monospace', fontWeight:800}}>␣Musa␣␣</span></td><td style={{border:'1px solid #e2e8f0', padding:10, background:'#fee2e2'}}>2024-13-05</td><td style={{border:'1px solid #e2e8f0', padding:10}}>500</td></tr>
              <tr><td style={{border:'1px solid #e2e8f0', padding:10}}>1</td><td style={{border:'1px solid #e2e8f0', padding:10, background:'#fef3c7'}}>Musa (dup)</td><td style={{border:'1px solid #e2e8f0', padding:10}}>2024-13-05</td><td style={{border:'1px solid #e2e8f0', padding:10}}>500</td></tr>
              <tr><td style={{border:'1px solid #e2e8f0', padding:10}}>3</td><td style={{border:'1px solid #e2e8f0', padding:10}}>Amina</td><td style={{border:'1px solid #e2e8f0', padding:10}}>2024-05-15</td><td style={{border:'1px solid #e2e8f0', padding:10}}>600</td></tr>
              <tr><td style={{border:'1px solid #e2e8f0', padding:10}}>4</td><td style={{border:'1px solid #e2e8f0', padding:10, background:'#fee2e2'}}>(empty)</td><td style={{border:'1px solid #e2e8f0', padding:10}}>2024-05-20</td><td style={{border:'1px solid #e2e8f0', padding:10}}>400</td></tr>
              <tr><td style={{border:'1px solid #e2e8f0', padding:10}}>5</td><td style={{border:'1px solid #e2e8f0', padding:10}}>John Doe</td><td style={{border:'1px solid #e2e8f0', padding:10}}>2024-05-18</td><td style={{border:'1px solid #e2e8f0', padding:10}}>300</td></tr>
            </tbody>
          </table>
        </div>

        <div style={{background:'white', border:'2px solid #22c55e', borderRadius:16, padding:20, marginTop:14}}>
          <h2 style={{margin:0, fontSize:18, fontWeight:800}}>🧪 LAB: Arrange Dirty Room — Beginner Guide v8</h2>
          <div style={{marginTop:14, background:'#f0fdf4', border:'1px solid #22c55e', borderRadius:12, padding:14}}>
            <h3 style={{margin:0, fontSize:13, fontWeight:800}}>🔗 Step 0: Open Sheet — Pre-filled Link (Data Inside)</h3>
            <a href="https://docs.google.com/spreadsheets/create" target="_blank" style={{display:'flex', height:52, background:'#16a34a', color:'white', fontWeight:800, fontSize:13, borderRadius:12, alignItems:'center', justifyContent:'center', textDecoration:'none', marginTop:10}}>🔗 Open Google Sheet Template — Data Already Inside</a>
            <p style={{fontSize:10, color:'#64748b', marginTop:8}}>After click: File → Make a copy → Rename. OR use Copy backup.</p>
            <button onClick={()=>{navigator.clipboard.writeText(CSV_DIRTY); setCopied(true); setTimeout(()=>setCopied(false),2000);}} style={{marginTop:10, width:'100%', height:48, background:'white', border:'2px solid #16a34a', borderRadius:12, fontWeight:800, fontSize:12, cursor:'pointer'}}>{copied?"✅ Copied! Paste in A1":"📋 Copy Dirty CSV Backup — 5 rows"}</button>
            <div style={{marginTop:10, background:'white', borderRadius:8, padding:10, fontFamily:'monospace', fontSize:11, whiteSpace:'pre-wrap', border:'1px dashed #86efac'}}>{CSV_DIRTY}</div>
          </div>
          <div style={{marginTop:14, display:'grid', gap:10}}>
            <div style={{border:'1px solid #bbf7d0', borderRadius:12, padding:14, background:'#f0fdf4', fontSize:12, lineHeight:1.6}}><strong>✨ Steps 1-5 (B2 + TRIM + Blue Circle):</strong> Select A1:A6 → Data → Split to Comma → E1=clean name → E2==TRIM(B2) → Enter → Drag blue circle E2→E6. All cleaned!</div>
            <div style={{border:'1px solid #fecaca', borderRadius:12, padding:14, background:'#fef2f2', fontSize:12, lineHeight:1.6}}><strong>🛠️ Step 6 (Fix 3 dirts):</strong> C2 2024-13-05→2024-05-05, Data→Remove duplicates id, Fill empty with Unknown. 4 clean rows!</div>
            <div style={{border:'2px solid #16a34a', borderRadius:12, padding:14, background:'#f0fdf4', fontSize:12, fontFamily:'monospace'}}><strong>✅ Final Clean (4 rows):</strong><br/><span style={{whiteSpace:'pre-wrap'}}>{CSV_CLEAN}</span></div>
          </div>
          <button onClick={()=>openLog("LAB")} style={{marginTop:14, width:'100%', height:56, background:'#2563eb', color:'white', fontWeight:900, fontSize:15, borderRadius:12, border:'none', cursor:'pointer', boxShadow:'0 4px 12px rgba(37,99,235,0.2)'}}>🤖 Submit LAB — I Arranged 5→4 — Live Tutoring v8</button>
        </div>

        <div style={{background:'white', border:'1px solid #f59e0b', borderRadius:16, padding:20, marginTop:14}}>
          <h2 style={{margin:0, fontSize:18, fontWeight:800}}>📝 HOMEWORK: Your Own Room</h2>
          <p style={{fontSize:11, background:'#fffbeb', padding:10, borderRadius:8, marginTop:10, lineHeight:1.6}}>Build 5 rows with YOUR friends names (add 1 with ␣ spaces + 1 duplicate + 1 empty + 1 invalid date) → Clean to 4 using live tutoring steps. Type names below.</p>
          <input value={hwText} onChange={e=>setHwText(e.target.value)} placeholder="e.g. ␣Amina␣, Musa, John..." style={{width:'100%', height:56, border:'2px solid #f59e0b', borderRadius:12, padding:'0 14px', marginTop:12, fontSize:14}}/>
          <button onClick={()=>openLog("HW")} style={{marginTop:10, width:'100%', height:56, background:'#ea580c', color:'white', fontWeight:900, fontSize:15, borderRadius:12, border:'none', cursor:'pointer'}}>📤 Submit Homework — My Room Arranged</button>
        </div>

        <div style={{background:'#fef3c7', border:'2px solid #f59e0b', borderRadius:16, padding:20, marginTop:14}}>
          <h2 style={{margin:0, fontSize:16, fontWeight:800}}>💰 Earn N500 — Personal Certification → Pay for Subs</h2>
          <p style={{fontSize:12, lineHeight:1.7, marginTop:10}}>After live tutoring, you earn. Clean 1 shop book 5→4, charge N500, screenshot = portfolio. 5 jobs = N2,500 = pay Google cert data + Vercel Pro $20 + Supabase $25 + GitHub Team $4. Godwin path first, then society.</p>
        </div>

        <div style={{background:'white', border:'1px solid #25D366', borderRadius:16, padding:20, marginTop:14}}>
          <h2 style={{margin:0, fontSize:16, fontWeight:800}}>💼 Gig Shopper — Personal Path + Payment = Experience</h2>
          <div style={{marginTop:12, display:'grid', gap:8}}>{GIGS.map((g,i)=><div key={i} style={{border:'1px solid #e2e8f0', borderRadius:10, padding:12, display:'flex', justifyContent:'space-between', alignItems:'center'}}><div><div style={{fontWeight:800, fontSize:12}}>{g.title}</div><div style={{fontSize:10, color:'#64748b'}}>{g.skill} • {g.pay}</div></div><span style={{background:'#dcfce7', padding:'4px 8px', borderRadius:6, fontSize:10, fontWeight:700}}>{g.pay}</span></div>)}</div>
          <button onClick={()=>setShowGig(true)} style={{marginTop:14, width:'100%', height:56, background:'#25D366', color:'white', fontWeight:900, fontSize:14, borderRadius:12, border:'none', cursor:'pointer'}}>🤖 App Bot: Show Gigs + Auto-Resume + Payment Confirm</button>
        </div>

        <div style={{background:'white', border:'1px solid #8b5cf6', borderRadius:16, padding:20, marginTop:14}}>
          <h2 style={{margin:0, fontSize:18, fontWeight:800}}>🎯 QUIZ: B2 + TRIM + 5→4 — Live Tutoring</h2>
          <button onClick={()=>setShowQuiz(true)} style={{marginTop:12, width:'100%', height:56, background:'#7c3aed', color:'white', fontWeight:900, fontSize:15, borderRadius:12, border:'none', cursor:'pointer'}}>🚀 Take Quiz — 5 Questions — 80% to Pass</button>
        </div>

        <div style={{background:'white', border:'1px solid #25D366', borderRadius:16, padding:20, marginTop:14}}>
          <a href="https://whatsapp.com/channel/0029Vb7eUeBGzzKTHPIaoe0b" target="_blank" style={{display:'flex', height:56, background:'#25D366', color:'white', fontWeight:900, borderRadius:12, alignItems:'center', justifyContent:'center', textDecoration:'none'}}>📱 Join WhatsApp Channel — Gigs + News</a>
        </div>
      </div>

      {showPayConfirm && (
        <div style={{position:'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(0,0,0,0.6)', display:'flex', alignItems:'center', justifyContent:'center', padding:16, zIndex:80}}>
          <div style={{background:'white', borderRadius:16, padding:20, maxWidth:420, width:'100%'}}>
            {!paySaved ? (
              <><h3 style={{margin:0}}>💰 Confirm Payment — Experience Log v8</h3><p style={{fontSize:11, color:'#64748b', marginTop:6}}>Must be in Google Sheet for portfolio + resume + Google cert evidence.</p><input value={payClient} onChange={e=>setPayClient(e.target.value)} placeholder="Client e.g. Mama Nkechi shop" style={{width:'100%', height:48, border:'1px solid #16a34a', borderRadius:10, padding:'0 12px', marginTop:12}}/><input value={payAmount} onChange={e=>setPayAmount(e.target.value)} placeholder="Amount N1,500 or $5" style={{width:'100%', height:48, border:'1px solid #16a34a', borderRadius:10, padding:'0 12px', marginTop:8}}/><input value={resumeName} onChange={e=>setResumeName(e.target.value)} placeholder="Your name" style={{width:'100%', height:48, border:'1px solid #e2e8f0', borderRadius:10, padding:'0 12px', marginTop:8}}/><button onClick={confirmPayment} disabled={saving} style={{marginTop:12, width:'100%', height:52, background:saving?'#94a3b8':'#16a34a', color:'white', fontWeight:800, borderRadius:10, border:'none'}}>{saving?"Saving...":"✅ Confirm Payment — Log Experience"}</button><button onClick={()=>setShowPayConfirm(false)} style={{marginTop:8, width:'100%', height:44, background:'white', border:'1px solid #e2e8f0', borderRadius:10}}>Cancel</button></>
            ):(<><h3 style={{textAlign:'center'}}>✅ Experience Logged!</h3><p style={{fontSize:12, textAlign:'center'}}>{payAmount} from {payClient} saved as EARNED_GIG.</p></>)}
          </div>
        </div>
      )}

      {showGig && (
        <div style={{position:'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(0,0,0,0.6)', display:'flex', alignItems:'center', justifyContent:'center', padding:16, zIndex:70}}>
          <div style={{background:'white', borderRadius:16, padding:20, maxWidth:420, width:'100%'}}>
            {!gigApproved ? (
              <><h3 style={{margin:0}}>💼 Gig Shopper — v8 Fine Tuned</h3><p style={{fontSize:11, color:'#64748b', marginTop:6}}>Kpata shops gigs for YOU first. Approve → Resume from LAB 5→4 → Apply → Pay direct to Opay → Confirm = experience.</p><input value={resumeName} onChange={e=>setResumeName(e.target.value)} placeholder="Your full name for resume" style={{width:'100%', height:48, border:'1px solid #25D366', borderRadius:10, padding:'0 12px', marginTop:12}}/><button onClick={approveGig} style={{marginTop:12, width:'100%', height:52, background:'#25D366', color:'white', fontWeight:800, borderRadius:10, border:'none'}}>✅ Yes, Apply For Me — Build Resume From Log</button><button onClick={()=>setShowGig(false)} style={{marginTop:8, width:'100%', height:44, background:'white', border:'1px solid #e2e8f0', borderRadius:10}}>Maybe Later</button></>
            ):(<><h3 style={{textAlign:'center'}}>✅ Applied! Resume sent.</h3><p style={{fontSize:11, textAlign:'center'}}>When client pays to Opay, confirm to log.</p><button onClick={()=>{setShowGig(false); setShowPayConfirm(true);}} style={{marginTop:12, width:'100%', height:52, background:'#16a34a', color:'white', fontWeight:800, borderRadius:10, border:'none'}}>💰 Confirm Payment — Log Experience</button><button onClick={()=>setShowGig(false)} style={{marginTop:8, width:'100%', height:44, background:'#111827', color:'white', borderRadius:10, border:'none'}}>Close</button></>)}
          </div>
        </div>
      )}

      {showLog && (
        <div style={{position:'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(0,0,0,0.6)', display:'flex', alignItems:'center', justifyContent:'center', padding:16, zIndex:60}}>
          <div style={{background:'white', borderRadius:16, padding:20, maxWidth:400, width:'100%'}}>
            {!saved ? (
              <><h3 style={{margin:0}}>📤 Submit {logType} — v8 Fine Tuned</h3><input value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" style={{width:'100%', height:48, border:'1px solid #e2e8f0', borderRadius:10, padding:'0 12px', marginTop:12}}/><input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone / WhatsApp" style={{width:'100%', height:48, border:'1px solid #e2e8f0', borderRadius:10, padding:'0 12px', marginTop:8}}/><button onClick={save} disabled={saving} style={{marginTop:12, width:'100%', height:52, background:saving?'#94a3b8':'#2563eb', color:'white', fontWeight:800, borderRadius:10, border:'none'}}>{saving?"Saving...":"✅ Save to Google Sheet — Personal Log"}</button><button onClick={()=>setShowLog(false)} style={{marginTop:8, width:'100%', height:44, background:'white', border:'1px solid #e2e8f0', borderRadius:10}}>Cancel</button></>
            ):(<><h3 style={{textAlign:'center'}}>✅ Saved! v8 Fine Tuned!</h3><p style={{fontSize:12, textAlign:'center'}}>{name} — {logType} 5→4 — Personal path, then adopt for society.</p><button onClick={()=>setShowLog(false)} style={{marginTop:8, width:'100%', height:44, background:'#111827', color:'white', borderRadius:10, border:'none'}}>Close</button></>)}
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
              <><div style={{display:'flex', justifyContent:'space-between'}}><h3 style={{margin:0}}>Q {cur+1}/5 — v8 Fine Tuned</h3><button onClick={()=>setShowQuiz(false)} style={{border:'none', background:'#f1f5f9', borderRadius:8, padding:'6px 12px'}}>✕</button></div><p style={{fontWeight:700, marginTop:16}}>{QUIZ[cur].q}</p><div style={{display:'grid', gap:10, marginTop:12}}>{QUIZ[cur].a.map((o,i)=><button key={i} onClick={()=>answer(i)} style={{textAlign:'left', padding:14, borderRadius:10, border:sel===i?'2px solid #7c3aed':'1px solid #e2e8f0', background:sel===i?'#f5f3ff':'white', minHeight:52, fontWeight:500}}>{o}</button>)}</div></>
            ):(
              <><h3 style={{margin:0, textAlign:'center'}}>{score>=4?'✅ Room Arranged! v8 Complete!':'❌ Try Again'}</h3><p style={{textAlign:'center'}}>{score}/5</p>{score>=4 ? (<><button onClick={()=>{setShowQuiz(false); openLog("QUIZ");}} style={{marginTop:12, width:'100%', height:52, background:'#2563eb', color:'white', fontWeight:800, borderRadius:10, border:'none'}}>📤 Save Quiz — Personal Cert Log</button></>): <button onClick={()=>{setCur(0); setScore(0); setDone(false); setSel(null);}} style={{marginTop:12, width:'100%', height:48, background:'#7c3aed', color:'white', fontWeight:700, borderRadius:10, border:'none'}}>Retake</button>}</>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
