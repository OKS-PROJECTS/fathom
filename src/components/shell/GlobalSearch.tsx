"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { CommandPalette, type CommandPaletteItem } from "oks-ui";
import { FileText } from "lucide-react";
import { searchEntries } from "@/data/nav";

/** The app-wide page search: oks-ui `CommandPalette` fed from the nav tree. */
export function GlobalSearch({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const items = useMemo<CommandPaletteItem[]>(
    () =>
      searchEntries().map((e) => ({
        id: e.to,
        label: e.label,
        description: e.group,
        group: e.group.split(" / ")[0],
        icon: <FileText size={16} />,
        keywords: e.group.split(" / "),
      })),
    [],
  );
  return (
    <CommandPalette
      isOpen={isOpen}
      onClose={onClose}
      items={items}
      placeholder="Search pages"
      emptyMessage="No pages match your search."
      onSelect={(item) => router.push(item.id)}
    />
  );
}
