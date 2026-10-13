"use client";

import { Button, Chip, type TableColumn } from "oks-ui";
import { Download, Settings2 } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { DataGridCard } from "@/components/ui/DataGridCard";
import { PageActions } from "@/components/profile/ProfileShell";
import { TextAction } from "./parts";

type Inv = { id: string; status: string; date: string; due: string; amount: number };
const ROWS: Inv[] = [
  { id: "Invoice-2026-jk563z", status: "Paid", date: "2026-04-30", due: "2026-08-06", amount: 24 },
  { id: "Invoice-2026-r204u", status: "Paid", date: "2026-03-25", due: "2026-03-25", amount: 35 },
  { id: "Invoice-2026-l892v", status: "Paid", date: "2026-01-25", due: "2026-01-25", amount: 100 },
  { id: "Invoice-2026-hg234x", status: "Declined", date: "2026-04-21", due: "2026-08-06", amount: 6.59 },
  { id: "Invoice-2026-d981q", status: "Paid", date: "2026-02-20", due: "2026-02-20", amount: 200 },
  { id: "Invoice-2026-b771n", status: "Paid", date: "2025-12-12", due: "2025-12-12", amount: 48 },
  { id: "Invoice-2026-c330p", status: "Upcoming", date: "2026-08-06", due: "2026-09-06", amount: 24 },
  { id: "Invoice-2026-e118w", status: "Paid", date: "2025-11-04", due: "2025-11-04", amount: 18.5 },
];
const fmt = (d: string) => new Date(d).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
const columns: TableColumn<Inv>[] = [
  { key: "id", header: "Member", sortable: true, sortValue: (r) => r.id, render: (r) => r.id },
  { key: "status", header: "Status", sortable: true, sortValue: (r) => r.status, render: (r) => <Chip size="sm" color={r.status === "Paid" ? "success" : r.status === "Declined" ? "danger" : "warning"} variant="soft" radius="md">{r.status}</Chip> },
  { key: "date", header: "Date", sortable: true, sortValue: (r) => r.date, render: (r) => fmt(r.date) },
  { key: "due", header: "Due Date", sortable: true, sortValue: (r) => r.due, render: (r) => fmt(r.due) },
  { key: "amount", header: "Amount", sortable: true, sortValue: (r) => r.amount, render: (r) => `$${r.amount.toFixed(2)}` },
  { key: "dl", header: "", ariaLabel: "Download", render: () => <TextAction href="#">Download</TextAction> },
];

export function BillingHistoryPage() {
  return (
    <>
      <PageHeader title="Billing History" crumbs={["My Account", "Billing", "Billing History"]} actions={<PageActions />} />
      <Container>
        <DataGridCard headerClass="" title="Billing and Invoicing" columns={columns} rows={ROWS} getRowKey={(r) => r.id} pageSizes={[5, 10]}
          defaultSort={{ column: "date", direction: "descending" }}
          toolbar={<div className="flex gap-2.5"><Button variant="bordered" startContent={<Download size={16} />}>Download PDF</Button><Button variant="bordered" startContent={<Settings2 size={16} />}>Columns</Button></div>} />
      </Container>
    </>
  );
}
