"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

const emailAddress = "hachevillanueva99@gmail.com";

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState("");
  const [sent, setSent] = useState(false);
  const confirmationRef = useRef<HTMLDivElement>(null);
  const restartRef = useRef(false);
  useEffect(() => {
    if (sent) confirmationRef.current?.focus();
    else if (restartRef.current) {
      formRef.current?.querySelector<HTMLInputElement>('input[name="name"]')?.focus();
      restartRef.current = false;
    }
  }, [sent]);
  const [sending, setSending] = useState(false);
  const [canSend, setCanSend] = useState(false);
  const [checkingDelivery, setCheckingDelivery] = useState(true);
  useEffect(() => {
    const controller = new AbortController();
    void fetch("/api/contact", {signal:controller.signal})
      .then(response => response.ok ? response.json() : null)
      .then(result => { if (!controller.signal.aborted) setCanSend(result?.enabled === true); })
      .catch(() => {})
      .finally(() => { if (!controller.signal.aborted) setCheckingDelivery(false); });
    return () => controller.abort();
  }, []);
  const submissionRef = useRef<string | null>(null);

  function readMessage() {
    const form = formRef.current;
    if (!form) return null;
    for (const field of [form.elements.namedItem("name"), form.elements.namedItem("message")]) {
      if (field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement) {
        field.setCustomValidity(field.value.trim() ? "" : "Please enter more than spaces.");
      }
    }
    if (!form.reportValidity()) return null;
    const data = new FormData(form);
    const value = (key: string) => String(data.get(key) ?? "").trim();
    return {
      subject: `Portfolio inquiry from ${value("name")}`,
      body: `Name: ${value("name")}\nEmail: ${value("email")}\nCompany: ${value("company") || "Not provided"}\n\nMessage:\n${value("message")}`,
    };
  }

  function openEmail() {
    const draft = readMessage();
    if (!draft) return;
    setStatus("Your email app should open with a draft. Send it there to finish. If nothing opens, use Copy message and paste it into your email service.");
    window.location.href = `mailto:${emailAddress}?subject=${encodeURIComponent(draft.subject)}&body=${encodeURIComponent(draft.body)}`;
  }

  async function sendMessage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!canSend) { openEmail(); return; }
    if (sending || !readMessage() || !formRef.current) return;
    const data = new FormData(formRef.current);
    submissionRef.current ??= crypto.randomUUID();
    setSending(true);
    setStatus("Sending your message…");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...Object.fromEntries(data), submissionId: submissionRef.current }),
        signal: AbortSignal.timeout(20000),
      });
      const result = await response.json();
      if (!response.ok || result.ok !== true) throw new Error(typeof result.error === "string" ? result.error : "We could not send your message. Try again or use the email draft option.");
      setStatus("Thank you for getting in touch. Your message has been sent to Humberto.");
      setSent(true);
      submissionRef.current = null;
    } catch (error) {
      setStatus(error instanceof Error && error.name === "Error" ? error.message : "Sending could not be confirmed. Your text is still here; retry or use the email draft option.");
    } finally { setSending(false); }
  }

  async function copyMessage() {
    const draft = readMessage();
    if (!draft) return;
    try {
      await navigator.clipboard.writeText(`To: ${emailAddress}\nSubject: ${draft.subject}\n\n${draft.body}`);
      setStatus("Message copied. Paste it into your email service and send it to hachevillanueva99@gmail.com.");
    } catch {
      setStatus("Clipboard access is unavailable. Your message is still here; select and copy it manually, then email hachevillanueva99@gmail.com.");
    }
  }

  if (sent) return <div className="message-form contact-success" ref={confirmationRef} tabIndex={-1} aria-labelledby="contact-sent-title">
    <div role="status">
      <h3 id="contact-sent-title">Message sent</h3>
      <p>Thank you for getting in touch. Your message has been sent to Humberto.</p>
    </div>
    <button type="button" onClick={() => {
      restartRef.current = true;
      setStatus("");
      setSent(false);
    }}>SEND ANOTHER MESSAGE</button>
  </div>;

  return <form ref={formRef} className="message-form" onSubmit={sendMessage} aria-busy={sending} onInput={(event) => {
    const target = event.target;
    if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) target.setCustomValidity("");
    submissionRef.current = null;
    setStatus("");
  }}>
    <p className="contact-help">{checkingDelivery ? "Checking message delivery…" : canSend ? "Send a message to Humberto’s inbox. Your details are used to respond to your inquiry and processed by our email provider. " : "Prepare an email draft or copy your message. Direct sending is currently unavailable."}</p>
    <fieldset disabled={sending} className="contact-fields">
    <div className="contact-trap" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
    <label><span>YOUR NAME *</span><input type="text" name="name" autoComplete="name" maxLength={100} required /></label>
    <label><span>YOUR EMAIL *</span><input type="email" name="email" autoComplete="email" maxLength={254} required /></label>
    <label><span>COMPANY / TEAM</span><input type="text" name="company" autoComplete="organization" maxLength={150} /></label>
    <label className="message-field"><span>MESSAGE *</span><textarea name="message" rows={6} maxLength={1500} required /></label>
    {canSend && <button type="submit">{sending ? "SENDING…" : "SEND MESSAGE"}</button>}
    <button type="button" className={canSend ? "contact-alternative" : undefined} onClick={openEmail}>OPEN EMAIL DRAFT</button>
    <button type="button" className="contact-alternative" onClick={copyMessage}>COPY MESSAGE</button>
    </fieldset>
    <p className="contact-feedback" role="status">{status}</p>
  </form>;
}
