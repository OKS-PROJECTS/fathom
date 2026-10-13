"use client";

import { Avatar, Button, Chip, SelectField, SwitchField, TextField, type TableColumn } from "oks-ui";
import { Copy, Funnel, RefreshCw, Search, Settings2, SquarePlus, UserRoundPlus } from "lucide-react";
import { Surface, SurfaceFooter, SurfaceHeader } from "@/components/ui/Surface";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { DataGridCard } from "@/components/ui/DataGridCard";
import { PageActions } from "@/components/profile/ProfileShell";
import { MoreMenu } from "@/components/profile/parts";
import { avatarUrl } from "@/lib/avatar";
import { FaqCard } from "./Faq";
import { HelpCards } from "./HelpCards";
import { FormRow } from "./SettingsSections";

type M = { id: number; name: string; tasks: number; roles: string[]; place: string; status: "Active" | "Pending" | "Deleted"; recent: string };
const BASE: Omit<M, "id">[] = [
  { name: "Nina Calder", tasks: 47, roles: ["Designer", "Admin"], place: "South Korea", status: "Active", recent: "3 days ago" },
  { name: "Marlena Ashworth", tasks: 108, roles: ["Editor", "Tester"], place: "Germany", status: "Pending", recent: "2 days ago" },
  { name: "Callum Whitfield", tasks: 58, roles: ["Editor", "Analyst"], place: "Russia", status: "Deleted", recent: "2 days ago" },
  { name: "Jasper Bowen", tasks: 91, roles: ["Admin", "Scrum Master"], place: "France", status: "Active", recent: "Week ago" },
  { name: "Jonas Smythe", tasks: 92, roles: ["Admin", "Support"], place: "Australia", status: "Pending", recent: "Week ago" },
  { name: "Rafael Ellison", tasks: 109, roles: ["Admin", "Scrum Master"], place: "Spain", status: "Pending", recent: "Week ago" },
  { name: "Thalia Webber", tasks: 56, roles: ["Designer", "Analyst"], place: "Malaysia", status: "Active", recent: "Week ago" },
  { name: "Roland Rhodes", tasks: 78, roles: ["Designer", "Analyst"], place: "France", status: "Active", recent: "Week ago" },
  { name: "Wells Warden", tasks: 12, roles: ["Support", "Developer"], place: "South Korea", status: "Deleted", recent: "Week ago" },
];
const ROWS: M[] = Array.from({ length: 33 }, (_, i) => ({ id: i, ...BASE[i % BASE.length] }));
const SC = { Active: "success", Pending: "warning", Deleted: "danger" } as const;
const Flag = ({ name }: { name: string }) => {
  const hue = [...name].reduce((a, c) => a + c.charCodeAt(0), 0) % 360;
  return <span className="inline-flex size-4 shrink-0 items-center justify-center rounded-full text-[7px] font-semibold text-white" style={{ background: `oklch(60% .14 ${hue})` }} aria-hidden>{name.slice(0, 2).toUpperCase()}</span>;
};

const columns: TableColumn<M>[] = [
  { key: "name", header: "Member", width: 300, sortable: true, sortValue: (r) => r.name, cellClassName: "text-nowrap", render: (r) => <div className="flex gap-2.5"><Avatar name={r.name} src={avatarUrl(r.id + 10)} size={36} /><div className="flex flex-col gap-0.5"><span className="text-sm font-medium leading-none" style={{ color: "var(--app-fg-strong)" }}>{r.name}</span><span className="text-sm font-normal fathom-sec">{r.tasks} tasks</span></div></div> },
  { key: "roles", header: "Roles", width: 220, sortable: true, sortValue: (r) => r.roles[0], render: (r) => <div className="mb-2 flex flex-wrap gap-2.5">{r.roles.map((x) => <Chip key={x} size="sm" variant="soft" color="secondary" radius="md">{x}</Chip>)}</div> },
  { key: "place", header: "location", width: 165, sortable: true, sortValue: (r) => r.place, cellClassName: "text-nowrap", render: (r) => <div className="flex items-center gap-1.5"><Flag name={r.place} /><span className="font-normal leading-none" style={{ color: "var(--app-fg)" }}>{r.place}</span></div> },
  { key: "status", header: "Status", width: 165, sortable: true, sortValue: (r) => r.status, render: (r) => <Chip size="sm" variant="soft" color={SC[r.status]} radius="md">{r.status}</Chip> },
  { key: "recent", header: "Recent Activity", width: 165, sortable: true, sortValue: (r) => r.id, cellClassName: "text-nowrap", render: (r) => <span className="font-normal fathom-sec">{r.recent}</span> },
  { key: "menu", header: "", width: 60, ariaLabel: "Actions", render: () => <MoreMenu /> },
];

export function TeamMembersPage() {
  return (
    <>
      <PageHeader title="Team Members" crumbs={["My Account", "Members & Roles", "Team Members"]} actions={<PageActions />} />
      <Container>
        <div className="grid gap-5 lg:gap-7.5">
          <DataGridCard headerClass="" columns={columns} rows={ROWS} getRowKey={(r) => r.id} pageSizes={[10, 20]}
            title={<div className="flex gap-2.5"><TextField aria-label="Search members" placeholder="Search Members..." startIcon={<Search size={16} />} className="w-40" /><Button variant="bordered" startContent={<Funnel size={16} />}>Status</Button></div>}
            toolbar={<div className="flex items-center gap-2.5"><div className="flex items-center gap-2"><label htmlFor="active-users" className="text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>Active Users</label><SwitchField id="active-users" aria-label="Active Users" size="sm" defaultChecked /></div><Button color="primary" startContent={<UserRoundPlus size={16} />}>Add New</Button><Button variant="bordered" startContent={<Settings2 size={16} />}>Columns</Button></div>} />
          <div className="grid gap-5 lg:grid-cols-2 lg:gap-7.5">
            <Surface>
              <SurfaceHeader title="Invite People" />
              <div className="grid gap-5 p-5">
                <FormRow label="Email" labelCls="max-w-32"><TextField aria-label="Email" /></FormRow>
                <FormRow label="Role" labelCls="max-w-32"><div className="flex flex-col items-start gap-5"><div className="w-full"><SelectField aria-label="Role" defaultValue="member" options={[{ label: "Member", value: "member" }, { label: "Admin", value: "admin" }, { label: "Editor", value: "editor" }]} /></div><Button variant="bordered" startContent={<SquarePlus size={16} />}>Add more</Button></div></FormRow>
              </div>
              <SurfaceFooter className="items-center"><Button color="primary">Invite People</Button></SurfaceFooter>
            </Surface>
            <Surface>
              <SurfaceHeader title="Invite by Link" />
              <div className="grid gap-5 p-5">
                <FormRow label="Link" labelCls="max-w-32"><div className="flex flex-col items-start gap-5"><div className="w-full"><TextField aria-label="Invite link" defaultValue="https://fathom.example/invite/9fa3c1" endIcon={<Copy size={16} aria-hidden />} /></div><Button variant="bordered" startContent={<RefreshCw size={16} />}>Reset Link</Button></div></FormRow>
                <p className="text-sm" style={{ color: "var(--app-fg)" }}>Use the button below to join our private workshop. Places are limited, so reserve yours soon with this personal invitation link to share.</p>
              </div>
              <SurfaceFooter className="items-center"><Button color="primary">Invite People</Button></SurfaceFooter>
            </Surface>
          </div>
          <FaqCard />
          <HelpCards />
        </div>
      </Container>
    </>
  );
}
