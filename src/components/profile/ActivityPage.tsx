"use client";

import Link from "next/link";
import { useState } from "react";
import { Avatar, AvatarGroup, Button, Chip, Progress, Rating, SwitchField } from "oks-ui";
import { BadgeCheck, CalendarCheck2, ChartSpline, Coffee, LogIn, Printer, Rocket, Share2, SquareDashedBottomCode, Trophy, Users, Volleyball } from "lucide-react";
import { Surface, SurfaceFooter, SurfaceHeader } from "@/components/ui/Surface";
import { ActivityRail, ArtImage, FooterLink, InlineLink, type ActivityItem } from "./parts";
import { ProfileFrame, type ProfileIdentity } from "./ProfileShell";
import { avatarUrl } from "@/lib/avatar";

const WHO: ProfileIdentity = { name: "Amara Alder", org: "Alder Studio", place: "Lisbon, Portugal", email: "amara@alder.example", seed: "profile-main", orgIcon: "luggage" };
const YEARS = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018];

const bar = { ["--oks-progress-height" as string]: "4px", ["--oks-progress-indicator" as string]: "var(--oks-color-success-500)", ["--oks-progress-track" as string]: "var(--app-bg)" };

const items = (): ActivityItem[] => [
  { icon: <Users size={16} />, body: <>Published a new article <InlineLink href="/public-profile/profiles/writer">Ten Tools Worth Keeping</InlineLink></>, time: "Today, 9:00 AM" },
  { icon: <LogIn size={16} />, body: <>I got to interview a leading specialist for an <InlineLink>upcoming post</InlineLink></>, time: "2 days ago, 4:07 PM" },
  {
    icon: <SquareDashedBottomCode size={16} />, body: <>Amara attended a Field Photography workshop</>, time: "3 days ago, 11:45 AM",
    extra: (
      <Surface className="!shadow-none">
        <div className="p-5">
          <div className="grid gap-4">
            <div className="flex flex-col gap-5 md:flex-row md:items-center">
              <div className="flex gap-5">
                <div className="max-h-20 rounded-lg border" style={{ borderColor: "var(--oks-color-warning-200)" }}>
                  <div className="flex rounded-t-lg border-b" style={{ borderColor: "var(--oks-color-warning-200)", background: "var(--oks-color-warning-50)" }}><span className="p-2 text-sm font-medium" style={{ color: "var(--oks-color-warning-500)" }}>Apr</span></div>
                  <div className="flex size-12 items-center justify-center"><span className="text-xl font-medium tracking-tight" style={{ color: "var(--app-fg-strong)" }}>02</span></div>
                </div>
                <ArtImage seed={14} width={120} height={80} className="rounded-lg" />
              </div>
              <div className="flex flex-col items-start gap-2">
                <Link href="/public-profile/activity" className="mb-px text-xs font-medium leading-[14px]" style={{ color: "var(--oks-color-warning-500)" }}>Field Photography Immersion</Link>
                <Link href="/public-profile/activity" className="text-base font-medium leading-4" style={{ color: "var(--app-fg-strong)" }}>Field Photography Immersion</Link>
                <p className="text-xs leading-[22px]" style={{ color: "var(--app-fg)" }}>Sharpen your landscape photography in a hands-on workshop guided by working photographers.</p>
              </div>
            </div>
          </div>
        </div>
      </Surface>
    ),
  },
  { icon: <Share2 size={16} />, body: <>I had to share an early look at our <InlineLink href="/public-profile/profiles/writer">upcoming content</InlineLink></>, time: "5 days ago, 4:07 PM" },
  {
    icon: <CalendarCheck2 size={16} />, body: <>Amara joined a workshop on the new product features.</>, time: "3 days ago, 11:45 AM",
    extra: (
      <Surface className="!shadow-none p-4">
        <div className="flex flex-wrap gap-2.5">
          <SquareDashedBottomCode size={18} style={{ color: "var(--oks-color-secondary-500)" }} aria-hidden />
          <div className="flex grow flex-col gap-5">
            <div className="flex flex-wrap justify-between">
              <div className="flex flex-col gap-0.5"><span className="mb-px text-base font-medium" style={{ color: "var(--app-fg-strong)" }}>Management Series: Session 1</span><span className="text-xs fathom-sec">The opening session of our management development series.</span></div>
              <FooterLink href="/account/members/teams">View</FooterLink>
            </div>
            <div className="flex flex-wrap gap-7.5">
              <div className="flex gap-1.5"><span className="text-sm font-medium fathom-sec">Code:</span><span className="text-sm" style={{ color: "var(--app-primary)" }}>#leaderdev-1</span></div>
              <div className="flex items-center gap-1.5"><span className="text-sm fathom-sec">Progress:</span><div className="min-w-[120px]"><Progress aria-label="Progress" value={70} style={bar} /></div></div>
              <div className="flex items-center gap-1.5 lg:min-w-24"><span className="text-sm fathom-sec">Guests:</span><AvatarGroup size={28} max={4} overlap={8}>{[4, 1, 2].map((a) => <Avatar key={a} name={`g${a}`} src={avatarUrl(a)} />)}<Avatar name="+24" color="primary" /></AvatarGroup></div>
            </div>
          </div>
        </div>
      </Surface>
    ),
  },
  { icon: <Coffee size={16} />, body: <>Passing <InlineLink href="/public-profile/profiles/feeds">10,000 followers</InlineLink> on the blog still feels unreal</>, time: "5 days ago, 4:07 PM" },
  { icon: <Rocket size={16} />, body: <>Wrapped the first phase of a client project early.</>, time: "6 days ago, 10:45 AM" },
  {
    icon: <Printer size={16} />, body: <>Joining the online writers&apos; conference was a rewarding experience</>, time: "2 days ago, 4:07 PM",
    extra: (
      <Surface className="!shadow-none"><div className="p-5 lg:py-4">
        <div className="flex py-4"><svg viewBox="0 0 220 160" height="160" width="220" aria-hidden><rect x="10" y="30" width="200" height="110" rx="12" fill="var(--oks-color-primary-500)" fillOpacity=".12" stroke="var(--oks-color-primary-500)" strokeWidth="2" /><circle cx="60" cy="80" r="22" fill="none" stroke="var(--oks-color-primary-500)" strokeWidth="2" /><path d="M100 70h80M100 90h60" stroke="var(--oks-color-primary-400)" strokeWidth="6" strokeLinecap="round" /></svg></div>
        <div className="flex flex-col gap-1"><div className="text-center text-base font-medium" style={{ color: "var(--app-fg-strong)" }}>Blogging Conference</div>
          <div className="flex items-center gap-1"><InlineLink href="/public-profile/profiles/company">Axio new release</InlineLink><span className="me-2 text-sm fathom-sec">email campaign</span><Chip size="sm" color="success" variant="soft" radius="md">Public</Chip></div></div>
      </div></Surface>
    ),
  },
  { icon: <ChartSpline size={16} />, body: <>Welcomed a skilled designer to our creative team, bringing valuable expertise to upcoming projects.</>, time: "2 weeks ago, 10:45 AM" },
  {
    icon: <SquareDashedBottomCode size={16} />, body: <>A new team <Link href="/public-profile/activity" className="text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>Market Pilots</Link> joined the community</>, time: "1 month ago, 11:45 AM",
    extra: (
      <Surface className="!shadow-none p-4">
        <div className="flex flex-wrap justify-between gap-7">
          <div className="flex gap-4">
            <div className="relative size-[50px]"><svg viewBox="0 0 44 48" className="size-full" aria-hidden><path d="M22 2.5 40 12.8v22.4L22 45.5 4 35.2V12.8z" strokeLinejoin="round" style={{ fill: "color-mix(in srgb, var(--oks-color-primary-500) 10%, var(--app-surface))", stroke: "color-mix(in srgb, var(--oks-color-primary-500) 35%, transparent)", strokeWidth: 1.5 }} /></svg>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 leading-none" style={{ color: "var(--oks-color-primary-500)" }}><Volleyball size={20} /></div></div>
            <div className="flex flex-col items-start gap-1.5"><Link href="/public-profile/activity" className="text-base font-medium" style={{ color: "var(--app-fg-strong)" }}>Market Pilots</Link><p className="text-sm fathom-sec">Finding a path through markets with sound strategy</p></div>
          </div>
          <div className="flex flex-wrap gap-6 lg:gap-12">
            <div className="flex flex-col items-end gap-5"><span className="text-xs uppercase fathom-sec">rating</span><div className="flex h-6 items-center"><Rating value={4} isReadOnly size="sm" aria-label="4 of 5" /></div></div>
            <div className="flex flex-col items-end gap-3 lg:min-w-24"><span className="text-xs uppercase fathom-sec">members</span><AvatarGroup size={28} max={4} overlap={8}>{[4, 1, 2].map((a) => <Avatar key={a} name={`m${a}`} src={avatarUrl(a)} />)}<Avatar name="S" color="primary" /></AvatarGroup></div>
            <div className="grid min-w-20 justify-end"><Button color="primary" startContent={<Users size={16} />}>Join</Button></div>
          </div>
        </div>
      </Surface>
    ),
  },
  { icon: <BadgeCheck size={16} />, body: <>Ran an online <InlineLink href="/public-profile/profiles/creator">team-building event</InlineLink>, building collaboration and stronger ties across the team.</>, time: "1 month ago, 13:56 PM" },
  { icon: <Trophy size={16} />, body: <>We <InlineLink href="/public-profile/profiles/collector">celebrated</InlineLink> the blog&apos;s first birthday</>, time: "3 months ago, 4:07 PM" },
];

export function ActivityFeed() {
  const [year, setYear] = useState(2025);
  const [auto, setAuto] = useState(false);
  const all = items();
  const list = year === 2025 ? all : all.slice(3, 3 + Math.max(3, 8 - (2025 - year)));
  return (
    <div className="flex min-w-0 gap-5 lg:gap-7.5">
      <Surface className="min-w-0 grow">
        <SurfaceHeader title="Activity" actions={
          <div className="flex items-center gap-2.5">
            <label className="text-sm font-medium" style={{ color: "var(--app-fg-strong)" }} htmlFor="act-auto">Auto refresh:</label>
            <span className="text-sm" style={{ color: "var(--app-fg)" }}>{auto ? "On" : "Off"}</span>
            <SwitchField id="act-auto" aria-label="Auto refresh" size="sm" checked={auto} onChange={setAuto} />
          </div>
        } />
        <div className="grow p-5">
          <ActivityRail items={list.map((it, i) => (i === list.length - 1 ? { ...it, trailingGap: false } : it))} />
        </div>
        <SurfaceFooter className="items-center"><FooterLink href="/public-profile/activity">All-time Activity</FooterLink></SurfaceFooter>
      </Surface>
      <div className="flex shrink-0 flex-col gap-2.5">
        {YEARS.map((y) => (
          <Button key={y} variant="ghost" size="sm" className="fathom-year justify-start" style={{ color: y === year ? "var(--app-primary)" : "var(--app-fg-subtle)" }} onPress={() => setYear(y)}>{y}</Button>
        ))}
      </div>
    </div>
  );
}

export function ActivityPage() {
  return (
    <ProfileFrame title="Activity" crumbs={["Public Profile", "Activity"]} who={WHO}>
      <div className="mb-7.5 flex flex-wrap items-center justify-between gap-5"><h3 className="text-lg font-semibold" style={{ color: "var(--app-fg-strong)" }}>Activity</h3></div>
      <ActivityFeed />
    </ProfileFrame>
  );
}
