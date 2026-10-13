"use client";

import Link from "next/link";
import { Button, Chip } from "oks-ui";
import { ChartLine, Globe, Mail, MapPin, MapPinHouse, Milk, Phone, Rocket, AtSign, Zap } from "lucide-react";
import { Surface, SurfaceBody } from "@/components/ui/Surface";
import { ArtImage, CardWithFooter, DonutCard, FollowCard, FooterLink, InlineLink, ProjectsCard, SkillChips } from "./parts";
import { ProfileFrame, type ProfileIdentity } from "./ProfileShell";

const WHO: ProfileIdentity = { name: "Northwind Labs", org: "Public Company", place: "Rotterdam, NL", email: "info@northwind.example", seed: "nw", logo: true, orgIcon: "luggage", ring: "success" };

const KPIS = [["624", "Employees"], ["60.7M", "Users"], ["369M", "Revenue"], ["27", "Company Rank"]];
const HIGHLIGHTS: [string, React.ReactNode][] = [
  ["Locations:", "79"], ["Founded:", "2011"], ["Status:", <Chip key="s" size="sm" color="success" variant="soft" radius="md">Subscribed</Chip>],
  ["Area:", "Worldwide"], ["CEO:", <InlineLink key="c" href="/public-profile/profiles/company">Ingrid Dunmore</InlineLink>], ["Sector:", "Logistics Software"],
];
const JOBS = [[ChartLine, "Data Science", "Senior Data Analyst", "$80,000 - $110,000"], [Rocket, "Exploration", "Route Mapping Lead", "$45,000 - $60,000"], [Milk, "Operations", "Cold Chain Planner", "$40,000 - $55,000"], [Zap, "Field Systems", "Dispatch Engineer", "$55,000 - $75,000"]] as const;
const PRODUCTS = ["Freight Lite", "Freight Pro", "Route Kit", "Dock Planner", "Yard View", "Tender Desk", "Customs Pilot", "Fleet Pulse", "Load Match", "Warehouse Lens", "Pallet Track", "Carrier Hub"];
const LOCATIONS = [["Rotterdam Hub", "456 Harbour Street, Floor 6, Rotterdam 3011"], ["Lisbon Lab", "789 Atlantic Lane, 3rd Floor, Lisbon 1200"], ["Austin Studio", "246 Congress Road, Suite 12, Austin TX 78701"], ["Osaka Office", "12 Umeda Avenue, Floor 9, Osaka 530"], ["Leeds Depot", "88 Canal Wharf, Unit 4, Leeds LS1"]];

function MapArt() {
  return (
    <div className="relative min-h-[210px] w-full overflow-hidden rounded-xl md:w-80" style={{ background: "color-mix(in srgb, var(--oks-color-info-500) 8%, var(--app-surface-2))", border: "1px solid var(--app-border)" }} role="img" aria-label="Map of the headquarters">
      <svg viewBox="0 0 320 208" className="absolute inset-0 size-full" aria-hidden preserveAspectRatio="xMidYMid slice">
        <g stroke="var(--app-border-strong)" strokeWidth="6" strokeLinecap="round" fill="none" opacity=".7">
          <path d="M-10 60 C80 70 140 40 330 80" /><path d="M-10 150 C90 120 200 170 330 130" /><path d="M70 -10 C60 70 110 140 90 220" /><path d="M220 -10 C230 60 190 140 240 220" />
        </g>
        <g stroke="var(--app-border)" strokeWidth="2.5" fill="none"><path d="M0 105 H320" /><path d="M155 0 V208" /><path d="M0 30 L320 190" /></g>
        <path d="M0 175 C60 150 110 190 180 176 S280 150 320 168 V208 H0Z" fill="var(--oks-color-info-400)" fillOpacity=".25" />
      </svg>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full" style={{ color: "var(--oks-color-success-500)" }}><MapPin size={30} fill="currentColor" fillOpacity={0.25} /></div>
      <div className="absolute left-2 top-2 flex flex-col overflow-hidden rounded-md" style={{ background: "var(--app-surface)", border: "1px solid var(--app-border-input)" }}>
        <button type="button" className="px-2 py-0.5 text-base leading-none fathom-muted" aria-label="Zoom in" disabled>+</button>
        <button type="button" className="px-2 py-0.5 text-base leading-none" aria-label="Zoom out" style={{ color: "var(--app-fg)" }}>&minus;</button>
      </div>
    </div>
  );
}

const ICON_ROW = ({ icon: Icon, children }: { icon: typeof Mail; children: React.ReactNode }) => (
  <div className="flex gap-2.5"><span><Icon size={18} className="fathom-muted" aria-hidden /></span>{children}</div>
);

export function CompanyProfile() {
  return (
    <ProfileFrame title="Company" crumbs={["Public Profile", "Profiles", "Company"]} who={WHO}>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-7.5">
        <div className="col-span-1 lg:col-span-3">
          <Surface>
            <SurfaceBody className="p-5">
              <div className="flex gap-2 py-1.5 lg:px-10">
                {KPIS.map(([v, l], i) => (
                  <div key={l} className="contents">
                    <div className="grid flex-1 grid-cols-1 place-content-center gap-1 text-center">
                      <span className="text-2xl font-semibold leading-none" style={{ color: "var(--app-fg-strong)" }}>{v}</span>
                      <span className="text-sm fathom-sec">{l}</span>
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
            <CardWithFooter title="Highlights" bodyClass="p-5 py-3.5">
              <table className="w-full text-sm"><tbody>
                {HIGHLIGHTS.map(([a, b]) => (
                  <tr key={a}>
                    <td className="py-2 pe-4 align-middle fathom-sec lg:pe-10">{a}</td>
                    <td className="py-2 align-middle" style={{ color: "var(--app-fg-strong)" }}>{b}</td>
                  </tr>
                ))}
              </tbody></table>
            </CardWithFooter>

            <CardWithFooter title="Open Jobs" footer={<FooterLink href="/public-profile/works">View &amp; Apply</FooterLink>}>
              <div className="grid gap-5">
                {JOBS.map(([Icon, a, b, c]) => (
                  <div key={a} className="flex items-start gap-3.5">
                    <div className="flex h-[1.875rem] w-[1.875rem] items-center justify-center rounded-lg border" style={{ background: "color-mix(in srgb, var(--app-surface-2) 60%, transparent)", borderColor: "var(--app-border-input)" }}>
                      <Icon size={16} className="fathom-sec" aria-hidden />
                    </div>
                    <div className="flex flex-col">
                      <Link href="/public-profile/profiles/company" className="mb-1 text-sm font-semibold leading-none" style={{ color: "var(--app-primary)" }}>{a}</Link>
                      <span className="text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>{b}</span>
                      <span className="text-xs fathom-sec">{c}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardWithFooter>

            <CardWithFooter title="Network" bodyClass="p-5 pt-4">
              <div className="mb-1 grid gap-4">
                {([[Globe, "https://northwind.example"], [Mail, "info@northwind.example"], [AtSign, "northwind"], [AtSign, "northwind-news"], [AtSign, "northwind-guides"]] as const).map(([I, t]) => (
                  <ICON_ROW key={t} icon={I}><Link href="/public-profile/profiles/company" className="text-sm" style={{ color: "var(--app-fg-strong)" }}>{t}</Link></ICON_ROW>
                ))}
              </div>
            </CardWithFooter>

            <CardWithFooter title="Tags">
              <SkillChips skills={["Web Design", "Code Review", "Figma", "Product Development", "Webflow", "AI", "noCode", "Management"]} />
            </CardWithFooter>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-2">
          <div className="flex flex-col gap-5 lg:gap-7.5">
            <CardWithFooter title="Company Profile">
              <h3 className="mb-5 text-base font-semibold leading-none" style={{ color: "var(--app-fg-strong)" }}>Headquarter</h3>
              <div className="mb-10 flex flex-wrap gap-5">
                <MapArt />
                <div className="flex flex-col gap-2.5">
                  <ICON_ROW icon={Globe}><Link href="https://northwind.example" className="text-sm font-medium" style={{ color: "var(--app-primary)" }}>https://northwind.example</Link></ICON_ROW>
                  <ICON_ROW icon={AtSign}><Link href="/public-profile/profiles/company" className="text-sm font-medium" style={{ color: "var(--app-primary)" }}>northwind</Link></ICON_ROW>
                  <ICON_ROW icon={AtSign}><Link href="/public-profile/profiles/company" className="text-sm font-medium" style={{ color: "var(--app-primary)" }}>northwind-guides</Link></ICON_ROW>
                  <ICON_ROW icon={Phone}><span className="text-sm" style={{ color: "var(--app-fg-strong)" }}>(31) 6-1235-4567</span></ICON_ROW>
                  <ICON_ROW icon={MapPinHouse}><span className="text-sm" style={{ color: "var(--app-fg-strong)" }}>Wijnhaven 61, 3011 WJ Rotterdam, NL</span></ICON_ROW>
                </div>
              </div>
              <div className="mb-7 grid gap-2.5">
                <div className="text-base font-semibold" style={{ color: "var(--app-fg-strong)" }}>About</div>
                <p className="text-sm leading-5.5" style={{ color: "var(--app-fg)" }}>
                  Northwind Labs builds planning and tracking software for freight forwarders, warehouses and the carriers that connect them. We started in a single harbour office and now run teams across four continents, with one aim: make moving goods feel predictable. Our products cover quoting, dock scheduling, yard visibility and customs paperwork, and they share one data model so a change in one place shows up everywhere. We publish our roadmap openly and review it with customers every quarter.
                </p>
              </div>
              <div className="mb-2.5 flex flex-col gap-4">
                <div className="text-base font-semibold" style={{ color: "var(--app-fg-strong)" }}>Products</div>
                <div className="flex flex-wrap gap-2.5">
                  {PRODUCTS.map((p) => <Chip key={p} size="sm" variant="bordered" radius="md">{p}</Chip>)}
                </div>
              </div>
            </CardWithFooter>

            <CardWithFooter title="Locations" toolbar={<Button color="success" startContent={<MapPin size={16} />}>Offer Location</Button>} bodyClass="p-5 lg:p-7.5 lg:pb-7">
              <div className="fathom-xscroll flex gap-5">
                {LOCATIONS.map(([t, a], i) => (
                  <Surface key={t} className="mb-4 w-[280px] shrink-0 !border-0 !shadow-none">
                    <ArtImage seed={i + 20} width={280} height={186} className="rounded-t-xl" />
                    <div className="h-full px-3.5 pb-3.5 pt-3" style={{ border: "1px solid var(--app-border)", borderTop: 0, borderRadius: "0 0 12px 12px" }}>
                      <Link href="/public-profile/profiles/company" className="mb-2 block text-base font-medium" style={{ color: "var(--app-fg-strong)" }}>{t}</Link>
                      <p className="text-sm fathom-sec">{a}</p>
                    </div>
                  </Surface>
                ))}
              </div>
            </CardWithFooter>

            <ProjectsCard />

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-7.5">
              <FollowCard title="Members" rows={[["Tyler Okafor", 6, false], ["Esther Linde", 29, true], ["Cody Marlowe", 34, false], ["Arlene Brandt", 1, true]]} footer={<FooterLink href="/public-profile/network">All Contributors</FooterLink>} />
              <DonutCard title="Investments" data={[{ k: "Fleet", v: 32 }, { k: "Cloud", v: 26 }, { k: "Hubs", v: 18 }, { k: "People", v: 14 }, { k: "Brand", v: 10 }]} />
            </div>
          </div>
        </div>
      </div>
    </ProfileFrame>
  );
}
