"use client";

import Link from "next/link";
import { Avatar, Chart } from "oks-ui";
import { Messages, Truck, Volleyball, Zap } from "./icons";
import { Surface, SurfaceBody, SurfaceFooter } from "@/components/ui/Surface";
import { CardWithFooter, CompanyMark, FileGlyph, FooterLink, HexBadge, MoreMenu, ProjectsCard, SkillChips } from "./parts";
import { ProfileFrame } from "./ProfileShell";
import { avatarUrl } from "@/lib/avatar";

const ABOUT: [string, string][] = [
  ["Age:", "32"], ["City:", "Lisbon"], ["State:", "Estremadura"], ["Country:", "Portugal"],
  ["Postcode:", "1100-148"], ["Phone:", "+351 912 345 678"], ["Email:", "amara@alder.example"],
];
const JOBS = [
  { org: "Quartz Studio", role: "Senior Project Manager", span: "2019 - Present" },
  { org: "Pinecrest", role: "Product Lead", span: "2012 - 2019" },
  { org: "Lattice Co", role: "UX Research", span: "2010 - 2012" },
];
const FILES = [
  { n: "Project-pitch.pdf", m: "4.7 MB  26 Sep 2025  3:20 PM", k: "pdf" },
  { n: "Report-v1.docx", m: "2.3 MB  1 Oct 2025  12:00 PM", k: "doc" },
  { n: "Framework-App.js", m: "0.8 MB  17 Oct 2025  6:46 PM", k: "code" },
  { n: "Mobile-logo.ai", m: "0.2 MB  4 Nov 2025  11:30 AM", k: "image" },
] as const;
const CONTRIB = [["Tyler Okafor", 6, 3], ["Esther Linde", 29, 1], ["Cody Marlowe", 34, 14], ["Arlene Brandt", 1, 7]] as const;

const MEDIA = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((m, i) => ({ m, v: [65, 42, 58, 30, 52, 70, 38, 62, 80, 55, 74, 60][i] }));
const SPLIT_ROLES = ["primary", "warning", "success", "danger", "info"] as const;
const SPLIT = [{ k: "Design", v: 32 }, { k: "Dev", v: 26 }, { k: "Ops", v: 18 }, { k: "Sales", v: 14 }, { k: "Support", v: 10 }];

export function DefaultProfile() {
  return (
    <ProfileFrame title="Default" crumbs={["Public Profile", "Profiles", "Default"]}>
      <div className="grid grid-cols-1 gap-5 lg:gap-7.5 xl:grid-cols-3">
        <div className="col-span-1">
          <div className="grid gap-5 lg:gap-7.5">
            <CardWithFooter title="Community Badges" bodyClass="p-5 pb-7.5">
              <div className="flex flex-wrap gap-3 lg:gap-4">
                <HexBadge tone="primary"><Volleyball size={20} /></HexBadge>
                <HexBadge tone="warning"><Zap size={20} /></HexBadge>
                <HexBadge tone="success"><Messages size={20} /></HexBadge>
                <HexBadge tone="secondary"><Truck size={20} /></HexBadge>
              </div>
            </CardWithFooter>

            <CardWithFooter title="About">
              <table className="w-full text-sm">
                <tbody>
                  {ABOUT.map(([a, b]) => (
                    <tr key={a}>
                      <td className="py-2 pe-4 align-middle fathom-sec">{a}</td>
                      <td className="py-2 align-middle" style={{ color: "var(--app-fg-strong)" }}>{b}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardWithFooter>

            <CardWithFooter title="Work Experience" footer={<FooterLink href="/public-profile/works">Open to Work</FooterLink>}>
              <div className="grid gap-y-5">
                {JOBS.map((j, i) => (
                  <div key={j.org} className="grid gap-y-5">
                    {i === 1 && <div className="text-sm font-semibold leading-none fathom-sec">Previous Jobs</div>}
                    <div className="flex items-start gap-3.5">
                      <CompanyMark name={j.org} />
                      <div className="flex flex-col gap-1">
                        <Link href="/public-profile/profiles/default" className="text-sm font-medium leading-none" style={{ color: "var(--app-primary)" }}>{j.org}</Link>
                        <span className="text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>{j.role}</span>
                        <span className="text-xs leading-none fathom-sec">{j.span}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardWithFooter>

            <CardWithFooter title="Skills">
              <SkillChips skills={["Web Design", "Code Review", "Figma", "Product Development", "Webflow", "AI", "noCode", "Management"]} />
            </CardWithFooter>

            <CardWithFooter title="Recent Uploads" toolbar={<MoreMenu />} footer={<FooterLink href="/account/integrations">All Files</FooterLink>}>
              <div className="grid gap-2.5 lg:gap-5">
                {FILES.map((f) => (
                  <div key={f.n} className="flex gap-3">
                    <div className="flex grow gap-2.5">
                      <FileGlyph kind={f.k} />
                      <div className="flex flex-col">
                        <span className="mb-px text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>{f.n}</span>
                        <span className="text-xs fathom-sec">{f.m}</span>
                      </div>
                    </div>
                    <MoreMenu />
                  </div>
                ))}
              </div>
            </CardWithFooter>
          </div>
        </div>

        <div className="col-span-2">
          <div className="flex flex-col gap-5 lg:gap-7.5">
            <Surface>
              <SurfaceBody className="px-10 py-7.5 lg:pe-12.5">
                <div className="flex flex-wrap gap-6 md:flex-nowrap md:gap-10">
                  <div className="flex flex-col gap-3">
                    <h2 className="text-xl font-semibold" style={{ color: "var(--app-fg-strong)" }}>Open the door to<br />joint publishing projects</h2>
                    <p className="text-sm leading-5.5 fathom-sec">
                      Explore collaboration openings across our publication. We welcome partnerships, guest posts, and shared research with teams that care about craft.
                    </p>
                  </div>
                  <svg viewBox="0 0 220 140" width="251" height="160" className="max-h-[160px] shrink-0" aria-hidden>
                    <rect x="30" y="34" width="150" height="86" rx="10" fill="none" stroke="var(--oks-color-primary-500)" strokeWidth="2" />
                    <rect x="46" y="52" width="72" height="8" rx="4" fill="var(--oks-color-primary-300)" />
                    <rect x="46" y="68" width="104" height="6" rx="3" fill="var(--app-border-strong)" />
                    <rect x="46" y="82" width="88" height="6" rx="3" fill="var(--app-border-strong)" />
                    <circle cx="176" cy="40" r="24" fill="var(--oks-color-primary-500)" fillOpacity=".14" stroke="var(--oks-color-primary-500)" strokeWidth="2" />
                    <path d="M166 40h20M176 30v20" stroke="var(--oks-color-primary-500)" strokeWidth="2.4" strokeLinecap="round" />
                  </svg>
                </div>
              </SurfaceBody>
              <SurfaceFooter className="items-center justify-center"><FooterLink href="/network/get-started">Get Started</FooterLink></SurfaceFooter>
            </Surface>

            <CardWithFooter title="Media Uploads" toolbar={<MoreMenu />} bodyClass="px-3 py-1">
              <Chart type="area" data={MEDIA} x="m" series={[{ key: "v", name: "Uploads", color: "var(--oks-color-primary-500)" }]}
                height={265} unstyled legend={false} dataFormat={{ prefix: "$", suffix: "K" }}
                line={{ curve: "smooth", strokeWidth: 3, markers: { show: false }, area: { show: true, fill: { opacity: 0.25 } } }}
                axis={{ y: { clampMinZero: true } }} axisY={{ tickCount: 6 }} grid={{ horizontal: true, vertical: false, dasharray: "4 4" }} />
            </CardWithFooter>

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-7.5">
              <CardWithFooter title="Contributors" toolbar={<MoreMenu />} footer={<FooterLink href="/public-profile/network">All Contributors</FooterLink>}>
                <div className="flex flex-col gap-2 lg:gap-5">
                  {CONTRIB.map(([n, c], i) => (
                    <div key={n} className="flex gap-2">
                      <div className="flex grow gap-2.5">
                        <Avatar name={n} src={avatarUrl(40 + i)} size={36} />
                        <div className="flex flex-col">
                          <Link href="/public-profile/profiles/default" className="mb-px text-sm font-semibold" style={{ color: "var(--app-fg-strong)" }}>{n}</Link>
                          <span className="text-xs font-semibold fathom-sec">{c} contributors</span>
                        </div>
                      </div>
                      <MoreMenu />
                    </div>
                  ))}
                </div>
              </CardWithFooter>
              <CardWithFooter title="Assistance" toolbar={<MoreMenu />} bodyClass="flex items-center gap-4 px-3 py-1">
                <div className="min-w-0 flex-1">
                  <Chart type="donut" data={SPLIT} x="k" series={[{ key: "v", name: "Share" }]} height={230} unstyled
                    legend={false} pie={{ center: false }} palette={{ roles: SPLIT_ROLES as never }} />
                </div>
                <ul className="flex shrink-0 flex-col gap-2 pe-3 text-sm" style={{ color: "var(--app-fg)" }}>
                  {SPLIT.map((d, i) => (
                    <li key={d.k} className="flex items-center gap-2">
                      <span className="size-2.5 rounded-full" style={{ background: `var(--oks-color-${SPLIT_ROLES[i]}-500)` }} />{d.k}
                    </li>
                  ))}
                </ul>
              </CardWithFooter>
            </div>

            <ProjectsCard />
          </div>
        </div>
      </div>
    </ProfileFrame>
  );
}
