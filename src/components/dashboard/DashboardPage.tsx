"use client";

import { Button } from "oks-ui";
import { CalendarDays, Download } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container, PageGrid, Row3 } from "@/components/ui/Container";
import { Hero } from "./Hero";
import { Highlights } from "./Highlights";
import { TeamsTable } from "./TeamsTable";
import { BlockList } from "./BlockList";

export function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Overview"
        crumbs={["Dashboards", "Overview"]}
        actions={
          <>
            <Button variant="bordered" startContent={<Download size={16} />}>Export</Button>
            <Button variant="bordered" startContent={<CalendarDays size={16} />}>Feb 03, 2026 - Feb 23, 2026</Button>
          </>
        }
      />
      <Container>
        <PageGrid>
          <Row3>
            <div className="lg:col-span-2"><Hero /></div>
            <div className="lg:col-span-1"><Highlights /></div>
          </Row3>
          <Row3>
            <div className="lg:col-span-2"><TeamsTable /></div>
            <div className="lg:col-span-1"><BlockList /></div>
          </Row3>
        </PageGrid>
      </Container>
    </>
  );
}
