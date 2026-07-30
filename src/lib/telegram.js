/**
 * Shared Telegram notification helper.
 * Centralises HTML-escaping, message formatting, and retry logic.
 */

/**
 * Escapes special HTML characters for Telegram's HTML parse_mode.
 * Telegram only allows <b>, <i>, <u>, <s>, <a>, <code>, <pre> tags.
 * All other < > & characters in user-supplied text MUST be escaped,
 * otherwise the Telegram API rejects the entire message with a 400 error.
 */
export function escapeHtml(text) {
  if (text === null || text === undefined) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Sends a message to Telegram with automatic retry on transient failures.
 * @param {string} text - The message text (can include HTML tags for formatting).
 * @param {object} [options] - Optional settings.
 * @param {string} [options.parseMode='HTML'] - Telegram parse mode.
 * @param {number} [options.retries=2] - Number of retries on failure.
 * @returns {Promise<{ok: boolean, description?: string}>}
 */
export async function sendTelegramMessage(text, options = {}) {
  const { parseMode = 'HTML', retries = 2 } = options;
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    console.error('Telegram credentials missing: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set');
    return { ok: false, description: 'Missing Telegram credentials' };
  }

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  const body = JSON.stringify({
    chat_id: chatId,
    text,
    parse_mode: parseMode,
  });

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
      });

      const data = await response.json();

      if (data.ok) {
        return data;
      }

      // If the error is due to bad HTML formatting, fall back to plain text (no retry needed)
      if (data.description && data.description.includes("can't parse entities")) {
        console.error(`Telegram HTML parse error (attempt ${attempt + 1}): ${data.description}`);
        console.error('Falling back to plain text message...');

        // Strip all HTML tags and send as plain text
        const plainText = text.replace(/<[^>]*>/g, '');
        const plainBody = JSON.stringify({
          chat_id: chatId,
          text: plainText,
        });

        const plainResponse = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: plainBody,
        });
        const plainData = await plainResponse.json();
        if (!plainData.ok) {
          console.error('Telegram plain text fallback also failed:', plainData.description);
        }
        return plainData;
      }

      console.error(`Telegram send failed (attempt ${attempt + 1}/${retries + 1}): ${data.description}`);

      // Don't retry on client errors (except rate limits)
      if (response.status >= 400 && response.status < 500 && response.status !== 429) {
        return data;
      }

      // Wait before retrying (exponential backoff)
      if (attempt < retries) {
        await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
      }
    } catch (err) {
      console.error(`Telegram fetch error (attempt ${attempt + 1}/${retries + 1}):`, err);
      if (attempt < retries) {
        await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
      }
    }
  }

  return { ok: false, description: 'All retry attempts exhausted' };
}

/**
 * Formats and sends an order notification to Telegram.
 * All user-supplied values are HTML-escaped to prevent parse failures.
 */
export async function sendOrderNotification(order, serialNumber, finalDeliveryText, itemsText) {
  const user = order.user;
  const address = user.addresses && user.addresses.length > 0 ? user.addresses[0] : null;
  const addressText = address
    ? escapeHtml(`${address.addressLine1}${address.addressLine2 ? ', ' + address.addressLine2 : ''}, ${address.city} - ${address.postalCode}`)
    : 'N/A';

  const message = `
<b>NEW ORDER RECEIVED! (Daily #${serialNumber})</b>

<b>Daily Order No:</b> #${serialNumber}
<b>System ID:</b> ${escapeHtml(order.id)}
<b>Razorpay ID:</b> ${escapeHtml(order.razorpayOrderId)}
<b>Customer:</b> ${escapeHtml(user.firstName)} ${escapeHtml(user.lastName)}
<b>Phone:</b> ${escapeHtml(user.phone || 'N/A')}
<b>Address:</b> ${addressText}
<b>Amount Paid:</b> ₹${order.totalAmount}
<b>Delivery:</b> ${escapeHtml(finalDeliveryText)}
${order.notes ? `\n<b>Special Instructions:</b>\n${escapeHtml(order.notes)}\n` : ''}
<b>Items Ordered:</b>
${itemsText}
  `.trim();

  return sendTelegramMessage(message);
}

/**
 * Formats and sends a payment failure notification to Telegram.
 */
export async function sendPaymentFailedNotification(order, errorDescription) {
  const message = `
<b>PAYMENT FAILED!!</b>

<b>System ID:</b> ${escapeHtml(order.id)}
<b>Razorpay ID:</b> ${escapeHtml(order.razorpayOrderId)}
<b>Customer:</b> ${escapeHtml(order.user.firstName)} ${escapeHtml(order.user.lastName)}
<b>Phone:</b> ${escapeHtml(order.user.phone || 'N/A')}
<b>Amount:</b> ₹${order.totalAmount}
<b>Error:</b> ${escapeHtml(errorDescription || 'Unknown error')}
  `.trim();

  return sendTelegramMessage(message);
}
