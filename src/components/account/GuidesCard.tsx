"use client";

import Link from "next/link";
import { Fragment } from "react";
import { BookCopy, ChartNoAxesCombined, Compass, type LucideIcon } from "lucide-react";
import { Surface } from "@/components/ui/Surface";
import { FooterLink } from "@/components/profile/parts";

export const DEFAULT_GUIDES = [
  [BookCopy, "Guidelines for a Safe and Respectful Workspace", "Learn why safety and respect matter in our workspace and how our guidelines help everyone follow them."],
  [Compass, "A Complete Guide to Finding Your Way Around", "A step-by-step walkthrough to help you learn the platform and use it efficiently from day one."],
  [ChartNoAxesCombined, "Keep Up with New Features and Platform Improvements", "Follow the latest enhancements and releases so you always get the most from your workspace."],
] as const;
export type Guide = readonly [LucideIcon, string, string];

/** Sidebar card listing three help guides, each with a hex icon and a Learn more link. */
export function GuidesCard({ guides = DEFAULT_GUIDES, extra = 0 }: { guides?: readonly Guide[]; extra?: number }) {
  return (
    <Surface>
                <div className="flex grow flex-col gap-5 p-5 py-10 lg:gap-7.5" style={{ paddingBottom: 40 + extra }}>
                  {guides.map(([Icon, t, d], i) => (
                    <Fragment key={t}>
                      <div className="flex flex-col items-start gap-2.5">
                        <div className="mb-2.5"><div className="relative size-[50px]"><svg viewBox="0 0 44 48" className="size-full" aria-hidden><path d="M22 2.5 40 12.8v22.4L22 45.5 4 35.2V12.8z" strokeLinejoin="round" style={{ fill: "color-mix(in srgb, var(--oks-color-warning-500) 10%, var(--app-surface))", stroke: "color-mix(in srgb, var(--oks-color-warning-500) 35%, transparent)", strokeWidth: 1.5 }} /></svg>
                          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 leading-none" style={{ color: "var(--oks-color-warning-400)" }}><Icon size={20} /></div></div></div>
                        <Link href="#" className="text-base font-semibold" style={{ color: "var(--app-fg-strong)" }}>{t}</Link>
                        <p className="text-sm fathom-sec">{d}</p>
                        <FooterLink href="#">Learn more</FooterLink>
                      </div>
                      <span className={i < guides.length - 1 ? "block border-b" : "hidden"} style={{ borderColor: "var(--app-border)" }} />
                    </Fragment>
                  ))}
                </div>
              </Surface>
  );
}
