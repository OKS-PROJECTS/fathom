"use client";

import { useState } from "react";
import { Button, ButtonGroup } from "oks-ui";
import { LayoutGrid, List, Rocket } from "lucide-react";
import { Surface } from "@/components/ui/Surface";
import { FooterLink, WorkCard } from "./parts";
import { ProfileFrame, type ProfileIdentity } from "./ProfileShell";

const WHO: ProfileIdentity = { name: "Amara Alder", org: "Alder Studio", place: "Lisbon, Portugal", email: "amara@alder.example", seed: "profile-main", orgIcon: "luggage" };

const WORKS = [
  ["Harbor Light", "Dmitri Eriksen", 24, 5], ["Quiet Hours", "Elif Fontaine", 187, 49], ["Amber Grid", "Farid Garrow", 60, 13],
  ["Static Garden", "Greta Holloway", 37, 16], ["Open Field", "Hana Ishikawa", 625, 109], ["Low Tide", "Idris Jaeger", 6, 1],
  ["Long Way Round", "Joon Kovac", 30, 22], ["Together Now", "Katya Lindqvist", 19, 23],
] as const;

export function WorksPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  return (
    <ProfileFrame title="Works" crumbs={["Public Profile", "Works"]} who={WHO}>
      <div className="flex flex-col items-stretch gap-5 lg:gap-7.5">
        <div className="flex flex-wrap justify-between gap-5">
          <h3 className="text-lg font-semibold" style={{ color: "var(--app-fg-strong)" }}>{WORKS.length} Works</h3>
          <ButtonGroup variant="bordered" aria-label="Layout">
            <Button isIconOnly aria-label="Grid view" aria-pressed={view === "grid"} onPress={() => setView("grid")}><LayoutGrid size={16} /></Button>
            <Button isIconOnly aria-label="List view" aria-pressed={view === "list"} onPress={() => setView("list")}><List size={16} /></Button>
          </ButtonGroup>
        </div>
        <div className={view === "grid" ? "grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-7.5 xl:grid-cols-3" : "grid grid-cols-1 gap-5 lg:gap-7.5"}>
          {WORKS.map(([t, a, l, c], i) => <WorkCard key={t} title={t} author={a} likes={l} comments={c} seed={i + 2} avatar={60 + i} />)}
          <Surface className="grid border-2 border-dashed !shadow-none" >
            <div className="grid grow p-5" style={{ borderRadius: "inherit" }}>
              <div className="flex flex-col items-center justify-center gap-5">
                <div className="flex pt-5">
                  <div className="relative size-[90px]">
                    <svg viewBox="0 0 44 48" className="size-full" aria-hidden><path d="M22 2.5 40 12.8v22.4L22 45.5 4 35.2V12.8z" strokeLinejoin="round" style={{ fill: "color-mix(in srgb, var(--oks-color-warning-500) 10%, var(--app-surface))", stroke: "color-mix(in srgb, var(--oks-color-warning-500) 35%, transparent)", strokeWidth: 1.5 }} /></svg>
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 leading-none" style={{ color: "var(--oks-color-warning-400)" }}><Rocket size={30} /></div>
                  </div>
                </div>
                <div className="flex flex-col text-center">
                  <span className="mb-px text-xl font-semibold" style={{ color: "var(--app-fg-strong)" }}>Offer a Work</span>
                  <span className="text-sm font-medium fathom-sec">Launch New Responsibilities</span>
                </div>
              </div>
            </div>
          </Surface>
        </div>
        <div className="flex grow pt-5 lg:pt-7.5"><FooterLink href="/public-profile/works">Show more works</FooterLink></div>
      </div>
    </ProfileFrame>
  );
}
