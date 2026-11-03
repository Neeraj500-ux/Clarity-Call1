import crypto from 'crypto'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body || {}

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ success: false, error: 'Missing fields' })
  }

  const secret = process.env.RAZORPAY_KEY_SECRET
  if (!secret) {
    return res.status(500).json({ success: false, error: 'Server misconfigured' })
  }

  const expected = crypto
    .createHmac('sha256', secret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex')

  const a = Buffer.from(expected)
  const b = Buffer.from(String(razorpay_signature))
  const valid = a.length === b.length && crypto.timingSafeEqual(a, b)

  if (!valid) {
    return res.status(400).json({ success: false, error: 'Invalid signature' })
  }

  return res.status(200).json({ success: true })
}