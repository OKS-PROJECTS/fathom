"use client";

import Link from "next/link";
import { useState } from "react";
import { Button, SwitchField } from "oks-ui";
import { LogOut, Plug, SquareDashedMousePointer } from "lucide-react";
import { Surface, SurfaceFooter } from "@/components/ui/Surface";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { PageActions } from "@/components/profile/ProfileShell";
import { FaqCard } from "./Faq";
import { HelpCards } from "./HelpCards";
import { StarterArt, StarterCard } from "./StarterPage";

const APPS: [string, string, number, boolean][] = [
  ["Trackline", "Plan sprints and follow every issue and task across your team.", 215, true],
  ["Emberfire", "Keeps health apps compatible with common record standards.", 25, false],
  ["Notekeep", "Collects notes, documents and checklists for work and home.", 150, true],
  ["Branchyard", "Code hosting, project tracking and release tools in one place.", 28, false],
  ["Webcraft Lab", "Build fast, accessible web experiences with these tools.", 270, true],
  ["Mockframe", "Prototype and hand off designs with a shared workspace.", 330, false],
  ["Lingua Loop", "Short daily exercises that make learning a language stick.", 100, true],
  ["Pulse Metrics", "Live views of site traffic and campaign performance.", 55, false],
];

function Mark({ name, hue }: { name: string; hue: number }) {
  return <div className="flex size-11 items-center justify-center rounded-xl text-base font-semibold text-white" style={{ background: `oklch(62% .16 ${hue})` }} aria-hidden>{name.slice(0, 1)}</div>;
}
function App({ name, text, hue, on }: { name: string; text: string; hue: number; on: boolean }) {
  const [v, setV] = useState(on);
  return (
    <Surface>
      <div className="grow p-5 lg:p-7.5">
        <div className="mb-3 flex justify-between lg:mb-5"><Mark name={name} hue={hue} /><Button variant="bordered" isIconOnly aria-label={`Open ${name}`} size="sm"><LogOut size={16} /></Button></div>
        <div className="flex flex-col gap-1 lg:gap-2.5"><Link href="#" className="text-base font-medium" style={{ color: "var(--app-fg-strong)" }}>{name}</Link><span className="text-sm fathom-sec">{text}</span></div>
      </div>
      <SurfaceFooter className="justify-between py-3.5"><Button variant="bordered" startContent={<SquareDashedMousePointer size={16} />}>Connect</Button><div className="flex gap-2.5"><SwitchField aria-label={`${name} enabled`} size="sm" checked={v} onChange={setV} /></div></SurfaceFooter>
    </Surface>
  );
}

export function IntegrationsPage() {
  return (
    <>
      <PageHeader title="Integrations" crumbs={["My Account", "Integrations"]} actions={<PageActions />} />
      <Container>
        <div className="grid gap-5 lg:gap-7.5">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-7.5 xl:grid-cols-3">
            {APPS.map(([n, t, h, on]) => <App key={n} name={n} text={t} hue={h} on={on} />)}
          </div>
          <StarterCard headline="Add New Integration" lines={["Discover more integrations and widen your toolkit with fresh,", "easy-to-use options built for efficient, creative project work."]} action="Start Now" href="/network/user-cards/mini-cards" art={<StarterArt><Plug size={72} strokeWidth={1.5} /></StarterArt>} />
          <FaqCard />
          <HelpCards />
        </div>
      </Container>
    </>
  );
}
