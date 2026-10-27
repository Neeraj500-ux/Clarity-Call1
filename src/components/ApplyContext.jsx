import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import ApplyModal from './ApplyModal.jsx'

const ApplyContext = createContext({ openApply: () => {} })

export const useApply = () => useContext(ApplyContext)

export function ApplyProvider({ children }) {
  const [open, setOpen] = useState(false)
  const openApply = useCallback(() => setOpen(true), [])
  const value = useMemo(() => ({ openApply }), [openApply])

  return (
    <ApplyContext.Provider value={value}>
      {children}
      {open && <ApplyModal onClose={() => setOpen(false)} />}
    </ApplyContext.Provider>
  )
}
