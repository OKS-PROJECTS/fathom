"use client";

import Link from "next/link";
import { ListChecks } from "lucide-react";
import { Button } from "oks-ui";
import { Container } from "@/components/ui/Container";
import { Surface } from "@/components/ui/Surface";
import { Logo } from "@/components/shell/Logo";
import { LINES, Line } from "./Checkout";
import { StoreFrame } from "./parts";

export function OrderReceiptPage() {
  return (
    <StoreFrame title="Order Receipt" crumbs={[]} bare>
      <Container>
        <div className="py-10">
          <Surface className="mx-auto w-full max-w-[800px] overflow-hidden px-0">
            <div className="h-2 w-full" style={{ background: "linear-gradient(90deg,#D618A3 0%,#1951E0 32.67%,#12C79C 67.17%,#DFBB19 100%)" }} />
            <div className="mb-4 me-3 space-y-5 py-10 ps-6 pe-3 text-center">
              <div className="mb-5 flex flex-col items-center gap-3 lg:mb-9">
                <Logo />
                <h3 className="mt-6 text-2xl font-semibold" style={{ color: "var(--app-fg-strong)" }}>Order Confirmed</h3>
                <span className="text-sm font-medium fathom-sec">Thanks! Your order <span className="text-sm font-semibold" style={{ color: "var(--app-fg-strong)" }}>#F482910-A17</span> is confirmed and being processed.</span>
              </div>
              <div className="space-y-5 text-start lg:pb-5">{LINES.map((l, i) => <Line key={i} l={l} />)}</div>
              <div className="flex flex-col rounded-xl border px-5 py-4 text-start lg:px-7" style={{ borderColor: "var(--app-border)", background: "color-mix(in srgb, var(--app-surface-2) 70%, transparent)" }}>
                <div className="flex justify-start gap-9">
                  {[["Order placed", "26 June, 2025"], ["Total", "$512.60"], ["Ship to", "Maya Okoro"], ["Estimated Delivery", "07 July, 2025"]].map(([k, v]) => <div key={k} className="flex flex-col gap-1.5"><span className="text-sm fathom-sec">{k}</span><span className="text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>{v}</span></div>)}
                </div>
              </div>
              <Button as={Link} href="/store-client/my-orders" variant="bordered" className="lg:mt-5" startContent={<ListChecks size={16} />}>My Orders</Button>
            </div>
          </Surface>
        </div>
      </Container>
    </StoreFrame>
  );
}
