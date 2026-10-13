"use client";

import { CloudCog, KeySquare, LayoutDashboard, MapPin, MonitorSmartphone, Settings, ShieldOff } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { PageActions } from "@/components/profile/ProfileShell";
import { TileGrid, type Tile } from "./TileGrid";

const ITEMS: Tile[] = [
  [LayoutDashboard, "Overview", "Our security features and the policies behind them at a glance.", "/account/security/overview"],
  [MapPin, "Allowed IP Addresses", "Limit access to approved IP addresses only.", "/account/security/allowed-ip-addresses"],
  [Settings, "Privacy Settings", "Shape your privacy with controls that stay in your hands.", "/account/security/privacy-settings"],
  [MonitorSmartphone, "Trusted Devices", "Recognise and approve the devices you trust.", "/account/security/device-management"],
  [CloudCog, "Backup & Recovery", "Dependable backups with simple restore options.", "/account/security/backup-and-recovery"],
  [KeySquare, "Login Sessions", "See and manage who is signed in right now.", "/account/security/current-sessions"],
  [ShieldOff, "Security Log", "A detailed record of security events for monitoring.", "/account/security/security-log"],
];

export function SecurityGetStartedPage() {
  return (
    <>
      <PageHeader title="Get Started" crumbs={["My Account", "Security", "Get Started"]} actions={<PageActions />} />
      <Container><TileGrid extra={4} items={ITEMS} /></Container>
    </>
  );
}
