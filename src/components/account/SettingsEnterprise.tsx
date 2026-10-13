"use client";

import Link from "next/link";
import { useState } from "react";
import { Avatar, Button, Chip, SwitchField, Table, type TableColumn } from "oks-ui";
import { Archive, CalendarCog, Camera, Copy, CloudUpload, FileText, Download, LogOut, MessageSquareText, OctagonAlert, ShieldCheck, Trash2, Upload, X, Globe, AtSign, Check, Plus, FileArchive, FileSpreadsheet, FileJson } from "lucide-react";
import { Surface, SurfaceBody, SurfaceFooter, SurfaceHeader } from "@/components/ui/Surface";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { PageActions } from "@/components/profile/ProfileShell";
import { ArtImage, FooterLink, MoreMenu } from "@/components/profile/parts";
import { avatarUrl } from "@/lib/avatar";
import { EditButton, ListRow, SettingsRows, TextAction } from "./parts";

const Sw = ({ id, label, on = false }: { id: string; label?: string; on?: boolean }) => {
  const [v, setV] = useState(on);
  return (
    <div className="flex items-center gap-2">
      {label && <label htmlFor={id} className="text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>{label}</label>}
      <SwitchField id={id} aria-label={label ?? id} size="sm" checked={v} onChange={setV} />
    </div>
  );
};
const Round = ({ children }: { children: React.ReactNode }) => (
  <Link href="#" className="flex size-8 items-center justify-center rounded-full border" style={{ borderColor: "var(--app-border-input)", background: "var(--app-surface)", color: "var(--app-fg-muted)" }}>{children}</Link>
);
const Hex = ({ children }: { children: React.ReactNode }) => (
  <div className="relative size-[50px] shrink-0"><svg viewBox="0 0 44 48" className="size-full" aria-hidden><path d="M22 2.5 40 12.8v22.4L22 45.5 4 35.2V12.8z" strokeLinejoin="round" style={{ fill: "color-mix(in srgb, var(--app-surface-2) 70%, var(--app-surface))", stroke: "var(--app-border-input)", strokeWidth: 1.5 }} /></svg>
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 leading-none" style={{ color: "var(--app-fg-muted)" }}>{children}</div></div>
);

type F = { n: string; type: string; size: string; icon: typeof FileText };
const FILES: F[] = [
  { n: "document.pdf", type: "PDF", size: "516.85KB", icon: FileText }, { n: "intro.zip", type: "Archive", size: "246.92KB", icon: FileArchive },
  { n: "conclusion.xlsx", type: "Sheet", size: "344.85KB", icon: FileSpreadsheet }, { n: "package.json", type: "JSON", size: "697 Bytes", icon: FileJson },
];
const PAYMENTS = [["24 Aug, 2025", "Subscription Fee", "$24.00"], ["15 Sep, 2025", "Product Purchase", "$50.99"], ["05 Dec, 2025", "Transaction Refund", "$12.00"], ["19 Jan, 2026", "Add-on Pack", "$9.50"]];
const DEVICES = [["Chrome", "Seville, Spain", "macOS 15.4", "Active: Today at 9:03 AM"], ["Chrome", "Lyon, France", "Android 16", "Active: Mar 18 at 9:03 AM"]];
const PEOPLE = [["Tyler Okafor", 26, "6", true], ["Esther Linde", 639, "none", false], ["Jacob Jaeger", 125, "19", true], ["Cody Marlowe", 81, "none", false], ["Leslie Alder", 1203, "2", false], ["Guy Hollis", 2, "none", true]] as const;
const FEATURES = [["DevOps Integration", "Ship sooner with continuous integration and deployment", "DevOps Features"], ["Data Encryption", "End-to-end encryption that keeps your data private", "Security Details"], ["API Integration", "Connect your own systems through our API", "API Docs"]];

export function SettingsEnterprisePage() {
  const fileCols: TableColumn<F>[] = [
    { key: "n", header: "Name", render: (r) => <span className="flex items-center gap-1"><r.icon size={16} className="fathom-muted" /><span className="truncate text-sm font-medium">{r.n}</span></span> },
    { key: "t", header: "Type", render: (r) => <Chip size="sm" variant="soft" radius="md">{r.type}</Chip> },
    { key: "s", header: "Size", render: (r) => <span className="text-sm fathom-sec">{r.size}</span> },
    { key: "a", header: "Actions", align: "end", render: () => <div className="flex justify-end gap-1"><Button variant="ghost" isIconOnly size="sm" aria-label="Download"><Download size={14} /></Button><Button variant="ghost" isIconOnly size="sm" aria-label="Delete"><Trash2 size={14} /></Button></div> },
  ];
  return (
    <>
      <PageHeader title="Settings - Enterprise" crumbs={["My Account", "Account", "Settings - Enterprise"]} actions={<PageActions />} />
      <Container>
        <div className="grid gap-5 lg:gap-7.5">
          <Surface>
            <div className="flex grow flex-wrap justify-between gap-2 p-5">
              <div className="flex gap-4">
                <Hex><OctagonAlert size={20} style={{ color: "var(--oks-color-warning-400)" }} /></Hex>
                <div className="flex flex-col gap-1.5">
                  <div className="flex flex-wrap gap-2.5"><Link href="#" className="text-base font-medium" style={{ color: "var(--app-fg-strong)" }}>Upgrade your business info</Link><Chip size="sm" variant="soft" radius="md">16 days left</Chip></div>
                  <div className="text-sm" style={{ color: "var(--app-fg)" }}>Polish your business details so they stand out. Premium features help your profile get seen.<br />Upgrade now for heightened visibility and broader impact.</div>
                </div>
              </div>
              <div className="flex gap-1.5"><Button className="fathom-btn-ink">Start</Button><Button variant="ghost">Skip</Button></div>
            </div>
          </Surface>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-7.5">
            <div className="col-span-1"><div className="flex flex-col gap-5 lg:gap-7.5">
              <Surface className="min-w-full">
                <SurfaceHeader title="Account" actions={<Sw id="ent-pub" label="Public Profile" on />} />
                <SettingsRows labelWidth={112} actionAlign="center" lastBorder={false} rows={[
                  { label: "Photo", value: <span className="text-sm fathom-sec">150x150px JPEG, PNG Image</span>, py: 16, valueClass: "min-w-32",
                    action: <div className="flex justify-center"><div className="relative size-16"><button type="button" aria-label="Remove photo" className="absolute -end-0.5 -top-0.5 z-[1] grid size-5 place-items-center rounded-full border" style={{ background: "var(--app-surface)", borderColor: "var(--app-border-input)" }}><X size={13} /></button>
                      <div className="relative overflow-hidden rounded-full border-2" style={{ borderColor: "var(--oks-color-success-500)" }}><Avatar name="Maya Okoro" src={avatarUrl("me")} size={60} /><div className="absolute inset-x-0 bottom-0 flex h-5 items-center justify-center" style={{ background: "rgb(0 0 0 / 0.25)", color: "#fff" }}><Camera size={12} /></div></div></div></div> },
                  { label: "Name", value: "Maya Okoro", py: 16, action: <EditButton /> },
                  { label: "Availability", value: <Chip size="sm" color="success" variant="soft" radius="md">Available now</Chip>, py: 16, action: <EditButton /> },
                  { label: "Email", value: <Link href="#" className="text-sm fathom-sec">maya@fathom.example</Link>, py: 16, action: <EditButton /> },
                  { label: "Password", value: <span className="fathom-sec">Password last changed 2 months ago</span>, py: 16, action: <EditButton /> },
                  { label: "Sign-in with", value: <div className="flex gap-2.5"><Round><Globe size={16} /></Round><Round><AtSign size={16} /></Round></div>, py: 16, action: <EditButton /> },
                  { label: "Team Account", value: <span className="fathom-sec">To be set</span>, py: 12, h: 53, action: <TextAction href="#" size={12}>Setup</TextAction> },
                  { label: "Social Profiles", value: <div className="flex gap-2.5"><Round><Globe size={16} /></Round><Round><AtSign size={16} /></Round><Round><Globe size={16} /></Round></div>, py: 16, action: <EditButton /> },
                  { label: "Referral Link", value: <div className="flex items-center gap-0.5"><Link href="#" className="text-sm fathom-sec">https://fathom.example/W3gvQOI35dt</Link><Button variant="ghost" isIconOnly aria-label="Copy link"><Copy size={16} /></Button></div>, py: 16, action: <TextAction href="#">Re-create</TextAction> },
                ]} />
              </Surface>

              <Surface>
                <SurfaceHeader title="Two-Factor authentication(2FA)" actions={<MoreMenu />} />
                <SurfaceBody className="p-5 lg:py-7.5">
                  <div className="grid gap-5">
                    <div className="flex flex-wrap justify-between gap-2 rounded-xl border px-3.5 py-2.5 lg:flex-nowrap" style={{ borderColor: "var(--app-border)" }}><div className="flex flex-wrap gap-3.5 lg:flex-nowrap"><Hex><MessageSquareText size={20} /></Hex><div className="flex flex-col"><Link href="#" className="mb-px text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>Text Message (SMS)</Link><span className="text-sm fathom-sec">Instant codes for secure account verification.</span></div></div><div className="flex items-start"><Sw id="ent-sms" on /></div></div>
                    <div className="flex flex-wrap justify-between gap-2 rounded-xl border px-3.5 py-2.5 lg:flex-nowrap" style={{ borderColor: "var(--app-border)" }}><div className="flex flex-wrap gap-3.5 lg:flex-nowrap"><Hex><ShieldCheck size={20} /></Hex><div className="flex flex-col"><Link href="#" className="mb-px text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>Authenticator App (TOTP)</Link><span className="text-sm fathom-sec">Add protection with an authenticator app for two-factor sign-in.</span></div></div><div className="flex items-start"><Sw id="ent-totp" /></div></div>
                  </div>
                </SurfaceBody>
              </Surface>

              <Surface>
                <SurfaceHeader title="Company Documents" />
                <SurfaceBody className="space-y-5 p-5">
                  <div className="relative rounded-lg border border-dashed p-6 text-center" style={{ borderColor: "var(--app-border-input)" }}>
                    <div className="flex flex-col items-center gap-4">
                      <div className="flex size-12 items-center justify-center rounded-full" style={{ background: "var(--app-bg)" }}><Upload size={20} className="fathom-muted" /></div>
                      <div className="space-y-2"><p className="text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>Drop files here or <Link href="#" style={{ color: "var(--app-primary)" }}>browse files</Link></p><p className="text-xs fathom-muted">Maximum file size: 50MB &bull; Maximum files: 10</p></div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between"><h3 className="text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>Files ({FILES.length})</h3><div className="flex gap-2"><Button variant="bordered" size="sm" startContent={<CloudUpload size={14} />}>Add files</Button><Button variant="bordered" size="sm" startContent={<Trash2 size={14} />}>Remove all</Button></div></div>
                    <div className="fathom-xscroll rounded-lg border" style={{ borderColor: "var(--app-border)" }}>
                      <div className="fathom-table fathom-table-files"><Table aria-label="Files" columns={fileCols} rows={FILES} getRowKey={(r) => r.n} removeWrapper /></div>
                    </div>
                  </div>
                </SurfaceBody>
              </Surface>

              <Surface>
                <SurfaceHeader title={<span className="flex items-center gap-2">Calendar Accounts <span className="text-sm font-medium fathom-sec">1/5</span></span>} actions={<Button variant="bordered" startContent={<CalendarCog size={16} />}>Add New</Button>} />
                <SurfaceBody className="p-5"><div className="grid gap-2.5">
                  {([["Google", "maya@fathom.example"], ["Monday", "maya.okoro@fathom.example"]] as const).map(([n, e]) => (
                    <ListRow key={n} trailing={<Button variant="ghost" aria-label={`Remove ${n}`} isIconOnly><Trash2 size={16} /></Button>}><Avatar name={n} size={24} radius="md" /><div className="flex flex-col"><Link href="#" className="mb-px text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>{n}</Link><Link href="#" className="text-sm fathom-sec">{e}</Link></div></ListRow>
                  ))}
                </div></SurfaceBody>
              </Surface>

              <Surface>
                <SurfaceHeader title="Data import from Google Analytics" actions={<Button variant="ghost" isIconOnly aria-label="About"><Archive size={18} /></Button>} />
                <SurfaceBody className="p-5 py-5 lg:py-7.5"><div className="mb-4 text-sm" style={{ color: "var(--app-fg)" }}>Name what you want, then map the route. Turn a big idea into goals you can measure.</div><Button variant="bordered" startContent={<Globe size={16} />}>Continue with Google</Button></SurfaceBody>
              </Surface>

              <Surface className="min-w-full">
                <SurfaceHeader title="Trusted Devices" actions={<MoreMenu />} />
                <div className="fathom-xscroll"><table className="w-full text-sm font-medium" style={{ color: "var(--app-fg-muted)" }}><tbody>
                  {DEVICES.map(([b, loc, os, act], i) => (
                    <tr key={loc} style={{ borderBottom: i === DEVICES.length - 1 ? 0 : "1px solid var(--app-border)" }}>
                      <td className="min-w-48 p-4"><div className="flex items-center gap-2.5"><Globe size={24} className="fathom-sec" /><div className="flex flex-col"><div className="mb-px text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>{b}</div><span className="text-xs fathom-sec">{loc}</span></div></div></td>
                      <td className="min-w-56 p-4 font-normal fathom-sec">{os}<br />{act}</td>
                      <td className="min-w-16 p-4 text-end" style={{ paddingRight: 30 }}><Button variant="ghost" isIconOnly aria-label="Sign out device"><LogOut size={16} /></Button></td>
                    </tr>
                  ))}
                </tbody></table></div>
                <SurfaceFooter className="items-center"><FooterLink href="#">Manage Trusted Devices</FooterLink></SurfaceFooter>
              </Surface>
            </div></div>

            <div className="col-span-1"><div className="flex flex-col gap-5 lg:gap-7.5">
              <Surface>
                <SurfaceHeader title="Your Current Plan" actions={<MoreMenu />} />
                <SurfaceBody className="p-5 lg:py-7.5">
                  <div className="flex flex-col gap-5 sm:flex-row lg:flex-col lg:gap-7.5 xl:flex-row">
                    <div className="grid content-between rounded-xl border md:flex-1" style={{ borderColor: "var(--app-border)" }}>
                      <ArtImage seed={7} height={192} width="100%" className="rounded-t-lg" />
                      <div className="flex flex-col gap-2 p-5 pt-4">
                        <Link href="#" className="text-base font-medium" style={{ color: "var(--app-fg-strong)" }}>Premium Plan</Link>
                        <p className="mb-2 text-sm fathom-sec">Access premium perks through our exclusive Premium Plan</p>
                        <div><Button variant="bordered">Change Plan</Button></div>
                      </div>
                    </div>
                    <div className="md:flex-1"><div className="flex flex-col gap-5 lg:gap-7.5">
                      {FEATURES.map(([t, d, l]) => (
                        <div key={t} className="flex flex-col items-start gap-2.5"><Link href="#" className="text-base font-medium" style={{ color: "var(--app-fg-strong)" }}>{t}</Link><p className="text-sm fathom-sec">{d}</p><FooterLink href="#">{l}</FooterLink></div>
                      ))}
                    </div></div>
                  </div>
                </SurfaceBody>
                <SurfaceFooter className="items-center"><FooterLink href="/account/billing/basic">Go to Billing</FooterLink></SurfaceFooter>
              </Surface>

              <Surface>
                <SurfaceHeader title="Set a Goal" actions={<MoreMenu />} />
                <SurfaceBody className="p-5 lg:p-7.5">
                  <p className="mb-3.5 text-sm leading-5" style={{ color: "var(--app-fg)" }}>Name what you want, then map the route. Turn a big idea into<br />measurable achievements.</p>
                  <Surface className="!shadow-none p-3.5">
                    <div className="mb-7 flex flex-wrap justify-between gap-2">
                      <div className="flex gap-3.5 pt-1"><span className="text-2xl font-semibold" style={{ color: "var(--app-fg-strong)" }}>$0</span><span className="text-sm fathom-sec">Pursuing opportunities, earning zero. Growth<br />beyond monetary measures.</span></div>
                      <Button variant="bordered">Add a Goal</Button>
                    </div>
                    <div className="mb-3"><input type="range" aria-label="Goal amount" className="block h-4 w-full" defaultValue={0} /></div>
                  </Surface>
                </SurfaceBody>
              </Surface>

              <Surface>
                <SurfaceHeader title="Payment History" actions={<MoreMenu />} />
                <div className="fathom-xscroll fathom-table fathom-table-roomy"><table className="w-full"><thead><tr><th className="min-w-40">Date</th><th className="min-w-40 lg:!text-end">Type</th><th className="min-w-40 lg:!text-end">Amount</th><th className="w-8" aria-label="Actions" /></tr></thead>
                  <tbody>{PAYMENTS.map(([d, t, a], i) => (<tr key={d} style={i === PAYMENTS.length - 1 ? { height: 73 } : undefined}><td className="text-sm" style={{ color: "var(--app-fg-strong)" }}>{d}</td><td className="text-sm lg:text-end">{t}</td><td className="text-sm lg:text-end">{a}</td><td><MoreMenu /></td></tr>))}</tbody></table></div>
                <SurfaceFooter className="items-center"><FooterLink href="#">All Payments</FooterLink></SurfaceFooter>
              </Surface>

              <Surface className="min-w-full">
                <SurfaceHeader title="Connections" actions={<MoreMenu />} />
                <div className="fathom-xscroll"><table className="w-full text-sm" style={{ color: "var(--app-fg-muted)" }}><tbody>
                  <tr style={{ background: "color-mix(in srgb, var(--app-surface-2) 60%, transparent)", borderBottom: "1px solid var(--app-border)" }}><td className="min-w-48 px-4 py-2.5">Name</td><td className="min-w-20 px-4 py-2.5 text-end font-medium">Joint Links</td><td className="px-4 py-2.5 text-end font-medium">Status</td><td className="min-w-16 px-4" /></tr>
                  {PEOPLE.map(([n, c, j, on], i) => (
                    <tr key={n} style={{ borderBottom: i === PEOPLE.length - 1 ? 0 : "1px solid var(--app-border)" }}>
                      <td className="px-4 py-[15px]"><div className="flex gap-2.5"><Avatar name={n} src={avatarUrl(3 + i)} size={36} /><div className="flex flex-col gap-1"><Link href="#" className="mb-px text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>{n}</Link><span className="text-xs leading-3 fathom-sec">{c} connections</span></div></div></td>
                      <td className="px-4 py-2 text-end">{j}</td>
                      <td className="px-4 py-2 text-end"><button type="button" aria-label={on ? "Connected" : "Connect"} className="fathom-round-toggle" data-on={on}>{on ? <Check size={14} /> : <Plus size={14} />}</button></td>
                      <td className="px-4 text-end"><MoreMenu /></td>
                    </tr>
                  ))}
                </tbody></table></div>
                <SurfaceFooter className="items-center"><FooterLink href="#">View 64 more</FooterLink></SurfaceFooter>
              </Surface>
            </div></div>
          </div>
        </div>
      </Container>
    </>
  );
}
