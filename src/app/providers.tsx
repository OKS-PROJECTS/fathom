"use client";

import type { ReactNode } from "react";
import { ToastProvider } from "oks-ui";

export function Providers({ children }: { children: ReactNode }) {
  return <ToastProvider position="top-right">{children}</ToastProvider>;
}
