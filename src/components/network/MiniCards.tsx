"use client";

import Link from "next/link";
import { BadgeCheck } from "lucide-react";
import { Avatar } from "oks-ui";
import { Surface } from "@/components/ui/Surface";
import { PEOPLE } from "@/data/people";
import { avatarUrl } from "@/lib/avatar";
import { CardsToolbar, NetworkFrame, ShowMore, TONES } from "./parts";

export function MiniCardsPage() {
  const rows = PEOPLE.slice(0, 15);
  return (
    <NetworkFrame title="Mini Cards" crumbs={["Network", "User Cards", "Mini Cards"]}>
      <CardsToolbar count={rows.length} />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-7.5 xl:grid-cols-4">
        {rows.map((p, i) => {
          const letter = i % 3 === 1;
          const [tone] = TONES[i % TONES.length];
          return (
            <Surface key={p.id} className="flex-col p-5 lg:py-10">
              <div className="mb-3.5">
                <div className="relative size-20">
                  {letter
                    ? <div className="flex size-20 items-center justify-center rounded-full text-2xl" style={{ color: `var(${tone})`, background: `color-mix(in srgb, var(${tone}) 10%, var(--app-surface))`, boxShadow: `0 0 0 1px color-mix(in srgb, var(${tone}) 30%, transparent)` }}>{p.name[0]}</div>
                    : <Avatar name={p.name} src={avatarUrl(p.id + 60)} size={80} />}
                  <span className="absolute bottom-0.5 start-16 size-2.5 -translate-y-1/2 rounded-full" style={{ background: i % 4 === 2 ? "var(--app-border-input)" : "var(--oks-color-success-500)" }} />
                </div>
              </div>
              <div className="mb-2 flex gap-1.5">
                <Link href="#" className="text-base font-medium leading-5" style={{ color: "var(--app-fg-strong)" }}>{p.name}</Link>
                {i % 3 !== 1 && <BadgeCheck size={16} style={{ color: "var(--app-primary)" }} aria-label="Verified" />}
              </div>
              <Link href="#" className="text-sm fathom-sec">{p.handle}.eth</Link>
            </Surface>
          );
        })}
      </div>
      <ShowMore>Show more Users</ShowMore>
    </NetworkFrame>
  );
}
