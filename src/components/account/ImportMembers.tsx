"use client";

import { Button, Checkbox, TextAreaField } from "oks-ui";
import { LifeBuoy, LogOut, MousePointer, Users } from "lucide-react";
import { Surface, SurfaceFooter, SurfaceHeader } from "@/components/ui/Surface";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { PageActions } from "@/components/profile/ProfileShell";
import { FaqCard } from "./Faq";
import { Help } from "./HelpCards";
import { GuidesCard } from "./GuidesCard";

const OPTIONS: [string, string, boolean][] = [
  ["Create new users", "Choose this option to create accounts for everyone listed in the import file who does not yet have one in the system, so no one is left out of the batch.", true],
  ["Update existing users", "When ticked, users who already exist are refreshed with any new or changed details found in the import file, instead of being skipped over.", false],
  ["Send email notification on password change", "With this on, people receive an email straight away whenever their password changes, which improves security and keeps everyone in the loop.", true],
  ["Include external IDs in import results", "Adding external IDs to the import results lets administrators match and trace each user record against outside systems and reports with less effort.", false],
];
const GUIDES = [
  [Users, "Simplifying Member Onboarding: Import Tools and Guides", "Bring new members on board smoothly with our import tools. Detailed walkthroughs, practical resources and expert tips help you start quickly."],
  [LogOut, "Handling Big Rosters: Bulk Upload Features", "Look after your community with bulk member import. You will find step-by-step instructions, handy templates and best practices for large rosters."],
  [MousePointer, "Easy Enrollment: Import and Setup Basics", "Start a trouble-free member import with guided tools. Tutorials, practical advice and checklists keep every batch accurate."],
] as const;

export function ImportMembersPage() {
  return (
    <>
      <PageHeader title="Import Members" crumbs={["My Account", "Members & Roles", "Import Members"]} actions={<PageActions />} />
      <Container>
        <div className="grid grid-cols-1 gap-5 lg:gap-7.5 xl:grid-cols-3">
          <div className="col-span-2"><div className="flex flex-col gap-5 lg:gap-7.5">
            <Surface>
              <SurfaceHeader title="Start Import" />
              <div className="grid gap-7.5 p-5 py-5 lg:py-7.5">
                {OPTIONS.map(([t, d, on]) => (
                  <div key={t} className="flex flex-col gap-2.5">
                    <Checkbox defaultChecked={on} label={t} />
                    <p className="text-sm font-normal leading-5" style={{ color: "var(--app-fg)" }}>{d}</p>
                  </div>
                ))}
                <div className="flex flex-col gap-2.5">
                  <div className="flex gap-2.5"><Button color="primary">Select CSV File</Button><Button variant="ghost">Choose File</Button></div>
                  <p className="text-sm fathom-sec">Click &apos;Choose file&apos; to find and upload the CSV file holding your user data.</p>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>Custom welcome message</div>
                  <div className="[&_textarea]:!h-[118px]"><TextAreaField aria-label="Custom welcome message" defaultValue="Your welcome message here" rows={4} /></div>
                  <Checkbox defaultChecked label="Send welcome email to new users" />
                </div>
                <div className="text-sm" style={{ color: "var(--app-fg)" }}><span className="uppercase" style={{ color: "var(--oks-color-danger-500)" }}>Warning:</span> An email will be sent to all users created unless the welcome message is disabled in settings. Ensure the correct sender address and message are configured before you start the import.</div>
              </div>
              <SurfaceFooter className="items-center py-3.5"><Button color="primary">Import Member</Button></SurfaceFooter>
            </Surface>
            <FaqCard />
            <Help title="Contact Support" text="Need a hand? Reach our support team for quick, personal help with any questions or concerns." link="Contact Support" icon={<LifeBuoy size={48} strokeWidth={1.5} />} />
          </div></div>
          <div className="col-span-1"><div className="flex flex-col gap-5 lg:gap-7.5"><GuidesCard guides={GUIDES} extra={63} /></div></div>
        </div>
      </Container>
    </>
  );
}
