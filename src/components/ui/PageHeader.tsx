"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { crumbsFor } from "@/data/nav";
import { Container } from "./Container";

/** Title + breadcrumb on the left, actions on the right; sits above the page content. */
export function PageHeader({
  title,
  actions,
  crumbs,
}: {
  title: string;
  actions?: ReactNode;
  crumbs?: string[];
}) {
  const pathname = usePathname();
  const trail = crumbs ?? crumbsFor(pathname);
  return (
    <div className="pb-5">
      <Container className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-col flex-wrap gap-1 md:flex-row md:items-center lg:gap-5">
          <h1 className="text-lg font-medium" style={{ color: "var(--app-fg-strong)" }}>
            {title}
          </h1>
          {trail.length > 0 && (
            <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm">
              {trail.map((c, i) => (
                <span key={`${c}-${i}`} className="flex items-center gap-1">
                  {i > 0 && <span className="fathom-muted">/</span>}
                  {i === trail.length - 1 ? (
                    <Link href={pathname} style={{ color: "var(--app-fg-strong)" }}>{c}</Link>
                  ) : (
                    <span className="fathom-sec">{c}</span>
                  )}
                </span>
              ))}
            </nav>
          )}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-1.5 lg:gap-3.5">{actions}</div>}
      </Container>
    </div>
  );
}

/** The standard Export + date-range actions most pages show. */
