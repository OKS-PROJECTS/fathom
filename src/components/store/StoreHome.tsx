"use client";

import Link from "next/link";
import { ChevronRight, Headset, Percent, RotateCcw, Search, ShoppingCart, Truck, type LucideIcon } from "lucide-react";
import { Button, TextField } from "oks-ui";
import { Surface } from "@/components/ui/Surface";
import { HexBadge } from "@/components/profile/parts";
import { ProductCard, SaleTag, Sneaker, StoreFrame, type Product } from "./parts";

const BRANDS = ["Stridewell", "Aerolite", "Kestrel", "Northpace", "Coastline", "Ridgeback", "Tempo"];
const NAMES = [
  "Harbor Glide Lightweight Runner Pro Edition", "Wave Crest Dynamic Boost Sneaker", "Granite Edge High Impact Stability Lightweight Trainers", "Velocity Drift Xtreme High Shock Absorbers",
];
const mk = (rows: [number, number, number?, string?][], offset: number): Product[] => rows.map(([rating, price, was, sale], i) => ({ id: offset + i, name: NAMES[i % 4], rating, price, was, sale, hue: (offset * 47 + i * 83) % 360 }));
const NEW = mk([[5.0, 99], [4.7, 120], [3.5, 65.99], [4.9, 110]], 1);
const POPULAR = mk([[5.0, 99], [3.5, 65.99], [4.7, 120], [4.9, 110]], 5);
const DEALS = mk([[5.0, 99, 140, "save 40%"], [3.5, 46, 110, "save 40%"], [4.7, 140, 179, "save 40%"], [4.9, 280, 315, "save 40%"]], 9);
const SERVICES: [LucideIcon, string, string][] = [[Truck, "Free Shipping", "No added delivery fees"], [Headset, "24/7 Support", "Help anytime, anywhere"], [Percent, "Discounts", "Save big on top deals"], [RotateCcw, "Money-Back", "Full refund, no risk"]];

const Head = ({ title, small = false }: { title: string; small?: boolean }) => (
  <div className="flex justify-between gap-4">
    <span className="text-lg font-medium" style={{ color: "var(--app-fg-strong)" }}>{title}</span>
    <Link href="/store-client/search-results-grid" className={`flex items-center gap-1.5 font-medium ${small ? "text-xs" : "text-[13px]"}`} style={{ color: "var(--app-primary)" }}>See All<ChevronRight size={16} aria-hidden /></Link>
  </div>
);
const Row = ({ title, items, small }: { title: string; items: Product[]; small?: boolean }) => (
  <div className="space-y-4"><Head title={title} small={small} /><div className="mb-2 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">{items.map((p) => <ProductCard key={p.id} p={p} />)}</div></div>
);

export function StoreHomePage() {
  return (
    <StoreFrame title="Home" crumbs={["Store - Client", "Home"]}>
      <div className="grid grid-cols-1 gap-6">
        <Surface className="relative mb-3.5 h-[140px] overflow-hidden" style={{ background: "linear-gradient(120deg, color-mix(in srgb, var(--oks-color-primary-500) 14%, var(--app-surface)), color-mix(in srgb, var(--oks-color-info-500) 10%, var(--app-surface)))" }}>
          <svg viewBox="0 0 1140 140" className="absolute inset-0 size-full" preserveAspectRatio="none" aria-hidden><path d="M0 100c120-60 240 40 380-10s260-50 380 0 260 60 380-10v60H0z" fill="var(--oks-color-primary-500)" fillOpacity=".12" /><path d="M0 120c140-40 280 30 420-5s280-40 420 5 200 20 300-10v30H0z" fill="var(--oks-color-primary-500)" fillOpacity=".1" /></svg>
          <div className="relative top-1/2 z-[1] mx-auto flex w-[90%] max-w-[420px] -translate-y-1/2">
            <TextField aria-label="Search shop" size="lg" placeholder="Search shop" startIcon={<Search size={16} />} endIcon={<span className="whitespace-nowrap rounded-sm border px-[0.325rem] text-[0.6875rem] leading-5 fathom-sec" style={{ borderColor: "var(--app-border)" }}>⌘ K</span>} />
          </div>
        </Surface>

        <div className="mb-2 grid gap-5 sm:grid-cols-4 xl:grid-cols-7">
          {BRANDS.map((b, i) => (
            <Surface key={b}><div className="flex grow flex-col items-start p-5 pb-0"><div className="text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>{b}</div><div className="flex h-[100px] w-full items-center justify-center"><Sneaker hue={(i * 53 + 20) % 360} width={104} /></div></div></Surface>
          ))}
        </div>

        <div className="space-y-5">
          <Head title="Special Offers" small />
          <div className="mb-2 grid gap-5 xl:grid-cols-2">
            <div>
              <div className="flex h-full flex-col rounded-xl border" style={{ background: "color-mix(in srgb, var(--oks-palette-violet-500) 10%, var(--app-surface))", borderColor: "color-mix(in srgb, var(--oks-palette-violet-500) 30%, var(--app-surface))" }}>
                <div className="flex grow flex-wrap justify-between gap-5 px-7.5 pb-0 pt-5 sm:flex-nowrap lg:gap-9">
                  <div className="flex flex-col">
                    <div className="mb-3"><SaleTag>save 25%</SaleTag></div>
                    <h3 className="mb-1 text-[26px] font-semibold" style={{ color: "var(--app-fg-strong)" }}>Stridewell Air Max 270</h3>
                    <span className="mb-5 text-sm font-normal leading-5.5" style={{ color: "var(--app-fg)" }}>The Melodic Monster of Sonic Delights and Harmonious Rhythms</span>
                    <div className="flex items-center gap-4"><button type="button" className="inline-flex h-7 items-center gap-1.5 rounded-md px-2.5 text-xs font-medium fathom-btn-ink" ><ShoppingCart size={14} />Add to Card</button><span className="text-base font-semibold" style={{ color: "var(--app-fg-strong)" }}>$140.00</span></div>
                  </div>
                  <div className="flex items-end"><Sneaker hue={285} width={250} /></div>
                </div>
              </div>
            </div>
            <div className="grid items-stretch gap-5 sm:grid-cols-2">
              {([["Stridewell Dunk Low", "$110.00", "var(--oks-color-success-50)", "var(--oks-color-success-200)", 150], ["Stridewell Force 1", "$96.99", "color-mix(in srgb, var(--oks-color-primary-500) 10%, transparent)", "color-mix(in srgb, var(--oks-color-primary-500) 10%, transparent)", 230]] as const).map(([n, pr, bg, bd, hue]) => (
                <div key={n} className="flex h-full flex-col rounded-xl border" style={{ background: bg, borderColor: bd }}>
                  <div className="flex grow flex-col px-5 pb-0 pt-5">
                    <div className="mb-3.5"><SaleTag>save 25%</SaleTag></div>
                    <span className="mb-3 text-base font-medium" style={{ color: "var(--app-fg-strong)" }}>{n}</span>
                    <Button variant="bordered" size="sm" className="mb-2.5 self-start" startContent={<ShoppingCart size={14} />}>Add to Card</Button>
                    <span className="text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>{pr}</span>
                    <div className="flex size-48 items-end"><Sneaker hue={hue} width={190} /></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Row title="New Arrivals" items={NEW} small />
        <Row title="Popular Sneakers" items={POPULAR} small />
        <Row title="Limited-Time Deals" items={DEALS} />

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {SERVICES.map(([I, t, d]) => (
            <Surface key={t}><div className="flex grow gap-3.5 p-5"><HexBadge tone="primary"><I size={20} /></HexBadge><div className="flex flex-col"><Link href="/store-client/home" className="text-base font-medium" style={{ color: "var(--app-fg-strong)" }}>{t}</Link><span className="text-xs font-normal fathom-sec">{d}</span></div></div></Surface>
          ))}
        </div>
      </div>
    </StoreFrame>
  );
}
