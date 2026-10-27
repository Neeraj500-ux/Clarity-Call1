import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { SITE } from '../config'

// Turns "{email}" inside a string into a mailto link.
function Rich({ text }) {
  const parts = text.split('{email}')
  return parts.map((part, i) => (
    <span key={i}>
      {part}
      {i < parts.length - 1 && <a href={`mailto:${SITE.contactEmail}`}>{SITE.contactEmail}</a>}
    </span>
  ))
}

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} | ${SITE.name}` : SITE.name
  }, [title])
}

export default function PolicyPage({ title, updated = SITE.lastUpdated, intro, sections = [], children }) {
  usePageTitle(title)

  return (
    <article className="policy mx-auto w-full max-w-[42rem] px-6 pb-20 pt-8 sm:pt-14">
      <Link
        to="/"
        className="rise mb-8 inline-flex items-center gap-2 text-sm font-medium text-gold-light/90 transition hover:text-white"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M15 5l-7 7 7 7" />
        </svg>
        Back to home
      </Link>

      <h1
        className="rise font-serif font-bold leading-[1.1] text-cream"
        style={{ fontSize: 'clamp(2.1rem, 7vw, 3.1rem)', animationDelay: '80ms', overflowWrap: 'anywhere' }}
      >
        {title}
      </h1>
      {updated && (
        <p className="rise mt-2 text-[0.95rem] text-cream/60" style={{ animationDelay: '160ms' }}>
          Last updated: {updated}
        </p>
      )}

      <div className="rise" style={{ animationDelay: '240ms' }}>
        {intro && (
          <p className="mt-8">
            <Rich text={intro} />
          </p>
        )}
        {sections.map((s) => (
          <section key={s.h}>
            <h2>{s.h}</h2>
            {s.body.map((b, i) =>
              typeof b === 'string' ? (
                <p key={i}>
                  <Rich text={b} />
                </p>
              ) : (
                <ul key={i}>
                  {b.list.map((li) => (
                    <li key={li}>
                      <Rich text={li} />
                    </li>
                  ))}
                </ul>
              ),
            )}
          </section>
        ))}
        {children}
      </div>
    </article>
  )
}
