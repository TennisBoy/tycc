import type { ColumnDef } from "@tanstack/react-table";

import { createRowSelectColumn } from "@/components/ui/data-table/create-row-select-column";

export const SelectColumn: ColumnDef<unknown> = createRowSelectColumn({ alignCenter: true });
