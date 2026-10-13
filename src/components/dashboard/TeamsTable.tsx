"use client";

import { useMemo, useState } from "react";
import { Avatar, AvatarGroup, Pagination, Rating, SelectField, Table, TextField, type TableColumn } from "oks-ui";
import { Search } from "lucide-react";
import { format } from "date-fns";
import { Surface, SurfaceFooter, SurfaceHeader } from "@/components/ui/Surface";
import { TEAMS } from "@/data/dashboard";
import { avatarUrl } from "@/lib/avatar";

type Team = (typeof TEAMS)[number];

const columns: TableColumn<Team>[] = [
  {
    key: "name", header: "Team", sortable: true, sortValue: (r) => r.name,
    render: (r) => (
      <div className="flex flex-col gap-2">
        <span className="font-medium leading-none text-sm" style={{ color: "var(--app-fg-strong)" }}>{r.name}</span>
        <span className="text-xs leading-none fathom-sec">{r.sub}</span>
      </div>
    ),
  },
  { key: "rating", header: "Rating", sortable: true, sortValue: (r) => r.rating,
    render: (r) => <Rating value={r.rating} isReadOnly size="sm" aria-label={`${r.rating} of 5`} /> },
  { key: "modified", header: "Last Modified", sortable: true, sortValue: (r) => r.modified,
    render: (r) => format(new Date(r.modified), "dd MMM, yyyy") },
  { key: "members", header: "Members",
    render: (r) => (
      <AvatarGroup size={32} max={4} overlap={8}>
        {r.members.map((m) => <Avatar key={m} name={`Member ${m}`} src={avatarUrl(m)} />)}
      </AvatarGroup>
    ) },
];

export function TeamsTable() {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5);
  const [q, setQ] = useState("");
  const filtered = useMemo(
    () => TEAMS.filter((t) => `${t.name} ${t.sub}`.toLowerCase().includes(q.trim().toLowerCase())),
    [q],
  );
  const rows = filtered.slice((page - 1) * size, page * size);
  const from = filtered.length ? (page - 1) * size + 1 : 0;
  const to = Math.min(page * size, filtered.length);

  return (
    <Surface>
      <SurfaceHeader
        className="py-3.5"
        title="Teams"
        actions={
          <div className="w-40">
            <TextField aria-label="Search teams" placeholder="Search Teams..." startIcon={<Search size={16} />}
              value={q} onChange={(v) => { setQ(v); setPage(1); }} />
          </div>
        }
      />
      <div className="fathom-table grid grow">
        <Table aria-label="Teams" defaultSortDescriptor={{ column: "modified", direction: "descending" }} columns={columns} rows={rows} getRowKey={(r) => r.id} selectionMode="multiple" removeWrapper />
      </div>
      <SurfaceFooter>
        <div className="flex grow flex-col flex-wrap items-center justify-between gap-2.5 py-2.5 sm:flex-row sm:py-0">
          <div className="order-2 flex items-center gap-2.5 sm:order-1">
            <span className="text-sm fathom-muted">Rows per page</span>
            <div className="fathom-select-plain fathom-select-compact">
              <SelectField aria-label="Rows per page" size="sm" value={String(size)}
                onChange={(v) => { setSize(Number(v)); setPage(1); }}
                options={[5, 10, 15].map((n) => ({ label: String(n), value: String(n) }))} />
            </div>
          </div>
          <div className="order-1 flex flex-col items-center gap-2.5 sm:order-2 sm:flex-row">
            <span className="order-2 text-nowrap text-sm fathom-muted sm:order-1">{from} - {to} of {filtered.length}</span>
            <div className="order-1 sm:order-2 fathom-pager">
              <Pagination page={page} pageSize={size} total={filtered.length} onChange={setPage} size="sm" variant="ghost" hideNavigation={false} />
            </div>
          </div>
        </div>
      </SurfaceFooter>
    </Surface>
  );
}
