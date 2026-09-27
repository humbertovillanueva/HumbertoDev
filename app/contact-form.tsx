"use client";

import { useRef, useState, type FormEvent } from "react";

const emailAddress = "hachevillanueva99@gmail.com";

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState("");

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

  function openEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const draft = readMessage();
    if (!draft) return;
    setStatus("Your email app should open with a draft. Send it there to finish. If nothing opens, use Copy message and paste it into your email service.");
    window.location.href = `mailto:${emailAddress}?subject=${encodeURIComponent(draft.subject)}&body=${encodeURIComponent(draft.body)}`;
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

  return <form ref={formRef} className="message-form" onSubmit={openEmail} onInput={(event) => {
    const target = event.target;
    if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) target.setCustomValidity("");
    setStatus("");
  }}>
    <p className="contact-help">Prepare an email draft or copy your message. Nothing is sent from this website.</p>
    <label><span>YOUR NAME *</span><input type="text" name="name" autoComplete="name" maxLength={100} required /></label>
    <label><span>YOUR EMAIL *</span><input type="email" name="email" autoComplete="email" maxLength={254} required /></label>
    <label><span>COMPANY / TEAM</span><input type="text" name="company" autoComplete="organization" maxLength={150} /></label>
    <label className="message-field"><span>MESSAGE *</span><textarea name="message" rows={6} maxLength={1500} required /></label>
    <button type="submit">▶ OPEN EMAIL DRAFT</button>
    <button type="button" onClick={copyMessage}>COPY MESSAGE</button>
    <p className="contact-feedback" role="status">{status}</p>
  </form>;
}
