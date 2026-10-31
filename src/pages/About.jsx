import BookButton from '../components/BookButton.jsx'

/* Same look as the hero: deep green glow + faint gold swirl lines */
function HeroBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[#06140f]">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 35%, #0f2a20 0%, #0a1d16 45%, #05110c 100%)',
        }}
      />
      <svg
        className="absolute left-1/2 top-1/2 h-[140%] w-[140%] -translate-x-1/2 -translate-y-1/2 opacity-[0.07]"
        viewBox="0 0 800 800"
        fill="none"
        stroke="#d4b06a"
        strokeWidth="1"
      >
        <ellipse cx="400" cy="400" rx="360" ry="240" transform="rotate(20 400 400)" />
        <ellipse cx="400" cy="400" rx="300" ry="190" transform="rotate(-25 400 400)" />
        <ellipse cx="400" cy="400" rx="240" ry="300" transform="rotate(55 400 400)" />
        <ellipse cx="400" cy="400" rx="180" ry="120" transform="rotate(100 400 400)" />
        <path d="M60 520 C 220 300, 420 700, 740 280" />
        <path d="M80 300 C 260 620, 520 120, 730 560" />
      </svg>
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.45) 100%)' }}
      />
    </div>
  )
}

const sections = [
  {
    h: 'Who we are',
    body: [
      'Clarity Call is a private space for high-achieving women who are capable of far more than their current results show. You have built a career, a business or a reputation. Something unseen is still holding the next level back, and we help you find it and clear it.',
    ],
  },
  {
    h: 'What the Clarity Call is',
    body: [
      'A focused one-to-one conversation where we look at where you are, where you want to be, and the unseen blocks standing between the two. You leave the call knowing what is in the way and what to do next.',
    ],
  },
  {
    h: 'Who it is for',
    list: [
      'Women who already achieve a lot and feel they are still stuck below their potential.',
      'Coaches, healers, consultants, founders and professionals ready to grow their income and impact.',
      'Women who want hands-on guidance, not another course to watch alone.',
    ],
  },
  {
    h: 'How we work',
    body: [
      'We hand-hold you. Every application is read by a person, every call is prepared in advance, and we only invite those we believe we can genuinely help. Spots are limited for every cohort so that each woman gets proper attention.',
    ],
  },
  {
    h: 'Our promise',
    body: [
      <>
        Your call is covered by a money-back guarantee, so applying carries no risk. Read the full terms in our{' '}
        <a className="link-gold underline underline-offset-4" href="/refund-policy">
          Refund &amp; Cancellation Policy
        </a>
        . Results vary from person to person, and we never promise a specific outcome or income.
      </>,
    ],
  },
]

export default function About() {
  return (
    <>
      <HeroBackground />

      <main className="relative mx-auto w-full max-w-3xl px-6 pb-24 pt-28 sm:pt-32">
        <a
          href="/"
          className="link-gold mb-8 inline-flex items-center gap-2 text-base font-semibold text-[#d4b06a] underline underline-offset-4 transition-opacity hover:opacity-80"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
          Back to home
        </a>

        <header>
          <h1 className="font-serif text-5xl font-bold leading-tight text-[#f6efdd] sm:text-6xl">About Us</h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#f6efdd]/75">
            A hands-on, one-to-one space to find what is quietly holding you back, and clear it.
          </p>
        </header>

        <div className="mt-14 grid gap-10">
          {sections.map((s) => (
            <section key={s.h}>
              <h2 className="font-serif text-2xl font-semibold text-[#c9a96a] sm:text-[1.7rem]">{s.h}</h2>

              {s.body?.map((p, i) => (
                <p key={i} className="mt-3 text-[1.02rem] leading-8 text-[#f6efdd]/90">
                  {p}
                </p>
              ))}

              {s.list && (
                <ul className="mt-3 grid gap-3">
                  {s.list.map((item) => (
                    <li key={item} className="flex gap-3 text-[1.02rem] leading-8 text-[#f6efdd]/90">
                      <span aria-hidden="true" className="mt-[0.8rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#c9a96a]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <div className="mt-14 rounded-3xl border border-[#c9a96a]/20 bg-white/[0.035] p-6 sm:p-8">
          <h2 className="font-serif text-2xl font-semibold text-[#f6efdd]">Ready to see what is in the way?</h2>
          <p className="mt-2 max-w-lg leading-7 text-[#f6efdd]/75">
            Apply for your Clarity Call. A person on our team will read your application.
          </p>
          <div className="mt-6">
            <BookButton className="w-full sm:w-auto" />
          </div>
        </div>

        <p className="mt-12 text-sm leading-6 text-[#f6efdd]/55">
          Soulyukti Private Limited &middot; Moradabad, Uttar Pradesh. Questions? Visit our{' '}
          <a className="link-gold underline underline-offset-4" href="/contact">
            Contact page
          </a>
          .
        </p>
      </main>
    </>
  )
}