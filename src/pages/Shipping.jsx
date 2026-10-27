import PolicyPage from '../components/PolicyPage.jsx'

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
  return <PolicyPage title="Shipping & Delivery Policy" sections={sections} />
}
