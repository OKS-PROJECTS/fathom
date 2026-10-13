"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { Nav, type NavItemData, type NavRenderItemArgs } from "oks-ui";
import { ChevronDown } from "lucide-react";
import { NAV, type NavNode } from "@/data/nav";

const MORE = "-more";

const toItems = (nodes: NavNode[], depth = 0): NavItemData[] =>
  nodes.map((n) => {
    let kids = n.children ? toItems(n.children, depth + 1) : undefined;
    if (kids && n.moreAfter !== undefined && kids.length > n.moreAfter) {
      const extra = kids.slice(n.moreAfter);
      kids = [
        ...kids.slice(0, n.moreAfter),
        { key: `${n.key}${MORE}`, label: `Show ${extra.length} more`, children: extra },
      ];
    }
    return {
      key: n.key,
      label: n.label,
      href: n.to,
      icon: n.icon ? <n.icon size={16} strokeWidth={1.75} /> : undefined,
      children: kids,
    };
  });

const ITEMS = toItems(NAV);

const owningGroups = (nodes: NavNode[], pathname: string, trail: string[] = []): string[] | null => {
  for (const n of nodes) {
    if (n.to === pathname) return trail;
    if (n.children) {
      const r = owningGroups(n.children, pathname, [...trail, n.key]);
      if (r) return r;
    }
  }
  return null;
};

export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const open = useMemo(() => owningGroups(NAV, pathname) ?? [], [pathname]);

  const renderItem = ({ item, hasChildren, isExpanded, content, props }: NavRenderItemArgs) => {
    if (item.key.endsWith(MORE)) {
      return (
        <button type="button" {...props} data-more="true">
          <span>{isExpanded ? "Show less" : item.label}</span>
          <ChevronDown size={14} className="fathom-nav-caret" aria-hidden />
        </button>
      );
    }
    return hasChildren || !item.href ? (
      <button type="button" {...props}>
        {content}
      </button>
    ) : (
      <Link
        href={item.href}
        {...props}
        onClick={() => {
          props.onClick();
          onNavigate?.();
        }}
      >
        {content}
      </Link>
    );
  };

  return (
    <Nav
      key={open.join("/")}
      aria-label="Main"
      className="fathom-nav"
      items={ITEMS}
      isItemActive={(it) => it.href === pathname}
      defaultExpandedKeys={open}
      expansionMode="single"
      renderItem={renderItem}
    />
  );
}
