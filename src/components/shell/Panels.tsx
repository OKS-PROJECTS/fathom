"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Avatar, AvatarGroup, Button, Chip, Drawer, SwitchField, Tab, Tabs, TextField } from "oks-ui";
import { ChevronRight, CodeXml, FileText, Globe, IdCard, Image as ImageIcon, Moon, Settings, UserRound } from "lucide-react";
import { avatarUrl } from "@/lib/avatar";
import { useTheme } from "@/lib/theme";

/** Account card that opens above the sidebar avatar. */
export function UserMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { theme, toggle } = useTheme();
  useEffect(() => {
    if (!open) return;
    const off = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", off); document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("mousedown", off); document.removeEventListener("keydown", esc); };
  }, [open]);
  const row = "flex items-center gap-2.5 px-3.5 py-2 text-sm";
  const ink = { color: "var(--app-fg-strong)" } as const;
  return (
    <div ref={ref} className="relative">
      <button type="button" aria-label="Account menu" aria-expanded={open} onClick={() => setOpen((v) => !v)} className="rounded-full">
        <Avatar name="User" src={avatarUrl("me")} size={36} isBordered />
      </button>
      {open && (
        <div role="menu" className="absolute bottom-[calc(100%+8px)] start-0 z-50 w-[250px] rounded-xl border shadow-lg" style={{ background: "var(--app-surface)", borderColor: "var(--app-border)" }}>
          <div className="flex items-center justify-between gap-2 border-b px-3.5 py-3.5" style={{ borderColor: "var(--app-border)" }}>
            <div className="flex items-center gap-2.5"><Avatar name="User" src={avatarUrl("me")} size={36} isBordered /><div className="flex flex-col"><span className="text-sm font-semibold" style={ink}>User</span><span className="text-xs fathom-sec">demo@fathom.example</span></div></div>
            <Chip size="xs" variant="soft" color="primary" radius="sm">Pro</Chip>
          </div>
          <div className="py-2">
            <Link href="/public-profile/profiles/default" role="menuitem" className={row} style={ink} onClick={() => setOpen(false)}><IdCard size={18} className="fathom-sec" aria-hidden />Public Profile</Link>
            <Link href="/account/home/user-profile" role="menuitem" className={row} style={ink} onClick={() => setOpen(false)}><UserRound size={18} className="fathom-sec" aria-hidden />My Profile</Link>
            <Link href="/account/home/get-started" role="menuitem" className={`${row} justify-between`} style={ink} onClick={() => setOpen(false)}><span className="flex items-center gap-2.5"><Settings size={18} className="fathom-sec" aria-hidden />My Account</span><ChevronRight size={16} className="fathom-sec" aria-hidden /></Link>
            <Link href="#" role="menuitem" className={row} style={ink}><CodeXml size={18} className="fathom-sec" aria-hidden />Dev Forum</Link>
            <div className={`${row} justify-between`} style={ink}><span className="flex items-center gap-2.5"><Globe size={18} className="fathom-sec" aria-hidden />Language</span><span className="inline-flex items-center gap-1.5 rounded-md border px-2 py-1 text-xs" style={{ borderColor: "var(--app-border-input)" }}>English<span className="inline-block size-4 rounded-full" style={{ background: "linear-gradient(180deg,#b22234 0 33%,#fff 33% 66%,#3c3b6e 66%)" }} aria-hidden /></span></div>
          </div>
          <div className="border-t px-3.5 py-3" style={{ borderColor: "var(--app-border)" }}>
            <div className="mb-3 flex items-center justify-between text-sm" style={ink}><span className="flex items-center gap-2.5"><Moon size={18} className="fathom-sec" aria-hidden />Dark Mode</span><SwitchField aria-label="Dark mode" size="sm" checked={theme === "dark"} onChange={toggle} /></div>
            <Button variant="bordered" className="w-full" onPress={() => setOpen(false)}>Logout</Button>
          </div>
        </div>
      )}
    </div>
  );
}

const NOTES = [
  { who: "Jon Lindgren", rest: "mentioned you in", link: "Quarterly Outlook", tail: "topic", ago: "18 mins ago", meta: "Brand Review 2026", on: true, kind: "reply" },
  { who: "Lesley Alvarado", rest: "added new tags to", link: "Rebrand 2026", tail: "", ago: "53 mins ago", meta: "ACME", on: true, kind: "tags" },
  { who: "Gus Hartwell", rest: "requested access to", link: "Harbor", tail: "project", ago: "14 hours ago", meta: "Dev Team", on: false, kind: "access" },
  { who: "June Pereira", rest: "invites you to review a file.", link: "", tail: "", ago: "3 hours ago", meta: "742kb", on: false, kind: "file" },
  { who: "Rowan Pickett", rest: "posted a new article", link: "2026 Roadmap", tail: "", ago: "1 day ago", meta: "Blog", on: false, kind: "none" },
];
const ini = (n: string) => n.split(" ").map((p) => p[0]).join("");

export function NotificationsDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} position="right" width={500} title="Notifications" blur className="fathom-float-drawer"
      actions={<div className="grid w-full grid-cols-2 gap-3"><Button variant="bordered" onPress={onClose}>Archive all</Button><Button variant="bordered" onPress={onClose}>Mark all as read</Button></div>}>
      <Tabs aria-label="Notification filters" variant="underlined" size="sm">
        {["All", "Inbox", "Team", "Following"].map((t) => <Tab key={t} title={t} />)}
      </Tabs>
      <div className="mt-3 divide-y" style={{ borderColor: "var(--app-border)" }}>
        {NOTES.map((n) => (
          <div key={n.who} className="flex gap-3.5 py-4" style={{ borderTop: "1px solid var(--app-border)" }}>
            <div className="relative shrink-0"><span className="flex size-[38px] items-center justify-center rounded-full border text-sm" style={{ borderColor: "var(--app-border)", color: "var(--app-fg-muted)" }}>{ini(n.who).slice(0, 2)}</span><span className="absolute bottom-0 end-0 size-2 rounded-full" style={{ background: n.on ? "var(--oks-color-success-500)" : "var(--app-fg-muted)" }} /></div>
            <div className="flex min-w-0 grow flex-col gap-2.5">
              <div className="text-sm" style={{ color: "var(--app-fg)" }}><b style={{ color: "var(--app-fg-strong)" }}>{n.who}</b> {n.rest} {n.link && <Link href="#" style={{ color: "var(--app-primary)" }}>{n.link}</Link>} {n.tail}</div>
              <div className="flex gap-3 text-xs fathom-sec"><span>{n.ago}</span><span>{n.meta}</span></div>
              {n.kind === "reply" && <div className="rounded-lg border p-3.5" style={{ borderColor: "var(--app-border)", background: "var(--app-surface-2)" }}><p className="mb-3 text-sm" style={{ color: "var(--app-fg-strong)" }}>@Cody Worth reading what Mike said about this, he has a good take!</p><TextField aria-label="Reply" placeholder="Reply" endIcon={<ImageIcon size={16} aria-hidden />} /></div>}
              {n.kind === "tags" && <div className="flex gap-2"><Chip size="sm" variant="soft" color="secondary">Needs-Review</Chip><Chip size="sm" variant="soft" color="warning">Figma</Chip><Chip size="sm" variant="soft" color="secondary">Redesign</Chip></div>}
              {n.kind === "access" && <div className="flex gap-2"><Button variant="bordered">Decline</Button><button type="button" className="inline-flex h-[34px] items-center rounded-md px-3 text-[13px] font-medium fathom-btn-ink" >Accept</button></div>}
              {n.kind === "file" && <div className="flex items-center gap-2.5 rounded-lg border px-3.5 py-2.5 text-sm" style={{ borderColor: "var(--app-border)", background: "var(--app-surface-2)", color: "var(--app-fg-strong)" }}><FileText size={18} style={{ color: "var(--oks-color-danger-500)" }} aria-hidden />Launch_deck_v3.pptx<span className="text-xs fathom-sec">Edited 39 mins ago</span></div>}
            </div>
          </div>
        ))}
      </div>
    </Drawer>
  );
}

const MSGS: [boolean, string, string, number][] = [
  [false, "Hi!\nWe wrap up the project next week. Anything you need from me?", "14:04", 31],
  [true, "That's great to hear!", "14:08", 0],
  [false, "I tried out the features and I'm excited to demo them.", "14:26", 32],
  [false, "I went through the rollout plan and it all looks right. My side is ready and I'm looking forward to the user feedback.", "15:09", 33],
  [true, "I haven't opened the build yet, taking a look now.", "15:52", 0],
  [true, "Opening the build now", "15:52", 0],
  [false, "I'll send the meeting link tomorrow.", "17:40", 34],
];

export function ChatDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} position="right" width={450} title="Chat" blur className="fathom-float-drawer">
      <div className="-mx-1 flex items-center justify-between gap-2.5 border-b pb-3.5" style={{ borderColor: "var(--app-border)" }}>
        <div className="flex items-center gap-2.5"><span className="flex size-[38px] items-center justify-center rounded-full border" style={{ borderColor: "var(--app-border)" }}><span className="size-5 rounded" style={{ background: "var(--oks-color-warning-500)" }} /></span><div className="flex flex-col"><span className="text-sm font-semibold" style={{ color: "var(--app-fg-strong)" }}>HR Team</span><span className="text-xs italic fathom-sec">Jessy is typing...</span></div></div>
        <AvatarGroup size={28} max={3} overlap={8}>{[1, 2, 3].map((k) => <Avatar key={k} name={`m${k}`} src={avatarUrl(k + 40)} />)}<Avatar name="+10" color="success" /></AvatarGroup>
      </div>
      <div className="flex flex-col gap-5 py-4">
        {MSGS.map(([mine, text, time, seed], i) => (
          <div key={i} className={`flex items-end gap-2.5 ${mine ? "flex-row-reverse" : ""}`}>
            <Avatar name={mine ? "Me" : "Them"} src={avatarUrl(mine ? "me" : seed)} size={34} />
            <div className={`flex max-w-[78%] flex-col gap-1.5 ${mine ? "items-end" : ""}`}>
              <div className="rounded-xl px-4 py-3 text-sm" style={mine ? { background: "var(--oks-color-primary-500)", color: "#fff" } : { background: "var(--app-surface-2)", color: "var(--app-fg-strong)" }}>{text.split("\n").map((l, k) => <div key={k}>{l}</div>)}</div>
              <span className="text-xs fathom-sec">{time}</span>
            </div>
          </div>
        ))}
      </div>
    </Drawer>
  );
}
