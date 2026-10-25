import Link from "next/link"
import { getCourse, getLesson } from "@/lib/courses"

export default function LessonPage({ params }: { params: { slug: string, lessonId: string }}) {
  const course = getCourse(params.slug)
  const lesson = getLesson(params.slug, parseInt(params.lessonId))
  if (!course || !lesson) return <div>Lesson not found</div>

  const dirtyData = [
    { id: 1, name: " Musa  ", date: "2024-13-05", amount: "500" },
    { id: 2, name: "Musa", date: "2024-05-10", amount: "" },
    { id: 1, name: " Musa  ", date: "2024-13-05", amount: "500" },
    { id: 3, name: "Nkechi", date: "05/15/2024", amount: "300" },
    { id: 4, name: "", date: "2024-05-20", amount: "400" },
  ]

  const homeworkData = [
    { customer: "Aisha  ", orderDate: "2024-02-30", total: "" },
    { customer: "Aisha  ", orderDate: "2024-02-30", total: "" },
    { customer: "John", orderDate: "30-02-2024", total: "200" },
    { customer: "", orderDate: "2024-03-01", total: "150" },
    { customer: "John", orderDate: "2024-03-01", total: "150" },
  ]

  return (
    <div style={{minHeight:"100vh", background:"#fcfcf9", fontFamily:"system-ui", padding:"0"}}>
      <div style={{maxWidth:800, margin:"0 auto", padding:"16px"}}>
        <Link href={`/courses/${course.slug}`} style={{color:"#2563eb", fontSize:14, textDecoration:"none"}}>← {course.title}</Link>
        
        <div style={{background:"white", padding:16, borderRadius:12, marginTop:12, border:"1px solid #e5e7eb"}}>
          <div style={{display:"flex", justifyContent:"space-between", fontSize:12, color:"#6b7280"}}>
            <span>Lesson {lesson.id} / {course.lessonsCount} • {lesson.duration || "25 mins"} • hands-on</span>
            <span id="progress" style={{fontSize:12}}>0% complete • 0 mins spent (tracking live as you scroll)</span>
          </div>
          <div style={{height:8, background:"#f3f4f6", borderRadius:8, marginTop:8}}>
            <div id="bar" style={{height:"100%", width:"0%", background:"#22c55e", borderRadius:8, transition:"width 0.3s"}}></div>
          </div>
        </div>

        <div style={{background:"white", padding:20, borderRadius:12, marginTop:12}}>
          <h1 style={{fontSize:28, fontWeight:800, margin:0}}>{lesson.title}</h1>
          <p style={{color:"#6b7280", fontSize:14, marginTop:6}}>Simple English • 2 Solved Examples • Hands-on Lab • Homework with data</p>
        </div>

        {/* WHAT IS DIRTY DATA */}
        <div style={{background:"white", padding:20, borderRadius:12, marginTop:12}}>
          <h2 style={{fontSize:18, fontWeight:800}}>1. What is dirty data?</h2>
          <p style={{fontSize:16, lineHeight:1.7, color:"#1f2937"}}>
            Imagine your room: Clothes on floor in 2 places (duplicate), calendar shows month 13 (invalid date), empty cup with no water (missing data), name written with extra spaces " Musa  " (extra spaces).
            <br/>Dirty spreadsheet is same.
          </p>
          <div style={{background:"#fef9c3", padding:12, borderRadius:8, marginTop:12}}>
            <strong>Simple definition:</strong> Dirty data = data with errors that will give wrong results if you don't clean it.
          </div>
        </div>

        {/* HOW TO CLEAN - DETAILED WITH EXAMPLES */}
        <div style={{background:"white", padding:20, borderRadius:12, marginTop:12}}>
          <h2 style={{fontSize:18, fontWeight:800}}>2. How to clean data — 4 steps (with examples)</h2>
          
          <div style={{marginTop:16}}>
            <div style={{fontWeight:700}}>Step 1: Remove duplicates</div>
            <p style={{fontSize:15, lineHeight:1.6}}>Same row appears twice. Example: Row id=1 appears 2 times in table below. Keep one, delete other.<br/>
            <em>How:</em> In Sheets: Data → Remove duplicates. In Excel: Data → Remove Duplicates.</p>
            <div style={{background:"#f3f4f6", padding:8, borderRadius:6, fontSize:13, marginTop:6}}>Before: 2 identical rows for Musa → After: 1 row</div>
          </div>

          <div style={{marginTop:16}}>
            <div style={{fontWeight:700}}>Step 2: Fix invalid dates</div>
            <p style={{fontSize:15, lineHeight:1.6}}>Date that cannot exist. Example: 2024-13-05 (month 13 no exist), 05/15/2024 vs 2024-05-15 mixed formats.<br/>
            <em>How:</em> Make all dates same format YYYY-MM-DD. Fix month 13 → ask correct month or delete row.</p>
            <div style={{background:"#f3f4f6", padding:8, borderRadius:6, fontSize:13, marginTop:6}}>2024-13-05 → Invalid → Correct to 2024-05-05 or remove</div>
          </div>

          <div style={{marginTop:16}}>
            <div style={{fontWeight:700}}>Step 3: Handle missing data (empty cells)</div>
            <p style={{fontSize:15, lineHeight:1.6}}>Cell empty. Example: amount = "" (blank), name = "" (no name).<br/>
            <em>How:</em> Option A: Fill with 0 or "Unknown". Option B: Delete row if important data missing. For amount blank, put 0 or average.</p>
            <div style={{background:"#f3f4f6", padding:8, borderRadius:6, fontSize:13, marginTop:6}}>amount "" → fill with 0 or average 400</div>
          </div>

          <div style={{marginTop:16}}>
            <div style={{fontWeight:700}}>Step 4: Trim extra spaces</div>
            <p style={{fontSize:15, lineHeight:1.6}}>Name " Musa  " has spaces. Computer sees " Musa  " different from "Musa".<br/>
            <em>How:</em> Use =TRIM() function. =TRIM(" Musa  ") → "Musa"</p>
            <div style={{background:"#f3f4f6", padding:8, borderRadius:6, fontSize:13, marginTop:6}}>" Musa  " → TRIM → "Musa"</div>
          </div>
        </div>

        {/* DIRTY DATA TABLE FOR REFERENCE */}
        <div style={{background:"white", padding:20, borderRadius:12, marginTop:12}}>
          <h2 style={{fontSize:18, fontWeight:800}}>3. Example dirty data (what you will clean)</h2>
          <p style={{fontSize:14, color:"#6b7280"}}>Look at this table — it has all 4 errors:</p>
          <div style={{overflowX:"auto", marginTop:10}}>
            <table style={{width:"100%", borderCollapse:"collapse", fontSize:13}}>
              <thead><tr style={{background:"#f3f4f6"}}><th style={{border:"1px solid #e5e7eb", padding:6}}>id</th><th style={{border:"1px solid #e5e7eb", padding:6}}>name (spaces)</th><th style={{border:"1px solid #e5e7eb", padding:6}}>date (invalid)</th><th style={{border:"1px solid #e5e7eb", padding:6}}>amount (missing)</th><th style={{border:"1px solid #e5e7eb", padding:6}}>Error?</th></tr></thead>
              <tbody>
                {dirtyData.map((r,i)=>(
                  <tr key={i}><td style={{border:"1px solid #e5e7eb", padding:6}}>{r.id}</td><td style={{border:"1px solid #e5e7eb", padding:6}}>{r.name || "(empty)"}</td><td style={{border:"1px solid #e5e7eb", padding:6}}>{r.date}</td><td style={{border:"1px solid #e5e7eb", padding:6}}>{r.amount || "(empty)"}</td><td style={{border:"1px solid #e5e7eb", padding:6, color:"#dc2626"}}>{i==0?"duplicate+spaces+invalid":""}{i==1?"missing amount":""}{i==2?"duplicate":""}{i==3?"mixed date format":""}{i==4?"missing name":""}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* LAB WITH DATA */}
        <div style={{background:"#eff6ff", padding:20, borderRadius:12, marginTop:12, border:"1px solid #bfdbfe"}}>
          <h2 style={{fontSize:18, fontWeight:800}}>4. LAB — Clean this dirty data (hands-on)</h2>
          <p style={{fontSize:14}}>Use the table above. Your task: produce clean table with 3 rows only.</p>
          <ol style={{fontSize:15, lineHeight:1.7}}>
            <li>Remove duplicate id=1 (keep one Musa)</li>
            <li>Fix date 2024-13-05 → 2024-05-05, make all YYYY-MM-DD</li>
            <li>Fill missing amount with 0, missing name with "Unknown" or delete</li>
            <li>Trim " Musa  " → "Musa" using =TRIM()</li>
          </ol>
          <div style={{background:"white", padding:12, borderRadius:8, marginTop:10}}>
            <strong>Dirty data to copy for Sheets/Excel:</strong>
            <pre style={{fontSize:12, background:"#f3f4f6", padding:8, borderRadius:6, overflowX:"auto"}}>{`id,name,date,amount
1," Musa  ",2024-13-05,500
2,Musa,2024-05-10,
1," Musa  ",2024-13-05,500
3,Nkechi,05/15/2024,300
4,,2024-05-20,400`}</pre>
            <p style={{fontSize:12, color:"#6b7280", marginTop:6}}>Paste into Google Sheets, clean it. Kpata Bot will check: Should have 3-4 clean rows, no duplicates, no month 13, no "  " spaces.</p>
          </div>
          <button style={{background:"#111827", color:"white", padding:"10px 16px", borderRadius:8, border:"none", marginTop:10, fontSize:14}}>Submit Lab to Kpata Bot (80% to pass)</button>
        </div>

        {/* HOMEWORK WITH DATA */}
        <div style={{background:"#fef9c3", padding:20, borderRadius:12, marginTop:12, border:"1px solid #fde047"}}>
          <h2 style={{fontSize:18, fontWeight:800}}>5. HOMEWORK — Your own shop data to clean</h2>
          <p style={{fontSize:14}}>Clean this customer orders table. Submit clean version.</p>
          <div style={{overflowX:"auto", marginTop:10}}>
            <table style={{width:"100%", borderCollapse:"collapse", fontSize:13, background:"white"}}>
              <thead><tr style={{background:"#f3f4f6"}}><th style={{border:"1px solid #e5e7eb", padding:6}}>customer</th><th style={{border:"1px solid #e5e7eb", padding:6}}>orderDate</th><th style={{border:"1px solid #e5e7eb", padding:6}}>total</th></tr></thead>
              <tbody>
                {homeworkData.map((r,i)=>(<tr key={i}><td style={{border:"1px solid #e5e7eb", padding:6}}>{r.customer || "(empty)"}</td><td style={{border:"1px solid #e5e7eb", padding:6}}>{r.orderDate}</td><td style={{border:"1px solid #e5e7eb", padding:6}}>{r.total || "(empty)"}</td></tr>))}
              </tbody>
            </table>
          </div>
          <div style={{background:"white", padding:12, borderRadius:8, marginTop:10}}>
            <strong>Data to copy:</strong>
            <pre style={{fontSize:12, background:"#f3f4f6", padding:8, borderRadius:6}}>{`customer,orderDate,total
"Aisha  ",2024-02-30,
"Aisha  ",2024-02-30,
John,30-02-2024,200
,2024-03-01,150
John,2024-03-01,150`}</pre>
          </div>
          <p style={{fontSize:13, marginTop:8}}><strong>Questions:</strong> 1) How many duplicates? 2) Which dates invalid? 3) What will you do with empty customer?</p>
        </div>

        {/* CHECK UNDERSTANDING */}
        <div style={{background:"white", padding:16, borderRadius:12, marginTop:12, border:"1px solid #e5e7eb"}}>
          <h3 style={{fontSize:15, fontWeight:700}}>Fellow Student Check: Did you understand?</h3>
          <p style={{fontSize:14}}>Can you explain in simple English: What is duplicate and how to fix?</p>
          <textarea placeholder="Type your explanation here..." style={{width:"100%", height:60, border:"1px solid #e5e7eb", borderRadius:8, padding:8, marginTop:8}}></textarea>
        </div>

        <div style={{textAlign:"center", padding:20, fontSize:12, color:"#9ca3af"}}>Progress updates live as you scroll • No fake stats • Simple English only</div>
      </div>
      <script dangerouslySetInnerHTML={{__html: `
        let start = Date.now(); let maxScroll=0;
        window.addEventListener('scroll', ()=> {
          let scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight))*100;
          if(scrolled>maxScroll) maxScroll=scrolled;
          let mins = Math.floor((Date.now()-start)/60000);
          let el = document.getElementById('progress'); let bar=document.getElementById('bar');
          if(el) el.innerText = Math.floor(maxScroll)+'% complete • '+mins+' mins spent (live)';
          if(bar) bar.style.width = Math.floor(maxScroll)+'%';
        });
      `}} />
    </div>
  )
}
