
'use client'
export type Progress = { courseSlug: string; lessonId: string; done: boolean; timestamp: number }

export function getProgress(): Progress[] {
  if(typeof window==='undefined') return []
  try{
    const data = localStorage.getItem('kpata_progress')
    return data ? JSON.parse(data) : []
  } catch { return [] }
}

export function saveProgress(courseSlug: string, lessonId: string, done: boolean){
  const all = getProgress()
  const existing = all.findIndex(p=>p.courseSlug===courseSlug && p.lessonId===lessonId)
  if(existing>=0){
    all[existing].done = done
    all[existing].timestamp = Date.now()
  } else {
    all.push({ courseSlug, lessonId, done, timestamp: Date.now() })
  }
  localStorage.setItem('kpata_progress', JSON.stringify(all))
  // TODO: Also save to Supabase when auth ready
  return all
}

export function isLessonDone(courseSlug: string, lessonId: string){
  return getProgress().some(p=>p.courseSlug===courseSlug && p.lessonId===lessonId && p.done)
}

export function getCourseProgress(courseSlug: string, totalLessons: number){
  const done = getProgress().filter(p=>p.courseSlug===courseSlug && p.done).length
  return { done, total: totalLessons, percent: totalLessons ? Math.round(done/totalLessons*100) : 0 }
}

export function getOverallProgress(){
  const all = getProgress()
  return all.filter(p=>p.done).length
}
