"use client";

import Link from "next/link";
import { useState } from "react";
import { Avatar, AvatarGroup, Button, ButtonGroup, Chip, Rating } from "oks-ui";
import { Atom, Brain, CircleCheck, Ghost, LayoutGrid, List, Rocket, Sparkles, Zap, Orbit } from "lucide-react";
import { Surface, SurfaceFooter } from "@/components/ui/Surface";
import { ProfileFrame, type ProfileIdentity } from "./ProfileShell";
import { avatarUrl } from "@/lib/avatar";

const WHO: ProfileIdentity = { name: "Amara Alder", org: "Alder Studio", place: "Lisbon, Portugal", email: "amara@alder.example", seed: "profile-main", orgIcon: "luggage" };

const TEAMS = [
  [Ghost, "Pixel Guild", "Crafting digital experiences for the world", ["UI", "DevOps"], 5, true, 10],
  [Sparkles, "Code Harbor", "Shipping the future, one commit at a time", ["Dev", "ML", "Cloud"], 5, true, 0],
  [Brain, "Market Pilots", "Finding a path through markets with sound strategy", ["Marketing", "Brand"], 4, false, 0],
  [Atom, "Data Tide", "Turning raw data into actionable insight", ["Analytics", "Data"], 5, true, 6],
  [Rocket, "Signal Room", "Support operations that never sleep", ["Support", "Ops"], 3, false, 0],
  [Orbit, "Form & Frame", "Identity systems and campaign design", ["Brand", "Motion"], 5, true, 3],
  [Zap, "Night Shift", "Reliability engineering around the clock", ["SRE", "Infra"], 4, false, 0],
  [Brain, "Field Notes", "Research that informs the roadmap", ["Research", "UX"], 4, true, 2],
  [Ghost, "Ledger", "Finance tooling for small teams", ["Finance", "API"], 3, false, 0],
] as const;

const Divider = ({ cls = "" }: { cls?: string }) => <div className={`border-t border-dashed ${cls}`} style={{ borderColor: "var(--app-border-input)" }} />;
const Label = ({ children }: { children: string }) => <span className="text-xs uppercase fathom-sec">{children}</span>;

export function TeamsPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [joined, setJoined] = useState<Record<number, boolean>>(() => Object.fromEntries(TEAMS.map((t, i) => [i, t[5]])));
  return (
    <ProfileFrame title="Teams" crumbs={["Public Profile", "Teams"]} who={WHO}>
      <div className="flex flex-col items-stretch gap-5 lg:gap-7.5">
        <div className="flex flex-wrap justify-between gap-5">
          <h3 className="text-lg font-semibold" style={{ color: "var(--app-fg-strong)" }}>{TEAMS.length} Teams</h3>
          <ButtonGroup variant="bordered" aria-label="Layout">
            <Button isIconOnly aria-label="Grid view" aria-pressed={view === "grid"} onPress={() => setView("grid")}><LayoutGrid size={16} /></Button>
            <Button isIconOnly aria-label="List view" aria-pressed={view === "list"} onPress={() => setView("list")}><List size={16} /></Button>
          </ButtonGroup>
        </div>
        <div className={view === "grid" ? "grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-7.5 xl:grid-cols-3" : "grid grid-cols-1 gap-5 lg:gap-7.5"}>
          {TEAMS.map(([Icon, name, desc, skills, rating, , extra], i) => (
            <Surface key={name}>
              <div className="grid grow gap-7 p-5 py-7.5">
                <div className="grid place-items-center gap-4">
                  <div className="flex size-14 items-center justify-center rounded-full" style={{ boxShadow: "0 0 0 1px var(--app-border-input)", background: "color-mix(in srgb, var(--app-surface-2) 60%, transparent)", color: "var(--app-fg-muted)" }}><Icon size={24} aria-hidden /></div>
                  <div className="grid place-items-center">
                    <Link href="/public-profile/teams" className="mb-px text-base font-medium" style={{ color: "var(--app-fg-strong)" }}>{name}</Link>
                    <span className="text-center text-sm fathom-sec">{desc}</span>
                  </div>
                </div>
                <div className="grid">
                  <div className="mb-3.5 flex flex-wrap items-center justify-between gap-2">
                    <Label>skills</Label>
                    <div className="flex flex-wrap gap-1.5">{skills.map((s) => <Chip key={s} size="sm" variant="bordered" radius="md">{s}</Chip>)}</div>
                  </div>
                  <Divider />
                  <div className="my-2.5 flex flex-wrap items-center justify-between gap-2"><Label>rating</Label><div className="flex h-6 items-center"><Rating value={rating} isReadOnly size="sm" aria-label={`${rating} of 5`} /></div></div>
                  <Divider cls="mb-3.5" />
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <Label>members</Label>
                    <AvatarGroup size={28} max={3} overlap={8}>
                      {[4 + i, 1 + i, 2 + i].map((a) => <Avatar key={a} name={`m${a}`} src={avatarUrl(a)} />)}
                      {extra > 0 && <Avatar name={`+${extra}`} color="success" />}
                    </AvatarGroup>
                  </div>
                </div>
              </div>
              <SurfaceFooter className="items-center">
                <Button variant="bordered" startContent={joined[i] ? <CircleCheck size={16} /> : undefined} onPress={() => setJoined((j) => ({ ...j, [i]: !j[i] }))}>{joined[i] ? "Joined" : "Join"}</Button>
              </SurfaceFooter>
            </Surface>
          ))}
        </div>
      </div>
    </ProfileFrame>
  );
}
