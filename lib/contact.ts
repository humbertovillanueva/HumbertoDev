export type Contact = { name: string; email: string; company: string; message: string; submissionId: string };
export function validateContact(value: unknown): Contact | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const input = value as Record<string, unknown>;
  const limits = { name: 100, email: 254, company: 150, message: 1500, submissionId: 36 };
  for (const [key, max] of Object.entries(limits)) {
    if (typeof input[key] !== 'string' || input[key].length > max) return null;
  }
  const fields = Object.fromEntries(Object.keys(limits).map(key => [key, (input[key] as string).trim()])) as Contact;
  if (!fields.name || !fields.message || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(fields.email)) return null;
  if (/[\r\n\x00-\x1f]/.test(fields.name + fields.email + fields.company)) return null;
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(fields.submissionId)) return null;
  return fields;
}

export function emailBody(data: Contact) {
  return `New portfolio inquiry\n\nName: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company || 'Not provided'}\n\n${data.message}\n\nSent from humbertovillanueva.dev. The visitor's identity and email have not been verified.`;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, character => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[character]!));
}

export function emailHtml(data: Contact) {
  const name = escapeHtml(data.name);
  const email = escapeHtml(data.email);
  const company = escapeHtml(data.company || 'Not provided');
  const message = escapeHtml(data.message).replace(/\r?\n/g, '<br>');
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;background:#f5f5f0;color:#151515;font-family:Arial,Helvetica,sans-serif">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0"><tr><td align="center" style="padding:24px 12px">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border:1px solid #dddddd">
<tr><td style="padding:24px;background:#0b3974;color:#fff5c8">
<img src="https://humbertovillanueva.dev/icon.png" width="64" height="64" alt="HumbertoDev logo" style="display:block;border:0;margin-bottom:16px">
<p style="margin:0;font-size:22px;font-weight:bold">HumbertoDev</p><p style="margin:8px 0 0;font-size:14px">New portfolio inquiry</p></td></tr>
<tr><td style="padding:24px;font-size:16px;line-height:1.6;overflow-wrap:anywhere;word-break:break-word">
<p style="margin:0 0 8px"><strong>Name:</strong> ${name}<br><strong>Email:</strong> ${email}<br><strong>Company:</strong> ${company}</p>
<h1 style="font-size:20px;margin:24px 0 12px">Message</h1><p style="margin:0">${message}</p>
</td></tr><tr><td style="padding:20px 24px;background:#fff5c8;font-size:13px;line-height:1.6">
Sent from <a href="https://humbertovillanueva.dev" style="color:#0b3974">humbertovillanueva.dev</a>.<br>Reply to this email to respond to the visitor. The visitor's identity and email have not been verified.
</td></tr></table></td></tr></table></body></html>`;
}
