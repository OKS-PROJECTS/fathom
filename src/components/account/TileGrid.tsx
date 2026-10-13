"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Surface } from "@/components/ui/Surface";
import { MoreMenu } from "@/components/profile/parts";

export type Tile = [LucideIcon, string, string, string];

/** Grid of icon / title / description cards used by every "Get Started" page. */
export function TileGrid({ items, menu = false, extra = 0 }: { items: readonly Tile[]; menu?: boolean; extra?: number }) {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-7.5 xl:grid-cols-3">
      {items.map(([Icon, t, d, to]) => (
        <Surface key={t} className="p-5 lg:p-7.5 lg:pt-7">
          <div className="flex flex-col gap-4" style={{ paddingBottom: extra }}>
            <div className="flex justify-between gap-2">
              <Icon size={20} style={{ color: "var(--oks-color-primary-500)" }} aria-hidden />
              {menu && <MoreMenu />}
            </div>
            <div className="flex flex-col gap-3">
              <Link href={to} className="text-base font-medium leading-none" style={{ color: "var(--app-fg-strong)" }}>{t}</Link>
              <span className="text-sm leading-5 fathom-sec">{d}</span>
            </div>
          </div>
        </Surface>
      ))}
    </div>
  );
}
