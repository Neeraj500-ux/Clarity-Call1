import PolicyPage from '../components/PolicyPage.jsx'
import BookButton from '../components/BookButton.jsx'

const sections = [
  {
    h: 'Call Booking Fee',
    body: [
      'A booking fee may apply when you reserve your Clarity Call. The exact amount is shown at the time you book, before you pay, and there are no hidden charges.',
      'This fee is fully refundable on request. See our Refund & Cancellation Policy for how to ask.',
    ],
  },
  {
    h: 'Programs after your call',
    body: [
      'If we both feel there is a good fit, we will share details of any follow-on program and its price privately, during or after your call. There is no obligation and no pressure to enrol.',
    ],
  },
  {
    h: 'Payments',
    body: [
      'Payments are made online through our secure payment partner. We do not see or store your card or bank details. Prices are shown in Indian Rupees (INR) unless stated otherwise, and any applicable taxes are included or shown before you pay.',
    ],
  },
  {
    h: 'Questions about pricing',
    body: ['Write to us at {email} and we will reply with a clear answer.'],
  },
]

export default function Pricing() {
  return (
    <PolicyPage title="Pricing" sections={sections}>
      <div className="mt-10">
        <BookButton className="w-full sm:w-auto" />
      </div>
    </PolicyPage>
  )
}
