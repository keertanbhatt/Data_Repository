import { useEffect, useId, useRef, useState } from 'react'
import { ChevronDown, Search } from 'lucide-react'
import { SCHEMES } from '../data/schemes'

interface SchemeAutocompleteProps {
  value: string
  onChange: (value: string) => void
  label?: string
  placeholder?: string
  error?: string
  id?: string
}

export function SchemeAutocomplete({
  value,
  onChange,
  label = 'Title / Scheme',
  placeholder = 'Type to search scheme…',
  error,
  id: externalId,
}: SchemeAutocompleteProps) {
  const autoId = useId()
  const id = externalId ?? autoId
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState(value)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setQuery(value)
  }, [value])

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const filtered = SCHEMES.filter((s) =>
    s.toLowerCase().includes(query.trim().toLowerCase()) ||
    query.trim() === '' ||
    s.includes(query.trim()),
  )

  return (
    <div ref={containerRef} className="relative">
      {label && (
        <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-primary-text">
          {label}
        </label>
      )}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-text pointer-events-none" />
        <input
          id={id}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-autocomplete="list"
          className={`font-gujarati w-full rounded-lg border bg-[#FAFAF8] py-2.5 pl-10 pr-10 text-sm transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15 ${
            error ? 'border-red-400' : 'border-[#E8DFD3]'
          } ${value ? 'ring-1 ring-accent/30' : ''}`}
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
            if (!e.target.value) onChange('')
          }}
          onFocus={() => setOpen(true)}
        />
        <ChevronDown className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-secondary-text pointer-events-none" />
      </div>
      {open && (
        <ul
          className="absolute z-20 mt-1 max-h-56 w-full overflow-auto rounded-lg border border-border bg-white py-1 shadow-lg animate-fade-in"
          role="listbox"
        >
          {filtered.length === 0 ? (
            <li className="px-3 py-2 text-sm text-secondary-text">No matching schemes</li>
          ) : (
            filtered.map((scheme) => (
              <li key={scheme} role="option" aria-selected={value === scheme}>
                <button
                  type="button"
                  className={`font-gujarati w-full px-3 py-2.5 text-left text-sm hover:bg-page transition-colors ${
                    value === scheme ? 'bg-navy/10 text-navy font-medium' : 'text-primary-text'
                  }`}
                  onClick={() => {
                    onChange(scheme)
                    setQuery(scheme)
                    setOpen(false)
                  }}
                >
                  {scheme}
                </button>
              </li>
            ))
          )}
        </ul>
      )}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  )
}
