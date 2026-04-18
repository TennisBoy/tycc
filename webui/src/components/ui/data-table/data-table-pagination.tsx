import type { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Icons } from "../icons";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  children?: React.ReactNode;
  leftContent?: React.ReactNode;
}

export function DataTablePagination<TData>({ table, children, leftContent }: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3">
      <div className="flex flex-1 items-center gap-3">
        <Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => {
            table.setPageSize(Number(value));
          }}
        >
          <SelectTrigger className="h-8 w-[70px] bg-gray-50">
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent side="top">
            {[10, 20, 50, 100].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <p className="text-sm text-gray-700">items</p>
        {leftContent}
      </div>
      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size="sm"
          className="h-8 min-w-[32px] px-2 text-gray-600"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          First
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-8 w-8 p-0 text-gray-600"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <Icons.ChevronLeft className="h-4 w-4" />
        </Button>
        <div className="flex items-center gap-1">
          {(() => {
            const totalPages = table.getPageCount();
            const currentPage = table.getState().pagination.pageIndex + 1;

            return Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <Button
                  key={pageNum}
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  onClick={() => table.setPageIndex(pageNum - 1)}
                  className={`h-8 w-8 p-0 ${
                    currentPage === pageNum
                      ? "border-blue-200 bg-blue-100 text-blue-600 shadow-none hover:bg-blue-100 hover:text-blue-600"
                      : "text-gray-600"
                  }`}
                >
                  {pageNum}
                </Button>
              );
            });
          })()}
        </div>
        <Button
          variant="outline"
          size="sm"
          className="h-8 w-8 p-0 text-gray-600"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <Icons.ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="h-8 min-w-[32px] px-2 text-gray-600"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          Last
        </Button>
      </div>
      <div className="flex flex-1 items-center justify-end gap-2">{children}</div>
    </div>
  );
}
