import { isoToDdMmYyyy, maskDdMmYyyy } from '../utils/dateInput'

interface DateInputDdMmYyyyProps {
  id?: string
  value: string
  onChange: (displayValue: string) => void
  error?: string
  className?: string
}

export function DateInputDdMmYyyy({ id, value, onChange, error, className = '' }: DateInputDdMmYyyyProps) {
  return (
    <div>
      <input
        id={id}
        type="text"
        inputMode="numeric"
        autoComplete="off"
        placeholder="DD/MM/YYYY"
        maxLength={10}
        className={`w-full rounded-lg border bg-[#FAFAF8] py-2.5 px-3 text-sm font-mono tracking-wide focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15 ${
          error ? 'border-red-400' : 'border-[#E8DFD3]'
        } ${className}`}
        value={value}
        onChange={(e) => onChange(maskDdMmYyyy(e.target.value))}
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  )
}

/** Sync display field when parent holds ISO (e.g. filter reset). */
export function isoToDisplay(iso: string): string {
  return isoToDdMmYyyy(iso)
}
