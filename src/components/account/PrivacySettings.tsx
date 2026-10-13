"use client";

import { useState } from "react";
import { Accordion, AccordionItem, Button, Radio } from "oks-ui";
import { BadgePercent, Mail, MapPin, Search, Settings, ToggleRight } from "lucide-react";
import { Surface, SurfaceHeader } from "@/components/ui/Surface";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { PageActions } from "@/components/profile/ProfileShell";
import { BlockList } from "@/components/dashboard/BlockList";
import { Beta, Pro, Row, Tg } from "./SecurityOverview";
import { GuidesCard } from "./GuidesCard";

const FAQ = ["How is the price of each plan worked out?", "Which payment methods do you take for subscriptions?", "Does the pricing include any hidden charges?", "Do yearly subscriptions come with a discount?", "Can I get a refund if I cancel a subscription?", "Is it possible to add features to my current plan?"];
const GUIDES = [
  [ToggleRight, "Strengthening Privacy: Controls and Guidelines", "Strengthen your privacy setup with adjustable settings. Learn and apply solid controls with our complete guides."],
  [Settings, "Finding Your Way Around Privacy Preferences", "Stay in charge of your privacy settings with secure configuration tools, including detailed resources and expert insights."],
] as const;

const SHARE = [["invited", "Only invited People", "Invite selected people via email."], ["link", "People with the link", "Create a public link for your report."], ["all", "Everyone", "Reports will be visible only for everyone."]];

function ShareCard() {
  const [v, setV] = useState("invited");
  return (
    <Surface>
      <SurfaceHeader title="Report Sharing Settings" />
      <div role="radiogroup" aria-label="Report sharing">
        {SHARE.map(([k, t, d]) => (
          <div key={k} className="p-5" style={{ borderBottom: "1px solid var(--app-border)" }}>
            <div className="flex w-full items-start justify-between gap-2"><span className="flex flex-col gap-1.5"><span className="text-sm font-medium leading-none" style={{ color: "var(--app-fg-strong)" }}>{t}</span><span className="text-sm fathom-sec">{d}</span></span><div className="shrink-0 [&_.oksRadio]:w-auto"><Radio name="report-share" aria-label={t} checked={v === k} onChange={() => setV(k)} /></div></div>
          </div>
        ))}
      </div>
    </Surface>
  );
}
function DataCard() {
  return (
    <Surface>
      <SurfaceHeader title="Manage your Data" />
      {[["Only invited People", "Invite selected people via email.", "Start"], ["People with the link", "Create a public link for your report.", "Delete"]].map(([t, d, b]) => (
        <div key={t} className="flex justify-between gap-2.5 p-5 py-4" style={{ borderBottom: "1px solid var(--app-border)" }}>
          <div className="flex flex-col gap-1.5"><span className="text-sm font-medium leading-none" style={{ color: "var(--app-fg-strong)" }}>{t}</span><span className="text-sm fathom-sec">{d}</span></div>
          <Button variant="bordered">{b}</Button>
        </div>
      ))}
      <div className="flex justify-between gap-2.5 p-5 py-4" style={{ borderBottom: "1px solid var(--app-border)" }}>
        <div className="flex flex-col gap-1.5"><span className="text-sm font-medium leading-none" style={{ color: "var(--app-fg-strong)" }}>No one</span><span className="text-sm fathom-sec">Reports will be visible only for you.</span></div>
        <Tg id="priv-noone" />
      </div>
    </Surface>
  );
}

export function PrivacySettingsPage() {
  return (
    <>
      <PageHeader title="Privacy Settings" crumbs={["My Account", "Security", "Privacy Settings"]} actions={<PageActions />} />
      <Container>
        <div className="grid grid-cols-1 gap-5 lg:gap-7.5 xl:grid-cols-3">
          <div className="col-span-2"><div className="flex flex-col gap-5 lg:gap-7.5">
            <Surface>
              <Row icon={<Search size={20} />} title="Show up in search results" badge={<Pro />} desc="Decide whether you show up when people search for members."><Tg id="pv-1" /></Row>
              <Row icon={<Mail size={20} />} title="Manage Read Receipts for Messages" badge={<Pro />} desc="Turn read receipts for private messages on or off."><Tg id="pv-2" /></Row>
              <Row icon={<MapPin size={20} />} title="Enable Location-Based Services" desc="Let the app use your location to tailor what it shows you."><Tg id="pv-3" /></Row>
              <Row icon={<BadgePercent size={20} />} title="Ad Personalization Settings" badge={<Beta />} desc="Choose how ads are matched to your interests."><Button variant="bordered">Setup</Button></Row>
              <Row icon={<Search size={20} />} title="Share usage analytics" desc="Help improve the product by sharing anonymous usage data."><Tg id="pv-5" /></Row>
              <Row icon={<Mail size={20} />} title="Email me about privacy changes" desc="Get notified when policies or data practices are updated."><Tg id="pv-6" /></Row>
              <Row icon={<MapPin size={20} />} title="Download a copy of your data" desc="Request an export of everything stored on your account." last extra={1}><Button variant="bordered">Request</Button></Row>
            </Surface>
            <div className="grid gap-5 lg:grid-cols-2 lg:gap-7.5"><ShareCard /><DataCard /></div>
            <Surface>
              <SurfaceHeader title="FAQ" />
              <div className="fathom-faq px-5 py-3"><Accordion variant="light" selectionMode="single">
                {FAQ.map((q) => <AccordionItem key={q} itemKey={q} title={q}><p className="pb-4 text-sm fathom-sec">Pricing depends on the plan you choose, the number of seats and the billing period. You can compare every tier on the plans page.</p></AccordionItem>)}
              </Accordion></div>
            </Surface>
          </div></div>
          <div className="col-span-1"><div className="flex flex-col gap-5 lg:gap-7.5">
            <BlockList />
            <GuidesCard guides={GUIDES} extra={39} />
          </div></div>
        </div>
      </Container>
    </>
  );
}
