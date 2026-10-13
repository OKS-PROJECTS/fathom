"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { Button } from "oks-ui";
import { SquarePen } from "lucide-react";

export type SRow = {
  label: ReactNode;
  value: ReactNode;
  /** Vertical padding of the row's cells in px (8 / 12 / 14 / 16). */
  py?: number;
  action?: ReactNode;
  valueClass?: string;
  /** Padding for the action cell when it differs from `py`. */
  actionPy?: number;
  /** Force the row's total height in px (including its 1px border). */
  h?: number;
};

export const EditButton = ({ label = "Edit" }: { label?: string }) => (
  <Button variant="ghost" isIconOnly aria-label={label}><SquarePen size={16} style={{ color: "var(--oks-color-primary-500)" }} /></Button>
);

export const TextAction = ({ children, href = "#", size = 13 }: { children: ReactNode; href?: string; size?: number }) => (
  <Link href={href} className="font-medium underline decoration-dashed underline-offset-4" style={{ color: "var(--app-primary)", fontSize: size, textDecorationThickness: 1 }}>{children}</Link>
);

/** Rows of label / value / action with a hairline between them, as used by settings cards. */
export function SettingsRows({ rows, labelWidth = 144, actionAlign = "end", actionMin = 0, lastBorder = true, rowBorder = true }: { rows: SRow[]; labelWidth?: number; actionAlign?: "end" | "center"; actionMin?: number; lastBorder?: boolean; rowBorder?: boolean }) {
  return (
    <div className="fathom-xscroll">
      <table className="w-full align-middle text-sm" style={{ color: "var(--app-fg-subtle)" }}>
        <tbody>
          {rows.map((r, i) => {
            const py = r.py ?? 8;
            return (
              <tr key={i} style={{ borderBottom: !rowBorder || (i === rows.length - 1 && !lastBorder) ? 0 : "1px solid var(--app-border)", height: r.h }}>
                <td className="px-4 align-middle fathom-sec" style={{ paddingBlock: py, minWidth: labelWidth }}>{r.label}</td>
                <td className={`px-4 align-middle ${r.valueClass ?? ""}`} style={{ paddingBlock: py, color: "var(--app-fg-strong)" }}>{r.value}</td>
                <td className={`px-4 align-middle ${actionAlign === "end" ? "text-end" : "text-center"}`} style={{ paddingBlock: r.actionPy ?? py, minWidth: actionMin || undefined }}>{r.action}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/** Bordered list row (badge, calendar account, etc.). */
export function ListRow({ children, trailing }: { children: ReactNode; trailing?: ReactNode }) {
  return (
    <div className="flex flex-wrap justify-between gap-2 rounded-xl border px-3.5 py-2.5" style={{ borderColor: "var(--app-border)" }}>
      <div className="flex flex-wrap items-center gap-2.5">{children}</div>
      {trailing}
    </div>
  );
}
