"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { Avatar, Button, Chip, Rating, SwitchField, TextField, type TableColumn } from "oks-ui";
import { AtSign, Funnel, Globe, Link2, Monitor, Search, Settings2 } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { DataGridCard } from "@/components/ui/DataGridCard";
import { PageActions } from "@/components/profile/ProfileShell";
import { MoreMenu, FooterLink } from "@/components/profile/parts";
import { PEOPLE } from "@/data/people";
import { avatarUrl } from "@/lib/avatar";
import { FaqCard } from "@/components/account/Faq";
import { HelpCards } from "@/components/account/HelpCards";

const Flag = ({ name, size = 16 }: { name: string; size?: number }) => {
  const hue = [...name].reduce((a, c) => a + c.charCodeAt(0), 0) % 360;
  return <span className="inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-white" style={{ width: size, height: size, fontSize: 7, background: `oklch(60% .14 ${hue})` }} aria-hidden>{name.slice(0, 2).toUpperCase()}</span>;
};
const strong = { color: "var(--app-fg-strong)" } as const;
const Person = ({ name, sub, seed, size = 28 }: { name: string; sub?: ReactNode; seed: number; size?: number }) => (
  <div className="flex gap-2.5"><Avatar name={name} src={avatarUrl(seed + 200)} size={size} /><div className="flex flex-col"><Link href="#" className="mb-px text-nowrap text-sm font-medium" style={strong}>{name}</Link>{sub && <span className="text-nowrap text-sm font-normal fathom-sec">{sub}</span>}</div></div>
);
const Menu = (): TableColumn<Row> => ({ key: "menu", header: "", width: 60, ariaLabel: "Actions", render: () => <MoreMenu compact /> });
type Row = Record<string, unknown> & { id: number };
const mk = <T extends Record<string, unknown>>(n: number, f: (i: number) => T): (T & { id: number })[] => Array.from({ length: n }, (_, i) => ({ id: i, ...f(i) }));
const P = (i: number) => PEOPLE[i % PEOPLE.length];

type Cfg = { title: string; crumbs: string[]; search: string; filters: string[]; sizes: number[]; columns: TableColumn<Row>[]; rows: Row[]; headerClass?: string };

function UserTable({ cfg }: { cfg: Cfg }) {
  return (
    <>
      <PageHeader title={cfg.title} crumbs={cfg.crumbs} actions={<PageActions />} />
      <Container>
        <div className="grid gap-5 lg:gap-7.5">
          <DataGridCard headerClass="" columns={cfg.columns} rows={cfg.rows} getRowKey={(r) => r.id} pageSizes={cfg.sizes}
            title={<div className="flex gap-2.5"><TextField aria-label="Search" placeholder={cfg.search} startIcon={<Search size={16} />} className="w-40" />{cfg.filters.map((f) => <Button key={f} variant="bordered" startContent={<Funnel size={16} />}>{f}</Button>)}</div>}
            toolbar={<div className="flex gap-2.5"><Button color="primary" startContent={<Settings2 size={16} />}>Filters</Button><Button variant="bordered" startContent={<Settings2 size={16} />}>Columns</Button></div>} />
          <FaqCard />
          <HelpCards />
        </div>
      </Container>
    </>
  );
}

const STATUS = ["In Office", "Remote", "On Leave"] as const;
const SC = { "In Office": "success", Remote: "info", "On Leave": "warning" } as const;
const PLACES = ["Hungary", "Poland", "Czech Republic", "Portugal", "Norway", "Chile", "Kenya", "Japan"];
const WHEN = ["Today, 10:30", "Today, 13:45", "Yesterday, 15:30", "Yesterday, 09:10", "2 days ago"];

const crew: Cfg = {
  title: "Team Crew", crumbs: ["Network", "User Table", "Team Crew"], search: "Search Users...", filters: ["Status", "Sort Order"], sizes: [10, 20],
  rows: mk(33, (i) => ({ name: P(i).name, email: P(i).email, role: P(i).role, status: STATUS[i % 3], place: PLACES[i % PLACES.length], when: WHEN[i % WHEN.length] })),
  columns: [
    { key: "name", header: "Member", width: 300, sortable: true, sortValue: (r) => r.name as string, render: (r) => <div className="flex gap-4"><Avatar name={r.name as string} src={avatarUrl((r.id as number) + 200)} size={36} /><div className="flex flex-col gap-0.5"><Link href="#" className="mb-px text-sm font-medium" style={strong}>{r.name as string}</Link><Link href="#" className="text-sm font-normal fathom-sec">{r.email as string}</Link></div></div> },
    { key: "role", header: "Role", width: 180, sortable: true, sortValue: (r) => r.role as string, render: (r) => r.role as string },
    { key: "status", header: "Status", width: 180, sortable: true, sortValue: (r) => r.status as string, render: (r) => <Chip size="md" variant="soft" color={SC[r.status as (typeof STATUS)[number]]} radius="full" startContent={<span className="size-1.5 rounded-full bg-current opacity-75" />}>{r.status as string}</Chip> },
    { key: "place", header: "Location", width: 180, sortable: true, sortValue: (r) => r.place as string, cellClassName: "text-nowrap", render: (r) => <div className="flex gap-1.5"><Flag name={r.place as string} />{r.place as string}</div> },
    { key: "when", header: "Activity", width: 180, sortable: true, sortValue: (r) => r.id, cellClassName: "text-nowrap", render: (r) => r.when as string },
    Menu(),
  ],
};
export const TeamCrewTablePage = () => <UserTable cfg={crew} />;

const TAGS = [["Comms", "Collaboration"], ["Professional Network", "Recruitment"], ["Analytics", "Reporting"], ["Design", "Prototyping"]];
const AppDots = ({ n }: { n: number }) => <div className="flex gap-1.5">{Array.from({ length: n }, (_, k) => <span key={k} className="size-[18px] rounded" style={{ background: `oklch(65% .15 ${(k * 70 + 30) % 360})` }} aria-hidden />)}</div>;
const Tg = ({ label, defaultChecked }: { label: string; defaultChecked?: boolean }) => { const [v, setV] = useState(!!defaultChecked); return <div className="mb-2 flex"><SwitchField aria-label={label} size="sm" checked={v} onChange={setV} /></div>; };
const CITY = ["Las Vegas, NV", "Los Angeles, CA", "Austin, TX", "Denver, CO", "Portland, OR", "Phoenix, AZ"];
const roster: Cfg = {
  title: "App Roster", crumbs: ["Network", "User Table", "App Roster"], search: "Search Users...", filters: ["Status", "Sort Order"], sizes: [5, 10],
  rows: mk(30, (i) => ({ name: P(i + 3).name, phone: `(${200 + (i * 37) % 700}) 555-${1000 + (i * 911) % 9000}`, city: CITY[i % CITY.length], apps: 2 + (i % 2), tags: TAGS[i % TAGS.length], tfa: i % 3 !== 0 })),
  columns: [
    { key: "name", header: "Users", width: 200, sortable: true, sortValue: (r) => r.name as string, render: (r) => <Person name={r.name as string} seed={r.id} /> },
    { key: "phone", header: "Phone", width: 165, cellClassName: "text-nowrap", render: (r) => r.phone as string },
    { key: "city", header: "Branch", width: 165, sortable: true, sortValue: (r) => r.city as string, cellClassName: "text-nowrap", render: (r) => r.city as string },
    { key: "apps", header: "Connected Apps", width: 165, render: (r) => <AppDots n={r.apps as number} /> },
    { key: "tags", header: "Tags", width: 225, render: (r) => <div className="flex flex-wrap gap-x-1.5 gap-y-1.5">{(r.tags as string[]).map((t) => <span key={t} className="inline-flex h-[17px] items-center rounded-sm px-1.5 text-[11px] font-medium leading-none" style={{ background: "var(--app-surface-2)", color: "var(--app-fg)" }}>{t}</span>)}</div> },
    { key: "tfa", header: "Enforce 2FA", width: 130, render: (r) => <Tg label="Enforce 2FA" defaultChecked={r.tfa as boolean} /> },
    Menu(),
  ],
};
export const AppRosterTablePage = () => <UserTable cfg={roster} />;

const TEAMS = ["Help Heroes", "Ops Crew", "Pixel Forge", "Data Nest", "Growth Loop", "Pipeline Crew"];
const JOBS = ["Customer Support Specialist", "DevOps Engineer", "Product Designer", "Data Analyst", "Growth Marketer", "QA Engineer"];
const Soc = () => <div className="flex gap-2.5">{[Link2, Globe, AtSign].map((I, k) => <Link key={k} href="#" aria-label="Profile link"><I size={18} className="fathom-sec" /></Link>)}</div>;
const authors: Cfg = {
  title: "Market Authors", crumbs: ["Network", "User Table", "Market Authors"], search: "Search Authors...", filters: ["Sort Order"], sizes: [5, 10],
  rows: mk(30, (i) => ({ name: P(i + 3).name, job: JOBS[i % JOBS.length], earn: 20000 + ((i * 7919) % 70000) + 0.6, team: TEAMS[i % TEAMS.length], products: 120 + ((i * 131) % 700), rating: 3 + (i % 3) })),
  columns: [
    { key: "name", header: "Author", width: 260, cellClassName: "text-nowrap", sortable: true, sortValue: (r) => r.name as string, render: (r) => <Person name={r.name as string} sub={r.job as string} seed={r.id} /> },
    { key: "earn", header: "Earnings", width: 150, sortable: true, sortValue: (r) => r.earn as number, render: (r) => `$${(r.earn as number).toLocaleString("en-US", { minimumFractionDigits: 2 })}` },
    { key: "team", header: "Team", width: 175, sortable: true, sortValue: (r) => r.team as string, render: (r) => <div className="flex gap-1.5"><span className="inline-block w-5 rounded" style={{ background: "var(--oks-color-primary-500)", opacity: 0.7 }} />{r.team as string}</div> },
    { key: "products", header: "Products", width: 140, sortable: true, sortValue: (r) => r.products as number, render: (r) => String(r.products) },
    { key: "rating", header: "Rating", width: 150, render: (r) => <Rating value={r.rating as number} isReadOnly size="sm" aria-label="rating" /> },
    { key: "soc", header: "Social Profiles", width: 150, render: () => <Soc /> },
    Menu(),
  ],
};
export const MarketAuthorsTablePage = () => <UserTable cfg={authors} />;

const PRODUCTS = [["NFT", "App"], ["Template", "Widget"], ["Plugin", "Theme"], ["Kit", "App"]];
const LIC = [["Trial", "12 days left"], ["Trial", "7 days left"], ["Pro", "Renews in 3 months"], ["Team", "Renews in 11 months"]];
const saas: Cfg = {
  title: "SaaS Users", crumbs: ["Network", "User Table", "SaaS Users"], search: "Search Users...", filters: ["Status", "Sort Order"], sizes: [5, 10],
  rows: mk(31, (i) => ({ name: P(i + 5).name, email: P(i + 5).email, prod: PRODUCTS[i % 4], lic: LIC[i % 4], paid: `${21 + (i % 9)} Jan, 2024`, tfa: i % 2 === 0 })),
  columns: [
    { key: "name", header: "Subscriber", width: 300, sortable: true, sortValue: (r) => r.name as string, render: (r) => <Person name={r.name as string} sub={r.email as string} seed={r.id} /> },
    { key: "prod", header: "Products", width: 200, render: (r) => <div className="flex gap-1.5">{(r.prod as string[]).map((t) => <Chip key={t} size="xs" variant="soft" color="secondary" radius="sm">{t}</Chip>)}</div> },
    { key: "lic", header: "License", width: 175, sortable: true, sortValue: (r) => (r.lic as string[])[0], render: (r) => <div className="flex flex-col"><span className="text-sm font-medium" style={{ color: "var(--app-fg)" }}>{(r.lic as string[])[0]}</span><span className="text-xs fathom-sec">{(r.lic as string[])[1]}</span></div> },
    { key: "paid", header: "Latest Payment", width: 175, sortable: true, sortValue: (r) => r.id, cellClassName: "text-nowrap", render: (r) => <span className="font-medium">{r.paid as string}</span> },
    { key: "tfa", header: "Enforce 2FA", width: 137, render: (r) => <Tg label="Enforce 2FA" defaultChecked={r.tfa as boolean} /> },
    { key: "inv", header: "Invoices", width: 100, render: () => <FooterLink href="#">Download</FooterLink> },
  ],
};
export const SaasUsersTablePage = () => <UserTable cfg={saas} />;

const ESTONIA = ["Estonia", "Portugal", "Norway", "Chile", "Kenya", "Japan"];
const clients: Cfg = {
  title: "Store Clients", crumbs: ["Network", "User Table", "Store Clients"], search: "Search Clients...", filters: ["Activity", "Sort Order"], sizes: [5, 10],
  rows: mk(31, (i) => ({ name: P(i + 7).name, email: P(i + 7).email, cid: `MS-${3456832 + i * 7213}`, value: 18000 + ((i * 6113) % 60000) + 0.09, place: ESTONIA[i % 6] })),
  columns: [
    { key: "name", header: "Member", width: 300, sortable: true, sortValue: (r) => r.name as string, render: (r) => <Person name={r.name as string} sub={r.email as string} seed={r.id} /> },
    { key: "cid", header: "Client ID", width: 150, sortable: true, sortValue: (r) => r.cid as string, render: (r) => r.cid as string },
    { key: "value", header: "Orders Value", width: 150, sortable: true, sortValue: (r) => r.value as number, render: (r) => `$${(r.value as number).toLocaleString("en-US", { minimumFractionDigits: 2 })}` },
    { key: "place", header: "Location", width: 150, sortable: true, sortValue: (r) => r.place as string, render: (r) => <div className="flex gap-1.5"><Flag name={r.place as string} />{r.place as string}</div> },
    { key: "act", header: "Activity", width: 150, render: () => "Current session" },
    { key: "inv", header: "Invoices", width: 100, render: () => <div className="text-center"><FooterLink href="#">View</FooterLink></div> },
    Menu(),
  ],
};
export const StoreClientsTablePage = () => <UserTable cfg={clients} />;

const BROWSERS = ["Chrome on Mac OS X", "Firefox on Windows 11", "Safari on iOS 18", "Edge on Windows 10"];
const IPS = ["92.168.1.21", "192.168.1.20", "10.0.4.17", "172.16.8.9"];
const visitors: Cfg = {
  title: "Visitors", crumbs: ["Network", "User Table", "Visitors"], search: "Search Users...", filters: ["Activity", "Sort Order"], sizes: [5, 10],
  rows: mk(30, (i) => ({ name: P(i + 9).name, browser: BROWSERS[i % 4], ip: IPS[i % 4], place: ESTONIA[(i + 2) % 6], act: i === 0 ? "Current session" : ["2 days ago", "Today", "Last week"][i % 3] })),
  columns: [
    { key: "name", header: "User", width: 200, sortable: true, sortValue: (r) => r.name as string, render: (r) => <Person name={r.name as string} seed={r.id} /> },
    { key: "browser", header: "Browser", width: 250, sortable: true, sortValue: (r) => r.browser as string, cellClassName: "text-nowrap", render: (r) => <div className="flex gap-1.5"><Monitor size={16} aria-hidden />{r.browser as string}</div> },
    { key: "ip", header: "IP Address", width: 190, sortable: true, sortValue: (r) => r.ip as string, render: (r) => <span className="fathom-sec">{r.ip as string}</span> },
    { key: "place", header: "Location", width: 190, sortable: true, sortValue: (r) => r.place as string, render: (r) => <div className="flex gap-1.5"><Flag name={r.place as string} /><span className="leading-none fathom-sec">{r.place as string}</span></div> },
    { key: "act", header: "Activity", width: 190, sortable: true, sortValue: (r) => r.id, render: (r) => r.act as string },
    Menu(),
  ],
};
export const VisitorsTablePage = () => <UserTable cfg={visitors} />;
