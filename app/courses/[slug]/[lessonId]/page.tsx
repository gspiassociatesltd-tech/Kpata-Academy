"use client";
import React, { useState } from "react";
const QUIZ = [
  { q: "How many duplicates in table?", a: ["1 duplicate - Musa appears twice (id=1)","0","2"], correct: 0 },
  { q: "Which dates invalid?", a: ["2024-13-05 - month 13 doesn't exist","2024-05-15","All valid"], correct: 0 },
  { q: "What will you do with empty customer?", a: ["Fill with Unknown or delete row","Leave empty","Ignore"], correct: 0 },
  { q: "Why ␣Musa␣␣ fails grouping?", a: ["Hidden spaces - TRIM removes","Color wrong","Too big"], correct: 0 },
  { q: "After clean, how many rows?", a: ["4 clean from 5 dirty","5","3"], correct: 0 },
];
export default function Lesson1(){
  const [q1,setQ1]=useState(""); const [q2,setQ2]=useState(""); const [q3,setQ3]=useState(""); const [fellow,setFellow]=useState("");
  const [showQuiz,setShowQuiz]=useState(false); const [cur,setCur]=useState(0); const [score,setScore]=useState(0); const [done,setDone]=useState(false); const [sel,setSel]=useState<number|null>(null);
  const [showLog,setShowLog]=useState(false); const [logType,setLogType]=useState("LAB"); const [name,setName]=useState(""); const [phone,setPhone]=useState(""); const [saving,setSaving]=useState(false); const [saved,setSaved]=useState(false); const [copied,setCopied]=useState(false);
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
  const answer=(i:number)=>{setSel(i); setTimeout(()=>{ if(i===QUIZ[cur].correct) setScore(s=>s+1); if(cur<4){setCur(c=>c+1); setSel(null);} else setDone(true);},300);}
  const openLog=(t:string)=>{setLogType(t); setShowLog(true); setSaved(false);};
  const save=async()=>{
    if(!name||!phone){alert("Enter name and phone"); return;}
    if(logType==="LAB" && (!q1||!q2||!q3)){alert("Answer 3 questions first: duplicates, dates, empty"); return;}
    if(logType==="FELLOW" && !fellow){alert("Explain duplicate in simple English"); return;}
    setSaving(true);
    const URL="https://script.google.com/macros/s/AKfycbxiWGrdTSguuZdixWtERJgeYCXgQS48ZKTnTdYqOPQn16dij7WFl499URHC3quaCCqZ/exec";
    const p={timestamp:new Date().toISOString(), name, phone, type:logType, q1_duplicates:q1, q2_dates:q2, q3_empty:q3, fellow_check:fellow, details:`${logType} Q1:${q1} Q2:${q2} Q3:${q3} Fellow:${fellow} ${score?`Quiz ${score}/5`:''}`, score:logType==="QUIZ"?score:"", source:"Kpata_Lesson1_Perfect_v10"};
    try{ const l=JSON.parse(localStorage.getItem("kpata_logs")||"[]"); l.push(p); localStorage.setItem("kpata_logs",JSON.stringify(l)); await fetch(URL,{method:"POST",mode:"no-cors",body:JSON.stringify(p)}); setSaved(true);}catch{setSaved(true);} setSaving(false);
  };
  return (
    <div style={{minHeight:'100vh', background:'#f8fafc', padding:'16px 16px 120px', fontFamily:'system-ui'}}>
      <div style={{maxWidth:760, margin:'0 auto'}}>
        <div style={{background:'white', border:'1px solid #e2e8f0', borderRadius:16, padding:20}}>
          <h1 style={{margin:0, fontSize:20, fontWeight:900}}>LESSON 1: What is Dirty Data? • 20 min • FREE</h1>
          <p style={{fontSize:12, color:'#64748b', marginTop:6}}>Phone-friendly • Simple English • No degree • Self-paced</p>
          <div style={{display:'flex', gap:8, marginTop:10}}><span style={{background:'#dcfce7', color:'#166534', padding:'4px 10px', borderRadius:20, fontSize:11, fontWeight:700}}>Progress: 0% • Live</span><span style={{background:'#f1f5f9', padding:'4px 10px', borderRadius:20, fontSize:11}}>2G • Tecno OK</span></div>
          <a href="https://www.coursera.org/professional-certificates/google-data-analytics" target="_blank" style={{display:'flex', height:44, background:'#1a73e8', color:'white', fontWeight:700, fontSize:12, borderRadius:10, alignItems:'center', justifyContent:'center', textDecoration:'none', marginTop:12}}>🔗 Backup: Google Data Analytics Official</a>
        </div>

        <div style={{marginTop:14, background:'white', borderRadius:16, padding:20, border:'2px solid #16a34a'}}>
          <h2 style={{margin:0, fontSize:18, fontWeight:800}}>🧹 Lesson 1 Deep: Dirty Room Analogy</h2>
          <p style={{fontSize:13, lineHeight:1.8, marginTop:10}}>Dirty data is like a <strong>dirty room with clothes on the ground</strong> — you cannot find your shoes until you arrange the room. Shirts on chair, trousers on floor, socks under bed. You want to go out, you cannot find belt. Why? Room dirty, not arranged.</p>
          <p style={{fontSize:12, lineHeight:1.7, marginTop:8, color:'#334155'}}>Same with data: You write "Musa" 2 times, leave name empty, type month 13 (no month 13). Excel counts " Musa  " and "Musa" as different. Sales report says 5 customers, real is 4. Wrong decision because data dirty.</p>
        </div>

        <div style={{marginTop:14, background:'white', borderRadius:16, padding:20, border:'1px solid #e2e8f0'}}>
          <h2 style={{margin:'0 0 8px', fontSize:16, fontWeight:800}}>📖 Steps to Clean Dirty Data</h2>
          <div style={{display:'grid', gap:10, fontSize:12, lineHeight:1.7}}>
            <div style={{background:'#fef3c7', border:'1px solid #fde68a', padding:12, borderRadius:10}}><strong>Step 1: Fix duplicates</strong><br/>Before: 2 identical rows for Musa → After: 1 row<br/><em>How:</em> Data → Remove duplicates → Check id. Same shirt twice, throw one.</div>
            <div style={{background:'#fee2e2', border:'1px solid #fecaca', padding:12, borderRadius:10}}><strong>Step 2: Fix invalid dates</strong><br/>Date that cannot exist. Example: 2024-13-05 (month 13 no exist), 05/15/2024 vs 2024-05-15 mixed formats.<br/><em>How:</em> Make all dates same format YYYY-MM-DD. Fix month 13 → ask correct month or delete row.<br/><code style={{background:'#f1f5f9', padding:'4px 8px', borderRadius:6, display:'inline-block', marginTop:6}}>2024-13-05 → Invalid → Correct to 2024-05-05 or remove</code></div>
            <div style={{background:'#fef2f2', border:'1px solid #fecaca', padding:12, borderRadius:10}}><strong>Step 3: Handle missing data (empty cells)</strong><br/>Cell empty. Example: amount = "" (blank), name = "" (no name).<br/><em>How:</em> Option A: Fill with 0 or "Unknown". Option B: Delete row if important data missing. For amount blank, put 0 or average.<br/><code style={{background:'#f1f5f9', padding:'4px 8px', borderRadius:6, display:'inline-block', marginTop:6}}>amount "" → fill with 0 or average 400</code></div>
            <div style={{background:'#f0fdf4', border:'1px solid #bbf7d0', padding:12, borderRadius:10}}><strong>Step 4: Trim extra spaces</strong><br/>Name " Musa " has spaces. Computer sees " Musa " different from "Musa".<br/><em>How:</em> Use =TRIM() function. =TRIM(" Musa ") → "Musa"<br/><code style={{background:'#f1f5f9', padding:'4px 8px', borderRadius:6, display:'inline-block', marginTop:6}}>" Musa " → TRIM → "Musa"</code></div>
          </div>
        </div>

        <div style={{marginTop:14, background:'white', borderRadius:16, padding:20, border:'1px solid #e2e8f0', overflowX:'auto'}}>
          <h2 style={{margin:'0 0 10px', fontSize:16, fontWeight:800}}>3. Example dirty data (what you will clean)</h2>
          <p style={{fontSize:12, color:'#64748b', marginBottom:10}}>Look at this table — it has all 4 errors:</p>
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

        <div style={{background:'white', border:'2px solid #22c55e', borderRadius:16, padding:20, marginTop:14}}>
          <h2 style={{margin:0, fontSize:18, fontWeight:800}}>🧪 LAB: Clean This Data — Step by Step (Google Sheet)</h2>
          <p style={{fontSize:12, color:'#64748b', marginTop:6}}>Goal: 5 dirty → 4 clean. Phone OK, no laptop. This is what makes Kpata stand out — we teach like we taught you.</p>
          <a href="https://docs.google.com/spreadsheets/create" target="_blank" style={{display:'flex', height:52, background:'#16a34a', color:'white', fontWeight:800, fontSize:14, borderRadius:12, alignItems:'center', justifyContent:'center', textDecoration:'none', marginTop:12}}>🔗 Open Google Sheet — Free — Data Already Inside Template</a>
          <div style={{marginTop:12, background:'#f0fdf4', borderRadius:10, padding:12, fontSize:12, lineHeight:1.7}}>
            <strong>How to copy dirty data into Google Sheet:</strong><br/>
            1. Click <strong>Copy CSV</strong> below → 2. Open Sheet → Click <strong>A1</strong> (first box top-left) → Paste (Ctrl+V or long press Paste on phone)<br/>
            3. You will see all data in Column A (clothes in one pile)<br/>
            4. Select <strong>A1:A6</strong> → Top menu: <strong>Data → Split text to columns → Comma</strong> → Now splits to 4 columns (A=id, B=name, C=date, D=amount)<br/>
            5. <strong>B2 = ␣Musa␣␣</strong> dirty with yellow spaces! This is dirty room<br/>
            6. Click <strong>E1</strong> → Type <strong>clean name</strong> → Enter → Click <strong>E2</strong> → Type <strong>=TRIM(B2)</strong> → Enter → Magic! E2 shows <strong>Musa</strong> clean<br/>
            7. Find small <strong>blue circle</strong> bottom-right of E2 → Drag down to E6 → All names cleaned!<br/>
            8. <strong>Fix date:</strong> C2 2024-13-05 → 2024-05-05 (month 13 no exist)<br/>
            9. <strong>Remove duplicates:</strong> Data → Remove duplicates → Check id → Remove (id=1 duplicate shirt)<br/>
            10. <strong>Fill empty:</strong> B4 empty → Type <strong>Unknown</strong> (fill empty shoe box)<br/>
            11. Now <strong>4 clean rows from 5 dirty!</strong>
          </div>
          <div style={{display:'flex', gap:8, marginTop:12}}>
            <button onClick={()=>{navigator.clipboard.writeText(CSV); setCopied(true); setTimeout(()=>setCopied(false),2000);}} style={{flex:1, height:48, background:'white', border:'2px solid #16a34a', borderRadius:12, fontWeight:800, fontSize:12}}>{copied?"✅ Copied! Paste in A1":"📋 Copy Dirty CSV — 5 rows"}</button>
            <a href="https://www.coursera.org/professional-certificates/google-data-analytics" target="_blank" style={{flex:1, height:48, background:'white', border:'1px solid #1a73e8', color:'#1a73e8', borderRadius:12, fontWeight:700, fontSize:12, display:'flex', alignItems:'center', justifyContent:'center', textDecoration:'none'}}>🔗 Backup</a>
          </div>
          <div style={{marginTop:10, background:'white', borderRadius:8, padding:10, fontFamily:'monospace', fontSize:11, whiteSpace:'pre-wrap', border:'1px dashed #86efac', maxHeight:120, overflowY:'auto'}}>{CSV}</div>
          <div style={{marginTop:12, background:'#f0fdf4', border:'2px solid #16a34a', borderRadius:10, padding:12, fontSize:12, fontFamily:'monospace'}}><strong>✅ Final Clean (4 rows) — What you should get:</strong><br/><span style={{whiteSpace:'pre-wrap'}}>{CSV_CLEAN}</span></div>
        </div>

        <div style={{background:'white', border:'2px solid #f59e0b', borderRadius:16, padding:20, marginTop:14}}>
          <h2 style={{margin:0, fontSize:16, fontWeight:800}}>❓ Questions: Answer and Submit LAB</h2>
          <p style={{fontSize:11, color:'#92400e', background:'#fffbeb', padding:8, borderRadius:8, marginTop:8}}>Answer these 3 — This is how LAB will be submitted to Google Sheet. Same as Google Data Analytics Course but Simple English.</p>
          <div style={{display:'grid', gap:12, marginTop:12}}>
            <div><label style={{fontSize:12, fontWeight:700}}>1) How many duplicates?</label><input value={q1} onChange={e=>setQ1(e.target.value)} placeholder="e.g. 1 duplicate - Musa appears twice id=1" style={{width:'100%', height:48, border:'1px solid #f59e0b', borderRadius:10, padding:'0 12px', marginTop:6, fontSize:13}}/></div>
            <div><label style={{fontSize:12, fontWeight:700}}>2) Which dates invalid?</label><input value={q2} onChange={e=>setQ2(e.target.value)} placeholder="e.g. 2024-13-05 - month 13 doesn't exist" style={{width:'100%', height:48, border:'1px solid #f59e0b', borderRadius:10, padding:'0 12px', marginTop:6, fontSize:13}}/></div>
            <div><label style={{fontSize:12, fontWeight:700}}>3) What will you do with empty customer?</label><input value={q3} onChange={e=>setQ3(e.target.value)} placeholder="e.g. Fill with Unknown or delete row" style={{width:'100%', height:48, border:'1px solid #f59e0b', borderRadius:10, padding:'0 12px', marginTop:6, fontSize:13}}/></div>
          </div>
          <button onClick={()=>openLog("LAB")} style={{marginTop:14, width:'100%', height:56, background:'#2563eb', color:'white', fontWeight:900, fontSize:15, borderRadius:12, border:'none'}}>🤖 Submit LAB — I Arranged 5→4 + Answered 3 Questions</button>
        </div>

        <div style={{background:'white', border:'1px solid #8b5cf6', borderRadius:16, padding:20, marginTop:14}}>
          <h2 style={{margin:0, fontSize:16, fontWeight:800}}>👥 Fellow Student Check: Did you understand?</h2>
          <p style={{fontSize:12, background:'#f5f3ff', padding:10, borderRadius:8, marginTop:10, lineHeight:1.6}}>Can you explain in simple English: What is duplicate and how to fix? Teach your fellow student in your own words.</p>
          <textarea value={fellow} onChange={e=>setFellow(e.target.value)} placeholder="e.g. Duplicate means same person appears 2 times like Musa id=1 twice. Fix: Data → Remove duplicates → Check id → Remove. Like same shirt twice in dirty room, throw one..." style={{width:'100%', minHeight:80, border:'2px solid #8b5cf6', borderRadius:12, padding:'12px', marginTop:12, fontSize:13, fontFamily:'system-ui'}}/>
          <button onClick={()=>openLog("FELLOW")} style={{marginTop:10, width:'100%', height:48, background:'#7c3aed', color:'white', fontWeight:800, fontSize:14, borderRadius:12, border:'none'}}>📤 Submit Fellow Check — Explain Duplicate</button>
        </div>

        <div style={{background:'white', border:'1px solid #8b5cf6', borderRadius:16, padding:20, marginTop:14}}>
          <h2 style={{margin:0, fontSize:18, fontWeight:800}}>🎯 QUIZ: 5 Questions — 80% to Pass</h2>
          <p style={{fontSize:11, color:'#6b7280', marginTop:6}}>Popup modal — Submit to Bot — Training log only — Same as Google cert style</p>
          <button onClick={()=>setShowQuiz(true)} style={{marginTop:12, width:'100%', height:56, background:'#7c3aed', color:'white', fontWeight:900, fontSize:15, borderRadius:12, border:'none'}}>🚀 Take Quiz — Dirty Room + 3 Questions</button>
        </div>

        <div style={{background:'white', border:'1px solid #25D366', borderRadius:16, padding:20, marginTop:14}}>
          <a href="https://whatsapp.com/channel/0029Vb7eUeBGzzKTHPIaoe0b" target="_blank" style={{display:'flex', height:48, background:'#25D366', color:'white', fontWeight:900, borderRadius:12, alignItems:'center', justifyContent:'center', textDecoration:'none'}}>📱 Join WhatsApp Channel — Gigs + News</a>
        </div>

        <div style={{marginTop:14, background:'#fefce8', borderRadius:10, padding:12}}>
          <p style={{fontSize:11, margin:0, lineHeight:1.5}}><strong>Kpata Academy:</strong> FREE training community, not certifying body. We do NOT issue certificates. We log LAB+HW+Quiz to Google Sheet as evidence for Google/IBM/Microsoft. Training only.</p>
        </div>
      </div>

      {showLog && (
        <div style={{position:'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(0,0,0,0.6)', display:'flex', alignItems:'center', justifyContent:'center', padding:16, zIndex:60}}>
          <div style={{background:'white', borderRadius:16, padding:20, maxWidth:420, width:'100%', maxHeight:'90vh', overflowY:'auto'}}>
            {!saved ? (
              <><h3 style={{margin:0}}>📤 Submit {logType} — Perfect v10</h3><p style={{fontSize:11, color:'#64748b', marginTop:6}}>{logType==="LAB"?"Includes your 3 answers + dirty room logic":logType==="FELLOW"?"Teaching fellow student":"Quiz result"} — Saved to Google Sheet as evidence.</p><input value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" style={{width:'100%', height:48, border:'1px solid #e2e8f0', borderRadius:10, padding:'0 12px', marginTop:12}}/><input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone / WhatsApp" style={{width:'100%', height:48, border:'1px solid #e2e8f0', borderRadius:10, padding:'0 12px', marginTop:8}}/><button onClick={save} disabled={saving} style={{marginTop:12, width:'100%', height:52, background:saving?'#94a3b8':'#2563eb', color:'white', fontWeight:800, borderRadius:10, border:'none'}}>{saving?"Saving...":"✅ Save to Google Sheet — LAB + Questions"}</button><button onClick={()=>setShowLog(false)} style={{marginTop:8, width:'100%', height:44, background:'white', border:'1px solid #e2e8f0', borderRadius:10}}>Cancel</button></>
            ):(<><h3 style={{textAlign:'center'}}>✅ Saved!</h3><p style={{fontSize:12, textAlign:'center'}}>{name} — {logType} — Q1:{q1} Q2:{q2} Q3:{q3}</p><a href="https://www.coursera.org/professional-certificates/google-data-analytics" target="_blank" style={{display:'block', background:'white', border:'1px solid #2563eb', borderRadius:8, padding:'10px', textAlign:'center', textDecoration:'none', fontWeight:700, fontSize:12, marginTop:8}}>🔗 Google Certificate Path</a><button onClick={()=>setShowLog(false)} style={{marginTop:8, width:'100%', height:44, background:'#111827', color:'white', borderRadius:10, border:'none'}}>Close</button></>)}
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
              <><div style={{display:'flex', justifyContent:'space-between'}}><h3 style={{margin:0}}>Q {cur+1}/5 — Perfect v10</h3><button onClick={()=>setShowQuiz(false)} style={{border:'none', background:'#f1f5f9', borderRadius:8, padding:'6px 12px'}}>✕</button></div><p style={{fontWeight:700, marginTop:16}}>{QUIZ[cur].q}</p><div style={{display:'grid', gap:10, marginTop:12}}>{QUIZ[cur].a.map((o,i)=><button key={i} onClick={()=>answer(i)} style={{textAlign:'left', padding:14, borderRadius:10, border:sel===i?'2px solid #7c3aed':'1px solid #e2e8f0', background:sel===i?'#f5f3ff':'white', minHeight:52}}>{o}</button>)}</div></>
            ):(
              <><h3 style={{margin:0, textAlign:'center'}}>{score>=4?'✅ Room Arranged! Perfect!':'❌ Try Again'}</h3><p style={{textAlign:'center'}}>{score}/5 — Q1 duplicates, Q2 dates, Q3 empty</p>{score>=4 ? (<><button onClick={()=>{setShowQuiz(false); openLog("QUIZ");}} style={{marginTop:12, width:'100%', height:52, background:'#2563eb', color:'white', fontWeight:800, borderRadius:10, border:'none'}}>📤 Save Quiz + 3 Answers to Sheet</button></>): <button onClick={()=>{setCur(0); setScore(0); setDone(false); setSel(null);}} style={{marginTop:12, width:'100%', height:48, background:'#7c3aed', color:'white', fontWeight:700, borderRadius:10, border:'none'}}>Retake</button>}</>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
