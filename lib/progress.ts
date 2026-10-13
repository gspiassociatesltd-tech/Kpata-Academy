
export function saveProgress(slug: string, lessonId: string, done: boolean) {
  try {
    const key = `progress_${slug}`
    const existing = localStorage.getItem(key)
    let data: any = existing ? JSON.parse(existing) : {}
    data[lessonId] = done
    localStorage.setItem(key, JSON.stringify(data))
    const allKey = `kpata_progress`
    const all = localStorage.getItem(allKey)
    let allData: any = all ? JSON.parse(all) : {}
    if (!allData[slug]) allData[slug] = {}
    allData[slug][lessonId] = done
    localStorage.setItem(allKey, JSON.stringify(allData))
    // Also save for resume builder
    localStorage.setItem('kpata_last_active', new Date().toISOString())
  } catch {}
}

export function isLessonDone(slug: string, lessonId: string) {
  try {
    const key = `progress_${slug}`
    const existing = localStorage.getItem(key)
    if (!existing) return false
    const data = JSON.parse(existing)
    return !!data[lessonId]
  } catch { return false }
}

export function getProgress() {
  try {
    const all = localStorage.getItem('kpata_progress')
    if (!all) return {}
    return JSON.parse(all)
  } catch { return {} }
}

export function getCourseProgress(slug: string) {
  try {
    const progress = getProgress()
    if (!progress[slug]) return { completed: 0, total: 0, percent: 0, lessons: {} }
    const lessons = progress[slug]
    const completed = Object.values(lessons).filter(Boolean).length
    // Get total from courses - we estimate 5 per course
    const total = 5
    const percent = Math.round((completed / total) * 100)
    return { completed, total, percent, lessons }
  } catch { return { completed: 0, total: 0, percent: 0, lessons: {} } }
}

export function getAllProgress() {
  return getProgress()
}

export function getOverallProgress() {
  try {
    const progress = getProgress()
    let totalCompleted = 0
    let totalLessons = 15 // 3 courses x 5 lessons
    Object.values(progress).forEach((course: any) => {
      totalCompleted += Object.values(course).filter(Boolean).length
    })
    const percent = Math.round((totalCompleted / totalLessons) * 100)
    return { completed: totalCompleted, total: totalLessons, percent }
  } catch { return { completed: 0, total: 15, percent: 0 } }
}

export function clearProgress() {
  try {
    localStorage.removeItem('kpata_progress')
    localStorage.removeItem('progress_google-ai-essentials')
    localStorage.removeItem('progress_microsoft-ai-900')
    localStorage.removeItem('progress_google-data-analytics')
  } catch {}
}
