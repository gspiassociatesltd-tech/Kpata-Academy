'use client';
import Layout from '@/components/Layout';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://kpata-academy-backend.onrender.com';

export default function CertificationsPage() {
  const [certifications, setCertifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/api/certifications`)
      .then(res => res.json())
      .then(data => setCertifications(data))
      .catch(err => console.error('Failed to load certifications', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Layout><div>Loading certifications...</div></Layout>;

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">🎓 Certification Pathways</h1>
        <p className="text-gray-400 mb-6">Earn globally recognised certifications — free of charge.</p>

        <div className="grid md:grid-cols-2 gap-6">
          {certifications.map((cert) => (
            <div key={cert.id} className="bg-gray-800 p-6 rounded-lg border border-gray-700">
              <div className="flex items-start gap-4">
                <img src={cert.badge_url || 'https://via.placeholder.com/80'} alt={cert.name} className="w-16 h-16 rounded-full" />
                <div>
                  <h3 className="text-xl font-bold">{cert.name}</h3>
                  <p className="text-sm text-blue-400">{cert.provider}</p>
                  <p className="text-gray-400 mt-1">{cert.description}</p>
                  <div className="mt-3 flex items-center gap-3">
                    <span className="text-sm text-gray-500">📚 0 lessons completed</span>
                  </div>
                  <Link href={`/certifications/${cert.slug}`} className="mt-3 inline-block bg-blue-600 px-4 py-1 rounded text-sm hover:bg-blue-700">
                    View Pathway
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-gray-800 p-4 rounded">
          <h2 className="text-xl font-bold">📌 Why get certified?</h2>
          <p className="text-gray-400 text-sm">Certifications from Google, AWS, Meta, and IBM are recognised by employers worldwide. Kpata Academy guides you through the material so you can pass the exams — all at zero cost.</p>
        </div>
      </div>
    </Layout>
  );
}
