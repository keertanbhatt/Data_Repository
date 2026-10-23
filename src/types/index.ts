export type UserRole = 'admin' | 'glo' | 'pm'

export interface User {
  username: string
  displayName: string
  role: UserRole
}

export const CATEGORIES = [
  'Food Bills',
  'Stall Bills',
  'Government Orders',
  'Official Letters & Mails',
  'Meeting Minutes',
  'Manpower Bills',
  'Kacheri Kharch Bills',
  'Routine Information',
  'Government Resolution',
  'Government Notification',
  'Court Cases (Affidavit)',
] as const

export type Category = (typeof CATEGORIES)[number]

export interface DocumentMeta {
  id: string
  name: string
  type: string
  size: number
  isSample?: boolean
}

export interface RecordItem {
  id: string
  scheme: string
  category: Category
  recordDate: string
  description: string
  uploadedBy: string
  submittedAt: string
  documents: DocumentMeta[]
}

export interface RepositoryFilters {
  scheme: string
  category: string
  fromDate: string
  toDate: string
}

export const DEMO_CREDENTIALS: Record<
  UserRole,
  { username: string; password: string; displayName: string }
> = {
  admin: { username: 'admin', password: 'Admin@123', displayName: 'Admin User' },
  glo: { username: 'glo', password: 'Glo@123', displayName: 'GLO Officer' },
  pm: { username: 'pm', password: 'Pm@123', displayName: 'PM – Ahmedabad' },
}
