'use client';
import Layout from '@/components/Layout';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { getWalletBalance, getEarnings, getMicrotasks, submitMicrotask, getGigs, applyGig } from '@/lib/api';

export default function WalletPage() {
  const { data: session } = useSession();
  const userId = session?.user?.id || '97b74065-813b-4548-b0b7-f2f1d4512b23';

  const [balance, setBalance] = useState({ balance: 0, certification_savings: 0 });
  const [earnings, setEarnings] = useState([]);
  const [microtasks, setMicrotasks] = useState([]);
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [baseUrl, setBaseUrl] = useState('');

  useEffect(() => {
    setBaseUrl(window.location.origin);
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const b = await getWalletBalance(userId);
      setBalance(b);
      const e = await getEarnings(userId);
      setEarnings(e);
      const m = await getMicrotasks();
      setMicrotasks(m);
      const g = await getGigs();
      setGigs(g);
    } catch (err) {
      setMessage('Error loading data');
    }
    setLoading(false);
  };

  const handleSubmitMicrotask = async (id: string) => {
    setLoading(true);
    try {
      await submitMicrotask(userId, id, 1);
      setMessage('Microtask submitted!');
      await loadData();
    } catch (e) {
      setMessage('Submission failed.');
    }
    setLoading(false);
  };

  const handleApplyGig = async (id: string) => {
    const proposal = prompt('Write a short proposal:');
    if (!proposal) return;
    setLoading(true);
    try {
      await applyGig(userId, id, proposal);
      setMessage('Applied to gig!');
      await loadData();
    } catch (e) {
      setMessage('Application failed.');
    }
    setLoading(false);
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">💰 Learn & Earn</h1>
        {message && <div className="bg-gray-800 p-3 rounded mb-4">{message}</div>}

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-800 p-4 rounded">
            <h2 className="text-lg font-semibold">Balance</h2>
            <p className="text-3xl text-green-400">${balance.balance}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded">
            <h2 className="text-lg font-semibold">Certification Savings</h2>
            <p className="text-3xl text-yellow-400">${balance.certification_savings}</p>
          </div>
          <div className="bg-gray-800 p-4 rounded">
            <h2 className="text-lg font-semibold">Total Earnings</h2>
            <p className="text-3xl text-blue-400">
              ${earnings.reduce((sum: number, e: any) => sum + e.amount, 0)}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-3">📋 Microtasks</h2>
            {microtasks.length === 0 ? <p className="text-gray-400">No active microtasks.</p> :
              microtasks.map((t: any) => (
                <div key={t.id} className="bg-gray-800 p-3 rounded mb-2">
                  <p className="font-bold">{t.title}</p>
                  <p className="text-sm text-gray-400">{t.description}</p>
                  <p className="text-sm">💰 ${t.reward_per_unit} per unit</p>
                  <button onClick={() => handleSubmitMicrotask(t.id)} className="mt-2 bg-blue-600 px-3 py-1 rounded text-sm">
                    Complete 1 unit
                  </button>
                </div>
              ))
            }
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-3">💼 Freelance Gigs</h2>
            {gigs.length === 0 ? <p className="text-gray-400">No open gigs.</p> :
              gigs.map((g: any) => (
                <div key={g.id} className="bg-gray-800 p-3 rounded mb-2">
                  <p className="font-bold">{g.title}</p>
                  <p className="text-sm text-gray-400">{g.description}</p>
                  <p className="text-sm">💰 Budget: ${g.budget}</p>
                  <button onClick={() => handleApplyGig(g.id)} className="mt-2 bg-green-600 px-3 py-1 rounded text-sm">
                    Apply
                  </button>
                </div>
              ))
            }
          </div>
        </div>

        {/* Refer & Earn Section */}
        <div className="mt-10 bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-2">🔗 Refer & Earn</h2>
          <p className="text-gray-400 text-sm">Invite friends and earn rewards when they join!</p>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <input
              type="text"
              value={`${baseUrl}/register?ref=${userId}`}
              readOnly
              className="flex-1 bg-gray-700 p-2 rounded text-sm min-w-[200px]"
            />
            <button
              onClick={() => {
                navigator.clipboard.writeText(`${baseUrl}/register?ref=${userId}`);
                alert('Referral link copied!');
              }}
              className="bg-blue-600 px-4 py-2 rounded text-sm hover:bg-blue-700"
            >
              📋 Copy Link
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2">Share this link with your network. You'll earn rewards when they sign up.</p>
        </div>
      </div>
    </Layout>
  );
}
