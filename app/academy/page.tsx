import Link from 'next/link'
import { COURSES } from '../../lib/courses'
export default function Academy(){return(<div style={{padding:'24px'}}>{COURSES.map(c=><div key={c.slug}><Link href={`/courses/${c.slug}`}>{c.title}</Link></div>)}<Link href='/'>Home</Link></div>)}
