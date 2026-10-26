"use client";
import React, { useState } from "react";

const QUIZ = [
  { q: "Why does ␣Musa␣␣ fail grouping?", a: ["Spaces make it different text", "Color wrong"], correct: 0 },
  { q: "Which removes spaces?", a: ["=TRIM(B2)", "=SUM(B2)"], correct: 0 },
  { q: "2024-13-05 invalid?", a: ["Month 13 no exist", "Year high"], correct: 0 },
  { q: "Remove duplicates?", a: ["Data → Remove duplicates", "Change font"], correct: 0 },
  { q: "Clean rows from 5 dirty?", a: ["4 rows", "10 rows"], correct: 0 },
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
  const [saving,setSaving]=useState(false);
  const [saved,setSaved]=useState(false);
  const [copied,setCopied]=useState(false);
  const CSV=`id,name,date,amount
1, Musa  ,2024-13-05,500
1, Musa  ,2024-13-05,500
3,Amina,2024-05-15,600
4,,2024-05-20,400
5,John Doe,2024-05-18,300`;

  const answer=(i:number)=>{setSel(i); setTimeout(()=>{ if(i===QUIZ[cur].correct) setScore(s=>s+1); if(cur<4){setCur(c=>c+1); setSel(null);} else setDone(true);},300);}
  const openLog=(t:string)=>{setLogType(t); setShowLog(true); setSaved(false);};
  const save=async()=>{
    if(!name||!phone){alert("Name and phone"); return;}
    setSaving(true);
    const URL="https://script.google.com/macros/s/AKfycbxiWGrdTSguuZdixWtERJgeYCXgQS48ZKTnTdYqOPQn16dij7WFl499URHC3quaCCqZ/exec";
    const p={timestamp:new Date().toISOString(), name, phone, type:logType, details:logType==="QUIZ"?`Quiz ${score}/5`:`${logType} done`, score:logType==="QUIZ"?score:"", source:"Kpata_MVP"};
    try{ const l=JSON.parse(localStorage.getItem("kpata_logs")||"[]"); l.push(p); localStorage.setItem("kpata_logs",JSON.stringify(l)); await fetch(URL,{method:"POST",mode:"no-cors",body:JSON.stringify(p)}); setSaved(true);}catch{setSaved(true);} setSaving(false);
  };

  return (
    <div style={{minHeight:'100vh', background:'#f1f5f9', padding:'16px 16px 80px', fontFamily:'system-ui'}}>
      <div style={{maxWidth:720, margin:'0 auto'}}>

        <div style={{background:'white', border:'1px solid #e2e8f0', borderRadius:12, padding:16}}>
          <h1 style={{margin:0, fontSize:20}}>Kpata_Academy_MVP</h1>
          <p style={{fontSize:12, color:'#64748b', marginTop:4}}>LESSON 1: What is Dirty Data? • 20 min • FREE • Phone OK • Simple English</p>
          {/* GOOGLE LINK - Main Backup if lesson disappears */}
          <a href="https://www.coursera.org/professional-certificates/google-data-analytics" target="_blank" style={{display:'flex', height:52, background:'#1a73e8', color:'white', fontWeight:800, borderRadius:10, alignItems:'center', justifyContent:'center', textDecoration:'none', marginTop:12}}>🔗 Continue Full Training — Google Data Analytics (FREE to Audit)</a>
          <p style={{fontSize:10, color:'#16a34a', textAlign:'center', marginTop:6}}>If Kpata lesson disappears, click above — official Google course + certificate</p>
        </div>

        <div style={{marginTop:12, background:'white', borderRadius:12, padding:16, border:'1px solid #e2e8f0'}}>
          <h2 style={{margin:0, fontSize:16}}>📖 What is Dirty Data?</h2>
          <p style={{fontSize:12, lineHeight:1.6, marginTop:8}}>Duplicate, empty, invalid date, hidden spaces. Example: "␣Musa␣␣" and "Musa" look same but Sheets counts as different — sales report fails. Clean like you remove stones from rice before cooking.</p>
        </div>

        <div style={{marginTop:12, background:'white', borderRadius:12, padding:16, border:'1px solid #e2e8f0'}}>
          <h2 style={{margin:'0 0 8px', fontSize:15}}>📊 Dirty Table (5 rows)</h2>
          <div style={{background:'#fef2f2', padding:6, borderRadius:6, fontSize:11, color:'#dc2626'}}>Yellow = hidden spaces ␣Musa␣␣ • Red = invalid month 13 • Dup = id 1 twice • Empty = row 4</div>
          <table style={{width:'100%', borderCollapse:'collapse', fontSize:12, marginTop:8}}>
            <thead><tr style={{background:'#f8fafc'}}><th style={{border:'1px solid #e2e8f0', padding:8}}>id</th><th style={{border:'1px solid #e2e8f0', padding:8}}>name</th><th style={{border:'1px solid #e2e8f0', padding:8}}>date</th><th style={{border:'1px solid #e2e8f0', padding:8}}>amount</th></tr></thead>
            <tbody>
              <tr><td style={{border:'1px solid #e2e8f0', padding:8}}>1</td><td style={{border:'1px solid #e2e8f0', padding:8, background:'#fef3c7'}}><span style={{border:'1px dashed #f59e0b', padding:'2px 6px', borderRadius:4, background:'#fef9c3'}}>␣Musa␣␣</span></td><td style={{border:'1px solid #e2e8f0', padding:8, background:'#fee2e2'}}>2024-13-05</td><td style={{border:'1px solid #e2e8f0', padding:8}}>500</td></tr>
              <tr><td style={{border:'1px solid #e2e8f0', padding:8}}>1</td><td style={{border:'1px solid #e2e8f0', padding:8}}>Musa (dup)</td><td style={{border:'1px solid #e2e8f0', padding:8}}>2024-13-05</td><td style={{border:'1px solid #e2e8f0', padding:8}}>500</td></tr>
              <tr><td style={{border:'1px solid #e2e8f0', padding:8}}>3</td><td style={{border:'1px solid #e2e8f0', padding:8}}>Amina</td><td style={{border:'1px solid #e2e8f0', padding:8}}>2024-05-15</td><td style={{border:'1px solid #e2e8f0', padding:8}}>600</td></tr>
              <tr><td style={{border:'1px solid #e2e8f0', padding:8}}>4</td><td style={{border:'1px solid #e2e8f0', padding:8}}>(empty)</td><td style={{border:'1px solid #e2e8f0', padding:8}}>2024-05-20</td><td style={{border:'1px solid #e2e8f0', padding:8}}>400</td></tr>
              <tr><td style={{border:'1px solid #e2e8f0', padding:8}}>5</td><td style={{border:'1px solid #e2e8f0', padding:8}}>John Doe</td><td style={{border:'1px solid #e2e8f0', padding:8}}>2024-05-18</td><td style={{border:'1px solid #e2e8f0', padding:8}}>300</td></tr>
            </tbody>
          </table>
        </div>

        <div style={{marginTop:12, background:'white', borderRadius:12, padding:16, border:'1px solid #e2e8f0'}}>
          <h2 style={{margin:0, fontSize:16}}>🧪 LAB: Clean It (20 min)</h2>
          <div style={{marginTop:8, fontSize:12, lineHeight:1.6}}>
            <div>1. <code>=TRIM(B2)</code> removes ␣ spaces</div>
            <div>2. Fix 2024-13-05 → 2024-05-05</div>
            <div>3. Data → Remove duplicates (id=1)</div>
            <div>4. Fill empty with "Unknown"</div>
            <div>5. Final = 4 clean rows</div>
          </div>
          <div style={{display:'flex', gap:8, marginTop:12}}>
            <a href="https://docs.google.com/spreadsheets/create" target="_blank" style={{flex:2, height:48, background:'#22c55e', color:'white', fontWeight:700, borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', textDecoration:'none'}}>🔗 Open Sheets</a>
            <button onClick={()=>{navigator.clipboard.writeText(CSV); setCopied(true); setTimeout(()=>setCopied(false),2000);}} style={{flex:1, height:48, border:'2px solid #22c55e', borderRadius:10, fontWeight:700, background:'white'}}>{copied?"Copied!":"📋 Copy"}</button>
          </div>
          <div style={{marginTop:8, background:'#f8fafc', fontSize:11, fontFamily:'monospace', padding:8, borderRadius:8, whiteSpace:'pre-wrap'}}>{CSV}</div>
          <button onClick={()=>openLog("LAB")} style={{marginTop:12, width:'100%', height:52, background:'#2563eb', color:'white', fontWeight:800, borderRadius:10, border:'none'}}>🤖 Submit LAB to Google Sheet</button>
        </div>

        <div style={{marginTop:12, background:'white', borderRadius:12, padding:16, border:'1px solid #f59e0b'}}>
          <h2 style={{margin:0, fontSize:16}}>📝 HOMEWORK</h2>
          <p style={{fontSize:12, marginTop:6}}>Create 5 rows with your friends names (add 1 with ␣ spaces + duplicate + empty + invalid date) → Clean to 4.</p>
          <button onClick={()=>openLog("HW")} style={{marginTop:12, width:'100%', height:52, background:'#ea580c', color:'white', fontWeight:800, borderRadius:10, border:'none'}}>📤 Submit Homework</button>
        </div>

        <div style={{marginTop:12, background:'white', borderRadius:12, padding:16, border:'1px solid #8b5cf6'}}>
          <h2 style={{margin:0, fontSize:16}}>🎯 QUIZ + Google Path</h2>
          <p style={{fontSize:12, marginTop:6}}>5 questions • 80% pass • Saves to Sheet • Then go to Google cert</p>
          <button onClick={()=>setShowQuiz(true)} style={{marginTop:12, width:'100%', height:52, background:'#7c3aed', color:'white', fontWeight:800, borderRadius:10, border:'none'}}>🚀 Take Quiz</button>
          <a href="https://www.coursera.org/professional-certificates/google-data-analytics" target="_blank" style={{display:'flex', height:48, background:'white', border:'1px solid #1a73e8', color:'#1a73e8', fontWeight:700, borderRadius:10, alignItems:'center', justifyContent:'center', textDecoration:'none', marginTop:8}}>🔗 Google Data Analytics — Official</a>
        </div>

        <div style={{marginTop:12, background:'white', borderRadius:12, padding:16, border:'1px solid #25D366'}}>
          <h2 style={{margin:0, fontSize:15}}>📢 Updates</h2>
          <a href="https://whatsapp.com/channel/0029Vb7eUeBGzzKTHPIaoe0b" target="_blank" style={{display:'flex', height:48, background:'#25D366', color:'white', fontWeight:800, borderRadius:10, alignItems:'center', justifyContent:'center', textDecoration:'none', marginTop:12}}>📱 Join WhatsApp Channel</a>
        </div>

        <div style={{marginTop:12, background:'#fefce8', borderRadius:10, padding:12}}>
          <p style={{fontSize:11, margin:0, lineHeight:1.5}}>Kpata is FREE training, not certificate issuer. Your LAB+HW+Quiz saved to Google Sheet is your evidence for Google/IBM/Microsoft certificates.</p>
        </div>

      </div>

      {showLog && (
        <div style={{position:'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(0,0,0,0.6)', display:'flex', alignItems:'center', justifyContent:'center', padding:16, zIndex:60}}>
          <div style={{background:'white', borderRadius:16, padding:20, maxWidth:400, width:'100%'}}>
            {!saved ? (
              <>
                <h3 style={{margin:0}}>📤 Submit {logType}</h3>
                <input value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" style={{width:'100%', height:48, border:'1px solid #e2e8f0', borderRadius:10, padding:'0 12px', marginTop:12}}/>
                <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone" style={{width:'100%', height:48, border:'1px solid #e2e8f0', borderRadius:10, padding:'0 12px', marginTop:8}}/>
                <button onClick={save} disabled={saving} style={{marginTop:12, width:'100%', height:52, background:'#2563eb', color:'white', fontWeight:800, borderRadius:10, border:'none'}}>{saving?"Saving...":"✅ Save to Google Sheet"}</button>
                <button onClick={()=>setShowLog(false)} style={{marginTop:8, width:'100%', height:44, background:'white', border:'1px solid #e2e8f0', borderRadius:10}}>Cancel</button>
              </>
            ):(
              <>
                <h3 style={{textAlign:'center'}}>✅ Saved!</h3>
                <p style={{fontSize:12, textAlign:'center'}}>{name} — {logType}</p>
                <a href="https://www.coursera.org/professional-certificates/google-data-analytics" target="_blank" style={{display:'block', background:'white', border:'1px solid #2563eb', borderRadius:8, padding:'10px', textAlign:'center', textDecoration:'none', fontWeight:700, fontSize:12, marginTop:8}}>🔗 Continue to Google Certificate</a>
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
                <p style={{fontWeight:700, marginTop:12}}>{QUIZ[cur].q}</p>
                <div style={{display:'grid', gap:10, marginTop:12}}>{QUIZ[cur].a.map((o,i)=><button key={i} onClick={()=>answer(i)} style={{textAlign:'left', padding:14, borderRadius:10, border:sel===i?'2px solid #7c3aed':'1px solid #e2e8f0', background:sel===i?'#f5f3ff':'white', minHeight:48}}>{o}</button>)}</div>
              </>
            ):(
              <>
                <h3 style={{textAlign:'center'}}>{score>=4?'✅ Pass!':'❌ Try Again'}</h3>
                <p style={{textAlign:'center'}}>{score}/5</p>
                {score>=4 ? (
                  <><div style={{background:'#f0fdf4', padding:10, borderRadius:8, fontSize:12}}>Not a certificate — training log only. Saved as evidence for Google cert.</div>
                  <button onClick={()=>{setShowQuiz(false); openLog("QUIZ");}} style={{marginTop:12, width:'100%', height:52, background:'#2563eb', color:'white', fontWeight:800, borderRadius:10, border:'none'}}>📤 Save Quiz → Google Sheet</button>
                  <a href="https://www.coursera.org/professional-certificates/google-data-analytics" target="_blank" style={{display:'block', marginTop:8, textAlign:'center', padding:10, border:'1px solid #2563eb', borderRadius:8, textDecoration:'none', fontWeight:700}}>🔗 Google Data Analytics — Official Training</a></>
                ): <button onClick={()=>{setCur(0); setScore(0); setDone(false); setSel(null);}} style={{marginTop:12, width:'100%', height:48, background:'#7c3aed', color:'white', fontWeight:700, borderRadius:10, border:'none'}}>Retake</button>}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
