"use client";

import Link from "next/link";
import { Button, Chip, Progress } from "oks-ui";
import { CloudDownload, CreditCard, Download, SquarePen, SquarePlus, Trash2, Landmark, Mail } from "lucide-react";
import { Surface, SurfaceBody, SurfaceFooter, SurfaceHeader } from "@/components/ui/Surface";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { PageActions } from "@/components/profile/ProfileShell";
import { GuidesCard } from "./GuidesCard";
import { FooterLink } from "@/components/profile/parts";
import { SettingsRows } from "./parts";

export const StatBox = ({ v, l, big = false }: { v: string; l: string; big?: boolean }) => (
  <div className="grid min-w-24 grid-cols-1 content-between gap-1.5 rounded-md border border-dashed px-3.5 py-2" style={{ borderColor: "var(--app-border-input)" }}>
    <span className={`font-medium leading-none ${big ? "text-base" : "text-sm"}`} style={{ color: "var(--app-fg-strong)" }}>{v}</span>
    <span className="text-sm fathom-sec">{l}</span>
  </div>
);

export const TextBtn = ({ children }: { children: React.ReactNode }) => <Button variant="ghost">{children}</Button>;

const INVOICES = [
  ["Invoice-2026-xd912c", "Upcoming", "6 Aug, 2026", "24.00"], ["Invoice-2026-rq857m", "Paid", "17 Jun, 2026", "29.99"],
  ["Invoice-2026-jk563z", "Paid", "30 Apr, 2026", "24.00"], ["Invoice-2026-hg234x", "Declined", "21 Apr, 2026", "6.59"], ["Invoice-2026-lp098y", "Paid", "14 Mar, 2026", "24.00"],
] as const;
const tone = (s: string) => (s === "Paid" ? "success" : s === "Declined" ? "danger" : "warning");

export function BillingBasicPage() {
  return (
    <>
      <PageHeader title="Billing - Basic" crumbs={["My Account", "Billing", "Billing - Basic"]} actions={<PageActions />} />
      <Container>
        <div className="grid grid-cols-1 gap-5 lg:gap-7.5 xl:grid-cols-3">
          <div className="col-span-2"><div className="flex flex-col gap-5 lg:gap-7.5">
            <Surface>
              <SurfaceBody className="p-5 lg:py-7.5">
                <div className="flex flex-col items-stretch gap-5 lg:gap-7.5">
                  <div className="flex flex-wrap justify-between gap-5">
                    <div className="flex flex-col gap-1">
                      <div className="flex gap-2.5"><h2 className="text-2xl font-semibold" style={{ color: "var(--app-fg-strong)" }}>Basic Plan</h2><Chip size="sm" color="success" variant="soft" radius="md">Monthly</Chip></div>
                      <p className="text-sm fathom-sec">Essential Features for Startups and Individuals</p>
                    </div>
                    <div className="flex gap-2.5"><Button variant="bordered">Cancel Plan</Button><Button color="primary">Upgrade Plan</Button></div>
                  </div>
                  <div className="flex flex-wrap gap-2 lg:gap-5"><StatBox big v="$769.00" l="Annual Total" /><StatBox big v="$69.00" l="Next Bill Amount" /><StatBox big v="23 Aug, 26" l="Next Billing Date" /></div>
                  <div className="flex flex-col gap-3.5"><span className="text-sm fathom-sec">Usage (32 of 40 users)</span>
                    <div className="flex h-4 items-center"><Progress aria-label="Seat usage" value={80} style={{ ["--oks-progress-height" as string]: "6px", ["--oks-progress-indicator" as string]: "var(--oks-palette-blue-500)", ["--oks-progress-track" as string]: "var(--app-bg)" }} /></div></div>
                </div>
              </SurfaceBody>
            </Surface>

            <Surface className="grow">
              <SurfaceHeader title="Payment Methods" actions={<Button variant="bordered" startContent={<SquarePlus size={16} />}>Add New</Button>} />
              <SurfaceBody className="p-5 lg:pb-7.5">
                <div className="grid gap-5">
                  {([[CreditCard, "Ending 3604  Expires on 12/2026", true], [Landmark, "iDeal with ABN Ambro", false], [Mail, "maya@fathom.example", false]] as const).map(([Icon, d, primary], i) => (
                    <div key={i} className="flex justify-between gap-2 rounded-xl border px-4 py-4" style={{ borderColor: "var(--app-border)", background: "color-mix(in srgb, var(--app-surface-2) 50%, transparent)" }}>
                      <div className="flex gap-3.5"><Icon size={40} strokeWidth={1.25} className="fathom-sec" aria-hidden /><div className="flex flex-col"><Link href="#" className="mb-px text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>Maya Okoro</Link><span className="text-sm fathom-sec">{d}</span></div></div>
                      <div className="flex items-center gap-5">{primary && <Chip size="sm" color="success" variant="soft" radius="md">Primary</Chip>}<div className="flex gap-0.5"><Button variant="ghost" isIconOnly aria-label="Edit"><SquarePen size={16} /></Button><Button variant="ghost" isIconOnly aria-label="Remove"><Trash2 size={16} /></Button></div></div>
                    </div>
                  ))}
                </div>
              </SurfaceBody>
            </Surface>

            <Surface>
              <SurfaceHeader title="Billing Details" actions={<Button variant="bordered" startContent={<SquarePen size={16} />}>Edit Billing</Button>} />
              <SurfaceBody className="p-5 pb-2 pt-4">
                <SettingsRows labelWidth={144} rowBorder={false} rows={[
                  { label: "Company Name", value: "Hexlab", py: 8 }, { label: "Address", value: "Keizersgracht 136, 1015 CW Amsterdam, Netherlands", py: 8 },
                  { label: "Contact", value: "Maya Okoro", py: 8 }, { label: "VAT ID", value: "NL123456789B01", py: 8 },
                ].map((r) => ({ ...r, h: 36 }))} />
              </SurfaceBody>
            </Surface>

            <Surface>
              <SurfaceHeader title="Billing and Invoicing" actions={<Button variant="bordered" startContent={<CloudDownload size={16} />}>Download All</Button>} />
              <div className="fathom-table fathom-table-roomy fathom-xscroll">
                <table className="w-full"><thead><tr><th className="min-w-52">Invoice</th><th className="min-w-24 !text-end">Status</th><th className="min-w-32 !text-end">Date</th><th className="min-w-20 !text-end">Amount</th><th className="w-8" aria-label="Download" /></tr></thead>
                  <tbody>{INVOICES.map(([n, s, d, a]) => (
                    <tr key={n}><td className="text-sm" style={{ color: "var(--app-fg-strong)" }}>{n}</td><td className="text-end"><Chip size="sm" color={tone(s)} variant="soft" radius="md">{s}</Chip></td><td className="text-end text-sm" style={{ color: "var(--app-fg-strong)" }}>{d}</td><td className="text-end text-sm fathom-sec">${a}</td>
                      <td><Button variant="ghost" isIconOnly aria-label={`Download ${n}`}><Download size={16} style={{ color: "var(--oks-color-primary-500)" }} /></Button></td></tr>
                  ))}</tbody></table>
              </div>
              <SurfaceFooter className="items-center"><FooterLink href="/account/billing/history">View all invoices</FooterLink></SurfaceFooter>
            </Surface>
          </div></div>
          <div className="col-span-1"><div className="flex flex-col gap-5 lg:gap-7.5"><GuidesCard /></div></div>
        </div>
      </Container>
    </>
  );
}
