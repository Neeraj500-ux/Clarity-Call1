import { useState } from 'react'
import { SITE } from '../config'
import { isEmail, submitForm } from '../lib/submit'
import Field from '../components/Field.jsx'
import PolicyPage from '../components/PolicyPage.jsx'

const EMPTY = { name: '', email: '', message: '' }

export default function Contact() {
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const change = (ev) => {
    const { name, value } = ev.target
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name]) setErrors((e) => ({ ...e, [name]: undefined }))
  }

  const submit = async (ev) => {
    ev.preventDefault()
    const found = {}
    if (values.name.trim().length < 2) found.name = 'Enter your name.'
    if (!isEmail(values.email)) found.email = 'Enter a valid email address, like name@example.com.'
    if (values.message.trim().length < 10) found.message = 'Write at least a short sentence (10 characters).'
    setErrors(found)
    if (Object.keys(found).length) return
    setStatus('sending')
    try {
      const result = await submitForm(`Message from ${values.name.trim()}`, {
        Name: values.name.trim(),
        Email: values.email.trim(),
        Message: values.message.trim(),
      })
      setStatus(result)
      if (result === 'sent') setValues(EMPTY)
    } catch {
      setStatus('error')
    }
  }

  return (
    <PolicyPage
      title="Contact Us"
      updated={null}
      intro="We would love to hear from you. Email us or use the form below, and we will reply within 2 business days."
      sections={[{ h: 'Email', body: ['{email}'] }]}
    >
      <h2>Send a message</h2>
      <form onSubmit={submit} noValidate className="mt-2 grid gap-4 rounded-3xl border border-gold/20 bg-white/[0.035] p-5 sm:p-7">
        <Field id="name" label="Your name" autoComplete="name" value={values.name} onChange={change} error={errors.name} />
        <Field id="email" type="email" label="Email" autoComplete="email" inputMode="email" value={values.email} onChange={change} error={errors.email} />
        <Field id="message" as="textarea" rows={5} label="Message" value={values.message} onChange={change} error={errors.message} />

        {status === 'sent' && (
          <p role="status" className="text-[0.97rem] text-gold-light">
            Thank you. Your message was sent and we will reply soon.
          </p>
        )}
        {status === 'mailto' && (
          <p role="status" className="text-[0.97rem] text-gold-light">
            Your email app should have opened with your message ready. Press send to complete it, or write to us at{' '}
            <a className="link-gold" href={`mailto:${SITE.contactEmail}`}>
              {SITE.contactEmail}
            </a>
            .
          </p>
        )}
        {status === 'error' && (
          <p role="alert" className="field-error">
            Something went wrong while sending. Please try again, or email {SITE.contactEmail}.
          </p>
        )}

        <button type="submit" className="btn-gold w-full sm:w-auto sm:justify-self-start" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : 'Send Message'}
        </button>
      </form>
    </PolicyPage>
  )
}
