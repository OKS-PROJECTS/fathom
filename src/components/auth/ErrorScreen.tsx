"use client";

import Link from "next/link";
import { Button } from "oks-ui";
import { Lightbulb, ServerCrash } from "lucide-react";

/** Full-screen error page: illustration, status badge, headline and a way out. */
export function ErrorScreen({ code }: { code: "404" | "500" }) {
  const is404 = code === "404";
  const Icon = is404 ? Lightbulb : ServerCrash;
  return (
    <main className="flex min-h-screen flex-col items-center justify-center" style={{ background: "var(--app-surface)" }}>
      <svg viewBox="0 0 200 160" width="200" height="160" className="block" aria-hidden>
        <circle cx="105" cy="86" r="52" fill="var(--oks-color-primary-500)" fillOpacity=".08" />
        <circle cx="105" cy="82" r="34" fill="var(--app-surface)" stroke="var(--oks-color-primary-500)" strokeWidth="2.5" />
        <g transform="translate(85 62)" style={{ color: "var(--oks-color-primary-500)" }}><Icon size={40} strokeWidth={1.6} /></g>
      </svg>
      <span className="mt-6 inline-flex h-6 items-center rounded-md px-2 text-sm" style={{ color: "var(--app-fg-strong)" }}>{code} Error</span>
      <h3 className="mb-1 mt-3 text-2xl font-semibold" style={{ color: "var(--app-fg-strong)" }}>{is404 ? "This page has gone missing" : "Internal Server Error"}</h3>
      <p className="text-center text-sm" style={{ color: "var(--app-fg)" }}>
        {is404 ? <>The requested page is missing. Check the URL or <Link href="/" style={{ color: "var(--app-primary)" }}>Return Home</Link>.</> : <>Server error occurred. Please try again later or <Link href="#" style={{ color: "var(--app-primary)" }}>Contact Us</Link> for assistance.</>}
      </p>
      {!is404 && <div className="mt-6"><Button as={Link} href="/" color="primary">Back to Home</Button></div>}
    </main>
  );
}
