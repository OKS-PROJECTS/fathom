"use client";

import { LifeBuoy, MessageCircleQuestion } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { PageActions } from "@/components/profile/ProfileShell";
import { ActivityFeed } from "@/components/profile/ActivityPage";
import { Help } from "./HelpCards";

export function AccountActivityPage() {
  return (
    <>
      <PageHeader title="Activity" crumbs={["My Account", "Activity"]} actions={<PageActions />} />
      <Container>
        <div className="grid gap-5 lg:gap-7.5">
          <ActivityFeed />
          <div className="grid gap-5 lg:grid-cols-2 lg:gap-7.5">
            <Help title="Contact Support" text="Need a hand? Reach our support team for quick, personal help with any questions or concerns." link="Contact Support" icon={<LifeBuoy size={48} strokeWidth={1.5} />} />
            <Help title="Questions" text="Browse our Help Center for step-by-step guidance on billing, payments and subscriptions." link="Go to Help Center" icon={<MessageCircleQuestion size={48} strokeWidth={1.5} />} />
          </div>
        </div>
      </Container>
    </>
  );
}
