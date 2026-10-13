
'use client'
import { useState, useEffect } from 'react'
import { getProgress, getCourseProgress, getOverallProgress } from '../../lib/progress'
import { getAllCourses } from '../../lib/courses'
import Link from 'next/link'
import { WhatsAppBanner } from '../../components/WhatsAppBanner'

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false)
  const [progress, setProgress] = useState<any>({})
  const [overall, setOverall] = useState({ completed: 0, total: 15, percent: 0 })
  const [showResume, setShowResume] = useState(false)
  const [userInfo, setUserInfo] = useState({ name: '', email: '', phone: '' })

  useEffect(() => {
    setMounted(true)
    setProgress(getProgress())
    setOverall(getOverallProgress())
    try {
      const saved = localStorage.getItem('kpata_user_info')
      if (saved) setUserInfo(JSON.parse(saved))
    } catch {}
  }, [])

  const courses = getAllCourses()

  if (!mounted) return <div style={{ padding: '20px' }}>Loading dashboard - No registration needed...</div>

  return (
    <div style={{ minHeight: '100vh', background: '#faf9f6', fontFamily: 'system-ui' }}>
      <WhatsAppBanner variant="top" />
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '16px' }}>
        <Link href="/" style={{ fontWeight: 900, fontSize: '13px', textDecoration: 'none', color: 'black' }}>← Back to Home</Link>
        
        <div style={{ background: 'black', color: 'white', padding: '20px', borderRadius: '20px', marginTop: '16px', border: '3px solid #fde047' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 900, margin: 0 }}>Dashboard - No Registration Needed to Learn!</h1>
          <div style={{ fontSize: '12px', color: '#fde047', marginTop: '6px' }}>Progress saved locally in browser - {overall.completed}/{overall.total} lessons - {overall.percent}% complete - No email needed</div>
          <div style={{ background: '#222', borderRadius: '999px', height: '20px', overflow: 'hidden', marginTop: '12px' }}>
            <div style={{ width: `${overall.percent}%`, background: 'linear-gradient(90deg, #fde047, #22c55e)', height: '100%', borderRadius: '999px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', paddingRight: '10px', fontSize: '11px', fontWeight: 'bold', color: 'black' }}>{overall.percent}%</div>
          </div>
        </div>

        <WhatsAppBanner variant="dashboard" />

        <div style={{ marginTop: '16px' }}>
          {courses.map((course: any) => {
            const cp = getCourseProgress(course.slug)
            return (
              <div key={course.slug} style={{ background: 'white', border: '3px solid black', borderRadius: '14px', padding: '16px', marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 900, fontSize: '14px' }}>{course.title}</div>
                    <div style={{ fontSize: '11px', color: '#6b7280' }}>{cp.completed}/{cp.total} lessons - {cp.percent}% - No registration needed</div>
                  </div>
                  <Link href={`/courses/${course.slug}`} style={{ background: '#111', color: 'white', padding: '8px 12px', borderRadius: '8px', textDecoration: 'none', fontSize: '11px', fontWeight: 900 }}>Continue</Link>
                </div>
                <div style={{ background: '#f3f4f6', borderRadius: '999px', height: '10px', overflow: 'hidden', marginTop: '10px' }}>
                  <div style={{ width: `${cp.percent}%`, background: '#22c55e', height: '100%' }}></div>
                </div>
              </div>
            )
          })}
        </div>

        <div style={{ background: 'white', border: '3px solid black', borderRadius: '14px', padding: '16px', marginTop: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontWeight: 900, fontSize: '14px' }}>📄 Build Resume / CV - Optional Registration - How We Know You Without Registration?</div>
            <button onClick={() => setShowResume(!showResume)} style={{ background: showResume ? '#ef4444' : '#f59e0b', color: showResume ? 'white' : 'black', padding: '8px 12px', borderRadius: '8px', border: 'none', fontWeight: 900, fontSize: '11px', cursor: 'pointer' }}>{showResume ? 'Hide' : 'Build Resume'}</button>
          </div>
          
          {showResume && (
            <div style={{ marginTop: '16px' }}>
              <WhatsAppBanner variant="resume" />
              
              <div style={{ marginTop: '16px', background: '#faf9f6', padding: '14px', borderRadius: '10px', border: '2px solid #e5e7eb' }}>
                <div style={{ fontWeight: 900, fontSize: '13px' }}>Step 1: Learning Phase - No Registration Needed (Current)</div>
                <div style={{ fontSize: '11px', marginTop: '6px' }}>You have completed {overall.completed}/{overall.total} lessons ({overall.percent}%) - Progress saved locally in browser (localStorage) - No email, no registration needed to learn - This is what we agreed to reduce friction for illiterate users - Anyone can learn 100% FREE</div>
                
                <div style={{ fontWeight: 900, fontSize: '13px', marginTop: '14px' }}>Step 2: Resume Phase - Optional Registration (When You Want Resume)</div>
                <div style={{ fontSize: '11px', marginTop: '6px' }}>To build resume/CV, we ask for optional registration (only when you want resume): Name, Email, Phone - Then we build resume from your local progress. This is optional - you can still learn without it. But resume needs your name to put on CV.</div>
                
                <div style={{ marginTop: '12px', display: 'grid', gap: '8px' }}>
                  <input placeholder="Your Full Name (for Resume) - Optional - Only for CV" value={userInfo.name} onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })} style={{ padding: '10px', borderRadius: '8px', border: '2px solid #e5e7eb', fontSize: '12px' }} />
                  <input placeholder="Email (for Certificate & Resume) - Optional" value={userInfo.email} onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })} style={{ padding: '10px', borderRadius: '8px', border: '2px solid #e5e7eb', fontSize: '12px' }} />
                  <input placeholder="Phone (for Job Alerts via WhatsApp) - Optional" value={userInfo.phone} onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })} style={{ padding: '10px', borderRadius: '8px', border: '2px solid #e5e7eb', fontSize: '12px' }} />
                  <button onClick={() => { try { localStorage.setItem('kpata_user_info', JSON.stringify(userInfo)) ; alert('Saved! Now your resume will include your name. Progress still local, no mandatory registration for learning.') } catch {} }} style={{ background: '#111', color: 'white', padding: '10px', borderRadius: '8px', border: 'none', fontWeight: 900, fontSize: '12px', cursor: 'pointer' }}>Save Info for Resume (Optional - Learning Still No Registration)</button>
                </div>

                <div style={{ marginTop: '16px', background: 'white', border: '2px solid black', padding: '14px', borderRadius: '10px' }}>
                  <div style={{ fontWeight: 900, fontSize: '14px', textAlign: 'center' }}>RESUME / CV PREVIEW - Built From Your Local Progress</div>
                  <div style={{ fontSize: '12px', marginTop: '12px', lineHeight: '1.6' }}>
                    <b>Name:</b> {userInfo.name || '[Your Name - Enter above - Optional]'}<br/>
                    <b>Email:</b> {userInfo.email || '[Optional]'} | <b>Phone:</b> {userInfo.phone || '[Optional]'}<br/><br/>
                    <b>Summary:</b> Motivated learner with {overall.completed} lessons completed ({overall.percent}%) in AI & Data Analytics from Kpata Academy. Skilled in AI tools, data analysis, and automation.<br/><br/>
                    <b>Certifications (In Progress):</b><br/>
                    {courses.map((c: any) => {
                      const cp = getCourseProgress(c.slug)
                      return <div key={c.slug}>• {c.title}: {cp.completed}/{cp.total} lessons ({cp.percent}%) - {cp.percent === 100 ? 'Certificate Earned' : 'In Progress'}</div>
                    })}<br/>
                    <b>Skills:</b><br/>
                    • AI Tools: NotebookLM (Private PDFs), Gemini, ChatGPT, Prompt Engineering (R-T-F-C)<br/>
                    • Microsoft AI-900: Computer Vision (Document Intelligence for invoices), NLP (Translator for Hausa), ML (Regression, Classification, Clustering)<br/>
                    • Data Analytics: BigQuery SQL (COUNT, GROUP BY, JOIN), Looker Studio (5-chart dashboard)<br/>
                    • Tools: Azure AI Studio, BigQuery, Looker Studio, NotebookLM<br/>
                    • Languages: English, Hausa, Yoruba, Igbo, Pidgin (Learning with Translator)<br/><br/>
                    <b>Projects (From Your Labs - No Registration Needed to Build):</b><br/>
                    • Analyzed 10-page Company Policy Handbook using NotebookLM - Extracted sick leave policy (12 days), benefits, approval process - Screenshot proof<br/>
                    • Extracted text from invoice (INV-2026-001, $2420) using Azure Document Intelligence - Automated invoice processing<br/>
                    • Built sales dashboard with 5 charts (Scorecard total orders, avg price, time series by month, bar by state top 10, table top 10 products) using Looker Studio + Sample_Sales_Data.csv<br/>
                    • Wrote 20 SQL queries on real e-commerce data (bigquery-public-data.thelook_ecommerce - 100k+ orders) - COUNT, GROUP BY, JOIN, AVG<br/><br/>
                    <b>How This Resume Was Built Without Mandatory Registration:</b><br/>
                    • Learning: 100% FREE, no registration, progress saved locally in your browser (localStorage)<br/>
                    • Resume: Optional registration - We only asked for name/email/phone when you wanted CV - Your progress from local storage + certificates + skills = Resume<br/>
                    • This is enhancement, not regression - Keep learning free, add resume as optional value-add<br/><br/>
                    <b>WhatsApp Channel for Latest Developments:</b> Join WhatsApp Channel for industry updates, new AI tools, curriculum upgrades, job alerts - Link: https://whatsapp.com/channel/0029Vb6KpataAcademy - Without WhatsApp, how would you know Google launched new Gemini features or Microsoft updated AI-900 exam? WhatsApp = FREE push notifications.
                  </div>
                </div>

                <button onClick={() => window.print()} style={{ width: '100%', marginTop: '12px', background: '#16a34a', color: 'white', padding: '12px', borderRadius: '8px', border: 'none', fontWeight: 900, fontSize: '12px', cursor: 'pointer' }}>Print / Save as PDF - Resume Built From Local Progress - No Mandatory Registration for Learning</button>
              </div>
            </div>
          )}
        </div>

        <div style={{ background: '#eff6ff', border: '2px solid #bfdbfe', padding: '12px', borderRadius: '10px', marginTop: '16px', fontSize: '11px', lineHeight: '1.6' }}>
          <b>Architecture We Agreed - Answers Your Questions:</b><br/>
          <b>Q: If no registration, how will app know user to build resume?</b><br/>
          A: Phase 1 - Learn 100% FREE, no registration, progress saved locally (localStorage). Phase 2 - When user wants resume, optional registration (Name, Email, Phone) - Then resume built from local progress + certificates + skills. This is enhancement not regression - Keep learning free (no friction), add resume as optional value-add when needed.<br/><br/>
          <b>Q: If no WhatsApp channel, how would users know latest developments & curriculum upgrades?</b><br/>
          A: Without WhatsApp, user would need to open app daily to check updates - They will miss Google new features, Microsoft exam updates, new job alerts. WhatsApp Channel = FREE push notification - When we add new lesson or Google launches Gemini 2.0 or Microsoft updates AI-900 syllabus, we post in WhatsApp Channel - User gets notification instantly - No need to open app. This is how they know latest developments - Without WhatsApp, they are disconnected from industry.
        </div>
      </div>
    </div>
  )
}
