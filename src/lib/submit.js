import { SITE } from '../config'

/**
 * Sends a form either to the configured endpoint (if any) or opens
 * the visitor's email app with a pre-filled message.
 * Resolves to 'sent' or 'mailto'. Rejects when the endpoint fails.
 */
export async function submitForm(subject, fields) {
  if (SITE.formEndpoint) {
    const res = await fetch(SITE.formEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ subject, ...fields }),
    })
    if (!res.ok) throw new Error('Request failed')
    return 'sent'
  }

  const body = Object.entries(fields)
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n')
  const href = `mailto:${SITE.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  window.location.href = href
  return 'mailto'
}

export const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())
