"use client";
import { useState, useRef, useEffect } from "react";
type Message = { role: "user" | "bot"; text: string };
const KNOWLEDGE_BASE: { keywords: string[]; answer: string }[] = [
  { keywords: ["gmail","email","no gmail"], answer: "No Gmail? No problem! ✅ Written lesson on Kpata is ENOUGH to pass exam - No Gmail needed. If you want to try NotebookLM: Ask friend to help create Gmail (free, 2 mins). Need help? Tap 'Joined - Open' at top, open WhatsApp Channel, check description for Support Group." },
  { keywords: ["notebooklm","private papers","upload"], answer: "NotebookLM = Your private locker! 🔒 Open Chrome → Type notebooklm.google.com → Login Gmail → + New Notebook → Upload PDF → Ask: 'Summarize in simple English'. Written lesson on Kpata explains same - no need to upload if data low." },
  { keywords: ["ai","computer","ml","generative"], answer: "AI = Big umbrella - All smart computers. ML = Computer learns from examples (100 mango pics). Generative AI = CREATES new thing (ChatGPT, Gemini). Exam Tip: Remember Big Umbrella from Lesson 1." },
  { keywords: ["rtfc","prompt","magic"], answer: "R-T-F-C Magic (40% exam): R=Role 'You are teacher', T=Task 'Write letter', F=Format '100 words bullets', C=Context 'In Nigeria Minna'. Example: You are CV expert, write CV, simple table, beginner no experience." },
  { keywords: ["exam","pass","certificate"], answer: "Pass first try (Open book): 1. Read 15 Kpata lessons 2. Practice R-T-F-C 3. Keep Kpata open in another tab during Google exam 4. Most important: Lesson 3 + 8" },
  { keywords: ["video","data","1gb"], answer: "Data Saving: Written = Enough, saves 1GB. Video Optional = 2h18m ~1GB. Read written first, video only on WiFi." },
  { keywords: ["registration","free"], answer: "Kpata Promise: 100% FREE - NO Registration to Learn! Read without login. Practice saves on YOUR phone. Registration optional only for certificate." },
  { keywords: ["job","cv","linkedin"], answer: "After cert: Lesson 9 CV & LinkedIn, Lesson 10 Build project no coding, Join WhatsApp Channel for jobs. Tap Joined - Open." },
];
function getBotReply(t: string){ const l=t.toLowerCase(); for(const e of KNOWLEDGE_BASE){ if(e.keywords.some(k=>l.includes(k))) return e.answer; } return "I am Kpata Bot trained on 15 lessons. Ask: What is AI? No Gmail? How to pass exam? For complex help, tap WhatsApp Channel above."; }
export default function KpataChatBot(){
  const [open,setOpen]=useState(false);
  const [messages,setMessages]=useState<Message[]>([{role:"bot",text:"Hello! I am Kpata Bot 🤖 Ask me anything about this lesson - No registration, from your 15 lessons!"}]);
  const [input,setInput]=useState("");
  const listRef=useRef<HTMLDivElement>(null);
  useEffect(()=>{ listRef.current?.scrollTo(0,listRef.current.scrollHeight); },[messages]);
  const send=()=>{ if(!input.trim()) return; const u:Message={role:"user",text:input}; const b:Message={role:"bot",text:getBotReply(input)}; setMessages(m=>[...m,u,b]); setInput(""); };
  return (<>
      <button onClick={()=>setOpen(!open)} style={{position:"fixed",bottom:"20px",right:"20px",zIndex:9999,background:"#16a34a",color:"white",borderRadius:"999px",padding:"14px 20px",fontWeight:"bold",boxShadow:"0 4px 12px rgba(0,0,0,0.2)",border:"none",cursor:"pointer"}}>{open?"✕ Close":"🤖 Ask Kpata Bot"}</button>
      {open && (<div style={{position:"fixed",bottom:"80px",right:"20px",width:"350px",maxWidth:"90vw",height:"450px",background:"white",borderRadius:"16px",boxShadow:"0 8px 30px rgba(0,0,0,0.25)",zIndex:9999,display:"flex",flexDirection:"column",border:"2px solid #16a34a",overflow:"hidden"}}>
          <div style={{background:"#16a34a",color:"white",padding:"12px",fontWeight:"bold"}}>Kpata Bot - No Registration - 1M Ready</div>
          <div ref={listRef} style={{flex:1,overflowY:"auto",padding:"12px",background:"#f9fafb"}}>{messages.map((m,i)=>(<div key={i} style={{margin:"8px 0",padding:"10px",borderRadius:"12px",background:m.role==="user"?"#dcfce7":"white",border:"1px solid #e5e7eb",whiteSpace:"pre-wrap",fontSize:"14px",textAlign:m.role==="user"?"right":"left"}}>{m.text}</div>))}</div>
          <div style={{display:"flex",padding:"10px",borderTop:"1px solid #e5e7eb",gap:"8px"}}><input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()} placeholder="Ask: What is AI? No Gmail?" style={{flex:1,padding:"10px",borderRadius:"8px",border:"1px solid #ccc"}}/><button onClick={send} style={{background:"#16a34a",color:"white",border:"none",borderRadius:"8px",padding:"0 16px",cursor:"pointer",fontWeight:"bold"}}>Send</button></div>
          <div style={{fontSize:"10px",textAlign:"center",padding:"4px",color:"#666",background:"#f0fdf4"}}>Saves data • No registration • 1M students ready</div>
        </div>)}
    </>);
}
