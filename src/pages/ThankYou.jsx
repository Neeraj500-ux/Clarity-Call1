import { Link } from 'react-router-dom'
import { SITE } from '../config.js'
import { usePageTitle } from '../components/PolicyPage.jsx'

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
    <section className="px-5 pb-20 pt-12 text-center sm:pb-28 sm:pt-20">
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
  )
}