import { Link } from 'react-router-dom'
import { SITE } from '../config.js'
import { usePageTitle } from '../components/PolicyPage.jsx'

/* Same look as the About page: deep green glow + faint gold swirl lines */
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

const nextSteps = [
  'Check your email for your payment receipt and booking confirmation.',
  'If you have not booked your call yet, please book your slot using the button below.',
  'I personally review every application and will reach out if it feels like the right fit.',
  'Please show up on time. If you miss your call without notice, your spot goes to the next woman on the waitlist.',
]

function Check() {
  return (
    <span
      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold ring-1 ring-gold/70"
      aria-hidden="true"
    >
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12.5l4.5 4.5L19 7.5" />
      </svg>
    </span>
  )
}

export default function ThankYou() {
  usePageTitle('Thank You')

  return (
    <>
      <HeroBackground />

      <section className="relative px-5 pb-20 pt-12 text-center sm:pb-28 sm:pt-20">
        <div className="mx-auto max-w-2xl rounded-3xl border border-gold/20 bg-white/[0.035] p-6 sm:p-10">
          <h1 className="font-serif text-[1.9rem] font-semibold text-gold sm:text-[2.4rem]">
            Thank You!
          </h1>

          <p className="mt-4 text-[1.05rem] leading-relaxed text-cream/90">
            Your spot is confirmed. I’m so glad you took this step toward gaining
            clarity and clearing the unseen blocks holding you back.
          </p>

          <h2 className="mt-8 text-left font-serif text-[1.4rem] font-semibold text-gold">
            What happens next
          </h2>

          <ul className="mt-4 grid gap-4 p-0 text-left">
            {nextSteps.map((s) => (
              <li
                key={s}
                className="flex list-none items-start gap-3.5 text-[1.02rem] leading-relaxed text-cream/90"
              >
                <Check />
                <span className="min-w-0">{s}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3">
            <a
              href="https://calendly.com/induravish"
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[54px] w-full items-center justify-center rounded-[14px] bg-gradient-to-br from-[#e6c987] via-[#c9a45d] to-[#a98539] text-[16px] font-semibold text-black"
            >
              Book Your Call
            </a>
            <Link
              to="/"
              className="flex min-h-[48px] w-full items-center justify-center rounded-[14px] border border-gold/70 text-gold"
            >
              Back to Home
            </Link>
          </div>

          <p className="mt-6 text-sm text-cream/70">
            Any questions?{' '}
            <a className="link-gold break-all" href={`mailto:${SITE.contactEmail}`}>
              {SITE.contactEmail}
            </a>
          </p>
        </div>
      </section>
    </>
  )
}