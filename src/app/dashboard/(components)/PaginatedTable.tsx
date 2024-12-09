"use client";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Column } from "@/interfaces";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

type PaginatedTableProps<T> = {
  headers: string[];
  itemsPerPage: number;
  loading: boolean;
  data: T[];
  columns: Column<T>[];
  totalItems: number;
  totalPages: number;
  skeletonColumns: any;
};

function PaginatedTable<T>({ headers, itemsPerPage = 10, skeletonColumns, totalItems, totalPages, loading, data, columns }: PaginatedTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {headers.map((headerTitle, index) => {
                return <TableHead key={`HT-${index}`}>{headerTitle}</TableHead>;
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: itemsPerPage }).map((_, index) => <TableRow key={index}>{skeletonColumns}</TableRow>)
            ) : totalItems ? (
              data.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((column, colIndex) => (
                    <TableCell key={colIndex}>
                      {column.render ? column.render(row[column.accessor], row) : (row[column.accessor] as React.ReactNode)}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <tr>
                <td colSpan={12} className="text-center">
                  <div className="text-xl mx-auto w-full items-center font-bold my-12 justify-center text-center">No Data Found</div>
                </td>
              </tr>
            )}
          </TableBody>
        </Table>
      </div>
      {totalItems ? (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-700">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems} results
          </p>
          <div className="flex space-x-2">
            <Button variant="outline" size="sm" onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Previous page</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next page</span>
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default PaginatedTable;
