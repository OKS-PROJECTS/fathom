"use client";

import { Button, Chip, SwitchField, TextField, type TableColumn } from "oks-ui";
import { Funnel, NotepadText, Search, Settings2, ShieldAlert, ShieldCheck, ShieldQuestion } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { DataGridCard } from "@/components/ui/DataGridCard";
import { PageActions } from "@/components/profile/ProfileShell";
import { HelpCards } from "./HelpCards";

type L = { id: number; at: string; type: string; action: string; src: string; dst: string; sev: "Low" | "Medium" | "High" | "Critical" };
const ROWS: L[] = [
  ["2024-01-04T23:59:59Z", "Unauthorized Access", "Login Attempt Blocked", "192.168.10.15", "10.1.1.50", "High"],
  ["2024-01-04T22:30:00Z", "Key Rotation", "Key Successfully Rotated", "10.0.0.1", "192.168.1.1", "Medium"],
  ["2024-01-04T21:15:25Z", "Suspicious Login", "User Account Locked", "172.16.254.3", "10.2.2.2", "High"],
  ["2024-01-04T20:05:10Z", "Firewall Update", "New Rule Implemented", "192.168.1.100", "172.16.0.1", "Low"],
  ["2024-01-04T18:45:05Z", "Traffic Anomaly", "Traffic Analysis Initiated", "10.0.1.200", "10.1.2.50", "Critical"],
  ["2024-01-04T17:30:00Z", "Transfer Completed", "Login Attempt Blocked", "192.168.2.150", "192.168.2.1", "Medium"],
  ["2024-01-04T16:10:42Z", "Policy Change", "Password Rules Tightened", "10.4.0.7", "10.4.0.1", "Low"],
  ["2024-01-04T14:55:18Z", "Malware Detected", "File Quarantined", "172.18.3.22", "10.9.9.9", "Critical"],
  ["2024-01-04T12:20:33Z", "Token Expired", "Session Revoked", "192.168.7.31", "10.1.1.50", "Medium"],
  ["2024-01-04T09:02:09Z", "Audit Export", "Report Generated", "10.0.2.12", "192.168.1.1", "Low"],
].map(([at, type, action, src, dst, sev], id) => ({ id, at, type, action, src, dst, sev } as L));

const COLOR = { Low: "success", Medium: "info", High: "warning", Critical: "danger" } as const;
const ICON = { Low: ShieldCheck, Medium: ShieldQuestion, High: ShieldAlert, Critical: ShieldAlert } as const;
const TONE = { Low: "var(--oks-color-success-500)", Medium: "var(--oks-color-info-500)", High: "var(--oks-color-danger-500)", Critical: "var(--oks-color-danger-500)" } as const;

const columns: TableColumn<L>[] = [
  { key: "at", header: "Timestamp", sortable: true, sortValue: (r) => r.at, render: (r) => <span className="text-nowrap fathom-sec">{r.at}</span> },
  { key: "type", header: "Event Type", sortable: true, sortValue: (r) => r.type, render: (r) => { const I = ICON[r.sev]; return <div className="flex items-center gap-1.5 text-nowrap"><I size={16} style={{ color: TONE[r.sev] }} /><span className="font-semibold leading-none fathom-sec">{r.type}</span></div>; } },
  { key: "action", header: "Action Taken", sortable: true, sortValue: (r) => r.action, render: (r) => <span className="text-nowrap fathom-sec">{r.action}</span> },
  { key: "src", header: "Source IP", sortable: true, sortValue: (r) => r.src, render: (r) => <span className="fathom-sec">{r.src}</span> },
  { key: "dst", header: "Destination IP", sortable: true, sortValue: (r) => r.dst, render: (r) => <span className="fathom-sec">{r.dst}</span> },
  { key: "sev", header: "Severity", sortable: true, sortValue: (r) => r.sev, render: (r) => <Chip size="sm" variant="soft" color={COLOR[r.sev]} radius="md">{r.sev}</Chip> },
  { key: "notes", header: "", ariaLabel: "Details", render: () => <Button variant="ghost" isIconOnly aria-label="Details"><NotepadText size={16} /></Button> },
];

export function SecurityLogPage() {
  return (
    <>
      <PageHeader title="Security Log" crumbs={["My Account", "Security", "Security Log"]} actions={<PageActions />} />
      <Container>
        <div className="grid gap-5 lg:gap-7.5">
          <DataGridCard headerClass="" columns={columns} rows={ROWS} getRowKey={(r) => r.id} pageSizes={[10, 20]}
            title={<div className="flex gap-2.5"><TextField aria-label="Search logs" placeholder="Search Logs..." startIcon={<Search size={16} />} className="w-40" /><Button variant="bordered" startContent={<Funnel size={16} />}>Severity</Button></div>}
            toolbar={<div className="flex items-center gap-2.5"><div className="flex items-center gap-2"><label htmlFor="push-alerts" className="text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>Push Alerts</label><SwitchField id="push-alerts" aria-label="Push Alerts" size="sm" /></div><Button variant="bordered" startContent={<Settings2 size={16} />}>Columns</Button></div>} />
          <HelpCards />
        </div>
      </Container>
    </>
  );
}
