"use client";

import { Bell, Boxes, ChartLine, FileText, IdCard, KeySquare, MonitorSmartphone, Palette, ShieldCheck, SquareDashedMousePointer, Users } from "lucide-react";
import { TileGrid, type Tile } from "./TileGrid";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { PageActions } from "@/components/profile/ProfileShell";
import { FooterLink } from "@/components/profile/parts";

const ITEMS: Tile[] = [
  [IdCard, "Personal info", "Set how people see and reach you across the workspace.", "/account/home/user-profile"],
  [ShieldCheck, "Login & Security", "Keep your account safe with strong sign-in protection.", "/account/security/security-log"],
  [FileText, "Billing & Payments", "Manage plans, invoices and saved payment methods in one place.", "/account/billing/basic"],
  [Bell, "Notifications", "Choose which updates and reminders should reach you.", "/account/notifications"],
  [Boxes, "Integrations", "Connect the tools your team already relies on every day.", "/account/integrations"],
  [Users, "Members, Teams & Roles", "Invite people and decide who can do what.", "/account/members/roles"],
  [KeySquare, "API Keys", "Create, rotate and review access keys with confidence.", "/account/api-keys"],
  [SquareDashedMousePointer, "Appearance", "Pick a theme and density that suits the way you work.", "/account/appearance"],
  [MonitorSmartphone, "Devices", "See where you are signed in and sign out remotely.", "/account/security/device-management"],
  [Palette, "Brand", "Logos, colours and identity assets for your team.", "/account/invite-a-friend"],
  [ChartLine, "Activity", "A running log of what changed and who changed it.", "/account/activity"],
];

export function AccountGetStartedPage() {
  return (
    <>
      <PageHeader title="Get Started" crumbs={["My Account", "Account", "Get Started"]} actions={<PageActions />} />
      <Container>
        <TileGrid menu items={ITEMS} />
        <div className="flex grow pt-5 lg:pt-7.5"><FooterLink href="/account/members/team-info">More Account Options</FooterLink></div>
      </Container>
    </>
  );
}
