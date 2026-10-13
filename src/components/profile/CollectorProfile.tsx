"use client";

import Link from "next/link";
import { Chip } from "oks-ui";
import { Coins, Globe, MessagesSquare, Truck, Volleyball, Zap, AtSign } from "lucide-react";
import { Surface } from "@/components/ui/Surface";
import { ArtImage, CardWithFooter, FooterLink, HexBadge } from "./parts";
import { ProfileFrame, type ProfileIdentity } from "./ProfileShell";

const WHO: ProfileIdentity = { name: "Bruno Castell", org: "Castell Collection", place: "Oslo, Norway", email: "bruno@castell.example", seed: "castell", ring: "success" };

const ITEMS = [
  ["Quiet Expressions", 67890, "3.2", "14h 30m 49s"], ["Digital Harmony", 54321, "4.1", "11h 05m 12s"], ["Linear Patterns", 81023, "3.8", "09h 40m 33s"],
  ["Future Sculpture", 71045, "4.3", "22h 18m 04s"], ["Enchanted Realms", 67670, "5.3", "15h 52m 27s"],
] as const;

function Gallery({ title, link, offset }: { title: string; link: string; offset: number }) {
  return (
    <CardWithFooter title={title} toolbar={<FooterLink href={link}>View All</FooterLink>} bodyClass="p-5 lg:p-7.5 lg:pb-7">
      <div className="fathom-xscroll">
        <div className="flex gap-5">
          {ITEMS.map(([t, id, bid, end], i) => (
            <Surface key={t} className="mb-5 w-[280px] shrink-0 !shadow-none">
              <ArtImage seed={offset + i} width={280} height={240} className="rounded-t-xl" />
              <div className="px-3.5 pb-3.5 pt-5">
                <div className="pb-6">
                  <Link href="/public-profile/profiles/collector" className="mb-2 block text-base font-medium leading-4" style={{ color: "var(--app-fg-strong)" }}>{t}</Link>
                  <div className="text-sm fathom-sec">Item ID: <span className="text-sm font-medium" style={{ color: "var(--app-fg)" }}>{id}</span></div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <span className="text-sm fathom-sec">Current bid</span>
                    <div className="flex items-center gap-1"><Coins size={16} style={{ color: "var(--oks-color-warning-500)" }} /><span className="text-sm font-semibold leading-none tracking-tight" style={{ color: "var(--app-fg-strong)" }}>{bid} CR</span></div>
                  </div>
                  <div className="flex flex-col gap-2 justify-self-end text-end">
                    <span className="text-sm fathom-sec">Ending in</span>
                    <span className="text-sm font-semibold leading-none tracking-tight" style={{ color: "var(--app-fg-strong)" }}>{end}</span>
                  </div>
                </div>
              </div>
            </Surface>
          ))}
        </div>
      </div>
    </CardWithFooter>
  );
}

export function CollectorProfile() {
  return (
    <ProfileFrame title="Collector" crumbs={["Public Profile", "Profiles", "Collector"]} who={WHO}>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-7.5">
        <div className="col-span-1">
          <div className="grid gap-5 lg:gap-7.5">
            <CardWithFooter title="Assets">
              <div className="grid gap-y-5">
                <div className="flex items-start gap-2">
                  <Coins size={24} style={{ color: "var(--oks-color-warning-400)" }} aria-hidden />
                  <div className="flex flex-col gap-2">
                    <span className="text-2xl font-semibold leading-none tracking-tight" style={{ color: "var(--app-fg-strong)" }}>302.97 CR</span>
                    <span className="text-sm font-medium fathom-sec">$42,074.81</span>
                  </div>
                </div>
              </div>
            </CardWithFooter>

            <CardWithFooter title="About">
              <div className="mb-3.5 flex flex-col gap-3.5">
                {([["Joined:", "26 Aug, 2021"], ["Sector:", "Digital Archives"]] as const).map(([a, b]) => (
                  <div key={a} className="flex gap-2.5"><span className="min-w-14 text-sm fathom-sec xl:min-w-24">{a}</span><div className="text-sm" style={{ color: "var(--app-fg-strong)" }}>{b}</div></div>
                ))}
                <div className="flex gap-2.5"><span className="min-w-14 text-sm fathom-sec xl:min-w-24">Status:</span><div className="text-sm"><Chip size="sm" color="success" variant="soft" radius="md">Subscribed</Chip></div></div>
              </div>
              <p className="mb-2.5 text-sm leading-5.5" style={{ color: "var(--app-fg)" }}>Patient collector with an eye for generative and editorial work and a commitment to open archives.</p>
            </CardWithFooter>

            <CardWithFooter title="Badges" bodyClass="p-5 pb-7.5">
              <div className="flex flex-wrap gap-3 lg:gap-4">
                <HexBadge tone="primary"><Volleyball size={20} /></HexBadge>
                <HexBadge tone="warning"><Zap size={20} /></HexBadge>
                <HexBadge tone="success"><MessagesSquare size={20} /></HexBadge>
                <HexBadge tone="secondary"><Truck size={20} /></HexBadge>
              </div>
            </CardWithFooter>

            <CardWithFooter title="Network">
              <div className="grid gap-y-5">
                {([[Globe, "bruno_c"], [AtSign, "castellcollection"], [AtSign, "brunocastell"], [AtSign, "castell-news"]] as const).map(([I, t]) => (
                  <div key={t} className="flex gap-2.5"><I size={18} className="fathom-muted" aria-hidden /><Link href="/public-profile/profiles/collector" className="text-sm leading-none" style={{ color: "var(--app-fg-strong)" }}>{t}</Link></div>
                ))}
              </div>
            </CardWithFooter>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-2">
          <div className="flex flex-col gap-5 lg:gap-7.5">
            <div className="flex flex-col gap-5 lg:gap-7.5">
              <Gallery title="Created" link="/network/user-cards/author" offset={30} />
              <Gallery title="Collected" link="/network/user-cards/author" offset={40} />
              <Gallery title="Studies" link="/network/user-cards/author" offset={50} />
            </div>
          </div>
        </div>
      </div>
    </ProfileFrame>
  );
}
