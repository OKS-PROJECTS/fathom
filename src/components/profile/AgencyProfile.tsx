"use client";

import Link from "next/link";
import { Avatar, Button, Chip, TextField, Table, type TableColumn } from "oks-ui";
import { Barcode, Copy, KeyRound, Scroll, ShoppingBag, Tag, TicketPercent } from "lucide-react";
import { ActivitiesCard, CardWithFooter, FooterLink, InlineLink, KeyValueTable, MoreMenu, SkillChips, recentActivity } from "./parts";
import { ProfileFrame, type ProfileIdentity } from "./ProfileShell";
import { avatarUrl } from "@/lib/avatar";

const WHO: ProfileIdentity = { name: "Hana Ishikawa", org: "Ishikawa Trading", place: "Osaka, Japan", email: "hana@ishikawa.example", seed: "ishikawa", orgIcon: "luggage" };

type Deal = { n: string; amount: string; status: string; tone: "primary" | "success" | "danger" | "warning"; days: number };
const DEALS: Deal[] = [
  { n: "Harbor Software License", amount: "5,000", status: "Ongoing", tone: "primary", days: 30 },
  { n: "Strategic Partnership Deal", amount: "12,500", status: "Closed", tone: "success", days: 45 },
  { n: "Client Onboarding", amount: "18,000", status: "On Hold", tone: "danger", days: 60 },
  { n: "Widget Supply Agreement", amount: "7,200", status: "Ongoing", tone: "primary", days: 90 },
  { n: "Project X Redesign", amount: "9,800", status: "Closed", tone: "success", days: 20 },
];
const dealColumns: TableColumn<Deal>[] = [
  { key: "n", header: "Deal Name", render: (r) => <Link href="/public-profile/profiles/agency" className="text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>{r.n}</Link> },
  { key: "a", header: "Amount", render: (r) => `$${r.amount}` },
  { key: "s", header: "Status", render: (r) => <Chip size="sm" color={r.tone} variant="soft" radius="md">{r.status}</Chip> },
  { key: "d", header: "Duration", render: (r) => `${r.days} days` },
  { key: "m", header: "", ariaLabel: "Actions", width: 30, render: () => <MoreMenu /> },
];

const INVOICES = [[Scroll, "INV-2026-001", "15 Nov, 2026", "500.00"], [Tag, "INV-2026-002", "30 Nov, 2026", "750.00"], [TicketPercent, "INV-2026-003", "10 Dec, 2026", "1,200.00"], [Barcode, "INV-2026-004", "05 Dec, 2026", "300.00"], [ShoppingBag, "INV-2026-005", "20 Dec, 2026", "950.00"]] as const;

export function AgencyProfile() {
  return (
    <ProfileFrame title="Agency" crumbs={["Public Profile", "Profiles", "Agency"]} who={WHO}>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-7.5">
        <div className="col-span-1">
          <div className="grid gap-5 lg:gap-7.5">
            <CardWithFooter title="General Info" bodyClass="p-5 py-3.5">
              <KeyValueTable rows={[["Phone:", "+81 6 1234 5678"], ["Email:", "hana@ishikawa.example"], ["Status:", <Chip key="s" size="sm" color="success" variant="soft" radius="md">Subscribed</Chip>], ["Type:", "Wholesale"], ["Encryption:", "Strong"], ["Last Order:", "Today at 13:06"], ["Signed Up:", "2 months ago"]]} />
            </CardWithFooter>
            <CardWithFooter title="Attributes" bodyClass="p-5 pt-3.5 pb-1" footer={<FooterLink href="/network/user-table/store-clients">All Attributes</FooterLink>}>
              <KeyValueTable gap="lg:pe-6" rows={[["customer_id:", "CUST567"], ["c_name:", "hana"], ["license_id:", "LIC123"], ["log_id:", "CUST567"], ["resv_code:", "CS345"], ["orders_io:", "HANATIME"]]} />
            </CardWithFooter>
            <CardWithFooter title="API Credentials" footer={<FooterLink href="/account/api-keys">Check APIs</FooterLink>}>
              <div className="pb-5 text-sm leading-5.5" style={{ color: "var(--app-fg)" }}>
                The granted credentials serve a twofold function, enabling <InlineLink href="/public-profile/profiles/agency">API authentication</InlineLink> and governing JavaScript customization.
              </div>
              <div className="flex flex-col flex-wrap gap-4">
                <TextField aria-label="API key" defaultValue="fk_live_8Jd2kQ4mAZ7cE" endIcon={<Copy size={16} aria-hidden />} />
                <div><Button color="primary" startContent={<KeyRound size={16} />}>Access Tokens</Button></div>
              </div>
            </CardWithFooter>
            <CardWithFooter title="Skills"><SkillChips skills={["Web Design", "Code Review", "Figma", "Product Development", "Webflow", "AI", "noCode", "Management"]} /></CardWithFooter>
          </div>
        </div>

        <div className="col-span-2">
          <div className="flex flex-col gap-5 lg:gap-7.5">
            <CardWithFooter title="Deals" toolbar={<MoreMenu />} bodyClass="p-0" footer={<FooterLink href="/network/user-table/store-clients">All Deals</FooterLink>}>
              <div className="fathom-table fathom-table-roomy fathom-xscroll">
                <Table aria-label="Deals" columns={dealColumns} rows={DEALS} getRowKey={(r) => r.n} removeWrapper />
              </div>
            </CardWithFooter>

            <ActivitiesCard title="Recent Activity" items={recentActivity(false)} />

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-7.5">
              <CardWithFooter title="Contributors" toolbar={<MoreMenu />} footer={<FooterLink href="/public-profile/network">All Contributors</FooterLink>}>
                <div className="flex flex-col gap-2 lg:gap-5">
                  {([["Tyler Okafor", 6], ["Esther Linde", 29], ["Cody Marlowe", 34], ["Arlene Brandt", 1]] as const).map(([n, c], i) => (
                    <div key={n} className="flex gap-2">
                      <div className="flex grow gap-2.5">
                        <Avatar name={n} src={avatarUrl(40 + i)} size={36} />
                        <div className="flex flex-col">
                          <Link href="/public-profile/profiles/agency" className="mb-px text-sm font-semibold" style={{ color: "var(--app-fg-strong)" }}>{n}</Link>
                          <span className="text-xs font-semibold fathom-sec">{c} contributors</span>
                        </div>
                      </div>
                      <MoreMenu />
                    </div>
                  ))}
                </div>
              </CardWithFooter>
              <CardWithFooter title="Recent Invoices" toolbar={<MoreMenu />}>
                <div className="grid gap-5">
                  {INVOICES.map(([Icon, id, d, amt]) => (
                    <div key={id} className="flex justify-between gap-3">
                      <div className="flex gap-2.5">
                        <div className="flex size-7.5 items-center justify-center rounded-lg border" style={{ background: "color-mix(in srgb, var(--app-surface-2) 60%, transparent)", borderColor: "var(--app-border-input)" }}><Icon size={16} className="fathom-sec" aria-hidden /></div>
                        <div className="flex flex-col gap-0.5">
                          <span className="mb-px text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>{id}</span>
                          <span className="text-xs fathom-sec">{d}</span>
                        </div>
                      </div>
                      <div className="flex gap-2.5"><span className="text-sm" style={{ color: "var(--app-fg)" }}>${amt}</span><MoreMenu /></div>
                    </div>
                  ))}
                </div>
              </CardWithFooter>
            </div>
          </div>
        </div>
      </div>
    </ProfileFrame>
  );
}
