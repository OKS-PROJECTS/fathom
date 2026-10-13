"use client";

import Link from "next/link";
import { Globe, Mail, Loader, AtSign } from "lucide-react";
import { Surface, SurfaceBody } from "@/components/ui/Surface";
import { CardWithFooter, FooterLink, SkillChips } from "./parts";
import { ProfileFrame, type ProfileIdentity } from "./ProfileShell";

const WHO: ProfileIdentity = { name: "Jordan Marlowe", org: "Marlowe Design", place: "Denver, Colorado", email: "jordan@marlowe.example", seed: "marlowe", orgIcon: "luggage" };
const KPIS = [["249", "Connections"], ["1.2k", "Uploads"], ["1M+", "Gross Sales"], ["27", "Author Rank"]];

function Stretch({ children }: { children: React.ReactNode }) {
  return <div className="col-span-1 flex [&>div]:grow">{children}</div>;
}

export function PlainProfile() {
  return (
    <ProfileFrame title="Plain" crumbs={["Public Profile", "Profiles", "More", "Plain"]} who={WHO}>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-7.5">
        <div className="col-span-2">
          <Surface>
            <SurfaceBody className="p-5">
              <div className="flex gap-2 py-1.5 lg:px-10">
                {KPIS.map(([v, l], i) => (
                  <div key={l} className="contents">
                    <div className="grid flex-1 grid-cols-1 place-content-center gap-1 text-center">
                      <span className="text-2xl font-semibold leading-none" style={{ color: "var(--app-fg-strong)" }}>{v}</span>
                      <span className="text-sm fathom-sec">{l}</span>
                    </div>
                    {i < KPIS.length - 1 && <span className="my-1 border-e" style={{ borderColor: "var(--app-border-input)" }} />}
                  </div>
                ))}
              </div>
            </SurfaceBody>
          </Surface>
        </div>

        <div className="col-span-2">
          <Surface>
            <SurfaceBody className="p-5 lg:py-9">
              <div className="flex justify-center pb-5">
                <svg viewBox="0 0 220 170" width="220" height="170" className="block max-h-[170px]" aria-hidden>
                  <rect x="40" y="40" width="140" height="100" rx="12" fill="var(--oks-color-primary-500)" fillOpacity=".1" stroke="var(--oks-color-primary-500)" strokeWidth="2" strokeDasharray="6 5" />
                  <path d="M110 112V74M92 90l18-18 18 18" fill="none" stroke="var(--oks-color-primary-500)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="text-center text-lg font-medium" style={{ color: "var(--app-fg-strong)" }}>Upload an Item to Get Started</div>
              <div className="flex justify-center gap-1">
                <span className="text-sm fathom-sec">Begin by crafting your first list in minutes.</span>
                <Link href="/account/billing/plans" className="text-sm font-medium" style={{ color: "var(--app-primary)" }}>Get Started!</Link>
              </div>
            </SurfaceBody>
          </Surface>
        </div>

        <Stretch>
          <CardWithFooter title="Profile" bodyClass="p-5 pt-4" className="pb-3">
            <div className="mb-1 grid gap-4">
              {([[Globe, "Marlowe Design"], [Mail, "Author Level 100"], [Loader, "Product Designer"], [AtSign, "jordan@marlowe.example"], [AtSign, "https://marlowe.example"], [AtSign, "marlowedesign"]] as const).map(([I, t]) => (
                <div key={t} className="flex gap-2.5"><span><I size={18} className="fathom-muted" aria-hidden /></span><Link href="/public-profile/profiles/plain" className="text-sm" style={{ color: "var(--app-fg-strong)" }}>{t}</Link></div>
              ))}
            </div>
          </CardWithFooter>
        </Stretch>
        <Stretch>
          <CardWithFooter title="About Me">
            <p className="mb-4 text-sm leading-5.5" style={{ color: "var(--app-fg)" }}>I am a curious, committed designer who likes making things feel inventive. With a background in interface design and a love for systems thinking, I enjoy turning rough ideas into tidy, usable products that people return to, and I like working with small teams that care about the details as much as I do.</p>
            <p className="text-sm leading-5.5" style={{ color: "var(--app-fg)" }}>Over time I have built up a broad toolkit of design methods, which lets me bring ideas to life quickly while keeping the people who will use them firmly in view, from the first sketch through to the final shipped release and every small improvement after it.</p>
          </CardWithFooter>
        </Stretch>
        <Stretch>
          <CardWithFooter title="Open to work" footer={<FooterLink href="/public-profile/works">View details</FooterLink>}>
            <p className="text-sm leading-5.5" style={{ color: "var(--app-fg)" }}>Seasoned product designer with a flair for user-centric interfaces. Let&apos;s build something useful together!</p>
          </CardWithFooter>
        </Stretch>
        <Stretch>
          <CardWithFooter title="Skills"><SkillChips skills={["Web Design", "Code Review", "Figma", "Product Development", "Webflow", "AI", "noCode", "Management"]} /></CardWithFooter>
        </Stretch>
      </div>
    </ProfileFrame>
  );
}
