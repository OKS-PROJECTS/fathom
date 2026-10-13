"use client";

import Link from "next/link";
import { useState } from "react";
import { Avatar, AvatarGroup, Button, ButtonGroup, Chip, Progress } from "oks-ui";
import { Briefcase, Building2, Globe, LayoutGrid, List, Rocket, Wallet } from "lucide-react";
import { Surface } from "@/components/ui/Surface";
import { FooterLink, MoreMenu } from "./parts";
import { ProfileFrame, type ProfileIdentity } from "./ProfileShell";
import { avatarUrl } from "@/lib/avatar";

const WHO: ProfileIdentity = { name: "Amara Alder", org: "Alder Studio", place: "Lisbon, Portugal", email: "amara@alder.example", seed: "profile-main", orgIcon: "luggage" };

type Status = "In Progress" | "Completed" | "Upcoming";
const TONE: Record<Status, "primary" | "success" | "default"> = { "In Progress": "primary", Completed: "success", Upcoming: "default" };
const FILL: Record<Status, string> = { "In Progress": "var(--oks-palette-blue-500)", Completed: "var(--oks-color-success-500)", Upcoming: "var(--app-border-input)" };
const PCT: Record<Status, number> = { "In Progress": 55, Completed: 100, Upcoming: 100 };

const P3: [string, string, Status, string, string, number[], number, string?][] = [
  ["Phoenix SaaS", "Real-time photo sharing app", "In Progress", "Mar 06", "Dec 21", [4, 1], 0, "S"],
  ["Radiant Wave", "Short-term accommodation marketplace", "Completed", "Mar 09", "Dec 23", [24, 5], 0],
  ["Dreamweaver", "Social media photo sharing", "Upcoming", "Mar 05", "Dec 12", [21, 2, 7], 10],
  ["Horizon Quest", "Team communication and collaboration", "In Progress", "Mar 03", "Dec 11", [3, 9], 0, "H"],
  ["Silver Lining", "Cloud storage and file sharing", "In Progress", "Feb 20", "Nov 30", [11, 12], 3],
  ["Orbit Studio", "Prototype and design handoff", "Completed", "Jan 15", "Oct 01", [13, 14, 15], 0],
  ["Lantern", "Customer feedback inbox", "Upcoming", "Apr 02", "Jan 18", [16, 17], 4],
  ["Tidewater", "Shipping rates and tracking", "In Progress", "Mar 14", "Dec 05", [18, 19], 0, "T"],
  ["Pine & Co", "Invoicing for freelancers", "Completed", "Feb 02", "Aug 29", [20, 22], 0],
  ["Skyline", "Roof and solar planning", "In Progress", "Mar 22", "Dec 28", [23, 25], 6],
  ["Nimbus", "Weather alerts for fleets", "Upcoming", "May 01", "Feb 11", [26, 27], 0],
  ["Quarry", "Mineral inventory and audits", "Completed", "Jan 05", "Sep 12", [28, 29, 30], 0],
];

function Toolbar({ label, view, setView }: { label: string; view: string; setView: (v: "grid" | "list") => void }) {
  return (
    <div className="flex flex-wrap justify-between gap-5">
      <h3 className="text-lg font-semibold" style={{ color: "var(--app-fg-strong)" }}>{label}</h3>
      <ButtonGroup variant="bordered" aria-label="Layout">
        <Button isIconOnly aria-label="Grid view" aria-pressed={view === "grid"} onPress={() => setView("grid")}><LayoutGrid size={16} /></Button>
        <Button isIconOnly aria-label="List view" aria-pressed={view === "list"} onPress={() => setView("list")}><List size={16} /></Button>
      </ButtonGroup>
    </div>
  );
}

export function Projects3Page() {
  const [view, setView] = useState<"grid" | "list">("grid");
  return (
    <ProfileFrame title="3 Columns" crumbs={["Public Profile", "Projects", "3 Columns"]} who={WHO}>
      <div className="flex flex-col items-stretch gap-5 lg:gap-7.5">
        <Toolbar label={`${P3.length} Projects`} view={view} setView={setView} />
        <div className={view === "grid" ? "grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-7.5 xl:grid-cols-3" : "grid grid-cols-1 gap-5 lg:gap-7.5"}>
          {P3.map(([t, d, st, s, e, av, extra, initial]) => (
            <Surface key={t} className="p-7.5">
              <div className="mb-3 flex justify-between lg:mb-6">
                <div className="flex size-[50px] items-center justify-center rounded-lg" style={{ background: "color-mix(in srgb, var(--app-surface-2) 60%, transparent)" }}><Avatar name={t} size={30} radius="md" /></div>
                <Chip size="md" variant="soft" color={TONE[st]} radius="md">{st}</Chip>
              </div>
              <div className="mb-3 flex flex-col lg:mb-6">
                <Link href="/public-profile/projects/3-columns" className="mb-px text-lg font-medium" style={{ color: "var(--app-fg-strong)" }}>{t}</Link>
                <span className="text-sm fathom-sec">{d}</span>
              </div>
              <div className="mb-3.5 flex gap-5 lg:mb-7">
                <span className="text-sm fathom-sec">Start: <span className="text-sm font-medium" style={{ color: "var(--app-fg)" }}>{s}</span></span>
                <span className="text-sm fathom-sec">End: <span className="text-sm font-medium" style={{ color: "var(--app-fg)" }}>{e}</span></span>
              </div>
              <div className="mb-4 lg:mb-8"><Progress aria-label={`${t} progress`} value={PCT[st]} style={{ ["--oks-progress-height" as string]: "6px", ["--oks-progress-indicator" as string]: FILL[st], ["--oks-progress-track" as string]: "var(--app-bg)" }} /></div>
              <AvatarGroup size={30} max={4} overlap={8}>
                {av.map((a) => <Avatar key={a} name={`m${a}`} src={avatarUrl(a)} />)}
                {initial && <Avatar name={initial} color="primary" />}
                {extra > 0 && <Avatar name={`+${extra}`} color="success" />}
              </AvatarGroup>
            </Surface>
          ))}
        </div>
        <div className="flex grow pt-5 lg:pt-7.5"><FooterLink href="/public-profile/projects/3-columns">Show more projects</FooterLink></div>
      </div>
    </ProfileFrame>
  );
}

const P2: [string, string, Status, string, string, string, number[], number, string?][] = [
  ["Phoenix SaaS", "Cloud storage and file sharing", "In Progress", "1-3 months", "Flexible", "$65 hour", [4, 1, 2], 0, "S"],
  ["Golden Gate Analytics", "Team communication and collaboration tool", "Upcoming", "2-4 months", "Global", "$25 hour", [5, 6, 7], 0],
  ["Harbor Light", "Shipping rates and live tracking", "In Progress", "3-6 months", "Hybrid", "$48 hour", [8, 9, 10], 0],
  ["Lantern", "Customer feedback inbox", "Completed", "1-2 months", "Remote", "$41 hour", [11, 12], 3],
  ["Orbit Studio", "Prototype and design handoff", "Upcoming", "2-3 months", "Global", "$52 hour", [13, 14, 15], 0],
  ["Skyline", "Roof and solar planning", "In Progress", "2-5 months", "Remote", "$33 hour", [16, 17], 0, "S"],
];

export function Projects2Page() {
  const [view, setView] = useState<"grid" | "list">("grid");
  return (
    <ProfileFrame title="2 Columns" crumbs={["Public Profile", "Projects", "2 Columns"]} who={WHO}>
      <div className="flex flex-col items-stretch gap-5 lg:gap-7.5">
        <Toolbar label={`${P2.length} Projects`} view={view} setView={setView} />
        <div className={view === "grid" ? "grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-7.5" : "grid grid-cols-1 gap-5 lg:gap-7.5"}>
          {P2.map(([t, d, st, dur, loc, rate, av, extra, initial], i) => {
            const Icon = [Building2, Globe, Briefcase, Rocket, Wallet, Building2][i];
            return (
              <Surface key={t} className="grow justify-between overflow-hidden">
                <div className="mb-5 p-5">
                  <div className="mb-5 flex justify-between">
                    <Chip size="md" variant="soft" color={TONE[st]} radius="md">{st}</Chip>
                    <MoreMenu />
                  </div>
                  <div className="mb-2 flex justify-center"><Icon size={48} strokeWidth={1.25} style={{ color: "var(--oks-color-primary-500)" }} aria-hidden /></div>
                  <div className="mb-7 text-center">
                    <Link href="/public-profile/projects/2-columns" className="text-lg font-medium" style={{ color: "var(--app-fg-strong)" }}>{t}</Link>
                    <div className="text-sm fathom-sec">{d}</div>
                  </div>
                  <div className="mb-7.5 grid gap-1.5">
                    <span className="text-center text-xs uppercase fathom-sec">team</span>
                    <AvatarGroup size={28} max={4} overlap={8}>
                      {av.map((a) => <Avatar key={a} name={`m${a}`} src={avatarUrl(a)} />)}
                      {initial && <Avatar name={initial} color="primary" />}
                      {extra > 0 && <Avatar name={`+${extra}`} color="success" />}
                    </AvatarGroup>
                  </div>
                  <div className="flex flex-wrap gap-2 lg:gap-5">
                    {([[dur, "Duration"], [loc, "Location"], [rate, "Rate"]] as const).map(([v, l]) => (
                      <div key={l} className="grid min-w-24 grid-cols-1 content-between gap-1.5 rounded-md border border-dashed px-2.5 py-2" style={{ borderColor: "var(--app-border-input)" }}>
                        <span className="text-sm font-medium leading-none" style={{ color: "var(--app-fg-strong)" }}>{v}</span>
                        <span className="text-xs fathom-sec">{l}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Progress aria-label={`${t} progress`} value={PCT[st]} style={{ ["--oks-progress-height" as string]: "4px", ["--oks-progress-indicator" as string]: FILL[st], ["--oks-progress-track" as string]: "var(--app-bg)", ["--oks-progress-radius" as string]: "0px" }} />
              </Surface>
            );
          })}
        </div>
        <div className="flex grow pt-5 lg:pt-7.5"><FooterLink href="/public-profile/projects/2-columns">Show more projects</FooterLink></div>
      </div>
    </ProfileFrame>
  );
}
