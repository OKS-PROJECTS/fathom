"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { Avatar, AvatarGroup, Button, Chart, Chip, SwitchField, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Progress } from "oks-ui";
import { format } from "date-fns";
import { avatarUrl } from "@/lib/avatar";
import { Heart, Mails, CalendarCheck2, Check, Coffee, Rocket, SquareDashedBottomCode, LogIn, Printer, Share2, Trophy, Users, EllipsisVertical, Plus, FileText, FileCode2, FileImage, FileType } from "lucide-react";
import { Surface, SurfaceBody, SurfaceFooter, SurfaceHeader } from "@/components/ui/Surface";

/** Ghost "more" button with a small menu; used in card headers and list rows. */
export function MoreMenu({ items = ["View", "Edit", "Remove"], label = "More actions", compact = false }: { items?: string[]; label?: string; compact?: boolean }) {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Button variant="ghost" isIconOnly size={compact ? "sm" : undefined} aria-label={label}><EllipsisVertical size={18} /></Button>
      </DropdownTrigger>
      <DropdownMenu aria-label={label}>
        {items.map((i) => <DropdownItem key={i} title={i} />)}
      </DropdownMenu>
    </Dropdown>
  );
}

/** Dashed-underline text link used in card footers. */
export function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Button as={Link} href={href} variant="link" color="primary" className="fathom-footlink">{children}</Button>
  );
}

export function CardWithFooter({ title, toolbar, children, footer, bodyClass = "p-5", className = "" }: {
  title: string; toolbar?: ReactNode; children: ReactNode; footer?: ReactNode; bodyClass?: string; className?: string;
}) {
  return (
    <Surface className={className}>
      <SurfaceHeader title={title} actions={toolbar} />
      <SurfaceBody className={bodyClass}>{children}</SurfaceBody>
      {footer && <SurfaceFooter className="items-center">{footer}</SurfaceFooter>}
    </Surface>
  );
}

const FILE_TONES = {
  pdf: { icon: FileText, tone: "danger" }, doc: { icon: FileType, tone: "primary" },
  code: { icon: FileCode2, tone: "warning" }, image: { icon: FileImage, tone: "success" },
} as const;

export function FileGlyph({ kind }: { kind: keyof typeof FILE_TONES }) {
  const { icon: Icon, tone } = FILE_TONES[kind];
  return (
    <span className="grid size-8 shrink-0 place-items-center rounded-md"
      style={{ background: `color-mix(in srgb, var(--oks-color-${tone}-500) 14%, transparent)`, color: `var(--oks-color-${tone}-600)` }}>
      <Icon size={18} aria-hidden />
    </span>
  );
}

/** Six-sided badge with a coloured icon, used for community badges. */
export function HexBadge({ children, tone, size = 50 }: { children: ReactNode; tone: "primary" | "warning" | "success" | "secondary" | "danger" | "info"; size?: number }) {
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg viewBox="0 0 44 48" className="size-full" aria-hidden>
        <path d="M22 2.5 40 12.8v22.4L22 45.5 4 35.2V12.8z" strokeLinejoin="round"
          style={{ fill: `color-mix(in srgb, var(--oks-color-${tone}-500) 10%, var(--app-surface))`, stroke: `color-mix(in srgb, var(--oks-color-${tone}-500) 35%, transparent)`, strokeWidth: 1.5 }} />
      </svg>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 leading-none" style={{ color: `var(--oks-color-${tone}-500)` }}>{children}</div>
    </div>
  );
}

export function CompanyMark({ name }: { name: string }) {
  return <Avatar name={name} size={36} radius="md" />;
}

export const SkillChips = ({ skills }: { skills: string[] }) => (
  <div className="mb-2 flex flex-wrap gap-2.5">
    {skills.map((s) => <Chip key={s} size="sm" variant="soft" color="default" radius="md">{s}</Chip>)}
  </div>
);

/** Deterministic abstract artwork standing in for photos: layered gradients keyed by a seed. */
export function ArtImage({ seed, className = "", ratio = "aspect-[16/10]", width, height }: { seed: number; className?: string; ratio?: string; width?: number | string; height?: number | string }) {
  const roles = ["primary", "info", "success", "warning", "danger", "secondary"];
  const a = roles[seed % roles.length];
  const b = roles[(seed * 3 + 1) % roles.length];
  const ang = 25 + ((seed * 47) % 140);
  return (
    <div
      className={`${width !== undefined ? "" : `${ratio} w-full`} shrink-0 ${className}`}
      aria-hidden
      style={{
        width, height,
        background: `radial-gradient(circle at ${20 + ((seed * 13) % 60)}% ${25 + ((seed * 29) % 50)}%, color-mix(in srgb, var(--oks-color-${b}-400) 55%, transparent), transparent 55%), linear-gradient(${ang}deg, color-mix(in srgb, var(--oks-color-${a}-500) 45%, var(--app-surface-2)), color-mix(in srgb, var(--oks-color-${a}-300) 30%, var(--app-surface-2)))`,
      }}
    />
  );
}

export type ActivityItem = { icon: ReactNode; body: ReactNode; time: string; extra?: ReactNode; trailingGap?: boolean };

/** Vertical activity rail: round icon, connector line, text and timestamp. */
export function ActivityRail({ items }: { items: ActivityItem[] }) {
  return (
    <>
      {items.map((it, i) => (
        <div key={i} className="relative flex items-start">
          {i < items.length - 1 && (
            <div className="absolute bottom-0 start-0 top-9 w-9 translate-x-1/2 border-s" style={{ borderColor: "var(--app-border-input)" }} />
          )}
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full border"
            style={{ background: "color-mix(in srgb, var(--app-surface-2) 60%, transparent)", borderColor: "var(--app-border-input)", color: "var(--app-fg-muted)" }}>
            {it.icon}
          </div>
          <div className={`grow ps-2.5 text-base ${i < items.length - 1 || it.trailingGap ? "mb-7" : ""}`}>
            <div className={`flex flex-col ${it.extra ? "pb-2.5" : ""}`}>
              <div className="text-sm" style={{ color: "var(--app-fg)" }}>{it.body}</div>
              <span className="text-xs fathom-sec">{it.time}</span>
            </div>
            {it.extra}
          </div>
        </div>
      ))}
    </>
  );
}

export const InlineLink = ({ href = "#", children }: { href?: string; children: ReactNode }) => (
  <Link href={href} className="text-[13px] font-medium" style={{ color: "var(--app-primary)" }}>{children}</Link>
);

/** Large value over a muted caption. */
export const BigStat = ({ value, label }: { value: string; label: string }) => (
  <div className="flex flex-col gap-1.5">
    <span className="text-2xl font-semibold" style={{ color: "var(--app-fg-strong)" }}>{value}</span>
    <span className="text-sm font-normal fathom-sec">{label}</span>
  </div>
);

export const PROJECTS = [
  { n: "Harbor app development", p: 72, tone: "var(--oks-color-primary-500)", av: [4, 1, 2], extra: 3, extraTone: "success", due: "2025-08-24" },
  { n: "Strategic partnership deal", p: 48, tone: "var(--oks-color-secondary-300)", av: [1, 2], extra: 0, initial: "M", due: "2025-09-10" },
  { n: "Client onboarding", p: 64, tone: "var(--oks-color-primary-500)", av: [20, 7], extra: 0, due: "2025-09-19" },
  { n: "Widget supply agreement", p: 100, tone: "var(--oks-color-success-500)", av: [6, 23, 12], extra: 1, extraTone: "primary", due: "2025-05-05" },
  { n: "Project X redesign", p: 55, tone: "var(--oks-color-primary-500)", av: [2, 15, 18], extra: 2, extraTone: "success", due: "2026-02-01" },
];

export function ProjectsCard() {
  return (
<CardWithFooter title="Projects" toolbar={<MoreMenu />} bodyClass="p-0" footer={<FooterLink href="/public-profile/projects/3-columns">All Projects</FooterLink>}>
  <div className="fathom-table fathom-table-roomy fathom-xscroll">
    <table className="w-full">
      <thead>
        <tr>
          <th className="min-w-52">Project Name</th><th className="min-w-40">Progress</th>
          <th className="min-w-32 !text-end">People</th><th className="min-w-32 !text-end">Due Date</th><th className="w-[30px]" aria-label="Actions" />
        </tr>
      </thead>
      <tbody>
        {PROJECTS.map((p) => (
          <tr key={p.n}>
            <td className="!py-2"><Link href="/public-profile/profiles/default" className="text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>{p.n}</Link></td>
            <td><Progress aria-label={`${p.n} progress`} value={p.p} style={{ ["--oks-progress-height" as string]: "4px", ["--oks-progress-indicator" as string]: p.tone, ["--oks-progress-track" as string]: "var(--app-bg)" }} /></td>
            <td>
              <div className="flex justify-end">
                <AvatarGroup size={28} max={4} overlap={8}>
                  {p.av.map((a) => <Avatar key={a} name={`m${a}`} src={avatarUrl(a)} />)}
                  {p.initial && <Avatar name={p.initial} color="danger" />}
                </AvatarGroup>
              </div>
            </td>
            <td className="text-end text-sm font-medium fathom-sec">{format(new Date(p.due), "d MMM, yyyy")}</td>
            <td><MoreMenu /></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</CardWithFooter>
  );
}

const SPLIT_ROLES = ["primary", "warning", "success", "danger", "info"] as const;

/** Donut with a vertical legend to its right. */
export function DonutCard({ title, data, height = 230 }: { title: string; data: { k: string; v: number }[]; height?: number }) {
  return (
    <CardWithFooter title={title} toolbar={<MoreMenu />} bodyClass="flex items-center gap-4 px-3 py-1">
      <div className="min-w-0 flex-1">
        <Chart type="donut" data={data} x="k" series={[{ key: "v", name: "Share" }]} height={height} unstyled legend={false} pie={{ center: false }} palette={{ roles: SPLIT_ROLES as never }} />
      </div>
      <ul className="flex shrink-0 flex-col gap-2 pe-3 text-sm" style={{ color: "var(--app-fg)" }}>
        {data.map((d, i) => (
          <li key={d.k} className="flex items-center gap-2">
            <span className="size-2.5 rounded-full" style={{ background: `var(--oks-color-${SPLIT_ROLES[i % 5]}-500)` }} />{d.k}
          </li>
        ))}
      </ul>
    </CardWithFooter>
  );
}

/** People list where each row ends in a follow / following round button. */
export function FollowCard({ title, rows, footer, unit = "connections" }: { title: string; rows: [string, number, boolean][]; footer: ReactNode; unit?: string }) {
  return (
    <CardWithFooter title={title} toolbar={<MoreMenu />} footer={footer}>
      <div className="flex flex-col gap-2 lg:gap-5">
        {rows.map(([n, c, on], i) => (
          <div key={n} className="flex gap-2">
            <div className="flex grow gap-2.5">
              <Avatar name={n} src={avatarUrl(70 + i)} size={36} />
              <div className="flex flex-col">
                <Link href="/public-profile/profiles/company" className="mb-px text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>{n}</Link>
                <span className="text-xs fathom-sec">{c} {unit}</span>
              </div>
            </div>
            <button type="button" aria-label={on ? `Unfollow ${n}` : `Follow ${n}`} aria-pressed={on} className="fathom-round-toggle" data-on={on}>
              {on ? <Check size={14} /> : <Plus size={14} />}
            </button>
          </div>
        ))}
      </div>
    </CardWithFooter>
  );
}

/** The "Activities" feed card with an auto-refresh switch. */

export const DEFAULT_ACTIVITY: ActivityItem[] = [
                { icon: <Users size={16} />, body: <>Published a new article <InlineLink href="/public-profile/profiles/writer">Ten Tools Worth Keeping</InlineLink></>, time: "Today, 9:00 AM" },
                { icon: <LogIn size={16} />, body: <>I got to interview a leading specialist for an <InlineLink>upcoming post</InlineLink></>, time: "2 days ago, 4:07 PM" },
                { icon: <Share2 size={16} />, body: <>I had to share an early look at our <InlineLink>upcoming content</InlineLink></>, time: "5 days ago, 4:07 PM" },
                {
                  icon: <Printer size={16} />, body: <>Joining the online writers&apos; conference was a rewarding experience</>, time: "2 days ago, 4:07 PM",
                  extra: (
                    <div><Surface>
                      <div className="p-5 lg:py-4">
                        <div className="flex py-4">
                          <svg viewBox="0 0 220 160" height="160" width="220" aria-hidden><rect x="10" y="30" width="200" height="110" rx="12" fill="var(--oks-color-primary-500)" fillOpacity=".12" stroke="var(--oks-color-primary-500)" strokeWidth="2" /><circle cx="60" cy="80" r="22" fill="none" stroke="var(--oks-color-primary-500)" strokeWidth="2" /><path d="M100 70h80M100 90h60" stroke="var(--oks-color-primary-400)" strokeWidth="6" strokeLinecap="round" /></svg>
                        </div>
                        <div className="flex flex-col gap-1">
                          <div className="text-center text-base font-medium" style={{ color: "var(--app-fg-strong)" }}>Blogging Conference</div>
                          <div className="flex items-center gap-1">
                            <InlineLink href="/public-profile/profiles/company">Axio new release</InlineLink>
                            <span className="me-2 text-sm fathom-sec">email campaign</span>
                            <Chip size="sm" color="success" variant="soft" radius="md">Public</Chip>
                          </div>
                        </div>
                      </div>
                    </Surface></div>
                  ),
                },
                { icon: <Coffee size={16} />, body: <>Passing <InlineLink href="/public-profile/profiles/feeds">10,000 followers</InlineLink> on the blog still feels unreal</>, time: "5 days ago, 4:07 PM" },
                { icon: <Trophy size={16} />, body: <>We <InlineLink href="/public-profile/profiles/collector">celebrated</InlineLink> the blog&apos;s first birthday</>, time: "3 months ago, 4:07 PM" },
              ];

export function ActivitiesCard({ title = "Activities", items, footerLabel = "All-time Activities", switchOnly }: { title?: string; items?: ActivityItem[]; footerLabel?: string; switchOnly?: boolean }) {
  const [auto, setAuto] = useState(false);
  return (
<CardWithFooter
              title={title}
              toolbar={
                switchOnly ? (
                  <div className="flex items-center gap-2">
                    <label className="text-sm font-medium" style={{ color: "var(--app-fg-strong)" }} htmlFor="auto-update">Auto update</label>
                    <SwitchField id="auto-update" aria-label="Auto update" size="sm" checked={auto} onChange={setAuto} />
                  </div>
                ) : (
                <div className="flex items-center gap-2.5">
                  <label className="text-sm font-medium" style={{ color: "var(--app-fg-strong)" }} htmlFor="auto-refresh">Auto refresh:</label>
                  <span className="text-sm" style={{ color: "var(--app-fg)" }}>{auto ? "On" : "Off"}</span>
                  <SwitchField id="auto-refresh" aria-label="Auto refresh" size="sm" checked={auto} onChange={setAuto} />
                </div>
                )
              }
              footer={<FooterLink href="/public-profile/activity">{footerLabel}</FooterLink>}
            >
              <ActivityRail items={items ?? DEFAULT_ACTIVITY} />
            </CardWithFooter>
  );
}

/** Two-column label / value rows inside a card body. */
export function KeyValueTable({ rows, gap = "lg:pe-8" }: { rows: [string, ReactNode][]; gap?: string }) {
  return (
    <table className="w-full text-sm">
      <tbody>
        {rows.map(([a, b]) => (
          <tr key={a}>
            <td className={`py-2 pe-4 align-middle fathom-sec ${gap}`}>{a}</td>
            <td className="py-2 align-middle" style={{ color: "var(--app-fg-strong)" }}>{b}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function recentActivity(withImage: boolean): ActivityItem[] {
  return [
  { icon: <Users size={16} />, body: <>Jordan sent an <InlineLink href="/public-profile/profiles/agency">inquiry</InlineLink> about a <InlineLink href="/public-profile/profiles/agency">new product</InlineLink>.</>, time: "Today, 9:00 AM" },
  {
    icon: <CalendarCheck2 size={16} />, body: <>Jordan joined a workshop on the new product features.</>, time: "3 days ago, 11:45 AM",
    extra: (
      <Surface className="!shadow-none p-4">
        <div className="flex flex-wrap gap-2.5">
          <SquareDashedBottomCode size={18} style={{ color: "var(--oks-color-secondary-500)" }} aria-hidden />
          <div className="flex grow flex-col gap-5">
            <div className="flex flex-wrap justify-between">
              <div className="flex flex-col gap-0.5">
                <span className="mb-px text-base font-medium" style={{ color: "var(--app-fg-strong)" }}>Management Series: Session 1</span>
                <span className="text-xs fathom-sec">The opening session of our management development series.</span>
              </div>
              <FooterLink href="/account/members/teams">View</FooterLink>
            </div>
            <div className="flex flex-wrap gap-7.5">
              <div className="flex gap-1.5"><span className="text-sm font-medium fathom-sec">Code:</span><span className="text-sm" style={{ color: "var(--app-primary)" }}>#leaderdev-1</span></div>
              <div className="flex items-center gap-1.5"><span className="text-sm fathom-sec">Progress:</span>
                <div className="min-w-[120px]"><Progress aria-label="Progress" value={70} style={{ ["--oks-progress-height" as string]: "4px", ["--oks-progress-indicator" as string]: "var(--oks-color-success-500)", ["--oks-progress-track" as string]: "var(--app-bg)" }} /></div></div>
              <div className="flex items-center gap-1.5 lg:min-w-24"><span className="text-sm fathom-sec">Guests:</span>
                <AvatarGroup size={28} max={4} overlap={8}>{[4, 1, 2].map((a) => <Avatar key={a} name={`g${a}`} src={avatarUrl(a)} />)}<Avatar name="+24" color="primary" /></AvatarGroup></div>
            </div>
          </div>
        </div>
      </Surface>
    ),
  },
  { icon: <LogIn size={16} />, body: <>Jordan&apos;s last login to the <InlineLink href="/public-profile/profiles/agency">Customer Portal</InlineLink></>, time: "5 days ago, 4:07 PM" },
  {
    icon: <Printer size={16} />, body: <>Email campaign sent to Jordan for a special promotion.</>, time: "1 week ago, 11:45 AM",
    extra: (
      <Surface className="!shadow-none">
        <div className="p-5 lg:py-4">
          <div className="flex py-4">{withImage && <svg viewBox="0 0 220 160" height="160" width="220" aria-hidden><rect x="10" y="30" width="200" height="110" rx="12" fill="var(--oks-color-primary-500)" fillOpacity=".12" stroke="var(--oks-color-primary-500)" strokeWidth="2" /><circle cx="60" cy="80" r="22" fill="none" stroke="var(--oks-color-primary-500)" strokeWidth="2" /><path d="M100 70h80M100 90h60" stroke="var(--oks-color-primary-400)" strokeWidth="6" strokeLinecap="round" /></svg>}</div>
          <div className="flex flex-col gap-1">
            <div className="text-center text-base font-medium" style={{ color: "var(--app-fg-strong)" }}>First Campaign Created</div>
            <div className="flex items-center gap-1"><InlineLink href="/public-profile/profiles/company">Axio new release</InlineLink><span className="me-2 text-sm fathom-sec">email campaign</span><Chip size="sm" color="success" variant="soft" radius="md">Public</Chip></div>
          </div>
        </div>
      </Surface>
    ),
  },
  { icon: <Rocket size={16} />, body: <>Explored niche demo ideas for product-specific solutions.</>, time: "3 weeks ago, 4:07 PM", trailingGap: true },
];
}

/** Cover image, title, author and counters. */
export function WorkCard({ title, author, likes, comments, seed, avatar }: { title: string; author: string; likes: number; comments: number; seed: number; avatar: number }) {
  return (
    <Surface className="fathom-card-flat">
      <ArtImage seed={seed} ratio="aspect-[3/2]" className="rounded-t-xl" />
      <div className="flex flex-col gap-2 px-5 py-4.5">
        <Link href="/public-profile/profiles/company" className="text-lg font-medium" style={{ color: "var(--app-fg-strong)" }}>{title}</Link>
        <div className="flex grow justify-between">
          <div className="flex grow items-center">
            <Avatar name={author} src={avatarUrl(avatar)} size={28} className="me-2" />
            <Link href="/public-profile/profiles/collector" className="text-sm" style={{ color: "var(--app-fg)" }}>{author}</Link>
          </div>
          <div className="flex gap-3">
            <div className="flex items-center gap-1"><Heart size={16} className="fathom-muted" /><span className="py-2 text-sm" style={{ color: "var(--app-fg)" }}>{likes}</span></div>
            <div className="flex items-center gap-1"><Mails size={16} className="fathom-muted" /><span className="py-2 text-sm" style={{ color: "var(--app-fg)" }}>{comments}</span></div>
          </div>
        </div>
      </div>
    </Surface>
  );
}
