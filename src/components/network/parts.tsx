"use client";

import { Button, SelectField, TextField } from "oks-ui";
import { Search, Settings2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { PageActions } from "@/components/profile/ProfileShell";
import { FooterLink } from "@/components/profile/parts";

/** The select / filter / search controls on their own, for pages that add more beside them. */
export function CardsToolbarParts({ placeholder = "Type name, team", selects = ["Active", "Latest"] }: { placeholder?: string; selects?: string[] }) {
  return (
    <>
      {selects.map((s) => (
        <div key={s} className="w-28"><SelectField aria-label={s} defaultValue={s} options={[{ label: s, value: s }]} /></div>
      ))}
      <Button color="primary" startContent={<Settings2 size={16} />}>Filters</Button>
      <div className="w-40"><TextField aria-label="Search" placeholder={placeholder} startIcon={<Search size={16} />} /></div>
    </>
  );
}

/** "Showing N Users" bar with two selects, a filters button and a search box. */
export function CardsToolbar({ count, noun = "Users", placeholder = "Type name, team", selects = ["Active", "Latest"] }: { count: number; noun?: string; placeholder?: string; selects?: [string, string] | string[] }) {
  return (
    <div className="mb-7.5 flex flex-wrap justify-between gap-2.5">
      <h3 className="text-base font-medium" style={{ color: "var(--app-fg-strong)" }}>Showing {count} {noun}</h3>
      <div className="flex flex-wrap gap-2.5">
        {selects.map((s) => (
          <div key={s} className="w-28"><SelectField aria-label={s} defaultValue={s} options={[{ label: s, value: s }]} /></div>
        ))}
        <Button color="primary" startContent={<Settings2 size={16} />}>Filters</Button>
        <div className="w-40"><TextField aria-label="Search" placeholder={placeholder} startIcon={<Search size={16} />} /></div>
      </div>
    </div>
  );
}

export const ShowMore = ({ children }: { children: string }) => (
  <div className="flex grow justify-center pt-5 lg:pt-7.5"><FooterLink href="#">{children}</FooterLink></div>
);

export function NetworkFrame({ title, crumbs, children }: { title: string; crumbs: string[]; children: React.ReactNode }) {
  return (
    <>
      <PageHeader title={title} crumbs={crumbs} actions={<PageActions />} />
      <Container>{children}</Container>
    </>
  );
}

export const TONES = [
  ["--oks-color-primary-500", "primary"], ["--oks-color-success-500", "success"], ["--oks-color-danger-500", "danger"], ["--oks-color-warning-500", "warning"], ["--oks-color-info-500", "info"],
] as const;
