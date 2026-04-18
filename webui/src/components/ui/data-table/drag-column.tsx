import { useSortable } from "@dnd-kit/sortable";
import type { ColumnDef } from "@tanstack/react-table";
import { GripVertical } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { IHasId } from "@/types/common";
import type { UniqueIdentifier } from "@dnd-kit/core";

function DragHandle({ id }: { id: UniqueIdentifier }) {
  "use no memo";
  const { attributes, listeners } = useSortable({
    id,
  });

  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="text-muted-foreground size-7 hover:bg-transparent"
    >
      <GripVertical className="text-muted-foreground size-3" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  );
}

export const dragColumn: ColumnDef<IHasId<UniqueIdentifier>> = {
  id: "drag",
  header: () => null,
  cell: ({ row }) => <DragHandle id={row.original.id ?? 0} />,
  enableSorting: false,
  enableHiding: false,
};
