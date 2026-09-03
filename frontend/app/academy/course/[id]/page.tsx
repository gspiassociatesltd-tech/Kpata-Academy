'use client';
import Layout from '@/components/Layout';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://kpata-academy-backend.onrender.com';

export default function CoursePage() {
  const { id } = useParams();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    fetch(`${API_BASE}/api/courses/${id}/lessons`)
      .then(res => res.json())
      .then(data => setLessons(data))
      .catch(err => setError('Failed to load lessons'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Layout><div>Loading lessons...</div></Layout>;
  if (error) return <Layout><div className="text-red-500">{error}</div></Layout>;

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">📖 Course Lessons</h1>
        <div className="space-y-4">
          {lessons.map((lesson: any) => (
            <div key={lesson.id} className="bg-gray-800 p-4 rounded-lg flex justify-between items-center">
              <div>
                <h3 className="font-bold">{lesson.title}</h3>
                <p className="text-sm text-gray-400">Lesson {lesson.order_index}</p>
              </div>
              <Link href={`/academy/lesson/${lesson.id}`} className="bg-green-600 px-4 py-2 rounded text-sm">
                Start Lesson
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
