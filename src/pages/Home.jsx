import { useEffect, useRef, useState } from 'react'
import { SITE } from '../config'
import Reveal from '../components/Reveal.jsx'
import { usePageTitle } from '../components/PolicyPage.jsx'

// Updated VSL video for the hero section
const VIMEO_URL =
  'https://player.vimeo.com/video/1240119109?title=0&byline=0&portrait=0&dnt=1&controls=0&api=1'

// Button opens Razorpay first. After payment, Razorpay redirects to Calendly.
const PAY_URL = 'https://rzp.io/rzp/zlcsiwye'

const steps = [
  'Click the button above, secure your spot, and then book your call.',
  'I personally review every application and reach out if it feels like the right fit.',
  'If you miss your scheduled call without notice, your spot goes to the next woman on the waitlist.',
  'I take only 6 women a month for private 1:1 work — this is deep work, and I can’t do it at scale.',
  'The next cohort begins 15th August 2026 — only 3 spots left.',
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
    <span
      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold/40 via-gold/20 to-gold/5 text-gold ring-1 ring-gold/70 shadow-[0_0_10px_-1px_rgba(201,164,93,0.6),inset_0_1px_0_rgba(255,255,255,0.2)]"
      aria-hidden="true"
    >
      <svg
        width="11"
        height="11"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="drop-shadow-[0_0_3px_rgba(201,164,93,0.75)]"
      >
        <path d="M5 12.5l4.5 4.5L19 7.5" />
      </svg>
    </span>
  )
}

function PlayIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="#fff"
      aria-hidden="true"
    >
      <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" />
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="#fff"
      aria-hidden="true"
    >
      <rect x="6" y="5" width="4.2" height="14" rx="1.2" />
      <rect x="13.8" y="5" width="4.2" height="14" rx="1.2" />
    </svg>
  )
}

function VideoCard() {
  const src = SITE.videoEmbedUrl || VIMEO_URL
  const iframeRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  const send = (method, value) => {
    const win = iframeRef.current?.contentWindow
    if (!win) return

    win.postMessage(
      JSON.stringify({ method, value }),
      'https://player.vimeo.com'
    )
  }

  useEffect(() => {
    const onMessage = (event) => {
      if (event.origin !== 'https://player.vimeo.com') return

      let data = event.data

      if (typeof data === 'string') {
        try {
          data = JSON.parse(data)
        } catch {
          return
        }
      }

      if (!data?.event) return

      if (data.event === 'play') {
        setPlaying(true)
      }

      if (
        data.event === 'pause' ||
        data.event === 'ended' ||
        data.event === 'finish'
      ) {
        setPlaying(false)
      }
    }

    window.addEventListener('message', onMessage)

    return () => {
      window.removeEventListener('message', onMessage)
    }
  }, [])

  const handleLoad = () => {
    ;['play', 'pause', 'ended', 'finish'].forEach((eventName) => {
      send('addEventListener', eventName)
    })
  }

  const toggle = () => {
    if (playing) {
      send('pause')
      setPlaying(false)
    } else {
      send('play')
      setPlaying(true)
    }
  }

  return (
    <div className="group relative isolate aspect-video w-full overflow-hidden rounded-xl border border-gold/70 bg-black shadow-[0_24px_65px_-28px_rgba(0,0,0,0.8)] sm:rounded-[18px]">
      <iframe
        ref={iframeRef}
        src={src}
        title={`${SITE.name} VSL video`}
        className="absolute inset-0 block h-full w-full border-0 bg-black"
        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
        allowFullScreen
        loading="lazy"
        onLoad={handleLoad}
      />

      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? 'Pause video' : 'Play video'}
        aria-pressed={playing}
        className="absolute inset-0 z-10 flex cursor-pointer items-center justify-center border-0 bg-transparent p-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-6px] focus-visible:outline-gold"
      >
        <span
          className={`flex h-[60px] w-[60px] items-center justify-center rounded-full bg-gradient-to-br from-[#e6c987] via-[#c9a45d] to-[#a98539] shadow-[0_10px_34px_-8px_rgba(201,164,93,0.8),inset_0_1px_0_rgba(255,255,255,0.45)] ring-1 ring-white/20 transition-all duration-300 sm:h-[72px] sm:w-[72px] ${
            playing
              ? 'scale-90 opacity-0'
              : 'scale-100 opacity-100'
          }`}
        >
          {playing ? <PauseIcon /> : <PlayIcon />}
        </span>
      </button>

      {playing && (
        <button
          type="button"
          onClick={toggle}
          aria-label="Pause video"
          className="absolute bottom-3 right-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/50 opacity-0 transition-opacity hover:opacity-100 focus-visible:opacity-100 group-hover:opacity-100"
        >
          <PauseIcon />
        </button>
      )}
    </div>
  )
}

export default function Home() {
  usePageTitle('')

  return (
    <>
      {/* HERO SECTION */}
      <section className="px-3 pb-10 pt-8 text-center sm:px-6 sm:pb-16 sm:pt-14">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-0">
          <p
            className="rise mb-4 inline-flex items-center justify-center gap-2.5 font-serif text-[1rem] font-semibold text-gold sm:mb-5 sm:text-[1.05rem]"
            style={{ animationDelay: '0ms' }}
          >
            <Crown />
            {SITE.name}
          </p>

          <h1
            className="rise m-0 w-full max-w-none text-center font-serif text-[5.5vw] leading-[1.3] tracking-[-0.01em] text-cream md:text-[2.4vw] md:leading-[1.25] xl:text-[36px]"
            style={{ animationDelay: '120ms' }}
          >
            <span className="block md:whitespace-nowrap">
              <span className="block whitespace-nowrap md:inline">
                We Hand-Hold High-Achieving
              </span>{' '}
              <span className="block whitespace-nowrap md:inline">
                Women To Gain Clarity By Clearing
              </span>
            </span>

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

          {/* UPDATED VSL VIDEO */}
          <div
            className="rise mx-auto mt-6 w-full max-w-[576px] sm:mt-10"
            style={{ animationDelay: '300ms' }}
          >
            <VideoCard />
          </div>

          {/* SINGLE CTA: opens Razorpay, then Calendly */}
          <div
            className="rise mx-auto mt-5 w-full max-w-[576px] sm:mt-6"
            style={{ animationDelay: '400ms' }}
          >
            <a
              href={PAY_URL}
              className="flex min-h-[54px] w-full items-center justify-center rounded-[14px] bg-gradient-to-br from-[#e6c987] via-[#c9a45d] to-[#a98539] text-[16px] font-semibold text-black shadow-[0_10px_34px_-8px_rgba(201,164,93,0.8)] transition hover:brightness-110 sm:text-[18px]"
            >
              Book Your Call
            </a>
          </div>
        </div>
      </section>

      {/* HOW TO GET STARTED */}
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
                <Check />
                <span className="min-w-0">{step}</span>
              </li>
            ))}

            <li className="flex list-none items-start gap-3.5 text-[1.02rem] leading-relaxed text-cream/90">
              <Check />
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