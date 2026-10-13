"use client";

import Link from "next/link";
import { Button } from "oks-ui";
import { Surface, SurfaceBody } from "@/components/ui/Surface";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { PageActions } from "@/components/profile/ProfileShell";
import { FaqCard } from "./Faq";
import { HelpCards } from "./HelpCards";

/** Empty-state landing page: illustration, headline, one action, FAQ and help cards. */
export function StarterPage({ title, crumbs, headline, lines, action, href, art }: { title: string; crumbs: string[]; headline: string; lines: [string, string]; action: string; href: string; art: React.ReactNode }) {
  return (
    <>
      <PageHeader title={title} crumbs={crumbs} actions={<PageActions />} />
      <Container>
        <div className="grid gap-5 lg:gap-7.5">
          <StarterCard headline={headline} lines={lines} action={action} href={href} art={art} />
          <FaqCard />
          <HelpCards />
        </div>
      </Container>
    </>
  );
}

/** Generated illustration for starter pages: a soft disc with a line icon. */
export function StarterArt({ children }: { children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 320 230" width="320" height="230" className="block max-h-[230px]" aria-hidden>
      <ellipse cx="160" cy="115" rx="132" ry="104" fill="var(--oks-color-primary-500)" fillOpacity=".08" />
      <circle cx="160" cy="115" r="72" fill="var(--app-surface)" stroke="var(--oks-color-primary-500)" strokeWidth="2.5" />
      <g transform="translate(124 79)" style={{ color: "var(--oks-color-primary-500)" }}>{children}</g>
    </svg>
  );
}

export function StarterCard({ headline, lines, action, href, art }: { headline: string; lines: [string, string]; action: string; href: string; art: React.ReactNode }) {
  return (
    <Surface>
            <SurfaceBody className="flex flex-col gap-2.5 py-7.5">
              <div className="flex justify-center p-7.5 py-9">{art}</div>
              <div className="flex flex-col items-center gap-5 lg:gap-7.5">
                <div className="flex flex-col gap-3 text-center">
                  <h2 className="text-xl font-semibold" style={{ color: "var(--app-fg-strong)" }}>{headline}</h2>
                  <p className="text-sm" style={{ color: "var(--app-fg)" }}>{lines[0]}<br />{lines[1]}</p>
                </div>
                <div className="mb-5 flex"><Link href={href}><Button color="primary" tabIndex={-1}>{action}</Button></Link></div>
              </div>
            </SurfaceBody>
          </Surface>
  );
}
