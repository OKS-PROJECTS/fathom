"use client";

import { Accordion, AccordionItem, Button, SelectField, SwitchField, TextField, type TableColumn } from "oks-ui";
import { BookOpen, Database, File, Image as ImageIcon, Search, Settings2 } from "lucide-react";
import { Surface, SurfaceHeader } from "@/components/ui/Surface";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { DataGridCard } from "@/components/ui/DataGridCard";
import { PageActions } from "@/components/profile/ProfileShell";
import { GuidesCard } from "./GuidesCard";
import { Tg } from "./SecurityOverview";

type Bk = { id: number; ago: string; at: string; name: string; pages: number; media: number };
const ROWS: Bk[] = [
  ["7 minutes ago", "24 Jan, 2024, 9:24:53 AM", "Routine Quick Backup", 47, 235],
  ["Today", "24 Jan, 2024, 2:09:26 AM", "Early Morning Sync", 12, 120],
  ["Today", "23 Jan, 2024, 9:24:53 AM", "Evening Snapshot", 18, 96],
  ["Today", "23 Jan, 2024, 7:02:11 AM", "End of Day Data Archive", 8, 109],
  ["Yesterday", "23 Jan, 2024, 1:40:09 AM", "Night Owl Mirror", 21, 64],
  ["2 days ago", "22 Jan, 2024, 9:24:53 AM", "Midweek System Update", 12, 150],
  ["3 days ago", "21 Jan, 2024, 9:24:53 AM", "Weekly Full Backup", 236, 3276],
  ["4 days ago", "20 Jan, 2024, 1:17:53 AM", "Weekly Backup - Documents", 16, 32],
  ["5 days ago", "19 Jan, 2024, 2:34:13 AM", "Quick Data Backup - User Profiles", 12, 17],
  ["6 days ago", "18 Jan, 2024, 9:24:53 AM", "Weekly Data Backup - Invoices", 5, 3],
].flatMap(([ago, at, name, pages, media], i) => Array.from({ length: i === 0 ? 5 : 4 }, (_, k) => ({ id: i * 10 + k, ago, at, name, pages, media } as Bk)));

const columns: TableColumn<Bk>[] = [
  { key: "when", header: "When", sortable: true, sortValue: (r) => r.id, render: (r) => <div className="flex flex-col gap-0.5"><span className="text-sm font-medium leading-none" style={{ color: "var(--app-fg-strong)" }}>{r.ago}</span><span className="text-sm fathom-sec">{r.at}</span></div> },
  { key: "details", header: "Details", sortable: true, sortValue: (r) => r.name, render: (r) => <div className="flex flex-col gap-0.5"><span className="text-sm font-medium leading-none" style={{ color: "var(--app-fg-strong)" }}>{r.name}</span><span className="flex gap-2 text-xs fathom-sec"><span className="flex items-center gap-1"><File size={14} />{r.pages} pages</span><span className="h-4 border-e" style={{ borderColor: "var(--app-border-input)" }} /><span className="flex items-center gap-1"><ImageIcon size={14} />{r.media} media</span></span></div> },
  { key: "preview", header: "", ariaLabel: "Preview", render: () => <Button variant="ghost">Preview</Button> },
  { key: "restore", header: "", ariaLabel: "Restore", render: () => <Button variant="bordered">Restore</Button> },
];
const FAQ = ["How is the price of each plan worked out?", "Which payment methods do you take for subscriptions?", "Does the pricing include any hidden charges?", "Do yearly subscriptions come with a discount?", "Can I get a refund if I cancel a subscription?", "Is it possible to add features to my current plan?"];
const GUIDES = [
  [BookOpen, "Protecting Data Integrity: Backup and Recovery", "Keep your data safe with dependable backup and recovery options. Clear guides and expert strategies point to the right path."],
  [Database, "Reliable Restores: Planning Your Backups", "Get ready for the unexpected with proactive backup planning. Our resources help you build a routine you can rely on."],
] as const;

function SettingRow({ t, d, children }: { t: string; d: string; children: React.ReactNode }) {
  return (
    <div className="flex justify-between gap-2.5 p-5 py-4" style={{ borderBottom: "1px solid var(--app-border)" }}>
      <div className="flex flex-col gap-1.5"><span className="text-sm font-medium leading-none" style={{ color: "var(--app-fg-strong)" }}>{t}</span><span className="text-sm fathom-sec">{d}</span></div>
      {children}
    </div>
  );
}

export function BackupRecoveryPage() {
  return (
    <>
      <PageHeader title="Backup & Recovery" crumbs={["My Account", "Security", "Backup & Recovery"]} actions={<PageActions />} />
      <Container>
        <div className="grid grid-cols-1 gap-5 lg:gap-7.5 xl:grid-cols-3">
          <div className="col-span-2"><div className="flex flex-col gap-5 lg:gap-7.5">
            <DataGridCard headerClass="py-4" columns={columns} rows={ROWS} getRowKey={(r) => r.id} pageSizes={[10, 20]}
              title={<TextField aria-label="Search backups" placeholder="Search Backups..." startIcon={<Search size={16} />} className="w-40" />}
              toolbar={<div className="flex items-center gap-2.5"><div className="flex items-center gap-2"><label htmlFor="cloud-sync" className="text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>Cloud Sync</label><SwitchField id="cloud-sync" aria-label="Cloud Sync" size="sm" defaultChecked /></div><Button variant="bordered" startContent={<Settings2 size={16} />}>Columns</Button></div>} />
            <Surface>
              <SurfaceHeader title="FAQ" />
              <div className="fathom-faq px-5 py-3"><Accordion variant="light" selectionMode="single">
                {FAQ.map((q) => <AccordionItem key={q} itemKey={q} title={q}><p className="pb-4 text-sm fathom-sec">Pricing depends on the plan you choose, the number of seats and the billing period. You can compare every tier on the plans page.</p></AccordionItem>)}
              </Accordion></div>
            </Surface>
          </div></div>
          <div className="col-span-1"><div className="flex flex-col gap-5 lg:gap-7.5">
            <Surface>
              <SurfaceHeader className="mb-1" title="Backup Settings" />
              <SettingRow t="Automatic Backup" d="Scheduled Data Protection"><Tg id="bk-auto" on /></SettingRow>
              <SettingRow t="Backup Frequency" d="Select Preferred Backup"><div className="fathom-select-compact" style={{ width: 96 }}><SelectField aria-label="Backup frequency" size="sm" defaultValue="daily" options={[{ label: "Daily", value: "daily" }, { label: "Weekly", value: "weekly" }, { label: "Monthly", value: "monthly" }]} /></div></SettingRow>
              <SettingRow t="Manual Backup" d="Backup When Needed"><Button variant="bordered">Start</Button></SettingRow>
            </Surface>
            <GuidesCard guides={GUIDES} extra={63} />
          </div></div>
        </div>
      </Container>
    </>
  );
}
