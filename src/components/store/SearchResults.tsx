"use client";

import { SafeDrawer } from "@/components/ui/Safe";
import { useState } from "react";
import { Button, Checkbox, SelectField, TextField } from "oks-ui";
import Link from "next/link";
import { Funnel, LayoutGrid, List, Search, ShoppingCart, Star } from "lucide-react";
import { Surface } from "@/components/ui/Surface";
import { Money, ProductCard, RatingBadge, SaleTag, Sneaker, StoreFrame, type Product } from "./parts";

const WISH: [string, number, string, number, number | undefined, string | undefined][] = [["Harbor Glide Lightweight Runner Pro Edition", 5, "Stridewell", 120, undefined, undefined], ["Granite Edge High Impact Stability Lightweight..", 3.9, "Northpace", 99, undefined, undefined], ["Wave Crest Dynamic Boost Sneaker", 4.6, "Kestrel", 144, 179, "save 25%"], ["Harbor Glide Lightweight Runner Pro Edition", 4.2, "Northpace", 179, 230, undefined]];
const SKU = ["FX-204-BLK-42", "SNK-XY-WHT-10", "BT-A1-YLW-8", "RN-77-GRY-9"];
const BRAND = ["Stridewell", "Aerolite", "Kestrel", "Northpace"];
const KIND = ["Sneakers", "Running Shoes", "Boots", "Trainers"];

const NAMES = ["Harbor Glide Lightweight Runner Pro Edition", "Granite Edge High Impact Stability Lightweight Trainers", "Wave Crest Dynamic Boost Sneaker", "Velocity Drift Xtreme High Shock Absorbers"];
const BASE: [number, number, number?, string?][] = [[5, 99], [3.5, 65.99], [4.7, 120], [3.2, 140, 179, "save 40%"], [4.1, 140, 190, "save 40%"], [3.5, 65.99], [4.9, 110, 180, "save 40%"], [4.9, 110]];
export const RESULTS: Product[] = Array.from({ length: 12 }, (_, i) => { const [rating, price, was, sale] = BASE[i % BASE.length]; return { id: i, name: NAMES[i % 4], rating, price, was, sale, hue: (i * 61 + 30) % 360 }; });

export function SearchResultsPage({ title, view, details = false, wishlist = false }: { title: string; view: "grid" | "list"; details?: boolean; wishlist?: boolean }) {
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState(details);
  const [wish, setWish] = useState(wishlist);
  const [period, setPeriod] = useState("Today");
  return (
    <StoreFrame title={title} crumbs={["Store - Client", title]}>
      <div className="flex flex-col items-stretch gap-7">
        <div className="flex w-full items-center gap-3">
          <div className="w-full"><TextField aria-label="Search" defaultValue="Stridewell" startIcon={<Search size={16} />} endIcon={<span className="whitespace-nowrap rounded-sm border px-[0.325rem] text-[0.6875rem] leading-5 fathom-sec" style={{ borderColor: "var(--app-border)" }}>⌘ K</span>} /></div>
          <Button color="primary" startContent={<Funnel size={16} />} onPress={() => setOpen(true)}>Filter</Button>
        </div>
        <div className="mt-3 flex flex-wrap justify-between gap-5">
          <h3 className="text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>1 - 12 over 280 results for <span style={{ color: "var(--oks-color-danger-500)" }}>Stridewell</span></h3>
          <div className="flex gap-2.5">
            <div className="w-[195px]"><SelectField aria-label="Sort" defaultValue="hl" options={[{ label: "Price: High to Low", value: "hl" }, { label: "Price: Low to High", value: "lh" }, { label: "Rating", value: "r" }]} /></div>
            <div className="grid grid-cols-4 gap-1">{["Today", "Week", "Month", "All"].map((p) => <Button key={p} variant="bordered" onPress={() => setPeriod(p)} style={period === p ? { background: "var(--app-surface-2)" } : undefined}>{p}</Button>)}</div>
            <div className="flex gap-1">{([["grid", LayoutGrid, "/store-client/search-results-grid"], ["list", List, "/store-client/search-results-list"]] as const).map(([k, I, h]) => <Button key={k} as={Link} href={h} variant="bordered" isIconOnly aria-label={`${k} view`} style={view === k ? { background: "var(--app-surface-2)" } : undefined}><I size={16} /></Button>)}</div>
          </div>
        </div>
        {view === "grid" ? (
          <div className="mb-2 grid gap-5 sm:grid-cols-4">{RESULTS.map((p) => <ProductCard key={p.id} p={p} />)}</div>
        ) : (
          <div className="grid grid-cols-1 gap-5">
            {RESULTS.map((p, i) => (
              <Surface key={p.id}>
                <div className="flex grow flex-wrap justify-between gap-4.5 p-2 pe-5">
                  <div className="flex gap-3.5">
                    <div className="flex h-[70px] w-[90px] items-center justify-center overflow-hidden rounded-xl border" style={{ borderColor: "var(--app-border)", background: "color-mix(in srgb, var(--app-surface-2) 50%, transparent)" }}><Sneaker hue={p.hue} width={78} /></div>
                    <div className="flex flex-col gap-2">
                      <div className="-mt-1 flex gap-2.5"><Link href="/store-client/product-details" className="text-sm font-medium leading-5.5" style={{ color: "var(--app-fg-strong)" }}>{p.name}</Link></div>
                      <div className="flex flex-wrap gap-3">
                        <RatingBadge value={p.rating} />
                        <div className="flex flex-wrap gap-2 lg:gap-4">
                          <span className="text-xs uppercase fathom-sec">sku: <span className="text-xs font-medium" style={{ color: "var(--app-fg)" }}>{SKU[i % 4]}</span></span>
                          <span className="text-xs fathom-sec">Category: <span className="text-xs font-medium" style={{ color: "var(--app-fg)" }}>{BRAND[i % 4]}</span></span>
                          <span className="text-xs fathom-sec">Category: <span className="text-xs font-medium" style={{ color: "var(--app-fg)" }}>{KIND[i % 4]}</span></span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {p.was && <span className="text-xs line-through fathom-sec">{Money({ n: p.was })}</span>}
                    <span className="text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>{Money({ n: p.price })}</span>
                    <Button variant="bordered" className="ms-2" startContent={<ShoppingCart size={16} />}>Add to Cart</Button>
                  </div>
                </div>
              </Surface>
            ))}
          </div>
        )}
      </div>
      <SafeDrawer isOpen={wish} onClose={() => setWish(false)} position="right" width={560} title="Wishlist" actions={<Button variant="bordered" className="w-full" onPress={() => setWish(false)}>Remove all</Button>}>
        <div>
          {WISH.map(([n, r, b, price, was, sale], i) => (
            <Surface key={i} className="mb-7.5">
              <div className="flex grow justify-between gap-3.5 p-2 pe-5">
                <div className="flex h-[70px] w-[90px] shrink-0 items-center justify-center overflow-hidden rounded-xl border" style={{ borderColor: "var(--app-border)", background: "color-mix(in srgb, var(--app-surface-2) 50%, transparent)" }}><Sneaker hue={(i * 90 + 40) % 360} width={60} /></div>
                <div className="flex w-full flex-col gap-2">
                  <div className="-mt-1 flex flex-wrap justify-between gap-2.5"><Link href="#" className="text-sm font-medium leading-5.5" style={{ color: "var(--app-fg-strong)" }}>{n}</Link>{sale && <SaleTag>{sale}</SaleTag>}</div>
                  <div className="flex flex-wrap justify-between gap-3">
                    <div className="flex flex-wrap gap-3"><RatingBadge value={r} /><span className="text-xs fathom-sec">Brand: <span className="font-medium" style={{ color: "var(--app-fg)" }}>{b}</span></span></div>
                    <div className="flex items-center gap-3">{was && <span className="text-xs line-through fathom-sec">{Money({ n: was })}</span>}<span className="text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>{Money({ n: price })}</span><Button variant="bordered" size="sm" startContent={<ShoppingCart size={14} />}>Add</Button></div>
                  </div>
                </div>
              </div>
            </Surface>
          ))}
        </div>
      </SafeDrawer>
      <SafeDrawer isOpen={detail} onClose={() => setDetail(false)} position="right" width={520} title="Product Details" actions={<Button color="primary" startContent={<ShoppingCart size={16} />} className="grow" onPress={() => setDetail(false)}>Add to Cart</Button>}>
        <div className="flex flex-col gap-3">
          <div className="relative mb-6.5 flex h-[280px] items-center justify-center rounded-xl border" style={{ borderColor: "var(--app-border)", background: "color-mix(in srgb, var(--app-surface-2) 50%, transparent)" }}>
            <span className="absolute right-4 top-4"><SaleTag>save 40%</SaleTag></span>
            <Sneaker hue={250} width={300} />
          </div>
          <span className="text-base font-medium" style={{ color: "var(--app-fg-strong)" }}>Harbor Glide Lightweight Runner Pro Edition</span>
          <span className="mb-7 block text-sm font-normal" style={{ color: "var(--app-fg)" }}>Light and good-looking, these sneakers give all-day comfort with a breathable upper, cushioned soles and a grippy outsole. Great for everyday wear, workouts or weekend trips. Available in several colours and sizes.</span>
          <div className="flex flex-col gap-2.5 lg:mb-11">
            {([["Availability", <span key="a" className="inline-flex h-5 items-center rounded-sm px-[0.325rem] text-[0.6875rem] font-medium text-white" style={{ background: "#15803d" }}>In Stock</span>], ["SKU", <span key="s" className="text-xs font-medium">FX-204-BLK-42</span>], ["Category", <span key="c" className="text-xs font-medium">Sneakers</span>], ["Rating", <span key="r" className="flex gap-1">{[0, 1, 2, 3, 4].map((k) => <Star key={k} size={16} fill="currentColor" style={{ color: "var(--oks-color-warning-400)" }} aria-hidden />)}</span>], ["More Info", <span key="m" className="text-xs">10g powder, powder measure &amp; water dispensing bottle (empty)</span>]] as [string, React.ReactNode][]).map(([k, v]) => (
              <div key={k} className="flex gap-2.5"><span className="min-w-14 text-xs font-normal xl:min-w-24" style={{ color: "var(--app-fg)" }}>{k}</span><div>{v}</div></div>
            ))}
          </div>
          <div className="flex justify-end gap-2"><span className="text-base line-through fathom-sec">$140.00</span><span className="text-lg font-medium" style={{ color: "var(--app-fg-strong)" }}>$99.00</span></div>
        </div>
      </SafeDrawer>
      <SafeDrawer isOpen={open} onClose={() => setOpen(false)} position="right" title="Filter" actions={<Button color="primary" onPress={() => setOpen(false)}>Apply</Button>}>
        <div className="grid gap-4 p-1">
          <div className="text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>Brand</div>
          {["Stridewell", "Aerolite", "Kestrel", "Northpace"].map((b) => <Checkbox key={b} label={b} />)}
          <div className="text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>Rating</div>
          {["4 stars & up", "3 stars & up"].map((b) => <Checkbox key={b} label={b} />)}
        </div>
      </SafeDrawer>
    </StoreFrame>
  );
}
