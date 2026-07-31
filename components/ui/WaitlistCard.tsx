"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";

export default function WaitlistCard() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setStatus("error");
      setMessage("Please enter your email address.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: trimmedEmail }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setStatus("success");
      setMessage("You’re on the list. We’ll be in touch soon.");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
    }
  }

  return (
    <section className="w-full max-w-[820px] -translate-y-4 px-4 text-center">
      <div className="mb-5 flex justify-center">
        <Image
          src="/images/logo-web.png"
          alt="ANTIKA"
          width={980}
          height={320}
          priority
          className="h-auto w-[clamp(340px,33vw,720px)] select-none object-contain drop-shadow-[0_12px_30px_rgba(45,28,20,0.08)]"
        />
      </div>

      <div className="space-y-3">
        <h1 className="text-center text-[clamp(2.7rem,3.3vw,4.1rem)] font-black uppercase tracking-[0.06em] text-[#1d1d1d] leading-none">
          Opening soon
        </h1>

        <p className="mx-auto w-full max-w-[560px] text-center text-sm leading-relaxed tracking-[0.02em] text-[#353535] sm:text-base">
          Sign up for our newsletter to be the first to know when we launch.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mx-auto mt-5 w-full max-w-[640px]">
        <div className="flex items-center overflow-hidden rounded-[28px] border-[3px] border-[#d51c1c] bg-[#f9f6f3]/90 shadow-[0_18px_32px_rgba(68,47,35,0.06)] ring-1 ring-[#f1eae3] backdrop-blur-[2px]">
          <label className="sr-only" htmlFor="email">
            Email address
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email address"
            aria-label="Email address"
            className="
              w-full
              border-0
              bg-transparent
              px-7
              py-5
              text-base
              font-medium
              text-[#1f1f1f]
              placeholder:text-[#7a7a7a]
              outline-none
              sm:px-6
              sm:py-6
            "
          />

          <button
            type="submit"
            disabled={status === "loading"}
            className="
              flex
              h-[56px]
              min-w-[128px]
              items-center
              justify-center
              border-0
              bg-[#9f1917]
              px-5
              text-xs
              font-bold
              uppercase
              tracking-[0.16em]
              text-white
              transition-all
              duration-200
              hover:bg-[#7d1412]
              hover:shadow-[0_12px_28px_rgba(159,25,23,0.18)]
              disabled:cursor-not-allowed
              disabled:opacity-70
              sm:h-[62px]
              sm:min-w-[170px]
              sm:px-7
            "
          >
            {status === "loading" ? "Saving..." : "Sign up"}
          </button>
        </div>

        {message ? (
          <p
            className={`mt-3 text-sm ${
              status === "success" ? "text-[#1d6d4a]" : status === "error" ? "text-[#9f1917]" : "text-[#444]"
            }`}
            aria-live="polite"
          >
            {message}
          </p>
        ) : null}
      </form>

      <div className="mt-7 text-center text-sm text-[#2b2b2b]">
        <p className="mb-4 text-base font-medium text-[#1d1d1d]">
          Coming in early 2027
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-[#3d3d3d]">
          <span>Enter using password</span>
          <span className="text-[#7a0f0d]">•</span>
          <span>
            Are you the store owner? <a className="font-medium text-[#7a0f0d] underline underline-offset-2" href="#">Log in here</a>
          </span>
        </div>
      </div>
    </section>
  );
}