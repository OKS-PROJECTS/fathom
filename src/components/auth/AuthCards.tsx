"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowLeft, Info, Mail, Smartphone, PartyPopper } from "lucide-react";
import { Button, Checkbox, OtpField, PasswordField, TextField } from "oks-ui";
import { OksMark } from "@/components/shell/Logo";

const ink = { color: "var(--app-fg-strong)" } as const;

/** Variants differ only in the wrapper: Classic centres the card on a soft background, Branded splits the screen. */
export function AuthShell({ variant, children }: { variant: "classic" | "branded"; children: ReactNode }) {
  if (variant === "classic") {
    return (
      <div className="fathom-auth-classic flex min-h-screen grow flex-col items-center justify-center gap-6 p-6">
        <span style={{ color: "var(--app-fg-strong)" }}><OksMark size={44} /></span>
        <div className="w-full max-w-[400px]">{children}</div>
      </div>
    );
  }
  return (
    <div className="grid min-h-screen grow lg:grid-cols-2" style={{ background: "var(--app-surface)" }}>
      <div className="order-2 flex items-center justify-center p-8 lg:order-1 lg:p-10"><div className="w-full max-w-[400px]">{children}</div></div>
      <BrandPanel />
    </div>
  );
}

const Tile = ({ className = "", children }: { className?: string; children?: ReactNode }) => <div className={`rounded-xl border p-3 ${className}`} style={{ background: "var(--app-surface)", borderColor: "var(--app-border)" }}>{children}</div>;

function BrandPanel() {
  return (
    <div className="relative order-1 overflow-hidden lg:order-2 lg:m-5 lg:rounded-xl lg:border" style={{ borderColor: "var(--app-border)", background: "linear-gradient(160deg, var(--app-surface-2), var(--app-surface) 60%)" }}>
      <div className="flex flex-col gap-4 p-8 lg:p-16">
        <span style={{ color: "var(--app-fg-strong)" }}><OksMark size={32} /></span>
        <div className="flex flex-col gap-3"><h3 className="text-2xl font-semibold" style={ink}>Protected Workspace Access</h3><div className="text-base font-medium leading-6" style={{ color: "var(--app-fg)" }}>A dependable sign-in gateway that keeps access to your Fathom workspace fast, simple and secure.</div></div>
      </div>
      <div className="hidden px-16 pb-0 lg:block" aria-hidden>
        <div className="grid grid-cols-3 gap-4 opacity-95">
          <Tile className="col-span-2 h-44"><div className="mb-2 h-2 w-1/3 rounded" style={{ background: "var(--app-border-input)" }} /><div className="grid h-28 grid-cols-3 gap-2">{[0, 1, 2].map((k) => <div key={k} className="rounded-md" style={{ background: k === 0 ? "var(--oks-color-primary-500)" : "var(--app-surface-2)" }} />)}</div></Tile>
          <Tile className="h-44"><div className="mb-2 h-2 w-1/2 rounded" style={{ background: "var(--app-border-input)" }} />{[0, 1, 2, 3].map((k) => <div key={k} className="mb-2 h-3 rounded" style={{ background: "var(--app-surface-2)" }} />)}</Tile>
          <Tile className="col-span-3 h-56">{[0, 1, 2, 3, 4].map((k) => <div key={k} className="mb-3 flex items-center gap-3"><span className="size-5 rounded-full" style={{ background: `oklch(70% .14 ${k * 70 + 20})` }} /><span className="h-2.5 grow rounded" style={{ background: "var(--app-surface-2)" }} /><span className="h-4 w-8 rounded-full" style={{ background: "var(--oks-color-primary-500)" }} /></div>)}</Tile>
        </div>
      </div>
    </div>
  );
}

export function AuthCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`w-full rounded-xl border p-6 shadow-xs ${className}`} style={{ background: "var(--app-surface)", borderColor: "var(--app-border)" }}>{children}</div>;
}

const Head = ({ title, text }: { title: string; text: string }) => <div className="space-y-1 pb-3 text-center"><h1 className="text-2xl font-semibold tracking-tight" style={ink}>{title}</h1><p className="text-sm fathom-sec">{text}</p></div>;
const Field = ({ label, children, extra }: { label: string; children: ReactNode; extra?: ReactNode }) => <div className="flex flex-col gap-2.5"><div className="flex items-center justify-between"><label className="text-sm font-medium leading-none" style={ink}>{label}</label>{extra}</div>{children}</div>;

function Art({ children }: { children: ReactNode }) {
  return <div className="flex justify-center">{children}</div>;
}
const Disc = ({ icon: I, w = 190, h = 130 }: { icon: typeof Mail; w?: number; h?: number }) => (
  <svg viewBox="0 0 190 130" width={w} height={h} aria-hidden className="block">
    <ellipse cx="95" cy="68" rx="80" ry="52" fill="var(--oks-color-primary-500)" fillOpacity=".08" />
    <circle cx="95" cy="65" r="38" fill="var(--app-surface)" stroke="var(--oks-color-primary-500)" strokeWidth="2.5" />
    <g transform="translate(75 45)" style={{ color: "var(--oks-color-primary-500)" }}><I size={40} strokeWidth={1.6} /></g>
  </svg>
);

export function SignInCard({ base }: { base: string }) {
  return (
    <AuthCard>
      <form className="block w-full space-y-5" onSubmit={(e) => e.preventDefault()}>
        <Head title="Sign In" text="Good to see you again. Sign in with your details." />
        <div className="flex items-stretch gap-2 rounded-md border px-3 py-2.5 text-xs" style={{ background: "var(--app-surface-2)", borderColor: "var(--app-border)", color: "var(--app-fg)" }}><Info size={16} className="mt-0.5 shrink-0" style={{ color: "var(--oks-color-primary-500)" }} aria-hidden /><div className="grow tracking-tight">Use <strong>demo@fathom.example</strong> username and <strong>fathom-demo</strong> password for demo access.</div></div>
        <div className="flex flex-col gap-3.5"><Button variant="bordered" className="w-full">Sign in with Google</Button></div>
        <div className="relative py-1.5"><div className="absolute inset-x-0 top-1/2 border-t" style={{ borderColor: "var(--app-border)" }} /><div className="relative flex justify-center"><span className="px-2 text-xs uppercase fathom-sec" style={{ background: "var(--app-surface)" }}>or</span></div></div>
        <Field label="Email"><TextField aria-label="Email" defaultValue="demo@fathom.example" /></Field>
        <Field label="Password"><PasswordField aria-label="Password" defaultValue="fathom-demo" /></Field>
        <div className="flex items-center justify-between"><Checkbox defaultChecked label="Remember me" /><Link href={`${base}/reset-password`} className="text-sm font-semibold" style={ink}>Forgot Password?</Link></div>
        <Button color="primary" type="submit" className="w-full">Sign In</Button>
        <p className="text-center text-sm fathom-sec">Don&apos;t have an account? <Link href={`${base}/signup`} className="font-semibold" style={ink}>Sign Up</Link></p>
      </form>
    </AuthCard>
  );
}

export function SignUpCard({ base }: { base: string }) {
  return (
    <AuthCard>
      <form className="block w-full space-y-5" onSubmit={(e) => e.preventDefault()}>
        <Head title="Sign Up" text="Set up your account to begin" />
        <Field label="First Name"><TextField aria-label="First name" placeholder="Enter your first name" /></Field>
        <Field label="Last Name"><TextField aria-label="Last name" placeholder="Enter your last name" /></Field>
        <Field label="Email"><TextField aria-label="Email" placeholder="Your email address" /></Field>
        <Field label="Password"><PasswordField aria-label="Password" placeholder="Create a password" /></Field>
        <Field label="Confirm Password"><PasswordField aria-label="Confirm password" placeholder="Confirm your password" /></Field>
        <div className="flex items-center gap-2 text-sm"><Checkbox label={<span>I agree to the <Link href="#" className="font-semibold" style={ink}>Privacy Policy</Link></span>} /></div>
        <Button color="primary" type="submit" className="w-full">Create Account</Button>
        <p className="text-center text-sm fathom-sec">Already have an account? <Link href={`${base}/signin`} className="font-semibold" style={ink}>Sign In</Link></p>
      </form>
    </AuthCard>
  );
}

export function TwoFactorCard({ base }: { base: string }) {
  return (
    <AuthCard className="flex min-h-[546px] flex-col justify-center space-y-5 px-8 py-10 text-center">
      <Art><Disc icon={Smartphone} w={270} h={80} /></Art>
      <h1 className="text-lg font-medium" style={ink}>Verify your phone</h1>
      <p className="text-sm fathom-sec">Enter the verification code we sent to<br /><span className="font-semibold" style={ink}>****** 7859</span></p>
      <div className="flex justify-center"><OtpField aria-label="Verification code" length={6} /></div>
      <p className="text-sm fathom-sec">Didn&apos;t receive a code? (37s) <Link href="#" className="font-semibold" style={ink}>Resend</Link></p>
      <Button color="primary" className="w-full">Continue</Button>
      <Link href={`${base}/signin`} className="flex items-center justify-center gap-1.5 text-sm font-medium" style={ink}><ArrowLeft size={14} aria-hidden />Back to Login</Link>
    </AuthCard>
  );
}

export function CheckEmailCard({ base, reset = false }: { base: string; reset?: boolean }) {
  return (
    <AuthCard className={`flex flex-col justify-center space-y-5 px-8 py-10 text-center ${reset ? "min-h-[510px]" : "min-h-[434px]"}`}>
      <Art><Disc icon={Mail} /></Art>
      <h1 className="text-lg font-medium" style={ink}>Check your email</h1>
      <p className="text-sm fathom-sec">{reset ? <>Please click the link sent to your email<br />to reset your password. Thank you</> : <>Please click the link sent to your email <b style={ink}>bob@fathom.example</b><br />to verify your account. Thank you</>}</p>
      <Link href={reset ? `${base}/reset-password/changed` : "/"} className="inline-block text-sm font-medium" style={ink}>{reset ? "Skip for now" : "Back to Home"}</Link>
      <p className="text-sm fathom-sec">Didn&apos;t receive an email? <Link href="#" className="font-semibold" style={ink}>Resend</Link></p>
    </AuthCard>
  );
}

export function ResetRequestCard({ base }: { base: string }) {
  return (
    <AuthCard className="!pb-[18px]">
      <form className="block w-full space-y-5" onSubmit={(e) => e.preventDefault()}>
        <Head title="Reset Password" text="Enter your email and we will send a reset link" />
        <Field label="Email"><TextField aria-label="Email" placeholder="your.email@example.com" /></Field>
        <Button color="primary" as={Link} href={`${base}/reset-password/check-email`} className="w-full">Send Reset Link</Button>
        <Link href={`${base}/signin`} className="flex items-center justify-center gap-1.5 text-sm font-medium" style={ink}><ArrowLeft size={14} aria-hidden />Back to Sign In</Link>
      </form>
    </AuthCard>
  );
}

export function PasswordChangedCard({ base }: { base: string }) {
  return (
    <AuthCard className="flex min-h-[462px] flex-col justify-center space-y-5 px-8 py-10 text-center">
      <Art><Disc icon={PartyPopper} w={135} h={180} /></Art>
      <h1 className="text-lg font-medium" style={ink}>Your password has been updated</h1>
      <p className="text-sm fathom-sec">Your password has been successfully updated.<br />Your account&apos;s security is our priority.</p>
      <Button color="primary" as={Link} href={`${base}/signin`} className="w-full">Sign in</Button>
    </AuthCard>
  );
}
