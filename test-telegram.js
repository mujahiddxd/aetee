const token = '8952038132:AAHKB-GZ2aqMZlxPb5t04bUR8aPgbp4ZcNg';
const chat = '5531994902';
const message = `
*Daily Order No:* #123
*System ID:* 123e4567-e89b-12d3-a456-426614174000
*Razorpay ID:* order_abc123
*Customer:* John Doe
`;
fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ chat_id: chat, text: message, parse_mode: 'Markdown' })
}).then(res => res.text()).then(console.log);
