import PolicyPage from '../components/PolicyPage.jsx'

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

export default function Privacy() {
  return (
    <PolicyPage
      title="Privacy Policy"
      intro="Your privacy matters to us. This policy explains what we collect, why we collect it and how we look after it."
      sections={sections}
    />
  )
}
