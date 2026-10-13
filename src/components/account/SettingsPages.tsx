"use client";

import { SafeDatePicker, SafeModal } from "@/components/ui/Safe";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Avatar, Button, Checkbox, Chip, PasswordField, SelectField, TextField } from "oks-ui";
import { Camera, Clock3, Upload, X } from "lucide-react";
import { avatarUrl } from "@/lib/avatar";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { PageActions } from "@/components/profile/ProfileShell";
import { FormRow, Save, Section, SETTINGS_NAV, SettingsSections, Tog } from "./SettingsSections";

function Spy({ active, onPick }: { active: string; onPick: (id: string) => void }) {
  const link = (id: string, label: string, gap: string) => (
    <a key={id} href={`#${id}`} onClick={() => onPick(id)} className={`flex gap-${gap} rounded-lg border border-transparent px-2.5 py-1.5`} style={{ color: active === id ? "var(--app-fg-strong)" : "var(--app-menu-fg)", fontWeight: active === id ? 500 : 400 }}>
      <span className="relative flex w-1.5"><span className="absolute left-px top-2 size-1.5 -translate-x-1/2 rounded-full" style={{ background: active === id ? "var(--app-primary)" : "transparent" }} /></span>{label}
    </a>
  );
  return (
    <nav aria-label="Settings sections" className="relative flex flex-col text-sm before:absolute before:bottom-0 before:start-[11px] before:top-0 before:border-s" style={{ ["--b" as string]: "var(--app-border)" }}>
      {SETTINGS_NAV.map((g, i) => (
        <div key={i} className="flex flex-col">
          {g.group && <div className="py-2.5 pe-2.5 ps-6 text-sm font-semibold" style={{ color: "var(--app-fg-strong)" }}>{g.group}</div>}
          {g.items.map((it) => link(it.id, it.label, g.group ? "3.5" : "1.5"))}
        </div>
      ))}
    </nav>
  );
}

const ID_MAP: Record<string, string> = { "basic_settings": "s-basic", auth_email: "s-email", auth_password: "s-password", auth_social_sign_in: "s-social", auth_social_sign_in_sso: "s-sso", auth_two_factor: "s-2fa", advanced_settings_preferences: "s-prefs", advanced_settings_appearance: "s-appearance", advanced_settings_notifications: "s-notifications", advanced_settings_address: "s-address", external_services_manage_api: "s-api", external_services_integrations: "s-integrations", delete_account: "delete_account" };

export function SettingsSidebarPage() {
  const [active, setActive] = useState("basic_settings");
  return (
    <>
      <PageHeader title="Settings - With Sidebar" crumbs={["My Account", "Account", "Settings - With Sidebar"]} actions={<PageActions />} />
      <Container>
        <div className="flex grow gap-5 lg:gap-7.5">
          <div className="hidden w-[230px] shrink-0 lg:block"><div className="sticky top-0 w-[230px]"><Spy active={active} onPick={(id) => { setActive(id); document.getElementById(ID_MAP[id])?.scrollIntoView({ block: "start" }); }} /></div></div>
          <div className="flex min-w-0 grow flex-col items-stretch gap-5 lg:gap-7.5"><SettingsSections /></div>
        </div>
      </Container>
    </>
  );
}

export function SettingsPlainPage() {
  const [del, setDel] = useState(false);
  return (
    <>
      <PageHeader title="Settings - Plain" crumbs={["My Account", "Account", "Settings - Plain"]} actions={<PageActions />} />
      <Container>
        <div className="mx-auto grid gap-5 lg:gap-7.5 xl:w-[38.75rem]">
          <Section id="general_settings" title="General Settings" cardCls="pb-2.5" actions={<Tog id="pl-pub" label="Public Profile" defaultOn />}>
            <div className="flex flex-wrap gap-2.5 lg:flex-nowrap">
              <label className="flex w-full max-w-56 text-sm font-medium leading-none" style={{ color: "var(--app-fg-strong)" }}>Photo</label>
              <div className="flex grow flex-wrap justify-between gap-2.5">
                <span className="text-sm font-medium fathom-sec">150x150px JPEG, PNG Image</span>
                <div className="relative size-16"><button type="button" aria-label="Remove photo" className="absolute -end-0.5 -top-0.5 z-[1] grid size-5 place-items-center rounded-full border" style={{ background: "var(--app-surface)", borderColor: "var(--app-border-input)" }}><X size={13} /></button>
                  <div className="relative overflow-hidden rounded-full border-2" style={{ borderColor: "var(--oks-color-success-500)" }}><Avatar name="Maya Okoro" src={avatarUrl("me")} size={60} /><div className="absolute inset-x-0 bottom-0 flex h-5 items-center justify-center" style={{ background: "rgb(0 0 0 / 0.25)", color: "#fff" }}><Camera size={12} /></div></div></div>
              </div>
            </div>
            <FormRow label="Name"><TextField aria-label="Name" defaultValue="Maya Okoro" /></FormRow>
            <FormRow label="Birth Date"><SafeDatePicker aria-label="Birth date" defaultValue="1984-01-20" /></FormRow>
            <FormRow label="Availability Date & Time"><SafeDatePicker aria-label="Availability" withTime defaultValue="1984-01-20T10:00" /></FormRow>
            <FormRow label="Phone number"><TextField aria-label="Phone number" placeholder="Phone number" /></FormRow>
            <FormRow label="Email"><TextField aria-label="Email" placeholder="Email" /></FormRow>
            <FormRow label="Address"><TextField aria-label="Address" placeholder="Address" /></FormRow>
            <FormRow label="Dismissal Time"><TextField aria-label="Dismissal time" startIcon={<Clock3 size={16} aria-hidden />} placeholder="-- : -- AM" /></FormRow>
            <FormRow label="Country"><SelectField aria-label="Country" value="Spain" onChange={() => {}} options={["Spain", "Portugal", "Norway"].map((o) => ({ label: o, value: o }))} /></FormRow>
            <FormRow label="State"><TextField aria-label="State" placeholder="State" /></FormRow>
            <FormRow label="City"><TextField aria-label="City" placeholder="City" /></FormRow>
            <div className="mb-2.5"><FormRow label="Postcode"><TextField aria-label="Postcode" /></FormRow></div>
            <Save />
          </Section>

          <Section id="files_upload" title="Files Upload" cardCls="pb-2.5" bodyCls="p-5 space-y-5">
            <div className="relative rounded-lg border border-dashed p-8 text-center" style={{ borderColor: "var(--app-border-input)" }}>
              <div className="flex flex-col items-center gap-4">
                <div className="flex size-16 items-center justify-center rounded-full" style={{ background: "var(--app-bg)" }}><Upload size={24} className="fathom-muted" /></div>
                <div className="space-y-2"><h3 className="text-lg font-semibold" style={{ color: "var(--app-fg-strong)" }}>Upload your files</h3><p className="text-sm fathom-muted">Drag and drop files here or click to browse</p><p className="text-xs fathom-muted">Support for multiple file types up to 10MB each</p></div>
                <Button color="primary" startContent={<Upload size={16} />}>Select files</Button>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2"><h4 className="text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>Upload Progress</h4><Chip size="xs" color="success" variant="soft" radius="sm">Completed: 2</Chip></div>
              <Button variant="bordered" size="sm">Clear all</Button>
            </div>
            <div className="space-y-3">
              {[["avatar-3.png", "41.06KB", 1], ["avatar-4.png", "61.33KB", 2]].map(([n, sz, a]) => (
                <div key={n as string} className="rounded-lg border p-4" style={{ borderColor: "var(--app-border)" }}>
                  <div className="flex items-start gap-2.5">
                    <Avatar name={n as string} src={avatarUrl(a as number)} size={48} radius="md" />
                    <div className="min-w-0 flex-1"><div className="mt-0.75 flex justify-between"><p className="flex flex-col gap-1 truncate font-medium"><span className="text-sm">{n}</span><span className="text-xs fathom-muted">{sz}</span></p><Button variant="ghost" isIconOnly size="sm" aria-label={`Remove ${n}`}><X size={16} /></Button></div></div>
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section id="password_settings" title="Password" cardCls="pb-2.5">
            <FormRow label="Current Password"><PasswordField aria-label="Current password" placeholder="Your current password" /></FormRow>
            <FormRow label="New Password"><PasswordField aria-label="New password" placeholder="New password" /></FormRow>
            <div className="mb-2.5"><FormRow label="Confirm New Password"><PasswordField aria-label="Confirm new password" placeholder="Confirm new password" /></FormRow></div>
            <Save>Reset Password</Save>
          </Section>

          <Section id="delete_account" title="Delete Account" bodyCls="p-5 flex flex-col gap-3 lg:gap-7.5 lg:py-7.5">
            <div className="flex flex-col gap-5">
              <div className="text-sm" style={{ color: "var(--app-fg)" }}>Sorry to see you go. Confirm the deletion below. Your data will be removed for good. Thanks for being part of our community. <a href="#" className="font-medium" style={{ color: "var(--app-primary)" }}>Setup Guidelines</a> if you still wish continue.</div>
              <div className="flex h-5 items-center"><Checkbox label="Confirm deleting account" isSelected={del} onSelectedChange={setDel} /></div>
            </div>
            <div className="flex justify-end gap-2.5"><Button variant="bordered">Deactivate Instead</Button><Button color="danger">Delete Account</Button></div>
          </Section>
        </div>
      </Container>
    </>
  );
}

export function SettingsModalPage() {
  const router = useRouter();
  const [active, setActive] = useState("basic_settings");
  const close = () => router.push("/account/home/get-started");
  return (
    <SafeModal isOpen onClose={close} size={1320} classNames={{ base: "fathom-modal-xl fathom-modal-pad", body: "fathom-modal-body", closeButton: "hidden" }}>
      <div className="flex min-h-0 grow flex-col">
        <div className="mb-5 flex flex-wrap justify-between gap-5 pb-7.5">
          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-semibold leading-none" style={{ color: "var(--app-fg-strong)" }}>Settings - Modal</h1>
            <div className="text-sm font-normal fathom-sec">Dynamic, Focused Adjustment Interface</div>
          </div>
          <Button variant="bordered" onPress={close}>Close</Button>
        </div>
        <div className="fathom-modal-scroll-plain -me-7 mb-5 grow overflow-y-auto pe-3">
          <div className="flex grow gap-5 lg:gap-7.5">
            <div className="sticky top-px hidden w-[300px] self-start lg:block"><Spy active={active} onPick={(id) => { setActive(id); document.getElementById(ID_MAP[id])?.scrollIntoView({ block: "start" }); }} /></div>
            <div className="flex min-w-0 grow flex-col items-stretch gap-5 lg:gap-7.5"><SettingsSections /></div>
          </div>
        </div>
      </div>
    </SafeModal>
  );
}
