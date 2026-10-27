import PolicyPage from '../components/PolicyPage.jsx'

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
  return <PolicyPage title="Terms & Conditions" sections={sections} />
}
