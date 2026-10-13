"use client";

import { useMemo, useState, type ReactNode } from "react";
import { Pagination, SelectField, Table, type TableColumn, type TableSortDescriptor } from "oks-ui";
import { Surface, SurfaceFooter, SurfaceHeader } from "./Surface";

/** Card holding a sortable, selectable table with a rows-per-page footer. */
export function DataGridCard<R extends Record<string, unknown>>({
  title, toolbar, columns, rows, getRowKey, pageSizes = [5, 10, 15], defaultSort, selectable = true, headerClass = "py-3.5",
}: {
  title: ReactNode; toolbar?: ReactNode; columns: TableColumn<R>[]; rows: R[]; getRowKey: (r: R) => string | number;
  pageSizes?: number[]; defaultSort?: TableSortDescriptor; selectable?: boolean; headerClass?: string;
}) {
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(pageSizes[0]);
  const pageRows = useMemo(() => rows.slice((page - 1) * size, page * size), [rows, page, size]);
  const from = rows.length ? (page - 1) * size + 1 : 0;
  const to = Math.min(page * size, rows.length);
  return (
    <Surface>
      <SurfaceHeader className={headerClass} title={title} actions={toolbar} />
      <div className="fathom-table grid grow">
        <Table aria-label={typeof title === "string" ? title : "Table"} columns={columns} rows={pageRows} getRowKey={getRowKey}
          selectionMode={selectable ? "multiple" : "none"} defaultSortDescriptor={defaultSort} removeWrapper />
      </div>
      <SurfaceFooter>
        <div className="flex grow flex-col flex-wrap items-center justify-between gap-2.5 py-2.5 sm:flex-row sm:py-0">
          <div className="order-2 flex items-center gap-2.5 sm:order-1">
            <span className="text-sm fathom-muted">Rows per page</span>
            <div className="fathom-select-plain fathom-select-compact">
              <SelectField aria-label="Rows per page" size="sm" value={String(size)} onChange={(v) => { setSize(Number(v)); setPage(1); }}
                options={pageSizes.map((n) => ({ label: String(n), value: String(n) }))} />
            </div>
          </div>
          <div className="order-1 flex flex-col items-center gap-2.5 sm:order-2 sm:flex-row">
            <span className="order-2 text-nowrap text-sm fathom-muted sm:order-1">{from} - {to} of {rows.length}</span>
            <div className="order-1 sm:order-2 fathom-pager"><Pagination page={page} pageSize={size} total={rows.length} onChange={setPage} size="sm" variant="ghost" /></div>
          </div>
        </div>
      </SurfaceFooter>
    </Surface>
  );
}
