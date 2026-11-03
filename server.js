import 'dotenv/config'
import express from 'express'
import createOrder from './api/create-order.js'
import verifyPayment from './api/verify-payment.js'

const app = express()
app.use(express.json())

app.post('/api/create-order', createOrder)
app.post('/api/verify-payment', verifyPayment)

const PORT = process.env.API_PORT || 3001
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`))