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
    h: 'Soulyukti Private Limited',
    body: [
      <>
        <span className="text-[#c9a96a]">Registered Address:</span> No-5, First Floor, Gemini Enclave, Kanth Road,
        Back side CL Gupta Eye Hospital, Ram Ganga Vihar-2, Moradabad, Uttar Pradesh 244001
      </>,
      <>
        <span className="text-[#c9a96a]">Phone:</span>{' '}
        <a className="link-gold underline underline-offset-4" href="tel:+919971626489">
          +91 99716 26489
        </a>
      </>,
      <>
        <span className="text-[#c9a96a]">Email:</span>{' '}
        <a className="link-gold underline underline-offset-4" href="mailto:hello@manifestwithvansh.com">
          hello@manifestwithvansh.com
        </a>
      </>,
      <>
        <span className="text-[#c9a96a]">CIN:</span> U62099UP2025PTC222261
      </>,
      <>
        <span className="text-[#c9a96a]">GSTIN:</span> 09ABQCS0397A1Z4
      </>,
    ],
  },
  {
    h: 'Grievance Officer',
    body: [
      'Vansh Upadhyay',
      <a className="link-gold underline underline-offset-4" href="mailto:hello@manifestwithvansh.com">
        hello@manifestwithvansh.com
      </a>,
    ],
  },
]

export default function Contact() {
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
          <h1 className="font-serif text-5xl font-bold leading-tight text-[#f6efdd] sm:text-6xl">Contact Us</h1>
          <p className="mt-3 text-sm text-[#f6efdd]/55">Last updated: 24 September 2026</p>
        </header>

        <div className="mt-14 grid gap-10">
          {sections.map((s) => (
            <section key={s.h}>
              <h2 className="font-serif text-2xl font-semibold text-[#c9a96a] sm:text-[1.7rem]">{s.h}</h2>
              {s.body.map((p, i) => (
                <p key={i} className="mt-3 break-words text-[1.02rem] leading-8 text-[#f6efdd]/90">
                  {p}
                </p>
              ))}
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
      </main>
    </>
  )
}