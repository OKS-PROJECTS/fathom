"use client";

import Link from "next/link";
import { Avatar, Button, Chip, SelectField, SwitchField, TextField, type TableColumn } from "oks-ui";
import { BookUser, Copy, Funnel, LifeBuoy, MessageCirclePlus, RefreshCw, Search, Settings2, SquarePlus, Users } from "lucide-react";
import { Surface, SurfaceFooter, SurfaceHeader } from "@/components/ui/Surface";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { DataGridCard } from "@/components/ui/DataGridCard";
import { PageActions } from "@/components/profile/ProfileShell";
import { MoreMenu } from "@/components/profile/parts";
import { avatarUrl } from "@/lib/avatar";
import { Help } from "./HelpCards";
import { GuidesCard } from "./GuidesCard";
import { FormRow } from "./SettingsSections";

type M = { id: number; name: string; tasks: number; place: string; status: "Pending" | "Declined" | "Accepted"; recent: string };
const BASE: Omit<M, "id">[] = [
  { name: "Nina Calder", tasks: 47, place: "South Korea", status: "Pending", recent: "3 days ago" },
  { name: "Marlena Ashworth", tasks: 108, place: "Germany", status: "Pending", recent: "2 days ago" },
  { name: "Callum Whitfield", tasks: 58, place: "Russia", status: "Declined", recent: "2 days ago" },
  { name: "Jasper Bowen", tasks: 91, place: "France", status: "Accepted", recent: "Week ago" },
  { name: "Jonas Smythe", tasks: 92, place: "Australia", status: "Pending", recent: "Week ago" },
  { name: "Rafael Ellison", tasks: 109, place: "Spain", status: "Pending", recent: "Week ago" },
  { name: "Thalia Webber", tasks: 56, place: "Malaysia", status: "Accepted", recent: "Week ago" },
];
const ROWS: M[] = Array.from({ length: 33 }, (_, i) => ({ id: i, ...BASE[i % BASE.length] }));
const SC = { Pending: "warning", Declined: "danger", Accepted: "success" } as const;
const Flag = ({ name }: { name: string }) => {
  const hue = [...name].reduce((a, c) => a + c.charCodeAt(0), 0) % 360;
  return <span className="inline-flex size-4 shrink-0 items-center justify-center rounded-full text-[7px] font-semibold text-white" style={{ background: `oklch(60% .14 ${hue})` }} aria-hidden>{name.slice(0, 2).toUpperCase()}</span>;
};
const columns: TableColumn<M>[] = [
  { key: "name", header: "Member", width: 250, sortable: true, sortValue: (r) => r.name, cellClassName: "text-nowrap", render: (r) => <div className="flex gap-2.5"><Avatar name={r.name} src={avatarUrl(r.id + 10)} size={36} /><div className="flex flex-col gap-0.5"><Link href="#" className="text-sm font-medium leading-none" style={{ color: "var(--app-fg-strong)" }}>{r.name}</Link><span className="text-sm font-normal fathom-sec">{r.tasks} tasks</span></div></div> },
  { key: "place", header: "Location", width: 140, sortable: true, sortValue: (r) => r.place, cellClassName: "text-nowrap", render: (r) => <div className="flex items-center gap-1.5"><Flag name={r.place} /><span className="font-normal leading-none" style={{ color: "var(--app-fg)" }}>{r.place}</span></div> },
  { key: "status", header: "Status", width: 90, sortable: true, sortValue: (r) => r.status, render: (r) => <Chip size="sm" variant="soft" color={SC[r.status]} radius="md">{r.status}</Chip> },
  { key: "recent", header: "Recent Activity", width: 160, sortable: true, sortValue: (r) => r.id, cellClassName: "text-nowrap", render: (r) => <span className="font-normal fathom-sec">{r.recent}</span> },
  { key: "menu", header: "", width: 60, ariaLabel: "Actions", render: () => <MoreMenu /> },
];
const GUIDES = [
  [Users, "Grow Your Network: A Simple Friend Invitation Flow", "Ask colleagues to join and work together through a simple invitation flow. Share the experience and grow your professional network with little effort."],
  [MessageCirclePlus, "Team Growth: Refer Peers with Personal Invites", "Strengthen your team by inviting peers with personalised invitations, so your projects benefit from people you already trust."],
  [BookUser, "Building the Team: Refer Contacts the Easy Way", "Invite industry friends to collaborate and strengthen how your team works. Our referral flow makes it simple to bring in new expertise."],
] as const;

export function InviteFriendPage() {
  return (
    <>
      <PageHeader title="Invite a Friend" crumbs={["My Account", "Invite a Friend"]} actions={<PageActions />} />
      <Container>
        <div className="grid grid-cols-1 gap-5 lg:gap-7.5 xl:grid-cols-3">
          <div className="col-span-2"><div className="flex flex-col gap-5 lg:gap-7.5">
            <Surface>
              <SurfaceHeader title="Invite People" />
              <div className="grid gap-5 p-5">
                <FormRow label="Email" labelCls="max-w-32" baseline={false}><div className="min-w-48"><TextField aria-label="Email" /></div></FormRow>
                <FormRow label="Role" labelCls="max-w-32"><div className="grid grow items-start gap-5"><SelectField aria-label="Role" defaultValue="member" options={[{ label: "Member", value: "member" }, { label: "Admin", value: "admin" }, { label: "Editor", value: "editor" }]} /><div><Button variant="bordered" startContent={<SquarePlus size={16} />}>Add more</Button></div></div></FormRow>
              </div>
              <SurfaceFooter className="items-center"><Button color="primary">Invite People</Button></SurfaceFooter>
            </Surface>
            <DataGridCard headerClass="" columns={columns} rows={ROWS} getRowKey={(r) => r.id} pageSizes={[10, 20]}
              title={<div className="flex gap-2.5"><TextField aria-label="Search invites" placeholder="Search Invites..." startIcon={<Search size={16} />} className="w-40" /><Button variant="bordered" startContent={<Funnel size={16} />}>Status</Button></div>}
              toolbar={<div className="flex items-center gap-2.5"><label htmlFor="inv-active" className="text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>Active Users</label><SwitchField id="inv-active" aria-label="Active Users" size="sm" defaultChecked /><Button variant="bordered" startContent={<Settings2 size={16} />}>Columns</Button></div>} />
            <Surface>
              <SurfaceHeader title="Invite by Link" />
              <div className="grid gap-5 p-5">
                <FormRow label="Link" labelCls="max-w-32"><div className="flex flex-col items-start gap-5"><div className="w-full"><TextField aria-label="Invite link" defaultValue="https://fathom.example/invite/9fa3c1" endIcon={<Copy size={16} aria-hidden />} /></div><Button variant="bordered" startContent={<RefreshCw size={16} />}>Reset Link</Button></div></FormRow>
                <p className="text-sm" style={{ color: "var(--app-fg)" }}>Use the button below to join our private workshop. Places are limited, so reserve yours soon with this personal invitation link to share.</p>
              </div>
              <SurfaceFooter className="items-center"><Button color="primary">Invite People</Button></SurfaceFooter>
            </Surface>
            <Help title="Contact Support" text="Need a hand? Reach our support team for quick, personal help with any questions or concerns." link="Contact Support" icon={<LifeBuoy size={48} strokeWidth={1.5} />} />
          </div></div>
          <div className="col-span-1"><div className="flex flex-col gap-5 lg:gap-7.5"><GuidesCard guides={GUIDES} extra={39} /></div></div>
        </div>
      </Container>
    </>
  );
}
