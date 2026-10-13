"use client";

import Link from "next/link";
import { BadgeCheck, Copy, LayoutGrid, List } from "lucide-react";
import { Avatar, Button } from "oks-ui";
import { Surface, SurfaceFooter } from "@/components/ui/Surface";
import { ArtImage, FooterLink, MoreMenu } from "@/components/profile/parts";
import { PEOPLE } from "@/data/people";
import { avatarUrl } from "@/lib/avatar";
import { CardsToolbarParts, NetworkFrame, ShowMore } from "./parts";

const WALLETS = ["0x4aD5..F89Aa", "0x4aD5..b2b3D", "0x3eF8..7gF9B", "0x1aC3..9kL2P", "0x7bE2..4cD1Q", "0x9dA6..1fE8R", "0x2cB9..6aG3S", "0x5eF1..8hJ4T", "0x8aD7..3kM5U"];
const STATS: [string, string, string][] = [["196 ETH", "2972", "5%"], ["23 ETH", "82", "2%"], ["2508 ETH", "27k", "57%"], ["4 ETH", "105", "93%"], ["88 ETH", "1.4k", "12%"], ["310 ETH", "640", "31%"], ["57 ETH", "93", "8%"], ["1204 ETH", "9k", "44%"], ["16 ETH", "211", "70%"]];

export function CollectorCardsPage() {
  const rows = PEOPLE.slice(0, 9);
  return (
    <NetworkFrame title="Collector" crumbs={["Network", "User Cards", "Collector"]}>
      <div className="flex flex-col gap-5 lg:gap-7.5">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <h3 className="text-base font-medium" style={{ color: "var(--app-fg-strong)" }}>Showing {rows.length} Users</h3>
          <div className="flex flex-wrap gap-5">
            <div className="flex flex-wrap gap-2.5"><CardsToolbarParts /></div>
            <div className="flex gap-1">{[LayoutGrid, List].map((I, k) => <Button key={k} variant="bordered" isIconOnly aria-label={k ? "list view" : "grid view"}><I size={16} /></Button>)}</div>
          </div>
        </div>
        <div className="flex flex-col">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-7.5 xl:grid-cols-3">
            {rows.map((p, i) => (
              <Surface key={p.id} className="overflow-hidden">
                <div className="relative flex h-[120px] items-start justify-end"><ArtImage seed={i + 5} width="100%" height={120} className="absolute inset-0" /><div className="relative me-2.5 mt-2.5"><MoreMenu items={["Edit", "Share", "Remove"]} label="Card settings" /></div></div>
                <div className="grow p-5 pt-0">
                  <div className="flex -translate-y-1/2"><div className="relative size-20"><Avatar name={p.name} src={avatarUrl(p.id + 120)} size={80} /><span className="absolute bottom-0.5 start-16 size-2.5 -translate-y-1/2 rounded-full ring-2" style={{ background: "var(--oks-color-success-500)", ["--tw-ring-color" as string]: "var(--app-surface)" }} /></div></div>
                  <div className="-mt-7.5 mb-px flex gap-1.5"><Link href="#" className="text-base font-medium leading-5" style={{ color: "var(--app-fg-strong)" }}>{p.name}</Link><BadgeCheck size={16} style={{ color: "var(--app-primary)" }} aria-label="Verified" /></div>
                  <div className="mb-7 flex flex-wrap gap-3.5">
                    <Link href="#" className="text-xs fathom-sec">@{p.handle}</Link>
                    <div className="flex items-center text-xs font-medium" style={{ color: "var(--oks-color-success-500)" }}>{WALLETS[i]}<Copy size={16} className="ms-1 fathom-sec" aria-hidden /></div>
                  </div>
                  <div className="mb-3 flex flex-wrap gap-2 lg:gap-5">
                    {[[STATS[i][0], "Sales"], [STATS[i][1], "Items"], [STATS[i][2], "Listed"]].map(([v, l]) => (
                      <div key={l} className="grid grid-cols-1 gap-1.5 rounded-md border border-dashed px-2.5 py-2" style={{ borderColor: "var(--app-border-input)", borderWidth: "0.5px" }}>
                        <span className="text-sm font-medium leading-none" style={{ color: "var(--app-fg-strong)" }}>{v}</span><span className="text-xs fathom-sec">{l}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <SurfaceFooter className="items-center"><FooterLink href="/public-profile/profiles/collector">View Collection</FooterLink></SurfaceFooter>
              </Surface>
            ))}
          </div>
          <ShowMore>Show more Users</ShowMore>
        </div>
      </div>
    </NetworkFrame>
  );
}
