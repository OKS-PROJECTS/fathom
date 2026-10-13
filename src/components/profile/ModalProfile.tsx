"use client";

import { SafeModal } from "@/components/ui/Safe";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Avatar, Button } from "oks-ui";
import { BadgeCheck, EllipsisVertical, Luggage, Mail, MessagesSquare, Truck, Users, Volleyball, X, Zap } from "lucide-react";
import { CardWithFooter, CompanyMark, DonutCard, FooterLink, HexBadge, KeyValueTable, ProjectsCard } from "./parts";
import { avatarUrl } from "@/lib/avatar";

const ABOUT: [string, string][] = [["Age:", "32"], ["City:", "Lisbon"], ["State:", "Estremadura"], ["Country:", "Portugal"], ["Postcode:", "1100-148"], ["Phone:", "+351 912 345 678"], ["Email:", "amara@alder.example"]];
const JOBS = [["Quartz Studio", "Senior Project Manager", "2019 - Present"], ["Pinecrest", "Product Lead", "2012 - 2019"], ["Lattice Co", "UX Research", "2010 - 2012"]];

export function ModalProfile() {
  const router = useRouter();
  const close = () => router.push("/public-profile/profiles/default");
  return (
    <SafeModal isOpen onClose={close} size={1320} classNames={{ base: "fathom-modal-xl", body: "fathom-modal-body", closeButton: "hidden" }}>
      <div className="flex min-h-0 flex-col">
        <div className="fathom-modal-cover relative flex min-h-80 flex-col items-stretch justify-end">
          <div className="flex grow flex-col justify-end px-9" style={{ background: "linear-gradient(to top, var(--app-surface), transparent 40%)" }}>
            <div className="mb-5 flex"><Avatar name="Amara Alder" src={avatarUrl("profile-main")} size={100} className="fathom-ring" style={{ ["--ring" as string]: "var(--oks-color-success-500)" }} /></div>
            <div className="mb-5 grid w-full gap-3 lg:grid-cols-3">
              <div />
              <div className="flex flex-col">
                <div className="mb-2 flex items-center gap-1.5">
                  <Link href="/public-profile/profiles/modal" className="text-lg font-semibold leading-5" style={{ color: "var(--app-fg-strong)" }}>Amara Alder</Link>
                  <BadgeCheck size={16} style={{ color: "var(--app-primary)" }} aria-label="Verified" />
                </div>
                <div className="flex flex-wrap gap-1 text-sm lg:gap-3">
                  <div className="flex items-center gap-1"><Luggage size={16} className="fathom-muted" /><span className="fathom-sec">Alder Studio</span></div>
                  <div className="flex items-center gap-1"><Mail size={16} className="fathom-muted" /><span className="fathom-sec">amara@alder.example</span></div>
                </div>
              </div>
              <div className="flex items-end justify-end gap-2">
                <Button color="primary" startContent={<Users size={16} />}>Connect</Button>
                <Button variant="bordered" isIconOnly aria-label="Message"><Mail size={16} /></Button>
                <Button variant="bordered" isIconOnly aria-label="More actions"><EllipsisVertical size={16} /></Button>
              </div>
            </div>
          </div>
          <Button variant="bordered" className="absolute end-5 top-5" aria-label="Close" onPress={close}><X size={16} /></Button>
        </div>

        <div className="fathom-modal-scroll mb-5">
          <div className="grid grid-cols-1 gap-5 lg:gap-7.5 xl:grid-cols-3">
            <div className="col-span-1">
              <div className="grid gap-5 lg:gap-7.5">
                <CardWithFooter title="Community Badges" bodyClass="p-5 pb-7.5">
                  <div className="flex flex-wrap gap-3 lg:gap-4">
                    <HexBadge tone="primary"><Volleyball size={20} /></HexBadge><HexBadge tone="warning"><Zap size={20} /></HexBadge>
                    <HexBadge tone="success"><MessagesSquare size={20} /></HexBadge><HexBadge tone="secondary"><Truck size={20} /></HexBadge>
                  </div>
                </CardWithFooter>
                <CardWithFooter title="About"><KeyValueTable gap="" rows={ABOUT} /></CardWithFooter>
                <CardWithFooter title="Work Experience" footer={<FooterLink href="/public-profile/works">Open to Work</FooterLink>}>
                  <div className="grid gap-y-5">
                    {JOBS.map(([o, r, s], i) => (
                      <div key={o} className="grid gap-y-5">
                        {i === 1 && <div className="text-sm font-semibold leading-none fathom-sec">Previous Jobs</div>}
                        <div className="flex items-start gap-3.5"><CompanyMark name={o} />
                          <div className="flex flex-col gap-1"><Link href="/public-profile/profiles/modal" className="text-sm font-medium leading-none" style={{ color: "var(--app-primary)" }}>{o}</Link>
                            <span className="text-sm font-medium" style={{ color: "var(--app-fg-strong)" }}>{r}</span><span className="text-xs leading-none fathom-sec">{s}</span></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardWithFooter>
              </div>
            </div>
            <div className="col-span-1 xl:col-span-2">
              <div className="flex flex-col gap-5 lg:gap-7.5">
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-7.5">
                  <CardWithFooter title="Contributors" footer={<FooterLink href="/public-profile/network">All Contributors</FooterLink>}>
                    <div className="flex flex-col gap-2 lg:gap-5">
                      {([["Tyler Okafor", 6], ["Esther Linde", 29], ["Cody Marlowe", 34], ["Arlene Brandt", 1]] as const).map(([n, c], i) => (
                        <div key={n} className="flex gap-2.5"><Avatar name={n} src={avatarUrl(40 + i)} size={36} />
                          <div className="flex flex-col"><Link href="/public-profile/profiles/modal" className="mb-px text-sm font-semibold" style={{ color: "var(--app-fg-strong)" }}>{n}</Link><span className="text-xs font-semibold fathom-sec">{c} contributors</span></div></div>
                      ))}
                    </div>
                  </CardWithFooter>
                  <DonutCard title="Assistance" height={181} data={[{ k: "Design", v: 32 }, { k: "Dev", v: 26 }, { k: "Ops", v: 18 }, { k: "Sales", v: 14 }, { k: "Support", v: 10 }]} />
                </div>
                <ProjectsCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SafeModal>
  );
}
