import { SITE } from '../config'
import BookButton from '../components/BookButton.jsx'
import Reveal from '../components/Reveal.jsx'
import { usePageTitle } from '../components/PolicyPage.jsx'

// Vimeo video (embed format of https://vimeo.com/1239818657)
// If SITE.videoEmbedUrl is set in config, that one is used instead.
const VIMEO_URL =
  'https://player.vimeo.com/video/1239818657?title=0&byline=0&portrait=0&dnt=1'

const steps = [
  'Book your call above and complete the application carefully.',
  "We'll review your application and contact you if you are qualified.",
  'If selected and you miss your scheduled slot, missed slots are not rescheduled.',
  'Spots are limited for every cohort.',
]

function Crown() {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 23l2.2-12 6.3 6.2L16 8l2.5 9.2L24.8 11 27 23z"
        fill="#c9a45d"
      />
      <rect
        x="5"
        y="25"
        width="22"
        height="2.6"
        rx="1.3"
        fill="#c9a45d"
      />
    </svg>
  )
}

function Check() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" strokeOpacity="0.45" />
      <path d="M7.8 12.4l3 3 5.4-6" />
    </svg>
  )
}

function VideoCard() {
  const src = SITE.videoEmbedUrl || VIMEO_URL

  return (
    <div className="relative isolate aspect-video w-full overflow-hidden rounded-xl border border-gold/70 bg-black shadow-[0_24px_65px_-28px_rgba(0,0,0,0.8)] sm:rounded-[18px]">
      <iframe
        src={src}
        title={`${SITE.name} video`}
        className="absolute inset-0 block h-full w-full border-0 bg-black"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
        allowFullScreen
        loading="lazy"
      />
    </div>
  )
}

export default function Home() {
  usePageTitle('')

  return (
    <>
      <section className="px-3 pb-10 pt-8 text-center sm:px-6 sm:pb-16 sm:pt-14">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-0">
          <p
            className="rise mb-4 inline-flex items-center justify-center gap-2.5 font-serif text-[1rem] font-semibold text-gold sm:mb-5 sm:text-[1.05rem]"
            style={{ animationDelay: '0ms' }}
          >
            <Crown />
            {SITE.name}
          </p>

          {/* Mobile: 3 lines | Desktop (md+): 2 lines */}
          <h1
            className="rise m-0 w-full max-w-none text-center font-serif text-[5.5vw] leading-[1.3] tracking-[-0.01em] text-cream md:text-[2.4vw] md:leading-[1.25] xl:text-[36px]"
            style={{ animationDelay: '120ms' }}
          >
            {/* White part: 2 lines on mobile, 1 line on desktop */}
            <span className="block md:whitespace-nowrap">
              <span className="block whitespace-nowrap md:inline">
                We Hand-Hold High-Achieving
              </span>{' '}
              <span className="block whitespace-nowrap md:inline">
                Women To Gain Clarity By Clearing
              </span>
            </span>

            {/* Gold part: 1 line on all screens */}
            <span className="block whitespace-nowrap text-gold md:mt-1">
              The Unseen Blocks Holding Them Back
            </span>
          </h1>

          <div
            className="rise mt-5 flex w-full max-w-[500px] items-center justify-center gap-2 sm:mt-6 sm:gap-4"
            style={{ animationDelay: '220ms' }}
          >
            <span
              className="h-px min-w-4 flex-1 bg-gradient-to-r from-transparent to-gold/70"
              aria-hidden="true"
            />

            <p className="m-0 text-center text-[12px] font-semibold leading-relaxed text-gold sm:text-[16px]">
              Money-Back Guarantee: 100% Risk-Free
            </p>

            <span
              className="h-px min-w-4 flex-1 bg-gradient-to-l from-transparent to-gold/70"
              aria-hidden="true"
            />
          </div>

          <div
            className="rise mx-auto mt-6 w-full max-w-[576px] sm:mt-10"
            style={{ animationDelay: '300ms' }}
          >
            <VideoCard />
          </div>

          <div
            className="rise mx-auto mt-5 w-full max-w-[576px] sm:mt-6"
            style={{ animationDelay: '400ms' }}
          >
            <BookButton className="!flex !min-h-[54px] !w-full !items-center !justify-center !rounded-[14px] !text-[16px] sm:!text-[18px]" />
          </div>
        </div>
      </section>

      <section
        className="px-5 pb-20 sm:pb-28"
        aria-labelledby="get-started"
      >
        <Reveal className="mx-auto max-w-2xl rounded-3xl border border-gold/20 bg-white/[0.035] p-6 backdrop-blur-[2px] sm:p-10">
          <h2
            id="get-started"
            className="font-serif text-[1.7rem] font-semibold text-gold sm:text-[2rem]"
          >
            How to get started
          </h2>

          <ul className="mt-6 grid gap-4 p-0">
            {steps.map((step) => (
              <li
                key={step}
                className="flex list-none items-start gap-3.5 text-[1.02rem] leading-relaxed text-cream/90"
              >
                <span className="mt-0.5 shrink-0 text-gold">
                  <Check />
                </span>
                <span className="min-w-0">{step}</span>
              </li>
            ))}

            <li className="flex list-none items-start gap-3.5 text-[1.02rem] leading-relaxed text-cream/90">
              <span className="mt-0.5 shrink-0 text-gold">
                <Check />
              </span>

              <span className="min-w-0">
                Any questions?{' '}
                <a
                  className="link-gold break-all"
                  href={`mailto:${SITE.contactEmail}`}
                >
                  {SITE.contactEmail}
                </a>
              </span>
            </li>
          </ul>
        </Reveal>
      </section>
    </>
  )
}