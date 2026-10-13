"use client";

import { useState } from "react";
import { Accordion, AccordionItem, Button, Chip, SwitchField } from "oks-ui";
import { Check } from "lucide-react";
import { Surface, SurfaceBody, SurfaceFooter, SurfaceHeader } from "@/components/ui/Surface";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { PageActions } from "@/components/profile/ProfileShell";
import { FooterLink } from "@/components/profile/parts";

const PLANS = [
  { n: "Basic", d: "Essential features for startups and individuals", m: 0, cur: true },
  { n: "Pro", d: "Advanced tools for growing businesses", m: 99 },
  { n: "Premium", d: "Comprehensive suite for large-scale operations", m: 199 },
  { n: "Enterprise", d: "Tailored solutions for enterprise needs", m: 1299 },
];
const ROWS: [string, (string | boolean)[]][] = [
  ["User Accounts", ["Up to 5", "Up to 20", "Up to 50", "Unlimited"]], ["Data Storage", ["10 GB", "50 GB", "200 GB", "Custom"]],
  ["API Calls", ["1,000/month", "10,000/month", "50,000/month", "Unlimited"]], ["Support", ["Email", "Email + Chat", "Priority", "24/7 Live Support"]],
  ["Data Backup", ["Weekly", "Daily", "Hourly", "Real-time"]], ["Analytics Tools", ["Basic", "Advanced", "Comprehensive", "Custom"]],
  ["Integration Options", ["Limited", "Standard", "Extended", "Full Suite"]], ["Uptime Guarantee", ["99%", "99.9%", "99.99%", "99.999%"]],
  ["Custom Reports", [false, true, true, true]], ["Mobile Access", [false, false, true, true]], ["Custom Branding", [false, false, false, true]],
];
const FAQ = [
  ["How is the price of each plan worked out?", "Pricing follows the number of seats and the feature tier you pick. Annual billing lowers the monthly rate."],
  ["Which payment methods do you take for subscriptions?", "We accept major cards, bank transfers and several local payment methods."],
  ["Does the pricing include any hidden charges?", "No. The price you see includes everything in your tier; taxes are added at checkout where they apply."],
  ["Do yearly subscriptions come with a discount?", "Yes, paying annually saves roughly 20 percent compared with paying month to month."],
  ["Can I get a refund if I cancel a subscription?", "You can cancel at any time and keep access until the end of the billing period."],
  ["Is it possible to add features to my current plan?", "Add-ons can be attached to any plan from the billing page."],
];
const bl = "1px solid var(--app-border)";

export function PlansPage() {
  const [annual, setAnnual] = useState(true);
  return (
    <>
      <PageHeader title="Plans" crumbs={["My Account", "Billing", "Plans"]} actions={<PageActions />} />
      <Container>
        <div className="grid gap-5 lg:gap-7.5">
          <div className="fathom-xscroll">
            <table className="mt-3 w-full min-w-[1000px] table-fixed rounded-xl text-sm" style={{ borderCollapse: "separate", borderSpacing: 0 }}>
              <tbody>
                <tr>
                  <td className="align-bottom" style={{ padding: "30px 20px 24px" }}>
                    <div className="flex items-center space-x-2"><SwitchField id="annual" aria-label="Annual billing" size="sm" checked={annual} onChange={setAnnual} /><label htmlFor="annual" className="text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>Annual Billing</label></div>
                  </td>
                  {PLANS.map((p, i) => (
                    <td key={p.n} className="relative align-middle" style={{ padding: "30px 20px 20px", borderTop: bl, borderRight: i === 3 ? bl : undefined, background: p.cur ? "color-mix(in srgb, var(--app-surface-2) 70%, transparent)" : undefined }}>
                      {p.cur && <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2"><Chip size="sm" color="success" variant="soft" radius="md">Current Plan</Chip></span>}
                      <h3 className="pb-2 text-lg font-medium" style={{ color: "var(--app-fg-strong)" }}>{p.n}</h3>
                      <div className="text-sm fathom-sec">{p.d}</div>
                      <div className="py-4">{p.m === 0 ? <h4 className="text-2xl font-semibold leading-none" style={{ color: "var(--app-fg-strong)" }}>Free</h4> : <div className="flex items-end gap-1.5"><div className="text-2xl font-semibold leading-none" style={{ color: "var(--app-fg-strong)" }}>${annual ? Math.round(p.m * 0.8).toLocaleString() : p.m.toLocaleString()}</div><div className="text-xs fathom-sec">per month</div></div>}</div>
                      <Button fullWidth variant={p.cur ? "bordered" : "solid"} color={p.cur ? "default" : "primary"}>{p.cur ? "Switch to Team" : "Upgrade"}</Button>
                    </td>
                  ))}
                </tr>
                {ROWS.map(([label, cells], ri) => (
                  <tr key={label} style={ri === 0 ? { height: 50 } : undefined}>
                    <td className="px-5 py-3.5" style={{ borderBottom: bl, borderLeft: bl }}><div className="text-sm font-medium leading-none" style={{ color: "var(--app-fg-strong)" }}>{label}</div></td>
                    {cells.map((c, i) => (
                      <td key={i} className="px-5 py-3.5" style={{ borderBottom: bl, borderLeft: bl, borderRight: i === 3 ? bl : undefined, background: i === 0 ? "color-mix(in srgb, var(--app-surface-2) 70%, transparent)" : undefined }}>
                        {typeof c === "string" ? <div className="text-sm" style={{ color: "var(--app-fg-strong)" }}>{c}</div> : c ? <span className="flex h-6 items-center"><Check size={18} style={{ color: "var(--oks-color-success-500)" }} aria-label="Included" /></span> : <span className="sr-only">Not included</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Surface>
            <SurfaceHeader title="FAQ" />
            <SurfaceBody className="p-5 py-3">
              <Accordion variant="light" selectionMode="single" className="fathom-faq">
                {FAQ.map(([q, a]) => <AccordionItem key={q} itemKey={q} title={q}><p className="pb-4 text-sm" style={{ color: "var(--app-fg-muted)" }}>{a}</p></AccordionItem>)}
              </Accordion>
            </SurfaceBody>
          </Surface>

          <div className="grid gap-5 lg:grid-cols-2 lg:gap-7.5">
            {([["Questions ?", "Browse our Help Center for step-by-step guidance on billing, payments and subscriptions.", "Go to Help Center"], ["Contact Support", "Need a hand? Reach our support team for help with your plan, invoices or account.", "Contact Support"]] as const).map(([t, d, l]) => (
              <Surface key={t}>
                <SurfaceBody className="px-10 py-7.5 lg:pr-12.5"><div className="flex flex-wrap gap-6 md:flex-nowrap md:gap-10">
                  <div className="flex flex-col items-start gap-3"><h2 className="text-xl font-medium" style={{ color: "var(--app-fg-strong)" }}>{t}</h2><p className="mb-2.5 text-sm leading-5.5" style={{ color: "var(--app-fg)" }}>{d}</p></div>
                  <svg viewBox="0 0 180 150" width="180" height="150" className="block max-h-[150px] shrink-0" aria-hidden><circle cx="90" cy="75" r="56" fill="var(--oks-color-primary-500)" fillOpacity=".1" stroke="var(--oks-color-primary-500)" strokeWidth="2" /><path d="M70 75h40M90 55v40" stroke="var(--oks-color-primary-500)" strokeWidth="3" strokeLinecap="round" /></svg>
                </div></SurfaceBody>
                <SurfaceFooter className="items-center"><FooterLink href="#">{l}</FooterLink></SurfaceFooter>
              </Surface>
            ))}
          </div>
        </div>
      </Container>
    </>
  );
}
