"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { Button } from "oks-ui";
import { CircleUser, Heart, ShoppingCart, Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Surface } from "@/components/ui/Surface";

/** Generated sneaker illustration; colour is driven by a hue so every product looks different. */
export function Sneaker({ hue = 250, width = 200, flip = false, className = "" }: { hue?: number; width?: number; flip?: boolean; className?: string }) {
  const body = `oklch(62% .17 ${hue})`;
  const dark = `oklch(40% .14 ${hue})`;
  const light = `oklch(88% .06 ${hue})`;
  return (
    <svg viewBox="0 0 200 110" width={width} height={(width * 110) / 200} className={`block ${className}`} style={flip ? { transform: "scaleX(-1)" } : undefined} aria-hidden>
      <ellipse cx="100" cy="100" rx="86" ry="5" fill="#000" opacity=".1" />
      <path d="M14 82c0-8 4-14 12-16l30-8c8-2 14-8 18-16l6-12c2-4 8-5 11-2l14 14c6 6 14 9 22 10l36 4c10 1 18 9 18 19v9c0 4-3 7-7 7H21c-4 0-7-3-7-7z" fill={body} />
      <path d="M14 82h172v10c0 4-3 7-7 7H21c-4 0-7-3-7-7z" fill={light} />
      <path d="M14 90h172" stroke={dark} strokeWidth="2" opacity=".35" />
      <path d="M92 40l8 8M102 36l8 8M112 38l8 8" stroke={light} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M40 76c20-2 40-1 60 4" stroke={dark} strokeWidth="3" fill="none" strokeLinecap="round" opacity=".5" />
    </svg>
  );
}

/** Store pages replace the Export / date actions with account, wishlist and cart controls. */
export function StoreActions() {
  return (
    <div className="flex gap-1">
      <Button variant="ghost" isIconOnly aria-label="Account" className="fathom-store-icon"><CircleUser size={20} /></Button>
      <Button as={Link} href="/store-client/wishlist" variant="ghost" isIconOnly aria-label="Wishlist" className="fathom-store-icon"><Heart size={20} /></Button>
      <div className="flex gap-1">
        <Button as={Link} href="/store-client/checkout/order-summary" variant="ghost" isIconOnly aria-label="Cart" className="fathom-store-icon relative">
          <ShoppingCart size={20} />
          <span className="absolute end-0.5 top-0.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[0.625rem] font-medium leading-none text-white" style={{ background: "#15803d" }}>3</span>
        </Button>
        <div className="flex flex-col"><span className="text-xs font-medium fathom-sec">Total</span><span className="text-xs font-medium" style={{ color: "var(--app-fg-strong)" }}>$94.56</span></div>
      </div>
    </div>
  );
}

export const Money = ({ n }: { n: number }) => `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export function RatingBadge({ value }: { value: number }) {
  return <span className="inline-flex h-5 min-w-5 items-center gap-1 rounded-full px-[0.325rem] text-[0.6875rem] font-medium leading-3 text-white" style={{ background: "#b45309" }}><Star size={12} fill="currentColor" aria-hidden />{value.toFixed(1)}</span>;
}

export function SaleTag({ children }: { children: ReactNode }) {
  return <span className="inline-flex h-5 min-w-5 items-center rounded-sm px-[0.325rem] text-[0.6875rem] font-medium uppercase leading-3 text-white" style={{ background: "var(--oks-color-danger-500)" }}>{children}</span>;
}

export type Product = { id: number; name: string; rating: number; price: number; was?: number; sale?: string; hue: number };

export function ProductCard({ p }: { p: Product }) {
  const [added, setAdded] = useState(false);
  return (
    <Surface>
      <div className="flex grow flex-col justify-between gap-4 p-2.5">
        <div className="mb-2.5">
          <div className="relative mb-4 flex h-[180px] w-full items-center justify-center overflow-hidden rounded-xl border" style={{ borderColor: "var(--app-border)", background: "color-mix(in srgb, var(--app-surface-2) 50%, transparent)" }}>
            {p.sale && <span className="absolute right-2 top-2"><SaleTag>{p.sale}</SaleTag></span>}
            <Sneaker hue={p.hue} width={170} />
          </div>
          <Link href="/store-client/product-details" className="block px-2.5 text-sm font-medium leading-5.5" style={{ color: "var(--app-fg-strong)" }}>{p.name}</Link>
        </div>
        <div className="flex flex-wrap justify-between gap-5 px-2.5 pb-1">
          <RatingBadge value={p.rating} />
          <div className="flex flex-wrap gap-1.5">
            {p.was && <span className="pt-px text-xs font-normal line-through fathom-sec">{Money({ n: p.was })}</span>}
            <span className="text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>{Money({ n: p.price })}</span>
            <Button variant="bordered" size="sm" className="ms-1" startContent={<ShoppingCart size={14} />} onPress={() => setAdded(true)}>{added ? "Added" : "Add"}</Button>
          </div>
        </div>
      </div>
    </Surface>
  );
}

export function StoreFrame({ title, crumbs, children, bare = false }: { title: string; crumbs: string[]; children: ReactNode; bare?: boolean }) {
  return (
    <>
      <div className="pb-5">
        <Container className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-col flex-wrap gap-1 md:flex-row md:items-center lg:gap-5">
            <h1 className="text-lg font-medium" style={{ color: "var(--app-fg-strong)" }}>{title}</h1>
            {crumbs.length > 0 && <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm">
              {crumbs.map((c, i) => (
                <span key={c} className="flex items-center gap-1">
                  {i > 0 && <span className="fathom-muted">/</span>}
                  <span className={i === crumbs.length - 1 ? "" : "fathom-sec"} style={i === crumbs.length - 1 ? { color: "var(--app-fg-strong)" } : undefined}>{c}</span>
                </span>
              ))}
            </nav>}
          </div>
          <div className="flex flex-wrap gap-1.5 lg:gap-3.5"><StoreActions /></div>
        </Container>
      </div>
      {bare ? children : <Container>{children}</Container>}
    </>
  );
}
