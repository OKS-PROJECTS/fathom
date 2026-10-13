"use client";

import Link from "next/link";
import { BaggageClaim } from "lucide-react";
import { Button } from "oks-ui";
import { Container } from "@/components/ui/Container";
import { LINES, OrderCard, Title } from "./Checkout";
import { StoreFrame } from "./parts";

export function MyOrdersPage() {
  return (
    <StoreFrame title="" crumbs={[]} bare>
      <Container><Title title="My Orders" sub="View and manage your orders" actions={<Button as={Link} href="/store-client/home" variant="bordered" startContent={<BaggageClaim size={16} />}>Continue Shopping</Button>} /></Container>
      <Container>
        <div className="grid gap-5 lg:gap-9 xl:grid-cols-1">
          <OrderCard lines={LINES} />
          <OrderCard lines={LINES.slice(0, 1)} />
        </div>
      </Container>
    </StoreFrame>
  );
}
