"use client";

import { SafeDrawer } from "@/components/ui/Safe";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import {
  Accordion,
  AccordionItem,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  useCommandPalette,
} from "oks-ui";
import { ChevronDown, CircleUser, Menu, MessageCircleMore, MessageSquareDot, Search, Settings, ShieldCheck, ShoppingCart, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChatDrawer, NotificationsDrawer, UserMenu } from "./Panels";
import { Logo } from "./Logo";
import { GlobalSearch } from "./GlobalSearch";
import { SidebarNav } from "./Sidebar";
import { FAVORITES, SPACES } from "@/data/nav";

const REPO_URL = "https://github.com/OKS-PROJECTS/fathom";

function SidebarList({ title, items, defaultOpen }: { title: string; items: string[]; defaultOpen?: boolean }) {
  return (
    <Accordion variant="light" isCompact className="fathom-side-acc" defaultExpandedKeys={defaultOpen ? [title] : []}>
      <AccordionItem itemKey={title} title={title}>
        <ul className="space-y-0.5">
          {items.map((i) => (
            <li key={i} className="fathom-nav-sub">
              {i}
            </li>
          ))}
        </ul>
      </AccordionItem>
    </Accordion>
  );
}

const SPACES_MENU = [
  ["Public Profile", CircleUser, "/public-profile/profiles/default", "/public-profile"],
  ["Account", Settings, "/account/home/get-started", "/account"],
  ["Network", Users, "/network/get-started", "/network"],
  ["Store - Client", ShoppingCart, "/store-client/home", "/store-client"],
  ["Authentication", ShieldCheck, "/auth/classic/sign-in", "/auth"],
] as const;

function SidebarBody({ onNavigate, onSearch }: { onNavigate?: () => void; onSearch: () => void }) {
  const router = useRouter();
  const pathname = usePathname();
  const [panel, setPanel] = useState<"notes" | "chat" | null>(null);
  return (
    <div className="flex h-full flex-col">
      <div className="mb-3.5">
        <div className="flex h-[70px] items-center justify-between gap-2.5 px-3.5">
          <Logo />
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <button type="button" className="fathom-ws" aria-label="Switch workspace">
                Fathom Cloud
                <ChevronDown size={14} />
              </button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Workspace">
              {SPACES_MENU.map(([label, Icon, to, base]) => (
                <DropdownItem key={label} title={label} startContent={<Icon size={18} />} isSelected={pathname.startsWith(base)} hideSelectedIcon onAction={() => { router.push(to); onNavigate?.(); }} />
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="mb-1 px-3.5 pt-2.5">
          <button type="button" className="fathom-search" aria-label="Search pages" onClick={onSearch}>
            <Search size={16} aria-hidden />
            <span className="flex-1 text-start">Search</span>
            <span className="text-xs">cmd + /</span>
          </button>
        </div>
      </div>

      <div className="fathom-scroll min-h-0 grow overflow-y-auto" style={{ maxHeight: "calc(100vh - 11.5rem)" }}>
        <div className="px-3.5">
          <SidebarNav onNavigate={onNavigate} />
        </div>
        <div className="mx-5 my-4 border-b" style={{ borderColor: "var(--app-border-input)" }} />
        <div className="flex flex-col gap-1.5 px-3.5">
          <SidebarList title="Spaces" items={SPACES} />
          <SidebarList title="Favorites" items={FAVORITES} defaultOpen />
        </div>
      </div>

      <div className="flex h-14 items-center justify-between ps-4 pe-3.5">
        <UserMenu />
        <div className="flex items-center gap-1.5">
          <Button variant="ghost" isIconOnly aria-label="Notifications" onPress={() => setPanel("notes")}>
            <MessageSquareDot size={18} />
          </Button>
          <Button variant="ghost" isIconOnly aria-label="Messages" onPress={() => setPanel("chat")}>
            <MessageCircleMore size={18} />
          </Button>
        </div>
      </div>
      <NotificationsDrawer isOpen={panel === "notes"} onClose={() => setPanel(null)} />
      <ChatDrawer isOpen={panel === "chat"} onClose={() => setPanel(null)} />
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [drawer, setDrawer] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const drawerOpen = drawer === pathname;
  const palette = useCommandPalette({ hotkey: "mod+/" });

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <div className="fathom-frame">
      <aside className="fathom-sidebar hidden lg:flex" aria-label="Sidebar">
        <SidebarBody onSearch={palette.open} />
      </aside>

      <header className="fathom-mobilebar flex items-center justify-between px-4 lg:hidden">
        <Logo />
        <Button variant="ghost" isIconOnly aria-label="Open menu" onPress={() => setDrawer(pathname)}>
          <Menu size={20} />
        </Button>
      </header>

      <SafeDrawer isOpen={drawerOpen} onClose={() => setDrawer(null)} position="left" width={290} title="Menu">
        <SidebarBody
          onNavigate={() => setDrawer(null)}
          onSearch={() => {
            setDrawer(null);
            palette.open();
          }}
        />
      </SafeDrawer>

      <GlobalSearch {...palette.getPaletteProps()} />

      <div className="fathom-panel">
        <div className="fathom-panel-scroll" ref={scrollRef}>
          <main className="grow">{children}</main>
          <footer className="py-5">
            <div className="fathom-container">
              <div className="flex flex-col items-center justify-center gap-3 md:flex-row md:justify-between">
                <div className="order-2 flex gap-2 text-sm md:order-1">
                  <span className="fathom-muted">2026 &copy;</span>
                  <span style={{ color: "var(--app-fg-muted)" }}>Fathom Labs</span>
                </div>
                <nav className="order-1 flex gap-4 text-sm md:order-2 fathom-muted" aria-label="Footer">
                  <span>Docs</span>
                  <span>Changelog</span>
                  <span>Support</span>
                  <span>License</span>
                  <a href={REPO_URL} target="_blank" rel="noreferrer" style={{ color: "inherit" }}>Repository</a>
                </nav>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
