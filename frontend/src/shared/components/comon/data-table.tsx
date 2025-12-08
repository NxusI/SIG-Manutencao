import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { DataTableProps } from "@/shared/types/components.types";

export function DataTable<T>({
  columns,
  columnLabels,
  data,
  getRowId,
  columnClasses,
}: DataTableProps<T>) {
  return (
    <div
      className="w-full overflow-auto rounded-md border"
      style={{
        borderColor: "var(--color-border)",
        backgroundColor: "var(--color-card)",
        color: "var(--color-card-foreground)",
      }}
    >
      <Table className="min-w-[600px]">
        <TableHeader
          style={{
            backgroundColor: "var(--color-sidebar)",
            color: "var(--color-sidebar-foreground)",
          }}
        >
          <TableRow>
            {columns.map((col) => (
              <TableHead
                key={String(col)}
                className={columnClasses?.[col] ?? ""}
              >
                {columnLabels[col] ?? String(col)}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {data?.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="text-center"
                style={{ color: "var(--color-muted-foreground)" }}
              >
                Nenhum dado disponível
              </TableCell>
            </TableRow>
          )}

          {data?.map((row, index) => (
            <TableRow
              key={getRowId(row)}
              className={index % 2 === 0 ? "bg-[var(--color-muted)]" : ""}
            >
              {columns.map((col) => (
                <TableCell key={String(col)}>
                  {row[col] as React.ReactNode}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
