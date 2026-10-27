import { Outlet } from 'react-router-dom'
import Background from './Background.jsx'
import Footer from './Footer.jsx'
import { ApplyProvider } from './ApplyContext.jsx'

export default function Layout() {
  return (
    <ApplyProvider>
      <div className="relative flex min-h-screen flex-col">
        <Background />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-gold focus:px-4 focus:py-2 focus:text-forest-950"
        >
          Skip to content
        </a>
        <main id="main" className="relative z-10 flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </ApplyProvider>
  )
}
