import { checkBotId } from 'botid/server';
import { createHash } from 'node:crypto';
import { validateContact, emailBody, emailHtml } from '@/lib/contact';

export const runtime = 'nodejs';
const recipient = 'hachevillanueva99@gmail.com';
const fail = (error: string, status: number) => Response.json({error}, {status, headers:{'Cache-Control':'no-store'}});

export async function GET() {
  return Response.json({enabled:process.env.CONTACT_ENABLED === 'true' && !!process.env.RESEND_API_KEY && !!process.env.CONTACT_FROM},{headers:{'Cache-Control':'no-store'}});
}

export async function POST(request: Request) {
  const expectedOrigin = process.env.CONTACT_ORIGIN || 'https://humbertovillanueva.dev';
  if (request.headers.get('origin') !== expectedOrigin) return fail('Please send your message from the website.',403);
  if (!request.headers.get('content-type')?.toLowerCase().startsWith('application/json')) return fail('Unsupported request.',415);
  if (Number(request.headers.get('content-length')) > 12000) return fail('Message is too large.',413);
  let input;
  try {
    // Bound the streamed body too; Content-Length can be absent or dishonest.
    const reader = request.body?.getReader();
    if (!reader) return fail('Please complete the form.',400);
    const chunks: Uint8Array[] = [];
    let size = 0;
    for (;;) {
      const {done,value} = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 12000) { await reader.cancel(); return fail('Message is too large.',413); }
      chunks.push(value);
    }
    input = JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch { return fail('Please complete the form.',400); }
  const data = validateContact(input);
  if (!data || input.website !== '') return fail('Please check your name, email, and message.',400);
  const apiKey = process.env.RESEND_API_KEY;
  const sender = process.env.CONTACT_FROM;
  if (process.env.CONTACT_ENABLED !== 'true' || !apiKey || !sender) return fail('Direct sending is temporarily unavailable. Please use the email draft or copy option below.',503);
  try {
    const verification = await checkBotId({advancedOptions:{checkLevel:'basic'}});
    if (verification.isBot || !verification.isHuman) return fail('Unable to verify this request. Please use the email draft option.',403);
    // Reusing a submission ID after a timeout returns the same provider result.
    const digest = createHash('sha256').update(JSON.stringify(data)).digest('hex');
    const response = await fetch('https://api.resend.com/emails', {
      method:'POST',
      headers:{Authorization:`Bearer ${apiKey}`,'Content-Type':'application/json','Idempotency-Key':`contact-${digest}`},
      body:JSON.stringify({from:sender,to:[recipient],reply_to:data.email,subject:`Portfolio inquiry from ${data.name}`,text:emailBody(data),html:emailHtml(data)}),
      signal:AbortSignal.timeout(12000),
    });
    if (!response.ok) return fail(response.status === 429 ? 'Sending is busy. Please try later or use the email draft option.' : 'We could not send your message. Your text is still here; try again or use the email draft option.',response.status===429 ? 429 : 502);
    const result = await response.json();
    if (typeof result.id !== 'string' || !result.id) return fail('Delivery could not be confirmed. Please retry with the same message.',502);
    return Response.json({ok:true},{headers:{'Cache-Control':'no-store'}});
  } catch {
    return fail('Sending could not be confirmed. Your message is still here. Please retry or use the email draft option.',502);
  }
}
