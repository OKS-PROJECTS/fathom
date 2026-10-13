"use client";

import Link from "next/link";
import { useState } from "react";
import { Avatar, Button, Chip, SwitchField, TextField, type TableColumn } from "oks-ui";
import { Camera, Funnel, Layers, ListChecks, MessagesSquare, Search, Settings2, X } from "lucide-react";
import { Surface, SurfaceFooter, SurfaceHeader } from "@/components/ui/Surface";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { DataGridCard } from "@/components/ui/DataGridCard";
import { PageActions } from "@/components/profile/ProfileShell";
import { FooterLink, MoreMenu } from "@/components/profile/parts";
import { avatarUrl } from "@/lib/avatar";
import { EditButton, SettingsRows } from "./parts";
import { FaqCard } from "./Faq";
import { Help } from "./HelpCards";
import { GuidesCard } from "./GuidesCard";
import { MessageCircleQuestion } from "lucide-react";

type M = { id: number; name: string; tasks: number; place: string; status: "On Leave" | "In Office" | "Remote"; recent: string };
const BASE: Omit<M, "id">[] = [
  { name: "Nina Calder", tasks: 47, place: "South Korea", status: "On Leave", recent: "3 days ago" },
  { name: "Marlena Ashworth", tasks: 108, place: "Germany", status: "On Leave", recent: "2 days ago" },
  { name: "Callum Whitfield", tasks: 58, place: "Russia", status: "In Office", recent: "2 days ago" },
  { name: "Wells Warden", tasks: 12, place: "Brazil", status: "Remote", recent: "Today" },
  { name: "Ember Howell", tasks: 639, place: "Malaysia", status: "On Leave", recent: "Week ago" },
  { name: "Gus Hartwell", tasks: 85, place: "Canada", status: "In Office", recent: "4 days ago" },
];
const ROWS: M[] = Array.from({ length: 33 }, (_, i) => ({ id: i, ...BASE[i % BASE.length] }));
const SC = { "On Leave": "danger", "In Office": "success", Remote: "info" } as const;

const columns: TableColumn<M>[] = [
  { key: "name", header: "Member", width: 250, cellClassName: "text-nowrap", sortable: true, sortValue: (r) => r.name, render: (r) => <div className="flex gap-2.5"><Avatar name={r.name} src={avatarUrl(r.id + 10)} size={36} /><div className="flex flex-col gap-0.5"><Link href="#" className="text-sm font-medium leading-none" style={{ color: "var(--app-fg-strong)" }}>{r.name}</Link><span className="text-sm font-normal fathom-sec">{r.tasks} tasks</span></div></div> },
  { key: "place", header: "Location", width: 140, sortable: true, sortValue: (r) => r.place, render: (r) => <span className="font-normal leading-none" style={{ color: "var(--app-fg)" }}>{r.place}</span> },
  { key: "status", header: "Status", width: 120, sortable: true, sortValue: (r) => r.status, render: (r) => <Chip size="md" variant="soft" color={SC[r.status]} radius="full" startContent={<span className="size-1.5 rounded-full bg-current opacity-75" />}>{r.status}</Chip> },
  { key: "recent", header: "Recent Activity", width: 160, sortable: true, sortValue: (r) => r.id, render: (r) => <span className="font-normal fathom-sec">{r.recent}</span> },
  { key: "menu", header: "", width: 60, ariaLabel: "Actions", render: () => <MoreMenu /> },
];

const SKILLS = ["Management", "Web Design", "Code Review", "No-code", "Webflow", "AI"];
const PROFILES = [["Tyler Okafor", 3], ["Leslie Alder", 5]] as const;
const GUIDES = [
  [Layers, "Keeping Team Profiles Together: Directory Tools", "Keep your team information in one place with our management tools, including instructions, expert advice and technical documentation for a current team directory."],
  [ListChecks, "Shaping a Cohesive Team: Resources for Profiles", "Bring your team together by gathering profiles in a single place, with resources that make collecting and managing information easy."],
  [MessagesSquare, "Managing Rosters: Efficient Team Directory Tools", "Keep team details in order with our roster tools. From quick imports to detailed management, our guides walk you through each step."],
] as const;

export function TeamInfoPage() {
  const [vis, setVis] = useState(true);
  return (
    <>
      <PageHeader title="Team Info" crumbs={["My Account", "Members & Roles", "Team Info"]} actions={<PageActions />} />
      <Container>
        <div className="grid grid-cols-1 gap-5 lg:gap-7.5 xl:grid-cols-3">
          <div className="col-span-2"><div className="flex flex-col gap-5 lg:gap-7.5">
            <Surface className="min-w-full">
              <SurfaceHeader title="Team Info" actions={<div className="flex items-center gap-2"><label htmlFor="vis-all" className="text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>Visible to all</label><SwitchField id="vis-all" aria-label="Visible to all" size="sm" checked={vis} onChange={setVis} /></div>} />
              <SettingsRows labelWidth={128} actionAlign="center" actionMin={64} lastBorder={false} rows={[
                { label: "Thumbnail", py: 8, h: 81, value: <span className="text-sm fathom-sec">150x150px JPEG, PNG Image</span>, action: (
                  <div className="relative mx-auto size-16"><button type="button" aria-label="Remove thumbnail" className="absolute -end-0.5 -top-0.5 z-[1] flex size-5 items-center justify-center rounded-full border" style={{ background: "var(--app-surface)", borderColor: "var(--app-border-input)" }}><X size={13} /></button>
                    <div className="relative size-16 overflow-hidden rounded-full border-2" style={{ borderColor: "var(--oks-color-success-500)" }}><Avatar name="Product Management" src={avatarUrl("team-thumb")} size={60} /><div className="absolute inset-x-0 bottom-0 flex h-5 items-center justify-center" style={{ background: "rgb(0 0 0 / .25)" }}><Camera size={12} color="#fff" /></div></div></div>
                ) },
                { label: "Team Name", py: 8, h: 51, value: "Product Management", action: <EditButton /> },
                { label: "Description", py: 8, h: 57, value: "We welcome partnerships, guest articles and more. Join in, share what you know and widen your audience.", action: <EditButton /> },
                { label: "View as", py: 12, h: 59, value: <Chip size="md" variant="soft" color="success" radius="md">Public</Chip>, action: <EditButton /> },
                { label: "Skills", py: 11.75, h: 82, value: <div className="flex flex-wrap gap-2.5">{SKILLS.map((s) => <Chip key={s} size="sm" variant="bordered" color="secondary" radius="md">{s}</Chip>)}</div>, action: <EditButton /> },
              ]} />
            </Surface>
            <DataGridCard headerClass="" columns={columns} rows={ROWS} getRowKey={(r) => r.id} pageSizes={[5, 10, 15]}
              title={<div className="flex gap-2.5"><TextField aria-label="Search members" placeholder="Search Members..." startIcon={<Search size={16} />} className="w-40" /><Button variant="bordered" startContent={<Funnel size={16} />}>Status</Button></div>}
              toolbar={<div className="flex items-center gap-2.5"><div className="flex items-center gap-2"><label htmlFor="active-users" className="text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>Active Users</label><SwitchField id="active-users" aria-label="Active Users" size="sm" /></div><Button variant="bordered" startContent={<Settings2 size={16} />}>Columns</Button></div>} />
            <FaqCard />
            <Help title="Questions ?" text="Browse our Help Center for step-by-step guidance on billing, payments and subscriptions." link="Go to Help Center" artSize={176} icon={<MessageCircleQuestion size={48} strokeWidth={1.5} />} />
          </div></div>
          <div className="col-span-1"><div className="flex flex-col gap-5 lg:gap-7.5">
            <Surface>
              <SurfaceHeader title="Seats" />
              <div className="flex flex-col gap-2.5 p-5">
                <h4 className="text-base font-medium" style={{ color: "var(--app-fg-strong)" }}>14/49 Seats</h4>
                <p className="text-sm" style={{ color: "var(--app-fg)" }}>More seats have been released, but supply is limited, so claim yours soon while they last today.</p>
                <div><FooterLink href="#">Learn more</FooterLink></div>
              </div>
              <SurfaceFooter className="items-center"><Button variant="bordered">Add Seats</Button></SurfaceFooter>
            </Surface>
            <Surface>
              <SurfaceHeader title="2 Profiles Connected" />
              {PROFILES.map(([n, k]) => (
                <div key={n} className="flex justify-between p-5 py-4" style={{ borderBottom: "1px solid var(--app-border)" }}>
                  <div className="flex grow gap-2.5"><Avatar name={n} src={avatarUrl(k + 40)} size={36} /><div className="flex flex-col gap-1"><Link href="#" className="text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>{n}</Link><span className="text-xs fathom-sec">26 tasks</span></div></div>
                  <div className="flex items-center gap-1.5"><MoreMenu /></div>
                </div>
              ))}
              <SurfaceFooter className="items-center"><Button variant="bordered">Connect Profile</Button></SurfaceFooter>
            </Surface>
            <GuidesCard guides={GUIDES} extra={59} />
          </div></div>
        </div>
      </Container>
    </>
  );
}
