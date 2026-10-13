"use client";

import Link from "next/link";
import { Button } from "oks-ui";
import { Surface, SurfaceBody } from "@/components/ui/Surface";

/** Original abstract illustration: stacked depth rings. */
function Rings() {
  return (
    <svg viewBox="0 0 240 150" height="180" width="288" aria-hidden className="max-h-[180px]">
      {[0, 1, 2, 3, 4].map((i) => (
        <ellipse key={i} cx="120" cy={62 + i * 12} rx={92 - i * 14} ry={30 - i * 4} fill="none"
          stroke="var(--oks-color-primary-500)" strokeOpacity={1 - i * 0.18} strokeWidth="2" />
      ))}
      <circle cx="120" cy="30" r="7" fill="var(--oks-color-primary-500)" />
      <path d="M120 38v70" stroke="var(--oks-color-primary-500)" strokeDasharray="3 5" strokeWidth="1.5" />
    </svg>
  );
}

export function Hero() {
  return (
    <Surface className="h-full">
      <SurfaceBody className="flex flex-col place-content-center gap-5 p-5">
        <div className="flex justify-center"><Rings /></div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 text-center">
            <h2 className="text-xl font-semibold" style={{ color: "var(--app-fg-strong)" }}>Take your teams further</h2>
            <p className="text-sm font-medium fathom-sec">
              Set up a team in minutes with shared channels, task boards and<br />
              progress tracking, all in one place.
            </p>
          </div>
          <div className="flex justify-center">
            <Button color="primary" as={Link} href="/public-profile/teams">Create Team</Button>
          </div>
        </div>
      </SurfaceBody>
    </Surface>
  );
}
