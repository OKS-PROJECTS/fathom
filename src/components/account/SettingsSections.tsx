"use client";

import { SafeDatePicker } from "@/components/ui/Safe";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import {
  Avatar, Button, Checkbox, Chip, PasswordField, Radio, RadioGroupField, SelectField, SwitchField, TextField,
} from "oks-ui";
import { Camera, Clock3, Copy, Globe, AtSign, Mail, MessageSquareText, ShieldCheck, Settings, Trash2, User, X, CircleCheck, Hash } from "lucide-react";
import { Surface, SurfaceHeader } from "@/components/ui/Surface";
import { avatarUrl } from "@/lib/avatar";
import { MoreMenu } from "@/components/profile/parts";

/* ---------- field layout helpers ---------- */
export const FormRow = ({ label, children, wrap = true, labelCls = "max-w-56", baseline = true }: { label: ReactNode; children: ReactNode; wrap?: boolean; labelCls?: string; baseline?: boolean }) => (
  <div className="w-full">
    <div className={`flex ${baseline ? "items-baseline" : ""} gap-2.5 ${wrap ? "flex-wrap lg:flex-nowrap" : ""}`}>
      <label className={`flex w-full text-sm font-medium leading-none ${labelCls}`} style={{ color: "var(--app-fg-strong)" }}>{label}</label>
      <div className="grow w-full">{children}</div>
    </div>
  </div>
);
export const Save = ({ children = "Save Changes", pt = false }: { children?: ReactNode; pt?: boolean }) => (
  <div className={`flex justify-end ${pt ? "pt-2.5" : ""}`}><Button color="primary">{children}</Button></div>
);
const Hint = ({ children }: { children: ReactNode }) => <span className="text-sm font-normal" style={{ color: "var(--app-fg)" }}>{children}</span>;
const Tile = ({ icon, title, desc, trailing }: { icon: ReactNode; title: string; desc: ReactNode; trailing?: ReactNode }) => (
  <div className="flex flex-wrap justify-between gap-2 rounded-xl border px-3.5 py-2.5" style={{ borderColor: "var(--app-border)" }}>
    <div className="flex flex-wrap gap-3.5">
      {icon}
      <div className="flex flex-col gap-px"><Link href="#" className="text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>{title}</Link><span className="text-sm font-medium fathom-sec">{desc}</span></div>
    </div>
    {trailing}
  </div>
);
const HexIcon = ({ children }: { children: ReactNode }) => (
  <div className="relative size-[50px]"><svg viewBox="0 0 44 48" className="size-full" aria-hidden><path d="M22 2.5 40 12.8v22.4L22 45.5 4 35.2V12.8z" strokeLinejoin="round" style={{ fill: "color-mix(in srgb, var(--app-surface-2) 70%, var(--app-surface))", stroke: "var(--app-border-input)", strokeWidth: 1.5 }} /></svg>
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 leading-none" style={{ color: "var(--app-fg-muted)" }}>{children}</div></div>
);

export const Section = ({ id, title, actions, children, cardCls = "", bodyCls = "p-5 grid gap-5", headCls = "" }: { id: string; title: string; actions?: ReactNode; children: ReactNode; cardCls?: string; bodyCls?: string; headCls?: string }) => (
  <Surface className={cardCls}>
    <div id={id}><SurfaceHeader title={title} actions={actions} className={headCls} /></div>
    <div className={`grow ${bodyCls}`}>{children}</div>
  </Surface>
);

export const SETTINGS_NAV: { group?: string; items: { id: string; label: string }[] }[] = [
  { items: [{ id: "basic_settings", label: "Basic Settings" }] },
  { group: "Authentication", items: [{ id: "auth_email", label: "Email" }, { id: "auth_password", label: "Password" }, { id: "auth_social_sign_in", label: "Social Sign in" }, { id: "auth_social_sign_in_sso", label: "Single Sign On(SSO)" }, { id: "auth_two_factor", label: "Two-Factor auth(2FA)" }] },
  { group: "Advanced Settings", items: [{ id: "advanced_settings_preferences", label: "Preferences" }, { id: "advanced_settings_appearance", label: "Appearance" }, { id: "advanced_settings_notifications", label: "Notifications" }, { id: "advanced_settings_address", label: "Address" }] },
  { group: "External Services", items: [{ id: "external_services_manage_api", label: "Manage API" }, { id: "external_services_integrations", label: "Integrations" }] },
  { items: [{ id: "delete_account", label: "Delete Account" }] },
];

const THEMES = [["Dark", "linear-gradient(135deg, #18181b, #3f3f46)"], ["Light", "linear-gradient(135deg, #f4f4f5, #ffffff)"], ["System", "linear-gradient(135deg, #f4f4f5 50%, #27272a 50%)"]] as const;
const INTEGRATIONS = [["Webdev Hub", "webdev@hub.example", "Connect it to collaborate better on web projects."], ["Equacoin", "equa@coin.example", "Streamline cryptocurrency tracking for your team."], ["Notebook", "notes@notebook.example", "Keep project notes and documents in sync."], ["Inferno", "inferno@data.example", "Robust email integration for data workflows."], ["Trackline", "track@line.example", "Streamline project management and enhance planning."]];

export function Tog({ label, defaultOn = false, id }: { label?: string; defaultOn?: boolean; id: string }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center gap-2">
      {label && <label htmlFor={id} className="text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>{label}</label>}
      <SwitchField id={id} aria-label={label ?? id} size="sm" checked={on} onChange={setOn} />
    </div>
  );
}

export function SettingsSections() {
  const [sso, setSso] = useState("google");
  const [theme, setTheme] = useState("Light");
  const [chk, setChk] = useState({ names: false, linked: true, subs: false, del: false });
  const sel = (label: string, value: string, options: string[]) => (
    <SelectField aria-label={label} value={value} onChange={() => {}} options={options.map((o) => ({ label: o, value: o }))} />
  );
  return (
    <>
      <Section id="s-basic" title="Basic Settings" cardCls="pb-2.5">
        <div className="flex flex-wrap gap-2.5">
          <label className="flex w-full max-w-56 text-sm font-medium leading-none" style={{ color: "var(--app-fg-strong)" }}>Photo</label>
          <div className="flex grow flex-wrap justify-between gap-2.5">
            <span className="text-sm fathom-sec">150x150px JPEG, PNG Image</span>
            <div className="relative size-16">
              <button type="button" aria-label="Remove photo" className="absolute -end-0.5 -top-0.5 z-[1] grid size-5 place-items-center rounded-full border" style={{ background: "var(--app-surface)", borderColor: "var(--app-border-input)" }}><X size={13} /></button>
              <div className="relative overflow-hidden rounded-full border-2" style={{ borderColor: "var(--oks-color-success-500)" }}>
                <Avatar name="Maya Okoro" src={avatarUrl("me")} size={60} />
                <div className="absolute inset-x-0 bottom-0 flex h-5 items-center justify-center" style={{ background: "rgb(0 0 0 / 0.25)", color: "#fff" }}><Camera size={12} /></div>
              </div>
            </div>
          </div>
        </div>
        <FormRow label="Name"><TextField aria-label="Name" defaultValue="Maya Okoro" /></FormRow>
        <FormRow label="Birth Date"><SafeDatePicker aria-label="Birth date" defaultValue="1984-01-20" /></FormRow>
        <FormRow label="Availability Date & Time"><SafeDatePicker aria-label="Availability" withTime defaultValue="1984-01-20T10:00" /></FormRow>
        <FormRow label="Company"><TextField aria-label="Company" defaultValue="Fathom Labs" /></FormRow>
        <FormRow label="Dismissal Time"><TextField aria-label="Dismissal time" startIcon={<Clock3 size={16} aria-hidden />} placeholder="-- : -- AM" /></FormRow>
        <FormRow label="Phone number"><TextField aria-label="Phone number" placeholder="Enter phone" /></FormRow>
        <div className="flex flex-wrap gap-2.5"><label className="flex w-full max-w-56 text-sm font-medium leading-none" style={{ color: "var(--app-fg-strong)" }}>Visibility</label><div className="grow">{sel("Visibility", "Public", ["Public", "Team", "Private"])}</div></div>
        <div className="flex flex-wrap gap-2.5"><label className="flex w-full max-w-56 text-sm font-medium leading-none" style={{ color: "var(--app-fg-strong)" }}>Availability</label><Tog id="avail" label="Available to hire" defaultOn /></div>
        <Save pt />
      </Section>

      <Section id="s-email" title="Email" cardCls="pb-2.5" bodyCls="p-5 grid gap-5 pt-7.5">
        <FormRow label="Email">
          <div className="flex w-full flex-col items-start gap-7.5">
            <TextField aria-label="Email" defaultValue="maya@fathom.example" />
            <div className="flex gap-7.5"><Tog id="em-a" label="Active" defaultOn /><Tog id="em-p" label="Primary" /></div>
            <Hint>Enter your email and mark it as primary to receive priority updates. Use the switch to tune how we contact you</Hint>
          </div>
        </FormRow>
        <Save />
      </Section>

      <Section id="s-password" title="Password">
        {["Current Password", "New Password", "Confirm New Password"].map((l) => (
          <FormRow key={l} label={l}><PasswordField aria-label={l} placeholder={l === "Current Password" ? "Your current password" : ""} /></FormRow>
        ))}
        <Save pt>Reset Password</Save>
      </Section>

      <Section id="s-social" title="Social Sign in" bodyCls="p-5">
        <div className="mb-7 grid gap-5">
          {([["Google", "maya@fathom.example", Globe], ["Linkedin", "maya@fathom.example", AtSign]] as const).map(([n, e, I], i) => (
            <div key={n} className="flex flex-wrap justify-between gap-2 rounded-xl border px-3.5 py-2.5" style={{ borderColor: "var(--app-border)" }}>
              <div className="flex flex-wrap gap-3.5"><I size={24} className="fathom-sec" aria-hidden /><div className="flex flex-col gap-0.5"><Link href="#" className="text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>{n}</Link><Link href="#" className="text-sm fathom-sec">{e}</Link></div></div>
              <div className="flex items-center gap-5"><Tog id={`soc-${i}`} defaultOn={i === 0} /><Button variant="ghost" isIconOnly aria-label={`Remove ${n}`}><Trash2 size={16} /></Button></div>
            </div>
          ))}
        </div>
        <div className="mb-5 flex flex-col gap-0.5"><div className="text-base font-medium" style={{ color: "var(--app-fg-strong)" }}>More Social Sign in options</div><div className="text-sm" style={{ color: "var(--app-fg)" }}>Sign in faster by linking the social account you already use.</div></div>
        <div className="mb-7.5 flex flex-wrap gap-2.5">{["Apple", "Microsoft", "Facebook"].map((n) => <Button key={n} variant="bordered" startContent={<Globe size={18} />}>Sign in with {n}</Button>)}</div>
        <Save />
      </Section>

      <Section id="s-sso" title="Single Sign On(SSO)" bodyCls="p-5 flex flex-col gap-7.5">
        <div className="grid gap-7">
          <div className="text-base font-semibold" style={{ color: "var(--app-fg-strong)" }}>1. Select SSO integration Type</div>
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-7.5">
            {([["azure", "Microsoft Azure"], ["google", "Google"], ["openid", "OpenID Connect"]] as const).map(([k, t]) => (
              <label key={k} className="flex h-44 items-stretch rounded-xl border border-dashed" style={{ borderColor: sso === k ? "var(--app-primary)" : "var(--app-border-input)", cursor: "pointer" }}>
                <input type="radio" name="sso" className="peer hidden" checked={sso === k} onChange={() => setSso(k)} />
                <div className="flex grow flex-col place-content-center place-items-center rounded-xl"><div className="flex h-11 items-center"><Globe size={28} className="fathom-sec" aria-hidden /></div><span className="text-base font-medium" style={{ color: "var(--app-fg-strong)" }}>{t}</span></div>
              </label>
            ))}
          </div>
        </div>
        <div className="border-b" style={{ borderColor: "var(--app-border)" }} />
        <div className="grid gap-7">
          <div className="text-base font-semibold" style={{ color: "var(--app-fg-strong)" }}>2. Configure Google authentication</div>
          <FormRow label="Client ID"><TextField aria-label="Client ID" defaultValue="02874374-367145773" /></FormRow>
          <FormRow label="Client Secret"><TextField aria-label="Client secret" defaultValue="02874374-367145773" /></FormRow>
          <Save />
        </div>
        <div className="border-b" style={{ borderColor: "var(--app-border)" }} />
        <div className="grid gap-7">
          <div className="text-base font-semibold" style={{ color: "var(--app-fg-strong)" }}>3. Note down custom URL for Google SSO authentication</div>
          <FormRow label="Custom Login URL"><div className="flex"><TextField aria-label="Custom login URL" defaultValue="https://fathom.example/rl/AirMikeStudios" endIcon={<Copy size={16} aria-hidden />} /></div></FormRow>
        </div>
        <div className="border-b" style={{ borderColor: "var(--app-border)" }} />
        <p className="pb-5 text-sm font-normal leading-6" style={{ color: "var(--app-fg)" }}>Single sign-on lets people log in once and reach every connected service securely, without typing their credentials again.</p>
      </Section>

      <Section id="s-2fa" title="Two-Factor authentication(2FA)" actions={<MoreMenu />} bodyCls="p-5">
        <div className="mb-7 grid gap-5">
          <Tile icon={<HexIcon><MessageSquareText size={20} /></HexIcon>} title="Text Message (SMS)" desc="Instant codes for secure account verification." trailing={<div className="flex items-center gap-2 lg:gap-6"><Tog id="tf-1" defaultOn /></div>} />
          <Tile icon={<HexIcon><ShieldCheck size={20} /></HexIcon>} title="Authenticator App (TOTP)" desc="Add protection with an authenticator app for two-factor sign-in." trailing={<div className="flex items-center gap-2 lg:gap-6"><Tog id="tf-2" /></div>} />
        </div>
        <div className="mb-7">
          <FormRow label="Password"><div className="flex w-full flex-col items-start gap-3"><PasswordField aria-label="Password" placeholder="Enter password" /><span className="text-sm font-normal leading-6" style={{ color: "var(--app-fg-strong)" }}>Enter your password to setup Two-Factor authentication</span></div></FormRow>
        </div>
        <Save pt>Setup</Save>
      </Section>

      <Section id="s-prefs" title="Preferences" bodyCls="p-5 grid gap-5 lg:py-7.5">
        <FormRow label="Language"><div>{sel("Language", "American English", ["American English", "British English", "Deutsch"])}</div></FormRow>
        <FormRow label="Time zone"><div>{sel("Time zone", "GMT -5:00 - Eastern Time(US & Canada)", ["GMT -5:00 - Eastern Time(US & Canada)", "GMT +0:00 - London"])}</div></FormRow>
        <div className="mb-2"><FormRow label="Currency"><div>{sel("Currency", "United States Dollar (USD)", ["United States Dollar (USD)", "Euro (EUR)"])}</div></FormRow></div>
        <div className="flex flex-wrap gap-2.5 lg:flex-nowrap">
          <label className="flex w-full max-w-56 text-sm font-medium leading-none" style={{ color: "var(--app-fg-strong)" }}>Open tasks as...</label>
          <RadioGroupField aria-label="Open tasks as" defaultValue="Fullscreen" options={[{ label: "Modal", value: "Modal" }, { label: "Fullscreen", value: "Fullscreen" }]} />
        </div>
        <div className="mb-1.5 flex flex-wrap gap-2.5">
          <label className="flex w-full max-w-56 text-sm font-medium leading-none" style={{ color: "var(--app-fg-strong)" }}>Attributes</label>
          <div className="flex flex-col items-start gap-5">
            <div className="flex flex-col gap-2.5"><div className="flex h-5 items-center"><Checkbox label="Show list names" isSelected={chk.names} onSelectedChange={(v) => setChk((c) => ({ ...c, names: v }))} /></div><div className="text-sm leading-6 fathom-sec">See the name next to each icon</div></div>
            <div className="flex flex-col gap-2.5"><div className="flex h-5 items-center"><Checkbox label="Show linked task names" isSelected={chk.linked} onSelectedChange={(v) => setChk((c) => ({ ...c, linked: v }))} /></div><div className="text-sm leading-6 fathom-sec">Show task names next to ids for linked project tasks.</div></div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2.5"><label className="flex w-full max-w-56 text-sm font-medium leading-none" style={{ color: "var(--app-fg-strong)" }}>Email visibility</label><Tog id="ev" label="Visible" /></div>
        <Save />
      </Section>

      <Section id="s-appearance" title="Appearance" bodyCls="p-5 lg:py-7.5">
        <div className="mb-5"><h3 className="text-base font-medium" style={{ color: "var(--app-fg-strong)" }}>Theme mode</h3><span className="text-sm fathom-sec">Select or customize your ui theme</span></div>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-7.5">
          {THEMES.map(([t, bg]) => (
            <div key={t}>
              <label className="relative mb-0.5 flex h-[170px] items-end rounded-xl" style={{ background: bg, border: `${theme === t ? 3 : 1}px solid ${theme === t ? "var(--oks-color-success-500)" : "var(--app-border-input)"}`, cursor: "pointer" }}>
                <input type="radio" name="theme" className="absolute h-0 w-0 opacity-0" checked={theme === t} onChange={() => setTheme(t)} />
                {theme === t && <CircleCheck size={20} className="m-2" style={{ color: "var(--oks-color-success-500)" }} aria-hidden />}
              </label>
              <span className="text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>{t}</span>
            </div>
          ))}
        </div>
        <div className="mb-8 mt-7 border-t" style={{ borderColor: "var(--app-border)" }} />
        <div className="mb-8 flex flex-wrap items-baseline gap-2.5 lg:flex-nowrap">
          <label className="flex w-full max-w-48 text-sm font-normal" style={{ color: "var(--app-fg-strong)" }}>Transparent sidebar</label>
          <div className="flex grow gap-7.5"><Tog id="ts" label="Active" /><span className="text-sm font-normal leading-6" style={{ color: "var(--app-fg)" }}>Give the sidebar a transparent style for a lighter interface, or switch it off to keep a solid background behind the menu.</span></div>
        </div>
        <Save />
      </Section>

      <Section id="s-notifications" title="Notifications" bodyCls="p-5 lg:py-7.5">
        <div className="mb-5 flex flex-wrap gap-5 lg:mb-7">
          <div className="flex grow flex-wrap justify-between gap-2 rounded-xl border px-3.5 py-2.5" style={{ borderColor: "var(--app-border)" }}><div className="flex flex-wrap gap-3.5"><HexIcon><Mail size={20} /></HexIcon><div className="flex flex-col"><Link href="#" className="mb-px text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>Email</Link><span className="text-sm fathom-sec">Tailor Your Email Preferences.</span></div></div><div className="flex items-center"><Tog id="nt-e" defaultOn /></div></div>
          <div className="flex grow flex-wrap justify-between gap-2 rounded-xl border px-3.5 py-2.5" style={{ borderColor: "var(--app-border)" }}><div className="flex flex-wrap gap-3.5"><HexIcon><Hash size={20} /></HexIcon><div className="flex flex-col"><Link href="#" className="mb-px text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>Slack</Link><span className="text-sm fathom-sec">Stay Updated on Slack.</span></div></div><div className="flex items-center"><Tog id="nt-s" /></div></div>
        </div>
        <div className="mb-7 flex flex-col gap-3.5"><span className="pb-0.5 text-base font-medium" style={{ color: "var(--app-fg-strong)" }}>Desktop notifications</span>
          <div className="grid gap-2.5"><Radio key="All new messages (Recommended)" name="desktop" label="All new messages (Recommended)" defaultChecked={false} /><Radio key="Direct @mentions" name="desktop" label="Direct @mentions" defaultChecked={true} /><Radio key="Disabled" name="desktop" label="Disabled" defaultChecked={false} /></div></div>
        <div className="mb-7 flex flex-col gap-3.5"><span className="pb-0.5 text-base font-medium" style={{ color: "var(--app-fg-strong)" }}>Email notifications</span>
          <div className="grid gap-2.5"><Radio key="All new messages and statuses" name="emailn" label="All new messages and statuses" defaultChecked={false} /><Radio key="Unread messages only" name="emailn" label="Unread messages only" defaultChecked={true} /><Radio key="Disabled" name="emailn" label="Disabled" defaultChecked={false} /></div></div>
        <div className="flex flex-col gap-3.5"><span className="pb-0.5 text-base font-medium" style={{ color: "var(--app-fg-strong)" }}>Subscriptions</span>
          <div className="flex h-5 items-center"><Checkbox label="Automatically subscribe to tasks you create" isSelected={chk.subs} onSelectedChange={(v) => setChk((c) => ({ ...c, subs: v }))} /></div></div>
        <Save />
      </Section>

      <Section id="s-address" title="Address" bodyCls="p-5 grid gap-5 lg:py-7.5">
        <FormRow label="Address"><TextField aria-label="Address" defaultValue="Avinguda Imaginaria, 789" /></FormRow>
        <FormRow label="Country" baseline><div>{sel("Country", "Spain", ["Spain", "Portugal", "Norway"])}</div></FormRow>
        {["State", "City", "Postcode"].map((l) => <FormRow key={l} label={l}><TextField aria-label={l} placeholder={l} /></FormRow>)}
        <Save pt />
      </Section>

      <Section id="s-api" title="Manage API" headCls="mb-5" bodyCls="p-5 lg:py-7.5 grid gap-5 lg:gap-7.5">
        <FormRow label="API Key" labelCls="max-w-56 font-normal"><TextField aria-label="API key" defaultValue="fk_live_8Jd2kQ4mAZ7cE" endIcon={<Copy size={16} aria-hidden />} /></FormRow>
        <div className="flex flex-wrap justify-between gap-2 rounded-xl border p-5 sm:flex-nowrap" style={{ borderColor: "var(--app-border)" }}>
          <div className="flex gap-4"><HexIcon><User size={20} /></HexIcon>
            <div className="flex flex-col gap-1.5"><div className="flex flex-wrap gap-2.5"><Link href="#" className="text-base font-medium" style={{ color: "var(--app-fg-strong)" }}>User Access</Link><Chip size="xs" variant="soft" radius="sm">16 days left</Chip></div>
              <div className="text-sm font-normal leading-6" style={{ color: "var(--app-fg)" }}>This API key can only access <Link href="#" className="font-medium" style={{ color: "var(--app-primary)" }}>@fathom</Link><br />A unique key keeps access to your workspace secure.</div></div></div>
          <div className="flex flex-wrap gap-1.5 md:flex-nowrap"><Button className="fathom-btn-ink">Renew Plan</Button><Button variant="bordered">Docs</Button></div>
        </div>
        <p className="text-sm" style={{ color: "var(--app-fg-muted)" }}>Put the full power of your application to work with our API, a secure gateway that keeps integrations simple and lets developers build dynamic, polished experiences with ease.</p>
      </Section>

      <Section id="s-integrations" title="Integrations" bodyCls="p-5 grid gap-5 lg:gap-7.5 lg:py-7.5">
        <div className="grid gap-5">
          {INTEGRATIONS.map(([n, e, d], i) => (
            <div key={n} className="flex flex-wrap justify-between gap-2 rounded-xl border p-3.5" style={{ borderColor: "var(--app-border)" }}>
              <div className="flex flex-wrap gap-3.5"><Avatar name={n} size={32} radius="md" /><div className="flex flex-col"><div className="flex gap-1.5"><Link href="#" className="text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>{n}</Link><Link href="#" className="text-sm fathom-sec">{e}</Link></div><span className="text-sm fathom-sec">{d}</span></div></div>
              <div className="flex items-center gap-2 lg:gap-5"><Tog id={`int-${i}`} defaultOn={i % 2 === 0} /><Button variant="ghost" isIconOnly aria-label={`${n} settings`}><Settings size={16} /></Button></div>
            </div>
          ))}
        </div>
        <Save />
      </Section>

      <Section id="delete_account" title="Delete Account" bodyCls="p-5 flex flex-col gap-3 lg:gap-7.5 lg:py-7.5">
        <div className="flex flex-col gap-5">
          <div className="text-sm" style={{ color: "var(--app-fg)" }}>Sorry to see you go. Confirm the deletion below. Your data will be removed for good. Thanks for being part of our community. <Link href="#" className="font-medium" style={{ color: "var(--app-primary)" }}>Setup Guidelines</Link> if you still wish continue.</div>
          <div className="flex h-5 items-center"><Checkbox label="Confirm deleting account" isSelected={chk.del} onSelectedChange={(v) => setChk((c) => ({ ...c, del: v }))} /></div>
        </div>
        <div className="flex justify-end gap-2.5"><Button variant="bordered">Deactivate Instead</Button><Button color="danger">Delete Account</Button></div>
      </Section>
    </>
  );
}
