import { useCallback, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Upload, X, File as FileIcon } from 'lucide-react'
import { SchemeAutocomplete } from '../components/SchemeAutocomplete'
import { useRecords } from '../context/RecordsContext'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import { useLocalFiles } from '../context/LocalFilesContext'
import { CATEGORIES, type Category, type DocumentMeta } from '../types'
import { countWords, fileTypeLabel, formatFileSize } from '../utils/records'
import { parseDdMmYyyyToIso } from '../utils/dateInput'
import { DateInputDdMmYyyy } from '../components/DateInputDdMmYyyy'
import { PageHeader } from '../components/PageHeader'

interface LocalFile extends DocumentMeta {
  file?: File
}

const ACCEPT =
  '.pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,image/jpeg,image/png'

interface AddRecordPageProps {
  basePath: string
}

export function AddRecordPage({ basePath }: AddRecordPageProps) {
  const navigate = useNavigate()
  const { addRecord } = useRecords()
  const { user } = useAuth()
  const { showToast } = useToast()
  const { registerFile } = useLocalFiles()

  const [scheme, setScheme] = useState('')
  const [category, setCategory] = useState<Category | ''>('')
  const [recordDateDisplay, setRecordDateDisplay] = useState('')
  const [description, setDescription] = useState('')
  const [files, setFiles] = useState<LocalFile[]>([])
  const [dragOver, setDragOver] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [saving, setSaving] = useState(false)

  const wordCount = countWords(description)

  const addFiles = useCallback((fileList: FileList | null) => {
    if (!fileList) return
    const next: LocalFile[] = []
    Array.from(fileList).forEach((file) => {
      next.push({
        id: `local-${Date.now()}-${Math.random().toString(36).slice(2)}`,
        name: file.name,
        type: file.type || 'application/octet-stream',
        size: file.size,
        isSample: false,
        file,
      })
    })
    setFiles((prev) => [...prev, ...next])
  }, [])

  const validate = () => {
    const e: Record<string, string> = {}
    if (!scheme) e.scheme = 'Please select a scheme / title.'
    if (!category) e.category = 'Please select a category.'
    const recordDateIso = parseDdMmYyyyToIso(recordDateDisplay)
    if (!recordDateDisplay.trim()) e.recordDate = 'Please enter the record date.'
    else if (!recordDateIso) e.recordDate = 'Enter a valid date in DD/MM/YYYY format.'
    if (!description.trim()) e.description = 'Please enter a description.'
    if (wordCount > 200) e.description = 'Description must not exceed 200 words.'
    if (files.length === 0) e.files = 'Please attach at least one document.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    const recordDateIso = parseDdMmYyyyToIso(recordDateDisplay)
    if (!recordDateIso) return
    setSaving(true)
    setTimeout(() => {
      files.forEach((f) => {
        if (f.file) registerFile(f.id, f.file)
      })
      const newRecord = addRecord({
        scheme,
        category: category as Category,
        recordDate: recordDateIso,
        description: description.trim(),
        uploadedBy: user?.displayName ?? 'PM – Demo',
        documents: files.map(({ id, name, type, size, isSample }) => ({
          id,
          name,
          type,
          size,
          isSample,
        })),
      })
      showToast(`Record ${newRecord.id} saved successfully.`)
      setSaving(false)
      navigate(`${basePath}/records/${newRecord.id}`)
    }, 500)
  }

  return (
    <div className="max-w-3xl animate-fade-in">
      <PageHeader
        title="Add New Record"
        subtitle="Submit a new order or mail entry. Files remain in the browser for this demo only."
      />

      <form
        onSubmit={handleSave}
        className="rounded-sm border border-[#E8DFD3] bg-white p-6 md:p-8 shadow-sm space-y-6 mt-8"
      >
        <SchemeAutocomplete
          value={scheme}
          onChange={setScheme}
          label="Title / Scheme Name"
          error={errors.scheme}
        />

        <div>
          <label htmlFor="category" className="mb-1.5 block text-sm font-medium">
            Subtitle / Category
          </label>
          <select
            id="category"
            className={`w-full rounded-lg border bg-[#FAFAF8] py-2.5 px-3 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15 ${
              errors.category ? 'border-red-400' : 'border-[#E8DFD3]'
            }`}
            value={category}
            onChange={(e) => setCategory(e.target.value as Category | '')}
          >
            <option value="">Select category</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          {errors.category && <p className="mt-1 text-xs text-red-600">{errors.category}</p>}
        </div>

        <div>
          <label htmlFor="recordDate" className="mb-1.5 block text-sm font-medium">
            Record Date
          </label>
          <DateInputDdMmYyyy
            id="recordDate"
            value={recordDateDisplay}
            onChange={(v) => {
              setRecordDateDisplay(v)
              setErrors((prev) => {
                const next = { ...prev }
                delete next.recordDate
                return next
              })
            }}
            error={errors.recordDate}
          />
          <p className="mt-1 text-xs text-secondary-text">
            Date of the order or correspondence (DD/MM/YYYY — not the date entered in the system).
          </p>
        </div>

        <div>
          <label htmlFor="description" className="mb-1.5 block text-sm font-medium">
            Description
          </label>
          <textarea
            id="description"
            rows={5}
            className={`w-full rounded-lg border bg-[#FAFAF8] py-2.5 px-3 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15 resize-y ${
              errors.description ? 'border-red-400' : 'border-[#E8DFD3]'
            }`}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter a brief description (demo content only)…"
          />
          <div className="mt-1 flex justify-between text-xs">
            <span className={wordCount > 200 ? 'text-red-600 font-medium' : 'text-secondary-text'}>
              {wordCount} / 200 words
            </span>
          </div>
          {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description}</p>}
        </div>

        <div>
          <p className="mb-1.5 text-sm font-medium">Document Upload</p>
          <div
            onDragOver={(e) => {
              e.preventDefault()
              setDragOver(true)
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault()
              setDragOver(false)
              addFiles(e.dataTransfer.files)
            }}
            className={`rounded-xl border-2 border-dashed p-8 text-center transition-colors ${
              dragOver ? 'border-accent bg-accent/5' : errors.files ? 'border-red-300 bg-red-50/50' : 'border-[#E8DFD3] bg-[#FAF7F2]'
            }`}
          >
            <Upload className="mx-auto h-10 w-10 text-blue-secondary" />
            <p className="mt-3 text-sm font-medium text-primary-text">Drag and drop files here</p>
            <p className="mt-1 text-xs text-secondary-text">PDF, DOC/DOCX, XLS/XLSX, JPG, PNG</p>
            <label className="mt-4 inline-block cursor-pointer rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white hover:bg-[#e07d1f] transition-colors shadow-sm">
              Browse Files
              <input
                type="file"
                className="sr-only"
                multiple
                accept={ACCEPT}
                onChange={(e) => {
                  addFiles(e.target.files)
                  e.target.value = ''
                }}
              />
            </label>
          </div>
          {errors.files && <p className="mt-1 text-xs text-red-600">{errors.files}</p>}

          {files.length > 0 && (
            <ul className="mt-4 space-y-2">
              {files.map((f) => (
                <li
                  key={f.id}
                  className="flex items-center justify-between gap-3 rounded-lg border border-border px-4 py-3 bg-white"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <FileIcon className="h-5 w-5 text-navy shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{f.name}</p>
                      <p className="text-xs text-secondary-text">
                        {fileTypeLabel(f.type)} · {formatFileSize(f.size)}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFiles((prev) => prev.filter((x) => x.id !== f.id))}
                    className="rounded p-1.5 text-secondary-text hover:bg-red-50 hover:text-red-600"
                    aria-label="Remove file"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex flex-wrap gap-3 pt-2 border-t border-[#E8DFD3]">
          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-accent px-8 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-[#e07d1f] disabled:opacity-60 transition-colors"
          >
            {saving ? 'Saving…' : 'Save Record'}
          </button>
          <Link
            to={basePath}
            className="rounded-full border border-[#E8DFD3] px-8 py-2.5 text-sm font-semibold text-navy hover:bg-[#F3EDE4] transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
