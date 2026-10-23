import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, FileText } from 'lucide-react'
import { useRecords } from '../context/RecordsContext'
import { Breadcrumb } from '../components/DashboardLayout'
import { DocumentPreviewModal } from '../components/DocumentPreviewModal'
import { formatDateTime, formatRecordDate, formatFileSize, fileTypeLabel } from '../utils/records'
import { useMemo, useState } from 'react'
import type { DocumentMeta } from '../types'
import { useLocalFiles } from '../context/LocalFilesContext'

interface RecordDetailsPageProps {
  basePath: string
}

export function RecordDetailsPage({ basePath }: RecordDetailsPageProps) {
  const { id } = useParams<{ id: string }>()
  const { getRecordById } = useRecords()
  const record = id ? getRecordById(id) : undefined
  const { getFile } = useLocalFiles()
  const [preview, setPreview] = useState<DocumentMeta | null>(null)

  const previewUrl = useMemo(() => {
    if (!preview) return undefined
    const file = getFile(preview.id)
    if (file) return URL.createObjectURL(file)
    return undefined
  }, [preview, getFile])

  if (!record) {
    return (
      <div className="rounded-sm border border-[#E8DFD3] bg-white p-12 text-center">
        <p className="text-secondary-text">Record not found.</p>
        <Link to={`${basePath}/repository`} className="mt-4 inline-block text-sm font-semibold text-accent">
          Back to Repository
        </Link>
      </div>
    )
  }

  return (
    <div className="animate-fade-in max-w-4xl">
      <Breadcrumb
        items={[
          { label: 'Repository', to: `${basePath}/repository` },
          { label: record.id },
        ]}
      />
      <Link
        to={`${basePath}/repository`}
        className="inline-flex items-center gap-2 text-sm font-medium text-secondary-text hover:text-navy mb-6 transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Repository
      </Link>

      <div className="rounded-sm border border-[#E8DFD3] bg-white shadow-sm overflow-hidden">
        <div className="border-b border-[#E8DFD3] bg-navy px-6 py-6 text-white relative">
          <div className="absolute top-0 left-0 right-0 h-1 bg-accent" />
          <p className="font-mono text-sm text-white/80">{record.id}</p>
          <h1 className="font-gujarati mt-2 text-xl md:text-2xl font-bold leading-snug">{record.scheme}</h1>
          <p className="mt-2 inline-block rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">{record.category}</p>
        </div>
        <div className="p-6 md:p-8 space-y-6 bg-[#FAFAF8]">
          <div className="grid gap-4 sm:grid-cols-2 rounded-sm border border-[#E8DFD3] bg-white p-5">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-secondary-text">Record Date</p>
              <p className="mt-1 font-serif-display text-lg font-bold text-navy">{formatRecordDate(record.recordDate)}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-secondary-text">Uploaded By</p>
              <p className="mt-1 font-medium text-primary-text">{record.uploadedBy}</p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-[10px] font-bold uppercase tracking-wider text-secondary-text">Submitted</p>
              <p className="mt-1 font-medium text-primary-text">{formatDateTime(record.submittedAt)}</p>
            </div>
          </div>
          <div className="rounded-sm border border-[#E8DFD3] bg-white p-5">
            <p className="text-[10px] font-bold uppercase tracking-wider text-secondary-text mb-2">Description</p>
            <p className="text-sm leading-relaxed text-primary-text whitespace-pre-wrap">{record.description}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-secondary-text mb-3">Documents</p>
            <ul className="space-y-2">
              {record.documents.map((doc) => (
                <li
                  key={doc.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-sm border border-[#E8DFD3] bg-white px-4 py-3 hover:bg-[#F3EDE4]/50 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="rounded-full bg-navy/10 p-2">
                      <FileText className="h-5 w-5 text-navy shrink-0" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{doc.name}</p>
                      <p className="text-xs text-secondary-text">
                        {fileTypeLabel(doc.type)} · {formatFileSize(doc.size)}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setPreview(doc)}
                    className="rounded-full bg-accent px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#e07d1f] transition-colors"
                  >
                    Open
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {preview && (
        <DocumentPreviewModal
          document={preview}
          previewUrl={previewUrl}
          onClose={() => {
            if (previewUrl) URL.revokeObjectURL(previewUrl)
            setPreview(null)
          }}
        />
      )}
    </div>
  )
}
