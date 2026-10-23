import { Eye, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { RecordItem } from '../types'
import { formatRecordDate } from '../utils/records'

interface RecordsTableProps {
  records: RecordItem[]
  showDescription?: boolean
  detailLinkPrefix: string
  onViewDocument?: (record: RecordItem) => void
  emptyMessage?: string
}

export function RecordsTable({
  records,
  showDescription = false,
  detailLinkPrefix,
  onViewDocument,
  emptyMessage = 'No records found.',
}: RecordsTableProps) {
  if (records.length === 0) {
    return (
      <div className="rounded-sm border border-[#E8DFD3] bg-white p-12 text-center">
        <FileText className="mx-auto h-10 w-10 text-secondary-text/40" />
        <p className="mt-3 text-secondary-text">{emptyMessage}</p>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-sm border border-[#E8DFD3] bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] text-sm">
          <thead>
            <tr className="border-b border-[#E8DFD3] bg-navy text-left text-xs font-semibold uppercase tracking-wide text-white/90">
              <th className="px-4 py-3.5">Record ID</th>
              <th className="px-4 py-3.5">Title / Scheme</th>
              <th className="px-4 py-3.5">Subtitle / Category</th>
              {showDescription && <th className="px-4 py-3.5 max-w-[200px]">Description</th>}
              <th className="px-4 py-3.5">Record Date</th>
              <th className="px-4 py-3.5">Uploaded By</th>
              <th className="px-4 py-3.5">Documents</th>
              <th className="px-4 py-3.5">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E8DFD3]">
            {records.map((record) => (
              <tr key={record.id} className="hover:bg-[#FAF7F2] transition-colors">
                <td className="px-4 py-3 font-mono text-xs text-navy font-medium">{record.id}</td>
                <td className="px-4 py-3 font-gujarati max-w-[180px] text-primary-text">{record.scheme}</td>
                <td className="px-4 py-3 text-secondary-text">{record.category}</td>
                {showDescription && (
                  <td className="px-4 py-3 text-secondary-text max-w-[220px] truncate" title={record.description}>
                    {record.description}
                  </td>
                )}
                <td className="px-4 py-3 whitespace-nowrap font-medium">{formatRecordDate(record.recordDate)}</td>
                <td className="px-4 py-3 whitespace-nowrap">{record.uploadedBy}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center rounded-full bg-[#F3EDE4] px-2.5 py-0.5 text-xs font-semibold text-navy">
                    {record.documents.length}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex flex-wrap gap-2">
                    <Link
                      to={`${detailLinkPrefix}/${record.id}`}
                      className="inline-flex items-center gap-1 rounded-full border border-navy/20 px-3 py-1.5 text-xs font-semibold text-navy hover:bg-navy hover:text-white transition-colors"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      View Details
                    </Link>
                    {onViewDocument && record.documents.length > 0 && (
                      <button
                        type="button"
                        onClick={() => onViewDocument(record)}
                        className="inline-flex items-center gap-1 rounded-full border border-accent/40 px-3 py-1.5 text-xs font-semibold text-accent hover:bg-accent hover:text-white transition-colors"
                      >
                        <FileText className="h-3.5 w-3.5" />
                        View Document
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
