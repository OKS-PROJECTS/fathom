"use client";

import Link from "next/link";
import { useState } from "react";
import { Avatar, Button, Checkbox, Chip, SwitchField, TextField } from "oks-ui";
import { Copy, Image as ImageIcon, Info, SquareMousePointer, Globe, AtSign } from "lucide-react";
import { Surface, SurfaceBody, SurfaceFooter, SurfaceHeader } from "@/components/ui/Surface";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { PageActions } from "@/components/profile/ProfileShell";
import { FooterLink, MoreMenu } from "@/components/profile/parts";
import { avatarUrl } from "@/lib/avatar";
import { EditButton, SettingsRows, TextAction } from "./parts";
import { GuidesCard } from "./GuidesCard";

const Switch = ({ label, defaultOn = false }: { label: string; defaultOn?: boolean }) => {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center gap-2">
      <label className="text-sm font-medium" style={{ color: "var(--app-fg-strong)" }} htmlFor={`sw-${label}`}>{label}</label>
      <SwitchField id={`sw-${label}`} aria-label={label} size="sm" checked={on} onChange={setOn} />
    </div>
  );
};
const Round = ({ children }: { children: React.ReactNode }) => (
  <Link href="#" className="flex size-8 items-center justify-center rounded-full border" style={{ borderColor: "var(--app-border-input)", background: "var(--app-surface)", color: "var(--app-fg-muted)" }}>{children}</Link>
);
const Hr = () => <div className="my-7.5 border-t" style={{ borderColor: "var(--app-border)" }} />;
const FieldLabel = ({ t, d }: { t: string; d: string }) => (
  <div className="flex flex-col"><div className="text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>{t}</div><span className="text-sm fathom-sec">{d}</span></div>
);

const MEMBERS = [
  ["Tyler Okafor", 26, "Project Member", "Disabled", "Today"], ["Esther Linde", 639, "Accountant", "Enabled", "5 days ago"], ["Jacob Jaeger", 125, "Data Analyst", "Enabled", "3 days ago"],
  ["Cody Marlowe", 81, "Designer", "Enabled", "1 week ago"], ["Leslie Alder", 1203, "Support Lead", "Disabled", "2 weeks ago"],
] as const;

export function AccountCompanyProfilePage() {
  const [checks, setChecks] = useState({ sec: false, mail: true, vendor: true });
  return (
    <>
      <PageHeader title="Company Profile" crumbs={["My Account", "Account", "Company Profile"]} actions={<PageActions />} />
      <Container>
        <div className="grid grid-cols-1 gap-5 lg:gap-7.5 xl:grid-cols-3">
          <div className="col-span-2">
            <div className="flex flex-col gap-5 lg:gap-7.5">
              <Surface className="min-w-full">
                <SurfaceHeader title="General Info" actions={<Switch label="Public Profile" defaultOn />} />
                <SettingsRows labelWidth={224} lastBorder={false} actionAlign="center" actionMin={64} rows={[
                  { label: "Company Name", value: "Hexlab", py: 16, valueClass: "min-w-48 w-full", action: <EditButton /> },
                  { label: "Phone number", value: "+1 555-1234", py: 16, action: <EditButton /> },
                  { label: "VAT number", value: <Chip size="sm" color="danger" variant="soft" radius="md">Missing Details</Chip>, py: 16, action: <TextAction href="#">Add</TextAction> },
                  { label: "Registration number", value: "IYS2023A56789", py: 16, action: <EditButton /> },
                  { label: "Remote Company ID", value: <div className="flex items-center gap-0.5">CID78901BXT2023<Button variant="ghost" isIconOnly aria-label="Copy ID"><Copy size={16} /></Button></div>, py: 16, action: <EditButton /> },
                ]} />
              </Surface>

              <Surface className="min-w-full">
                <SurfaceHeader title="Account Settings" />
                <SettingsRows labelWidth={224} lastBorder={false} actionAlign="center" actionMin={112} rows={[
                  { label: "Email", value: <Link href="#" className="text-sm" style={{ color: "var(--app-fg-strong)" }}>john.doe@hexlab.example</Link>, py: 8, valueClass: "min-w-60 w-full", action: <EditButton /> },
                  { label: "Password", value: <span className="fathom-sec">Password last changed 2 months ago</span>, py: 8, actionPy: 16, action: <EditButton /> },
                  { label: "Sign-in with", value: <div className="flex gap-2.5"><Round><Globe size={16} /></Round><Round><AtSign size={16} /></Round></div>, py: 16, action: <TextAction href="#">Setup</TextAction> },
                  { label: "Team Account", value: <span className="fathom-sec">To be set</span>, py: 16, action: <EditButton /> },
                  { label: "Social Profiles", value: <div className="flex gap-2.5"><Round><Globe size={16} /></Round><Round><AtSign size={16} /></Round><Round><Globe size={16} /></Round></div>, py: 16, action: <EditButton /> },
                  { label: "Referral Link", value: <div className="flex items-center gap-0.5"><Link href="#" className="text-sm fathom-sec">https://hexlab.example/W3gvQOI35dt</Link><Button variant="ghost" isIconOnly aria-label="Copy link"><Copy size={16} /></Button></div>, py: 16, action: <TextAction href="#">Re-create</TextAction> },
                ]} />
              </Surface>

              <Surface className="min-w-full">
                <SurfaceHeader title="Branding" actions={<Switch label="Publish" defaultOn />} />
                <SurfaceBody className="p-5 py-5 lg:py-7.5">
                  <div className="flex flex-wrap justify-between gap-5">
                    <FieldLabel t="Company Logo" d="Distinctive Company Identity Mark" />
                    <div className="flex w-full max-w-96 flex-wrap gap-5 sm:flex-nowrap lg:gap-7.5">
                      <Avatar name="Hexlab" size={35} radius="md" className="mt-2" />
                      <div className="flex w-full rounded-xl border border-dashed p-5 lg:p-7" style={{ borderColor: "var(--app-border-input)" }}>
                        <div className="flex w-full flex-col place-content-center place-items-center text-center">
                          <div className="mb-2.5 flex"><div className="relative size-11"><svg viewBox="0 0 44 48" className="size-full" aria-hidden><path d="M22 2.5 40 12.8v22.4L22 45.5 4 35.2V12.8z" strokeLinejoin="round" style={{ fill: "color-mix(in srgb, var(--oks-color-warning-500) 10%, var(--app-surface))", stroke: "color-mix(in srgb, var(--oks-color-warning-500) 35%, transparent)", strokeWidth: 1.5 }} /></svg>
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 leading-none" style={{ color: "var(--oks-color-warning-400)" }}><ImageIcon size={20} /></div></div></div>
                          <Link href="/network/user-cards/mini-cards" className="mb-px text-xs font-medium" style={{ color: "var(--app-fg-strong)" }}>Click or Drag &amp; Drop</Link>
                          <span className="text-nowrap text-xs fathom-sec">SVG, PNG, JPG (max. 800x400)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Hr />
                  <div className="flex flex-wrap justify-between gap-5">
                    <FieldLabel t="Brand Color" d="Primary Palette Brand Element" />
                    <div className="w-full sm:max-w-full xl:max-w-96"><TextField aria-label="Brand color" defaultValue="#3b82f6" startIcon={<SquareMousePointer size={16} style={{ color: "var(--oks-color-success-500)" }} aria-hidden />} /></div>
                  </div>
                  <Hr />
                  <div className="flex flex-wrap justify-between gap-5">
                    <FieldLabel t="Branding" d="Complete Visual Identity Design" />
                    <div className="flex w-full max-w-96 flex-col gap-5">
                      {([["sec", "Security Questionnaires", "Risk Assessment and Compliance Checks"], ["mail", "Emails", "Messages Sent by Email"], ["vendor", "Supplier Reports", "Supplier Performance and Reliability Reviews"]] as const).map(([k, t, d]) => (
                        <div key={k} className="flex flex-col gap-2.5">
                          <div className="flex h-5 items-center"><Checkbox label={t} isSelected={checks[k]} onSelectedChange={(v) => setChecks((c) => ({ ...c, [k]: v }))} /></div>
                          <span className="text-sm fathom-sec">{d}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Hr />
                  <div className="flex justify-end"><Button color="primary">Save Changes</Button></div>
                </SurfaceBody>
              </Surface>

              <Surface className="min-w-full">
                <SurfaceHeader title="Members" actions={<div className="flex items-center gap-5"><Switch label="Enforce 2FA" /><MoreMenu /></div>} />
                <div className="fathom-xscroll">
                  <table className="w-full text-sm" style={{ color: "var(--app-fg-muted)" }}>
                    <thead>
                      <tr style={{ background: "color-mix(in srgb, var(--app-surface-2) 60%, transparent)", borderBottom: "1px solid var(--app-border)" }}>
                        <th className="h-10 min-w-52 px-4 text-start font-medium">Name</th><th className="h-10 min-w-36 px-4 text-end font-medium">Role</th><th className="h-10 min-w-32 px-4 text-end font-medium">2FA</th><th className="h-10 min-w-20 px-4 text-end font-medium">Joined</th><th className="h-10 min-w-16 px-4" aria-label="Actions" />
                      </tr>
                    </thead>
                    <tbody>
                      {MEMBERS.map(([n, c, role, tf, j], i) => (
                        <tr key={n} style={{ borderBottom: i === MEMBERS.length - 1 ? 0 : "1px solid var(--app-border)" }}>
                          <td className="p-4"><div className="flex grow gap-2.5"><Avatar name={n} src={avatarUrl(3 + i)} size={36} /><div className="flex flex-col"><Link href="#" className="mb-px text-sm font-semibold" style={{ color: "var(--app-fg-strong)" }}>{n}</Link><span className="text-xs fathom-sec">{c} connections</span></div></div></td>
                          <td className="p-4 text-end"><Chip size="sm" variant="soft" radius="md">{role}</Chip></td>
                          <td className="p-4 text-end"><Chip size="sm" color={tf === "Enabled" ? "success" : "danger"} variant="soft" radius="md">{tf}</Chip></td>
                          <td className="p-4 text-end text-sm fathom-sec">{j}</td>
                          <td className="p-4 text-end"><MoreMenu /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <SurfaceFooter className="items-center"><FooterLink href="#">View 64 more</FooterLink></SurfaceFooter>
              </Surface>

              <Surface>
                <SurfaceHeader title="Data import from Google Analytics" actions={<Button variant="ghost" isIconOnly aria-label="About this import"><Info size={18} /></Button>} />
                <SurfaceBody className="p-5 py-5 lg:py-7.5">
                  <div className="mb-4 text-sm" style={{ color: "var(--app-fg)" }}>Name what you want, then map the route. Turn a big idea into goals you can measure.</div>
                  <Button variant="bordered" startContent={<Globe size={16} />}>Continue with Google</Button>
                </SurfaceBody>
              </Surface>
            </div>
          </div>

          <div className="col-span-1">
            <div className="flex flex-col gap-5 lg:gap-7.5">
              <GuidesCard />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
