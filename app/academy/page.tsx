"use client";
import React, { useState } from "react";
const QUIZ = [
  { q: "Why does ␣Musa␣␣ cause grouping to fail?", a: ["Spaces make it different text","Color is wrong","Number too big"], correct: 0 },
  { q: "Which formula removes spaces?", a: ["=TRIM(B2)","=SUM(B2)","=DELETE(B2)"], correct: 0 },
  { q: "2024-13-05 is invalid because?", a: ["Month 13 does not exist","Year too high","Day is Sunday"], correct: 0 },
  { q: "How to remove duplicates in Sheets?", a: ["Data → Remove duplicates","Change font","Delete phone"], correct: 0 },
  { q: "Final clean rows from 5 dirty rows?", a: ["4 rows","10 rows","0 rows"], correct: 0 },
];
const GIGS = [
  { title: "Clean 50 rows shop sales - N1,500", pay: "N1,500", skill: "Lesson 1 TRIM" },
  { title: "Remove duplicates in Excel - $5 Fiverr", pay: "$5", skill: "Lesson 1 Duplicates" },
  { title: "Fix invalid dates in sales book - N1,000", pay: "N1,000", skill: "Lesson 1 Date Fix" },
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
    const p={timestamp:new Date().toISOString(), name, phone, type:logType, details:logType==="HW"?hwText:logType==="QUIZ"?`Quiz ${score}/5`:`${logType} 5→4 Dirty Room`, score:logType==="QUIZ"?score:"", whatsapp_channel:"https://whatsapp.com/channel/0029Vb7eUeBGzzKTHPIaoe0b", source:"Kpata_v5_NoTabs"};
    try{ const l=JSON.parse(localStorage.getItem("kpata_logs")||"[]"); l.push(p); localStorage.setItem("kpata_logs",JSON.stringify(l)); await fetch(URL,{method:"POST",mode:"no-cors",body:JSON.stringify(p)}); setSaved(true);}catch{setSaved(true);} setSaving(false);
  };
  const confirmPayment=async()=>{
    if(!payAmount||!payClient){alert("Enter amount and client name"); return;}
    setSaving(true);
    const URL="https://script.google.com/macros/s/AKfycbxiWGrdTSguuZdixWtERJgeYCXgQS48ZKTnTdYqOPQn16dij7WFl499URHC3quaCCqZ/exec";
    const p={timestamp:new Date().toISOString(), name:resumeName||name||"Student", phone:phone||"from log", type:"EARNED_GIG", details:`Earned ${payAmount} from ${payClient} - Gig: Data cleaning 5→4 - Experience logged`, amount:payAmount, client:payClient, source:"Kpata_Gig_Earning_Experience"};
    try{ const l=JSON.parse(localStorage.getItem("kpata_logs")||"[]"); l.push(p); localStorage.setItem("kpata_logs",JSON.stringify(l)); await fetch(URL,{method:"POST",mode:"no-cors",body:JSON.stringify(p)}); setPaySaved(true); setTimeout(()=>{setShowPayConfirm(false); setPaySaved(false); setPayAmount(""); setPayClient("");},2000);}catch{setPaySaved(true);} setSaving(false);
  };
  const approveGig=()=>{
    if(!resumeName){alert("Enter your name for resume"); return;}
    setGigApproved(true);
    setTimeout(()=>setShowGig(false),1500);
    const URL="https://script.google.com/macros/s/AKfycbxiWGrdTSguuZdixWtERJgeYCXgQS48ZKTnTdYqOPQn16dij7WFl499URHC3quaCCqZ/exec";
    const p={timestamp:new Date().toISOString(), name:resumeName, phone:phone||"from log", type:"GIG_APPROVED", details:`Approved gig: ${GIGS[0].title} - Resume auto-built from LAB 5→4`, source:"Kpata_Gig_Shopper"};
    try{ const l=JSON.parse(localStorage.getItem("kpata_logs")||"[]"); l.push(p); localStorage.setItem("kpata_logs",JSON.stringify(l)); fetch(URL,{method:"POST",mode:"no-cors",body:JSON.stringify(p)});}catch{}
  };
  return (
    <div style={{minHeight:'100vh', background:'#f1f5f9', padding:'16px 16px 120px', fontFamily:'system-ui'}}>
      <div style={{maxWidth:720, margin:'0 auto'}}>
        <div style={{background:'white', border:'1px solid #e2e8f0', borderRadius:12, padding:16}}>
          <h1 style={{margin:0, fontSize:20, fontWeight:800}}>Kpata_Academy_MVP</h1>
          <p style={{fontSize:12, color:'#64748b', marginTop:4}}>LESSON 1: What is Dirty Data? • 20 min • FREE • Phone-friendly • Simple English</p>
          <div style={{display:'flex', gap:8, marginTop:8, flexWrap:'wrap'}}>
            <span style={{background:'#dcfce7', color:'#166534', padding:'4px 8px', borderRadius:6, fontSize:11, fontWeight:700}}>Progress: 0% • Live</span>
            <span style={{background:'#f1f5f9', padding:'4px 8px', borderRadius:6, fontSize:11}}>Self-paced • 2G • Tecno/Infinix OK</span>
          </div>
        </div>

        <div style={{marginTop:12, background:'white', borderRadius:12, padding:16, border:'1px solid #e2e8f0'}}>
          <h2 style={{margin:0, fontSize:16}}>📖 Lesson 1 Deep: What is Dirty Data?</h2>
          <p style={{fontSize:13, lineHeight:1.7, marginTop:10, color:'#1e293b'}}>Dirty data is like a <strong>dirty room with clothes on the ground</strong> — you cannot find your shoes until you arrange the room. You have shirts on chair, trousers on floor, socks under bed. You want to go out, you cannot find your belt. Why? Room is dirty, not arranged.</p>
          <p style={{fontSize:12, lineHeight:1.7, marginTop:8, color:'#334155'}}>Same with data. You have sales in book. You write "Musa" 2 times, you leave customer name empty, you type month 13 (no month 13). Excel counts " Musa  " and "Musa" as different customers. Your sales report says you have 5 customers, but real is 4. Wrong decision because data dirty.</p>
          <div style={{background:'#fffbeb', border:'1px solid #fde68a', padding:10, borderRadius:8, marginTop:10, fontSize:12}}><strong>Simple English — Dirty Room:</strong> Clothes on ground = duplicate data. Empty space where shoe should be = blank data. Shirt with wrong size tag = invalid date 2024-13-05. You must arrange room first: fold clothes (remove spaces), throw away duplicate shirt (remove duplicates), fill empty box (fill blanks), fix wrong tag (fix date). Then room clean, you can find everything fast. Same with data — clean first, then analyze.</div>
        </div>

        <div style={{marginTop:12, background:'white', borderRadius:12, padding:16, border:'1px solid #e2e8f0', overflowX:'auto'}}>
          <h2 style={{margin:'0 0 8px', fontSize:16}}>📊 Dirty Data Table — Like Dirty Room</h2>
          <p style={{fontSize:11, color:'#dc2626', background:'#fef2f2', padding:6, borderRadius:6}}>Yellow = hidden spaces ␣Musa␣␣ = shirt on floor • Red = month 13 = wrong size tag • Dup = same shirt twice • Empty = empty shoe box</p>
          <table style={{width:'100%', borderCollapse:'collapse', fontSize:12, marginTop:8}}>
            <thead><tr style={{background:'#f8fafc'}}><th style={{border:'1px solid #e2e8f0', padding:8}}>id</th><th style={{border:'1px solid #e2e8f0', padding:8}}>name</th><th style={{border:'1px solid #e2e8f0', padding:8}}>date</th><th style={{border:'1px solid #e2e8f0', padding:8}}>amount</th></tr></thead>
            <tbody>
              <tr><td style={{border:'1px solid #e2e8f0', padding:8}}>1</td><td style={{border:'1px solid #e2e8f0', padding:8, background:'#fef3c7'}}><span style={{background:'#fef9c3', border:'1px dashed #f59e0b', padding:'4px 8px', borderRadius:4, fontFamily:'monospace', fontSize:13}}>␣Musa␣␣</span></td><td style={{border:'1px solid #e2e8f0', padding:8, background:'#fee2e2'}}>2024-13-05</td><td style={{border:'1px solid #e2e8f0', padding:8}}>500</td></tr>
              <tr><td style={{border:'1px solid #e2e8f0', padding:8}}>1</td><td style={{border:'1px solid #e2e8f0', padding:8}}>Musa (same shirt)</td><td style={{border:'1px solid #e2e8f0', padding:8}}>2024-13-05</td><td style={{border:'1px solid #e2e8f0', padding:8}}>500</td></tr>
              <tr><td style={{border:'1px solid #e2e8f0', padding:8}}>3</td><td style={{border:'1px solid #e2e8f0', padding:8}}>Amina (clean)</td><td style={{border:'1px solid #e2e8f0', padding:8}}>2024-05-15</td><td style={{border:'1px solid #e2e8f0', padding:8}}>600</td></tr>
              <tr><td style={{border:'1px solid #e2e8f0', padding:8}}>4</td><td style={{border:'1px solid #e2e8f0', padding:8, background:'#fee2e2'}}>(empty)</td><td style={{border:'1px solid #e2e8f0', padding:8}}>2024-05-20</td><td style={{border:'1px solid #e2e8f0', padding:8}}>400</td></tr>
              <tr><td style={{border:'1px solid #e2e8f0', padding:8}}>5</td><td style={{border:'1px solid #e2e8f0', padding:8}}>John Doe (clean)</td><td style={{border:'1px solid #e2e8f0', padding:8}}>2024-05-18</td><td style={{border:'1px solid #e2e8f0', padding:8}}>300</td></tr>
            </tbody>
          </table>
        </div>

        <div style={{background:'white', border:'1px solid #e2e8f0', borderRadius:12, padding:16, marginTop:12}}>
          <h2 style={{margin:0, fontSize:18}}>🧪 LAB: Arrange Dirty Room</h2>
          <div style={{display:'flex', gap:8, marginTop:12}}>
            <a href="https://docs.google.com/spreadsheets/create" target="_blank" style={{flex:2, height:52, background:'#22c55e', color:'white', fontWeight:700, fontSize:14, borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', textDecoration:'none'}}>🔗 Open Sheets (Free)</a>
            <button onClick={()=>{navigator.clipboard.writeText(CSV_DIRTY); setCopied(true); setTimeout(()=>setCopied(false),2000);}} style={{flex:1, height:52, background:'white', border:'2px solid #22c55e', borderRadius:10, fontWeight:700, fontSize:12}}>{copied?"Copied!":"📋 Copy CSV"}</button>
          </div>
          <div style={{marginTop:10, background:'#f8fafc', borderRadius:10, padding:12, fontFamily:'monospace', fontSize:12, whiteSpace:'pre-wrap', border:'1px dashed #cbd5e1', lineHeight:1.6}}>{CSV_DIRTY}</div>
          <div style={{marginTop:12, display:'grid', gap:8}}>
            <div style={{border:'1px solid #bbf7d0', borderRadius:10, padding:12, background:'#f0fdf4', fontSize:12}}><strong>Step 1 TRIM:</strong> =TRIM(B2) → ␣Musa␣␣ → Musa.</div>
            <div style={{border:'1px solid #fecaca', borderRadius:10, padding:12, background:'#fef2f2', fontSize:12}}><strong>Step 2 Fix Date:</strong> 2024-13-05 → 2024-05-05.</div>
            <div style={{border:'1px solid #fde68a', borderRadius:10, padding:12, background:'#fefce8', fontSize:12}}><strong>Step 3 Duplicate:</strong> Data → Remove duplicates.</div>
            <div style={{border:'1px solid #bfdbfe', borderRadius:10, padding:12, background:'#eff6ff', fontSize:12}}><strong>Step 4 Blank:</strong> Filter blanks → Unknown.</div>
            <div style={{border:'1px solid #16a34a', borderRadius:10, padding:12, background:'#f0fdf4', fontSize:12, fontFamily:'monospace', lineHeight:1.6}}><strong>✅ Final Clean (4 rows):</strong><br/>{CSV_CLEAN}</div>
          </div>
          <button onClick={()=>openLog("LAB")} style={{marginTop:12, width:'100%', height:52, background:'#2563eb', color:'white', fontWeight:800, fontSize:15, borderRadius:10, border:'none'}}>🤖 Submit LAB — I Arranged 5→4</button>
        </div>

        <div style={{background:'white', border:'1px solid #f59e0b', borderRadius:12, padding:16, marginTop:12}}>
          <h2 style={{margin:0, fontSize:18}}>📝 HOMEWORK: Arrange Your Own Room</h2>
          <input value={hwText} onChange={e=>setHwText(e.target.value)} placeholder="Type 5 friends names, add ␣ spaces" style={{width:'100%', height:52, border:'2px solid #f59e0b', borderRadius:10, padding:'0 12px', marginTop:10, fontSize:13}}/>
          <button onClick={()=>openLog("HW")} style={{marginTop:10, width:'100%', height:52, background:'#ea580c', color:'white', fontWeight:800, fontSize:15, borderRadius:10, border:'none'}}>📤 Submit Homework</button>
        </div>

        <div style={{background:'#fef3c7', border:'1px solid #f59e0b', borderRadius:12, padding:16, marginTop:12}}>
          <h2 style={{margin:0, fontSize:16}}>💰 Earn N500 — Clean Shop Data</h2>
          <p style={{fontSize:12, lineHeight:1.6, marginTop:8}}>Clean 1 shop book 5→4, charge N500, screenshot = portfolio. 5 jobs = N2,500 = pay for Google cert data.</p>
        </div>

        <div style={{background:'white', border:'1px solid #25D366', borderRadius:12, padding:16, marginTop:12}}>
          <h2 style={{margin:0, fontSize:16}}>💼 Gig Shopper — Kpata Shops Gigs For You</h2>
          <div style={{marginTop:10, display:'grid', gap:8}}>
            {GIGS.map((g,i)=><div key={i} style={{border:'1px solid #e2e8f0', borderRadius:8, padding:10}}><div style={{fontWeight:700, fontSize:12}}>{g.title}</div><div style={{fontSize:10, color:'#64748b'}}>{g.skill} • {g.pay}</div></div>)}
          </div>
          <button onClick={()=>setShowGig(true)} style={{marginTop:12, width:'100%', height:52, background:'#25D366', color:'white', fontWeight:800, fontSize:14, borderRadius:10, border:'none'}}>🤖 App Bot: Show Gigs + Auto-Resume</button>
        </div>

        <div style={{background:'white', border:'1px solid #8b5cf6', borderRadius:12, padding:16, marginTop:12}}>
          <h2 style={{margin:0, fontSize:18}}>🎯 QUIZ: Did You Arrange Room Well?</h2>
          <button onClick={()=>setShowQuiz(true)} style={{marginTop:12, width:'100%', height:52, background:'#7c3aed', color:'white', fontWeight:800, fontSize:15, borderRadius:10, border:'none'}}>🚀 Take Quiz — Dirty Room</button>
        </div>

        <div style={{background:'white', border:'1px solid #25D366', borderRadius:12, padding:16, marginTop:12}}>
          <a href="https://whatsapp.com/channel/0029Vb7eUeBGzzKTHPIaoe0b" target="_blank" style={{display:'flex', height:52, background:'#25D366', color:'white', fontWeight:800, borderRadius:10, alignItems:'center', justifyContent:'center', textDecoration:'none'}}>📱 Join WhatsApp Channel — Gigs + News</a>
        </div>

        <div style={{marginTop:12, background:'#fefce8', borderRadius:10, padding:12}}>
          <p style={{fontSize:11, margin:0}}><strong>Kpata Academy:</strong> FREE training, not certifying body. Log to Google Sheet as evidence for Google cert.</p>
        </div>
      </div>

      {showPayConfirm && (
        <div style={{position:'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(0,0,0,0.6)', display:'flex', alignItems:'center', justifyContent:'center', padding:16, zIndex:80}}>
          <div style={{background:'white', borderRadius:16, padding:20, maxWidth:420, width:'100%'}}>
            {!paySaved ? (
              <>
                <h3 style={{margin:0}}>💰 Confirm Payment — Experience Log</h3>
                <input value={payClient} onChange={e=>setPayClient(e.target.value)} placeholder="Client name" style={{width:'100%', height:48, border:'1px solid #16a34a', borderRadius:10, padding:'0 12px', marginTop:12}}/>
                <input value={payAmount} onChange={e=>setPayAmount(e.target.value)} placeholder="Amount N1,500 or $5" style={{width:'100%', height:48, border:'1px solid #16a34a', borderRadius:10, padding:'0 12px', marginTop:8}}/>
                <input value={resumeName} onChange={e=>setResumeName(e.target.value)} placeholder="Your name" style={{width:'100%', height:48, border:'1px solid #e2e8f0', borderRadius:10, padding:'0 12px', marginTop:8}}/>
                <button onClick={confirmPayment} disabled={saving} style={{marginTop:12, width:'100%', height:52, background:saving?'#94a3b8':'#16a34a', color:'white', fontWeight:800, borderRadius:10, border:'none'}}>{saving?"Saving...":"✅ Confirm Payment — Log Experience"}</button>
                <button onClick={()=>setShowPayConfirm(false)} style={{marginTop:8, width:'100%', height:44, background:'white', border:'1px solid #e2e8f0', borderRadius:10}}>Cancel</button>
              </>
            ):(
              <><h3 style={{textAlign:'center'}}>✅ Experience Logged!</h3><p style={{fontSize:12, textAlign:'center'}}>{payAmount} from {payClient} saved.</p></>
            )}
          </div>
        </div>
      )}

      {showGig && (
        <div style={{position:'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(0,0,0,0.6)', display:'flex', alignItems:'center', justifyContent:'center', padding:16, zIndex:70}}>
          <div style={{background:'white', borderRadius:16, padding:20, maxWidth:420, width:'100%'}}>
            {!gigApproved ? (
              <>
                <h3 style={{margin:0}}>💼 Gig Shopper — App Bot</h3>
                <input value={resumeName} onChange={e=>setResumeName(e.target.value)} placeholder="Your full name for resume" style={{width:'100%', height:48, border:'1px solid #25D366', borderRadius:10, padding:'0 12px', marginTop:12}}/>
                <button onClick={approveGig} style={{marginTop:12, width:'100%', height:52, background:'#25D366', color:'white', fontWeight:800, borderRadius:10, border:'none'}}>✅ Yes, Apply For Me</button>
                <button onClick={()=>setShowGig(false)} style={{marginTop:8, width:'100%', height:44, background:'white', border:'1px solid #e2e8f0', borderRadius:10}}>Maybe Later</button>
              </>
            ):(
              <>
                <h3 style={{textAlign:'center'}}>✅ Applied!</h3>
                <button onClick={()=>{setShowGig(false); setShowPayConfirm(true);}} style={{marginTop:12, width:'100%', height:52, background:'#16a34a', color:'white', fontWeight:800, borderRadius:10, border:'none'}}>💰 Confirm Payment Received</button>
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
                <h3 style={{margin:0}}>📤 Submit {logType}</h3>
                <input value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" style={{width:'100%', height:48, border:'1px solid #e2e8f0', borderRadius:10, padding:'0 12px', marginTop:12}}/>
                <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone / WhatsApp" style={{width:'100%', height:48, border:'1px solid #e2e8f0', borderRadius:10, padding:'0 12px', marginTop:8}}/>
                <button onClick={save} disabled={saving} style={{marginTop:12, width:'100%', height:52, background:saving?'#94a3b8':'#2563eb', color:'white', fontWeight:800, borderRadius:10, border:'none'}}>{saving?"Saving...":"✅ Save to Google Sheet"}</button>
                <button onClick={()=>setShowLog(false)} style={{marginTop:8, width:'100%', height:44, background:'white', border:'1px solid #e2e8f0', borderRadius:10}}>Cancel</button>
              </>
            ):(
              <>
                <h3 style={{textAlign:'center'}}>✅ Saved!</h3>
                <p style={{fontSize:12, textAlign:'center'}}>{name} — {logType} 5→4</p>
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
                <div style={{display:'flex', justifyContent:'space-between'}}><h3 style={{margin:0}}>Q {cur+1}/5</h3><button onClick={()=>setShowQuiz(false)} style={{border:'none', background:'#f1f5f9', borderRadius:8, padding:'6px 12px'}}>✕</button></div>
                <p style={{fontWeight:700, marginTop:16}}>{QUIZ[cur].q}</p>
                <div style={{display:'grid', gap:10, marginTop:12}}>{QUIZ[cur].a.map((o,i)=><button key={i} onClick={()=>answer(i)} style={{textAlign:'left', padding:14, borderRadius:10, border:sel===i?'2px solid #7c3aed':'1px solid #e2e8f0', background:sel===i?'#f5f3ff':'white', minHeight:48}}>{o}</button>)}</div>
              </>
            ):(
              <>
                <h3 style={{margin:0, textAlign:'center'}}>{score>=4?'✅ Room Arranged!':'❌ Try Again'}</h3>
                <p style={{textAlign:'center'}}>{score}/5</p>
                {score>=4 ? (
                  <><button onClick={()=>{setShowQuiz(false); openLog("QUIZ");}} style={{marginTop:12, width:'100%', height:52, background:'#2563eb', color:'white', fontWeight:800, borderRadius:10, border:'none'}}>📤 Save Quiz</button></>
                ): <button onClick={()=>{setCur(0); setScore(0); setDone(false); setSel(null);}} style={{marginTop:12, width:'100%', height:48, background:'#7c3aed', color:'white', fontWeight:700, borderRadius:10, border:'none'}}>Retake</button>}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
