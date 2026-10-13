"use client";

import { useState, type ReactNode } from "react";
import { Button, SwitchField } from "oks-ui";
import { Bell, CalendarClock, ClipboardCheck, DollarSign, FileText, LifeBuoy, MessageCircle, Mail, Monitor, Phone, MessagesSquare, Tablet, Users, BellRing, Radio, Megaphone } from "lucide-react";
import { Surface, SurfaceFooter, SurfaceHeader } from "@/components/ui/Surface";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { PageActions } from "@/components/profile/ProfileShell";
import { FooterLink } from "@/components/profile/parts";
import { FaqCard } from "./Faq";
import { Help } from "./HelpCards";
import { GuidesCard } from "./GuidesCard";
import { Row, Tg } from "./SecurityOverview";
import { EditButton } from "./parts";

type R = { icon: ReactNode; title: string; desc: string; edit?: boolean; button?: string; on?: boolean };
const CHANNELS: R[] = [
  { icon: <Mail size={20} />, title: "Email", desc: "maya.okoro@fathom.example", edit: true, on: true },
  { icon: <Phone size={20} />, title: "Mobile", desc: "(225) 555-0118", edit: true, on: false },
  { icon: <MessagesSquare size={20} />, title: "Slack", desc: "Get instant alerts for messages and updates in your chat app.", button: "Connect Slack" },
  { icon: <Monitor size={20} />, title: "Desktop", desc: "Enable notifications for real-time desktop alerts.", on: true },
];
const OTHERS: R[] = [
  { icon: <Tablet size={20} />, title: "Task Alert", desc: "Notification when a task is assigned to you.", on: true },
  { icon: <DollarSign size={20} />, title: "Budget Warning", desc: "Get notified if nearing budget limit.", on: false },
  { icon: <FileText size={20} />, title: "Invoice Alert", desc: "Alert for new and unpaid invoices.", button: "View Invoices" },
  { icon: <MessageCircle size={20} />, title: "Feedback Alert", desc: "When a client submits new feedback.", on: true },
  { icon: <Users size={20} />, title: "Collaboration Request", desc: "Invite to collaborate on a new document.", on: false },
  { icon: <CalendarClock size={20} />, title: "Meeting Reminder", desc: "Reminder of scheduled meetings for the day.", button: "Show Meetings" },
  { icon: <ClipboardCheck size={20} />, title: "Status Change", desc: "Notifies changes in project or task status.", on: true },
];
const GUIDES = [
  [BellRing, "Alert Setup Made Simple: Custom Notification Preferences", "Fine-tune your alert preferences with a simple setup so you only hear about what matters most to you."],
  [Radio, "Clear Communication: Instant Notification Tools", "Keep communication timely with instant notifications, and shape your alerts so you stay ahead while collaborating in real time."],
  [Megaphone, "Tailored Updates: A Smarter Alert System", "Choose how updates reach you with smart alerts, and personalise notifications to keep your workflow efficient."],
] as const;

function Group({ title, rows, prefix }: { title: string; rows: R[]; prefix: string }) {
  const [all, setAll] = useState(true);
  return (
    <Surface>
      <SurfaceHeader className="gap-2" title={title} actions={<div className="flex items-center gap-2"><label htmlFor={`${prefix}-all`} className="text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>Team-Wide Alerts</label><SwitchField id={`${prefix}-all`} aria-label="Team-Wide Alerts" size="sm" checked={all} onChange={setAll} /></div>} />
      {rows.map((r, i) => (
        <Row key={r.title} icon={r.icon} title={r.title} desc={r.desc} wrap={false}>
          <div className="flex gap-5">
            {r.edit && <EditButton />}
            {r.button ? <Button variant="bordered">{r.button}</Button> : <div className="flex gap-2.5"><Tg id={`${prefix}-${i}`} on={r.on} /></div>}
          </div>
        </Row>
      ))}
    </Surface>
  );
}

export function NotificationsPage() {
  return (
    <>
      <PageHeader title="Notifications" crumbs={["My Account", "Notifications"]} actions={<PageActions />} />
      <Container>
        <div className="grid grid-cols-1 gap-5 lg:gap-7.5 xl:grid-cols-3">
          <div className="col-span-2"><div className="flex flex-col gap-5 lg:gap-7.5">
            <Group title="Notification Channels" rows={CHANNELS} prefix="nc" />
            <Group title="Other Notifications" rows={OTHERS} prefix="no" />
            <FaqCard />
            <Help title="Contact Support" text="Need a hand? Reach our support team for quick, personal help with any questions or concerns." link="Contact Support" icon={<LifeBuoy size={48} strokeWidth={1.5} />} />
          </div></div>
          <div className="col-span-1"><div className="flex flex-col gap-5 lg:gap-7.5">
            <Surface>
              <SurfaceHeader title="Quiet Mode" />
              <div className="flex flex-col gap-2.5 p-5">
                <p className="text-sm fathom-sec">Turn on &apos;Quiet Mode&apos; to mute every notification and stay focused, for set hours or while you work on a task.</p>
                <div><FooterLink href="#">Learn more</FooterLink></div>
              </div>
              <SurfaceFooter className="items-center"><Button variant="bordered" startContent={<Bell size={16} />}>Pause Notifications</Button></SurfaceFooter>
            </Surface>
            <GuidesCard guides={GUIDES} extra={23} />
          </div></div>
        </div>
      </Container>
    </>
  );
}
