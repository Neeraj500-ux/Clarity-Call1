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
    h: 'Acceptance of these terms',
    body: ['By using this website or applying for a Clarity Call, you agree to these Terms & Conditions. If you do not agree, please do not use the site.'],
  },
  {
    h: 'Our service',
    body: ['We offer a one-to-one Clarity Call and, where there is a good fit, information about follow-on programs. The call is a coaching and guidance conversation. It is not medical, psychological, legal, tax or financial advice.'],
  },
  {
    h: 'Applications and selection',
    body: [
      'Submitting an application does not guarantee a call. We review every application and contact you if you are qualified. Spots are limited for every cohort, and we may decline any application at our discretion.',
    ],
  },
  {
    h: 'Missed slots',
    body: ['If you are selected and miss your scheduled slot, the slot is not rescheduled. Any call booking fee remains refundable on request under our Refund & Cancellation Policy.'],
  },
  {
    h: 'Payments',
    body: ['Fees are shown before you pay and are processed by our payment partner. You agree to provide accurate payment and contact details.'],
  },
  {
    h: 'No guarantee of results',
    body: [
      'Results vary from person to person. Any client results shared on this site are individual experiences and are not a promise of any specific outcome or income. Your results depend on your own actions, circumstances and effort.',
    ],
  },
  {
    h: 'Intellectual property',
    body: ['All text, images, branding and materials on this site belong to us or our licensors. You may not copy, sell or redistribute them without written permission.'],
  },
  {
    h: 'Acceptable use',
    body: [
      { list: ['Do not misuse the site or try to disrupt it.', 'Do not submit false or misleading information.', 'Do not record or share a call without the other person’s consent.'] },
    ],
  },
  {
    h: 'Limitation of liability',
    body: ['To the fullest extent permitted by law, we are not liable for any indirect or consequential loss arising from your use of the site or services. Our total liability is limited to the amount you paid us for the service in question.'],
  },
  {
    h: 'Governing law',
    body: ['These terms are governed by the laws of India.'],
  },
  {
    h: 'Changes and contact',
    body: ['We may update these terms from time to time. Questions? Write to {email}.'],
  },
]

export default function Terms() {
  return (
    <>
      <HeroBackground />
      <PolicyPage title="Terms & Conditions" sections={sections} />
    </>
  )
}