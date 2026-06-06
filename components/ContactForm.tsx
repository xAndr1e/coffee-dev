"use client";

import { useState } from "react";
import { sendMessage } from "@/app/actions/SendMessage";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit() {
    if (!form.name.trim() || !form.email.trim() || !form.subject.trim() || !form.message.trim()) {
      setError("Please fill in all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await sendMessage({
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
      });
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center h-full py-16 text-center">
        <p className="text-4xl mb-4">✉️</p>
        <h3 className="font-display text-2xl font-bold text-foam mb-2">
          Message Sent!
        </h3>
        <p className="font-body text-sm text-foam/50">
          Thanks for reaching out. We'll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block font-mono text-[10px] text-foam/40 uppercase tracking-widest mb-2">
            Name
          </label>
          <input
            type="text"
            placeholder="Your name"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            className="w-full bg-foam/10 border border-foam/15 rounded-xl px-4 py-3 font-body text-sm text-foam placeholder:text-foam/30 focus:outline-none focus:border-caramel/50 transition-colors"
          />
        </div>
        <div>
          <label className="block font-mono text-[10px] text-foam/40 uppercase tracking-widest mb-2">
            Email
          </label>
          <input
            type="email"
            placeholder="you@email.com"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className="w-full bg-foam/10 border border-foam/15 rounded-xl px-4 py-3 font-body text-sm text-foam placeholder:text-foam/30 focus:outline-none focus:border-caramel/50 transition-colors"
          />
        </div>
      </div>

      <div>
        <label className="block font-mono text-[10px] text-foam/40 uppercase tracking-widest mb-2">
          Subject
        </label>
        <input
          type="text"
          placeholder="How can we help?"
          value={form.subject}
          onChange={(e) => update("subject", e.target.value)}
          className="w-full bg-foam/10 border border-foam/15 rounded-xl px-4 py-3 font-body text-sm text-foam placeholder:text-foam/30 focus:outline-none focus:border-caramel/50 transition-colors"
        />
      </div>

      <div>
        <label className="block font-mono text-[10px] text-foam/40 uppercase tracking-widest mb-2">
          Message
        </label>
        <textarea
          rows={4}
          placeholder="Tell us more..."
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          className="w-full bg-foam/10 border border-foam/15 rounded-xl px-4 py-3 font-body text-sm text-foam placeholder:text-foam/30 focus:outline-none focus:border-caramel/50 transition-colors resize-none"
        />
      </div>

      {error && (
        <p className="font-body text-xs text-red-400">{error}</p>
      )}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={loading}
        className="w-full bg-caramel hover:bg-latte text-espresso font-body font-semibold text-sm py-4 rounded-xl transition-colors duration-200 tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Sending..." : "Send Message →"}
      </button>
    </div>
  );
}