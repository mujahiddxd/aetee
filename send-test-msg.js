const token = '8952038132:AAHKB-GZ2aqMZlxPb5t04bUR8aPgbp4ZcNg';
const chat = '5531994902';
const message = `
🎉 <b>NEW ORDER RECEIVED! (Daily #123)</b> 🎉

<b>Daily Order No:</b> #123
<b>System ID:</b> 123e4567-e89b-12d3-a456-426614174000
<b>Razorpay ID:</b> order_abc123_test
<b>Customer:</b> John Doe
<b>Phone:</b> +919876543210
<b>Address:</b> 123 Main St, Mumbai - 400001
<b>Amount Paid:</b> ₹499.00
📅 <b>Delivery Date:</b> 20/07/2026
🚚 <b>Delivery:</b> SAME DAY (2026-07-20)
📝 <b>Special Instructions:</b>
Please leave it at the front door_thanks!

<b>Items Ordered:</b>
1. Classic Bombay Mawa Cake [Size: Large] - Qty: 2 (₹200.00)
`.trim();

fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ chat_id: chat, text: message, parse_mode: 'HTML' })
}).then(res => res.text()).then(console.log);
