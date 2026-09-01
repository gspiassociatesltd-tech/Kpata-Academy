'use client';
import Layout from '@/components/Layout';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AcademyPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('${process.env.NEXT_PUBLIC_API_URL}/api/courses')
      .then(res => res.json())
      .then(data => setCourses(data))
      .catch(err => setError('Failed to load courses'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Layout><div>Loading courses...</div></Layout>;
  if (error) return <Layout><div className="text-red-500">{error}</div></Layout>;

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">📚 Academy</h1>
        <p className="text-gray-400 mb-6">30‑day AI Foundation program</p>
        <div className="grid md:grid-cols-2 gap-6">
          {courses.map((course: any) => (
            <div key={course.id} className="bg-gray-800 p-6 rounded-lg">
              <h2 className="text-xl font-bold">{course.title}</h2>
              <p className="text-gray-400">{course.description}</p>
              <p className="text-sm text-yellow-400">Difficulty: {course.difficulty}</p>
              <Link href={`/academy/course/${course.id}`} className="mt-4 inline-block bg-blue-600 px-4 py-2 rounded">
                Start Learning
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
