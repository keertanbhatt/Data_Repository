import type { RecordItem, RepositoryFilters } from '../types'

export function parseLocalDate(isoDate: string): Date {
  const [y, m, d] = isoDate.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export function formatRecordDate(isoDate: string): string {
  const d = parseLocalDate(isoDate)
  const day = String(d.getDate()).padStart(2, '0')
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const year = d.getFullYear()
  return `${day}/${month}/${year}`
}

export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function countWords(text: string): number {
  const trimmed = text.trim()
  if (!trimmed) return 0
  return trimmed.split(/\s+/).length
}

export function sortRecordsByDateDesc(records: RecordItem[]): RecordItem[] {
  return [...records].sort(
    (a, b) => parseLocalDate(b.recordDate).getTime() - parseLocalDate(a.recordDate).getTime(),
  )
}

export function filterRecords(records: RecordItem[], filters: RepositoryFilters): RecordItem[] {
  let result = sortRecordsByDateDesc(records)

  if (filters.scheme) {
    result = result.filter((r) => r.scheme === filters.scheme)
  }
  if (filters.category) {
    result = result.filter((r) => r.category === filters.category)
  }
  if (filters.fromDate) {
    const from = parseLocalDate(filters.fromDate).getTime()
    result = result.filter((r) => parseLocalDate(r.recordDate).getTime() >= from)
  }
  if (filters.toDate) {
    const to = parseLocalDate(filters.toDate).getTime()
    result = result.filter((r) => parseLocalDate(r.recordDate).getTime() <= to)
  }

  return result
}

export function getDashboardStats(records: RecordItem[]) {
  const now = new Date()
  const todayStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
  const month = now.getMonth()
  const year = now.getFullYear()

  const addedToday = records.filter((r) => {
    const d = new Date(r.submittedAt)
    return (
      d.getFullYear() === now.getFullYear() &&
      d.getMonth() === now.getMonth() &&
      d.getDate() === now.getDate()
    )
  }).length

  const addedThisMonth = records.filter((r) => {
    const d = new Date(r.submittedAt)
    return d.getMonth() === month && d.getFullYear() === year
  }).length

  const totalDocuments = records.reduce((sum, r) => sum + r.documents.length, 0)

  return {
    totalRecords: records.length,
    addedThisMonth,
    addedToday,
    totalDocuments,
    todayStr,
  }
}

export function generateRecordId(existing: RecordItem[]): string {
  const year = new Date().getFullYear()
  const nums = existing
    .map((r) => {
      const m = r.id.match(/BOCW-\d+-(\d+)/)
      return m ? parseInt(m[1], 10) : 0
    })
    .filter((n) => !Number.isNaN(n))
  const next = (nums.length ? Math.max(...nums) : 0) + 1
  return `BOCW-${year}-${String(next).padStart(3, '0')}`
}

export function fileTypeLabel(mime: string): string {
  if (mime.includes('pdf')) return 'PDF'
  if (mime.includes('word') || mime.includes('document')) return 'DOC/DOCX'
  if (mime.includes('sheet') || mime.includes('excel')) return 'XLS/XLSX'
  if (mime.includes('image')) return 'Image'
  return 'File'
}
