"use client";

import Link from "next/link";
import { useState } from "react";
import { Button, Chip, SelectField, SwitchField, TextField, type TableColumn } from "oks-ui";
import { BookOpen, Copy, LifeBuoy, Settings2, StickyNote, User, Workflow, Cable } from "lucide-react";
import { Surface, SurfaceFooter, SurfaceHeader } from "@/components/ui/Surface";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { DataGridCard } from "@/components/ui/DataGridCard";
import { PageActions } from "@/components/profile/ProfileShell";
import { FooterLink, HexBadge } from "@/components/profile/parts";
import { FaqCard } from "./Faq";
import { Help } from "./HelpCards";
import { GuidesCard } from "./GuidesCard";
import { FormRow } from "./SettingsSections";
import { EditButton } from "./parts";

type K = { id: number; name: string; key: string; calls: number; on: boolean };
const BASE: [string, string, number][] = [
  ["Sign-in Service", "k3m9Q2w8X5BvNpLs7c", 15000], ["Social Media Manager", "s1t2u3v4w5x6y7z8a9", 13000], ["SMS Notification Service", "t2u3v4w5x6y7z8a9b1", 19000],
  ["Shipping Coordinator", "t6u7v8w9x0CvBnNlSc", 14000], ["SEO Analyzer", "b1c2d3e4f5g6h7i8j9", 6000], ["Sales Forecasting", "z8a9b1c2d3e4f5g6h7", 11500],
  ["Quick Pay Service", "a1b2Xc3dY4ZxQvPlQp", 10000], ["Project Management", "v4w5x6y7z8a9b1c2d3", 14500], ["Payment Gateway", "1p2q3r4s5DfGhPgPy", 25000], ["Order Tracking Sys", "e1E2gH3hB4iYtUvOtS", 9500],
];
const ROWS: K[] = Array.from({ length: 31 }, (_, i) => { const [name, key, calls] = BASE[i % BASE.length]; return { id: i, name, key, calls, on: i % 3 !== 1 }; });

function Toggle({ r }: { r: K }) { const [v, setV] = useState(r.on); return <SwitchField aria-label={`${r.name} enabled`} size="sm" checked={v} onChange={setV} />; }

const columns: TableColumn<K>[] = [
  { key: "name", header: "Integration", width: 200, sortable: true, sortValue: (r) => r.name, cellClassName: "text-nowrap", render: (r) => r.name },
  { key: "key", header: "API Key", width: 220, sortable: true, sortValue: (r) => r.key, render: (r) => <div className="flex items-center font-normal" style={{ color: "var(--app-fg)" }}>{r.key}<Button variant="ghost" isIconOnly aria-label="Copy key"><Copy size={16} /></Button></div> },
  { key: "calls", header: "Daily Calls", width: 130, sortable: true, sortValue: (r) => r.calls, render: (r) => r.calls.toLocaleString("en-US") },
  { key: "on", header: "Status", width: 100, render: (r) => <Toggle r={r} /> },
  { key: "edit", header: "", width: 70, ariaLabel: "Edit", render: () => <EditButton /> },
];
const GUIDES = [
  [Cable, "API Basics: Connect, Configure and Monitor Integrations", "Set up and manage your API connections with our configuration tools. Find clear instructions, helpful support and detailed documentation to keep every integration healthy and current."],
  [Workflow, "Expanding Reach: Tools for Growing Your APIs", "Grow what your APIs can do with our expansion tools. Everything you need to connect services, exchange data and keep connections fast is in one place."],
  [BookOpen, "Managing Rosters: Efficient Team Directory Tools", "Keep your API data tidy with our interface guides. From first setup to day-to-day management, each tool is built to simplify a step of the process."],
] as const;

export function ApiKeysPage() {
  const [pause, setPause] = useState(false);
  const [hdr, setHdr] = useState(false);
  return (
    <>
      <PageHeader title="API Keys" crumbs={["My Account", "API Keys"]} actions={<PageActions />} />
      <Container>
        <div className="grid grid-cols-1 gap-5 lg:gap-7.5 xl:grid-cols-3">
          <div className="col-span-2"><div className="flex flex-col gap-5 lg:gap-7.5">
            <Surface>
              <SurfaceHeader className="mb-5 gap-2" title="Workspace API Key" actions={<div className="flex items-center gap-2"><label htmlFor="api-pause" className="text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>Pause</label><SwitchField id="api-pause" aria-label="Pause" size="sm" checked={pause} onChange={setPause} /></div>} />
              <div className="grid gap-5 p-5 lg:gap-7.5 lg:py-7.5">
                <FormRow label="API Key" labelCls="max-w-56 font-normal"><TextField aria-label="API key" defaultValue="fathom_pk_7c1d9e04b2a85f36" endIcon={<Copy size={16} aria-hidden />} /></FormRow>
                <div className="flex grow flex-wrap justify-between gap-2 rounded-xl border p-5 sm:flex-nowrap" style={{ minHeight: 144, borderColor: "var(--app-border)", background: "linear-gradient(120deg, color-mix(in srgb, var(--oks-color-warning-500) 7%, var(--app-surface)), var(--app-surface) 70%)" }}>
                  <div className="flex gap-4">
                    <HexBadge tone="warning"><User size={20} /></HexBadge>
                    <div className="flex flex-col gap-1.5">
                      <div className="flex flex-wrap gap-2.5"><Link href="#" className="text-base font-medium" style={{ color: "var(--app-fg-strong)" }}>User Access</Link><Chip size="xs" variant="soft" color="secondary" radius="sm">16 days left</Chip></div>
                      <div className="text-sm font-normal" style={{ color: "var(--app-fg)" }}>This API key can only access <Link href="#" className="font-medium" style={{ color: "var(--app-primary)" }}>@fathomteam</Link><br />A unique key keeps access to your workspace secure.</div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 md:flex-nowrap"><button type="button" className="inline-flex h-[34px] items-center rounded-md px-3 text-[13px] font-medium fathom-btn-ink" >Renew Plan</button><Button variant="ghost">Docs</Button></div>
                </div>
                <p className="text-sm" style={{ color: "var(--app-fg)" }}>Put the full power of your application to work with our API, a secure gateway that keeps integrations simple and lets developers build dynamic, polished experiences with ease.</p>
              </div>
            </Surface>
            <DataGridCard headerClass="" title="API Integrations" columns={columns} rows={ROWS} getRowKey={(r) => r.id} pageSizes={[10, 20]}
              toolbar={<div className="flex items-center gap-2.5"><div className="flex items-center gap-2"><label htmlFor="pause-all" className="text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>Pause all</label><SwitchField id="pause-all" aria-label="Pause all" size="sm" /></div><Button color="primary">Add New</Button><Button variant="bordered" startContent={<Settings2 size={16} />}>Columns</Button></div>} />
            <Surface className="pb-2.5">
              <SurfaceHeader title="Webhooks" />
              <div className="grid gap-5 p-5">
                <p className="text-sm" style={{ color: "var(--app-fg)" }}>Configure webhooks to trigger actions on outside services as events happen. Stay up to date on changes and keep every integration running smoothly.</p>
                <FormRow label="Webhook URL" labelCls="max-w-56"><TextField aria-label="Webhook URL" placeholder="Enter URL" /></FormRow>
                <FormRow label="Webhook Name" labelCls="max-w-56"><TextField aria-label="Webhook name" placeholder="Enter name" /></FormRow>
                <FormRow label="Event Type" labelCls="max-w-56"><SelectField aria-label="Event type" defaultValue="all" options={[{ label: "All Events", value: "all" }, { label: "Created", value: "created" }, { label: "Updated", value: "updated" }]} /></FormRow>
                <div className="mb-2.5"><FormRow label="Custom Headers" labelCls="max-w-56"><div className="flex items-center gap-2"><label htmlFor="hdr" className="text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>Use Custom Header</label><SwitchField id="hdr" aria-label="Use Custom Header" size="sm" checked={hdr} onChange={setHdr} /></div></FormRow></div>
                <div className="flex justify-end"><Button color="primary">Save Changes</Button></div>
              </div>
            </Surface>
            <FaqCard />
            <Help title="Contact Support" text="Need a hand? Reach our support team for quick, personal help with any questions or concerns." link="Contact Support" icon={<LifeBuoy size={48} strokeWidth={1.5} />} />
          </div></div>
          <div className="col-span-1"><div className="flex flex-col gap-5 lg:gap-7.5">
            <Surface>
              <SurfaceHeader title="Project API keys" />
              <div className="flex flex-col gap-2.5 p-5">
                <p className="text-sm fathom-sec">Turn on &apos;Quiet Mode&apos; to mute every notification and stay focused, for set hours or while you work on a task.</p>
                <div><FooterLink href="#">Learn more</FooterLink></div>
              </div>
              <SurfaceFooter className="items-center"><Button variant="bordered" startContent={<StickyNote size={16} />}>Client Docs</Button></SurfaceFooter>
            </Surface>
            <GuidesCard guides={GUIDES} extra={59} />
          </div></div>
        </div>
      </Container>
    </>
  );
}
