import PolicyPage from '../components/PolicyPage.jsx'

const sections = [
  {
    h: 'Call Booking Fee',
    body: [
      'The fee paid to book a call is refundable on request. Write to {email} with the name and email you used to book, and the refund is processed within 5 to 7 business days to the original payment method.',
    ],
  },
  {
    h: 'Our Guarantee',
    body: [
      'Your Clarity Call is risk-free. If you attend your scheduled call and feel it was not worth your time, write to {email} within 7 days of the call and we will refund your call booking fee in full.',
    ],
  },
  {
    h: 'Cancellation',
    body: [
      'You may withdraw your application at any time before enrollment by writing to {email}. If you cancel or miss your scheduled slot, the slot is not rescheduled, but your call booking fee remains refundable on request.',
    ],
  },
  {
    h: 'How to request a refund',
    body: [
      { list: ['Email {email} from the address you used to book.', 'Include your full name and the date of your booking.', 'We confirm your request, and the refund reaches the original payment method within 5 to 7 business days of approval.'] },
    ],
  },
  {
    h: 'Questions',
    body: ['If anything here is unclear, write to {email} before you book and we will explain it.'],
  },
]

export default function Refund() {
  return <PolicyPage title="Refund & Cancellation Policy" sections={sections} />
}
