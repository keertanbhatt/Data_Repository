import { FileSpreadsheet, FileText, Image as ImageIcon, X } from 'lucide-react'
import type { DocumentMeta } from '../types'
import { fileTypeLabel, formatFileSize } from '../utils/records'

interface DocumentPreviewModalProps {
  document: DocumentMeta
  previewUrl?: string
  onClose: () => void
}

function DocIcon({ type }: { type: string }) {
  if (type.includes('image')) return <ImageIcon className="h-12 w-12 text-blue-secondary" />
  if (type.includes('sheet') || type.includes('excel'))
    return <FileSpreadsheet className="h-12 w-12 text-green-700" />
  return <FileText className="h-12 w-12 text-navy" />
}

export function DocumentPreviewModal({ document, previewUrl, onClose }: DocumentPreviewModalProps) {
  const isSample = document.isSample !== false && !previewUrl

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/50 animate-fade-in">
      <div
        className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
        role="dialog"
        aria-modal="true"
        aria-labelledby="doc-preview-title"
      >
        <div className="flex items-center justify-between border-b border-[#E8DFD3] bg-navy text-white px-5 py-4">
          <div>
            <h2 id="doc-preview-title" className="font-serif-display text-lg font-bold truncate pr-4">
              {document.name}
            </h2>
            <p className="text-sm text-white/75">
              {fileTypeLabel(document.type)} · {formatFileSize(document.size)}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-white/10 text-white/80"
            aria-label="Close preview"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="flex-1 overflow-auto p-5">
          {previewUrl && document.type.includes('image') ? (
            <img src={previewUrl} alt={document.name} className="max-w-full rounded-lg border border-border" />
          ) : previewUrl && document.type.includes('pdf') ? (
            <iframe title={document.name} src={previewUrl} className="w-full h-[60vh] rounded-lg border border-border" />
          ) : isSample ? (
            <div className="rounded-xl border-2 border-dashed border-border bg-page p-8 text-center">
              <DocIcon type={document.type} />
              <p className="mt-4 text-sm font-medium text-primary-text">Simulated document preview</p>
              <p className="mt-2 text-sm text-secondary-text max-w-md mx-auto">
                This is demonstration content only. It does not represent an authentic government order or official
                correspondence from Gujarat BOCW Board.
              </p>
              <div className="mt-6 mx-auto max-w-sm rounded-lg bg-white border border-border p-4 text-left text-xs text-secondary-text space-y-2">
                <p className="font-semibold text-navy uppercase tracking-wide">Sample preview excerpt</p>
                <p>Reference: {document.name}</p>
                <p>Status: Demo / UI prototype</p>
                <p>
                  Lorem ipsum placeholder text simulating scanned administrative content for presenter walkthroughs.
                </p>
              </div>
            </div>
          ) : previewUrl ? (
            <div className="text-center py-8">
              <DocIcon type={document.type} />
              <p className="mt-4 text-sm text-secondary-text">
                In-browser preview is not available for this file type.
              </p>
              <a
                href={previewUrl}
                download={document.name}
                className="mt-4 inline-block rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent/90"
              >
                Download file
              </a>
            </div>
          ) : (
            <p className="text-sm text-secondary-text">Preview not available for this file type in the browser.</p>
          )}
        </div>
        <div className="border-t border-border px-5 py-3 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white hover:bg-[#e07d1f] transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
