// Email utility wired for Resend
// Set RESEND_API_KEY in .env to enable

export async function sendEmail({ to, subject, html, from }) {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey || apiKey === 'your_resend_api_key_here') {
    console.log('[EMAIL] Resend not configured. Would send to:', to, '| Subject:', subject)
    return { success: false, message: 'Email not configured - add RESEND_API_KEY to .env' }
  }
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: from || process.env.EMAIL_FROM || 'Sparkright Cleaning <noreply@yourdomain.com>',
        to: Array.isArray(to) ? to : [to],
        subject,
        html,
      }),
    })
    const data = await res.json()
    return { success: res.ok, data }
  } catch (error) {
    console.error('[EMAIL] Send failed:', error)
    return { success: false, error: error.message }
  }
}

export function bookingConfirmationHtml(b) {
  return `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px">
    <div style="text-align:center;margin-bottom:24px">
      <h1 style="color:#0d9488;margin:0">Booking Confirmed!</h1>
    </div>
    <p>Hi ${b.customerName},</p>
    <p>Your <strong>${b.serviceType}</strong> cleaning has been booked!</p>
    <div style="background:#f0fdfa;padding:20px;border-radius:12px;margin:20px 0">
      <p style="margin:8px 0"><strong>Date:</strong> ${b.dateTime}</p>
      <p style="margin:8px 0"><strong>Address:</strong> ${b.address}, ${b.zip}</p>
      <p style="margin:8px 0"><strong>Home Size:</strong> ${b.homeSize}</p>
      ${b.addOns?.length ? `<p style="margin:8px 0"><strong>Add-ons:</strong> ${b.addOns.join(', ')}</p>` : ''}
    </div>
    <p>We'll send you a reminder before your appointment.</p>
    <p style="color:#64748b;font-size:14px">Thank you for choosing Sparkright Cleaning!</p>
  </div>`
}

export function quoteConfirmationHtml(q) {
  return `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px">
    <h1 style="color:#0d9488">We Got Your Quote Request!</h1>
    <p>Hi ${q.name},</p>
    <p>We received your request for a <strong>${q.serviceType}</strong> quote.</p>
    <p>Our team will review it and get back to you within 24 hours.</p>
    <p style="color:#64748b;font-size:14px">Thank you for choosing Sparkright Cleaning!</p>
  </div>`
}

export function adminNotificationHtml(type, data) {
  return `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px">
    <h1 style="color:#0d9488">New ${type}!</h1>
    <pre style="background:#f8fafc;padding:16px;border-radius:8px;overflow:auto">${JSON.stringify(data, null, 2)}</pre>
  </div>`
}

export async function sendViaWeb3Forms(data) {
  const key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY
  if (!key || key === 'your_web3forms_access_key_here') {
    console.log('[WEB3FORMS] Not configured. Would send:', data)
    return { success: false, message: 'Web3Forms not configured' }
  }
  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ access_key: key, ...data }),
    })
    const result = await res.json()
    return { success: result.success, data: result }
  } catch (error) {
    console.error('[WEB3FORMS] Failed:', error)
    return { success: false, error: error.message }
  }
}
