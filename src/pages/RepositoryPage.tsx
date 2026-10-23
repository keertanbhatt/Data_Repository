import { useEffect, useMemo, useState } from 'react'
import { useRecords } from '../context/RecordsContext'
import { RepositoryFiltersPanel } from '../components/RepositoryFiltersPanel'
import { RecordsTable } from '../components/RecordsTable'
import { DocumentPreviewModal } from '../components/DocumentPreviewModal'
import { PageHeader } from '../components/PageHeader'
import { filterRecords } from '../utils/records'
import type { RecordItem, RepositoryFilters } from '../types'

const PAGE_SIZE = 8

interface RepositoryPageProps {
  basePath: string
  showDocumentAction?: boolean
}

export function RepositoryPage({ basePath, showDocumentAction = true }: RepositoryPageProps) {
  const { records, repositoryFilters, setRepositoryFilters, clearRepositoryFilters } = useRecords()
  const [draft, setDraft] = useState<RepositoryFilters>(repositoryFilters)
  const [applied, setApplied] = useState<RepositoryFilters>(repositoryFilters)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [previewDoc, setPreviewDoc] = useState<RecordItem['documents'][0] | null>(null)

  useEffect(() => {
    setDraft(repositoryFilters)
    setApplied(repositoryFilters)
  }, [repositoryFilters])

  const filtered = useMemo(() => filterRecords(records, applied), [records, applied])

  const visible = filtered.slice(0, visibleCount)

  const handleApply = () => {
    setApplied(draft)
    setRepositoryFilters(draft)
    setVisibleCount(PAGE_SIZE)
  }

  const handleClear = () => {
    clearRepositoryFilters()
    const empty = { scheme: '', category: '', fromDate: '', toDate: '' }
    setDraft(empty)
    setApplied(empty)
    setVisibleCount(PAGE_SIZE)
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader
        title="Orders & Mail Repository"
        subtitle="Search and filter official orders, bills, letters, and meeting minutes. All data shown is for UI demonstration purposes."
      />
      <p className="-mt-4 text-sm">
        <span className="font-serif-display text-lg font-bold text-navy">{records.length}</span>{' '}
        <span className="text-secondary-text">total records in repository</span>
      </p>

      <RepositoryFiltersPanel
        draft={draft}
        onDraftChange={setDraft}
        onApply={handleApply}
        onClear={handleClear}
        matchCount={filtered.length}
      />

      <RecordsTable
        records={visible}
        showDescription
        detailLinkPrefix={`${basePath}/records`}
        onViewDocument={
          showDocumentAction
            ? (record) => {
                const doc = record.documents[0]
                if (doc) setPreviewDoc(doc)
              }
            : undefined
        }
        emptyMessage="No records match your filters. Try adjusting scheme, category, or date range."
      />

      {visibleCount < filtered.length && (
        <div className="text-center">
          <button
            type="button"
            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
            className="rounded-full border-2 border-navy px-8 py-2.5 text-sm font-semibold text-navy hover:bg-navy hover:text-white transition-colors"
          >
            Load More ({filtered.length - visibleCount} remaining)
          </button>
        </div>
      )}

      {previewDoc && <DocumentPreviewModal document={previewDoc} onClose={() => setPreviewDoc(null)} />}
    </div>
  )
}
