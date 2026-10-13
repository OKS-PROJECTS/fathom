"use client";

import Link from "next/link";
import { useState } from "react";
import { Avatar, Button, Chip, SwitchField } from "oks-ui";
import { BadgeCheck, CircleCheck, CircleCheckBig, Globe, LocateFixed, LogOut, Puzzle, ShieldCheck, ShieldOff, ShieldQuestion, TabletSmartphone, Users, Smartphone, AtSign } from "lucide-react";
import { Surface, SurfaceBody, SurfaceFooter, SurfaceHeader } from "@/components/ui/Surface";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { PageActions } from "@/components/profile/ProfileShell";
import { FooterLink, MoreMenu } from "@/components/profile/parts";
import { avatarUrl } from "@/lib/avatar";
import { EditButton, SettingsRows, TextAction } from "./parts";
import { GuidesCard } from "./GuidesCard";
import { TrustedDevicesCard } from "./TrustedDevices";

export const Hex = ({ children }: { children: React.ReactNode }) => (
  <div className="relative size-[50px] shrink-0"><svg viewBox="0 0 44 48" className="size-full" aria-hidden><path d="M22 2.5 40 12.8v22.4L22 45.5 4 35.2V12.8z" strokeLinejoin="round" style={{ fill: "color-mix(in srgb, var(--app-surface-2) 70%, var(--app-surface))", stroke: "var(--app-border-input)", strokeWidth: 1.5 }} /></svg>
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 leading-none" style={{ color: "var(--app-fg-muted)" }}>{children}</div></div>
);
const Round = ({ children }: { children: React.ReactNode }) => (
  <Link href="#" className="flex size-8 items-center justify-center rounded-full border" style={{ borderColor: "var(--app-border-input)", background: "var(--app-surface)", color: "var(--app-fg-muted)" }}>{children}</Link>
);
export const Tg = ({ id, on = false }: { id: string; on?: boolean }) => { const [v, setV] = useState(on); return <SwitchField id={id} aria-label={id} size="sm" checked={v} onChange={setV} />; };

export function Row({ icon, title, badge, desc, children, last = false, wrap = true, extra = 0 }: { icon: React.ReactNode; title: string; badge?: React.ReactNode; desc: string; children: React.ReactNode; last?: boolean; wrap?: boolean; extra?: number }) {
  return (
    <div className={`flex justify-between gap-2.5 p-5 py-4 ${wrap ? "flex-wrap sm:flex-nowrap" : ""}`} style={{ borderBottom: last ? 0 : "1px solid var(--app-border)", paddingBottom: 16 + extra }}>
      <div className="flex gap-3.5"><Hex>{icon}</Hex>
        <div className="flex flex-col gap-0.5"><span className="flex gap-1.5 text-sm font-medium leading-none" style={{ color: "var(--app-fg-strong)" }}>{title}{badge}</span><span className="text-sm fathom-sec">{desc}</span></div></div>
      <div className="flex gap-2.5">{children}</div>
    </div>
  );
}
export const Pro = () => <Chip size="xs" variant="soft" color="primary" radius="sm">Pro</Chip>;
export const Beta = () => <Chip size="sm" variant="soft" color="secondary" radius="md">Beta</Chip>;

const SESSIONS = [["Tyler Okafor", 26, "New Zealand", "Current session"], ["Esther Linde", 639, "Spain", "2 days ago"], ["Jacob Jaeger", 125, "Norway", "3 days ago"], ["Cody Marlowe", 81, "Japan", "Last week"], ["Leslie Alder", 1203, "Chile", "2 weeks ago"]];
const GUIDES = [
  [ShieldOff, "Building Security Know-How: Guides, Tips and Docs", "Browse in-depth resources that build security awareness through detailed guides, practical tips and documentation."],
  [ShieldCheck, "Learning Security Protocols with Expert Guidance", "Learn the essentials of security with focused learning material, expert guidance and tips you can use every day."],
  [ShieldQuestion, "Security Questions Answered: Advice for Every Team", "Straight answers to what teams ask most about access, devices and responding to incidents."],
] as const;

export function SecurityOverviewPage() {
  return (
    <>
      <PageHeader title="Security Overview" crumbs={["My Account", "Security", "Security Overview"]} actions={<PageActions />} />
      <Container>
        <div className="grid grid-cols-1 gap-5 lg:gap-7.5 xl:grid-cols-3">
          <div className="col-span-2"><div className="flex flex-col gap-5 lg:gap-7.5">
            <Surface>
              <SurfaceBody className="px-10 py-[19px] lg:pe-12.5">
                <div className="flex flex-wrap justify-between gap-6 p-2.5 md:gap-10 xl:flex-nowrap">
                  <div className="flex flex-col items-start gap-3 md:max-w-[60%]">
                    <h2 className="text-xl font-semibold" style={{ color: "var(--app-fg-strong)" }}>Everyday Personal Security Tips for Safer Accounts</h2>
                    <p className="mb-2.5 text-sm font-normal leading-5.5 fathom-sec">Small habits protect your account every day. Review these basics and turn on the protections that fit the way you work.</p>
                    <div className="grid gap-2 md:grid-cols-2">{["Strong Passwords", "Two-Factor Authentication", "Trusted Devices", "Review Sign-ins"].map((t) => <div key={t} className="flex items-center gap-1.5 pe-7.5"><CircleCheck size={16} style={{ color: "var(--oks-color-success-500)" }} aria-hidden /><span className="text-nowrap text-sm" style={{ color: "var(--app-fg-strong)" }}>{t}</span></div>)}</div>
                  </div>
                  <div><svg viewBox="0 0 200 144" width="200" height="144" className="block max-h-36" aria-hidden><path d="M100 14 40 38v38c0 36 26 56 60 66 34-10 60-30 60-66V38z" fill="var(--oks-color-primary-500)" fillOpacity=".1" stroke="var(--oks-color-primary-500)" strokeWidth="2.5" strokeLinejoin="round" /><path d="m76 78 18 18 32-36" fill="none" stroke="var(--oks-color-primary-500)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
                </div>
              </SurfaceBody>
              <SurfaceFooter className="items-center"><FooterLink href="#">Review Security Tips</FooterLink></SurfaceFooter>
            </Surface>

            <Surface>
              <Row icon={<Users size={20} />} title="Prevent members from inviting others" badge={<Pro />} desc="Stop members from sending invitations to new people."><Tg id="sec-1" /></Row>
              <Row icon={<Puzzle size={20} />} title="Prevent members from installing third-party integrations" badge={<Pro />} desc="Block members from adding outside apps or integrations."><Tg id="sec-2" /></Row>
              <Row icon={<LocateFixed size={20} />} title="Allow use location" desc="Turn on location use and sharing for users."><Tg id="sec-3" /></Row>
              <Row icon={<ShieldCheck size={20} />} title="Push protection for yourself" badge={<Beta />} desc="Let users build and publish a public profile."><Button variant="bordered">Setup</Button></Row>
              <Row icon={<BadgeCheck size={20} />} title="Allow public profile" desc="Let users build and publish a public profile."><Tg id="sec-5" /></Row>
              <Row icon={<CircleCheckBig size={20} />} title="Allow use location" desc="Turn on location use and sharing for users."><Tg id="sec-6" /></Row>
              <Row icon={<TabletSmartphone size={20} />} title="Private vulnerability reporting" badge={<Beta />} desc="A private route for reporting security vulnerabilities." last extra={1}>
                <Button variant="bordered" style={{ background: "var(--oks-color-danger-100)", borderColor: "var(--oks-color-danger-200)", color: "var(--oks-color-danger-600)" }}>Disable all</Button><Button variant="bordered">Enable all</Button>
              </Row>
            </Surface>

            <Surface className="min-w-full">
              <SurfaceHeader title="Authentication" />
              <SettingsRows labelWidth={0} lastBorder={false} rows={[
                { label: "Password", value: <span className="fathom-sec">Password last changed 2 months ago</span>, py: 16, h: 67, action: <EditButton /> },
                { label: "2FA", value: <span className="fathom-sec">To be set</span>, py: 15.5, h: 52, action: <TextAction href="#">Setup</TextAction> },
                { label: "Sign-in with", value: <div className="flex gap-2.5"><Round><Globe size={16} /></Round><Round><AtSign size={16} /></Round></div>, py: 16, h: 67, action: <EditButton /> },
              ]} />
            </Surface>

            <Surface>
              <Row icon={<ShieldCheck size={20} />} title="Enforce two-step verification" desc="Add a second layer of protection with two-step verification." wrap={false}><Tg id="sec-2fa" /></Row>
              <Row icon={<LogOut size={20} />} title="Logout everyone" desc="Sign every user out of every device at once." wrap={false} last extra={1}><Button variant="bordered">Logout everyone</Button></Row>
            </Surface>

            <Surface className="min-w-full">
              <SurfaceHeader title="Login Sessions" actions={<MoreMenu />} />
              <div className="fathom-xscroll"><table className="w-full text-sm" style={{ color: "var(--app-fg-muted)" }}>
                <thead><tr style={{ background: "color-mix(in srgb, var(--app-surface-2) 60%, transparent)", borderBottom: "1px solid var(--app-border)" }}><th className="h-10 min-w-48 px-4 text-start font-normal">Name</th><th className="h-10 min-w-20 px-4 text-end font-normal">Location</th><th className="h-10 px-4 text-end font-normal">Recent activity</th><th className="h-10 w-[70px] px-4" aria-label="Actions" /></tr></thead>
                <tbody>{SESSIONS.map(([n, c, loc, act], i) => (
                  <tr key={n} style={{ borderBottom: i === SESSIONS.length - 1 ? 0 : "1px solid var(--app-border)" }}>
                    <td className="p-4"><div className="flex gap-2.5"><Avatar name={n as string} src={avatarUrl(3 + i)} size={36} /><div className="flex flex-col gap-0.5"><Link href="#" className="text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>{n}</Link><span className="text-xs fathom-sec">{c} connections</span></div></div></td>
                    <td className="p-4 text-end font-normal">{loc}</td><td className="p-4 text-end font-normal">{act}</td><td className="p-4 text-end"><div className="flex justify-end"><MoreMenu /></div></td>
                  </tr>))}</tbody></table></div>
              <SurfaceFooter className="items-center"><FooterLink href="#">Manage Sessions</FooterLink></SurfaceFooter>
            </Surface>

            <TrustedDevicesCard />
          </div></div>

          <div className="col-span-1"><div className="flex flex-col gap-5 lg:gap-7.5">
            {([["iOS", "24", Smartphone], ["Android", "35", Smartphone]] as const).map(([n, v, I]) => (
              <Surface key={n} className="p-5"><div className="flex flex-wrap justify-between gap-5"><div className="flex gap-2.5"><Hex><I size={20} /></Hex><div className="flex flex-col gap-0.5"><span className="text-base font-medium leading-none" style={{ color: "var(--app-fg-strong)" }}>{n}</span><span className="text-sm fathom-sec">Active Sessions</span></div></div><div className="text-2xl font-semibold" style={{ color: "var(--app-fg-strong)" }}>{v}</div></div></Surface>
            ))}
            <GuidesCard guides={GUIDES} extra={59} />
          </div></div>
        </div>
      </Container>
    </>
  );
}
