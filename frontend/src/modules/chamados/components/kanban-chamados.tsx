import { useEffect, useState } from "react";
import { Column } from "../types/chamados.types";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  closestCorners,
} from "@dnd-kit/core";
import { defaultDropAnimationSideEffects } from "@dnd-kit/core";
import ColumnKanban from "./column";
import { STATUS_COLUMNS } from "../data/status";
import { Skeleton } from "@/shared/components/ui/skeleton";

const KanbanChamados = ({
  columns,
  loading,
}: {
  columns: Column[];
  loading: boolean;
}) => {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [internalColumns, setInternalColumns] = useState<Column[]>(columns);

  useEffect(() => {
    setInternalColumns(columns);
  }, [columns]);

  function findColumnByCardId(cardId: string, cols: Column[]) {
    return cols.find((col) =>
      col.cards.some((card) => String(card.idChamado) === cardId)
    );
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    setActiveCardId(null);
    if (!over) return;

    setInternalColumns((prev) => {
      const sourceColumn = findColumnByCardId(active.id as string, prev);

      const destinationColumn =
        findColumnByCardId(over.id as string, prev) ??
        prev.find((col) => col.id === over.id);

      if (!sourceColumn || !destinationColumn) return prev;
      if (sourceColumn.id === destinationColumn.id) return prev;

      const draggedCard = sourceColumn.cards.find(
        (card) => String(card.idChamado) === active.id
      );

      if (!draggedCard) return prev;

      return prev.map((column) => {
        if (column.id === sourceColumn.id) {
          return {
            ...column,
            cards: column.cards.filter(
              (card) => card.idChamado !== draggedCard.idChamado
            ),
          };
        }

        if (column.id === destinationColumn.id) {
          return {
            ...column,
            cards: [...column.cards, draggedCard],
          };
        }

        return column;
      });
    });
  }

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragEnd={handleDragEnd}
      onDragStart={(event) => setActiveCardId(event.active.id as string)}
    >
      <div className="flex gap-2 overflow-x-auto items-start">
        {loading ? (
          <>
            {STATUS_COLUMNS.map((s) => (
              <div className="grid gap-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <Skeleton className="bg-secondary/20 w-70 h-30 animate-pulse"/>
                ))}
              </div>
            ))}
          </>
        ) : (
          <>
            {columns.map((column) => (
              <ColumnKanban key={column.id} column={column} />
            ))}
          </>
        )}
        <DragOverlay
          dropAnimation={{
            sideEffects: defaultDropAnimationSideEffects({
              styles: {
                active: { opacity: "0.5" },
              },
            }),
          }}
        >
          {activeCardId ? (
            <div className="bg-white rounded-md p-3 shadow-lg text-sm">
              {
                columns
                  .flatMap((col) => col.cards)
                  .find((card) => String(card.idChamado) === activeCardId)
                  ?.titulo
              }
            </div>
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
};

export default KanbanChamados;
