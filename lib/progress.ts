
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
