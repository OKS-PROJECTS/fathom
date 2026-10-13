"use client";

import Link from "next/link";
import { BadgeCheck, LayoutGrid, List } from "lucide-react";
import { Avatar, Button } from "oks-ui";
import { Surface, SurfaceFooter } from "@/components/ui/Surface";
import { ArtImage, FooterLink } from "@/components/profile/parts";
import { avatarUrl } from "@/lib/avatar";
import { CardsToolbarParts, NetworkFrame } from "./parts";

const AUTHORS: [string, string, [string, number][]][] = [
  ["Maren Holloway", "Houston, Texas", [["Geometric Patterns", 81023], ["Artistic Expressions", 67890], ["Signal Studio Hub", 59374], ["Harbor Language", 34214]]],
  ["Idris Navarro", "Sacramento, California", [["Geometric Patterns", 98472], ["Artistic Expressions", 20194], ["Geometric Patterns", 37649], ["Geometric Patterns", 47264]]],
  ["Greta Lindqvist", "Austin, Texas", [["Tidal Forms", 11822], ["Paper Cities", 90417], ["Quiet Grid", 70653], ["Soft Machines", 23981]]],
  ["Joon Eriksen", "Cleveland, Ohio", [["Slow Light", 44017], ["Field Notes", 18235], ["Copper Lines", 66190], ["Night Market", 52704]]],
];

export function AuthorCardsPage() {
  return (
    <NetworkFrame title="Author" crumbs={["Network", "User Cards", "Author"]}>
      <div className="flex flex-col gap-5 lg:gap-7.5">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <h3 className="text-base font-medium" style={{ color: "var(--app-fg-strong)" }}>Showing {AUTHORS.length} Users</h3>
          <div className="flex flex-wrap gap-5">
            <div className="flex flex-wrap gap-2.5"><CardsToolbarParts /></div>
            <div className="flex gap-1">{([LayoutGrid, List]).map((I, k) => <Button key={k} variant="bordered" isIconOnly aria-label={k ? "list view" : "grid view"}><I size={16} /></Button>)}</div>
          </div>
        </div>
        <div className="flex flex-col gap-5 lg:gap-7.5">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-7.5">
            {AUTHORS.map(([name, place, works], ai) => (
              <Surface key={name} className="overflow-hidden">
                <ArtImage seed={ai + 3} width="100%" height={160} className="" />
                <div className="mb-7.5 grow">
                  <div className="flex h-[120px] -translate-y-1/2 gap-1.5 px-5 lg:px-7.5">
                    <div className="relative size-20 shrink-0">
                      <Avatar name={name} src={avatarUrl(ai + 90)} size={80} />
                      <span className="absolute bottom-2 size-3 rounded-full ring-2" style={{ insetInlineStart: 64, background: "var(--oks-color-success-500)", ["--tw-ring-color" as string]: "var(--app-surface)" }} />
                    </div>
                    <div className="flex grow flex-col justify-end">
                      <div className="flex flex-wrap justify-between gap-2">
                        <div className="flex flex-col justify-end gap-0.5">
                          <div className="flex gap-1.5"><Link href="#" className="text-base font-medium leading-5" style={{ color: "var(--app-fg-strong)" }}>{name}</Link><BadgeCheck size={16} style={{ color: "var(--app-primary)" }} aria-label="Verified" /></div>
                          <span className="text-xs fathom-sec">{place}</span>
                        </div>
                        <Button variant="bordered" startContent={<BadgeCheck size={16} />}>Work with me</Button>
                      </div>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <div className="ms-7.5 flex gap-5">
                      {works.map(([t, id], k) => (
                        <div key={k} className="mb-5 flex shrink-0 flex-col overflow-hidden rounded-xl border last:me-5" style={{ borderColor: "var(--app-border)", background: "var(--app-surface)" }}>
                          <ArtImage seed={ai * 4 + k + 1} width={240} height={176} />
                          <div className="px-3.5 pb-2.5 pt-5"><Link href="#" className="mb-2 block text-base font-medium leading-4" style={{ color: "var(--app-fg-strong)" }}>{t}</Link><div className="text-sm fathom-sec">Token ID: <span className="text-sm font-medium" style={{ color: "var(--app-fg)" }}>{id}</span></div></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <SurfaceFooter className="items-center"><FooterLink href="/account/members/team-members">View Profile</FooterLink></SurfaceFooter>
              </Surface>
            ))}
          </div>
          <div className="flex"><FooterLink href="#">Show more Users</FooterLink></div>
        </div>
      </div>
    </NetworkFrame>
  );
}
