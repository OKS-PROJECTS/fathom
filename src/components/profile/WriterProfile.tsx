"use client";

import Link from "next/link";
import { Heart, Clock9, Crown, Briefcase, Luggage, Mail, Volleyball, AtSign, MessagesSquare, Truck, Zap } from "lucide-react";
import { Surface, SurfaceBody, SurfaceFooter } from "@/components/ui/Surface";
import { ActivitiesCard, ArtImage, BigStat, CardWithFooter, FooterLink, HexBadge, SkillChips } from "./parts";
import { ProfileFrame, type ProfileIdentity } from "./ProfileShell";

const WHO: ProfileIdentity = { name: "Celine Dunmore", org: "Dunmore Notes", place: "Porto, Portugal", email: "celine@dunmore.example", seed: "dunmore", orgIcon: "volleyball" };

const POSTS = [
  ["Software", "Maximizing Efficiency with Modern Software", "4 hours ago"], ["Work-Life", "Balancing Work and Life: Strategies for Success", "2 days ago"],
  ["Technology", "Exploring the Latest Technological Advances", "A week ago"], ["Design", "Why Small Interfaces Win", "2 weeks ago"],
] as const;
const REPLIES = [
  ["10 Jan, 26", 24, "Experienced writer seeking new collaborations.", "danger"], ["23 Jan, 26", 3, "Always credit the author of a post. It builds trust with readers.", "primary"],
  ["4 Feb, 26", 89, "Avoid all caps and excessive punctuation in titles.", "warning"],
  ["17 Mar, 26", 32, "Treat this as a starting point for your own post and adjust the tone for the readers you write for each week.", "success"],
  ["9 Apr, 26", 57, "Sharp, well-lit images show your cards at their best.", "info"],
] as const;

export function WriterProfile() {
  return (
    <ProfileFrame title="Writer" crumbs={["Public Profile", "Profiles", "Writer"]} who={WHO}>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-7.5">
        <div className="col-span-1">
          <div className="grid gap-5 lg:gap-7.5">
            <Surface>
              <SurfaceBody className="p-5">
                <div className="flex flex-wrap gap-2 py-1">
                  <BigStat value="397" label="Topics" />
                  <span className="border-s sm:ms-8 sm:ps-8" style={{ borderColor: "var(--app-border)" }} />
                  <BigStat value="8.2k" label="Upvotes" />
                </div>
              </SurfaceBody>
            </Surface>

            <CardWithFooter title="Profile">
              <p className="mb-4 text-sm leading-5.5" style={{ color: "var(--app-fg)" }}>Writer on design, tools and craft with a passion for plain language and a commitment to clear, honest work.</p>
              <div className="grid gap-y-5">
                {([[Luggage, "Dunmore Notes"], [Crown, "Author"], [Briefcase, "Editor"], [Mail, "celine@dunmore.example"], [Volleyball, "https://dunmore.example"], [AtSign, "dunmorenotes"], [AtSign, "dunmore_co"]] as const).map(([Icon, t]) => (
                  <div key={t} className="flex gap-2.5"><Icon size={16} className="fathom-muted" aria-hidden /><Link href="/public-profile/profiles/writer" className="text-sm leading-none" style={{ color: "var(--app-fg-strong)" }}>{t}</Link></div>
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

            <CardWithFooter title="Collaborate" footer={<FooterLink href="/public-profile/works">View details</FooterLink>}>
              <p className="text-sm leading-5.5" style={{ color: "var(--app-fg)" }}>Experienced editor seeking new opportunities with small teams.</p>
            </CardWithFooter>

            <CardWithFooter title="Skills">
              <SkillChips skills={["Long-form", "Editing", "Research", "Newsletters", "Interviews", "AI", "noCode", "Management"]} />
            </CardWithFooter>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-2">
          <div className="flex flex-col gap-5 lg:gap-7.5">
            <Surface>
              <SurfaceBody className="px-10 py-7.5 lg:pe-12.5">
                <div className="flex flex-wrap gap-6 md:flex-nowrap md:gap-10">
                  <div className="flex flex-col gap-3">
                    <h2 className="text-xl font-semibold" style={{ color: "var(--app-fg-strong)" }}>Open the door to<br />joint publishing projects</h2>
                    <p className="text-sm leading-5.5 fathom-sec">Explore collaboration openings across our publication. We welcome partnerships, guest posts and shared research.</p>
                  </div>
                  <svg viewBox="0 0 220 140" width="251" height="160" className="block max-h-[160px] shrink-0" aria-hidden>
                    <rect x="30" y="34" width="150" height="86" rx="10" fill="none" stroke="var(--oks-color-primary-500)" strokeWidth="2" />
                    <rect x="46" y="52" width="72" height="8" rx="4" fill="var(--oks-color-primary-300)" />
                    <rect x="46" y="68" width="104" height="6" rx="3" fill="var(--app-border-strong)" />
                    <rect x="46" y="82" width="88" height="6" rx="3" fill="var(--app-border-strong)" />
                    <circle cx="176" cy="40" r="24" fill="var(--oks-color-primary-500)" fillOpacity=".14" stroke="var(--oks-color-primary-500)" strokeWidth="2" />
                  </svg>
                </div>
              </SurfaceBody>
              <SurfaceFooter className="items-center"><FooterLink href="/network/get-started">Get Started</FooterLink></SurfaceFooter>
            </Surface>

            <CardWithFooter title="Celine's Posts" toolbar={<FooterLink href="/public-profile/profiles/feeds">View All</FooterLink>} bodyClass="p-5 lg:p-7.5 lg:pb-7">
              <div className="fathom-xscroll">
                <div className="flex gap-5">
                  {POSTS.map(([cat, t, when], i) => (
                    <Surface key={t} className="mb-5 w-[280px] shrink-0 !shadow-none">
                      <ArtImage seed={i + 60} width={280} height={240} className="rounded-t-xl" />
                      <div className="grid gap-1.5 px-5 py-4">
                        <Link href="/public-profile/profiles/writer" className="text-sm font-medium" style={{ color: "var(--oks-color-warning-600)" }}>{cat}</Link>
                        <Link href="/public-profile/profiles/writer" className="mb-1.5 text-lg font-medium leading-6" style={{ color: "var(--app-fg-strong)" }}>{t}</Link>
                        <time className="flex items-center gap-1.5 text-sm font-medium leading-none fathom-sec"><Clock9 size={16} className="fathom-muted" />{when}</time>
                      </div>
                    </Surface>
                  ))}
                </div>
              </div>
            </CardWithFooter>

            <CardWithFooter title="Celine's Replies" toolbar={<FooterLink href="/public-profile/profiles/feeds">View All</FooterLink>} bodyClass="p-5 pb-7">
              <div className="flex flex-col gap-5">
                {REPLIES.map(([d, n, t, tone]) => (
                  <div key={d} className="border-s-2" style={{ borderColor: `var(--oks-color-${tone}-${tone === "danger" ? 600 : tone === "warning" ? 300 : 500})` }}>
                    <div className="mb-0.5 flex items-center gap-3 ps-3">
                      <span className="text-xs fathom-sec">{d}</span>
                      <div className="size-1.5 rounded-full" style={{ background: "var(--app-border-input)" }} />
                      <div className="flex items-center gap-1"><Heart size={16} className="fathom-muted" /><span className="text-sm fathom-sec">{n}</span></div>
                    </div>
                    <p className="ps-3 text-sm leading-5.5" style={{ color: "var(--app-fg)" }}>{t}</p>
                  </div>
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
