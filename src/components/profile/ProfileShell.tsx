"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import {
  Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger,
} from "oks-ui";
import { BadgeCheck, ChevronDown, Download, CalendarDays, EllipsisVertical, Luggage, Mail, MapPin, MessageSquareText, Users, Volleyball } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { avatarUrl } from "@/lib/avatar";

export type ProfileIdentity = {
  name: string;
  org: string;
  place: string;
  email: string;
  seed: string;
  /** Border colour of the avatar ring (an oks colour role). */
  ring?: "success" | "primary" | "warning" | "danger" | "info";
  /** Show an organisation mark in a pale ring instead of a photo. */
  logo?: boolean;
  orgIcon?: "luggage" | "volleyball";
  /** Replace the default org / place / email row. */
  meta?: { icon: ReactNode; text: string }[];
};

export const MAYA: ProfileIdentity = {
  name: "Amara Alder", org: "Alder Studio", place: "Lisbon, Portugal", email: "amara@alder.example", seed: "profile-main", ring: "success",
};

export const PageActions = () => (
  <>
    <Button variant="bordered" startContent={<Download size={16} />}>Export</Button>
    <Button variant="bordered" startContent={<CalendarDays size={16} />}>Feb 03, 2026 - Feb 23, 2026</Button>
  </>
);

const PROFILE_MENU = [
  ["Default", "/public-profile/profiles/default"], ["Creator", "/public-profile/profiles/creator"],
  ["Company", "/public-profile/profiles/company"], ["Collector", "/public-profile/profiles/collector"],
  ["Writer", "/public-profile/profiles/writer"], ["Agency", "/public-profile/profiles/agency"],
  ["Gamer", "/public-profile/profiles/gamer"], ["Feeds", "/public-profile/profiles/feeds"],
  ["Plain", "/public-profile/profiles/plain"], ["Modal", "/public-profile/profiles/modal"],
] as const;
const PROJECT_MENU = [["3 Columns", "/public-profile/projects/3-columns"], ["2 Columns", "/public-profile/projects/2-columns"]] as const;
const MORE_MENU = [["Campaigns - Card", "/public-profile/campaigns/card"], ["Campaigns - List", "/public-profile/campaigns/list"], ["Empty", "/public-profile/empty"]] as const;

function MenuTab({ label, items, active }: { label: string; items: readonly (readonly [string, string])[]; active: boolean }) {
  return (
    <Dropdown placement="bottom-start">
      <DropdownTrigger>
        <Button variant="ghost" className="fathom-tab" data-active={active} endContent={<ChevronDown size={14} />}>{label}</Button>
      </DropdownTrigger>
      <DropdownMenu aria-label={label}>
        {items.map(([t, href]) => <DropdownItem key={href} title={t} href={href} />)}
      </DropdownMenu>
    </Dropdown>
  );
}

function LinkTab({ href, children, active }: { href: string; children: ReactNode; active: boolean }) {
  return (
    <Button as={Link} href={href} variant="ghost" className="fathom-tab" data-active={active}>{children}</Button>
  );
}

export function ProfileTabs({ trailing }: { trailing?: ReactNode }) {
  const p = usePathname();
  const in_ = (list: readonly (readonly [string, string])[]) => list.some(([, h]) => h === p);
  return (
    <Container>
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3 border-b md:flex-nowrap lg:mb-10 lg:gap-6" style={{ borderColor: "var(--app-border)" }}>
        <div className="grid">
          <div className="fathom-xscroll">
            <nav aria-label="Profile sections" className="flex items-stretch gap-3">
              <MenuTab label="Profiles" items={PROFILE_MENU} active={in_(PROFILE_MENU)} />
              <MenuTab label="Projects" items={PROJECT_MENU} active={in_(PROJECT_MENU)} />
              <LinkTab href="/public-profile/works" active={p === "/public-profile/works"}>Works</LinkTab>
              <LinkTab href="/public-profile/teams" active={p === "/public-profile/teams"}>Teams</LinkTab>
              <LinkTab href="/public-profile/network" active={p === "/public-profile/network"}>Network</LinkTab>
              <LinkTab href="/public-profile/activity" active={p === "/public-profile/activity"}>Activity</LinkTab>
              <MenuTab label="More" items={MORE_MENU} active={in_(MORE_MENU)} />
            </nav>
          </div>
        </div>
        <div className="mb-1.5 flex grow justify-end gap-2.5 lg:mb-0 lg:grow-0 lg:pb-4">
          {trailing ?? (
            <>
              <Button color="primary" startContent={<Users size={16} />}>Connect</Button>
              <Button variant="bordered" isIconOnly aria-label="Message"><MessageSquareText size={16} /></Button>
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Button variant="bordered" isIconOnly aria-label="More actions"><EllipsisVertical size={16} /></Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="Profile actions">
                  <DropdownItem title="Share profile" />
                  <DropdownItem title="Block" />
                  <DropdownItem title="Report" />
                </DropdownMenu>
              </Dropdown>
            </>
          )}
        </div>
      </div>
    </Container>
  );
}

/** Centered identity block over the hex pattern: avatar, name, org / place / email. */
export function ProfileHero({ who = MAYA }: { who?: ProfileIdentity }) {
  return (
    <div className="fathom-hero">
      <Container>
        <div className="flex flex-col items-center gap-2 py-4 lg:gap-3.5 lg:pb-10 lg:pt-5">
          {who.logo ? (
            <div className="flex size-[100px] items-center justify-center rounded-full border-2" style={{ borderColor: "var(--oks-color-danger-200)", background: "var(--app-surface)" }}>
              <Avatar name={who.name} size={44} radius="md" />
            </div>
          ) : (
            <Avatar name={who.name} src={avatarUrl(who.seed)} size={100} className="fathom-ring" style={{ ["--ring" as string]: `var(--oks-color-${who.ring ?? "success"}-500)` }} />
          )}
          <div className="flex items-center gap-1.5">
            <div className="text-lg font-semibold leading-5" style={{ color: "var(--app-fg-strong)" }}>{who.name}</div>
            <BadgeCheck size={16} style={{ color: "var(--app-primary)" }} aria-label="Verified" />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-1 text-sm lg:gap-4.5">
            {(who.meta ?? [
              { icon: who.orgIcon === "volleyball" ? <Volleyball size={14} /> : <Luggage size={14} />, text: who.org },
              { icon: <MapPin size={14} />, text: who.place },
              { icon: <Mail size={14} />, text: who.email },
            ]).map((m) => (
              <div key={m.text} className="flex items-center gap-1.25"><span className="fathom-muted">{m.icon}</span><span className="font-medium fathom-sec">{m.text}</span></div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}

/** Page frame shared by the public-profile pages: header band, hero, tabs, then the body. */
export function ProfileFrame({ title, crumbs, children, who, trailing, hero = true }: {
  title: string; crumbs?: string[]; children: ReactNode; who?: ProfileIdentity; trailing?: ReactNode; hero?: boolean;
}) {
  return (
    <>
      <PageHeader title={title} crumbs={crumbs} actions={<PageActions />} />
      {hero && <ProfileHero who={who} />}
      <ProfileTabs trailing={trailing} />
      <Container>{children}</Container>
    </>
  );
}
