'use client'
import Layout from '@/components/Layout';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://kpata-academy-backend.onrender.com';

export default async function Home() {
  console.log('API_BASE in page:', API_BASE);
  const res = await fetch(`${API_BASE}/`, { cache: 'no-store' });
  const data = await res.json();

  return (
    <Layout>
      <div className="text-center py-20">
        <h1 className="text-5xl font-bold text-yellow-400">Learn AI. Build AI. Get Discovered.</h1>
        <p className="text-xl mt-4 text-gray-300">Free AI education for everyone in English, Hausa, Yorùbá, Igbo, and Pidgin.</p>
        <div className="mt-8">
          <a href="/register" className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-bold text-lg">Join Free — Founder 100</a>
        </div>
        <div className="mt-4 text-sm text-gray-400">
          Backend says: {data.message}
        </div>
      </div>
    </Layout>
  );
}
