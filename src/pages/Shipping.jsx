import PolicyPage from '../components/PolicyPage.jsx'

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

const sections = [
  {
    h: 'Digital services only',
    body: ['We do not sell or ship physical products. Everything we offer, including your Clarity Call, is delivered online, so no shipping charges apply.'],
  },
  {
    h: 'How your call is delivered',
    body: [
      'Once your application is approved, we send your call details and joining link to the email address you provided. Calls take place by video or phone at the time shown in your confirmation.',
    ],
  },
  {
    h: 'Delivery time',
    body: ['You should receive your confirmation after your application is reviewed. If you have not heard from us, check your spam or promotions folder, then write to {email}.'],
  },
  {
    h: 'Missed or failed delivery',
    body: ['If you did not receive your joining link because of a technical problem on our side, write to {email} and we will resend it or arrange a new slot.'],
  },
]

export default function Shipping() {
  return (
    <>
      <HeroBackground />
      <PolicyPage title="Shipping & Delivery Policy" sections={sections} />
    </>
  )
}