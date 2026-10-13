"use client";

import Link from "next/link";
import { ChartLine, Eye, Fingerprint, PenTool, Rocket, Settings, Truck, Users, type LucideIcon } from "lucide-react";
import { Surface } from "@/components/ui/Surface";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { PageActions } from "@/components/profile/ProfileShell";
import { HexBadge, MoreMenu } from "@/components/profile/parts";

type Role = [LucideIcon, "info" | "warning" | "success" | "danger" | "primary" | "secondary", string, string, string, string];
const ROLES: Role[] = [
  [Settings, "info", "Administrator", "Default role", "Handles system configuration and user access, keeping everything stable.", "1 person"],
  [Eye, "warning", "Viewer", "Default role", "Can see data but is not allowed to make changes.", "32 people"],
  [Fingerprint, "success", "Remote Developer", "Remote role", "Provides assistance and resolves customer inquiries and issues.", "6 people"],
  [Truck, "danger", "Customer Support", "Default role", "Provides assistance and resolves customer inquiries and issues.", "32 people"],
  [ChartLine, "primary", "Project Manager", "Default role", "Oversees projects, ensures they're on time and within budget.", "6 people"],
  [PenTool, "secondary", "Remote Designer", "Remote role", "Creates visual designs remotely for various projects.", "6 people"],
  [Users, "success", "HR Manager", "Default role", "Manages human resources, recruitment, and employee relations.", "1 person"],
];

export function RolesPage() {
  return (
    <>
      <PageHeader title="Roles" crumbs={["My Account", "Members & Roles", "Roles"]} actions={<PageActions />} />
      <Container>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-7.5 xl:grid-cols-3">
          {ROLES.map(([Icon, tone, name, kind, text, count]) => (
            <Surface key={name} className="flex-col gap-5 p-5 lg:p-7.5">
              <div className="flex flex-wrap justify-between gap-1">
                <div className="flex gap-2.5">
                  <HexBadge tone={tone} size={44}><Icon size={20} /></HexBadge>
                  <div className="flex flex-col"><Link href="/public-profile/profiles/creator" className="mb-px text-base font-medium" style={{ color: "var(--app-fg-strong)" }}>{name}</Link><span className="text-sm fathom-sec">{kind}</span></div>
                </div>
                <MoreMenu />
              </div>
              <p className="text-sm fathom-sec">{text}</p>
              <span className="text-sm" style={{ color: "var(--app-fg)" }}>{count}</span>
            </Surface>
          ))}
          <Surface className="h-full border-2 border-dashed" style={{ borderColor: "color-mix(in srgb, var(--oks-color-warning-500) 30%, var(--app-surface))", background: "color-mix(in srgb, var(--oks-color-warning-500) 4%, var(--app-surface))" }}>
            <div className="grow p-5">
              <div className="flex flex-col gap-3">
                <div className="flex justify-center pt-5"><HexBadge tone="warning" size={60}><Rocket size={22} /></HexBadge></div>
                <div className="flex flex-col text-center"><span className="mb-px text-lg font-medium" style={{ color: "var(--app-fg-strong)" }}>Create a Role</span><span className="text-sm fathom-sec">Launch New Responsibilities</span></div>
              </div>
            </div>
          </Surface>
        </div>
      </Container>
    </>
  );
}
