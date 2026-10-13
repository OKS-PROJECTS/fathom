import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import "oks-ui/styles.css";
import "../styles/theme.css";
import "../styles/shell.css";
import { THEME_INIT } from "@/lib/theme-init";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Fathom",
  description: "An admin template built entirely with oks-ui.",
  icons: { icon: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/favicon.svg` },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
