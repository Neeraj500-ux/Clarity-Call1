<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['error' => 'Method not allowed']);
  exit;
}

$config = require __DIR__ . '/config.php';

// Amount in paise. 49 * 100 = Rs 49. Change to your real price before launch.
$amount = 49 * 100;

if (empty($config['key_id']) || empty($config['key_secret'])) {
  http_response_code(500);
  echo json_encode(['error' => 'Server is missing Razorpay credentials']);
  exit;
}

$ch = curl_init('https://api.razorpay.com/v1/orders');
curl_setopt_array($ch, [
  CURLOPT_POST           => true,
  CURLOPT_POSTFIELDS     => json_encode([
    'amount'   => $amount,
    'currency' => 'INR',
    'receipt'  => 'rcpt_' . time(),
  ]),
  CURLOPT_HTTPHEADER     => ['Content-Type: application/json'],
  CURLOPT_USERPWD        => $config['key_id'] . ':' . $config['key_secret'],
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_TIMEOUT        => 20,
]);

$res  = curl_exec($ch);
$code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($res === false) {
  http_response_code(502);
  echo json_encode(['error' => 'Could not reach Razorpay']);
  exit;
}

$order = json_decode($res, true);

if ($code === 401) {
  http_response_code(401);
  echo json_encode(['error' => 'Razorpay authentication failed']);
  exit;
}

if ($code !== 200 || empty($order['id'])) {
  http_response_code(500);
  echo json_encode(['error' => 'Could not create order']);
  exit;
}

echo json_encode([
  'order_id' => $order['id'],
  'amount'   => $order['amount'],
  'currency' => $order['currency'],
]);