'use client';
import Layout from '@/components/Layout';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://kpata-academy-backend.onrender.com';

export default function ReferralsPage() {
  const { data: session } = useSession();
  const userId = session?.user?.id || '97b74065-813b-4548-b0b7-f2f1d4512b23';
  const [referralCode, setReferralCode] = useState('');
  const [stats, setStats] = useState({ total_referrals: 0, total_earnings: 0 });
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!userId) return;
    // Generate referral code
    fetch(`${API_BASE}/api/referrals/generate?user_id=${userId}`, { method: 'POST' })
      .then(res => res.json())
      .then(data => {
        if (data.referral_code) setReferralCode(data.referral_code);
      })
      .catch(err => console.error('Failed to generate referral code', err));

    // Get stats
    fetch(`${API_BASE}/api/referrals/stats?user_id=${userId}`)
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error('Failed to get referral stats', err))
      .finally(() => setLoading(false));
  }, [userId]);

  const referralLink = `${window.location.origin}/register?ref=${referralCode}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  if (loading) return <Layout><div>Loading referral dashboard...</div></Layout>;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">🔗 Referral Dashboard</h1>
        <p className="text-gray-400 mb-6">Share your link and earn rewards when friends join and complete the bootcamp.</p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h3 className="text-sm text-gray-400">Total Referrals</h3>
            <p className="text-3xl font-bold">{stats.total_referrals}</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
            <h3 className="text-sm text-gray-400">Total Earnings</h3>
            <p className="text-3xl font-bold text-green-400">${stats.total_earnings.toFixed(2)}</p>
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h2 className="text-xl font-bold mb-2">Your Referral Link</h2>
          <div className="flex flex-wrap gap-2">
            <input
              type="text"
              value={referralLink}
              readOnly
              className="flex-1 bg-gray-700 p-2 rounded text-sm"
            />
            <button
              onClick={copyToClipboard}
              className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 text-sm"
            >
              {copied ? '✅ Copied!' : '📋 Copy'}
            </button>
          </div>
          <p className="text-gray-400 text-sm mt-2">Share this link with friends. When they register and complete the bootcamp, you earn rewards!</p>
        </div>

        <div className="mt-8 bg-gray-800 p-4 rounded">
          <h3 className="font-bold mb-2">📢 Share on social media</h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => window.open(`https://wa.me/?text=Join%20Kpata%20Academy%20for%20free%20AI%20training!%20Use%20my%20referral%20link:%20${encodeURIComponent(referralLink)}`)}
              className="bg-green-600 px-4 py-2 rounded text-sm hover:bg-green-700"
            >
              💬 WhatsApp
            </button>
            <button
              onClick={() => window.open(`https://twitter.com/intent/tweet?text=Join%20Kpata%20Academy%20for%20free%20AI%20training!%20Use%20my%20referral%20link:%20${encodeURIComponent(referralLink)}`)}
              className="bg-sky-500 px-4 py-2 rounded text-sm hover:bg-sky-600"
            >
              🐦 Twitter
            </button>
            <button
              onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralLink)}`)}
              className="bg-blue-700 px-4 py-2 rounded text-sm hover:bg-blue-800"
            >
              🔗 LinkedIn
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
