"use client";

import { useSyncExternalStore, type ComponentProps, type ReactNode } from "react";
import { DatePickerField, Drawer, Modal } from "oks-ui";

const subscribe = () => () => {};

/** Renders its children only in the browser, so values that differ per request never reach the server render. */
export function ClientOnly({ children, fallback = null }: { children: ReactNode; fallback?: ReactNode }) {
  const ready = useSyncExternalStore(subscribe, () => true, () => false);
  return <>{ready ? children : fallback}</>;
}

export const SafeDatePicker = (p: ComponentProps<typeof DatePickerField>) => <ClientOnly fallback={<div className="h-[34px]" />}><DatePickerField {...p} /></ClientOnly>;
export const SafeModal = (p: ComponentProps<typeof Modal>) => <ClientOnly><Modal {...p} /></ClientOnly>;
export const SafeDrawer = (p: ComponentProps<typeof Drawer>) => <ClientOnly><Drawer {...p} /></ClientOnly>;
