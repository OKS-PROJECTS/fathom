"use client";

import Link from "next/link";
import { useState } from "react";
import { Avatar, AvatarGroup, Button, ButtonGroup } from "oks-ui";
import { BadgeCheck, CircleCheck, LayoutGrid, List, Mail, Users } from "lucide-react";
import { Surface, SurfaceFooter } from "@/components/ui/Surface";
import { FooterLink } from "./parts";
import { ProfileFrame, type ProfileIdentity } from "./ProfileShell";
import { avatarUrl } from "@/lib/avatar";
import { money } from "@/components/ui/cells";

const WHO: ProfileIdentity = { name: "Amara Alder", org: "Alder Studio", place: "Lisbon, Portugal", email: "amara@alder.example", seed: "profile-main", orgIcon: "luggage" };

type Conn = { name: string; org: string; email: string; photo?: number; tint?: "info" | "danger" | "success" | "warning" | "primary"; purchases: number; avg: number; total: number; extra: number; on: boolean };
const CONNS: Conn[] = [
  { name: "Elif Fontaine", org: "Summit Works", email: "elif@summit.example", photo: 21, purchases: 92, avg: 69, total: 6240, extra: 10, on: true },
  { name: "Sasha Vellum", org: "Innovate Co", email: "sasha@innovate.example", tint: "info", purchases: 123, avg: 30, total: 3713, extra: 0, on: false },
  { name: "Kai Wendt", org: "Summit Works", email: "kai@summit.example", tint: "danger", purchases: 30, avg: 150, total: 4500, extra: 0, on: true },
  { name: "Bryn Dawson", org: "Vortex Tech", email: "brian@vortex.example", photo: 25, purchases: 87, avg: 22, total: 1958, extra: 0, on: true },
  { name: "Mira Tanner", org: "Catalyst", email: "megan@catalyst.example", tint: "success", purchases: 45, avg: 300, total: 13500, extra: 0, on: false },
  { name: "Alex Marten", org: "Precision Labs", email: "alex@precision.example", photo: 30, purchases: 63, avg: 65, total: 4095, extra: 10, on: true },
];

export function NetworkPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [on, setOn] = useState<boolean[]>(CONNS.map((c) => c.on));
  return (
    <ProfileFrame title="Network" crumbs={["Public Profile", "Network"]} who={WHO}>
      <div className="flex flex-col items-stretch gap-5 lg:gap-7.5">
        <div className="flex flex-wrap justify-between gap-5">
          <h3 className="text-lg font-semibold" style={{ color: "var(--app-fg-strong)" }}>{CONNS.length} Connections</h3>
          <ButtonGroup variant="bordered" aria-label="Layout">
            <Button isIconOnly aria-label="Grid view" aria-pressed={view === "grid"} onPress={() => setView("grid")}><LayoutGrid size={16} /></Button>
            <Button isIconOnly aria-label="List view" aria-pressed={view === "list"} onPress={() => setView("list")}><List size={16} /></Button>
          </ButtonGroup>
        </div>
        <div className={view === "grid" ? "grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-7.5" : "grid grid-cols-1 gap-5 lg:gap-7.5"}>
          {CONNS.map((c, i) => (
            <Surface key={c.name}>
              <div className="grow p-5 lg:pb-7.5 lg:pt-9">
                <div className="mb-2.5 flex">
                  <div className="relative size-20">
                    {c.photo ? <Avatar name={c.name} src={avatarUrl(c.photo)} size={80} /> : (
                      <div className="flex size-20 items-center justify-center rounded-full text-2xl" style={{ background: `var(--oks-color-${c.tint}-50)`, color: `var(--oks-color-${c.tint}-600)`, boxShadow: `0 0 0 1px var(--oks-color-${c.tint}-200)` }}>{c.name[0]}</div>
                    )}
                    <div className="absolute bottom-0.5 start-16 size-2.5 -translate-y-1/2 rounded-full" style={{ background: "var(--oks-color-success-500)" }} />
                  </div>
                </div>
                <div className="mb-2.5 flex items-center gap-1.5">
                  <Link href="/public-profile/network" className="text-base font-medium leading-5" style={{ color: "var(--app-fg-strong)" }}>{c.name}</Link>
                  <BadgeCheck size={16} style={{ color: "var(--app-primary)" }} aria-label="Verified" />
                </div>
                <div className="mb-7 flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-1 fathom-sec"><BadgeCheck size={16} className="fathom-muted" />{c.org}</div>
                  <div className="flex items-center gap-1"><Mail size={16} className="fathom-muted" /><Link href="/public-profile/network" className="fathom-sec">{c.email}</Link></div>
                </div>
                <div className="mb-7.5 grid gap-1.5">
                  <span className="text-center text-xs uppercase fathom-sec">team</span>
                  <AvatarGroup size={28} max={4} overlap={8}>
                    {[4 + i, 1 + i, 2 + i].map((a) => <Avatar key={a} name={`t${a}`} src={avatarUrl(a)} />)}
                    {c.extra > 0 && <Avatar name={`+${c.extra}`} color="success" />}
                  </AvatarGroup>
                </div>
                <div className="flex flex-wrap gap-2 lg:gap-5">
                  {([[String(c.purchases), "Purchases"], [money(c.avg), "Avg. Price"], [money(c.total), "Total spent"]] as const).map(([v, l]) => (
                    <div key={l} className="grid min-w-24 grid-cols-1 gap-1.5 rounded-md border-[0.5px] border-dashed px-2.5 py-2" style={{ borderColor: "var(--app-border-input)" }}>
                      <span className="text-sm font-medium leading-none" style={{ color: "var(--app-fg-strong)" }}>{v}</span>
                      <span className="text-xs fathom-sec">{l}</span>
                    </div>
                  ))}
                </div>
              </div>
              <SurfaceFooter className="items-center">
                {on[i] ? (
                  <Button variant="bordered" startContent={<CircleCheck size={16} />} onPress={() => setOn((s) => s.map((v, k) => (k === i ? false : v)))}>Connected</Button>
                ) : (
                  <Button color="primary" startContent={<Users size={16} />} onPress={() => setOn((s) => s.map((v, k) => (k === i ? true : v)))}>Connect</Button>
                )}
              </SurfaceFooter>
            </Surface>
          ))}
        </div>
        <div className="flex grow pt-5 lg:pt-7.5"><FooterLink href="/account/members/team-info">Show more Connections</FooterLink></div>
      </div>
    </ProfileFrame>
  );
}
