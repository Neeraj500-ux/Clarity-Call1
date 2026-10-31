import { Fragment } from 'react'

const EMAIL = 'hello@manifestwithvansh.com'

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

/* Replaces {email} in a text with a real mailto link */
function withEmail(text) {
  const parts = text.split('{email}')
  return parts.map((part, i) => (
    <Fragment key={i}>
      {part}
      {i < parts.length - 1 && (
        <a className="link-gold underline underline-offset-4" href={`mailto:${EMAIL}`}>
          {EMAIL}
        </a>
      )}
    </Fragment>
  ))
}

const sections = [
  {
    h: 'Information we collect',
    body: [
      'When you apply for a call or contact us, we collect the details you give us:',
      { list: ['Your name, email address and phone or WhatsApp number.', 'What you do and what you want clarity on.', 'Messages you send us.'] },
      'If you pay a booking fee, the payment is handled by our payment partner. We do not see or store your full card or bank details.',
    ],
  },
  {
    h: 'How we use your information',
    body: [
      { list: ['To review your application and contact you about your call.', 'To send reminders and respond to your questions.', 'To improve our website and services.', 'To meet legal and tax obligations.'] },
    ],
  },
  {
    h: 'Sharing your information',
    body: [
      'We never sell your personal information. We share it only with trusted providers who help us run the service, such as email, scheduling and payment tools, and only as far as needed. We may also share it when the law requires.',
    ],
  },
  {
    h: 'Cookies and analytics',
    body: [
      'This website itself does not set tracking cookies. If we add analytics or advertising tools in the future, such as the Meta Pixel, they may use cookies to measure visits and show relevant ads. You can block cookies in your browser settings.',
    ],
  },
  {
    h: 'Storage and security',
    body: [
      'We keep your information only as long as needed for the purposes above or as required by law, and we use reasonable technical and organisational measures to protect it. No online system is completely secure, so we cannot guarantee absolute security.',
    ],
  },
  {
    h: 'Your choices and rights',
    body: [
      'You may ask to see, correct or delete the personal information we hold about you, or opt out of our messages at any time. Write to {email} and we will respond within a reasonable time.',
    ],
  },
  {
    h: 'Changes to this policy',
    body: ['We may update this policy from time to time. The date at the top shows when it was last changed.'],
  },
  {
    h: 'Contact',
    body: ['Questions about your privacy? Write to {email}.'],
  },
]

function renderBlock(block, i) {
  if (typeof block === 'string') {
    return (
      <p key={i} className="mt-3 break-words text-[1.02rem] leading-8 text-[#f6efdd]/90">
        {withEmail(block)}
      </p>
    )
  }

  if (block && block.list) {
    return (
      <ul key={i} className="mt-3 grid gap-3">
        {block.list.map((item) => (
          <li key={item} className="flex gap-3 text-[1.02rem] leading-8 text-[#f6efdd]/90">
            <span aria-hidden="true" className="mt-[0.8rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[#c9a96a]" />
            <span>{withEmail(item)}</span>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <p key={i} className="mt-3 break-words text-[1.02rem] leading-8 text-[#f6efdd]/90">
      {block}
    </p>
  )
}

export default function Privacy() {
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
          <h1 className="font-serif text-5xl font-bold leading-tight text-[#f6efdd] sm:text-6xl">Privacy Policy</h1>
          <p className="mt-3 text-sm text-[#f6efdd]/55">Last updated: 24 September 2026</p>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#f6efdd]/75">
            Your privacy matters to us. This policy explains what we collect, why we collect it and how we look after it.
          </p>
        </header>

        <div className="mt-14 grid gap-10">
          {sections.map((s) => (
            <section key={s.h}>
              <h2 className="font-serif text-2xl font-semibold text-[#c9a96a] sm:text-[1.7rem]">{s.h}</h2>
              {s.body.map(renderBlock)}
            </section>
          ))}
        </div>
      </main>
    </>
  )
}