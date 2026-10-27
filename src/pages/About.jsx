import PolicyPage from '../components/PolicyPage.jsx'
import BookButton from '../components/BookButton.jsx'

const sections = [
  {
    h: 'Who we are',
    body: [
      'Clarity Call is a private space for high-achieving women who are capable of far more than their current results show. You have built a career, a business or a reputation. Something unseen is still holding the next level back, and we help you find it and clear it.',
    ],
  },
  {
    h: 'What the Clarity Call is',
    body: [
      'A focused one-to-one conversation where we look at where you are, where you want to be, and the unseen blocks standing between the two. You leave the call knowing what is in the way and what to do next.',
    ],
  },
  {
    h: 'Who it is for',
    body: [
      {
        list: [
          'Women who already achieve a lot and feel they are still stuck below their potential.',
          'Coaches, healers, consultants, founders and professionals ready to grow their income and impact.',
          'Women who want hands-on guidance, not another course to watch alone.',
        ],
      },
    ],
  },
  {
    h: 'How we work',
    body: [
      'We hand-hold you. Every application is read by a person, every call is prepared in advance, and we only invite those we believe we can genuinely help. Spots are limited for every cohort so that each woman gets proper attention.',
    ],
  },
  {
    h: 'Our promise',
    body: [
      'Your call is covered by a money-back guarantee, so applying carries no risk. Read the full terms in our Refund & Cancellation Policy. Results vary from person to person, and we never promise a specific outcome or income.',
    ],
  },
]

export default function About() {
  return (
    <PolicyPage title="About Us" updated={null} sections={sections}>
      <div className="mt-10">
        <BookButton className="w-full sm:w-auto" />
      </div>
    </PolicyPage>
  )
}
