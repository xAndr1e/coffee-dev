"use client";

import { useState } from "react";
import { submitReview } from "@/app/actions/SubmitReview";

export default function ReviewForm() {
  const [form, setForm] = useState({ name: "", review: "" });
  const [stars, setStars] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!form.name.trim() || !form.review.trim() || stars === 0) {
      setError("Please fill in your name, a rating, and your review.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await submitReview({
        author_name: form.name.trim(),
        rating: stars,
        body: form.review.trim(),
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
      <div className="text-center py-8">
        <p className="text-4xl mb-4">☕</p>
        <p className="font-display text-xl font-bold text-espresso mb-2">
          Thanks for your review!
        </p>
        <p className="font-body text-sm text-mocha/60">
          We really appreciate you sharing your experience with us.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-[11px] text-caramel tracking-widest uppercase">
            Your Name
          </label>
          <input
            type="text"
            placeholder="e.g. Maria Santos"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border border-cream-dark rounded-xl px-4 py-2.5 font-body text-sm text-espresso bg-foam placeholder:text-mocha/30 focus:outline-none focus:border-caramel"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="font-mono text-[11px] text-caramel tracking-widest uppercase">
          Your Rating
        </label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((val) => (
            <button
              key={val}
              type="button"
              onClick={() => setStars(val)}
              onMouseEnter={() => setHovered(val)}
              onMouseLeave={() => setHovered(0)}
              className="text-3xl leading-none transition-colors duration-150"
              style={{ color: val <= (hovered || stars) ? "#C08040" : "#E8DDD0" }}
              aria-label={`${val} star${val > 1 ? "s" : ""}`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="font-mono text-[11px] text-caramel tracking-widest uppercase">
          Your Review
        </label>
        <textarea
          placeholder="Tell us about your experience..."
          rows={4}
          value={form.review}
          onChange={(e) => setForm({ ...form, review: e.target.value })}
          className="border border-cream-dark rounded-xl px-4 py-2.5 font-body text-sm text-espresso bg-foam placeholder:text-mocha/30 focus:outline-none focus:border-caramel resize-none"
        />
      </div>

      {error && (
        <p className="font-body text-xs text-red-500">{error}</p>
      )}

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="self-start bg-espresso text-foam font-body text-sm font-semibold px-7 py-3 rounded-2xl hover:bg-mocha transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Submitting..." : "Submit Review"}
      </button>
    </div>
  );
}