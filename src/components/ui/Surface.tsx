import type { CSSProperties, ReactNode } from "react";
import { Card } from "oks-ui";

/** The template's card: oks-ui `Card` re-skinned to the app's border-only surface. */
export function Surface({ children, className = "", style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <Card shadow="none" radius="lg" fullWidth className={`fathom-card ${className}`} style={style}>
      {children}
    </Card>
  );
}

export function SurfaceHeader({
  title,
  actions,
  className = "",
}: {
  title: ReactNode;
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`fathom-card-head ${className}`}>
      <h3 className="fathom-card-title">{title}</h3>
      {actions}
    </div>
  );
}

export function SurfaceBody({ children, className = "p-5" }: { children: ReactNode; className?: string }) {
  return <div className={`grow ${className}`}>{children}</div>;
}

export function SurfaceFooter({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`fathom-card-foot ${className}`}>{children}</div>;
}
