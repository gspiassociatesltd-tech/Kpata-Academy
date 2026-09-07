'use client';
import { useState } from 'react';

export default function EmailWaitlist() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email) {
      setError('Please enter your email.');
      return;
    }
    try {
      // For MVP, we'll store in a Supabase table (we can create 'waitlist' later)
      // For now, just simulate success.
      setSubmitted(true);
    } catch (err) {
      setError('Failed to join waitlist. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div className="mt-8 p-4 bg-gray-800 rounded-lg max-w-md mx-auto">
        <p className="text-green-400">✅ You're on the waitlist! We'll notify you when we launch.</p>
      </div>
    );
  }

  return (
    <div className="mt-8 p-4 bg-gray-800 rounded-lg max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-2">📩 Join the Waitlist</h2>
      <p className="text-gray-400 text-sm mb-4">Be the first to know about new courses, certifications, and features.</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="bg-gray-700 p-2 rounded text-white"
        />
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button type="submit" className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700">
          Join Waitlist
        </button>
      </form>
    </div>
  );
}
