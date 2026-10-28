"use client";
import React, { useState } from "react";

const QUIZ = [
  { q: "Why does ␣Musa␣␣ cause grouping to fail?", a: ["Spaces make it different text", "Color is wrong", "Number too big"], correct: 0 },
  { q: "Which formula removes spaces?", a: ["=TRIM(B2)", "=SUM(B2)", "=DELETE(B2)"], correct: 0 },
  { q: "2024-13-05 is invalid because?", a: ["Month 13 does not exist", "Year too high", "Day is Sunday"], correct: 0 },
  { q: "How to remove duplicates in Sheets?", a: ["Data → Remove duplicates", "Change font", "Delete phone"], correct: 0 },
  { q: "Final clean rows from 5 dirty rows?", a: ["4 rows", "10 rows", "0 rows"], correct: 0 },
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
    const p={timestamp:new Date().toISOString(), name, phone, type:logType, details:logType==="QUIZ"?`Quiz ${score}/5`:`${logType} 5→4`, score:logType==="QUIZ"?score:"", whatsapp_channel:"https://whatsapp.com/channel/0029Vb7eUeBGzzKTHPIaoe0b", source:"Kpata_Morning_Dirty_Room"};
    try{ const l=JSON.parse(localStorage.getItem("kpata_logs")||"[]"); l.push(p); localStorage.setItem("kpata_logs",JSON.stringify(l)); await fetch(URL,{method:"POST",mode:"no-cors",body:JSON.stringify(p)}); setSaved(true);}catch{setSaved(true);} setSaving(false);
  };

  return (
    <div style={{minHeight:'100vh', background:'#f1f5f9', padding:'16px 16px 90px', fontFamily:'system-ui'}}>
      <div style={{maxWidth:720, margin:'0 auto'}}>
        
        <div style={{background:'white', border:'1px solid #e2e8f0', borderRadius:12, padding:16}}>
          <h1 style={{margin:0, fontSize:20, fontWeight:800}}>Kpata_Academy_MVP</h1>
          <p style={{fontSize:12, color:'#64748b', marginTop:4}}>LESSON 1: What is Dirty Data? • 20 min • FREE • Phone-friendly • Simple English</p>
          <div style={{display:'flex', gap:8, marginTop:8, flexWrap:'wrap'}}>
            <span style={{background:'#dcfce7', color:'#166534', padding:'4px 8px', borderRadius:6, fontSize:11, fontWeight:700}}>Progress: 0% • Live</span>
            <span style={{background:'#f1f5f9', padding:'4px 8px', borderRadius:6, fontSize:11}}>Self-paced • 2G • Tecno/Infinix OK</span>
          </div>
          <a href="https://www.coursera.org/professional-certificates/google-data-analytics" target="_blank" style={{display:'flex', height:44, background:'#1a73e8', color:'white', fontWeight:700, fontSize:12, borderRadius:10, alignItems:'center', justifyContent:'center', textDecoration:'none', marginTop:12}}>🔗 Backup: Google Data Analytics Official</a>
        </div>

        <div style={{marginTop:12, display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8}}>
          <div style={{background:'white', borderRadius:10, padding:12, textAlign:'center', border:'1px solid #e2e8f0'}}><div style={{fontWeight:800}}>4</div><div style={{fontSize:10, color:'#64748b'}}>Rows Clean Final</div><div style={{fontSize:9, background:'#dcfce7', borderRadius:4, marginTop:4}}>FREE</div></div>
          <div style={{background:'white', borderRadius:10, padding:12, textAlign:'center', border:'1px solid #e2e8f0'}}><div style={{fontWeight:800}}>5→4</div><div style={{fontSize:10, color:'#64748b'}}>Dirty → Clean</div><div style={{fontSize:9, background:'#dcfce7', borderRadius:4, marginTop:4}}>FREE</div></div>
          <div style={{background:'white', borderRadius:10, padding:12, textAlign:'center', border:'1px solid #e2e8f0'}}><div style={{fontWeight:800}}>Google</div><div style={{fontSize:10, color:'#64748b'}}>Cert Path SAFE</div><div style={{fontSize:9, background:'#dcfce7', borderRadius:4, marginTop:4}}>Training Only</div></div>
        </div>

        <div style={{marginTop:12, background:'white', borderRadius:12, padding:16, border:'1px solid #e2e8f0'}}>
          <h2 style={{margin:0, fontSize:16}}>📖 Lesson 1 Deep: What is Dirty Data?</h2>
          <p style={{fontSize:13, lineHeight:1.7, marginTop:10, color:'#1e293b'}}>Dirty data is like a <strong>dirty room with clothes on the ground</strong> — you cannot find your shoes until you arrange the room. You have shirts on chair, trousers on floor, socks under bed. You want to go out, you cannot find your belt. Why? Room is dirty, not arranged.</p>
          <p style={{fontSize:12, lineHeight:1.7, marginTop:8, color:'#334155'}}>Same with data. You have sales in book. You write "Musa" 2 times, you leave customer name empty, you type month 13 (no month 13). Excel counts " Musa  " and "Musa" as different customers. Your sales report says you have 5 customers, but real is 4. Wrong decision because data dirty.</p>
          <div style={{background:'#fffbeb', border:'1px solid #fde68a', padding:10, borderRadius:8, marginTop:10, fontSize:12}}><strong>Simple English — Dirty Room:</strong> Clothes on ground = duplicate data. Empty space where shoe should be = blank data. Shirt with wrong size tag = invalid date 2024-13-05. You must arrange room first: fold clothes (remove spaces), throw away duplicate shirt (remove duplicates), fill empty box (fill blanks), fix wrong tag (fix date). Then room clean, you can find everything fast. Same with data — clean first, then analyze.</div>
          <div style={{background:'#f0fdf4', border:'1px solid #bbf7d0', padding:10, borderRadius:8, marginTop:8, fontSize:11}}><strong>6 Steps:</strong> ASK (what question?), PREPARE (collect data), PROCESS (clean dirty room), ANALYZE (check), SHARE (tell story), ACT (decide). Our lesson today is PROCESS — clean dirty room.</div>
        </div>

        <div style={{marginTop:12, background:'white', borderRadius:12, padding:16, border:'1px solid #e2e8f0', overflowX:'auto'}}>
          <h2 style={{margin:'0 0 8px', fontSize:16}}>📊 Dirty Data Table — Like Dirty Room</h2>
          <p style={{fontSize:11, color:'#dc2626', background:'#fef2f2', padding:6, borderRadius:6}}>Yellow = hidden spaces ␣Musa␣␣ = shirt on floor, hard to see! • Red = month 13 = wrong size tag • Dup id=1 twice = 2 same shirts • Empty = empty shoe box</p>
          <table style={{width:'100%', borderCollapse:'collapse', fontSize:12, marginTop:8}}>
            <thead><tr style={{background:'#f8fafc'}}><th style={{border:'1px solid #e2e8f0', padding:8}}>id</th><th style={{border:'1px solid #e2e8f0', padding:8}}>name (clothes on ground)</th><th style={{border:'1px solid #e2e8f0', padding:8}}>date</th><th style={{border:'1px solid #e2e8f0', padding:8}}>amount</th></tr></thead>
            <tbody>
              <tr><td style={{border:'1px solid #e2e8f0', padding:8}}>1</td><td style={{border:'1px solid #e2e8f0', padding:8, background:'#fef3c7'}}><span style={{background:'#fef9c3', border:'1px dashed #f59e0b', padding:'2px 6px', borderRadius:4, fontFamily:'monospace'}}>␣Musa␣␣</span><span style={{fontSize:10, color:'#d97706', marginLeft:6}}>← hidden spaces = shirt under bed</span></td><td style={{border:'1px solid #e2e8f0', padding:8, background:'#fee2e2'}}>2024-13-05</td><td style={{border:'1px solid #e2e8f0', padding:8}}>500</td></tr>
              <tr><td style={{border:'1px solid #e2e8f0', padding:8}}>1</td><td style={{border:'1px solid #e2e8f0', padding:8}}>Musa (same shirt again)</td><td style={{border:'1px solid #e2e8f0', padding:8}}>2024-13-05</td><td style={{border:'1px solid #e2e8f0', padding:8}}>500</td></tr>
              <tr><td style={{border:'1px solid #e2e8f0', padding:8}}>3</td><td style={{border:'1px solid #e2e8f0', padding:8}}>Amina (clean shirt)</td><td style={{border:'1px solid #e2e8f0', padding:8}}>2024-05-15</td><td style={{border:'1px solid #e2e8f0', padding:8}}>600</td></tr>
              <tr><td style={{border:'1px solid #e2e8f0', padding:8}}>4</td><td style={{border:'1px solid #e2e8f0', padding:8, background:'#fee2e2'}}>(empty - shoe box empty)</td><td style={{border:'1px solid #e2e8f0', padding:8}}>2024-05-20</td><td style={{border:'1px solid #e2e8f0', padding:8}}>400</td></tr>
              <tr><td style={{border:'1px solid #e2e8f0', padding:8}}>5</td><td style={{border:'1px solid #e2e8f0', padding:8}}>John Doe (clean)</td><td style={{border:'1px solid #e2e8f0', padding:8}}>2024-05-18</td><td style={{border:'1px solid #e2e8f0', padding:8}}>300</td></tr>
            </tbody>
          </table>
          <p style={{fontSize:11, marginTop:8, background:'#f0fdf4', padding:8, borderRadius:6}}><strong>Morning Fix:</strong> Yellow dashed box shows hidden bug. =TRIM(B2) removes shirt from floor → clean.</p>
        </div>

        <div style={{background:'white', border:'1px solid #e2e8f0', borderRadius:12, padding:16, marginTop:12}}>
          <h2 style={{margin:0, fontSize:18}}>🧪 LAB: Arrange Dirty Room (Clean Data) — Morning Lesson</h2>
          <p style={{fontSize:12, color:'#64748b', marginTop:6}}>Goal: 5 dirty clothes → 4 clean arranged. Phone OK, no laptop.</p>
          <div style={{display:'flex', gap:8, marginTop:12}}>
            <a href="https://docs.google.com/spreadsheets/create" target="_blank" style={{flex:2, height:48, background:'#22c55e', color:'white', fontWeight:700, fontSize:14, borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', textDecoration:'none'}}>🔗 Open Sheets (Free)</a>
            <button onClick={()=>{navigator.clipboard.writeText(CSV_DIRTY); setCopied(true); setTimeout(()=>setCopied(false),2000);}} style={{flex:1, height:48, background:'white', border:'2px solid #22c55e', borderRadius:10, fontWeight:700}}>{copied?"Copied!":"📋 Copy CSV"}</button>
          </div>
          <div style={{marginTop:10, background:'#f8fafc', borderRadius:10, padding:10, fontFamily:'monospace', fontSize:11, whiteSpace:'pre-wrap', border:'1px dashed #cbd5e1'}}>{CSV_DIRTY}</div>
          <div style={{marginTop:12, display:'grid', gap:8}}>
            <div style={{border:'1px solid #bbf7d0', borderRadius:10, padding:10, background:'#f0fdf4', fontSize:12}}><strong>Step 1 Arrange Shirt (TRIM):</strong> In C2 type <code>=TRIM(B2)</code> drag down → ␣Musa␣␣ → Musa. Like picking shirt from floor and folding.</div>
            <div style={{border:'1px solid #fecaca', borderRadius:10, padding:10, background:'#fef2f2', fontSize:12}}><strong>Step 2 Fix Wrong Tag (Date):</strong> 2024-13-05 → 2024-05-05. Month 13 no exist, like size XXXL that no exist.</div>
            <div style={{border:'1px solid #fde68a', borderRadius:10, padding:10, background:'#fefce8', fontSize:12}}><strong>Step 3 Throw Duplicate Shirt:</strong> Data → Data cleanup → Remove duplicates → id=1 appears twice, throw one.</div>
            <div style={{border:'1px solid #bfdbfe', borderRadius:10, padding:10, background:'#eff6ff', fontSize:12}}><strong>Step 4 Fill Empty Shoe Box:</strong> Row 4 name empty → filter blanks → type "Unknown" or delete. Empty box, you fill or throw.</div>
            <div style={{border:'1px solid #e2e8f0', borderRadius:10, padding:10, background:'#f8fafc', fontSize:11, fontFamily:'monospace'}}><strong>✅ Final Clean Room (4 rows arranged):</strong><br/>{CSV_CLEAN}</div>
          </div>
          <button onClick={()=>openLog("LAB")} style={{marginTop:12, width:'100%', height:52, background:'#2563eb', color:'white', fontWeight:800, fontSize:15, borderRadius:10, border:'none'}}>🤖 Submit LAB — I Arranged Dirty Room 5→4</button>
        </div>

        <div style={{background:'white', border:'1px solid #f59e0b', borderRadius:12, padding:16, marginTop:12}}>
          <h2 style={{margin:0, fontSize:18}}>📝 HOMEWORK: Arrange Your Own Room</h2>
          <p style={{fontSize:12, background:'#fffbeb', padding:8, borderRadius:6, marginTop:8}}>Build 5 rows with YOUR friends names (add 1 with ␣ spaces like ␣Amina␣ = clothes on ground + 1 duplicate shirt + 1 empty shoe box + 1 invalid date = wrong tag) → Clean to 4 arranged. Screenshot.</p>
          <button onClick={()=>openLog("HW")} style={{marginTop:12, width:'100%', height:52, background:'#ea580c', color:'white', fontWeight:800, fontSize:15, borderRadius:10, border:'none'}}>📤 Submit Homework — My Room Arranged</button>
        </div>

        <div style={{background:'white', border:'1px solid #8b5cf6', borderRadius:12, padding:16, marginTop:12}}>
          <h2 style={{margin:0, fontSize:18}}>🎯 QUIZ: Did You Arrange Room Well?</h2>
          <p style={{fontSize:12, color:'#6b7280', marginTop:6}}>5 questions • 80% to pass • Popup • Training log only</p>
          <button onClick={()=>setShowQuiz(true)} style={{marginTop:12, width:'100%', height:52, background:'#7c3aed', color:'white', fontWeight:800, fontSize:15, borderRadius:10, border:'none'}}>🚀 Take Quiz — Dirty Room</button>
        </div>

        <div style={{background:'white', border:'1px solid #25D366', borderRadius:12, padding:16, marginTop:12}}>
          <h2 style={{margin:0, fontSize:15}}>📢 Updates</h2>
          <a href="https://whatsapp.com/channel/0029Vb7eUeBGzzKTHPIaoe0b" target="_blank" style={{display:'flex', height:48, background:'#25D366', color:'white', fontWeight:800, borderRadius:10, alignItems:'center', justifyContent:'center', textDecoration:'none', marginTop:12}}>📱 Join WhatsApp Channel</a>
        </div>

        <div style={{marginTop:12, background:'#fefce8', borderRadius:10, padding:12}}>
          <p style={{fontSize:11, margin:0, lineHeight:1.5}}><strong>Kpata Academy:</strong> FREE training community. We do NOT issue certificates. We log LAB+HW+Quiz to Google Sheet as evidence for Google/IBM/Microsoft certs.</p>
        </div>
      </div>

      {showLog && (
        <div style={{position:'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(0,0,0,0.6)', display:'flex', alignItems:'center', justifyContent:'center', padding:16, zIndex:60}}>
          <div style={{background:'white', borderRadius:16, padding:20, maxWidth:400, width:'100%'}}>
            {!saved ? (
              <>
                <h3 style={{margin:0}}>📤 Submit {logType} — Dirty Room</h3>
                <input value={name} onChange={e=>setName(e.target.value)} placeholder="Full name" style={{width:'100%', height:48, border:'1px solid #e2e8f0', borderRadius:10, padding:'0 12px', marginTop:12}}/>
                <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone" style={{width:'100%', height:48, border:'1px solid #e2e8f0', borderRadius:10, padding:'0 12px', marginTop:8}}/>
                <button onClick={save} disabled={saving} style={{marginTop:12, width:'100%', height:52, background:saving?'#94a3b8':'#2563eb', color:'white', fontWeight:800, borderRadius:10, border:'none'}}>{saving?"Saving...":"✅ Save to Google Sheet"}</button>
                <button onClick={()=>setShowLog(false)} style={{marginTop:8, width:'100%', height:44, background:'white', border:'1px solid #e2e8f0', borderRadius:10}}>Cancel</button>
              </>
            ):(
              <>
                <h3 style={{textAlign:'center'}}>✅ Saved! Room Arranged!</h3>
                <p style={{fontSize:12, textAlign:'center'}}>{name} — {logType} 5→4</p>
                <a href="https://www.coursera.org/professional-certificates/google-data-analytics" target="_blank" style={{display:'block', background:'white', border:'1px solid #2563eb', borderRadius:8, padding:'10px', textAlign:'center', textDecoration:'none', fontWeight:700, fontSize:12, marginTop:8}}>🔗 Google Certificate Path</a>
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
          <div style={{background:'white', borderRadius:16, padding:20, maxWidth:500, width:'100%', maxHeight:'90vh', overflowY:'auto'}}>
            {!done ? (
              <>
                <div style={{display:'flex', justifyContent:'space-between'}}><h3 style={{margin:0}}>Q {cur+1}/5 — Dirty Room</h3><button onClick={()=>setShowQuiz(false)} style={{border:'none', background:'#f1f5f9', borderRadius:8, padding:'6px 12px'}}>✕</button></div>
                <p style={{fontWeight:700, marginTop:16}}>{QUIZ[cur].q}</p>
                <div style={{display:'grid', gap:10, marginTop:12}}>{QUIZ[cur].a.map((o,i)=><button key={i} onClick={()=>answer(i)} style={{textAlign:'left', padding:14, borderRadius:10, border:sel===i?'2px solid #7c3aed':'1px solid #e2e8f0', background:sel===i?'#f5f3ff':'white', minHeight:48}}>{o}</button>)}</div>
              </>
            ):(
              <>
                <h3 style={{margin:0, textAlign:'center'}}>{score>=4?'✅ Room Arranged!':'❌ Try Again'}</h3>
                <p style={{textAlign:'center'}}>{score}/5</p>
                {score>=4 ? (
                  <div style={{marginTop:12}}>
                    <div style={{background:'#f0fdf4', borderRadius:10, padding:12, fontSize:12}}><strong>Morning Lesson Complete!</strong> Dirty room arranged — 5→4. Training log, not certificate.</div>
                    <button onClick={()=>{setShowQuiz(false); openLog("QUIZ");}} style={{marginTop:12, width:'100%', height:52, background:'#2563eb', color:'white', fontWeight:800, borderRadius:10, border:'none'}}>📤 Save Quiz — Room Arranged 4/5</button>
                    <a href="https://www.coursera.org/professional-certificates/google-data-analytics" target="_blank" style={{display:'block', marginTop:8, textAlign:'center', padding:10, border:'1px solid #2563eb', borderRadius:8, textDecoration:'none', fontWeight:700}}>🔗 Google Data Analytics</a>
                  </div>
                ): <button onClick={()=>{setCur(0); setScore(0); setDone(false); setSel(null);}} style={{marginTop:12, width:'100%', height:48, background:'#7c3aed', color:'white', fontWeight:700, borderRadius:10, border:'none'}}>Retake</button>}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
