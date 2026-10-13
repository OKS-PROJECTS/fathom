"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { Button } from "oks-ui";
import { BaggageClaim, Captions, CreditCard, MapPinned, MoveLeft, MoveRight, ScrollText, SquareMousePointer, Truck, WalletCards, type LucideIcon } from "lucide-react";
import { Surface, SurfaceHeader } from "@/components/ui/Surface";
import { Container } from "@/components/ui/Container";
import { Money, SaleTag, Sneaker, StoreFrame } from "./parts";

const STEPS: [string, LucideIcon, string][] = [["Order Summary", Captions, "order-summary"], ["Shipping Info", Truck, "shipping-info"], ["Payment Method", WalletCards, "payment-method"], ["Order Placed", ScrollText, "order-placed"]];

function Stepper({ current }: { current: string }) {
  return (
    <Container className="flex flex-wrap items-center justify-center gap-8 pt-5 lg:flex-nowrap lg:gap-1.5">
      {STEPS.map(([t, I, k], i) => {
        const on = k === current;
        return (
          <div key={k} className="flex items-center gap-1.5">
            <div className="relative flex h-[34px] items-center gap-1.5 rounded-full border px-3 text-[13px] font-medium leading-none" style={on ? { background: "color-mix(in srgb, var(--app-primary) 10%, transparent)", borderColor: "color-mix(in srgb, var(--app-primary) 10%, transparent)", color: "var(--app-primary)" } : { borderColor: "var(--app-border)", color: "var(--app-fg-strong)" }}><I size={16} aria-hidden />{t}</div>
            {i < STEPS.length - 1 && <div className="hidden h-px w-12 border-t border-dashed lg:block" style={{ borderColor: "var(--app-border-input)" }} />}
          </div>
        );
      })}
    </Container>
  );
}

export function Title({ title, sub, actions }: { title: string; sub: string; actions: ReactNode }) {
  return (
    <div className="flex flex-wrap justify-between gap-5 pb-7.5 lg:items-end">
      <div className="flex flex-col gap-2"><h1 className="text-xl font-medium leading-none" style={{ color: "var(--app-fg-strong)" }}>{title}</h1><div className="flex gap-2 text-sm font-normal fathom-sec">{sub}</div></div>
      <div className="flex gap-2.5">{actions}</div>
    </div>
  );
}

export const LINES: [string, string, number, number | undefined, string | undefined, number][] = [
  ["Harbor Glide Lightweight Runner Pro Edition", "BT-A1-YLW-8", 120, undefined, undefined, 40],
  ["Granite Edge High Impact Stability Lightweight..", "SNK-888-RED-42", 99, undefined, undefined, 140],
  ["Harbor Glide Lightweight Runner Pro Edition", "SD-999-TAN-38", 120, undefined, undefined, 200],
  ["Wave Crest Dynamic Boost Sneaker Pro Edition", "SD-Z9-BRN-39", 149, 179, "save 25%", 300],
];
export function Line({ l }: { l: (typeof LINES)[number] }) {
  const [n, sku, price, was, sale, hue] = l;
  return (
    <Surface>
      <div className="flex grow flex-wrap justify-between gap-4.5 p-2 pe-5">
        <div className="flex gap-3.5">
          <div className="flex h-[70px] w-[90px] shrink-0 items-center justify-center overflow-hidden rounded-xl border" style={{ borderColor: "var(--app-border)", background: "color-mix(in srgb, var(--app-surface-2) 50%, transparent)" }}><Sneaker hue={hue} width={78} /></div>
          <div className="flex flex-col gap-1">
            <Link href="/store-client/product-details" className="text-sm font-medium leading-5.5" style={{ color: "var(--app-fg-strong)" }}>{n}</Link>
            <div className="flex gap-1.5"><span className="text-xs uppercase fathom-sec">sku: <span className="text-xs font-medium" style={{ color: "var(--app-fg)" }}>{sku}</span></span>{sale && <SaleTag>{sale}</SaleTag>}</div>
          </div>
        </div>
        <div className="flex flex-col gap-1.5"><span className="text-end text-xs fathom-sec">1 x</span><div className="flex flex-wrap gap-1.5">{was && <span className="text-sm line-through fathom-sec">{Money({ n: was })}</span>}<span className="text-sm font-semibold" style={{ color: "var(--app-fg-strong)" }}>{Money({ n: price })}</span></div></div>
      </div>
    </Surface>
  );
}

const Row = ({ k, v }: { k: string; v: string }) => <div className="flex justify-between"><span className="text-sm fathom-sec">{k}</span><span className="text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>{v}</span></div>;
const SUMMARY_STYLE = { background: "color-mix(in srgb, var(--app-surface-2) 50%, transparent)" } as const;

function Summary({ ship }: { ship: boolean }) {
  return (
    <Surface style={SUMMARY_STYLE}>
      <SurfaceHeader title="Order Summary" />
      {ship ? (
        <div className="space-y-2 py-5">
          <div className="flex flex-col px-5"><span className="mb-1.5 text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>Shipping to Maya&apos;s Home</span><div className="flex flex-col gap-1 text-xs fathom-sec"><span>Maya Okoro</span><span>Lindenstraat 41</span><span>2312 AB, Leiden</span><span>Netherlands</span></div></div>
          <div className="mb-4 mt-5 border-b" style={{ borderColor: "var(--app-border)" }} />
          <span className="mb-3.5 block px-5 text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>Price Details</span>
          <div className="space-y-2 px-5"><Row k="Subtotal" v="$492.00" /><Row k="Shipping" v="$0.00" /><Row k="VAT" v="$0.00" /></div>
        </div>
      ) : (
        <div className="space-y-2 px-5 py-4"><h4 className="mb-3.5 text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>Price Details</h4><Row k="Subtotal" v="$492.00" /><Row k="Shipping" v="$0.00" /><Row k="VAT" v="$0.00" /></div>
      )}
      <div className="flex min-h-14 items-center justify-between border-t px-5" style={{ borderColor: "var(--app-border)" }}><span className="text-sm fathom-sec">Total</span><span className="text-base font-semibold" style={{ color: "var(--app-fg-strong)" }}>$492.00</span></div>
    </Surface>
  );
}

function Frame({ step, title, sub, actions, children, summary = "price" }: { step: string; title: string; sub: string; actions: ReactNode; children: ReactNode; summary?: "price" | "ship" }) {
  return (
    <StoreFrame title="" crumbs={[]} bare>
      <Stepper current={step} />
      <Container className="mt-12"><Title title={title} sub={sub} actions={actions} /></Container>
      <Container>
        <div className="mb-5 grid gap-5 lg:mb-10 lg:gap-9 xl:grid-cols-3">
          <div className="space-y-5 xl:col-span-2">{children}</div>
          <div className="xl:col-span-1"><div className="space-y-5"><Summary ship={summary === "ship"} /></div></div>
        </div>
      </Container>
    </StoreFrame>
  );
}
const Nav = ({ back, next, nextLabel, backLabel, nextIcon }: { back?: string; next: string; nextLabel: string; backLabel?: string; nextIcon?: ReactNode }) => (
  <div className="flex flex-wrap justify-end gap-3">
    {back && <Button as={Link} href={back} variant="bordered" startContent={<MoveLeft size={16} />}>{backLabel}</Button>}
    <Button as={Link} href={next} color="primary" endContent={nextIcon ?? <MoveRight size={16} />}>{nextLabel}</Button>
  </div>
);

export function OrderSummaryPage() {
  return (
    <Frame step="order-summary" title="Order Summary" sub="Review your items before checkout" actions={<Button as={Link} href="/store-client/checkout/order-summary" variant="bordered" startContent={<BaggageClaim size={16} />}>View Cart</Button>}>
      <div className="grid grid-cols-1 gap-5">{LINES.map((l, i) => <Line key={i} l={l} />)}</div>
      <div className="flex flex-wrap justify-end gap-3"><Button variant="bordered">Cancel</Button><Button as={Link} href="/store-client/checkout/shipping-info" color="primary" endContent={<MoveRight size={16} />}>Shipping Info</Button></div>
    </Frame>
  );
}

const ADDR = [
  ["Maya's Home", "Maya", "Okoro", "2312 AB", "Lindenstraat 41", "Leiden", "+31612345678", true],
  ["Idris's Office", "Idris", "Navarro", "2517 AN", "Havenlaan 88", "The Hague", "+31687654321", false],
  ["Greta's Apartment", "Greta", "Lindqvist", "1054 GJ", "Kanaalstraat 45", "Amsterdam", "+31611223344", false],
  ["Joon's Studio", "Joon", "Eriksen", "3011 AA", "Haringvliet 12", "Rotterdam", "+31655667788", false],
] as const;
export function ShippingInfoPage() {
  const [sel, setSel] = useState(0);
  return (
    <Frame summary="ship" step="shipping-info" title="Shipping Info" sub="Enter and confirm your delivery address" actions={<Button variant="bordered" startContent={<MapPinned size={16} />}>Add Address</Button>}>
      <div className="grid gap-5 sm:grid-cols-2">
        {ADDR.map(([t, f, l, zip, street, city, phone], i) => (
          <Surface key={t}>
            <SurfaceHeader title={<span className="flex items-center gap-2.5">{t}{sel === i && <span className="inline-flex h-6 items-center rounded-md px-[0.45rem] text-xs font-medium" style={{ background: "var(--oks-color-success-100)", color: "var(--oks-color-success-800)" }}>Ship here</span>}</span>} />
            <div className="grow space-y-4 p-5">
              <div className="flex flex-col gap-1.5"><span className="mb-1.5 text-sm font-semibold" style={{ color: "var(--app-fg-strong)" }}>{f} {l}</span><div className="flex flex-col gap-2 text-sm font-normal" style={{ color: "var(--app-fg-strong)" }}><span>{zip} {street}</span><span>{city}</span><span>Netherlands</span><span>Phone Number: {phone}</span></div></div>
              <div className="flex min-h-[34px] justify-between"><div className="flex gap-5"><Link href="#" className="text-[13px] font-medium underline decoration-dashed underline-offset-4" style={{ color: "var(--app-primary)", textDecorationThickness: 1 }}>Edit</Link><Link href="#" className="text-[13px] font-medium underline decoration-dashed underline-offset-4" style={{ color: "var(--app-primary)", textDecorationThickness: 1 }}>Remove</Link></div>{sel !== i && <Button variant="bordered" size="sm" onPress={() => setSel(i)}>Select Address</Button>}</div>
            </div>
          </Surface>
        ))}
      </div>
      <Nav back="/store-client/checkout/order-summary" backLabel="Order Summary" next="/store-client/checkout/payment-method" nextLabel="Payment Method" />
    </Frame>
  );
}

const PAY = [
  ["Maya's Visa", "Maya Okoro", "Ending 3604 Expires on 12/2026", "visa"],
  ["Idris's iDeal", "Idris Navarro", "iDeal with Harbor Bank", "ideal"],
  ["Greta's Wallet", "Greta Lindqvist", "greta@fathom.example", "wallet"],
  ["Joon's Amex", "Joon Eriksen", "Ending 1007 Expires on 04/2027", "amex"],
] as const;
const PayMark = ({ k }: { k: string }) => <span className="flex size-12 items-center justify-center rounded-lg border" style={{ borderColor: "var(--app-border)", color: "var(--app-primary)" }} aria-label={k}><CreditCard size={22} aria-hidden /></span>;
export function PaymentMethodPage() {
  const [sel, setSel] = useState(0);
  return (
    <Frame summary="ship" step="payment-method" title="Payment Method" sub="Select how you want to pay" actions={<Button variant="bordered" startContent={<WalletCards size={16} />}>Add Cart</Button>}>
      <div className="grid gap-5 sm:grid-cols-2">
        {PAY.map(([t, n, d, k], i) => (
          <Surface key={t}>
            <SurfaceHeader title={<span className="flex items-center gap-2.5">{t}{sel === i && <span className="inline-flex h-6 items-center rounded-md px-[0.45rem] text-xs font-medium" style={{ background: "var(--oks-color-success-100)", color: "var(--oks-color-success-800)" }}>Pay with this</span>}</span>} />
            <div className="grow space-y-5 p-5">
              <div className="flex gap-3"><PayMark k={k} /><div className="flex flex-col gap-0.5"><span className="text-xs font-semibold" style={{ color: "var(--app-fg-strong)" }}>{n}</span><span className="text-xs" style={{ color: "var(--app-fg-strong)" }}>{d}</span></div></div>
              <div className="flex min-h-[34px] justify-between"><div className="flex gap-5"><Link href="#" className="text-[13px] font-medium underline decoration-dashed underline-offset-4" style={{ color: "var(--app-primary)", textDecorationThickness: 1 }}>Edit</Link><Link href="#" className="text-[13px] font-medium underline decoration-dashed underline-offset-4" style={{ color: "var(--app-primary)", textDecorationThickness: 1 }}>Remove</Link></div>{sel !== i && <Button variant="bordered" size="sm" onPress={() => setSel(i)}>Select Card</Button>}</div>
            </div>
          </Surface>
        ))}
      </div>
      <Nav back="/store-client/checkout/shipping-info" backLabel="Shipping Info" next="/store-client/checkout/order-placed" nextLabel="Place Order" nextIcon={<SquareMousePointer size={16} />} />
    </Frame>
  );
}

export function OrderPlacedPage() {
  return (
    <StoreFrame title="" crumbs={[]} bare>
      <Stepper current="order-placed" />
      <Container className="mt-12"><Title title="Order Placed" sub="Your purchase has been successfully completed" actions={<><Button as={Link} href="/store-client/my-orders" variant="bordered" startContent={<Captions size={16} />}>My Orders</Button><Button as={Link} href="/store-client/order-receipt" color="primary" startContent={<ScrollText size={16} />}>View Receipt</Button></>} /></Container>
      <Container>
        <div className="grid gap-5 lg:gap-9 xl:grid-cols-3">
          <div className="space-y-5 xl:col-span-2">
            <div className="grid grid-cols-1 gap-5 lg:gap-9">
              <Surface>
                <div className="flex flex-wrap justify-start gap-9 border-b px-5 py-5" style={{ borderColor: "var(--app-border)", background: "color-mix(in srgb, var(--app-surface-2) 70%, transparent)" }}>
                  {[["Order ID", "F482910-A17"], ["Order placed", "26 June, 2025"], ["Total", "$512.60"], ["Ship to", "Maya Okoro"], ["Estimated Delivery", "07 July, 2025"]].map(([k, v]) => <div key={k} className="flex flex-col gap-1.5"><span className="text-xs fathom-sec">{k}</span><span className="text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>{v}</span></div>)}
                </div>
                <div className="grow space-y-5 p-5 lg:p-7.5">{LINES.map((l, i) => <Line key={i} l={l} />)}</div>
              </Surface>
              <div className="grid grid-cols-2 gap-5 lg:gap-9">
                <Surface><SurfaceHeader className="!min-h-[44px]" title={<span className="text-sm">Payment</span>} /><div className="grow p-5 pb-[11px]"><div className="flex gap-2.5"><PayMark k="visa" /><div className="flex flex-col gap-0.5 text-[13px]"><span className="font-semibold" style={{ color: "var(--app-fg-strong)" }}>Maya Okoro</span><span style={{ color: "var(--app-fg-strong)" }}>Ending 3604 Expires on 12/2026</span></div></div></div></Surface>
                <Surface><SurfaceHeader className="!min-h-[44px]" title={<span className="text-sm">Delivery to</span>} /><div className="grow p-5 pb-[11px]"><div className="mb-2.5 text-sm font-semibold" style={{ color: "var(--app-fg-strong)" }}>Maya Okoro</div><div className="flex flex-col gap-2 text-[13px]" style={{ color: "var(--app-fg-strong)" }}><span>Lindenstraat 41</span><span>2312 AB, Leiden</span><span>Netherlands</span><span>Phone number: +31612345678</span></div></div></Surface>
              </div>
            </div>
          </div>
          <div className="xl:col-span-1"><div className="space-y-5"><Summary ship={false} /></div></div>
        </div>
      </Container>
    </StoreFrame>
  );
}

export function OrderCard({ lines }: { lines: typeof LINES }) {
  return (
    <Surface>
      <div className="flex flex-wrap justify-start gap-9 border-b px-5 py-5" style={{ borderColor: "var(--app-border)", background: "color-mix(in srgb, var(--app-surface-2) 70%, transparent)" }}>
        {[["Order ID", "F482910-A17"], ["Order placed", "26 June, 2025"], ["Total", "$512.60"], ["Ship to", "Maya Okoro"], ["Estimated Delivery", "07 July, 2025"]].map(([k, v]) => <div key={k} className="flex flex-col gap-1.5"><span className="text-xs fathom-sec">{k}</span><span className="text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>{v}</span></div>)}
      </div>
      <div className="grow space-y-5 p-5 lg:p-7.5">{lines.map((l, i) => <Line key={i} l={l} />)}</div>
    </Surface>
  );
}
