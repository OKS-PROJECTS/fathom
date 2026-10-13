"use client";

import { Button, TextField, type TableColumn } from "oks-ui";
import { Monitor, Pencil, Search, Settings2, Smartphone, Tablet, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { DataGridCard } from "@/components/ui/DataGridCard";
import { PageActions } from "@/components/profile/ProfileShell";
import { HelpCards } from "./HelpCards";

type Dev = { id: number; name: string; sys: string; ip: string; place: string; added: string; last: string };
const BASE: Omit<Dev, "id">[] = [
  { name: "Mac", sys: "Chrome MacOS", ip: "117.61.104.86", place: "United States", added: "17 hours ago", last: "16 Aug, 2024" },
  { name: "iPhone 12", sys: "Safari iOS", ip: "234.0.155.191", place: "Canada", added: "2 days ago", last: "15 Aug, 2024" },
  { name: "Galaxy Tab", sys: "Chrome Android", ip: "70.218.212.162", place: "United Kingdom", added: "1 day ago", last: "14 Aug, 2024" },
  { name: "iPad Pro", sys: "Safari iOS", ip: "140.92.152.213", place: "Australia", added: "3 days ago", last: "13 Aug, 2024" },
  { name: "Surface Pro", sys: "Edge on Windows", ip: "214.219.147.46", place: "Germany", added: "4 hours ago", last: "12 Aug, 2024" },
  { name: "ThinkPad", sys: "Chrome Windows", ip: "246.44.68.100", place: "France", added: "5 days ago", last: "11 Aug, 2024" },
  { name: "Pixel 5", sys: "Chrome Android", ip: "233.182.185.28", place: "Japan", added: "6 days ago", last: "10 Aug, 2024" },
  { name: "Nova 9", sys: "Chrome Android", ip: "76.216.214.248", place: "South Korea", added: "1 week ago", last: "09 Aug, 2024" },
  { name: "MacBook Air", sys: "Safari MacOS", ip: "102.150.137.255", place: "Italy", added: "8 hours ago", last: "08 Aug, 2024" },
  { name: "Studio Display", sys: "Firefox Linux", ip: "88.12.4.210", place: "Spain", added: "9 days ago", last: "07 Aug, 2024" },
];
const ROWS: Dev[] = Array.from({ length: 32 }, (_, i) => ({ id: i, ...BASE[i % BASE.length] }));
const Icon = (n: string) => (/iPhone|Pixel|Nova/.test(n) ? Smartphone : /iPad|Tab/.test(n) ? Tablet : Monitor);

const columns: TableColumn<Dev>[] = [
  { key: "name", header: "Device", sortable: true, sortValue: (r) => r.name, render: (r) => { const I = Icon(r.name); return <div className="flex gap-4"><I size={20} className="fathom-sec" /><div className="flex flex-col gap-0.5"><span className="text-sm font-medium leading-none" style={{ color: "var(--app-fg-strong)" }}>{r.name}</span><span className="text-sm fathom-sec">{r.sys}</span></div></div>; } },
  { key: "ip", header: "IP Address", sortable: true, sortValue: (r) => r.ip, render: (r) => r.ip },
  { key: "place", header: "Location", sortable: true, sortValue: (r) => r.place, render: (r) => r.place },
  { key: "added", header: "Added", sortable: true, sortValue: (r) => r.id, render: (r) => r.added },
  { key: "last", header: "Last Session", sortable: true, sortValue: (r) => r.last, render: (r) => r.last },
  { key: "edit", header: "", ariaLabel: "Edit", render: () => <Button variant="ghost" isIconOnly aria-label="Edit"><Pencil size={16} /></Button> },
  { key: "del", header: "", ariaLabel: "Delete", render: () => <Button variant="ghost" isIconOnly aria-label="Delete"><Trash2 size={16} /></Button> },
];

export function DeviceManagementPage() {
  return (
    <>
      <PageHeader title="Device Management" crumbs={["My Account", "Security", "Device Management"]} actions={<PageActions />} />
      <Container>
        <div className="grid gap-5 lg:gap-7.5">
          <DataGridCard headerClass="" columns={columns} rows={ROWS} getRowKey={(r) => r.id} pageSizes={[10, 20]}
            title={<TextField aria-label="Search devices" placeholder="Search Devices..." startIcon={<Search size={16} />} className="w-40" />}
            toolbar={<div className="flex gap-2.5"><Button color="primary">Add Device</Button><Button variant="bordered" startContent={<Settings2 size={16} />}>Columns</Button></div>} />
          <HelpCards />
        </div>
      </Container>
    </>
  );
}
