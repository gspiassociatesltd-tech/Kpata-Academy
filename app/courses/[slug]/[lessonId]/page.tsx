import { courses } from '../../../lib/courses';
import Link from 'next/link';
export default function LessonPage({ params }: any) {
  const slug = params.slug; const lessonId = params.lessonId || "1";
  const course = courses.find((c:any)=>c.slug===slug);
  if(!course) return <div style={{padding:20}}>Course not found - <Link href="/courses">Back</Link></div>;
  const index = parseInt(lessonId)-1; const lesson = course.lessons[index];
  if(!lesson) return <div style={{padding:20}}>Lesson not found</div>;
  const nextLesson = course.lessons[index+1];
  const prevLesson = course.lessons[index-1];
  return (
    <div style={{maxWidth:'850px',margin:'0 auto',padding:'16px',fontFamily:'Arial'}}>
      <Link href={`/courses/${slug}`} style={{fontSize:'14px'}}>← Back to {course.title}</Link>
      <h1 style={{fontSize:'22px',fontWeight:'bold',marginTop:'12px'}}>{index+1}. {lesson.title}</h1>
      <div style={{background:'white',border:'1px solid #ddd',padding:'20px',margin:'16px 0',whiteSpace:'pre-line',lineHeight:'1.8',fontSize:'15px'}}>{lesson.content}</div>
      {lesson.examTips && <div style={{background:'#eff6ff',border:'1px solid #bfdbfe',padding:'12px',borderRadius:'8px',marginBottom:'12px'}}><b>Exam Tips:</b> {lesson.examTips}</div>}
      {lesson.cheatsheet && <div style={{background:'#fefce8',border:'1px solid #fde68a',padding:'12px',borderRadius:'8px',marginBottom:'12px'}}><b>Cheatsheet:</b> {lesson.cheatsheet}</div>}
      <div style={{background:'#faf5ff',border:'1px solid #e9d5ff',padding:'12px',borderRadius:'8px',marginBottom:'12px'}}><b>Lab - Practical:</b> Follow steps in content above. Tools: notebooklm.google.com, gemini.google.com - All FREE - No registration needed.</div>
      <div style={{background:'#f0fdf4',border:'2px solid #86efac',padding:'12px',borderRadius:'8px',marginBottom:'20px'}}><b>Quiz:</b> Q1 What is main idea? Q2 How pass exam? Q3 Can do without computer? YES saves 1GB!</div>
      <div style={{display:'flex',justifyContent:'space-between',gap:'12px'}}>{prevLesson?<Link href={`/courses/${slug}/${index}`} style={{background:'#e5e7eb',padding:'10px 16px',borderRadius:'6px',textDecoration:'none',color:'black'}}>Prev</Link>:<div/>}<button style={{background:'black',color:'white',padding:'10px 20px',borderRadius:'6px',border:'none'}}>Mark Done</button>{nextLesson?<Link href={`/courses/${slug}/${index+2}`} style={{background:'black',color:'white',padding:'12px 20px',borderRadius:'8px',textDecoration:'none'}}>Next Lesson {index+2}</Link>:<Link href={`/final-exam/${slug}`} style={{background:'green',color:'white',padding:'12px 20px',borderRadius:'8px',textDecoration:'none'}}>Final Exam →</Link>}</div>
      <div style={{marginTop:'20px',background:'#f9fafb',padding:'12px',borderRadius:'8px',textAlign:'center',fontSize:'13px'}}><b>Finish? No registration needed</b><br/>Written lesson enough - Join WhatsApp optional</div>
    </div>
  );
}