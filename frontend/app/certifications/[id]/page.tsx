'use client';
import Layout from '@/components/Layout';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/lib/translations';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://kpata-academy-backend.onrender.com';

export default function CertificationDetailPage() {
  const { id } = useParams();
  const { data: session } = useSession();
  const { lang } = useLanguage();
  const userId = session?.user?.id || '97b74065-813b-4548-b0b7-f2f1d4512b23';

  const [cert, setCert] = useState<any>(null);
  const [lessons, setLessons] = useState<any[]>([]);
  const [progress, setProgress] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  // Translation function
  const t = (key: string) => translations[lang]?.[key] || translations['en'][key] || key;

  useEffect(() => {
    if (!id) return;
    fetch(`${API_BASE}/api/certifications/${id}`)
      .then(res => res.json())
      .then(data => setCert(data));
    fetch(`${API_BASE}/api/certifications/${id}/lessons`)
      .then(res => res.json())
      .then(data => setLessons(data));
    fetch(`${API_BASE}/api/progress?user_id=${userId}`)
      .then(res => res.json())
      .then(data => {
        const prog: Record<string, string> = {};
        data.forEach((p: any) => { prog[p.lesson_id] = p.status; });
        setProgress(prog);
      })
      .catch(err => console.error('Failed to load progress', err))
      .finally(() => setLoading(false));
  }, [id, userId]);

  if (loading) return <Layout><div>Loading...</div></Layout>;
  if (!cert) return <Layout><div>Certification not found</div></Layout>;

  const totalLessons = lessons.length;
  const completedLessons = lessons.filter(l => progress[l.id] === 'completed').length;
  const allCompleted = completedLessons === totalLessons;

  const shareText = `I'm learning AI at Kpata Academy! I've completed ${completedLessons}/${totalLessons} lessons on the Foundation Track. Join me at:`;
  const shareUrl = `https://kpata-academy.vercel.app/certifications/${id}`;
  const encodedText = encodeURIComponent(shareText);
  const encodedUrl = encodeURIComponent(shareUrl);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <Link href="/certifications" className="text-blue-400 hover:underline text-sm">
          ← Back to all certifications
        </Link>

        {/* Foundation Track */}
        <div className="mt-6 bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h1 className="text-2xl font-bold">{t('certifications.foundation_title')}</h1>
          <p className="text-gray-400 text-sm">{t('certifications.foundation_desc')}</p>
          <div className="mt-2 flex items-center gap-4">
            <span className="text-sm">{completedLessons}/{totalLessons} {t('certifications.lessons_completed')}</span>
            <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-green-500" style={{ width: `${(completedLessons/totalLessons)*100}%` }} />
            </div>
            {allCompleted && <span className="text-green-400 text-sm font-bold">✅ {t('certifications.unlocked')}</span>}
          </div>
        </div>

        {/* Share Section */}
        <div className="mt-6 bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h2 className="text-lg font-bold">📣 Share Your Progress</h2>
          <p className="text-gray-400 text-sm">Spread the word and inspire others!</p>
          <div className="mt-3 flex flex-wrap gap-3">
            <a href={`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`} target="_blank" rel="noopener noreferrer" className="bg-blue-400 px-4 py-2 rounded text-sm hover:bg-blue-500">🐦 Twitter</a>
            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`} target="_blank" rel="noopener noreferrer" className="bg-blue-700 px-4 py-2 rounded text-sm hover:bg-blue-800">🔗 LinkedIn</a>
            <a href={`https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`} target="_blank" rel="noopener noreferrer" className="bg-green-600 px-4 py-2 rounded text-sm hover:bg-green-700">💬 WhatsApp</a>
            <button onClick={() => { navigator.clipboard.writeText(window.location.href); alert('Link copied!'); }} className="bg-gray-600 px-4 py-2 rounded text-sm hover:bg-gray-700">📋 Copy Link</button>
          </div>
        </div>

        {/* Lesson List */}
        <h2 className="text-xl font-bold mt-6 mb-4">📚 Lessons</h2>
        <div className="space-y-3">
          {lessons.map((lesson) => (
            <div key={lesson.id} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
              <span className="font-medium">{lesson.title}</span>
              <span className={`text-sm ${progress[lesson.id] === 'completed' ? 'text-green-400' : 'text-gray-500'}`}>
                {progress[lesson.id] === 'completed' ? '✅ Done' : '⏳ Not started'}
              </span>
            </div>
          ))}
        </div>

        {/* Certifications Badges */}
        <div className="mt-8 bg-gray-800 p-6 rounded-lg border border-gray-700">
          <h2 className="text-xl font-bold">🏅 Certifications</h2>
          <p className="text-gray-400 text-sm">{t('certifications.foundation_desc')}</p>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {['Google AI Fundamentals', 'AWS AI Practitioner', 'Meta AI Professional', 'IBM AI Foundations'].map((name) => (
              <div key={name} className={`p-4 rounded border ${allCompleted ? 'border-green-500 bg-gray-700' : 'border-gray-600 bg-gray-700 opacity-50'}`}>
                <span className="font-medium">{name}</span>
                <span className="ml-2 text-xs">{allCompleted ? t('certifications.unlocked') : t('certifications.locked')}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
