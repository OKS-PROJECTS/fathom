"use client";

import Link from "next/link";
import { Avatar, AvatarGroup, Button, Chip, Progress } from "oks-ui";
import { CalendarDays, Check, CreditCard, Download, Landmark, Mail, ScrollText, SquarePen, SquarePlus, Trash2 } from "lucide-react";
import { Surface, SurfaceBody, SurfaceFooter, SurfaceHeader } from "@/components/ui/Surface";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { PageActions } from "@/components/profile/ProfileShell";
import { FooterLink, MoreMenu } from "@/components/profile/parts";
import { avatarUrl } from "@/lib/avatar";
import { SettingsRows } from "./parts";

const Hex = ({ children, tone = "warning" }: { children: React.ReactNode; tone?: string }) => (
  <div className="relative size-[50px] shrink-0"><svg viewBox="0 0 44 48" className="size-full" aria-hidden><path d="M22 2.5 40 12.8v22.4L22 45.5 4 35.2V12.8z" strokeLinejoin="round" style={{ fill: `color-mix(in srgb, var(--oks-color-${tone}-500) 10%, var(--app-surface))`, stroke: `color-mix(in srgb, var(--oks-color-${tone}-500) 35%, transparent)`, strokeWidth: 1.5 }} /></svg>
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 leading-none" style={{ color: `var(--oks-color-${tone}-400)` }}>{children}</div></div>
);
const Mini = ({ v, l }: { v: string; l: string }) => (
  <div className="flex flex-col gap-1.5 rounded-md border border-dashed px-[11px] py-[9px]" style={{ borderColor: "var(--app-border-input)" }}>
    <span className="text-sm font-medium leading-none" style={{ color: "var(--app-fg-strong)" }}>{v}</span><span className="text-xs fathom-sec">{l}</span>
  </div>
);
const bar = (c = "var(--oks-palette-blue-500)") => ({ ["--oks-progress-height" as string]: "6px", ["--oks-progress-indicator" as string]: c, ["--oks-progress-track" as string]: "var(--app-bg)" });
const INV = [["Invoice-2026-xd912c", "Upcoming", "6 Aug, 2026", "24.00"], ["Invoice-2026-rq857m", "Paid", "17 Jun, 2026", "29.99"], ["Invoice-2026-hg234x", "Declined", "21 Apr, 2026", "6.59"], ["Invoice-2026-lp098y", "Paid", "14 Mar, 2026", "24.00"]] as const;
const tone = (s: string) => (s === "Paid" ? "success" : s === "Declined" ? "danger" : "warning");

export function BillingEnterprisePage() {
  return (
    <>
      <PageHeader title="Billing - Enterprise" crumbs={["My Account", "Billing", "Billing - Enterprise"]} actions={<PageActions />} />
      <Container>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-7.5">
          <div className="col-span-2">
            <Surface>
              <div className="flex grow justify-between gap-5 p-5">
                <div className="flex gap-4">
                  <Hex tone="primary"><ScrollText size={20} /></Hex>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2.5"><Link href="#" className="text-base font-medium" style={{ color: "var(--app-fg-strong)" }}>Upgrade your workspace to Enterprise</Link><Chip size="sm" color="danger" variant="soft" radius="md">Trial expires in 29 days</Chip></div>
                    <div className="text-sm fathom-sec">The Enterprise plan adds advanced components, audit trails and dedicated support for teams that ship at scale, with a single contract and predictable pricing.</div>
                  </div>
                </div>
                <div className="flex gap-1.5"><Button variant="ghost">Cancel Trial</Button><Button className="fathom-btn-ink">Upgrade Now</Button></div>
              </div>
            </Surface>
          </div>

          <div className="col-span-2">
            <Surface>
              <SurfaceBody className="p-5 lg:py-7.5">
                <div className="flex flex-wrap gap-7.5">
                  <div className="flex size-[140px] flex-col items-start gap-3 rounded-xl p-5" style={{ boxShadow: "0 0 0 1px var(--app-border)", background: "color-mix(in srgb, var(--app-surface-2) 50%, transparent)" }}><CreditCard size={52} strokeWidth={1.1} className="fathom-sec" aria-hidden /><span className="text-sm font-semibold" style={{ color: "var(--app-fg-strong)" }}>Cloud One</span></div>
                  <div className="flex grow flex-col gap-5 lg:gap-7.5">
                    <div className="flex flex-wrap justify-between gap-2">
                      <div className="flex flex-col gap-1"><div className="flex gap-2.5"><h2 className="text-2xl font-semibold" style={{ color: "var(--app-fg-strong)" }}>Cloud One Enterprise</h2><Chip size="sm" color="success" variant="soft" radius="md">Monthly Plan</Chip></div><p className="text-sm fathom-sec">Essential Features for Startups and Individuals</p></div>
                      <div className="flex gap-2.5"><Button variant="bordered">Cancel Plan</Button><Button color="primary">Upgrade Plan</Button></div>
                    </div>
                    <div className="flex flex-wrap gap-3 lg:gap-5"><Mini v="Trial" l="Status" /><Mini v="10,000" l="Query runs" /><Mini v="Unlimited" l="API calls" /><Mini v="$99.00" l="Price" /><Mini v="17 Aug, 26" l="Next bill date" /></div>
                    <div className="flex flex-wrap gap-6 lg:gap-12">
                      <div className="flex grow flex-col gap-3.5"><div className="text-sm fathom-sec">Query runs: <span className="text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>2239 of 10,000 used</span></div><div className="flex h-4 items-center"><Progress aria-label="Query runs" value={22} style={bar()} /></div></div>
                      <div className="-mt-3 flex flex-col gap-2.5 lg:min-w-24"><div className="text-sm font-medium fathom-sec">Seats: <span className="text-sm font-semibold" style={{ color: "var(--app-fg-strong)" }}>29 of 120 used</span></div>
                        <AvatarGroup size={28} max={4} overlap={8}>{[4, 1, 2].map((a) => <Avatar key={a} name={`s${a}`} src={avatarUrl(a)} />)}<Avatar name="+16" color="success" /></AvatarGroup></div>
                    </div>
                  </div>
                </div>
              </SurfaceBody>
            </Surface>
          </div>

          <div className="col-span-2 flex lg:col-span-1">
            <Surface className="grow">
              <SurfaceHeader title="Latest Payment" actions={<Button variant="bordered" startContent={<Download size={16} />}>Download PDF</Button>} />
              <SettingsRows labelWidth={144} rowBorder={false} rows={[{ label: "Type of Plan", value: "Cloud One Enterprise", py: 8, h: 36 }, { label: "Payment Date", value: "6 Aug, 2026", py: 8, h: 36 }, { label: "Card used to pay:", value: <span className="flex items-center gap-2.5"><CreditCard size={28} strokeWidth={1.25} className="fathom-sec" />Ending 3604</span>, py: 8, h: 36 }, { label: "Total Payment:", value: "$24.00", py: 8, h: 36 }]} />
            </Surface>
          </div>
          <div className="col-span-2 flex lg:col-span-1">
            <Surface className="grow">
              <SurfaceHeader title="Next Payment" />
              <SurfaceBody className="p-5"><div className="flex flex-col gap-5">
                <div className="flex flex-wrap justify-between gap-2 rounded-xl border px-4 py-4" style={{ borderColor: "var(--app-border)", background: "color-mix(in srgb, var(--app-surface-2) 50%, transparent)" }}>
                  <div className="flex gap-3.5"><Hex><CalendarDays size={20} /></Hex><div className="flex flex-col"><Link href="#" className="text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>on 17 Aug, 2026</Link><p className="text-sm fathom-sec">Due date</p></div></div>
                  <Button isIconOnly aria-label="Paid" variant="bordered" className="!rounded-full" style={{ background: "var(--oks-color-success-100)" }}><Check size={16} style={{ color: "var(--oks-color-success-600)" }} /></Button>
                </div>
                <div className="place-self-end lg:pb-2.5"><Button color="primary">Manage Payment</Button></div>
              </div></SurfaceBody>
            </Surface>
          </div>

          <div className="col-span-2 flex lg:col-span-1">
            <Surface className="grow">
              <SurfaceHeader title="Payment Methods" actions={<Button variant="bordered" startContent={<SquarePlus size={16} />}>Add New</Button>} />
              <SurfaceBody className="p-5 lg:pb-7.5"><div className="grid gap-5">
                {([[CreditCard, "Ending 3604  Expires on 12/2026", true], [Landmark, "iDeal with ABN Ambro", false], [Mail, "maya@fathom.example", false]] as const).map(([Icon, d, primary], i) => (
                  <div key={i} className="flex justify-between gap-2 rounded-xl border px-4 py-4" style={{ borderColor: "var(--app-border)", background: "color-mix(in srgb, var(--app-surface-2) 50%, transparent)" }}>
                    <div className="flex gap-3.5"><Icon size={40} strokeWidth={1.25} className="fathom-sec" aria-hidden /><div className="flex flex-col"><Link href="#" className="mb-px text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>Maya Okoro</Link><span className="text-sm fathom-sec">{d}</span></div></div>
                    <div className="flex items-center gap-5">{primary && <Chip size="sm" color="success" variant="soft" radius="md">Primary</Chip>}<div className="flex gap-0.5"><Button variant="ghost" isIconOnly aria-label="Edit"><SquarePen size={16} /></Button><Button variant="ghost" isIconOnly aria-label="Remove"><Trash2 size={16} /></Button></div></div>
                  </div>
                ))}
              </div></SurfaceBody>
            </Surface>
          </div>
          <div className="col-span-2 flex lg:col-span-1">
            <Surface className="grow">
              <SurfaceHeader title="Billing and Invoicing" actions={<Button variant="bordered" startContent={<Download size={16} />}>Download All</Button>} />
              <div className="fathom-table fathom-table-roomy fathom-xscroll">
                <table className="w-full"><thead><tr><th className="min-w-50">Invoice</th><th className="min-w-16 !text-end">Status</th><th className="min-w-24 !text-end">Date</th><th className="min-w-16 !text-end">Amount</th><th className="w-8" aria-label="Actions" /></tr></thead>
                  <tbody>{INV.map(([n, s, d, a]) => (<tr key={n}><td className="text-sm" style={{ color: "var(--app-fg-strong)" }}>{n}</td><td className="text-end"><Chip size="sm" color={tone(s)} variant="soft" radius="md">{s}</Chip></td><td className="text-nowrap text-end text-sm" style={{ color: "var(--app-fg-strong)" }}>{d}</td><td className="text-end text-sm" style={{ color: "var(--app-fg-strong)" }}>${a}</td><td><div className="flex"><MoreMenu /></div></td></tr>))}</tbody></table>
              </div>
              <SurfaceFooter className="items-center"><FooterLink href="#">View all Payments</FooterLink></SurfaceFooter>
            </Surface>
          </div>

          <div className="col-span-2"><div className="grid gap-5 lg:grid-cols-2 lg:gap-7.5">
            {([["Questions ?", "Browse our Help Center for step-by-step guidance on billing, payments and subscriptions.", "Go to Help Center"], ["Contact Support", "Need a hand? Reach our support team for help with your plan, invoices or account.", "Contact Support"]] as const).map(([t, d, l]) => (
              <Surface key={t}>
                <SurfaceBody className="px-10 py-7.5 lg:pr-12.5">
                  <div className="flex flex-wrap gap-6 md:flex-nowrap md:gap-10">
                    <div className="flex flex-col items-start gap-3"><h2 className="text-xl font-medium" style={{ color: "var(--app-fg-strong)" }}>{t}</h2><p className="mb-2.5 text-sm leading-5.5" style={{ color: "var(--app-fg)" }}>{d}</p></div>
                    <svg viewBox="0 0 180 150" width="180" height="150" className="block max-h-[150px] shrink-0" aria-hidden><circle cx="90" cy="75" r="56" fill="var(--oks-color-primary-500)" fillOpacity=".1" stroke="var(--oks-color-primary-500)" strokeWidth="2" /><path d="M70 75h40M90 55v40" stroke="var(--oks-color-primary-500)" strokeWidth="3" strokeLinecap="round" /></svg>
                  </div>
                </SurfaceBody>
                <SurfaceFooter className="items-center"><FooterLink href="#">{l}</FooterLink></SurfaceFooter>
              </Surface>
            ))}
          </div></div>
        </div>
      </Container>
    </>
  );
}
