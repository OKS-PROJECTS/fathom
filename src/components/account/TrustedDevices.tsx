"use client";

import { Button } from "oks-ui";
import { Globe, LogOut } from "lucide-react";
import { Surface, SurfaceFooter, SurfaceHeader } from "@/components/ui/Surface";
import { FooterLink, MoreMenu } from "@/components/profile/parts";

const DEVICES = [["Chrome", "Seville, Spain", "macOS 15.4", "Active: Today at 9:03 AM"], ["Chrome", "Lyon, France", "Android 16", "Active: Mar 18 at 9:03 AM"]];

export function TrustedDevicesCard() {
  return (
    <Surface className="min-w-full">
      <SurfaceHeader title="Trusted Devices" actions={<MoreMenu />} />
      <div className="fathom-xscroll"><table className="w-full text-sm font-medium" style={{ color: "var(--app-fg-muted)" }}><tbody>
        {DEVICES.map(([b, loc, os, act], i) => (
          <tr key={loc} style={{ borderBottom: i === DEVICES.length - 1 ? 0 : "1px solid var(--app-border)" }}>
            <td className="min-w-48 p-4"><div className="flex items-center gap-2.5"><Globe size={24} className="fathom-sec" /><div className="flex flex-col"><div className="mb-px text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>{b}</div><span className="text-xs fathom-sec">{loc}</span></div></div></td>
            <td className="min-w-56 p-4 font-normal fathom-sec">{os}<br />{act}</td>
            <td className="min-w-16 p-4 text-end" style={{ paddingRight: 30 }}><Button variant="ghost" isIconOnly aria-label="Sign out device"><LogOut size={16} /></Button></td>
          </tr>
        ))}
      </tbody></table></div>
      <SurfaceFooter className="items-center"><FooterLink href="#">Manage Trusted Devices</FooterLink></SurfaceFooter>
    </Surface>
  );
}
