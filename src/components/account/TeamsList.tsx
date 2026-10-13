"use client";

import Link from "next/link";
import { Avatar, Button, Rating, SwitchField, TextField, type TableColumn } from "oks-ui";
import { Search, Settings2, SquarePen, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { DataGridCard } from "@/components/ui/DataGridCard";
import { PageActions } from "@/components/profile/ProfileShell";
import { TEAMS } from "@/data/dashboard";
import { avatarUrl } from "@/lib/avatar";
import { FaqCard } from "./Faq";
import { HelpCards } from "./HelpCards";

type T = { id: number; name: string; sub: string; rating: number; modified: string; members: number[]; extra: number };
const ROWS: T[] = Array.from({ length: 30 }, (_, i) => {
  const t = TEAMS[i % TEAMS.length];
  const d = new Date(2024, 4 + (i % 8), 30);
  return { id: i, name: i < TEAMS.length ? t.name : `${t.name} ${Math.floor(i / TEAMS.length) + 1}`, sub: t.sub, rating: t.rating, modified: d.toISOString(), members: t.members.map((m) => m + i), extra: 2 + ((i * 3) % 5) };
});

const columns: TableColumn<T>[] = [
  { key: "name", header: "Team", sortable: true, sortValue: (r) => r.name, render: (r) => <div className="flex flex-col gap-2"><Link href="/public-profile/teams" className="text-sm font-medium leading-none" style={{ color: "var(--app-fg-strong)" }}>{r.name}</Link><span className="text-sm font-normal leading-3 fathom-sec">{r.sub}</span></div> },
  { key: "rating", header: "Rating", sortable: true, sortValue: (r) => r.rating, render: (r) => <Rating value={r.rating} isReadOnly size="sm" aria-label={`${r.rating} of 5`} /> },
  { key: "modified", header: "Last Modified", sortable: true, sortValue: (r) => r.modified, render: (r) => <span className="fathom-sec">{format(new Date(r.modified), "dd MMM, yyyy")}</span> },
  { key: "members", header: "Members", render: (r) => <div className="flex -space-x-2">{r.members.slice(0, 2).map((m) => <Avatar key={m} name={`Member ${m}`} src={avatarUrl(m)} size={30} />)}<span className="relative flex size-[30px] items-center justify-center rounded-full border-2 text-[11px] font-semibold leading-none text-white" style={{ background: "var(--oks-color-warning-400)", borderColor: "var(--app-surface)" }}>+{r.extra}</span></div> },
  { key: "edit", header: "", ariaLabel: "Edit", render: () => <Button variant="ghost" isIconOnly aria-label="Edit"><SquarePen size={16} /></Button> },
  { key: "del", header: "", ariaLabel: "Delete", render: () => <Button variant="ghost" isIconOnly aria-label="Delete"><Trash2 size={16} /></Button> },
];

export function TeamsListPage() {
  return (
    <>
      <PageHeader title="Teams" crumbs={["My Account", "Members & Roles", "Teams"]} actions={<PageActions />} />
      <Container>
        <div className="grid gap-5 lg:gap-7.5">
          <DataGridCard headerClass="" columns={columns} rows={ROWS} getRowKey={(r) => r.id} pageSizes={[10, 20]}
            title={<TextField aria-label="Search teams" placeholder="Search Teams..." startIcon={<Search size={16} />} className="w-40" />}
            toolbar={<div className="flex items-center gap-2.5"><div className="flex items-center gap-2"><label htmlFor="active-groups" className="text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>Only Active Groups</label><SwitchField id="active-groups" aria-label="Only Active Groups" size="sm" /></div><Button variant="bordered" startContent={<Settings2 size={16} />}>Columns</Button></div>} />
          <FaqCard />
          <HelpCards />
        </div>
      </Container>
    </>
  );
}
