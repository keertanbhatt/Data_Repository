import { Link } from 'react-router-dom'
import { ArrowRight, Calendar, FileStack, FolderOpen, Plus, TrendingUp } from 'lucide-react'
import { useRecords } from '../context/RecordsContext'
import { useAuth } from '../context/AuthContext'
import { RecordsTable } from '../components/RecordsTable'
import { StatCard } from '../components/StatCard'
import { DocumentPreviewModal } from '../components/DocumentPreviewModal'
import { PageHeader } from '../components/PageHeader'
import { getDashboardStats, sortRecordsByDateDesc } from '../utils/records'
import { useMemo, useState } from 'react'
import type { RecordItem, RepositoryFilters } from '../types'
import { RepositoryFiltersPanel } from '../components/RepositoryFiltersPanel'
import { filterRecords } from '../utils/records'

interface DashboardHomeProps {
  basePath: string
  variant: 'admin' | 'glo' | 'pm'
}

export function DashboardHome({ basePath, variant }: DashboardHomeProps) {
  const { records } = useRecords()
  const { user } = useAuth()
  const stats = getDashboardStats(records)
  const [gloDraft, setGloDraft] = useState<RepositoryFilters>({
    scheme: '',
    category: '',
    fromDate: '',
    toDate: '',
  })
  const [gloApplied, setGloApplied] = useState(gloDraft)
  const filteredForGlo = useMemo(
    () => (variant === 'glo' ? filterRecords(records, gloApplied) : records),
    [records, gloApplied, variant],
  )
  const recent = sortRecordsByDateDesc(filteredForGlo).slice(0, 5)
  const [previewDoc, setPreviewDoc] = useState<{ doc: RecordItem['documents'][0] } | null>(null)

  const handleViewDocument = (record: RecordItem) => {
    const doc = record.documents[0]
    if (doc) setPreviewDoc({ doc })
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader
        title="Dashboard"
        subtitle={`Welcome, ${user?.displayName}. Overview of repository activity and recent submissions (demo data).`}
        action={
          variant === 'pm' ? (
            <Link
              to={`${basePath}/add-record`}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-accent/20 hover:bg-[#e07d1f] transition-colors"
            >
              <Plus className="h-4 w-4" />
              Add New Record
            </Link>
          ) : undefined
        }
      />

      <div className={`grid gap-4 sm:grid-cols-2 ${variant === 'pm' ? 'lg:grid-cols-3' : 'lg:grid-cols-4'}`}>
        <StatCard label="Total Records" value={stats.totalRecords} icon={FolderOpen} accent="navy" />
        <StatCard label="Added This Month" value={stats.addedThisMonth} icon={Calendar} accent="blue" />
        <StatCard label="Added Today" value={stats.addedToday} icon={TrendingUp} accent="orange" />
        {variant !== 'pm' && (
          <StatCard label="Total Documents" value={stats.totalDocuments} icon={FileStack} accent="blue" />
        )}
      </div>

      {variant === 'glo' && (
        <RepositoryFiltersPanel
          draft={gloDraft}
          onDraftChange={setGloDraft}
          onApply={() => setGloApplied(gloDraft)}
          onClear={() => {
            const empty = { scheme: '', category: '', fromDate: '', toDate: '' }
            setGloDraft(empty)
            setGloApplied(empty)
          }}
          matchCount={filteredForGlo.length}
        />
      )}

      <div>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <h2 className="font-serif-display text-xl font-bold text-navy">
            {variant === 'pm' ? 'Recent Repository Records' : 'Recent Records'}
          </h2>
          <Link
            to={`${basePath}/repository`}
            className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:text-[#e07d1f] transition-colors"
          >
            View All Records
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <RecordsTable
          records={recent}
          detailLinkPrefix={`${basePath}/records`}
          onViewDocument={variant !== 'pm' ? handleViewDocument : undefined}
          emptyMessage="No records yet."
        />
      </div>

      {previewDoc && <DocumentPreviewModal document={previewDoc.doc} onClose={() => setPreviewDoc(null)} />}
    </div>
  )
}
