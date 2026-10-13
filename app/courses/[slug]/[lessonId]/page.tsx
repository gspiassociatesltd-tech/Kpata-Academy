
'use client'
import { useParams } from 'next/navigation'
import { getCourse, BUILD_STATUS } from '../../../../lib/courses'
import { saveProgress, isLessonDone } from '../../../../lib/progress'
import Link from 'next/link'
import { useState, useEffect } from 'react'

type LabStep = { title: string; desc: string; simpleDesc: string; example: string; copyText: string; showCopy: boolean; sampleFile?: string; links: { label: string; url: string; color: string }[] }

function getLabs(slug: string, lessonId: string): LabStep[] {
  if(slug==='google-ai-essentials'){
    if(lessonId==='1'){
      return [
        { title: 'Step 1: See Example - 5 Tasks', desc: 'Example of 5 repetitive tasks', simpleDesc: 'Look at example below. This is what you will create.', example: '1. Weekly report Monday (1h)\n2. Same emails "Price?" (30m daily)\n3. Meeting notes (45m)\n4. Social posts (1h weekly)\n5. Emails to Excel (30m daily)', copyText: `MY 5 TASKS (Change to your own):
1. Weekly sales report Monday (1 hour)
2. Same emails: "Price? Delivery?" (30 mins daily)
3. Meeting notes summary (45 mins)
4. Social posts (1 hour weekly)
5. Emails to Excel (30 mins daily)
Total ~7h/week wasted`, showCopy: true, links: [{ label: '📄 Open Google Doc - Click here', url: 'https://docs.new', color: '#4285f4' }] },
        { title: 'Step 2: Create Your Own List', desc: 'Make your own list in Google Doc', simpleDesc: 'Open Google Doc, copy example, change to your own tasks', example: 'Tap Open Google Doc, then Copy, then Paste, then change words to your own job', copyText: `MY REAL TASKS - My job:
1. [Your task 1]
2. [Your task 2]
3. [Your task 3]
4. [Your task 4]
5. [Your task 5]`, showCopy: true, links: [{ label: '✨ Open Gemini to help', url: 'https://gemini.google.com', color: 'black' }] },
        { title: 'Step 3: Take Picture of Your Work', desc: 'Screenshot your list', simpleDesc: 'Take picture of your screen. Save it.', example: 'Phone: Press power + volume down. Computer: Windows+Shift+S. Save as MyWork1.png', copyText: '', showCopy: false, links: [] },
      ]
    }
    if(lessonId==='2'){
      return [
        { title: 'Step 1: Download Sample PDF - We Give You', desc: 'You need 10-page PDF. We provide it - one click download', simpleDesc: 'Tap button to download sample company policy PDF. We give you 10 pages.', example: 'This PDF has leave policy, benefits, dates. Perfect for practice. You do not need to find PDF.', copyText: '', showCopy: false, sampleFile: '/samples/Company_Policy_Handbook_10pages.pdf', links: [{ label: '📥 Download Sample 10-Page PDF (We Give You)', url: '/samples/Company_Policy_Handbook_10pages.pdf', color: '#16a34a' }, { label: '📓 Open NotebookLM', url: 'https://notebooklm.google.com', color: 'black' }] },
        { title: 'Step 2: Upload PDF to NotebookLM & Copy Questions', desc: 'Upload PDF you downloaded, then ask questions', simpleDesc: 'Go to NotebookLM, tap New, tap Upload, select PDF you downloaded, then copy questions below', example: 'Upload takes 10 seconds. Then you can ask AI about PDF.', copyText: `Copy these 3 questions - paste one by one in NotebookLM:

Question 1: Summarize this document in 5 simple points.

Question 2: How many days sick leave? How to apply?

Question 3: What are important dates in this document?`, showCopy: true, links: [] },
        { title: 'Step 3: Take Picture of Answer', desc: 'Screenshot NotebookLM answer', simpleDesc: 'Take picture of AI answer. This proves you did it.', example: 'Save as Lesson2_AI_Summary.png. Time saved: Reading 30 mins vs AI 2 mins.', copyText: '', showCopy: false, links: [] },
      ]
    }
    if(lessonId==='3'){
      return [
        { title: 'Step 1: Open Google Doc for Your Prompts', desc: 'Create doc for 5 prompts you use at work daily', simpleDesc: 'Tap to open new Google Doc', example: 'Title: My 5 Daily Prompts', copyText: '', showCopy: false, links: [{ label: '📄 Open Google Doc', url: 'https://docs.new', color: '#4285f4' }] },
        { title: 'Step 2: Copy 5 Ready Prompts - Change Brackets', desc: 'Copy pack below, paste in doc, change [WORDS] to your own', simpleDesc: 'Copy all 5 prompts, paste in doc. Where you see [BRACKETS], put your own product or notes.', example: 'Example: [YOUR PRODUCT] -> Change to "solar battery" or "my shop products"', copyText: `MY 5 DAILY PROMPTS - Copy this:

1. EMAIL: Write short email (120 words) to client confirming meeting tomorrow 2pm, agenda: pricing, delivery. Friendly tone.

2. SUMMARY: Summarize these notes into 3 points: decisions, tasks with owner, next date. Notes: [PASTE YOUR NOTES]

3. IDEAS: Give me 10 social media post ideas about [YOUR PRODUCT], simple words, for small business Nigeria.

4. TABLE: Make table comparing 3 competitors for [YOUR PRODUCT]: Company, Price, Warranty.

5. REWRITE: Rewrite this to be professional short: [PASTE YOUR EMAIL]`, showCopy: true, links: [{ label: '✨ Test one prompt in Gemini', url: 'https://gemini.google.com', color: 'black' }] },
        { title: 'Step 3: Test One Prompt', desc: 'Copy Prompt 1, paste in Gemini, see email draft', simpleDesc: 'Take picture of Gemini answer', example: 'Save as Lesson3_Prompt_Test.png', copyText: '', showCopy: false, links: [] },
      ]
    }
    // Other lessons simplified
    return [
      { title: 'Step 1: Open Tool', desc: 'Open tool for this lesson', simpleDesc: 'Tap button to open tool', example: 'Tap Open button below', copyText: '', showCopy: false, links: [{ label: '📓 Open Tool', url: 'https://gemini.google.com', color: 'black' }] },
      { title: 'Step 2: Copy What You Need', desc: 'Copy text below, paste in tool', simpleDesc: 'Tap Copy button, then paste in tool', example: 'Copy, paste, see result', copyText: 'Copy content from lesson', showCopy: true, links: [] },
      { title: 'Step 3: Take Picture', desc: 'Screenshot result', simpleDesc: 'Take picture as proof', example: 'Save picture', copyText: '', showCopy: false, links: [] },
    ]
  }

  if(slug==='microsoft-ai-900'){
    if(lessonId==='1'){
      return [
        { title: 'Step 1: Open Microsoft Learn', desc: 'Free training - Module 1', simpleDesc: 'Tap to open free Microsoft training', example: 'Free, no payment', copyText: '', showCopy: false, links: [{ label: '🎓 Open Microsoft Learn', url: 'https://learn.microsoft.com/en-us/training/modules/get-started-ai-fundamentals/', color: '#0078d4' }] },
        { title: 'Step 2: Copy Exercise - Match Work to Service', desc: 'Copy this, fill which Azure service', simpleDesc: 'Copy exercise, learn which service for which job', example: 'Receipt text -> Document Intelligence, Face -> Face service', copyText: `MATCH WORK TO SERVICE - Fill answer:

1. Extract text from receipt -> [Document Intelligence]
2. Detect faces in photo -> [Face service]
3. Translate website -> [Translator]
4. Chatbot for questions -> [Bot Service]
5. Find similar images -> [Computer Vision]`, showCopy: true, links: [] },
        { title: 'Step 3: Screenshot Knowledge Check', desc: 'Do quiz in Microsoft Learn, screenshot score', simpleDesc: 'Take picture of your score', example: 'Save as AI900_L1.png', copyText: '', showCopy: false, links: [] },
      ]
    }
    if(lessonId==='2'){
      return [
        { title: 'Step 1: Open Azure ML Studio', desc: 'Free, no coding, sample data provided', simpleDesc: 'Tap to open, sign in with free Microsoft account', example: 'No code needed, Microsoft gives sample data', copyText: '', showCopy: false, links: [{ label: '🤖 Open Azure ML Studio', url: 'https://ml.azure.com', color: '#0078d4' }] },
        { title: 'Step 2: Copy Steps to Make AI Model', desc: 'Follow these steps exactly', simpleDesc: 'Copy steps, follow one by one in Azure ML', example: 'Use Bank Marketing sample data - Microsoft provides it', copyText: `Steps to Make Model:
1. New Automated ML job
2. Choose dataset: Bank Marketing sample
3. Target column: y
4. Task: Classification
5. Start - Wait 20 mins
6. See best model - Accuracy more than 80%
7. Deploy`, showCopy: true, links: [] },
        { title: 'Step 3: Screenshot Model', desc: 'Screenshot accuracy and deploy', simpleDesc: 'Take picture of your model', example: 'Save as AI900_L2_Model.png', copyText: '', showCopy: false, links: [] },
      ]
    }
    return [
      { title: 'Step 1: Open Azure AI Studio', desc: 'Free labs - Vision, Language, Document', simpleDesc: 'Tap to open free labs', example: 'No payment, free', copyText: '', showCopy: false, links: [{ label: '🤖 Open Azure AI Studio', url: 'https://ai.azure.com', color: '#0078d4' }] },
      { title: 'Step 2: Download Sample Invoice - We Give You', desc: 'For Document Intelligence lesson, we give sample invoice', simpleDesc: 'Tap to download sample invoice PDF we provide', example: 'Use this invoice to practice extracting data', copyText: '', showCopy: false, sampleFile: '/samples/Sample_Invoice.pdf', links: [{ label: '📥 Download Sample Invoice PDF', url: '/samples/Sample_Invoice.pdf', color: '#16a34a' }] },
      { title: 'Step 3: Screenshot Result', desc: 'Screenshot AI result', simpleDesc: 'Take picture', example: 'Save as proof', copyText: '', showCopy: false, links: [] },
    ]
  }

  if(slug==='google-data-analytics'){
    if(lessonId==='1'){
      return [
        { title: 'Step 1: Create Free Accounts - We Show Where', desc: 'Kaggle, BigQuery, Looker Studio - all free', simpleDesc: 'Tap buttons below to create accounts - free', example: 'No payment, free for learning', copyText: '', showCopy: false, links: [{ label: '📊 Open Kaggle', url: 'https://www.kaggle.com', color: '#20beff' }, { label: '☁️ Open BigQuery', url: 'https://console.cloud.google.com/bigquery', color: '#4285f4' }, { label: '📈 Open Looker Studio', url: 'https://lookerstudio.google.com', color: '#4285f4' }] },
        { title: 'Step 2: Copy Your Business Question', desc: 'What question will you answer with data?', simpleDesc: 'Copy template, change to your own question', example: 'Example: What products sell best in my shop?', copyText: `MY QUESTION:
Question: What products sell best in my area?
Data: Sales data
Who uses: My boss
Success: Increase sales 10%`, showCopy: true, links: [] },
        { title: 'Step 3: Screenshot Accounts Ready', desc: 'Screenshot 3 accounts you created', simpleDesc: 'Take picture', example: 'Save as Data_L1_Accounts.png', copyText: '', showCopy: false, links: [] },
      ]
    }
    if(lessonId==='2'){
      return [
        { title: 'Step 1: Open BigQuery - Free Data Provided', desc: 'Real online shop data - free, no credit card', simpleDesc: 'Tap to open BigQuery - data is already there', example: 'Dataset: thelook_ecommerce - Microsoft provides free', copyText: '', showCopy: false, links: [{ label: '☁️ Open BigQuery', url: 'https://console.cloud.google.com/bigquery', color: '#4285f4' }] },
        { title: 'Step 2: Copy 4 Questions to Ask Data - SQL', desc: 'Copy these 4 questions, paste in BigQuery, tap Run', simpleDesc: 'Copy one by one, paste, tap Run button, see numbers', example: 'You will see real numbers: total orders, top states, etc.', copyText: `Question 1 - Total orders:
SELECT COUNT(*) FROM \`bigquery-public-data.thelook_ecommerce.orders\`;

Question 2 - Orders by status:
SELECT status, COUNT(*) FROM \`bigquery-public-data.thelook_ecommerce.orders\` GROUP BY status;

Question 3 - Top 10 states:
SELECT users.state, COUNT(*) as orders FROM \`bigquery-public-data.thelook_ecommerce.orders\` orders JOIN \`bigquery-public-data.thelook_ecommerce.users\` users ON orders.user_id = users.id GROUP BY state ORDER BY orders DESC LIMIT 10;

Question 4 - Average sale price:
SELECT AVG(sale_price) FROM \`bigquery-public-data.thelook_ecommerce.order_items\`;`, showCopy: true, links: [] },
        { title: 'Step 3: Screenshot Numbers', desc: 'Screenshot each answer - proof for portfolio', simpleDesc: 'Take picture of numbers you see', example: 'Save as Data_L2_Numbers.png', copyText: '', showCopy: false, links: [] },
      ]
    }
    if(lessonId==='4'){
      return [
        { title: 'Step 1: Open Looker Studio - Blank Report', desc: 'Build dashboard - we give sample data', simpleDesc: 'Tap to open Looker Studio', example: 'Blank report > Add BigQuery data', copyText: '', showCopy: false, sampleFile: '/samples/Sample_Sales_Data.csv', links: [{ label: '📈 Open Looker Studio', url: 'https://lookerstudio.google.com', color: '#4285f4' }, { label: '📥 Download Sample Sales CSV', url: '/samples/Sample_Sales_Data.csv', color: '#16a34a' }] },
        { title: 'Step 2: Build 5 Pictures (Charts) - Copy Specs', desc: 'Make 5 pictures showing data', simpleDesc: 'Copy specs below, build charts one by one', example: 'Scorecard, time graph, bar chart, table, pie', copyText: `Build these 5 pictures:

1. Scorecard: Total orders = COUNT
2. Scorecard: Average sale = AVG
3. Time graph: Orders by month
4. Bar picture: Orders by state (top 10)
5. Table: Top 10 products

Add filter: Date + State
Add title: My Sales Dashboard`, showCopy: true, links: [] },
        { title: 'Step 3: Share Link', desc: 'Share > Anyone with link can view > Copy link', simpleDesc: 'Tap Share, copy link, save for portfolio', example: 'Save link in Notion or Google Doc portfolio', copyText: '', showCopy: false, links: [] },
      ]
    }
    return [
      { title: 'Step 1: Open Looker Studio', desc: 'Build dashboard', simpleDesc: 'Tap to open', example: 'Blank report', copyText: '', showCopy: false, links: [{ label: '📈 Open Looker Studio', url: 'https://lookerstudio.google.com', color: '#4285f4' }] },
      { title: 'Step 2: Copy Dashboard Steps', desc: 'Steps to build pictures', simpleDesc: 'Copy steps', example: '5 pictures', copyText: 'Build 5 charts: Scorecard, time series, bar, table, pie', showCopy: true, links: [] },
      { title: 'Step 3: Share Link', desc: 'Share for portfolio', simpleDesc: 'Share link', example: 'Anyone can view', copyText: '', showCopy: false, links: [] },
    ]
  }

  return [
    { title: 'Step 1: Open Tool', desc: 'Open tool', simpleDesc: 'Tap button', example: 'Tap Open', copyText: '', showCopy: false, links: [{ label: 'Open Tool', url: 'https://gemini.google.com', color: 'black' }] },
    { title: 'Step 2: Copy', desc: 'Copy', simpleDesc: 'Copy text', example: 'Copy', copyText: 'Task', showCopy: true, links: [] },
    { title: 'Step 3: Screenshot', desc: 'Screenshot', simpleDesc: 'Take picture', example: 'Save', copyText: '', showCopy: false, links: [] },
  ]
}

export default function LessonPage(){
  const params = useParams()
  const slug = params.slug as string
  const lessonId = params.lessonId as string
  const course = getCourse(slug)
  const [done,setDone]=useState(false)
  const [reading,setReading]=useState(false)
  const [labSteps,setLabSteps]=useState([false,false,false])
  const [copiedIndex,setCopiedIndex]=useState<number|null>(null)
  const [quizAns,setQuizAns]=useState<number|null>(null)
  const [quizShow,setQuizShow]=useState(false)
  const [mounted,setMounted]=useState(false)

  useEffect(()=>{
    setMounted(true)
    if(course){
      setDone(isLessonDone(slug, lessonId))
      const saved = localStorage.getItem(`lab_${slug}_${lessonId}`)
      if(saved) setLabSteps(JSON.parse(saved))
    }
  }, [slug, lessonId, course])

  useEffect(()=>{ if(mounted) localStorage.setItem(`lab_${slug}_${lessonId}`, JSON.stringify(labSteps)) }, [labSteps, slug, lessonId, mounted])

  if(!course) return <div>Course not found</div>
  const lesson = course.lessons.find((l:any)=>l.id===lessonId)
  const idx = course.lessons.findIndex((l:any)=>l.id===lessonId)
  const next = idx>=0 && idx < course.lessons.length-1 ? course.lessons[idx+1] : null
  const prev = idx>0 ? course.lessons[idx-1] : null
  if(!lesson) return <div>Lesson not found <Link href={`/courses/${slug}`}>Back</Link></div>

  const labs = getLabs(slug, lessonId)

  const handleCopy = async (text: string, index: number) => {
    if(!text) return
    try{ await navigator.clipboard.writeText(text); setCopiedIndex(index); setTimeout(()=>setCopiedIndex(null), 2000) }
    catch{
      const ta = document.createElement('textarea'); ta.value=text; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta)
      setCopiedIndex(index); setTimeout(()=>setCopiedIndex(null), 2000)
    }
  }

  const handleRead = () => {
    if('speechSynthesis' in window){
      if(reading){ window.speechSynthesis.cancel(); setReading(false); return }
      const u = new SpeechSynthesisUtterance(`${lesson.title}. ${lesson.content}`); u.rate=0.9; u.lang='en-US'; u.onend=()=>setReading(false); u.onerror=()=>setReading(false); window.speechSynthesis.speak(u); setReading(true)
    }
  }

  const toggle = (i:number)=>{ const n=[...labSteps]; n[i]=!n[i]; setLabSteps(n) }
  const progress = labSteps.filter(Boolean).length
  const allDone = progress===3
  const handleMarkDone = () => { const nd=!done; setDone(nd); saveProgress(slug, lessonId, nd) }

  return (
    <div style={{ minHeight: '100vh', background: '#faf9f6', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ background: 'black', color: 'white', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10, flexWrap: 'wrap', gap: '8px' }}>
        <Link href={`/courses/${slug}`} style={{ color: 'white', textDecoration: 'none', fontWeight: 900, fontSize: '13px' }}>← Back</Link>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <span style={{ background: '#111', border: '1px solid #444', padding: '4px 10px', borderRadius: '999px', fontSize: '11px' }}>Build {BUILD_STATUS.overall}%</span>
          <Link href="/dashboard" style={{ background: '#222', border: '1px solid #444', color: 'white', padding: '4px 10px', borderRadius: '999px', fontSize: '11px', textDecoration: 'none' }}>📊</Link>
          <span style={{ background: '#fbbf24', color: 'black', padding: '4px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 'bold' }}>L{idx+1}/{course.lessons.length}</span>
        </div>
      </header>

      <div style={{ maxWidth: '850px', margin: '0 auto', padding: '12px 16px' }}>
        <div style={{ background: 'black', color: 'white', padding: '10px 14px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', border: '2px solid #fde047', flexWrap: 'wrap', gap: '8px' }}>
          <span style={{ fontSize: '11px', fontWeight: 'bold' }}>📱 Simple for Everyone • We Give You Files • No Search Needed</span>
          <button onClick={handleRead} style={{ background: reading ? '#ef4444' : '#fde047', color: 'black', padding: '6px 12px', borderRadius: '999px', border: 'none', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>{reading ? '⏹️ Stop' : '🔊 Read Aloud'}</button>
        </div>

        <div style={{ background: 'white', borderRadius: '20px', border: '3px solid black', padding: '20px' }}>
          <h1 style={{ fontSize: '20px', fontWeight: 900, margin: '0 0 12px 0' }}>{idx+1}. {lesson.title}</h1>
          
          <div style={{ background: 'black', borderRadius: '14px', overflow: 'hidden', marginBottom: '16px', border: '3px solid black' }}>
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
              <iframe src={slug==='google-ai-essentials' ? (lessonId==='1' ? 'https://www.youtube.com/embed/3o5m1d2rUpU' : lessonId==='2' ? 'https://www.youtube.com/embed/5NgNicANyqM' : 'https://www.youtube.com/embed/2ePf9rue1Ao') : slug==='microsoft-ai-900' ? 'https://www.youtube.com/embed/hHIJbyQ7o2E' : 'https://www.youtube.com/embed/2a8PgqWrc_Q'} title={lesson.title} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
            <div style={{ padding: '10px 14px', background: '#111', color: 'white', display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '11px', fontWeight: 'bold' }}>🎥 Video - 5 mins - Official - Free</span>
              <span style={{ fontSize: '10px', background: '#222', padding: '4px 8px', borderRadius: '6px' }}>YouTube</span>
            </div>
          </div>

          <div style={{ fontSize: '15px', lineHeight: '1.7', background: '#faf9f6', padding: '16px', borderRadius: '12px', border: '1px solid #e5e7eb', whiteSpace: 'pre-wrap' }}>{lesson.content}</div>

          <div style={{ marginTop: '20px', background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)', border: '3px solid #3b82f6', padding: '16px', borderRadius: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
              <div><div style={{ fontWeight: 900, fontSize: '14px' }}>🧪 Do It Yourself - 3 Easy Steps</div><div style={{ fontSize: '10px', color: '#1e40af' }}>We give you files, no need to search. Simple words, for everyone.</div></div>
              <div style={{ background: allDone ? '#16a34a' : '#3b82f6', color: 'white', padding: '4px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 'bold' }}>{progress}/3 {allDone ? '✅' : ''}</div>
            </div>

            {labs.map((lab, i) => (
              <div key={i} style={{ background: 'white', padding: '14px', borderRadius: '12px', border: `3px solid ${labSteps[i] ? '#16a34a' : '#bfdbfe'}`, marginBottom: '10px' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={()=>toggle(i)} style={{ width: '28px', height: '28px', borderRadius: '50%', border: `3px solid ${labSteps[i] ? '#16a34a' : '#3b82f6'}`, background: labSteps[i] ? '#16a34a' : 'white', color: labSteps[i] ? 'white' : '#3b82f6', fontWeight: 'bold', cursor: 'pointer', flexShrink: 0 }}>{labSteps[i] ? '✓' : i+1}</button>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 900, fontSize: '13px' }}>{lab.title}</div>
                    <div style={{ fontSize: '11px', color: '#111', fontWeight: 'bold', marginTop: '2px' }}>{lab.simpleDesc}</div>
                    <div style={{ fontSize: '11px', color: '#374151', marginTop: '4px' }}>{lab.desc}</div>
                    <div style={{ fontSize: '11px', background: '#faf9f6', border: '1px solid #e5e7eb', padding: '8px', borderRadius: '8px', marginTop: '8px', whiteSpace: 'pre-wrap', lineHeight: '1.4' }}>{lab.example}</div>
                    <div style={{ marginTop: '8px', display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
                      {lab.links.map((link, li) => (
                        <a key={li} href={link.url} target="_blank" download={link.url.startsWith('/samples/') ? '' : undefined} style={{ background: link.color, color: link.color==='#fde047' ? 'black' : 'white', padding: '10px 14px', borderRadius: '8px', textDecoration: 'none', fontSize: '12px', fontWeight: 'bold', display: 'inline-block' }}>{link.label}</a>
                      ))}
                      {lab.showCopy && lab.copyText && (
                        <button onClick={()=>handleCopy(lab.copyText, i)} style={{ background: copiedIndex===i ? '#16a34a' : '#fde047', color: copiedIndex===i ? 'white' : 'black', padding: '10px 14px', borderRadius: '8px', border: 'none', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>{copiedIndex===i ? '✅ Copied!' : '📋 Copy This'}</button>
                      )}
                    </div>
                    {lab.showCopy && lab.copyText && (
                      <div style={{ marginTop: '8px', background: '#111', color: '#fde68a', padding: '10px', borderRadius: '8px', fontSize: '11px', fontFamily: 'monospace', whiteSpace: 'pre-wrap', maxHeight: '120px', overflow: 'auto' }}>{lab.copyText.substring(0,300)}{lab.copyText.length>300 ? '...' : ''}</div>
                    )}
                    {lab.sampleFile && (
                      <div style={{ marginTop: '8px', fontSize: '10px', color: '#16a34a', background: '#f0fdf4', padding: '6px 8px', borderRadius: '6px', border: '1px solid #bbf7d0' }}>✅ We give you this file - Tap green download button above. No need to search.</div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            <div style={{ marginTop: '12px', background: allDone ? '#f0fdf4' : '#fff', border: `2px dashed ${allDone ? '#16a34a' : '#3b82f6'}`, padding: '10px', borderRadius: '10px', textAlign: 'center', fontSize: '12px' }}>
              {allDone ? <span style={{ fontWeight: 900, color: '#16a34a' }}>🎉 Well done! You did 3 steps - ready for next lesson!</span> : <span style={{ fontWeight: 800 }}>👉 Do Step 1, 2, 3. We give you files. Tap buttons. No search needed.</span>}
            </div>
          </div>

          {true && (
            <div style={{ marginTop: '14px', background: '#f0fdf4', border: '2px solid #16a34a', padding: '14px', borderRadius: '12px' }}>
              <div style={{ fontWeight: 900, fontSize: '13px' }}>❓ Quick Check - Test yourself</div>
              
              <div style={{ fontSize: '13px', marginTop: '6px', background: 'white', padding: '10px', borderRadius: '8px' }}>{lesson.quiz}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '10px' }}>
                {['A: First option - Tap here', 'B: Second option - Tap here (Correct)', 'C: Third option - Tap here'].map((opt,i)=>(
                  <button key={i} onClick={()=>{ setQuizAns(i); setQuizShow(true) }} style={{ background: quizAns===i ? (i===1 ? '#16a34a' : '#ef4444') : 'white', color: quizAns===i ? 'white' : 'black', border: `2px solid ${quizAns===i ? (i===1 ? '#16a34a' : '#ef4444') : '#e5e7eb'}`, padding: '12px', borderRadius: '10px', textAlign: 'left', fontSize: '13px', cursor: 'pointer', fontWeight: 'bold' }}>
                    {opt} {quizAns===i && i===1 ? '✅ Correct!' : quizAns===i ? '❌ Try again' : ''}
                  </button>
                ))}
              </div>
              {quizShow && (
                <div style={{ marginTop: '10px', background: quizAns===1 ? '#f0fdf4' : '#fef2f2', border: `2px solid ${quizAns===1 ? '#bbf7d0' : '#fecaca'}`, padding: '12px', borderRadius: '10px' }}>
                  <div style={{ fontWeight: 900, fontSize: '13px', color: quizAns===1 ? '#16a34a' : '#ef4444' }}>{quizAns===1 ? '🎉 Correct! You understood!' : '💡 Not correct, watch video again!'}</div>
                  <div style={{ fontSize: '12px', marginTop: '6px' }}>Explanation: This lesson teaches you to use AI for your work. Practice with the 3 steps below. For certification, you need to understand this.</div>
                </div>
              )}
            
            </div>
          )}

          <div style={{ marginTop: '16px', padding: '14px', background: done ? '#f0fdf4' : '#fff', border: `3px solid ${done ? '#16a34a' : '#e5e7eb'}`, borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <div><div style={{ fontWeight: 900, fontSize: '14px' }}>{done ? '🎉 Saved!' : 'Finish this lesson?'}</div><div style={{ fontSize: '10px', color: '#6b7280' }}>Simple for illiterate • We give files • Progress saved</div></div>
            <button onClick={handleMarkDone} style={{ background: done ? '#16a34a' : allDone ? '#111' : '#9ca3af', color: 'white', padding: '12px 20px', borderRadius: '10px', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>{done ? '✓ Done ✅' : allDone ? 'Mark Done 🎉' : 'Do 3 Steps First'}</button>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', gap: '10px', flexWrap: 'wrap' }}>
          {prev ? <Link href={`/courses/${slug}/${prev.id}`} style={{ background: 'white', border: '2px solid black', padding: '12px 16px', borderRadius: '12px', textDecoration: 'none', color: 'black', fontWeight: 'bold', fontSize: '12px', flex: 1, textAlign: 'center' }}>← Previous</Link> : <div style={{ flex: 1 }}></div>}
          {next ? <Link href={`/courses/${slug}/${next.id}`} style={{ background: 'black', color: 'white', padding: '12px 16px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold', fontSize: '12px', flex: 1, textAlign: 'center' }}>Next →</Link> : <Link href="/dashboard" style={{ background: '#16a34a', color: 'white', padding: '12px 16px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold', fontSize: '12px', flex: 1, textAlign: 'center' }}>Dashboard 🎓</Link>}
        </div>
      </div>
    </div>
  )
}
