
import Link from 'next/link'
import { COURSES } from '../../lib/courses'
export default function Academy() {
  return (
    <div style={{ padding: '24px', fontFamily: 'system-ui' }}>
      <h1 style={{ fontWeight: 900 }}>Academy - All Courses</h1>
      {COURSES.map(c => <div key={c.slug} style={{ margin: '8px 0' }}><Link href={`/courses/${c.slug}`}>{c.title} - {c.phase}</Link></div>)}
      <div style={{ marginTop: '20px' }}><Link href="/">← Home</Link></div>
    </div>
  )
}
