"use client";

import { SafeModal } from "@/components/ui/Safe";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Bell, Boxes, ChartLine, FileText, IdCard, KeySquare, MonitorSmartphone, Palette, ShieldCheck, SquareDashedMousePointer, Users, PartyPopper, Ban } from "lucide-react";
import { Button } from "oks-ui";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { PageActions } from "@/components/profile/ProfileShell";
import { TileGrid, type Tile } from "@/components/account/TileGrid";

const ITEMS: Tile[] = [
  [IdCard, "Personal info", "Share how people should find and reach you across the workspace.", "/account/home/user-profile"],
  [ShieldCheck, "Login & Security", "Protect your account with strong sign-in controls.", "/account/security/overview"],
  [FileText, "Billing & Payments", "Pay and get paid through simple, secure flows.", "/account/billing/basic"],
  [Bell, "Notifications", "Stay informed about important notices and upcoming events.", "/account/notifications"],
  [Boxes, "Integrations", "Connect more of your workflow.", "/account/integrations"],
  [Users, "Members, Teams & Roles", "Manage members, teams and roles with ease.", "/account/members/roles"],
  [KeySquare, "API Keys", "Create and manage your API keys safely and quickly.", "/account/api-keys"],
  [SquareDashedMousePointer, "Appearance", "Shape how your workspace looks and feels.", "/account/appearance"],
  [MonitorSmartphone, "Devices", "Keep an eye on devices and product news.", "/account/security/device-management"],
  [Palette, "Brand", "Logos, colours and identity assets for your team.", "/account/appearance"],
  [ChartLine, "Activity", "One place to personalise everything.", "/account/activity"],
];

function Page({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <>
      <PageHeader title={title} crumbs={["Authentication", title]} actions={<PageActions />} />
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-5 pb-7.5 lg:items-end">
          <div className="flex flex-col justify-center gap-2">
            <h1 className="text-xl font-medium leading-none" style={{ color: "var(--app-fg-strong)" }}>{title}</h1>
            <div className="flex items-center gap-2 text-sm font-medium"><span style={{ color: "var(--app-fg-strong)" }}>Maya Okoro</span><Link href="#" className="fathom-sec">maya@fathom.example</Link><span className="size-[3px] rounded-full" style={{ background: "var(--app-fg-muted)" }} /><Link href="/account/home/user-profile" className="text-[13px] font-medium" style={{ color: "var(--app-primary)" }}>Personal Info</Link></div>
          </div>
        </div>
        <TileGrid menu items={ITEMS} />
      </Container>
      {children}
    </>
  );
}

function Art({ icon: I }: { icon: typeof PartyPopper }) {
  return (
    <svg viewBox="0 0 200 150" width="200" height="150" className="block max-h-[150px]" aria-hidden>
      <ellipse cx="100" cy="76" rx="84" ry="62" fill="var(--oks-color-primary-500)" fillOpacity=".08" />
      <circle cx="100" cy="76" r="44" fill="var(--app-surface)" stroke="var(--oks-color-primary-500)" strokeWidth="2.5" />
      <g transform="translate(76 52)" style={{ color: "var(--oks-color-primary-500)" }}><I size={48} strokeWidth={1.6} x={0} y={0} /></g>
    </svg>
  );
}

export function WelcomeMessagePage() {
  const router = useRouter();
  const close = () => router.push("/account/home/get-started");
  return (
    <Page title="Welcome Message">
      <SafeModal isOpen onClose={close} size={500} aria-label="Welcome">
        <div className="flex flex-col items-center pb-[13px] pt-10">
          <div className="mb-10"><Art icon={PartyPopper} /></div>
          <h3 className="mb-3 text-center text-lg font-medium" style={{ color: "var(--app-fg-strong)" }}>Welcome to Fathom</h3>
          <div className="mb-7 text-center text-sm fathom-sec">We&apos;re thrilled to have you on board and excited for<br />the journey ahead together.</div>
          <div className="mb-2 flex justify-center"><Button color="primary" onPress={close}>Show me around</Button></div>
          <Link href="/account/home/get-started" className="py-3 text-sm font-medium fathom-sec">Skip the tour</Link>
        </div>
      </SafeModal>
    </Page>
  );
}

export function AccountDeactivatedPage() {
  const router = useRouter();
  const close = () => router.push("/");
  return (
    <Page title="Account Deactivated">
      <SafeModal isOpen onClose={close} size={500} aria-label="Account deactivated">
        <div className="flex flex-col items-center pb-[27px]">
          <div className="mb-9"><Art icon={Ban} /></div>
          <h3 className="mb-3 text-center text-lg font-medium" style={{ color: "var(--app-fg-strong)" }}>Account Deactivated</h3>
          <div className="mb-7 text-center text-sm fathom-sec">Your account has been deactivated. Please contact<br />support if this is an error or for reactivation.</div>
          <Link href="/" className="text-sm font-medium" style={{ color: "var(--app-primary)" }}>Go to Home</Link>
        </div>
      </SafeModal>
    </Page>
  );
}
