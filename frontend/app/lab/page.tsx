'use client';
import Layout from '@/components/Layout';
import Link from 'next/link';

export default function LabComingSoon() {
  return (
    <Layout>
      <div className="max-w-2xl mx-auto text-center py-20">
        <h1 className="text-5xl font-bold text-yellow-400 mb-4">🧪 Student Lab</h1>
        <p className="text-2xl text-gray-300 mb-6">Coming Soon!</p>
        <p className="text-gray-400 mb-8">
          Project templates, hands-on labs, and real-world AI projects to build your portfolio.
        </p>
        <Link href="/" className="bg-blue-600 px-6 py-3 rounded-lg hover:bg-blue-700">
          Return Home
        </Link>
      </div>
    </Layout>
  );
}
