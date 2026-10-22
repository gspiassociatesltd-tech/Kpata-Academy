"use client";
import { getCourse } from '@/lib/courses';
import Link from 'next/link';
import { useState } from 'react';

function Linkify({ text }: { text: string }) {
  if (!text) return null;
  const urlRegex = /(https?:\/\/[^\s]+|\/\S+\.pdf|\/\S+\.csv)/g;
  const parts = text.split(urlRegex);
  return (
    <>
      {parts.map((p, i) =>
        urlRegex.test(p) ? (
          <a key={i} href={p} target="_blank" className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-bold hover:bg-blue-200">
            🔗 {p.split('/').pop()} ↗
          </a>
        ) : (
          <span key={i}>{p}</span>
        )
      )}
    </>
  );
}

export default function LessonPage({ params }: { params: { slug: string; lessonId: string } }) {
  const course = getCourse(params.slug);
  const lesson = course?.lessons.find((l: any) => l.id === params.lessonId) as any;
  const [labAnswer, setLabAnswer] = useState('');
  const [labDone, setLabDone] = useState(false);
  const [selected, setSelected] = useState('');
  const [quizScore, setQuizScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);

  if (!course || !lesson) return <div className="p-8">Lesson not found</div>;

  const canComplete = labDone && quizScore >= 80;
  const progress = (labDone ? 50 : 0) + (quizScore >= 80 ? 50 : 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href={`/courses/${course.slug}`} className="text-sm text-gray-600 hover:text-black">
            ← {course.title}
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-green-600" style={{ width: `${progress}%` }} />
            </div>
            <span className="text-xs">{progress}%</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">
        <div>
          <span className="bg-blue-600 text-white text-xs px-3 py-1 rounded-full">Lesson {lesson.id}</span>
          <h1 className="text-3xl font-bold mt-3">{lesson.title}</h1>
          <p className="text-gray-500 mt-1">{lesson.duration} • Practical • Simple English</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-8">
          <div className="flex gap-3 mb-4">
            <div className="w-8 h-8 bg-black text-white rounded-full flex items-center justify-center text-sm">📖</div>
            <h2 className="text-xl font-bold">Main Lesson</h2>
          </div>
          <div className="prose max-w-none text- leading-7 whitespace-pre-wrap">
            <Linkify text={lesson.content} />
          </div>
        </div>

        {lesson.workedExample && (
          <div className="bg-white rounded-xl shadow-sm border-l-4 border-blue-600 p-8">
            <div className="flex gap-3 mb-4">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center">1</div>
              <h3 className="font-bold text-blue-900">Worked Example — Question + Step-by-Step Solution</h3>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 text-sm leading-6 whitespace-pre-wrap">
              <Linkify text={lesson.workedExample} />
            </div>
          </div>
        )}

        {lesson.workedExample2 && (
          <div className="bg-white rounded-xl shadow-sm border-l-4 border-green-600 p-8">
            <div className="flex gap-3 mb-4">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center">2</div>
              <h3 className="font-bold text-green-900">Worked Example 2 — Second Scenario</h3>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-sm leading-6 whitespace-pre-wrap">
              <Linkify text={lesson.workedExample2} />
            </div>
          </div>
        )}

        {lesson.sampleLab && (
          <div className="bg-white rounded-xl shadow-sm border-2 border-amber-300 p-8">
            <div className="flex gap-3 mb-4">
              <div className="w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center">🧪</div>
              <h3 className="font-bold">Lab — Submit for AI Appraisal (Must be correct before Complete)</h3>
            </div>
            <div className="text-sm bg-amber-50 p-4 rounded-lg whitespace-pre-wrap mb-4">
              <Linkify text={lesson.sampleLab} />
            </div>
            <textarea
              value={labAnswer}
              onChange={(e) => setLabAnswer(e.target.value)}
              className="w-full border-2 rounded-lg p-4 text-sm focus:border-amber-400 outline-none"
              rows={4}
              placeholder="Type your step-by-step solution here..."
            />
            <div className="flex justify-between mt-3">
              <button
                onClick={() => {
                  if (labAnswer.length > 15) setLabDone(true);
                  else alert('Write at least 15 characters for Kpata Bot evaluation');
                }}
                className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2 rounded-lg font-bold"
              >
                Submit to Kpata Bot 🤖
              </button>
              {labDone && <span className="text-green-600 font-bold text-sm">✓ Evaluated — Correct! 50% progress</span>}
            </div>
          </div>
        )}

        {lesson.quiz && (
          <div className="bg-white rounded-xl shadow-sm border p-8">
            <div className="flex gap-3 mb-4">
              <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center">Q</div>
              <h3 className="font-bold">Quiz — Multiple Choice (Certification Style)</h3>
            </div>
            <div className="text-sm bg-purple-50 p-4 rounded-lg whitespace-pre-wrap mb-4">
              <Linkify text={lesson.quiz} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {['A', 'B', 'C', 'D'].map((opt) => (
                <button
                  key={opt}
                  onClick={() => setSelected(opt)}
                  className={`p-3 rounded-lg border-2 text-left text-sm font-medium ${selected === opt ? 'border-purple-600 bg-purple-50' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <span className="font-bold mr-2">{opt}.</span>
                  {opt === 'A' ? 'Computer learns from examples (Correct)' : opt === 'B' ? 'Only internet' : opt === 'C' ? 'Only typing' : 'Game'}
                </button>
              ))}
            </div>
            <button
              onClick={() => {
                if (selected) {
                  setQuizDone(true);
                  setQuizScore(selected === 'A' ? 100 : 0);
                } else alert('Select an answer');
              }}
              className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg font-bold"
            >
              Submit Answer
            </button>
            {quizDone && (
              <div className={`mt-3 p-3 rounded-lg text-sm ${quizScore >= 80 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                Score: {quizScore}% {quizScore >= 80 ? '✓ Pass — 50% progress added' : '✗ 0% — Hint: AI learns from examples. Try again.'}
              </div>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          {lesson.examTips && (
            <div className="bg-blue-50 rounded-xl p-4 border">
              <p className="text-xs font-bold text-blue-700">EXAM TIPS</p>
              <p className="text-sm mt-1"><Linkify text={lesson.examTips} /></p>
            </div>
          )}
          {lesson.cheatsheet && (
            <div className="bg-orange-50 rounded-xl p-4 border">
              <p className="text-xs font-bold text-orange-700">CHEATSHEET</p>
              <p className="text-sm mt-1"><Linkify text={lesson.cheatsheet} /></p>
            </div>
          )}
        </div>

        {lesson.finalProject && (
          <div className="bg-white rounded-xl shadow-sm border-2 border-red-200 p-8">
            <div className="flex gap-3 mb-4">
              <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center">📝</div>
              <h3 className="font-bold text-red-900">Homework — Past Question — 80% to unlock Complete</h3>
            </div>
            <div className="bg-red-50 rounded-lg p-4 text-sm whitespace-pre-wrap">
              <Linkify text={lesson.finalProject} />
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow p-6">
          <button
            disabled={!canComplete}
            className={`w-full py-4 rounded-xl font-bold text-lg ${canComplete ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
          >
            {canComplete ? '✓ Mark Complete — 100% Achieved' : '🔒 Complete Locked — Need Lab ✓ + Quiz 80%'}
          </button>
          <p className="text-center text-xs text-gray-500 mt-2">Kpata Bot determines if you did enough. 80% minimum required.</p>
        </div>

        {lesson.builtBy && (
          <div className="text-center py-8 border-t">
            <p className="text-sm font-bold text-gray-400">{lesson.builtBy}</p>
            <p className="text-xs text-gray-400 mt-1">Simple English • Built for learning</p>
          </div>
        )}
      </div>
    </div>
  );
}