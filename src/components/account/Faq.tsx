"use client";

import { Accordion, AccordionItem } from "oks-ui";
import { Surface, SurfaceHeader } from "@/components/ui/Surface";

const FAQ = ["How is the price of each plan worked out?", "Which payment methods do you take for subscriptions?", "Does the pricing include any hidden charges?", "Do yearly subscriptions come with a discount?", "Can I get a refund if I cancel a subscription?", "Is it possible to add features to my current plan?"];

/** Six-question accordion card that closes several account pages. */
export function FaqCard() {
  return (
    <Surface>
      <SurfaceHeader title="FAQ" />
      <div className="fathom-faq px-5 py-3"><Accordion variant="light" selectionMode="single">
        {FAQ.map((q) => <AccordionItem key={q} itemKey={q} title={q}><p className="pb-4 text-sm fathom-sec">Pricing depends on the plan you choose, the number of seats and the billing period. You can compare every tier on the plans page.</p></AccordionItem>)}
      </Accordion></div>
    </Surface>
  );
}
