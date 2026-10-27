import { Link } from 'react-router-dom'
import { usePageTitle } from '../components/PolicyPage.jsx'

export default function NotFound() {
  usePageTitle('Page not found')
  return (
    <section className="mx-auto max-w-xl px-6 py-24 text-center">
      <h1 className="font-serif text-5xl font-bold text-cream">Page not found</h1>
      <p className="mt-4 text-cream/80">The page you are looking for does not exist or has moved.</p>
      <Link to="/" className="btn-gold mt-8">
        Go to home
      </Link>
    </section>
  )
}
