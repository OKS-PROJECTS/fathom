"use client";

import Link from "next/link";
import { useState } from "react";
import { BadgeCheck, CircleCheck, LayoutGrid, List, Mail, Plus } from "lucide-react";
import { Avatar, AvatarGroup, Button } from "oks-ui";
import { Surface, SurfaceFooter } from "@/components/ui/Surface";
import { PEOPLE } from "@/data/people";
import { avatarUrl } from "@/lib/avatar";
import { CardsToolbarParts, NetworkFrame, ShowMore, TONES } from "./parts";

const COMPANIES = ["Summit Works", "Northwind Labs", "Helix Works", "Orbit Foundry", "Lattice Co", "Meridian Group"];

export function TeamCrewCardsPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  const rows = PEOPLE.slice(0, 6);
  return (
    <NetworkFrame title="Team Crew" crumbs={["Network", "User Cards", "Team Crew"]}>
      <div className="flex flex-col items-stretch gap-5 lg:gap-7.5">
        <div className="flex flex-wrap justify-between gap-5">
          <h3 className="text-base font-medium" style={{ color: "var(--app-fg-strong)" }}>Showing {rows.length} Users</h3>
          <div className="flex flex-wrap gap-5">
            <div className="flex flex-wrap gap-2.5"><CardsToolbarParts /></div>
            <div className="flex gap-1">
              {([["grid", LayoutGrid], ["list", List]] as const).map(([k, I]) => (
                <Button key={k} variant="bordered" isIconOnly aria-label={`${k} view`} onPress={() => setView(k)} style={view === k ? { background: "var(--app-surface-2)" } : undefined}><I size={16} /></Button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 lg:gap-7.5">
          <div className={`grid grid-cols-1 gap-5 lg:gap-7.5 ${view === "grid" ? "lg:grid-cols-2" : ""}`}>
            {rows.map((p, i) => {
              const letter = i % 3 === 1;
              const [tone] = TONES[i % TONES.length];
              const connected = i % 3 !== 1;
              return (
                <Surface key={p.id}>
                  <div className="grow p-5 lg:pb-7.5 lg:pt-9">
                    <div className="mb-2.5 flex">
                      <div className="relative size-20">
                        {letter
                          ? <div className="flex size-20 items-center justify-center rounded-full text-2xl" style={{ color: `var(${tone})`, background: `color-mix(in srgb, var(${tone}) 10%, var(--app-surface))`, boxShadow: `0 0 0 1px color-mix(in srgb, var(${tone}) 30%, transparent)` }}>{p.name[0]}</div>
                          : <Avatar name={p.name} src={avatarUrl(p.id + 60)} size={80} />}
                        <span className="absolute bottom-0.5 start-16 size-2.5 -translate-y-1/2 rounded-full" style={{ background: "var(--oks-color-success-500)" }} />
                      </div>
                    </div>
                    <div className="mb-2.5 flex gap-1.5"><Link href="#" className="text-base font-medium leading-5" style={{ color: "var(--app-fg-strong)" }}>{p.name}</Link><BadgeCheck size={16} style={{ color: "var(--app-primary)" }} aria-label="Verified" /></div>
                    <div className="mb-7 flex flex-wrap gap-4 text-sm fathom-sec">
                      <div className="flex items-center gap-1.5"><BadgeCheck size={16} className="fathom-sec" aria-hidden />{COMPANIES[i % COMPANIES.length]}</div>
                      <div className="flex items-center gap-1.5"><Mail size={16} className="fathom-sec" aria-hidden /><Link href="#" className="fathom-sec">{p.email}</Link></div>
                    </div>
                    <div className="mb-7.5 grid gap-1.5">
                      <span className="text-center text-xs uppercase fathom-sec">team</span>
                      <div className="flex justify-center"><AvatarGroup size={28} max={4} overlap={8}>
                        {[0, 1, 2].map((k) => <Avatar key={k} name={`t${k}`} src={avatarUrl(p.id * 3 + k)} />)}{i % 2 === 0 && <Avatar name="+10" color="success" />}
                      </AvatarGroup></div>
                    </div>
                    <div className="flex flex-wrap gap-2 lg:gap-5">
                      {[[String(p.purchases), "Purchases"], [`$${p.avgPrice}`, "Avg. Price"], [`$${p.spent.toLocaleString("en-US")}`, "Total spent"]].map(([v, l]) => (
                        <div key={l} className="grid min-w-24 grid-cols-1 gap-1.5 rounded-md border border-dashed px-2.5 py-2" style={{ borderColor: "var(--app-border-input)", borderWidth: "0.5px" }}>
                          <span className="text-sm font-medium leading-none" style={{ color: "var(--app-fg-strong)" }}>{v}</span><span className="text-xs fathom-sec">{l}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <SurfaceFooter className="items-center">
                    {connected ? <Button variant="bordered" startContent={<CircleCheck size={16} />}>Connected</Button> : <Button color="primary" startContent={<Plus size={16} />}>Connect</Button>}
                  </SurfaceFooter>
                </Surface>
              );
            })}
          </div>
        </div>
        <ShowMore>Show more projects</ShowMore>
      </div>
    </NetworkFrame>
  );
}
