import Layout from '@/components/Layout';

export default async function Home() {
  const res = await fetch('http://localhost:8000/', { cache: 'no-store' });
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
