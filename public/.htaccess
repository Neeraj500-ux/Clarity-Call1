<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['success' => false, 'error' => 'Method not allowed']);
  exit;
}

$config = require __DIR__ . '/config.php';
$body   = json_decode(file_get_contents('php://input'), true) ?: [];

$orderId   = $body['razorpay_order_id']   ?? '';
$paymentId = $body['razorpay_payment_id'] ?? '';
$signature = $body['razorpay_signature']  ?? '';

if (!$orderId || !$paymentId || !$signature) {
  http_response_code(400);
  echo json_encode(['success' => false, 'error' => 'Missing fields']);
  exit;
}

if (empty($config['key_secret'])) {
  http_response_code(500);
  echo json_encode(['success' => false, 'error' => 'Server misconfigured']);
  exit;
}

$expected = hash_hmac('sha256', $orderId . '|' . $paymentId, $config['key_secret']);

if (!hash_equals($expected, (string)$signature)) {
  http_response_code(400);
  echo json_encode(['success' => false, 'error' => 'Invalid signature']);
  exit;
}

echo json_encode(['success' => true]);