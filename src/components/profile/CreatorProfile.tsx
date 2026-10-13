"use client";

import Link from "next/link";
import { Avatar } from "oks-ui";
import { Briefcase, CircleCheck, Crown, Heart, Luggage, Mail, Mails, Volleyball, AtSign, MessagesSquare, Truck, Zap } from "lucide-react";
import { Surface, SurfaceBody, SurfaceFooter } from "@/components/ui/Surface";
import { ActivitiesCard, ArtImage, BigStat, CardWithFooter, FooterLink, HexBadge, SkillChips } from "./parts";
import { ProfileFrame, type ProfileIdentity } from "./ProfileShell";
import { avatarUrl } from "@/lib/avatar";
import { Fragment } from "react";

const WHO: ProfileIdentity = { name: "Alder Studio", org: "alder.example", place: "Lisbon, Portugal", email: "hello@alder.example", seed: "alder", logo: true, orgIcon: "volleyball" };

const WORKS = [
  ["Harbor Light", "Dmitri Eriksen", 24, 5], ["Quiet Hours", "Elif Fontaine", 187, 49], ["Amber Grid", "Farid Garrow", 60, 13],
  ["Static Garden", "Greta Holloway", 37, 16], ["Open Field", "Hana Ishikawa", 625, 109], ["Low Tide", "Idris Jaeger", 6, 1],
] as const;

const EVENTS = [
  { m: "Feb", d: "21", tag: "Webinar Series", title: "Pricing Small Products Series", text: "Join our webinars to learn practical pricing strategies for small software products." },
  { m: "Apr", d: "02", tag: "Photo Workshop", title: "Light and Landscape Immersion", text: "Sharpen your landscape photography in a hands-on workshop guided by working photographers." },
  { m: "Aug", d: "29", tag: "Tech Conference", title: "Future of Tooling", text: "Dig into emerging tools and trends at a conference for people who build software." },
];

export function CreatorProfile() {
  return (
    <ProfileFrame title="Creator" crumbs={["Public Profile", "Profiles", "Creator"]} who={WHO}>
      <div className="grid grid-cols-1 gap-5 lg:gap-7.5 xl:grid-cols-3">
        <div className="col-span-1">
          <div className="grid gap-5 lg:gap-7.5">
            <Surface>
              <SurfaceBody className="p-5">
                <div className="flex flex-wrap gap-2 py-1">
                  <BigStat value="397" label="Releases" />
                  <span className="border-s sm:ms-8 sm:ps-8" style={{ borderColor: "var(--app-border)" }} />
                  <BigStat value="89k" label="Earnings" />
                </div>
              </SurfaceBody>
            </Surface>

            <CardWithFooter title="Members" footer={<FooterLink href="/account/members/teams">Join Our Team</FooterLink>}>
              <div className="flex flex-wrap gap-2.5 xl:me-16">
                {[1, 2, 3, 5, 6, 11, 7, 12].map((i) => <Avatar key={i} name={`m${i}`} src={avatarUrl(i)} size={36} />)}
              </div>
            </CardWithFooter>

            <CardWithFooter title="About">
              <p className="mb-4 text-sm leading-5.5" style={{ color: "var(--app-fg)" }}>
                Designer and illustrator with a passion for solving visual problems and a commitment to craft.
              </p>
              <div className="grid gap-y-5">
                {([[Luggage, "Alder Studio"], [Crown, "Author"], [Briefcase, "Brand Designer"], [Mail, "hello@alder.example"], [Volleyball, "https://alder.example"], [AtSign, "alderstudio"], [AtSign, "alder_co"]] as const).map(([Icon, t]) => (
                  <div key={t + "-row"} className="flex items-center gap-2.5">
                    <Icon size={16} className="fathom-muted" aria-hidden />
                    <Link href="/public-profile/profiles/creator" className="text-sm leading-none" style={{ color: "var(--app-fg-strong)" }}>{t}</Link>
                  </div>
                ))}
              </div>
            </CardWithFooter>

            <CardWithFooter title="Community Badges" bodyClass="p-5 pb-7.5">
              <div className="flex flex-wrap gap-3 lg:gap-4">
                <HexBadge tone="primary"><Volleyball size={20} /></HexBadge>
                <HexBadge tone="warning"><Zap size={20} /></HexBadge>
                <HexBadge tone="success"><MessagesSquare size={20} /></HexBadge>
                <HexBadge tone="secondary"><Truck size={20} /></HexBadge>
              </div>
            </CardWithFooter>

            <CardWithFooter title="Skills">
              <SkillChips skills={["Web Design", "Code Review", "Figma", "Product Development", "Webflow", "AI", "noCode", "Management"]} />
            </CardWithFooter>
          </div>
        </div>

        <div className="col-span-2">
          <div className="flex flex-col gap-5 lg:gap-7.5">
            <Surface>
              <SurfaceBody className="px-10 py-7.5 lg:pe-12.5">
                <div className="flex flex-wrap justify-between gap-6 p-2.5 md:gap-10 xl:flex-nowrap">
                  <div className="flex flex-col items-start gap-3 md:max-w-[60%]">
                    <h2 className="text-xl font-semibold" style={{ color: "var(--app-fg-strong)" }}>Refresh Your Space:<br />Soft Goods Ideas</h2>
                    <p className="mb-2.5 text-sm leading-5.5 fathom-sec">Transform a living space with our tutorial on choosing and styling soft goods.</p>
                    <div className="grid gap-2 md:grid-cols-2">
                      {["Time-Saving", "Easy Revamp", "Budget-Friendly", "Fresh Look"].map((t) => (
                        <div key={t} className="flex items-center gap-1.5 pe-7.5">
                          <CircleCheck size={16} style={{ color: "var(--oks-color-success-500)" }} aria-hidden />
                          <span className="text-nowrap text-sm" style={{ color: "var(--app-fg-strong)" }}>{t}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <svg viewBox="0 0 240 200" width="240" height="200" className="block max-h-[200px]" aria-hidden>
                      <rect x="20" y="70" width="140" height="90" rx="10" fill="var(--oks-color-primary-500)" fillOpacity=".14" stroke="var(--oks-color-primary-500)" strokeWidth="2" />
                      <rect x="60" y="30" width="150" height="100" rx="10" fill="var(--app-surface)" stroke="var(--oks-color-primary-500)" strokeWidth="2" />
                      <path d="M80 100c18-34 36-34 54 0s36 34 54 0" fill="none" stroke="var(--oks-color-primary-500)" strokeWidth="2.4" strokeLinecap="round" />
                      <circle cx="96" cy="58" r="8" fill="var(--oks-color-warning-400)" />
                    </svg>
                  </div>
                </div>
              </SurfaceBody>
              <SurfaceFooter className="items-center justify-center"><FooterLink href="/network/get-started">Get Started</FooterLink></SurfaceFooter>
            </Surface>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-7.5">
              {WORKS.map(([t, a, l, c], i) => (
                <Surface key={t} className="fathom-card-flat">
                  <ArtImage seed={i + 2} ratio="aspect-[3/2]" className="rounded-t-xl" />
                  <div className="flex flex-col gap-2 px-5 py-4.5">
                    <Link href="/public-profile/profiles/company" className="text-lg font-medium" style={{ color: "var(--app-fg-strong)" }}>{t}</Link>
                    <div className="flex grow justify-between">
                      <div className="flex grow items-center">
                        <Avatar name={a} src={avatarUrl(60 + i)} size={28} className="me-2" />
                        <Link href="/public-profile/profiles/collector" className="text-sm" style={{ color: "var(--app-fg)" }}>{a}</Link>
                      </div>
                      <div className="flex gap-3">
                        <div className="flex items-center gap-1"><Heart size={16} className="fathom-muted" /><span className="py-2 text-sm" style={{ color: "var(--app-fg)" }}>{l}</span></div>
                        <div className="flex items-center gap-1"><Mails size={16} className="fathom-muted" /><span className="py-2 text-sm" style={{ color: "var(--app-fg)" }}>{c}</span></div>
                      </div>
                    </div>
                  </div>
                </Surface>
              ))}
            </div>

            <CardWithFooter title="Upcoming Events" toolbar={<FooterLink href="/public-profile/works">View All</FooterLink>} bodyClass="p-5 pt-5 pb-2 lg:pt-7">
              <div className="grid gap-3.5">
                {EVENTS.map((e, i) => (
                  <Fragment key={e.title}>
                    <div className="flex flex-col gap-5 md:flex-row md:items-center">
                      <div className="flex gap-5">
                        <div className="rounded-lg border" style={{ borderColor: "var(--oks-color-warning-200)" }}>
                          <div className="flex rounded-t-lg border-b" style={{ borderColor: "var(--oks-color-warning-200)", background: "var(--oks-color-warning-100)" }}>
                            <span className="p-2 text-sm font-medium" style={{ color: "var(--oks-color-warning-600)" }}>{e.m}</span>
                          </div>
                          <div className="flex size-12 items-center justify-center">
                            <span className="text-xl font-medium tracking-tight" style={{ color: "var(--app-fg-strong)" }}>{e.d}</span>
                          </div>
                        </div>
                        <ArtImage seed={i + 9} width={180} height={120} className="rounded-lg" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Link href="/public-profile/profiles/creator" className="mb-px text-sm font-medium leading-[14px]" style={{ color: "var(--oks-color-warning-600)" }}>{e.tag}</Link>
                        <Link href="/public-profile/profiles/creator" className="text-base font-medium leading-4" style={{ color: "var(--app-fg-strong)" }}>{e.title}</Link>
                        <p className="text-sm leading-[22px]" style={{ color: "var(--app-fg)" }}>{e.text}</p>
                      </div>
                    </div>
                    <div className={i < EVENTS.length - 1 ? "border-b" : ""} style={{ borderColor: "var(--app-border)" }} />
                  </Fragment>
                ))}
              </div>
            </CardWithFooter>

            <ActivitiesCard />
          </div>
        </div>
      </div>
    </ProfileFrame>
  );
}
