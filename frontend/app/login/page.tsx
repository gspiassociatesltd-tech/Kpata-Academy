'use client';
import Layout from '@/components/Layout';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    console.log('signIn result:', result);
    if (result?.error) {
      setError(result.error);
    } else {
      router.push('/');
    }
    setLoading(false);
  };

  return (
    <Layout>
      <div className="max-w-md mx-auto mt-20">
        <h1 className="text-3xl font-bold mb-6">Login</h1>
        {error && <div className="bg-red-800 p-3 rounded mb-4">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-800 p-2 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-800 p-2 rounded"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 py-2 rounded font-bold disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-400">
          Don't have an account? <Link href="/register" className="text-blue-400">Register</Link>
        </p>
      </div>
    </Layout>
  );
}
