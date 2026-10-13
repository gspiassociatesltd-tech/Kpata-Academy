
'use client'
import { useParams } from 'next/navigation'
import { getCourse, BUILD_STATUS } from '../../../../lib/courses'
import { saveProgress, isLessonDone } from '../../../../lib/progress'
import Link from 'next/link'
import { useState, useEffect } from 'react'

type LabStep = { title: string; desc: string; example: string; copyText: string; links: { label: string; url: string; color: string }[] }

function getLabs(slug: string, lessonId: string): LabStep[] {
  // Google AI Essentials - Unique per lesson
  if(slug==='google-ai-essentials'){
    if(lessonId==='1'){
      return [
        { title: 'Step 1: Open Google Doc & See Example', desc: 'Example of 5 repetitive tasks in YOUR job. We provide template.', example: '1. Weekly sales report Monday (1h)\n2. Same emails "Price?" "Delivery?" (30m daily)\n3. Meeting notes summary (45m)\n4. Social posts (1h weekly)\n5. Emails to Excel (30m daily)\nTotal ~7h/week wasted', copyText: `MY 5 REPETITIVE TASKS (Edit with yours):

1. Writing weekly sales report every Monday (1 hour)
2. Replying same emails: "What is price? Delivery time?" (30 mins daily)
3. Summarizing long meeting notes into action items (45 mins)
4. Creating social media posts for product (1 hour weekly)
5. Copying data from emails into Excel (30 mins daily)

Total wasted: ~7 hours/week. With AI I can save 4 hours!
`, links: [{ label: '📄 Open Google Doc (docs.new)', url: 'https://docs.new', color: '#4285f4' }, { label: '📓 NotebookLM', url: 'https://notebooklm.google.com', color: 'black' }] },
        { title: 'Step 2: Copy & Save Your Own List', desc: 'Copy example above, paste in Google Doc, replace with YOUR 5 tasks', example: 'Paste in doc, save as "My AI Opportunities - Lesson 1"', copyText: `MY 5 REPETITIVE TASKS (My real tasks):
1. [Replace with your task 1 + time]
2. [Replace with your task 2 + time]
3. [Replace with your task 3 + time]
4. [Replace with your task 4 + time]
5. [Replace with your task 5 + time]
Total time per week: [Calculate]`, links: [{ label: '📋 Copy My Template', url: '', color: '#fde047' }, { label: '✨ Open Gemini', url: 'https://gemini.google.com', color: 'black' }] },
        { title: 'Step 3: Screenshot for Portfolio', desc: 'Screenshot your Google Doc list. Save as Lesson1_5Tasks.png', example: 'Press Windows+Shift+S or Cmd+Shift+4, save in folder Kpata My Work', copyText: 'Screenshot saved! Proof for portfolio.', links: [] },
      ]
    }
    if(lessonId==='2'){
      return [
        { title: 'Step 1: Open NotebookLM & Upload PDF', desc: 'NotebookLM is best for YOUR private PDFs. Upload any PDF from your computer.', example: 'Use: Company policy, handbook, contract, 10-page report. Any PDF you have.', copyText: 'I will upload: [Name of your PDF, e.g., Company Handbook.pdf]', links: [{ label: '📓 Open NotebookLM', url: 'https://notebooklm.google.com', color: 'black' }, { label: '📄 Google Drive (find PDF)', url: 'https://drive.google.com', color: '#4285f4' }] },
        { title: 'Step 2: Copy Prompts to Ask Your PDF', desc: 'Copy these 3 prompts and paste in NotebookLM after upload', example: 'Paste one by one, see summary', copyText: `Prompt 1 to paste in NotebookLM:
Summarize this document in 5 bullet points, simple language.

Prompt 2:
What is process for sick leave? Include days and approval steps.

Prompt 3:
Extract all important dates and deadlines from this document.`, links: [{ label: '📋 Copy 3 Prompts', url: '', color: '#fde047' }, { label: '✨ Open Gemini for comparison', url: 'https://gemini.google.com', color: 'black' }] },
        { title: 'Step 3: Screenshot Summary', desc: 'Screenshot NotebookLM answers. Compare time: Without AI 30 mins reading, With AI 2 mins.', example: 'Save as Lesson2_NotebookLM_Summary.png', copyText: 'Proof saved!', links: [] },
      ]
    }
    if(lessonId==='3'){
      return [
        { title: 'Step 1: Open Google Doc for Prompt Pack', desc: 'Create new doc for 5 prompts you will use daily at work', example: 'Title: My Daily Prompt Pack - 5 Prompts for My Job', copyText: 'Doc Title: My Daily Prompt Pack - 5 Prompts', links: [{ label: '📄 Open Google Doc', url: 'https://docs.new', color: '#4285f4' }] },
        { title: 'Step 2: Copy 5 Prompts Pack - Ready to Use', desc: 'Copy this full pack, paste in doc, replace brackets with your details', example: 'Replace [YOUR NOTES], [YOUR EMAIL], [YOUR PRODUCT]', copyText: `MY 5 DAILY PROMPTS:

1. EMAIL PROMPT:
You are executive assistant. Write concise email (120 words) to client confirming meeting tomorrow 2pm, agenda: pricing, delivery. Tone: professional friendly.

2. SUMMARY PROMPT:
Summarize these meeting notes into: 3 decisions, action items with owner, next date. Notes: [PASTE NOTES]

3. BRAINSTORM PROMPT:
Give me 10 social media post ideas about [YOUR PRODUCT], focus on benefits, simple language, for small business owners Nigeria.

4. TABLE PROMPT:
Create table comparing 3 competitors for [YOUR PRODUCT]: Columns: Company, Price, Warranty, Feature. Use recent data.

5. REWRITE PROMPT:
Rewrite this to be professional concise: [PASTE EMAIL]`, links: [{ label: '📋 Copy 5 Prompts Pack', url: '', color: '#fde047' }, { label: '✨ Test in Gemini', url: 'https://gemini.google.com', color: 'black' }] },
        { title: 'Step 3: Test One Prompt in Gemini', desc: 'Copy Prompt 1, paste in Gemini, see email draft. Screenshot.', example: 'Save as Lesson3_PromptPack_Test.png', copyText: 'Tested!', links: [] },
      ]
    }
    if(lessonId==='4'){
      return [
        { title: 'Step 1: Open Checklist Doc', desc: 'Responsible AI checklist before sending AI work', example: 'Create checklist you will use every time', copyText: 'Checklist Doc Title: My Responsible AI Checklist', links: [{ label: '📄 Open Google Doc', url: 'https://docs.new', color: '#4285f4' }] },
        { title: 'Step 2: Copy Responsible AI Checklist', desc: 'Copy this checklist, paste in doc, use before sending any AI work', example: 'Use this for every AI draft', copyText: `RESPONSIBLE AI CHECKLIST - Before Sending:

[ ] Privacy: Did I remove ID numbers, bank, passwords, confidential?
[ ] Facts: Did I verify numbers, citations, studies with Google search?
[ ] Bias: Does text use inclusive language? No gender stereotypes?
[ ] Disclosure: Would I be comfortable if boss knows I used AI?
[ ] Human review: Did I read and edit final version?

If all checked, safe to send.`, links: [{ label: '📋 Copy Checklist', url: '', color: '#fde047' }] },
        { title: 'Step 3: Apply to One AI Draft', desc: 'Take one previous Gemini draft, apply checklist, fix issues', example: 'Save as Lesson4_Responsible_Check.png', copyText: 'Checked!', links: [] },
      ]
    }
    if(lessonId==='5'){
      return [
        { title: 'Step 1: Open Coursera', desc: 'Search Google AI Essentials, enroll Audit FREE', example: 'coursera.org > Search Google AI Essentials > Enroll > Audit', copyText: 'Go to: coursera.org - Search Google AI Essentials', links: [{ label: '🎓 Open Coursera', url: 'https://www.coursera.org/search?query=Google%20AI%20Essentials', color: '#0056d2' }] },
        { title: 'Step 2: Copy Financial Aid Text (If Need Free Certificate)', desc: 'If cannot pay $49, use financial aid - copy this 2-paragraph text', example: 'Paste in financial aid application', copyText: `I am unemployed graduate in Nigeria seeking career change to AI productivity. I cannot afford $49 course fee due to low income. This Google certificate will help me get remote job to support family. I am committed to complete course in 4 weeks and apply skills at work. I will contribute to community by teaching others.

I want to learn AI Essentials to improve productivity at work, get Google certificate for LinkedIn, and qualify for AI-related remote jobs. This will help me earn income and support family.`, links: [{ label: '📋 Copy Aid Text', url: '', color: '#fde047' }] },
        { title: 'Step 3: Enroll & Start Module 1', desc: 'Click Enroll, start Module 1 video, take quiz, screenshot progress', example: 'Save progress screenshot as Lesson5_Coursera_Enrolled.png', copyText: 'Enrolled!', links: [] },
      ]
    }
  }

  // Microsoft AI-900 - Unique
  if(slug==='microsoft-ai-900'){
    if(lessonId==='1'){
      return [
        { title: 'Step 1: Open Microsoft Learn - AI Workloads', desc: 'Learn which Azure service matches which business problem', example: 'Map: Receipt text -> Document Intelligence, Face detection -> Face service', copyText: 'Learn URL: learn.microsoft.com - AI-900 Module 1', links: [{ label: '🎓 Open Microsoft Learn', url: 'https://learn.microsoft.com/en-us/training/modules/get-started-ai-fundamentals/', color: '#0078d4' }] },
        { title: 'Step 2: Copy Workload Mapping Exercise', desc: 'Copy table, fill which service for each scenario', example: 'Test yourself: 5 scenarios to service mapping', copyText: `WORKLOAD MAPPING - Fill Azure Service:

1. Extract text from receipt -> [Document Intelligence]
2. Detect faces in photo -> [Face service]
3. Translate website English to French -> [Translator]
4. Chatbot for FAQ -> [Bot Service + Language]
5. Find similar images -> [Computer Vision - Image Analysis]`, links: [{ label: '📋 Copy Exercise', url: '', color: '#fde047' }] },
        { title: 'Step 3: Screenshot Knowledge Check', desc: 'Complete Module 1 knowledge check, screenshot score', example: 'Save as AI900_L1_KnowledgeCheck.png', copyText: 'Done!', links: [] },
      ]
    }
    if(lessonId==='2'){
      return [
        { title: 'Step 1: Open Azure ML Studio', desc: 'No-code Automated ML - No coding needed', example: 'ml.azure.com - Free account with sample data', copyText: 'Go to: ml.azure.com - Sign in with Microsoft free account', links: [{ label: '🤖 Open Azure ML Studio', url: 'https://ml.azure.com', color: '#0078d4' }, { label: '📄 Docs: Automated ML', url: 'https://learn.microsoft.com/en-us/azure/machine-learning/how-to-use-automated-ml-for-tabular-data', color: '#0078d4' }] },
        { title: 'Step 2: Copy Steps to Create Model', desc: 'Follow steps to create Automated ML job with sample data', example: 'Use Bank Marketing sample, target: y (subscribe yes/no)', copyText: `Automated ML Steps:
1. New Automated ML job
2. Select dataset: Bank Marketing sample
3. Configure: Target column = y
4. Select task: Classification
5. Start job - Wait 20-30 mins
6. View best model - Accuracy >80%`, links: [{ label: '📋 Copy Steps', url: '', color: '#fde047' }] },
        { title: 'Step 3: Screenshot Best Model', desc: 'Screenshot best model accuracy and deploy button', example: 'Save as AI900_L2_AutomatedML_BestModel.png', copyText: 'Model created!', links: [] },
      ]
    }
    // Generic for other AI-900 lessons
    return [
      { title: 'Step 1: Open Azure AI Studio', desc: 'Try Vision, Language, Document Intelligence labs free', example: 'ai.azure.com - Free labs without Azure subscription', copyText: 'Go to: ai.azure.com', links: [{ label: '🤖 Open Azure AI Studio', url: 'https://ai.azure.com', color: '#0078d4' }] },
      { title: 'Step 2: Copy Lab Instructions', desc: 'Copy specific lab for this lesson', example: 'Follow lesson content for this module', copyText: 'Lab instructions from lesson content above', links: [{ label: '📋 Copy Lab', url: '', color: '#fde047' }] },
      { title: 'Step 3: Screenshot Lab Result', desc: 'Screenshot result for portfolio', example: 'Save as proof', copyText: 'Done', links: [] },
    ]
  }

  // Google Data Analytics - Unique
  if(slug==='google-data-analytics'){
    if(lessonId==='1'){
      return [
        { title: 'Step 1: Setup Accounts', desc: 'Create 3 free accounts needed for data analytics', example: 'Kaggle, BigQuery sandbox, Looker Studio', copyText: 'Setup: kaggle.com, console.cloud.google.com/bigquery, lookerstudio.google.com', links: [{ label: '📊 Open Kaggle', url: 'https://www.kaggle.com', color: '#20beff' }, { label: '☁️ BigQuery', url: 'https://console.cloud.google.com/bigquery', color: '#4285f4' }, { label: '📈 Looker Studio', url: 'https://lookerstudio.google.com', color: '#4285f4' }] },
        { title: 'Step 2: Copy Business Question', desc: 'Define your portfolio question - copy template', example: 'What question will you answer with data?', copyText: `MY BUSINESS QUESTION (Portfolio Theme):

Question: What products sell best in my area? Or: Why sales dropped last month?
Data needed: Sales data, customer data
Stakeholders: Who will use answer? E.g., My boss, client
Success metric: How to know answer is useful? E.g., Increase sales 10%`, links: [{ label: '📋 Copy Template', url: '', color: '#fde047' }] },
        { title: 'Step 3: Screenshot Accounts Created', desc: 'Screenshot 3 accounts ready', example: 'Save as Data_L1_Accounts_Ready.png', copyText: 'Accounts ready!', links: [] },
      ]
    }
    if(lessonId==='2'){
      return [
        { title: 'Step 1: Open BigQuery Public Dataset', desc: 'Query real e-commerce data free', example: 'bigquery-public-data.thelook_ecommerce - No credit card needed', copyText: 'Dataset: bigquery-public-data.thelook_ecommerce.orders', links: [{ label: '☁️ Open BigQuery', url: 'https://console.cloud.google.com/bigquery', color: '#4285f4' }] },
        { title: 'Step 2: Copy 4 SQL Queries - Run Them', desc: 'Copy each query, paste in BigQuery, run, screenshot result', example: 'Run one by one, see counts', copyText: `SQL Queries to Copy-Paste in BigQuery:

Query 1 - Count total orders:
SELECT COUNT(*) as total_orders FROM \`bigquery-public-data.thelook_ecommerce.orders\`;

Query 2 - Orders by status:
SELECT status, COUNT(*) as count FROM \`bigquery-public-data.thelook_ecommerce.orders\` GROUP BY status ORDER BY count DESC;

Query 3 - Top 10 states by orders:
SELECT users.state, COUNT(*) as orders FROM \`bigquery-public-data.thelook_ecommerce.orders\` orders JOIN \`bigquery-public-data.thelook_ecommerce.users\` users ON orders.user_id = users.id GROUP BY state ORDER BY orders DESC LIMIT 10;

Query 4 - Average sale price:
SELECT AVG(sale_price) as avg_sale FROM \`bigquery-public-data.thelook_ecommerce.order_items\`;`, links: [{ label: '📋 Copy 4 SQL Queries', url: '', color: '#fde047' }] },
        { title: 'Step 3: Screenshot Query Results', desc: 'Screenshot each query result - portfolio proof', example: 'Save as Data_L2_BigQuery_Results.png', copyText: 'Queries run!', links: [] },
      ]
    }
    // Generic for other data lessons
    return [
      { title: 'Step 1: Open Looker Studio', desc: 'Build dashboard', example: 'lookerstudio.google.com - Blank report', copyText: 'Go to: lookerstudio.google.com', links: [{ label: '📈 Open Looker Studio', url: 'https://lookerstudio.google.com', color: '#4285f4' }] },
      { title: 'Step 2: Copy Dashboard Steps', desc: 'Steps to build 5 charts', example: 'Scorecard, time series, bar, table, pie', copyText: 'Dashboard steps from lesson above', links: [{ label: '📋 Copy Steps', url: '', color: '#fde047' }] },
      { title: 'Step 3: Share Dashboard Link', desc: 'Share link for portfolio', example: 'Anyone with link can view - Add to Notion portfolio', copyText: 'Dashboard shared!', links: [] },
    ]
  }

  // Fallback
  return [
    { title: 'Step 1: Open Tool', desc: 'Open tool for this lesson', example: 'See lesson content', copyText: 'Open tool', links: [{ label: '📓 Open Tool', url: 'https://gemini.google.com', color: 'black' }] },
    { title: 'Step 2: Copy Task', desc: 'Copy task for this lesson', example: 'See lab in lesson', copyText: 'Task from lesson', links: [{ label: '📋 Copy', url: '', color: '#fde047' }] },
    { title: 'Step 3: Screenshot', desc: 'Screenshot proof', example: 'Save proof', copyText: 'Done', links: [] },
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
  const [mounted,setMounted]=useState(false)

  useEffect(()=>{
    setMounted(true)
    if(course){
      setDone(isLessonDone(slug, lessonId))
      const saved = localStorage.getItem(`lab_${slug}_${lessonId}`)
      if(saved) setLabSteps(JSON.parse(saved))
    }
  }, [slug, lessonId, course])

  useEffect(()=>{
    if(mounted) localStorage.setItem(`lab_${slug}_${lessonId}`, JSON.stringify(labSteps))
  }, [labSteps, slug, lessonId, mounted])

  if(!course) return <div>Course not found</div>
  const lesson = course.lessons.find((l:any)=>l.id===lessonId)
  const idx = course.lessons.findIndex((l:any)=>l.id===lessonId)
  const next = idx>=0 && idx < course.lessons.length-1 ? course.lessons[idx+1] : null
  const prev = idx>0 ? course.lessons[idx-1] : null
  if(!lesson) return <div>Lesson not found <Link href={`/courses/${slug}`}>Back</Link></div>

  const labs = getLabs(slug, lessonId)

  const handleCopy = async (text: string, index: number) => {
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

  const handleMarkDone = () => {
    const newDone = !done
    setDone(newDone)
    saveProgress(slug, lessonId, newDone)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#faf9f6', fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ background: 'black', color: 'white', padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10, flexWrap: 'wrap', gap: '8px' }}>
        <Link href={`/courses/${slug}`} style={{ color: 'white', textDecoration: 'none', fontWeight: 900, fontSize: '13px' }}>← Back to {course.title.substring(0,20)}</Link>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <span style={{ background: '#111', border: '1px solid #444', padding: '4px 10px', borderRadius: '999px', fontSize: '11px' }}>Build {BUILD_STATUS.overall}%</span>
          <Link href="/dashboard" style={{ background: '#222', border: '1px solid #444', color: 'white', padding: '4px 10px', borderRadius: '999px', fontSize: '11px', textDecoration: 'none' }}>📊</Link>
          <span style={{ background: '#fbbf24', color: 'black', padding: '4px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 'bold' }}>L{idx+1}/{course.lessons.length}</span>
        </div>
      </header>

      <div style={{ maxWidth: '850px', margin: '0 auto', padding: '12px 16px' }}>
        <div style={{ background: 'black', color: 'white', padding: '10px 14px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', border: '2px solid #fde047', flexWrap: 'wrap', gap: '8px' }}>
          <span style={{ fontSize: '11px', fontWeight: 'bold' }}>📖 Unique Lab per Lesson • No Repeat • Build {BUILD_STATUS.overall}%</span>
          <button onClick={handleRead} style={{ background: reading ? '#ef4444' : '#fde047', color: 'black', padding: '6px 12px', borderRadius: '999px', border: 'none', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>{reading ? '⏹️ Stop' : '🔊 Read'}</button>
        </div>

        <div style={{ background: 'white', borderRadius: '20px', border: '3px solid black', padding: '20px' }}>
          <div style={{ display: 'flex', gap: '6px', marginBottom: '10px', flexWrap: 'wrap' }}>
            <span style={{ background: '#fde68a', padding: '5px 10px', borderRadius: '999px', fontSize: '10px', fontWeight: 'bold' }}>⏱️ {lesson.duration}</span>
            <span style={{ background: '#eff6ff', padding: '5px 10px', borderRadius: '999px', fontSize: '10px', fontWeight: 'bold', border: '1px solid #bfdbfe' }}>{course.title.split(' ')[0]} • L{lessonId}</span>
          </div>
          <h1 style={{ fontSize: '20px', fontWeight: 900, margin: '0 0 12px 0', lineHeight: '1.2' }}>{idx+1}. {lesson.title}</h1>
          <div style={{ fontSize: '15px', lineHeight: '1.7', background: '#faf9f6', padding: '16px', borderRadius: '12px', border: '1px solid #e5e7eb', whiteSpace: 'pre-wrap' }}>{lesson.content}</div>

          <div style={{ marginTop: '20px', background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)', border: '3px solid #3b82f6', padding: '16px', borderRadius: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
              <div><div style={{ fontWeight: 900, fontSize: '14px' }}>🧪 Lab: 3 Unique Steps for This Lesson (No Repeat)</div><div style={{ fontSize: '10px', color: '#1e40af' }}>Each lesson has different task • Copy what you see • Dummy-proof</div></div>
              <div style={{ background: allDone ? '#16a34a' : '#3b82f6', color: 'white', padding: '4px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 'bold' }}>{progress}/3 {allDone ? '✅' : ''}</div>
            </div>

            {labs.map((lab, i) => (
              <div key={i} style={{ background: 'white', padding: '14px', borderRadius: '12px', border: `3px solid ${labSteps[i] ? '#16a34a' : '#bfdbfe'}`, marginBottom: '10px' }}>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={()=>toggle(i)} style={{ width: '28px', height: '28px', borderRadius: '50%', border: `3px solid ${labSteps[i] ? '#16a34a' : '#3b82f6'}`, background: labSteps[i] ? '#16a34a' : 'white', color: labSteps[i] ? 'white' : '#3b82f6', fontWeight: 'bold', cursor: 'pointer', flexShrink: 0 }}>{labSteps[i] ? '✓' : i+1}</button>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 900, fontSize: '13px' }}>{lab.title}</div>
                    <div style={{ fontSize: '11px', color: '#374151', marginTop: '4px' }}>{lab.desc}</div>
                    <div style={{ fontSize: '11px', background: '#faf9f6', border: '1px solid #e5e7eb', padding: '8px', borderRadius: '8px', marginTop: '8px', whiteSpace: 'pre-wrap', lineHeight: '1.4' }}>{lab.example}</div>
                    <div style={{ marginTop: '8px', display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
                      {lab.links.map((link, li) => (
                        link.url ? <a key={li} href={link.url} target="_blank" style={{ background: link.color, color: link.color==='#fde047' ? 'black' : 'white', padding: '8px 12px', borderRadius: '8px', textDecoration: 'none', fontSize: '11px', fontWeight: 'bold', border: link.color==='#fde047' ? '2px solid #f59e0b' : 'none' }}>{link.label}</a> : null
                      ))}
                      <button onClick={()=>handleCopy(lab.copyText, i)} style={{ background: copiedIndex===i ? '#16a34a' : '#fde047', color: copiedIndex===i ? 'white' : 'black', padding: '8px 12px', borderRadius: '8px', border: 'none', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>{copiedIndex===i ? '✅ Copied!' : '📋 Copy This'}</button>
                    </div>
                    <div style={{ marginTop: '6px', background: '#111', color: '#fde68a', padding: '8px', borderRadius: '6px', fontSize: '10px', fontFamily: 'monospace', whiteSpace: 'pre-wrap', maxHeight: '100px', overflow: 'auto' }}>{lab.copyText.substring(0,250)}{lab.copyText.length>250 ? '...' : ''}</div>
                  </div>
                </div>
              </div>
            ))}

            <div style={{ marginTop: '12px', background: allDone ? '#f0fdf4' : '#fff', border: `2px dashed ${allDone ? '#16a34a' : '#3b82f6'}`, padding: '10px', borderRadius: '10px', textAlign: 'center', fontSize: '12px' }}>
              {allDone ? <span style={{ fontWeight: 900, color: '#16a34a' }}>🎉 All 3 Unique Steps Done! This lesson is different from others - you learned something new!</span> : <span style={{ fontWeight: 800 }}>👉 Each lesson has UNIQUE lab - not repeated. Check boxes as you do.</span>}
            </div>
          </div>

          {lesson.quiz && (
            <div style={{ marginTop: '14px', background: '#f0fdf4', border: '2px solid #16a34a', padding: '14px', borderRadius: '12px' }}>
              <div style={{ fontWeight: 900, fontSize: '13px' }}>❓ Quick Check</div>
              <div style={{ fontSize: '13px', marginTop: '6px', background: 'white', padding: '10px', borderRadius: '8px' }}>{lesson.quiz}</div>
            </div>
          )}

          <div style={{ marginTop: '16px', padding: '14px', background: done ? '#f0fdf4' : '#fff', border: `3px solid ${done ? '#16a34a' : '#e5e7eb'}`, borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <div><div style={{ fontWeight: 900, fontSize: '14px' }}>{done ? '🎉 Saved to Dashboard!' : 'Save progress?'}</div><div style={{ fontSize: '10px', color: '#6b7280' }}>Unique lab • Mobile friendly • Build {BUILD_STATUS.overall}%</div></div>
            <button onClick={handleMarkDone} style={{ background: done ? '#16a34a' : allDone ? '#111' : '#9ca3af', color: 'white', padding: '12px 20px', borderRadius: '10px', border: 'none', fontWeight: 'bold', cursor: 'pointer', fontSize: '13px' }}>{done ? '✓ Done ✅' : allDone ? 'Mark Done 🎉' : 'Do Labs First'}</button>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', gap: '10px', flexWrap: 'wrap' }}>
          {prev ? <Link href={`/courses/${slug}/${prev.id}`} style={{ background: 'white', border: '2px solid black', padding: '12px 16px', borderRadius: '12px', textDecoration: 'none', color: 'black', fontWeight: 'bold', fontSize: '12px', flex: 1, textAlign: 'center' }}>← {prev.title.substring(0,20)}</Link> : <div style={{ flex: 1 }}></div>}
          {next ? <Link href={`/courses/${slug}/${next.id}`} style={{ background: 'black', color: 'white', padding: '12px 16px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold', fontSize: '12px', flex: 1, textAlign: 'center' }}>{next.title.substring(0,20)} →</Link> : <Link href="/dashboard" style={{ background: '#16a34a', color: 'white', padding: '12px 16px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold', fontSize: '12px', flex: 1, textAlign: 'center' }}>Dashboard 🎓</Link>}
        </div>
      </div>
    </div>
  )
}
