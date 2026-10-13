"use client";

import Link from "next/link";
import { useState } from "react";
import { Button, ButtonGroup, Chip, Progress } from "oks-ui";
import { Camera, Gamepad2, LayoutGrid, List, Mail, Megaphone, Play, ShoppingCart, SquarePlus } from "lucide-react";
import { Surface } from "@/components/ui/Surface";
import { FooterLink, MoreMenu } from "./parts";
import { ProfileFrame, type ProfileIdentity } from "./ProfileShell";

const WHO: ProfileIdentity = { name: "Amara Alder", org: "Alder Studio", place: "Lisbon, Portugal", email: "amara@alder.example", seed: "profile-main", orgIcon: "luggage" };

type C = { icon: typeof Mail; tone: string; t: string; d: string; status: "Completed" | "Running"; stats: [string, string][] };
const CAMPAIGNS: C[] = [
  { icon: Gamepad2, tone: "secondary", t: "Harbor Streams", d: "Live gaming spectacle unveiled", status: "Completed", stats: [["50.7%", "Traffic Up"], ["20.1k", "New Fans"], ["$100k", "Donated"]] },
  { icon: Camera, tone: "danger", t: "Photo Promotion", d: "Visual stories unleashed worldwide", status: "Running", stats: [["25k", "Link Hits"], ["32.9%", "Engage Uptick"], ["$7.5k", "Earnings"]] },
  { icon: Play, tone: "danger", t: "Video Showcase", d: "Content showcase spotlighted", status: "Running", stats: [["12M", "Video Plays"], ["4.2%", "Click Rate"], ["$18k", "Revenue"]] },
  { icon: ShoppingCart, tone: "warning", t: "Product Push", d: "Shopping bliss delivered fast", status: "Completed", stats: [["50%", "Traffic Rise"], ["$34.9k", "Product Sales"], ["10k", "Actions"]] },
  { icon: Mail, tone: "warning", t: "Email Engagement", d: "Email engagement power unleashed", status: "Completed", stats: [["24.3k", "Subscribers"], ["34.8%", "Traffic Rise"], ["$20.5k", "Total Sales"]] },
  { icon: Megaphone, tone: "info", t: "Brand Reach", d: "Awareness across paid channels", status: "Running", stats: [["70k", "Impressions"], ["2.8%", "Conversion"], ["$9k", "Spend"]] },
];

const Mark = ({ c }: { c: C }) => {
  const Icon = c.icon;
  return <span className="grid size-[50px] shrink-0 place-items-center rounded-xl" style={{ background: `color-mix(in srgb, var(--oks-color-${c.tone}-500) 14%, transparent)`, color: `var(--oks-color-${c.tone}-600)` }}><Icon size={26} aria-hidden /></span>;
};
const Stats = ({ stats }: { stats: [string, string][] }) => (
  <div className="flex flex-wrap gap-2 lg:gap-5">
    {stats.map(([v, l]) => (
      <div key={l} className="flex flex-col gap-1.5 rounded-md border border-dashed px-2.5 py-2" style={{ borderColor: "var(--app-border-input)" }}>
        <span className="text-sm font-medium leading-none" style={{ color: "var(--app-fg-strong)" }}>{v}</span>
        <span className="text-xs fathom-sec">{l}</span>
      </div>
    ))}
  </div>
);
const tone = (s: C["status"]) => (s === "Completed" ? "success" : "primary");

function Head({ view, setView }: { view: string; setView: (v: "grid" | "list") => void }) {
  return (
    <div className="flex flex-wrap justify-between gap-5">
      <h3 className="text-lg font-semibold" style={{ color: "var(--app-fg-strong)" }}>{CAMPAIGNS.length} Campaigns</h3>
      <div className="flex gap-4">
        <ButtonGroup variant="bordered" aria-label="Layout">
          <Button isIconOnly aria-label="Grid view" aria-pressed={view === "grid"} onPress={() => setView("grid")}><LayoutGrid size={16} /></Button>
          <Button isIconOnly aria-label="List view" aria-pressed={view === "list"} onPress={() => setView("list")}><List size={16} /></Button>
        </ButtonGroup>
        <Button color="success" startContent={<SquarePlus size={16} />}>New Campaign</Button>
      </div>
    </div>
  );
}

export function CampaignsCardPage() {
  const [view, setView] = useState<"grid" | "list">("grid");
  return (
    <ProfileFrame title="Campaigns - Card" crumbs={["Public Profile", "More", "Campaigns - Card"]} who={WHO}>
      <div className="flex flex-col items-stretch gap-5 lg:gap-7.5">
        <Head view={view} setView={setView} />
        <div className={view === "grid" ? "grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-7.5" : "grid grid-cols-1 gap-5 lg:gap-7.5"}>
          {CAMPAIGNS.map((c) => (
            <Surface key={c.t} className="grow justify-between overflow-hidden">
              <div className="mb-5 p-5">
                <div className="mb-5 flex justify-between"><Chip size="md" variant="soft" color={tone(c.status)} radius="md">{c.status}</Chip><MoreMenu /></div>
                <div className="mb-2 flex h-[50px]"><Mark c={c} /></div>
                <div className="mb-7 text-center"><Link href="/public-profile/campaigns/card" className="text-lg font-medium" style={{ color: "var(--app-fg-strong)" }}>{c.t}</Link><div className="text-sm fathom-sec">{c.d}</div></div>
                <Stats stats={c.stats} />
              </div>
              <Progress aria-label={`${c.t} progress`} value={100} style={{ ["--oks-progress-height" as string]: "4px", ["--oks-progress-indicator" as string]: c.status === "Completed" ? "var(--oks-color-success-500)" : "var(--oks-palette-blue-500)", ["--oks-progress-track" as string]: "var(--app-bg)", ["--oks-progress-radius" as string]: "0px" }} />
            </Surface>
          ))}
        </div>
      </div>
    </ProfileFrame>
  );
}

export function CampaignsListPage() {
  const [view, setView] = useState<"grid" | "list">("list");
  return (
    <ProfileFrame title="Campaigns - List" crumbs={["Public Profile", "More", "Campaigns - List"]} who={WHO}>
      <div className="flex flex-col items-stretch gap-5 lg:gap-7.5">
        <Head view={view} setView={setView} />
        <div className="flex flex-col gap-5 lg:gap-7.5">
          {CAMPAIGNS.map((c) => (
            <Surface key={c.t} className="p-5 lg:p-7.5">
              <div className="flex flex-wrap justify-between gap-5">
                <div className="flex gap-3.5">
                  <div className="flex w-[50px]"><Mark c={c} /></div>
                  <div><Link href="/public-profile/campaigns/list" className="text-lg font-medium" style={{ color: "var(--app-fg-strong)" }}>{c.t}</Link><div className="flex text-sm fathom-sec">{c.d}</div></div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-5 lg:gap-12">
                  <Stats stats={c.stats} />
                  <div className="flex w-20"><Chip size="md" variant="soft" color={tone(c.status)} radius="md">{c.status}</Chip></div>
                  <MoreMenu />
                </div>
              </div>
            </Surface>
          ))}
        </div>
        <div className="flex grow pt-5 lg:pt-7.5"><FooterLink href="/account/integrations">Show more Campaigns</FooterLink></div>
      </div>
    </ProfileFrame>
  );
}

export function EmptyProfilePage() {
  return (
    <ProfileFrame title="Empty" crumbs={["Public Profile", "More", "Empty"]} who={WHO}>
      <Surface className="p-8 lg:p-12">
        <div className="grow p-5">
          <div className="grid justify-center py-5">
            <svg viewBox="0 0 220 170" width="220" height="170" className="block max-h-[170px]" aria-hidden>
              <rect x="40" y="40" width="140" height="100" rx="12" fill="var(--oks-color-primary-500)" fillOpacity=".1" stroke="var(--oks-color-primary-500)" strokeWidth="2" strokeDasharray="6 5" />
              <path d="M110 112V74M92 90l18-18 18 18" fill="none" stroke="var(--oks-color-primary-500)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="text-center text-lg font-medium" style={{ color: "var(--app-fg-strong)" }}>Upload an Item to Get Started</div>
          <div className="flex justify-center gap-1 text-center text-sm fathom-sec">
            Begin by crafting your first list in minutes.
            <Link href="/account/billing/plans" className="text-sm font-medium" style={{ color: "var(--app-primary)" }}>Get Started!</Link>
          </div>
        </div>
      </Surface>
      <div className="flex grow pt-5 lg:pt-7.5"><FooterLink href="/public-profile/profiles/default">Check ready Templates</FooterLink></div>
    </ProfileFrame>
  );
}
