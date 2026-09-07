'use client';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const [lang, setLang] = useState('en');

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <header className="bg-gray-800 p-4 flex justify-between items-center flex-wrap gap-2">
        <div className="flex items-center gap-4 flex-wrap">
          <Link href="/" className="text-2xl font-bold text-yellow-400">
            🧠 Kpata Academy
          </Link>
          <nav className="flex gap-3 text-sm flex-wrap">
            <Link href="/academy">Academy</Link>
            <Link href="/studio">AI Studio</Link>
            <Link href="/storymaker">StoryMaker</Link>
            <Link href="/lab">Lab</Link>
            <Link href="/portfolio">Portfolio</Link>
            <Link href="/competitions">🏆 Competitions</Link>
            <Link href="/improvements">🔄 Improvements</Link>
            <Link href="/wallet">💰 Wallet</Link>
            <Link href="/referrals">🔗 Referrals</Link>
            <Link href="/talent">👩‍💻 Talent</Link>
            <Link href="/certifications">🎓 Certifications</Link>
            <Link href="/creators">🎨 Creators</Link>
            <Link href="/admin">🛠️ Admin</Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="bg-gray-700 p-1 rounded"
          >
            <option value="en">English</option>
            <option value="ha">Hausa</option>
            <option value="yo">Yorùbá</option>
            <option value="ig">Igbo</option>
            <option value="pcm">Pidgin</option>
          </select>
          {session ? (
            <button
              onClick={() => signOut()}
              className="bg-red-600 px-3 py-1 rounded"
            >
              Sign Out
            </button>
          ) : (
            <Link href="/login" className="bg-blue-600 px-3 py-1 rounded">
              Login
            </Link>
          )}
        </div>
      </header>

      <main className="flex-1 p-4">{children}</main>

      <footer className="bg-gray-800 p-4 mt-10 text-center text-sm text-gray-400 border-t border-gray-700">
        <p className="mb-1">📢 Join our WhatsApp Community to get updates and share your achievements!</p>
        <a
          href="https://chat.whatsapp.com/YOUR_INVITE_LINK"
          target="_blank"
          rel="noopener noreferrer"
          className="text-green-400 hover:underline"
        >
          🔗 Join WhatsApp Community
        </a>
        <span className="mx-2">|</span>
        <a href="/privacy" className="text-gray-500 hover:underline">
          Privacy Policy
        </a>
      </footer>
    </div>
  );
}
