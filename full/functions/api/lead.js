// Cloudflare Pages Function: POST /api/lead
// Robust body parsing (JSON or form-encoded), optional captcha, DRY_RUN for preview.

function esc(str = '') {
  return String(str).replace(/[&<>"]/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[s]));
}
const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), { status, headers: { 'content-type': 'application/json' } });

async function parseBody(request) {
  const ct = (request.headers.get('content-type') || '').toLowerCase();

  // 1) Proper JSON
  if (ct.includes('application/json')) {
    try { return await request.json(); } catch { /* fall through */ }
  }
  // 2) Form POST (application/x-www-form-urlencoded or multipart/form-data)
  if (ct.includes('application/x-www-form-urlencoded') || ct.includes('multipart/form-data')) {
    try {
      const form = await request.formData();
      return Object.fromEntries(form.entries());
    } catch { /* fall through */ }
  }
  // 3) Fallback: try text -> JSON
  try {
    const txt = await request.text();
    if (!txt) return {};
    return JSON.parse(txt);
  } catch {
    return {};
  }
}

export async function onRequest({ request, env }) {
  console.log('API /lead called, method:', request.method);
  
  if (request.method !== 'POST') {
    console.log('Method not allowed:', request.method);
    return json({ ok: false, error: 'method_not_allowed' }, 405);
  }

  const data = await parseBody(request);
  console.log('Parsed data:', data);
  const {
    name = '',
    email = '',
    message = '',
    type = 'sales',
    captchaToken = ''
  } = data;

  if (!email || !message) {
    // Optional debug output in preview
    const DEBUG = (env.DEBUG || '').toLowerCase() === 'true';
    return json({ ok: false, error: 'missing_fields', debug: DEBUG ? { gotKeys: Object.keys(data) } : undefined }, 400);
  }

  // Optional captcha enforcement
  const CAPTCHA_REQUIRED = (env.CAPTCHA_REQUIRED || '').toLowerCase() === 'true';
  if ((env.HCAPTCHA_SECRET && CAPTCHA_REQUIRED) || (env.HCAPTCHA_SECRET && captchaToken)) {
    const body = new URLSearchParams({ secret: env.HCAPTCHA_SECRET, response: captchaToken });
    const verify = await fetch('https://hcaptcha.com/siteverify', { method: 'POST', body });
    const v = await verify.json();
    if (!v.success) return json({ ok: false, error: 'captcha_failed', details: v }, 400);
  }

  const to = (type === 'support' ? env.NOTIFY_SUPPORT_EMAIL : env.NOTIFY_SALES_EMAIL) || env.NOTIFY_SALES_EMAIL;
  if (!to) return json({ ok: false, error: 'missing_notify_email' }, 500);

  // Preview mode short-circuit
  const DRY_RUN = (env.DRY_RUN || '').toLowerCase() === 'true';
  if (DRY_RUN) return json({ ok: true, dryRun: true });

  // Send via MailChannels (no external API key required on Cloudflare)
  const fromEmail = 'no-reply@booknestai.org';
  const subject = `New ${type} inquiry — ${name || email}`;
  const text = `Type: ${type}\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n`;
  const html =
    `<p><strong>Type:</strong> ${esc(type)}</p>
     <p><strong>Name:</strong> ${esc(name)}</p>
     <p><strong>Email:</strong> ${esc(email)}</p>
     <p><strong>Message:</strong><br>${esc(message).replace(/\n/g,'<br>')}</p>`;

  const mailPayload = {
    personalizations: [{ to: [{ email: to }] }],
    from: { email: fromEmail, name: 'BookNest AI Website' },
    subject,
    content: [
      { type: 'text/plain', value: text },
      { type: 'text/html', value: html }
    ]
  };

  const resp = await fetch('https://api.mailchannels.net/tx/v1/send', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(mailPayload)
  });

  if (resp.status !== 202) {
    const detail = await resp.text();
    return json({ ok: false, error: 'send_failed', detail }, 502);
  }

  return json({ ok: true });
}