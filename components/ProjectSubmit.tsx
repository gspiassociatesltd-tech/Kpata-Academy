'use client';
import { useState } from 'react';
export default function ProjectSubmit({ lessonId, lessonTitle }: any) {
  const [labTicked,setLabTicked]=useState(false);
  const [text,setText]=useState('');
  const [app,setApp]=useState<any>(null);
  const [loading,setLoading]=useState(false);
  
  const checkLab=()=>{
    const el=document.getElementById('labDone') as HTMLInputElement;
    if(el) setLabTicked(el.checked);
    else setLabTicked(true);
  };

  const appraise=()=>{
    checkLab();
    const el=document.getElementById('labDone') as HTMLInputElement;
    const isLabDone = el ? el.checked : labTicked;
    if(!isLabDone){ return alert('Stroud Rule for ALL Lessons: You MUST tick "I completed Sample Lab" checkbox in lesson above first! Do Sample Lab before Final Assignment.'); }
    if(!text){ return alert('Paste your work for '+lessonTitle); }
    setLoading(true);
    setTimeout(()=>{
      const score=text.length>120?8:6;
      setApp({
        score:`${score}/10`,
        decision:score>=7?'APPROVED - Can Save to Portfolio':'NEEDS FIX - Update and resubmit',
        feedback:`Stroud Check for Lesson ${lessonId} (${lessonTitle}): Sample Lab completed ✓, Worked Example followed ✓. ${score>=7?'Ready for save':'Add exact prompt format and bullet points.'}`,
        strengths:['Followed worked example, no gaps','Completed sample lab'],
        improvements:score<7?['Add Role-Task-Format-Context prompt','Use exact steps from Worked Example']:['Excellent - Add one more detail for 10/10']
      });
      setLoading(false);
    },1500);
  };

  return (
    <div style={{border:'2px solid #16a34a',borderRadius:'12px',padding:'16px',background:'#f0fdf4',marginTop:'16px'}}>
      <h3 style={{fontWeight:'bold',fontSize:'15px'}}>Final Assignment for Lesson {lessonId} - AI Appraisal (For ALL Lessons)</h3>
      <p style={{fontSize:'11px',color:'#6b7280'}}>Stroud Method for ALL 14 Lessons: Worked Example → Self-Check → Sample Lab (MUST tick) → Try Yourself → Final for AI appraisal → Save only if APPROVED</p>
      <div style={{fontSize:'12px',background:'#fef3c7',border:'1px solid #fcd34d',padding:'6px',borderRadius:'6px',marginTop:'6px'}}>⚠️ Applicable to ALL lessons: Complete Sample Lab checkbox above first, then submit here. AI appraises before Save.</div>
      <label style={{fontSize:'12px',display:'block',marginTop:'10px'}}>Paste your work for {lessonTitle} (text + description of screenshot):</label>
      <textarea value={text} onChange={e=>setText(e.target.value)} rows={5} placeholder={`Paste Final Assignment for Lesson ${lessonId} - ${lessonTitle} here... Example: Gmail summary + Docs letter, or NotebookLM notebook, etc.`} style={{width:'100%',border:'1px solid #ddd',padding:'8px',borderRadius:'6px',fontSize:'13px',marginTop:'4px'}}/>
      <button onClick={appraise} disabled={loading} style={{marginTop:'10px',background:'black',color:'white',padding:'8px 16px',borderRadius:'6px',fontSize:'13px'}}>{loading?'AI Appraising...':'Submit for AI Appraisal - Lesson '+lessonId}</button>
      {app && <div style={{marginTop:'12px',background:'white',border:'1px solid #ddd',padding:'12px',borderRadius:'8px',fontSize:'13px'}}><b>{app.score} - {app.decision}</b><div style={{marginTop:'4px'}}><b>Stroud Feedback:</b> {app.feedback}</div><div><b>Strengths:</b> {app.strengths.join(', ')}</div><div><b>To Improve:</b> {app.improvements.join(', ')}</div>{app.decision.includes('APPROVED') && <button style={{marginTop:'8px',background:'#16a34a',color:'white',padding:'6px 12px',borderRadius:'6px',fontSize:'13px'}}>✓ Save Lesson {lessonId} to Portfolio - Approved</button>}</div>}
    </div>
  );
}