import { useRef, useState } from 'react'
import { SITE } from '../config'
import BookButton from '../components/BookButton.jsx'
import Reveal from '../components/Reveal.jsx'
import { usePageTitle } from '../components/PolicyPage.jsx'

// Used when SITE.videoEmbedUrl is empty.
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
  const ref = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [playError, setPlayError] = useState(false)

  const play = async () => {
    const video = ref.current
    if (!video) return

    setPlayError(false)

    try {
      await video.play()
    } catch {
      setPlaying(false)
      setPlayError(true)
    }
  }

  return (
    <div className="home-video-card">
      {SITE.videoEmbedUrl ? (
        <iframe
          src={SITE.videoEmbedUrl}
          title={`${SITE.name} video`}
          className="home-video-media"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          loading="lazy"
        />
      ) : (
        <>
          <video
            ref={ref}
            src={DUMMY_VIDEO}
            className="home-video-media"
            controls={playing || playError}
            playsInline
            preload="metadata"
            onPlay={() => {
              setPlaying(true)
              setPlayError(false)
            }}
            onPause={() => setPlaying(false)}
            onEnded={() => setPlaying(false)}
          />

          {!playing && !playError && (
            <button
              type="button"
              onClick={play}
              aria-label="Play video"
              className="home-video-overlay"
            >
              <span className="home-video-play">
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M8 5.5v13l11-6.5z" />
                </svg>
              </span>
            </button>
          )}
        </>
      )}
    </div>
  )
}

export default function Home() {
  usePageTitle('')

  return (
    <>
      <style>{`
        .home-hero {
          padding: 40px 20px 48px;
          text-align: center;
        }

        .home-hero-inner {
          width: 100%;
          max-width: 960px;
          margin-inline: auto;
        }

        .home-main-heading {
          width: 100%;
          max-width: 920px;
          margin: 22px auto 0;
          font-size: clamp(1.35rem, 3.1vw, 2.25rem);
          font-weight: 500;
          line-height: 1.3;
          letter-spacing: -0.015em;
          overflow-wrap: break-word;
        }

        .home-heading-highlight {
          display: block;
          margin-top: 3px;
        }

        .home-guarantee {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          width: 100%;
          max-width: 640px;
          margin: 24px auto 0;
        }

        .home-guarantee-line {
          flex: 1 1 0;
          min-width: 0;
          height: 1px;
        }

        .home-guarantee-text {
          flex: 0 1 auto;
          min-width: 0;
          margin: 0;
          font-size: 14px;
          font-weight: 600;
          line-height: 1.5;
        }

        .home-video-wrap {
          width: 100%;
          max-width: 768px;
          margin: 30px auto 0;
        }

        .home-video-card {
          position: relative;
          isolation: isolate;
          width: 100%;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          border: 1px solid rgba(201, 164, 93, 0.65);
          border-radius: 18px;
          background: #000;
          box-shadow: 0 24px 65px -28px rgba(0, 0, 0, 0.8);
        }

        .home-video-media {
          position: absolute;
          inset: 0;
          display: block;
          width: 100%;
          height: 100%;
          border: 0;
          object-fit: contain;
          background: #000;
        }

        .home-video-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          display: grid;
          width: 100%;
          height: 100%;
          padding: 0;
          place-items: center;
          border: 0;
          background: rgba(0, 0, 0, 0.22);
          cursor: pointer;
          transition: background 200ms ease;
        }

        .home-video-overlay:hover {
          background: rgba(0, 0, 0, 0.12);
        }

        .home-video-overlay:focus-visible {
          outline: 2px solid #e9d49b;
          outline-offset: -5px;
        }

        .home-video-play {
          display: grid;
          width: 70px;
          height: 70px;
          place-items: center;
          border: 1px solid rgba(243, 226, 179, 0.65);
          border-radius: 50%;
          color: #fff;
          background: linear-gradient(
            135deg,
            #e9d49b 0%,
            #b48a45 55%,
            #8a6528 100%
          );
          box-shadow: 0 10px 30px -6px rgba(0, 0, 0, 0.7);
          transition: transform 200ms ease;
        }

        .home-video-play svg {
          transform: translateX(2px);
        }

        .home-video-overlay:hover .home-video-play {
          transform: scale(1.06);
        }

        .home-book-wrap {
          width: 100%;
          max-width: 768px;
          margin: 26px auto 0;
        }

        @media (min-width: 640px) {
          .home-hero {
            padding-top: 56px;
            padding-bottom: 64px;
          }
        }

        @media (max-width: 639px) {
          .home-hero {
            padding: 30px 16px 38px;
          }

          .home-main-heading {
            margin-top: 18px;
            font-size: clamp(1.25rem, 5.3vw, 1.65rem);
            line-height: 1.35;
            letter-spacing: -0.01em;
          }

          .home-heading-highlight {
            margin-top: 5px;
          }

          .home-guarantee {
            gap: 8px;
            margin-top: 20px;
          }

          .home-guarantee-text {
            font-size: 12px;
          }

          .home-video-wrap {
            margin-top: 24px;
          }

          .home-video-card {
            border-radius: 12px;
          }

          .home-video-play {
            width: 54px;
            height: 54px;
          }

          .home-video-play svg {
            width: 22px;
            height: 22px;
          }

          .home-book-wrap {
            margin-top: 20px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .home-video-overlay,
          .home-video-play {
            transition: none;
          }

          .home-video-overlay:hover .home-video-play {
            transform: none;
          }
        }
      `}</style>

      <section className="home-hero !px-4 !py-10 sm:!px-6 md:!py-12">
        <div className="home-hero-inner !mx-auto !flex !w-full !max-w-[1280px] !flex-col !items-center !gap-0">
          <p
            className="rise mb-5 inline-flex items-center justify-center gap-2.5 font-serif text-[1.05rem] font-semibold text-gold"
            style={{ animationDelay: '0ms' }}
          >
            <Crown />
            {SITE.name}
          </p>

          <h1
            className="rise !m-0 w-full max-w-none text-center font-serif text-[27px] leading-[1.25] text-cream sm:text-[32px] md:text-[2.25vw] xl:text-[29px]"
            style={{ animationDelay: '120ms' }}
          >
            <span className="block md:whitespace-nowrap">
              We Hand-Hold High-Achieving Women To Gain Clarity By Clearing
            </span>

            <span className="mt-1 block text-gold md:whitespace-nowrap">
              The Unseen Blocks Holding Them Back
            </span>
          </h1>

          <div
            className="rise mt-6 flex w-full max-w-[500px] items-center justify-center gap-3 sm:gap-4"
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
            className="rise mx-auto mt-7 aspect-video w-full max-w-[576px] overflow-hidden rounded-[20px] border border-gold/70 sm:mt-10 [&>*]:!m-0 [&>*]:!h-full [&>*]:!w-full [&>*]:!max-w-none [&_video]:!h-full [&_video]:!w-full [&_video]:!object-cover [&_iframe]:!h-full [&_iframe]:!w-full"
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