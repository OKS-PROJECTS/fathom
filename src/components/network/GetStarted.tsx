"use client";

import Link from "next/link";
import { Fragment } from "react";
import { BadgeInfo, CalendarCheck, ChartPie, KeyRound, SquareUser, type LucideIcon } from "lucide-react";
import { Surface } from "@/components/ui/Surface";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { PageActions } from "@/components/profile/ProfileShell";

const TEXT = "An Overview of Our Security Features and Policies in One Place.";
const SIX = [["Contacts", "/network/user-table/team-crew"], ["Employee", "/network/user-table/app-roster"], ["Vendors", "/network/user-table/market-authors"], ["Companies", "/network/user-table/saas-users"], ["Service Agents", "/network/user-table/store-clients"], ["Applicants", "/network/user-table/visitors"]];
const GROUPS: [LucideIcon, string, string[][]][] = [
  [SquareUser, "User Cards", [["Mini Cards", "/network/user-cards/mini-cards"], ["Team Members", "/network/user-cards/team-crew"], ["Author", "/network/user-cards/author"], ["Collector", "/network/user-cards/collector"], ["Social", "/network/user-cards/social"]]],
  [BadgeInfo, "User Base", [["Team Crew", "/network/user-table/team-crew"], ["App Roster", "/network/user-table/app-roster"], ["Visitor", "/network/user-table/visitors"], ["Authors", "/network/user-table/market-authors"], ["SaaS Users", "/network/user-table/saas-users"], ["Store Clients", "/network/user-table/store-clients"]]],
  [KeyRound, "Cooperators", SIX],
  [ChartPie, "Community Engagement", SIX],
  [CalendarCheck, "Donors", SIX],
];

export function NetworkGetStartedPage() {
  return (
    <>
      <PageHeader title="Get Started" crumbs={["Network", "Get Started"]} actions={<PageActions />} />
      <Container>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-7.5 xl:grid-cols-3">
          {GROUPS.map(([Icon, title, links]) => (
            <Surface key={title} className="flex-col p-5 lg:px-7 lg:py-6">
              <div className="flex flex-col gap-2.5 pb-1.5">
                <Icon size={24} style={{ color: "var(--app-primary)" }} aria-hidden />
                <div className="flex flex-col gap-3">
                  <h3 className="text-base font-medium leading-none" style={{ color: "var(--app-fg-strong)" }}>{title}</h3>
                  <div className="text-sm leading-5 fathom-sec">{TEXT}</div>
                </div>
                <div className="flex flex-wrap">
                  {links.map(([l, h], i) => (
                    <Fragment key={l}>
                      <Link href={h} className="mb-1 text-sm font-medium" style={{ color: "var(--app-primary)" }}>{l}</Link>
                      {i < links.length - 1 && <span className="mx-2 mb-1 h-3.5 border-s" style={{ borderColor: "var(--app-border-input)" }} />}
                    </Fragment>
                  ))}
                </div>
              </div>
            </Surface>
          ))}
        </div>
      </Container>
    </>
  );
}
