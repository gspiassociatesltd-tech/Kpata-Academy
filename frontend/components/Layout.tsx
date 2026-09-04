'use client'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()
  const [lang, setLang] = useState('en')

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="bg-gray-800 p-4 flex justify-between items-center flex-wrap gap-2">
        <div className="flex items-center gap-4 flex-wrap">
          <Link href="/" className="text-2xl font-bold text-yellow-400">🧠 Kpata Academy</Link>
          <nav className="flex gap-3 text-sm flex-wrap">
            <Link href="/academy">Academy</Link>
            <Link href="/studio">AI Studio</Link>
            <Link href="/storymaker">StoryMaker</Link>
            <Link href="/lab">Lab</Link>
            <Link href="/portfolio">Portfolio</Link>
            <Link href="/competitions">🏆 Competitions</Link>
            <Link href="/improvements">🔄 Improvements</Link>
            <Link href="/wallet">💰 Wallet</Link>
            <Link href="/admin">🛠️ Admin</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <select value={lang} onChange={(e) => setLang(e.target.value)} className="bg-gray-700 p-1 rounded">
            <option value="en">English</option><option value="ha">Hausa</option>
            <option value="yo">Yorùbá</option><option value="ig">Igbo</option><option value="pcm">Pidgin</option>
          </select>
          {session ? (
            <button onClick={() => signOut({ callbackUrl: '/' })} className="bg-red-600 px-3 py-1 rounded">Sign Out</button>
          ) : (
            <Link href="/login" className="bg-blue-600 px-3 py-1 rounded">Login</Link>
          )}
        </div>
      </header>
      <main className="p-4">{children}</main>
    </div>
  )
}
