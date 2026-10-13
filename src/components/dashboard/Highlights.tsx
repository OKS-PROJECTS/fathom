"use client";

import { Button, Chip } from "oks-ui";
import { ArrowDown, ArrowUp, EllipsisVertical, Megaphone, Search, ShoppingBag, Store, Users } from "lucide-react";
import { Surface, SurfaceBody, SurfaceHeader } from "@/components/ui/Surface";
import { CHANNELS } from "@/data/dashboard";

const ICONS = [ShoppingBag, Users, Megaphone, Search, Store];
const SEGMENTS = [
  { label: "Direct", pct: 60, color: "var(--oks-color-success-500)" },
  { label: "Referral", pct: 25, color: "var(--oks-color-danger-600)" },
  { label: "Partner", pct: 15, color: "var(--oks-color-secondary-500)" },
];

export function Highlights() {
  return (
    <Surface className="h-full">
      <SurfaceHeader
        title="Highlights"
        actions={<Button variant="ghost" isIconOnly aria-label="More"><EllipsisVertical size={18} /></Button>}
      />
      <SurfaceBody className="flex flex-col gap-4 p-5 lg:p-7.5 lg:pt-4">
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-normal fathom-sec">All time sales</span>
          <div className="flex items-center gap-2.5">
            <span className="text-3xl font-semibold" style={{ color: "var(--app-fg-strong)" }}>$327.4k</span>
            <Chip size="xs" color="success" variant="soft">+2.7%</Chip>
          </div>
        </div>

        <div className="mb-1.5 flex gap-1" role="img" aria-label="Sales by source">
          {SEGMENTS.map((s) => (
            <div key={s.label} className="h-2 w-full rounded-[2px]" style={{ maxWidth: `${s.pct}%`, background: s.color }} />
          ))}
        </div>
        <div className="mb-1 flex flex-wrap gap-4">
          {SEGMENTS.map((s) => (
            <div key={s.label} className="flex items-center gap-1.5">
              <span className="size-1.5 rounded-full opacity-75" style={{ background: s.color }} />
              <span className="text-sm" style={{ color: "var(--app-fg)" }}>{s.label}</span>
            </div>
          ))}
        </div>

        <div className="border-b" style={{ borderColor: "var(--app-border-input)" }} />

        <div className="grid gap-3">
          {CHANNELS.map((c, i) => {
            const Icon = ICONS[i];
            const up = c.delta >= 0;
            return (
              <div key={c.name} className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <Icon size={18} className="fathom-muted" aria-hidden />
                  <span className="text-sm" style={{ color: "var(--app-fg-strong)" }}>{c.name}</span>
                </div>
                <div className="flex items-center gap-6 text-sm font-medium" style={{ color: "var(--app-fg)" }}>
                  <span className="lg:text-right">${c.value}k</span>
                  <span className="flex items-center justify-end gap-1">
                    {up ? <ArrowUp size={16} style={{ color: "var(--oks-color-success-500)" }} /> : <ArrowDown size={16} style={{ color: "var(--app-danger)" }} />}
                    {Math.abs(c.delta)}%
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </SurfaceBody>
    </Surface>
  );
}
