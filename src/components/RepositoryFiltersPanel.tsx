import { Filter, RotateCcw } from 'lucide-react'
import { CATEGORIES } from '../types'
import type { RepositoryFilters } from '../types'
import { SchemeAutocomplete } from './SchemeAutocomplete'

interface RepositoryFiltersPanelProps {
  draft: RepositoryFilters
  onDraftChange: (draft: RepositoryFilters) => void
  onApply: () => void
  onClear: () => void
  matchCount: number
}

export function RepositoryFiltersPanel({
  draft,
  onDraftChange,
  onApply,
  onClear,
  matchCount,
}: RepositoryFiltersPanelProps) {
  return (
    <div className="overflow-hidden rounded-sm border border-[#E8DFD3] bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2 bg-navy px-4 md:px-5 py-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <Filter className="h-4 w-4 text-accent" />
          Filter records
        </div>
        <p className="text-sm text-white/80">
          <span className="font-bold text-white">{matchCount}</span> matching record
          {matchCount !== 1 ? 's' : ''}
        </p>
      </div>
      <div className="p-4 md:p-5">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <SchemeAutocomplete
            label="Title / Scheme"
            value={draft.scheme}
            onChange={(scheme) => onDraftChange({ ...draft, scheme })}
            placeholder="All schemes or search…"
          />
          <div>
            <label htmlFor="filter-category" className="mb-1.5 block text-sm font-medium text-navy">
              Subtitle / Category
            </label>
            <select
              id="filter-category"
              className="w-full rounded-lg border border-[#E8DFD3] bg-[#FAFAF8] py-2.5 px-3 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15"
              value={draft.category}
              onChange={(e) => onDraftChange({ ...draft, category: e.target.value })}
            >
              <option value="">All categories</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="filter-from" className="mb-1.5 block text-sm font-medium text-navy">
              From Date
            </label>
            <input
              id="filter-from"
              type="date"
              className="w-full rounded-lg border border-[#E8DFD3] bg-[#FAFAF8] py-2.5 px-3 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15"
              value={draft.fromDate}
              onChange={(e) => onDraftChange({ ...draft, fromDate: e.target.value })}
            />
          </div>
          <div>
            <label htmlFor="filter-to" className="mb-1.5 block text-sm font-medium text-navy">
              To Date
            </label>
            <input
              id="filter-to"
              type="date"
              className="w-full rounded-lg border border-[#E8DFD3] bg-[#FAFAF8] py-2.5 px-3 text-sm focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15"
              value={draft.toDate}
              onChange={(e) => onDraftChange({ ...draft, toDate: e.target.value })}
            />
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onApply}
            className="rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#e07d1f] transition-colors shadow-sm"
          >
            Apply Filters
          </button>
          <button
            type="button"
            onClick={onClear}
            className="inline-flex items-center gap-2 rounded-full border border-[#E8DFD3] bg-white px-6 py-2.5 text-sm font-semibold text-navy hover:bg-[#F3EDE4] transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  )
}
