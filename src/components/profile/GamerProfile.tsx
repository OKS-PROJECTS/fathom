"use client";

import Link from "next/link";
import { Avatar, AvatarGroup, Chip, Progress } from "oks-ui";
import { Coins, Gem, Globe, MapPin, MessagesSquare, Radio, ScanEye, Swords, Trophy, Truck, Volleyball, Zap, AtSign } from "lucide-react";
import { Surface, SurfaceBody } from "@/components/ui/Surface";
import { ActivitiesCard, ArtImage, CardWithFooter, FooterLink, HexBadge, KeyValueTable, recentActivity } from "./parts";
import { ProfileFrame, type ProfileIdentity } from "./ProfileShell";
import { avatarUrl } from "@/lib/avatar";

const WHO: ProfileIdentity = {
  name: "Rowan Pierce", org: "", place: "", email: "", seed: "gamer-1",
  meta: [{ icon: <MapPin size={14} />, text: "Leeds, England" }, { icon: <Radio size={14} />, text: "rowanplays" }, { icon: <ScanEye size={14} />, text: "Level 22" }],
};
const KPIS = [[Swords, "164", "Tournaments"], [Coins, "73.2%", "Game Win-rate"], [Gem, "257", "Duels Played"], [Trophy, "19", "Trophies"]] as const;
const TOURNAMENTS = [
  ["CyberStorm Cup", "WED, FEB 16, 12:30 CET", ["Arena", "Drift", "Raid", "Strike", "Forge"], 76, 9],
  ["PixelPulse Showdown", "MON, MAR 2, 16:00 CET", ["Tera", "Kart", "Lore", "Hoops"], 65, 12],
  ["NexusRift Masters", "SUN, APR 29, 11:00 CET", ["Vale", "Duel", "Raid"], 52, 20],
  ["CyberStorm Cup", "WED, JUN 8, 12:30 CET", ["Arena", "Drift", "Raid", "Strike"], 80, 4],
  ["PixelPulse Showdown", "MON, JUL 4, 16:00 CET", ["Tera", "Kart", "Lore"], 63, 15],
] as const;
const PLAYING = [
  ["Skyward Duty", "6 Aug, 2018", 79, "88/100", 2367, 268], ["Rocket Court", "18 May, 2015", 76, "9/10", 436, 5], ["Metro Run", "24 Dec, 2018", 87, "61/100", 214, 41],
  ["Orbit Arena", "3 Mar, 2020", 64, "7/10", 520, 90],
] as const;

export function GamerProfile() {
  return (
    <ProfileFrame title="Gamer" crumbs={["Public Profile", "Profiles", "More", "Gamer"]} who={WHO}>
      <div className="grid grid-cols-1 gap-y-5 lg:grid-cols-3 lg:gap-7.5">
        <div className="col-span-2 lg:col-span-3">
          <Surface>
            <SurfaceBody className="p-5">
              <div className="flex flex-wrap gap-2 px-5 py-1 lg:px-10">
                {KPIS.map(([Icon, v, l], i) => (
                  <div key={l} className="contents">
                    <div className="grid md:flex-1">
                      <div className="flex justify-self-center gap-3">
                        <Icon size={40} strokeWidth={1.25} style={{ color: "var(--oks-color-primary-500)" }} aria-hidden />
                        <div className="grid flex-1 grid-cols-1 place-content-center">
                          <span className="text-2xl font-semibold" style={{ color: "var(--app-fg-strong)" }}>{v}</span>
                          <span className="text-sm fathom-sec">{l}</span>
                        </div>
                      </div>
                    </div>
                    {i < KPIS.length - 1 && <span className="my-1 border-e" style={{ borderColor: "var(--app-border-input)" }} />}
                  </div>
                ))}
              </div>
            </SurfaceBody>
          </Surface>
        </div>

        <div className="col-span-1">
          <div className="flex flex-col gap-5 lg:gap-7.5">
            <CardWithFooter title="Favorite Games">
              <div className="mb-1.5 flex flex-wrap gap-2.5 xl:me-14">
                {Array.from({ length: 8 }, (_, i) => <ArtImage key={i} seed={80 + i} width={44} height={44} className="rounded-xl" />)}
              </div>
            </CardWithFooter>
            <CardWithFooter title="About" bodyClass="p-5 pb-7 pt-4">
              <div className="mb-1.5"><KeyValueTable gap="lg:pe-12" rows={[["Joined:", "26 Aug, 2021"], ["Location:", "Porto, EU"], ["Level:", <Chip key="l" size="sm" color="success" variant="soft" radius="md">Pro</Chip>]]} /></div>
              <p className="text-sm leading-5.5" style={{ color: "var(--app-fg)" }}>Competitive player with a love of co-op shooters, long ranked sessions and a commitment to fair play.</p>
            </CardWithFooter>
            <CardWithFooter title="Badges" bodyClass="p-5 pb-7.5">
              <div className="flex flex-wrap gap-3 lg:gap-4">
                <HexBadge tone="primary"><Volleyball size={20} /></HexBadge><HexBadge tone="warning"><Zap size={20} /></HexBadge>
                <HexBadge tone="success"><MessagesSquare size={20} /></HexBadge><HexBadge tone="secondary"><Truck size={20} /></HexBadge>
              </div>
            </CardWithFooter>
            <CardWithFooter title="Rowan’s Team" footer={<FooterLink href="/account/members/teams">Join Our Team</FooterLink>}>
              <div className="flex flex-wrap gap-2.5 xl:me-16">
                {[27, 1, 2, 3, 5, 23, 6, 11, 12].map((i) => <Avatar key={i} name={`m${i}`} src={avatarUrl(i)} size={36} />)}
              </div>
            </CardWithFooter>
            <CardWithFooter title="Network" bodyClass="p-5 pt-4">
              <div className="mb-1 grid gap-4">
                {([[Globe, "rowanplays"], [AtSign, "playmania"], [AtSign, "rowanpierce"], [AtSign, "rowan_gg"]] as const).map(([I, t]) => (
                  <div key={t} className="flex gap-2.5"><span><I size={18} className="fathom-muted" aria-hidden /></span><Link href="/public-profile/profiles/gamer" className="text-sm" style={{ color: "var(--app-fg-strong)" }}>{t}</Link></div>
                ))}
              </div>
            </CardWithFooter>
          </div>
        </div>

        <div className="col-span-2">
          <div className="flex flex-col gap-5 lg:gap-7.5">
            <CardWithFooter title="Rowan's Tournaments" toolbar={<FooterLink href="/public-profile/profiles/gamer">View All</FooterLink>} bodyClass="p-5 lg:p-7.5 lg:pb-7">
              <div className="fathom-xscroll"><div className="flex gap-5">
                {TOURNAMENTS.map(([t, when, tags, slots, left], i) => (
                  <Surface key={i} className="mb-5 w-[285px] shrink-0 !shadow-none">
                    <ArtImage seed={90 + i} width={285} height={224} className="rounded-t-xl" />
                    <div className="mb-4 grid gap-6 px-5 pb-3 pt-3.5">
                      <div className="flex gap-2.5">
                        <Avatar name={t} size={40} radius="md" />
                        <div className="grid grid-cols-1 gap-0.5">
                          <Link href="/public-profile/profiles/gamer" className="mb-px text-base font-medium" style={{ color: "var(--app-fg-strong)" }}>{t}</Link>
                          <time className="flex items-center gap-1.5 text-xs fathom-sec"><span className="size-1.5 rounded-full" style={{ background: "var(--app-danger)" }} />{when}</time>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1.5">{tags.map((g) => <Chip key={g} size="xs" variant="bordered" radius="sm">{g}</Chip>)}</div>
                      <div className="mb-0.5 grid gap-1.5">
                        <Progress aria-label="Slots filled" value={slots} style={{ ["--oks-progress-height" as string]: "4px", ["--oks-progress-indicator" as string]: "var(--oks-palette-blue-500)", ["--oks-progress-track" as string]: "var(--app-bg)" }} />
                        <div className="flex justify-between"><span className="text-xs font-medium fathom-sec">{slots} slots</span><span className="text-xs font-medium fathom-muted">{left} left</span></div>
                      </div>
                    </div>
                  </Surface>
                ))}
              </div></div>
            </CardWithFooter>

            <CardWithFooter title="Now Playing" toolbar={<FooterLink href="/public-profile/profiles/gamer">View All</FooterLink>} bodyClass="p-5 lg:p-7.5 lg:pb-7">
              <div className="fathom-xscroll"><div className="flex gap-5">
                {PLAYING.map(([t, since, win, reflex, score, rank], i) => (
                  <Surface key={t} className="mb-5 w-[280px] shrink-0 !shadow-none">
                    <ArtImage seed={100 + i} width={280} height={278} className="rounded-t-xl" />
                    <div className="mb-4.5 grid gap-6 px-5 py-3.5">
                      <div className="flex gap-2.5">
                        <Avatar name={t} size={40} />
                        <div className="grid grid-cols-1 gap-0.5">
                          <Link href="/public-profile/profiles/gamer" className="mb-px text-base font-semibold" style={{ color: "var(--app-fg-strong)" }}>{t}</Link>
                          <span className="flex gap-1.5 text-xs font-medium fathom-muted">Playing since {since}</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        {([[`${win}%`, "Win-rate"], [reflex, "Reflex-rate"], [String(score), "Score"]] as const).map(([v, l]) => (
                          <div key={l} className="grid grid-cols-1 gap-1.5 text-center"><span className="text-sm font-semibold leading-none" style={{ color: "var(--app-fg-strong)" }}>{v}</span><span className="text-xs font-medium fathom-sec">{l}</span></div>
                        ))}
                      </div>
                      <div className="flex justify-between gap-2">
                        <AvatarGroup size={28} max={4} overlap={8}>{[4 + i, 1 + i, 2 + i].map((a) => <Avatar key={a} name={`p${a}`} src={avatarUrl(a)} />)}<Avatar name="+7" color="success" /></AvatarGroup>
                        <Chip size="xs" color="warning" variant="soft" radius="sm">Rank {rank}</Chip>
                      </div>
                    </div>
                  </Surface>
                ))}
              </div></div>
            </CardWithFooter>

            <ActivitiesCard title="Recent Activity" items={recentActivity(true)} switchOnly />
          </div>
        </div>
      </div>
    </ProfileFrame>
  );
}
