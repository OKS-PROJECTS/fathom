"use client";

import Link from "next/link";
import { Avatar, Button, SwitchField, TextField, type TableColumn } from "oks-ui";
import { Funnel, Globe, Search, Settings2 } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { DataGridCard } from "@/components/ui/DataGridCard";
import { PageActions } from "@/components/profile/ProfileShell";
import { MoreMenu } from "@/components/profile/parts";
import { avatarUrl } from "@/lib/avatar";
import { HelpCards } from "./HelpCards";
import { Accordion, AccordionItem } from "oks-ui";
import { Surface, SurfaceHeader } from "@/components/ui/Surface";

type S = { id: number; person: string; browser: string; ip: string; place: string };
const PEOPLE: [string, string, string, string][] = [
  ["Rupert Fenn", "Opera on Windows 11", "102.150.137.255", "Poland"],
  ["Mikhail Stott", "Brave Browser on Windows 11", "76.216.214.248", "Indonesia"],
  ["Tamsin Hayward", "Firefox on Windows 11", "233.182.185.28", "Philippines"],
  ["Kaitlyn Murray", "Chrome on Android 16", "76.216.214.248", "Uruguay"],
  ["Melvin McKenna", "Safari on macOS Big Sur", "140.92.152.213", "India"],
  ["Jenny Wilson", "Edge on Windows 10", "214.219.147.46", "Portugal"],
  ["Cameron Reyes", "Chrome on Linux", "246.44.68.100", "Norway"],
  ["Savannah Nguyen", "Firefox on macOS Sonoma", "88.12.4.210", "Chile"],
  ["Devon Lane", "Safari on iOS 18", "117.61.104.86", "Kenya"],
  ["Courtney Henry", "Chrome on Windows 11", "70.218.212.162", "Canada"],
];
const ROWS: S[] = Array.from({ length: 50 }, (_, i) => { const [person, browser, ip, place] = PEOPLE[i % PEOPLE.length]; return { id: i, person, browser, ip, place }; });
const FAQ = ["How is the price of each plan worked out?", "Which payment methods do you take for subscriptions?", "Does the pricing include any hidden charges?", "Do yearly subscriptions come with a discount?", "Can I get a refund if I cancel a subscription?", "Is it possible to add features to my current plan?"];

const Flag = ({ name }: { name: string }) => {
  const hue = [...name].reduce((a, c) => a + c.charCodeAt(0), 0) % 360;
  return <span className="inline-flex size-4 shrink-0 items-center justify-center rounded-full text-[7px] font-semibold text-white" style={{ background: `oklch(60% .14 ${hue})` }} aria-hidden>{name.slice(0, 2).toUpperCase()}</span>;
};
const columns: TableColumn<S>[] = [
  { key: "person", header: "Person", sortable: true, sortValue: (r) => r.person, render: (r) => <div className="flex items-center gap-2.5"><Avatar name={r.person} src={avatarUrl(r.id + 3)} size={36} /><Link href="#" className="font-semibold leading-none" style={{ color: "var(--app-fg-strong)" }}>{r.person}</Link></div> },
  { key: "browser", header: "Browser", sortable: true, sortValue: (r) => r.browser, render: (r) => <div className="flex items-center gap-2"><Globe size={16} /><span className="fathom-sec">{r.browser}</span></div> },
  { key: "ip", header: "IP Address", sortable: true, sortValue: (r) => r.ip, render: (r) => <span className="fathom-sec">{r.ip}</span> },
  { key: "place", header: "Location", sortable: true, sortValue: (r) => r.place, render: (r) => <div className="flex items-center gap-1.5"><Flag name={r.place} /><span className="leading-none fathom-sec">{r.place}</span></div> },
  { key: "menu", header: "", ariaLabel: "Actions", render: () => <MoreMenu /> },
];

export function CurrentSessionsPage() {
  return (
    <>
      <PageHeader title="Current Sessions" crumbs={["My Account", "Security", "Current Sessions"]} actions={<PageActions />} />
      <Container>
        <div className="grid gap-5 lg:gap-7.5">
          <DataGridCard headerClass="" columns={columns} rows={ROWS} getRowKey={(r) => r.id} pageSizes={[10, 20]}
            title={<div className="flex gap-2.5"><TextField aria-label="Search sessions" placeholder="Search Sessions..." startIcon={<Search size={16} />} className="w-40" /><Button variant="bordered" startContent={<Funnel size={16} />}>Browser</Button><Button variant="bordered" startContent={<Globe size={16} />}>Location</Button></div>}
            toolbar={<div className="flex items-center gap-2.5"><div className="flex items-center gap-2"><label htmlFor="only-active" className="text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>Only Active Users</label><SwitchField id="only-active" aria-label="Only Active Users" size="sm" /></div><Button variant="bordered" startContent={<Settings2 size={16} />}>Columns</Button></div>} />
          <Surface>
            <SurfaceHeader title="FAQ" />
            <div className="fathom-faq px-5 py-3"><Accordion variant="light" selectionMode="single">
              {FAQ.map((q) => <AccordionItem key={q} itemKey={q} title={q}><p className="pb-4 text-sm fathom-sec">Pricing depends on the plan you choose, the number of seats and the billing period. You can compare every tier on the plans page.</p></AccordionItem>)}
            </Accordion></div>
          </Surface>
          <HelpCards />
        </div>
      </Container>
    </>
  );
}
