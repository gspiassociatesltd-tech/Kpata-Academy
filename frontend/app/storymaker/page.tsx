'use client';
import Layout from '@/components/Layout';
import Link from 'next/link';

export default function StoryMakerComingSoon() {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto text-center py-20">
        <h1 className="text-5xl font-bold text-yellow-400 mb-4">🎬 StoryMaker</h1>
        <p className="text-2xl text-gray-300 mb-6">Coming Soon!</p>
        <p className="text-gray-400 mb-8">
          Turn your photos into stunning videos with AI. We're preparing a powerful photo‑to‑video tool for you.
        </p>
        <Link href="/" className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700">
          Return Home
        </Link>
      </div>
    </Layout>
  );
}
