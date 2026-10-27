import { SITE } from '../config'
import { useApply } from './ApplyContext.jsx'

export default function BookButton({ children = 'Book Your Call', className = '' }) {
  const { openApply } = useApply()

  if (SITE.bookingUrl) {
    return (
      <a href={SITE.bookingUrl} target="_blank" rel="noopener noreferrer" className={`btn-gold ${className}`}>
        {children}
      </a>
    )
  }

  return (
    <button type="button" onClick={openApply} className={`btn-gold ${className}`}>
      {children}
    </button>
  )
}
