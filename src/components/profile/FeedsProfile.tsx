"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { Avatar, Button, TextField } from "oks-ui";
import { Archive, Briefcase, Crown, Heart, Image as ImageIcon, Luggage, Mail, MessageSquare, Play, Volleyball, AtSign, CircleCheck, PersonStanding } from "lucide-react";
import { Surface, SurfaceBody } from "@/components/ui/Surface";
import { ArtImage, BigStat, CardWithFooter, FooterLink, MoreMenu, SkillChips } from "./parts";
import { ProfileFrame, type ProfileIdentity } from "./ProfileShell";
import { avatarUrl } from "@/lib/avatar";

const WHO: ProfileIdentity = { name: "Mira Holloway", org: "Holloway Press", place: "Ghent, Belgium", email: "mira@holloway.example", seed: "holloway", ring: "success" };

type Panel = "comments" | "likes" | "saves";

function Reactions({ counts, active, onChange }: { counts: [string, string, string]; active: Panel; onChange: (p: Panel) => void }) {
  const items: [Panel, string, string, ReactNode][] = [
    ["comments", counts[0], "Comments", <MessageSquare key="c" size={16} />],
    ["likes", counts[1], "Likes", <Heart key="l" size={16} />],
    ["saves", counts[2], "Saves", <Archive key="s" size={16} />],
  ];
  return (
    <div className="mx-7.5 mb-4 flex flex-col flex-wrap items-stretch gap-2.5 border-y border-dashed py-3 sm:flex-row sm:items-center" style={{ borderColor: "var(--app-border-input)" }}>
      {items.map(([k, n, label, icon]) => (
        <Button key={k} variant={active === k ? "soft" : "bordered"} color={active === k ? "primary" : "default"} aria-pressed={active === k}
          className={active === k ? "" : "fathom-react"} startContent={icon} onPress={() => onChange(k)}>{n} {label}</Button>
      ))}
    </div>
  );
}

const COMMENTS = [
  ["Mr. Hollis", "1 Day ago", "Before you start typing, make sure you know what you want to say. I will often take a walk, think it over, and only then open a blank page and start to write the first lines."],
  ["Mrs. Anderson", "1 Day ago", "Thank you for sharing this with us."],
] as const;

function CommentsPanel({ id }: { id: string }) {
  const [text, setText] = useState("");
  return (
    <div id={id} className="grid gap-2 p-7.5 pt-0 lg:gap-5">
      {COMMENTS.map(([n, t, body], i) => (
        <div key={n} className="flex items-start gap-2.5">
          <Avatar name={n} src={avatarUrl(3 + i)} size={50} className="mt-1" />
          <div className="grid grow gap-2.5">
            <div className="flex justify-between">
              <div className="flex gap-1.5"><Link href="/public-profile/profiles/feeds" className="text-base font-medium" style={{ color: "var(--app-fg-strong)" }}>{n}</Link><span className="text-sm fathom-sec">{t}</span></div>
              <FooterLink href="/public-profile/profiles/feeds">Reply</FooterLink>
            </div>
            <p className="text-sm leading-5" style={{ color: "var(--app-fg)" }}>{body}</p>
          </div>
        </div>
      ))}
      <div className="flex gap-2.5">
        <Avatar name="Me" src={avatarUrl(3)} size={40} />
        <div className="w-full"><TextField aria-label="Add a comment" placeholder="your comment.." value={text} onChange={setText} endIcon={<ImageIcon size={16} aria-hidden />} /></div>
      </div>
    </div>
  );
}

function LikesPanel({ id }: { id: string }) {
  const rows = [["Adam Wilson", 2, true], ["Renee Branson", 6, false], ["Jonathan Taylor", 13, true], ["Lilia Mattox", 4, false], ["Neil Roberts", 23, false]] as const;
  return (
    <div id={id} className="mb-5 flex flex-col gap-2 px-7.5 pt-3.5 lg:gap-5">
      {rows.map(([n, c, on], i) => (
        <div key={n} className="flex flex-wrap gap-2">
          <div className="flex grow gap-2.5">
            <Avatar name={n} src={avatarUrl(14 + i)} size={40} />
            <div className="flex flex-col"><Link href="/public-profile/profiles/feeds" className="mb-px text-base font-medium" style={{ color: "var(--app-fg-strong)" }}>{n}</Link><span className="text-sm fathom-sec">{c} mutual subscribers</span></div>
          </div>
          {on ? <Button color="primary" startContent={<PersonStanding size={16} />}>Connected</Button> : <Button variant="bordered" startContent={<CircleCheck size={16} />}>Connect</Button>}
        </div>
      ))}
    </div>
  );
}

function SavesPanel({ id }: { id: string }) {
  return (
    <div id={id} className="p-7.5 pt-5 text-center">
      <div className="mx-auto -mt-4 h-[112px]" aria-hidden><svg viewBox="0 0 120 112" height="112" width="120"><rect x="24" y="30" width="72" height="62" rx="10" fill="none" stroke="var(--oks-color-primary-500)" strokeWidth="2" /><path d="M42 30v-8a18 18 0 0 1 36 0v8" fill="none" stroke="var(--oks-color-primary-500)" strokeWidth="2" /><circle cx="60" cy="58" r="7" fill="var(--oks-color-primary-500)" /></svg></div>
      <div className="my-2 text-center text-xl font-medium" style={{ color: "var(--app-fg-strong)" }}>Access Restricted for this Option</div>
      <span className="mb-7.5 block text-sm fathom-sec">You may lack the access rights needed for this<br />to access this option in this page</span>
      <div className="flex justify-center"><Button variant="bordered">Request Access</Button></div>
    </div>
  );
}

function Post({ n, avatar, name, when, text, media, counts, start }: {
  n: number; avatar?: number; name: string; when: string; text: string; media?: "mosaic" | "video"; counts: [string, string, string]; start: Panel;
}) {
  const [panel, setPanel] = useState<Panel>(start);
  return (
    <Surface>
      <div className="mb-5 flex justify-between p-7.5 pb-0">
        <div className="flex gap-3">
          <Avatar name={name} src={avatar ? avatarUrl(avatar) : undefined} size={36} />
          <div className="flex flex-col">
            <Link href="/public-profile/profiles/feeds" className="mb-1 text-base font-medium" style={{ color: "var(--app-fg-strong)" }}>{name}</Link>
            <time className="text-sm fathom-sec">{when}</time>
          </div>
        </div>
        <MoreMenu />
      </div>
      <div className={`grid gap-5 px-7.5 ${media === "video" ? "" : "mb-5"}`}>
        <p className="text-sm leading-5.5" style={{ color: "var(--app-fg)" }}>{text}</p>
        {media === "mosaic" && (
          <div className="grid grid-cols-2 gap-2.5 xl:gap-7.5">
            <ArtImage seed={n * 3} width="100%" height={340} className="rounded-xl" />
            <div className="grid grid-rows-2 gap-2.5 xl:gap-7.5">
              <ArtImage seed={n * 3 + 1} width="100%" height="100%" className="rounded-xl" />
              <ArtImage seed={n * 3 + 2} width="100%" height="100%" className="rounded-xl" />
            </div>
          </div>
        )}
      </div>
      {media === "video" && (
        <div className="p-7.5 pb-5">
          <div className="relative flex min-h-[400px] w-full items-center justify-center overflow-hidden rounded-xl" role="img" aria-label="Video preview" style={{ background: "linear-gradient(135deg, color-mix(in srgb, var(--oks-color-primary-500) 35%, var(--app-surface-2)), color-mix(in srgb, var(--oks-color-info-400) 25%, var(--app-surface-2)))" }}>
            <span className="grid size-16 place-items-center rounded-full" style={{ background: "var(--app-surface)", color: "var(--app-fg-strong)" }}><Play size={26} fill="currentColor" /></span>
          </div>
        </div>
      )}
      <div>
        <Reactions counts={counts} active={panel} onChange={setPanel} />
        {panel === "comments" && <CommentsPanel id={`post_${n}_comments`} />}
        {panel === "likes" && <LikesPanel id={`post_${n}_likes`} />}
        {panel === "saves" && <SavesPanel id={`post_${n}_saves`} />}
        {panel === "likes" && <div className="flex min-h-14 items-center border-t px-5" style={{ borderColor: "var(--app-border)" }}><FooterLink href="/public-profile/profiles/feeds">Show more Likes</FooterLink></div>}
      </div>
    </Surface>
  );
}

export function FeedsProfile() {
  return (
    <ProfileFrame title="Feeds" crumbs={["Public Profile", "Profiles", "More", "Feeds"]} who={WHO}>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-7.5">
        <div className="col-span-1">
          <div className="grid gap-5 lg:gap-7.5">
            <Surface><SurfaceBody className="p-5"><div className="flex flex-wrap gap-2 py-1"><BigStat value="5.3k" label="Connections" /><span className="border-s sm:ms-8 sm:ps-8" style={{ borderColor: "var(--app-border)" }} /><BigStat value="28.9k" label="Uploads" /></div></SurfaceBody></Surface>
            <CardWithFooter title="Profile">
              <p className="mb-4 text-sm leading-5.5" style={{ color: "var(--app-fg)" }}>Publisher and editor with a passion for plain language and a commitment to clear, honest work every week.</p>
              <div className="grid gap-y-5">
                {([[Luggage, "Holloway Press"], [Crown, "Author"], [Briefcase, "Editor"], [Mail, "mira@holloway.example"], [Volleyball, "https://holloway.example"], [AtSign, "hollowaypress"], [AtSign, "holloway_co"]] as const).map(([I, t]) => (
                  <div key={t} className="flex gap-2.5"><I size={16} className="fathom-muted" aria-hidden /><Link href="/public-profile/profiles/feeds" className="text-sm leading-none" style={{ color: "var(--app-fg-strong)" }}>{t}</Link></div>
                ))}
              </div>
            </CardWithFooter>
            <CardWithFooter title="Open to work" footer={<FooterLink href="/public-profile/works">View details</FooterLink>}>
              <p className="text-sm leading-5.5" style={{ color: "var(--app-fg)" }}>Experienced editor seeking new opportunities with small teams and independent publishers.</p>
            </CardWithFooter>
            <CardWithFooter title="Skills"><SkillChips skills={["Long-form", "Editing", "Research", "Newsletters", "Interviews", "AI", "noCode", "Management"]} /></CardWithFooter>
          </div>
        </div>

        <div className="col-span-2">
          <div className="flex flex-col gap-5 lg:gap-7.5">
            <Post n={1} avatar={1} name="Mira Holloway" when="Yesterday at 5:06 PM" media="mosaic" start="comments" counts={["2", "47k", "900"]}
              text="Good writing starts long before the first sentence. Spend an hour with your notes, decide what the reader should walk away with, then cut everything that does not serve that. The draft that remains is shorter, clearer and far easier to finish on a busy afternoon, and readers can feel the difference every single time they open the page." />
            <Post n={2} avatar={1} name="Mira Holloway" when="2 days ago" start="saves" counts={["2", "24", "16"]}
              text="I can hear the objections already. But I have to write for a company that sells cardboard boxes. Fine, then be the best voice in that field." />
            <Post n={3} name="Finance Desk - Annual Report" when="1 week ago" media="video" start="likes" counts={["27", "47k", "900"]}
              text="You also need to accept that not every post is going to get your motor running. Some will feel like chores. Write them anyway, keep them short, and save your best energy for the pieces that matter most to the people reading them." />
            <Post n={4} avatar={1} name="Mira Holloway" when="Week ago" start="comments" counts={["2", "47k", "900"]}
              text="This does not mean that all writers are insincere. On the contrary, many writers have a natural curiosity about the world and a wish to explain it, and that curiosity is exactly what makes a post worth reading to the very end of the page." />
            <div className="flex"><FooterLink href="/public-profile/profiles/feeds">Show more posts</FooterLink></div>
          </div>
        </div>
      </div>
    </ProfileFrame>
  );
}
