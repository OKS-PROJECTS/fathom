"use client";

import { useState, type ReactNode } from "react";
import {
  Accordion, AccordionItem, Avatar, AvatarGroup, BreadcrumbItem, Breadcrumbs, Button, Chart, Checkbox, Chip,
  Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, OtpField, PasswordField, Pagination, Progress,
  Radio, Rating, SegmentedControl, SelectField, SwitchField, Tab, Table, Tabs, TextAreaField, TextField, toast,
  type TableColumn,
} from "oks-ui";
import { Search } from "lucide-react";
import { Surface, SurfaceBody, SurfaceHeader } from "@/components/ui/Surface";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { SafeDatePicker, SafeDrawer, SafeModal } from "@/components/ui/Safe";
import { avatarUrl } from "@/lib/avatar";

function Section({ title, children, cols = 1 }: { title: string; children: ReactNode; cols?: 1 | 2 }) {
  return (
    <Surface>
      <SurfaceHeader title={title} />
      <SurfaceBody className={`grid gap-5 p-5 ${cols === 2 ? "lg:grid-cols-2" : ""}`}>{children}</SurfaceBody>
    </Surface>
  );
}
const Label = ({ children }: { children: ReactNode }) => <div className="mb-2.5 text-xs font-medium uppercase tracking-wide fathom-sec">{children}</div>;
const Row = ({ children }: { children: ReactNode }) => <div className="flex flex-wrap items-center gap-2.5">{children}</div>;

type R = { id: number; name: string; role: string; status: string };
const ROWS: R[] = [
  { id: 1, name: "Amara Alder", role: "Designer", status: "Active" },
  { id: 2, name: "Bruno Brandt", role: "Engineer", status: "Pending" },
  { id: 3, name: "Celine Castell", role: "Manager", status: "Active" },
];
const COLS: TableColumn<R>[] = [
  { key: "name", header: "Name", sortable: true, sortValue: (r) => r.name, render: (r) => r.name },
  { key: "role", header: "Role", sortable: true, sortValue: (r) => r.role, render: (r) => r.role },
  { key: "status", header: "Status", render: (r) => <Chip size="sm" variant="soft" color={r.status === "Active" ? "success" : "warning"} radius="md">{r.status}</Chip> },
];
const SERIES = [{ m: "Jan", v: 24 }, { m: "Feb", v: 38 }, { m: "Mar", v: 31 }, { m: "Apr", v: 52 }, { m: "May", v: 47 }, { m: "Jun", v: 63 }];

export function GalleryPage() {
  const [seg, setSeg] = useState("week");
  const [modal, setModal] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [page, setPage] = useState(2);
  return (
    <>
      <PageHeader title="Components" crumbs={["Components"]} />
      <Container>
        <div className="grid gap-5 lg:gap-7.5">
          <Section title="Buttons" cols={2}>
            <div><Label>Variants</Label><Row><Button color="primary">Solid</Button><Button variant="bordered">Bordered</Button><Button variant="ghost">Ghost</Button><Button variant="link" color="primary">Link</Button></Row></div>
            <div><Label>Colours</Label><Row>{(["primary", "success", "warning", "danger"] as const).map((c) => <Button key={c} color={c}>{c}</Button>)}</Row></div>
            <div><Label>Sizes</Label><Row><Button size="sm" color="primary">Small</Button><Button color="primary">Medium</Button><Button size="lg" color="primary">Large</Button></Row></div>
            <div><Label>States</Label><Row><Button color="primary" isLoading>Saving</Button><Button isDisabled>Disabled</Button></Row></div>
          </Section>

          <Section title="Form fields" cols={2}>
            <TextField label="Text field" placeholder="Type here" startIcon={<Search size={16} />} />
            <PasswordField label="Password field" placeholder="Enter password" />
            <SelectField label="Select field" defaultValue="b" options={[{ label: "Option A", value: "a" }, { label: "Option B", value: "b" }, { label: "Option C", value: "c" }]} />
            <SafeDatePicker label="Date picker" />
            <TextAreaField label="Text area" placeholder="Write a note" rows={3} />
            <div className="grid content-start gap-4">
              <Checkbox defaultChecked label="Checkbox" />
              <Radio name="demo" defaultChecked label="Radio option" />
              <SwitchField aria-label="Switch" size="sm" defaultChecked />
              <OtpField aria-label="One-time code" length={6} />
            </div>
          </Section>

          <Section title="Feedback and display" cols={2}>
            <div><Label>Chips</Label><Row>{(["primary", "success", "warning", "danger", "info", "secondary"] as const).map((c) => <Chip key={c} size="sm" variant="soft" color={c} radius="md">{c}</Chip>)}</Row></div>
            <div><Label>Avatars</Label><AvatarGroup size={32} max={4} overlap={8}>{[1, 2, 3, 4, 5].map((n) => <Avatar key={n} name={`User ${n}`} src={avatarUrl(n)} />)}</AvatarGroup></div>
            <div><Label>Progress</Label><Progress aria-label="Progress" value={64} /></div>
            <div><Label>Rating</Label><Rating value={4} isReadOnly aria-label="4 of 5" /></div>
            <div><Label>Toast</Label><Row><Button variant="bordered" onPress={() => toast.success("Changes saved")}>Show toast</Button></Row></div>
            <div><Label>Segmented control</Label><SegmentedControl aria-label="Range" value={seg} onChange={setSeg} options={[{ label: "Day", value: "day" }, { label: "Week", value: "week" }, { label: "Month", value: "month" }]} /></div>
          </Section>

          <Section title="Navigation" cols={2}>
            <div><Label>Tabs</Label><Tabs aria-label="Demo tabs" variant="underlined">{["Overview", "Activity", "Settings"].map((t) => <Tab key={t} title={t} />)}</Tabs></div>
            <div><Label>Breadcrumbs</Label><Breadcrumbs aria-label="Trail"><BreadcrumbItem>Home</BreadcrumbItem><BreadcrumbItem>Library</BreadcrumbItem><BreadcrumbItem>Data</BreadcrumbItem></Breadcrumbs></div>
            <div><Label>Pagination</Label><Pagination page={page} pageSize={10} total={60} onChange={setPage} size="sm" variant="ghost" /></div>
            <div><Label>Dropdown</Label><Dropdown><DropdownTrigger><Button variant="bordered">Open menu</Button></DropdownTrigger><DropdownMenu aria-label="Actions"><DropdownItem title="View" /><DropdownItem title="Edit" /><DropdownItem title="Remove" /></DropdownMenu></Dropdown></div>
            <div className="lg:col-span-2"><Label>Accordion</Label><Accordion variant="light" selectionMode="single">{["What is included?", "Can I change the theme?"].map((q) => <AccordionItem key={q} itemKey={q} title={q}><p className="pb-4 text-sm fathom-sec">Every part of the interface is built from oks-ui components and themed through tokens.</p></AccordionItem>)}</Accordion></div>
          </Section>

          <Section title="Data" cols={2}>
            <div><Label>Table</Label><Table aria-label="People" columns={COLS} rows={ROWS} getRowKey={(r) => r.id} selectionMode="multiple" /></div>
            <div><Label>Area chart</Label><Chart type="area" data={SERIES} x="m" series={[{ key: "v", name: "Visits", color: "var(--oks-color-primary-500)" }]} height={220} unstyled legend={false} line={{ curve: "smooth", strokeWidth: 3, markers: { show: false }, area: { show: true, fill: { opacity: 0.25 } } }} grid={{ horizontal: true, vertical: false, dasharray: "4 4" }} /></div>
          </Section>

          <Section title="Overlays">
            <Row><Button variant="bordered" onPress={() => setModal(true)}>Open modal</Button><Button variant="bordered" onPress={() => setDrawer(true)}>Open drawer</Button><span className="text-sm fathom-sec">Press <kbd className="rounded border px-1.5 text-xs" style={{ borderColor: "var(--app-border-input)" }}>cmd + /</kbd> for the command palette.</span></Row>
          </Section>
        </div>
      </Container>
      <SafeModal isOpen={modal} onClose={() => setModal(false)} size={440} title="Modal">
        <p className="text-sm fathom-sec">Modals trap focus, close on Escape and restore focus when dismissed.</p>
        <div className="mt-5 flex justify-end"><Button color="primary" onPress={() => setModal(false)}>Done</Button></div>
      </SafeModal>
      <SafeDrawer isOpen={drawer} onClose={() => setDrawer(false)} position="right" title="Drawer" width={420}>
        <p className="text-sm fathom-sec">Drawers slide in from any edge and are used for filters, details and notifications.</p>
      </SafeDrawer>
    </>
  );
}
