"use client";

import Link from "next/link";
import { useState } from "react";
import { Button, Checkbox, SwitchField } from "oks-ui";
import { ChartColumn, CreditCard, LifeBuoy, LogOut, Map, MousePointerClick, Settings, ShieldCheck, ShieldOff, Store, ToggleRight, UserCog, Users, type LucideIcon } from "lucide-react";
import { Surface, SurfaceFooter, SurfaceHeader } from "@/components/ui/Surface";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { PageActions } from "@/components/profile/ProfileShell";
import { HexBadge } from "@/components/profile/parts";
import { FaqCard } from "./Faq";
import { Help } from "./HelpCards";
import { GuidesCard } from "./GuidesCard";
import { RoleMembersCard } from "./RoleMembers";

const PERMS: [LucideIcon, string, string, boolean][] = [
  [Settings, "Team Preferences", "People can view and change how the workspace is set up.", true],
  [CreditCard, "Billing Management", "Users are authorized to review, update subscriptions.", true],
  [MousePointerClick, "Integration Setup", "Manage user integrations and associated tags.", false],
  [ShieldOff, "Permissions Control", "Grant or revoke user access and tags.", false],
  [Map, "Map Creation", "Start new mapping projects inside the workspace.", true],
  [LogOut, "Data Export", "Allow extraction of workspace data for analysis.", true],
  [Users, "User Roles", "Update roles and permissions for map users.", false],
  [ShieldCheck, "Security Settings", "Adjust workspace security protocols and measures.", true],
  [ChartColumn, "Insights Access", "View workspace analytics and performance data.", false],
  [Store, "Merchant List", "Update and manage merchant associations.", true],
];

function Tile({ icon: I, title, desc, on }: { icon: LucideIcon; title: string; desc: string; on: boolean }) {
  const [v, setV] = useState(on);
  return (
    <div className="flex justify-between gap-2.5 rounded-xl border p-4" style={{ borderColor: "var(--app-border)" }}>
      <div className="flex gap-3.5">
        <HexBadge tone="secondary" size={45}><span style={{ color: "var(--app-fg-muted)" }}><I size={18} /></span></HexBadge>
        <div className="flex flex-col gap-1"><span className="text-sm font-medium leading-none" style={{ color: "var(--app-fg-strong)" }}>{title}</span><span className="text-sm fathom-sec">{desc}</span></div>
      </div>
      <SwitchField aria-label={title} size="sm" checked={v} onChange={setV} />
    </div>
  );
}

export function PermissionsTogglePage() {
  return (
    <>
      <PageHeader title="Permissions - Toggler" crumbs={["My Account", "Members & Roles", "Permissions - Toggler"]} actions={<PageActions />} />
      <Container>
        <div className="grid gap-5 lg:gap-7.5">
          <Surface>
            <SurfaceHeader title={<span>Role Permissions for <Link href="#" className="font-medium" style={{ color: "var(--app-primary)" }}>Project Manager</Link></span>} />
            <div className="grid grid-cols-1 gap-5 p-5 py-5 lg:grid-cols-2 lg:py-7.5">
              {PERMS.map(([icon, t, d, on]) => <Tile key={t} icon={icon} title={t} desc={d} on={on} />)}
            </div>
            <SurfaceFooter className="items-center py-3.5"><Button variant="bordered">New Permission</Button></SurfaceFooter>
          </Surface>
          <RoleMembersCard title="Team Members" />
          <FaqCard />
          <div className="grid gap-5 lg:grid-cols-2 lg:gap-7.5">
            <Help title="Questions ?" text="Browse our Help Center for step-by-step guidance on billing, payments and subscriptions." link="Go to Help Center" icon={<ToggleRight size={48} strokeWidth={1.5} />} />
            <Help title="Contact Support" text="Need a hand? Reach our support team for quick, personal help with any questions or concerns." link="Contact Support" icon={<LifeBuoy size={48} strokeWidth={1.5} />} />
          </div>
        </div>
      </Container>
    </>
  );
}

const MATRIX: [string, boolean[]][] = [
  ["Team Preferences", [true, true, true, true]], ["Billing Management", [true, false, false, false]], ["Integration Setup", [true, true, false, false]],
  ["Map Creation", [true, true, true, true]], ["Data Export", [true, false, false, false]], ["User Roles", [true, false, false, false]],
  ["Security Settings", [true, false, false, false]], ["Insights Access", [false, false, false, false]], ["Merchant List", [true, true, false, false]],
];
const ROW_H = [67, 69, 69, 67, 69, 69, 69, 69, 68.5];
const GUIDES = [
  [UserCog, "Better Team Coordination: Role Assignment Tools", "Give your team flexible role assignment. Use our simple tools to assign and manage permissions, with resources and practices for working efficiently."],
  [ToggleRight, "Fine-Tuning Access: Customising Permissions", "Shape each person's experience with adjustable permissions. Our guides and resources make managing access levels straightforward, precise and secure for your workspace."],
  [ShieldCheck, "Stronger Security: Granular Permission Settings", "Harden your workspace with stronger permission controls. Advanced settings give granular access management so every team member has exactly the access they need, backed by our security guidance."],
] as const;

export function PermissionsCheckPage() {
  return (
    <>
      <PageHeader title="Permissions - Check" crumbs={["My Account", "Members & Roles", "Permissions - Check"]} actions={<PageActions />} />
      <Container>
        <div className="grid grid-cols-1 gap-5 lg:gap-7.5 xl:grid-cols-3">
          <div className="col-span-2"><div className="flex flex-col gap-5 lg:gap-7.5">
            <Surface>
              <SurfaceHeader className="gap-2" title={<span className="flex items-baseline gap-1"><Link href="#" className="text-xl font-medium" style={{ color: "var(--app-primary)" }}>Project Manager</Link> Role Permissions</span>} actions={<div className="flex gap-5"><Button variant="bordered">New Permission</Button></div>} />
              <div className="fathom-xscroll"><table className="w-full text-sm" style={{ color: "var(--app-fg-strong)" }}>
                <thead><tr style={{ background: "color-mix(in srgb, var(--app-surface-2) 60%, transparent)", borderBottom: "1px solid var(--app-border)" }}><th className="h-10 min-w-[300px] px-4 text-start font-normal fathom-sec">Module</th>{["View", "Modify", "Publish", "Configure"].map((h) => <th key={h} className="h-10 min-w-24 px-4 text-center font-normal fathom-sec">{h}</th>)}</tr></thead>
                <tbody className="font-medium">{MATRIX.map(([m, v], i) => (
                  <tr key={m} style={{ borderBottom: "1px solid var(--app-border)", height: ROW_H[i] }}><td className="p-4" style={{ paddingBlock: 22 }}>{m}</td>{v.map((c, k) => <td key={k} className="p-4 text-center" style={{ paddingBlock: 22 }}><Checkbox aria-label={`${m} ${k}`} defaultChecked={c} /></td>)}</tr>
                ))}</tbody></table></div>
              <SurfaceFooter className="justify-end gap-2.5 py-7.5"><Button variant="bordered">Restore Defaults</Button><Button color="primary">Save Changes</Button></SurfaceFooter>
            </Surface>
            <RoleMembersCard title="Role Members" />
            <FaqCard />
            <Help title="Contact Support" text="Need a hand? Reach our support team for quick, personal help with any questions or concerns." link="Contact Support" icon={<LifeBuoy size={48} strokeWidth={1.5} />} />
          </div></div>
          <div className="col-span-1"><div className="flex flex-col gap-5 lg:gap-7.5"><GuidesCard guides={GUIDES} extra={99} /></div></div>
        </div>
      </Container>
    </>
  );
}
