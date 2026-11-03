import Razorpay from 'razorpay'

const AMOUNT_PAISE = 49 * 100 // Rs 49 (amount is fixed on the server)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET } = process.env
  if (!RAZORPAY_KEY_ID || !RAZORPAY_KEY_SECRET) {
    return res.status(500).json({ error: 'Server is missing Razorpay credentials' })
  }

  if (AMOUNT_PAISE < 100) {
    return res.status(400).json({ error: 'Amount must be at least 100 paise' })
  }

  try {
    const razorpay = new Razorpay({
      key_id: RAZORPAY_KEY_ID,
      key_secret: RAZORPAY_KEY_SECRET,
    })

    const order = await razorpay.orders.create({
      amount: AMOUNT_PAISE,
      currency: 'INR',
      receipt: `rcpt_${Date.now()}`,
    })

    return res.status(200).json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
    })
  } catch (err) {
    if (err?.statusCode === 401) {
      return res.status(401).json({ error: 'Razorpay authentication failed' })
    }
    console.error('create-order error:', err)
    return res.status(500).json({ error: 'Could not create order' })
  }
}