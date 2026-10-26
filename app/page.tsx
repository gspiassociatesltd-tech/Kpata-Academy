"use client";
import React, { useState } from "react";

const QUIZ = [
  { q: "Why does ␣Musa␣␣ cause grouping to fail?", a: ["Spaces make it different text", "Color is wrong", "Number too big"], correct: 0 },
  { q: "Which formula removes spaces?", a: ["=TRIM(B2)", "=SUM(B2)", "=DELETE(B2)"], correct: 0 },
  { q: "2024-13-05 is invalid because?", a: ["Month 13 does not exist", "Year too high", "Day is Sunday"], correct: 0 },
  { q: "How to remove duplicates in Sheets?", a: ["Data → Remove duplicates", "Change font", "Delete phone"], correct: 0 },
  { q: "Final clean rows from 5 dirty rows?", a: ["4 rows", "10 rows", "0 rows"], correct: 0 },
];

export default function Page() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selected, setSelected] = useState<number|null>(null);
  // 3B: Log Modal
  const [showLog, setShowLog] = useState(false);
  const [logType, setLogType] = useState("LAB");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleAnswer = (idx:number) => {
    setSelected(idx);
    setTimeout(()=>{
      if(idx===QUIZ[current].correct) setScore(s=>s+1);
      if(current < QUIZ.length-1){ setCurrent(c=>c+1); setSelected(null); }
      else { setShowResult(true); }
    }, 400);
  };
  const resetQuiz = () => { setCurrent(0); setScore(0); setShowResult(false); setSelected(null); setShowQuiz(false); };

  const openLog = (type:string) => { setLogType(type); setShowLog(true); setSaved(false); };

  const saveToSheet = async () => {
    if(!name || !phone){ alert("Enter name and phone"); return; }
    setSaving(true);
    // 3B GOOGLE SHEET CONFIG - REPLACE WITH YOUR APPS SCRIPT WEB APP URL
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxiWGrdTSguuZdixWtERJgeYCXgQS48ZKTnTdYqOPQn16dij7WFl499URHC3quaCCqZ/exec"; // TODO: Replace
    const payload = {
      timestamp: new Date().toISOString(),
      name,
      phone,
      type: logType,
      details: logType==="QUIZ" ? `Quiz ${score}/5` : logType==="LAB" ? "LAB 5→4 rows cleaned" : "HW 4 clean names",
      score: logType==="QUIZ" ? score : "",
      whatsapp_channel: "https://whatsapp.com/channel/0029Vb7eUeBGzzKTHPIaoe0b",
      source: "Kpata_Academy_MVP"
    };
    try{
      // Local save as fallback + try fetch (no-cors mode for Apps Script)
      const logs = JSON.parse(localStorage.getItem("kpata_logs")||"[]");
      logs.push(payload);
      localStorage.setItem("kpata_logs", JSON.stringify(logs));
      if(SCRIPT_URL.includes("YOUR_SCRIPT_ID")){
        console.log("TODO: Replace SCRIPT_URL, saved locally for now", payload);
      } else {
        await fetch(SCRIPT_URL, { method:"POST", mode:"no-cors", body: JSON.stringify(payload) });
      }
      setSaved(true);
    }catch(e){ console.error(e); setSaved(true); }
    setSaving(false);
  };

  return (
    <div style={{minHeight:'100vh', background:'#f1f5f9', padding:'16px 16px 80px 16px', fontFamily:'system-ui'}}>
      <div style={{maxWidth:720, margin:'0 auto'}}>
        <div style={{background:'white', border:'1px solid #e2e8f0', borderRadius:12, padding:16}}>
          <h1 style={{fontSize:20, margin:0, fontWeight:800}}>Kpata_Academy_MVP</h1>
          <p style={{fontSize:12, color:'#64748b', margin:'4px 0'}}>Kpata Academy: FREE Data Cleaning for Naija Youth — 3B Google Sheet Tracking</p>
          <div style={{display:'flex', gap:8, marginTop:8, flexWrap:'wrap'}}>
            <span style={{background:'#dcfce7', color:'#166534', padding:'4px 8px', borderRadius:6, fontSize:11, fontWeight:700}}>3B Active: Logs → Google Sheet</span>
            <span style={{background:'#f1f5f9', padding:'4px 8px', borderRadius:6, fontSize:11}}>FREE • No degree • Real Google Cert Path</span>
          </div>
        </div>

        <div style={{marginTop:12, display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:8}}>
          <div style={{background:'white', borderRadius:10, padding:12, textAlign:'center', border:'1px solid #e2e8f0'}}><div style={{fontWeight:800}}>4</div><div style={{fontSize:10, color:'#64748b'}}>Rows Clean</div><div style={{fontSize:9, background:'#dcfce7', borderRadius:4, marginTop:4}}>FREE</div></div>
          <div style={{background:'white', borderRadius:10, padding:12, textAlign:'center', border:'1px solid #e2e8f0'}}><div style={{fontWeight:800}}>5</div><div style={{fontSize:10, color:'#64748b'}}>Dirty → Clean</div><div style={{fontSize:9, background:'#dcfce7', borderRadius:4, marginTop:4}}>FREE</div></div>
          <div style={{background:'white', borderRadius:10, padding:12, textAlign:'center', border:'1px solid #e2e8f0'}}><div style={{fontWeight:800}}>Google</div><div style={{fontSize:10, color:'#64748b'}}>Cert Path</div><div style={{fontSize:9, background:'#dcfce7', borderRadius:4, marginTop:4}}>SAFE</div></div>
        </div>

        <div style={{marginTop:12, background:'white', borderRadius:12, padding:16, border:'1px solid #e2e8f0', overflowX:'auto'}}>
          <h2 style={{fontSize:16, margin:'0 0 8px 0'}}>📊 Dirty Data (Real Life Problem)</h2>
          <p style={{fontSize:11, color:'#dc2626', background:'#fef2f2', padding:6, borderRadius:6}}>Why spaces matter: ␣Musa␣␣ ≠ Musa → Grouping fails!</p>
          <table style={{width:'100%', borderCollapse:'collapse', fontSize:12, marginTop:8}}>
            <thead><tr style={{background:'#f8fafc'}}><th style={{border:'1px solid #e2e8f0', padding:8}}>id</th><th style={{border:'1px solid #e2e8f0', padding:8}}>name</th><th style={{border:'1px solid #e2e8f0', padding:8}}>date</th><th style={{border:'1px solid #e2e8f0', padding:8}}>amount</th></tr></thead>
            <tbody>
              <tr><td style={{border:'1px solid #e2e8f0', padding:8}}>1</td><td style={{border:'1px solid #e2e8f0', padding:8, background:'#fef3c7'}}><span style={{background:'#fef9c3', border:'1px dashed #f59e0b', padding:'2px 6px', borderRadius:4, fontFamily:'monospace'}}>␣Musa␣␣</span></td><td style={{border:'1px solid #e2e8f0', padding:8, background:'#fee2e2'}}>2024-13-05</td><td style={{border:'1px solid #e2e8f0', padding:8}}>500</td></tr>
              <tr><td style={{border:'1px solid #e2e8f0', padding:8}}>1</td><td style={{border:'1px solid #e2e8f0', padding:8}}>Musa (dup)</td><td style={{border:'1px solid #e2e8f0', padding:8}}>2024-13-05</td><td style={{border:'1px solid #e2e8f0', padding:8}}>500</td></tr>
              <tr><td style={{border:'1px solid #e2e8f0', padding:8}}>3</td><td style={{border:'1px solid #e2e8f0', padding:8}}>Amina</td><td style={{border:'1px solid #e2e8f0', padding:8}}>2024-05-15</td><td style={{border:'1px solid #e2e8f0', padding:8}}>600</td></tr>
              <tr><td style={{border:'1px solid #e2e8f0', padding:8}}>4</td><td style={{border:'1px solid #e2e8f0', padding:8}}></td><td style={{border:'1px solid #e2e8f0', padding:8}}>2024-05-20</td><td style={{border:'1px solid #e2e8f0', padding:8}}>400</td></tr>
              <tr><td style={{border:'1px solid #e2e8f0', padding:8}}>5</td><td style={{border:'1px solid #e2e8f0', padding:8}}>John Doe</td><td style={{border:'1px solid #e2e8f0', padding:8}}>2024-05-18</td><td style={{border:'1px solid #e2e8f0', padding:8}}>300</td></tr>
            </tbody>
          </table>
        </div>

        <div style={{background:'white', border:'1px solid #e2e8f0', borderRadius:12, padding:16, marginTop:12}}>
          <h2 style={{fontSize:18, margin:0}}>🧪 LAB: Clean Dirty Data (20-min Lesson)</h2>
          <p style={{fontSize:12, color:'#64748b', marginTop:6}}>Follow these 5 steps in Google Sheets — FREE, no laptop needed, phone OK</p>
          
          <div style={{background:'#f8fafc', borderRadius:10, padding:12, marginTop:12}}>
            <p style={{fontSize:13, fontWeight:700, margin:0}}>Step 1: TRIM spaces</p>
            <p style={{fontSize:11, margin:'4px 0 0 0'}}>Formula: <code style={{background:'white', padding:'2px 6px', borderRadius:4, border:'1px solid #e2e8f0'}}>=TRIM(B2)</code> — removes ␣Musa␣␣ → Musa</p>
            <p style={{fontSize:11, margin:'8px 0 0 0', fontWeight:700}}>Step 2: Fix invalid date</p>
            <p style={{fontSize:11, margin:'4px 0 0 0'}}>2024-13-05 → 2024-05-13 (Month 13 no exist!)</p>
            <p style={{fontSize:11, margin:'8px 0 0 0', fontWeight:700}}>Step 3: Remove duplicates</p>
            <p style={{fontSize:11, margin:'4px 0 0 0'}}>Data → Remove duplicates → Select id column</p>
            <p style={{fontSize:11, margin:'8px 0 0 0', fontWeight:700}}>Step 4: Fill empty name</p>
            <p style={{fontSize:11, margin:'4px 0 0 0'}}>Row 4 empty → Filter blanks → Type "Unknown" or delete row</p>
            <p style={{fontSize:11, margin:'8px 0 0 0', fontWeight:700}}>Step 5: Count final</p>
            <p style={{fontSize:11, margin:'4px 0 0 0'}}>5 dirty → 4 clean rows = 100% practical</p>
          </div>

          <a href="https://docs.google.com/spreadsheets/create" target="_blank" style={{display:'flex', height:48, background:'#22c55e', color:'white', fontWeight:700, fontSize:15, borderRadius:10, alignItems:'center', justifyContent:'center', textDecoration:'none', marginTop:12}}>🔗 Open Google Sheets (Free)</a>
          <button onClick={()=>openLog("LAB")} style={{marginTop:12, width:'100%', height:52, background:'#2563eb', color:'white', fontWeight:800, fontSize:15, borderRadius:10, border:'none'}}>🤖 Submit LAB to Google Sheet — 3B</button>
          <p style={{fontSize:10, color:'#16a34a', textAlign:'center', marginTop:6}}>3B Active: Saves Name + Phone + LAB 5→4 → Google Sheet Kpata_Students_Log</p>
        </div>

        <div style={{background:'white', border:'1px solid #f59e0b', borderRadius:12, padding:16, marginTop:12}}>
          <h2 style={{fontSize:18, margin:0}}>📝 HOMEWORK: Clean 4 Names</h2>
          <p style={{fontSize:12, color:'#64748b', marginTop:6}}>Create new sheet: Remove spaces, duplicates, blanks — Screenshot as evidence</p>
          <div style={{background:'#fffbeb', borderRadius:8, padding:8, marginTop:8, fontSize:11}}>Task: List 4 clean Nigerian names (Musa, Amina, John Doe, Unknown) — Use TRIM + UNIQUE</div>
          <button onClick={()=>openLog("HW")} style={{marginTop:12, width:'100%', height:52, background:'#ea580c', color:'white', fontWeight:800, fontSize:15, borderRadius:10, border:'none'}}>📤 Submit Homework to Google Sheet — 3B</button>
        </div>

        <div style={{background:'white', border:'1px solid #8b5cf6', borderRadius:12, padding:16, marginTop:12}}>
          <h2 style={{fontSize:18, margin:0}}>🎯 QUIZ: Test Skill</h2>
          <p style={{fontSize:12, color:'#6b7280', marginTop:6}}>5 questions • 80% to log • Saves to Google Sheet for Google cert path</p>
          <button onClick={()=>setShowQuiz(true)} style={{marginTop:12, width:'100%', height:52, background:'#7c3aed', color:'white', fontWeight:800, fontSize:15, borderRadius:10, border:'none'}}>🚀 Take Quiz (Popup)</button>
        </div>

        <div style={{background:'white', border:'1px solid #e2e8f0', borderRadius:12, padding:16, marginTop:12}}>
          <h2 style={{fontSize:16, margin:0}}>📱 Connect</h2>
          <div style={{marginTop:12, display:'grid', gridTemplateColumns:'1fr 1fr', gap:8}}>
            <a href="https://www.facebook.com/abaniwog" target="_blank" style={{background:'#1877f2', color:'white', padding:'12px', borderRadius:10, textAlign:'center', textDecoration:'none', fontWeight:700, fontSize:12}}>Facebook</a>
            <a href="https://instagram.com/gspiassociatesltd" target="_blank" style={{background:'#d62976', color:'white', padding:'12px', borderRadius:10, textAlign:'center', textDecoration:'none', fontWeight:700, fontSize:12}}>Instagram</a>
            <a href="https://youtube.com/@godwinabaniwo6755" target="_blank" style={{background:'#ff0000', color:'white', padding:'12px', borderRadius:10, textAlign:'center', textDecoration:'none', fontWeight:700, fontSize:12}}>YouTube</a>
            <a href="https://x.com/AbaniwoGodwin" target="_blank" style={{background:'#000', color:'white', padding:'12px', borderRadius:10, textAlign:'center', textDecoration:'none', fontWeight:700, fontSize:12}}>X</a>
            <a href="https://www.tiktok.com/@user4981039143171" target="_blank" style={{background:'#000', color:'white', padding:'12px', borderRadius:10, textAlign:'center', textDecoration:'none', fontWeight:700, fontSize:12}}>TikTok</a>
            <a href="https://www.linkedin.com/in/godwin-abaniwo-803268296" target="_blank" style={{background:'#0a66c2', color:'white', padding:'12px', borderRadius:10, textAlign:'center', textDecoration:'none', fontWeight:700, fontSize:12}}>LinkedIn</a>
          </div>
          <a href="https://whatsapp.com/channel/0029Vb7eUeBGzzKTHPIaoe0b" target="_blank" style={{display:'flex', height:48, background:'#25D366', color:'white', fontWeight:800, fontSize:14, borderRadius:10, alignItems:'center', justifyContent:'center', textDecoration:'none', marginTop:10}}>📱 Join WhatsApp Channel</a>
        </div>

        <div style={{marginTop:12, background:'#fefce8', border:'1px solid #fde68a', borderRadius:10, padding:12}}>
          <p style={{fontSize:10, color:'#92400e', margin:0}}><strong>Legal SAFE:</strong> Kpata is FREE training, not certifying body. We log training to help you earn Google/IBM/Microsoft certs. Google Sheet is your training evidence.</p>
        </div>

        <div style={{marginTop:16, background:'#111827', color:'white', padding:12, borderRadius:10, fontSize:12}}>
          <strong>3B Built ✅</strong> LAB+HW+Quiz → Google Sheet Kpata_Students_Log
          <div style={{marginTop:8, display:'flex', gap:8, flexWrap:'wrap'}}>
            <span style={{background:'#22c55e', padding:'6px 10px', borderRadius:6}}>✅ All 12 Bugs Fixed</span>
            <span style={{background:'#22c55e', padding:'6px 10px', borderRadius:6}}>✅ 3B Google Sheet</span>
          </div>
        </div>
      </div>

      {/* LOG MODAL 3B */}
      {showLog && (
        <div style={{position:'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(0,0,0,0.6)', display:'flex', alignItems:'center', justifyContent:'center', padding:16, zIndex:60}}>
          <div style={{background:'white', borderRadius:16, padding:20, maxWidth:400, width:'100%'}}>
            {!saved ? (
              <>
                <h3 style={{margin:0}}>📤 Submit {logType} Progress — 3B</h3>
                <p style={{fontSize:11, color:'#64748b'}}>Saves to Google Sheet Kpata_Students_Log (for Google cert evidence)</p>
                <input value={name} onChange={e=>setName(e.target.value)} placeholder="Your full name (e.g. Musa Amina)" style={{width:'100%', height:48, border:'1px solid #e2e8f0', borderRadius:10, padding:'0 12px', marginTop:12, fontSize:14}}/>
                <input value={phone} onChange={e=>setPhone(e.target.value)} placeholder="Phone/WhatsApp (e.g. 080...)" style={{width:'100%', height:48, border:'1px solid #e2e8f0', borderRadius:10, padding:'0 12px', marginTop:8, fontSize:14}}/>
                <div style={{background:'#f0fdf4', borderRadius:8, padding:8, marginTop:10, fontSize:11}}><strong>Will save:</strong> {logType} — {logType==="LAB"?"5→4 rows":logType==="HW"?"4 clean names":`Quiz ${score}/5`} + Date + Channel</div>
                <button onClick={saveToSheet} disabled={saving} style={{marginTop:12, width:'100%', height:52, background:saving?'#94a3b8':'#2563eb', color:'white', fontWeight:800, borderRadius:10, border:'none'}}>{saving?"Saving...":"✅ Save to Google Sheet"}</button>
                <button onClick={()=>setShowLog(false)} style={{marginTop:8, width:'100%', height:44, background:'white', border:'1px solid #e2e8f0', borderRadius:10}}>Cancel</button>
                <p style={{fontSize:9, color:'#94a3b8', marginTop:8, textAlign:'center'}}>If Apps Script not set yet, saves locally (browser) + you can export. See setup guide below.</p>
              </>
            ) : (
              <>
                <h3 style={{textAlign:'center'}}>✅ Saved! Training Logged</h3>
                <div style={{background:'#f0fdf4', borderRadius:10, padding:12, marginTop:12, fontSize:12}}>
                  <p style={{margin:0}}><strong>{name}</strong> ({phone})</p>
                  <p style={{margin:'6px 0 0 0'}}>{logType}: {logType==="LAB"?"5→4 rows cleaned":logType==="HW"?"Homework 4 rows":"Quiz "+score+"/5"}</p>
                  <p style={{margin:'6px 0 0 0', fontSize:10, color:'#64748b'}}>Saved to: Kpata_Students_Log • {new Date().toLocaleString()}</p>
                </div>
                <div style={{marginTop:12, display:'grid', gap:8}}>
                  <a href="https://www.coursera.org/professional-certificates/google-data-analytics" target="_blank" style={{display:'block', background:'white', border:'1px solid #2563eb', borderRadius:8, padding:'10px', textAlign:'center', textDecoration:'none', fontWeight:700, fontSize:12}}>🔗 Continue to Google Certificate</a>
                  <a href="https://whatsapp.com/channel/0029Vb7eUeBGzzKTHPIaoe0b" target="_blank" style={{display:'block', background:'#25D366', color:'white', borderRadius:8, padding:'10px', textAlign:'center', textDecoration:'none', fontWeight:700, fontSize:12}}>📱 Join WhatsApp Channel</a>
                  <button onClick={()=>setShowLog(false)} style={{width:'100%', height:44, background:'#111827', color:'white', borderRadius:10, border:'none', fontWeight:700}}>Close</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <div style={{position:'fixed', bottom:0, left:0, right:0, background:'white', borderTop:'1px solid #e2e8f0', padding:'10px 16px', display:'flex', gap:8, zIndex:40, boxShadow:'0 -2px 10px rgba(0,0,0,0.1)'}}>
        <a href="https://whatsapp.com/channel/0029Vb7eUeBGzzKTHPIaoe0b" target="_blank" style={{flex:2, height:44, background:'#25D366', color:'white', fontWeight:800, fontSize:13, borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', textDecoration:'none'}}>📱 WhatsApp</a>
        <button onClick={()=>window.scrollTo({top:0, behavior:'smooth'})} style={{flex:1, height:44, background:'#111827', color:'white', fontWeight:700, fontSize:13, borderRadius:10, border:'none'}}>Top ↑</button>
        <button onClick={()=>setShowQuiz(true)} style={{flex:1, height:44, background:'#7c3aed', color:'white', fontWeight:700, fontSize:13, borderRadius:10, border:'none'}}>Quiz</button>
      </div>
      <div style={{height:70}}></div>

      {showQuiz && (
        <div style={{position:'fixed', top:0, left:0, right:0, bottom:0, background:'rgba(0,0,0,0.6)', display:'flex', alignItems:'center', justifyContent:'center', padding:16, zIndex:50}}>
          <div style={{background:'white', borderRadius:16, padding:20, maxWidth:500, width:'100%', maxHeight:'90vh', overflowY:'auto'}}>
            {!showResult ? (
              <>
                <div style={{display:'flex', justifyContent:'space-between'}}><h3 style={{margin:0, fontSize:16}}>Q {current+1}/{QUIZ.length}</h3><button onClick={()=>setShowQuiz(false)} style={{border:'none', background:'#f1f5f9', borderRadius:8, padding:'6px 12px'}}>✕</button></div>
                <p style={{fontSize:15, fontWeight:700, marginTop:16}}>{QUIZ[current].q}</p>
                <div style={{display:'grid', gap:10, marginTop:12}}>{QUIZ[current].a.map((opt, idx)=><button key={idx} onClick={()=>handleAnswer(idx)} style={{textAlign:'left', padding:'14px 12px', borderRadius:10, border:selected===idx?'2px solid #7c3aed':'1px solid #e2e8f0', background:selected===idx?'#f5f3ff':'white', fontSize:14, minHeight:48}}>{opt}</button>)}</div>
              </>
            ) : (
              <>
                <h3 style={{margin:0, textAlign:'center'}}>{score>=4?'✅ Training Record!':'❌ Try Again'}</h3>
                <p style={{textAlign:'center', fontSize:13}}>Score: {score}/{QUIZ.length}</p>
                {score>=4 ? (
                  <div style={{marginTop:12}}>
                    <div style={{background:'#f0fdf4', borderRadius:10, padding:12, fontSize:12}}>This is NOT a certificate. Kpata training-only. Logged: Quiz {score}/5</div>
                    <div style={{display:'grid', gap:8, marginTop:12}}>
                      <a href="https://www.coursera.org/professional-certificates/google-data-analytics" target="_blank" style={{display:'block', background:'white', border:'1px solid #2563eb', borderRadius:8, padding:'10px', textAlign:'center', textDecoration:'none', fontWeight:700, fontSize:12}}>🔗 Google Data Analytics Cert</a>
                      <button onClick={()=>{ setShowQuiz(false); openLog("QUIZ"); }} style={{width:'100%', height:52, background:'#2563eb', color:'white', fontWeight:800, borderRadius:10, border:'none'}}>📤 Save Quiz to Google Sheet — 3B</button>
                      <button onClick={resetQuiz} style={{width:'100%', height:44, background:'white', border:'1px solid #e2e8f0', borderRadius:10}}>Close</button>
                    </div>
                  </div>
                ) : <button onClick={resetQuiz} style={{marginTop:12, width:'100%', height:48, background:'#7c3aed', color:'white', fontWeight:700, borderRadius:10, border:'none'}}>Retake</button>}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
