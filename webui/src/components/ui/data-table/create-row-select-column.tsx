import type { ColumnDef, RowData } from "@tanstack/react-table";
import type { ReactNode } from "react";

import { Checkbox } from "@/components/ui/checkbox";

type RowSelectColumnOptions<TData extends RowData> = {
  size?: number;
  headerAriaLabel?: string;
  rowAriaLabel?: string | ((row: TData) => string);
  alignCenter?: boolean;
  isRowSelected?: (row: TData) => boolean;
  onToggleRowSelection?: (row: TData) => void;
  getAllRows?: () => TData[];
};

export function createRowSelectColumn<TData extends RowData>({
  size = 50,
  headerAriaLabel = "Select all",
  rowAriaLabel = "Select row",
  alignCenter = true,
  isRowSelected,
  onToggleRowSelection,
  getAllRows,
}: RowSelectColumnOptions<TData> = {}): ColumnDef<TData> {
  const wrapperClassName = alignCenter ? "flex items-center justify-center" : undefined;
  const hasExternalSelection = Boolean(isRowSelected && onToggleRowSelection);

  const wrap = (content: ReactNode) =>
    wrapperClassName ? <div className={wrapperClassName}>{content}</div> : content;

  return {
    id: "select",
    header: ({ table }) =>
      wrap(
        hasExternalSelection ? (
          <Checkbox
            checked={(() => {
              const rows = getAllRows?.() ?? [];
              if (rows.length === 0) return false;
              const allSelected = rows.every((row) => isRowSelected?.(row) ?? false);
              const someSelected = rows.some((row) => isRowSelected?.(row) ?? false);
              return allSelected ? true : someSelected ? "indeterminate" : false;
            })()}
            onCheckedChange={(value) => {
              const shouldSelectAll = Boolean(value);
              (getAllRows?.() ?? []).forEach((row) => {
                const selected = isRowSelected?.(row) ?? false;
                if (shouldSelectAll !== selected) {
                  onToggleRowSelection?.(row);
                }
              });
            }}
            aria-label={headerAriaLabel}
          />
        ) : (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label={headerAriaLabel}
          />
        ),
      ),
    cell: ({ row }) => {
      const label = typeof rowAriaLabel === "function" ? rowAriaLabel(row.original) : rowAriaLabel;
      return wrap(
        <Checkbox
          checked={
            hasExternalSelection ? (isRowSelected?.(row.original) ?? false) : row.getIsSelected()
          }
          onCheckedChange={(value) => {
            if (hasExternalSelection) {
              const shouldSelect = Boolean(value);
              const selected = isRowSelected?.(row.original) ?? false;
              if (shouldSelect !== selected) {
                onToggleRowSelection?.(row.original);
              }
              return;
            }
            row.toggleSelected(!!value);
          }}
          aria-label={label}
        />,
      );
    },
    enableSorting: false,
    enableHiding: false,
    size,
    minSize: size,
    maxSize: size,
  };
}
