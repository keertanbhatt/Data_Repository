import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { initialMockRecords } from '../data/mockRecords'
import { generateRecordId } from '../utils/records'
import type { RecordItem, RepositoryFilters } from '../types'

const defaultFilters: RepositoryFilters = {
  scheme: '',
  category: '',
  fromDate: '',
  toDate: '',
}

interface RecordsContextValue {
  records: RecordItem[]
  repositoryFilters: RepositoryFilters
  setRepositoryFilters: (filters: RepositoryFilters) => void
  clearRepositoryFilters: () => void
  addRecord: (record: Omit<RecordItem, 'id' | 'submittedAt'>) => RecordItem
  getRecordById: (id: string) => RecordItem | undefined
}

const RecordsContext = createContext<RecordsContextValue | null>(null)

export function RecordsProvider({ children }: { children: ReactNode }) {
  const [records, setRecords] = useState<RecordItem[]>(initialMockRecords)
  const [repositoryFilters, setRepositoryFiltersState] = useState<RepositoryFilters>(defaultFilters)

  const setRepositoryFilters = useCallback((filters: RepositoryFilters) => {
    setRepositoryFiltersState(filters)
  }, [])

  const clearRepositoryFilters = useCallback(() => {
    setRepositoryFiltersState(defaultFilters)
  }, [])

  const addRecord = useCallback(
    (partial: Omit<RecordItem, 'id' | 'submittedAt'>): RecordItem => {
      const newRecord: RecordItem = {
        ...partial,
        id: generateRecordId(records),
        submittedAt: new Date().toISOString(),
      }
      setRecords((prev) => [newRecord, ...prev])
      return newRecord
    },
    [records],
  )

  const getRecordById = useCallback(
    (id: string) => records.find((r) => r.id === id),
    [records],
  )

  const value = useMemo(
    () => ({
      records,
      repositoryFilters,
      setRepositoryFilters,
      clearRepositoryFilters,
      addRecord,
      getRecordById,
    }),
    [records, repositoryFilters, setRepositoryFilters, clearRepositoryFilters, addRecord, getRecordById],
  )

  return <RecordsContext.Provider value={value}>{children}</RecordsContext.Provider>
}

export function useRecords() {
  const ctx = useContext(RecordsContext)
  if (!ctx) throw new Error('useRecords must be used within RecordsProvider')
  return ctx
}
