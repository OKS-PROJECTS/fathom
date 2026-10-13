"use client";

import Link from "next/link";
import { AtSign, BadgeCheck, Globe, Link2, Mails } from "lucide-react";
import { Avatar, Button } from "oks-ui";
import { Surface, SurfaceFooter } from "@/components/ui/Surface";
import { PEOPLE } from "@/data/people";
import { avatarUrl } from "@/lib/avatar";
import { CardsToolbarParts, NetworkFrame, ShowMore } from "./parts";

const CITIES = ["San Antonio, TX", "Fort Wayne, IN", "Reno, NV", "Irving, TX", "Boise, ID", "Tulsa, OK", "Savannah, GA", "Duluth, MN", "Tucson, AZ"];

export function SocialCardsPage() {
  const rows = PEOPLE.slice(0, 9);
  return (
    <NetworkFrame title="Social" crumbs={["Network", "User Cards", "Social"]}>
      <div className="flex flex-col gap-5 lg:gap-7.5">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <h3 className="text-base font-medium" style={{ color: "var(--app-fg-strong)" }}>Showing {rows.length} Users</h3>
          <div className="flex flex-wrap gap-2.5"><CardsToolbarParts /></div>
        </div>
        <div className="flex flex-col gap-5 lg:gap-7.5">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-7.5 xl:grid-cols-3">
            {rows.map((p, i) => (
              <Surface key={p.id}>
                <div className="flex grow flex-col p-5 lg:pt-10">
                  <div className="mb-3"><div className="relative size-20"><Avatar name={p.name} src={avatarUrl(p.id + 150)} size={80} /><span className="absolute bottom-0.5 start-16 size-2.5 -translate-y-1/2 rounded-full ring-2" style={{ background: "var(--oks-color-success-500)", ["--tw-ring-color" as string]: "var(--app-surface)" }} /></div></div>
                  <div className="mb-3 flex gap-1.5"><Link href="#" className="text-base font-medium leading-5" style={{ color: "var(--app-fg-strong)" }}>{p.name}</Link><BadgeCheck size={16} style={{ color: "var(--app-primary)" }} aria-label="Verified" /></div>
                  <span className="mb-4 text-sm fathom-sec">{CITIES[i]}</span>
                  <div className="flex h-5 gap-2.5">{[Link2, Globe, AtSign].map((I, k) => <Link key={k} href="#" aria-label="Profile link"><I size={18} className="fathom-sec" /></Link>)}</div>
                </div>
                <SurfaceFooter className="items-center"><Button variant="bordered" startContent={<Mails size={16} />}>Message</Button></SurfaceFooter>
              </Surface>
            ))}
          </div>
          <ShowMore>Show more Users</ShowMore>
        </div>
      </div>
    </NetworkFrame>
  );
}
