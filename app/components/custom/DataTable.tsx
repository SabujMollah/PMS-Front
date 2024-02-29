"use client";
import React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  ColumnFiltersState,
  getFilteredRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  button: {
    btnName?: string;
    url?: string;
  };
  searchParam?: string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  button: { btnName = "", url = "" },
  searchParam,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const navigate = usePathname();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });
  // console.log(navigate !== ("/dashboard/kpi-list" || "/dashboard/my-leaves"));
  return (
    <div>
      <div className="flex justify-between pb-4">
        {  (
            <Input
              id="search-input"
              placeholder="Filter Name..."
              value={
                (table
                  .getColumn(`${searchParam}`)
                  ?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table
                  .getColumn(`${searchParam}`)
                  ?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
          )}

        {btnName && (
          <Link href={`${url}`}>
            <Button id="create">{btnName}</Button>
          </Link>
        )}
      </div>
      <div className="rounded-md border bg-white overflow-hidden shadow-xl sm:rounded-lg py-4 px-4 ">
        <Card>
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className="text-center font-bold p-2 h-[2.5rem]"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="text-center">
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  // <div>
                  //   <TableRow>{`${row.id} + 1`}</TableRow>
                  <TableRow
                    key={row.id}
                    id={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="p-2">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                  // </div>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            id="previous"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            id="next"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
