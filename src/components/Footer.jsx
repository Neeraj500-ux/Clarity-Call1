import { Link } from 'react-router-dom'
import { SITE } from '../config'

const links = [
  ['About Us', '/about'],
  ['Pricing', '/pricing'],
  ['Privacy Policy', '/privacy'],
  ['Terms & Conditions', '/terms'],
  ['Refund & Cancellation Policy', '/refund'],
  ['Shipping & Delivery Policy', '/shipping'],
  ['Contact Us', '/contact'],
]

export default function Footer() {
  return (
    <footer className="relative z-10 mt-auto border-t border-gold/50 bg-black/30 px-5 pb-9 pt-9 text-center">
      <nav
        aria-label="Footer"
        className="mx-auto flex max-w-5xl flex-wrap justify-center gap-x-4 gap-y-2 text-[0.88rem]"
      >
        {links.map(([label, to]) => (
          <Link
            key={to}
            to={to}
            className="whitespace-nowrap text-cream/75 transition-colors hover:text-gold-light focus-visible:text-gold-light focus-visible:outline-none"
          >
            {label}
          </Link>
        ))}
      </nav>

      <p className="mt-6 text-[0.88rem] text-cream/75">
        © {SITE.year} {SITE.legalName}. All rights reserved.
      </p>

      <p className="mx-auto mt-5 max-w-[900px] text-[0.78rem] leading-relaxed text-cream/70">
        This site is not a part of the Facebook website or Meta Platforms, Inc. Additionally, this site is NOT endorsed by
        Facebook or Meta in any way. FACEBOOK is a trademark of Meta Platforms, Inc.
      </p>
      <p className="mx-auto mt-3 max-w-[900px] text-[0.78rem] leading-relaxed text-cream/70">
        Results vary from person to person. The client results shared on this site are individual experiences and are not
        a promise of any specific income.
      </p>
    </footer>
  )
}