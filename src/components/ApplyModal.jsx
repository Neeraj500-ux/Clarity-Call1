import { useEffect, useRef, useState } from 'react'
import { SITE } from '../config'
import { isEmail, submitForm } from '../lib/submit'
import Field from './Field.jsx'

const EMPTY = { name: '', email: '', phone: '', role: '', goal: '', consent: false }

function validate(v) {
  const e = {}
  if (v.name.trim().length < 2) e.name = 'Enter your full name.'
  if (!isEmail(v.email)) e.email = 'Enter a valid email address, like name@example.com.'
  if (v.phone.replace(/\D/g, '').length < 7) e.phone = 'Enter a valid phone or WhatsApp number.'
  if (v.role.trim().length < 2) e.role = 'Tell us what you do.'
  if (v.goal.trim().length < 10) e.goal = 'Write at least a short sentence (10 characters).'
  if (!v.consent) e.consent = 'Please tick the box to continue.'
  return e
}

export default function ApplyModal({ onClose }) {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | mailto | error
  const panelRef = useRef(null)
  const lastFocus = useRef(null)

  // lock scroll, trap focus, close on Escape, restore focus
  useEffect(() => {
    lastFocus.current = document.activeElement
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const focusables = () =>
      panelRef.current
        ? [...panelRef.current.querySelectorAll('button, a[href], input, textarea, select')].filter((n) => !n.disabled)
        : []
    focusables()[1]?.focus()

    const onKey = (ev) => {
      if (ev.key === 'Escape') onClose()
      if (ev.key === 'Tab') {
        const list = focusables()
        if (!list.length) return
        const first = list[0]
        const last = list[list.length - 1]
        if (ev.shiftKey && document.activeElement === first) {
          ev.preventDefault()
          last.focus()
        } else if (!ev.shiftKey && document.activeElement === last) {
          ev.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      lastFocus.current?.focus?.()
    }
  }, [onClose])

  const change = (ev) => {
    const { name, value, type, checked } = ev.target
    setValues((v) => ({ ...v, [name]: type === 'checkbox' ? checked : value }))
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }))
  }

  const submit = async (ev) => {
    ev.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) {
      const firstKey = Object.keys(found)[0]
      panelRef.current?.querySelector(`[name="${firstKey}"]`)?.focus()
      return
    }
    setStatus('sending')
    try {
      const result = await submitForm(`Clarity Call application from ${values.name.trim()}`, {
        Name: values.name.trim(),
        Email: values.email.trim(),
        'Phone / WhatsApp': values.phone.trim(),
        'What I do': values.role.trim(),
        'What I want clarity on': values.goal.trim(),
      })
      setStatus(result)
    } catch {
      setStatus('error')
    }
  }

  const done = status === 'sent' || status === 'mailto'

  return (
    <div
      className="fade-in fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(ev) => ev.target === ev.currentTarget && onClose()}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="apply-title"
        className="pop-in relative max-h-[94dvh] w-full max-w-lg overflow-y-auto rounded-t-3xl border border-gold/30 bg-forest-900 p-6 shadow-2xl sm:rounded-3xl sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close application form"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-cream/70 transition hover:bg-white/10 hover:text-white"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        {done ? (
          <div className="py-6 text-center" role="status">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gold/15 text-gold">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12.5l4.5 4.5L19 7.5" />
              </svg>
            </div>
            <h2 id="apply-title" className="font-serif text-3xl font-semibold text-cream">
              {status === 'sent' ? 'Application received' : 'Your email is ready to send'}
            </h2>
            <p className="mt-3 text-cream/85">
              {status === 'sent'
                ? 'Thank you. We will review your application and contact you if you are a good fit.'
                : `Your email app should have opened with your application filled in. Press send to complete it. If nothing opened, write to us at `}
              {status === 'mailto' && (
                <a className="link-gold" href={`mailto:${SITE.contactEmail}`}>
                  {SITE.contactEmail}
                </a>
              )}
              {status === 'mailto' && '.'}
            </p>
            <button type="button" className="btn-ghost mt-7" onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={submit} noValidate>
            <h2 id="apply-title" className="pr-10 font-serif text-[1.75rem] font-semibold leading-tight text-cream">
              Book Your Call
            </h2>
            <p className="mb-6 mt-2 text-[0.97rem] text-cream/75">
              Complete the application carefully. We review every one and contact you if you are qualified.
            </p>

            <div className="grid gap-4">
              <Field id="name" label="Full name" autoComplete="name" value={values.name} onChange={change} error={errors.name} />
              <Field id="email" type="email" label="Email" autoComplete="email" inputMode="email" value={values.email} onChange={change} error={errors.email} />
              <Field id="phone" type="tel" label="Phone / WhatsApp" autoComplete="tel" inputMode="tel" value={values.phone} onChange={change} error={errors.phone} />
              <Field id="role" label="What do you do?" placeholder="e.g. Founder, coach, consultant" value={values.role} onChange={change} error={errors.role} />
              <Field
                id="goal"
                as="textarea"
                rows={4}
                label="What would you like clarity on?"
                value={values.goal}
                onChange={change}
                error={errors.goal}
              />

              <div>
                <label className="flex cursor-pointer items-start gap-3 text-[0.93rem] leading-snug text-cream/85">
                  <input
                    type="checkbox"
                    name="consent"
                    checked={values.consent}
                    onChange={change}
                    aria-invalid={errors.consent ? 'true' : 'false'}
                    className="mt-0.5 h-5 w-5 shrink-0 accent-[#c9a45d]"
                  />
                  <span>
                    I understand that missed slots are not rescheduled, and I agree to the privacy policy.
                  </span>
                </label>
                {errors.consent && (
                  <p className="field-error" role="alert">
                    {errors.consent}
                  </p>
                )}
              </div>
            </div>

            {status === 'error' && (
              <p className="field-error mt-4" role="alert">
                Something went wrong while sending. Please try again, or email {SITE.contactEmail}.
              </p>
            )}

            <button type="submit" className="btn-gold mt-6 w-full" disabled={status === 'sending'}>
              {status === 'sending' ? 'Sending…' : 'Submit Application'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
