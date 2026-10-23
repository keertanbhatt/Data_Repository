import { createContext, useCallback, useContext, useMemo, useRef, type ReactNode } from 'react'

interface LocalFilesContextValue {
  registerFile: (docId: string, file: File) => void
  getFile: (docId: string) => File | undefined
}

const LocalFilesContext = createContext<LocalFilesContextValue | null>(null)

export function LocalFilesProvider({ children }: { children: ReactNode }) {
  const mapRef = useRef<Map<string, File>>(new Map())

  const registerFile = useCallback((docId: string, file: File) => {
    mapRef.current.set(docId, file)
  }, [])

  const getFile = useCallback((docId: string) => mapRef.current.get(docId), [])

  const value = useMemo(() => ({ registerFile, getFile }), [registerFile, getFile])

  return <LocalFilesContext.Provider value={value}>{children}</LocalFilesContext.Provider>
}

export function useLocalFiles() {
  const ctx = useContext(LocalFilesContext)
  if (!ctx) throw new Error('useLocalFiles must be used within LocalFilesProvider')
  return ctx
}
