"use client";

import Link from "next/link";
import { useState } from "react";
import { Avatar, Button, TextField } from "oks-ui";
import { Trash2 } from "lucide-react";
import { Surface, SurfaceBody, SurfaceHeader } from "@/components/ui/Surface";
import { BLOCKED } from "@/data/dashboard";
import { avatarUrl } from "@/lib/avatar";

export function BlockList() {
  const [rows, setRows] = useState(BLOCKED);
  const [name, setName] = useState("");
  const add = () => {
    const n = name.trim();
    if (!n) return;
    setRows((r) => [{ id: Date.now(), name: n, note: "0 contributions" }, ...r]);
    setName("");
  };
  return (
    <Surface className="h-full">
      <SurfaceHeader title="Block List" />
      <SurfaceBody className="flex flex-col gap-5 p-5">
        <div className="text-sm" style={{ color: "var(--app-fg)" }}>
          People on the block list can no longer send you chat requests or messages, now or later.
        </div>
        <div className="flex">
          <div className="min-w-0 flex-1 fathom-join-l">
            <TextField aria-label="Block a user" placeholder="Block new user" value={name} onChange={setName} />
          </div>
          <Button color="primary" className="fathom-join-r" onPress={add}>Add</Button>
        </div>
        <div className="flex flex-col gap-5">
          {rows.map((r) => (
            <div key={r.id} className="flex justify-between gap-2.5">
              <div className="flex gap-2.5">
                <Avatar name={r.name} src={avatarUrl(r.id)} size={36} />
                <div className="flex flex-col gap-0.5">
                  <Link href="/public-profile/teams" className="flex gap-1.5 text-sm font-medium leading-none" style={{ color: "var(--app-fg-strong)" }}>{r.name}</Link>
                  <span className="text-sm fathom-sec">{r.note}</span>
                </div>
              </div>
              <Button variant="ghost" isIconOnly aria-label={`Unblock ${r.name}`} onPress={() => setRows((x) => x.filter((y) => y.id !== r.id))}>
                <Trash2 size={16} />
              </Button>
            </div>
          ))}
        </div>
      </SurfaceBody>
    </Surface>
  );
}
