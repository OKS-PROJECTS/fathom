import { LifeBuoy, MessageCircleQuestion } from "lucide-react";
import { Surface, SurfaceBody, SurfaceFooter } from "@/components/ui/Surface";
import { FooterLink } from "@/components/profile/parts";

function Art({ children, size = 150 }: { children: React.ReactNode; size?: number }) {
  return (
    <svg viewBox="0 0 160 150" width={size * 160 / 150} height={size} className="block shrink-0" style={{ maxHeight: size }} aria-hidden>
      <circle cx="80" cy="75" r="56" fill="var(--oks-color-primary-500)" fillOpacity=".1" stroke="var(--oks-color-primary-500)" strokeWidth="2.5" />
      <g transform="translate(56 51)" style={{ color: "var(--oks-color-primary-500)" }}>{children}</g>
    </svg>
  );
}
export function Help({ title, text, link, icon, artSize = 150 }: { title: string; text: string; link: string; icon: React.ReactNode; artSize?: number }) {
  return (
    <Surface>
      <SurfaceBody className="px-10 py-7.5 lg:pe-12.5">
        <div className="flex flex-wrap gap-6 md:flex-nowrap md:gap-10">
          <div className="flex flex-col items-start gap-3">
            <h2 className="text-xl font-medium" style={{ color: "var(--app-fg-strong)" }}>{title}</h2>
            <p className="mb-2.5 text-sm leading-5.5" style={{ color: "var(--app-fg)" }}>{text}</p>
          </div>
          <Art size={artSize}>{icon}</Art>
        </div>
      </SurfaceBody>
      <SurfaceFooter className="items-center"><FooterLink href="#">{link}</FooterLink></SurfaceFooter>
    </Surface>
  );
}

/** Two side-by-side help cards that close several account pages. */
export function HelpCards() {
  return (
    <div className="grid gap-5 lg:grid-cols-2 lg:gap-7.5">
      <Help title="Questions ?" text="Browse our Help Center for step-by-step guidance on billing, payments and subscriptions." link="Go to Help Center" icon={<MessageCircleQuestion size={48} strokeWidth={1.5} />} />
      <Help title="Contact Support" text="Need a hand? Reach our support team for quick, personal help with any questions or concerns." link="Contact Support" icon={<LifeBuoy size={48} strokeWidth={1.5} />} />
    </div>
  );
}
