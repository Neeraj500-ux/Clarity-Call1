import { useRef, useState } from 'react'
import { SITE } from '../config'
import BookButton from '../components/BookButton.jsx'
import Reveal from '../components/Reveal.jsx'
import { usePageTitle } from '../components/PolicyPage.jsx'

// Dummy video (shows when SITE.videoEmbedUrl is empty). Replace with your own .mp4 later.
const DUMMY_VIDEO =
  'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'

const steps = [
  'Book your call above and complete the application carefully.',
  "We'll review your application and contact you if you are qualified.",
  'If selected and you miss your scheduled slot, missed slots are not rescheduled.',
  'Spots are limited for every cohort.',
]

function Crown() {
  return (
    <svg width="26" height="26" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M5 23l2.2-12 6.3 6.2L16 8l2.5 9.2L24.8 11 27 23z" fill="#c9a45d" />
      <rect x="5" y="25" width="22" height="2.6" rx="1.3" fill="#c9a45d" />
    </svg>
  )
}

function Check() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" strokeOpacity="0.45" />
      <path d="M7.8 12.4l3 3 5.4-6" />
    </svg>
  )
}

/* Video card: gold border, rounded corners, round gold play button in the centre */
function VideoCard() {
  const ref = useRef(null)
  const [playing, setPlaying] = useState(false)

  const play = () => {
    const v = ref.current
    if (!v) return
    v.play()
    setPlaying(true)
  }

  const frame =
    'relative mx-auto aspect-video w-full max-w-3xl overflow-hidden rounded-2xl border border-gold/60 bg-black shadow-[0_30px_80px_-30px_rgba(0,0,0,0.85)]'

  if (SITE.videoEmbedUrl) {
    return (
      <div className={frame}>
        <iframe
          src={SITE.videoEmbedUrl}
          title={`${SITE.name} video`}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          loading="lazy"
        />
      </div>
    )
  }

  return (
    <div className={frame}>
      <video
        ref={ref}
        src={DUMMY_VIDEO}
        className="h-full w-full object-cover"
        controls={playing}
        playsInline
        preload="metadata"
        onPause={() => ref.current && ref.current.ended && setPlaying(false)}
        onEnded={() => setPlaying(false)}
      />

      {!playing && (
        <button
          type="button"
          onClick={play}
          aria-label="Play video"
          className="absolute inset-0 grid place-items-center bg-black/25 transition hover:bg-black/15 focus-visible:outline-none"
        >
          <span
            className="grid h-16 w-16 place-items-center rounded-full border border-[#f3e2b3]/60 shadow-[0_10px_30px_-6px_rgba(0,0,0,0.7)] transition-transform duration-200 hover:scale-105 sm:h-[74px] sm:w-[74px]"
            style={{ background: 'linear-gradient(135deg,#e9d49b 0%,#b48a45 55%,#8a6528 100%)' }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff" aria-hidden="true" style={{ marginLeft: 3 }}>
              <path d="M8 5.5v13l11-6.5z" />
            </svg>
          </span>
        </button>
      )}
    </div>
  )
}

export default function Home() {
  usePageTitle('')

  return (
    <>
      <section className="px-5 pb-12 pt-10 text-center sm:pb-16 sm:pt-14">
        <div className="mx-auto max-w-4xl">
          <p
            className="rise inline-flex items-center gap-2.5 font-serif text-[1.05rem] font-semibold text-gold"
            style={{ animationDelay: '0ms' }}
          >
            <Crown />
            {SITE.name}
          </p>

          {/* Heading: cream first part, gold second part (same text as before) */}
          <h1
            className="rise mx-auto mt-6 max-w-[26ch] font-serif font-medium text-cream sm:max-w-[34ch]"
            style={{
              fontSize: 'clamp(1.7rem, 4.6vw, 3rem)',
              lineHeight: 1.18,
              letterSpacing: '-0.005em',
              animationDelay: '120ms',
              overflowWrap: 'break-word',
            }}
          >
            We Hand-Hold High-Achieving Women To Gain Clarity By Clearing{' '}
            <span className="block text-gold">The Unseen Blocks Holding Them Back</span>
          </h1>

          {/* Money-back guarantee with gold lines on both sides */}
          <div
            className="rise mx-auto mt-7 flex w-full max-w-[640px] items-center justify-center gap-4"
            style={{ animationDelay: '220ms' }}
          >
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/70" aria-hidden="true" />
            <p className="whitespace-nowrap text-[0.9rem] font-semibold text-gold sm:text-base">
              Money-Back Guarantee: 100% Risk-Free
            </p>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/70" aria-hidden="true" />
          </div>

          <div className="rise mt-9" style={{ animationDelay: '300ms' }}>
            <VideoCard />
          </div>

          <div className="rise mx-auto mt-8 w-full max-w-3xl" style={{ animationDelay: '400ms' }}>
            <BookButton className="w-full" />
          </div>
        </div>
      </section>

      <section className="px-5 pb-20 sm:pb-28" aria-labelledby="get-started">
        <Reveal className="mx-auto max-w-2xl rounded-3xl border border-gold/20 bg-white/[0.035] p-6 backdrop-blur-[2px] sm:p-10">
          <h2 id="get-started" className="font-serif text-[1.7rem] font-semibold text-gold sm:text-[2rem]">
            How to get started
          </h2>
          <ul className="mt-6 grid gap-4 p-0">
            {steps.map((s) => (
              <li key={s} className="flex list-none items-start gap-3.5 text-[1.02rem] leading-relaxed text-cream/90">
                <span className="mt-0.5 shrink-0 text-gold">
                  <Check />
                </span>
                <span>{s}</span>
              </li>
            ))}
            <li className="flex list-none items-start gap-3.5 text-[1.02rem] leading-relaxed text-cream/90">
              <span className="mt-0.5 shrink-0 text-gold">
                <Check />
              </span>
              <span>
                Any questions?{' '}
                <a className="link-gold break-all" href={`mailto:${SITE.contactEmail}`}>
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