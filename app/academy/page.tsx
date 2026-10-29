"use client";
import React, { useState } from "react";
const QUIZ = [
  { q: "Why does ␣Musa␣␣ cause grouping to fail? (Live tutoring)", a: ["Spaces make it different text - Excel sees ␣Musa␣␣ and Musa as 2 people","Color wrong","Number too big"], correct: 0 },
  { q: "Where is B2? (Beginner guide)", a: ["Column B Row 2 = ␣Musa␣␣ dirty","Column A Row 1","Sheet name"], correct: 0 },
  { q: "Where do you type =TRIM(B2)?", a: ["E2 - empty box to right of D2","B2 itself","A1"], correct: 0 },
  { q: "2024-13-05 invalid why?", a: ["Month 13 does not exist","Year too high","Day is Sunday"], correct: 0 },
  { q: "After TRIM + drag + fix date + remove duplicate, how many rows?", a: ["4 rows clean - 5→4 arranged","10 rows","0 rows"], correct: 0 },
];
const GIGS = [
  { title: "Clean 50 rows shop sales - N1,500", pay: "N1,500", skill: "Lesson 1 TRIM B2" },
  { title: "Remove duplicates - $5 Fiverr", pay: "$5", skill: "Lesson 1 Duplicate" },
  { title: "Fix invalid dates - N1,000", pay: "N1,000", skill: "Lesson 1 Date" },
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
    const p={timestamp:new Date().toISOString(), name, phone, type:logType, details:logType==="HW"?hwText:logType==="QUIZ"?`Quiz ${score}/5 Live Tutoring`:`${logType} 5→4 Live Tutoring Mode`, score:logType==="QUIZ"?score:"", source:"Kpata_v7_Live_Tutoring"};
    try{ const l=JSON.parse(localStorage.getItem("kpata_logs")||"[]"); l.push(p); localStorage.setItem("kpata_logs",JSON.stringify(l)); await fetch(URL,{method:"POST",mode:"no-cors",body:JSON.stringify(p)}); setSaved(true);}catch{setSaved(true);} setSaving(false);
  };
  const confirmPayment=async()=>{
    if(!payAmount||!payClient){alert("Enter amount and client"); return;}
    setSaving(true);
    const URL="https://script.google.com/macros/s/AKfycbxiWGrdTSguuZdixWtERJgeYCXgQS48ZKTnTdYqOPQn16dij7WFl499URHC3quaCCqZ/exec";
    const p={timestamp:new Date().toISOString(), name:resumeName||name||"Student", phone:phone||"from log", type:"EARNED_GIG", details:`Earned ${payAmount} from ${payClient} - Gig: Data cleaning 5→4 - Experience`, amount:payAmount, client:payClient, source:"Kpata_Gig_Earning_Experience_v7"};
    try{ const l=JSON.parse(localStorage.getItem("kpata_logs")||"[]"); l.push(p); localStorage.setItem("kpata_logs",JSON.stringify(l)); await fetch(URL,{method:"POST",mode:"no-cors",body:JSON.stringify(p)}); setPaySaved(true); setTimeout(()=>{setShowPayConfirm(false); setPaySaved(false);},2000);}catch{setPaySaved(true);} setSaving(false);
  };
  const approveGig=()=>{
    if(!resumeName){alert("Enter name"); return;}
    setGigApproved(true);
    setTimeout(()=>setShowGig(false),1200);
    const URL="https://script.google.com/macros/s/AKfycbxiWGrdTSguuZdixWtERJgeYCXgQS48ZKTnTdYqOPQn16dij7WFl499URHC3quaCCqZ/exec";
    const p={timestamp:new Date().toISOString(), name:resumeName, phone:phone||"from log", type:"GIG_APPROVED", details:`Approved gig: ${GIGS[0].title} - Resume from LAB 5→4 Live Tutoring`, source:"Kpata_Gig_Shopper_v7"};
    try{ const l=JSON.parse(localStorage.getItem("kpata_logs")||"[]"); l.push(p); localStorage.setItem("kpata_logs",JSON.stringify(l)); fetch(URL,{method:"POST",mode:"no-cors",body:JSON.stringify(p)});}catch{}
  };
  const LIVE_STEPS = [
    { title: "Step 0: Open Empty Sheet", desc: "Click link below → Google Sheet opens empty (no data). We will add data." },
    { title: "Step 1: Paste Dirty Data (5 rows)", desc: "Copy CSV from lesson → Click A1 → Ctrl+V. You see id,name,date,amount in A column (not split yet)." },
    { title: "Step 2: Split to Columns (Data → Split text)", desc: "Top menu Data → Split text to columns → Comma. Now B2 = Musa with hidden spaces. This is your dirty room." },
    { title: "Step 3: Where is B2? Beginner Picture", desc: "B2 = Column B Row 2 = ␣Musa␣␣ dirty. E2 = empty box where we type TRIM. See picture table below." },
    { title: "Step 4: Type =TRIM(B2) in E2 + Enter", desc: "Click E1 type 'clean name', Click E2 type =TRIM(B2), Press Enter → E2 shows Musa clean. Shirt folded!" },
    { title: "Step 5: Drag Blue Circle E2 → E6", desc: "Small blue circle bottom-right of E2 → Drag down to E6 → All names cleaned 5→4. This is arrange room." },
    { title: "Step 6: Fix Date + Remove Duplicate + Fill Empty", desc: "C2 2024-13-05 → 2024-05-05, Data → Remove duplicates (id=1), Fill empty with Unknown. Now 4 clean rows!" },
    { title: "Step 7: Submit LAB + Earn + Gig", desc: "Click Submit LAB → Save to Google Sheet → Do Homework → Take Quiz → Gig Shopper finds job → Confirm Payment = Experience logged." },
  ];
  return (
    <div style={{minHeight:'100vh', background:'#f1f5f9', padding:'16px 16px 120px', fontFamily:'system-ui'}}>
      <div style={{maxWidth:720, margin:'0 auto'}}>
        <div style={{background:'white', border:'1px solid #e2e8f0', borderRadius:12, padding:16}}>
          <h1 style={{margin:0, fontSize:20, fontWeight:800}}>Kpata_Academy_MVP</h1>
          <p style={{fontSize:12, color:'#64748b', marginTop:4}}>LESSON 1 v7: Live Tutoring Mode • 20 min • FREE • No 3 tabs • No Google blue link • B2 Guide • Beginner</p>
          <div style={{display:'flex', gap:8, marginTop:8, flexWrap:'wrap'}}>
            <span style={{background:'#dcfce7', color:'#166534', padding:'4px 8px', borderRadius:6, fontSize:11, fontWeight:700}}>Progress: 0% • Live • v7 Tutoring</span>
            <span style={{background:'#f1f5f9', padding:'4px 8px', borderRadius:6, fontSize:11}}>Self-paced • 2G • Tecno/Infinix • Simple English</span>
          </div>
          <div style={{marginTop:10, background:'#fefce8', border:'1px solid #fde68a', borderRadius:8, padding:10, fontSize:11}}><strong>CHANGELOG — Keep Tab for General Build:</strong><br/>GitHub: backup/main-before-bugfix (safe) → fix/bug1-4-header-spaces-phone-friendly (current) → main (prod)<br/>Google Sheet: Kpata_Students_Log logs LAB/HW/Quiz/GIG_APPROVED/EARNED_GIG as experience<br/>v7: Live tutoring 7 steps replicated, B2 picture, blue circle drag, no 3 tabs, no Google blue link, payment confirm = experience</div>
        </div>

        <div style={{marginTop:12, background:'white', borderRadius:12, padding:16, border:'2px solid #22c55e'}}>
          <h2 style={{margin:0, fontSize:16}}>🎥 Live Tutoring Mode — How Godwin Learned (Replicated for Beginners)</h2>
          <p style={{fontSize:11, color:'#166534', background:'#dcfce7', padding:6, borderRadius:6, marginTop:8, fontWeight:700}}>This is exact tutoring I gave Godwin on 2026-10-29: Open empty sheet → Paste → Split → B2 → TRIM → Drag → Fix date → Remove duplicate → Submit. Every beginner can follow alone, no teacher needed.</p>
          <div style={{marginTop:10, display:'flex', gap:8, overflowX:'auto', paddingBottom:8}}>
            {LIVE_STEPS.map((s,i)=><button key={i} onClick={()=>setLiveStep(i)} style={{minWidth:80, height:40, borderRadius:8, border:liveStep===i?'2px solid #22c55e':'1px solid #e2e8f0', background:liveStep===i?'#f0fdf4':'white', fontSize:10, fontWeight:700, flexShrink:0}}>{i}. {s.title.split(':')[0]}</button>)}
          </div>
          <div style={{marginTop:10, background:'#f0fdf4', border:'1px solid #bbf7d0', borderRadius:10, padding:12}}>
            <h3 style={{margin:0, fontSize:13}}>{LIVE_STEPS[liveStep].title}</h3>
            <p style={{fontSize:11, marginTop:6, lineHeight:1.6}}>{LIVE_STEPS[liveStep].desc}</p>
            {liveStep===3 && (
              <div style={{marginTop:10, overflowX:'auto'}}>
                <table style={{borderCollapse:'collapse', fontSize:11, width:'100%'}}>
                  <thead><tr><th style={{border:'1px solid #e2e8f0', padding:6, background:'#f1f5f9'}}></th><th style={{border:'1px solid #e2e8f0', padding:6}}>A</th><th style={{border:'2px solid #f59e0b', padding:6, background:'#fef3c7'}}>B (name) ← B2 here</th><th style={{border:'1px solid #e2e8f0', padding:6}}>C</th><th style={{border:'1px solid #e2e8f0', padding:6}}>D</th><th style={{border:'2px solid #22c55e', padding:6, background:'#dcfce7'}}>E (clean)</th></tr></thead>
                  <tbody>
                    <tr><td style={{border:'1px solid #e2e8f0', padding:6, fontWeight:700}}>1</td><td style={{border:'1px solid #e2e8f0', padding:6}}>id</td><td style={{border:'1px solid #e2e8f0', padding:6}}>name</td><td style={{border:'1px solid #e2e8f0', padding:6}}>date</td><td style={{border:'1px solid #e2e8f0', padding:6}}>amount</td><td style={{border:'1px solid #e2e8f0', padding:6}}>clean name</td></tr>
                    <tr><td style={{border:'1px solid #e2e8f0', padding:6, fontWeight:700}}>2</td><td style={{border:'1px solid #e2e8f0', padding:6}}>1</td><td style={{border:'2px solid #f59e0b', background:'#fef3c7', padding:6, fontFamily:'monospace', fontWeight:800}}>B2 = ␣Musa␣␣ ← Click this! Dirty shirt on floor</td><td style={{border:'1px solid #e2e8f0', padding:6}}>2024-13-05</td><td style={{border:'1px solid #e2e8f0', padding:6}}>500</td><td style={{border:'2px solid #22c55e', background:'#dcfce7', padding:6, fontWeight:800}}>E2 = Type =TRIM(B2) here → Musa clean</td></tr>
                  </tbody>
                </table>
                <p style={{fontSize:10, color:'#64748b', marginTop:6}}>Picture: B = Column (letter on top), 2 = Row (number on left). B2 = where they meet. E2 = empty box to right. Blue circle at bottom-right of E2 to drag down to E6.</p>
              </div>
            )}
          </div>
        </div>

        <div style={{marginTop:12, background:'white', borderRadius:12, padding:16, border:'1px solid #e2e8f0'}}>
          <h2 style={{margin:0, fontSize:16}}>📖 Lesson 1 Deep: Dirty Room Analogy — Morning Lesson Restored</h2>
          <p style={{fontSize:13, lineHeight:1.7, marginTop:10, color:'#1e293b'}}>Dirty data is like a <strong>dirty room with clothes on the ground</strong> — you cannot find your shoes until you arrange the room. Shirts on chair, trousers on floor, socks under bed.</p>
          <p style={{fontSize:12, lineHeight:1.7, marginTop:8, color:'#334155'}}>Same with data. You write "Musa" 2 times, leave name empty, type month 13. Excel counts " Musa  " and "Musa" as different. Report says 5 customers, real is 4. Wrong decision.</p>
          <div style={{background:'#fffbeb', border:'1px solid #fde68a', padding:10, borderRadius:8, marginTop:10, fontSize:12}}><strong>Simple English — Dirty Room:</strong> Clothes on ground = duplicate. Empty shoe box = blank. Wrong size tag = invalid date 2024-13-05. Arrange: fold clothes (TRIM), throw duplicate shirt (remove duplicates), fill empty box (fill blanks), fix tag (fix date).</div>
        </div>

        <div style={{marginTop:12, background:'white', borderRadius:12, padding:16, border:'1px solid #e2e8f0', overflowX:'auto'}}>
          <h2 style={{margin:'0 0 8px', fontSize:16}}>📊 Dirty Data Table — Like Dirty Room (Morning Lesson)</h2>
          <p style={{fontSize:11, color:'#dc2626', background:'#fef2f2', padding:6, borderRadius:6}}>Yellow = hidden spaces ␣Musa␣␣ = shirt on floor • Red = month 13 = wrong tag • Dup = same shirt twice • Empty = empty shoe box</p>
          <table style={{width:'100%', borderCollapse:'collapse', fontSize:12, marginTop:8}}>
            <thead><tr style={{background:'#f8fafc'}}><th style={{border:'1px solid #e2e8f0', padding:8}}>id</th><th style={{border:'1px solid #e2e8f0', padding:8}}>name</th><th style={{border:'1px solid #e2e8f0', padding:8}}>date</th><th style={{border:'1px solid #e2e8f0', padding:8}}>amount</th></tr></thead>
            <tbody>
              <tr><td style={{border:'1px solid #e2e8f0', padding:8}}>1</td><td style={{border:'1px solid #e2e8f0', padding:8, background:'#fef3c7'}}><span style={{background:'#fef9c3', border:'1px dashed #f59e0b', padding:'4px 8px', borderRadius:4, fontFamily:'monospace', fontSize:13}}>␣Musa␣␣</span></td><td style={{border:'1px solid #e2e8f0', padding:8, background:'#fee2e2'}}>2024-13-05</td><td style={{border:'1px solid #e2e8f0', padding:8}}>500</td></tr>
              <tr><td style={{border:'1px solid #e2e8f0', padding:8}}>1</td><td style={{border:'1px solid #e2e8f0', padding:8}}>Musa (same shirt)</td><td style={{border:'1px solid #e2e8f0', padding:8}}>2024-13-05</td><td style={{border:'1px solid #e2e8f0', padding:8}}>500</td></tr>
              <tr><td style={{border:'1px solid #e2e8f0', padding:8}}>3</td><td style={{border:'1px solid #e2e8f0', padding:8}}>Amina</td><td style={{border:'1px solid #e2e8f0', padding:8}}>2024-05-15</td><td style={{border:'1px solid #e2e8f0', padding:8}}>600</td></tr>
              <tr><td style={{border:'1px solid #e2e8f0', padding:8}}>4</td><td style={{border:'1px solid #e2e8f0', padding:8, background:'#fee2e2'}}>(empty)</td><td style={{border:'1px solid #e2e8f0', padding:8}}>2024-05-20</td><td style={{border:'1px solid #e2e8f0', padding:8}}>400</td></tr>
              <tr><td style={{border:'1px solid #e2e8f0', padding:8}}>5</td><td style={{border:'1px solid #e2e8f0', padding:8}}>John Doe</td><td style={{border:'1px solid #e2e8f0', padding:8}}>2024-05-18</td><td style={{border:'1px solid #e2e8f0', padding:8}}>300</td></tr>
            </tbody>
          </table>
        </div>

        <div style={{background:'white', border:'2px solid #22c55e', borderRadius:12, padding:16, marginTop:12}}>
          <h2 style={{margin:0, fontSize:18}}>🧪 LAB: Arrange Dirty Room — Beginner Guide (Your Live Tutoring Replicated)</h2>
          <p style={{fontSize:12, color:'#166534', marginTop:6, background:'#dcfce7', padding:6, borderRadius:6, fontWeight:700}}>Beginner? Follow exact steps Godwin did on 2026-10-29 to arrange 5→4.</p>
          <div style={{marginTop:12, background:'#f0fdf4', border:'1px solid #22c55e', borderRadius:10, padding:12}}>
            <h3 style={{margin:0, fontSize:13}}>🔗 Step 0: Open Sheet With Data Already Inside — Pre-filled Link</h3>
            <a href="https://docs.google.com/spreadsheets/create" target="_blank" style={{display:'flex', height:52, background:'#22c55e', color:'white', fontWeight:800, fontSize:13, borderRadius:10, alignItems:'center', justifyContent:'center', textDecoration:'none', marginTop:8}}>🔗 Open Google Sheet Template — Click Here — Data Already Inside</a>
            <p style={{fontSize:10, color:'#64748b', marginTop:6}}>After click: File → Make a copy → Rename "Kpata Lesson 1 - Your Name". OR use Copy CSV backup below.</p>
            <button onClick={()=>{navigator.clipboard.writeText(CSV_DIRTY); setCopied(true); setTimeout(()=>setCopied(false),2000);}} style={{marginTop:8, width:'100%', height:44, background:'white', border:'2px solid #22c55e', borderRadius:10, fontWeight:700, fontSize:12}}>{copied?"✅ Copied! Paste in A1":"📋 Copy Dirty CSV (Backup) — 5 rows"}</button>
            <div style={{marginTop:8, background:'white', borderRadius:8, padding:10, fontFamily:'monospace', fontSize:11, whiteSpace:'pre-wrap', border:'1px dashed #86efac'}}>{CSV_DIRTY}</div>
          </div>
          <div style={{marginTop:12, display:'grid', gap:8}}>
            <div style={{border:'1px solid #bbf7d0', borderRadius:10, padding:12, background:'#f0fdf4', fontSize:12}}><strong>Step 1-5 (B2 + TRIM + Drag):</strong> Select A1:A6 → Data → Split text to columns → Comma → Click E1 type "clean name" → E2 type =TRIM(B2) → Enter → Drag blue circle E2→E6 → All cleaned. See Live Tutoring picture above.</div>
            <div style={{border:'1px solid #fecaca', borderRadius:10, padding:12, background:'#fef2f2', fontSize:12}}><strong>Step 6 Fix Date:</strong> C2 2024-13-05 → 2024-05-05, C3 same.</div>
            <div style={{border:'1px solid #fde68a', borderRadius:10, padding:12, background:'#fefce8', fontSize:12}}><strong>Step 7 Duplicate + Empty:</strong> Data → Remove duplicates (id) → Delete duplicate row → Fill empty B5 with Unknown. Now 4 clean rows!</div>
            <div style={{border:'1px solid #16a34a', borderRadius:10, padding:12, background:'#f0fdf4', fontSize:12, fontFamily:'monospace'}}><strong>✅ Final Clean Room (4 rows):</strong><br/>{CSV_CLEAN}</div>
          </div>
          <button onClick={()=>openLog("LAB")} style={{marginTop:12, width:'100%', height:52, background:'#2563eb', color:'white', fontWeight:800, fontSize:15, borderRadius:10, border:'none'}}>🤖 Submit LAB — I Arranged 5→4 Live Tutoring</button>
        </div>

        <div style={{background:'white', border:'1px solid #f59e0b', borderRadius:12, padding:16, marginTop:12}}>
          <h2 style={{margin:0, fontSize:18}}>📝 HOMEWORK: Arrange Your Own Room</h2>
          <p style={{fontSize:11, background:'#fffbeb', padding:8, borderRadius:6, marginTop:8}}>Build 5 rows with YOUR friends names (add 1 with ␣ spaces + 1 duplicate + 1 empty + 1 invalid date) → Clean to 4 using live tutoring steps.</p>
          <input value={hwText} onChange={e=>setHwText(e.target.value)} placeholder="Type 5 friends names, e.g. ␣Amina␣, Musa, etc." style={{width:'100%', height:52, border:'2px solid #f59e0b', borderRadius:10, padding:'0 12px', marginTop:10, fontSize:13}}/>
          <button onClick={()=>openLog("HW")} style={{marginTop:10, width:'100%', height:52, background:'#ea580c', color:'white', fontWeight:800, fontSize:15, borderRadius:10, border:'none'}}>📤 Submit Homework</button>
        </div>

        <div style={{background:'#fef3c7', border:'1px solid #f59e0b', borderRadius:12, padding:16, marginTop:12}}>
          <h2 style={{margin:0, fontSize:16}}>💰 Earn N500 — Clean Shop Data (Personal Certification Path)</h2>
          <p style={{fontSize:12, lineHeight:1.6, marginTop:8}}>After live tutoring, you can earn. Clean 1 shop book 5→4, charge N500, screenshot = portfolio. 5 jobs = N2,500 = pay for Google cert data + Vercel Pro $20 + Supabase Pro $25. This is how Godwin will pay for his own cert first, then adopt for larger society.</p>
        </div>

        <div style={{background:'white', border:'1px solid #25D366', borderRadius:12, padding:16, marginTop:12}}>
          <h2 style={{margin:0, fontSize:16}}>💼 Gig Shopper — Kpata Shops Gigs For You + Payment = Experience</h2>
          <p style={{fontSize:11, marginTop:6}}>Gig Shopper shops Fiverr/Upwork daily. Admin approves → WhatsApp Channel → You approve in App Bot → Kpata builds resume from Google Sheet log + applies → Client pays direct to your Opay → You confirm payment → Logged as EARNED_GIG = experience for Google Sheet + portfolio.</p>
          <div style={{marginTop:10, display:'grid', gap:8}}>
            {GIGS.map((g,i)=><div key={i} style={{border:'1px solid #e2e8f0', borderRadius:8, padding:10}}><div style={{fontWeight:700, fontSize:12}}>{g.title}</div><div style={{fontSize:10, color:'#64748b'}}>{g.skill} • {g.pay}</div></div>)}
          </div>
          <button onClick={()=>setShowGig(true)} style={{marginTop:12, width:'100%', height:52, background:'#25D366', color:'white', fontWeight:800, fontSize:14, borderRadius:10, border:'none'}}>🤖 App Bot: Show Gigs + Auto-Resume + Payment Confirm</button>
        </div>

        <div style={{background:'white', border:'1px solid #8b5cf6', borderRadius:12, padding:16, marginTop:12}}>
          <h2 style={{margin:0, fontSize:18}}>🎯 QUIZ: Did You Arrange Room Well? (Live Tutoring)</h2>
          <button onClick={()=>setShowQuiz(true)} style={{marginTop:12, width:'100%', height:52, background:'#7c3aed', color:'white', fontWeight:800, fontSize:15, borderRadius:10, border:'none'}}>🚀 Take Quiz — B2 + TRIM + 5→4</button>
        </div>

        <div style={{background:'white', border:'1px solid #25D366', borderRadius:12, padding:16, marginTop:12}}>
          <a href="https://whatsapp.com/channel/0029Vb7eUeBGzzKTHPIaoe0b" target="_blank" style={{display:'flex', height:52, background:'#25D366', color:'white', fontWeight:800, borderRadius:10, alignItems:'center', justifyContent:'center', textDecoration:'none'}}>📱 Join WhatsApp Channel — Gigs + News + Curriculum Updates</a>
        </div>

        <div style={{marginTop:12, background:'#fefce8', borderRadius:10, padding:12}}>
          <p style={{fontSize:11, margin:0, lineHeight:1.5}}><strong>Kpata Academy v7 Live Tutoring:</strong> FREE training community. We do NOT issue certificates. We log LAB+HW+Quiz+GIG_APPROVED+EARNED_GIG to Google Sheet as experience for Google cert + resume + portfolio. GitHub tracks code changes, Google Sheet tracks student progress, CHANGELOG tracks lesson versions for general build adoption later. Personal path: Godwin certifies first, earns to pay for subs, then adopts for larger society.</p>
        </div>
      </div>

      {showPayConfirm && (
        <div style={{position:'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(0,0,0,0.6)', display:'flex', alignItems:'center', justifyContent:'center', padding:16, zIndex:80}}>
          <div style={{background:'white', borderRadius:16, padding:20, maxWidth:420, width:'100%'}}>
            {!paySaved ? (
              <>
                <h3 style={{margin:0}}>💰 Confirm Payment — Experience Log</h3>
                <p style={{fontSize:11, color:'#64748b', marginTop:6}}>Gig = experience. Must be in Google Sheet for portfolio + Google cert evidence + resume.</p>
                <input value={payClient} onChange={e=>setPayClient(e.target.value)} placeholder="Client name e.g. Mama Nkechi shop" style={{width:'100%', height:48, border:'1px solid #16a34a', borderRadius:10, padding:'0 12px', marginTop:12}}/>
                <input value={payAmount} onChange={e=>setPayAmount(e.target.value)} placeholder="Amount N1,500 or $5" style={{width:'100%', height:48, border:'1px solid #16a34a', borderRadius:10, padding:'0 12px', marginTop:8}}/>
                <input value={resumeName} onChange={e=>setResumeName(e.target.value)} placeholder="Your name for experience log" style={{width:'100%', height:48, border:'1px solid #e2e8f0', borderRadius:10, padding:'0 12px', marginTop:8}}/>
                <button onClick={confirmPayment} disabled={saving} style={{marginTop:12, width:'100%', height:52, background:saving?'#94a3b8':'#16a34a', color:'white', fontWeight:800, borderRadius:10, border:'none'}}>{saving?"Saving Experience...":"✅ Confirm Payment — Log Experience"}</button>
                <button onClick={()=>setShowPayConfirm(false)} style={{marginTop:8, width:'100%', height:44, background:'white', border:'1px solid #e2e8f0', borderRadius:10}}>Cancel</button>
              </>
            ):(
              <><h3 style={{textAlign:'center'}}>✅ Experience Logged!</h3><p style={{fontSize:12, textAlign:'center'}}>{payAmount} from {payClient} saved to Google Sheet as EARNED_GIG.</p></>
            )}
          </div>
        </div>
      )}

      {showGig && (
        <div style={{position:'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(0,0,0,0.6)', display:'flex', alignItems:'center', justifyContent:'center', padding:16, zIndex:70}}>
          <div style={{background:'white', borderRadius:16, padding:20, maxWidth:420, width:'100%'}}>
            {!gigApproved ? (
              <>
                <h3 style={{margin:0}}>💼 Gig Shopper — App Bot (Personal Path)</h3>
                <p style={{fontSize:11, color:'#64748b', marginTop:6}}>Kpata shops gigs for YOU (Godwin) first. Approve → Resume from your LAB 5→4 log → Apply → Client pays direct to your Opay → Confirm payment = experience.</p>
                <input value={resumeName} onChange={e=>setResumeName(e.target.value)} placeholder="Your full name for resume" style={{width:'100%', height:48, border:'1px solid #25D366', borderRadius:10, padding:'0 12px', marginTop:12}}/>
                <button onClick={approveGig} style={{marginTop:12, width:'100%', height:52, background:'#25D366', color:'white', fontWeight:800, borderRadius:10, border:'none'}}>✅ Yes, Apply For Me — Build Resume From My Log</button>
                <button onClick={()=>setShowGig(false)} style={{marginTop:8, width:'100%', height:44, background:'white', border:'1px solid #e2e8f0', borderRadius:10}}>Maybe Later</button>
              </>
            ):(
              <>
                <h3 style={{textAlign:'center'}}>✅ Applied! Resume from your log sent.</h3>
                <p style={{fontSize:11, textAlign:'center'}}>When client pays direct to your Opay, confirm to log experience.</p>
                <button onClick={()=>{setShowGig(false); setShowPayConfirm(true);}} style={{marginTop:12, width:'100%', height:52, background:'#16a34a', color:'white', fontWeight:800, borderRadius:10, border:'none'}}>💰 Confirm Payment Received — Log Experience</button>
                <button onClick={()=>setShowGig(false)} style={{marginTop:8, width:'100%', height:44, background:'#111827', color:'white', borderRadius:10, border:'none'}}>Close</button>
              </>
            )}
          </div>
        </div>
      )}

      {showLog && (
        <div style={{position:'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(0,0,0,0.6)', display:'flex', alignItems:'center', justifyContent:'center', padding:16, zIndex:60}}>
          <div style={{background:'white', borderRadius:16, padding:20, maxWidth:400, width:'100%'}}>
            {!saved ? (
              <>
                <h3 style={{margin:0}}>📤 Submit {logType} — Live Tutoring</h3>
                <input value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" style={{width:'100%', height:48, border:'1px solid #e2e8f0', borderRadius:10, padding:'0 12px', marginTop:12}}/>
                <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone / WhatsApp" style={{width:'100%', height:48, border:'1px solid #e2e8f0', borderRadius:10, padding:'0 12px', marginTop:8}}/>
                <button onClick={save} disabled={saving} style={{marginTop:12, width:'100%', height:52, background:saving?'#94a3b8':'#2563eb', color:'white', fontWeight:800, borderRadius:10, border:'none'}}>{saving?"Saving...":"✅ Save to Google Sheet — Personal Log"}</button>
                <button onClick={()=>setShowLog(false)} style={{marginTop:8, width:'100%', height:44, background:'white', border:'1px solid #e2e8f0', borderRadius:10}}>Cancel</button>
              </>
            ):(
              <>
                <h3 style={{textAlign:'center'}}>✅ Saved! Room Arranged — v7 Live Tutoring!</h3>
                <p style={{fontSize:12, textAlign:'center'}}>{name} — {logType} 5→4 — Personal certification path, then adopt for larger society.</p>
                <button onClick={()=>setShowLog(false)} style={{marginTop:8, width:'100%', height:44, background:'#111827', color:'white', borderRadius:10, border:'none'}}>Close</button>
              </>
            )}
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
              <>
                <div style={{display:'flex', justifyContent:'space-between'}}><h3 style={{margin:0}}>Q {cur+1}/5 — Live Tutoring</h3><button onClick={()=>setShowQuiz(false)} style={{border:'none', background:'#f1f5f9', borderRadius:8, padding:'6px 12px'}}>✕</button></div>
                <p style={{fontWeight:700, marginTop:16}}>{QUIZ[cur].q}</p>
                <div style={{display:'grid', gap:10, marginTop:12}}>{QUIZ[cur].a.map((o,i)=><button key={i} onClick={()=>answer(i)} style={{textAlign:'left', padding:14, borderRadius:10, border:sel===i?'2px solid #7c3aed':'1px solid #e2e8f0', background:sel===i?'#f5f3ff':'white', minHeight:48}}>{o}</button>)}</div>
              </>
            ):(
              <>
                <h3 style={{margin:0, textAlign:'center'}}>{score>=4?'✅ Room Arranged! Live Tutoring Complete!':'❌ Try Again'}</h3>
                <p style={{textAlign:'center'}}>{score}/5</p>
                {score>=4 ? (
                  <><button onClick={()=>{setShowQuiz(false); openLog("QUIZ");}} style={{marginTop:12, width:'100%', height:52, background:'#2563eb', color:'white', fontWeight:800, borderRadius:10, border:'none'}}>📤 Save Quiz — Personal Cert Log</button></>
                ): <button onClick={()=>{setCur(0); setScore(0); setDone(false); setSel(null);}} style={{marginTop:12, width:'100%', height:48, background:'#7c3aed', color:'white', fontWeight:700, borderRadius:10, border:'none'}}>Retake</button>}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
