import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { SITE } from '../config'
import Reveal from '../components/Reveal.jsx'
import { usePageTitle } from '../components/PolicyPage.jsx'

const VIMEO_URL =
  'https://player.vimeo.com/video/1240119109?title=0&byline=0&portrait=0&dnt=1&controls=0&api=1'

/* ------------------------------------------------------------------ */
/* SETTINGS                                                            */
/* Flow: Button -> One Last Check -> Razorpay popup (same screen)      */
/*       -> Calendly popup (same screen) -> /thank-you                 */
/* ------------------------------------------------------------------ */

// Razorpay Dashboard -> Account & Settings -> API Keys -> "Key Id"
// Test: rzp_test_...   |   Live: rzp_live_...
// Only Key Id here. Never put Key Secret in frontend.
const RAZORPAY_KEY_ID = 'rzp_test_XXXXXXXXXXXXXX'

// Amount in rupees (49 = Rs 49)
const AMOUNT_INR = 49

const CALENDLY_URL = 'https://calendly.com/induravish'

const GOLD_BUTTON =
  'bg-gradient-to-br from-[#e6c987] via-[#c9a45d] to-[#a98539] shadow-[0_10px_34px_-8px_rgba(201,164,93,0.8)]'

/* Page background: same dark green look as before */
const PAGE_BG = {
  backgroundColor: '#04120c',
  backgroundImage: [
    // soft green glow at the top centre
    'radial-gradient(ellipse 70% 55% at 50% 0%, rgba(20, 78, 56, 0.55) 0%, rgba(10, 40, 29, 0.35) 45%, rgba(4, 18, 12, 0) 75%)',
    // faint concentric rings (the subtle pattern behind the headline)
    'repeating-radial-gradient(circle at 50% 12%, rgba(201, 164, 93, 0.045) 0px, rgba(201, 164, 93, 0.045) 1px, transparent 1px, transparent 46px)',
    // base dark green vertical gradient
    'linear-gradient(180deg, #0a2a1e 0%, #06180f 45%, #030d08 100%)',
  ].join(', '),
  backgroundAttachment: 'fixed',
}

const steps = [
  'Click the button above, confirm you are a fit, and secure your spot.',
  'After payment, book your call on the calendar.',
  'I personally review every application and reach out if it feels like the right fit.',
  'If you miss your scheduled call without notice, your spot goes to the next woman on the waitlist.',
  'I take only 6 women a month for private 1:1 work — this is deep work, and I can’t do it at scale.',
  'The next cohort begins 15th August 2026 — only 3 spots left.',
]

/* ------------------------------------------------------------------ */
/* Script loaders (Razorpay + Calendly)                                */
/* ------------------------------------------------------------------ */

const scriptCache = {}

function loadScript(src) {
  if (scriptCache[src]) return scriptCache[src]

  scriptCache[src] = new Promise((resolve, reject) => {
    const s = document.createElement('script')
    s.src = src
    s.async = true
    s.onload = () => resolve()
    s.onerror = () => {
      delete scriptCache[src]
      reject(new Error(`Failed to load ${src}`))
    }
    document.body.appendChild(s)
  })

  return scriptCache[src]
}

function loadCss(href) {
  if (document.querySelector(`link[href="${href}"]`)) return
  const l = document.createElement('link')
  l.rel = 'stylesheet'
  l.href = href
  document.head.appendChild(l)
}

function loadRazorpay() {
  return loadScript('https://checkout.razorpay.com/v1/checkout.js')
}

function loadCalendly() {
  loadCss('https://assets.calendly.com/assets/external/widget.css')
  return loadScript('https://assets.calendly.com/assets/external/widget.js')
}

/* ------------------------------------------------------------------ */
/* Icons                                                               */
/* ------------------------------------------------------------------ */

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
    <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
      <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z" />
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
      <rect x="6" y="5" width="4.2" height="14" rx="1.2" />
      <rect x="13.8" y="5" width="4.2" height="14" rx="1.2" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/* Video                                                               */
/* ------------------------------------------------------------------ */

function VideoCard() {
  const src = SITE.videoEmbedUrl || VIMEO_URL
  const iframeRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  const send = (method, value) => {
    const win = iframeRef.current?.contentWindow
    if (!win) return
    win.postMessage(JSON.stringify({ method, value }), 'https://player.vimeo.com')
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

      if (data.event === 'play') setPlaying(true)
      if (data.event === 'pause' || data.event === 'ended' || data.event === 'finish') {
        setPlaying(false)
      }
    }

    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
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
          className={`flex h-[60px] w-[60px] items-center justify-center rounded-full bg-gradient-to-br from-[#e6c987] via-[#c9a45d] to-[#a98539] shadow-[0_10px_34px_-8px_rgba(201,164,93,0.8),inset_0_1px_0_rgba(255,255,255,0.45)] ring-1 ring-white/20 transition-all duration-300 sm:h-[72px] sm:w-[72px] ${playing ? 'scale-90 opacity-0' : 'scale-100 opacity-100'
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

/* ------------------------------------------------------------------ */
/* Popups                                                              */
/* ------------------------------------------------------------------ */

const popupCss = `
@keyframes check-overlay-in { from { opacity: 0 } to { opacity: 1 } }
@keyframes check-overlay-out { from { opacity: 1 } to { opacity: 0 } }
@keyframes check-card-in {
  from { opacity: 0; transform: translateY(24px) scale(0.95); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes check-card-out {
  from { opacity: 1; transform: translateY(0) scale(1); }
  to   { opacity: 0; transform: translateY(16px) scale(0.96); }
}
.check-overlay-in  { animation: check-overlay-in 0.25s ease-out both; }
.check-overlay-out { animation: check-overlay-out 0.2s ease-in both; }
.check-card-in     { animation: check-card-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) both; }
.check-card-out    { animation: check-card-out 0.2s ease-in both; }
@media (prefers-reduced-motion: reduce) {
  .check-overlay-in, .check-overlay-out,
  .check-card-in, .check-card-out { animation: none !important; }
}
`

const cardBg =
  'linear-gradient(160deg, rgba(14, 58, 42, 0.95) 0%, rgba(8, 30, 22, 0.98) 55%, rgba(10, 24, 19, 0.99) 100%)'

// "One Last Check" popup
function LastCheckPopup({ onClose, onContinue, loading, error }) {
  const [confirmed, setConfirmed] = useState(false)
  const [closing, setClosing] = useState(false)

  const requestClose = useCallback(() => {
    setClosing(true)
    setTimeout(onClose, 200)
  }, [onClose])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') requestClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [requestClose])

  const handleContinue = () => {
    if (!confirmed || loading) return
    onContinue()
  }

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center overflow-y-auto px-4 py-6 backdrop-blur-sm ${closing ? 'check-overlay-out' : 'check-overlay-in'
        }`}
      style={{ backgroundColor: 'rgba(2, 12, 8, 0.85)' }}
      onClick={requestClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="check-title"
    >
      <style>{popupCss}</style>

      <div
        className={`relative w-full max-w-[480px] rounded-3xl border border-gold/60 p-6 text-left shadow-[0_30px_80px_-30px_rgba(0,0,0,0.95)] sm:p-9 ${closing ? 'check-card-out' : 'check-card-in'
          }`}
        style={{ background: cardBg }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={requestClose}
          aria-label="Close"
          className="absolute right-5 top-5 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-0 bg-transparent text-2xl leading-none text-cream/80 transition hover:text-cream"
        >
          ×
        </button>

        <h2
          id="check-title"
          className="m-0 pr-8 font-serif text-[1.8rem] font-semibold leading-tight text-gold sm:text-[2.1rem]"
        >
          One Last Check
        </h2>

        <p className="mt-4 text-[1rem] font-medium leading-relaxed text-cream/95">
          This is an exclusive program for people who are ready to invest in themselves.
          If that is you, confirm below to book your call.
        </p>

        <label className="mt-5 flex cursor-pointer items-start gap-3 text-[1rem] font-medium leading-relaxed text-cream/95">
          <input
            type="checkbox"
            checked={confirmed}
            onChange={(e) => setConfirmed(e.target.checked)}
            className="mt-1 h-5 w-5 shrink-0 cursor-pointer rounded accent-[#c9a45d]"
          />
          <span>
            Yes, I am currently earning a monthly income. Yes, I am ready to invest.
          </span>
        </label>

        {error && (
          <p
            className="mt-4 rounded-xl border border-red-400/40 bg-red-500/10 px-4 py-2.5 text-sm text-red-300"
            role="alert"
          >
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={handleContinue}
          disabled={!confirmed || loading}
          className={`mt-6 flex min-h-[56px] w-full items-center justify-center rounded-2xl border-0 px-4 text-[16px] font-semibold text-[#0a1a13] transition sm:text-[17px] ${GOLD_BUTTON} ${confirmed && !loading
            ? 'cursor-pointer hover:brightness-110'
            : 'cursor-not-allowed opacity-50'
            }`}
        >
          {loading ? 'Opening payment...' : 'Continue to Book Your Call'}
        </button>

        <p className="mt-5 text-center text-[12.5px] leading-relaxed text-cream/70">
          By continuing, you agree to receive updates about your booking from{' '}
          {SITE.name} on WhatsApp, email and phone.
        </p>

        <p className="mt-3 text-center text-[12.5px] leading-relaxed text-cream/70">
          100% confidential. This is only to ensure the right fit.
        </p>
      </div>
    </div>
  )
}

// Shown after successful payment. Calendly opens automatically,
// this card is a backup in case the person closes the Calendly popup.
function PaidPopup({ onBook }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <div
      className="check-overlay-in fixed inset-0 z-40 flex items-center justify-center overflow-y-auto px-4 py-6 backdrop-blur-sm"
      style={{ backgroundColor: 'rgba(2, 12, 8, 0.85)' }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="paid-title"
    >
      <style>{popupCss}</style>

      <div
        className="check-card-in relative w-full max-w-[480px] rounded-3xl border border-gold/60 p-6 text-center shadow-[0_30px_80px_-30px_rgba(0,0,0,0.95)] sm:p-9"
        style={{ background: cardBg }}
      >
        <div className="mb-3 flex justify-center">
          <Crown />
        </div>

        <h2
          id="paid-title"
          className="m-0 font-serif text-[1.8rem] font-semibold leading-tight text-gold sm:text-[2.1rem]"
        >
          Payment Received
        </h2>

        <p className="mt-4 text-[1rem] font-medium leading-relaxed text-cream/95">
          Your spot is secured. Now pick a time for your call. If the calendar
          closed, tap the button below to open it again.
        </p>

        <button
          type="button"
          onClick={onBook}
          className={`mt-6 flex min-h-[56px] w-full cursor-pointer items-center justify-center rounded-2xl border-0 px-4 text-[16px] font-semibold text-[#0a1a13] transition hover:brightness-110 sm:text-[17px] ${GOLD_BUTTON}`}
        >
          Pick Your Call Time
        </button>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Home() {
  usePageTitle('')
  const navigate = useNavigate()

  const [popupOpen, setPopupOpen] = useState(false)
  const [paid, setPaid] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Calendly popup (same screen)
  const openCalendly = useCallback(async () => {
    try {
      await loadCalendly()
      window.Calendly.initPopupWidget({ url: CALENDLY_URL })
    } catch {
      window.open(CALENDLY_URL, '_blank', 'noopener,noreferrer')
    }
  }, [])

  // When the call is booked in Calendly -> go to Thank You page
  useEffect(() => {
    const onMessage = (e) => {
      if (!e.origin.includes('calendly.com')) return
      if (e.data?.event === 'calendly.event_scheduled') {
        try {
          window.Calendly?.closePopupWidget()
        } catch {
          // ignore
        }
        setPaid(false)
        navigate('/thank-you')
      }
    }

    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [navigate])

  // Razorpay popup (same screen, never leaves the page)
  const startPayment = async () => {
    setError('')

    if (!RAZORPAY_KEY_ID || RAZORPAY_KEY_ID.includes('XXXX')) {
      setError(
        'Razorpay Key Id add nahi hui hai. Home.jsx me RAZORPAY_KEY_ID me apni asli Key Id daalo.'
      )
      return
    }

    setLoading(true)

    try {
      await loadRazorpay()
    } catch {
      setLoading(false)
      setError('Payment window could not load. Check your internet and try again.')
      return
    }

    const options = {
      key: RAZORPAY_KEY_ID,
      amount: AMOUNT_INR * 100, // paise
      currency: 'INR',
      name: SITE.name,
      description: 'Secure your spot',
      theme: { color: '#c9a45d' },
      handler: () => {
        setPopupOpen(false)
        setLoading(false)
        setPaid(true)
        openCalendly()
      },
      modal: {
        ondismiss: () => setLoading(false),
      },
    }

    try {
      const rzp = new window.Razorpay(options)
      rzp.on('payment.failed', (res) => {
        setLoading(false)
        setError(res?.error?.description || 'Payment failed. Please try again.')
      })
      rzp.open()
    } catch {
      setLoading(false)
      setError('Could not open payment. Please try again.')
    }
  }

  return (
    <div className="min-h-screen" style={PAGE_BG}>
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

          {/* VSL VIDEO */}
          <div
            className="rise mx-auto mt-6 w-full max-w-[576px] sm:mt-10"
            style={{ animationDelay: '300ms' }}
          >
            <VideoCard />
          </div>

          {/* SINGLE CTA */}
          <div
            className="rise mx-auto mt-5 w-full max-w-[576px] sm:mt-6"
            style={{ animationDelay: '400ms' }}
          >
            <button
              type="button"
              onClick={() => {
                setError('')
                setPopupOpen(true)
              }}
              className={`flex min-h-[54px] w-full cursor-pointer items-center justify-center gap-2 rounded-[14px] border-0 text-[16px] font-semibold text-black transition hover:brightness-110 sm:text-[18px] ${GOLD_BUTTON}`}
            >
              Book Your Call <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </section>

      {/* HOW TO GET STARTED */}
      <section className="px-5 pb-20 sm:pb-28" aria-labelledby="get-started">
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
                <a className="link-gold break-all" href={`mailto:${SITE.contactEmail}`}>
                  {SITE.contactEmail}
                </a>
              </span>
            </li>
          </ul>
        </Reveal>
      </section>

      {popupOpen && !paid && (
        <LastCheckPopup
          onClose={() => {
            setPopupOpen(false)
            setLoading(false)
            setError('')
          }}
          onContinue={startPayment}
          loading={loading}
          error={error}
        />
      )}

      {paid && <PaidPopup onBook={openCalendly} />}
    </div>
  )
}