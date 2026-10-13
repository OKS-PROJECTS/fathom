"use client";

import Link from "next/link";
import { useState } from "react";
import { Avatar, Button, Chip, SwitchField } from "oks-ui";
import { CalendarCog, Camera, CircleAlert, Copy, Messages, Trash2, Truck, Volleyball, X, Zap, Check, Plus, Globe, AtSign } from "./icons";
import { Surface, SurfaceBody, SurfaceFooter, SurfaceHeader } from "@/components/ui/Surface";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { PageActions } from "@/components/profile/ProfileShell";
import { FileGlyph, FooterLink, HexBadge, MoreMenu } from "@/components/profile/parts";
import { avatarUrl } from "@/lib/avatar";
import { EditButton, ListRow, SettingsRows, TextAction } from "./parts";

const Switch = ({ label, defaultOn = false }: { label: string; defaultOn?: boolean }) => {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center gap-2">
      <label className="text-sm font-medium" style={{ color: "var(--app-fg-strong)" }} htmlFor={`sw-${label}`}>{label}</label>
      <SwitchField id={`sw-${label}`} aria-label={label} size="sm" checked={on} onChange={setOn} />
    </div>
  );
};

const Ok = (t: string) => <Chip size="sm" color="success" variant="soft" radius="md">{t}</Chip>;
const Round = ({ children, href = "#" }: { children: React.ReactNode; href?: string }) => (
  <Link href={href} className="flex size-8 items-center justify-center rounded-full border" style={{ borderColor: "var(--app-border-input)", background: "var(--app-surface)", color: "var(--app-fg-muted)" }}>{children}</Link>
);

const CONNECTIONS = [["Tyler Okafor", 26, "6", true], ["Esther Linde", 639, "none", false], ["Jacob Jaeger", 125, "19", true], ["Cody Marlowe", 81, "none", false], ["Leslie Alder", 1203, "2", false], ["Guy Hollis", 2, "none", true]] as const;
const FILES = [["Project-pitch.pdf", "4.7 MB  26 Sep 2025  3:20 PM", "pdf"], ["Report-v1.docx", "2.3 MB  1 Oct 2025  12:00 PM", "doc"], ["Framework-App.js", "0.8 MB  17 Oct 2025  6:46 PM", "code"], ["Mobile-logo.ai", "0.2 MB  4 Nov 2025  11:30 AM", "image"]] as const;

export function UserProfilePage() {
  return (
    <>
      <PageHeader title="User Profile" crumbs={["My Account", "Account", "User Profile"]} actions={<PageActions />} />
      <Container>
        <div className="grid grid-cols-1 gap-5 lg:gap-7.5 xl:grid-cols-2">
          <div className="col-span-1">
            <div className="grid gap-5 lg:gap-7.5">
              <Surface className="min-w-full">
                <SurfaceHeader title="Personal Info" />
                <SettingsRows labelWidth={112} actionAlign="center" lastBorder={false} rows={[
                  { label: "Photo", value: <span className="text-sm">150x150px JPEG, PNG Image</span>, valueClass: "min-w-32",
                    action: (
                      <div className="flex justify-center"><div className="relative size-16">
                        <button type="button" aria-label="Remove photo" className="absolute -end-0.5 -top-0.5 z-[1] grid size-5 place-items-center rounded-full border" style={{ background: "var(--app-surface)", borderColor: "var(--app-border-input)" }}><X size={13} /></button>
                        <div className="relative overflow-hidden rounded-full border-2" style={{ borderColor: "var(--oks-color-success-500)" }}>
                          <Avatar name="Jason Tatum" src={avatarUrl("me")} size={60} />
                          <div className="absolute inset-x-0 bottom-0 flex h-5 items-center justify-center" style={{ background: "rgb(0 0 0 / 0.25)", color: "#fff" }}><Camera size={12} /></div>
                        </div>
                      </div></div>
                    ) },
                  { label: "Name", value: "Maya Okoro", action: <EditButton /> },
                  { label: "Availability", value: Ok("Available now"), py: 12, action: <EditButton /> },
                  { label: "Birthday", value: <span className="fathom-sec">28 May 1996</span>, py: 12, action: <EditButton /> },
                  { label: "Gender", value: <span className="fathom-sec">Female</span>, py: 12, action: <EditButton /> },
                  { label: "Address", value: <span className="fathom-sec">You have no address yet</span>, py: 12, action: <TextAction href="/account/home/user-profile">Add</TextAction> },
                ]} />
              </Surface>

              <Surface className="min-w-full">
                <SurfaceHeader title="Basic Settings" actions={<Switch label="Public Profile" defaultOn />} />
                <SettingsRows lastBorder={false} rows={[
                  { label: "Email", value: <Link href="#" className="text-sm" style={{ color: "var(--app-fg-strong)" }}>maya@fathom.example</Link>, action: <EditButton /> },
                  { label: "Password", value: <span className="fathom-sec">Password last changed 2 months ago</span>, action: <EditButton /> },
                  { label: "2FA", value: <span className="fathom-sec">To be set</span>, py: 14, h: 53, action: <TextAction href="#" size={12}>Setup</TextAction> },
                  { label: "Sign-in with", value: <div className="flex gap-2.5"><Round><Globe size={16} /></Round><Round><AtSign size={16} /></Round></div>, py: 2, h: 53, action: <EditButton /> },
                  { label: "Team Account", value: <span className="fathom-sec">To be set</span>, py: 12, h: 53, action: <TextAction href="#" size={12}>Setup</TextAction> },
                  { label: "Social Profiles", value: <div className="flex gap-2.5"><Round><Globe size={16} /></Round><Round><AtSign size={16} /></Round><Round><Globe size={16} /></Round></div>, py: 2, h: 51, action: <EditButton /> },
                  { label: "Referral Link", value: <div className="flex items-center gap-0.5"><Link href="#" className="text-sm" style={{ color: "var(--app-fg-strong)" }}>https://fathom.example/W3gvQOI35dt</Link><Button variant="ghost" isIconOnly aria-label="Copy link"><Copy size={16} /></Button></div>, py: 12 },
                ]} />
              </Surface>

              <Surface className="min-w-full">
                <SurfaceHeader title="Work" actions={<Switch label="Available now" defaultOn />} />
                <SettingsRows labelWidth={0} actionMin={96} lastBorder={false} rows={[
                  { label: "Language", value: <>English <span className="fathom-sec">- Fluent</span></>, valueClass: "min-w-72 w-full", action: <EditButton /> },
                  { label: "Hourly Rate", value: "$28 / hour", h: 57, action: <EditButton /> },
                  { label: "Availability", value: "32 hours a week", h: 53, action: <EditButton /> },
                  { label: "Skills", value: <div className="flex flex-wrap gap-2.5">{["Web Design", "Code Review", "noCode", "UX", "Figma", "Webflow", "AI", "Management"].map((s) => <Chip key={s} size="sm" variant="soft" radius="md">{s}</Chip>)}</div>, py: 12, h: 83, action: <EditButton /> },
                  { label: "About", value: <>We&apos;re open to partnerships, guest posts, and<br />more. Join us to share your insights and grow<br />your audience.</>, py: 16, action: <EditButton /> },
                ]} />
              </Surface>

              <Surface>
                <SurfaceHeader title="Badges" actions={<Button variant="ghost" isIconOnly aria-label="About badges"><CircleAlert size={18} /></Button>} />
                <SurfaceBody className="p-5 pb-7.5">
                  <div className="grid gap-2.5">
                    {([[Volleyball, "primary", "Expert Contributor Badge"], [Zap, "warning", "Innovation Trailblazer"], [Messages, "success", "Impact Recognition"], [Truck, "secondary", "Performance Honor"]] as const).map(([I, tone, t]) => (
                      <ListRow key={t} trailing={<Button variant="ghost" isIconOnly aria-label={`Select ${t}`}><Check size={22} style={{ color: "var(--app-border-input)" }} /></Button>}>
                        <HexBadge tone={tone}><I size={20} /></HexBadge>
                        <span className="text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>{t}</span>
                      </ListRow>
                    ))}
                  </div>
                </SurfaceBody>
              </Surface>
            </div>
          </div>

          <div className="col-span-1">
            <div className="grid gap-5 lg:gap-7.5">
              <Surface className="justify-between gap-5 px-5 pt-5 lg:pt-10">
                <div className="text-center">
                  <h3 className="mb-1.5 text-lg font-semibold leading-6" style={{ color: "var(--app-fg-strong)" }}>Individually Tailored<br />Deals for Personal Satisfaction</h3>
                  <span className="mb-5 block text-sm fathom-sec">Discover promotions crafted to match your preferences.</span>
                  <Button as={Link} href="/network/user-table/visitors" className="fathom-btn-ink">Start Now</Button>
                </div>
                <div className="flex justify-center text-center">
                  <svg viewBox="0 0 320 200" width="366" height="229" className="block max-h-[300px]" aria-hidden>
                    <rect x="40" y="30" width="240" height="170" rx="14" fill="var(--oks-color-primary-500)" fillOpacity=".1" stroke="var(--oks-color-primary-500)" strokeWidth="2" />
                    <path d="M70 150c30-60 60-60 90-20s60 20 90-50" fill="none" stroke="var(--oks-color-primary-500)" strokeWidth="3" strokeLinecap="round" />
                    <circle cx="80" cy="70" r="12" fill="var(--oks-color-warning-400)" />
                  </svg>
                </div>
              </Surface>

              <Surface>
                <SurfaceHeader title={<span className="flex items-center gap-2">Calendar Accounts <span className="text-sm font-medium fathom-sec">1/5</span></span>} actions={<Button variant="bordered" startContent={<CalendarCog size={16} />}>Add New</Button>} />
                <SurfaceBody className="p-5">
                  <div className="grid gap-2.5">
                    {([["Google", "maya@fathom.example"], ["Monday", "maya.okoro@fathom.example"]] as const).map(([n, e]) => (
                      <ListRow key={n} trailing={<Button variant="ghost" aria-label={`Remove ${n}`} isIconOnly><Trash2 size={16} /></Button>}>
                        <Avatar name={n} size={24} radius="md" />
                        <div className="flex flex-col"><Link href="#" className="mb-px text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>{n}</Link><Link href="#" className="text-sm fathom-sec">{e}</Link></div>
                      </ListRow>
                    ))}
                  </div>
                </SurfaceBody>
              </Surface>

              <Surface className="min-w-full">
                <SurfaceHeader title="Connections" actions={<MoreMenu />} />
                <div className="fathom-xscroll">
                  <table className="w-full text-sm" style={{ color: "var(--app-fg-muted)" }}>
                    <tbody>
                      <tr style={{ background: "color-mix(in srgb, var(--app-surface-2) 60%, transparent)", borderBottom: "1px solid var(--app-border)" }}>
                        <td className="min-w-48 px-4 py-2.5">Name</td><td className="min-w-20 px-4 py-2.5 text-end font-medium">Joint Links</td><td className="px-4 py-2.5 text-end font-medium">Status</td><td className="min-w-16 px-4" />
                      </tr>
                      {CONNECTIONS.map(([n, c, j, on], i) => (
                        <tr key={n} style={{ borderBottom: i === CONNECTIONS.length - 1 ? 0 : "1px solid var(--app-border)" }}>
                          <td className="px-4 py-4"><div className="flex grow gap-2.5"><Avatar name={n} src={avatarUrl(3 + i)} size={36} />
                            <div className="flex flex-col gap-1"><Link href="/public-profile/profiles/creator" className="mb-px text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>{n}</Link><span className="text-xs leading-3 fathom-sec">{c} connections</span></div></div></td>
                          <td className="px-4 py-2 text-end">{j}</td>
                          <td className="px-4 py-2 text-end"><button type="button" aria-label={on ? "Connected" : "Connect"} className="fathom-round-toggle" data-on={on}>{on ? <Check size={14} /> : <Plus size={14} />}</button></td>
                          <td className="px-4 text-end"><MoreMenu /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <SurfaceFooter className="items-center"><FooterLink href="/account/home/user-profile">View 64 more</FooterLink></SurfaceFooter>
              </Surface>

              <Surface>
                <SurfaceHeader title="My Files" actions={<MoreMenu />} />
                <SurfaceBody className="p-5">
                  <div className="grid gap-2.5 lg:gap-5">
                    {FILES.map(([n, m, k]) => (
                      <div key={n} className="flex gap-3">
                        <div className="flex grow gap-2.5"><FileGlyph kind={k} /><div className="flex flex-col"><span className="mb-px text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>{n}</span><span className="text-xs fathom-sec">{m}</span></div></div>
                        <MoreMenu />
                      </div>
                    ))}
                  </div>
                </SurfaceBody>
                <SurfaceFooter className="items-center"><FooterLink href="/account/integrations">All Files</FooterLink></SurfaceFooter>
              </Surface>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
