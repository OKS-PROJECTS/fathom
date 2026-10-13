import type { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`fathom-container ${className}`}>{children}</div>;
}

/** Page body: a vertical stack at the app's 20/30px gutter. */
export function PageGrid({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`grid grid-cols-1 gap-5 lg:gap-7.5 ${className}`}>{children}</div>;
}

/** A 3-column row at the app gutter that stacks on small screens. */
export function Row3({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-7.5 items-stretch ${className}`}>{children}</div>;
}
