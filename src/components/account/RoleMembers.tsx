"use client";

import { Avatar, Button, Chip, SwitchField, TextField, type TableColumn } from "oks-ui";
import { Search, Settings2 } from "lucide-react";
import { DataGridCard } from "@/components/ui/DataGridCard";
import { MoreMenu } from "@/components/profile/parts";
import { avatarUrl } from "@/lib/avatar";

type M = { id: number; name: string; tasks: number; place: string; status: "Active" | "Pending" | "Deleted"; recent: string };
const BASE: Omit<M, "id">[] = [
  { name: "Nina Calder", tasks: 47, place: "South Korea", status: "Pending", recent: "3 days ago" },
  { name: "Marlena Ashworth", tasks: 108, place: "Germany", status: "Pending", recent: "2 days ago" },
  { name: "Callum Whitfield", tasks: 58, place: "Russia", status: "Deleted", recent: "2 days ago" },
  { name: "Jasper Bowen", tasks: 91, place: "France", status: "Active", recent: "Week ago" },
  { name: "Jonas Smythe", tasks: 92, place: "Australia", status: "Pending", recent: "Week ago" },
  { name: "Rafael Ellison", tasks: 109, place: "Spain", status: "Active", recent: "Week ago" },
  { name: "Thalia Webber", tasks: 56, place: "Malaysia", status: "Active", recent: "Week ago" },
];
const ROWS: M[] = Array.from({ length: 33 }, (_, i) => ({ id: i, ...BASE[i % BASE.length] }));
const SC = { Active: "success", Pending: "warning", Deleted: "danger" } as const;
const Flag = ({ name }: { name: string }) => {
  const hue = [...name].reduce((a, c) => a + c.charCodeAt(0), 0) % 360;
  return <span className="inline-flex size-4 shrink-0 items-center justify-center rounded-full text-[7px] font-semibold text-white" style={{ background: `oklch(60% .14 ${hue})` }} aria-hidden>{name.slice(0, 2).toUpperCase()}</span>;
};

const columns: TableColumn<M>[] = [
  { key: "name", header: "Member", width: 300, sortable: true, sortValue: (r) => r.name, cellClassName: "text-nowrap", render: (r) => <div className="flex gap-2.5"><Avatar name={r.name} src={avatarUrl(r.id + 10)} size={36} /><div className="flex flex-col gap-0.5"><span className="text-sm font-medium leading-none" style={{ color: "var(--app-fg-strong)" }}>{r.name}</span><span className="text-sm font-normal fathom-sec">{r.tasks} tasks</span></div></div> },
  { key: "place", header: "Location", width: 225, sortable: true, sortValue: (r) => r.place, cellClassName: "text-nowrap", render: (r) => <div className="flex items-center gap-1.5"><Flag name={r.place} /><span className="font-normal leading-none" style={{ color: "var(--app-fg)" }}>{r.place}</span></div> },
  { key: "status", header: "Status", width: 225, sortable: true, sortValue: (r) => r.status, render: (r) => <Chip size="sm" variant="soft" color={SC[r.status]} radius="md">{r.status}</Chip> },
  { key: "recent", header: "Recent Activity", width: 225, sortable: true, sortValue: (r) => r.id, cellClassName: "text-nowrap", render: (r) => r.recent },
  { key: "menu", header: "", width: 60, ariaLabel: "Actions", render: () => <MoreMenu /> },
];

/** Sortable member grid shared by the permission pages. */
export function RoleMembersCard({ title }: { title: string }) {
  return (
    <DataGridCard headerClass="" columns={columns} rows={ROWS} getRowKey={(r) => r.id} pageSizes={[10, 20]}
      title={<span className="flex items-center gap-2.5">{title}<span className="w-40 font-normal"><TextField aria-label="Search members" placeholder="Search Teams..." startIcon={<Search size={16} />} /></span></span>}
      toolbar={<div className="flex items-center gap-2.5"><div className="flex items-center gap-2"><label htmlFor={`au-${title}`} className="text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>Active Users</label><SwitchField id={`au-${title}`} aria-label="Active Users" size="sm" defaultChecked /></div><Button variant="bordered" startContent={<Settings2 size={16} />}>Columns</Button></div>} />
  );
}
