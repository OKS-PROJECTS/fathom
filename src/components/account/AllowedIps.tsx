"use client";

import { Accordion, AccordionItem, Button, Chip, SwitchField, TextField, type TableColumn } from "oks-ui";
import { Funnel, Search, Settings2, Trash2, Pencil } from "lucide-react";
import { Surface, SurfaceHeader } from "@/components/ui/Surface";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { DataGridCard } from "@/components/ui/DataGridCard";
import { PageActions } from "@/components/profile/ProfileShell";
import { HelpCards } from "./HelpCards";

type Ip = { ip: string; date: string; owner: string; method: string };
const ROWS: Ip[] = [
  { ip: "172.16.0.1", date: "30 Sep, 2024", owner: "Jane Doe", method: "OAuth2" },
  { ip: "2001:db8:0:1234:0:567:8:3", date: "30 Jul, 2024", owner: "Legal Dept", method: "Token" },
  { ip: "192.168.6.1", date: "30 Dec, 2024", owner: "Development Dept", method: "Biometric" },
  { ip: "10.0.0.2", date: "28 Jul, 2024", owner: "Finance Dept", method: "API Key" },
  { ip: "192.168.3.1", date: "27 Oct, 2024", owner: "Alice Johnson", method: "Biometric" },
  { ip: "10.6.6.1", date: "27 Jan, 2025", owner: "Legal Dept", method: "Basic auth" },
  { ip: "10.3.3.1", date: "25 Nov, 2024", owner: "Security Dept", method: "Basic auth" },
  { ip: "172.20.0.1", date: "23 Dec, 2024", owner: "Mary Smith", method: "OAuth2" },
  { ip: "10.0.0.1", date: "22 Sep, 2024", owner: "Marketing Dept", method: "Basic auth" },
  { ip: "2001:db8:0:1234:0:567:8:5", date: "22 Jul 2024", owner: "Gus Hartwell", method: "Web" },
];
const columns: TableColumn<Ip>[] = [
  { key: "ip", header: "IP Address", sortable: true, sortValue: (r) => r.ip, render: (r) => <span style={{ color: "var(--app-fg-strong)", fontWeight: 500 }}>{r.ip}</span> },
  { key: "date", header: "Date Added", sortable: true, sortValue: (r) => r.date, render: (r) => r.date },
  { key: "owner", header: "Added By", sortable: true, sortValue: (r) => r.owner, render: (r) => r.owner },
  { key: "method", header: "Auth Method", sortable: true, sortValue: (r) => r.method, render: (r) => <Chip size="sm" variant="soft" color="secondary" radius="md">{r.method}</Chip> },
  { key: "edit", header: "", ariaLabel: "Edit", render: () => <Button variant="ghost" isIconOnly aria-label="Edit"><Pencil size={16} /></Button> },
  { key: "del", header: "", ariaLabel: "Delete", render: () => <Button variant="ghost" isIconOnly aria-label="Delete"><Trash2 size={16} /></Button> },
];
const FAQ = ["How is the price of each plan worked out?", "Which payment methods do you take for subscriptions?", "Does the pricing include any hidden charges?", "Do yearly subscriptions come with a discount?", "Can I get a refund if I cancel a subscription?", "Is it possible to add features to my current plan?"];

export function AllowedIpsPage() {
  return (
    <>
      <PageHeader title="Allowed IP Addresses" crumbs={["My Account", "Security", "Allowed IP Addresses"]} actions={<PageActions />} />
      <Container>
        <div className="grid gap-5 lg:gap-7.5">
          <DataGridCard headerClass="py-4" columns={columns} rows={ROWS} getRowKey={(r) => r.ip} pageSizes={[10, 20]}
            title={<div className="flex gap-2.5"><TextField aria-label="Search IP addresses" placeholder="Search IP Addresses..." startIcon={<Search size={16} />} className="w-40" /><Button variant="bordered" startContent={<Funnel size={16} />}>Status</Button></div>}
            toolbar={<div className="flex items-center gap-2.5"><div className="flex items-center gap-2"><label htmlFor="ip-allow" className="text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>IP Allowlist Enabled</label><SwitchField id="ip-allow" aria-label="IP Allowlist Enabled" size="sm" defaultChecked /></div><Button variant="solid" color="primary">Add IP Address</Button><Button variant="bordered" startContent={<Settings2 size={16} />}>Columns</Button></div>} />
          <Surface>
            <SurfaceHeader title="FAQ" />
            <div className="fathom-faq px-5 py-3"><Accordion variant="light" selectionMode="single">
              {FAQ.map((q) => <AccordionItem key={q} itemKey={q} title={q}><p className="pb-4 text-sm fathom-sec">Pricing depends on the plan you choose, the number of seats and the billing period. You can compare every tier on the plans page.</p></AccordionItem>)}
            </Accordion></div>
          </Surface>
          <HelpCards />
        </div>
      </Container>
    </>
  );
}
