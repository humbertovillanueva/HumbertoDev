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
