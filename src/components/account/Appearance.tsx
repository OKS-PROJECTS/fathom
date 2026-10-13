"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { Button, Checkbox, SelectField, SwitchField, TextField } from "oks-ui";
import { CircleArrowRight, CircleCheck, EyeOff, Image as ImageIcon, LifeBuoy, Link2, Monitor, MousePointer, MousePointerSquareDashed, Smile, SquareMousePointer } from "lucide-react";
import { Surface, SurfaceFooter, SurfaceHeader } from "@/components/ui/Surface";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { PageActions } from "@/components/profile/ProfileShell";
import { FooterLink, HexBadge } from "@/components/profile/parts";
import { FaqCard } from "./Faq";
import { Help } from "./HelpCards";
import { GuidesCard } from "./GuidesCard";
import { FormRow } from "./SettingsSections";
import { Row, Tg } from "./SecurityOverview";

type Theme = { bg: string; side: string; bar: string; panel: string };
const ThemePanel = ({ t }: { t: Theme }) => (
  <div className="flex size-full" style={{ background: t.bg }}>
    <div className="w-1/4 p-2" style={{ background: t.side }}><div className="mb-2 h-2 w-3/4 rounded" style={{ background: t.bar }} /><div className="mb-1.5 h-1.5 w-full rounded" style={{ background: t.bar }} /><div className="mb-1.5 h-1.5 w-2/3 rounded" style={{ background: t.bar }} /><div className="h-1.5 w-4/5 rounded" style={{ background: t.bar }} /></div>
    <div className="flex-1 p-2"><div className="mb-2 h-2.5 w-1/3 rounded" style={{ background: t.bar }} /><div className="h-16 rounded-md" style={{ background: t.panel }} /></div>
  </div>
);

function Preview({ kind }: { kind: "dark" | "light" | "system" }) {
  const dark = { bg: "#18181b", side: "#27272a", bar: "#3f3f46", panel: "#202024" };
  const light = { bg: "#f4f4f5", side: "#ffffff", bar: "#e4e4e7", panel: "#ffffff" };
  if (kind === "system") return <div className="flex size-full overflow-hidden rounded-[10px]"><div className="w-1/2 overflow-hidden"><div style={{ width: "200%", height: "100%" }}><ThemePanel t={light} /></div></div><div className="w-1/2 overflow-hidden"><div style={{ width: "200%", height: "100%", marginLeft: "-100%" }}><ThemePanel t={dark} /></div></div></div>;
  return <div className="size-full overflow-hidden rounded-[10px]"><ThemePanel t={kind === "dark" ? dark : light} /></div>;
}
function ThemeTile({ id, label, checked, onPick }: { id: "dark" | "light" | "system"; label: string; checked: boolean; onPick: () => void }) {
  return (
    <div>
      <label className="relative mb-0.5 block h-[170px] cursor-pointer overflow-hidden rounded-xl" style={{ border: checked ? "3px solid var(--oks-color-success-500)" : "1px solid var(--app-border-input)" }}>
        <input type="radio" name="theme-mode" className="absolute size-0 opacity-0" checked={checked} onChange={onPick} aria-label={label} />
        <Preview kind={id} />
        {checked && <CircleCheck size={20} className="absolute bottom-2 end-2 rounded-full" style={{ color: "var(--oks-color-success-500)", background: "var(--app-surface)" }} aria-hidden />}
      </label>
      <span className="text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>{label}</span>
    </div>
  );
}
const Hr = ({ cls }: { cls: string }) => <div className={`border-t ${cls}`} style={{ borderColor: "var(--app-border)" }} />;
const T = ({ children }: { children: ReactNode }) => <div className="text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>{children}</div>;
const S = ({ children }: { children: ReactNode }) => <span className="text-sm fathom-sec">{children}</span>;

const GUIDES = [
  [Smile, "Improving Usability: Adaptive Shortcut Controls", "Use modifier keys to trigger shortcuts so you can move around faster and stay productive without interrupting your typing."],
  [ImageIcon, "Visual Accessibility: Turning On High Contrast", "Choose a high-contrast colour scheme to make on-screen text easier to read, reduce eye strain and keep long working sessions comfortable."],
  [MousePointer, "Media Handling: Autoplay Video Preferences", "Decide how videos begin playing, following your system preference or a choice you make yourself, so media behaves the way you expect."],
  [Link2, "Navigation Preferences: Opening Links in the Desktop App", "Set external links to open inside the desktop application so your work flows through one consistent, efficient experience."],
] as const;

export function AppearancePage() {
  const [mode, setMode] = useState<"dark" | "light" | "system">("light");
  const [pub, setPub] = useState(false);
  return (
    <>
      <PageHeader title="Appearance" crumbs={["My Account", "Appearance"]} actions={<PageActions />} />
      <Container>
        <div className="grid grid-cols-1 gap-5 lg:gap-7.5 xl:grid-cols-3">
          <div className="col-span-2"><div className="flex flex-col gap-5 lg:gap-7.5">
            <Surface>
              <SurfaceHeader title="Theme" />
              <div className="p-5 lg:py-7.5">
                <div className="mb-5"><h3 className="text-base font-medium" style={{ color: "var(--app-fg-strong)" }}>Theme mode</h3><S>Select or customize your ui theme</S></div>
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-7.5">
                  {(["dark", "light", "system"] as const).map((k) => <ThemeTile key={k} id={k} label={k === "system" ? "System" : k === "dark" ? "Dark" : "Light"} checked={mode === k} onPick={() => setMode(k)} />)}
                </div>
                <Hr cls="mb-8 mt-7" />
                <div className="mb-8"><FormRow label="Transparent sidebar" labelCls="max-w-48 font-normal"><div className="flex grow gap-7.5"><div className="flex items-center gap-2"><label htmlFor="ts" className="text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>Active</label><SwitchField id="ts" aria-label="Transparent sidebar" size="sm" /></div><span className="text-base font-normal leading-6" style={{ color: "var(--app-fg)" }}>Give the sidebar a transparent style for a lighter interface, or switch it off to keep a solid background behind the menu.</span></div></FormRow></div>
                <div className="flex justify-end"><Button color="primary">Save Changes</Button></div>
              </div>
            </Surface>
            <Surface className="min-w-full">
              <SurfaceHeader className="gap-2" title="Branding" actions={<div className="flex items-center gap-2"><label htmlFor="pub" className="text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>Publish</label><SwitchField id="pub" aria-label="Publish" size="sm" checked={pub} onChange={setPub} /></div>} />
              <div className="p-5 py-5 lg:py-7.5">
                <div className="flex flex-wrap justify-between gap-5">
                  <div className="flex flex-col"><T>Company Logo</T><S>Distinctive Company Identity Mark</S></div>
                  <div className="flex w-full max-w-96 flex-wrap gap-5 sm:flex-nowrap lg:gap-7.5">
                    <div className="mt-2 h-[35px] w-[35px] shrink-0 rounded-lg" style={{ background: "var(--oks-color-primary-500)" }} aria-hidden />
                    <div className="flex w-full rounded-xl border border-dashed p-5 lg:p-7" style={{ borderColor: "var(--app-border-input)" }}>
                      <div className="flex w-full flex-col place-content-center place-items-center text-center">
                        <div className="mb-2.5"><HexBadge tone="warning" size={44}><ImageIcon size={20} /></HexBadge></div>
                        <Link href="#" className="mb-px text-xs font-medium" style={{ color: "var(--app-fg-strong)" }}>Click or Drag &amp; Drop</Link>
                        <span className="text-nowrap text-xs fathom-sec">SVG,PNG, JPG (max. 800x400)</span>
                      </div>
                    </div>
                  </div>
                </div>
                <Hr cls="my-7.5" />
                <div className="flex flex-wrap justify-between gap-5">
                  <div className="flex flex-col"><T>Brand Color</T><S>Primary Palette Brand Element</S></div>
                  <div className="w-full sm:max-w-full xl:max-w-96"><TextField aria-label="Brand color" startIcon={<SquareMousePointer size={16} style={{ color: "var(--oks-color-success-500)" }} />} defaultValue="#16A34A" /></div>
                </div>
                <Hr cls="my-7.5" />
                <div className="flex flex-wrap justify-between gap-5">
                  <div className="flex flex-col"><T>Branding</T><S>Complete Visual Identity Design</S></div>
                  <div className="flex w-full max-w-96 flex-col gap-5">
                    {([["Security Questionnaires", "Risk Assessment and Compliance Checks", false], ["Emails", "Messages Sent by Email", true], ["Supplier Reports", "Supplier Performance and Reliability Reviews", false]] as const).map(([t, d, on]) => (
                      <div key={t} className="flex flex-col gap-2.5"><Checkbox defaultChecked={on} label={t} /><S>{d}</S></div>
                    ))}
                  </div>
                </div>
                <Hr cls="my-7.5" />
                <div className="flex justify-end"><Button color="primary">Save Changes</Button></div>
              </div>
            </Surface>
            <Surface>
              <SurfaceHeader title="Accessibility" />
              <Row icon={<CircleArrowRight size={20} />} title="Shortcuts require modifier" desc="Enable modifier keys for quick keyboard shortcuts." wrap={false}><div className="flex gap-5"><div className="flex gap-2.5"><Tg id="ac-1" /></div></div></Row>
              <Row icon={<EyeOff size={20} />} title="High color contrast" desc="Boost readability with higher-contrast interface colours." wrap={false}><div className="flex gap-5"><div className="flex gap-2.5"><Tg id="ac-2" /></div></div></Row>
              <Row icon={<MousePointerSquareDashed size={20} />} title="Autoplay videos" desc="Pick how videos start playing on their own." wrap={false}><div className="flex gap-5"><div className="fathom-select-compact" style={{ width: 168 }}><SelectField aria-label="Autoplay" size="sm" defaultValue="system" options={[{ label: "System preferences", value: "system" }, { label: "Always", value: "always" }, { label: "Never", value: "never" }]} /></div></div></Row>
              <Row icon={<Monitor size={20} />} title="Open links in Desktop" desc="Links open in the desktop app for convenience." wrap={false}><div className="flex gap-5"><div className="flex gap-2.5"><Tg id="ac-4" /></div></div></Row>
            </Surface>
            <FaqCard />
            <Help title="Contact Support" text="Need a hand? Reach our support team for quick, personal help with any questions or concerns." link="Contact Support" icon={<LifeBuoy size={48} strokeWidth={1.5} />} />
          </div></div>
          <div className="col-span-1"><div className="flex flex-col gap-5 lg:gap-7.5">
            <Surface>
              <SurfaceHeader title={<span className="flex flex-wrap gap-1.5 lg:flex-nowrap">Disable default Branding <span className="inline-flex"><span className="inline-flex h-5 items-center rounded-sm px-[0.325rem] text-[0.6875rem] font-medium" style={{ background: "var(--oks-color-primary-50)", color: "var(--oks-color-primary-700)" }}>Pro</span></span></span>} />
              <div className="flex flex-col gap-4 p-5">
                <div className="flex flex-col gap-1.5"><p className="text-sm fathom-sec">Hide any fathom.example branding and media, such as the powered-by line</p><div><FooterLink href="#">View Plans</FooterLink></div></div>
                <div className="flex h-5 items-center"><Tg id="ac-brand" /></div>
              </div>
              <SurfaceFooter className="items-center"><Button variant="bordered">Update</Button></SurfaceFooter>
            </Surface>
            <GuidesCard guides={GUIDES} extra={78} />
          </div></div>
        </div>
      </Container>
    </>
  );
}
